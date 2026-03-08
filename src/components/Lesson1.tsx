import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Settings, 
  User, 
  Package, 
  FileText, 
  Factory, 
  PenTool, 
  Box, 
  Smile,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ShieldCheck,
  Star,
  Activity,
  Award,
  Shield,
  Eye
} from 'lucide-react';

// --- Types & Interfaces ---

interface SectionData {
  id: string;
  tabTitle: string;
  diagramTitle: string;
  diagramDescription: string;
  quarkType: string;
}

// --- Data ---

const LESSON_DATA: SectionData[] = [
  {
    id: 'q1',
    tabTitle: 'Introducción',
    diagramTitle: 'La Calidad en la Cadena Productiva',
    diagramDescription: 'La calidad es un concepto central que se construye a lo largo de todo el proceso productivo, desde el diseño inicial hasta que el producto llega a las manos del cliente. Consiste en la capacidad de producir consistentemente bienes que cumplan con requisitos y satisfagan expectativas.',
    quarkType: 'Q-ctx'
  },
  {
    id: 'q2',
    tabTitle: 'Definición General',
    diagramTitle: 'Componentes de la Calidad',
    diagramDescription: 'La calidad se define como la intersección perfecta entre el cumplimiento estricto de los requisitos técnicos preestablecidos y la satisfacción absoluta de las expectativas del cliente final.',
    quarkType: 'Q-def'
  },
  {
    id: 'q3',
    tabTitle: 'Cumplimiento',
    diagramTitle: 'Verificación de Requisitos Técnicos',
    diagramDescription: 'El cumplimiento de requisitos implica que el producto fabricado se ajusta milimétricamente a las especificaciones técnicas, dimensiones, materiales y tolerancias definidas en los planos originales durante la etapa de diseño.',
    quarkType: 'Q-con'
  },
  {
    id: 'q4',
    tabTitle: 'Satisfacción',
    diagramTitle: 'Evaluación y Percepción del Cliente',
    diagramDescription: 'Incluso cumpliendo todas las especificaciones, la verdadera calidad se consolida cuando el producto responde a las necesidades, experiencias y nivel de utilidad esperados por el usuario, generando una alta satisfacción.',
    quarkType: 'Q-con'
  },
  {
    id: 'q5',
    tabTitle: 'Atributos',
    diagramTitle: 'Atributos de Calidad Industrial',
    diagramDescription: 'En entornos industriales, la calidad se desglosa y evalúa mediante atributos específicos y medibles que describen el desempeño, confiabilidad, durabilidad y estética del producto durante su ciclo de vida.',
    quarkType: 'Q-con'
  }
];

// --- Shared Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- Diagram Components ---

const Diagram1: React.FC = () => (
  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 md:gap-4 w-full h-full place-items-center p-4">
    <div className="grid grid-rows-[auto_auto] gap-3 place-items-center text-center">
      <div className="grid place-items-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full">
        <PenTool size={28} />
      </div>
      <span className="font-semibold text-md md:text-base text-slate-700">Diseño</span>
    </div>
    <ArrowRight className="text-slate-300" size={24} />
    
    <div className="grid grid-rows-[auto_auto] gap-3 place-items-center text-center">
      <div className="grid place-items-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full">
        <Factory size={28} />
      </div>
      <span className="font-semibold text-md md:text-base text-slate-700">Fabricación</span>
    </div>
    <ArrowRight className="text-slate-300" size={24} />
    
    <div className="grid grid-rows-[auto_auto] gap-3 place-items-center text-center">
      <div className="grid place-items-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full">
        <Box size={28} />
      </div>
      <span className="font-semibold text-md md:text-base text-slate-700">Producto Final</span>
    </div>
    <ArrowRight className="text-slate-300" size={24} />
    
    <div className="grid grid-rows-[auto_auto] gap-3 place-items-center text-center">
      <div className="grid place-items-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full">
        <Smile size={28} />
      </div>
      <span className="font-semibold text-md md:text-base text-slate-700">Cliente Satisfecho</span>
    </div>
  </div>
);

