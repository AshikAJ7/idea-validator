import { useState } from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Users, CheckCircle2, Loader2, Copy, Check } from 'lucide-react';

function App() {
  const [idea, setIdea] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const analyzeIdea = async () => {
    if (!idea.trim()) {
      setError('Please enter an idea to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      // Call our new backend webhook instead of Hugging Face directly
      const response = await fetch('http://localhost:3000/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze idea');
      }

      setAnalysis(data);
    } catch (err) {
      console.error('Error:', err);
      // Friendly error handling
      if (err.message && err.message.includes('503')) {
        setError('The AI model is currently loading (cold start). Please try again in 30 seconds.');
      } else {
        setError(err.message || 'Failed to analyze idea. Please ensure the backend server is running on port 3000.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!analysis) return;
    const text = `STARTUP IDEA ANALYSIS
    
STRENGTHS:
${analysis.strengths.map(s => `- ${s}`).join('\n')}

WEAKNESSES:
${analysis.weaknesses.map(w => `- ${w}`).join('\n')}

IMPROVEMENT SUGGESTIONS:
${analysis.improvement_suggestions.map(i => `- ${i}`).join('\n')}
`.trim();

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Lightbulb className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Idea Validator</h1>
          <p className="text-gray-600">Feedback System for Startup Ideas</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Your Business Idea
          </label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., A mobile app that connects local farmers directly with consumers..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none min-h-[120px] resize-none"
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm break-all">{error}</p>
            </div>
          )}

          <button
            onClick={analyzeIdea}
            disabled={loading}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Get Feedback
              </>
            )}
          </button>
        </div>

        {analysis && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Analysis Results</h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-lg transition-colors"
              >
                {copySuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Results
                  </>
                )}
              </button>
            </div>

            {/* Strengths Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Strengths
              </h3>
              <ul className="space-y-3">
                {analysis.strengths && analysis.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-green-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
                Weaknesses
              </h3>
              <ul className="space-y-3">
                {analysis.weaknesses && analysis.weaknesses.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements Section */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-purple-600" />
                Improvement Suggestions
              </h3>
              <ul className="space-y-3">
                {analysis.improvement_suggestions && analysis.improvement_suggestions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
