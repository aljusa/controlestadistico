import React, { useState } from 'react';
import { 
  Box, 
  Settings, 
  ThermometerSun, 
  Users, 
  Wrench, 
  ArrowRight, 
  Factory, 
   
  Droplets,
  Wind
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface QuarkData {
  id: string;
  tabLabel: string;
  diagramTitle: string;
  description: string;
  icon: React.ElementType;
}

// --- DATA DEFINITION ---

const quarksData: QuarkData[] = [
  {
    id: 'q6',
    tabLabel: 'Materia Prima',
    diagramTitle: 'Variabilidad por cambios en la materia prima',
    description: 'Las materias primas pueden presentar pequeñas diferencias en sus propiedades físicas o químicas. Estas variaciones pueden afectar el comportamiento del proceso productivo y generar cambios en las características del producto final.',
    icon: Box,
  },
  {
    id: 'q7',
    tabLabel: 'Desgaste Maquinaria',
    diagramTitle: 'Variabilidad por desgaste de maquinaria',
    description: 'El desgaste de la maquinaria ocurre cuando los componentes de los equipos se deterioran con el uso continuo. Este desgaste puede afectar la precisión del proceso y generar diferencias en los productos fabricados.',
    icon: Wrench,
  },
  {
    id: 'q8',
    tabLabel: 'Condiciones Ambientales',
    diagramTitle: 'Variabilidad por condiciones ambientales',
    description: 'Las condiciones ambientales, como la temperatura, la humedad o la presión, pueden influir en el comportamiento de ciertos procesos industriales. Cambios en estas condiciones pueden provocar variaciones en los resultados del proceso.',
    icon: ThermometerSun,
  },
  {
    id: 'q9',
    tabLabel: 'Operación Humana',
    diagramTitle: 'Variabilidad por diferencias en la operación humana',
    description: 'Las acciones de los operadores también pueden generar variabilidad en el proceso. Diferencias en la forma de ejecutar procedimientos, realizar ajustes o manipular equipos pueden producir cambios en los resultados obtenidos.',
    icon: Users,
  },
  {
    id: 'q10',
    tabLabel: 'Ajustes de Proceso',
    diagramTitle: 'Variabilidad por ajustes en el proceso',
    description: 'Los ajustes en parámetros del proceso, como velocidad, presión, temperatura o tiempo de operación, pueden introducir variaciones en los resultados de producción. Cambios en estos parámetros modifican el comportamiento del sistema productivo.',
    icon: Settings,
  }
];

// --- UI COMPONENTS ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
    {children}
  </div>
);

// --- DIAGRAM RENDERERS (Grid Based, No Flexbox) ---

const DiagramQ6: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 place-items-center w-full bg-slate-50 p-8 rounded-lg border border-slate-100">
    {/* Lotes de Materia Prima */}
    <div className="grid grid-rows-2 gap-6 w-full">
      <div className="grid grid-flow-col justify-start place-items-center gap-3 bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
        <Box className="w-8 h-8 text-blue-600" />
        <span className="font-semibold text-blue-900">Lote A (Propiedad X)</span>
      </div>
      <div className="grid grid-flow-col justify-start place-items-center gap-3 bg-indigo-100 p-4 rounded-lg border-2 border-indigo-300">
        <Box className="w-8 h-8 text-indigo-600" />
        <span className="font-semibold text-indigo-900">Lote B (Propiedad Y)</span>
      </div>
    </div>

    {/* Proceso */}
    <div className="grid grid-rows-[auto_auto] place-items-center gap-2">
      <Factory className="w-16 h-16 text-slate-700" />
      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Proceso</span>
    </div>

    {/* Productos Finales */}
    <div className="grid grid-rows-2 gap-6 w-full">
      <div className="grid grid-flow-col justify-start place-items-center gap-3 bg-green-100 p-4 rounded-lg border-2 border-green-300">
        <div className="w-6 h-6 rounded-full bg-green-500"></div>
        <span className="font-semibold text-green-900">Producto Var. A</span>
      </div>
      <div className="grid grid-flow-col justify-start place-items-center gap-3 bg-emerald-100 p-4 rounded-lg border-2 border-emerald-300">
        <div className="w-6 h-6 rounded-sm bg-emerald-500"></div>
        <span className="font-semibold text-emerald-900">Producto Var. B</span>
      </div>
    </div>
  </div>
);

