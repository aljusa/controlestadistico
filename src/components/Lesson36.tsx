import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ReferenceLine, ResponsiveContainer, ComposedChart, Bar 
} from 'recharts';
import { BookOpen, TrendingUp, AlertTriangle, CheckCircle, Code, AlignCenter, Map } from 'lucide-react';

// --- DATA GENERATION PARA GRÁFICOS ---
const generateData = () => {
  const data = [];
  for (let x = 10; x <= 90; x += 1) {
    // Distribución Normal Centrada (Media = 50, Desviación = 6)
    const zCentered = (x - 50) / 6;
    const normalCentered = Math.exp(-0.5 * zCentered * zCentered) * 100;

    // Distribución Normal Desplazada (Media = 65, Desviación = 6)
    const zShifted = (x - 65) / 6;
    const normalShifted = Math.exp(-0.5 * zShifted * zShifted) * 100;

    // Distribución Sesgada (Aproximación para fines visuales)
    const skewed = x > 20 ? (Math.pow(x - 20, 2) * Math.exp(-(x - 20) / 5) * 4) : 0;

    data.push({ x, normalCentered, normalShifted, skewed });
  }
  return data;
};

const generateHistogramData = () => {
  // Datos simulados similares a rnorm(100, 52, 4) agrupados en bins
  const bins = [
    { x: 42, count: 2, curve: 5 },
    { x: 46, count: 10, curve: 25 },
    { x: 50, count: 35, curve: 45 },
    { x: 54, count: 30, curve: 40 },
    { x: 58, count: 18, curve: 20 },
    { x: 62, count: 5, curve: 5 }
  ];
  return bins;
};

const chartData = generateData();
const histogramData = generateHistogramData();

// --- COMPONENTES VISUALES ---

const Section = ({ title, icon: Icon, children }) => (
  <section className="mb-16 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-3">
      <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    </div>
    <div className="p-6 md:p-8">
      {children}
    </div>
  </section>
);

const VisualContainer = ({ children, caption }) => (
  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 h-full flex flex-col justify-center">
    <div className="h-64 w-full">
      {children}
    </div>
    {caption && <p className="text-center text-sm text-slate-500 mt-4 italic">{caption}</p>}
  </div>
);

const Formula = ({ equation }) => (
  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 my-6 text-center shadow-inner">
    <code className="text-xl md:text-2xl font-mono text-indigo-900 font-semibold">{equation}</code>
  </div>
);

