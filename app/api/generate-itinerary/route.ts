import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LRUCache } from 'lru-cache';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Simple in-memory cache (optional, can be replaced with Redis for production)
const cache = new LRUCache<string, any>({
  max: 100,
  ttl: 1000 * 60 * 60, // Cache for 1 hour
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { destination, duration, budget, travelStyle, interests, startDate } = await req.json();

    // Basic validation
    if (!destination || !startDate) {
      return NextResponse.json({ error: 'Destination and start date required' }, { status: 400 });
    }

    // Generate cache key
    const cacheKey = `${destination}:${duration}:${budget}:${travelStyle}:${interests}:${startDate}`;
    const cachedItinerary = cache.get(cacheKey);
    if (cachedItinerary) {
      return NextResponse.json({ itinerary: cachedItinerary });
    }

    // Optimized prompt
    const prompt = `
Generate a travel itinerary in JSON format for:
- Destination: ${destination}
- Start Date: ${startDate} (YYYY-MM-DD)
- Duration: ${duration} days
- Budget: ${budget} USD
- Travel Style: ${travelStyle}
- Interests: ${interests}

Requirements:
- Dates start from ${startDate} (Day 1) in YYYY-MM-DD format.
- Include 3 activities/day (morning, afternoon, evening), breakfast/lunch/dinner, and one accommodation/day.
- Budget must not exceed ${budget} USD, distributed across accommodation, food, activities, transportation, miscellaneous.
- Provide 5 travel tips and 3 alternative options (strings or objects).
- Return only valid JSON matching this structure:
{
  "destination": string,
  "duration": number,
  "totalBudget": number,
  "budgetBreakdown": { "accommodation": number, "food": number, "activities": number, "transportation": number, "miscellaneous": number },
  "days": [{
    "day": number,
    "date": string,
    "activities": [{ "time": string, "name": string, "description": string, "duration": string, "cost": number, "category": string, "priority": "must-see" | "recommended" | "optional" }],
    "meals": [{ "type": "breakfast" | "lunch" | "dinner", "suggestion": string, "estimatedCost": number, "location": string }],
    "accommodation": { "name": string, "type": string, "costPerNight": number, "location": string },
    "dailyBudget": number,
    "timeAllocation": string
  }],
  "tips": string[],
  "alternatives": (string | { alternative: string, description: string })[]
}
Ensure realistic scheduling and cost alignment with travel style and interests.
`;

    // Generate content
    const result = await model.generateContent(prompt);
    let itinerary = JSON.parse(result.response.text().replace(/```json/g, '').replace(/```/g, '').trim());

    // Cache the result
    cache.set(cacheKey, itinerary);

    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 });
  }
}