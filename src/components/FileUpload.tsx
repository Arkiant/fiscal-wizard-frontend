import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { validateFile } from "../utils/validation";
import type { FileUploadProps } from "../types";

console.log("✅ FileUpload.tsx loading...");

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  isLoading = false,
  error,
  onShowTutorial,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      console.log("📤 File dropped/selected:", file);

      const validation = validateFile(file);
      if (!validation.valid) {
        console.error("❌ Validation failed:", validation.error);
        // Error will be handled by parent component
        return;
      }

      console.log("✅ File validation passed, calling onUpload");
      onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxSize: 1024 * 1024, //1MB
    multiple: false,
    disabled: isLoading,
  });

  console.log("📝 FileUpload component initialized");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card bg-white p-6 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Subir Operaciones de Inversión
          </h2>
          <p className="text-slate-600">
            Carga tu CSV de Interactive Brokers para calcular automáticamente el
            IRPF y obtener los valores exactos para cada casilla
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            dropzone group relative overflow-hidden
            ${
              isDragActive
                ? "border-blue-600 bg-blue-50/50"
                : "border-slate-300 hover:border-slate-400"
            }
            ${isLoading ? "opacity-60" : "cursor-pointer hover:bg-slate-50"}
          `}
        >
          <input {...getInputProps()} />

          <div className="relative z-10 space-y-4 md:space-y-6">
            {/* Icon with background */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  {isLoading ? (
                    <div className="animate-spin text-blue-600 text-xl md:text-2xl">
                      ⟳
                    </div>
                  ) : (
                    <div className="text-blue-600 text-2xl md:text-3xl">📄</div>
                  )}
                </div>
                {!isLoading && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">+</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 md:space-y-3">
              {isLoading ? (
                <>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                    Procesando documento...
                  </h3>
                  <p className="text-sm md:text-base text-slate-600">
                    Su fichero CSV está siendo analizado y procesado
                  </p>
                </>
              ) : isDragActive ? (
                <>
                  <h3 className="text-lg md:text-xl font-semibold text-blue-600">
                    Suelte el fichero aquí
                  </h3>
                  <p className="text-sm md:text-base text-blue-600/80">
                    El documento será validado automáticamente
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 text-center px-2">
                    Arrastre su CSV aquí, o haga clic para seleccionar
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 text-center px-2">
                    Formato CSV de Interactive Brokers Activity Statement
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start">
              <span className="text-red-600 mr-3 mt-0.5">⚠️</span>
              <div>
                <p className="text-red-900 font-semibold mb-1">
                  Error en la validación
                </p>
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Requirements */}
        {!isLoading && !error && (
          <div className="mt-8 p-6 bg-slate-50 rounded-xl">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
              <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
              Requisitos del documento
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-slate-700">
                  Formato CSV Interactive Brokers
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-slate-700">Tamaño máximo: 1MB</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-slate-700">
                  Columnas requeridas completas
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>Aviso:</strong> Verifique la exactitud de sus datos.
                Esta herramienta realiza cálculos matemáticos, pero no se
                responsabiliza de errores en los datos originales. Consulte con
                un experto fiscal para validación.
              </p>
            </div>
          </div>
        )}

        {/* Tutorial Section */}
        {!isLoading && !error && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
              <QuestionMarkCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
              ¿Necesitas ayuda para generar el CSV?
            </h4>
            <p className="text-slate-600 mb-4">
              Sigue nuestro tutorial paso a paso para aprender a generar el
              archivo CSV desde Interactive Brokers usando Consultas Flex.
            </p>
            <button
              onClick={onShowTutorial}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">📖</span>
              Ver Tutorial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
