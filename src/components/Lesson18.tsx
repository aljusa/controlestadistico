import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ReferenceLine, ResponsiveContainer, 
} from 'recharts';
import { 
  AlertTriangle, ArrowRight, Search, Wrench, CheckCircle, TrendingUp, Shuffle, AlertCircle, Activity
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface LessonContent {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  renderType: 'chart-q11' | 'diagram-q12' | 'flow-q13' | 'compare-q14' | 'table-q15' | 'map-q16';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LayoutProps {
  title: string;
  lessons: LessonContent[];
}

// ==========================================
// DATA: QUARKS 11 - 16
// ==========================================

const LESSON_DATA: LessonContent[] = [
  {
    id: 'q11',
    tabLabel: '1. Variación Especial',
    title: 'Impacto de la variación especial en la estabilidad',
    description: 'La presencia de variación especial rompe la estabilidad del proceso. Cuando aparecen causas asignables, el comportamiento del sistema deja de ser predecible y se vuelve necesario investigar el origen del problema.',
    renderType: 'chart-q11',
  },
  {
    id: 'q12',
    tabLabel: '2. Investigación',
    title: 'Necesidad de investigar procesos inestables',
    description: 'Cuando un proceso es inestable, el primer paso consiste en investigar las causas especiales que generan las variaciones. Identificar estas causas permite comprender qué factores están afectando el desempeño del sistema.',
    renderType: 'diagram-q12',
  },
  {
    id: 'q13',
    tabLabel: '3. Eliminación',
    title: 'Eliminación de causas de inestabilidad',
    description: 'Para recuperar la estabilidad del proceso, es necesario identificar y eliminar las causas especiales de variación. Este procedimiento generalmente sigue una secuencia de análisis, diagnóstico y corrección del problema dentro del sistema productivo.',
    renderType: 'flow-q13',
  },
  {
    id: 'q14',
    tabLabel: '4. Estabilidad y Mejora',
    title: 'Relación entre estabilidad y mejora del proceso',
    description: 'La mejora del proceso solo puede realizarse de manera efectiva cuando el sistema se encuentra estable. Si el proceso aún presenta variaciones especiales, cualquier intento de mejora puede producir resultados inconsistentes o difíciles de interpretar.',
    renderType: 'compare-q14',
  },
  {
    id: 'q15',
    tabLabel: '5. Estable vs Inestable',
    title: 'Diferencia entre proceso estable e inestable',
    description: 'Un proceso estable presenta únicamente variación común y mantiene un comportamiento consistente en el tiempo. En cambio, un proceso inestable presenta variaciones especiales que generan cambios irregulares en su comportamiento.',
    renderType: 'table-q15',
  },
  {
    id: 'q16',
    tabLabel: '6. Síntesis',
    title: 'Síntesis del papel de la estabilidad en el control estadístico',
    description: 'La estabilidad del proceso es un requisito fundamental para el control estadístico de procesos. Cuando el sistema productivo es estable, es posible comprender su comportamiento, predecir sus resultados y aplicar mejoras de manera efectiva para optimizar su desempeño.',
    renderType: 'map-q16',
  }
];

// ==========================================
// SHARED UI COMPONENTS
// ==========================================

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid border border-slate-200 bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

// ==========================================
// VISUALIZATION COMPONENTS (DIAGRAM RENDERS)
// ==========================================

const RenderQ11Chart: React.FC = () => {
  const data = [
    { time: 'T1', value: 50 },
    { time: 'T2', value: 52 },
    { time: 'T3', value: 48 },
    { time: 'T4', value: 51 },
    { time: 'T5', value: 85 }, // Punto de variación especial
    { time: 'T6', value: 49 },
    { time: 'T7', value: 53 },
  ];

  return (
    <div className="grid grid-rows-[1fr_auto] h-80 w-full gap-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" />
          <YAxis domain={[30, 100]} stroke="#64748b" />
          <RechartsTooltip />
          <ReferenceLine y={65} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Límite Superior (LCS)', fill: '#ef4444', fontSize: 12 }} />
          <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'bottom', value: 'Límite Inferior (LCI)', fill: '#ef4444', fontSize: 12 }} />
          <ReferenceLine y={50} stroke="#10b981" label={{ position: 'top', value: 'Media', fill: '#10b981', fontSize: 12 }} />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
          {/* Highlight the special variation point */}
          <Line type="monotone" dataKey="value" stroke="none" dot={(props: any) => {
            if (props.payload.value > 65) {
              return <circle cx={props.cx} cy={props.cy} r={8} fill="#ef4444" stroke="#fca5a5" strokeWidth={4} key={`dot-${props.index}`} />;
            }
            return <g key={`dot-${props.index}`}></g>;
          }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-center text-sm font-medium text-slate-500 italic">
        * El punto rojo indica una causa especial que excede el Límite de Control Superior (LCS).
      </p>
    </div>
  );
};

const RenderQ12Diagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] gap-6 place-items-center h-full p-8 bg-slate-50 rounded-lg">
      <div className="grid place-items-center gap-3 p-6 bg-red-50 border-2 border-red-200 rounded-xl shadow-sm">
        <AlertTriangle className="text-red-500 w-12 h-12" />
        <span className="font-bold text-red-700 text-center">Punto<br/>Anormal</span>
      </div>
      
      <div className="grid grid-rows-3 gap-8 text-slate-400 hidden md:grid">
        <ArrowRight className="w-8 h-8 -rotate-45" />
        <ArrowRight className="w-8 h-8" />
        <ArrowRight className="w-8 h-8 rotate-45" />
      </div>

      <div className="grid grid-rows-3 gap-4 w-full max-w-md">
        <div className="grid grid-cols-[auto_1fr] gap-4 bg-white p-4 border border-slate-200 rounded-lg shadow-sm items-center hover:border-blue-300 transition-colors cursor-pointer">
          <Search className="text-blue-500 w-6 h-6" />
          <span className="font-medium text-slate-700">Falla de maquinaria / Equipo</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4 bg-white p-4 border border-slate-200 rounded-lg shadow-sm items-center hover:border-blue-300 transition-colors cursor-pointer">
          <Search className="text-blue-500 w-6 h-6" />
          <span className="font-medium text-slate-700">Variación anormal en materia prima</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4 bg-white p-4 border border-slate-200 rounded-lg shadow-sm items-center hover:border-blue-300 transition-colors cursor-pointer">
          <Search className="text-blue-500 w-6 h-6" />
          <span className="font-medium text-slate-700">Error humano o de procedimiento</span>
        </div>
      </div>
    </div>
  );
};

