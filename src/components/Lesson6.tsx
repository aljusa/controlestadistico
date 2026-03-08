import React, { useState,  } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ComposedChart
} from 'recharts';

// --- Types & Interfaces ---

interface ContentItem {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  visualType: 'tree' | 'stable' | 'control' | 'out-of-control' | 'causes' | 'summary';
}

interface DiagramRenderProps {
  type: ContentItem['visualType'];
}

// --- Data Layer ---

const LESSON_DATA: ContentItem[] = [
  {
    id: 'q11',
    tabLabel: 'Clasificación',
    title: 'Clasificación de la variación en los procesos',
    description: 'En el análisis estadístico de procesos, la variabilidad se clasifica en dos categorías principales: variación común (o natural) y variación especial (o asignable). Esta clasificación permite comprender si las diferencias observadas forman parte del comportamiento normal del proceso o si se originan por causas específicas que deben investigarse.',
    visualType: 'tree'
  },
  {
    id: 'q12',
    tabLabel: 'Variación Común',
    title: 'Variación común o natural',
    description: 'La variación común corresponde a las pequeñas fluctuaciones que ocurren cuando el proceso funciona de manera estable. Estas variaciones son el resultado de múltiples causas pequeñas que actúan simultáneamente dentro del sistema productivo.',
    visualType: 'stable'
  },
  {
    id: 'q13',
    tabLabel: 'Bajo Control',
    title: 'Proceso bajo control estadístico',
    description: 'Cuando un proceso presenta únicamente variación común, se considera que está bajo control estadístico. Esto significa que su comportamiento es estable y predecible dentro de ciertos límites, ya que no existen causas externas que alteren su funcionamiento normal.',
    visualType: 'control'
  },
  {
    id: 'q14',
    tabLabel: 'Variación Especial',
    title: 'Variación especial o asignable',
    description: 'La variación especial se produce cuando una causa específica altera el comportamiento normal del proceso. Este tipo de variación genera cambios inusuales en los resultados y suele indicar la presencia de un problema que debe investigarse.',
    visualType: 'out-of-control'
  },
  {
    id: 'q15',
    tabLabel: 'Causas Especiales',
    title: 'Ejemplos de causas de variación especial',
    description: 'Las variaciones especiales pueden originarse por diferentes situaciones específicas dentro del proceso, como fallas en la maquinaria, errores operativos, cambios bruscos en la materia prima o ajustes incorrectos en los parámetros del proceso. Estas causas provocan desviaciones significativas.',
    visualType: 'causes'
  },
  {
    id: 'q16',
    tabLabel: 'Importancia',
    title: 'Importancia del análisis de la variabilidad',
    description: 'Analizar la variabilidad permite comprender cómo se comporta un proceso a lo largo del tiempo. Mediante herramientas estadísticas es posible distinguir entre la variación natural y las variaciones anormales. Esta distinción permite tomar decisiones informadas para mantener la estabilidad del proceso.',
    visualType: 'summary'
  }
];

// --- Mock Data Generators for Charts ---

const generateStableData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i + 1,
    value: 50 + (Math.sin(i) * 3) + (Math.random() * 4 - 2)
  }));
};

const generateOutlierData = () => {
  const data = generateStableData();
  data[14].value = 75; // Outlier - Special cause
  return data;
};

const STABLE_DATA = generateStableData();
const OUTLIER_DATA = generateOutlierData();

// --- Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`grid bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

