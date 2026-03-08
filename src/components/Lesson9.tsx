import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { ShieldCheck, Activity, TrendingUp, AlertTriangle, Layers, GitMerge } from 'lucide-react';

// --- Types & Interfaces ---
interface TabData {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: {
    diagramTitle: string;
    description: string;
    renderComponent: React.FC;
  };
}

// --- Data Preparation ---
const dataQ11 = [
  { time: 'T1', value: 50 }, { time: 'T2', value: 52 }, { time: 'T3', value: 49 },
  { time: 'T4', value: 51 }, { time: 'T5', value: 48 }, { time: 'T6', value: 53 },
  { time: 'T7', value: 65 }, // Anomalía / Desviación
  { time: 'T8', value: 68 },
];

const dataQ13 = [
  { month: 'Ene', defectos: 120, rendimiento: 60 },
  { month: 'Feb', defectos: 105, rendimiento: 65 },
  { month: 'Mar', defectos: 90, rendimiento: 72 },
  { month: 'Abr', defectos: 65, rendimiento: 80 },
  { month: 'May', defectos: 40, rendimiento: 88 },
  { month: 'Jun', defectos: 25, rendimiento: 95 },
];

// --- Diagram Components ---

const Diagram11: React.FC = () => (
  <div className="h-80 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dataQ11} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="time" />
        <YAxis domain={[40, 80]} />
        <Tooltip />
        <ReferenceLine y={60} label="Límite Superior (LSC)" stroke="red" strokeDasharray="3 3" />
        <ReferenceLine y={40} label="Límite Inferior (LIC)" stroke="red" strokeDasharray="3 3" />
        <ReferenceLine y={50} label="Media" stroke="green" />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#3b82f6" 
          strokeWidth={3}
          dot={(props) => {
            const { cx, cy, payload } = props;
            if (payload.value > 60) {
              return <circle cx={cx} cy={cy} r={6} fill="red" stroke="white" strokeWidth={2} key={payload.time} />;
            }
            return <circle cx={cx} cy={cy} r={4} fill="#3b82f6" stroke="white" strokeWidth={2} key={payload.time} />;
          }}
        />
      </LineChart>
    </ResponsiveContainer>
    <div className="grid grid-cols-1 justify-items-center mt-4 text-sm text-gray-600">
      <span className="grid grid-cols-[auto_1fr] gap-2 items-center">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
        Señal de alerta: Desviación detectada tempranamente
      </span>
    </div>
  </div>
);

