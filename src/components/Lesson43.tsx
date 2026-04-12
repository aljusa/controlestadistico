import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { 
  Factory, GitMerge, Activity, ArrowRight, Database, Settings, AlertTriangle, CheckCircle 
} from 'lucide-react';

// --- Datos Simulados para los Gráficos ---

const multistreamData = [
  { tiempo: '1', linea1: 10, linea2: 12, linea3: 9 },
  { tiempo: '2', linea1: 11, linea2: 13, linea3: 8 },
  { tiempo: '3', linea1: 10.5, linea2: 12.5, linea3: 9.5 },
  { tiempo: '4', linea1: 12, linea2: 14, linea3: 8.5 },
  { tiempo: '5', linea1: 11.5, linea2: 13.5, linea3: 9 },
  { tiempo: '6', linea1: 10.8, linea2: 12.8, linea3: 9.8 },
  { tiempo: '7', linea1: 11, linea2: 15, linea3: 10 },
];

const autoCorrData = Array.from({ length: 20 }, (_, i) => ({
  tiempo: i + 1,
  valor: 10 + 5 * Math.sin(i / 2) + Math.random(), // Patrón de onda suave (autocorrelacionado)
}));

const acfData = [
  { lag: '0', correlacion: 1.0 },
  { lag: '1', correlacion: 0.85 },
  { lag: '2', correlacion: 0.65 },
  { lag: '3', correlacion: 0.45 },
  { lag: '4', correlacion: 0.25 },
  { lag: '5', correlacion: 0.10 },
];

const residualData = Array.from({ length: 20 }, (_, i) => ({
  tiempo: i + 1,
  valor: (Math.random() - 0.5) * 4, // Ruido blanco (independiente)
}));

// --- Componentes Visuales ---