const DiagramQ7: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
    {/* Máquina Nueva */}
    <div className="grid grid-rows-[auto_auto_1fr] gap-4 bg-emerald-50 p-6 rounded-lg border border-emerald-200 place-items-center">
      <div className="grid grid-flow-col gap-2 place-items-center">
        <Settings className="w-8 h-8 text-emerald-600" />
        <h3 className="font-bold text-emerald-800 text-lg">Máquina Nueva</h3>
      </div>
      <div className="grid h-1 w-full bg-emerald-200 rounded-full"></div>
      <div className="grid grid-cols-3 gap-4 w-full place-items-center mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-12 h-12 bg-emerald-400 rounded-md shadow-sm grid place-items-center text-white font-bold">
            P
          </div>
        ))}
      </div>
      <span className="text-sm text-emerald-700 mt-2 font-medium">Producción Uniforme</span>
    </div>

    {/* Máquina Desgastada */}
    <div className="grid grid-rows-[auto_auto_1fr] gap-4 bg-orange-50 p-6 rounded-lg border border-orange-200 place-items-center">
      <div className="grid grid-flow-col gap-2 place-items-center">
        <Wrench className="w-8 h-8 text-orange-600" />
        <h3 className="font-bold text-orange-800 text-lg">Máquina Desgastada</h3>
      </div>
      <div className="grid h-1 w-full bg-orange-200 rounded-full"></div>
      <div className="grid grid-cols-3 gap-4 w-full place-items-center mt-4">
        <div className="w-12 h-12 bg-orange-400 rounded-md shadow-sm grid place-items-center text-white font-bold transform -rotate-6">P</div>
        <div className="w-10 h-10 bg-orange-400 rounded-md shadow-sm grid place-items-center text-white font-bold">P</div>
        <div className="w-14 h-12 bg-orange-400 rounded-md shadow-sm grid place-items-center text-white font-bold transform rotate-3">p</div>
      </div>
      <span className="text-sm text-orange-700 mt-2 font-medium">Producción Variable</span>
    </div>
  </div>
);

const DiagramQ8: React.FC = () => (
  <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full max-w-2xl mx-auto p-8 bg-slate-50 rounded-xl border border-slate-200 place-items-center">
    {/* Row 1 */}
    <div></div>
    <div className="grid place-items-center gap-2 bg-yellow-100 p-3 rounded-full shadow-sm text-yellow-700">
      <ThermometerSun className="w-8 h-8" />
      <span className="text-xs font-bold uppercase tracking-wider">Temp</span>
    </div>
    <div></div>

    {/* Row 2 */}
    <div className="grid place-items-center gap-2 bg-cyan-100 p-3 rounded-full shadow-sm text-cyan-700">
      <Droplets className="w-8 h-8" />
      <span className="text-xs font-bold uppercase tracking-wider">Humedad</span>
    </div>
    <div className="grid place-items-center p-6 bg-slate-800 rounded-xl shadow-lg relative">
      <Factory className="w-16 h-16 text-slate-100" />
      <div className="absolute inset-0 border-4 border-dashed border-slate-400 rounded-xl animate-[spin_10s_linear_infinite] opacity-30"></div>
    </div>
    <div className="grid place-items-center gap-2 bg-blue-100 p-3 rounded-full shadow-sm text-blue-700">
      <Wind className="w-8 h-8" />
      <span className="text-xs font-bold uppercase tracking-wider">Presión</span>
    </div>

    {/* Row 3 */}
    <div></div>
    <div className="grid grid-rows-[auto_auto] place-items-center gap-2 mt-4">
      <ArrowRight className="w-6 h-6 text-slate-400 transform rotate-90" />
      <div className="grid grid-flow-col gap-2">
        <div className="w-6 h-6 bg-purple-400 rounded-sm"></div>
        <div className="w-8 h-6 bg-purple-500 rounded-sm"></div>
        <div className="w-5 h-6 bg-purple-300 rounded-sm"></div>
      </div>
      <span className="text-sm font-semibold text-slate-600">Variación en Resultados</span>
    </div>
    <div></div>
  </div>
);

const DiagramQ9: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 w-full place-items-center">
    {/* Operador 1 */}
    <div className="grid grid-rows-[auto_auto_auto] gap-4 place-items-center w-full bg-blue-50 p-6 rounded-lg border border-blue-200">
      <Users className="w-12 h-12 text-blue-600" />
      <span className="font-bold text-blue-900">Operador A</span>
      <div className="grid grid-flow-col gap-2">
        <span className="grid place-items-center px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded-full font-bold">Ajuste Fuerte</span>
        <span className="grid place-items-center px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded-full font-bold">Rápido</span>
      </div>
      <div className="grid w-full h-12 mt-4 place-items-center bg-white border-2 border-blue-300 rounded-md">
        <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
      </div>
    </div>

    <div className="grid grid-rows-2 gap-2 text-slate-400 font-bold text-xl place-items-center">
      <span>VS</span>
    </div>

    {/* Operador 2 */}
    <div className="grid grid-rows-[auto_auto_auto] gap-4 place-items-center w-full bg-indigo-50 p-6 rounded-lg border border-indigo-200">
      <Users className="w-12 h-12 text-indigo-600" />
      <span className="font-bold text-indigo-900">Operador B</span>
      <div className="grid grid-flow-col gap-2">
        <span className="grid place-items-center px-3 py-1 bg-indigo-200 text-indigo-800 text-xs rounded-full font-bold">Ajuste Suave</span>
        <span className="grid place-items-center px-3 py-1 bg-indigo-200 text-indigo-800 text-xs rounded-full font-bold">Lento</span>
      </div>
      <div className="grid w-full h-12 mt-4 place-items-center bg-white border-2 border-indigo-300 rounded-md">
        <div className="w-1/2 h-2 bg-indigo-500 rounded-full"></div>
      </div>
    </div>
  </div>
);

