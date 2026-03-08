import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Scatter
} from 'recharts';
import { Settings, CheckCircle, ArrowRight, Activity, AlertTriangle, Info } from 'lucide-react';

// --- Tipos e Interfaces ---
interface TabContent {
  id: string;
  title: string;
  description: string;
  renderComponent: React.ReactNode;
}

interface LessonLayoutProps {
  title: string;
  tabs: TabContent[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// --- Generación de Datos Simulados para Recharts ---
// Datos para proceso estable (variación controlada)
const generateStableData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    value: 48 + Math.random() * 4 // Valores entre 48 y 52 (Media 50)
  }));
};

// Datos para proceso inestable (un punto fuera de control)
const generateUnstableData = () => {
  const data = generateStableData();
  data[7].value = 62; // Causa especial, fuera del Límite Superior
  return data;
};

// Datos para proceso inestable errático (saltos bruscos)
const generateErraticData = () => {
  return [
    { id: 1, value: 50 }, { id: 2, value: 49 }, { id: 3, value: 51 },
    { id: 4, value: 65 }, { id: 5, value: 68 }, { id: 6, value: 64 }, // Salto hacia arriba
    { id: 7, value: 49 }, { id: 8, value: 50 }, { id: 9, value: 51 }, // Retorno
    { id: 10, value: 35 }, { id: 11, value: 32 }, { id: 12, value: 34 }, // Salto hacia abajo
    { id: 13, value: 48 }, { id: 14, value: 50 }, { id: 15, value: 49 },
  ];
};

// --- Componentes UI Base ---
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- Componentes de Visualización (Diagram Renders) ---

