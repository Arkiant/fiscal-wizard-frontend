import React from "react";

export interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Processing your tax report...",
}) => {
  console.log("✅ Loading component rendering with message:", message);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
          <h3 className="text-2xl font-bold text-center">
            Procesando Informe Fiscal
          </h3>
          <p className="text-slate-300 mt-2 text-center">
            Analizando sus datos de inversión para generar el informe de IRPF
          </p>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Sophisticated spinner */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 border-4 border-blue-400 rounded-full border-b-transparent animate-spin animation-delay-75"></div>
              <div className="absolute inset-4 border-4 border-blue-300 rounded-full border-l-transparent animate-spin animation-delay-150"></div>
            </div>

            {/* Content */}
            <div className="text-center space-y-4 max-w-md">
              {/* Progress indicators */}
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-500">
                    Analizando transacciones
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-75"></div>
                  <span className="text-sm text-slate-500">
                    Calculando ganancias/pérdidas
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-150"></div>
                  <span className="text-sm text-slate-500">
                    Generando informe oficial
                  </span>
                </div>
              </div>

              {/* Additional info */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-700 flex items-center justify-center">
                  <span className="mr-2">⏱️</span>
                  Este proceso puede tardar unos momentos dependiendo del
                  volumen de datos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
