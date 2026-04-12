import React from 'react';
import { BookOpen, BarChart2, Activity, Code, GitMerge, CheckCircle, Info } from 'lucide-react';

// --- COMPONENTES VISUALES (Diagramas SVG) ---

const Histogram = ({ showDensity = false, highlightInside = false, scale = 1 }) => {
  const bars = [
    { x: 10, h: 20 }, { x: 50, h: 60 }, { x: 90, h: 120 }, { x: 130, h: 180 },
    { x: 170, h: 220 }, { x: 210, h: 190 }, { x: 250, h: 130 }, { x: 290, h: 70 },
    { x: 330, h: 30 }
  ];
  
  const lsl = 90;
  const usl = 290;

  return (
    <svg width={400 * scale} height={250 * scale} viewBox="0 0 400 250" className="mx-auto drop-shadow-sm font-sans">
      {/* Grid */}
      <line x1="40" y1="210" x2="380" y2="210" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="40" y1="20" x2="40" y2="210" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Bars */}
      {bars.map((bar, i) => {
        const isInside = bar.x >= lsl && bar.x <= usl - 40;
        const fillColor = highlightInside ? (isInside ? '#86efac' : '#fca5a5') : '#93c5fd';
        return (
          <rect key={i} x={40 + bar.x} y={210 - bar.h} width="38" height={bar.h} fill={fillColor} stroke="#ffffff" strokeWidth="2" rx="2" className="transition-all duration-500 hover:opacity-80" />
        );
      })}

      {/* Density Curve */}
      {showDensity && (
        <path 
          d="M 40 210 Q 70 200, 100 150 T 190 30  T 380 210" 
          fill="none" stroke="#2563eb" strokeWidth="4" opacity="0.8" 
        />
      )}

      {/* LSL / USL Lines */}
      <line x1={40 + lsl} y1="20" x2={40 + lsl} y2="220" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 6" />
      <text x={40 + lsl - 15} y="15" fill="#ef4444" fontSize="14" fontWeight="bold">LSL</text>
      
      <line x1={40 + usl} y1="20" x2={40 + usl} y2="220" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 6" />
      <text x={40 + usl - 15} y="15" fill="#ef4444" fontSize="14" fontWeight="bold">USL</text>
    </svg>
  );
};

const ProbabilityPlot = ({ scale = 1 }) => {
  // Generate pseudo-random points that roughly follow the diagonal
  const points = Array.from({ length: 40 }).map((_, i) => {
    const x = 60 + (i * 8);
    const y = 200 - (i * 4.5) + (Math.random() * 20 - 10);
    return { x, y };
  });

  return (
    <svg width={400 * scale} height={250 * scale} viewBox="0 0 400 250" className="mx-auto drop-shadow-sm font-sans">
      {/* Grid */}
      <line x1="40" y1="210" x2="380" y2="210" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="40" y1="20" x2="40" y2="210" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Theoretical Normal Line */}
      <line x1="60" y1="200" x2="360" y2="30" stroke="#2563eb" strokeWidth="3" />
      
      {/* Data Points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3b82f6" opacity="0.7" stroke="#ffffff" strokeWidth="1" />
      ))}
    </svg>
  );
};

const IntegrationSchema = () => {
  return (
    <svg width="100%" height="250" viewBox="0 0 800 250" className="mx-auto font-sans drop-shadow-md">
      {/* Tool 1 */}
      <rect x="50" y="40" width="220" height="70" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
      <text x="160" y="75" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="bold">Histograma</text>
      <text x="160" y="95" textAnchor="middle" fill="#475569" fontSize="12">Distribución y Límites</text>

      {/* Tool 2 */}
      <rect x="50" y="140" width="220" height="70" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
      <text x="160" y="175" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="bold">Gráfico QQ</text>
      <text x="160" y="195" textAnchor="middle" fill="#475569" fontSize="12">Ajuste a Normalidad</text>

      {/* Connecting Lines & Arrows */}
      <path d="M 270 75 C 330 75, 330 125, 400 125" fill="none" stroke="#94a3b8" strokeWidth="4" markerEnd="url(#arrow)" />
      <path d="M 270 175 C 330 175, 330 125, 400 125" fill="none" stroke="#94a3b8" strokeWidth="4" />
      <line x1="400" y1="125" x2="460" y2="125" stroke="#94a3b8" strokeWidth="4" />

      {/* Result */}
      <rect x="470" y="85" width="280" height="80" rx="15" fill="#f0fdf4" stroke="#22c55e" strokeWidth="4" />
      <text x="610" y="125" textAnchor="middle" fill="#14532d" fontSize="20" fontWeight="bold">Análisis de Capacidad</text>
      <text x="610" y="145" textAnchor="middle" fill="#166534" fontSize="14">Evaluación Completa del Proceso</text>
    </svg>
  );
};

