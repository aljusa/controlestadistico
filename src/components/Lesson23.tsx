import React, { useState } from 'react';
import { 
  AlertCircle, 
  XCircle, 
  CheckCircle, 
  Box, 
  Search, 
  Settings, 
  Wine, 
  MonitorX 
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface TabData {
  id: string;
  label: string;
  diagramTitle: string;
  diagramDescription: string;
  DiagramRender: React.FC;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: TabData[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

// --- UI COMPONENTS ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden grid ${className}`}>
    {children}
  </div>
);

// --- DIAGRAM COMPONENTS ---

const ConceptMap: React.FC = () => (
  <div className="w-full grid place-items-center p-8 bg-slate-50 rounded-lg border border-slate-200">
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto font-sans">
      {/* Conexiones */}
      <path d="M 300 80 L 300 120" stroke="#94a3b8" strokeWidth="2" fill="none" />
      <path d="M 300 120 L 150 120 L 150 160" stroke="#94a3b8" strokeWidth="2" fill="none" />
      <path d="M 300 120 L 450 120 L 450 160" stroke="#94a3b8" strokeWidth="2" fill="none" />
      
      {/* Nodos */}
      {/* Nodo Principal */}
      <rect x="200" y="20" width="200" height="60" rx="8" fill="#1e293b" />
      <text x="300" y="55" fill="white" textAnchor="middle" fontSize="18" fontWeight="bold">Datos por Atributo</text>
      
      {/* Nodo Izquierdo */}
      <rect x="40" y="160" width="220" height="80" rx="8" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" />
      <text x="150" y="195" fill="#991b1b" textAnchor="middle" fontSize="16" fontWeight="bold">Producto Defectuoso</text>
      <text x="150" y="220" fill="#7f1d1d" textAnchor="middle" fontSize="12">Unidad inaceptable</text>

      {/* Nodo Derecho */}
      <rect x="340" y="160" width="220" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />
      <text x="450" y="195" fill="#92400e" textAnchor="middle" fontSize="16" fontWeight="bold">Defecto</text>
      <text x="450" y="220" fill="#78350f" textAnchor="middle" fontSize="12">Imperfección específica</text>
    </svg>
  </div>
);

const DefectiveProductView: React.FC = () => (
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-lg border border-slate-200 place-items-center">
    <div className="grid place-items-center gap-4">
      <div className="relative">
        <Box size={120} className="text-slate-300" strokeWidth={1} />
        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-white rounded-full">
          <XCircle size={48} className="text-red-500" />
        </div>
      </div>
      <span className="text-red-600 font-bold text-xl uppercase tracking-wider">Rechazado</span>
    </div>
    <div className="grid gap-3 w-full max-w-xs">
      <div className="bg-white p-4 rounded border border-slate-200 grid grid-cols-[auto_1fr] gap-3 items-center shadow-sm">
        <XCircle className="text-red-500" size={20} />
        <span className="text-slate-700 font-medium">No cumple dimensiones</span>
      </div>
      <div className="bg-white p-4 rounded border border-slate-200 grid grid-cols-[auto_1fr] gap-3 items-center shadow-sm">
        <XCircle className="text-red-500" size={20} />
        <span className="text-slate-700 font-medium">Falla funcional crítica</span>
      </div>
      <div className="bg-red-50 p-4 rounded border border-red-200 grid gap-1 mt-2">
        <span className="text-red-800 font-bold text-sm">Conclusión:</span>
        <span className="text-red-700 text-sm">El producto completo es clasificado como no aceptable para el cliente o proceso productivo.</span>
      </div>
    </div>
  </div>
);

const ExamplesView: React.FC = () => (
  <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 grid grid-rows-[auto_1fr_auto] gap-4 place-items-center text-center">
      <Wine size={64} className="text-red-400" />
      <h3 className="font-bold text-slate-800">Botella Rota</h3>
      <p className="text-sm text-slate-600">Pérdida de integridad estructural. Inutilizable para contener líquidos.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 grid grid-rows-[auto_1fr_auto] gap-4 place-items-center text-center">
      <Settings size={64} className="text-orange-400" />
      <h3 className="font-bold text-slate-800">Pieza Fuera de Medida</h3>
      <p className="text-sm text-slate-600">No cumple con las tolerancias dimensionales. No ensambla en el sistema.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 grid grid-rows-[auto_1fr_auto] gap-4 place-items-center text-center">
      <MonitorX size={64} className="text-blue-400" />
      <h3 className="font-bold text-slate-800">Falla de Funcionamiento</h3>
      <p className="text-sm text-slate-600">El dispositivo electrónico no enciende. Falla crítica de operación.</p>
    </div>
  </div>
);

const DefectView: React.FC = () => (
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-lg border border-slate-200 place-items-center">
    <div className="grid place-items-center gap-4">
      <div className="relative">
        <Box size={120} className="text-slate-700" strokeWidth={1} />
        {/* Lupa indicando una imperfección pequeña */}
        <div className="absolute top-1/2 left-1/4 bg-yellow-100 rounded-full p-1 border-2 border-yellow-400 grid place-items-center shadow-lg">
          <Search size={32} className="text-yellow-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
        </div>
      </div>
      <span className="text-amber-600 font-bold text-xl uppercase tracking-wider">Con Defecto Menor</span>
    </div>
    <div className="grid gap-3 w-full max-w-xs">
      <div className="bg-white p-4 rounded border border-slate-200 grid grid-cols-[auto_1fr] gap-3 items-center shadow-sm">
        <AlertCircle className="text-amber-500" size={20} />
        <span className="text-slate-700 font-medium">Rayón en pintura</span>
      </div>
      <div className="bg-white p-4 rounded border border-slate-200 grid grid-cols-[auto_1fr] gap-3 items-center shadow-sm">
        <CheckCircle className="text-green-500" size={20} />
        <span className="text-slate-700 font-medium">Funcionalidad al 100%</span>
      </div>
      <div className="bg-blue-50 p-4 rounded border border-blue-200 grid gap-1 mt-2">
        <span className="text-blue-800 font-bold text-sm">Aclaración:</span>
        <span className="text-blue-700 text-sm">Presenta una desviación (defecto), pero el producto aún puede ser aceptable o requerir solo un retrabajo menor.</span>
      </div>
    </div>
  </div>
);

const MultipleDefectsView: React.FC = () => (
  <div className="w-full grid place-items-center p-8 bg-slate-50 rounded-lg border border-slate-200">
    <div className="relative w-64 h-64 bg-white border-2 border-slate-300 rounded-xl shadow-inner grid place-items-center">
      <Box size={100} className="text-slate-200" />
      
      {/* Defecto 1 */}
      <div className="absolute top-8 left-8 grid grid-cols-[auto_auto] items-center gap-2">
        <div className="w-6 h-6 bg-red-100 border border-red-500 text-red-700 rounded-full grid place-items-center text-xs font-bold">1</div>
        <div className="w-16 h-px bg-red-400 rotate-45 origin-left"></div>
      </div>
      <span className="absolute top-2 left-6 text-xs font-bold text-red-600 bg-white px-1">Mancha</span>

      {/* Defecto 2 */}
      <div className="absolute bottom-12 right-12 grid grid-cols-[auto_auto] items-center gap-2">
        <div className="w-16 h-px bg-orange-400 -rotate-12 origin-right"></div>
        <div className="w-6 h-6 bg-orange-100 border border-orange-500 text-orange-700 rounded-full grid place-items-center text-xs font-bold">2</div>
      </div>
      <span className="absolute bottom-6 right-8 text-xs font-bold text-orange-600 bg-white px-1">Fisura</span>

      {/* Defecto 3 */}
      <div className="absolute top-1/2 left-10 grid grid-cols-[auto_auto] items-center gap-2">
        <div className="w-6 h-6 bg-purple-100 border border-purple-500 text-purple-700 rounded-full grid place-items-center text-xs font-bold">3</div>
        <div className="w-12 h-px bg-purple-400"></div>
      </div>
      <span className="absolute top-[40%] left-2 text-xs font-bold text-purple-600 bg-white px-1">Desgaste</span>
    </div>
    
    <div className="mt-8 text-center grid gap-2">
      <p className="text-slate-700 font-medium bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
        Total de defectos encontrados en esta unidad: <strong className="text-slate-900 text-lg">3</strong>
      </p>
    </div>
  </div>
);

// --- LESSON LAYOUT ---

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTab, onTabChange }) => {
  const currentTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 grid grid-rows-[auto_1fr] font-sans">
      {/* Header & Nav */}
      <header className="bg-white shadow-sm grid grid-rows-[auto_auto] sticky top-0 z-10">
        <div className="px-6 py-5 grid place-items-center md:place-items-start border-b border-slate-100">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h1>
        </div>
        <nav className="px-6 grid grid-flow-col auto-cols-max gap-2 overflow-x-auto no-scrollbar border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors grid place-items-center whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="p-4 md:p-8 grid place-items-start">
        {currentTabData && (
          <Card className="w-full max-w-5xl mx-auto grid-rows-[auto_auto_1fr] p-6 md:p-10 gap-6">
            <div className="grid gap-2 border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-800">{currentTabData.diagramTitle}</h2>
            </div>
            
            <div className="grid gap-4">
              <p className="text-lg text-slate-600 leading-relaxed">
                {currentTabData.diagramDescription}
              </p>
            </div>

            <div className="mt-4 grid">
              <currentTabData.DiagramRender />
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

// --- DATA ---

const LESSON_TABS: TabData[] = [
  {
    id: 'q6',
    label: 'Conceptos',
    diagramTitle: 'Conceptos fundamentales en datos por atributo',
    diagramDescription: 'Dentro del análisis de datos por atributo, existen dos conceptos fundamentales que deben distinguirse claramente: producto defectuoso y defecto. Ambos conceptos se utilizan para evaluar la calidad del producto, pero describen situaciones diferentes.',
    DiagramRender: ConceptMap
  },
  {
    id: 'q7',
    label: 'Producto Defectuoso',
    diagramTitle: 'Definición de producto defectuoso',
    diagramDescription: 'Un producto defectuoso es una unidad que no cumple con las especificaciones de calidad establecidas. Esto significa que el producto no satisface los requisitos necesarios para ser considerado aceptable dentro del proceso productivo.',
    DiagramRender: DefectiveProductView
  },
  {
    id: 'q8',
    label: 'Ejemplos',
    diagramTitle: 'Ejemplos de productos defectuosos',
    diagramDescription: 'Existen diversas situaciones en las que un producto puede considerarse defectuoso. Por ejemplo, una botella rota, una pieza mecánica que no cumple con las dimensiones requeridas o un producto con una falla que impide su funcionamiento adecuado.',
    DiagramRender: ExamplesView
  },
  {
    id: 'q9',
    label: 'Defecto',
    diagramTitle: 'Definición de defecto',
    diagramDescription: 'Un defecto es una imperfección específica presente en un producto. Esta imperfección representa una desviación respecto a las características esperadas, pero no necesariamente implica que el producto completo sea inaceptable.',
    DiagramRender: DefectView
  },
  {
    id: 'q10',
    label: 'Múltiples Defectos',
    diagramTitle: 'Presencia de múltiples defectos en un producto',
    diagramDescription: 'Un mismo producto puede contener varios defectos al mismo tiempo. Cada una de estas imperfecciones se registra individualmente en el análisis por atributos, lo que permite evaluar la calidad del proceso desde la perspectiva de la cantidad de defectos presentes.',
    DiagramRender: MultipleDefectsView
  }
];

// --- APP ENTRY POINT ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(LESSON_TABS[0].id);

  return (
    <LessonLayout 
      title="Análisis de Calidad: Datos por Atributo"
      tabs={LESSON_TABS}
      activeTab={activeTabId}
      onTabChange={setActiveTabId}
    />
  );
}