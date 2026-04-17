import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Model fallback chain - try in order
const MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash-latest",
]

const RETRYABLE_CODES = [429, 503, 502, 500]
const MAX_RETRIES = 3
const BASE_DELAY_MS = 1000

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isRetryableError(error: any): boolean {
  const message = error?.message?.toLowerCase() || ""
  return (
    RETRYABLE_CODES.some((code) => message.includes(String(code))) ||
    message.includes("unavailable") ||
    message.includes("high demand") ||
    message.includes("overloaded") ||
    message.includes("resource_exhausted")
  )
}

/**
 * Calls Gemini generateContent with automatic retry + model fallback.
 * Tries each model in MODEL_CHAIN with exponential backoff per model.
 */
export async function generateWithFallback(
  parts: Parameters<ReturnType<typeof genAI.getGenerativeModel>["generateContent"]>[0],
): Promise<string> {
  let lastError: any

  for (const modelName of MODEL_CHAIN) {
    const model = genAI.getGenerativeModel({ model: modelName })

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const result = await model.generateContent(parts)
        const response = await result.response
        return response.text()
      } catch (error: any) {
        lastError = error
        const shouldRetry = isRetryableError(error)

        if (!shouldRetry) {
          // Non-retryable error (e.g. 404 invalid model) - skip to next model
          break
        }

        if (attempt < MAX_RETRIES - 1) {
          const delay = BASE_DELAY_MS * Math.pow(2, attempt)
          await sleep(delay)
        }
      }
    }
  }

  throw lastError ?? new Error("All Gemini models failed")
}
