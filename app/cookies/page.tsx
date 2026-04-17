export const metadata = {
    title: "Cookie Policy - Travel~I",
    description: "Learn about how Travel~I uses cookies to enhance your experience with our AI-powered travel platform.",
  }
  
  export default function CookiesPage() {
    return (
      <div className="min-h-screen text-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Cookie Policy</h1>
              <p className="text-xl text-gray-900/80 max-w-2xl mx-auto">
                Understanding how Travel~I uses cookies to enhance your AI-powered travel experience
              </p>
              <div className="mt-4 text-sm text-gray-900/60">Last updated: August 2025</div>
            </div>
  
            {/* Content Sections */}
            <div className="space-y-12">
              <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-2xl font-serif font-semibold mb-6 text-accent">What Are Cookies?</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-900/90 leading-relaxed mb-4">
                    Cookies are small text files that are stored on your device when you visit our website. They help us
                    provide you with a better experience by remembering your preferences and enabling essential
                    functionality of our AI travel platform.
                  </p>
                </div>
              </section>
  
              <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">How We Use Cookies</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-3 text-primary">Essential Cookies</h3>
                    <p className="text-gray-900/80 text-sm">
                      Required for basic website functionality, user authentication, and security features.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-3 text-primary">Analytics Cookies</h3>
                    <p className="text-gray-900/80 text-sm">
                      Help us understand how users interact with our AI travel features to improve our services.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-3 text-primary">Preference Cookies</h3>
                    <p className="text-gray-900/80 text-sm">
                      Remember your settings, language preferences, and personalized travel recommendations.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-3 text-primary">Functional Cookies</h3>
                    <p className="text-gray-900/80 text-sm">
                      Enable enhanced features like chat history, saved locations, and travel planning tools.
                    </p>
                  </div>
                </div>
              </section>
  
              <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-2xl font-serif font-semibold mb-6 text-primary">Third-Party Cookies</h2>
                <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
                  <p className="text-gray-900/90 leading-relaxed mb-4">
                    We may use third-party services that set their own cookies:
                  </p>
                  <ul className="space-y-2 text-gray-900/80">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        <strong>Google Maps:</strong> For location services and mapping functionality
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>
                        <strong>Analytics Services:</strong> To understand user behavior and improve our platform
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>
                        <strong>Authentication Providers:</strong> For secure login and account management
                      </span>
                    </li>
                  </ul>
                </div>
              </section>
  
              <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-2xl font-serif font-semibold mb-6 text-accent">Managing Your Cookie Preferences</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-900/90 leading-relaxed mb-6">
                    You have control over how cookies are used on our platform:
                  </p>
                  <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-accent">Browser Settings</h3>
                    <p className="text-gray-900/80 mb-4">
                      Most browsers allow you to control cookies through their settings. You can:
                    </p>
                    <ul className="space-y-2 text-gray-900/70 text-sm">
                      <li>• Block all cookies</li>
                      <li>• Delete existing cookies</li>
                      <li>• Allow cookies from specific sites only</li>
                      <li>• Get notified when cookies are set</li>
                    </ul>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
                    <p className="text-gray-900/90 text-sm">
                      <strong>Note:</strong> Disabling certain cookies may limit the functionality of Travel~I's AI
                      features, including personalized recommendations and saved preferences.
                    </p>
                  </div>
                </div>
              </section>
  
              <section className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <h2 className="text-2xl font-serif font-semibold mb-6 text-accent">Cookie Retention</h2>
                <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
                  <p className="text-gray-900/90 leading-relaxed mb-4">
                    Different types of cookies are stored for different periods:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Session Cookies</h4>
                      <p className="text-gray-900/70 text-sm">Deleted when you close your browser</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Persistent Cookies</h4>
                      <p className="text-gray-900/70 text-sm">Stored for up to 2 years or until manually deleted</p>
                    </div>
                  </div>
                </div>
              </section>
  
              <section className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <h2 className="text-2xl font-serif font-semibold mb-6 text-accent">Contact Us</h2>
                <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
                  <p className="text-gray-900/90 leading-relaxed mb-4">
                    If you have questions about our cookie policy or how we handle your data, please don't hesitate to
                    reach out:
                  </p>
                  <div className="space-y-2 text-gray-900/80">
                    <p>
                      <strong>Email:</strong> info@travel-i.app
                    </p>
                    <p>
                      <strong>Address:</strong> Travel~I Kurunegala, Sri Lanka
                    </p>
                  </div>
                </div>
              </section>
            </div>
  
            {/* Back to Home */}
            <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: "0.7s" }}>
              <a
                href="/"
                className="inline-flex items-center px-8 py-3 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:scale-105"
              >
                Back to Travel~I
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  