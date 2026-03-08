import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,  } from 'recharts';
import { Search, Wrench, CheckCircle, AlertTriangle, Settings, UserX, PackageX, Target, Cpu,  } from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---

interface TabData {
  id: string;
  tabLabel: string;
  diagramTitle: string;
  conceptExplanation: string;
  visualSuggestion: string;
  renderComponent: React.ReactNode;
}

interface LessonLayoutProps {
  title: string;
  tabs: TabData[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// --- DATOS DEL CONTENIDO (QUARKS 11 - 16) ---

const processData = [
  { id: 1, value: 50 },
  { id: 2, value: 52 },
  { id: 3, value: 49 },
  { id: 4, value: 51 },
  { id: 5, value: 95 }, // Variación Especial (Punto Anormal)
  { id: 6, value: 48 },
  { id: 7, value: 50 },
];

// Componentes Visuales para cada Quark

const DiagramQ11 = () => (
  <div className="grid grid-rows-[auto_1fr] gap-8 place-items-center w-full h-full p-8">
    <div className="grid place-items-center bg-red-100 border-2 border-red-500 text-red-700 font-bold p-6 rounded-full w-32 h-32 text-center shadow-lg relative z-10">
      Punto Anormal
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl relative">
      <div className="grid gap-2 place-items-center text-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
        <Search className="text-blue-500 w-8 h-8" />
        <span className="font-semibold text-slate-700">Análisis 1</span>
        <span className="text-xs text-slate-500">Origen de maquinaria?</span>
      </div>
      <div className="grid gap-2 place-items-center text-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
        <Search className="text-blue-500 w-8 h-8" />
        <span className="font-semibold text-slate-700">Análisis 2</span>
        <span className="text-xs text-slate-500">Error operativo?</span>
      </div>
      <div className="grid gap-2 place-items-center text-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
        <Search className="text-blue-500 w-8 h-8" />
        <span className="font-semibold text-slate-700">Análisis 3</span>
        <span className="text-xs text-slate-500">Falla de material?</span>
      </div>
    </div>
  </div>
);

const DiagramQ12 = () => (
  <div className="grid grid-cols-1 md:grid-flow-col auto-cols-fr gap-4 w-full h-full p-8 items-center">
    <div className="grid place-items-center gap-4 text-center">
      <div className="grid place-items-center bg-red-100 text-red-600 p-4 rounded-full w-16 h-16 shadow-md">
        <AlertTriangle size={32} />
      </div>
      <span className="font-bold text-slate-700">1. Desviación</span>
    </div>
    <div className="hidden md:grid place-items-center text-slate-300">➔</div>
    <div className="grid place-items-center gap-4 text-center">
      <div className="grid place-items-center bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 shadow-md">
        <Search size={32} />
      </div>
      <span className="font-bold text-slate-700">2. Identificación</span>
    </div>
    <div className="hidden md:grid place-items-center text-slate-300">➔</div>
    <div className="grid place-items-center gap-4 text-center">
      <div className="grid place-items-center bg-orange-100 text-orange-600 p-4 rounded-full w-16 h-16 shadow-md">
        <Wrench size={32} />
      </div>
      <span className="font-bold text-slate-700">3. Corrección</span>
    </div>
    <div className="hidden md:grid place-items-center text-slate-300">➔</div>
    <div className="grid place-items-center gap-4 text-center">
      <div className="grid place-items-center bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 shadow-md">
        <CheckCircle size={32} />
      </div>
      <span className="font-bold text-slate-700">4. Estable</span>
    </div>
  </div>
);

const DiagramQ13 = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center justify-items-center w-full h-full p-8">
    <div className="grid gap-6 w-full max-w-xs">
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
        <Settings className="text-purple-600" />
        <span className="font-semibold text-slate-700">Falla en maquinaria</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
        <UserX className="text-purple-600" />
        <span className="font-semibold text-slate-700">Error humano</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
        <PackageX className="text-purple-600" />
        <span className="font-semibold text-slate-700">Cambio de material</span>
      </div>
    </div>
    <div className="hidden md:grid place-items-center text-slate-400 font-bold text-2xl">
      ➔
    </div>
    <div className="grid place-items-center bg-red-600 text-white font-bold p-6 rounded-full w-32 h-32 text-center shadow-lg border-4 border-red-200">
      Punto<br />Anormal
    </div>
  </div>
);

const DiagramQ14 = () => (
  <div className="grid w-full h-[400px] p-4 bg-white rounded-lg">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={processData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="id" label={{ value: 'Tiempo', position: 'insideBottomRight', offset: -10 }} />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Límite Superior (UCL)', fill: '#ef4444', fontSize: 12 }} />
        <ReferenceLine y={50} stroke="#22c55e" label={{ position: 'top', value: 'Media', fill: '#22c55e', fontSize: 12 }} />
        <ReferenceLine y={20} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'bottom', value: 'Límite Inferior (LCL)', fill: '#ef4444', fontSize: 12 }} />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 6, fill: '#3b82f6' }} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const DiagramQ15 = () => (
  <div className="grid w-full p-4 overflow-x-auto">
    <table className="min-w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
      <thead className="bg-slate-100 border-b-2 border-slate-200">
        <tr className="grid grid-cols-2">
          <th className="p-4 font-bold text-slate-800 text-lg">Variación Común</th>
          <th className="p-4 font-bold text-slate-800 text-lg border-l border-slate-200">Variación Especial</th>
        </tr>
      </thead>
      <tbody className="grid auto-rows-auto">
        <tr className="grid grid-cols-2 border-b border-slate-100 hover:bg-slate-50">
          <td className="p-4 text-slate-600"><strong>Origen:</strong> Funcionamiento normal del proceso</td>
          <td className="p-4 text-slate-600 border-l border-slate-200"><strong>Origen:</strong> Eventos específicos externos o internos</td>
        </tr>
        <tr className="grid grid-cols-2 border-b border-slate-100 hover:bg-slate-50">
          <td className="p-4 text-slate-600"><strong>Frecuencia:</strong> Constante y predecible</td>
          <td className="p-4 text-slate-600 border-l border-slate-200"><strong>Frecuencia:</strong> Irregular e impredecible</td>
        </tr>
        <tr className="grid grid-cols-2 border-b border-slate-100 hover:bg-slate-50">
          <td className="p-4 text-slate-600"><strong>Causa:</strong> Difícil de identificar aisldamente</td>
          <td className="p-4 text-slate-600 border-l border-slate-200"><strong>Causa:</strong> Identificable y rastreable</td>
        </tr>
        <tr className="grid grid-cols-2 border-b border-slate-100 hover:bg-slate-50">
          <td className="p-4 text-slate-600"><strong>Control:</strong> Mejorar el sistema productivo global</td>
          <td className="p-4 text-slate-600 border-l border-slate-200"><strong>Control:</strong> Investigar, corregir y aislar la causa</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const DiagramQ16 = () => (
  <div className="grid grid-rows-[auto_1fr] gap-8 place-items-center w-full h-full p-4 md:p-8">
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-xl shadow-lg z-10">
      <Target size={28} className="text-blue-400" />
      <span className="font-bold text-xl">Control Estadístico de Procesos</span>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full max-w-4xl relative">
      <div className="grid grid-rows-[auto_auto] gap-4 place-items-center text-center">
        <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg w-full shadow-sm">
          <h3 className="font-bold text-red-800 text-lg mb-2">Variación Especial</h3>
          <p className="text-sm text-red-600">Eventos específicos que alteran el sistema</p>
        </div>
        <div className="grid place-items-center bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-md">
          Decisión: Investigar Causas
        </div>
      </div>
      
      <div className="grid grid-rows-[auto_auto] gap-4 place-items-center text-center">
        <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg w-full shadow-sm">
          <h3 className="font-bold text-green-800 text-lg mb-2">Variación Común</h3>
          <p className="text-sm text-green-600">Ruido normal e inherente del sistema</p>
        </div>
        <div className="grid place-items-center bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-md">
          Decisión: Mejorar el Sistema
        </div>
      </div>
    </div>
  </div>
);

const lessonData: TabData[] = [
  {
    id: "q11",
    tabLabel: "Identificación",
    diagramTitle: "Identificación de causas en la variación especial",
    conceptExplanation: "Las variaciones especiales suelen tener una causa identificable. Esto significa que, mediante análisis del proceso, es posible encontrar el origen del problema que provocó el cambio en el comportamiento del sistema.",
    visualSuggestion: "Un esquema conceptual donde un punto anormal en el proceso está conectado mediante flechas a posibles causas identificables dentro del sistema productivo.",
    renderComponent: <DiagramQ11 />
  },
  {
    id: "q12",
    tabLabel: "Corrección",
    diagramTitle: "Corrección de la variación especial",
    conceptExplanation: "Una vez identificada la causa de una variación especial, es posible aplicar acciones correctivas para eliminar el problema y restablecer el comportamiento normal del proceso.",
    visualSuggestion: "Una secuencia conceptual donde un proceso presenta una desviación, se identifica la causa del problema y posteriormente el proceso vuelve a un comportamiento estable.",
    renderComponent: <DiagramQ12 />
  },
  {
    id: "q13",
    tabLabel: "Causas Comunes",
    diagramTitle: "Ejemplos de causas de variación especial",
    conceptExplanation: "Entre las causas más comunes de variación especial se encuentran fallas en la maquinaria, errores humanos en la operación, cambios bruscos en materiales o problemas de calibración en equipos y herramientas.",
    visualSuggestion: "Un diagrama conceptual donde diferentes causas específicas (máquina defectuosa, error operativo, cambio de material) convergen hacia un punto anormal en el comportamiento del proceso.",
    renderComponent: <DiagramQ13 />
  },
  {
    id: "q14",
    tabLabel: "Impacto",
    diagramTitle: "Impacto de la variación especial en la estabilidad",
    conceptExplanation: "Cuando aparece una variación especial, el proceso deja de comportarse de manera estable. Esto significa que los resultados dejan de ser predecibles y es necesario investigar la causa para restablecer el control del sistema.",
    visualSuggestion: "Un gráfico conceptual donde un proceso inicialmente estable presenta una desviación marcada fuera de los límites de control.",
    renderComponent: <DiagramQ14 />
  },
  {
    id: "q15",
    tabLabel: "Comparación",
    diagramTitle: "Comparación entre variación común y variación especial",
    conceptExplanation: "La variación común y la variación especial se diferencian principalmente en su origen y comportamiento. La variación común forma parte del funcionamiento normal del proceso, mientras que la variación especial surge por eventos específicos que alteran el sistema.",
    visualSuggestion: "Una tabla comparativa con dos columnas: “Variación común” y “Variación especial”, donde se contrastan aspectos como origen, frecuencia de aparición, identificabilidad de la causa y forma de control.",
    renderComponent: <DiagramQ15 />
  },
  {
    id: "q16",
    tabLabel: "Importancia",
    diagramTitle: "Importancia de distinguir los tipos de variación",
    conceptExplanation: "Distinguir entre variación común y variación especial es fundamental para aplicar correctamente el control estadístico de procesos. Esta distinción permite decidir si es necesario investigar una causa específica o si las acciones de mejora deben centrarse en optimizar el sistema completo.",
    visualSuggestion: "Un mapa conceptual final donde el término “Control estadístico de procesos” se conecta con dos decisiones posibles: investigar causas especiales o mejorar el sistema para reducir la variación común.",
    renderComponent: <DiagramQ16 />
  }
];

// --- COMPONENTES BASE (LAYOUT & UI) ---

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`grid bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTabId, onTabChange }) => {
  const activeTabData = tabs.find(tab => tab.id === activeTabId) || tabs[0];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Header (con Title y Nav) */}
      <header className="grid grid-rows-[auto_auto] bg-slate-900 text-white shadow-md">
        <div className="grid p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-tight grid grid-cols-[auto_1fr] items-center gap-3">
            <Cpu className="text-blue-400" size={32} />
            {title}
          </h1>
        </div>
        
        {/* Navigation Tabs (CSS Grid Only) */}
        <nav className="grid grid-flow-col auto-cols-max overflow-x-auto px-6 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`grid place-items-center px-6 py-4 font-medium text-sm transition-colors border-b-4 
                ${activeTabId === tab.id 
                  ? 'border-blue-500 text-blue-400 bg-slate-800/50' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
            >
              {tab.tabLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid p-4 md:p-8 content-start w-full max-w-6xl justify-self-center">
        <Card className="grid gap-6 p-6 md:p-8">
          
          {/* 2. Diagram Title & 3. Diagram Description (Text Section) */}
          <div className="grid gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 border-b border-slate-100 pb-4">
              {activeTabData.diagramTitle}
            </h2>
            
            <div className="grid gap-4 items-start mt-2">
              <div className="grid gap-2">
                <p className="text-lg text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-lg border border-slate-100">
                  {activeTabData.conceptExplanation}
                </p>
              </div>
              
           
            </div>
          </div>

          {/* 4. Diagram Render */}
          <div className="grid mt-4">
            <div className="grid place-items-center min-h-[400px] w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden relative">
            
              <div className="grid w-full h-full p-6 place-items-center z-10">
                {activeTabData.renderComponent}
              </div>
            </div>
          </div>
          
        </Card>
      </main>

    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(lessonData[0].id);

  return (
    <LessonLayout 
      title="Control Estadístico: Variación Especial"
      tabs={lessonData}
      activeTabId={activeTab}
      onTabChange={setActiveTab}
    />
  );
}