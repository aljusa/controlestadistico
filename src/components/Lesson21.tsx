import React, { useState } from 'react';
import {
  
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  
  ComposedChart
} from 'recharts';

// --- Definición de Tipos (TypeScript) ---

interface LessonContent {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  type: 'chart-lic' | 'chart-in-control' | 'chart-out-control' | 'chart-trend' | 'diagram-map' | 'diagram-flow';
}

// --- Datos de la Lección ---

const lessonData: LessonContent[] = [
  {
    id: 'q11',
    tabLabel: 'Límite Inferior',
    title: 'Límite inferior de control (LIC)',
    description: 'El límite inferior de control (LIC) indica el límite mínimo esperado para la variación normal del proceso. Valores que se encuentran por debajo de este límite pueden señalar la existencia de una causa especial que afecta el proceso.',
    type: 'chart-lic'
  },
  {
    id: 'q12',
    tabLabel: 'Bajo Control',
    title: 'Interpretación de un proceso bajo control',
    description: 'Un proceso se considera bajo control estadístico cuando los puntos del gráfico se mantienen dentro de los límites de control y no presentan patrones anormales. En estas condiciones, la variación observada corresponde únicamente a causas comunes del sistema.',
    type: 'chart-in-control'
  },
  {
    id: 'q13',
    tabLabel: 'Fuera de Control',
    title: 'Interpretación de un proceso fuera de control',
    description: 'Un proceso puede considerarse fuera de control cuando aparecen puntos fuera de los límites de control o cuando se observan patrones inusuales en los datos. Estas señales sugieren la presencia de causas especiales que deben investigarse.',
    type: 'chart-out-control'
  },
  {
    id: 'q14',
    tabLabel: 'Tendencias',
    title: 'Detección de tendencias y patrones anormales',
    description: 'Además de los puntos fuera de los límites, los gráficos de control permiten detectar patrones anormales como tendencias ascendentes o descendentes prolongadas. Estos patrones pueden indicar cambios graduales en el comportamiento del proceso.',
    type: 'chart-trend'
  },
  {
    id: 'q15',
    tabLabel: 'Gestión de Calidad',
    title: 'Importancia de los gráficos en la gestión',
    description: 'Los gráficos de control son herramientas fundamentales para la gestión moderna de la calidad. Permiten monitorear continuamente el proceso, detectar problemas de manera temprana y tomar decisiones basadas en datos objetivos.',
    type: 'diagram-map'
  },
  {
    id: 'q16',
    tabLabel: 'Prevención',
    title: 'Rol en la prevención de defectos',
    description: 'Al permitir identificar desviaciones en el comportamiento del proceso, los gráficos de control contribuyen a prevenir defectos antes de que aparezcan en los productos. Esto favorece una gestión preventiva de la calidad orientada a mantener procesos estables y eficientes.',
    type: 'diagram-flow'
  }
];

// --- Mock Data para Gráficos ---

const generateChartData = (type: string) => {
  const baseData = [
    { name: 'M1', value: 50 }, { name: 'M2', value: 55 }, { name: 'M3', value: 48 },
    { name: 'M4', value: 52 }, { name: 'M5', value: 49 }, { name: 'M6', value: 60 },
    { name: 'M7', value: 45 }, { name: 'M8', value: 51 }, { name: 'M9', value: 54 },
    { name: 'M10', value: 47 }
  ];

  switch (type) {
    case 'chart-lic':
      return baseData;
    case 'chart-in-control':
      return baseData.map(d => ({ ...d, value: 40 + Math.random() * 20 })); // Fluctuación normal 40-60
    case 'chart-out-control':
      const outData = [...baseData];
      outData[6].value = 85; // Pico fuera de control superior
      outData[8].value = 15; // Caída fuera de control inferior
      return outData;
    case 'chart-trend':
      return [
        { name: 'M1', value: 35 }, { name: 'M2', value: 38 }, { name: 'M3', value: 42 },
        { name: 'M4', value: 48 }, { name: 'M5', value: 55 }, { name: 'M6', value: 62 },
        { name: 'M7', value: 68 }, { name: 'M8', value: 75 }, { name: 'M9', value: 82 },
        { name: 'M10', value: 88 } // Tendencia ascendente clara
      ];
    default:
      return baseData;
  }
};

// --- Componentes Base ---

