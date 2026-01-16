import React from 'react';
import Tooltip from './Tooltip';

interface StepItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  isCompleted: boolean;
  tooltipText?: string;
}

export default function StepItem({ 
  icon, 
  text, 
  isActive, 
  isCompleted,
  tooltipText = text 
}: StepItemProps) {
  
  // Define color states
  const colors = {
    inactive: 'bg-slate-100 text-slate-400 border-slate-300',
    active: 'bg-blue-600 text-white border-blue-600',
    completed: 'bg-green-600 text-white border-green-600'
  };

  const status = isActive ? 'active' : (isCompleted ? 'completed' : 'inactive');
  const colorClass = colors[status];

  return (
    <>
      {/* Step Item with Icon and optional text */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* Icon Container */}
          <Tooltip text={tooltipText} duration={3000}>
            <div
              className={`
                w-12 h-12 rounded-full border-2 flex items-center justify-center
                transition-all duration-200
                ${colorClass}
              `}
              >
              <div className="w-6 h-6 flex items-center justify-center">
                {icon}
              </div>
            </div>
          </Tooltip>

          {/* Progress indicator dot for active state */}
          {isActive && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Text: Desktop only */}
        <span className="hidden md:block text-sm font-medium mt-2 text-center text-slate-600">
          {text}
        </span>
      </div>
    </>
  );
}