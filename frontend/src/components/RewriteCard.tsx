interface RewriteCardProps {
  rewritten: string;
  original: string;
}

export default function RewriteCard({ rewritten, original }: RewriteCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Rewritten as Utility</h2>
      
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Original Message</h3>
        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
          {original}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Rewritten Message</h3>
        <p className="text-gray-800 bg-green-50 p-4 rounded-lg border-2 border-green-300 font-medium">
          {rewritten}
        </p>
      </div>
    </div>
  );
}

