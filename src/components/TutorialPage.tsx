import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface TutorialPageProps {
  onBack: () => void;
}

export default function TutorialPage({ onBack }: TutorialPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-sm">Volver al Upload</span>
            </button>
          </div>
          
          <div className="text-center mt-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Tutorial Interactive Brokers
            </h1>
            <p className="text-lg text-slate-100 max-w-2xl mx-auto">
              Aprende a generar el CSV fiscal desde Interactive Brokers usando Consultas Flex
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Paso 1 */}
          <div className="card bg-white p-6 md:p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                  Acceder a Consultas Flex
                </h2>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-slate-700">Ve a <strong>Rendimiento e Informes</strong></span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-slate-700">Selecciona <strong>Consultas Flex</strong></span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-slate-700">Pulsa en <strong>"Crear"</strong> en la sección <strong>"Consulta Flex de Actividad"</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="card bg-white p-6 md:p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                  Configurar Operaciones
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Activar estos campos:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Currency',
                        'Asset Class', 
                        'Symbol',
                        'ISIN',
                        'Date/Time',
                        'Trade Date',
                        'Transaction Type',
                        'Quantity',
                        'TradePrice',
                        'IB Commission',
                        'IB Commission Currency'
                      ].map(field => (
                        <div key={field} className="flex items-center space-x-2 bg-slate-50 rounded-lg p-3">
                          <span className="text-green-600">✓</span>
                          <span className="text-slate-700 text-sm">{field}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">En Opciones:</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">✓</span>
                      <span className="text-blue-800"><strong>Ejecución</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="card bg-white p-6 md:p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                  Configurar Transacciones en Efectivo
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Activar estos campos:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Currency',
                        'Symbol',
                        'Description', 
                        'Date/Time',
                        'Amount',
                        'Type'
                      ].map(field => (
                        <div key={field} className="flex items-center space-x-2 bg-slate-50 rounded-lg p-3">
                          <span className="text-green-600">✓</span>
                          <span className="text-slate-700 text-sm">{field}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-3">En Opciones:</h3>
                    <div className="space-y-2">
                      {[
                        'Dividendos',
                        'Retención de impuestos',
                        'Retención 871(m)',
                        'Detalle'
                      ].map(option => (
                        <div key={option} className="flex items-center space-x-2">
                          <span className="text-purple-600">✓</span>
                          <span className="text-purple-800"><strong>{option}</strong></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paso 4 */}
          <div className="card bg-white p-6 md:p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                  Generar y Descargar CSV
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-600 mt-0.5">•</span>
                    <span className="text-slate-700"><strong>Guarda la configuración</strong> para uso futuro</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-600 mt-0.5">•</span>
                    <span className="text-slate-700"><strong>Ejecuta la consulta</strong> para generar los datos</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-600 mt-0.5">•</span>
                    <span className="text-slate-700"><strong>Descarga en formato CSV</strong> usando el botón de exportación</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-600 mt-0.5">•</span>
                    <span className="text-slate-700"><strong>Usa este archivo</strong> en Fiscal Wizard para tu cálculo IRPF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips adicionales */}
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center">
              <span className="mr-2">💡</span>
              Tips Adicionales
            </h3>
            <div className="space-y-2 text-sm text-amber-800">
              <p>• Nombra tu consulta como "Consulta Fiscal IRPF" para identificarla fácilmente</p>
              <p>• Verifica que todas las operaciones del año fiscal estén incluidas</p>
              <p>• Guarda una copia del CSV original como respaldo</p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <button
            onClick={onBack}
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Volver al Upload
          </button>
        </div>
      </footer>
    </div>
  );
}