import React from 'react';
import {
  DocumentArrowUpIcon,
  CogIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import StepItem from './StepItem';

interface StepIndicatorProps {
  currentStep: 'upload' | 'loading' | 'report';
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  
  // Helper function to determine if step is completed
  const isStepCompleted = (step: string) => {
    const stepOrder = ['upload', 'loading', 'report'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(step);
    return stepIndex < currentIndex;
  };

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
        <div className="flex items-center justify-center space-x-4 md:space-x-12">
          
          {/* Step 1: Upload Document */}
          <StepItem
            icon={<DocumentArrowUpIcon />}
            text="Subir Documento"
            tooltipText="Subir documento CSV de Interactive Brokers"
            isActive={currentStep === 'upload'}
            isCompleted={isStepCompleted('upload')}
          />

          {/* Connector: Mobile (vertical) / Desktop (horizontal) */}
          <div className="hidden md:block w-16 h-0.5 bg-slate-300"></div>
          <div className="block md:hidden w-0.5 h-6 bg-slate-300"></div>

          {/* Step 2: Processing */}
          <StepItem
            icon={<CogIcon />}
            text="Procesamiento"
            tooltipText="Procesando datos fiscales automáticamente"
            isActive={currentStep === 'loading'}
            isCompleted={isStepCompleted('loading')}
          />

          {/* Connector: Mobile (vertical) / Desktop (horizontal) */}
          <div className="hidden md:block w-16 h-0.5 bg-slate-300"></div>
          <div className="block md:hidden w-0.5 h-6 bg-slate-300"></div>

          {/* Step 3: Report Generated */}
          <StepItem
            icon={<DocumentTextIcon />}
            text="Informe Fiscal"
            tooltipText="Informe fiscal detallado con casillas IRPF"
            isActive={currentStep === 'report'}
            isCompleted={isStepCompleted('report')}
          />

        </div>
      </div>
    </div>
  );
}