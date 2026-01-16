import { useDropzone } from "react-dropzone";
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { validateFile } from "../utils/validation";
import type { FileUploadProps } from "../types";

console.log("FileUpload.tsx loading...");

export function FileUpload({
  onUpload,
  isLoading = false,
  error,
  onShowTutorial,
}: FileUploadProps) {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const validation = validateFile(file);
    if (!validation.valid) return;
    onUpload(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    maxSize: 1024 * 1024,
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
          <h3 className="text-2xl font-bold text-center">
            Subir Operaciones de Inversion
          </h3>
          <p className="text-slate-300 mt-2 text-center">
            Carga tu CSV de Interactive Brokers para calcular automaticamente el
            IRPF y obtener los valores exactos para cada casilla
          </p>
        </div>
        <div className="p-8">
          <div
            className={`dropzone group ${isDragActive ? "dragover" : ""} ${isLoading ? "loading" : ""}`}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center space-y-6 py-8">
              {/* Animated Icon Container */}
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ${isDragActive ? "animate-pulse" : ""} transition-all duration-300`}
                >
                  {isLoading ? (
                    <div className="animate-spin text-white text-2xl">⟳</div>
                  ) : (
                    <div className="text-white text-3xl">📄</div>
                  )}
                </div>

                {/* Floating upload arrow */}
                {!isLoading && (
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg transform ${isDragActive ? "animate-bounce" : "group-hover:animate-bounce"} transition-all duration-300`}
                  >
                    <span className="text-white text-sm">↑</span>
                  </div>
                )}

                {/* Ripple effect on hover */}
                <div
                  className={`absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 scale-150 ${isDragActive ? "animate-ping" : ""} transition-opacity duration-300`}
                ></div>
              </div>

              {/* Text Content */}
              <div className="text-center space-y-3">
                <h3
                  className={`text-xl font-bold ${isDragActive ? "text-blue-700" : "text-slate-800"} transition-colors duration-300`}
                >
                  {isLoading
                    ? "Procesando documento..."
                    : isDragActive
                      ? "¡Suelte el archivo aquí!"
                      : "Suba su archivo CSV"}
                </h3>

                <p
                  className={`text-sm ${isDragActive ? "text-blue-600" : "text-slate-600"} transition-colors duration-300 max-w-md`}
                >
                  {isLoading
                    ? "Analizando sus operaciones de inversión..."
                    : isDragActive
                      ? "El archivo se procesará automáticamente"
                      : "Arrastre y suelte su archivo CSV de Interactive Brokers aquí"}
                </p>

                {/* File selection button */}
                {!isLoading && !isDragActive && (
                  <button
                    type="button"
                    className="btn-primary mt-4"
                    onClick={() =>
                      (
                        document.querySelector(
                          'input[type="file"]'
                        ) as HTMLInputElement
                      )?.click()
                    }
                  >
                    Seleccionar Archivo
                  </button>
                )}

                {/* File type indicator */}
                {!isLoading && (
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                    <span className="px-2 py-1 bg-slate-100 rounded-full">
                      CSV
                    </span>
                    <span>•</span>
                    <span>Máx. 1MB</span>
                  </div>
                )}
              </div>

              {/* Progress bar for loading state */}
              {isLoading && (
                <div className="w-full max-w-xs">
                  <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 via-transparent to-indigo-500 rounded-xl"></div>
            </div>
          </div>
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-slate-200 rounded-xl">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          {!isLoading && !error && (
            <div className="mt-8 p-6 bg-slate-50 rounded-xl">
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
                Requisitos del documento
              </h4>
              <p>Formato CSV Interactive Brokers, tamano maximo 1MB</p>
            </div>
          )}
          {!isLoading && !error && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                <QuestionMarkCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
                Necesitas ayuda para generar el CSV?
              </h4>
              <p className="text-slate-600 mb-4">
                Sigue nuestro tutorial paso a paso para aprender a generar el
                archivo CSV desde Interactive Brokers
              </p>
              <button onClick={onShowTutorial} className="btn-primary">
                Ver Tutorial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
