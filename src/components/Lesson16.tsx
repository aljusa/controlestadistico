import React, { useState } from 'react';

// --- Types & Interfaces ---

interface LessonSection {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  renderType: 'intro' | 'definition' | 'behavior' | 'variation' | 'predictability';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  children: React.ReactNode;
}

// --- Data (Quarks) ---

const lessonData: LessonSection[] = [
  {
    id: 'q1',
    tabLabel: '1. Introducción',
    title: 'Introducción a la estabilidad del proceso',
    description: 'En el control estadístico de procesos, uno de los conceptos fundamentales es la estabilidad del proceso. Antes de analizar o mejorar un sistema productivo, es necesario comprender si el proceso presenta un comportamiento consistente o si muestra irregularidades. La estabilidad permite interpretar correctamente la variabilidad y determinar si el proceso puede analizarse de forma confiable.',
    renderType: 'intro',
  },
  {
    id: 'q2',
    tabLabel: '2. Definición',
    title: 'Definición de estabilidad del proceso',
    description: 'La estabilidad del proceso se refiere a la condición en la cual el comportamiento del sistema productivo se mantiene consistente a lo largo del tiempo y las variaciones observadas se deben únicamente a causas comunes o naturales del proceso.',
    renderType: 'definition',
  },
  {
    id: 'q3',
    tabLabel: '3. Comportamiento',
    title: 'Estabilidad como comportamiento consistente en el tiempo',
    description: 'Un proceso estable presenta un comportamiento consistente a lo largo del tiempo. Esto significa que los resultados del proceso siguen un patrón relativamente uniforme, sin cambios abruptos o inesperados en su desempeño.',
    renderType: 'behavior',
  },
  {
    id: 'q4',
    tabLabel: '4. Variación Común',
    title: 'Relación entre estabilidad y variación común',
    description: 'Cuando un proceso es estable, las variaciones observadas en sus resultados se deben únicamente a variación común. Estas pequeñas fluctuaciones forman parte del funcionamiento normal del sistema productivo y no indican la presencia de problemas específicos.',
    renderType: 'variation',
  },
  {
    id: 'q5',
    tabLabel: '5. Previsibilidad',
    title: 'Previsibilidad del proceso estable',
    description: 'Una de las principales ventajas de un proceso estable es que su comportamiento es predecible. Debido a que solo intervienen causas comunes de variación, es posible estimar cómo se comportará el proceso en el futuro dentro de ciertos límites.',
    renderType: 'predictability',
  },
];

// --- Mock Data Generators for Charts ---

const generateStableData = (count: number, mean: number, variance: number) => {
  return Array.from({ length: count }, (_, i) => ({
    time: i + 1,
    value: mean + (Math.random() * variance * 2 - variance),
  }));
};

const baseData = generateStableData(20, 50, 8);
const projectedData = generateStableData(10, 50, 8).map((d, i) => ({ time: i + 21, value: d.value }));

// --- Components ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 shadow-sm rounded-lg p-6 grid ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-slate-50 text-slate-800 grid grid-rows-[auto_1fr] font-sans">
    {children}
  </div>
);

// --- Visualization Components (Diagram Render) ---

