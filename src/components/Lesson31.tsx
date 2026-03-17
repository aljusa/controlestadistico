import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ComposedChart
} from 'recharts';

// --- TIPOS E INTERFACES ---

interface TabData {
  id: string;
  label: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: TabData[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

interface DiagramRenderProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

const DiagramRender: React.FC<DiagramRenderProps> = ({ children, title, description }) => (
  <div className="grid grid-cols-1 gap-6 w-full">
    <div className="grid gap-2">
      <h3 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">{title}</h3>
      <p className="text-slate-600 text-sm md:text-base leading-relaxed">{description}</p>
    </div>
    <div className="grid place-items-center bg-slate-50 border border-slate-200 rounded-lg p-4 min-h-[300px] w-full">
      {children}
    </div>
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTabId, onTabChange }) => {
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    // Estructura principal usando CSS Grid
    <div className="grid grid-rows-[auto_auto_1fr] h-screen w-full bg-slate-100 font-sans text-slate-900 overflow-hidden">
      
      {/* HEADER */}
      <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center p-6 bg-white border-b border-slate-200 shadow-sm z-10">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-blue-900">
          {title}
        </h1>
        <div className="text-sm font-medium text-slate-500 justify-self-start md:justify-self-end mt-2 md:mt-0">
          Módulo de Control de Calidad
        </div>
      </header>

      {/* NAVIGATION (TABS) */}
      <nav className="grid border-b border-slate-200 bg-white px-6 pt-2 overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-max gap-1 pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                grid place-items-center px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors border-b-2
                ${activeTabId === tab.id 
                  ? 'bg-blue-50 text-blue-700 border-blue-600' 
                  : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'}
              `}
              aria-selected={activeTabId === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="grid p-6 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto items-start content-start gap-8">
        {activeTab && (
          <Card className="grid grid-cols-1 gap-8 animate-in fade-in duration-300">
            <DiagramRender 
              title={activeTab.title} 
              description={activeTab.description}
            >
              {activeTab.content}
            </DiagramRender>
          </Card>
        )}
      </main>
    </div>
  );
};

// --- VISUALIZACIONES ESPECÍFICAS DE DIAGRAMAS ---

// 1. Señales Fuera de Control
const mockDataSignals = [
  { id: 1, val: 0.05, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 2, val: 0.08, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 3, val: 0.28, media: 0.1, lcs: 0.25, lci: 0, signal: 'Fuera LCS' }, // Outlier
  { id: 4, val: 0.09, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 5, val: 0.12, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 6, val: 0.15, media: 0.1, lcs: 0.25, lci: 0 }, // Inicio Racha (arriba)
  { id: 7, val: 0.18, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 8, val: 0.16, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 9, val: 0.20, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 10, val: 0.14, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 11, val: 0.19, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 12, val: 0.17, media: 0.1, lcs: 0.25, lci: 0, signal: 'Racha prolongada' }, // Fin Racha
  { id: 13, val: 0.05, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 14, val: 0.04, media: 0.1, lcs: 0.25, lci: 0 }, // Inicio Tendencia bajista
  { id: 15, val: 0.035, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 16, val: 0.03, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 17, val: 0.02, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 18, val: 0.015, media: 0.1, lcs: 0.25, lci: 0 },
  { id: 19, val: 0.01, media: 0.1, lcs: 0.25, lci: 0, signal: 'Tendencia decreciente' }, // Fin Tendencia
  { id: 20, val: 0.08, media: 0.1, lcs: 0.25, lci: 0 },
];

const ChartSignals = () => {
  const signalPoints = mockDataSignals.filter(d => d.signal);
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={mockDataSignals} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="id" tick={{fontSize: 12}} />
          <YAxis domain={[-0.05, 0.35]} tick={{fontSize: 12}} />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0.25} stroke="#ef4444" strokeDasharray="3 3" label="LCS" />
          <ReferenceLine y={0.1} stroke="#10b981" label="Media" />
          <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" label="LCI" />
          <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={2} name="Proporción (p)" dot={{ r: 4 }} />
          <Scatter data={signalPoints} dataKey="val" fill="#ef4444" shape="triangle" name="Señales Detectadas">
            {/* Custom label rendering could go here if needed, keeping it simple for now */}
          </Scatter>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

// 2. Interpretación de Señales (Mapa Conceptual via CSS Grid)
const ConceptMap = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl p-4">
    <div className="grid bg-red-50 border border-red-200 rounded-lg p-4 content-start text-center shadow-sm">
      <h4 className="font-bold text-red-700 mb-2">Aumento en Defectuosos</h4>
      <p className="text-sm text-red-900 bg-white p-2 rounded border border-red-100 mt-2">Deterioro del proceso</p>
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-slate-600">
        <span className="bg-slate-100 p-1 rounded">Desgaste máquina</span>
        <span className="bg-slate-100 p-1 rounded">Falla material</span>
      </div>
    </div>
    
    <div className="grid bg-green-50 border border-green-200 rounded-lg p-4 content-start text-center shadow-sm">
      <h4 className="font-bold text-green-700 mb-2">Disminución Repentina</h4>
      <p className="text-sm text-green-900 bg-white p-2 rounded border border-green-100 mt-2">Mejora o cambio de condiciones</p>
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-slate-600">
        <span className="bg-slate-100 p-1 rounded">Nuevo operador</span>
        <span className="bg-slate-100 p-1 rounded">Ajuste método</span>
      </div>
    </div>

    <div className="grid bg-amber-50 border border-amber-200 rounded-lg p-4 content-start text-center shadow-sm">
      <h4 className="font-bold text-amber-700 mb-2">Variación Irregular</h4>
      <p className="text-sm text-amber-900 bg-white p-2 rounded border border-amber-100 mt-2">Inconsistencias operativas</p>
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-slate-600">
        <span className="bg-slate-100 p-1 rounded">Cambio de turno</span>
        <span className="bg-slate-100 p-1 rounded">Mezcla lotes</span>
      </div>
    </div>
  </div>
);

// 3. Causas Especiales (Estructura tipo Ishikawa simplificada en Grid)
const IshikawaGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 w-full max-w-5xl items-center relative py-8">
    
    {/* Ramas Izquierdas */}
    <div className="grid grid-rows-2 gap-8 justify-items-end">
      <div className="grid p-3 bg-blue-50 border border-blue-200 rounded shadow-sm text-right relative">
        <h4 className="font-bold text-blue-800 text-sm">Maquinaria</h4>
        <p className="text-xs text-slate-600 mt-1">Fallas, desajustes, mantenimiento preventivo omitido.</p>
        <div className="hidden md:block absolute top-1/2 -right-12 w-12 border-b-2 border-slate-400"></div>
      </div>
      <div className="grid p-3 bg-blue-50 border border-blue-200 rounded shadow-sm text-right relative">
        <h4 className="font-bold text-blue-800 text-sm">Materiales</h4>
        <p className="text-xs text-slate-600 mt-1">Cambio de proveedor, lote defectuoso, especificaciones erróneas.</p>
        <div className="hidden md:block absolute top-1/2 -right-12 w-12 border-b-2 border-slate-400"></div>
      </div>
    </div>

    {/* Espina Central */}
    <div className="hidden md:grid w-4 h-full bg-slate-400 relative">
      <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-slate-400 border-b-[10px] border-b-transparent"></div>
    </div>

    {/* Problema Central (Efecto) para móvil */}
    <div className="grid md:hidden bg-red-100 border border-red-300 p-4 rounded-lg text-center font-bold text-red-800 my-4 shadow-md">
      Comportamiento Anormal del Proceso (Causa Especial)
    </div>

    {/* Ramas Derechas */}
    <div className="grid grid-rows-2 gap-8 justify-items-start">
      <div className="grid p-3 bg-blue-50 border border-blue-200 rounded shadow-sm text-left relative">
        <div className="hidden md:block absolute top-1/2 -left-12 w-12 border-b-2 border-slate-400"></div>
        <h4 className="font-bold text-blue-800 text-sm">Mano de Obra</h4>
        <p className="text-xs text-slate-600 mt-1">Error humano, fatiga, falta de capacitación, nuevo personal.</p>
      </div>
      <div className="grid p-3 bg-blue-50 border border-blue-200 rounded shadow-sm text-left relative">
        <div className="hidden md:block absolute top-1/2 -left-12 w-12 border-b-2 border-slate-400"></div>
        <h4 className="font-bold text-blue-800 text-sm">Método / Entorno</h4>
        <p className="text-xs text-slate-600 mt-1">Procedimiento no seguido, cambios de temperatura/humedad.</p>
      </div>
    </div>

    {/* Efecto en Desktop (ubicado al final de la flecha) */}
    <div className="hidden md:grid absolute right-[-180px] top-1/2 transform -translate-y-1/2 bg-red-100 border border-red-300 p-4 rounded-lg text-center font-bold text-red-800 shadow-md w-40">
      Causa Especial Detectada
    </div>
  </div>
);

// 4. Procedimiento (Diagrama de Flujo en Grid Vertical)
const FlowChart = () => (
  <div className="grid grid-cols-1 gap-4 justify-items-center w-full py-4">
    {['1. Detectar señal fuera de control en el gráfico', 
      '2. Ubicar el punto o patrón específico en el tiempo', 
      '3. Revisar eventos asociados (turno, lote, operador, cambios)', 
      '4. Analizar posibles causas (Ishikawa: 4Ms)', 
      '5. Confirmar la causa raíz con evidencia objetiva', 
      '6. Implementar acción correctiva y preventiva'].map((step, index, arr) => (
      <React.Fragment key={index}>
        <div className="grid bg-indigo-50 border-2 border-indigo-200 text-indigo-900 font-semibold px-6 py-3 rounded-lg shadow-sm text-center w-full max-w-md">
          {step}
        </div>
        {index < arr.length - 1 && (
          <div className="grid text-indigo-400 font-bold text-xl h-6 items-center">
            ↓
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

// 5. Relación Gráfico vs Diagnóstico
const GraphRelation = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
    <div className="grid gap-4 bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
      <div className="grid justify-items-center border-b pb-4">
        <span className="text-4xl font-black text-blue-600">p / np</span>
        <h4 className="font-bold text-slate-700 mt-2">Atributos: Defectuosos</h4>
      </div>
      <div className="grid gap-2">
        <p className="text-sm bg-slate-50 p-2 rounded border border-slate-100">
          <strong className="text-slate-800">Enfoque:</strong> Proporción o cantidad total de unidades que no cumplen especificaciones.
        </p>
        <p className="text-sm bg-slate-50 p-2 rounded border border-slate-100">
          <strong className="text-slate-800">Problema Típico:</strong> Frecuencia general de fallas que inutilizan la unidad.
        </p>
        <p className="text-sm bg-slate-50 p-2 rounded border border-slate-100">
          <strong className="text-slate-800">Investigar:</strong> Causas que afectan a la unidad completa (ej. error de ensamblaje crítico).
        </p>
      </div>
    </div>

    <div className="grid gap-4 bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
      <div className="grid justify-items-center border-b pb-4">
        <span className="text-4xl font-black text-emerald-600">c / u</span>
        <h4 className="font-bold text-slate-700 mt-2">Atributos: Defectos</h4>
      </div>
      <div className="grid gap-2">
        <p className="text-sm bg-slate-50 p-2 rounded border border-slate-100">
          <strong className="text-slate-800">Enfoque:</strong> Conteo de imperfecciones individuales en una o varias unidades.
        </p>
        <p className="text-sm bg-slate-50 p-2 rounded border border-slate-100">
          <strong className="text-slate-800">Problema Típico:</strong> Intensidad o concentración de errores superficiales o menores.
        </p>
        <p className="text-sm bg-slate-50 p-2 rounded border border-slate-100">
          <strong className="text-slate-800">Investigar:</strong> Causas repetitivas o de acabado (ej. rayones, burbujas de pintura).
        </p>
      </div>
    </div>
  </div>
);

// 6. Ejercicios Prácticos (Grid de mini gráficos)
const EjerciciosGrid = () => {
  // Data mocks simplificados para los mini-gráficos
  const dataP = [{n:1, v:2},{n:2, v:3},{n:3, v:12},{n:4, v:2},{n:5, v:4}]; // Punto fuera
  const dataNP = [{n:1, v:5},{n:2, v:8},{n:3, v:9},{n:4, v:7},{n:5, v:8},{n:6, v:9},{n:7, v:8},{n:8, v:9},{n:9, v:4}]; // Racha arriba (media ~5)
  const dataC = [{n:1, v:2},{n:2, v:15},{n:3, v:1},{n:4, v:18},{n:5, v:3}]; // Alta variabilidad
  const dataU = [{n:1, v:1},{n:2, v:2},{n:3, v:3.5},{n:4, v:5},{n:5, v:6.5}]; // Tendencia

  const MiniChart = ({ data, refLine, stroke }: { data: any[], refLine: number, stroke: string }) => (
    <div className="h-32 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <ReferenceLine y={refLine} stroke="#94a3b8" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="v" stroke={stroke} strokeWidth={2} dot={{r:3}} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      
      {/* Ejercicio P */}
      <div className="grid border border-slate-200 rounded-lg p-4 bg-white shadow-sm content-start">
        <h4 className="font-bold text-slate-800 border-b pb-2">Q-ej: Gráfico p</h4>
        <p className="text-sm text-slate-600 mt-2">Punto por encima del LCS.</p>
        <MiniChart data={dataP} refLine={8} stroke="#ef4444" />
        <div className="grid mt-4 bg-slate-50 p-3 rounded text-sm">
          <span className="font-bold text-slate-700">Diagnóstico:</span>
          <span className="text-slate-600">Incremento anormal en defectuosos; causa especial presente en ese subgrupo.</span>
        </div>
      </div>

      {/* Ejercicio NP */}
      <div className="grid border border-slate-200 rounded-lg p-4 bg-white shadow-sm content-start">
        <h4 className="font-bold text-slate-800 border-b pb-2">Q-ej: Gráfico np</h4>
        <p className="text-sm text-slate-600 mt-2">7 puntos consecutivos por encima de la media.</p>
        <MiniChart data={dataNP} refLine={5} stroke="#f59e0b" />
        <div className="grid mt-4 bg-slate-50 p-3 rounded text-sm">
          <span className="font-bold text-slate-700">Diagnóstico:</span>
          <span className="text-slate-600">Racha; posible cambio sostenido en el nivel del proceso (deterioro).</span>
        </div>
      </div>

      {/* Ejercicio C */}
      <div className="grid border border-slate-200 rounded-lg p-4 bg-white shadow-sm content-start">
        <h4 className="font-bold text-slate-800 border-b pb-2">Q-ej: Gráfico c</h4>
        <p className="text-sm text-slate-600 mt-2">Alta variabilidad en defectos por unidad.</p>
        <MiniChart data={dataC} refLine={8} stroke="#8b5cf6" />
        <div className="grid mt-4 bg-slate-50 p-3 rounded text-sm">
          <span className="font-bold text-slate-700">Diagnóstico:</span>
          <span className="text-slate-600">Inconsistencia grave; presencia de múltiples causas especiales esporádicas.</span>
        </div>
      </div>

      {/* Ejercicio U */}
      <div className="grid border border-slate-200 rounded-lg p-4 bg-white shadow-sm content-start">
        <h4 className="font-bold text-slate-800 border-b pb-2">Q-ej: Gráfico u</h4>
        <p className="text-sm text-slate-600 mt-2">Patrón creciente en defectos por unidad.</p>
        <MiniChart data={dataU} refLine={3.5} stroke="#3b82f6" />
        <div className="grid mt-4 bg-slate-50 p-3 rounded text-sm">
          <span className="font-bold text-slate-700">Diagnóstico:</span>
          <span className="text-slate-600">Tendencia ascendente; deterioro progresivo (ej. desgaste de herramienta, fatiga).</span>
        </div>
      </div>

    </div>
  );
};


// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('senales');

  const lessonTabs: TabData[] = [
    {
      id: 'senales',
      label: '1. Señales de Fuera de Control',
      title: 'Señales de fuera de control en atributos',
      description: 'Un proceso está fuera de control cuando los datos (proporciones o conteos) muestran comportamientos no aleatorios respecto a los límites de control. Las principales señales incluyen puntos fuera de límites, rachas o tendencias.',
      content: <ChartSignals />
    },
    {
      id: 'interpretacion',
      label: '2. Interpretación',
      title: 'Interpretación de señales en gráficos',
      description: 'Las señales indican posibles problemas en el proceso. La interpretación correcta debe considerar siempre el contexto operativo específico en el que ocurre la anomalía.',
      content: <ConceptMap />
    },
    {
      id: 'causas',
      label: '3. Causas Especiales',
      title: 'Causas especiales en procesos',
      description: 'Factores específicos y asignables que alteran el comportamiento normal (causas comunes) del proceso. Generalmente se categorizan en Máquina, Material, Mano de Obra y Método/Medio Ambiente.',
      content: <IshikawaGrid />
    },
    {
      id: 'procedimiento',
      label: '4. Procedimiento',
      title: 'Procedimiento de identificación',
      description: 'Metodología estructurada paso a paso para pasar de la detección estadística de una señal a la implementación de una acción correctiva real en el piso de producción.',
      content: <FlowChart />
    },
    {
      id: 'diagnostico',
      label: '5. Gráfico vs Diagnóstico',
      title: 'Relación entre tipo de gráfico y diagnóstico',
      description: 'El tipo de gráfico utilizado (proporciones vs conteos) orienta el enfoque de la investigación de causas. Determina si buscamos problemas a nivel unidad (frecuencia) o a nivel detalle (intensidad).',
      content: <GraphRelation />
    },
    {
      id: 'ejercicios',
      label: '6. Ejercicios Prácticos',
      title: 'Diagnóstico aplicado a casos',
      description: 'Análisis de escenarios prácticos visualizando los comportamientos estadísticos anómalos más comunes en los cuatro tipos principales de gráficos de atributos.',
      content: <EjerciciosGrid />
    }
  ];

  return (
    <LessonLayout
      title="Análisis y Solución con Diagramas de Atributos"
      tabs={lessonTabs}
      activeTabId={activeTab}
      onTabChange={setActiveTab}
    />
  );
}