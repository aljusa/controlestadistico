import React from 'react';
import { CheckCircle, AlertTriangle, Info, Terminal } from 'lucide-react';

// --- Visual Components ---

const FlowChart1 = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col items-center p-4 bg-blue-600 text-white rounded-lg shadow-md w-48 text-center">
      <span className="font-bold">1. Gráfico de Control</span>
      <span className="text-xs mt-1 text-blue-100">Verificar Estabilidad</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="w-1 h-8 md:w-8 md:h-1 bg-slate-400"></div>
      <div className="text-xs font-semibold text-slate-500 mt-1 md:mt-0 md:absolute md:-translate-y-4">Condición: Estable</div>
    </div>
    <div className="flex flex-col items-center p-4 bg-emerald-600 text-white rounded-lg shadow-md w-48 text-center">
      <span className="font-bold">2. Análisis de Capacidad</span>
      <span className="text-xs mt-1 text-emerald-100">Evaluar Especificaciones</span>
    </div>
  </div>
);

const UnstableControlChart = () => (
  <div className="w-full max-w-lg mx-auto bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
    <svg viewBox="0 0 400 200" className="w-full h-auto">
      {/* Background and Grid */}
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <line x1="40" y1="50" x2="380" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" /> {/* UCL */}
      <text x="10" y="54" fontSize="12" fill="#ef4444" fontWeight="bold">UCL</text>
      <line x1="40" y1="100" x2="380" y2="100" stroke="#10b981" strokeWidth="2" /> {/* Mean */}
      <text x="10" y="104" fontSize="12" fill="#10b981" fontWeight="bold">Media</text>
      <line x1="40" y1="150" x2="380" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" /> {/* LCL */}
      <text x="10" y="154" fontSize="12" fill="#ef4444" fontWeight="bold">LCL</text>

      {/* Data Line */}
      <path d="M 50 110 L 80 90 L 110 105 L 140 160 L 170 115 L 200 95 L 230 40 L 260 85 L 290 100 L 320 120 L 350 95" fill="none" stroke="#3b82f6" strokeWidth="2" />
      
      {/* Points */}
      <circle cx="50" cy="110" r="4" fill="#3b82f6" />
      <circle cx="80" cy="90" r="4" fill="#3b82f6" />
      <circle cx="110" cy="105" r="4" fill="#3b82f6" />
      
      {/* Out of control lower */}
      <circle cx="140" cy="160" r="6" fill="#ef4444" className="animate-pulse" />
      <text x="130" y="180" fontSize="10" fill="#ef4444" fontWeight="bold">Inestable</text>
      
      <circle cx="170" cy="115" r="4" fill="#3b82f6" />
      <circle cx="200" cy="95" r="4" fill="#3b82f6" />
      
      {/* Out of control upper */}
      <circle cx="230" cy="40" r="6" fill="#ef4444" className="animate-pulse" />
      <text x="215" y="30" fontSize="10" fill="#ef4444" fontWeight="bold">Inestable</text>
      
      <circle cx="260" cy="85" r="4" fill="#3b82f6" />
      <circle cx="290" cy="100" r="4" fill="#3b82f6" />
      <circle cx="320" cy="120" r="4" fill="#3b82f6" />
      <circle cx="350" cy="95" r="4" fill="#3b82f6" />
    </svg>
    <p className="text-center text-sm text-slate-500 mt-2 italic">Puntos rojos indican variación por causas especiales.</p>
  </div>
);

const CapabilityMatrix = () => (
  <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex flex-col items-center text-center">
      <CheckCircle className="text-emerald-500 mb-2" size={32} />
      <h4 className="font-bold text-emerald-800">Estable y Capaz</h4>
      <p className="text-sm text-emerald-700 mt-1">El escenario ideal. Proceso predecible y que cumple holgadamente las especificaciones.</p>
    </div>
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex flex-col items-center text-center">
      <AlertTriangle className="text-yellow-500 mb-2" size={32} />
      <h4 className="font-bold text-yellow-800">Estable pero No Capaz</h4>
      <p className="text-sm text-yellow-700 mt-1">Es predecible, pero su variabilidad natural es mayor que la tolerancia permitida.</p>
    </div>
    <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex flex-col items-center text-center">
      <Info className="text-orange-500 mb-2" size={32} />
      <h4 className="font-bold text-orange-800">Inestable pero "Capaz"</h4>
      <p className="text-sm text-orange-700 mt-1">Cumple por ahora, pero al ser inestable (impredecible), podría fallar en cualquier momento.</p>
    </div>
    <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex flex-col items-center text-center">
      <AlertTriangle className="text-red-500 mb-2" size={32} />
      <h4 className="font-bold text-red-800">Inestable y No Capaz</h4>
      <p className="text-sm text-red-700 mt-1">El peor escenario. Completamente impredecible y generando defectos constantemente.</p>
    </div>
  </div>
);

