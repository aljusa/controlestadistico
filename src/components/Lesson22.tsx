import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, XCircle, Search, HelpCircle, Package, ArrowDown, Activity } from 'lucide-react';

// ==========================================
// Types & Interfaces
// ==========================================
interface Quark {
  id: string;
  tabLabel: string;
  title: string;
  type: string;
  description: string;
  diagramTitle: string;
  diagramDescription: string;
  diagramRender: React.ReactNode;
}

interface LessonLayoutProps {
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// ==========================================
// Base Components
// ==========================================
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden grid ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-slate-50 grid grid-rows-[auto_1fr] font-sans text-slate-800">
    {children}
  </div>
);

// ==========================================
// Diagram Render Components
// ==========================================

// Diagrama 1: Introducción a los tipos de datos
const Diagram1: React.FC = () => (
  <div className="grid grid-rows-[auto_auto_1fr] grid-cols-2 gap-4 h-full p-4 place-items-center">
    <div className="col-span-2 bg-blue-600 text-white p-4 rounded-lg font-bold text-center w-3/4 shadow-md">
      Datos en Control de Calidad
    </div>
    
    <div className="col-span-1 place-self-center text-slate-400">
      <ArrowDown size={32} />
    </div>
    <div className="col-span-1 place-self-center text-slate-400">
      <ArrowDown size={32} />
    </div>

    <div className="col-span-1 grid grid-rows-[auto_1fr] gap-2 bg-slate-100 border border-slate-300 p-6 rounded-lg text-center h-full w-full">
      <div className="grid place-items-center text-slate-600"><Activity size={32} /></div>
      <div>
        <h4 className="font-bold text-slate-700 mb-2">Mediciones Continuas</h4>
        <p className="text-sm text-slate-500">Longitud, peso, temperatura, etc.</p>
      </div>
    </div>

    <div className="col-span-1 grid grid-rows-[auto_1fr] gap-2 bg-indigo-50 border-2 border-indigo-400 p-6 rounded-lg text-center h-full w-full relative overflow-hidden shadow-inner">
      <div className="grid place-items-center text-indigo-600"><Package size={32} /></div>
      <div>
        <h4 className="font-bold text-indigo-800 mb-2">Datos por Atributo</h4>
        <p className="text-sm text-indigo-600">Clasificaciones, conteo de defectos, pasa/no pasa.</p>
      </div>
    </div>
  </div>
);

// Diagrama 2: Definición de datos por atributo
const Diagram2: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-8 p-6 h-full place-items-center">
    <div className="bg-slate-800 text-white p-6 rounded-xl text-center w-full shadow-lg relative">
      <div className="absolute -top-4 -left-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Definición</div>
      <h3 className="text-xl font-bold mb-2">Datos por Atributo</h3>
      <p className="text-slate-300 text-sm">Evaluación de calidad mediante categorías o conteos en lugar de mediciones numéricas.</p>
    </div>

    <div className="grid grid-cols-2 gap-6 w-full">
      <div className="grid grid-rows-[auto_auto] gap-3 place-items-center bg-green-50 border border-green-200 p-6 rounded-xl">
        <CheckCircle2 size={48} className="text-green-500" />
        <span className="font-bold text-green-700 text-lg">Aceptable</span>
        <span className="text-xs text-green-600 text-center">Cumple con las especificaciones</span>
      </div>
      <div className="grid grid-rows-[auto_auto] gap-3 place-items-center bg-red-50 border border-red-200 p-6 rounded-xl">
        <XCircle size={48} className="text-red-500" />
        <span className="font-bold text-red-700 text-lg">No Aceptable</span>
        <span className="text-xs text-red-600 text-center">No cumple o presenta defectos</span>
      </div>
    </div>
  </div>
);

// Diagrama 3: Clasificación de resultados
const Diagram3: React.FC = () => (
  <div className="grid grid-rows-[auto_auto_auto] gap-6 p-6 h-full place-content-center w-full">
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center w-full bg-slate-100 p-4 rounded-xl border border-slate-200">
      <div className="grid grid-cols-3 gap-2">
        <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
        <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
        <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
      </div>
      <span className="font-semibold text-slate-500 uppercase tracking-widest text-sm">Lote de Entrada</span>
      <div className="grid justify-items-end">
        <Package className="text-slate-400" />
      </div>
    </div>

    <div className="grid place-items-center py-4 relative">
      <div className="w-1 h-12 bg-indigo-200"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-100 border-2 border-indigo-400 p-4 rounded-full z-10 shadow-md">
        <Search className="text-indigo-600" size={32} />
      </div>
      <span className="absolute top-1/2 left-[60%] -translate-y-1/2 text-indigo-700 font-bold bg-white px-2 py-1 rounded text-sm shadow-sm">Inspección Visual</span>
    </div>

    <div className="grid grid-cols-2 gap-4">
       <div className="grid gap-2 border-t-4 border-green-500 bg-white p-4 shadow-sm rounded-b-lg">
          <span className="font-bold text-slate-700 text-center">Categoría A</span>
          <div className="grid grid-cols-3 gap-2 place-items-center">
             <div className="w-6 h-6 bg-green-400 rounded-full"></div>
             <div className="w-6 h-6 bg-green-400 rounded-full"></div>
          </div>
       </div>
       <div className="grid gap-2 border-t-4 border-red-500 bg-white p-4 shadow-sm rounded-b-lg">
          <span className="font-bold text-slate-700 text-center">Categoría B</span>
          <div className="grid grid-cols-3 gap-2 place-items-center">
             <div className="w-6 h-6 bg-red-400 rounded-full"></div>
          </div>
       </div>
    </div>
  </div>
);

