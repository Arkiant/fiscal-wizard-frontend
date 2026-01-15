import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateFile } from '../utils/validation';
import type { FileUploadProps } from '../types';

console.log('✅ FileUpload.tsx loading...');

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload, isLoading = false, error }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    console.log('📤 File dropped/selected:', file);

    const validation = validateFile(file);
    if (!validation.valid) {
      console.error('❌ Validation failed:', validation.error);
      // Error will be handled by parent component
      return;
    }

    console.log('✅ File validation passed, calling onUpload');
    onUpload(file);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxSize: 1024 * 1024, //1MB
    multiple: false,
    disabled: isLoading,
  });

  console.log('📝 FileUpload component initialized');

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-white'
          }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          {/* Icon */}
          <div className="text-6xl">
            {isLoading ? (
              <div className="animate-spin text-blue-600">⚙️</div>
            ) : (
              <div className="text-gray-400">📊</div>
            )}
          </div>
          
          {/* Messages */}
          <div>
            {isLoading ? (
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Processing file...
              </h3>
            ) : isDragActive ? (
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Drop your CSV file here
              </h3>
            ) : (
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop your CSV file here, or click to browse
              </h3>
            )}
            
            <p className="text-gray-600">
              {isLoading 
                ? 'Your Interactive Brokers CSV is being processed'
                : 'Supports Interactive Brokers CSV format'
              }
            </p>
          </div>
          
          {/* File info (when file is selected) */}
          {isDragActive && (
            <div className="text-sm text-gray-500">
              File will be validated before upload
            </div>
          )}
        </div>
        
        {/* Error display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">❌</span>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {/* Help text */}
        {!isLoading && !error && (
          <div className="mt-6 text-sm text-gray-500">
            <p className="mb-2">
              <strong>File requirements:</strong>
            </p>
            <ul className="text-left space-y-1">
              <li>• CSV format from Interactive Brokers</li>
              <li>• Maximum file size: 1MB</li>
              <li>• Required columns: Currency, AssetCategory, Symbol, Date/Time, etc.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};