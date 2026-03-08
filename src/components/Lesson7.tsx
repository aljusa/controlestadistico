import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Settings, 
  AlertTriangle, 
  Search,
  Factory
} from 'lucide-react';

// --- TIPOS E INTERFACES ---
type QuarkType = 'Q-ctx' | 'Q-def' | 'Q-con';

interface QuarkData {
  id: string;
  title: string;
  type: QuarkType;
  description: string;
}


interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  header: React.ReactNode;
  titlePanel: React.ReactNode;
  diagramPanel: React.ReactNode;
}

// --- DATOS DE LA LECCIÓN ---
const LESSON_DATA: QuarkData[] = [
  {
    id: 'q1',
    title: 'Evolución del control de calidad',
    type: 'Q-ctx',
    description: 'La gestión de la calidad ha evolucionado desde enfoques centrados en la revisión del producto terminado hacia métodos que buscan comprender y controlar el proceso productivo. Inicialmente, el control de calidad se basaba principalmente en la inspección de los productos después de su fabricación. Con el desarrollo de herramientas estadísticas aplicadas a la producción, surgió el control estadístico de la calidad, que permite analizar y mejorar el proceso mientras ocurre.'
  },
  {
    id: 'q2',
    title: 'Concepto de inspección en el control de calidad',
    type: 'Q-def',
    description: 'La inspección es el proceso de examinar productos terminados con el objetivo de verificar si cumplen con las especificaciones o estándares de calidad establecidos. Su función principal es identificar productos defectuosos y separarlos de aquellos que cumplen con los requisitos.'
  },
  {
    id: 'q3',
    title: 'Enfoque de la inspección tradicional',
    type: 'Q-con',
    description: 'El enfoque de la inspección tradicional se centra en evaluar el resultado final del proceso productivo. Una vez que los productos han sido fabricados, se revisan para verificar si cumplen con las especificaciones técnicas establecidas.'
  },
  {
    id: 'q4',
    title: 'Inspección al final del proceso productivo',
    type: 'Q-def',
    description: 'Una característica fundamental de la inspección es que se realiza al final del proceso productivo. Esto implica que la evaluación de la calidad se lleva a cabo una vez que el producto ya ha sido fabricado.'
  },
  {
    id: 'q5',
    title: 'Detección de defectos después de su aparición',
    type: 'Q-con',
    description: 'La inspección permite identificar productos defectuosos, pero lo hace después de que el defecto ya se ha producido. Por esta razón, el método es útil para detectar problemas, pero no para prevenirlos.'
  }
];

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);


// --- COMPONENTE RENDERIZADOR DE DIAGRAMAS ---

