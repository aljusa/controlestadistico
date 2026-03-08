import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, ReferenceLine
} from 'recharts';
import { Factory, Calculator, Box, TrendingUp, BarChart2, AlertTriangle, CheckCircle } from 'lucide-react';

// --- TIPOS E INTERFACES ---
interface TabData {
  id: string;
  tabLabel: string;
  diagramTitle: string;
  description: string;
  icon: React.ElementType;
  render: React.FC;
}

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  tabs: TabData[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

interface CardProps {
  children: React.ReactNode;
}

// --- DATOS DE LOS QUARKS ---

const dataQuark6 = [
  { name: 'Muestra 1', tamaño: 100, defectuosos: 5, proporcion: 0.05 },
  { name: 'Muestra 2', tamaño: 150, defectuosos: 9, proporcion: 0.06 },
  { name: 'Muestra 3', tamaño: 80, defectuosos: 3, proporcion: 0.037 },
  { name: 'Muestra 4', tamaño: 120, defectuosos: 6, proporcion: 0.05 },
  { name: 'Muestra 5', tamaño: 200, defectuosos: 8, proporcion: 0.04 },
];

const dataQuark10 = [
  { lote: 'L1', p: 0.02 },
  { lote: 'L2', p: 0.03 },
  { lote: 'L3', p: 0.025 },
  { lote: 'L4', p: 0.04 },
  { lote: 'L5', p: 0.08 }, // Pico de defectos
  { lote: 'L6', p: 0.12 }, // Fuera de control
  { lote: 'L7', p: 0.05 },
];

// --- COMPONENTES DE RENDERIZADO (DIAGRAMAS) ---

const RenderQuark6: React.FC = () => (
  <div className="w-full h-80 grid grid-rows-[1fr]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={dataQuark6} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#4b5563" />
        <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" label={{ value: 'Tamaño de Muestra', angle: -90, position: 'insideLeft', offset: -5 }} />
        <YAxis yAxisId="right" orientation="right" stroke="#ef4444" label={{ value: 'Defectuosos', angle: 90, position: 'insideRight', offset: -5 }} />
        <Tooltip cursor={{fill: '#f3f4f6'}} />
        <Legend />
        <Bar yAxisId="left" dataKey="tamaño" name="Tamaño Total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="defectuosos" name="Unidades Defectuosas" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const RenderQuark7: React.FC = () => (
  <div className="w-full h-80 grid grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-xl border border-slate-200">
    <div className="grid grid-rows-[auto_1fr] gap-4 h-full text-center">
      <div className="bg-blue-100 text-blue-700 p-4 rounded-full justify-self-center">
        <Factory size={48} />
      </div>
      <div className="grid grid-rows-[auto_auto] gap-2 content-center">
        <h4 className="font-bold text-slate-800 text-lg">Planta de Producción</h4>
        <p className="text-slate-600 text-sm">Inspección continua de lotes en líneas de ensamblaje.</p>
      </div>
    </div>
    <div className="grid grid-rows-[auto_1fr] gap-4 h-full text-center relative">
      <div className="absolute top-1/2 left-0 w-8 border-t-4 border-dashed border-slate-300 -translate-x-full"></div>
      <div className="bg-emerald-100 text-emerald-700 p-4 rounded-full justify-self-center">
        <BarChart2 size={48} />
      </div>
      <div className="grid grid-rows-[auto_auto] gap-2 content-center">
        <h4 className="font-bold text-slate-800 text-lg">Control de Calidad</h4>
        <p className="text-slate-600 text-sm">Registro de presencia/ausencia de defectos mediante Diagrama p.</p>
      </div>
    </div>
  </div>
);

const RenderQuark8: React.FC = () => {
  const totalItems = 24;
  const defectiveItems = 4;
  
  return (
    <div className="w-full h-80 grid grid-cols-[2fr_1fr] gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 grid grid-rows-[auto_1fr] gap-4">
        <h4 className="font-semibold text-center text-slate-700">Muestra Inspeccionada (n={totalItems})</h4>
        <div className="grid grid-cols-6 gap-2 content-start">
          {Array.from({ length: totalItems }).map((_, i) => (
            <div key={i} className={`aspect-square rounded flex items-center justify-center grid grid-cols-1 grid-rows-1 place-items-center ${i < defectiveItems ? 'bg-red-100 border-2 border-red-400 text-red-600' : 'bg-green-100 border border-green-300 text-green-600'}`}>
              {i < defectiveItems ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 grid grid-rows-[auto_auto_auto] gap-4 content-center text-center">
        <div className="grid gap-1">
          <span className="text-blue-900 font-bold text-4xl">{defectiveItems}</span>
          <span className="text-blue-700 text-sm font-medium uppercase tracking-wider">Defectuosos</span>
        </div>
        <div className="h-px bg-blue-300 w-full"></div>
        <div className="grid gap-1">
          <span className="text-blue-900 font-bold text-4xl">{totalItems}</span>
          <span className="text-blue-700 text-sm font-medium uppercase tracking-wider">Total Muestra</span>
        </div>
        <div className="mt-4 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
          <span className="text-slate-800 font-bold">p = {(defectiveItems/totalItems).toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
};

const RenderQuark9: React.FC = () => (
  <div className="w-full h-80 grid place-items-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
    <div className="grid grid-rows-[auto_auto] gap-8 bg-white p-10 rounded-2xl shadow-lg border border-slate-100">
      <div className="grid grid-cols-[auto_auto_auto] gap-6 items-center text-2xl font-serif">
        <div className="text-blue-600 font-bold text-5xl">p</div>
        <div className="text-slate-400 font-bold text-4xl">=</div>
        <div className="grid grid-rows-[auto_auto_auto] gap-2 text-center">
          <div className="text-red-500 font-semibold px-6 py-2 bg-red-50 rounded-lg">Número de unidades defectuosas</div>
          <div className="h-1 bg-slate-800 rounded-full w-full"></div>
          <div className="text-blue-500 font-semibold px-6 py-2 bg-blue-50 rounded-lg">Tamaño de la muestra (n)</div>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
        <Calculator className="text-slate-500" size={32} />
        <p className="text-slate-600 text-sm italic">
          "Representa matemáticamente la fracción de productos que no cumplen las especificaciones dentro del lote analizado."
        </p>
      </div>
    </div>
  </div>
);

const RenderQuark10: React.FC = () => (
  <div className="w-full h-80 grid grid-rows-[1fr]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dataQuark10} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="lote" stroke="#64748b" />
        <YAxis stroke="#64748b" tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <ReferenceLine y={0.10} stroke="#ef4444" strokeDasharray="5 5" label={{ position: 'top', value: 'Límite Superior de Control (UCL)', fill: '#ef4444', fontSize: 12 }} />
        <ReferenceLine y={0.03} stroke="#10b981" strokeDasharray="5 5" label={{ position: 'bottom', value: 'Proporción Central (p̄)', fill: '#10b981', fontSize: 12 }} />
        <Line 
          type="monotone" 
          dataKey="p" 
          stroke="#3b82f6" 
          strokeWidth={3}
          dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// --- ESTRUCTURA BASE ---

const TABS_DATA: TabData[] = [
  {
    id: 'q6',
    tabLabel: 'Muestra Variable',
    diagramTitle: 'Flexibilidad en el tamaño de la muestra',
    description: 'Una característica importante del diagrama p es que permite trabajar con tamaños de muestra variables. Esto significa que el número de unidades inspeccionadas puede cambiar entre una muestra y otra sin afectar la validez del análisis.',
    icon: BarChart2,
    render: RenderQuark6
  },
  {
    id: 'q7',
    tabLabel: 'Contexto Industrial',
    diagramTitle: 'Uso frecuente del diagrama p en control de calidad',
    description: 'Debido a su simplicidad y utilidad, el diagrama p es uno de los gráficos de control más utilizados en el análisis de datos por atributo. Se emplea ampliamente en procesos industriales donde la calidad se evalúa mediante la presencia o ausencia de defectos.',
    icon: Factory,
    render: RenderQuark7
  },
  {
    id: 'q8',
    tabLabel: 'Concepto (p)',
    diagramTitle: 'Concepto de proporción defectuosa',
    description: 'La proporción defectuosa es el valor que indica qué fracción de los productos de una muestra es defectuosa. Este valor se obtiene comparando el número de unidades defectuosas con el tamaño total de la muestra inspeccionada.',
    icon: Box,
    render: RenderQuark8
  },
  {
    id: 'q9',
    tabLabel: 'Fórmula',
    diagramTitle: 'Fórmula para calcular la proporción defectuosa',
    description: 'La proporción defectuosa se calcula mediante una relación matemática simple. Este valor representa la fracción de productos defectuosos presentes en la muestra analizada respecto al total.',
    icon: Calculator,
    render: RenderQuark9
  },
  {
    id: 'q10',
    tabLabel: 'Interpretación',
    diagramTitle: 'Interpretación de la proporción defectuosa',
    description: 'El valor de la proporción defectuosa indica el nivel de productos que no cumplen con las especificaciones dentro de una muestra. Valores más altos (picos en el gráfico) pueden indicar problemas severos o desajustes en el proceso productivo.',
    icon: TrendingUp,
    render: RenderQuark10
  }
];

const Card: React.FC<CardProps> = ({ children }) => (
  <div className="grid grid-rows-[auto_auto_1fr] gap-6 p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full">
    {children}
  </div>
);

const LessonLayout: React.FC<LayoutProps> = ({ children, title, tabs, activeTab, onTabChange }) => (
  <div className="grid grid-rows-[auto_1fr] h-screen w-full bg-slate-50 font-sans text-slate-800 overflow-hidden">
    {/* Header & Nav */}
    <header className="grid grid-rows-[auto_auto] bg-white border-b border-slate-200 shadow-sm z-10">
      <div className="grid px-8 py-5 items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
      </div>
      <nav className="grid grid-cols-5 px-8 bg-slate-50/50 border-t border-slate-100">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = index === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(index)}
              className={`grid grid-cols-[auto_1fr] gap-3 items-center justify-center py-4 px-2 border-b-2 transition-all duration-200 ease-in-out cursor-pointer hover:bg-blue-50/50 outline-none
                ${isActive 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/30' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              aria-selected={isActive}
              role="tab"
            >
              <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              <span className="font-semibold text-sm whitespace-nowrap">{tab.tabLabel}</span>
            </button>
          );
        })}
      </nav>
    </header>

    {/* Main Content Area */}
    <main className="grid p-8 overflow-y-auto">
      <div className="grid max-w-5xl w-full mx-auto h-full">
        {children}
      </div>
    </main>
  </div>
);

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const currentData = TABS_DATA[activeTab];
  const DiagramRender = currentData.render;

  return (
    <LessonLayout 
      title="Control Estadístico: El Diagrama p" 
      tabs={TABS_DATA} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      <Card>
        {/* Panel Header: Diagram Title */}
        <div className="grid gap-2 border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Sección {activeTab + 1} de {TABS_DATA.length}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            {currentData.diagramTitle}
          </h2>
        </div>

        {/* Panel Body: Diagram Description */}
        <div className="grid bg-slate-50 p-5 rounded-xl border border-slate-200/60">
          <p className="text-slate-600 leading-relaxed text-lg">
            {currentData.description}
          </p>
        </div>

        {/* Panel Render: Diagram Render */}
        <div className="grid items-center pt-2">
          <DiagramRender />
        </div>
      </Card>
    </LessonLayout>
  );
}