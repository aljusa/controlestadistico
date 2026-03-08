import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceDot,
  ReferenceArea
} from 'recharts';
import { 
  ArrowRight, 
  ArrowDown, 
  AlertTriangle, 
  Factory, 
  Settings, 
  FileText, 
  Activity, 
  Search, 
  TrendingUp 
} from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---

interface LessonContent {
  id: string;
  tabTitle: string;
  title: string;
  description: string;
  type: string;
  RenderComponent: React.FC;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  children: React.ReactNode;
}

// --- DATOS SIMULADOS PARA GRÁFICOS ---

const normalProcessData = [
  { sample: '1', p: 0.04 },
  { sample: '2', p: 0.05 },
  { sample: '3', p: 0.03 },
  { sample: '4', p: 0.06 },
  { sample: '5', p: 0.04 },
  { sample: '6', p: 0.05 },
  { sample: '7', p: 0.04 },
  { sample: '8', p: 0.03 },
  { sample: '9', p: 0.05 },
  { sample: '10', p: 0.04 },
];

const alertProcessData = [
  { sample: '1', p: 0.04 },
  { sample: '2', p: 0.05 },
  { sample: '3', p: 0.04 },
  { sample: '4', p: 0.18 }, // Anomalía
  { sample: '5', p: 0.05 },
  { sample: '6', p: 0.06 },
];

// --- COMPONENTES DE VISUALIZACIÓN (DIAGRAM RENDERERS) ---

const CalcDiagram: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 place-items-center w-full max-w-4xl mx-auto p-4">
    <div className="grid grid-rows-[auto_1fr] gap-2 p-6 bg-blue-50 border border-blue-200 rounded-xl w-full text-center h-full">
      <span className="font-bold text-blue-800 text-lg">Paso 1: Muestra</span>
      <div className="grid place-items-center text-blue-600">
        <span className="text-4xl font-black">100</span>
        <span className="text-sm">Productos inspeccionados</span>
      </div>
    </div>
    
    <div className="grid place-items-center text-gray-400 rotate-90 md:rotate-0">
      <ArrowRight size={32} />
    </div>

    <div className="grid grid-rows-[auto_1fr] gap-2 p-6 bg-red-50 border border-red-200 rounded-xl w-full text-center h-full">
      <span className="font-bold text-red-800 text-lg">Paso 2: Defectos</span>
      <div className="grid place-items-center text-red-600">
        <span className="text-4xl font-black">5</span>
        <span className="text-sm">Unidades defectuosas</span>
      </div>
    </div>

    <div className="grid place-items-center text-gray-400 rotate-90 md:rotate-0">
      <ArrowRight size={32} />
    </div>

    <div className="grid grid-rows-[auto_1fr] gap-2 p-6 bg-green-50 border border-green-200 rounded-xl w-full text-center h-full shadow-inner">
      <span className="font-bold text-green-800 text-lg">Paso 3: Proporción (p)</span>
      <div className="grid place-items-center text-green-700">
        <span className="text-xl font-mono bg-white px-3 py-1 rounded border border-green-200 mb-2">p = 5 / 100</span>
        <span className="text-4xl font-black">0.05</span>
        <span className="text-sm font-semibold mt-1">5% defectuosos</span>
      </div>
    </div>
  </div>
);

const SequenceDiagram: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-6 place-items-center w-full max-w-4xl mx-auto p-4">
    <div className="grid gap-4 p-6 bg-slate-50 border border-slate-200 rounded-xl w-full text-center">
      <div className="grid place-items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100">
        <span className="font-mono text-lg text-slate-700">p = 0.05</span>
      </div>
      <span className="text-sm text-slate-600 font-medium">Cálculo de la Muestra Actual</span>
    </div>

    <div className="grid place-items-center text-indigo-400 rotate-90 md:rotate-0">
      <ArrowRight size={32} />
    </div>

    <div className="grid grid-rows-[auto_1fr] gap-4 p-6 bg-indigo-50 border border-indigo-200 rounded-xl w-full h-full">
      <span className="font-bold text-indigo-800 text-center">Registro en Gráfico Temporal</span>
      <div className="w-full h-40 bg-white rounded-lg border border-indigo-100 p-2 relative grid place-items-center">
        {/* Gráfico estático simulado con CSS Grid */}
        <div className="grid grid-cols-5 gap-0 items-end w-full h-full pb-4 px-4 border-b border-l border-slate-300 relative">
           <div className="grid place-items-center h-[30%]"><div className="w-3 h-3 bg-indigo-300 rounded-full"></div></div>
           <div className="grid place-items-center h-[50%]"><div className="w-3 h-3 bg-indigo-300 rounded-full"></div></div>
           <div className="grid place-items-center h-[40%] relative">
              <div className="w-4 h-4 bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)] z-10"></div>
              <span className="absolute -top-6 text-xs font-bold text-indigo-700">Nuevo Punto</span>
           </div>
           <div className="grid place-items-center h-[0%]"></div>
           <div className="grid place-items-center h-[0%]"></div>
        </div>
      </div>
    </div>
  </div>
);

