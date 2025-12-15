import { useState } from 'react';
import ClassifierForm from './components/ClassifierForm';
import ResultCard from './components/ResultCard';
import { ClassifyResponse } from './api/client';

function App() {
  const [classificationResult, setClassificationResult] = useState<ClassifyResponse | null>(null);
  const [originalMessage, setOriginalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResult = (result: ClassifyResponse, message: string) => {
    setClassificationResult(result);
    setOriginalMessage(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            WhatsApp Template Classifier
          </h1>
          <p className="text-gray-600 mb-4">
            Classify and optimize your WhatsApp Business message templates
          </p>
          <div className="max-w-2xl mx-auto bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Disclaimer:</strong> This application may give errors and should not be relied upon. It is provided for easy use only and may not always be accurate.
                </p>
              </div>
            </div>
          </div>
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
          />
        )}
      </div>
    </div>
  );
}

export default App;

