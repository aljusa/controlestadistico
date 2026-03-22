import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Activity, Ruler, Scale, Thermometer, GitCommit, GitPullRequest } from 'lucide-react';

// --- TIPOS E INTERFACES ---

interface TabProps {
  id: string;
  title: string;
}

interface DiagramProps {
  type: 'intro' | 'xbar-r' | 'xbar-s' | 'imr' | 'comparison';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// --- DATOS SIMULADOS PARA GRÁFICOS ---

const mockControlData = [
  { sample: '1', value: 10.1, ucl: 11, lcl: 9, cl: 10 },
  { sample: '2', value: 10.4, ucl: 11, lcl: 9, cl: 10 },
  { sample: '3', value: 9.8, ucl: 11, lcl: 9, cl: 10 },
  { sample: '4', value: 11.2, ucl: 11, lcl: 9, cl: 10 }, // Out of control
  { sample: '5', value: 10.0, ucl: 11, lcl: 9, cl: 10 },
  { sample: '6', value: 9.5, ucl: 11, lcl: 9, cl: 10 },
  { sample: '7', value: 10.3, ucl: 11, lcl: 9, cl: 10 },
];

const mockXRData = {
  means: [
    { s: '1', xbar: 50.2, ucl: 52, lcl: 48, cl: 50 },
    { s: '2', xbar: 51.1, ucl: 52, lcl: 48, cl: 50 },
    { s: '3', xbar: 49.5, ucl: 52, lcl: 48, cl: 50 },
    { s: '4', xbar: 50.8, ucl: 52, lcl: 48, cl: 50 },
    { s: '5', xbar: 48.9, ucl: 52, lcl: 48, cl: 50 },
  ],
  ranges: [
    { s: '1', r: 3.2, ucl: 5, lcl: 0, cl: 2.5 },
    { s: '2', r: 2.8, ucl: 5, lcl: 0, cl: 2.5 },
    { s: '3', r: 4.1, ucl: 5, lcl: 0, cl: 2.5 },
    { s: '4', r: 1.5, ucl: 5, lcl: 0, cl: 2.5 },
    { s: '5', r: 2.2, ucl: 5, lcl: 0, cl: 2.5 },
  ]
};

const mockIMRData = {
  individuals: [
    { id: '1', i: 100, ucl: 110, lcl: 90, cl: 100 },
    { id: '2', i: 105, ucl: 110, lcl: 90, cl: 100 },
    { id: '3', i: 98, ucl: 110, lcl: 90, cl: 100 },
    { id: '4', i: 102, ucl: 110, lcl: 90, cl: 100 },
    { id: '5', i: 108, ucl: 110, lcl: 90, cl: 100 },
  ],
  movingRanges: [
    { id: '1', mr: null, ucl: 12, lcl: 0, cl: 5 },
    { id: '2', mr: 5, ucl: 12, lcl: 0, cl: 5 },
    { id: '3', mr: 7, ucl: 12, lcl: 0, cl: 5 },
    { id: '4', mr: 4, ucl: 12, lcl: 0, cl: 5 },
    { id: '5', mr: 6, ucl: 12, lcl: 0, cl: 5 },
  ]
};

// --- COMPONENTES AUXILIARES ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid gap-4 bg-white p-6 rounded-xl shadow-md border border-slate-200 ${className}`}>
    {children}
  </div>
);

const FormulaBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid items-center bg-slate-800 text-emerald-400 font-mono p-4 rounded-lg overflow-x-auto shadow-inner text-sm sm:text-base">
    {children}
  </div>
);

// --- COMPONENTE DE RENDERIZADO DE DIAGRAMAS ---