// Specific Diagram Components to keep modularity
const DiagramTree = () => (
  <div className="grid grid-rows-[auto_auto_auto] gap-8 place-items-center w-full h-full p-8 text-sm font-medium">
    <div className="grid place-items-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md z-10 w-48 text-center">
      Variabilidad del Proceso
    </div>
    <div className="grid grid-cols-2 gap-[12rem] w-full relative place-items-center">
      {/* SVG Connecting Lines using Absolute Grid Overlay */}
      <svg className="absolute top-[-2rem] w-full h-[4rem] z-0 pointer-events-none">
        <path d="M 50% 0 L 50% 20 L 25% 20 L 25% 100" stroke="#cbd5e1" strokeWidth="2" fill="none" />
        <path d="M 50% 0 L 50% 20 L 75% 20 L 75% 100" stroke="#cbd5e1" strokeWidth="2" fill="none" />
      </svg>
      <div className="grid place-items-center bg-emerald-100 text-emerald-800 border-2 border-emerald-500 px-4 py-3 rounded-lg shadow-sm z-10 w-48 text-center">
        Variación Común <br/><span className="text-xs font-normal">(Natural / Estable)</span>
      </div>
      <div className="grid place-items-center bg-rose-100 text-rose-800 border-2 border-rose-500 px-4 py-3 rounded-lg shadow-sm z-10 w-48 text-center">
        Variación Especial <br/><span className="text-xs font-normal">(Asignable / Anormal)</span>
      </div>
    </div>
  </div>
);

const DiagramCauses = () => (
  <div className="grid grid-cols-[1fr_auto_1fr] gap-4 place-items-center w-full h-full p-4">
    <div className="grid grid-rows-4 gap-4 w-full place-items-end">
      {['Falla de Máquina', 'Error Operativo', 'Cambio de Material', 'Ajuste Incorrecto'].map((cause, i) => (
        <div key={i} className="grid place-items-center bg-amber-100 text-amber-900 border border-amber-300 px-4 py-2 rounded shadow-sm text-sm w-48">
          {cause}
        </div>
      ))}
    </div>
    <div className="grid place-items-center h-full">
      <svg width="60" height="200" className="pointer-events-none">
        <path d="M 0 25 L 60 100" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <path d="M 0 75 L 60 100" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <path d="M 0 125 L 60 100" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <path d="M 0 175 L 60 100" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    </div>
    <div className="grid place-items-center w-full place-items-start">
      <div className="grid place-items-center bg-rose-600 text-white px-6 py-4 rounded-full shadow-lg text-center w-32 h-32">
        <span className="font-bold">Variación<br/>Especial</span>
      </div>
    </div>
  </div>
);

const DiagramSummary = () => (
  <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full p-4">
    <div className="grid grid-rows-[auto_1fr] gap-2 bg-emerald-50 p-4 border border-emerald-200 rounded-lg">
      <h3 className="text-emerald-800 font-bold text-sm text-center">Estado: Controlado</h3>
      <div className="grid place-items-center h-full w-full">
         <ResponsiveContainer width="100%" height="100%">
            <LineChart data={STABLE_DATA.slice(0, 10)}>
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
         </ResponsiveContainer>
      </div>
    </div>
    <div className="grid grid-rows-[auto_1fr] gap-2 bg-rose-50 p-4 border border-rose-200 rounded-lg">
      <h3 className="text-rose-800 font-bold text-sm text-center">Estado: Alerta</h3>
      <div className="grid place-items-center h-full w-full">
         <ResponsiveContainer width="100%" height="100%">
            <LineChart data={OUTLIER_DATA.slice(10, 20)}>
              <Line type="monotone" dataKey="value" stroke="#e11d48" strokeWidth={2} dot={false} />
              <ReferenceLine y={65} stroke="#ef4444" strokeDasharray="3 3" />
            </LineChart>
         </ResponsiveContainer>
      </div>
    </div>
    <div className="grid col-span-2 place-items-center bg-slate-800 text-white p-4 rounded-lg">
      <p className="text-center text-sm">
        <span className="font-bold text-amber-400">Decisión Informada:</span> El monitoreo estadístico permite intervenir 
        <br/> únicamente cuando existe evidencia de causas especiales, evitando el sobreajuste.
      </p>
    </div>
  </div>
);


