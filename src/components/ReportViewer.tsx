import React, { useState } from "react";
import { downloadHtmlFile } from "../utils/validation";
import type { ReportViewerProps } from "../types";

export const ReportViewer: React.FC<ReportViewerProps> = ({
  htmlContent,
  reportId,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    downloadHtmlFile(htmlContent, reportId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div
        className={`card bg-white overflow-hidden ${isFullscreen ? "hidden" : ""}`}
      >
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Informe Fiscal Generado</h3>
              <p className="text-slate-300 mt-2">
                Visualización del reporte de IRPF con valores exactos para cada
                casilla
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Report ID:{" "}
                <code className="bg-slate-700 px-2 py-1 rounded text-xs">
                  {reportId}
                </code>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {/* Download button */}
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center space-x-2"
              >
                <span>📥</span>
                <span>Descargar HTML</span>
              </button>

              {/* Fullscreen toggle */}
              <button
                onClick={toggleFullscreen}
                className="btn-secondary flex items-center space-x-2"
              >
                {isFullscreen ? (
                  <>
                    <span>🗗</span>
                    <span>Salir Pantalla Completa</span>
                  </>
                ) : (
                  <>
                    <span>⛶</span>
                    <span>Pantalla Completa</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Report Content */}
          <div
            className={`
            relative bg-slate-50 rounded-xl overflow-hidden
            ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}
          `}
          >
            {/* Close button for fullscreen */}
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-medium min-h-[44px] min-w-[44px] active:scale-95 transition-transform"
              >
                <span className="hidden sm:inline">✕ Cerrar</span>
                <span className="sm:hidden">✕</span>
              </button>
            )}

            {/* iframe with report */}
            <iframe
              srcDoc={htmlContent}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className={`
                w-full border-0
                ${isFullscreen ? "h-screen" : "h-[70vh] md:h-[80vh]"}
              `}
              title="Fiscal Wizard Tax Report"
            />
          </div>
        </div>

        {/* Footer info */}
        {!isFullscreen && (
          <div className="border-t border-slate-200 px-8 py-6 bg-slate-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-slate-600 space-y-3 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-xs md:text-sm">
                  Generado por Fiscal Wizard - Calculadora IRPF Española
                </p>
                <p className="text-xs mt-1">
                  El informe contiene valores específicos para cada casilla del
                  formulario fiscal español
                </p>
              </div>

              <div className="text-center md:text-right">
                <p className="font-medium text-slate-900 text-xs md:text-sm">
                  Interactive Brokers
                </p>
                <p className="text-xs">Año Fiscal 2024</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