const Diagram12: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
    <div className="grid grid-rows-[auto_1fr] border-2 border-red-200 rounded-xl  bg-red-50/30">
      <div className="bg-red-100 p-3 text-center font-bold text-red-800 border-b-2 border-red-200">
        Proceso Sin Control (Defectos)
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-2 p-6 justify-items-center align-items-center h-64">
        {[...Array(16)].map((_, i) => (
          <div key={i} className={`w-8 h-8 rounded-full ${[3, 7, 12, 14].includes(i) ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
        ))}
      </div>
    </div>
    <div className="grid grid-rows-[auto_1fr] border-2 border-green-200 rounded-xl  bg-green-50/30">
      <div className="bg-green-100 p-3 text-center font-bold text-green-800 border-b-2 border-green-200">
        Proceso Controlado (Uniformidad)
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-2 p-6 justify-items-center align-items-center h-64">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-green-500"></div>
        ))}
      </div>
    </div>
  </div>
);

const Diagram13: React.FC = () => (
  <div className="h-80 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={dataQ13} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorDefectos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorRendimiento" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="defectos" stroke="#ef4444" fillOpacity={1} fill="url(#colorDefectos)" name="Defectos" />
        <Area type="monotone" dataKey="rendimiento" stroke="#22c55e" fillOpacity={1} fill="url(#colorRendimiento)" name="Rendimiento del Sistema" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const Diagram14: React.FC = () => (
  <div className="grid grid-cols-1 border border-gray-200 rounded-lg  shadow-sm">
    <div className="grid grid-cols-3 bg-gray-100 font-bold text-gray-700 border-b border-gray-200">
      <div className="p-4 border-r border-gray-200">Aspecto</div>
      <div className="p-4 border-r border-gray-200 text-red-700 bg-red-50">Inspección Tradicional</div>
      <div className="p-4 text-green-700 bg-green-50">Control Estadístico</div>
    </div>
    
    <div className="grid grid-cols-3 border-b border-gray-200">
      <div className="p-4 border-r border-gray-200 font-medium bg-gray-50">Momento</div>
      <div className="p-4 border-r border-gray-200">Al finalizar la producción</div>
      <div className="p-4">Durante el proceso</div>
    </div>
    
    <div className="grid grid-cols-3 border-b border-gray-200">
      <div className="p-4 border-r border-gray-200 font-medium bg-gray-50">Enfoque</div>
      <div className="p-4 border-r border-gray-200">En el producto</div>
      <div className="p-4">En el proceso</div>
    </div>
    
    <div className="grid grid-cols-3 border-b border-gray-200">
      <div className="p-4 border-r border-gray-200 font-medium bg-gray-50">Función</div>
      <div className="p-4 border-r border-gray-200">Separar lo bueno de lo malo</div>
      <div className="p-4">Prevenir la creación de defectos</div>
    </div>
    
    <div className="grid grid-cols-3">
      <div className="p-4 border-r border-gray-200 font-medium bg-gray-50">Uso de datos</div>
      <div className="p-4 border-r border-gray-200">Para conteo y rechazo</div>
      <div className="p-4">Para análisis, ajustes y mejora</div>
    </div>
  </div>
);

const Diagram15: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
    <div className="grid grid-rows-[auto_1fr] text-center h-full bg-orange-50 rounded-xl border-2 border-orange-200 p-6">
      <div className="grid place-items-center mb-4 text-orange-600">
        <AlertTriangle size={48} />
      </div>
      <h3 className="text-xl font-bold text-orange-800 mb-2">Enfoque Correctivo</h3>
      <p className="text-orange-700 text-sm">
        Espera a que ocurra el error. Identifica los defectos una vez que el producto está terminado. Genera desperdicio y reprocesos.
      </p>
    </div>
    
    <div className="grid place-items-center hidden md:grid">
      <div className="w-12 h-1 bg-gray-300"></div>
      <div className="text-2xl font-bold text-gray-400 my-2">VS</div>
      <div className="w-12 h-1 bg-gray-300"></div>
    </div>

    <div className="grid grid-rows-[auto_1fr] text-center h-full bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
      <div className="grid place-items-center mb-4 text-blue-600">
        <ShieldCheck size={48} />
      </div>
      <h3 className="text-xl font-bold text-blue-800 mb-2">Enfoque Preventivo</h3>
      <p className="text-blue-700 text-sm">
        Monitorea las variables. Corrige las desviaciones antes de que se conviertan en defectos. Garantiza estabilidad.
      </p>
    </div>
  </div>
);

const Diagram16: React.FC = () => (
  <div className="grid grid-rows-[auto_auto_auto] gap-8 justify-items-center p-8 bg-gray-50 rounded-xl">
    {/* Root */}
    <div className="bg-indigo-600 text-white px-8 py-4 rounded-lg shadow-lg text-xl font-bold z-10">
      Gestión de Calidad
    </div>
    
    {/* Conectores (Simulados con Grid) */}
    <div className="grid grid-cols-2 w-full max-w-2xl relative">
       {/* Línea horizontal */}
       <div className="absolute top-0 left-[25%] right-[25%] h-[2px] bg-indigo-300"></div>
       {/* Líneas verticales */}
       <div className="absolute top-0 left-[25%] w-[2px] h-8 bg-indigo-300"></div>
       <div className="absolute top-0 right-[25%] w-[2px] h-8 bg-indigo-300"></div>
    </div>

    {/* Branches */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl pt-8">
      <div className="grid grid-rows-[auto_1fr] bg-white border-2 border-gray-200 p-6 rounded-lg shadow-md text-center">
        <div className="font-bold text-gray-500 mb-3 uppercase tracking-wider text-sm">Paradigma Pasado</div>
        <h4 className="text-lg font-bold text-gray-800 mb-2">Inspección del Producto</h4>
        <ul className="text-sm text-gray-600 space-y-2 text-left list-disc list-inside">
          <li>Detección al final de línea</li>
          <li>Enfoque netamente reactivo</li>
          <li>Alta tasa de desperdicios</li>
        </ul>
      </div>

      <div className="grid grid-rows-[auto_1fr] bg-indigo-50 border-2 border-indigo-400 p-6 rounded-lg shadow-md text-center relative ">
        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-3 py-1 rounded-bl-lg">Actual</div>
        <div className="font-bold text-indigo-500 mb-3 uppercase tracking-wider text-sm">Paradigma Moderno</div>
        <h4 className="text-lg font-bold text-indigo-900 mb-2">Control Estadístico del Proceso</h4>
        <ul className="text-sm text-indigo-800 space-y-2 text-left list-disc list-inside">
          <li>Análisis de comportamiento continuo</li>
          <li>Prevención activa de defectos</li>
          <li>Motor para la mejora continua</li>
        </ul>
      </div>
    </div>
  </div>
);


// --- Content Definition ---
const tabsData: TabData[] = [
  {
    id: 'q11',
    title: 'Detección Temprana',
    icon: <Activity size={18} />,
    content: {
      diagramTitle: 'Detección temprana de desviaciones',
      description: 'Las herramientas estadísticas permiten detectar cambios o anomalías en el proceso antes de que se conviertan en defectos en el producto final. Esta detección temprana facilita la intervención oportuna para corregir el problema.',
      renderComponent: Diagram11
    }
  },
  {
    id: 'q12',
    title: 'Reducción de Defectos',
    icon: <GitMerge size={18} />,
    content: {
      diagramTitle: 'Reducción de defectos mediante control',
      description: 'Al controlar el proceso y corregir desviaciones de manera temprana, se reduce la probabilidad de producir productos defectuosos. De esta forma, el control estadístico contribuye a mejorar la estabilidad y consistencia del proceso productivo.',
      renderComponent: Diagram12
    }
  },
  {
    id: 'q13',
    title: 'Mejora Continua',
    icon: <TrendingUp size={18} />,
    content: {
      diagramTitle: 'Control estadístico y mejora continua',
      description: 'El análisis sistemático de datos permite comprender cómo se comporta el proceso a lo largo del tiempo. Esta información facilita identificar oportunidades de mejora y optimizar el desempeño del sistema productivo.',
      renderComponent: Diagram13
    }
  },
  {
    id: 'q14',
    title: 'Inspección vs Control',
    icon: <Layers size={18} />,
    content: {
      diagramTitle: 'Comparación: Inspección tradicional y Control estadístico',
      description: 'La inspección se centra en detectar defectos en el producto final (reactivo), mientras que el control estadístico busca prevenir defectos mediante el monitoreo del proceso (preventivo).',
      renderComponent: Diagram14
    }
  },
  {
    id: 'q15',
    title: 'Correctivo vs Preventivo',
    icon: <ShieldCheck size={18} />,
    content: {
      diagramTitle: 'Enfoque correctivo y enfoque preventivo',
      description: 'La inspección tradicional representa un enfoque correctivo, identificando errores post-ocurrencia. El control estadístico adopta un enfoque preventivo, corrigiendo desviaciones antes del defecto.',
      renderComponent: Diagram15
    }
  },
  {
    id: 'q16',
    title: 'Síntesis de Calidad',
    icon: <Activity size={18} />,
    content: {
      diagramTitle: 'Síntesis del cambio en la gestión de calidad',
      description: 'El paso de la inspección al control estadístico representa una transformación paradigmática. Permite comprender el proceso, prevenir fallos y cultivar una cultura de mejora constante.',
      renderComponent: Diagram16
    }
  }
];

// --- Structural Components ---

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100  ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<{ 
  tabs: TabData[], 
  activeTab: string, 
  setActiveTab: (id: string) => void 
}> = ({ tabs, activeTab, setActiveTab }) => {
  const activeContent = tabs.find(t => t.id === activeTab)?.content;

  if (!activeContent) return null;

  const ActiveDiagram = activeContent.renderComponent;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans grid grid-rows-[auto_1fr]">
      
      {/* Header & Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 py-6 border-b border-gray-100">
            <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-900 tracking-tight">
              Evolución de la Gestión de Calidad
            </h1>
          </div>
          
          {/* Tab Navigation (Using CSS Grid for layout) */}
          <nav className="grid grid-flow-col auto-cols-auto gap-1 py-2 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  grid grid-cols-[auto_1fr] gap-2 items-center px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap border-b-2
                  ${activeTab === tab.id 
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 gap-8">
        
        {/* Content Header Card */}
        <Card className="p-6 md:p-8 grid grid-rows-[auto_auto] gap-4 bg-gradient-to-br from-white to-indigo-50/30">
          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-indigo-600 pl-4">
            {activeContent.diagramTitle}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {activeContent.description}
          </p>
        </Card>

        {/* Render Component Card */}
        <Card className="p-6 md:p-8 bg-white min-h-[400px] grid items-center">
           <ActiveDiagram />
        </Card>
        
      </main>
    </div>
  );
};

// --- App Entry Point ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);

  return (
    <LessonLayout 
      tabs={tabsData} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
    />
  );
}