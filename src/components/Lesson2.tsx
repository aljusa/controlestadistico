import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Factory, 
  AlertTriangle, 
  ShieldCheck, 
  Box, 
  PenTool, 
  Star, 
  User 
} from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  headerTitle: string;
  tabs: React.ReactNode;
  children: React.ReactNode;
}

interface LessonData {
  id: string;
  title: string;
  diagramTitle: string;
  description: string;
  DiagramRender: React.FC;
}

// --- COMPONENTES BASE ---

/**
 * Componente Card: Envoltorio estético para secciones de contenido.
 * Utiliza CSS Grid en lugar de Flexbox para su layout interno por defecto.
 */
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
    {children}
  </div>
);

/**
 * Componente LessonLayout: Estructura principal de la aplicación.
 * Mantiene el header, la navegación por pestañas y el área de contenido fluido 
 * usando un grid de dos filas (auto para header, 1fr para el resto).
 */
const LessonLayout: React.FC<LessonLayoutProps> = ({ headerTitle, tabs, children }) => (
  <div className="grid grid-rows-[auto_1fr] h-screen w-full bg-slate-50 text-slate-800 font-sans ">
    <header className="grid grid-rows-[auto_auto] gap-6 p-6 bg-white shadow-sm border-b border-slate-200 z-10">
      <div className="grid place-items-start">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{headerTitle}</h1>
      </div>
      <nav className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full">
        {tabs}
      </nav>
    </header>
    <main className="grid p-4 md:p-8 items-start">
      {children}
    </main>
  </div>
);

// --- COMPONENTES DE VISUALIZACIÓN (DIAGRAMAS) ---
// Todos desarrollados utilizando CSS Grid y posicionamiento relativo/absoluto para gráficos.

const ReliabilityDiagram: React.FC = () => (
  <div className="grid w-full max-w-2xl relative place-items-center p-8">
    {/* Línea de tiempo base */}
    <div className="w-full h-2 bg-slate-200 rounded-full absolute top-1/2 -translate-y-1/2" />
    
    {/* Nodos de la línea de tiempo */}
    <div className="grid grid-cols-4 w-full gap-4 z-10 relative place-items-center">
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className="grid grid-rows-[auto_auto_auto] gap-2 place-items-center">
          <div className="grid place-items-center w-12 h-12 bg-white border-4 border-emerald-500 rounded-full shadow-md">
            <CheckCircle2 className="text-emerald-500 w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-slate-700">T {num}</span>
          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md font-medium">Sin fallas</span>
        </div>
      ))}
    </div>
  </div>
);

const DurabilityDiagram: React.FC = () => (
  <div className="grid grid-rows-[auto] gap-6 place-items-center w-full max-w-2xl p-4">
    <div className="grid grid-cols-[auto_1fr_auto] w-full items-center gap-4">
      <div className="grid grid-rows-[auto_auto] gap-2 place-items-center">
        <div className="grid place-items-center p-4 bg-slate-100 rounded-full border-2 border-slate-300 shadow-sm">
          <Factory className="text-slate-600 w-8 h-8" />
        </div>
        <span className="text-sm font-bold text-slate-700">Fabricación</span>
      </div>
      
      <div className="grid grid-rows-1 place-items-stretch relative h-10 w-full">
        <div className="bg-gradient-to-r from-blue-400 to-indigo-600 h-full w-full rounded-md col-start-1 row-start-1 shadow-inner" />
        <div className="grid place-items-center col-start-1 row-start-1 text-white text-sm font-bold tracking-wider">
          VIDA ÚTIL
        </div>
      </div>
      
      <div className="grid grid-rows-[auto_auto] gap-2 place-items-center">
        <div className="grid place-items-center p-4 bg-orange-50 rounded-full border-2 border-orange-200 shadow-sm">
          <AlertTriangle className="text-orange-500 w-8 h-8" />
        </div>
        <span className="text-sm font-bold text-slate-700">Deterioro</span>
      </div>
    </div>
  </div>
);