const MonitoringChart: React.FC = () => (
  <div className="w-full h-80 bg-white p-4 rounded-xl border border-slate-200">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={normalProcessData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="sample" label={{ value: 'Número de Muestra', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Proporción (p)', angle: -90, position: 'insideLeft' }} domain={[0, 0.1]} />
        <Tooltip formatter={(value) => [`${value}`, 'Proporción (p)']} />
        <Line type="monotone" dataKey="p" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const AlertChart: React.FC = () => (
  <div className="w-full h-80 bg-white p-4 rounded-xl border border-slate-200 relative">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={alertProcessData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="sample" label={{ value: 'Número de Muestra', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Proporción (p)', angle: -90, position: 'insideLeft' }} domain={[0, 0.2]} />
        <Tooltip />
        <ReferenceArea x1="3.5" x2="4.5" fill="#fef2f2" strokeOpacity={0.3} />
        <Line type="monotone" dataKey="p" stroke="#64748b" strokeWidth={2} dot={{ r: 4, fill: '#64748b' }} />
        <ReferenceDot x="4" y={0.18} r={8} fill="#ef4444" stroke="#fff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
    <div className="absolute top-8 right-12 grid grid-flow-col gap-2 place-items-center bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg shadow-sm">
      <AlertTriangle size={18} />
      <span className="text-sm font-bold">¡Alerta! Causa asignable detectada</span>
    </div>
  </div>
);

const ContextSchema: React.FC = () => (
  <div className="grid grid-rows-[auto_auto_1fr] gap-6 place-items-center w-full max-w-4xl mx-auto">
    <div className="grid place-items-center bg-indigo-600 text-white px-8 py-4 rounded-xl shadow-md font-bold text-xl z-10 relative">
      Aplicaciones del Diagrama p
    </div>
    
    {/* Grid structure for arrows/connections without flexbox */}
    <div className="grid grid-cols-3 w-full max-w-2xl text-indigo-300 place-items-center -mt-8 pt-8">
       <ArrowDown size={24} className="rotate-[45deg] origin-top-left" />
       <ArrowDown size={24} />
       <ArrowDown size={24} className="-rotate-[45deg] origin-top-right" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="grid grid-rows-[auto_auto_1fr] gap-3 p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow place-items-center text-center">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Factory size={28} /></div>
        <h3 className="font-bold text-slate-800">Manufactura</h3>
        <p className="text-sm text-slate-600">Control de piezas defectuosas en lotes de producción masiva.</p>
      </div>
      <div className="grid grid-rows-[auto_auto_1fr] gap-3 p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow place-items-center text-center">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-full"><Settings size={28} /></div>
        <h3 className="font-bold text-slate-800">Ensamblaje</h3>
        <p className="text-sm text-slate-600">Inspección de productos finales en líneas de ensamblaje complejas.</p>
      </div>
      <div className="grid grid-rows-[auto_auto_1fr] gap-3 p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow place-items-center text-center">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full"><FileText size={28} /></div>
        <h3 className="font-bold text-slate-800">Administrativo</h3>
        <p className="text-sm text-slate-600">Monitoreo de errores en facturación, registros o documentación.</p>
      </div>
    </div>
  </div>
);

const ImportanceMap: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-8 place-items-center w-full max-w-4xl mx-auto bg-slate-50 p-8 rounded-2xl border border-slate-200">
    <div className="grid place-items-center bg-blue-600 text-white w-40 h-40 rounded-full shadow-lg border-4 border-blue-200 text-center p-4">
      <span className="font-black text-xl">Diagrama p</span>
      <span className="text-xs opacity-80 mt-1">Gestión de Calidad</span>
    </div>

    <div className="grid grid-rows-3 gap-8 text-blue-300 hidden md:grid">
      <ArrowRight size={24} className="translate-y-8 rotate-[-20deg]" />
      <ArrowRight size={24} />
      <ArrowRight size={24} className="-translate-y-8 rotate-[20deg]" />
    </div>

    <div className="grid grid-rows-3 gap-4 w-full">
      <div className="grid grid-cols-[auto_1fr] gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 place-items-center justify-items-start">
        <div className="bg-sky-100 text-sky-600 p-2 rounded-lg"><Activity size={24} /></div>
        <div className="grid gap-1">
          <h4 className="font-bold text-slate-800">Monitoreo Continuo</h4>
          <p className="text-sm text-slate-600">Observación constante de la estabilidad del proceso.</p>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 place-items-center justify-items-start">
        <div className="bg-rose-100 text-rose-600 p-2 rounded-lg"><Search size={24} /></div>
        <div className="grid gap-1">
          <h4 className="font-bold text-slate-800">Detección de Problemas</h4>
          <p className="text-sm text-slate-600">Identificación rápida de causas asignables o anomalías.</p>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 place-items-center justify-items-start">
        <div className="bg-teal-100 text-teal-600 p-2 rounded-lg"><TrendingUp size={24} /></div>
        <div className="grid gap-1">
          <h4 className="font-bold text-slate-800">Mejora de la Calidad</h4>
          <p className="text-sm text-slate-600">Base objetiva para la toma de decisiones correctivas.</p>
        </div>
      </div>
    </div>
  </div>
);

// --- ESTRUCTURA PRINCIPAL Y CONTENEDORES ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTab, onTabChange, children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 font-sans">
      <header className="grid grid-rows-[auto_auto] bg-white shadow-sm z-10 sticky top-0">
        <div className="grid place-items-center p-5 border-b border-slate-200 bg-slate-900 text-white">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        </div>
        <nav className="grid grid-flow-col auto-cols-fr overflow-x-auto border-b border-slate-200 bg-slate-50">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className={`grid place-items-center text-sm font-semibold py-4 px-2 border-b-2 transition-colors whitespace-nowrap
                ${activeTab === index 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>
      <main className="grid place-items-start justify-items-center p-4 md:p-8 w-full">
        <div className="grid w-full max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- DATOS DE LA LECCIÓN (QUARKS 11-16) ---

const lessonContents: LessonContent[] = [
  {
    id: 'q11',
    tabTitle: '1. Cálculo',
    title: 'Ejemplo de cálculo de proporción defectuosa',
    type: 'Q-op',
    description: 'Supongamos que se inspecciona una muestra de 100 productos y se detectan 5 unidades defectuosas. La proporción defectuosa (p) se calcula dividiendo los defectos entre el tamaño de la muestra. Esto significa que el 5% de los productos presentan defectos.',
    RenderComponent: CalcDiagram
  },
  {
    id: 'q12',
    tabTitle: '2. Registro',
    title: 'Registro de valores en el diagrama p',
    type: 'Q-op',
    description: 'Una vez calculada la proporción defectuosa para cada muestra, el valor obtenido se registra como un punto en el gráfico de control. La secuencia de estos puntos permite analizar el comportamiento del proceso a lo largo del tiempo.',
    RenderComponent: SequenceDiagram
  },
  {
    id: 'q13',
    tabTitle: '3. Monitoreo',
    title: 'Monitoreo del proceso mediante el diagrama p',
    type: 'Q-con',
    description: 'El análisis del diagrama p permite observar cómo cambia la proporción defectuosa a lo largo del tiempo. Este monitoreo facilita identificar cambios en la calidad del proceso o detectar situaciones que requieren atención inmediata.',
    RenderComponent: MonitoringChart
  },
  {
    id: 'q14',
    tabTitle: '4. Problemas',
    title: 'Identificación de problemas en el proceso',
    type: 'Q-con',
    description: 'Cuando el diagrama p muestra aumentos inusuales en la proporción de defectuosos o patrones anormales en los datos, esto puede indicar la presencia de problemas (causas asignables) en el proceso productivo que deben investigarse.',
    RenderComponent: AlertChart
  },
  {
    id: 'q15',
    tabTitle: '5. Aplicaciones',
    title: 'Aplicaciones del diagrama p en diferentes procesos',
    type: 'Q-ctx',
    description: 'El diagrama p puede aplicarse en diversos contextos donde se evalúa la proporción de unidades defectuosas. Ejemplos incluyen el control en manufactura, la inspección en líneas de ensamblaje o el monitoreo de errores en procesos administrativos.',
    RenderComponent: ContextSchema
  },
  {
    id: 'q16',
    tabTitle: '6. Importancia',
    title: 'Importancia del diagrama p en la gestión de calidad',
    type: 'Q-con',
    description: 'El diagrama p permite monitorear la calidad del proceso de manera continua. Su uso facilita detectar cambios, identificar problemas y apoyar la toma de decisiones orientadas a mejorar la calidad general de la organización.',
    RenderComponent: ImportanceMap
  }
];

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeContent = lessonContents[activeTabIndex];
  const { RenderComponent } = activeContent;

  return (
    <LessonLayout
      title="Diagrama p: Control de Proporción Defectuosa"
      tabs={lessonContents.map(c => c.tabTitle)}
      activeTab={activeTabIndex}
      onTabChange={setActiveTabIndex}
    >
      <Card className="grid grid-rows-[auto_auto_1fr] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Diagram Title Area */}
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 p-6 border-b border-slate-100 bg-white">
          <h2 className="text-2xl font-bold text-slate-800">{activeContent.title}</h2>
          <span className="grid place-items-center px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full uppercase tracking-wider">
            {activeContent.type}
          </span>
        </div>

        {/* Diagram Description Area */}
        <div className="grid p-6 bg-slate-50 border-b border-slate-200">
          <p className="text-slate-700 leading-relaxed text-lg">
            {activeContent.description}
          </p>
        </div>

        {/* Diagram Render Area */}
        <div className="grid place-items-center p-6 md:p-10 bg-slate-100/50 min-h-[400px]">
          <RenderComponent />
        </div>

      </Card>
    </LessonLayout>
  );
}