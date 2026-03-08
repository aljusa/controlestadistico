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
  ReferenceArea
} from 'recharts';
import {
  Activity,
  BarChart2,
  Clock,
  Settings,
  AlertTriangle,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';

// --- Types & Interfaces ---
interface QuarkData {
  id: string;
  title: string;
  concept: string;
  diagramTitle: string;
  diagramDescription: string;
  icon: React.ElementType;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  content: QuarkData[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

interface DiagramRenderProps {
  activeTabId: string;
}

// --- Data Content (Quarks) ---
const QUARKS: QuarkData[] = [
  {
    id: 'q1',
    title: 'Introducción al monitoreo',
    concept: 'En el control estadístico de procesos, es necesario contar con herramientas que permitan observar cómo se comporta un proceso a lo largo del tiempo. El monitoreo continuo del proceso permite detectar cambios en su desempeño y evaluar si el sistema funciona de manera estable. Entre las herramientas más utilizadas para este propósito se encuentran los gráficos de control, que representan los datos del proceso de forma cronológica.',
    diagramTitle: 'Monitoreo de la Producción',
    diagramDescription: 'Visualización conceptual de un proceso productivo alimentando datos en tiempo real hacia un gráfico temporal.',
    icon: Activity
  },
  {
    id: 'q2',
    title: 'Definición',
    concept: 'Un gráfico de control es una herramienta estadística utilizada para monitorear el comportamiento de un proceso a lo largo del tiempo mediante la representación gráfica de datos obtenidos durante su operación. Su función principal es ayudar a identificar si las variaciones observadas corresponden al comportamiento normal del proceso o si indican la presencia de problemas.',
    diagramTitle: 'Estructura del Gráfico de Control',
    diagramDescription: 'Definición visual mostrando los límites de control (Superior e Inferior) y la línea central o promedio esperado del proceso.',
    icon: LayoutGrid
  },
  {
    id: 'q3',
    title: 'Análisis del Proceso',
    concept: 'Los gráficos de control permiten analizar el comportamiento de un proceso registrando los datos obtenidos durante su operación. Gracias a esta representación gráfica, es posible observar patrones de variación y detectar cambios en el sistema productivo.',
    diagramTitle: 'Detección de Cambios',
    diagramDescription: 'Observación de fluctuaciones en el proceso. Las áreas sombreadas resaltan zonas donde el comportamiento del proceso muestra desviaciones de la media.',
    icon: BarChart2
  },
  {
    id: 'q4',
    title: 'Registro Cronológico',
    concept: 'Una característica fundamental de los gráficos de control es que los datos se registran en orden cronológico. Esto permite observar cómo evoluciona el proceso con el tiempo y facilita la identificación de cambios o desviaciones en su comportamiento.',
    diagramTitle: 'Evolución Temporal',
    diagramDescription: 'El eje X representa la secuencia de tiempo cronológico estricta, siendo la clave para rastrear el momento exacto de cualquier eventualidad.',
    icon: Clock
  },
  {
    id: 'q5',
    title: 'Patrones de Variación',
    concept: 'Al observar los datos en un gráfico de control, es posible identificar patrones de variación en el proceso. Estos patrones ayudan a distinguir entre fluctuaciones normales del sistema y cambios que podrían indicar la presencia de problemas.',
    diagramTitle: 'Identificación de Tendencias y Anomalías',
    diagramDescription: 'Visualización de un patrón anormal (tendencia alcista) que eventualmente rompe el límite de control superior, indicando un proceso fuera de control.',
    icon: TrendingUp
  }
];

// --- Mock Data for Charts ---
const normalProcessData = [
  { time: '08:00', value: 50 },
  { time: '09:00', value: 52 },
  { time: '10:00', value: 48 },
  { time: '11:00', value: 55 },
  { time: '12:00', value: 47 },
  { time: '13:00', value: 51 },
  { time: '14:00', value: 49 },
  { time: '15:00', value: 53 },
  { time: '16:00', value: 50 },
];

const trendProcessData = [
  { time: '08:00', value: 48 },
  { time: '09:00', value: 49 },
  { time: '10:00', value: 51 },
  { time: '11:00', value: 53 },
  { time: '12:00', value: 58 },
  { time: '13:00', value: 62 },
  { time: '14:00', value: 68 },
  { time: '15:00', value: 75 }, // Fuera de control
  { time: '16:00', value: 78 },
];

// --- Components ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-sm border border-slate-200  ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ content, activeTabId, onTabChange, children }) => {
  return (
    // Se utiliza CSS Grid exclusivamente para el layout principal, como fue requerido.
    <div className="grid grid-rows-[auto_auto_1fr] h-screen w-full bg-slate-50 text-slate-800 font-sans">
      
      {/* Header */}
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 bg-white border-b border-slate-200">
        <div className="grid place-items-center w-10 h-10 bg-blue-600 text-white rounded-lg">
          <Settings size={24} />
        </div>
        <div className="grid grid-rows-[auto_auto]">
          <h1 className="text-xl font-bold text-slate-900">Control Estadístico</h1>
         
        </div>
      </header>

      {/* Tabs / Navigation */}
      <nav className="grid grid-flow-col auto-cols-fr border-b border-slate-200 bg-slate-100 ">
        {content.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`grid grid-rows-[auto_auto] place-items-center gap-1 p-3 transition-colors duration-200 border-b-2
                ${isActive 
                  ? 'border-blue-600 bg-white text-blue-700' 
                  : 'border-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                }
              `}
              aria-selected={isActive}
              role="tab"
            >
              <Icon size={20} />
              <span className="text-xs font-semibold uppercase tracking-wider text-center">{tab.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="grid p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto w-full items-start">
          {children}
        </div>
      </main>

    </div>
  );
};

const DiagramRender: React.FC<DiagramRenderProps> = ({ activeTabId }) => {
  // Función para determinar qué gráfico renderizar basado en la pestaña activa
  const renderChartContent = () => {
    switch (activeTabId) {
      case 'q1': // Introducción (Proceso simple)
      case 'q2': // Definición (Mostrar límites)
        return (
          <>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickMargin={10} />
            <YAxis domain={[30, 80]} stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="4 4" label={{ position: 'top', value: 'LSC (70)', fill: '#ef4444', fontSize: 12 }} />
            <ReferenceLine y={50} stroke="#10b981" label={{ position: 'insideTopLeft', value: 'LC Promedio (50)', fill: '#10b981', fontSize: 12 }} />
            <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 4" label={{ position: 'bottom', value: 'LIC (30)', fill: '#ef4444', fontSize: 12 }} />
            
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} animationDuration={1500} />
          </>
        );
      
      case 'q3': // Análisis (Resaltar áreas)
        return (
          <>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis domain={[30, 80]} stroke="#64748b" fontSize={12} />
            <Tooltip />
            
            <ReferenceArea y1={60} y2={70} fill="#fef08a" fillOpacity={0.3} />
            <ReferenceArea y1={30} y2={40} fill="#fef08a" fillOpacity={0.3} />
            <ReferenceLine y={50} stroke="#10b981" />
            
            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} animationDuration={1000} />
          </>
        );

      case 'q4': // Cronológico (Énfasis en X)
        return (
          <>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="time" 
              stroke="#0f172a" 
              fontSize={14} 
              fontWeight="bold"
              tick={{ fill: '#0f172a' }}
              tickMargin={12}
            />
            <YAxis domain={[30, 80]} stroke="#cbd5e1" fontSize={12} />
            <Tooltip cursor={{ stroke: '#94a3b8', strokeWidth: 2, strokeDasharray: '4 4' }} />
            <Line type="stepAfter" dataKey="value" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} animationDuration={1000} />
          </>
        );

      case 'q5': // Patrones (Tendencia anormal)
        return (
          <>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis domain={[30, 90]} stroke="#64748b" fontSize={12} />
            <Tooltip />
            
            <ReferenceLine y={70} stroke="#ef4444" strokeWidth={2} label={{ position: 'top', value: 'Límite Crítico', fill: '#ef4444' }} />
            <ReferenceArea x1="14:00" x2="16:00" fill="#fee2e2" fillOpacity={0.5} />
            
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#f59e0b" 
              strokeWidth={4} 
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (payload.value > 70) {
                  return <circle cx={cx} cy={cy} r={8} fill="#ef4444" stroke="#fff" strokeWidth={2} />;
                }
                return <circle cx={cx} cy={cy} r={5} fill="#f59e0b" stroke="#fff" strokeWidth={2} />;
              }} 
              animationDuration={2000} 
            />
          </>
        );

      default:
        return null;
    }
  };

  const chartData = activeTabId === 'q5' ? trendProcessData : normalProcessData;

  return (
    <div className="grid grid-rows-[1fr] h-80 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          {renderChartContent()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState<string>(QUARKS[0].id);

  const currentQuark = QUARKS.find(q => q.id === activeTab) || QUARKS[0];

  return (
    <LessonLayout 
      content={QUARKS} 
      activeTabId={activeTab} 
      onTabChange={setActiveTab}
    >
      {/* Columna Izquierda: Información de Texto */}
      <Card className="p-8 gap-6 h-fit border-t-4 border-t-blue-600">
        <div className="grid gap-2">
         
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
            {currentQuark.title}
          </h2>
        </div>
        
        <div className="grid gap-4 text-slate-600 text-lg leading-relaxed">
          <p>{currentQuark.concept}</p>
        </div>
      </Card>

      {/* Columna Derecha: Renderizado del Diagrama */}
      <Card className="p-8 gap-4 bg-slate-900 text-slate-50 h-fit">
      

        {/* Componente que renderiza el diagrama dinámico según la pestaña */}
        <div className="grid bg-white rounded-lg p-4 mt-2 shadow-inner">
          <DiagramRender activeTabId={currentQuark.id} />
        </div>

        {/* Legend / Feedback helper */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-3 mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
          {activeTab === 'q5' ? (
            <AlertTriangle className="text-red-400" size={24} />
          ) : (
            <Activity className="text-green-400" size={24} />
          )}
          <span className="text-sm text-slate-300">
            {activeTab === 'q5' 
              ? 'Alerta: El sistema ha superado el Límite Superior de Control (LSC). Se requiere intervención inmediata.'
              : 'Estado: Monitoreo activo del proceso. Variaciones dentro de tolerancias esperadas.'}
          </span>
        </div>
      </Card>
    </LessonLayout>
  );
}