const SigmaEstimationChart = () => (
  <div className="w-full max-w-lg mx-auto bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
    <svg viewBox="0 0 400 200" className="w-full h-auto">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <line x1="40" y1="50" x2="380" y2="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
      <line x1="40" y1="100" x2="380" y2="100" stroke="#64748b" strokeWidth="2" /> {/* Mean */}
      <line x1="40" y1="150" x2="380" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
      
      {/* Path */}
      <path d="M 50 110 L 100 80 L 150 120 L 200 90 L 250 105 L 300 85 L 350 115" fill="none" stroke="#3b82f6" strokeWidth="2" />
      
      {/* Points */}
      {[ [50, 110], [100, 80], [150, 120], [200, 90], [250, 105], [300, 85], [350, 115] ].map((pt, i) => (
        <circle key={i} cx={pt[0]} cy={pt[1]} r="4" fill="#3b82f6" />
      ))}

      {/* Annotations for variation */}
      <line x1="100" y1="80" x2="100" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="2" />
      <line x1="150" y1="120" x2="150" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="2" />
      <line x1="300" y1="85" x2="300" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="2" />
      
      <text x="160" y="70" fontSize="12" fill="#ef4444" fontWeight="bold" className="bg-white">Estimar σ a partir de la</text>
      <text x="160" y="85" fontSize="12" fill="#ef4444" fontWeight="bold" className="bg-white">variabilidad de subgrupos (ej. R̄)</text>
      
      <path d="M 140 75 Q 100 75 100 80" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow)" />
      
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
      </defs>
    </svg>
  </div>
);

const RChartsSimulation = () => (
  <div className="flex flex-col md:flex-row gap-4 w-full">
    {/* Control Chart */}
    <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h5 className="text-center font-semibold text-sm mb-2 text-slate-700">1. Gráfico de Control (qcc)</h5>
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        <rect width="200" height="120" fill="#fafafa" rx="4" />
        <line x1="20" y1="30" x2="180" y2="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
        <line x1="20" y1="60" x2="180" y2="60" stroke="#10b981" strokeWidth="1" />
        <line x1="20" y1="90" x2="180" y2="90" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
        <path d="M 30 65 L 50 55 L 70 70 L 90 45 L 110 50 L 130 60 L 150 55 L 170 65" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
           <circle key={i} cx={x} cy={[65, 55, 70, 45, 50, 60, 55, 65][i]} r="2" fill="#3b82f6" />
        ))}
      </svg>
      <p className="text-xs text-center text-emerald-600 font-semibold mt-2">✓ Proceso Estable</p>
    </div>

    {/* Capability Histogram */}
    <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h5 className="text-center font-semibold text-sm mb-2 text-slate-700">2. Capacidad (process.capability)</h5>
      <svg viewBox="0 0 200 120" className="w-full h-auto items-end">
        <rect width="200" height="120" fill="#fafafa" rx="4" />
        {/* Spec Limits */}
        <line x1="40" y1="10" x2="40" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" />
        <text x="35" y="112" fontSize="8" fill="#ef4444" fontWeight="bold">LSL</text>
        
        <line x1="160" y1="10" x2="160" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" />
        <text x="155" y="112" fontSize="8" fill="#ef4444" fontWeight="bold">USL</text>

        {/* Histogram Bars */}
        <rect x="60" y="80" width="15" height="20" fill="#93c5fd" />
        <rect x="76" y="50" width="15" height="50" fill="#93c5fd" />
        <rect x="92" y="20" width="15" height="80" fill="#93c5fd" />
        <rect x="108" y="30" width="15" height="70" fill="#93c5fd" />
        <rect x="124" y="60" width="15" height="40" fill="#93c5fd" />
        
        {/* Bell Curve */}
        <path d="M 40 100 Q 80 100 100 20 Q 120 100 160 100" fill="none" stroke="#2563eb" strokeWidth="2" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#64748b" strokeWidth="1" />
      </svg>
      <p className="text-xs text-center text-blue-600 font-semibold mt-2">Cp y Cpk calculados</p>
    </div>
  </div>
);

const ConclusionFlow = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="px-4 py-2 bg-white border-2 border-slate-300 rounded-full text-sm font-semibold text-slate-700 shadow-sm">
      Control Estadístico
    </div>
    <span className="text-slate-400 rotate-90 md:rotate-0">➔</span>
    <div className="px-4 py-2 bg-emerald-100 border-2 border-emerald-400 rounded-full text-sm font-semibold text-emerald-800 shadow-sm">
      Proceso Estable
    </div>
    <span className="text-slate-400 rotate-90 md:rotate-0">➔</span>
    <div className="px-4 py-2 bg-blue-100 border-2 border-blue-400 rounded-full text-sm font-semibold text-blue-800 shadow-sm">
      Análisis de Capacidad
    </div>
  </div>
);


