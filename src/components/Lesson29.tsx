import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  
} from 'recharts';
import { Activity,  } from 'lucide-react';

// --- DEFINICIONES DE TIPOS E INTERFACES ---

interface Section {
  id: string;
  tabTitle: string;
  title: string;
  description: React.ReactNode;
  chartType: ChartType;
}

type ChartType =
  | 'random'
  | 'zones'
  | 'shift'
  | 'trend'
  | 'cyclic'
  | 'excess'
  | 'stratification'
  | 'flowchart';

interface DataPoint {
  sample: number;
  value: number;
  isAnomaly?: boolean;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// --- DATOS Y CONTENIDO ---

const SECTIONS: Section[] = [
  {
    id: 'intro',
    tabTitle: '1. Introducción',
    title: 'Introducción a la interpretación de cartas de control',
    description: (
      <div className="grid gap-4">
        <p>
          Las cartas de control permiten distinguir entre variación <strong>aleatoria (común)</strong> y <strong>variación especial</strong> en un proceso. Un proceso está bajo control estadístico cuando los puntos se distribuyen aleatoriamente dentro de los límites de control. En cambio, patrones no aleatorios indican la presencia de causas especiales que afectan la estabilidad.
        </p>
      </div>
    ),
    chartType: 'random',
  },
  {
    id: 'zones',
    tabTitle: '2. Zonas',
    title: 'División en zonas para facilitar el análisis',
    description: (
      <div className="grid gap-4">
        <p>
          Para detectar patrones no aleatorios, la carta se divide en <strong>seis zonas iguales</strong>, basadas en la desviación estándar. Estas zonas ayudan a identificar concentraciones o comportamientos inusuales de los puntos.
        </p>
        <ul className="grid gap-2 pl-4 list-disc marker:text-blue-500">
          <li><strong>Zona C:</strong> ±1 desviación estándar desde el centro.</li>
          <li><strong>Zona B:</strong> Entre 1 y 2 desviaciones estándar.</li>
          <li><strong>Zona A:</strong> Entre 2 y 3 desviaciones estándar (cerca de los límites).</li>
        </ul>
      </div>
    ),
    chartType: 'zones',
  },
  {
    id: 'shift',
    tabTitle: '3. Desplazamientos',
    title: 'Desplazamientos en el nivel del proceso',
    description: (
      <div className="grid gap-4">
        <p>
          Este patrón ocurre cuando los puntos se concentran en un solo lado de la línea central o alguno cae fuera de los límites. Indica un cambio en el promedio del proceso.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-2 bg-slate-100 p-3 rounded-md">
            <strong className="text-slate-800">Causas comunes:</strong>
            <ul className="grid gap-1 pl-4 list-disc text-sm">
              <li>Nuevos trabajadores, materiales o métodos</li>
              <li>Cambios en inspección</li>
              <li>Variaciones en atención o desempeño</li>
            </ul>
          </div>
          <div className="grid auto-rows-max gap-2 bg-blue-50 p-3 rounded-md">
            <strong className="text-blue-800">Criterios típicos:</strong>
            <ul className="grid gap-1 pl-4 list-disc text-sm">
              <li>Un punto fuera de límites</li>
              <li>Ocho o más puntos consecutivos de un mismo lado</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    chartType: 'shift',
  },
  {
    id: 'trend',
    tabTitle: '4. Tendencias',
    title: 'Tendencias en el proceso',
    description: (
      <div className="grid gap-4">
        <p>
          Se presenta cuando los puntos muestran una secuencia continua ascendente o descendente. Refleja cambios graduales en el proceso.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-2 bg-slate-100 p-3 rounded-md">
            <strong className="text-slate-800">Causas comunes:</strong>
            <ul className="grid gap-1 pl-4 list-disc text-sm">
              <li>Desgaste de herramientas</li>
              <li>Calentamiento de maquinaria</li>
              <li>Acumulación de residuos</li>
            </ul>
          </div>
          <div className="grid auto-rows-max gap-2 bg-blue-50 p-3 rounded-md">
            <strong className="text-blue-800">Criterio clave:</strong>
            <p className="text-sm">Seis o más puntos consecutivos en aumento o disminución.</p>
          </div>
        </div>
      </div>
    ),
    chartType: 'trend',
  },
  {
    id: 'cyclic',
    tabTitle: '5. Cíclico',
    title: 'Comportamiento cíclico (periodicidad)',
    description: (
      <div className="grid gap-4">
        <p>
          Los puntos siguen patrones repetitivos de subida y bajada, lo que indica variaciones sistemáticas periódicas.
        </p>
        <div className="grid auto-rows-max gap-2 bg-slate-100 p-3 rounded-md">
          <strong className="text-slate-800">Causas comunes:</strong>
          <ul className="grid gap-1 pl-4 list-disc text-sm">
            <li>Cambios ambientales cíclicos (temperatura, humedad)</li>
            <li>Rotación de operarios o máquinas</li>
            <li>Uso alternado de equipos o materiales</li>
          </ul>
        </div>
      </div>
    ),
    chartType: 'cyclic',
  },
  {
    id: 'excess',
    tabTitle: '6. Exceso Var.',
    title: 'Exceso de variabilidad',
    description: (
      <div className="grid gap-4">
        <p>
          Se identifica cuando muchos puntos se ubican cerca de los límites de control y pocos en la zona central. Indica inestabilidad alta en el proceso.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-2 bg-slate-100 p-3 rounded-md">
            <strong className="text-slate-800">Causas comunes:</strong>
            <ul className="grid gap-1 pl-4 list-disc text-sm">
              <li>Ajustes excesivos (sobrecontrol)</li>
              <li>Mezcla de procesos distintos</li>
              <li>Materiales inconsistentes</li>
            </ul>
          </div>
          <div className="grid auto-rows-max gap-2 bg-blue-50 p-3 rounded-md">
            <strong className="text-blue-800">Criterio:</strong>
            <p className="text-sm">Ocho puntos consecutivos fuera de la zona central (Zonas C).</p>
          </div>
        </div>
      </div>
    ),
    chartType: 'excess',
  },
  {
    id: 'stratification',
    tabTitle: '7. Falta Var.',
    title: 'Falta de variabilidad (estratificación)',
    description: (
      <div className="grid gap-4">
        <p>
          Ocurre cuando los puntos se concentran excesivamente en la zona central, lo que paradójicamente también es señal de problema en el sistema de medición o muestreo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-2 bg-slate-100 p-3 rounded-md">
            <strong className="text-slate-800">Causas comunes:</strong>
            <ul className="grid gap-1 pl-4 list-disc text-sm">
              <li>Errores en cálculo de límites de control</li>
              <li>Combinación de datos que se compensan</li>
              <li>Manipulación de resultados</li>
            </ul>
          </div>
          <div className="grid auto-rows-max gap-2 bg-blue-50 p-3 rounded-md">
            <strong className="text-blue-800">Criterio:</strong>
            <p className="text-sm">Quince puntos consecutivos en la zona central.</p>
          </div>
        </div>
      </div>
    ),
    chartType: 'stratification',
  },
  {
    id: 'action',
    tabTitle: '8. Acción',
    title: 'Importancia de actuar ante señales de inestabilidad',
    description: (
      <div className="grid gap-4">
        <p>
          La presencia de cualquiera de estos patrones indica que el proceso está influenciado por causas especiales. Ignorarlas convierte la carta en una simple bitácora, desaprovechando su valor como herramienta de mejora continua.
        </p>
        <div className="grid gap-2 border-l-4 border-blue-600 pl-4 py-2 mt-4 bg-white">
          <h4 className="font-semibold text-slate-800">Actuar implica sistemáticamente:</h4>
          <ul className="grid gap-2 list-decimal pl-4 text-sm text-slate-700">
            <li>Identificar la causa específica del patrón.</li>
            <li>Corregirla o controlarla de forma inmediata.</li>
            <li>Prevenir su recurrencia modificando los estándares.</li>
          </ul>
        </div>
      </div>
    ),
    chartType: 'flowchart',
  },
];

// --- GENERACIÓN DE DATOS SIMULADOS PARA DIAGRAMAS ---

const generateChartData = (type: ChartType): DataPoint[] => {
  const data: DataPoint[] = [];
  const n = 24; // Número de muestras
  const mean = 50;

  for (let i = 1; i <= n; i++) {
    let val = mean;
    let isAnomaly = false;

    switch (type) {
      case 'random':
      case 'zones':
        val = mean + (Math.random() * 20 - 10);
        break;
      case 'shift':
        if (i < 12) {
          val = mean + (Math.random() * 10 - 5);
        } else {
          val = 70 + (Math.random() * 10 - 5);
          isAnomaly = true;
        }
        break;
      case 'trend':
        val = 25 + i * 2.5 + (Math.random() * 6 - 3);
        if (i > 10) isAnomaly = true;
        break;
      case 'cyclic':
        val = mean + Math.sin(i * 0.8) * 25 + (Math.random() * 5 - 2.5);
        break;
      case 'excess':
        // Alternar entre valores muy altos y muy bajos
        val = i % 2 === 0 ? 85 + (Math.random() * 5) : 15 - (Math.random() * 5);
        isAnomaly = true;
        break;
      case 'stratification':
        // Todos los puntos muy pegados a la media
        val = mean + (Math.random() * 4 - 2);
        if (i > 5) isAnomaly = true;
        break;
      default:
        val = mean;
    }
    data.push({ sample: i, value: val, isAnomaly });
  }
  return data;
};

// --- COMPONENTES BASE (UI) ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

// Componente para renderizar un nodo en el diagrama de flujo (usando Grid)
const FlowNode: React.FC<{ title: string; desc: string; color: string }> = ({ title, desc, color }) => (
  <div className={`grid gap-2 p-4 rounded-lg border-2 text-center shadow-sm h-full content-start ${color}`}>
    <strong className="text-sm md:text-base block">{title}</strong>
    <span className="text-xs md:text-sm opacity-90">{desc}</span>
  </div>
);

// --- COMPONENTES DE VISTA Y DIAGRAMAS ---

const DiagramRender: React.FC<{ type: ChartType }> = ({ type }) => {
  const data = useMemo(() => generateChartData(type), [type]);

  if (type === 'flowchart') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 items-center p-6 h-full min-h-[300px] bg-slate-50/50 rounded-lg">
        <FlowNode 
          title="Detección" 
          desc="Identificación del patrón en la gráfica" 
          color="bg-red-50 border-red-200 text-red-900" 
        />
        <div className="grid justify-center text-slate-400 rotate-90 md:rotate-0 text-2xl">➔</div>
        
        <FlowNode 
          title="Análisis" 
          desc="Investigación de causas raíz" 
          color="bg-amber-50 border-amber-200 text-amber-900" 
        />
        <div className="grid justify-center text-slate-400 rotate-90 md:rotate-0 text-2xl">➔</div>
        
        <FlowNode 
          title="Acción" 
          desc="Implementación de medidas correctivas" 
          color="bg-blue-50 border-blue-200 text-blue-900" 
        />
        <div className="grid justify-center text-slate-400 rotate-90 md:rotate-0 text-2xl">➔</div>
        
        <FlowNode 
          title="Mejora" 
          desc="Proceso estabilizado y documentado" 
          color="bg-emerald-50 border-emerald-200 text-emerald-900" 
        />
      </div>
    );
  }

