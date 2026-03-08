import React, { useState } from 'react';

// --- DEFINICIÓN DE TIPOS ---

interface LessonData {
  id: string;
  title: string;
  type: string;
  concept: string;
  visualHint: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  lessons: LessonData[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  children: React.ReactNode;
}

interface DiagramRenderProps {
  lessonId: string;
}

// --- DATOS DE LA LECCIÓN ---

const LESSONS_DATA: LessonData[] = [
  {
    id: 'quark-6',
    title: 'Detección de causas especiales',
    type: 'Q-con',
    concept: 'Los gráficos de control permiten detectar la presencia de causas especiales de variación. Cuando los datos muestran comportamientos inusuales, estos pueden indicar que el proceso está siendo afectado por factores que alteran su funcionamiento normal.',
    visualHint: 'Un gráfico donde un punto aparece fuera del patrón normal del proceso, acompañado de un indicador que señala la presencia de una posible causa especial.'
  },
  {
    id: 'quark-7',
    title: 'Estado de control del proceso',
    type: 'Q-con',
    concept: 'Mediante el análisis de los datos en un gráfico de control, es posible determinar si el proceso se encuentra bajo control estadístico o si presenta señales de inestabilidad. Esto permite evaluar el estado del sistema productivo.',
    visualHint: 'Un esquema conceptual donde un gráfico de control conduce a dos posibles interpretaciones: proceso bajo control o proceso fuera de control.'
  },
  {
    id: 'quark-8',
    title: 'Elementos fundamentales',
    type: 'Q-con',
    concept: 'Los gráficos de control están compuestos por varios elementos que permiten interpretar el comportamiento del proceso. Entre los más importantes se encuentran la línea central, el límite superior de control y el límite inferior de control.',
    visualHint: 'Un diagrama de un gráfico de control donde se señalan sus tres componentes principales mediante etiquetas explicativas.'
  },
  {
    id: 'quark-9',
    title: 'Línea central',
    type: 'Q-def',
    concept: 'La línea central representa el valor promedio del proceso. Este valor indica el nivel medio alrededor del cual fluctúan los resultados obtenidos durante la operación del sistema productivo.',
    visualHint: 'Una caja de definición con el término “Línea central”, acompañada de un gráfico donde una línea horizontal atraviesa el centro de la distribución de los datos.'
  },
  {
    id: 'quark-10',
    title: 'Límite superior de control (LSC)',
    type: 'Q-def',
    concept: 'El límite superior de control (LSC) representa el límite máximo esperado para la variación normal del proceso. Cuando un valor del proceso se aproxima o supera este límite, puede indicar la presencia de una variación anormal.',
    visualHint: 'Un gráfico conceptual donde una línea superior marca el límite máximo esperado para los datos del proceso.'
  }
];

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid border border-slate-200 bg-white rounded-xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
};

