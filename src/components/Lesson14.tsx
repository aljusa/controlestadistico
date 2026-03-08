import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ScatterChart,
  Scatter,
} from 'recharts';
import { Thermometer, Settings, Box, User, ArrowRight, Activity } from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface TabInfo {
  id: string;
  title: string;
  shortLabel: string;
  description: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  tabs: TabInfo[];
  activeTab: string;
  onTabChange: (id: string) => void;
  activeContent: TabInfo;
  diagramRender: React.ReactNode;
}

// ==========================================
// MOCK DATA FOR CHARTS
// ==========================================

// Q7: Reducción de variación (Antes vs Después)
const q7Data = Array.from({ length: 20 }).map((_, i) => ({
  index: i + 1,
  procesoInicial: 50 + (Math.random() * 20 - 10), // Rango 40-60
  procesoMejorado: 50 + (Math.random() * 4 - 2),   // Rango 48-52
}));

// Q9: Variación Especial (Outlier claro)
const q9Data = Array.from({ length: 15 }).map((_, i) => {
  let val = 50 + (Math.random() * 6 - 3); // Normal 47-53
  if (i === 11) val = 85; // Outlier - Causa Especial
  return { time: i + 1, value: val };
});

// Q10: Aparición Irregular
const q10Data = Array.from({ length: 25 }).map((_, i) => {
  let val = 20 + (Math.random() * 4 - 2); // Estable 18-22
  if (i >= 16 && i <= 18) val += 15 + Math.random() * 5; // Evento irregular
  return { time: i + 1, value: val };
});

// ==========================================
// UI COMPONENTS
// ==========================================

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

// ==========================================
// DIAGRAM COMPONENTS
// ==========================================

const DiagramQ6 = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 items-center place-items-center w-full min-h-[300px] bg-slate-50 rounded-lg">
    {/* Fuentes de variación */}
    <div className="grid grid-rows-4 gap-4 w-full">
      {[
        { icon: <Box className="text-blue-500" />, label: "Materia Prima" },
        { icon: <Thermometer className="text-blue-500" />, label: "Ambiente" },
        { icon: <Settings className="text-blue-500" />, label: "Maquinaria" },
        { icon: <User className="text-blue-500" />, label: "Operador" }
      ].map((item, i) => (
        <div key={i} className="grid grid-cols-[auto_1fr] gap-3 bg-white p-3 rounded shadow-sm border border-slate-200 items-center">
          {item.icon}
          <span className="text-sm font-semibold text-slate-700">{item.label}</span>
        </div>
      ))}
    </div>

    {/* Flechas (CSS Grid place-items-center) */}
    <div className="grid grid-rows-4 gap-4 w-full place-items-center text-slate-400">
      <ArrowRight className="w-8 h-8" />
      <ArrowRight className="w-8 h-8" />
      <ArrowRight className="w-8 h-8" />
      <ArrowRight className="w-8 h-8" />
    </div>

    {/* Proceso Productivo */}
    <div className="grid place-items-center bg-indigo-600 text-white p-6 rounded-full w-48 h-48 shadow-lg text-center border-4 border-indigo-200">
      <div className="grid gap-2 place-items-center">
        <Activity className="w-10 h-10" />
        <span className="font-bold">Proceso Productivo</span>
        <span className="text-xs text-indigo-100">(Variaciones Pequeñas)</span>
      </div>
    </div>
  </div>
);

