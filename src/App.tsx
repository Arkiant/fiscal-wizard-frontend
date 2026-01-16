"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "./components/FileUpload";
import { Loading } from "./components/Loading";
import StepIndicator from "./components/StepIndicator";
import TutorialPage from "./components/TutorialPage";
import { Footer } from "./components/layout";
import { taxApi } from "./services/api";

interface AppState {
  step: "upload" | "loading" | "report";
  reportId: string | null;
  reportHtml: string | null;
  error: string | null;
}

console.log("🎯 App.tsx loading...");

const App = () => {
  const router = useRouter();
  const [state, setState] = useState<AppState>({
    step: "upload",
    reportId: null,
    reportHtml: null,
    error: null,
  });

  const handleFileUpload = async (file: File) => {
    try {
      console.log("🚀 Starting file upload process...");
      setState((prev) => ({ ...prev, step: "loading", error: null }));

      // 1. Upload CSV y obtener UUID
      console.log("📤 Uploading to backend...");
      const uploadResponse = await taxApi.uploadCSV(file);
      console.log("✅ Upload successful:", uploadResponse);

      setState((prev) => ({ ...prev, reportId: uploadResponse.id }));

      // 2. Descargar HTML con ese UUID
      console.log("📥 Downloading report...");
      const htmlContent = await taxApi.downloadReport(uploadResponse.id);
      console.log(
        "✅ Report downloaded, length:",
        htmlContent.length,
        "characters"
      );

      setState((prev) => ({
        ...prev,
        step: "report",
        reportHtml: htmlContent,
        error: null,
      }));

      console.log("🎉 Full process completed successfully!");
    } catch (error) {
      console.error("❌ Error processing file:", error);
      setState((prev) => ({
        ...prev,
        step: "upload",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }));
    }
  };

  const resetApplication = () => {
    console.log("🔄 Resetting application...");
    setState({
      step: "upload",
      reportId: null,
      reportHtml: null,
      error: null,
    });
  };

  const showTutorial = () => {
    console.log("📚 Navigating to tutorial page...");
    router.push("/tutorial");
  };

  console.log("📱 App state:", state);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Professional Header */}
      <header className="text-white" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'}}>
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="text-center">
            <div className="mb-4 md:mb-6">
              <div className="relative inline-block mx-auto">
                <h1 className="brand-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 relative z-10 tracking-tight text-center">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text text-transparent">
                    Fiscal Wizard
                  </span>
                </h1>

              </div>

            </div>

            <div className="max-w-2xl mx-auto space-y-3 md:space-y-4">
              <p className="text-lg md:text-xl text-slate-100 font-light">
                Calculadora Automática de IRPF para Inversores
              </p>
              <p className="text-base md:text-lg text-slate-300">
                Genera automáticamente los valores exactos para cada casilla de la declaración a partir de tus operaciones Interactive Brokers
              </p>
            </div>

          </div>
        </div>
      </header>

      {/* Progress indicator */}
      <StepIndicator currentStep={state.step} />

      <div className="flex-grow container mx-auto px-6 py-12">
        {/* Main Content */}
        <main>
          {state.step === "upload" && (
            <FileUpload
              onUpload={handleFileUpload}
              isLoading={state.step === ("loading" as any)}
              error={state.error}
              onShowTutorial={showTutorial}
            />
          )}

          {state.step === "loading" && (
            <Loading message="Processing your tax report..." />
          )}

          {state.step === "report" && state.reportHtml && (
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Report card with integrated success header */}
              <div className="card bg-white overflow-hidden">
                {/* Card header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-center">
                        Informe Fiscal Generado con Éxito
                      </h3>
                      <p className="text-slate-300 text-sm text-center">
                        Su informe IRPF está listo para su descarga y
                        presentación
                      </p>
                    </div>

                    {/* Success indicator */}
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-3xl">✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-8 space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-900 mt-3 text-blue-600">
                    <span className="flex items-center">
                      <span className="mr-2">🆔</span>
                      ID: {state.reportId}
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
                        Genera los valores específicos para cada casilla del
                        modelo 100
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
                    <a
                      href={`data:text/html;charset=utf-8,${encodeURIComponent(state.reportHtml)}`}
                      download={`calculo_irpf_${state.reportId}.html`}
                      className="btn-primary"
                    >
                      <span className="mr-2">📥</span>
                      Descargar Informe Completo
                    </a>

                    <button
                      onClick={resetApplication}
                      className="btn-secondary"
                    >
                      <span className="mr-2">📊</span>
                      Procesar Nuevo Documento
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