// Componente DiagramRender: Genera los SVGs específicos basados en CSS Grid
const DiagramRender: React.FC<DiagramRenderProps> = ({ lessonId }) => {
  // Base SVG para reutilizar estructura
  const BaseChart = ({ children }: { children: React.ReactNode }) => (
    <div className="grid w-full place-items-center p-4 bg-slate-50 border border-slate-100 rounded-lg">
      <svg viewBox="0 0 500 300" className="w-full max-w-2xl h-auto font-sans">
        {/* Grid lines */}
        <line x1="50" y1="50" x2="450" y2="50" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="50" y1="150" x2="450" y2="150" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="250" x2="450" y2="250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Axes */}
        <line x1="50" y1="20" x2="50" y2="280" stroke="#475569" strokeWidth="2" />
        <line x1="30" y1="250" x2="470" y2="250" stroke="#475569" strokeWidth="2" />
        
        {children}
      </svg>
    </div>
  );

  switch (lessonId) {
    case 'quark-6':
      return (
        <BaseChart>
          <path d="M 80 160 L 130 140 L 180 170 L 230 40 L 280 150 L 330 130 L 380 160 L 430 140" fill="none" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="80" cy="160" r="5" fill="#3b82f6" />
          <circle cx="130" cy="140" r="5" fill="#3b82f6" />
          <circle cx="180" cy="170" r="5" fill="#3b82f6" />
          
          {/* Out of control point */}
          <circle cx="230" cy="40" r="7" fill="#ef4444" />
          <circle cx="230" cy="40" r="14" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
          <text x="245" y="35" fill="#ef4444" fontSize="14" fontWeight="bold">Causa Especial</text>
          
          <circle cx="280" cy="150" r="5" fill="#3b82f6" />
          <circle cx="330" cy="130" r="5" fill="#3b82f6" />
          <circle cx="380" cy="160" r="5" fill="#3b82f6" />
          <circle cx="430" cy="140" r="5" fill="#3b82f6" />
        </BaseChart>
      );
    
    case 'quark-7':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="grid grid-rows-[auto_1fr] border border-emerald-200 bg-emerald-50 rounded-lg p-4 place-items-center text-center gap-2">
            <span className="font-bold text-emerald-700">Proceso Bajo Control</span>
            <svg viewBox="0 0 200 120" className="w-full h-auto">
              <line x1="20" y1="30" x2="180" y2="30" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="20" y1="60" x2="180" y2="60" stroke="#34d399" strokeWidth="2" />
              <line x1="20" y1="90" x2="180" y2="90" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="4,4" />
              <path d="M 30 65 L 60 55 L 90 70 L 120 50 L 150 65 L 170 55" fill="none" stroke="#059669" strokeWidth="2" />
            </svg>
          </div>
          <div className="grid grid-rows-[auto_1fr] border border-rose-200 bg-rose-50 rounded-lg p-4 place-items-center text-center gap-2">
            <span className="font-bold text-rose-700">Proceso Fuera de Control</span>
            <svg viewBox="0 0 200 120" className="w-full h-auto">
              <line x1="20" y1="30" x2="180" y2="30" stroke="#fecdd3" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="20" y1="60" x2="180" y2="60" stroke="#fb7185" strokeWidth="2" />
              <line x1="20" y1="90" x2="180" y2="90" stroke="#fecdd3" strokeWidth="2" strokeDasharray="4,4" />
              <path d="M 30 65 L 60 20 L 90 100 L 120 50 L 150 15 L 170 85" fill="none" stroke="#e11d48" strokeWidth="2" />
              <circle cx="60" cy="20" r="4" fill="#e11d48" />
              <circle cx="90" cy="100" r="4" fill="#e11d48" />
              <circle cx="150" cy="15" r="4" fill="#e11d48" />
            </svg>
          </div>
        </div>
      );

    case 'quark-8':
      return (
        <BaseChart>
          <path d="M 80 160 L 150 130 L 220 170 L 290 140 L 360 150 L 430 120" fill="none" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Labels */}
          <rect x="350" y="38" width="130" height="24" rx="4" fill="#ef4444" opacity="0.9" />
          <text x="415" y="55" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Límite Superior (LSC)</text>
          
          <rect x="350" y="138" width="130" height="24" rx="4" fill="#10b981" opacity="0.9" />
          <text x="415" y="155" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Línea Central (LC)</text>
          
          <rect x="350" y="238" width="130" height="24" rx="4" fill="#3b82f6" opacity="0.9" />
          <text x="415" y="255" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Límite Inferior (LIC)</text>
        </BaseChart>
      );

    case 'quark-9':
      return (
        <div className="grid grid-cols-1 gap-6 w-full">
          <div className="grid grid-cols-[auto_1fr] gap-4 bg-emerald-50 border border-emerald-200 p-4 rounded-lg items-start">
             <div className="grid place-items-center bg-emerald-500 text-white font-bold px-3 py-1 rounded">Definición</div>
             <p className="text-emerald-900 text-sm"><strong>Línea Central:</strong> Representa el promedio histórico o valor nominal del proceso.</p>
          </div>
          <BaseChart>
            <path d="M 80 160 L 150 130 L 220 170 L 290 140 L 360 150 L 430 120" fill="none" stroke="#e2e8f0" strokeWidth="2" />
            
            {/* Highlighted Center Line */}
            <rect x="50" y="146" width="400" height="8" fill="#10b981" opacity="0.2" />
            <line x1="50" y1="150" x2="450" y2="150" stroke="#10b981" strokeWidth="4" />
            <text x="250" y="140" fill="#047857" fontSize="16" fontWeight="bold" textAnchor="middle">Promedio (Nivel Medio)</text>
          </BaseChart>
        </div>
      );

    case 'quark-10':
      return (
        <BaseChart>
          <path d="M 80 160 L 150 130 L 220 170 L 290 140 L 360 150 L 430 120" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          
          {/* Highlighted Upper Line */}
          <rect x="50" y="46" width="400" height="8" fill="#ef4444" opacity="0.2" />
          <line x1="50" y1="50" x2="450" y2="50" stroke="#ef4444" strokeWidth="4" strokeDasharray="5,5" />
          
          {/* Warning Area */}
          <rect x="50" y="0" width="400" height="46" fill="#fef2f2" opacity="0.6" />
          <text x="250" y="35" fill="#b91c1c" fontSize="14" fontWeight="bold" textAnchor="middle">Zona de Variación Anormal (Fuera de Control)</text>
          <text x="250" y="65" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">Límite Máximo Esperado (LSC)</text>
        </BaseChart>
      );

    default:
      return <div>Visual no disponible</div>;
  }
};

