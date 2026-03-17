import React, { useState } from 'react';

// --- DEFINICIÓN DE TIPOS ---

interface TabConfig {
  id: string;
  title: string;
  shortTitle: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

interface DiagramSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

interface Point {
  x: number;
  y: number;
  isAnomaly?: boolean;
}

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-lg shadow-sm p-6 grid gap-6 ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTab, onTabChange, children }) => {
  return (
    // Layout principal usando exclusivamente CSS Grid
    <div className="grid h-screen grid-rows-[auto_auto_1fr] bg-slate-50 font-sans text-slate-800">
      
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 grid place-content-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
      </header>

      {/* Navegación por Pestañas (Tabs) */}
      <nav className="bg-white border-b border-slate-200 p-2">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 text-center
                ${activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
              `}
            >
              <span className="hidden md:inline">{tab.title}</span>
              <span className="inline md:hidden">{tab.shortTitle}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="overflow-y-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto grid gap-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const DiagramSection: React.FC<DiagramSectionProps> = ({ title, description, children }) => (
  <Card>
    <div className="grid gap-2 border-b border-slate-100 pb-4">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
    <div className="grid place-items-center pt-4 w-full overflow-x-auto">
      {children}
    </div>
  </Card>
);

// --- COMPONENTES DE DIAGRAMAS (SVG NATIVO) ---

const ControlChart: React.FC<{ points: Point[]; width?: number; height?: number; title?: string }> = ({ 
  points, 
  width = 600, 
  height = 300,
  title
}) => {
  const UCL = height * 0.2;
  const LCL = height * 0.8;
  const Mean = height * 0.5;

  return (
    <div className="grid gap-2 w-full max-w-2xl bg-white p-4 rounded-lg border border-slate-100">
      {title && <h3 className="text-center font-semibold text-slate-700">{title}</h3>}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm">
        {/* Background Grid */}
        <rect x="0" y="0" width={width} height={height} fill="#f8fafc" rx="4" />
        
        {/* Limits & Mean Lines */}
        <line x1="0" y1={UCL} x2={width} y2={UCL} stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
        <text x="10" y={UCL - 10} fill="#ef4444" fontSize="12" fontWeight="bold">LCS</text>
        
        <line x1="0" y1={Mean} x2={width} y2={Mean} stroke="#22c55e" strokeWidth="2" />
        <text x="10" y={Mean - 10} fill="#22c55e" fontSize="12" fontWeight="bold">Media</text>
        
        <line x1="0" y1={LCL} x2={width} y2={LCL} stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
        <text x="10" y={LCL - 10} fill="#ef4444" fontSize="12" fontWeight="bold">LCI</text>

        {/* Data Lines */}
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
        />

        {/* Data Points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.isAnomaly ? "6" : "4"}
              fill={p.isAnomaly ? "#ef4444" : "#3b82f6"}
              stroke={p.isAnomaly ? "#fee2e2" : "#fff"}
              strokeWidth="2"
            />
            {p.isAnomaly && (
              <circle cx={p.x} cy={p.y} r="10" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-ping" />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// --- CONTENIDO DE LAS PESTAÑAS ---

const Tab1OutofControl = () => {
  const points = [
    { x: 50, y: 150 }, { x: 100, y: 130 }, { x: 150, y: 160 },
    { x: 200, y: 140 }, { x: 250, y: 30, isAnomaly: true }, // Fuera de control (Arriba de UCL)
    { x: 300, y: 120 }, { x: 350, y: 150 }, { x: 400, y: 140 },
    { x: 450, y: 170 }, { x: 500, y: 130 }, { x: 550, y: 140 }
  ];

  return (
    <DiagramSection
      title="Regla de Punto Fuera de Control"
      description="Un proceso se considera fuera de control cuando al menos un punto cae fuera de los límites de control (LCS o LCI). Esto indica la presencia de una causa especial de variación, evidenciando una ruptura de la estabilidad del proceso."
    >
      <ControlChart points={points} title="Ejemplo: Punto superior al LCS" />
    </DiagramSection>
  );
};

const Tab2DetectionRules = () => {
  const chartWidth = 200;
  const chartHeight = 120;
  
  const generateChart = (points: Point[], title: string) => (
    <div className="grid gap-2 border border-slate-200 rounded p-2 bg-slate-50">
      <span className="text-xs font-bold text-center text-slate-700 h-8 grid items-center">{title}</span>
      <ControlChart points={points} width={chartWidth} height={chartHeight} />
    </div>
  );

  return (
    <DiagramSection
      title="Reglas de Detección (Patrones Básicos)"
      description="Existen reglas estadísticas que permiten identificar señales de inestabilidad, incluso si los puntos están dentro de los límites. Estas reglas detectan tendencias no aleatorias."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {generateChart([
          {x:20, y:60}, {x:60, y:50}, {x:100, y:10, isAnomaly: true}, {x:140, y:60}, {x:180, y:50}
        ], "1 punto fuera de límites")}
        {generateChart([
          {x:20, y:80}, {x:40, y:90, isAnomaly:true}, {x:60, y:85, isAnomaly:true}, 
          {x:80, y:95, isAnomaly:true}, {x:100, y:80, isAnomaly:true}, {x:120, y:85, isAnomaly:true},
          {x:140, y:90, isAnomaly:true}, {x:160, y:80, isAnomaly:true}, {x:180, y:50}
        ], "7 puntos mismo lado media")}
        {generateChart([
          {x:20, y:90}, {x:45, y:80}, {x:70, y:70}, 
          {x:95, y:60}, {x:120, y:50}, {x:145, y:40, isAnomaly:true}, {x:170, y:30, isAnomaly:true}
        ], "Tendencia (6+ puntos alza/baja)")}
        {generateChart([
          {x:20, y:30}, {x:45, y:90}, {x:70, y:30}, 
          {x:95, y:90}, {x:120, y:30}, {x:145, y:90}, {x:170, y:30}
        ], "Ciclos o patrones repetitivos")}
      </div>
    </DiagramSection>
  );
};

const Tab3CommonVsSpecial = () => (
  <DiagramSection
    title="Causas Comunes vs Especiales"
    description="Es vital distinguir entre la variación natural del proceso (causas comunes) y variaciones anómalas por factores externos (causas especiales) para decidir cuándo intervenir."
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl p-4">
      {/* Comunes */}
      <div className="grid bg-blue-50 border-2 border-blue-200 rounded-xl p-6 relative gap-4 place-items-center text-center">
        <div className="bg-blue-500 text-white w-16 h-16 rounded-full grid place-items-center text-2xl font-bold shadow-md">
          ✓
        </div>
        <h3 className="text-xl font-bold text-blue-900">Causas Comunes</h3>
        <p className="text-blue-800 text-sm">Variación natural del proceso, estable y predecible. Parte inherente del sistema.</p>
        <ul className="text-sm text-blue-700 grid gap-2 text-left w-full bg-white p-3 rounded">
          <li>• Vibración normal de maquinaria</li>
          <li>• Desgaste habitual de herramientas</li>
          <li>• Variaciones menores de temperatura</li>
        </ul>
        <div className="mt-2 text-xs font-bold bg-blue-200 text-blue-900 py-1 px-3 rounded-full">
          Acción: Mejorar el sistema
        </div>
      </div>

      {/* Especiales */}
      <div className="grid bg-red-50 border-2 border-red-200 rounded-xl p-6 relative gap-4 place-items-center text-center">
        <div className="bg-red-500 text-white w-16 h-16 rounded-full grid place-items-center text-2xl font-bold shadow-md">
          !
        </div>
        <h3 className="text-xl font-bold text-red-900">Causas Especiales</h3>
        <p className="text-red-800 text-sm">Variaciones anómalas debidas a factores externos o errores. Impredecibles.</p>
        <ul className="text-sm text-red-700 grid gap-2 text-left w-full bg-white p-3 rounded">
          <li>• Fallo repentino de equipo</li>
          <li>• Lote de material defectuoso</li>
          <li>• Error no habitual del operador</li>
        </ul>
        <div className="mt-2 text-xs font-bold bg-red-200 text-red-900 py-1 px-3 rounded-full">
          Acción: Investigar y eliminar
        </div>
      </div>
    </div>
  </DiagramSection>
);

const Tab4Patterns = () => (
  <DiagramSection
    title="Interpretación de Patrones"
    description="Los patrones en los gráficos revelan información diagnóstica sobre el comportamiento y las posibles fallas del proceso."
  >
    <div className="w-full max-w-3xl border rounded-lg bg-slate-50 p-6 grid gap-6">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-slate-200 pb-4">
        <div className="font-bold text-right text-slate-700 text-lg">Tendencia</div>
        <div className="w-8 h-1 bg-blue-400"></div>
        <div className="text-slate-600 bg-white p-2 rounded shadow-sm text-sm border border-slate-100">Desgaste de herramienta, cambio gradual de ambiente.</div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-slate-200 pb-4">
        <div className="font-bold text-right text-slate-700 text-lg">Ciclo</div>
        <div className="w-8 h-1 bg-indigo-400"></div>
        <div className="text-slate-600 bg-white p-2 rounded shadow-sm text-sm border border-slate-100">Diferencias de turno, fluctuaciones de voltaje/temperatura.</div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-slate-200 pb-4">
        <div className="font-bold text-right text-slate-700 text-lg">Rachas</div>
        <div className="w-8 h-1 bg-amber-500"></div>
        <div className="text-slate-600 bg-white p-2 rounded shadow-sm text-sm border border-slate-100">Nuevo lote de material, cambio en ajuste de máquina.</div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="font-bold text-right text-slate-700 text-lg">Alta Variabilidad</div>
        <div className="w-8 h-1 bg-red-400"></div>
        <div className="text-slate-600 bg-white p-2 rounded shadow-sm text-sm border border-slate-100">Operadores sin capacitar, material inconsistente.</div>
      </div>
    </div>
  </DiagramSection>
);

const Tab5Procedure = () => (
  <DiagramSection
    title="Procedimiento de Análisis"
    description="Flujo de decisiones para analizar un gráfico de control y tomar acciones correctivas."
  >
    <div className="grid grid-cols-1 gap-2 place-items-center w-full max-w-lg">
      <div className="bg-slate-800 text-white font-bold py-3 px-6 rounded-md w-full text-center shadow-md z-10">1. Observar Gráfico</div>
      <div className="w-1 h-6 bg-slate-400"></div>
      
      <div className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full text-center shadow-md z-10">2. ¿Puntos fuera de límites o patrones?</div>
      
      <div className="grid grid-cols-2 w-full gap-4 text-center mt-2">
        <div className="grid place-items-center gap-2">
          <span className="text-sm font-bold text-slate-500">NO</span>
          <div className="w-1 h-6 bg-slate-400"></div>
          <div className="bg-green-100 border-2 border-green-500 text-green-800 font-bold py-3 px-6 rounded-md w-full">Proceso Estable (Causas Comunes)<br/><span className="text-xs font-normal">Continuar monitoreo</span></div>
        </div>
        
        <div className="grid place-items-center gap-2">
          <span className="text-sm font-bold text-slate-500">SÍ</span>
          <div className="w-1 h-6 bg-slate-400"></div>
          <div className="bg-red-100 border-2 border-red-500 text-red-800 font-bold py-3 px-6 rounded-md w-full">Causa Especial Detectada</div>
          <div className="w-1 h-6 bg-slate-400"></div>
          <div className="bg-amber-100 border border-amber-400 text-amber-800 font-semibold py-2 px-4 rounded w-full">3. Investigar Causa Raíz</div>
          <div className="w-1 h-4 bg-slate-400"></div>
          <div className="bg-amber-100 border border-amber-400 text-amber-800 font-semibold py-2 px-4 rounded w-full">4. Acción Correctiva</div>
        </div>
      </div>
      
      <div className="w-1 h-6 bg-slate-400 mt-2"></div>
      <div className="bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-full w-64 text-center border-2 border-slate-300">Monitorear Nuevamente</div>
    </div>
  </DiagramSection>
);

const Tab6Application = () => (
  <DiagramSection
    title="Aplicación en la Mejora de Procesos"
    description="El monitoreo constante mediante Control Estadístico de Procesos (SPC) previene defectos y reduce progresivamente la variabilidad."
  >
    <div className="grid grid-cols-[auto_1fr] gap-0 w-full max-w-3xl items-start relative py-8">
      {/* Linea de tiempo vertical (simulada con Grid y bordes) */}
      <div className="grid grid-rows-3 gap-12 border-r-4 border-blue-300 pr-6 text-right items-center">
        <div className="font-bold text-blue-600">Fase Inicial</div>
        <div className="font-bold text-blue-600">Implementación SPC</div>
        <div className="font-bold text-blue-600">Mejora Continua</div>
      </div>
      <div className="grid grid-rows-3 gap-12 pl-6 items-center">
        <div className="grid gap-1 bg-white p-4 border rounded shadow-sm relative">
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[34px] top-1/2 transform -translate-y-1/2 border-4 border-white"></div>
          <h4 className="font-bold text-slate-800">Alta Variabilidad</h4>
          <p className="text-sm text-slate-600">Detección reactiva de defectos. Procesos inestables e impredecibles.</p>
        </div>
        <div className="grid gap-1 bg-white p-4 border rounded shadow-sm relative">
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[34px] top-1/2 transform -translate-y-1/2 border-4 border-white"></div>
          <h4 className="font-bold text-slate-800">Estabilización</h4>
          <p className="text-sm text-slate-600">Identificación y eliminación de causas especiales. El proceso se vuelve predecible.</p>
        </div>
        <div className="grid gap-1 bg-blue-50 p-4 border border-blue-200 rounded shadow-sm relative">
          <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[34px] top-1/2 transform -translate-y-1/2 border-4 border-white"></div>
          <h4 className="font-bold text-green-700">Prevención de Defectos</h4>
          <p className="text-sm text-green-800">Intervención en causas comunes. Estrechamiento de límites. Calidad asegurada desde el proceso.</p>
        </div>
      </div>
    </div>
  </DiagramSection>
);

const Tab7Exercises = () => {
  return (
    <div className="grid gap-6">
      <DiagramSection
        title="Ejercicio 1: Identificación de fuera de control"
        description="Analiza el siguiente gráfico y responde a la pregunta."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          <ControlChart 
            width={300} height={200}
            points={[
              {x:30,y:150}, {x:80,y:140}, {x:130,y:160}, {x:180,y:130}, 
              {x:230,y:20, isAnomaly:true}, {x:280,y:140}
            ]} 
          />
          <div className="grid gap-4 bg-amber-50 p-5 rounded border border-amber-200">
            <h4 className="font-bold text-amber-900">Tarea Conceptual:</h4>
            <p className="text-amber-800 font-medium italic">¿Determinar si el proceso está bajo control?</p>
            <div className="mt-4 border-t border-amber-200 pt-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Respuesta Esperada</span>
              <p className="text-slate-800 mt-1 font-semibold">No, existe una causa especial que debe investigarse (punto superior al LCS).</p>
            </div>
          </div>
        </div>
      </DiagramSection>

      <DiagramSection
        title="Ejercicio 2: Detección de tendencia"
        description="Observa el comportamiento de los puntos consecutivos."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          <ControlChart 
            width={300} height={200}
            points={[
              {x:30,y:160}, {x:70,y:140}, {x:110,y:120}, {x:150,y:100}, 
              {x:190,y:80, isAnomaly:true}, {x:230,y:60, isAnomaly:true}, {x:270,y:40, isAnomaly:true}
            ]} 
          />
          <div className="grid gap-4 bg-amber-50 p-5 rounded border border-amber-200">
            <h4 className="font-bold text-amber-900">Tarea Conceptual:</h4>
            <p className="text-amber-800 font-medium italic">¿Identificar el tipo de patrón?</p>
            <div className="mt-4 border-t border-amber-200 pt-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Respuesta Esperada</span>
              <p className="text-slate-800 mt-1 font-semibold">Tendencia ascendente (hacia un valor numérico menor en Y, o aumento de la variable medida). Indica un posible cambio gradual en el proceso.</p>
            </div>
          </div>
        </div>
      </DiagramSection>

      <DiagramSection
        title="Ejercicio 3: Análisis de rachas"
        description="Evalúa la agrupación de puntos respecto a la media."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          <ControlChart 
            width={300} height={200}
            points={[
              {x:30,y:80, isAnomaly:true}, {x:60,y:70, isAnomaly:true}, {x:90,y:90, isAnomaly:true}, 
              {x:120,y:85, isAnomaly:true}, {x:150,y:75, isAnomaly:true}, {x:180,y:60, isAnomaly:true},
              {x:210,y:80, isAnomaly:true}, {x:240,y:90, isAnomaly:true}, {x:270,y:150}
            ]} 
          />
          <div className="grid gap-4 bg-amber-50 p-5 rounded border border-amber-200">
            <h4 className="font-bold text-amber-900">Tarea Conceptual:</h4>
            <p className="text-amber-800 font-medium italic">¿Interpretar la señal mostrada en el gráfico?</p>
            <div className="mt-4 border-t border-amber-200 pt-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Respuesta Esperada</span>
              <p className="text-slate-800 mt-1 font-semibold">El proceso puede haber cambiado de nivel (desplazamiento de la media), evidente por 8 puntos consecutivos por encima de la media original.</p>
            </div>
          </div>
        </div>
      </DiagramSection>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>('tab1');

  const tabs: TabConfig[] = [
    { id: 'tab1', title: '1. Fuera de Control', shortTitle: 'Fuera Control' },
    { id: 'tab2', title: '2. Reglas Detección', shortTitle: 'Reglas' },
    { id: 'tab3', title: '3. Comunes vs Especiales', shortTitle: 'Causas' },
    { id: 'tab4', title: '4. Patrones', shortTitle: 'Patrones' },
    { id: 'tab5', title: '5. Procedimiento', shortTitle: 'Análisis' },
    { id: 'tab6', title: '6. Mejora Continua', shortTitle: 'Mejora' },
    { id: 'tab7', title: '7. Ejercicios', shortTitle: 'Práctica' },
  ];

  return (
    <LessonLayout
      title="Solución de Problemas con Diagramas de Variables"
      tabs={tabs}
      activeTab={activeTabId}
      onTabChange={setActiveTabId}
    >
      {/* Contenido Dinámico basado en la pestaña activa */}
      {activeTabId === 'tab1' && <Tab1OutofControl />}
      {activeTabId === 'tab2' && <Tab2DetectionRules />}
      {activeTabId === 'tab3' && <Tab3CommonVsSpecial />}
      {activeTabId === 'tab4' && <Tab4Patterns />}
      {activeTabId === 'tab5' && <Tab5Procedure />}
      {activeTabId === 'tab6' && <Tab6Application />}
      {activeTabId === 'tab7' && <Tab7Exercises />}
    </LessonLayout>
  );
}