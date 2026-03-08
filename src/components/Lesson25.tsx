import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  
  ReferenceLine,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { CheckCircle2, XCircle, AlertTriangle, Activity, Package } from 'lucide-react';

// --- Tipos e Interfaces ---

interface TabData {
  id: string;
  tabLabel: string;
  title: string;
  concept: string;
  diagramTitle: string;
  diagramDesc: string;
  RenderComponent: React.FC;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  concept: string;
  diagramTitle: string;
  diagramDesc: string;
  RenderComponent: React.FC;
}

// --- Datos de los Gráficos (Mock Data) ---

const pChartDataBasic = [
  { sample: '1', p: 0.05, ucl: 0.15, lcl: 0.0, cl: 0.06 },
  { sample: '2', p: 0.08, ucl: 0.15, lcl: 0.0, cl: 0.06 },
  { sample: '3', p: 0.04, ucl: 0.15, lcl: 0.0, cl: 0.06 },
  { sample: '4', p: 0.06, ucl: 0.15, lcl: 0.0, cl: 0.06 },
  { sample: '5', p: 0.07, ucl: 0.15, lcl: 0.0, cl: 0.06 },
  { sample: '6', p: 0.03, ucl: 0.15, lcl: 0.0, cl: 0.06 },
  { sample: '7', p: 0.05, ucl: 0.15, lcl: 0.0, cl: 0.06 },
  { sample: '8', p: 0.09, ucl: 0.15, lcl: 0.0, cl: 0.06 },
];

const pChartDataShift = [
  { sample: '1', p: 0.04, ucl: 0.12, lcl: 0.0, cl: 0.05 },
  { sample: '2', p: 0.06, ucl: 0.12, lcl: 0.0, cl: 0.05 },
  { sample: '3', p: 0.05, ucl: 0.12, lcl: 0.0, cl: 0.05 },
  { sample: '4', p: 0.03, ucl: 0.12, lcl: 0.0, cl: 0.05 },
  { sample: '5', p: 0.11, ucl: 0.12, lcl: 0.0, cl: 0.05 }, // Advertencia
  { sample: '6', p: 0.14, ucl: 0.12, lcl: 0.0, cl: 0.05 }, // Fuera de control
  { sample: '7', p: 0.13, ucl: 0.12, lcl: 0.0, cl: 0.05 }, // Fuera de control
];

// --- Componentes de Diagramas (Renders) ---

