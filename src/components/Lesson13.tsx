import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { Settings, GitMerge, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

// --- TYPES & INTERFACES ---

interface TabContent {
  id: string;
  title: string;
  icon: React.ElementType;
  diagramTitle: string;
  diagramDescription: string;
  RenderComponent: React.FC;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  children: React.ReactNode;
}

// --- DATA GENERATION FOR CHARTS ---

// Data for Normal Distribution (Bell Curve)
const generateNormalDistribution = () => {
  const data = [];
  const mean = 0;
  const stdDev = 1;
  for (let i = -3; i <= 3; i += 0.2) {
    const x = Number(i.toFixed(1));
    const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
    data.push({ x, y: Number(y.toFixed(4)) });
  }
  return data;
};

const normalDistData = generateNormalDistribution();

// Data for Process Over Time (Stable process / Common Cause Variation)
const generateProcessData = () => {
  const data = [];
  let mean = 50;
  for (let i = 1; i <= 30; i++) {
    // Random variation around the mean (Common Variation)
    const variation = (Math.random() - 0.5) * 8; 
    data.push({
      time: i,
      value: Number((mean + variation).toFixed(2)),
      mean: mean,
      ucl: mean + 15,
      lcl: mean - 15
    });
  }
  return data;
};

const processData = generateProcessData();

// --- COMPONENTS ---

// 1. Card Component
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-200  ${className}`}>
      {children}
    </div>
  );
};

// 2. Visualizations (Diagram Renders)

const VisIntro: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] h-full w-full p-6 gap-8 bg-slate-50 rounded-lg">
    <div className="grid place-items-center text-center">
      <h3 className="text-lg font-bold text-slate-700">Línea de Producción</h3>
      <p className="text-sm text-slate-500 pb-4">Mismos parámetros, resultados ligeramente distintos</p>
    </div>
    
    <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
      {/* Product 1 */}
      <div className="grid grid-rows-[auto_auto] gap-2 justify-items-center relative">
        <div className="w-16 h-16 bg-blue-500 rounded-md grid place-items-center shadow-lg">
          <Settings className="text-white w-8 h-8 animate-[spin_4s_linear_infinite]" />
        </div>
        <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded">50.1 mm</span>
      </div>

      {/* Product 2 - Small variation */}
      <div className="grid grid-rows-[auto_auto] gap-2 justify-items-center relative">
        <div className="absolute -top-10 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full border border-green-300 font-semibold shadow-sm">
          Variación Común
        </div>
        <div className="w-16 h-16 bg-blue-400 rounded-md grid place-items-center shadow-lg transform scale-95">
          <Settings className="text-white w-7 h-7 animate-[spin_5s_linear_infinite]" />
        </div>
        <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded">49.8 mm</span>
      </div>

      {/* Product 3 - Special variation */}
      <div className="grid grid-rows-[auto_auto] gap-2 justify-items-center relative">
        <div className="absolute -top-10 bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full border border-red-300 font-semibold shadow-sm">
          Variación Especial
        </div>
        <div className="w-16 h-16 bg-red-500 rounded-md grid place-items-center shadow-lg transform rotate-12">
          <AlertTriangle className="text-white w-8 h-8" />
        </div>
        <span className="text-xs font-mono bg-red-100 text-red-800 px-2 py-1 rounded border border-red-200">55.3 mm</span>
      </div>
    </div>
  </div>
);

const VisClasificacion: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr_auto] h-full w-full p-6 gap-6 place-items-center bg-slate-50 rounded-lg">
    <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md font-bold text-lg z-10">
      Variabilidad del Proceso
    </div>
    
    {/* Grid lines pretending to be tree branches */}
    <div className="grid grid-cols-2 w-full max-w-md h-12 relative">
      <div className="border-t-2 border-l-2 border-indigo-300 rounded-tl-xl h-full w-1/2 justify-self-end"></div>
      <div className="border-t-2 border-r-2 border-indigo-300 rounded-tr-xl h-full w-1/2 justify-self-start"></div>
      <div className="absolute left-1/2 top-0 w-0.5 h-full bg-indigo-300 -translate-x-1/2 -translate-y-full"></div>
    </div>

    <div className="grid grid-cols-2 gap-8 w-full max-w-2xl text-center">
      <div className="grid gap-3 bg-white p-5 rounded-xl border-2 border-green-200 shadow-sm">
        <div className="grid justify-items-center text-green-600">
          <CheckCircle className="w-8 h-8 mb-2" />
        </div>
        <h4 className="font-bold text-slate-800">Variación Común</h4>
        <p className="text-sm text-slate-600">Natural, predecible, inherente al sistema y estable a lo largo del tiempo.</p>
      </div>

      <div className="grid gap-3 bg-white p-5 rounded-xl border-2 border-red-200 shadow-sm">
        <div className="grid justify-items-center text-red-600">
          <AlertTriangle className="w-8 h-8 mb-2" />
        </div>
        <h4 className="font-bold text-slate-800">Variación Especial</h4>
        <p className="text-sm text-slate-600">Asignable, impredecible, causada por factores externos o anormales.</p>
      </div>
    </div>
  </div>
);

const VisDefinicion: React.FC = () => (
  <div className="h-full w-full min-h-[350px] bg-slate-50 p-4 rounded-lg grid grid-rows-[1fr]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={normalDistData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="x" 
          type="number" 
          tickCount={7} 
          domain={[-3, 3]} 
          tick={{fill: '#64748b'}}
          axisLine={{stroke: '#cbd5e1'}}
        />
        <YAxis hide={true} />
       
        <ReferenceLine x={0} stroke="#4f46e5" strokeDasharray="3 3" label={{ position: 'top', value: 'Promedio Múltiple', fill: '#4f46e5', fontSize: 12 }} />
        <Area type="monotone" dataKey="y" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorY)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const VisInherente: React.FC = () => (
  <div className="h-full w-full min-h-[350px] bg-slate-50 p-4 rounded-lg grid grid-rows-[1fr]">
     <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" dataKey="time" name="Tiempo" tick={{fill: '#64748b'}} />
        <YAxis type="number" dataKey="value" name="Valor" domain={[30, 70]} tick={{fill: '#64748b'}} />
        <ZAxis type="number" range={[60, 60]} />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }} 
          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
        />
        <ReferenceLine y={65} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Límite Superior', fill: '#ef4444', fontSize: 12 }} />
        <ReferenceLine y={50} stroke="#10b981" label={{ position: 'insideTopLeft', value: 'Centro (Sistema)', fill: '#10b981', fontSize: 12 }} />
        <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideBottomLeft', value: 'Límite Inferior', fill: '#ef4444', fontSize: 12 }} />
        <Scatter name="Resultados" data={processData} fill="#3b82f6" />
      </ScatterChart>
    </ResponsiveContainer>
  </div>
);

const VisPersistencia: React.FC = () => (
  <div className="h-full w-full min-h-[350px] bg-slate-50 p-4 rounded-lg grid grid-rows-[1fr]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={processData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="time" tick={{fill: '#64748b'}} axisLine={{stroke: '#cbd5e1'}} />
        <YAxis domain={[30, 70]} tick={{fill: '#64748b'}} axisLine={{stroke: '#cbd5e1'}} />
        <Tooltip 
          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
        />
        <ReferenceLine y={50} stroke="#94a3b8" strokeWidth={2} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#0ea5e9" 
          strokeWidth={3}
          dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} 
          activeDot={{ r: 6, strokeWidth: 0 }}
          animationDuration={2000}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);


// 3. Main Data Array (Quarks)
const tabsData: TabContent[] = [
  {
    id: 'introduccion',
    title: '1. Introducción',
    icon: Settings,
    diagramTitle: 'Introducción a los tipos de variación',
    diagramDescription: 'En todos los procesos productivos se observan diferencias entre los resultados obtenidos, incluso bajo las mismas condiciones. Para aplicar el control estadístico, debemos distinguir entre variación común y variación especial.',
    RenderComponent: VisIntro
  },
  {
    id: 'clasificacion',
    title: '2. Clasificación',
    icon: GitMerge,
    diagramTitle: 'Clasificación de la variación',
    diagramDescription: 'La variabilidad se clasifica en variación común (natural) y especial (asignable). Esto permite interpretar el comportamiento del proceso y determinar si opera de forma normal o presenta anomalías.',
    RenderComponent: VisClasificacion
  },
  {
    id: 'definicion',
    title: '3. Variación Común',
    icon: Activity,
    diagramTitle: 'Definición de variación común',
    diagramDescription: 'La variación común o natural es la variabilidad del comportamiento normal en un proceso estable. Surge de la combinación de múltiples factores pequeños (distribución normal) que influyen continuamente en el sistema.',
    RenderComponent: VisDefinicion
  },
  {
    id: 'inherente',
    title: '4. Caract. Inherente',
    icon: CheckCircle,
    diagramTitle: 'Variación como característica del sistema',
    diagramDescription: 'Está integrada en el funcionamiento normal del proceso productivo. Siempre estará presente mientras el sistema opere, ya que proviene de múltiples pequeñas influencias propias del sistema.',
    RenderComponent: VisInherente
  },
  {
    id: 'persistencia',
    title: '5. Persistencia',
    icon: Activity,
    diagramTitle: 'Persistencia temporal',
    diagramDescription: 'Las fluctuaciones asociadas con la variación común aparecen de forma continua a lo largo del tiempo. En un proceso estable, estas pequeñas variaciones ocurren sin alterar significativamente el comportamiento general.',
    RenderComponent: VisPersistencia
  }
];

// 4. Layout Component (Strictly Grid based)
const LessonLayout: React.FC<LessonLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 grid grid-rows-[auto_1fr] font-sans text-slate-800">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-md p-4 grid grid-cols-[auto_1fr] gap-4 items-center">
        <div className="bg-white/20 p-2 rounded-lg grid place-items-center">
          <Activity className="w-6 h-6 text-indigo-50" />
        </div>
        <div className="grid grid-rows-[auto_auto]">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Control Estadístico de Procesos</h1>
          
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 md:p-8 grid grid-cols-1 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(tabsData[0].id);

  const activeTab = useMemo(
    () => tabsData.find(tab => tab.id === activeTabId) || tabsData[0],
    [activeTabId]
  );

  return (
    <LessonLayout>
      {/* Container Layout using CSS Grid exclusively */}
      <div className="grid grid-rows-[auto_1fr] gap-6 w-full h-full">
        
        {/* Navigation Tabs (Grid-based) */}
        <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200 grid grid-cols-2 md:grid-cols-5 gap-2">
          {tabsData.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`grid grid-cols-[auto_1fr] gap-2 items-center p-3 rounded-lg text-sm font-semibold transition-all duration-200 text-left ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600 shadow-inner' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
                aria-selected={isActive}
                role="tab"
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="truncate">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Panel Content (Grid-based Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-start">
          
          {/* Text Section / Meta */}
          <Card className="grid grid-rows-[auto_1fr] gap-4 p-6 bg-white border-t-4 border-t-indigo-500">
            <div className="grid gap-2 border-b border-slate-100 pb-4">
             
              <h2 className="text-2xl font-extrabold text-slate-800">
                {activeTab.diagramTitle}
              </h2>
            </div>
            <div className="grid content-start pt-2">
              <p className="text-slate-600 leading-relaxed text-lg">
                {activeTab.diagramDescription}
              </p>
            </div>
          </Card>

          {/* Render Component Section */}
          <Card className="grid grid-rows-[auto_1fr]  p-2 bg-white">
            
            <div className="grid place-items-center p-4  w-full relative">
              <activeTab.RenderComponent />
            </div>
          </Card>

        </div>
      </div>
    </LessonLayout>
  );
}