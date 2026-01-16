import React from 'react';

export default function Header() {
  return (
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
  );
}