const Diagram2: React.FC = () => (
  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 w-full h-full place-items-center p-8">
    <div className="grid grid-rows-[auto_auto] gap-4 place-items-center text-center p-6 bg-slate-50 border border-slate-200 rounded-xl w-full">
      <Settings className="text-blue-500" size={40} />
      <span className="font-semibold text-slate-700">Cumplimiento de<br/>Requisitos</span>
    </div>
    
    <ArrowRight className="text-slate-400" size={32} />
    
    <div className="grid place-items-center w-40 h-40 bg-blue-600 text-white rounded-2xl shadow-lg border-4 border-blue-200 z-10">
      <div className="grid grid-rows-[auto_auto] gap-2 place-items-center">
        <ShieldCheck size={48} />
        <span className="font-bold text-xl uppercase tracking-wider">Calidad</span>
      </div>
    </div>
    
    <ArrowLeft className="text-slate-400" size={32} />
    
    <div className="grid grid-rows-[auto_auto] gap-4 place-items-center text-center p-6 bg-slate-50 border border-slate-200 rounded-xl w-full">
      <User className="text-emerald-500" size={40} />
      <span className="font-semibold text-slate-700">Satisfacción del<br/>Cliente</span>
    </div>
  </div>
);

const Diagram3: React.FC = () => (
  <div className="grid grid-cols-[1fr_auto_1fr] gap-8 w-full h-full place-items-center p-8">
    <div className="grid grid-rows-[auto_auto] gap-6 place-items-center p-8 bg-blue-50 rounded-xl border border-blue-100 w-full h-full">
      <FileText size={64} className="text-blue-500" />
      <div className="grid gap-2 text-center">
        <span className="font-bold text-lg text-blue-900">Plano Técnico</span>
        <span className="text-md text-blue-700">Especificaciones y Tolerancias</span>
      </div>
    </div>

    <div className="grid grid-rows-3 gap-6 place-items-center px-4">
      <div className="grid grid-cols-[auto_1fr] gap-3 place-items-center bg-white p-3 rounded-lg shadow-sm border border-emerald-100">
        <CheckCircle2 className="text-emerald-500" size={24} />
        <span className="text-md font-medium text-slate-600">Dimensiones</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-3 place-items-center bg-white p-3 rounded-lg shadow-sm border border-emerald-100">
        <CheckCircle2 className="text-emerald-500" size={24} />
        <span className="text-md font-medium text-slate-600">Materiales</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-3 place-items-center bg-white p-3 rounded-lg shadow-sm border border-emerald-100">
        <CheckCircle2 className="text-emerald-500" size={24} />
        <span className="text-md font-medium text-slate-600">Desempeño</span>
      </div>
    </div>

    <div className="grid grid-rows-[auto_auto] gap-6 place-items-center p-8 bg-purple-50 rounded-xl border border-purple-100 w-full h-full">
      <Package size={64} className="text-purple-500" />
      <div className="grid gap-2 text-center">
        <span className="font-bold text-lg text-purple-900">Producto Fabricado</span>
        <span className="text-md text-purple-700">Resultado Físico Final</span>
      </div>
    </div>
  </div>
);

const Diagram4: React.FC = () => (
  <div className="grid grid-rows-[1fr_auto_1fr] gap-6 w-full max-w-2xl h-full place-items-center p-6 mx-auto">
    <div className="grid grid-cols-[auto_1fr] gap-6 place-items-center bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-200 w-full shadow-sm">
      <div className="grid place-items-center w-20 h-20 bg-emerald-100 rounded-full">
        <User size={40} className="text-emerald-600" />
      </div>
      <div className="grid gap-3 w-full">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <span className="font-bold text-xl text-emerald-900">Percepción del Usuario</span>
          <div className="grid grid-flow-col gap-1 text-amber-400">
            <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
          </div>
        </div>
        <p className="text-emerald-700 text-md">Facilidad de uso, utilidad percibida, expectativas superadas y valor agregado.</p>
      </div>
    </div>

    <ArrowDown className="text-slate-300" size={32} />

    <div className="grid grid-cols-[auto_1fr] gap-6 place-items-center bg-slate-100 p-8 rounded-2xl border-2 border-slate-200 w-full shadow-sm">
      <div className="grid place-items-center w-20 h-20 bg-slate-200 rounded-full">
        <Settings size={40} className="text-slate-600" />
      </div>
      <div className="grid gap-2 w-full">
        <span className="font-bold text-xl text-slate-800">Base Técnica (Requisitos)</span>
        <p className="text-slate-600 text-md">Funcionalidad base, ausencia de defectos, cumplimiento normativo y durabilidad estructural.</p>
      </div>
    </div>
  </div>
);

