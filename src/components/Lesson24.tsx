import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { 
  Search, 
  Table as TableIcon, 
  ClipboardCheck, 
  TrendingUp, 
  Activity, 
  Network 
} from 'lucide-react';

// --- DEFINICIÓN DE TIPOS E INTERFACES ---

type RenderType = 
  | 'defect-examples' 
  | 'concept-comparison' 
  | 'inspection-process' 
  | 'trend-analysis' 
  | 'control-chart' 
  | 'concept-map';

interface TabData {
  id: string;
  shortTitle: string;
  icon: React.ReactNode;
  diagramTitle: string;
  diagramDescription: string;
  renderType: RenderType;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  tabs: TabData[];
  activeTabIndex: number;
  onTabChange: (index: number) => void;
}

interface DiagramRenderProps {
  type: RenderType;
}

// --- DATOS DE LA LECCIÓN (QUARKS 11 - 16) ---

const LESSON_DATA: TabData[] = [
  {
    id: 'q11',
    shortTitle: 'Ejemplos de Defectos',
    icon: <Search className="w-5 h-5" />,
    diagramTitle: 'Quark 11 — Ejemplos de defectos en productos',
    diagramDescription: 'Los defectos pueden manifestarse como imperfecciones menores en el producto, como rayones en una superficie, pequeñas burbujas en un material o irregularidades en el acabado de una pieza.',
    renderType: 'defect-examples'
  },
  {
    id: 'q12',
    shortTitle: 'Defecto vs Defectuoso',
    icon: <TableIcon className="w-5 h-5" />,
    diagramTitle: 'Quark 12 — Diferencia conceptual entre defecto y producto defectuoso',
    diagramDescription: 'La diferencia principal entre ambos conceptos es que un producto defectuoso es una unidad completa que no cumple con las especificaciones, mientras que un defecto es una imperfección específica que puede aparecer dentro de un producto.',
    renderType: 'concept-comparison'
  },
  {
    id: 'q13',
    shortTitle: 'Inspección por Atributo',
    icon: <ClipboardCheck className="w-5 h-5" />,
    diagramTitle: 'Quark 13 — Uso de datos por atributo en la inspección de calidad',
    diagramDescription: 'Los datos por atributo se utilizan con frecuencia en procesos de inspección, especialmente cuando la evaluación de calidad se basa en observaciones visuales o en el conteo de defectos presentes en los productos.',
    renderType: 'inspection-process'
  },
  {
    id: 'q14',
    shortTitle: 'Análisis del Proceso',
    icon: <TrendingUp className="w-5 h-5" />,
    diagramTitle: 'Quark 14 — Análisis del proceso mediante datos por atributo',
    diagramDescription: 'El análisis de datos por atributo permite evaluar el comportamiento del proceso productivo a lo largo del tiempo. Al registrar la cantidad de defectos o productos defectuosos, es posible identificar cambios en la calidad del proceso.',
    renderType: 'trend-analysis'
  },
  {
    id: 'q15',
    shortTitle: 'Gráficos de Control',
    icon: <Activity className="w-5 h-5" />,
    diagramTitle: 'Quark 15 — Uso de gráficos de control para atributos',
    diagramDescription: 'En el control estadístico de procesos, los datos por atributo pueden analizarse mediante gráficos de control para atributos. Estos gráficos permiten monitorear el número de defectos o la proporción de productos defectuosos y detectar posibles desviaciones en el proceso.',
    renderType: 'control-chart'
  },
  {
    id: 'q16',
    shortTitle: 'Importancia en Calidad',
    icon: <Network className="w-5 h-5" />,
    diagramTitle: 'Quark 16 — Importancia de los datos por atributo en el control de calidad',
    diagramDescription: 'Los datos por atributo proporcionan una forma práctica y sencilla de evaluar la calidad de los productos. Su uso permite monitorear el comportamiento del proceso, identificar problemas potenciales y apoyar la toma de decisiones en la gestión de calidad.',
    renderType: 'concept-map'
  }
];

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// --- RENDERIZADOR DE DIAGRAMAS ---

