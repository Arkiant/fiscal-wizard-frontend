import React from 'react';

export interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Processing your tax report...' }) => {
  console.log('✅ Loading component rendering with message:', message);
  
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      {/* Sophisticated spinner */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 border-4 border-blue-400 rounded-full border-b-transparent animate-spin animation-delay-75"></div>
        <div className="absolute inset-4 border-4 border-blue-300 rounded-full border-l-transparent animate-spin animation-delay-150"></div>
      </div>
      
      {/* Content */}
      <div className="text-center space-y-4 max-w-md">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-slate-900">
            Procesando Informe Fiscal
          </h3>
          <p className="text-slate-600">{message}</p>
        </div>
        
        {/* Progress indicators */}
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-500">Analizando transacciones</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-75"></div>
            <span className="text-sm text-slate-500">Calculando ganancias/pérdidas</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-150"></div>
            <span className="text-sm text-slate-500">Generando informe oficial</span>
          </div>
        </div>
        
        {/* Additional info */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-sm text-blue-700 flex items-center justify-center">
            <span className="mr-2">⏱️</span>
            Este proceso puede tardar unos momentos dependiendo del volumen de datos
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .animation-delay-75 {
          animation-delay: 75ms;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};