const DiagramRender: React.FC<DiagramRenderProps> = ({ type }) => {
  // Common Recharts Config
  const yAxisDomain = [30, 80];
  const ucl = 60; // Upper Control Limit
  const lcl = 40; // Lower Control Limit
  const mean = 50;

  switch (type) {
    case 'tree':
      return <DiagramTree />;
      
    case 'stable':
      return (
        <div className="grid place-items-center w-full h-[400px] p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={STABLE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12}} stroke="#64748b" />
              <YAxis domain={yAxisDomain} tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <ReferenceLine y={mean} stroke="#94a3b8" strokeDasharray="5 5" label={{ position: 'insideTopLeft', value: 'Media', fill: '#64748b', fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'control':
      return (
        <div className="grid place-items-center w-full h-[400px] p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={STABLE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12}} stroke="#64748b" />
              <YAxis domain={yAxisDomain} tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip />
              <ReferenceLine y={ucl} stroke="#10b981" strokeWidth={2} label={{ position: 'insideTopRight', value: 'Límite Superior', fill: '#10b981', fontSize: 12 }} />
              <ReferenceLine y={lcl} stroke="#10b981" strokeWidth={2} label={{ position: 'insideBottomRight', value: 'Límite Inferior', fill: '#10b981', fontSize: 12 }} />
              <ReferenceLine y={mean} stroke="#94a3b8" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={2} dot={{ r: 3, fill: '#0f172a' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'out-of-control':
      return (
        <div className="grid place-items-center w-full h-[400px] p-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={OUTLIER_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12}} stroke="#64748b" />
              <YAxis domain={yAxisDomain} tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip />
              <ReferenceLine y={ucl} stroke="#ef4444" strokeWidth={2} label={{ position: 'insideTopRight', value: 'Límite Superior', fill: '#ef4444', fontSize: 12 }} />
              <ReferenceLine y={lcl} stroke="#ef4444" strokeWidth={2} />
              <ReferenceLine y={mean} stroke="#94a3b8" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="value" stroke="#64748b" strokeWidth={2} dot={{ r: 3, fill: '#64748b' }} />
              {/* Highlight specific outliers */}
              <Scatter data={OUTLIER_DATA.filter(d => d.value > ucl || d.value < lcl)} fill="#dc2626" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      );

    case 'causes':
      return <DiagramCauses />;
      
    case 'summary':
      return <DiagramSummary />;

    default:
      return <div className="grid place-items-center h-full text-slate-400">Diagrama no disponible</div>;
  }
};

// --- Main Layout Component ---

const LessonLayout: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeContent = LESSON_DATA[activeTabIndex];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Header & Navigation Area */}
      <header className="grid gap-4 bg-white border-b border-slate-200 px-6 pt-6 pb-0  top-0 z-20 shadow-sm">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Control Estadístico de Procesos
          </h1>
    
        </div>
        
        {/* Strictly Tab-based Navigation via Grid */}
        <nav className="grid grid-flow-col auto-cols-max gap-1 overflow-x-auto no-scrollbar">
          {LESSON_DATA.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabIndex(index)}
              className={`grid place-items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTabIndex === index
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
              aria-selected={activeTabIndex === index}
              role="tab"
            >
              {tab.tabLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-start">
        
        {/* Left Panel: Description Container */}
        <div className="grid gap-6 lg:col-span-4 content-start">
          <Card className="p-6 grid gap-4">
            <h2 className="text-xl font-bold text-slate-800 leading-tight">
              {activeContent.title}
            </h2>
            <div className="grid gap-2 border-t border-slate-100 pt-4">
             
              <p className="text-slate-600 leading-relaxed text-sm">
                {activeContent.description}
              </p>
            </div>
          </Card>
        </div>

        {/* Right Panel: Visualization Render */}
        <div className="grid lg:col-span-8 content-start h-full">
          <Card className="grid grid-rows-[auto_1fr] min-h-[450px] h-full">
         
            <div className="grid relative bg-white">
              <DiagramRender type={activeContent.visualType} />
            </div>
          </Card>
        </div>

      </main>
    </div>
  );
};

export default LessonLayout;