const DiagramRender: React.FC<DiagramRenderProps> = ({ type }) => {
  // Datos simulados para gráficos
  const trendData = [
    { lote: 'Lote 1', defectos: 12 },
    { lote: 'Lote 2', defectos: 15 },
    { lote: 'Lote 3', defectos: 8 },
    { lote: 'Lote 4', defectos: 22 },
    { lote: 'Lote 5', defectos: 14 },
    { lote: 'Lote 6', defectos: 10 },
  ];

  const controlChartData = [
    { muestra: '1', valor: 4 },
    { muestra: '2', valor: 6 },
    { muestra: '3', valor: 5 },
    { muestra: '4', valor: 14 }, // Posible punto fuera de control
    { muestra: '5', valor: 7 },
    { muestra: '6', valor: 5 },
    { muestra: '7', valor: 8 },
    { muestra: '8', valor: 6 },
  ];

  switch (type) {
    case 'defect-examples':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center w-full h-full p-8 bg-slate-50 rounded-lg">
          <div className="grid relative w-64 h-64 bg-slate-300 rounded-lg shadow-inner border-4 border-slate-400">
            {/* Burbujas */}
            <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-slate-400 border border-slate-500"></div>
            <div className="absolute top-10 left-14 w-2 h-2 rounded-full bg-slate-400 border border-slate-500"></div>
            {/* Rayón */}
            <div className="absolute top-1/2 left-1/4 w-32 h-1 bg-slate-500 transform -rotate-12 rounded-full"></div>
            {/* Irregularidad */}
            <div className="absolute bottom-4 right-4 w-12 h-8 bg-slate-400 rounded-tl-3xl opacity-80"></div>
          </div>
          <div className="grid gap-4 w-full">
            <Card className="p-4 border-l-4 border-l-amber-500">
              <h4 className="font-bold text-amber-700">Burbujas en el material</h4>
              <p className="text-sm text-slate-600">Inclusiones de aire atrapadas durante el moldeado.</p>
            </Card>
            <Card className="p-4 border-l-4 border-l-red-500">
              <h4 className="font-bold text-red-700">Rayones superficiales</h4>
              <p className="text-sm text-slate-600">Marcas causadas por manipulación inadecuada.</p>
            </Card>
            <Card className="p-4 border-l-4 border-l-blue-500">
              <h4 className="font-bold text-blue-700">Irregularidades de acabado</h4>
              <p className="text-sm text-slate-600">Deformaciones en los bordes de la pieza.</p>
            </Card>
          </div>
        </div>
      );

    case 'concept-comparison':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full p-4">
          <Card className="grid grid-rows-[auto_1fr] bg-emerald-50 border-emerald-200">
            <div className="grid p-4 bg-emerald-100 border-b border-emerald-200 font-bold text-emerald-800 text-center text-lg">
              Defecto
            </div>
            <div className="grid gap-4 p-6 content-start">
              <p className="text-slate-700"><strong>Definición:</strong> Imperfección específica que aparece dentro o en la superficie de un producto.</p>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-start text-sm bg-white p-3 rounded border border-emerald-100">
                <span className="font-bold text-emerald-600">Ejemplo:</span>
                <span>Un rayón en la pantalla de un teléfono móvil. El teléfono aún puede encender y funcionar.</span>
              </div>
            </div>
          </Card>
          
          <Card className="grid grid-rows-[auto_1fr] bg-rose-50 border-rose-200">
            <div className="grid p-4 bg-rose-100 border-b border-rose-200 font-bold text-rose-800 text-center text-lg">
              Producto Defectuoso
            </div>
            <div className="grid gap-4 p-6 content-start">
              <p className="text-slate-700"><strong>Definición:</strong> Unidad completa que no cumple con las especificaciones generales y no es apta para su uso o venta.</p>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-start text-sm bg-white p-3 rounded border border-rose-100">
                <span className="font-bold text-rose-600">Ejemplo:</span>
                <span>Un teléfono móvil con la batería inflada o la placa base quemada. La unidad entera es inservible.</span>
              </div>
            </div>
          </Card>
        </div>
      );

    case 'inspection-process':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full h-full p-6 bg-slate-50 items-center">
          <Card className="grid p-6 justify-items-center gap-4 border-indigo-200">
            <div className="grid w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full items-center justify-items-center">
              <ClipboardCheck className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-center text-indigo-900">1. Inspección Visual</h3>
            <p className="text-sm text-center text-slate-600">El operador evalúa cada unidad en la línea de producción.</p>
          </Card>
          
          <div className="grid grid-cols-[1fr_auto_1fr] items-center text-slate-400">
            <div className="h-0.5 w-full bg-slate-300"></div>
            <div className="px-2 font-bold text-sm uppercase">Clasificación</div>
            <div className="h-0.5 w-full bg-slate-300"></div>
          </div>

          <div className="grid grid-rows-2 gap-4">
            <Card className="grid grid-cols-[auto_1fr] items-center p-4 border-l-4 border-l-emerald-500">
              <div className="grid w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 items-center justify-items-center font-bold mr-4">✓</div>
              <div>
                <h4 className="font-bold text-slate-800">Conforme</h4>
                <p className="text-xs text-slate-500">0 defectos críticos encontrados</p>
              </div>
            </Card>
            <Card className="grid grid-cols-[auto_1fr] items-center p-4 border-l-4 border-l-rose-500">
              <div className="grid w-8 h-8 rounded-full bg-rose-100 text-rose-600 items-center justify-items-center font-bold mr-4">✗</div>
              <div>
                <h4 className="font-bold text-slate-800">No Conforme</h4>
                <p className="text-xs text-slate-500">≥ 1 defecto registrado (Atributo)</p>
              </div>
            </Card>
          </div>
        </div>
      );

    case 'trend-analysis':
      return (
        <div className="grid w-full h-[400px] p-6 bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="lote" stroke="#64748b" />
              <YAxis stroke="#64748b" label={{ value: 'Cantidad de Defectos', angle: -90, position: 'insideLeft', style: { fill: '#475569' } }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line 
                type="monotone" 
                dataKey="defectos" 
                name="Defectos Registrados" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 6, strokeWidth: 2, fill: '#fff' }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'control-chart':
      return (
        <div className="grid w-full h-[400px] p-6 bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={controlChartData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="muestra" stroke="#64748b" label={{ value: 'Muestra / Tiempo', position: 'insideBottom', offset: -10 }} />
              <YAxis stroke="#64748b" domain={[0, 18]} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              
              <ReferenceLine y={12} stroke="#ef4444" strokeDasharray="4 4" label={{ position: 'right', value: 'LSC (Límite Superior)', fill: '#ef4444', fontSize: 12 }} />
              <ReferenceLine y={6} stroke="#10b981" label={{ position: 'right', value: 'LC (Línea Central)', fill: '#10b981', fontSize: 12 }} />
              <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" label={{ position: 'right', value: 'LIC (Límite Inferior)', fill: '#ef4444', fontSize: 12 }} />
              
              <Line 
                type="linear" 
                dataKey="valor" 
                name="Conteo de Atributos" 
                stroke="#6366f1" 
                strokeWidth={2}
                dot={(props: any) => {
                  const { cx, cy, value, key } = props;
                  const isOutlier = value > 12 || value < 0;
                  return (
                    <circle 
                      key={key} 
                      cx={cx} cy={cy} r={isOutlier ? 6 : 4} 
                      fill={isOutlier ? '#ef4444' : '#fff'} 
                      stroke={isOutlier ? '#ef4444' : '#6366f1'} 
                      strokeWidth={2} 
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'concept-map':
      return (
        <div className="grid grid-rows-[auto_1fr] gap-8 w-full p-8 bg-slate-50 justify-items-center">
          <Card className="grid px-8 py-4 bg-blue-600 text-white font-bold text-xl shadow-md border-none text-center">
            Datos por Atributo
          </Card>
          
          <div className="grid grid-cols-3 w-full max-w-4xl gap-4 relative">
            {/* Líneas conectoras simuladas mediante bordes en CSS Grid - Adaptación para evitar SVGs complejos absolutos */}
            <div className="absolute top-0 left-1/2 w-[66%] h-8 border-t-2 border-l-2 border-r-2 border-slate-300 transform -translate-x-1/2 rounded-t-lg -mt-4 -z-10"></div>
            <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-slate-300 transform -translate-x-1/2 -mt-4 -z-10"></div>

            <Card className="grid p-6 text-center border-t-4 border-t-cyan-500 hover:-translate-y-1 transition-transform">
              <div className="grid justify-items-center mb-3 text-cyan-600">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Evaluación de Calidad</h4>
              <p className="text-xs text-slate-600">Forma práctica y sencilla de calificar productos visualmente.</p>
            </Card>

            <Card className="grid p-6 text-center border-t-4 border-t-purple-500 hover:-translate-y-1 transition-transform">
              <div className="grid justify-items-center mb-3 text-purple-600">
                <Activity className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Monitoreo del Proceso</h4>
              <p className="text-xs text-slate-600">Seguimiento del comportamiento productivo en el tiempo.</p>
            </Card>

            <Card className="grid p-6 text-center border-t-4 border-t-orange-500 hover:-translate-y-1 transition-transform">
              <div className="grid justify-items-center mb-3 text-orange-600">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Detección de Problemas</h4>
              <p className="text-xs text-slate-600">Identificación temprana para apoyar la toma de decisiones.</p>
            </Card>
          </div>
        </div>
      );

    default:
      return <div>Visualización no encontrada</div>;
  }
};

// --- COMPONENTE DE ESTRUCTURA PRINCIPAL (LAYOUT) ---

const LessonLayout: React.FC<LessonLayoutProps> = ({ tabs, activeTabIndex, onTabChange }) => {
  const activeTab = tabs[activeTabIndex];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 p-4 md:p-8 font-sans gap-6">
      
      {/* HEADER: Título y Navegación de Pestañas */}
      <header className="grid gap-6 max-w-6xl mx-auto w-full">
        <div className="grid gap-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Control de Calidad: Análisis por Atributos
          </h1>
          <p className="text-slate-500 text-lg">
            Módulo interactivo de aprendizaje sobre defectos y datos categóricos.
          </p>
        </div>

        {/* NAVEGACIÓN (TABS) - Uso exclusivo de CSS Grid */}
        <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-200 p-2 rounded-xl">
          {tabs.map((tab, index) => {
            const isActive = index === activeTabIndex;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(index)}
                className={`
                  grid grid-cols-[auto_1fr] items-center gap-2 px-3 py-3 rounded-lg text-sm font-semibold transition-all duration-200 outline-none
                  ${isActive 
                    ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-900/5' 
                    : 'text-slate-600 hover:bg-slate-300 hover:text-slate-900'}
                `}
                aria-selected={isActive}
                role="tab"
              >
                {tab.icon}
                <span className="truncate text-left">{tab.shortTitle}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="grid max-w-6xl mx-auto w-full items-start">
        <Card className="grid grid-rows-[auto_auto_1fr] min-h-[600px]">
          
          {/* Título del Diagrama */}
          <div className="grid p-6 border-b border-slate-100 bg-white">
            <h2 className="text-2xl font-bold text-slate-800">
              {activeTab.diagramTitle}
            </h2>
          </div>

          {/* Descripción del Diagrama */}
          <div className="grid p-6 bg-slate-50 border-b border-slate-100">
            <p className="text-slate-600 leading-relaxed text-lg">
              {activeTab.diagramDescription}
            </p>
          </div>

          {/* Renderizado del Diagrama */}
          <div className="grid bg-white p-2">
            <DiagramRender type={activeTab.renderType} />
          </div>

        </Card>
      </main>
    </div>
  );
};

// --- COMPONENTE RAÍZ (APP) ---

export default function App() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <LessonLayout 
      tabs={LESSON_DATA}
      activeTabIndex={activeTabIndex}
      onTabChange={setActiveTabIndex}
    />
  );
}