const SafetyDiagram: React.FC = () => (
  <div className="grid place-items-center relative w-72 h-72">
    {/* Escudo de fondo */}
    <ShieldCheck className="w-full h-full text-emerald-500 absolute opacity-10" strokeWidth={0.5} />
    
    {/* Elemento central protegido */}
    <div className="grid grid-rows-[auto_auto] gap-4 place-items-center z-10 bg-white p-8 rounded-2xl shadow-xl border-4 border-emerald-500 relative">
      <div className="absolute -top-5 -right-5 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
        <ShieldCheck className="w-8 h-8" />
      </div>
      <Box className="w-16 h-16 text-slate-700" />
      <span className="font-bold text-emerald-700 uppercase tracking-wide text-sm">Protección Activa</span>
    </div>
  </div>
);

const ComplianceDiagram: React.FC = () => (
  <div className="grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 w-full max-w-3xl place-items-center">
    {/* Lado izquierdo: Especificación Técnica */}
    <div className="grid grid-rows-[auto_1fr] gap-4 place-items-center w-full">
      <span className="font-bold text-blue-700 bg-blue-50 px-4 py-1 rounded-full text-sm">Diseño / Plano</span>
      <div className="grid place-items-center w-full aspect-square bg-blue-50/50 border-2 border-dashed border-blue-400 rounded-xl relative">
        <div className="absolute top-3 left-3 text-xs font-mono text-blue-600 font-bold">L: 120mm</div>
        <div className="absolute bottom-3 right-3 text-xs font-mono text-blue-600 font-bold">W: 60mm</div>
        <PenTool className="w-16 h-16 text-blue-300" />
      </div>
    </div>

    {/* Centro: Validación */}
    <div className="grid grid-rows-[auto_auto] gap-2 place-items-center">
      <div className="grid place-items-center bg-emerald-100 p-4 rounded-full shadow-sm">
        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
      </div>
      <span className="text-xs font-bold text-emerald-600">Coincidencia</span>
    </div>

    {/* Lado derecho: Producto Fabricado */}
    <div className="grid grid-rows-[auto_1fr] gap-4 place-items-center w-full">
      <span className="font-bold text-slate-700 bg-slate-100 px-4 py-1 rounded-full text-sm">Producto Real</span>
      <div className="grid place-items-center w-full aspect-square bg-slate-50 border-2 border-solid border-slate-300 rounded-xl shadow-inner relative">
        <div className="absolute top-3 left-3 text-xs font-mono text-slate-600 font-bold">L: 120mm</div>
        <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-600 font-bold">W: 60mm</div>
        <Box className="w-16 h-16 text-slate-400" />
      </div>
    </div>
  </div>
);

const SatisfactionDiagram: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-10 place-items-center w-full max-w-2xl">
    {/* Calificación */}
    <div className="grid grid-cols-5 gap-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-12 h-12 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
      ))}
    </div>
    
    {/* Escena de Interacción */}
    <div className="grid grid-cols-[auto_1fr_auto] gap-6 items-center w-full">
      <div className="grid grid-rows-[auto_auto] gap-3 place-items-center">
        <div className="grid place-items-center p-5 bg-indigo-50 rounded-full border border-indigo-100 shadow-sm">
          <User className="w-10 h-10 text-indigo-600" />
        </div>
        <span className="font-bold text-slate-700 text-sm">Cliente</span>
      </div>
      
      <div className="grid grid-rows-[auto_auto] place-items-center gap-3">
        <div className="grid place-items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full font-bold text-sm shadow-sm relative">
          ¡Resuelve mi problema!
          <div className="absolute -bottom-2 w-4 h-4 bg-emerald-100 rotate-45" />
        </div>
        <div className="w-full h-1 bg-slate-200 rounded-full mt-4" />
      </div>
      
      <div className="grid grid-rows-[auto_auto] gap-3 place-items-center">
        <div className="grid place-items-center p-5 bg-white border-2 border-slate-200 rounded-xl shadow-md">
          <Box className="w-10 h-10 text-slate-600" />
        </div>
        <span className="font-bold text-slate-700 text-sm">Producto</span>
      </div>
    </div>
  </div>
);

// --- BASE DE DATOS LOCAL (CONTENIDO) ---

