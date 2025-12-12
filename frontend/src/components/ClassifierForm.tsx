import { useState } from 'react';
import { classifyMessage, ClassifyResponse } from '../api/client';

interface ClassifierFormProps {
  onResult: (result: ClassifyResponse, message: string) => void;
  onLoading: (loading: boolean) => void;
}

export default function ClassifierForm({ onResult, onLoading }: ClassifierFormProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    onLoading(true);

    try {
      const result = await classifyMessage(message);
      onResult(result, message);
    } catch (error) {
      console.error('Error classifying message:', error);
      alert('Failed to classify message. Please try again.');
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          WhatsApp Message Template
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste your WhatsApp message template here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={6}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Classifying...' : 'Classify Message'}
      </button>
    </form>
  );
}