  // Configuración base para gráficas estadísticas
  const UCL = 80;
  const LCL = 20;
  const MEAN = 50;

  // Renderizado personalizado de puntos para resaltar anomalías
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isAnomaly) {
      return <circle cx={cx} cy={cy} r={5} fill="#ef4444" stroke="#fff" strokeWidth={2} key={`dot-${payload.sample}`} />;
    }
    return <circle cx={cx} cy={cy} r={4} fill="#3b82f6" stroke="#fff" strokeWidth={1} key={`dot-${payload.sample}`} />;
  };

  return (
    <div className="w-full h-[400px] bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="sample" 
            label={{ value: 'Muestra / Tiempo', position: 'bottom', offset: 0 }} 
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#334155' }}
          />
          
          {/* Zonas Especiales (Solo para la pestaña de Zonas) */}
          {type === 'zones' && (
            <>
              {/* Zonas C (Verde) */}
              <ReferenceArea y1={40} y2={60} fill="#bbf7d0" fillOpacity={0.3} />
              {/* Zonas B (Amarillo) */}
              <ReferenceArea y1={60} y2={70} fill="#fef08a" fillOpacity={0.3} />
              <ReferenceArea y1={30} y2={40} fill="#fef08a" fillOpacity={0.3} />
              {/* Zonas A (Rojo) */}
              <ReferenceArea y1={70} y2={80} fill="#fecaca" fillOpacity={0.3} />
              <ReferenceArea y1={20} y2={30} fill="#fecaca" fillOpacity={0.3} />
            </>
          )}

          {/* Límites de Control y Línea Central */}
          <ReferenceLine y={UCL} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" label={{ value: 'LSC (+3σ)', position: 'insideTopRight', fill: '#ef4444', fontSize: 12 }} />
          <ReferenceLine y={MEAN} stroke="#10b981" strokeWidth={2} label={{ value: 'Línea Central (Media)', position: 'insideTopRight', fill: '#10b981', fontSize: 12 }} />
          <ReferenceLine y={LCL} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" label={{ value: 'LIC (-3σ)', position: 'insideBottomRight', fill: '#ef4444', fontSize: 12 }} />
          
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            dot={renderDot}
            activeDot={{ r: 7, strokeWidth: 0 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- ESTRUCTURA PRINCIPAL DEL LAYOUT ---

const LessonLayout: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeSection = SECTIONS[activeTabIndex];

  return (
    // Layout Principal usando exclusivamente CSS Grid
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen bg-slate-100 text-slate-800 font-sans">
      
      {/* HEADER */}
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-slate-900 text-white p-4 shadow-md z-10">
        <div className="grid place-items-center bg-blue-600 p-2 rounded-lg">
          <Activity size={24} />
        </div>
        <div className="grid gap-1">
          <h1 className="text-xl font-bold leading-none">Interpretación de cartas de control</h1>

        </div>
      </header>

      {/* PESTAÑAS (TABS) - Navegación */}
      <nav className="grid border-b border-slate-300 bg-white px-4 pt-2 overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-max gap-1">
          {SECTIONS.map((section, index) => {
            const isActive = index === activeTabIndex;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTabIndex(index)}
                className={`
                  grid place-items-center px-4 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer bg-transparent whitespace-nowrap
                  ${isActive 
                    ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-lg' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-t-lg'}
                `}
              >
                {section.tabTitle}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="grid p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[500px_1fr] gap-6 max-w-7xl mx-auto w-full items-start">
          
          {/* Panel Izquierdo: Descripción Teórica */}
          <Card className="grid grid-rows-[auto_1fr] h-full">
            <div className="grid gap-2 border-b border-slate-100 p-6 bg-slate-50/50">
             
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                {activeSection.title}
              </h2>
            </div>
            <div className="p-6 text-slate-700 leading-relaxed text-base">
              {activeSection.description}
            </div>
          </Card>

          {/* Panel Derecho: Renderizado del Diagrama */}
          <Card className="grid grid-rows-[auto_1fr] h-full min-h-[450px]">
          
            <div className="grid place-items-center p-4 h-full relative">
              <DiagramRender type={activeSection.chartType} />
            </div>
          </Card>

        </div>
      </main>

    </div>
  );
};

export default function App() {
  return <LessonLayout />;
}