const Diagram5: React.FC = () => (
  <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full max-w-3xl h-full place-items-center p-8 mx-auto relative">
    {/* Center Node */}
    <div className="col-start-2 row-start-2 grid place-items-center w-40 h-40 bg-blue-600 text-white rounded-full shadow-xl z-20 border-4 border-blue-100 text-center">
      <div className="grid gap-1">
        <ShieldCheck size={32} className="justify-self-center mb-1" />
        <span className="font-bold leading-tight">Calidad del<br/>Producto</span>
      </div>
    </div>

    {/* Top Node */}
    <div className="col-start-2 row-start-1 grid grid-cols-[auto_1fr] gap-3 place-items-center bg-white p-4 rounded-xl border border-slate-200 shadow-md w-full z-10">
      <Shield className="text-indigo-500" size={24} />
      <span className="font-semibold text-slate-700">Confiabilidad</span>
    </div>

    {/* Right Node */}
    <div className="col-start-3 row-start-2 grid grid-cols-[auto_1fr] gap-3 place-items-center bg-white p-4 rounded-xl border border-slate-200 shadow-md w-full z-10">
      <Activity className="text-emerald-500" size={24} />
      <span className="font-semibold text-slate-700">Desempeño</span>
    </div>

    {/* Bottom Node */}
    <div className="col-start-2 row-start-3 grid grid-cols-[auto_1fr] gap-3 place-items-center bg-white p-4 rounded-xl border border-slate-200 shadow-md w-full z-10">
      <Award className="text-amber-500" size={24} />
      <span className="font-semibold text-slate-700">Durabilidad</span>
    </div>

    {/* Left Node */}
    <div className="col-start-1 row-start-2 grid grid-cols-[auto_1fr] gap-3 place-items-center bg-white p-4 rounded-xl border border-slate-200 shadow-md w-full z-10">
      <Eye className="text-purple-500" size={24} />
      <span className="font-semibold text-slate-700">Estética</span>
    </div>
    
    {/* Connecting elements (CSS Grid borders to simulate connections behind the nodes) */}
    <div className="col-start-1 col-span-3 row-start-2 w-full h-1 bg-slate-200 z-0 absolute"></div>
    <div className="row-start-1 row-span-3 col-start-2 w-1 h-full bg-slate-200 z-0 absolute"></div>
  </div>
);

// --- Layout & Main Wrapper ---

const DiagramRender: React.FC<{ activeId: string }> = ({ activeId }) => {
  switch (activeId) {
    case 'q1': return <Diagram1 />;
    case 'q2': return <Diagram2 />;
    case 'q3': return <Diagram3 />;
    case 'q4': return <Diagram4 />;
    case 'q5': return <Diagram5 />;
    default: return null;
  }
};

const LessonLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(LESSON_DATA[0].id);
  const currentData = LESSON_DATA.find(d => d.id === activeTab) || LESSON_DATA[0];

  return (
<div className="grid grid-rows-[auto_1fr] min-h-screen w-full bg-slate-100 text-slate-800 font-sans">      
      {/* Header & Nav */}
      <header className="grid grid-rows-[auto_auto] bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 place-items-center p-5">
          <div className="grid place-items-center w-10 h-10 bg-blue-600 text-white rounded-lg">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 justify-self-start tracking-tight">
            Introducción a la Calidad
          </h1>
        </div>
        
        <nav className="grid grid-flow-col auto-cols-max gap-2 px-6 items-end overflow-x-auto hide-scrollbar">
          {LESSON_DATA.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`grid place-items-center px-5 py-3 border-b-2 font-medium text-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.tabTitle}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid grid-rows-[auto_1fr] gap-6 p-6 overflow-y-auto w-full max-w-6xl justify-self-center">
        
        {/* Concept Description Card */}
        <Card className="grid grid-cols-1  gap-0 border-l-4 border-l-blue-500">
          <div className="grid content-start  p-6 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 leading-tight">
              {currentData.diagramTitle}
            </h3>
          </div>
          <div className="grid place-items-center p-2 pl-6 bg-white">
            <p className="text-slate-600 leading-relaxed text-base justify-self-start">
              {currentData.diagramDescription}
            </p>
          </div>
        </Card>

        {/* Diagram Visualization Card */}
        <Card className="bg-white ">
        
<div className="grid place-items-center w-full h-full p-4 md:p-8 bg-white">            <DiagramRender activeId={activeTab} />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default function App() {
  return <LessonLayout />;
}