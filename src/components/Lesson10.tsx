import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,  Scatter,  ComposedChart 
} from 'recharts';
import { 
  Factory, Activity, Database, ArrowRight, Settings, User, FlaskConical, TrendingUp, AlertTriangle
} from 'lucide-react';

// --- Types & Interfaces ---

type VisualType = 'factory' | 'flowchart' | 'researcher' | 'control-chart' | 'variation-chart';

interface QuarkData {
  id: string;
  title: string;
  type: string;
  description: string;
  visualType: VisualType;
}

// --- Data ---

const lessonData: QuarkData[] = [
  {
    id: 'q1',
    title: 'Contexto histórico del control estadístico',
    type: 'Q-ctx',
    description: 'El control estadístico de la calidad surgió a comienzos del siglo XX como respuesta a los desafíos de la producción en masa. A medida que las industrias aumentaban su escala de producción, se hizo necesario desarrollar métodos que permitieran analizar la variabilidad de los procesos y asegurar que los productos cumplieran con estándares definidos. En este contexto, comenzaron a aplicarse herramientas estadísticas para comprender y controlar el comportamiento de los procesos productivos.',
    visualType: 'factory'
  },
  {
    id: 'q2',
    title: 'Origen del control estadístico de la calidad',
    type: 'Q-def',
    description: 'El control estadístico de la calidad es una disciplina que utiliza herramientas estadísticas para analizar, monitorear y mejorar el comportamiento de los procesos productivos. Su origen se remonta a los primeros estudios realizados en la industria manufacturera durante el siglo XX, cuando se buscaban métodos más eficientes para controlar la variabilidad de los procesos.',
    visualType: 'flowchart'
  },
  {
    id: 'q3',
    title: 'Aporte pionero de Walter A. Shewhart',
    type: 'Q-ctx',
    description: 'Uno de los principales pioneros del control estadístico de la calidad fue Walter A. Shewhart. Durante la década de 1920, mientras trabajaba en los Laboratorios Bell en Estados Unidos, desarrolló métodos estadísticos para analizar la variabilidad de los procesos productivos. Sus investigaciones sentaron las bases del control estadístico de procesos.',
    visualType: 'researcher'
  },
  {
    id: 'q4',
    title: 'Desarrollo de las gráficas de control',
    type: 'Q-def',
    description: 'Una de las contribuciones más importantes de Shewhart fue el desarrollo de las gráficas de control, herramientas estadísticas que permiten observar cómo cambia el comportamiento de un proceso a lo largo del tiempo. Estas gráficas ayudan a identificar patrones de variación y detectar posibles problemas en el proceso.',
    visualType: 'control-chart'
  },
  {
    id: 'q5',
    title: 'Distinción entre tipos de variación mediante gráficos',
    type: 'Q-con',
    description: 'Las gráficas de control permiten distinguir entre dos tipos de variación en los procesos: la variación natural del sistema y las variaciones causadas por problemas específicos. Esta distinción es fundamental para comprender cuándo un proceso funciona de manera estable y cuándo requiere intervención.',
    visualType: 'variation-chart'
  }
];

// --- Mock Data for Charts ---

const controlChartData = [
  { time: '08:00', value: 50.2 },
  { time: '09:00', value: 49.8 },
  { time: '10:00', value: 51.1 },
  { time: '11:00', value: 48.9 },
  { time: '12:00', value: 50.5 },
  { time: '13:00', value: 49.2 },
  { time: '14:00', value: 50.8 },
];

const variationChartData = [
  { time: 'Lunes', normal: 50, outlier: null },
  { time: 'Martes', normal: 52, outlier: null },
  { time: 'Miércoles', normal: 48, outlier: null },
  { time: 'Jueves', normal: null, outlier: 75 }, // Variación anormal
  { time: 'Viernes', normal: 49, outlier: null },
  { time: 'Sábado', normal: 51, outlier: null },
];

// --- Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`grid bg-white border border-slate-200 rounded-xl shadow-sm p-6 lg:p-8 ${className}`}>
    {children}
  </div>
);

// --- Visualizations (Diagram Renders) ---

