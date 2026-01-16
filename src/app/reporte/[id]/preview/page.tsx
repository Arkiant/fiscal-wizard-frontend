import React from 'react';
import { notFound } from 'next/navigation';
import ReportPreviewClient from './ReportPreviewClient';

interface ReportPreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPreviewPage({ params }: ReportPreviewPageProps) {
  const { id: reportId } = await params;

  if (!reportId) {
    notFound();
  }

  // For now, we'll fetch the HTML content on the client side
  // In a production app, you might want to pre-render or use ISR

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
                Vista previa del informe fiscal generado
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-6 py-12">
        <ReportPreviewClient reportId={reportId} />
      </div>

      {/* Professional Footer */}
      <footer className="mt-20 text-white w-full" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'}}>
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
}