const Diagram1Intro: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-6 w-full h-full p-4 bg-slate-50 rounded-xl">
    <div className="grid grid-cols-5 gap-2 place-items-center bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
      <Package className="text-slate-400 w-8 h-8" />
      <div className="grid w-full h-1 bg-blue-500 rounded-full"></div>
      <Package className="text-slate-400 w-8 h-8" />
      <div className="grid w-full h-1 bg-blue-500 rounded-full"></div>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid place-items-center p-2 bg-green-100 rounded-md border border-green-200">
          <CheckCircle2 className="text-green-600 w-6 h-6" />
        </div>
        <div className="grid place-items-center p-2 bg-red-100 rounded-md border border-red-200">
          <XCircle className="text-red-600 w-6 h-6" />
        </div>
      </div>
    </div>
    <div className="grid place-items-center">
      <div className="grid grid-cols-1 w-full max-w-md gap-4">
        <div className="grid grid-cols-[1fr_auto] p-3 bg-white border border-slate-200 rounded-md items-center">
          <span className="text-sm font-medium text-slate-700">Lote #1042 Inspeccionado</span>
          <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">p = 0.05</span>
        </div>
        <div className="grid h-48 w-full bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pChartDataBasic.slice(0, 4)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="sample" hide />
              <YAxis domain={[0, 0.2]} hide />
              <Line type="stepAfter" dataKey="p" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const Diagram2Definition: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-4 w-full h-full min-h-[350px]">
    <div className="grid p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-md">
      <h4 className="font-bold text-blue-900 text-lg">Diagrama p</h4>
      <p className="text-sm text-blue-800 mt-1">Gráfico de control para la proporción de unidades defectuosas (p) en muestras de tamaño variable o constante.</p>
    </div>
    <div className="grid w-full h-full min-h-[250px] bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={pChartDataBasic} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="sample" label={{ value: 'Muestra (Subgrupo)', position: 'insideBottom', offset: -10 }} tick={{ fill: '#64748b' }} />
          <YAxis label={{ value: 'Proporción Defectuosa (p)', angle: -90, position: 'insideLeft', offset: -5 }} tick={{ fill: '#64748b' }} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <ReferenceLine y={0.15} stroke="#ef4444" strokeDasharray="5 5" label={{ position: 'top', value: 'LCS', fill: '#ef4444', fontSize: 12 }} />
          <ReferenceLine y={0.06} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'top', value: 'LC', fill: '#22c55e', fontSize: 12 }} />
          <ReferenceLine y={0.0} stroke="#ef4444" strokeDasharray="5 5" label={{ position: 'bottom', value: 'LCI', fill: '#ef4444', fontSize: 12 }} />
          <Line type="monotone" dataKey="p" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 5, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 8 }} name="Proporción (p)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Diagram3Purpose: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-4 w-full h-full min-h-[350px]">
    <div className="grid grid-cols-2 gap-4">
      <div className="grid grid-cols-[auto_1fr] gap-3 p-3 bg-green-50 rounded-md border border-green-200 place-items-center">
        <Activity className="text-green-600" />
        <span className="text-sm text-green-800 font-medium w-full">Proceso Estable (Variación Aleatoria)</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-3 p-3 bg-red-50 rounded-md border border-red-200 place-items-center">
        <AlertTriangle className="text-red-600" />
        <span className="text-sm text-red-800 font-medium w-full">Causa Asignable (Cambio de Media)</span>
      </div>
    </div>
    <div className="grid w-full h-full min-h-[250px] bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={pChartDataShift} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="sample" label={{ value: 'Tiempo / Muestras', position: 'insideBottom', offset: -10 }} />
          <YAxis domain={[0, 0.16]} />
          <Tooltip />
          <ReferenceLine y={0.12} stroke="#ef4444" strokeDasharray="5 5" />
          <ReferenceLine y={0.05} stroke="#22c55e" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="p" 
            stroke="#64748b" 
            strokeWidth={2}
            dot={(props: any) => {
              const { cx, cy, payload } = props;
              const isOut = payload.p > payload.ucl;
              return (
                <circle cx={cx} cy={cy} r={isOut ? 6 : 4} fill={isOut ? '#ef4444' : 'white'} stroke={isOut ? '#ef4444' : '#64748b'} strokeWidth={2} />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Diagram4Samples: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 w-full h-full min-h-[350px]">
    <div className="grid grid-rows-[auto_1fr] gap-2">
      <div className="grid p-3 bg-slate-800 text-white font-semibold text-sm rounded-t-md place-items-center">
        Registro de Muestras
      </div>
      <div className="grid grid-rows-4 gap-2">
        {[
          { id: 1, n: 100, def: 5, p: 0.05 },
          { id: 2, n: 100, def: 8, p: 0.08 },
          { id: 3, n: 100, def: 4, p: 0.04 },
          { id: 4, n: 100, def: 6, p: 0.06 },
        ].map((item) => (
          <div key={item.id} className="grid grid-cols-[auto_1fr_auto] gap-4 p-3 bg-white border border-slate-200 rounded-md place-items-center shadow-sm relative overflow-hidden">
            <div className="grid place-items-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">{item.id}</div>
            <div className="grid grid-rows-2 w-full">
              <span className="text-xs text-slate-500">n={item.n}, defectuosos={item.def}</span>
            </div>
            <div className="grid font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded">p={item.p}</div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="grid w-full h-full bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis type="number" dataKey="sample" name="Muestra" domain={[0, 5]} tickCount={6} />
          <YAxis type="number" dataKey="p" name="Proporción" domain={[0, 0.1]} />
          <ZAxis type="number" range={[100, 100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Muestras" data={pChartDataBasic.slice(0, 4).map(d => ({ sample: parseInt(d.sample), p: d.p }))} fill="#3b82f6" shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Diagram5Focus: React.FC = () => {
  // Generar una cuadrícula de 50 elementos para representar la muestra
  const items = Array.from({ length: 50 }, (_, i) => i < 4); // 4 defectuosos de 50 = 0.08

  return (
    <div className="grid grid-rows-[auto_1fr] gap-6 w-full h-full min-h-[350px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid bg-slate-100 p-4 rounded-lg place-items-center text-center border border-slate-200">
          <span className="text-sm text-slate-500 font-medium">Tamaño de Muestra (n)</span>
          <span className="text-3xl font-bold text-slate-800">50</span>
        </div>
        <div className="grid bg-red-50 p-4 rounded-lg place-items-center text-center border border-red-200">
          <span className="text-sm text-red-600 font-medium">Defectuosos (d)</span>
          <span className="text-3xl font-bold text-red-600">4</span>
        </div>
        <div className="grid bg-blue-50 p-4 rounded-lg place-items-center text-center border border-blue-200">
          <span className="text-sm text-blue-800 font-medium">Proporción (p = d/n)</span>
          <span className="text-3xl font-bold text-blue-700">0.08</span>
        </div>
      </div>
      
      <div className="grid bg-white border border-slate-200 p-6 rounded-xl shadow-sm place-items-center">
        <div className="grid grid-cols-10 gap-2 md:gap-3">
          {items.map((isDefective, idx) => (
            <div 
              key={idx} 
              className={`grid w-6 h-6 md:w-8 md:h-8 rounded place-items-center shadow-sm transition-all duration-300 ${isDefective ? 'bg-red-500 scale-110' : 'bg-emerald-400'}`}
              title={isDefective ? 'Defectuoso' : 'Aceptable'}
            >
              {isDefective && <XCircle className="text-white w-4 h-4 md:w-5 md:h-5" />}
            </div>
          ))}
        </div>
        <div className="grid mt-6 text-sm text-slate-500">
          Análisis visual de una muestra: <span className="text-red-500 font-bold mx-1">4 unidades no cumplen</span> las especificaciones.
        </div>
      </div>
    </div>
  );
};

// --- Datos de la Lección (Quarks) ---

const lessonData: TabData[] = [
  {
    id: 'q1',
    tabLabel: '1. Introducción',
    title: 'Introducción al control de productos defectuosos',
    concept: 'En muchos procesos productivos, es importante analizar qué proporción de los productos fabricados presenta defectos. Cuando la evaluación de la calidad se basa en clasificaciones como “defectuoso” o “no defectuoso”, se utilizan datos por atributo. Para monitorear este tipo de información a lo largo del tiempo, el control estadístico de procesos emplea gráficos específicos, entre ellos el diagrama p.',
    diagramTitle: 'Inspección en la Línea de Producción',
    diagramDesc: 'Escena conceptual donde una línea de producción es inspeccionada y los productos se clasifican como “defectuoso” o “aceptable”, registrando la proporción en un gráfico.',
    RenderComponent: Diagram1Intro
  },
  {
    id: 'q2',
    tabLabel: '2. Definición',
    title: 'Definición de diagrama p',
    concept: 'El diagrama p es un gráfico de control utilizado para analizar la proporción de unidades defectuosas en una muestra tomada de un proceso productivo. Cada punto del gráfico representa la fracción o porcentaje de productos defectuosos encontrados en una muestra específica.',
    diagramTitle: 'Estructura del Diagrama p',
    diagramDesc: 'El diagrama consta de un Límite de Control Superior (LCS), un Límite Central (LC) que representa el promedio histórico, y un Límite de Control Inferior (LCI).',
    RenderComponent: Diagram2Definition
  },
  {
    id: 'q3',
    tabLabel: '3. Propósito',
    title: 'Propósito del diagrama p en el control de procesos',
    concept: 'El propósito principal del diagrama p es monitorear cómo cambia la proporción de productos defectuosos a lo largo del tiempo. Este análisis permite evaluar si el proceso mantiene un comportamiento estable o si aparecen cambios que podrían indicar problemas en la producción.',
    diagramTitle: 'Monitoreo Temporal y Detección de Cambios',
    diagramDesc: 'Gráfico temporal donde los valores de proporción defectuosa se registran, revelando un desplazamiento en la media que alerta sobre una causa asignable.',
    RenderComponent: Diagram3Purpose
  },
  {
    id: 'q4',
    tabLabel: '4. Muestras',
    title: 'Representación de muestras en el diagrama p',
    concept: 'En un diagrama p, cada punto del gráfico corresponde a una muestra tomada del proceso. Para cada muestra se calcula la proporción de productos defectuosos y ese valor se registra en el gráfico para analizar su comportamiento a lo largo del tiempo.',
    diagramTitle: 'Mapeo de Muestra a Punto de Control',
    diagramDesc: 'Esquema conceptual donde muestras sucesivas con diferentes tamaños y conteos de defectos generan puntos individuales (coordenadas) en el gráfico.',
    RenderComponent: Diagram4Samples
  },
  {
    id: 'q5',
    tabLabel: '5. Enfoque',
    title: 'Enfoque del diagrama p en productos defectuosos',
    concept: 'El diagrama p se enfoca específicamente en productos defectuosos, es decir, unidades que no cumplen con las especificaciones de calidad establecidas. Su análisis se basa en la proporción de estas unidades dentro de cada muestra inspeccionada.',
    diagramTitle: 'Cálculo de Proporción de Defectos',
    diagramDesc: 'Desglose visual de un lote inspeccionado dividido en grupos de defectuosos y no defectuosos, mostrando claramente el origen matemático del valor "p".',
    RenderComponent: Diagram5Focus
  }
];

// --- Componentes Base de UI ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white p-6 rounded-2xl shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, concept, diagramTitle, diagramDesc, RenderComponent }) => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 w-full h-full items-start">
    {/* Panel Izquierdo: Contenido Teórico */}
    <Card className="grid grid-rows-[auto_1fr] gap-6 h-full content-start">
      <div className="grid gap-2 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 leading-tight">{title}</h2>
        <div className="grid w-12 h-1 bg-blue-600 rounded-full mt-2"></div>
      </div>
      <div className="grid">
        <p className="text-slate-600 leading-relaxed text-lg">
          {concept}
        </p>
      </div>
    </Card>

    {/* Panel Derecho: Visualización */}
    <Card className="grid grid-rows-[auto_auto_1fr] gap-4 h-full min-h-[400px]">
      <div className="grid gap-1">
        <h3 className="text-lg font-bold text-slate-800">{diagramTitle}</h3>
        <p className="text-sm text-slate-500 italic">{diagramDesc}</p>
      </div>
      <div className="grid w-full h-full p-2 bg-slate-50/50 rounded-xl border border-slate-100">
        <RenderComponent />
      </div>
    </Card>
  </div>
);

// --- Componente Principal de la Aplicación ---

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentLesson = lessonData[activeTab];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Header & Navegación (Grid Exclusivamente) */}
      <header className="grid grid-rows-[auto_auto] gap-6 px-6 pt-6 pb-0 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className="grid place-items-center w-10 h-10 bg-blue-600 text-white rounded-lg shadow-sm">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">
            Control Estadístico: El Diagrama p
          </h1>
        </div>

        {/* Sistema de Pestañas (Tabs) mediante Grid */}
        <nav className="grid grid-cols-2 md:grid-cols-5 gap-2 pb-[-1px]">
          {lessonData.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`grid place-items-center py-3 px-2 text-sm font-semibold rounded-t-lg transition-colors border-b-2 
                ${activeTab === index 
                  ? 'bg-blue-50 text-blue-700 border-blue-600' 
                  : 'bg-white text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700'
                }`}
            >
              {tab.tabLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* Área de Contenido Principal */}
      <main className="grid p-4 md:p-8 overflow-y-auto">
        <LessonLayout
          title={currentLesson.title}
          concept={currentLesson.concept}
          diagramTitle={currentLesson.diagramTitle}
          diagramDesc={currentLesson.diagramDesc}
          RenderComponent={currentLesson.RenderComponent}
        />
      </main>

    </div>
  );
}