// Diagrama 4: Preguntas típicas
const Diagram4: React.FC = () => (
  <div className="grid place-items-center h-full p-8 w-full">
    <div className="grid grid-rows-[auto_1fr] gap-8 w-full max-w-md">
      <div className="grid place-items-center bg-indigo-600 text-white p-6 rounded-2xl shadow-lg z-10 relative">
        <HelpCircle size={40} className="mb-2 opacity-80" />
        <h3 className="text-xl font-bold text-center">Proceso de Inspección por Atributos</h3>
        
        {/* Conectores CSS Grid nativos (simulados con position absolute dentro del contenedor relativo para cruzar el grid) */}
        <div className="absolute -bottom-6 left-1/4 w-0.5 h-6 bg-slate-300"></div>
        <div className="absolute -bottom-6 right-1/4 w-0.5 h-6 bg-slate-300"></div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full pt-2">
        <div className="bg-white border-2 border-slate-200 p-6 rounded-xl shadow-sm hover:border-indigo-300 transition-colors grid grid-rows-[auto_1fr] gap-4">
          <div className="text-indigo-500 font-bold text-4xl leading-none">?</div>
          <p className="font-medium text-slate-700">¿La unidad cumple con las especificaciones?</p>
          <div className="grid grid-cols-2 gap-2 mt-auto">
             <div className="bg-green-100 text-green-700 text-xs text-center py-1 rounded font-bold">Sí</div>
             <div className="bg-red-100 text-red-700 text-xs text-center py-1 rounded font-bold">No</div>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-200 p-6 rounded-xl shadow-sm hover:border-indigo-300 transition-colors grid grid-rows-[auto_1fr] gap-4">
           <div className="text-indigo-500 font-bold text-4xl leading-none">#</div>
           <p className="font-medium text-slate-700">¿Cuántos defectos presenta esta unidad?</p>
           <div className="grid grid-cols-4 gap-1 mt-auto items-end">
              <div className="bg-slate-200 h-2 rounded"></div>
              <div className="bg-slate-300 h-4 rounded"></div>
              <div className="bg-slate-400 h-6 rounded"></div>
              <div className="bg-indigo-400 h-8 rounded"></div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// Diagrama 5: Uso de conteos (Gráfico)
const Diagram5: React.FC = () => {
  const data = [
    { muestra: 'Lote 1', defectos: 3 },
    { muestra: 'Lote 2', defectos: 1 },
    { muestra: 'Lote 3', defectos: 5 },
    { muestra: 'Lote 4', defectos: 0 },
    { muestra: 'Lote 5', defectos: 2 },
    { muestra: 'Lote 6', defectos: 4 },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr] gap-4 h-[400px] w-full p-4">
      <div className="text-center font-bold text-slate-600 text-sm uppercase tracking-wide">
        Frecuencia de defectos por muestra inspeccionada
      </div>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="muestra" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} allowDecimals={false} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="defectos" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} name="Cant. Defectos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


