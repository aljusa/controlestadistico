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
  
  
  
} from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, RotateCcw, Box, Activity, Target } from 'lucide-react';

// --- TIPOS E INTERFACES ---
interface TabContent {
  id: string;
  title: string;
  diagramTitle: string;
  description: string;
  renderComponent: React.FC;
}

// --- DATOS SIMULADOS PARA GRÁFICOS ---
const controlChartData = [
  { sample: 1, value: 10.2 }, { sample: 2, value: 10.5 }, { sample: 3, value: 9.8 },
  { sample: 4, value: 10.1 }, { sample: 5, value: 10.9 }, { sample: 6, value: 9.5 },
  { sample: 7, value: 10.0 }, { sample: 8, value: 10.3 }, { sample: 9, value: 9.9 },
  { sample: 10, value: 10.1 }, { sample: 11, value: 11.2 }, { sample: 12, value: 10.0 },
  { sample: 13, value: 9.7 }, { sample: 14, value: 10.4 }, { sample: 15, value: 10.2 },
];

// --- COMPONENTES DE DIAGRAMAS (RENDER COMPONENTS) ---

// Diagrama Quark 6: Consecuencias (Flujo con CSS Grid)
const DiagramQuark6: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] grid-rows-[auto_1fr_auto] gap-4 place-items-center w-full max-w-4xl p-4">
    {/* Fila 1 */}
    <div className="grid place-items-center col-start-1 row-start-2 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 w-full h-full text-center shadow-sm">
      <Box className="text-blue-500 w-8 h-8 mb-2" />
      <span className="font-semibold text-blue-900">Producción</span>
    </div>

    <div className="grid place-items-center col-start-2 row-start-2 text-gray-400 font-bold text-2xl">→</div>

    <div className="grid place-items-center col-start-3 row-start-2 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 w-full h-full text-center shadow-sm relative">
      <Activity className="text-yellow-600 w-8 h-8 mb-2" />
      <span className="font-semibold text-yellow-900">Inspección Final</span>
    </div>

    {/* Flechas de bifurcación usando Grid */}
    <div className="grid grid-rows-2 col-start-4 row-start-2 h-full w-12 place-items-center relative">
        <div className="grid place-items-center text-green-500 font-bold text-xl self-start -mt-8 pt-2">↗</div>
        <div className="grid place-items-center text-red-500 font-bold text-xl self-end -mb-8 pb-2">↘</div>
    </div>

    {/* Resultados */}
    <div className="grid grid-rows-[1fr_auto_1fr] gap-4 col-start-5 row-start-1 row-span-3 h-full w-full">
        <div className="grid place-items-center row-start-1 bg-green-50 border-2 border-green-200 rounded-lg p-4 w-full text-center shadow-sm">
            <CheckCircle className="text-green-500 w-6 h-6 mb-2" />
            <span className="font-semibold text-green-900 text-sm">Aprobado</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 row-start-3 w-full">
             <div className="grid place-items-center bg-orange-50 border-2 border-orange-200 rounded-lg p-3 w-full text-center shadow-sm">
                <RotateCcw className="text-orange-500 w-5 h-5 mb-1" />
                <span className="font-semibold text-orange-900 text-xs">Reproceso<br/>(Costo Extra)</span>
            </div>
            <div className="grid place-items-center bg-red-50 border-2 border-red-200 rounded-lg p-3 w-full text-center shadow-sm">
                <XCircle className="text-red-500 w-5 h-5 mb-1" />
                <span className="font-semibold text-red-900 text-xs">Descarte<br/>(Desperdicio)</span>
            </div>
        </div>
    </div>
  </div>
);

