export default function AIChatPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-2xl">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Analytics Assistant</h1>
        <div className="inline-block px-6 py-3 bg-primary-100 text-primary-800 rounded-full font-semibold text-lg mb-6">
          Coming Soon
        </div>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8">
          We're building an intelligent AI assistant to help you analyze student performance, 
          identify patterns, and get instant insights through natural conversation.
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="card">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-900 mb-2">Natural Queries</h3>
            <p className="text-sm text-gray-600">
              Ask questions in plain English and get instant answers
            </p>
          </div>
          <div className="card">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Visual Insights</h3>
            <p className="text-sm text-gray-600">
              Get charts and graphs embedded in chat responses
            </p>
          </div>
          <div className="card">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
            <p className="text-sm text-gray-600">
              Receive personalized teaching suggestions based on data
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Stay tuned!</span> This feature will be available in the next update.
          </p>
        </div>
      </div>
    </div>
  );
}