// ==========================================
// Data Source
// ==========================================
const quarksData: Quark[] = [
  {
    id: 'q1',
    tabLabel: '1. Introducción',
    title: 'Introducción a los tipos de datos en el control de calidad',
    type: 'Contexto Teórico',
    description: 'En el control estadístico de calidad, los procesos pueden analizarse utilizando diferentes tipos de datos. Algunos datos provienen de mediciones continuas, como longitud, peso o temperatura. Otros, en cambio, se basan en clasificaciones o conteos, que permiten evaluar si un producto cumple o no con ciertos criterios de calidad. Este segundo tipo corresponde a los datos por atributo, ampliamente utilizados en inspección y control de calidad.',
    diagramTitle: 'Tipología de Datos',
    diagramDescription: 'Esquema conceptual dividiendo las categorías de datos en control de calidad, contrastando mediciones continuas con datos por atributo.',
    diagramRender: <Diagram1 />
  },
  {
    id: 'q2',
    tabLabel: '2. Definición',
    title: 'Definición de datos por atributo',
    type: 'Definición Principal',
    description: 'Los datos por atributo son aquellos que describen la calidad de un producto mediante categorías o conteos, en lugar de mediciones numéricas continuas. En este tipo de datos, los resultados se clasifican en categorías definidas, como cumplir o no cumplir con las especificaciones.',
    diagramTitle: 'Concepto Fundamental',
    diagramDescription: 'Caja de definición esquemática ilustrando la categorización binaria o cualitativa fundamental de los atributos.',
    diagramRender: <Diagram2 />
  },
  {
    id: 'q3',
    tabLabel: '3. Clasificación',
    title: 'Clasificación de resultados mediante atributos',
    type: 'Concepto Aplicado',
    description: 'En los datos por atributo, el análisis se basa en clasificar los resultados del proceso en categorías. Estas clasificaciones permiten evaluar la calidad del producto sin necesidad de realizar mediciones detalladas, agilizando el flujo de inspección en entornos de alta producción.',
    diagramTitle: 'Flujo de Inspección',
    diagramDescription: 'Diagrama del proceso de inspección donde los elementos se evalúan visualmente y se segmentan en categorías predefinidas.',
    diagramRender: <Diagram3 />
  },
  {
    id: 'q4',
    tabLabel: '4. Preguntas Típicas',
    title: 'Preguntas asociadas a datos por atributo',
    type: 'Análisis Práctico',
    description: 'El análisis basado en atributos suele responder preguntas simples relacionadas con la calidad del producto, como si una unidad cumple con las especificaciones o cuántos defectos presenta. Estas preguntas permiten obtener información útil y rápida sobre el estado del proceso productivo.',
    diagramTitle: 'Cuestionamientos Clave',
    diagramDescription: 'Mapeo de las interrogantes principales que el enfoque por atributos busca resolver durante el control de calidad.',
    diagramRender: <Diagram4 />
  },
  {
    id: 'q5',
    tabLabel: '5. Uso de Conteos',
    title: 'Uso de conteos en el análisis por atributos',
    type: 'Visualización de Datos',
    description: 'Los datos por atributo suelen expresarse mediante conteos. Por ejemplo, se puede contar el número de productos defectuosos en una muestra o el número de defectos presentes en una sola unidad. Estos conteos permiten analizar el comportamiento estadístico del proceso a lo largo del tiempo.',
    diagramTitle: 'Gráfico de Control por Conteo',
    diagramDescription: 'Representación en gráfico de barras de múltiples muestras ilustrando la variación en la detección de defectos.',
    diagramRender: <Diagram5 />
  }
];


// ==========================================
// Main Application Component
// ==========================================
export default function App() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const activeQuark = quarksData[activeTabIndex];

  return (
    <LessonLayout>
      {/* Header & Navigation */}
      <header className="grid grid-rows-[auto_auto] gap-6 p-6 lg:px-12 bg-white border-b border-slate-200">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
              Control de Calidad
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Estudio Integral: Datos por Atributo
            </p>
          </div>
          <div className="hidden lg:grid place-items-center bg-indigo-50 text-indigo-600 p-3 rounded-full">
             <Activity size={24} />
          </div>
        </div>

        {/* CSS Grid Based Tabs System */}
        <nav className="grid grid-flow-col auto-cols-fr gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto">
          {quarksData.map((quark, index) => (
            <button
              key={quark.id}
              onClick={() => setActiveTabIndex(index)}
              className={`
                grid place-items-center py-2.5 px-4 rounded-lg font-semibold text-sm transition-all whitespace-nowrap
                ${activeTabIndex === index 
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
              `}
            >
              {quark.tabLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid p-6 lg:p-12 items-start h-full">
        {/* Responsive Grid layout for Content vs Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 max-w-7xl mx-auto w-full h-full">
          
          {/* Panel Izquierdo: Contenido Textual */}
          <Card className="grid grid-rows-[auto_auto_1fr] gap-6 p-8 h-fit lg:sticky lg:top-8">
            <div className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 w-fit px-3 py-1 rounded-full">
                {activeQuark.type}
              </span>
              <h2 className="text-2xl font-bold text-slate-800 leading-snug">
                {activeQuark.title}
              </h2>
            </div>
            
            <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              {activeQuark.description}
            </p>
          </Card>

          {/* Panel Derecho: Render de Diagrama */}
          <Card className="grid grid-rows-[auto_1fr] h-full min-h-[500px] bg-slate-50/50">
            <div className="grid grid-rows-[auto_auto] gap-2 p-6 border-b border-slate-200 bg-white">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Search size={20} className="text-indigo-500" />
                {activeQuark.diagramTitle}
              </h3>
              <p className="text-sm text-slate-500">
                {activeQuark.diagramDescription}
              </p>
            </div>
            
            <div className="p-6 grid place-items-center w-full h-full overflow-hidden bg-dot-pattern">
              {/* Contenedor específico del render */}
              <div className="w-full h-full max-w-2xl">
                 {activeQuark.diagramRender}
              </div>
            </div>
          </Card>

        </div>
      </main>
      
      {/* Definición global rápida para el patrón de fondo del diagrama */}
      <style dangerouslySetInnerHTML={{__html: `
        .bg-dot-pattern {
          background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}} />
    </LessonLayout>
  );
}