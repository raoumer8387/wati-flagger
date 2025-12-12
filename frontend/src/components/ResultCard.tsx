import { ClassifyResponse } from '../api/client';

interface ResultCardProps {
  result: ClassifyResponse;
  originalMessage: string;
  onRewrite: (message: string) => void;
}

export default function ResultCard({ result, originalMessage, onRewrite }: ResultCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Utility':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Marketing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Authentication':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Classification Results</h2>
        <div className={`inline-block px-4 py-2 rounded-lg border-2 font-semibold ${getCategoryColor(result.category)}`}>
          Category: {result.category}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Utility Score</span>
            <span className={`text-lg font-bold ${getScoreColor(result.utility_score)}`}>
              {(result.utility_score * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full transition-all"
              style={{ width: `${result.utility_score * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Marketing Score</span>
            <span className={`text-lg font-bold ${getScoreColor(result.marketing_score)}`}>
              {(result.marketing_score * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-yellow-600 h-2.5 rounded-full transition-all"
              style={{ width: `${result.marketing_score * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Authentication Score</span>
            <span className={`text-lg font-bold ${getScoreColor(result.auth_score)}`}>
              {(result.auth_score * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${result.auth_score * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Explanation</h3>
        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
          {result.explanation}
        </p>
      </div>

      <button
        onClick={() => onRewrite(originalMessage)}
        className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
      >
        Rewrite as Utility
      </button>
    </div>
  );
}