// Componente base para gráficos de control de calidad
const ControlChart = ({ data, lineColor = "#3b82f6", showOutliers = false }: { data: any[], lineColor?: string, showOutliers?: boolean }) => {
  // Encontramos puntos fuera de los límites de control (LCS: 58, LCI: 42)
  const outliers = data.filter(d => d.value > 58 || d.value < 42);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="id" label={{ value: 'Muestra / Tiempo', position: 'insideBottom', offset: -10 }} />
        <YAxis domain={[20, 80]} label={{ value: 'Variable de Control', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        
        {/* Límites de Control y Línea Central */}
        <ReferenceLine y={58} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'LCS (Límite Control Sup.)', position: 'top' }} />
        <ReferenceLine y={50} stroke="#10b981" label={{ value: 'LC (Línea Central)', position: 'insideTopLeft' }} />
        <ReferenceLine y={42} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'LCI (Límite Control Inf.)', position: 'bottom' }} />
        
        <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
        
        {showOutliers && outliers.length > 0 && (
          <Scatter data={outliers} fill="#ef4444" shape="triangle" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Diagrama conceptual para Quark 8
const AnalysisFlowDiagram = () => (
  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 p-12">
    <div className="grid place-items-center gap-4 p-8 border-2 border-green-500 bg-green-50 rounded-xl shadow-sm">
      <CheckCircle size={48} className="text-green-500" />
      <span className="text-lg font-bold text-green-800 text-center">Proceso Estable<br/><span className="text-sm font-normal text-green-600">(Comportamiento predecible)</span></span>
    </div>
    
    <div className="grid place-items-center">
      <ArrowRight size={48} className="text-slate-400" />
      <span className="text-sm font-medium text-slate-500 mt-2">Condición Necesaria</span>
    </div>
    
    <div className="grid place-items-center gap-4 p-8 border-2 border-blue-500 bg-blue-50 rounded-xl shadow-sm">
      <Activity size={48} className="text-blue-500" />
      <span className="text-lg font-bold text-blue-800 text-center">Análisis Confiable<br/><span className="text-sm font-normal text-blue-600">(Decisiones informadas)</span></span>
    </div>
  </div>
);

// Diagrama combinado para Quark 7 (Sistema Productivo + Gráfico)
const SystemStableDiagram = ({ data }: { data: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 items-stretch">
    <div className="grid grid-rows-[auto_1fr] border border-slate-200 bg-slate-50 rounded-lg p-6 gap-4">
      <div className="grid grid-cols-[auto_1fr] gap-3 items-center border-b border-slate-200 pb-4">
        <Settings className="text-slate-600 animate-[spin_4s_linear_infinite]" size={28} />
        <h3 className="font-semibold text-slate-800">Sistema Productivo</h3>
      </div>
      <div className="grid place-content-center gap-4">
        <div className="grid p-4 bg-white rounded-md border border-slate-200 text-center shadow-sm">
          <span className="text-sm font-medium text-slate-500">Entradas</span>
        </div>
        <div className="grid justify-center text-slate-400">↓</div>
        <div className="grid p-4 bg-emerald-100 rounded-md border border-emerald-300 text-center shadow-sm">
          <span className="font-bold text-emerald-800">Proceso Bajo Control</span>
        </div>
        <div className="grid justify-center text-slate-400">↓</div>
        <div className="grid p-4 bg-white rounded-md border border-slate-200 text-center shadow-sm">
          <span className="text-sm font-medium text-slate-500">Salidas Uniformes</span>
        </div>
      </div>
    </div>
    <div className="grid min-h-[400px]">
      <ControlChart data={data} lineColor="#10b981" />
    </div>
  </div>
);

// Cuadro de definición para Quark 9
const DefinitionBox = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-[auto_1fr] gap-4 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg mb-6">
    <Info className="text-amber-500" size={28} />
    <div className="grid content-center">
      <h4 className="font-bold text-amber-900 mb-1">Definición: Proceso Inestable</h4>
      <p className="text-amber-800 leading-relaxed">{children}</p>
    </div>
  </div>
);

// --- Contenido Principal (Quarks 6-10) ---

const useLessonData = () => {
  const stableData = useMemo(() => generateStableData(), []);
  const unstableData = useMemo(() => generateUnstableData(), []);
  const erraticData = useMemo(() => generateErraticData(), []);

  const tabs: TabContent[] = [
    {
      id: 'quark6',
      title: 'Variaciones Controladas',
      description: 'En un proceso estable, las diferencias entre los resultados del proceso se mantienen dentro de un rango esperado o controlado. Este rango refleja la variabilidad normal del sistema y permite identificar cuándo el proceso se comporta de forma adecuada.',
      renderComponent: <ControlChart data={stableData} />
    },
    {
      id: 'quark7',
      title: 'Reconocimiento de Estabilidad',
      description: 'Un proceso puede considerarse estable cuando sus resultados siguen un patrón consistente y no presentan señales de variación especial. En estas condiciones, el sistema productivo funciona de manera controlada y su desempeño puede evaluarse con confianza.',
      renderComponent: <SystemStableDiagram data={stableData} />
    },
    {
      id: 'quark8',
      title: 'Importancia del Análisis',
      description: 'La estabilidad del proceso es una condición necesaria para analizar el desempeño del sistema productivo. Si el proceso es estable, los datos obtenidos reflejan el comportamiento real del sistema y pueden utilizarse para tomar decisiones informadas.',
      renderComponent: <AnalysisFlowDiagram />
    },
    {
      id: 'quark9',
      title: 'Proceso Inestable',
      description: 'Visualización de un sistema que ha perdido su estabilidad debido a factores asignables.',
      renderComponent: (
        <div className="grid grid-rows-[auto_1fr] gap-4 w-full">
          <DefinitionBox>
            Un proceso inestable es aquel en el que aparecen variaciones causadas por <strong>factores especiales o asignables</strong> que alteran el comportamiento normal del sistema productivo.
          </DefinitionBox>
          <div className="grid w-full h-full relative">
            <div className="absolute top-4 right-8 bg-red-100 border border-red-300 text-red-700 px-3 py-1 rounded text-sm font-medium animate-pulse z-10 grid grid-flow-col gap-2 items-center">
              <AlertTriangle size={16} /> Causa Especial Detectada
            </div>
            <ControlChart data={unstableData} lineColor="#ef4444" showOutliers={true} />
          </div>
        </div>
      )
    },
    {
      id: 'quark10',
      title: 'Patrones Irregulares',
      description: 'Los procesos inestables suelen presentar cambios inesperados en sus resultados, patrones irregulares en la producción y dificultad para anticipar su comportamiento. Estas características indican que el sistema está siendo afectado por causas especiales de variación.',
      renderComponent: <ControlChart data={erraticData} lineColor="#f97316" />
    }
  ];

  return tabs;
};

// --- Componente de Estructura Principal ---

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTabId, onTabChange }) => {
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 font-sans">
      {/* Header: Title & Nav */}
      <header className="grid grid-rows-[auto_auto] bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="grid px-8 py-5">
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{title}</h1>
        </div>
        
        {/* Navigation Tabs (CSS Grid only, auto-cols) */}
        <nav className="grid grid-flow-col auto-cols-fr border-t border-slate-100 bg-slate-50 px-4">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`grid items-center justify-center py-4 px-2 text-sm font-semibold transition-all border-b-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset
                  ${isActive 
                    ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                  }`}
              >
                {tab.title}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid p-8 gap-6 content-start max-w-7xl w-full mx-auto">
        <Card className="grid p-8 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Diagram Title & Description */}
          <header className="grid gap-3 border-b border-slate-100 pb-6">
            <h2 className="text-3xl font-bold text-slate-900">{activeTab.title}</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
              {activeTab.description}
            </p>
          </header>

          {/* Diagram Render Container */}
          <section className="grid min-h-[450px] p-6 bg-slate-50 border border-slate-200 rounded-xl place-items-center">
             {activeTab.renderComponent}
          </section>

        </Card>
      </main>
    </div>
  );
};

// --- Aplicación Principal ---

export default function App() {
  const tabs = useLessonData();
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);

  return (
    <LessonLayout 
      title="Análisis y Estabilidad de Procesos Industriales"
      tabs={tabs}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
    />
  );
}