const DiagramRender: React.FC<{ activeId: string }> = ({ activeId }) => {
  // Utilizando estrictamente CSS Grid para todos los layouts internos
  switch (activeId) {
    case 'q1':
      return (
        <div className="grid h-full w-full place-content-center p-8 bg-slate-50">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center w-full max-w-3xl">
            <Card className="grid gap-4 p-6 text-center border-l-4 border-l-orange-400 place-items-center">
              <Search className="text-orange-400 w-10 h-10" />
              <div className="grid gap-1">
                <h3 className="font-bold text-slate-800">Inspección Final</h3>
                <p className="text-sm text-slate-500">Enfoque Correctivo (Pasado)</p>
              </div>
            </Card>
            
            <div className="grid place-items-center">
              <ArrowRight className="text-slate-400 w-8 h-8" />
            </div>

            <Card className="grid gap-4 p-6 text-center border-l-4 border-l-emerald-500 place-items-center">
              <Settings className="text-emerald-500 w-10 h-10" />
              <div className="grid gap-1">
                <h3 className="font-bold text-slate-800">Control Estadístico</h3>
                <p className="text-sm text-slate-500">Enfoque Preventivo (Actual)</p>
              </div>
            </Card>
          </div>
        </div>
      );

    case 'q2':
      return (
        <div className="grid grid-rows-[auto_1fr] h-full w-full gap-8 p-8 bg-slate-50 place-items-center">
          <Card className="p-4 bg-blue-50 border-blue-100 w-full max-w-2xl text-center grid gap-2 place-items-center">
            <h4 className="font-bold text-blue-900 uppercase tracking-wide text-sm">Inspección</h4>
            <p className="text-blue-800 text-sm">Proceso de examinar productos terminados para separar los defectuosos de los aceptables.</p>
          </Card>
          
          <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] gap-4 items-center w-full max-w-3xl">
            <Card className="p-4 grid place-items-center gap-2 bg-slate-100">
              <Factory className="text-slate-500" />
              <span className="font-medium text-slate-700 text-sm">Producción</span>
            </Card>
            
            <ArrowRight className="text-slate-400" />
            
            <Card className="p-4 grid place-items-center gap-2 border-2 border-amber-300 bg-amber-50 relative">
              <Search className="text-amber-600" />
              <span className="font-bold text-amber-800 text-sm">Estación de Revisión</span>
            </Card>
            
            <ArrowRight className="text-slate-400" />
            
            <div className="grid grid-rows-2 gap-3">
              <Card className="p-3 grid grid-flow-col auto-cols-max gap-2 items-center bg-emerald-50 border-emerald-200">
                <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                <span className="text-emerald-800 text-sm font-medium">Aceptados</span>
              </Card>
              <Card className="p-3 grid grid-flow-col auto-cols-max gap-2 items-center bg-red-50 border-red-200">
                <XCircle className="text-red-500 w-5 h-5" />
                <span className="text-red-800 text-sm font-medium">Rechazados</span>
              </Card>
            </div>
          </div>
        </div>
      );

    case 'q3':
      return (
        <div className="grid h-full w-full place-content-center p-8 bg-slate-50">
          <div className="grid grid-rows-[auto_1fr] gap-8 place-items-center w-full max-w-4xl">
            <h3 className="font-bold text-slate-500 uppercase tracking-widest text-sm">Línea de Producción Tradicional</h3>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.5fr] gap-3 items-center w-full">
              <Card className="p-4 text-center bg-white"><span className="text-slate-600 font-medium">Fase 1</span></Card>
              <ArrowRight className="text-slate-300 w-5 h-5" />
              <Card className="p-4 text-center bg-white"><span className="text-slate-600 font-medium">Fase 2</span></Card>
              <ArrowRight className="text-slate-300 w-5 h-5" />
              <Card className="p-4 text-center bg-white"><span className="text-slate-600 font-medium">Fase 3</span></Card>
              <ArrowRight className="text-slate-300 w-5 h-5" />
              <Card className="p-6 text-center bg-blue-600 text-white shadow-lg border-none transform scale-105 grid place-items-center gap-2">
                <Search className="w-6 h-6 text-blue-200" />
                <span className="font-bold">Inspección Final</span>
              </Card>
            </div>
          </div>
        </div>
      );

    case 'q4':
      return (
        <div className="grid h-full w-full place-content-center p-8 bg-slate-50">
           <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 items-end w-full max-w-4xl">
             <div className="grid gap-2 text-center">
                <div className="h-16 bg-slate-200 rounded-t-md grid place-items-center border-b-4 border-slate-300">
                  <Settings className="text-slate-500" />
                </div>
                <span className="text-xs font-medium text-slate-500 uppercase">Manufactura</span>
             </div>
             <div className="h-8 grid place-items-center"><ArrowRight className="text-slate-300 w-4 h-4" /></div>
             
             <div className="grid gap-2 text-center">
                <div className="h-24 bg-slate-200 rounded-t-md grid place-items-center border-b-4 border-slate-300">
                  <Settings className="text-slate-500" />
                </div>
                <span className="text-xs font-medium text-slate-500 uppercase">Ensamblaje</span>
             </div>
             <div className="h-8 grid place-items-center"><ArrowRight className="text-slate-300 w-4 h-4" /></div>
             
             <div className="grid gap-2 text-center">
                <div className="h-32 bg-slate-200 rounded-t-md grid place-items-center border-b-4 border-slate-300">
                  <Settings className="text-slate-500" />
                </div>
                <span className="text-xs font-medium text-slate-500 uppercase">Acabado</span>
             </div>
             <div className="h-8 grid place-items-center"><ArrowRight className="text-slate-300 w-4 h-4" /></div>

             <div className="grid gap-2 text-center relative">
                <div className="absolute -top-10 left-0 right-0 grid place-items-center">
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full border border-amber-200">
                    Momento de evaluación
                  </span>
                </div>
                <div className="h-40 bg-indigo-500 rounded-t-md grid place-items-center border-b-4 border-indigo-700 shadow-lg">
                  <Search className="text-white w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-indigo-700 uppercase">Inspección</span>
             </div>
           </div>
        </div>
      );

    case 'q5':
      return (
        <div className="grid h-full w-full place-content-center p-8 bg-slate-50">
          <Card className="grid grid-rows-[auto_1fr] w-full max-w-4xl p-6 gap-8 border-red-100 bg-white">
            <h3 className="font-bold text-center text-slate-700">El problema de la inspección tradicional</h3>
            
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 items-center">
              {/* Step 1: Defect occurs */}
              <div className="grid gap-3 place-items-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-300 grid place-items-center relative">
                  <Settings className="text-slate-400" />
                  <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 animate-pulse">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-600">Defecto<br/>originado</span>
              </div>

              <ArrowRight className="text-slate-300 w-5 h-5" />

              {/* Step 2: Product advances with defect */}
              <div className="grid gap-3 place-items-center text-center opacity-70">
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-red-300 grid place-items-center">
                  <Settings className="text-slate-400" />
                </div>
                <span className="text-xs text-slate-500">Proceso<br/>continúa</span>
              </div>

              <ArrowRight className="text-slate-300 w-5 h-5" />

              {/* Step 3: Product still advances */}
              <div className="grid gap-3 place-items-center text-center opacity-70">
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-red-300 grid place-items-center">
                  <Settings className="text-slate-400" />
                </div>
                <span className="text-xs text-slate-500">Valor<br/>agregado</span>
              </div>

              <ArrowRight className="text-red-300 w-5 h-5" />

              {/* Step 4: Defect detected */}
              <div className="grid gap-3 place-items-center text-center">
                <div className="w-20 h-20 rounded-full bg-red-50 border-4 border-red-500 grid place-items-center relative shadow-md">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <span className="text-xs font-bold text-red-700">¡Defecto<br/>detectado!</span>
              </div>
            </div>

            <div className="grid place-items-center text-center mt-4">
              <p className="text-sm font-medium text-slate-600 bg-slate-100 py-2 px-4 rounded-md">
                El costo y tiempo ya fueron invertidos. El método <strong className="text-red-600">detecta</strong> pero no <strong className="text-emerald-600">previene</strong>.
              </p>
            </div>
          </Card>
        </div>
      );

    default:
      return null;
  }
};