const lessonsContent: LessonData[] = [
  {
    id: 'q6',
    title: ': Confiabilidad',
    diagramTitle: 'Línea de Tiempo de Confiabilidad',
    description: 'La confiabilidad es la capacidad de un producto para funcionar correctamente durante un período determinado sin presentar fallas. Este atributo refleja la estabilidad del desempeño del producto en condiciones normales de uso. Mientras menos interrupciones existan, mayor es el índice de confiabilidad.',
    DiagramRender: ReliabilityDiagram
  },
  {
    id: 'q7',
    title: ': Durabilidad',
    diagramTitle: 'Ciclo de Vida y Durabilidad',
    description: 'La durabilidad se refiere a la vida útil del producto, es decir, al tiempo durante el cual puede utilizarse antes de deteriorarse o requerir reemplazo. Un producto con alta durabilidad mantiene sus funciones primarias y estructurales durante un período prolongado desde su fabricación hasta su desgaste.',
    DiagramRender: DurabilityDiagram
  },
  {
    id: 'q8',
    title: ': Seguridad',
    diagramTitle: 'Garantía de Seguridad del Producto',
    description: 'La seguridad implica que el producto no represente riesgos para el usuario cuando se utiliza conforme a las instrucciones establecidas. Este atributo es fundamental en el diseño y fabricación de productos industriales, requiriendo certificaciones y escudos de protección pasiva y activa.',
    DiagramRender: SafetyDiagram
  },
  {
    id: 'q9',
    title: ': Cumplimiento',
    diagramTitle: 'Comparativa de Especificaciones Técnicas',
    description: 'El cumplimiento de especificaciones técnicas consiste en que el producto fabricado coincida estrictamente con los parámetros definidos en su diseño, como dimensiones, tolerancias, materiales o rendimiento esperado. La calidad se asegura mediante la reducción de la varianza entre el plano y la realidad.',
    DiagramRender: ComplianceDiagram
  },
  {
    id: 'q10',
    title: ': Satisfacción',
    diagramTitle: 'Evaluación y Percepción del Usuario',
    description: 'La satisfacción del cliente representa la evaluación que el usuario realiza sobre el desempeño del producto y su capacidad para resolver una necesidad o problema específico. Este atributo refleja la percepción global del valor del producto en el mundo real.',
    DiagramRender: SatisfactionDiagram
  }
];

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(lessonsContent[0].id);

  const activeLesson = lessonsContent.find((lesson) => lesson.id === activeTabId) || lessonsContent[0];
  const ActiveDiagram = activeLesson.DiagramRender;

  return (
    <LessonLayout
      headerTitle="Atributos de Calidad y Confiabilidad"
      tabs={lessonsContent.map((lesson) => (
        <button
          key={lesson.id}
          onClick={() => setActiveTabId(lesson.id)}
          className={`grid place-items-center py-3 px-2 rounded-lg text-sm font-semibold transition-colors duration-200 border-2
            ${activeTabId === lesson.id 
              ? 'bg-blue-50 text-blue-700 border-blue-600 shadow-sm' 
              : 'bg-white text-slate-600 border-transparent hover:bg-slate-50 hover:border-slate-300'
            }`}
        >
          {lesson.title.split(':')[1].trim()}
        </button>
      ))}
    >
      {/* Contenedor principal estructurado con Grid en lugar de Flexbox */}
      <div className="grid grid-cols-1  gap-6 w-full max-w-7xl mx-auto h-full">
        
        {/* Panel Izquierdo: Descripción Textual */}
        <Card className="grid grid-rows-[auto_1fr] gap-4 self-start border-l-4 border-l-blue-600">
          <div className="grid gap-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {activeLesson.title.split(':')[0]}
            </span>
            <h2 className="text-2xl font-bold text-slate-800">
              {activeLesson.diagramTitle}
            </h2>
          </div>
          <div className="grid grid-rows-[auto_1fr] gap-4">
            <div className="w-12 h-1 bg-blue-100 rounded-full" />
            <p className="text-slate-600 leading-relaxed text-lg">
              {activeLesson.description}
            </p>
          </div>
        </Card>

        {/* Panel Derecho: Renderizado del Diagrama Visual */}
        <Card className="grid place-items-center bg-slate-50 min-h-[400px] border-2 border-dashed border-slate-300 ">
          <ActiveDiagram />
        </Card>
        
      </div>
    </LessonLayout>
  );
}