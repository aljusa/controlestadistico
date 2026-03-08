import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { Settings, Ruler, Scale, Shapes, PaintBucket, } from 'lucide-react';

// --- Tipos e Interfaces ---

interface Quark {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  visualType: 'production-line' | 'definition-measurements' | 'manifestations' | 'distribution-chart' | 'concept-map';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  quarks: Quark[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

interface DiagramRenderProps {
  activeQuark: Quark;
}

// --- Datos de la Lección ---

const QUARKS_DATA: Quark[] = [
  {
    id: 'q1',
    tabLabel: 'Introducción',
    title: 'Introducción a la variabilidad en los procesos',
    description: 'En los procesos productivos, los resultados obtenidos no son exactamente idénticos cada vez que se repite una operación. Aunque se utilicen las mismas máquinas, materiales y procedimientos, siempre aparecen pequeñas diferencias entre los productos fabricados. Estas diferencias constituyen la variabilidad del proceso y forman parte del comportamiento natural de cualquier sistema de producción.',
    visualType: 'production-line'
  },
  {
    id: 'q2',
    tabLabel: 'Definición',
    title: 'Definición de variabilidad en los procesos',
    description: 'La variabilidad se define como el conjunto de diferencias que aparecen en los resultados de un proceso cuando este se repite múltiples veces. En el contexto industrial, ningún proceso produce resultados completamente idénticos, por lo que siempre existirán variaciones en características del producto o del desempeño del proceso.',
    visualType: 'definition-measurements'
  },
  {
    id: 'q3',
    tabLabel: 'Manifestaciones',
    title: 'Manifestaciones de la variabilidad en productos',
    description: 'La variabilidad se manifiesta en diferencias observables en las características de los productos obtenidos. Estas diferencias pueden aparecer en aspectos como el tamaño, el peso, la forma o el acabado superficial. Aunque estas variaciones suelen ser pequeñas, forman parte del comportamiento normal del proceso.',
    visualType: 'manifestations'
  },
  {
    id: 'q4',
    tabLabel: 'Característica Inherente',
    title: 'Variabilidad como característica inherente',
    description: 'La variabilidad es una característica inherente a los procesos productivos. Esto significa que no puede eliminarse completamente, ya que siempre existirán pequeñas fluctuaciones en los factores que intervienen en la producción. El objetivo del control de calidad no es eliminar la variabilidad, sino comprenderla y mantenerla dentro de límites aceptables.',
    visualType: 'distribution-chart'
  },
  {
    id: 'q5',
    tabLabel: 'Factores',
    title: 'Factores que generan variabilidad',
    description: 'La variabilidad en los procesos puede originarse por diversos factores presentes en el sistema de producción. Estos factores influyen en el comportamiento del proceso y pueden provocar diferencias en los resultados obtenidos.',
    visualType: 'concept-map'
  }
];

// Datos para la gráfica de distribución normal (Campana de Gauss simulada)
const distributionData = [
  { valor: 9.6, frecuencia: 1 },
  { valor: 9.7, frecuencia: 5 },
  { valor: 9.8, frecuencia: 15 },
  { valor: 9.9, frecuencia: 35 },
  { valor: 10.0, frecuencia: 50 },
  { valor: 10.1, frecuencia: 35 },
  { valor: 10.2, frecuencia: 15 },
  { valor: 10.3, frecuencia: 5 },
  { valor: 10.4, frecuencia: 1 },
];

// --- Componentes Base ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// --- Componentes de Visualización (Diagram Render) ---

const ProductionLineVisual = () => (
  <div className="grid grid-rows-[1fr_auto] h-full w-full gap-4 place-items-center bg-slate-50 p-8 rounded-lg">
    <div className="grid grid-cols-3 gap-8 place-items-end w-full max-w-md">
      {/* Producto 1 - Estandar */}
      <div className="grid place-items-center gap-2">
        <div className="grid w-16 h-16 bg-blue-500 rounded-md shadow-md border-2 border-blue-600"></div>
        <span className="text-xs text-slate-500 font-mono">Unidad A</span>
      </div>
      {/* Producto 2 - Ligera variación de color y rotación */}
      <div className="grid place-items-center gap-2">
        <div className="grid w-16 h-16 bg-blue-400 rounded-md shadow-md border-2 border-blue-500 rotate-3"></div>
        <span className="text-xs text-slate-500 font-mono">Unidad B (Var. Color)</span>
      </div>
      {/* Producto 3 - Ligera variación de tamaño */}
      <div className="grid place-items-center gap-2">
        <div className="grid w-14 h-14 bg-blue-500 rounded-md shadow-md border-2 border-blue-600"></div>
        <span className="text-xs text-slate-500 font-mono">Unidad C (Var. Tamaño)</span>
      </div>
    </div>
    {/* Cinta transportadora */}
    <div className="grid w-full h-4 bg-slate-800 rounded-full relative overflow-hidden">
      <div className="grid grid-cols-[repeat(10,1fr)] w-full h-full">
         {[...Array(10)].map((_, i) => (
           <div key={i} className="border-r border-slate-600 h-full w-full"></div>
         ))}
      </div>
    </div>
  </div>
);

const DefinitionVisual = () => (
  <div className="grid grid-rows-[auto_1fr] h-full w-full gap-6 p-6">
    <Card className="p-6 bg-blue-50 border-blue-200">
      <h3 className="text-xl font-bold text-blue-900 text-center">VARIABILIDAD</h3>
      <p className="text-sm text-blue-800 text-center mt-2">Diferencias inherentes en los resultados de un proceso repetitivo.</p>
    </Card>
    <div className="grid grid-cols-3 gap-4 place-items-center bg-white p-4 rounded-lg border border-slate-100">
      <div className="grid place-items-center gap-3">
        <div className="grid w-20 h-24 border-2 border-slate-800 rounded bg-slate-100 place-items-center">
          <span className="text-xs font-mono font-bold">10.0mm</span>
        </div>
      </div>
      <div className="grid place-items-center gap-3">
        <div className="grid w-20 h-20 border-2 border-slate-800 rounded bg-slate-100 place-items-center">
          <span className="text-xs font-mono font-bold text-red-600">9.8mm</span>
        </div>
      </div>
      <div className="grid place-items-center gap-3">
        <div className="grid w-20 h-28 border-2 border-slate-800 rounded bg-slate-100 place-items-center">
          <span className="text-xs font-mono font-bold text-emerald-600">10.2mm</span>
        </div>
      </div>
    </div>
  </div>
);

const ManifestationsVisual = () => (
  <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full w-full p-4">
    <Card className="p-4 grid place-items-center gap-2 bg-slate-50 hover:bg-slate-100 transition-colors">
      <Ruler className="w-10 h-10 text-blue-600" />
      <h4 className="font-bold text-slate-800">Tamaño</h4>
      <p className="text-xs text-center text-slate-500">Longitud, anchura, volumen</p>
    </Card>
    <Card className="p-4 grid place-items-center gap-2 bg-slate-50 hover:bg-slate-100 transition-colors">
      <Scale className="w-10 h-10 text-emerald-600" />
      <h4 className="font-bold text-slate-800">Peso</h4>
      <p className="text-xs text-center text-slate-500">Masa, densidad</p>
    </Card>
    <Card className="p-4 grid place-items-center gap-2 bg-slate-50 hover:bg-slate-100 transition-colors">
      <Shapes className="w-10 h-10 text-purple-600" />
      <h4 className="font-bold text-slate-800">Forma</h4>
      <p className="text-xs text-center text-slate-500">Deformaciones, asimetría</p>
    </Card>
    <Card className="p-4 grid place-items-center gap-2 bg-slate-50 hover:bg-slate-100 transition-colors">
      <PaintBucket className="w-10 h-10 text-orange-600" />
      <h4 className="font-bold text-slate-800">Acabado</h4>
      <p className="text-xs text-center text-slate-500">Rugosidad, color, textura</p>
    </Card>
  </div>
);

const DistributionChartVisual = () => (
  <div className="grid grid-rows-[auto_1fr] h-full w-full gap-4 p-4">
    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
      <div className="bg-red-50 text-red-700 p-2 rounded border border-red-200">Límite Inferior (9.7)</div>
      <div className="bg-emerald-50 text-emerald-700 p-2 rounded border border-emerald-200">Rango Aceptable</div>
      <div className="bg-red-50 text-red-700 p-2 rounded border border-red-200">Límite Superior (10.3)</div>
    </div>
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={distributionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="valor" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            
            labelFormatter={(label) => `Medida: ${label}mm`}
          />
          <ReferenceArea x1={9.7} x2={10.3} fill="#10b981" fillOpacity={0.1} />
          <Area type="monotone" dataKey="frecuencia" stroke="#3b82f6" fill="#60a5fa" fillOpacity={0.4} strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ConceptMapVisual = () => (
  <div className="grid grid-cols-3 grid-rows-3 h-full w-full gap-4 p-4 place-items-center">
    {/* Fila 1 */}
    <div className="grid w-full"></div>
    <Card className="grid p-3 text-center bg-blue-50 border-blue-200 w-full place-items-center shadow-sm">
      <span className="text-sm font-semibold text-blue-800">Materiales</span>
    </Card>
    <div className="grid w-full"></div>

    {/* Fila 2 */}
    <Card className="grid p-3 text-center bg-emerald-50 border-emerald-200 w-full place-items-center shadow-sm">
      <span className="text-sm font-semibold text-emerald-800">Maquinaria</span>
    </Card>
    <Card className="grid p-4 text-center bg-slate-800 border-slate-900 w-full place-items-center shadow-md relative z-10">
      <span className="text-sm font-bold text-white">Fuentes de<br/>Variabilidad</span>
    </Card>
    <Card className="grid p-3 text-center bg-purple-50 border-purple-200 w-full place-items-center shadow-sm">
      <span className="text-sm font-semibold text-purple-800">Mano de Obra</span>
    </Card>

    {/* Fila 3 */}
    <div className="grid w-full"></div>
    <Card className="grid p-3 text-center bg-orange-50 border-orange-200 w-full place-items-center shadow-sm">
      <span className="text-sm font-semibold text-orange-800">Medio Ambiente</span>
    </Card>
    <div className="grid w-full"></div>
  </div>
);

const DiagramRender: React.FC<DiagramRenderProps> = ({ activeQuark }) => {
  return (
    <Card className="h-full grid grid-rows-[auto_auto_1fr]">
    
      <div className="grid p-6 pb-2">
        <p className="text-sm text-slate-600 italic">
          {activeQuark.title}
        </p>
      </div>
      <div className="grid p-6 place-items-center bg-slate-50/50">
        {activeQuark.visualType === 'production-line' && <ProductionLineVisual />}
        {activeQuark.visualType === 'definition-measurements' && <DefinitionVisual />}
        {activeQuark.visualType === 'manifestations' && <ManifestationsVisual />}
        {activeQuark.visualType === 'distribution-chart' && <DistributionChartVisual />}
        {activeQuark.visualType === 'concept-map' && <ConceptMapVisual />}
      </div>
    </Card>
  );
};

// --- Layout Principal ---

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, quarks, activeTabId, onTabChange, children }) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] w-full bg-slate-100 font-sans text-slate-900 overflow-hidden">
      {/* Header */}
      <header className="grid grid-cols-[auto_1fr] items-center px-6 py-4 bg-slate-900 text-white gap-4 shadow-md z-20">
        <div className="grid place-items-center p-2 bg-blue-600 rounded-lg">
          <Settings className="w-6 text-white animate-[spin_10s_linear_infinite]" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h1>
      </header>