const DiagramRender: React.FC<DiagramProps> = ({ type }) => {
  switch (type) {
    case 'intro':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          <div className="grid grid-cols-3 gap-4 justify-items-center bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="grid gap-2 justify-items-center text-slate-600">
              <Ruler size={48} className="text-blue-500" />
              <span className="font-semibold">Longitud</span>
              <span className="text-xs font-mono bg-blue-100 px-2 py-1 rounded">12.5 cm</span>
            </div>
            <div className="grid gap-2 justify-items-center text-slate-600">
              <Scale size={48} className="text-emerald-500" />
              <span className="font-semibold">Peso</span>
              <span className="text-xs font-mono bg-emerald-100 px-2 py-1 rounded">1.04 kg</span>
            </div>
            <div className="grid gap-2 justify-items-center text-slate-600">
              <Thermometer size={48} className="text-rose-500" />
              <span className="font-semibold">Temp.</span>
              <span className="text-xs font-mono bg-rose-100 px-2 py-1 rounded">98.6 °C</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockControlData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="sample" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <ReferenceLine y={11} stroke="red" strokeDasharray="3 3" label="LCS" />
                <ReferenceLine y={10} stroke="green" label="Línea Central" />
                <ReferenceLine y={9} stroke="red" strokeDasharray="3 3" label="LCI" />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    
    case 'xbar-r':
    case 'xbar-s': // Using similar visual structure for X-S as requested
      const secondChartData = type === 'xbar-r' ? mockXRData.ranges : mockXRData.ranges; // Mocking S with R structure for simplicity
      const secondChartKey = type === 'xbar-r' ? 'r' : 'r'; // Would be 's' in real data
      const titleMain = "Gráfico de Medias (X̄)";
      const titleSub = type === 'xbar-r' ? "Gráfico de Rangos (R)" : "Gráfico de Desviación (S)";

      return (
        <div className="grid grid-rows-2 gap-6 h-96 w-full">
          <div className="grid grid-rows-[auto_1fr] h-full">
             <h4 className="text-sm font-semibold text-slate-500 text-center">{titleMain}</h4>
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockXRData.means} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="s" hide />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip />
                <ReferenceLine y={52} stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={50} stroke="#22c55e" />
                <ReferenceLine y={48} stroke="#ef4444" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="xbar" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-rows-[auto_1fr] h-full">
             <h4 className="text-sm font-semibold text-slate-500 text-center">{titleSub}</h4>
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={secondChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="s" />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={5} stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={2.5} stroke="#22c55e" />
                <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
                <Line type="monotone" dataKey={secondChartKey} stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

    case 'imr':
      return (
        <div className="grid grid-rows-2 gap-6 h-96 w-full">
          <div className="grid grid-rows-[auto_1fr] h-full">
             <h4 className="text-sm font-semibold text-slate-500 text-center">Valores Individuales (I)</h4>
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockIMRData.individuals} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" hide />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip />
                <ReferenceLine y={110} stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={100} stroke="#22c55e" />
                <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="3 3" />
                <Line type="linear" dataKey="i" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-rows-[auto_1fr] h-full">
             <h4 className="text-sm font-semibold text-slate-500 text-center">Rango Móvil (MR)</h4>
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockIMRData.movingRanges} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={12} stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={5} stroke="#22c55e" />
                <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
                <Line type="stepAfter" dataKey="mr" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

    case 'comparison':
      return (
        <div className="grid grid-cols-1 overflow-x-auto w-full">
           <div className="grid grid-cols-4 bg-slate-800 text-white font-semibold p-4 rounded-t-lg">
              <div>Tipo de Gráfico</div>
              <div>Tamaño Muestra (n)</div>
              <div>Medida Dispersión</div>
              <div>Uso Típico</div>
           </div>
           <div className="grid grid-cols-4 bg-white border-b border-slate-200 p-4 items-center">
              <div className="font-bold text-slate-700">X̄ – R</div>
              <div>n ≤ 10</div>
              <div>Rango (R)</div>
              <div>Procesos de manufactura con muestreo pequeño y constante.</div>
           </div>
           <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 p-4 items-center">
              <div className="font-bold text-slate-700">X̄ – S</div>
              <div>n &gt; 10</div>
              <div>Desviación Estándar (S)</div>
              <div>Procesos automatizados con alta frecuencia de recolección de datos.</div>
           </div>
           <div className="grid grid-cols-4 bg-white border-b border-slate-200 p-4 items-center rounded-b-lg">
              <div className="font-bold text-slate-700">I – MR</div>
              <div>n = 1</div>
              <div>Rango Móvil (MR)</div>
              <div>Procesos lentos, destructivos, administrativos o químicos continuos.</div>
           </div>
        </div>
      );

    default:
      return <div>Visualización no encontrada</div>;
  }
};

// --- ESTRUCTURA PRINCIPAL (LAYOUT) ---

