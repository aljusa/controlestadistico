import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';
import { Factory, Car, Pill, Truck, Activity, Network, TrendingDown, Target, ShieldCheck,  } from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---

interface QuarkData {
  id: string;
  tabLabel: string;
  title: string;
  explanation: string;
  diagramTitle: string;
  diagramDescription: string;
}

// --- DATOS DE LA LECCIÓN ---

const QUARKS_DATA: QuarkData[] = [
  {
    id: 'q11',
    tabLabel: 'Manufactura',
    title: 'Aplicación del control estadístico en la manufactura',
    explanation: 'La industria manufacturera es uno de los sectores donde más se utilizan las herramientas de control estadístico. Estas herramientas permiten supervisar los procesos de producción, identificar variaciones anormales y reducir la aparición de defectos en los productos.',
    diagramTitle: 'Monitoreo de Variables en Línea de Producción',
    diagramDescription: 'Gráfico de control (X-barra) que representa el monitoreo en tiempo real de una variable crítica, identificando puntos dentro de los límites de control superior e inferior (UCL/LCL).'
  },
  {
    id: 'q12',
    tabLabel: 'Automotriz',
    title: 'Aplicación en la industria automotriz',
    explanation: 'En la industria automotriz, el control estadístico se utiliza para garantizar la precisión y confiabilidad de los componentes que forman parte de los vehículos. La supervisión estadística de los procesos ayuda a mantener altos niveles de calidad en sistemas complejos.',
    diagramTitle: 'Análisis de Precisión de Componentes Automotrices',
    diagramDescription: 'Gráfico de dispersión que evalúa la precisión dimensional de piezas ensambladas. La concentración cerca del valor nominal (0) indica alta precisión y calidad en la tolerancia.'
  },
  {
    id: 'q13',
    tabLabel: 'Farma/Alimentos',
    title: 'Aplicación en industrias farmacéuticas y alimentarias',
    explanation: 'En sectores como la industria farmacéutica y la producción de alimentos, el control estadístico es fundamental para garantizar que los productos cumplan con estrictos estándares de calidad y seguridad. Estas herramientas permiten monitorear los procesos y asegurar la consistencia de los productos.',
    diagramTitle: 'Indicadores de Consistencia y Pureza',
    diagramDescription: 'Gráfico de barras comparativo que monitorea lotes de producción contra un estándar estricto de seguridad, verificando que la variabilidad se mantenga en el rango de calidad aceptable.'
  },
  {
    id: 'q14',
    tabLabel: 'Servicios/Logística',
    title: 'Aplicación en servicios y logística',
    explanation: 'El control estadístico también se aplica en el sector de servicios y logística. En estos contextos, se utilizan datos para analizar indicadores como tiempos de atención, eficiencia operativa y desempeño de los sistemas.',
    diagramTitle: 'Eficiencia Operativa y Tiempos de Atención',
    diagramDescription: 'Gráfico de área que muestra la reducción de tiempos de ciclo y la estabilización del tiempo de entrega en un sistema logístico a lo largo del periodo de monitoreo.'
  },
  {
    id: 'q15',
    tabLabel: 'Metodologías Modernas',
    title: 'Control estadístico en metodologías modernas',
    explanation: 'En la actualidad, el control estadístico de procesos forma parte de diversas metodologías modernas de gestión de calidad. Estas metodologías utilizan datos y análisis estadístico para reducir la variabilidad, mejorar el desempeño de los procesos y aumentar la satisfacción del cliente.',
    diagramTitle: 'Integración en Sistemas de Gestión de Calidad',
    diagramDescription: 'Mapa conceptual que conecta el Control Estadístico de Procesos (CEP) con la Mejora Continua, Seis Sigma y el Análisis de Datos Avanzado.'
  },
  {
    id: 'q16',
    tabLabel: 'Síntesis',
    title: 'Síntesis de la relevancia actual',
    explanation: 'El control estadístico de la calidad ha evolucionado desde sus primeros desarrollos en la industria manufacturera hasta convertirse en una herramienta fundamental para la gestión moderna de procesos. Su aplicación permite comprender la variabilidad, mejorar la estabilidad de los procesos y apoyar la toma de decisiones basada en datos.',
    diagramTitle: 'Dimensiones del Control Estadístico Actual',
    diagramDescription: 'Mapa conceptual centralizado que ilustra la evolución y las tres dimensiones fundamentales del control estadístico moderno: Procesos, Mejora y Decisiones.'
  }
];

