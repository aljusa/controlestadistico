import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, ReferenceLine
} from 'recharts';
import { Factory, Globe, TrendingDown, Layers, Activity } from 'lucide-react';

// --- DEFINICIONES DE TIPOS ---

interface QuarkContent {
  id: string;
  title: string;
  type: string;
  explanation: string;
  diagramTitle: string;
  diagramDescription: string;
  icon: React.ReactNode;
}

// --- DATOS DE LA LECCIÓN ---

const lessonData: QuarkContent[] = [
  {
    id: 'q6',
    title: 'Expansión en la Segunda Guerra Mundial',
    type: 'Q-ctx',
    explanation: 'Durante la Segunda Guerra Mundial, el control estadístico de la calidad se difundió ampliamente en la industria estadounidense. La necesidad de producir grandes cantidades de equipos militares con altos niveles de confiabilidad impulsó la adopción de métodos estadísticos para controlar los procesos productivos y reducir defectos.',
    diagramTitle: 'Producción vs. Defectos (1940-1945)',
    diagramDescription: 'Gráfico que ilustra cómo la adopción de métodos estadísticos permitió un aumento exponencial en la producción militar mientras se reducía drásticamente la tasa de defectos.',
    icon: <Factory size={20} />
  },
  {
    id: 'q7',
    title: 'Difusión Internacional',
    type: 'Q-ctx',
    explanation: 'Después de la guerra, las herramientas de control estadístico comenzaron a difundirse a nivel internacional. Expertos en calidad promovieron el uso de métodos estadísticos como una forma efectiva de mejorar la eficiencia y la consistencia de los procesos productivos a nivel global.',
    diagramTitle: 'Mapa Conceptual de Difusión Global',
    diagramDescription: 'Esquema visual que representa la exportación del conocimiento en control estadístico desde Estados Unidos hacia Europa, Asia y el resto del mundo en la posguerra.',
    icon: <Globe size={20} />
  },
  {
    id: 'q8',
    title: 'Contribuciones de W.E. Deming',
    type: 'Q-ctx',
    explanation: 'W. Edwards Deming fue un estadístico que promovió la aplicación de métodos estadísticos en la gestión de calidad. Sus enseñanzas destacaban la importancia de comprender la variabilidad de los procesos y utilizar datos para mejorar continuamente el desempeño del sistema productivo.',
    diagramTitle: 'Reducción de la Variabilidad del Proceso',
    diagramDescription: 'Visualización de cómo la filosofía de Deming busca entender y reducir la varianza en los lotes de producción a lo largo del tiempo, logrando mayor consistencia.',
    icon: <TrendingDown size={20} />
  },
  {
    id: 'q9',
    title: 'Contribuciones de J.M. Juran',
    type: 'Q-ctx',
    explanation: 'Joseph M. Juran realizó importantes aportes a la gestión de la calidad al integrar el control estadístico con enfoques de planificación y mejora continua. Su trabajo contribuyó a ampliar la visión de la calidad, incorporando aspectos organizacionales y estratégicos.',
    diagramTitle: 'Trilogía de la Calidad de Juran',
    diagramDescription: 'Esquema que conecta los tres pilares fundamentales propuestos por Juran: Planificación de la Calidad, Control de la Calidad y Mejora Continua.',
    icon: <Layers size={20} />
  },
  {
    id: 'q10',
    title: 'Influencia en la Industria Japonesa',
    type: 'Q-ctx',
    explanation: 'Las ideas promovidas por Deming y Juran tuvieron un impacto significativo en el desarrollo industrial de Japón después de la Segunda Guerra Mundial. Las empresas japonesas adoptaron ampliamente el control estadístico de procesos, mejorando radicalmente su competitividad internacional.',
    diagramTitle: 'Gráfico de Control Estadístico de Procesos (SPC)',
    diagramDescription: 'Ejemplo de un gráfico de control utilizado en fábricas japonesas, monitorizando que los datos de producción se mantengan dentro de los Límites de Control Superior e Inferior.',
    icon: <Activity size={20} />
  }
];

// --- COMPONENTES VISUALES ESPECÍFICOS ---