// Card: Contenedor estilizado usando CSS Grid
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden grid ${className}`}>
    {children}
  </div>
);

// --- Componente de Renderizado de Diagramas ---

const DiagramRender: React.FC<{ type: string }> = ({ type }) => {
  const data = generateChartData(type);
  const UCL = 80;
  const LCL = 20;
  const Mean = 50;

  // Renderizado Condicional de Gráficos Recharts
  if (type.startsWith('chart')) {
    return (
      <div className="w-full h-80 grid">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '8px', border: 'none' }}
              itemStyle={{ color: '#38bdf8' }}
            />
            
            {/* Líneas de Control */}
            <ReferenceLine y={UCL} stroke="#ef4444" strokeDasharray="5 5" label={{ position: 'top', value: 'LSC (Superior)', fill: '#ef4444', fontSize: 12 }} />
            <ReferenceLine y={Mean} stroke="#10b981" label={{ position: 'top', value: 'Media', fill: '#10b981', fontSize: 12 }} />
            
            {/* Destacar el LIC específicamente en el tipo chart-lic */}
            <ReferenceLine 
              y={LCL} 
              stroke={type === 'chart-lic' ? "#3b82f6" : "#ef4444"} 
              strokeWidth={type === 'chart-lic' ? 3 : 1}
              strokeDasharray={type === 'chart-lic' ? "" : "5 5"}
              label={{ position: 'bottom', value: 'LIC (Inferior)', fill: type === 'chart-lic' ? "#3b82f6" : "#ef4444", fontSize: 12 }} 
            />

            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#334155" 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: '#ffffff', stroke: '#334155' }}
              activeDot={{ r: 6, fill: '#38bdf8', stroke: '#0ea5e9' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Renderizado de Mapa Conceptual (Q15) usando CSS Grid estricto
  if (type === 'diagram-map') {
    return (
      <div className="grid grid-rows-[auto_auto_auto] gap-6 p-6 place-items-center h-full bg-slate-50 rounded-lg">
        <div className="bg-indigo-600 text-white font-bold py-3 px-6 rounded shadow-md text-center w-full max-w-xs">
          Gráficos de Control
        </div>
        <div className="grid grid-cols-3 gap-2 w-full max-w-md place-items-center">
          <div className="h-8 w-px bg-indigo-300"></div>
          <div className="h-8 w-px bg-indigo-300"></div>
          <div className="h-8 w-px bg-indigo-300"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-sm">
          <div className="bg-white border-2 border-indigo-100 p-4 rounded-lg shadow-sm text-center grid place-content-center h-24 text-slate-700">
            Monitoreo continuo del proceso
          </div>
          <div className="bg-white border-2 border-indigo-100 p-4 rounded-lg shadow-sm text-center grid place-content-center h-24 text-slate-700">
            Detección temprana de problemas
          </div>
          <div className="bg-white border-2 border-indigo-100 p-4 rounded-lg shadow-sm text-center grid place-content-center h-24 text-slate-700">
            Decisiones basadas en datos objetivos
          </div>
        </div>
      </div>
    );
  }

  // Renderizado de Diagrama de Flujo (Q16) usando CSS Grid estricto
  if (type === 'diagram-flow') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 p-6 place-items-center h-full bg-slate-50 rounded-lg">
        <div className="bg-rose-100 border-2 border-rose-300 text-rose-800 p-4 rounded-lg shadow-sm text-center w-full h-32 grid place-content-center">
          <span className="font-bold mb-2">Paso 1</span>
          Detección de desviación temprana
        </div>
        <div className="text-slate-400 rotate-90 md:rotate-0 font-bold text-2xl">➔</div>
        <div className="bg-amber-100 border-2 border-amber-300 text-amber-800 p-4 rounded-lg shadow-sm text-center w-full h-32 grid place-content-center">
          <span className="font-bold mb-2">Paso 2</span>
          Acción correctiva inmediata
        </div>
        <div className="text-slate-400 rotate-90 md:rotate-0 font-bold text-2xl">➔</div>
        <div className="bg-emerald-100 border-2 border-emerald-300 text-emerald-800 p-4 rounded-lg shadow-sm text-center w-full h-32 grid place-content-center">
          <span className="font-bold mb-2">Paso 3</span>
          Prevención de productos defectuosos
        </div>
      </div>
    );
  }

  return null;
};

// --- Componente de Diseño Principal (Layout) ---

const LessonLayout: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const currentContent = lessonData[activeTabIndex];

  return (
    // Grid Principal de la Aplicación (Manejando Header, Nav y Contenido)
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen bg-slate-100 text-slate-800 font-sans">
      
      {/* Header */}
      <header className="grid bg-slate-900 text-white p-6 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Calidad: Gráficos de Control</h1>
        <p className="text-slate-400 text-sm mt-1">Análisis estadístico de procesos y toma de decisiones</p>
      </header>

      {/* Navegación por Pestañas (CSS Grid estricto, sin flexbox) */}
      <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-white border-b border-slate-200">
        {lessonData.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => setActiveTabIndex(index)}
            className={`
              grid place-items-center text-center p-4 border-b-4 transition-all duration-200 text-sm font-medium
              ${activeTabIndex === index 
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' 
                : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
            `}
            role="tab"
            aria-selected={activeTabIndex === index}
          >
            {lesson.tabLabel}
          </button>
        ))}
      </nav>

      {/* Área Principal de Contenido */}
      <main className="grid p-6 gap-6 place-items-start">
        <Card className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0">
          
          {/* Panel Izquierdo: Textos (Diagram Title & Description) */}
          <div className="grid grid-rows-[auto_1fr] gap-4 p-8 bg-white border-b lg:border-b-0 lg:border-r border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              {currentContent.title}
            </h2>
            <div className="grid grid-rows-[auto_1fr] gap-4 mt-4">
              
              <p className="text-slate-600 leading-relaxed text-base place-self-start">
                {currentContent.description}
              </p>
            </div>
          </div>

          {/* Panel Derecho: Renderizado Visual (Diagram Render) */}
          <div className="grid p-8 bg-slate-50 items-center justify-items-center">
            <div className="w-full grid gap-4">
             
              <div className="grid bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
                <DiagramRender type={currentContent.type} />
              </div>
            </div>
          </div>

        </Card>
      </main>
    </div>
  );
};

export default function App() {
  return <LessonLayout />;
}