import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Loading } from './components/Loading';
import StepIndicator from './components/StepIndicator';
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Professional Header */}
      <header className="gradient-bg text-white">
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
            
            <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-center md:space-x-6 lg:space-x-8 space-y-3 md:space-y-0">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur px-3 md:px-4 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span className="text-sm text-slate-200">Cálculo Preciso</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur px-3 md:px-4 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span className="text-sm text-slate-200">Resultados Detallados</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur px-3 md:px-4 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span className="text-sm text-slate-200">Cumplimiento Hacienda</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Progress indicator */}
      <StepIndicator currentStep={state.step} />
      
      <div className="flex-grow container mx-auto px-6 py-12">
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
            <div className="space-y-8">
              {/* Success header */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Informe Fiscal Generado con Éxito
                </h2>
                <p className="text-slate-600 text-lg">
                  Su informe IRPF está listo para su descarga y presentación
                </p>
              </div>

              {/* Report card */}
              <div className="max-w-5xl mx-auto">
                <div className="card overflow-hidden">
                  {/* Card header */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Cálculo IRPF y Casillas Fiscales</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-300">
                          <span className="flex items-center">
                            <span className="mr-2">🆔</span>
                            ID: {state.reportId}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-2">📅</span>
                            {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                        <h4 className="font-semibold text-slate-900 mb-1">Cálculo Automático</h4>
                        <p className="text-sm text-slate-600">Procesa todas tus operaciones y calcula el IRPF exacto</p>
                      </div>
                      
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-green-600 text-xl">📝</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-1">Casillas Exactas</h4>
                        <p className="text-sm text-slate-600">Genera los valores específicos para cada casilla del modelo 100</p>
                      </div>
                      
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-purple-600 text-xl">✅</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-1">Listo para Presentar</h4>
                        <p className="text-sm text-slate-600">Información completa para tu declaración de la renta</p>
                      </div>
                    </div>



                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-slate-200">
                      <a
                        href={`data:text/html;charset=utf-8,${encodeURIComponent(state.reportHtml)}`}
                        download={`calculo_irpf_${state.reportId}.html`}
                        className="btn-primary flex items-center justify-center text-decoration-none"
                      >
                        <span className="mr-2">📥</span>
                        Descargar Informe Completo
                      </a>
                      
                      <button
                        onClick={resetApplication}
                        className="btn-secondary flex items-center justify-center"
                      >
                        <span className="mr-2">📊</span>
                        Procesar Nuevo Documento
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

        {/* Professional Footer */}
        <footer className="mt-20 bg-slate-900 text-white w-full">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* App info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold brand-heading">Fiscal Wizard</h3>
                <p className="text-slate-400 text-sm">
                  Herramienta automática para el cálculo del IRPF y generación de valores específicos para cada casilla de la declaración.
                </p>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">FW</div>
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200">Características</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Cálculo IRPF Automático</li>
                  <li>• Valores por Casilla Fiscal</li>
                  <li>• Ganancias Patrimoniales</li>
                  <li>• Operaciones Internacionales</li>
                </ul>
              </div>
              
              {/* Compatibility */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200">Compatibilidad</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Interactive Brokers CSV</li>
                  <li>• Dividendos y Ventas</li>
                  <li>• Modelo 100 Hacienda</li>
                  <li>• Todas las Casillas Oficiales</li>
                </ul>
              </div>
              
              {/* Legal */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200">Información</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Cumplimiento Normativa</li>
                  <li>• Privacidad de Datos</li>
                  <li>• Términos de Uso</li>
                  <li>• Política de Seguridad</li>
                </ul>
              </div>
            </div>
            
            {/* Bottom section */}
            <div className="border-t border-slate-800 mt-8 pt-8">
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  © 2024 Fiscal Wizard. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
};

export default App;