const WWIIChart = () => {
  const data = [
    { year: '1940', produccion: 10, defectos: 8 },
    { year: '1941', produccion: 30, defectos: 7 },
    { year: '1942', produccion: 60, defectos: 5 },
    { year: '1943', produccion: 100, defectos: 3 },
    { year: '1944', produccion: 150, defectos: 1.5 },
    { year: '1945', produccion: 200, defectos: 0.8 },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDef" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <XAxis dataKey="year" />
        <YAxis />
        <RechartsTooltip />
        <Area type="monotone" dataKey="produccion" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProd)" name="Producción (Índice)" />
        <Area type="monotone" dataKey="defectos" stroke="#ef4444" fillOpacity={1} fill="url(#colorDef)" name="Tasa de Defectos (%)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const MapDiffusionVisual = () => {
  return (
    <div className="w-full h-full grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr] gap-4 place-items-center bg-blue-50/50 rounded-lg p-6 relative overflow-hidden">
      {/* Nodos conceptuales */}
      <div className="col-start-1 row-start-2 grid gap-2 place-items-center z-10">
        <div className="w-24 h-24 bg-blue-600 rounded-full grid place-items-center text-white font-bold shadow-lg border-4 border-white">EE.UU.</div>
        <span className="text-sm font-semibold text-slate-600">Origen del Control</span>
      </div>
      
      <div className="col-start-3 row-start-1 grid gap-2 place-items-center z-10">
        <div className="w-20 h-20 bg-emerald-500 rounded-full grid place-items-center text-white font-bold shadow-lg border-4 border-white">Europa</div>
      </div>

      <div className="col-start-3 row-start-3 grid gap-2 place-items-center z-10">
        <div className="w-20 h-20 bg-rose-500 rounded-full grid place-items-center text-white font-bold shadow-lg border-4 border-white">Japón</div>
      </div>

      {/* Flechas SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
        </defs>
        <path d="M 25% 50% Q 50% 25% 75% 25%" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" markerEnd="url(#arrowhead)" />
        <path d="M 25% 50% Q 50% 75% 75% 75%" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" markerEnd="url(#arrowhead)" />
      </svg>
    </div>
  );
};

const DemingChart = () => {
  const data = [
    { batch: 'Lote 1', variabilidad: 85 },
    { batch: 'Lote 2', variabilidad: 70 },
    { batch: 'Lote 3', variabilidad: 55 },
    { batch: 'Lote 4', variabilidad: 40 },
    { batch: 'Lote 5', variabilidad: 25 },
    { batch: 'Lote 6', variabilidad: 15 },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
        <XAxis dataKey="batch" />
        <YAxis label={{ value: 'Nivel de Varianza', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle'} }} />
        <RechartsTooltip cursor={{fill: 'transparent'}} />
        <Bar dataKey="variabilidad" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Variabilidad del Proceso" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const JuranTrilogyVisual = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-4 p-4">
      <div className="grid grid-rows-[auto_1fr] bg-amber-50 border-2 border-amber-200 rounded-xl p-4 shadow-sm">
        <h4 className="font-bold text-amber-800 text-center border-b border-amber-200 pb-2 mb-2">1. Planificación</h4>
        <p className="text-sm text-amber-700 text-center content-center">Identificar clientes, determinar necesidades y desarrollar características del producto.</p>
      </div>
      <div className="grid grid-rows-[auto_1fr] bg-blue-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
        <h4 className="font-bold text-blue-800 text-center border-b border-blue-200 pb-2 mb-2">2. Control</h4>
        <p className="text-sm text-blue-700 text-center content-center">Evaluar desempeño actual, comparar con objetivos y tomar acciones sobre la diferencia.</p>
      </div>
      <div className="grid grid-rows-[auto_1fr] bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 shadow-sm">
        <h4 className="font-bold text-emerald-800 text-center border-b border-emerald-200 pb-2 mb-2">3. Mejora Continua</h4>
        <p className="text-sm text-emerald-700 text-center content-center">Establecer infraestructura, identificar proyectos, proveer recursos y capacitar equipos.</p>
      </div>
    </div>
  );
};

const JapanControlChart = () => {
  const data = [
    { muestra: 'M1', valor: 50 },
    { muestra: 'M2', valor: 52 },
    { muestra: 'M3', valor: 48 },
    { muestra: 'M4', valor: 55 },
    { muestra: 'M5', valor: 49 },
    { muestra: 'M6', valor: 51 },
    { muestra: 'M7', valor: 47 },
    { muestra: 'M8', valor: 53 },
    { muestra: 'M9', valor: 50 },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="muestra" />
        <YAxis domain={[35, 65]} />
        <RechartsTooltip />
        <ReferenceLine y={58} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'LCS (Límite Control Superior)', fill: '#ef4444', fontSize: 12 }} />
        <ReferenceLine y={50} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'insideBottomRight', value: 'Media Central', fill: '#22c55e', fontSize: 12 }} />
        <ReferenceLine y={42} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'bottom', value: 'LCI (Límite Control Inferior)', fill: '#ef4444', fontSize: 12 }} />
        <Line type="monotone" dataKey="valor" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} name="Medición de Calidad" />
      </LineChart>
    </ResponsiveContainer>
  );
};

// --- COMPONENTES ESTRUCTURALES ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

interface DiagramRenderProps {
  activeId: string;
}

const DiagramRender: React.FC<DiagramRenderProps> = ({ activeId }) => {
  const renderVisual = () => {
    switch (activeId) {
      case 'q6': return <WWIIChart />;
      case 'q7': return <MapDiffusionVisual />;
      case 'q8': return <DemingChart />;
      case 'q9': return <JuranTrilogyVisual />;
      case 'q10': return <JapanControlChart />;
      default: return <div className="grid place-items-center h-full text-slate-400">Seleccione un tema</div>;
    }
  };

  return (
    <div className="w-full min-h-[350px] h-full bg-slate-50 border border-slate-200 rounded-lg p-4 grid items-center">
      {renderVisual()}
    </div>
  );
};

interface LessonLayoutProps {
  data: QuarkContent[];
}

const LessonLayout: React.FC<LessonLayoutProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>(data[0].id);
  const activeContent = data.find(q => q.id === activeTab);

  if (!activeContent) return null;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 grid grid-rows-[auto_1fr] gap-8 font-sans">
      
      {/* Header: Title and Nav */}
      <header className="grid grid-rows-[auto_auto] gap-6">
        <div className="grid grid-cols-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Historia del Control Estadístico de Calidad
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Evolución y difusión global de las metodologías de calidad (1940 - Actualidad)
          </p>
        </div>
        
        {/* Navigation Tabs (Strict Grid Layout) */}
        <nav className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto pb-2 border-b-2 border-slate-200">
          {data.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`grid grid-cols-[auto_1fr] gap-2 items-center px-4 py-3 rounded-t-lg transition-all border-b-4 ${
                activeTab === tab.id
                  ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                  : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-200 font-medium'
              }`}
            >
              <div className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}>
                {tab.icon}
              </div>
              <span className="whitespace-nowrap">{tab.title.split(' — ')[0]}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 items-start">
        
        {/* Panel Izquierdo: Explicación Conceptual */}
        <Card className="grid grid-rows-[auto_auto_1fr] gap-4 p-6 h-full">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-center border-b border-slate-100 pb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              {activeContent.icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-tight">
              {activeContent.title}
            </h2>
          </div>
          
          <p className="text-slate-600 leading-relaxed text-lg mt-2">
            {activeContent.explanation}
          </p>
        </Card>

        {/* Panel Derecho: Diagram Render */}
        <Card className="grid grid-rows-[auto_auto_1fr] gap-4 p-6 h-full border-t-4 border-t-blue-500">
          <div className="grid grid-cols-1 gap-2">
            <h3 className="text-2xl font-bold text-slate-800">
              {activeContent.diagramTitle}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {activeContent.diagramDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 mt-4 relative">
            <DiagramRender activeId={activeContent.id} />
          </div>
        </Card>

      </main>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  return <LessonLayout data={lessonData} />;
}