// Diagrama Quark 7: Caja Negra (CSS Grid)
const DiagramQuark7: React.FC = () => (
  <div className="grid grid-cols-[1fr_2fr_1fr] gap-8 place-items-center w-full max-w-3xl">
    <div className="grid place-items-center text-center">
        <span className="text-gray-500 text-sm font-semibold mb-2">Entradas</span>
        <div className="grid grid-cols-2 gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>
    </div>

    <div className="grid place-items-center bg-gray-900 border-4 border-gray-700 rounded-xl p-12 w-full text-center relative shadow-2xl ">
        {/* Patrón sutil de fondo para representar "oculto" */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
        <AlertTriangle className="text-gray-500 w-12 h-12 mb-4 relative z-10" />
        <h3 className="text-white font-bold text-2xl tracking-widest relative z-10">CAJA NEGRA</h3>
        <p className="text-gray-400 text-sm mt-2 relative z-10">Proceso Productivo Ignorado</p>
    </div>

    <div className="grid grid-rows-[auto_auto] gap-4 place-items-center text-center">
        <div className="grid place-items-center bg-white border-2 border-indigo-200 rounded p-4 shadow-sm relative">
             <div className="absolute -left-10 text-indigo-300 font-bold text-2xl">→</div>
             <Target className="text-indigo-600 w-8 h-8 mb-2" />
             <span className="font-bold text-indigo-900 text-sm">Inspección</span>
             <span className="text-xs text-indigo-600">(Sólo ve el final)</span>
        </div>
    </div>
  </div>
);

// Diagrama Quark 8: Surgimiento del Control (Gráfico Recharts)
const DiagramQuark8: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 w-full h-[350px]">
    <div className="grid grid-rows-3 gap-4 h-full">
        <div className="grid place-items-center bg-blue-50 rounded-lg border border-blue-100 p-4 text-center">
             <Activity className="text-blue-500 w-6 h-6 mb-1" />
             <span className="text-sm font-semibold text-blue-900">Monitoreo Fase 1</span>
             <span className="text-xs text-green-600">Estable</span>
        </div>
        <div className="grid place-items-center bg-yellow-50 rounded-lg border border-yellow-100 p-4 text-center">
             <Activity className="text-yellow-600 w-6 h-6 mb-1" />
             <span className="text-sm font-semibold text-yellow-900">Monitoreo Fase 2</span>
             <span className="text-xs text-yellow-600">Alerta Temprana</span>
        </div>
        <div className="grid place-items-center bg-blue-50 rounded-lg border border-blue-100 p-4 text-center">
             <Activity className="text-blue-500 w-6 h-6 mb-1" />
             <span className="text-sm font-semibold text-blue-900">Monitoreo Fase 3</span>
             <span className="text-xs text-green-600">Estable</span>
        </div>
    </div>
    <div className="w-full h-full bg-white p-4 border border-gray-100 rounded-lg shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={controlChartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="sample" tick={{fontSize: 12}} stroke="#9ca3af" />
                <YAxis domain={[9, 12]} tick={{fontSize: 12}} stroke="#9ca3af" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 8 }} animationDuration={2000} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  </div>
);

// Diagrama Quark 9: Definición formal (Recharts Control Chart + Grid UI)
const DiagramQuark9: React.FC = () => (
  <div className="grid grid-rows-[auto_1fr] gap-6 w-full max-w-4xl h-[400px]">
    <div className="grid grid-cols-[auto_1fr] gap-4 place-items-center bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-lg">
        <div className="bg-indigo-600 text-white rounded-full p-2 grid place-items-center">
             <Target className="w-6 h-6" />
        </div>
        <p className="text-indigo-900 text-sm md:text-base font-medium">
            <strong>Control Estadístico de la Calidad:</strong> Enfoque que utiliza datos y herramientas estadísticas para analizar, monitorear y controlar el comportamiento de un proceso productivo, manteniéndolo estable y reduciendo defectos.
        </p>
    </div>
    
    <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={controlChartData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="sample" label={{ value: 'Muestras de Tiempo', position: 'insideBottom', offset: -10 }} />
                <YAxis domain={[8.5, 12.5]} />
                <Tooltip />
                <ReferenceLine y={11.5} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: 'Límite Superior (LCS)', fill: 'red', fontSize: 12 }} />
                <ReferenceLine y={10.2} stroke="green" strokeDasharray="3 3" label={{ position: 'top', value: 'Media', fill: 'green', fontSize: 12 }} />
                <ReferenceLine y={8.9} stroke="red" strokeDasharray="3 3" label={{ position: 'bottom', value: 'Límite Inferior (LCI)', fill: 'red', fontSize: 12 }} />
                <Line type="stepAfter" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  </div>
);

// Diagrama Quark 10: Enfoque centrado en el proceso (Grid Radical)
const DiagramQuark10: React.FC = () => (
  <div className="grid grid-cols-3 gap-4 place-items-center w-full max-w-2xl ">
    <div className="grid place-items-center col-start-2 row-start-1 text-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 w-full transform translate-y-4">
        <span className="text-xs font-bold text-gray-500">Métrica A</span>
        <div className="w-full h-2 bg-green-200 rounded mt-1"><div className="w-3/4 h-full bg-green-500 rounded"></div></div>
    </div>
    
    <div className="grid place-items-center col-start-1 row-start-2 text-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 w-full transform translate-x-4">
        <span className="text-xs font-bold text-gray-500">Métrica B</span>
        <div className="w-full h-2 bg-blue-200 rounded mt-1"><div className="w-1/2 h-full bg-blue-500 rounded"></div></div>
    </div>

    <div className="grid place-items-center col-start-2 row-start-2 bg-indigo-600 rounded-full w-40 h-40 shadow-xl border-8 border-indigo-200 z-10 text-center relative">
         <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-400"></div>
         <span className="text-white font-black text-xl z-10 tracking-wide">PROCESO<br/>CENTRAL</span>
    </div>

    <div className="grid place-items-center col-start-3 row-start-2 text-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 w-full transform -translate-x-4">
        <span className="text-xs font-bold text-gray-500">Desviaciones</span>
        <span className="text-lg font-black text-green-500 mt-1">0.02%</span>
    </div>

    <div className="grid place-items-center col-start-2 row-start-3 text-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 w-full transform -translate-y-4">
        <span className="text-xs font-bold text-gray-500">Estabilidad</span>
        <span className="text-sm font-bold text-indigo-600 mt-1">Controlado</span>
    </div>
  </div>
);