const DiagramQ7 = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-[350px]">
    <div className="grid grid-rows-[auto_1fr] gap-2">
      <h4 className="text-center font-bold text-slate-700">Proceso Inicial (Alta Dispersión)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" type="number" name="Muestra" domain={[0, 21]} />
          <YAxis dataKey="procesoInicial" type="number" name="Valor" domain={[30, 70]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <ReferenceLine y={50} stroke="blue" strokeDasharray="3 3" />
          <Scatter name="Inicial" data={q7Data} fill="#ef4444" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
    
    <div className="grid grid-rows-[auto_1fr] gap-2">
      <h4 className="text-center font-bold text-slate-700">Proceso Mejorado (Baja Dispersión)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" type="number" name="Muestra" domain={[0, 21]} />
          <YAxis dataKey="procesoMejorado" type="number" name="Valor" domain={[30, 70]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <ReferenceLine y={50} stroke="green" strokeDasharray="3 3" />
          <Scatter name="Mejorado" data={q7Data} fill="#22c55e" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DiagramQ8 = () => (
  <div className="grid place-items-center w-full min-h-[300px] bg-slate-50 p-6 rounded-lg">
    <div className="grid grid-rows-[auto_auto] gap-12 w-full max-w-2xl">
      {/* Nodo Central */}
      <div className="grid place-items-center">
        <div className="bg-blue-600 text-white font-bold py-3 px-8 rounded shadow-md text-lg">
          Causas Comunes
        </div>
      </div>
      
      {/* Ramificaciones (Grid de 3 columnas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Thermometer className="w-10 h-10 text-orange-500 mx-auto" />, title: "Ambiente", desc: "Cambios leves en temperatura o humedad" },
          { icon: <Settings className="w-10 h-10 text-gray-600 mx-auto" />, title: "Maquinaria", desc: "Microajustes y desgaste normal" },
          { icon: <Box className="w-10 h-10 text-amber-700 mx-auto" />, title: "Materiales", desc: "Variaciones normales en materia prima" }
        ].map((item, i) => (
          <div key={i} className="grid grid-rows-[auto_auto_1fr] gap-3 text-center bg-white p-4 rounded border-t-4 border-blue-400 shadow-sm relative">
            {/* Línea conectora simulada con absolute */}
            <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-blue-300 transform -translate-x-1/2"></div>
            <div>{item.icon}</div>
            <h5 className="font-bold text-slate-800">{item.title}</h5>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DiagramQ9 = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 w-full min-h-[300px]">
    <div className="grid place-items-center p-6 bg-red-50 border-l-4 border-red-500 rounded text-slate-800 self-start">
      <div className="grid gap-3">
        <h4 className="font-bold text-red-700 text-lg">Variación Especial</h4>
        <p className="text-sm leading-relaxed">
          También conocida como <strong>variación asignable</strong>. Ocurre cuando una causa específica y externa altera el comportamiento normal del proceso, generando un cambio significativo.
        </p>
      </div>
    </div>
    
    <div className="grid h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={q9Data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" />
          <YAxis domain={[30, 100]} />
          <Tooltip />
          <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'top', value: 'Límite Superior Normal', fill: '#f59e0b', fontSize: 12 }} />
          <ReferenceLine y={40} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'bottom', value: 'Límite Inferior Normal', fill: '#f59e0b', fontSize: 12 }} />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          {/* Resaltando el Outlier */}
          <ReferenceLine x={12} stroke="red" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Causa Específica', fill: 'red', fontSize: 12 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DiagramQ10 = () => (
  <div className="grid grid-rows-[auto_1fr] gap-4 w-full h-[350px]">
    <div className="grid justify-items-end text-sm text-slate-500 px-4">
      <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full font-medium">Evento Irregular Detectado</span>
    </div>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={q10Data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" name="Tiempo" label={{ value: 'Línea de Tiempo', position: 'insideBottom', offset: -10 }} />
        <YAxis domain={[0, 50]} label={{ value: 'Variación', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="stepAfter" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={false} />
        {/* Zona del evento irregular */}
        <ReferenceLine x={16} stroke="#ef4444" strokeDasharray="3 3" />
        <ReferenceLine x={19} stroke="#ef4444" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// ==========================================
// LAYOUT & MAIN ARCHITECTURE
// ==========================================

const LessonLayout: React.FC<LessonLayoutProps> = ({ tabs, activeTab, onTabChange, activeContent, diagramRender }) => {
  return (
    // CONTENEDOR PRINCIPAL - 100% CSS GRID
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 text-slate-800 font-sans">
      
      {/* HEADER Y NAVEGACIÓN */}
      <header className="grid grid-rows-[auto_auto] gap-4 bg-white shadow-sm border-b border-slate-200 px-4 py-6 md:px-8">
        <div className="grid place-items-center text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Análisis de Variación en Procesos</h1>
         
        </div>
        
        {/* SISTEMA DE PESTAÑAS - GRID BASED */}
        <nav className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4 max-w-5xl mx-auto w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`grid place-items-center py-3 px-4 rounded-t-lg font-medium text-sm transition-colors border-b-4 ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-blue-600'
                  : 'bg-white text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              {tab.shortLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* ÁREA DE CONTENIDO */}
      <main className="grid place-items-start py-8 px-4 md:px-8 w-full max-w-6xl mx-auto">
        <Card className="grid grid-rows-[auto_auto_1fr] w-full p-6 md:p-8 gap-8">
          
          {/* HEADER DEL PANEL */}
          <div className="grid gap-2 border-b border-slate-100 pb-4">
          
            <h2 className="text-2xl font-bold text-slate-800">{activeContent.title}</h2>
          </div>

          {/* DESCRIPCIÓN CONCEPTUAL */}
          <div className="grid bg-slate-50 p-5 rounded border border-slate-200 text-slate-700 leading-relaxed text-lg">
            {activeContent.description}
          </div>

          {/* RENDERIZADO DEL DIAGRAMA */}
          <div className="grid gap-4 w-full">
         
            <div className="grid place-items-center w-full bg-white border border-slate-100 rounded-lg p-2 md:p-6 shadow-inner">
              {diagramRender}
            </div>
          </div>

        </Card>
      </main>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>('Quark 6');

  const contentData: TabInfo[] = [
    {
      id: 'Quark 6',
      shortLabel: 'Variación Común',
      title: 'Múltiples causas pequeñas',
      description: 'La variación común no proviene de una sola causa identificable, sino de la combinación de muchos factores pequeños que actúan simultáneamente dentro del sistema productivo. Ninguno de estos factores, por sí solo, produce un cambio significativo en el proceso.',
    },
    {
      id: 'Quark 7',
      shortLabel: 'Reducción de Variación',
      title: 'Mejora del sistema productivo',
      description: 'La variación común no puede eliminarse completamente sin modificar el sistema de producción. Para reducir este tipo de variabilidad es necesario mejorar el diseño del proceso, optimizar los equipos o ajustar las condiciones de operación del sistema.',
    },
    {
      id: 'Quark 8',
      shortLabel: 'Causas Comunes',
      title: 'Ejemplos de causas comunes',
      description: 'Las causas comunes de variación incluyen pequeñas fluctuaciones en factores que influyen en el proceso, como cambios leves en la temperatura ambiente, variaciones normales en la materia prima, microajustes en maquinaria o cambios menores en las condiciones de operación.',
    },
    {
      id: 'Quark 9',
      shortLabel: 'Variación Especial',
      title: 'Definición de variación especial',
      description: 'La variación especial, también conocida como variación asignable, ocurre cuando una causa específica altera el comportamiento normal del proceso. Este tipo de variación genera cambios inesperados o significativos en los resultados del sistema productivo.',
    },
    {
      id: 'Quark 10',
      shortLabel: 'Aparición Irregular',
      title: 'Aparición irregular de causas',
      description: 'A diferencia de la variación común, la variación especial no aparece de forma constante. Generalmente surge de manera inesperada en momentos específicos cuando ocurre un evento que altera el funcionamiento normal del proceso.',
    }
  ];

  const activeContent = contentData.find(tab => tab.id === activeTabId) || contentData[0];

  // Router interno para renderizar el diagrama correcto
  const renderDiagram = () => {
    switch (activeTabId) {
      case 'Quark 6': return <DiagramQ6 />;
      case 'Quark 7': return <DiagramQ7 />;
      case 'Quark 8': return <DiagramQ8 />;
      case 'Quark 9': return <DiagramQ9 />;
      case 'Quark 10': return <DiagramQ10 />;
      default: return <div>Seleccione un tema.</div>;
    }
  };

  return (
    <LessonLayout
      tabs={contentData}
      activeTab={activeTabId}
      onTabChange={setActiveTabId}
      activeContent={activeContent}
      diagramRender={renderDiagram()}
    />
  );
}