const DiagramQ10: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 place-items-center bg-slate-50 p-8 rounded-xl border border-slate-200 w-full">
    {/* Panel de Control */}
    <div className="grid grid-rows-3 gap-6 bg-slate-800 p-6 rounded-lg shadow-inner w-64">
      <div className="grid gap-2">
        <div className="grid grid-cols-2 justify-between text-slate-300 text-xs font-bold uppercase">
          <span>Velocidad</span>
          <span className="text-right">85%</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full grid justify-items-start">
          <div className="w-[85%] bg-green-400 h-full rounded-full"></div>
        </div>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-2 justify-between text-slate-300 text-xs font-bold uppercase">
          <span>Temperatura</span>
          <span className="text-right">120°C</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full grid justify-items-start">
          <div className="w-[60%] bg-red-400 h-full rounded-full"></div>
        </div>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-2 justify-between text-slate-300 text-xs font-bold uppercase">
          <span>Presión</span>
          <span className="text-right">4.2 bar</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full grid justify-items-start">
          <div className="w-[40%] bg-blue-400 h-full rounded-full"></div>
        </div>
      </div>
    </div>

    {/* Conector */}
    <div className="grid grid-cols-[auto_auto] gap-4 place-items-center text-slate-400">
      <ArrowRight className="w-8 h-8" />
      <Factory className="w-12 h-12 text-slate-600" />
      <ArrowRight className="w-8 h-8" />
    </div>

    {/* Resultados */}
    <div className="grid grid-rows-[auto_1fr] gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200 place-items-center w-full max-w-[250px]">
      <span className="text-sm font-bold text-slate-700 text-center">Impacto en Producción</span>
      <div className="grid grid-cols-2 gap-4 w-full">
         <div className="grid h-24 bg-gradient-to-t from-slate-200 to-slate-100 rounded-md relative place-items-end p-2 border border-slate-300">
            <div className="w-full h-[60%] bg-blue-500 rounded-sm"></div>
         </div>
         <div className="grid h-24 bg-gradient-to-t from-slate-200 to-slate-100 rounded-md relative place-items-end p-2 border border-slate-300">
            <div className="w-full h-[90%] bg-indigo-500 rounded-sm"></div>
         </div>
      </div>
    </div>
  </div>
);

// --- MAIN LAYOUT COMPONENT ---

interface LessonLayoutProps {
  data: QuarkData[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

const LessonLayout: React.FC<LessonLayoutProps> = ({ data, activeTab, onTabChange }) => {
  const activeData = data.find(q => q.id === activeTab) || data[0];

  const renderDiagram = (id: string) => {
    switch (id) {
      case 'q6': return <DiagramQ6 />;
      case 'q7': return <DiagramQ7 />;
      case 'q8': return <DiagramQ8 />;
      case 'q9': return <DiagramQ9 />;
      case 'q10': return <DiagramQ10 />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen bg-slate-100 font-sans">
      
      {/* Header */}
      <header className="grid bg-slate-900 text-white px-6 py-8 place-items-center shadow-md z-10">
        <div className="grid gap-2 max-w-5xl w-full text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Fuentes de Variabilidad en Procesos</h1>
        </div>
      </header>

      {/* Tab Navigation (CSS Grid Only) */}
      <nav className="grid grid-cols-2 md:grid-cols-5 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        {data.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`grid grid-rows-[auto_auto] place-items-center gap-2 py-4 px-2 transition-all duration-200 border-b-4 
                ${isActive 
                  ? 'border-blue-600 bg-blue-50 text-blue-700' 
                  : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="text-xs md:text-sm font-bold text-center leading-tight">
                {tab.tabLabel}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="grid place-items-start justify-items-center p-6 md:p-10 overflow-y-auto">
        <div className="grid gap-6 w-full max-w-5xl">
          <Card>
            {/* Diagram Title & Description */}
            <div className="grid gap-4 mb-8">
              <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
                <div className="grid place-items-center w-12 h-12 bg-blue-100 rounded-lg">
                  <activeData.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{activeData.diagramTitle}</h2>
              </div>
              <div className="grid bg-slate-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-slate-700 text-lg leading-relaxed">
                  {activeData.description}
                </p>
              </div>
            </div>

            {/* Diagram Render */}
            <div className="grid mt-4">
              <div className="grid place-items-center w-full border border-slate-100 rounded-xl overflow-hidden">
                {renderDiagram(activeData.id)}
              </div>
            </div>
          </Card>
        </div>
      </main>

    </div>
  );
};

// --- APP ENTRY POINT ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(quarksData[0].id);

  return (
    <LessonLayout 
      data={quarksData} 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
    />
  );
}