// --- Main Application ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Análisis de Capacidad del Proceso mediante Gráficos de Control
          </h1>
                </header>

        {/* Content Sections */}
        <main className="p-8 space-y-12">
          
          {/* 1. Introducción */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-100 pb-2">
              1. Introducción
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              El análisis de capacidad del proceso mediante gráficos de control combina dos enfoques: primero verificar que el proceso esté bajo <strong>control estadístico</strong> y luego evaluar si cumple con las especificaciones. Este enfoque evita conclusiones erróneas al analizar procesos inestables.
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Representación Visual</h3>
              <FlowChart1 />
            </div>
          </section>

          {/* 2. Verificación de estabilidad */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-100 pb-2">
              2. Verificación de Estabilidad
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Antes de calcular índices de capacidad, es fundamental confirmar que el proceso está bajo control estadístico. Si existen <strong>puntos fuera de control</strong>, la estimación de la capacidad no será confiable, ya que el proceso es impredecible.
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Ejemplo de Inestabilidad</h3>
              <UnstableControlChart />
            </div>
          </section>

          {/* 3. Relación entre control y capacidad */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-100 pb-2">
              3. Relación entre Control y Capacidad
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Un proceso puede estar bajo control pero no ser capaz (demasiada variabilidad), o puede ser capaz pero estar fuera de control (inestable). Ambos análisis son complementarios y definen la salud real del proceso.
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Matriz Conceptual</h3>
              <CapabilityMatrix />
            </div>
          </section>

          {/* 4. Uso del gráfico de control para estimar σ */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-100 pb-2">
              4. Uso del gráfico de control para estimar σ
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Cuando el proceso está bajo control, la <strong>desviación estándar (σ)</strong> puede estimarse a partir del gráfico de control (por ejemplo, usando rangos móviles o subgrupos promediados). Esta estimación rigurosa se utiliza posteriormente para calcular los índices <strong>Cp</strong> y <strong>Cpk</strong>.
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Estimación de Variabilidad</h3>
              <SigmaEstimationChart />
            </div>
          </section>

          {/* 5. Ejemplo en R */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-100 pb-2">
              5. Ejemplo de Aplicación
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
Una empresa desea analizar el desempeño y la estabilidad de un proceso de producción a partir de una muestra de 50 observaciones de una característica de calidad. Se asume que los datos siguen aproximadamente una distribución normal con media cercana a 50 unidades y desviación estándar de 3 unidades.
<br />
Los límites de especificación establecidos para el producto son:
<br />
Límite inferior de especificación (LSL) = 40 <br />
Límite superior de especificación (USL) = 60 <br />

Se pide: <br />

Construir un gráfico de control para observaciones individuales (X̄ individual) utilizando los datos proporcionados. <br />
Evaluar, de manera visual, si el proceso se encuentra bajo control estadístico. <br />
En caso de que el proceso esté bajo control, realizar un análisis de capacidad del proceso. <br />
Obtener e interpretar los índices de capacidad del proceso (Cp, Cpk, entre otros). <br />
Con base en los resultados, concluir si el proceso es capaz de cumplir con los límites de especificación.            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Code Block */}
              <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
                <div className="flex items-center px-4 py-2 bg-slate-800 text-slate-400 text-xs font-mono border-b border-slate-700">
                  <Terminal size={14} className="mr-2" /> script.R
                </div>
                <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto whitespace-pre">
<span className="text-slate-500"># Instalar y cargar librería{"\n"}</span>
{`install.packages("qcc")
library(qcc)

`}
<span className="text-slate-500"># Generar datos simulados{"\n"}</span>
{`set.seed(123)
datos <- rnorm(50, mean = 50, sd = 3)

`}
<span className="text-slate-500"># Límites de especificación{"\n"}</span>
{`LSL <- 40
USL <- 60

`}
<span className="text-slate-500"># Crear gráfico de control (individuos){"\n"}</span>
{`grafico <- qcc(datos, type = "xbar.one",
               title = "Gráfico de Control")

`}
<span className="text-slate-500"># Verificar estabilidad (visual){"\n"}</span>
{`plot(grafico)

`}
<span className="text-slate-500"># Si el proceso está bajo control, calcular capacidad{"\n"}</span>
{`capacidad <- process.capability(grafico,
                               spec.limits = c(LSL, USL))

`}
<span className="text-slate-500"># Mostrar resultados{"\n"}</span>
{`capacidad`}
</pre>
              </div>

              {/* Visuals for R Output */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Salida Visual Simulada</h3>
                <RChartsSimulation />
                <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                  <strong>En este ejemplo:</strong>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Se construye un gráfico de control para verificar estabilidad.</li>
                    <li>Si no hay señales de fuera de control, se procede al cálculo de Cp y Cpk usando la variabilidad estimada del gráfico.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Cierre */}
          <section className="bg-slate-50 -mx-8 px-8 py-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              6. Cierre y Conclusiones
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              El análisis de capacidad basado en gráficos de control garantiza que las conclusiones sobre el desempeño del proceso sean válidas. <strong>Primero se asegura la estabilidad y luego se evalúa la capacidad</strong>, integrando ambos enfoques en un análisis metodológicamente coherente.
            </p>
            <div className="mt-6 flex justify-center">
              <ConclusionFlow />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}