const Header = () => (
  <header className="bg-slate-900 text-white py-12 px-6 shadow-md rounded-b-3xl mb-12">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-4 text-blue-300">Control Estadístico de Procesos Avanzado</h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          En procesos reales, los datos rara vez provienen de una única fuente homogénea y no siempre son independientes en el tiempo. Descubre cómo adaptar el SPC clásico a escenarios de flujos múltiples y dependencia temporal.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-inner">
        {/* Sugerencia visual: Esquema convergente y serie temporal */}
        <div className="flex items-center gap-4 text-blue-400">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-slate-900 p-2 rounded"><Factory size={20}/> Línea A</div>
            <div className="flex items-center gap-2 bg-slate-900 p-2 rounded"><Factory size={20}/> Línea B</div>
          </div>
          <GitMerge size={32} className="text-indigo-400" />
          <div className="bg-indigo-900/50 p-4 rounded-full border border-indigo-500/30">
            <Activity size={40} className="text-indigo-300" />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Section = ({ title, icon: Icon, children }) => (
  <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
    <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center gap-3">
      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
    </div>
    <div className="p-6">
      {children}
    </div>
  </section>
);

const CodeBlock = ({ code }) => (
  <pre className="bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono shadow-inner border border-slate-700">
    <code>{code}</code>
  </pre>
);

// --- Aplicación Principal ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 pb-16 font-sans">
      <Header />

      <main className="px-6">
        
        {/* 1. Procesos Multistream */}
        <Section title="Procesos Multistream" icon={Factory}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-slate-600 mb-4 text-lg leading-relaxed">
                Los procesos multifuente o <strong>multistream</strong> implican múltiples líneas, máquinas o proveedores que generan datos simultáneamente.
              </p>
              <p className="text-slate-600 leading-relaxed">
                En estos escenarios, las técnicas tradicionales se quedan cortas. Se utilizan <strong>gráficos grupales o estratificados</strong> para monitorizar y comparar el comportamiento entre las distintas fuentes de manera paralela.
              </p>
            </div>
            <div className="h-72 bg-slate-50 rounded-xl border border-slate-100 p-4 shadow-sm">
              <h3 className="text-center text-sm font-semibold text-slate-500 mb-4">Comparativa de Fuentes Múltiples</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={multistreamData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                  <XAxis dataKey="tiempo" tick={{fill: '#64748b'}} />
                  <YAxis tick={{fill: '#64748b'}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend />
                  <Line type="monotone" dataKey="linea1" name="Línea 1" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} />
                  <Line type="monotone" dataKey="linea2" name="Línea 2" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                  <Line type="monotone" dataKey="linea3" name="Línea 3" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Section>

        {/* 2. Autocorrelación */}
        <Section title="Autocorrelación" icon={Activity}>
          <div className="mb-6">
            <p className="text-slate-600 text-lg leading-relaxed">
              La autocorrelación ocurre cuando los datos de un proceso están correlacionados con sus observaciones previas. Esto <strong>viola el supuesto de independencia</strong> del SPC clásico, lo que puede generar falsas alarmas recurrentes o enmascarar problemas reales del proceso.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64 bg-indigo-50/50 rounded-xl border border-indigo-100 p-4">
              <h3 className="text-center text-sm font-semibold text-indigo-800 mb-2">Serie Temporal (Patrón No Aleatorio)</h3>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={autoCorrData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e7ff"/>
                  <XAxis dataKey="tiempo" tick={{fill: '#6366f1'}} />
                  <YAxis tick={{fill: '#6366f1'}} domain={[0, 'dataMax + 2']} />
                  <Tooltip />
                  <Line type="natural" dataKey="valor" stroke="#4f46e5" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-64 bg-orange-50/50 rounded-xl border border-orange-100 p-4">
              <h3 className="text-center text-sm font-semibold text-orange-800 mb-2">Diagrama de Autocorrelación (ACF)</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={acfData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffedd5"/>
                  <XAxis dataKey="lag" tick={{fill: '#ea580c'}} label={{ value: 'Lag', position: 'insideBottom', offset: -5, fill: '#ea580c' }} />
                  <YAxis tick={{fill: '#ea580c'}} />
                  <Tooltip cursor={{fill: '#ffedd5'}} />
                  <Bar dataKey="correlacion" fill="#f97316" radius={[4, 4, 0, 0]} barSize={20} />
                  <ReferenceLine y={0.2} stroke="#ef4444" strokeDasharray="3 3" label="Límite sig." />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Section>

        {/* 3. Métodos de Solución */}
        <Section title="Métodos de Solución" icon={Settings}>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Para tratar los problemas de dependencia temporal, podemos utilizar <strong>Modelos estadísticos</strong> (como ARIMA) para filtrar la estructura de datos o <strong>Métodos libres de modelo</strong> para enfoques robustos.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 bg-slate-50 p-8 rounded-xl border border-slate-200">
            {/* Diagrama de Flujo CSS */}
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm border border-slate-300 flex flex-col items-center gap-2">
              <Database className="text-slate-500" />
              <span className="font-semibold text-slate-700 text-center">Datos Brutos<br/><span className="text-xs text-red-500">(Autocorrelacionados)</span></span>
            </div>
            
            <ArrowRight className="text-slate-400 rotate-90 md:rotate-0" size={32} />
            
            <div className="bg-indigo-600 px-6 py-4 rounded-lg shadow-md border border-indigo-700 flex flex-col items-center gap-2 text-white transform scale-110">
              <Settings className="animate-spin-slow" />
              <span className="font-bold text-center">Modelo ARIMA<br/><span className="text-xs text-indigo-200 font-normal">Filtro Matemático</span></span>
            </div>

            <ArrowRight className="text-slate-400 rotate-90 md:rotate-0" size={32} />

            <div className="bg-white px-6 py-4 rounded-lg shadow-sm border border-slate-300 flex flex-col items-center gap-2">
              <Activity className="text-green-500" />
              <span className="font-semibold text-slate-700 text-center">Gráfico Control<br/><span className="text-xs text-green-600">(Sobre Residuos)</span></span>
            </div>
          </div>
        </Section>

        {/* 4. Ejemplo Práctico en R */}
        <Section title="Ejemplo de Aplicación en R" icon={Database}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600 mb-4 leading-relaxed">
                A continuación, se muestra cómo generar datos autocorrelacionados, ajustarlos con un modelo ARIMA y finalmente aplicar el gráfico de control sobre los residuos resultantes, los cuales ya cumplen con el supuesto de independencia.
              </p>
              <CodeBlock code={`# Instalar y cargar librerías
install.packages("forecast")
install.packages("qcc")
library(forecast)
library(qcc)

# Generar datos autocorrelacionados (AR(1))
set.seed(123)
datos <- arima.sim(n = 50, list(ar = 0.7))

# Ajustar modelo ARIMA para eliminar autocorrelación
modelo <- auto.arima(datos)
residuos <- residuals(modelo)

# Aplicar gráfico de control a los residuos
qcc(residuos,
    type = "xbar.one",
    title = "Control sobre residuos")`} />
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-40 bg-red-50 rounded-xl p-4 border border-red-100 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-red-800 flex items-center gap-2"><AlertTriangle size={16}/> 1. Datos Originales</span>
                  <span className="text-xs text-red-600 bg-red-100 px-2 rounded-full">Alarma falsa probable</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={autoCorrData}>
                    <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                    <Line type="monotone" dataKey="valor" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-40 bg-green-50 rounded-xl p-4 border border-green-100 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-800 flex items-center gap-2"><CheckCircle size={16}/> 2. Residuos ARIMA</span>
                  <span className="text-xs text-green-700 bg-green-100 px-2 rounded-full">Independientes</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={residualData}>
                    <YAxis hide domain={[-5, 5]} />
                    <ReferenceLine y={0} stroke="#22c55e" strokeDasharray="3 3" />
                    <Line type="step" dataKey="valor" stroke="#16a34a" strokeWidth={2} dot={{r: 2, fill: '#16a34a'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Cierre y Mapa Conceptual */}
        <section className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 text-center md:text-left md:flex items-center gap-8 border-b border-white/10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">En Conclusión</h2>
              <p className="text-blue-50 leading-relaxed text-lg">
                El reconocimiento de estructuras complejas es fundamental para aplicar correctamente el SPC. Ignorar características como las <strong>múltiples fuentes</strong> o la <strong>dependencia temporal</strong> lleva a errores, mientras que su modelación mejora drásticamente el monitoreo.
              </p>
            </div>
          </div>
          
          <div className="p-8 bg-black/20">
            <h3 className="text-center font-medium text-blue-200 mb-6 tracking-wide uppercase text-sm">Mapa Conceptual de Análisis de Procesos</h3>
            
            <div className="flex flex-col items-center max-w-3xl mx-auto">
              {/* Raíz */}
              <div className="bg-blue-600 border-2 border-blue-400 px-6 py-3 rounded-lg shadow-lg font-bold text-lg z-10">
                Análisis de Procesos SPC
              </div>
              
              {/* Tallo principal */}
              <div className="w-1 h-8 bg-blue-400"></div>
              
              {/* Rama horizontal */}
              <div className="w-full md:w-2/3 h-1 bg-blue-400 rounded-full flex justify-between relative">
                 <div className="w-1 h-8 bg-blue-400 absolute left-0 top-0"></div>
                 <div className="w-1 h-8 bg-blue-400 absolute right-0 top-0"></div>
              </div>

              {/* Nodos hijos */}
              <div className="w-full md:w-2/3 flex justify-between mt-8 relative">
                
                {/* Rama Izquierda */}
                <div className="flex flex-col items-center w-1/2 px-2">
                  <div className="bg-slate-800 border-2 border-slate-600 px-4 py-2 rounded-lg font-semibold text-center mb-4">
                    Multistream<br/>
                    <span className="text-xs text-slate-400 font-normal">Múltiples fuentes</span>
                  </div>
                  <div className="w-1 h-4 bg-slate-600"></div>
                  <div className="bg-emerald-600/40 border border-emerald-400/50 px-4 py-2 rounded text-sm text-center">
                    Gráficos Grupales /<br/>Estratificados
                  </div>
                </div>

                {/* Rama Derecha */}
                <div className="flex flex-col items-center w-1/2 px-2">
                  <div className="bg-slate-800 border-2 border-slate-600 px-4 py-2 rounded-lg font-semibold text-center mb-4">
                    Autocorrelación<br/>
                    <span className="text-xs text-slate-400 font-normal">Dependencia temporal</span>
                  </div>
                  <div className="w-1 h-4 bg-slate-600"></div>
                  <div className="flex gap-2">
                    <div className="bg-indigo-600/40 border border-indigo-400/50 px-3 py-2 rounded text-sm text-center max-w-[120px]">
                      Modelos ARIMA
                    </div>
                    <div className="bg-indigo-600/40 border border-indigo-400/50 px-3 py-2 rounded text-sm text-center max-w-[120px]">
                      Métodos Robustos
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}