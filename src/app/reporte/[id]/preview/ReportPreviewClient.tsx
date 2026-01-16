"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ReportPreviewClientProps {
  reportId: string;
}

export default function ReportPreviewClient({
  reportId,
}: ReportPreviewClientProps) {
  const [reportHtml, setReportHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/reports/${reportId}/download?lang=es`);

      if (!response.ok) {
        throw new Error(`Error al obtener el reporte: ${response.status}`);
      }

      const htmlContent = await response.text();
      setReportHtml(htmlContent);
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (reportHtml) {
      const blob = new Blob([reportHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `calculo_irpf_${reportId}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleNewReport = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="card bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
            <h3 className="text-2xl font-bold">Cargando Vista Previa</h3>
            <p className="text-slate-300 mt-2">
              Recuperando su informe fiscal...
            </p>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-center py-16">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 border-4 border-blue-400 rounded-full border-b-transparent animate-spin animation-delay-75"></div>
                <div className="absolute inset-4 border-4 border-blue-300 rounded-full border-l-transparent animate-spin animation-delay-150"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="card bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
            <h3 className="text-2xl font-bold">Error al Cargar Reporte</h3>
            <p className="text-slate-300 mt-2">
              No se pudo recuperar el informe fiscal solicitado
            </p>
          </div>
          <div className="p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <div>
                <p className="text-red-800 font-medium mb-2">
                  Error de Recuperación
                </p>
                <p className="text-slate-600">{error}</p>
                <p className="text-sm text-slate-500 mt-2">
                  Es posible que el enlace haya expirado (24 horas) o que el ID
                  no sea válido.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={handleNewReport} className="btn-primary">
                  <span className="mr-2">📊</span>
                  Procesar Nuevo Documento
                </button>
                <button onClick={() => router.back()} className="btn-secondary">
                  <span className="mr-2">⬅️</span>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Report card with integrated success header */}
      <div className="card bg-white overflow-hidden">
        {/* Card header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Vista Previa del Informe Fiscal
              </h3>
              <p className="text-slate-300 text-sm">
                Informe recuperado exitosamente
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-300 mt-3">
                <span className="flex items-center">
                  <span className="mr-2">🆔</span>
                  ID: {reportId}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">📅</span>
                  {new Date().toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-8 space-y-8">
          {/* Report features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">🧮</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">
                Cálculo Automático
              </h4>
              <p className="text-sm text-slate-600">
                Procesa todas tus operaciones y calcula el IRPF exacto
              </p>
            </div>

            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">📝</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">
                Casillas Exactas
              </h4>
              <p className="text-sm text-slate-600">
                Genera los valores específicos para cada casilla del modelo 100
              </p>
            </div>

            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">✅</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">
                Listo para Presentar
              </h4>
              <p className="text-sm text-slate-600">
                Información completa para tu declaración de la renta
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-slate-200">
            <button onClick={handleDownload} className="btn-primary">
              <span className="mr-2">📥</span>
              Descargar Informe Completo
            </button>

            <button onClick={handleNewReport} className="btn-secondary">
              <span className="mr-2">📊</span>
              Procesar Nuevo Documento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