// --- COMPONENTES BASE ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

// --- COMPONENTES DE VISUALIZACIÓN (DIAGRAM RENDER) ---

const ManufacturingChart = () => {
  const data = [
    { muestra: 1, valor: 10.2, ucl: 11, lcl: 9, media: 10 },
    { muestra: 2, valor: 10.5, ucl: 11, lcl: 9, media: 10 },
    { muestra: 3, valor: 9.8, ucl: 11, lcl: 9, media: 10 },
    { muestra: 4, valor: 10.1, ucl: 11, lcl: 9, media: 10 },
    { muestra: 5, valor: 10.9, ucl: 11, lcl: 9, media: 10 },
    { muestra: 6, valor: 9.2, ucl: 11, lcl: 9, media: 10 },
    { muestra: 7, valor: 10.0, ucl: 11, lcl: 9, media: 10 },
  ];
  return (
    <div className="grid grid-rows-[auto_1fr] h-64 gap-4">
      <div className="grid grid-cols-[auto_1fr] items-center gap-2 text-slate-700 font-semibold">
        <Factory className="w-5 h-5 text-blue-600" />
        <span>Línea Ensamblaje A - Monitoreo de Diámetro</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="muestra" stroke="#64748b" fontSize={12} />
          <YAxis domain={[8, 12]} stroke="#64748b" fontSize={12} />
          <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="ucl" stroke="#ef4444" strokeDasharray="5 5" name="Límite Sup (UCL)" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="lcl" stroke="#ef4444" strokeDasharray="5 5" name="Límite Inf (LCL)" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="media" stroke="#10b981" strokeDasharray="3 3" name="Media" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="valor" stroke="#3b82f6" name="Medición" strokeWidth={3} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const AutomotiveChart = () => {
  // Generando datos de dispersión simulando precisión alrededor del centro (0)
  const data = Array.from({ length: 40 }).map((_, i) => ({
    x: i + 1,
    y: (Math.random() - 0.5) * 0.4, // Variación pequeña
    z: 1 // Tamaño constante del punto
  }));

  return (
    <div className="grid grid-rows-[auto_1fr] h-64 gap-4">
      <div className="grid grid-cols-[auto_1fr] items-center gap-2 text-slate-700 font-semibold">
        <Car className="w-5 h-5 text-indigo-600" />
        <span>Tolerancia de Calibración de Motores (Desviación en mm)</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" dataKey="x" name="Pieza N°" stroke="#64748b" fontSize={12} />
          <YAxis type="number" dataKey="y" name="Desviación" domain={[-0.5, 0.5]} stroke="#64748b" fontSize={12} />
          <ZAxis type="number" dataKey="z" range={[50, 50]} />
          <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px' }} />
          {/* Línea central objetivo */}
          <Line type="monotone" dataKey="y" data={[{x:0, y:0}, {x:40, y:0}]} stroke="#10b981" strokeWidth={2} dot={false} />
          <Scatter name="Precisión" data={data} fill="#6366f1" opacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const PharmaFoodChart = () => {
  const data = [
    { lote: 'L-101', pureza: 99.8, estandar: 99.0 },
    { lote: 'L-102', pureza: 99.9, estandar: 99.0 },
    { lote: 'L-103', pureza: 99.5, estandar: 99.0 },
    { lote: 'L-104', pureza: 99.7, estandar: 99.0 },
    { lote: 'L-105', pureza: 99.9, estandar: 99.0 },
  ];
  return (
    <div className="grid grid-rows-[auto_1fr] h-64 gap-4">
       <div className="grid grid-cols-[auto_1fr] items-center gap-2 text-slate-700 font-semibold">
        <Pill className="w-5 h-5 text-emerald-600" />
        <span>Análisis de Pureza de Activos por Lote (%)</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="lote" stroke="#64748b" fontSize={12} />
          <YAxis domain={[98, 100]} stroke="#64748b" fontSize={12} />
          <RechartsTooltip contentStyle={{ borderRadius: '8px' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="pureza" fill="#10b981" name="Nivel de Pureza Alcanzado" radius={[4, 4, 0, 0]} barSize={40} />
          <Line type="step" dataKey="estandar" stroke="#ef4444" strokeWidth={3} name="Estándar Mínimo Regulatorio" dot={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ServicesChart = () => {
  const data = [
    { semana: 'Sem 1', tiempoAtencion: 45, objetivo: 30 },
    { semana: 'Sem 2', tiempoAtencion: 42, objetivo: 30 },
    { semana: 'Sem 3', tiempoAtencion: 38, objetivo: 30 },
    { semana: 'Sem 4', tiempoAtencion: 35, objetivo: 30 },
    { semana: 'Sem 5', tiempoAtencion: 32, objetivo: 30 },
    { semana: 'Sem 6', tiempoAtencion: 29, objetivo: 30 },
    { semana: 'Sem 7', tiempoAtencion: 28, objetivo: 30 },
  ];
  return (
    <div className="grid grid-rows-[auto_1fr] h-64 gap-4">
      <div className="grid grid-cols-[auto_1fr] items-center gap-2 text-slate-700 font-semibold">
        <Truck className="w-5 h-5 text-amber-600" />
        <span>Tiempos Logísticos y de Respuesta al Cliente (Minutos)</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="colorTiempo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="semana" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} domain={[20, 50]} />
          <RechartsTooltip contentStyle={{ borderRadius: '8px' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Area type="monotone" dataKey="tiempoAtencion" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTiempo)" name="Tiempo Real Promedio" strokeWidth={3} />
          <Line type="monotone" dataKey="objetivo" stroke="#10b981" strokeDasharray="5 5" name="Tiempo Objetivo (SLA)" dot={false} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const MethodologiesMap = () => (
  <div className="w-full h-64 bg-slate-50 rounded-lg border border-slate-100 grid place-items-center p-4">
     {/* Usando CSS Grid para posicionar nodos simulando un mapa conceptual sin depender de position absolute para mejor escalabilidad */}
     <div className="grid grid-rows-3 grid-cols-3 gap-4 w-full h-full max-w-lg">
        {/* Nodos vacíos para espaciado en Grid */}
        <div className="col-start-2 row-start-1 grid place-items-center">
            <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-xl text-center shadow-sm w-full border border-blue-200 text-sm">
                Mejora Continua (Kaizen)
            </div>
        </div>
        
        {/* Nodo Central */}
        <div className="col-start-2 row-start-2 grid place-items-center relative z-10">
            <div className="bg-slate-800 text-white font-bold px-6 py-4 rounded-xl text-center shadow-md w-[110%] border-2 border-slate-600">
                Control Estadístico (CEP)
            </div>
        </div>

        {/* Nodos Inferiores */}
        <div className="col-start-1 row-start-3 grid place-items-center">
             <div className="bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-xl text-center shadow-sm w-full border border-indigo-200 text-sm">
                Metodología Seis Sigma
            </div>
        </div>
        <div className="col-start-3 row-start-3 grid place-items-center">
             <div className="bg-emerald-100 text-emerald-800 font-semibold px-4 py-2 rounded-xl text-center shadow-sm w-full border border-emerald-200 text-sm">
                Análisis de Datos Masivos
            </div>
        </div>
        
        {/* SVG Lines rendered as a background layer spanning the whole grid */}
        <svg className="row-start-1 row-span-3 col-start-1 col-span-3 w-full h-full pointer-events-none" style={{ gridArea: '1 / 1 / 4 / 4' }}>
            <path d="M 50% 50% L 50% 16%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 50% 50% L 16% 83%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 50% 50% L 83% 83%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
     </div>
  </div>
);

const SynthesisMap = () => (
  <div className="w-full h-64 bg-slate-50 rounded-lg border border-slate-100 grid place-items-center p-4">
    <div className="grid grid-rows-3 grid-cols-3 gap-2 w-full h-full max-w-2xl">
      
      {/* Nodos Periféricos */}
      <div className="col-start-1 row-start-2 grid place-items-center">
          <div className="bg-white text-slate-700 font-medium px-4 py-3 rounded-lg text-center shadow-sm border-l-4 border-blue-500 w-full text-sm">
             <Activity className="w-4 h-4 mx-auto mb-1 text-blue-500" />
             Estabilidad de Procesos
          </div>
      </div>

      <div className="col-start-3 row-start-1 grid place-items-center">
          <div className="bg-white text-slate-700 font-medium px-4 py-3 rounded-lg text-center shadow-sm border-l-4 border-emerald-500 w-full text-sm">
             <TrendingDown className="w-4 h-4 mx-auto mb-1 text-emerald-500" />
             Reducción Variabilidad
          </div>
      </div>

      <div className="col-start-3 row-start-3 grid place-items-center">
          <div className="bg-white text-slate-700 font-medium px-4 py-3 rounded-lg text-center shadow-sm border-l-4 border-purple-500 w-full text-sm">
             <Target className="w-4 h-4 mx-auto mb-1 text-purple-500" />
             Decisiones por Datos
          </div>
      </div>

      {/* Nodo Central */}
      <div className="col-start-2 row-start-2 grid place-items-center relative z-10">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white font-bold px-6 py-6 rounded-full text-center shadow-lg border-4 border-slate-100 aspect-square grid place-content-center">
             Control<br/>Estadístico
          </div>
      </div>

       {/* Conectores SVG */}
       <svg className="row-start-1 row-span-3 col-start-1 col-span-3 w-full h-full pointer-events-none" style={{ gridArea: '1 / 1 / 4 / 4' }}>
          <path d="M 50% 50% L 16% 50%" stroke="#cbd5e1" strokeWidth="3" />
          <path d="M 50% 50% L 83% 16%" stroke="#cbd5e1" strokeWidth="3" />
          <path d="M 50% 50% L 83% 83%" stroke="#cbd5e1" strokeWidth="3" />
      </svg>
    </div>
  </div>
);


const RenderDiagram = ({ id }: { id: string }) => {
  switch (id) {
    case 'q11': return <ManufacturingChart />;
    case 'q12': return <AutomotiveChart />;
    case 'q13': return <PharmaFoodChart />;
    case 'q14': return <ServicesChart />;
    case 'q15': return <MethodologiesMap />;
    case 'q16': return <SynthesisMap />;
    default: return <div className="text-slate-400 p-8 text-center grid place-items-center">Diagrama no encontrado</div>;
  }
};

// --- ESTRUCTURA PRINCIPAL (LAYOUT & HEADER) ---

interface LessonLayoutProps {
  children: React.ReactNode;
  activeId: string;
  onTabChange: (id: string) => void;
}

const LessonLayout: React.FC<LessonLayoutProps> = ({ children, activeId, onTabChange }) => {
  return (
    // GRID PRIMARIO: Divide Header (auto) del Main Content (1fr)
    <div className="min-h-screen bg-slate-50 text-slate-800 grid grid-rows-[auto_1fr] gap-6 p-4 md:p-8 font-sans">
      
      {/* HEADER: GRID SECUNDARIO para Título y Nav */}
      <header className="grid grid-rows-[auto_auto] gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl grid place-items-center">
            <Network className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Fundamentos y Aplicación del Control Estadístico
          </h1>
        </div>

        {/* TABS NAVEGACIÓN: GRID TERCIARIO para los botones */}
        <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 border-t border-slate-100 pt-4">
          {QUARKS_DATA.map((quark) => (
            <button
              key={quark.id}
              onClick={() => onTabChange(quark.id)}
              className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${activeId === quark.id 
                  ? 'bg-slate-800 text-white shadow-md transform scale-[1.02]' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                }`}
            >
              {quark.tabLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="grid grid-cols-1 items-start">
        {children}
      </main>
    </div>
  );
};


// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(QUARKS_DATA[0].id);
  const activeQuark = QUARKS_DATA.find(q => q.id === activeTab) || QUARKS_DATA[0];

  return (
    <LessonLayout activeId={activeTab} onTabChange={setActiveTab}>
      
      {/* CONTENEDOR DEL PANEL: GRID para dividir Explicación y Diagrama en pantallas grandes */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* PANEL IZQUIERDO: Explicación Conceptual */}
        <Card className="grid grid-rows-[auto_1fr] gap-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            {activeQuark.title}
          </h2>
          <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
               <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              {activeQuark.explanation}
            </p>
          </div>
        </Card>

        {/* PANEL DERECHO: Componente Diagram Render */}
        <Card className="grid grid-rows-[auto_auto_1fr] gap-5 bg-gradient-to-br from-white to-slate-50/50">
          <div className="grid gap-1">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              {activeQuark.diagramTitle}
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              {activeQuark.diagramDescription}
            </p>
          </div>
          
          {/* Renderizado Dinámico del Diagrama */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-inner">
            <RenderDiagram id={activeQuark.id} />
          </div>
        </Card>
      </div>

    </LessonLayout>
  );
}