const FactoryDiagram: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-6 bg-slate-50 p-6 rounded-lg border border-slate-100 h-80">
    <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-slate-200 pb-4">
      <Factory className="w-8 h-8 text-blue-600" />
      <span className="text-lg font-semibold text-slate-800">Fábrica de Producción en Masa</span>
    </div>
    <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
      <div className="grid gap-2 justify-items-center text-slate-500">
        <Settings className="w-12 h-12 animate-[spin_4s_linear_infinite]" />
        <span className="text-sm font-medium">Proceso 1</span>
      </div>
      <div className="grid gap-2 justify-items-center relative w-full h-full">
        {/* Overlaying data context */}
        <div className="absolute inset-0 grid place-items-center bg-blue-500/10 rounded-lg border-2 border-dashed border-blue-400">
           <Activity className="w-10 h-10 text-blue-600" />
           <span className="text-xs font-bold text-blue-700 uppercase tracking-wider text-center px-2">Análisis Estadístico<br/>Superpuesto</span>
        </div>
      </div>
      <div className="grid gap-2 justify-items-center text-slate-500">
        <Settings className="w-12 h-12 animate-[spin_4s_linear_infinite_reverse]" />
        <span className="text-sm font-medium">Proceso 2</span>
      </div>
    </div>
  </div>
);

const FlowchartDiagram: React.FC = () => (
  <div className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center bg-slate-50 p-6 rounded-lg border border-slate-100 h-80">
    <div className="grid gap-3 p-4 bg-white border border-indigo-100 rounded-lg shadow-sm justify-items-center text-center">
      <div className="bg-indigo-100 p-3 rounded-full"><Database className="text-indigo-600 w-6 h-6"/></div>
      <span className="font-semibold text-slate-700">Datos del proceso</span>
    </div>
    <div className="grid justify-items-center transform rotate-90 sm:rotate-0">
      <ArrowRight className="text-slate-400 w-8 h-8" />
    </div>
    <div className="grid gap-3 p-4 bg-white border border-blue-100 rounded-lg shadow-sm justify-items-center text-center">
      <div className="bg-blue-100 p-3 rounded-full"><Activity className="text-blue-600 w-6 h-6"/></div>
      <span className="font-semibold text-slate-700">Análisis estadístico</span>
    </div>
    <div className="grid justify-items-center transform rotate-90 sm:rotate-0">
      <ArrowRight className="text-slate-400 w-8 h-8" />
    </div>
    <div className="grid gap-3 p-4 bg-white border border-emerald-100 rounded-lg shadow-sm justify-items-center text-center">
      <div className="bg-emerald-100 p-3 rounded-full"><TrendingUp className="text-emerald-600 w-6 h-6"/></div>
      <span className="font-semibold text-slate-700">Mejora del proceso</span>
    </div>
  </div>
);

const ResearcherDiagram: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-6 rounded-lg border border-slate-100 h-80 items-center">
    <div className="grid justify-items-center gap-4">
      <div className="relative">
        <div className="w-24 h-24 bg-amber-100 rounded-full grid place-items-center border-4 border-amber-200">
          <User className="w-12 h-12 text-amber-700" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md border border-slate-100">
          <FlaskConical className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
      <div className="text-center grid gap-1">
        <span className="font-bold text-slate-800 text-lg">Walter A. Shewhart</span>
        <span className="text-sm text-slate-500">Laboratorios Bell, años 1920</span>
      </div>
    </div>
    <div className="grid grid-rows-[auto_1fr] bg-white border border-slate-200 rounded shadow-sm h-full p-4">
       <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pizarra de Análisis</span>
       <div className="grid place-items-center w-full h-full border border-dashed border-slate-300 bg-slate-50">
          <Activity className="w-16 h-16 text-slate-300" />
       </div>
    </div>
  </div>
);

