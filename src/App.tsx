import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Loading } from './components/Loading';
import { taxApi } from './services/api';
import './index.css';

interface AppState {
  step: 'upload' | 'loading' | 'report';
  reportId: string | null;
  reportHtml: string | null;
  error: string | null;
}

console.log('🎯 App.tsx loading...');

const App = () => {
  const [state, setState] = useState<AppState>({
    step: 'upload',
    reportId: null,
    reportHtml: null,
    error: null,
  });

  const handleFileUpload = async (file: File) => {
    try {
      console.log('🚀 Starting file upload process...');
      setState(prev => ({ ...prev, step: 'loading', error: null }));
      
      // 1. Upload CSV y obtener UUID
      console.log('📤 Uploading to backend...');
      const uploadResponse = await taxApi.uploadCSV(file);
      console.log('✅ Upload successful:', uploadResponse);
      
      setState(prev => ({ ...prev, reportId: uploadResponse.id }));
      
      // 2. Descargar HTML con ese UUID
      console.log('📥 Downloading report...');
      const htmlContent = await taxApi.downloadReport(uploadResponse.id);
      console.log('✅ Report downloaded, length:', htmlContent.length, 'characters');
      
      setState(prev => ({
        ...prev,
        step: 'report',
        reportHtml: htmlContent,
        error: null
      }));
      
      console.log('🎉 Full process completed successfully!');
      
    } catch (error) {
      console.error('❌ Error processing file:', error);
      setState(prev => ({
        ...prev,
        step: 'upload',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  };

  const resetApplication = () => {
    console.log('🔄 Resetting application...');
    setState({
      step: 'upload',
      reportId: null,
      reportHtml: null,
      error: null,
    });
  };

  console.log('📱 App state:', state);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Fiscal Wizard
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Spanish IRPF Tax Calculator
          </p>
          <p className="text-sm text-gray-500">
            Upload your Interactive Brokers CSV file to generate your tax report
          </p>
          
          {/* Status indicator */}
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                state.step === 'upload' ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <span className={state.step === 'upload' ? 'text-green-700 font-medium' : 'text-gray-600'}>
                Upload
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                state.step === 'loading' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'
              }`}></div>
              <span className={state.step === 'loading' ? 'text-yellow-700 font-medium' : 'text-gray-600'}>
                Processing
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                state.step === 'report' ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <span className={state.step === 'report' ? 'text-green-700 font-medium' : 'text-gray-600'}>
                Report
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {state.step === 'upload' && (
            <FileUpload 
              onUpload={handleFileUpload} 
              isLoading={state.step === 'loading'}
              error={state.error}
            />
          )}
          
          {state.step === 'loading' && (
            <Loading message="Processing your tax report..." />
          )}
          
          {state.step === 'report' && state.reportHtml && (
            <div className="space-y-6">
              {/* Reset button */}
              <div className="text-center">
                <button
                  onClick={resetApplication}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  📊 Process Another File
                </button>
              </div>
              
              {/* Report preview */}
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        🎉 Tax Report Generated Successfully
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Report ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{state.reportId}</code>
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {/* Download button */}
                      <a
                        href={`data:text/html;charset=utf-8,${encodeURIComponent(state.reportHtml)}`}
                        download={`informe_fiscal_${state.reportId}.html`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 text-decoration-none"
                      >
                        <span>📥</span>
                        <span>Download HTML</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Report preview */}
                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4">Report Preview:</h3>
                  <div className="bg-white border border-gray-200 rounded p-4 max-h-96 overflow-y-auto">
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                      {state.reportHtml.length > 500 
                        ? state.reportHtml.substring(0, 500) + '...' 
                        : state.reportHtml
                      }
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>
              💡 <strong>Tip:</strong> Make sure your CSV includes dividend and sale transactions
            </p>
            <p>
              📋 <strong>Required Format:</strong> Interactive Brokers Activity Statement CSV
            </p>
            <p className="text-xs">
              Generated reports contain official Spanish tax form boxes (casillas fiscales) for IRPF declaration
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;