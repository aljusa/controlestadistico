import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

// --- TYPES & INTERFACES ---

interface TabData {
  id: string;
  title: string;
  content: React.ReactNode;
  diagramTitle: string;
  diagramDescription: string;
  diagramType: 'intro' | 'xbar-r' | 'xbar-s' | 'i-mr' | 'comparison';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface DiagramRenderProps {
  type: TabData['diagramType'];
}

interface LessonLayoutProps {
  title: string;
  tabs: TabData[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

// --- MOCK DATA FOR CHARTS ---

const generateChartData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    sample: i + 1,
    xbar: 50 + Math.random() * 10 - 5,
    r: Math.random() * 8 + 2,
    s: Math.random() * 4 + 1,
    iVal: 100 + Math.random() * 20 - 10,
    mr: Math.random() * 15,
  }));
};

const chartData = generateChartData();

// --- COMPONENTS ---

// 1. Card Component
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden grid ${className}`}>
    {children}
  </div>
);

// 2. Diagram Render Component
const DiagramRender: React.FC<DiagramRenderProps> = ({ type }) => {
  // Configuración base para mantener consistencia visual
  const gridStyle = { stroke: '#e2e8f0', strokeDasharray: '3 3' };
  const uclColor = '#ef4444'; // Red
  const lclColor = '#ef4444'; // Red
  const clColor = '#22c55e'; // Green
  const dataColor = '#3b82f6'; // Blue

  switch (type) {
    case 'intro':
      return (
        <div className="grid grid-rows-[auto_1fr] h-full p-4 gap-6 items-center justify-items-center">
          <div className="grid grid-cols-3 gap-8 w-full max-w-lg text-center">
             <div className="grid grid-rows-[auto_auto] gap-2 justify-items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full grid place-content-center text-blue-600 font-bold text-2xl">📏</div>
                <span className="text-sm font-semibold text-slate-700">Longitud</span>
                <span className="text-xs text-slate-500">12.45 cm</span>
             </div>
             <div className="grid grid-rows-[auto_auto] gap-2 justify-items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full grid place-content-center text-green-600 font-bold text-2xl">⚖️</div>
                <span className="text-sm font-semibold text-slate-700">Peso</span>
                <span className="text-xs text-slate-500">250.3 g</span>
             </div>
             <div className="grid grid-rows-[auto_auto] gap-2 justify-items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full grid place-content-center text-orange-600 font-bold text-2xl">🌡️</div>
                <span className="text-sm font-semibold text-slate-700">Temperatura</span>
                <span className="text-xs text-slate-500">98.6 °C</span>
             </div>
          </div>
          <div className="text-center bg-slate-50 p-6 rounded-lg border border-slate-200 w-full">
            <h4 className="font-bold text-slate-800 mb-2">Medición Exacta</h4>
            <p className="text-sm text-slate-600">
              Los datos por variables proporcionan información detallada sobre la magnitud de la variación,
              permitiendo un control estadístico mucho más sensible que los datos por atributos (pasa/no pasa).
            </p>
          </div>
        </div>
      );

    case 'xbar-r':
      return (
        <div className="grid grid-rows-2 h-full gap-4 p-4 w-full min-h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="sample" tick={{fontSize: 12}} />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{fontSize: 12}} />
              <Tooltip />
              <ReferenceLine y={55} stroke={uclColor} strokeDasharray="5 5" label={{ position: 'top', value: 'LCS', fill: uclColor, fontSize: 12 }} />
              <ReferenceLine y={50} stroke={clColor} label={{ position: 'top', value: 'X̄̄', fill: clColor, fontSize: 12 }} />
              <ReferenceLine y={45} stroke={lclColor} strokeDasharray="5 5" label={{ position: 'bottom', value: 'LCI', fill: lclColor, fontSize: 12 }} />
              <Line type="monotone" dataKey="xbar" stroke={dataColor} strokeWidth={2} dot={{ r: 4 }} name="Media (X̄)" />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="sample" tick={{fontSize: 12}} />
              <YAxis domain={[0, 'dataMax + 2']} tick={{fontSize: 12}} />
              <Tooltip />
              <ReferenceLine y={10} stroke={uclColor} strokeDasharray="5 5" label={{ position: 'top', value: 'LCS', fill: uclColor, fontSize: 12 }} />
              <ReferenceLine y={5} stroke={clColor} label={{ position: 'top', value: 'R̄', fill: clColor, fontSize: 12 }} />
              <ReferenceLine y={0} stroke={lclColor} strokeDasharray="5 5" label={{ position: 'bottom', value: 'LCI', fill: lclColor, fontSize: 12 }} />
              <Line type="monotone" dataKey="r" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="Rango (R)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'xbar-s':
      return (
        <div className="grid grid-rows-2 h-full gap-4 p-4 w-full min-h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="sample" tick={{fontSize: 12}} />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{fontSize: 12}} />
              <Tooltip />
              <ReferenceLine y={55} stroke={uclColor} strokeDasharray="5 5" label={{ position: 'top', value: 'LCS', fill: uclColor, fontSize: 12 }} />
              <ReferenceLine y={50} stroke={clColor} label={{ position: 'top', value: 'X̄̄', fill: clColor, fontSize: 12 }} />
              <ReferenceLine y={45} stroke={lclColor} strokeDasharray="5 5" label={{ position: 'bottom', value: 'LCI', fill: lclColor, fontSize: 12 }} />
              <Line type="monotone" dataKey="xbar" stroke={dataColor} strokeWidth={2} dot={{ r: 4 }} name="Media (X̄)" />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="sample" tick={{fontSize: 12}} />
              <YAxis domain={[0, 'dataMax + 1']} tick={{fontSize: 12}} />
              <Tooltip />
              <ReferenceLine y={6} stroke={uclColor} strokeDasharray="5 5" label={{ position: 'top', value: 'LCS', fill: uclColor, fontSize: 12 }} />
              <ReferenceLine y={3} stroke={clColor} label={{ position: 'top', value: 'S̄', fill: clColor, fontSize: 12 }} />
              <ReferenceLine y={0} stroke={lclColor} strokeDasharray="5 5" label={{ position: 'bottom', value: 'LCI', fill: lclColor, fontSize: 12 }} />
              <Line type="monotone" dataKey="s" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} name="Desviación Estándar (S)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'i-mr':
      return (
        <div className="grid grid-rows-2 h-full gap-4 p-4 w-full min-h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="sample" tick={{fontSize: 12}} />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} tick={{fontSize: 12}} />
              <Tooltip />
              <ReferenceLine y={120} stroke={uclColor} strokeDasharray="5 5" label={{ position: 'top', value: 'LCS', fill: uclColor, fontSize: 12 }} />
              <ReferenceLine y={100} stroke={clColor} label={{ position: 'top', value: 'Ī', fill: clColor, fontSize: 12 }} />
              <ReferenceLine y={80} stroke={lclColor} strokeDasharray="5 5" label={{ position: 'bottom', value: 'LCI', fill: lclColor, fontSize: 12 }} />
              <Line type="linear" dataKey="iVal" stroke={dataColor} strokeWidth={2} dot={{ r: 4 }} name="Valor Individual (I)" />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="sample" tick={{fontSize: 12}} />
              <YAxis domain={[0, 'dataMax + 5']} tick={{fontSize: 12}} />
              <Tooltip />
              <ReferenceLine y={15} stroke={uclColor} strokeDasharray="5 5" label={{ position: 'top', value: 'LCS', fill: uclColor, fontSize: 12 }} />
              <ReferenceLine y={7.5} stroke={clColor} label={{ position: 'top', value: 'MR̄', fill: clColor, fontSize: 12 }} />
              <Line type="stepAfter" dataKey="mr" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Rango Móvil (MR)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'comparison':
      return (
        <div className="grid items-center h-full p-6 w-full overflow-auto">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr] border border-slate-300 rounded-lg overflow-hidden w-full text-sm">
            {/* Table Header */}
            <div className="bg-slate-800 text-white p-3 font-bold">Gráfico</div>
            <div className="bg-slate-800 text-white p-3 font-bold border-l border-slate-600">Tamaño de Muestra (n)</div>
            <div className="bg-slate-800 text-white p-3 font-bold border-l border-slate-600">Medida de Dispersión</div>
            <div className="bg-slate-800 text-white p-3 font-bold border-l border-slate-600">Uso Típico</div>
            
            {/* Row 1 */}
            <div className="p-4 font-bold bg-blue-50 text-blue-900 border-t border-slate-300">X̄ – R</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Pequeñas (n ≤ 10)</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Rango (Max - Min)</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Producción en masa, fácil cálculo manual.</div>
            
            {/* Row 2 */}
            <div className="p-4 font-bold bg-pink-50 text-pink-900 border-t border-slate-300">X̄ – S</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Grandes (n &gt; 10)</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Desviación Estándar (S)</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Sistemas automatizados, alta sensibilidad a la variabilidad.</div>
            
            {/* Row 3 */}
            <div className="p-4 font-bold bg-amber-50 text-amber-900 border-t border-slate-300">I – MR</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Individuales (n = 1)</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Rango Móvil (MR)</div>
            <div className="p-4 bg-white border-t border-l border-slate-300">Procesos lentos, lotes únicos, variables químicas/físicas.</div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

// 3. Main Layout Component
const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTab, setActiveTab }) => {
  const currentTabContent = tabs.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 grid grid-rows-[auto_auto_1fr] font-sans text-slate-800">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6 shadow-md grid grid-cols-[1fr_auto] items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">Control Estadístico de Procesos (CEP)</p>
        </div>
        <nav className="text-sm font-medium px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
          Módulo: Visualización de Datos
        </nav>
      </header>

      {/* Navigation Tabs (CSS Grid Strictly) */}
      <div className="bg-white border-b border-slate-200 px-6 py-0 grid grid-cols-2 md:grid-cols-5 gap-2 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-semibold text-center border-b-2 transition-colors grid place-content-center ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="p-6 h-full">
        {currentTabContent && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-start">
            
            {/* Left Panel: Content & Explanations */}
            <Card className="h-full">
              <div className="p-8 grid gap-6 grid-rows-[auto_1fr]">
                <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-4">
                  {currentTabContent.title}
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4">
                  {currentTabContent.content}
                </div>
              </div>
            </Card>

            {/* Right Panel: Diagram Rendering */}
            <Card className="h-full bg-slate-50 grid grid-rows-[auto_auto_1fr]">
              <div className="p-6 border-b border-slate-200 bg-white">
                <h3 className="text-lg font-bold text-slate-800">
                  {currentTabContent.diagramTitle}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {currentTabContent.diagramDescription}
                </p>
              </div>
              <div className="p-4 grid place-items-center w-full h-full min-h-[400px]">
                 <DiagramRender type={currentTabContent.diagramType} />
              </div>
            </Card>

          </div>
        )}
      </main>
    </div>
  );
};

// --- CONTENT DEFINITION ---

const lessonData: TabData[] = [
  {
    id: 'tab-intro',
    title: 'Introducción a Variables',
    diagramTitle: 'Medición de Datos por Variables',
    diagramDescription: 'Ejemplos conceptuales de la recolección de variables continuas.',
    diagramType: 'intro',
    content: (
      <>
        <p>
          Los <strong>datos por variables</strong> son mediciones numéricas continuas obtenidas de un proceso 
          (por ejemplo: peso, longitud, temperatura). Permiten analizar la variabilidad y el comportamiento del 
          proceso con mayor precisión que los datos por atributos.
        </p>
        <h4 className="font-bold text-slate-800 mt-6 mb-2">Propósito de los Diagramas</h4>
        <p>
          Los diagramas de control para variables permiten monitorear la <strong>estabilidad</strong> de un proceso 
          a lo largo del tiempo. Su principal utilidad es identificar:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
          <li><strong>Variaciones Comunes:</strong> Naturales e inherentes al proceso.</li>
          <li><strong>Variaciones Especiales:</strong> Anómalas o atribuibles a causas externas que requieren corrección.</li>
        </ul>
      </>
    )
  },
  {
    id: 'tab-xbar-r',
    title: 'Gráfico X̄ – R',
    diagramTitle: 'Diagrama de Medias y Rangos (X̄ – R)',
    diagramDescription: 'Gráficos apilados mostrando medias (arriba) y rangos (abajo).',
    diagramType: 'xbar-r',
    content: (
      <>
        <p>
          El gráfico <strong>X̄ – R</strong> se utiliza para analizar procesos con muestras pequeñas (generalmente <span className="font-mono text-xs bg-slate-100 p-1 rounded">n ≤ 10</span>).
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 bg-blue-50 p-4 rounded-lg mt-4 text-sm border border-blue-100">
          <span className="font-bold text-blue-800">X̄ :</span>
          <span className="text-blue-900">Media de cada subgrupo.</span>
          <span className="font-bold text-blue-800">R :</span>
          <span className="text-blue-900">Rango (diferencia entre valor máximo y mínimo del subgrupo).</span>
        </div>
        <h4 className="font-bold text-slate-800 mt-6 mb-2">Cálculo Paso a Paso</h4>
        <div className="grid gap-3 text-sm">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">1</span>
            <div>Dividir los datos en subgrupos de tamaño n.</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">2</span>
            <div>
              Calcular la media y el rango:<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">X̄ᵢ = (ΣX) / n</code>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">Rᵢ = X_max - X_min</code>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">3</span>
            <div>
              Calcular Límites de Control (Para X̄):<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCS = X̄̄ + A₂R̄</code>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCI = X̄̄ - A₂R̄</code>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">4</span>
            <div>
              Para R:<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCS = D₄R̄ &nbsp;&nbsp;|&nbsp;&nbsp; LCI = D₃R̄</code>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'tab-xbar-s',
    title: 'Gráfico X̄ – S',
    diagramTitle: 'Diagrama de Medias y Desviación (X̄ – S)',
    diagramDescription: 'Gráfico priorizado para subgrupos grandes usando desviación estándar.',
    diagramType: 'xbar-s',
    content: (
      <>
        <p>
          El gráfico <strong>X̄ – S</strong> se utiliza cuando los subgrupos son más grandes (<span className="font-mono text-xs bg-slate-100 p-1 rounded">n &gt; 10</span>).
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 bg-pink-50 p-4 rounded-lg mt-4 text-sm border border-pink-100">
          <span className="font-bold text-pink-800">S :</span>
          <span className="text-pink-900">Desviación estándar del subgrupo, mide la dispersión de forma más precisa que el rango.</span>
        </div>
        <h4 className="font-bold text-slate-800 mt-6 mb-2">Cálculo Paso a Paso</h4>
        <div className="grid gap-3 text-sm">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">1</span>
            <div>Calcular la media de cada subgrupo.</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">2</span>
            <div>
              Calcular la desviación estándar (S):<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">
                Sᵢ = √[ Σ(X - X̄)² / (n - 1) ]
              </code>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">3</span>
            <div>
              Calcular Límites de Control (Para X̄):<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCS = X̄̄ + A₃S̄</code>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCI = X̄̄ - A₃S̄</code>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">4</span>
            <div>
              Para S:<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCS = B₄S̄ &nbsp;&nbsp;|&nbsp;&nbsp; LCI = B₃S̄</code>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'tab-i-mr',
    title: 'Gráfico I – MR',
    diagramTitle: 'Diagrama Individual y Rango Móvil',
    diagramDescription: 'Valores individuales consecutivos monitoreando la variación entre puntos.',
    diagramType: 'i-mr',
    content: (
      <>
        <p>
          El gráfico <strong>I-MR</strong> se utiliza cuando <strong>no es posible formar subgrupos</strong> (datos de una sola observación a la vez).
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 bg-amber-50 p-4 rounded-lg mt-4 text-sm border border-amber-100">
          <span className="font-bold text-amber-800">I :</span>
          <span className="text-amber-900">Valores individuales registrados (n=1).</span>
          <span className="font-bold text-amber-800">MR :</span>
          <span className="text-amber-900">Rango Móvil (diferencia absoluta entre observaciones consecutivas).</span>
        </div>
        <h4 className="font-bold text-slate-800 mt-6 mb-2">Cálculo Paso a Paso</h4>
        <div className="grid gap-3 text-sm">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">1</span>
            <div>Registrar los valores individuales Xᵢ.</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">2</span>
            <div>
              Calcular el Rango Móvil (MR):<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">
                MRᵢ = |Xᵢ - Xᵢ₋₁|
              </code>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">3</span>
            <div>
              Límites de Control (Para I):<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCS = Ī + 3(MR̄ / d₂)</code>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCI = Ī - 3(MR̄ / d₂)</code>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <span className="bg-slate-200 text-slate-700 w-6 h-6 grid place-content-center rounded-full font-bold text-xs">4</span>
            <div>
              Para MR:<br/>
              <code className="block mt-1 bg-white border border-slate-200 p-2 rounded text-xs font-mono">LCS = D₄MR̄ &nbsp;&nbsp;|&nbsp;&nbsp; LCI = D₃MR̄</code>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'tab-comparison',
    title: 'Comparación',
    diagramTitle: 'Matriz de Decisión de Gráficos',
    diagramDescription: 'Tabla comparativa para la selección adecuada de diagramas por variables.',
    diagramType: 'comparison',
    content: (
      <>
        <p>
          Seleccionar el gráfico de control adecuado depende críticamente del <strong>tamaño de la muestra</strong> y de cómo se agrupan los datos provenientes del proceso.
        </p>
        <div className="grid grid-rows-[auto_auto_auto] gap-4 mt-6">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-center border-l-4 border-blue-500 pl-4">
            <div className="font-bold text-blue-700 text-lg">X̄–R</div>
            <div className="text-sm text-slate-600">Ideal para muestras pequeñas, cálculo rápido en piso de producción.</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-center border-l-4 border-pink-500 pl-4">
            <div className="font-bold text-pink-700 text-lg">X̄–S</div>
            <div className="text-sm text-slate-600">Mayor precisión estadística al manejar muestras grandes; usa toda la varianza de los datos.</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-center border-l-4 border-amber-500 pl-4">
            <div className="font-bold text-amber-700 text-lg">I-MR</div>
            <div className="text-sm text-slate-600">Útil cuando el proceso obliga a inspeccionar elemento por elemento de forma aislada.</div>
          </div>
        </div>
      </>
    )
  }
];

// --- APP ROOT ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(lessonData[0].id);

  return (
    <LessonLayout
      title="Gráficos de Control por Variables"
      tabs={lessonData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}