// --- COMPONENTE PRINCIPAL APP ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-8">
      
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Índices de Capacidad del Proceso
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Una guía interactiva para comprender cómo evaluar el cumplimiento de las especificaciones mediante la variabilidad y el centrado.
        </p>
      </header>

      <div className="max-w-5xl mx-auto">

        {/* 1. Introducción */}
        <Section title="Introducción" icon={BookOpen}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-4">
                Los índices de capacidad del proceso permiten cuantificar qué tan bien un proceso cumple con los límites de especificación. 
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Entre los más utilizados se encuentran <strong>Cp</strong> y <strong>Cpk</strong>, que evalúan la variabilidad y el centrado del proceso en relación a los límites establecidos por el cliente o el diseño.
              </p>
            </div>
            <VisualContainer caption="Distribución normal con media del proceso y límites de especificación (LSL y USL).">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="x" type="number" domain={[10, 90]} tick={false} />
                  <YAxis tick={false} />
                  <Tooltip formatter={(val) => val.toFixed(2)} labelFormatter={() => ''} />
                  <ReferenceLine x={32} stroke="#ef4444" strokeWidth={2} label={{ position: 'top', value: 'LSL', fill: '#ef4444' }} />
                  <ReferenceLine x={68} stroke="#ef4444" strokeWidth={2} label={{ position: 'top', value: 'USL', fill: '#ef4444' }} />
                  <ReferenceLine x={50} stroke="#4f46e5" strokeDasharray="3 3" label={{ position: 'top', value: 'Media (μ)', fill: '#4f46e5' }} />
                  <Area type="monotone" dataKey="normalCentered" stroke="#4f46e5" fill="#c7d2fe" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </VisualContainer>
          </div>
        </Section>

        {/* 2. Cp */}
        <Section title="Uso e interpretación de Cp" icon={TrendingUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <VisualContainer caption="Igual dispersión (Cp igual), pero diferente relación con los límites por falta de centrado.">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                    <XAxis dataKey="x" type="number" domain={[10, 90]} tick={false} />
                    <YAxis tick={false} />
                    <Tooltip />
                    <ReferenceLine x={32} stroke="#ef4444" />
                    <ReferenceLine x={68} stroke="#ef4444" />
                    <Line type="monotone" dataKey="normalCentered" stroke="#10b981" strokeWidth={3} dot={false} name="Proceso 1" />
                    <Line type="monotone" dataKey="normalShifted" stroke="#f59e0b" strokeWidth={3} dot={false} name="Proceso 2" />
                  </LineChart>
                </ResponsiveContainer>
              </VisualContainer>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-lg leading-relaxed mb-4">
                El índice <strong>Cp</strong> mide la capacidad potencial del proceso, comparando el ancho de las especificaciones (USL - LSL) con la variabilidad inherente del proceso (6σ).
              </p>
              <Formula equation="Cp = (USL - LSL) / 6σ" />
              <p className="text-lg leading-relaxed text-slate-600">
                <strong>Limitación clave:</strong> No considera si el proceso está centrado. Un valor de Cp mayor a 1 indica que el proceso <em>podría</em> cumplir con las especificaciones, siempre y cuando esté perfectamente centrado.
              </p>
            </div>
          </div>
        </Section>

        {/* 3. Cpk */}
        <Section title="Capacidad en procesos descentrados" icon={AlignCenter}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-4">
                Cuando el proceso no está centrado, se utiliza el índice <strong>Cpk</strong>. Este indicador sí considera la distancia desde la media del proceso hasta los límites de especificación más cercanos.
              </p>
              <Formula equation="Cpk = min[ (USL - μ)/3σ , (μ - LSL)/3σ ]" />
              <p className="text-lg leading-relaxed text-slate-600">
                El Cpk permite detectar si el proceso está sesgado hacia uno de los límites. Si el proceso está exactamente en el centro, Cp y Cpk serán iguales. Si el Cpk es mucho menor que el Cp, indica una gran oportunidad de mejora mediante el centrado.
              </p>
            </div>
            <VisualContainer caption="Distribución desplazada: El Cpk disminuye drásticamente debido a la proximidad al USL.">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="x" type="number" domain={[10, 90]} tick={false} />
                  <YAxis tick={false} />
                  <ReferenceLine x={32} stroke="#ef4444" label="LSL" />
                  <ReferenceLine x={80} stroke="#ef4444" label="USL" />
                  <ReferenceLine x={65} stroke="#f59e0b" strokeDasharray="3 3" label="Media" />
                  <Area type="monotone" dataKey="normalShifted" stroke="#f59e0b" fill="#fef3c7" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </VisualContainer>
          </div>
        </Section>

        {/* 4. Normalidad */}
        <Section title="Normalidad y capacidad del proceso" icon={AlertTriangle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <VisualContainer caption="Comparación: Distribución Normal (azul) vs. Distribución Sesgada (roja).">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                    <XAxis dataKey="x" type="number" domain={[10, 90]} tick={false} />
                    <YAxis tick={false} />
                    <Line type="monotone" dataKey="normalCentered" stroke="#4f46e5" strokeWidth={3} dot={false} name="Normal" />
                    <Line type="monotone" dataKey="skewed" stroke="#ef4444" strokeWidth={3} dot={false} name="Sesgada" />
                  </LineChart>
                </ResponsiveContainer>
              </VisualContainer>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-lg leading-relaxed mb-4">
                Los índices clásicos como Cp y Cpk se basan en un supuesto fundamental: <strong>los datos siguen una distribución normal</strong> (forma de campana).
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-red-800 font-medium">
                  Si esta condición no se cumple (por ejemplo, si los datos están muy sesgados), el cálculo de probabilidades basado en +/- 3σ falla y los resultados de capacidad pueden ser sumamente engañosos.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Centrando el proceso */}
        <Section title="Centrando el proceso" icon={CheckCircle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-4">
                Un proceso bien centrado maximiza su capacidad y reduce drásticamente los defectos.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 mb-4">
                Ajustar la media del proceso (<span className="italic font-serif">μ</span>) hacia el punto objetivo (el medio entre LSL y USL) mejora el desempeño del Cpk instantáneamente, sin necesidad de invertir en reducir la variabilidad natural del sistema.
              </p>
            </div>
            <VisualContainer caption="La curva verde aprovecha el rango óptimamente; la amarilla genera defectos.">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="x" type="number" domain={[10, 90]} tick={false} />
                  <YAxis tick={false} />
                  <ReferenceLine x={32} stroke="#ef4444" />
                  <ReferenceLine x={68} stroke="#ef4444" />
                  <Area type="monotone" dataKey="normalCentered" stroke="#10b981" fill="#d1fae5" fillOpacity={0.5} name="Centrado" />
                  <Area type="monotone" dataKey="normalShifted" stroke="#f59e0b" fill="#fef3c7" fillOpacity={0.5} name="Desplazado" />
                </AreaChart>
              </ResponsiveContainer>
            </VisualContainer>
          </div>
        </Section>

        {/* 6. Intervalos de confianza */}
        <Section title="Intervalos de confianza y pruebas" icon={TrendingUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div className="order-2 md:order-1">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 h-full flex flex-col justify-center items-center">
                <div className="relative w-full max-w-sm h-24 flex items-center">
                  {/* Línea base */}
                  <div className="absolute w-full h-1 bg-slate-300 top-1/2 transform -translate-y-1/2 rounded"></div>
                  
                  {/* Intervalo */}
                  <div className="absolute h-3 bg-indigo-500 top-1/2 transform -translate-y-1/2 rounded" style={{ left: '20%', right: '20%' }}></div>
                  
                  {/* Estimación puntual */}
                  <div className="absolute w-5 h-5 bg-indigo-700 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2" style={{ left: '50%' }}></div>
                  
                  {/* Etiquetas */}
                  <div className="absolute top-14 left-[20%] transform -translate-x-1/2 text-sm font-bold text-slate-600">1.15</div>
                  <div className="absolute top-14 left-[50%] transform -translate-x-1/2 text-sm font-bold text-indigo-700">1.32 (Cpk)</div>
                  <div className="absolute top-14 left-[80%] transform -translate-x-1/2 text-sm font-bold text-slate-600">1.49</div>
                </div>
                <p className="text-center text-sm text-slate-500 mt-6 italic">
                  Representación de un intervalo de confianza al 95% para la estimación de Cpk.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-lg leading-relaxed mb-4">
                Dado que Cp y Cpk se calculan a partir de muestras, son estimadores estadísticos. Es fundamental construir <strong>intervalos de confianza</strong> para evaluar la incertidumbre asociada.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Esto nos permite ir más allá del número puntual y afirmar con rigor estadístico (ej. 95% de confianza) el rango real en el que se encuentra la capacidad del proceso.
              </p>
            </div>
          </div>
        </Section>

        {/* 7. Ejemplo en R */}
        <Section title="Ejemplo práctico en R" icon={Code}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-xl p-6 shadow-lg overflow-x-auto text-sm text-slate-300 font-mono">
              <pre>
                <code>
<span className="text-slate-500"># Instalar y cargar librería</span>
<span className="text-pink-400">install.packages</span>(<span className="text-green-300">"qcc"</span>)
<span className="text-pink-400">library</span>(qcc)

<span className="text-slate-500"># Generar datos simulados</span>
<span className="text-pink-400">set.seed</span>(<span className="text-orange-300">123</span>)
datos <span className="text-pink-400">&lt;-</span> <span className="text-blue-300">rnorm</span>(<span className="text-orange-300">100</span>, mean = <span className="text-orange-300">52</span>, sd = <span className="text-orange-300">4</span>)

<span className="text-slate-500"># Límites de especificación</span>
LSL <span className="text-pink-400">&lt;-</span> <span className="text-orange-300">40</span>
USL <span className="text-pink-400">&lt;-</span> <span className="text-orange-300">60</span>

<span className="text-slate-500"># Análisis de capacidad</span>
capacidad <span className="text-pink-400">&lt;-</span> <span className="text-blue-300">process.capability</span>(
  <span className="text-blue-300">qcc</span>(datos, type = <span className="text-green-300">"xbar.one"</span>),
  spec.limits = <span className="text-blue-300">c</span>(LSL, USL)
)

<span className="text-slate-500"># Mostrar resultados</span>
capacidad
                </code>
              </pre>
            </div>
            <div className="flex flex-col justify-center">
               <VisualContainer caption="Gráfico de capacidad: Histograma de los datos, curva ajustada y límites.">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={histogramData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="x" type="category" />
                    <YAxis tick={false} />
                    <Tooltip />
                    <ReferenceLine x="42" stroke="#ef4444" label={{ position: 'top', value: 'LSL (40)' }} />
                    <ReferenceLine x="58" stroke="#ef4444" label={{ position: 'top', value: 'USL (60)' }} />
                    <Bar dataKey="count" barSize={30} fill="#94a3b8" />
                    <Line type="monotone" dataKey="curve" stroke="#4f46e5" strokeWidth={3} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </VisualContainer>
            </div>
          </div>
        </Section>

        {/* 8. Cierre / Mapa Conceptual */}
        <Section title="Cierre y Mapa Conceptual" icon={Map}>
          <div className="mb-8">
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-8">
              Los índices de capacidad son herramientas clave. Su correcta interpretación exige un balance analítico: evaluar el ancho (variabilidad), la posición (centrado) y la naturaleza de los datos (normalidad).
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center">
            
            {/* Nodo Principal */}
            <div className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg shadow-md z-10">
              Análisis de Capacidad
            </div>
            
            {/* Línea vertical central */}
            <div className="w-1 h-8 bg-slate-300"></div>
            
            {/* Contenedor Flex para ramificaciones */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 relative">
              {/* Línea horizontal conectora (sólo en desktop) */}
              <div className="hidden md:block absolute top-0 left-[15%] right-[15%] h-1 bg-slate-300"></div>

              {/* Rama 1 */}
              <div className="flex flex-col items-center relative pt-4 md:pt-0">
                <div className="hidden md:block absolute top-0 w-1 h-6 bg-slate-300"></div>
                <div className="mt-6 bg-white border-2 border-emerald-500 text-emerald-800 font-semibold px-4 py-2 rounded-lg shadow-sm">
                  Variabilidad
                </div>
                <div className="w-1 h-4 bg-slate-300"></div>
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded text-sm">
                  Índice Cp
                </div>
              </div>

              {/* Rama 2 */}
              <div className="flex flex-col items-center relative pt-4 md:pt-0">
                <div className="hidden md:block absolute top-0 w-1 h-6 bg-slate-300"></div>
                <div className="mt-6 bg-white border-2 border-purple-500 text-purple-800 font-semibold px-4 py-2 rounded-lg shadow-sm">
                  Centrado
                </div>
                <div className="w-1 h-4 bg-slate-300"></div>
                <div className="bg-purple-50 border border-purple-200 text-purple-700 px-3 py-1 rounded text-sm">
                  Índice Cpk
                </div>
              </div>

              {/* Rama 3 */}
              <div className="flex flex-col items-center relative pt-4 md:pt-0">
                <div className="hidden md:block absolute top-0 w-1 h-6 bg-slate-300"></div>
                <div className="mt-6 bg-white border-2 border-rose-500 text-rose-800 font-semibold px-4 py-2 rounded-lg shadow-sm">
                  Normalidad
                </div>
                <div className="w-1 h-4 bg-slate-300"></div>
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded text-sm">
                  Supuesto Crítico
                </div>
              </div>
            </div>

          </div>
        </Section>

      </div>
    </div>
  );
}