const RenderQ13Flow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 place-items-center bg-slate-900 p-8 rounded-xl text-white">
      
      <div className="grid place-items-center gap-3 text-center">
        <div className="grid place-items-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500">
          <Activity className="text-red-400 w-8 h-8" />
        </div>
        <span className="font-semibold text-sm">1. Detectar<br/>Variación</span>
      </div>

      <ArrowRight className="text-slate-600 w-6 h-6 rotate-90 md:rotate-0" />

      <div className="grid place-items-center gap-3 text-center">
        <div className="grid place-items-center w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500">
          <Search className="text-blue-400 w-8 h-8" />
        </div>
        <span className="font-semibold text-sm">2. Identificar<br/>Causa</span>
      </div>

      <ArrowRight className="text-slate-600 w-6 h-6 rotate-90 md:rotate-0" />

      <div className="grid place-items-center gap-3 text-center">
        <div className="grid place-items-center w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500">
          <Wrench className="text-amber-400 w-8 h-8" />
        </div>
        <span className="font-semibold text-sm">3. Aplicar<br/>Corrección</span>
      </div>

      <ArrowRight className="text-slate-600 w-6 h-6 rotate-90 md:rotate-0" />

      <div className="grid place-items-center gap-3 text-center">
        <div className="grid place-items-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500">
          <CheckCircle className="text-emerald-400 w-8 h-8" />
        </div>
        <span className="font-semibold text-sm">4. Restablecer<br/>Estabilidad</span>
      </div>

    </div>
  );
};