export default function App() {
  const tabs: TabProps[] = [
    { id: 'intro', title: 'Introducción' },
    { id: 'xbar-r', title: 'Gráfico X̄–R' },
    { id: 'xbar-s', title: 'Gráfico X̄–S' },
    { id: 'imr', title: 'Gráfico I-MR' },
    { id: 'comparison', title: 'Comparativa' }
  ];

  const [activeTab, setActiveTab] = useState<string>('intro');

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* Header (Title & Nav) */}
      <header className="grid gap-6 bg-slate-900 text-white p-6 shadow-lg z-10">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <Activity size={32} className="text-emerald-400" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Diagramas de Control para Variables
          </h1>
        </div>
        
        <nav className="grid grid-cols-2 md:grid-cols-5 gap-2" aria-label="Navegación de la lección">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`grid place-items-center py-3 px-4 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-900 shadow-md transform scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area (Panels) */}
      <main className="grid p-4 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto items-start align-start">
        
        {/* TAB 1: INTRODUCCIÓN */}
        {activeTab === 'intro' && (
          <div className="grid gap-6 animate-fadeIn">
            <Card>
              <h2 className="text-2xl font-bold text-slate-800 mb-2 border-b pb-2">Datos por Variables</h2>
              <p className="text-slate-600 leading-relaxed">
                Los datos por variables son mediciones numéricas continuas obtenidas de un proceso (por ejemplo: peso, longitud, temperatura). Permiten analizar la variabilidad y el comportamiento del proceso con mayor precisión que los datos por atributos.
              </p>
            </Card>

            <Card>
               <h2 className="text-2xl font-bold text-slate-800 mb-2 border-b pb-2">Propósito de los Diagramas</h2>
               <p className="text-slate-600 leading-relaxed mb-6">
                Permiten monitorear la estabilidad de un proceso a lo largo del tiempo, identificando variaciones comunes (naturales) y especiales (anómalas).
               </p>
               
               {/* DIAGRAM RENDER COMPONENT */}
               <div className="grid gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                 <h3 className="font-bold text-slate-700">Concepto Visual: Medición y Control</h3>
                 <p className="text-sm text-slate-500">Ejemplo de variables continuas y un gráfico de control genérico identificando causas especiales.</p>
                 <DiagramRender type="intro" />
               </div>
            </Card>
          </div>
        )}

        {/* TAB 2: GRÁFICO X-BAR R */}
        {activeTab === 'xbar-r' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fadeIn">
            <div className="grid gap-6 content-start">
              <Card>
                <h2 className="text-2xl font-bold text-slate-800 mb-2 border-b pb-2">Gráfico X̄ – R</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  El gráfico X̄ – R se utiliza para analizar procesos con muestras pequeñas (generalmente n ≤ 10).
                </p>
                <ul className="grid gap-2 text-slate-700 list-disc list-inside">
                  <li><strong>X̄:</strong> media de cada subgrupo.</li>
                  <li><strong>R:</strong> rango (diferencia entre valor máximo y mínimo del subgrupo).</li>
                </ul>
              </Card>

              <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Procedimiento de Cálculo</h2>
                <div className="grid gap-4 text-slate-700">
                  <div className="grid gap-1">
                    <span className="font-semibold">1. Media del subgrupo:</span>
                    <FormulaBlock>X̄_i = ΣX / n</FormulaBlock>
                  </div>
                  <div className="grid gap-1">
                    <span className="font-semibold">2. Rango del subgrupo:</span>
                    <FormulaBlock>R_i = X_max - X_min</FormulaBlock>
                  </div>
                  <div className="grid gap-1">
                    <span className="font-semibold">3. Promedios Globales:</span>
                    <FormulaBlock>X̿ = Promedio de X̄ | R̄ = Promedio de R</FormulaBlock>
                  </div>
                  <div className="grid gap-2 border-t pt-4 mt-2">
                    <span className="font-semibold text-rose-600">Límites para X̄:</span>
                    <FormulaBlock>LCS = X̿ + A₂R̄</FormulaBlock>
                    <FormulaBlock>LCI = X̿ - A₂R̄</FormulaBlock>
                  </div>
                  <div className="grid gap-2">
                    <span className="font-semibold text-rose-600">Límites para R:</span>
                    <FormulaBlock>LCS = D₄R̄ | LCI = D₃R̄</FormulaBlock>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="content-start">
              <h3 className="font-bold text-slate-800 text-lg">Visualización X̄ – R</h3>
              <p className="text-sm text-slate-500 mb-4">Distribución apilada de medias y rangos conectados en el tiempo.</p>
              <DiagramRender type="xbar-r" />
            </Card>
          </div>
        )}

        {/* TAB 3: GRÁFICO X-BAR S */}
        {activeTab === 'xbar-s' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fadeIn">
            <div className="grid gap-6 content-start">
              <Card>
                <h2 className="text-2xl font-bold text-slate-800 mb-2 border-b pb-2">Gráfico X̄ – S</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Se utiliza cuando los subgrupos son más grandes (n &gt; 10).
                </p>
                <ul className="grid gap-2 text-slate-700 list-disc list-inside">
                  <li><strong>S:</strong> desviación estándar del subgrupo, que mide la dispersión de forma más precisa que el rango.</li>
                </ul>
              </Card>

              <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Procedimiento de Cálculo</h2>
                <div className="grid gap-4 text-slate-700">
                  <div className="grid gap-1 bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                       <GitPullRequest className="text-blue-500" size={20}/>
                       <span>Paso 1: Formar subgrupos (n &gt; 10) y calcular media X̄_i</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-1">
                    <span className="font-semibold">2. Desviación estándar del subgrupo:</span>
                    <FormulaBlock>S_i = √ [ Σ(X - X̄)² / (n-1) ]</FormulaBlock>
                  </div>
                  
                  <div className="grid gap-1">
                    <span className="font-semibold">3. Promedios Globales:</span>
                    <FormulaBlock>X̿ (Gran Promedio) | S̄ (Promedio de S)</FormulaBlock>
                  </div>

                  <div className="grid gap-2 border-t pt-4 mt-2">
                    <span className="font-semibold text-rose-600">Límites para X̄:</span>
                    <FormulaBlock>LCS = X̿ + A₃S̄</FormulaBlock>
                    <FormulaBlock>LCI = X̿ - A₃S̄</FormulaBlock>
                  </div>
                  <div className="grid gap-2">
                    <span className="font-semibold text-rose-600">Límites para S:</span>
                    <FormulaBlock>LCS = B₄S̄ | LCI = B₃S̄</FormulaBlock>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="content-start">
              <h3 className="font-bold text-slate-800 text-lg">Visualización X̄ – S</h3>
              <p className="text-sm text-slate-500 mb-4">Gráfico de medias apoyado por el análisis estricto de la desviación estándar.</p>
              <DiagramRender type="xbar-s" />
            </Card>
          </div>
        )}

        {/* TAB 4: GRÁFICO I-MR */}
        {activeTab === 'imr' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fadeIn">
            <div className="grid gap-6 content-start">
              <Card>
                <h2 className="text-2xl font-bold text-slate-800 mb-2 border-b pb-2">Gráfico Individual (I-MR)</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  El gráfico I-MR se utiliza cuando no es posible formar subgrupos (datos individuales).
                </p>
                <ul className="grid gap-2 text-slate-700 list-disc list-inside">
                  <li><strong>I:</strong> valores individuales.</li>
                  <li><strong>MR:</strong> rango móvil entre observaciones consecutivas.</li>
                </ul>
              </Card>

              <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Procedimiento de Cálculo</h2>
                <div className="grid gap-4 text-slate-700">
                  <div className="grid gap-1 bg-slate-50 p-3 rounded border border-slate-200">
                    <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                       <GitCommit className="text-fuchsia-500" size={20}/>
                       <span>Registrar valores individuales X_i en el tiempo.</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-1">
                    <span className="font-semibold">1. Rango Móvil:</span>
                    <FormulaBlock>MR_i = | X_i - X_i-1 |</FormulaBlock>
                  </div>
                  
                  <div className="grid gap-1">
                    <span className="font-semibold">2. Promedios:</span>
                    <FormulaBlock>X̄ (Promedio Individual) | MR̄ (Promedio Rango Móvil)</FormulaBlock>
                  </div>

                  <div className="grid gap-2 border-t pt-4 mt-2">
                    <span className="font-semibold text-rose-600">Límites para I:</span>
                    <FormulaBlock>LCS = X̄ + 3(MR̄ / d₂)</FormulaBlock>
                    <FormulaBlock>LCI = X̄ - 3(MR̄ / d₂)</FormulaBlock>
                  </div>
                  <div className="grid gap-2">
                    <span className="font-semibold text-rose-600">Límites para MR:</span>
                    <FormulaBlock>LCS = D₄MR̄ | LCI = D₃MR̄</FormulaBlock>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="content-start">
              <h3 className="font-bold text-slate-800 text-lg">Visualización I-MR</h3>
              <p className="text-sm text-slate-500 mb-4">Puntos individuales contrastados con la diferencia de salto (rango móvil).</p>
              <DiagramRender type="imr" />
            </Card>
          </div>
        )}

        {/* TAB 5: COMPARACIÓN */}
        {activeTab === 'comparison' && (
          <div className="grid gap-6 animate-fadeIn">
            <Card>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Comparación de Gráficos</h2>
              <p className="text-slate-600 mb-6">
                Seleccionar el gráfico de control adecuado depende fundamentalmente de la disponibilidad de datos y la capacidad de agruparlos lógicamente en el tiempo.
              </p>
              
              <div className="grid overflow-x-auto shadow-sm border border-slate-200 rounded-lg">
                <DiagramRender type="comparison" />
              </div>
            </Card>
          </div>
        )}

      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}