// --- ESTRUCTURA DE LA PÁGINA WEB ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Encabezado */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Análisis de Capacidad de Proceso
          </h1>
     
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto py-12 px-6 space-y-16">

        {/* Sección 1: Introducción */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4 text-blue-600">
                <BookOpen size={28} />
                <h2 className="text-2xl font-bold text-slate-800">1. Introducción</h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                El análisis de capacidad de proceso evalúa si un proceso es capaz de cumplir con especificaciones predefinidas. Dos herramientas fundamentales para este análisis son el <strong>histograma</strong> y el <strong>gráfico de probabilidad</strong>, que permiten comparar la distribución de los datos con los límites de especificación.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                  <Info size={16} /> Concepto Clave
                </p>
                <p className="text-blue-700 text-sm mt-1">Evaluar si la variabilidad natural del proceso cabe dentro de las tolerancias permitidas.</p>
              </div>
            </div>
            <div className="md:w-1/2 bg-slate-100 p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Sugerencia Visual Aplicada</span>
              <Histogram showDensity={true} />
              <p className="text-center text-sm text-slate-500 mt-4">
                Histograma con curvas de densidad superpuestas y líneas verticales (LSL y USL).
              </p>
            </div>
          </div>
        </section>

        {/* Sección 2: Uso del Histograma */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="md:flex flex-row-reverse">
            <div className="md:w-1/2 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4 text-emerald-600">
                <BarChart2 size={28} />
                <h2 className="text-2xl font-bold text-slate-800">2. Uso del Histograma</h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                El histograma permite visualizar la <strong>forma</strong>, <strong>dispersión</strong> y <strong>centrado</strong> de los datos respecto a los límites de especificación. Es extremadamente útil para detectar de manera rápida:
              </p>
              <ul className="space-y-3 mb-6">
                {['Sesgos en la producción.', 'Asimetrías en la distribución de los datos.', 'Variabilidad excesiva fuera de los límites.'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-slate-100 p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-r border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Sugerencia Visual Aplicada</span>
              <Histogram showDensity={false} highlightInside={true} />
              <p className="text-center text-sm text-slate-500 mt-4">
                Barras bien definidas destacando en verde los datos que caen dentro de los límites y en rojo los defectuosos.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Gráfico de Probabilidad */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4 text-purple-600">
                <Activity size={28} />
                <h2 className="text-2xl font-bold text-slate-800">3. Gráfico de Probabilidad</h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                El gráfico de probabilidad (o <em>Probability Plot</em>) compara los datos recolectados con una distribución teórica, usualmente la <strong>distribución normal</strong>.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Si los puntos trazados siguen aproximadamente una línea recta, se puede asumir la normalidad de los datos. Esta condición es fundamental para poder calcular e interpretar correctamente los índices de capacidad (como Cp y Cpk).
              </p>
            </div>
            <div className="md:w-1/2 bg-slate-100 p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Sugerencia Visual Aplicada</span>
              <ProbabilityPlot />
              <p className="text-center text-sm text-slate-500 mt-4">
                Puntos alineados cerca de la recta teórica, indicando un buen ajuste a la normalidad.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 4: Ejemplo en R */}
        <section className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 overflow-hidden text-slate-300">
          <div className="p-8 lg:p-10 border-b border-slate-800">
             <div className="flex items-center gap-3 mb-4 text-cyan-400">
                <Code size={28} />
                <h2 className="text-2xl font-bold text-white">4. Ejemplo Práctico </h2>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-3xl">
Una empresa desea evaluar la calidad de un proceso de producción cuya característica de interés sigue aproximadamente una distribución normal. Se recolecta una muestra de 100 observaciones del proceso, con una media aproximada de 50 unidades y una desviación estándar de 5 unidades.
<br />
El producto tiene límites de especificación establecidos en:
<br />
Límite inferior (LSL) = 40 <br />
Límite superior (USL) = 60
<br />
Se pide:
<br />
Generar un histograma de los datos del proceso e identificar visualmente los límites de especificación. <br />
Evaluar si los datos siguen una distribución normal mediante un gráfico de probabilidad normal (QQ-plot). <br />
Analizar visualmente si el proceso cumple con los límites de especificación establecidos.              </p>

              {/* Grid 2 Columnas para Código y Análisis */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Código */}
                <div className="bg-slate-950 rounded-xl p-6 font-mono text-sm overflow-x-auto border border-slate-800/50">
  <pre className="text-slate-300">
{`# Generar datos simulados
set.seed(123)
datos <- rnorm(100, mean = 50, sd = 5)

# Límites de especificación
LSL <- 40
USL <- 60

# Histograma
hist(datos,
     breaks = 15,
     col = "lightblue",
     main = "Histograma del proceso",
     xlab = "Valores")
abline(v = LSL, col = "red", lwd = 2, lty = 2)
abline(v = USL, col = "red", lwd = 2, lty = 2)

# Gráfico de probabilidad normal
qqnorm(datos,
       main = "Gráfico de probabilidad normal")
qqline(datos, col = "blue", lwd = 2)
`}
    </pre>
                </div>
                
                {/* Explicación del código */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <BarChart2 size={18} className="text-blue-400"/> Interpretación del Histograma
                    </h3>
                    <p className="text-sm">Permite verificar visualmente si la mayoría de los datos cae dentro de los límites de especificación definidos (LSL y USL).</p>
                  </div>
                  <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Activity size={18} className="text-purple-400"/> Interpretación del QQ Plot
                    </h3>
                    <p className="text-sm">Ayuda a evaluar si los datos siguen una distribución normal, condición imperativa para interpretar los índices de capacidad numéricos.</p>
                  </div>
                </div>
              </div>
          </div>
          
          {/* Visualización Lado a Lado (Sugerencia Visual) */}
          <div className="bg-slate-800 p-8 flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="text-center w-full md:w-1/2">
               <div className="bg-white p-4 rounded-xl shadow-inner inline-block">
                 <Histogram scale={0.8} />
               </div>
               <p className="text-sm text-slate-400 mt-3 font-medium">Histograma del proceso</p>
            </div>
            <div className="text-center w-full md:w-1/2">
               <div className="bg-white p-4 rounded-xl shadow-inner inline-block">
                 <ProbabilityPlot scale={0.8} />
               </div>
               <p className="text-sm text-slate-400 mt-3 font-medium">Gráfico QQ (Normalidad)</p>
            </div>
          </div>
        </section>

        {/* Sección 5: Conclusión y Cierre */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-8 lg:p-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 text-emerald-600 rounded-full mb-6">
            <GitMerge size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Cierre e Integración</h2>
          <p className="text-slate-600 text-xl leading-relaxed max-w-4xl mx-auto mb-12">
            El uso combinado del histograma y el gráfico de probabilidad proporciona una visión clara y robusta de la capacidad del proceso, permitiendo evaluar de manera simultánea la distribución de los datos y su ajuste a supuestos estadísticos clave.
          </p>

          {/* Sugerencia Visual Aplicada: Esquema Integrador */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mt-8 max-w-4xl mx-auto">
             <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 block">Esquema Integrador</span>
             <IntegrationSchema />
          </div>
        </section>

      </main>


    </div>
  );
}