const ControlChartDiagram: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-4 bg-slate-50 p-6 rounded-lg border border-slate-100 h-96">
    <div className="grid gap-1">
      <span className="font-semibold text-slate-700">Evolución del Proceso (Gráfica Conceptual)</span>
      <span className="text-xs text-slate-500">Límites de control y línea central establecidos.</span>
    </div>
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={controlChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
          <YAxis domain={[40, 60]} stroke="#64748b" fontSize={12} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <ReferenceLine y={55} label={{ position: 'top', value: 'Límite Superior (UCL)', fill: '#ef4444', fontSize: 12 }} stroke="#ef4444" strokeDasharray="3 3" />
          <ReferenceLine y={50} label={{ position: 'insideTopLeft', value: 'Línea Central (CL)', fill: '#10b981', fontSize: 12 }} stroke="#10b981" />
          <ReferenceLine y={45} label={{ position: 'bottom', value: 'Límite Inferior (LCL)', fill: '#ef4444', fontSize: 12 }} stroke="#ef4444" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const VariationChartDiagram: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-4 bg-slate-50 p-6 rounded-lg border border-slate-100 h-96">
    <div className="grid grid-cols-[1fr_auto] items-start">
      <div className="grid gap-1">
        <span className="font-semibold text-slate-700">Tipos de Variación</span>
        <span className="text-xs text-slate-500">Variación natural vs. Variación por causas especiales.</span>
      </div>
      <div className="grid grid-rows-2 gap-1 text-xs">
         <div className="grid grid-cols-[auto_1fr] items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div>Variación Natural</div>
         <div className="grid grid-cols-[auto_1fr] items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div>Causa Asignable (Anormal)</div>
      </div>
    </div>
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={variationChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
          <YAxis domain={[30, 90]} stroke="#64748b" fontSize={12} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <ReferenceLine y={65} stroke="#ef4444" strokeDasharray="3 3" />
          <ReferenceLine y={50} stroke="#10b981" />
          <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="3 3" />
          
          {/* Línea base para conectar los puntos */}
          <Line type="monotone" dataKey="normal" stroke="#3b82f6" strokeWidth={2} connectNulls dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
          <Line type="monotone" dataKey="outlier" stroke="transparent" connectNulls />
          
          {/* Puntos de variación normal */}
          <Scatter dataKey="normal" fill="#3b82f6" />
          
          {/* Punto de variación anormal (fuera de límites) */}
          <Scatter dataKey="outlier" fill="#ef4444" shape={(props: any) => {
             const { cx, cy } = props;
             return (
               <g>
                 <circle cx={cx} cy={cy} r={8} fill="#ef4444" className="animate-pulse" />
                 <AlertTriangle x={cx - 10} y={cy - 30} width={20} height={20} fill="#f59e0b" stroke="#fff" />
               </g>
             );
          }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DiagramRender: React.FC<{ type: VisualType }> = ({ type }) => {
  switch (type) {
    case 'factory': return <FactoryDiagram />;
    case 'flowchart': return <FlowchartDiagram />;
    case 'researcher': return <ResearcherDiagram />;
    case 'control-chart': return <ControlChartDiagram />;
    case 'variation-chart': return <VariationChartDiagram />;
    default: return null;
  }
};

// --- Layout & Main App ---

const LessonLayout: React.FC<{ 
  title: string; 
  tabs: QuarkData[]; 
  activeTab: string; 
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}> = ({ title, tabs, activeTab, onTabChange, children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen bg-slate-100 text-slate-900 font-sans">
      
      {/* Header & Nav */}
      <header className="grid grid-rows-[auto_auto] gap-4 bg-white border-b border-slate-200 px-6 py-5 shadow-sm top-0 z-10">
        <div className="grid items-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">{title}</h1>
        </div>
        
        {/* CSS Grid para las pestañas - Estrictamente sin Flexbox */}
        <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2" aria-label="Navegación de secciones">
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={` ${index}
          
                  grid items-center justify-center text-center px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 border-2
                  ${isActive 
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm' 
                    : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="grid gap-1">
                  <span className="line-clamp-1">{tab.title}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid p-6 lg:p-10 place-items-start lg:place-content-start">
        <div className="grid w-full max-w-5xl mx-auto h-full">
          {children}
        </div>
      </main>

    </div>
  );
};

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(lessonData[0].id);

  const activeQuark = lessonData.find(q => q.id === activeTabId) || lessonData[0];

  return (
    <LessonLayout 
      title="Fundamentos del Control Estadístico de Calidad"
      tabs={lessonData}
      activeTab={activeTabId}
      onTabChange={setActiveTabId}
    >
      <div className="grid animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <Card>
          <div className="grid grid-rows-[auto_auto_1fr] gap-8">
            
            {/* Header del Panel */}
            <div className="grid gap-2 border-b border-slate-100 pb-6">
              <div className="grid grid-cols-[auto_1fr] items-center gap-3">
               
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                  {activeQuark.title}
                </h2>
              </div>
            </div>

            {/* Diagram Description */}
            <div className="grid">
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {activeQuark.description}
              </p>
            </div>

            {/* Diagram Render */}
            <div className="grid mt-4">
              <DiagramRender type={activeQuark.visualType} />
            </div>

          </div>
        </Card>
      </div>
    </LessonLayout>
  );
}