// --- ESTRUCTURA PRINCIPAL (LAYOUT) ---

const LessonLayout: React.FC<LessonLayoutProps> = ({ header, titlePanel, diagramPanel }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 text-slate-800 font-sans">
      {header}
      {/* Usando CSS Grid para el layout principal, sin flexbox */}
      <main className="grid gap-6 p-6 md:p-8 w-full max-w-7xl mx-auto items-start">
        <aside className=" grid gap-6">
          {titlePanel}
        </aside>
        <section className=" h-full grid">
          {diagramPanel}
        </section>
      </main>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (APP) ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(LESSON_DATA[0].id);
  const activeQuark = LESSON_DATA.find(q => q.id === activeTabId) || LESSON_DATA[0];

  const header = (
    <header className="bg-white border-b border-slate-200 top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 grid gap-4">
        <div className="grid grid-flow-col auto-cols-max gap-3 items-center">
          <div className="bg-blue-600 p-2 rounded-lg grid place-items-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            Inspección Tradicional y Control Estadístico de la Calidad
          </h1>
        </div>
        
        {/* Navegación por Pestañas (CSS Grid) */}
        <nav className="grid grid-cols-2 md:grid-flow-col md:auto-cols-fr gap-2 border-b border-slate-100 pb-1">
          {LESSON_DATA.map((quark, index) => {
            const isActive = quark.id === activeTabId;
            return (
              <button
                key={quark.id}
                onClick={() => setActiveTabId(quark.id)}
                className={`text-sm font-medium py-3 px-2 text-center transition-all border-b-2 outline-none
                  ${isActive 
                    ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-md' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
              >
                {index + 1}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );

  const titlePanel = (
    <Card className="grid gap-6 p-6 h-full content-start border-t-4 border-t-blue-600">
      <div className="grid gap-4">
        <h2 className="text-2xl font-bold text-slate-800 leading-tight">
          {activeQuark.title}
        </h2>
      </div>
      <div className="grid gap-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Descripción del Concepto
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {activeQuark.description}
        </p>
      </div>
    </Card>
  );

  const diagramPanel = (
    <Card className="h-full grid grid-rows-[auto_1fr] ">

      <div className="grid h-full relative bg-white">
        {/* Renderizado dinámico del diagrama según la pestaña activa */}
        <DiagramRender activeId={activeTabId} />
      </div>
    </Card>
  );

  return (
    <LessonLayout 
      header={header}
      titlePanel={titlePanel}
      diagramPanel={diagramPanel}
    />
  );
}