// Componente Layout Principal
const LessonLayout: React.FC<LessonLayoutProps> = ({ title, lessons, activeTab, setActiveTab, children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 font-sans">
      
      {/* Header & Nav Section */}
      <header className="grid grid-rows-[auto_auto] gap-6 bg-slate-900 px-6 py-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
          <div className="grid gap-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
          <div className="grid place-items-center bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <span className="text-xs font-mono text-emerald-400">ESTADO: ACTIVO</span>
          </div>
        </div>
        
        {/* Navigation Tabs (CSS Grid only, no flex) */}
        <nav className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full">
          {lessons.map((lesson, index) => {
            const isActive = activeTab === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveTab(lesson.id)}
                className={`grid grid-cols-1 place-items-center text-center p-3 text-sm font-medium rounded-t-lg transition-all duration-200 border-b-4 
                  ${isActive 
                    ? 'bg-white text-slate-900 border-blue-600' 
                    : 'bg-slate-800 text-slate-300 border-transparent hover:bg-slate-700 hover:text-white'
                  }`}
              >
                <span>{`${index + 6}`}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid grid-cols-1 place-items-start p-6 md:p-10 w-full max-w-6xl mx-auto">
        {children}
      </main>
      
    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(LESSONS_DATA[0].id);

  const activeLesson = LESSONS_DATA.find(l => l.id === activeTab) || LESSONS_DATA[0];

  return (
    <LessonLayout 
      title="Gráficos de Control"
      lessons={LESSONS_DATA}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {/* Panel Activo */}
      <div className="grid grid-cols-1 gap-6 w-full animate-in fade-in duration-500 slide-in-from-bottom-4">
        
        <Card className="grid grid-cols-1 gap-6 border-t-4 border-t-blue-600">
          
          <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
              
               <h2 className="text-2xl font-bold text-slate-800">{activeLesson.title}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 bg-slate-50 p-5 rounded-lg border border-slate-100">
            <p className="text-slate-700 leading-relaxed text-lg">
              {activeLesson.concept}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-2">
            
            {/* Componente de Representación del Diagrama */}
            <DiagramRender lessonId={activeLesson.id} />
            
            <p className="text-sm text-slate-500 italic border-l-2 border-slate-300 pl-3 mt-2">
              {activeLesson.visualHint}
            </p>
          </div>

        </Card>
      </div>
    </LessonLayout>
  );
}