      {/* Tabs Navigation (Strict Grid implementation) */}
      <nav className="grid grid-flow-col auto-cols-fr overflow-x-auto bg-white border-b border-slate-200 shadow-sm z-10">
        {quarks.map((quark) => {
          const isActive = quark.id === activeTabId;
          return (
            <button
              key={quark.id}
              onClick={() => onTabChange(quark.id)}
              className={`grid place-items-center px-4 py-4 border-b-2 text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap
                ${isActive 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
            >
              {quark.tabLabel}
            </button>
          );
        })}
      </nav>

      {/* Content Area */}
      <main className="grid overflow-y-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 max-w-7xl mx-auto w-full h-full items-start">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- Aplicación Principal ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(QUARKS_DATA[0].id);

  const activeQuark = QUARKS_DATA.find(q => q.id === activeTabId) || QUARKS_DATA[0];

  return (
    <LessonLayout
      title="Control de Calidad y Procesos"
      quarks={QUARKS_DATA}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
    >
      {/* Panel de Texto (Izquierda) */}
      <Card className="h-full grid grid-rows-[auto_1fr]">
        <div className="grid p-6 border-b border-slate-100 bg-white">
          
          <h2 className="text-2xl font-bold text-slate-800 leading-tight">
            {activeQuark.title}
          </h2>
        </div>
        <div className="grid p-6 bg-slate-50 content-start">
          <p className="text-lg text-slate-700 leading-relaxed">
            {activeQuark.description}
          </p>
        </div>
      </Card>

      {/* Panel de Diagrama (Derecha) */}
      <DiagramRender activeQuark={activeQuark} />
    </LessonLayout>
  );
}