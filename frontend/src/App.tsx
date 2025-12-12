import { useState } from 'react';
import ClassifierForm from './components/ClassifierForm';
import ResultCard from './components/ResultCard';
import RewriteCard from './components/RewriteCard';
import { ClassifyResponse } from './api/client';
import { rewriteAsUtility } from './api/client';

function App() {
  const [classificationResult, setClassificationResult] = useState<ClassifyResponse | null>(null);
  const [rewrittenMessage, setRewrittenMessage] = useState<string | null>(null);
  const [originalMessage, setOriginalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);

  const handleResult = (result: ClassifyResponse, message: string) => {
    setClassificationResult(result);
    setOriginalMessage(message);
    setRewrittenMessage(null);
  };

  const handleRewrite = async (message: string) => {
    setIsRewriting(true);
    setOriginalMessage(message);

    try {
      const response = await rewriteAsUtility(message);
      setRewrittenMessage(response.rewritten);
    } catch (error) {
      console.error('Error rewriting message:', error);
      alert('Failed to rewrite message. Please try again.');
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            WhatsApp Template Classifier
          </h1>
          <p className="text-gray-600">
            Classify and optimize your WhatsApp Business message templates
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <ClassifierForm
            onResult={handleResult}
            onLoading={setIsLoading}
          />
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Classifying message...</p>
          </div>
        )}

        {classificationResult && !isLoading && (
          <ResultCard
            result={classificationResult}
            originalMessage={originalMessage}
            onRewrite={handleRewrite}
          />
        )}

        {isRewriting && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Rewriting message...</p>
          </div>
        )}

        {rewrittenMessage && !isRewriting && (
          <RewriteCard
            rewritten={rewrittenMessage}
            original={originalMessage}
          />
        )}
      </div>
    </div>
  );
}

export default App;

