import React from 'react';

export interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Processing your tax report...' }) => {
  console.log('✅ Loading component rendering with message:', message);
  
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      
      {/* Message */}
      <p className="text-lg text-gray-600">{message}</p>
      
      {/* Additional info */}
      <p className="text-sm text-gray-500">
        This may take a few moments depending on file size
      </p>
    </div>
  );
};