// --- CONFIGURACIÓN DE CONTENIDO ---
const lessonData: TabContent[] = [
  {
    id: 'q6',
    title: 'Consecuencias',
    diagramTitle: 'Impacto de la Detección Tardía',
    description: 'Cuando los defectos se detectan al final del proceso mediante la inspección clásica, los productos defectuosos ya han consumido recursos. Esto obliga a realizar costosos reprocesos o descartar el material, generando un alto nivel de desperdicio y pérdida de eficiencia.',
    renderComponent: DiagramQuark6,
  },
  {
    id: 'q7',
    title: 'Limitación',
    diagramTitle: 'La Ilusión de la Inspección',
    description: 'La principal debilidad de la inspección es su ceguera ante las causas raíz. Trata al proceso productivo como una "Caja Negra", observando únicamente el resultado final sin aportar información sobre cómo o por qué se desvió el proceso.',
    renderComponent: DiagramQuark7,
  },
  {
    id: 'q8',
    title: 'Surgimiento',
    diagramTitle: 'Nacimiento del Monitoreo Estadístico',
    description: 'Ante la ineficiencia de la inspección, nace el Control Estadístico de la Calidad. Este nuevo paradigma utiliza métodos matemáticos y estadísticos para observar las constantes vitales del proceso en tiempo real, previniendo los defectos antes de que el producto sea terminado.',
    renderComponent: DiagramQuark8,
  },
  {
    id: 'q9',
    title: 'Definición formal',
    diagramTitle: 'Definición del Control Estadístico',
    description: 'El control estadístico de la calidad (SPC) es la aplicación de técnicas estadísticas para medir y analizar la variación en los procesos. Su objetivo fundamental es mantener el proceso dentro de límites de control predefinidos, garantizando una producción predecible y estable.',
    renderComponent: DiagramQuark9,
  },
  {
    id: 'q10',
    title: 'Enfoque Proceso',
    diagramTitle: 'El Proceso como Eje Central',
    description: 'El cambio de paradigma definitivo: en lugar de vigilar el producto (inspección), vigilamos el proceso (control). Monitoreando continuamente las variables clave, identificamos desviaciones microscópicas y ajustamos el sistema proactivamente.',
    renderComponent: DiagramQuark10,
  }
];


// --- COMPONENTES PRINCIPALES DE LA INTERFAZ ---

const App: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const activeContent = lessonData[activeTabIndex];
  const ActiveDiagram = activeContent.renderComponent;

  return (
    <div className="grid grid-rows-[auto_1fr]  bg-gray-100 font-sans text-gray-800">
      
      {/* HEADER Y NAVEGACIÓN (CSS Grid puro) */}
      <header className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-end gap-6 p-6 bg-white shadow-sm border-b border-gray-200  top-0 z-50">
        <div className="grid gap-1">
          <h1 className="text-2xl font-black text-indigo-900 tracking-tight">Evolución de la Calidad</h1>
        </div>
        
        {/* Pestañas de Navegación */}
        <nav className="grid grid-flow-col auto-cols-max gap-2 justify-self-start md:justify-self-end  pb-1 w-full md:w-auto">
          {lessonData.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabIndex(index)}
              className={`
                grid place-items-center px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-all border-b-4 
                ${activeTabIndex === index 
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-600' 
                  : 'bg-white text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-800'
                }
              `}
              aria-selected={activeTabIndex === index}
              role="tab"
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </header>

      {/* ÁREA DE CONTENIDO (LessonLayout) */}
      <main className="grid grid-cols-1 place-items-start p-6 md:p-8 w-full max-w-6xl mx-auto">
        
        {/* COMPONENTE CARD */}
        <article className="grid grid-cols-1 w-full bg-white rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Card Header */}
          <header className="grid grid-cols-1 gap-3 p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
              
                <h2 className="text-3xl font-bold text-gray-900">{activeContent.diagramTitle}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg max-w-4xl">
              {activeContent.description}
            </p>
          </header>

          {/* Card Body (Diagram Render Area) */}
          <section className="grid place-items-center w-full  p-8 bg-gray-50">
             {/* Wrapper para mantener proporciones en diagramas */}
             <div className="grid place-items-center w-full h-full bg-white rounded-xl border border-gray-200 shadow-inner p-6 ">
                <ActiveDiagram />
             </div>
          </section>

        </article>

      </main>
    </div>
  );
};

export default App;