const RenderQ14Compare: React.FC = () => {
  return (
    <div className="grid grid-rows-2 gap-6 h-full">
      {/* Proceso Inestable */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-6 bg-red-50 p-6 rounded-xl border border-red-100 place-items-center">
        <div className="grid place-items-center text-center gap-2">
          <AlertCircle className="text-red-500 w-10 h-10" />
          <span className="font-bold text-red-700">Proceso Inestable</span>
        </div>
        <ArrowRight className="text-red-300 w-8 h-8 hidden md:block" />
        <div className="grid grid-cols-[auto_1fr] gap-4 w-full bg-white p-4 rounded-lg border border-red-200 shadow-sm">
          <Shuffle className="text-slate-400 w-6 h-6" />
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Resultados Impredecibles</h4>
            <p className="text-xs text-slate-500 mt-1">Los intentos de mejora se diluyen en el ruido de la variación especial. Es imposible medir el impacto real.</p>
          </div>
        </div>
      </div>

      {/* Proceso Estable */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-6 bg-emerald-50 p-6 rounded-xl border border-emerald-100 place-items-center">
        <div className="grid place-items-center text-center gap-2">
          <CheckCircle className="text-emerald-500 w-10 h-10" />
          <span className="font-bold text-emerald-700">Proceso Estable</span>
        </div>
        <ArrowRight className="text-emerald-300 w-8 h-8 hidden md:block" />
        <div className="grid grid-cols-[auto_1fr] gap-4 w-full bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
          <TrendingUp className="text-blue-500 w-6 h-6" />
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Mejora Consistente</h4>
            <p className="text-xs text-slate-500 mt-1">El comportamiento base es conocido. Cualquier cambio implementado refleja un impacto real medible y sostenido.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderQ15Table: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
      
      {/* Header */}
      <div className="grid bg-slate-800 p-4 place-items-center">
        <h3 className="font-bold text-white text-lg">Proceso Estable</h3>
      </div>
      <div className="grid bg-slate-700 p-4 place-items-center">
        <h3 className="font-bold text-white text-lg">Proceso Inestable</h3>
      </div>

      {/* Row 1: Tipo de variación */}
      <div className="grid bg-white p-6 gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Variación</span>
        <span className="text-slate-800 font-medium">Únicamente variación común (aleatoria e inherente al sistema).</span>
      </div>
      <div className="grid bg-slate-50 p-6 gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Variación</span>
        <span className="text-slate-800 font-medium">Presencia de variaciones especiales (causas asignables o externas).</span>
      </div>

      {/* Row 2: Previsibilidad */}
      <div className="grid bg-white p-6 gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Previsibilidad</span>
        <span className="text-emerald-600 font-bold">Alto grado de previsibilidad.</span>
        <span className="text-sm text-slate-600">Su desempeño futuro se puede pronosticar estadísticamente.</span>
      </div>
      <div className="grid bg-slate-50 p-6 gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Previsibilidad</span>
        <span className="text-red-600 font-bold">Totalmente impredecible.</span>
        <span className="text-sm text-slate-600">Imposible determinar límites de desempeño sin eliminar la causa raíz.</span>
      </div>

      {/* Row 3: Acción requerida */}
      <div className="grid bg-white p-6 gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Acción Requerida</span>
        <span className="text-slate-800">Mantener, monitorizar y aplicar mejoras sistémicas.</span>
      </div>
      <div className="grid bg-slate-50 p-6 gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Acción Requerida</span>
        <span className="text-slate-800">Detener, investigar y corregir la causa especial inmediatamente.</span>
      </div>

    </div>
  );
};

const RenderQ16Map: React.FC = () => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] gap-8 place-items-center p-6 bg-slate-50 rounded-xl h-full">
      
      {/* Nodo Central */}
      <div className="grid bg-blue-600 text-white p-4 rounded-lg shadow-md border-2 border-blue-700 w-64 place-items-center z-10">
        <h2 className="font-bold text-lg text-center">Estabilidad del Proceso</h2>
        <span className="text-xs text-blue-200 uppercase tracking-widest mt-1">Requisito Fundamental</span>
      </div>

      {/* Conectores (Grid lines simulados) */}
      <div className="grid grid-cols-3 w-full max-w-2xl px-12 -my-6 h-8 z-0">
        <div className="grid place-items-start"><div className="w-1/2 h-full border-t-2 border-l-2 border-slate-300 rounded-tl-lg"></div></div>
        <div className="grid place-items-center"><div className="w-px h-full bg-slate-300"></div></div>
        <div className="grid place-items-end"><div className="w-1/2 h-full border-t-2 border-r-2 border-slate-300 rounded-tr-lg"></div></div>
      </div>

      {/* Nodos Derivados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl place-items-start">
        <div className="grid bg-white p-5 rounded-lg border border-slate-200 shadow-sm gap-3 place-items-center text-center w-full">
          <Activity className="text-blue-500 w-8 h-8" />
          <h3 className="font-bold text-slate-800">Comportamiento Predecible</h3>
          <p className="text-xs text-slate-500">Permite anticipar resultados y asegurar el cumplimiento de especificaciones.</p>
        </div>

        <div className="grid bg-white p-5 rounded-lg border border-slate-200 shadow-sm gap-3 place-items-center text-center w-full">
          <Search className="text-blue-500 w-8 h-8" />
          <h3 className="font-bold text-slate-800">Análisis Confiable</h3>
          <p className="text-xs text-slate-500">Establece una línea base sólida para cualquier cálculo de capacidad o métrica.</p>
        </div>

        <div className="grid bg-white p-5 rounded-lg border border-slate-200 shadow-sm gap-3 place-items-center text-center w-full">
          <TrendingUp className="text-blue-500 w-8 h-8" />
          <h3 className="font-bold text-slate-800">Mejora del Proceso</h3>
          <p className="text-xs text-slate-500">Garantiza que los cambios estructurales generen impactos reales y verificables.</p>
        </div>
      </div>

    </div>
  );
};

// ==========================================
// CORE LAYOUT COMPONENTS
// ==========================================

const DiagramRender: React.FC<{ type: LessonContent['renderType'] }> = ({ type }) => {
  switch (type) {
    case 'chart-q11': return <RenderQ11Chart />;
    case 'diagram-q12': return <RenderQ12Diagram />;
    case 'flow-q13': return <RenderQ13Flow />;
    case 'compare-q14': return <RenderQ14Compare />;
    case 'table-q15': return <RenderQ15Table />;
    case 'map-q16': return <RenderQ16Map />;
    default: return <div className="grid place-items-center h-64 text-slate-400">Diagrama no disponible</div>;
  }
};

const LessonLayout: React.FC<LayoutProps> = ({ title, lessons }) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const activeLesson = lessons[activeTabIndex];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 font-sans">
      
      {/* Header Section (Title & Nav) */}
      <header className="grid grid-rows-[auto_auto] bg-slate-900 text-white shadow-md">
        <div className="grid p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        </div>
        
        {/* Navigation Tabs (CSS Grid strictly used) */}
        <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-800 p-px">
          {lessons.map((lesson, index) => {
            const isActive = index === activeTabIndex;
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveTabIndex(index)}
                className={`grid place-items-center px-4 py-3 text-sm font-medium transition-colors outline-none
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-[inset_0_-4px_0_0_rgba(255,255,255,0.4)]' 
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                aria-selected={isActive}
                role="tab"
              >
                {lesson.tabLabel}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid p-4 md:p-8 place-items-start">
        <div className="grid w-full max-w-6xl mx-auto h-full">
          <Card className="grid grid-rows-[auto_1fr] h-full min-h-[600px]">
            
            {/* Diagram Title & Description */}
            <div className="grid grid-rows-[auto_auto] gap-4 p-8 border-b border-slate-100 bg-white">
              <h2 className="text-2xl font-bold text-slate-800">{activeLesson.title}</h2>
              <p className="text-slate-600 leading-relaxed max-w-4xl text-lg">
                {activeLesson.description}
              </p>
            </div>

            {/* Diagram Render Wrapper */}
            <div className="grid p-8 bg-slate-50/50 relative overflow-x-auto">
              <DiagramRender type={activeLesson.renderType} />
            </div>

          </Card>
        </div>
      </main>

    </div>
  );
};

// ==========================================
// MAIN ENTRY POINT
// ==========================================

export default function App() {
  return (
    <LessonLayout 
      title="Fundamentos de Estabilidad de Procesos" 
      lessons={LESSON_DATA} 
    />
  );
}