const ControlChart: React.FC<{ 
  showLimits?: boolean; 
  showProjection?: boolean; 
  highlightVariation?: boolean;
}> = ({ showLimits = false, showProjection = false, highlightVariation = false }) => {
  const width = 800;
  const height = 300;
  const padding = 40;
  
  const allData = showProjection ? [...baseData, ...projectedData] : baseData;
  const maxTime = showProjection ? 30 : 20;
  
  const scaleX = (val: number) => padding + ((val - 1) / (maxTime - 1)) * (width - padding * 2);
  const scaleY = (val: number) => height - padding - ((val - 20) / 60) * (height - padding * 2);

  const meanY = scaleY(50);
  const uclY = scaleY(65);
  const lclY = scaleY(35);

  const createPath = (data: {time: number, value: number}[]) => {
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.time)} ${scaleY(d.value)}`).join(' ');
  };

  return (
    <div className="grid place-items-center w-full overflow-x-auto">
      <svg width={width} height={height} className="bg-slate-50 border border-slate-200 rounded">
        {/* Grid lines */}
        <g stroke="#e2e8f0" strokeWidth="1">
          {[30, 40, 50, 60, 70].map(val => (
            <line key={`grid-${val}`} x1={padding} y1={scaleY(val)} x2={width - padding} y2={scaleY(val)} />
          ))}
        </g>

        {/* Limits & Mean */}
        <line x1={padding} y1={meanY} x2={width - padding} y2={meanY} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
        <text x={padding - 30} y={meanY + 4} fontSize="12" fill="#64748b">Media</text>

        {showLimits && (
          <>
            <line x1={padding} y1={uclY} x2={width - padding} y2={uclY} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x={padding - 35} y={uclY + 4} fontSize="12" fill="#ef4444">LCS</text>
            <line x1={padding} y1={lclY} x2={width - padding} y2={lclY} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x={padding - 35} y={lclY + 4} fontSize="12" fill="#ef4444">LCI</text>
          </>
        )}

        {/* Projection Area */}
        {showProjection && (
          <rect 
            x={scaleX(20.5)} 
            y={uclY} 
            width={scaleX(30) - scaleX(20.5)} 
            height={lclY - uclY} 
            fill="#bae6fd" 
            opacity="0.3" 
          />
        )}

        {/* Data Paths */}
        <path d={createPath(baseData)} fill="none" stroke="#2563eb" strokeWidth="2" />
        
        {showProjection && (
          <path d={createPath([{time: 20, value: baseData[19].value}, ...projectedData])} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4,4" />
        )}

        {/* Data Points */}
        {allData.map((d, i) => (
          <circle 
            key={i} 
            cx={scaleX(d.time)} 
            cy={scaleY(d.value)} 
            r="4" 
            fill={highlightVariation ? "#10b981" : (d.time > 20 ? "#0ea5e9" : "#1d4ed8")} 
          />
        ))}

        {/* Variation Highlight Arrows */}
        {highlightVariation && (
          <g stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow)">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>
            <line x1={scaleX(5)} y1={meanY} x2={scaleX(5)} y2={scaleY(baseData[4].value) + 5} />
            <line x1={scaleX(12)} y1={meanY} x2={scaleX(12)} y2={scaleY(baseData[11].value) - 5} />
          </g>
        )}
      </svg>
    </div>
  );
};

const DefinitionGraphic: React.FC = () => (
  <div className="grid grid-cols-[1fr_2fr] gap-6 items-start">
    <div className="grid bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r">
      <h3 className="font-bold text-blue-900 grid mb-2 text-lg">Estabilidad del Proceso</h3>
      <p className="text-blue-800 text-sm">
        Condición donde el comportamiento del sistema se mantiene consistente y las variaciones son por causas naturales.
      </p>
    </div>
    <div className="grid place-items-center">
      <ControlChart />
    </div>
  </div>
);

const DiagramRender: React.FC<{ type: LessonSection['renderType'] }> = ({ type }) => {
  return (
    <div className="grid grid-rows-[1fr] mt-6 border-t border-slate-200 pt-6">
      {type === 'intro' && (
        <div className="grid gap-4 place-items-center">
          <p className="text-sm text-slate-500 italic">Monitoreo continuo del proceso a lo largo del tiempo.</p>
          <ControlChart />
        </div>
      )}
      {type === 'definition' && <DefinitionGraphic />}
      {type === 'behavior' && (
        <div className="grid gap-4 place-items-center">
           <p className="text-sm text-slate-500 italic">Los puntos mantienen un patrón estable alrededor de la línea central.</p>
           <ControlChart />
        </div>
      )}
      {type === 'variation' && (
        <div className="grid gap-4 place-items-center">
           <p className="text-sm text-slate-500 italic">Fluctuaciones dentro de los límites de control (LCS y LCI) indicando variación común.</p>
           <ControlChart showLimits={true} highlightVariation={true} />
        </div>
      )}
      {type === 'predictability' && (
        <div className="grid gap-4 place-items-center">
           <p className="text-sm text-slate-500 italic">Proyección del comportamiento futuro basado en la estabilidad actual (zona sombreada).</p>
           <ControlChart showLimits={true} showProjection={true} />
        </div>
      )}
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeSection = lessonData[activeTabIndex];

  return (
    <LessonLayout>
      {/* HEADER (Title + Nav) */}
      <header className="grid grid-rows-[auto_auto] bg-slate-900 shadow-md">
        <div className="grid p-6 max-w-6xl w-full mx-auto">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Control Estadístico: Estabilidad del Proceso
          </h1>
        </div>
        
        {/* Navigation Tabs (CSS Grid strictly used) */}
        <nav className="grid grid-cols-2 md:grid-cols-5 bg-slate-800">
          {lessonData.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveTabIndex(index)}
              className={`grid place-items-center p-4 text-sm font-medium transition-colors border-b-4 ${
                activeTabIndex === index
                  ? 'bg-slate-700 text-white border-blue-500'
                  : 'text-slate-400 border-transparent hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {section.tabLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="grid place-items-start p-6 max-w-5xl w-full mx-auto">
        <Card className="grid grid-rows-[auto_auto_1fr] gap-4 w-full animate-fade-in">
          
          {/* Diagram Title */}
          <div className="grid">
            <h2 className="text-xl font-semibold text-slate-900">
              {activeSection.title}
            </h2>
          </div>

          {/* Diagram Description */}
          <div className="grid">
            <p className="text-slate-600 leading-relaxed text-base">
              {activeSection.description}
            </p>
          </div>

          {/* Diagram Render */}
          <DiagramRender type={activeSection.renderType} />

        </Card>
      </main>
      
      {/* Optional Styles for simple animations to enhance UX */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </LessonLayout>
  );
}