import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ComposedChart, Area, Scatter, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { 
  BookOpen, GitMerge, ShieldAlert, Layers, Network, Code, 
  Map, ArrowRight, Activity, TrendingUp 
} from 'lucide-react';

// --- Funciones de simulación de datos ---
const generateData = (n, mean, sd, shiftIndex = -1, shiftMagnitude = 0, lambda = 0.2, outlierIndex = -1, outlierMagnitude = 0) => {
  let data = [];
  let ewma = mean;
  
  for (let i = 1; i <= n; i++) {
    let val = mean + (Math.random() * 2 - 1) * sd * 2; // Pseudo-normal approach
    
    if (i >= shiftIndex && shiftIndex !== -1) val += shiftMagnitude;
    if (i === outlierIndex) val += outlierMagnitude;

    ewma = lambda * val + (1 - lambda) * ewma;
    
    // Dynamic control limits
    let cl_margin = 3 * sd * Math.sqrt((lambda / (2 - lambda)) * (1 - Math.pow(1 - lambda, 2 * i)));
    
    data.push({
      time: i,
      valor: parseFloat(val.toFixed(2)),
      ewma: parseFloat(ewma.toFixed(2)),
      ucl: parseFloat((mean + cl_margin).toFixed(2)),
      lcl: parseFloat((mean - cl_margin).toFixed(2)),
      target: mean
    });
  }
  return data;
};

export default function EwmaEducationalPage() {
  const [introData, setIntroData] = useState([]);
  const [designData, setDesignData] = useState([]);
  const [robustData, setRobustData] = useState([]);
  const [rExampleData, setRExampleData] = useState([]);

  useEffect(() => {
    setIntroData(generateData(50, 10, 1.5, -1, 0, 0.15));
    setDesignData(generateData(40, 0, 1, -1, 0, 0.2));
    setRobustData(generateData(50, 10, 1, -1, 0, 0.2, 25, 8)); // Outlier at t=25
    setRExampleData(generateData(50, 0, 1, 30, 1.5, 0.2)); // Shift at t=30
  }, []);

  const SectionCard = ({ title, explanation, visualSuggestion, icon: Icon, children }) => (
    <div className="mb-12 bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
      <div className="md:flex">
        <div className="p-8 md:w-1/2 bg-slate-50 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4 text-blue-800">
            <Icon size={28} />
            <h2 className="text-2xl font-bold font-serif">{title}</h2>
          </div>
          <div className="prose text-slate-600 mb-6">
            <p className="leading-relaxed">{explanation}</p>
          </div>
          <div className="mt-auto p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800 font-medium flex items-center gap-2 mb-1">
              <Activity size={16} /> Sugerencia Visual
            </p>
            <p className="text-sm text-blue-600 italic">{visualSuggestion}</p>
          </div>
        </div>
        <div className="p-8 md:w-1/2 flex items-center justify-center bg-white border-l border-slate-100 min-h-[300px]">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-300 font-semibold tracking-wider uppercase text-sm mb-2">Estadística Aplicada</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-serif">Gráfico EWMA</h1>
          <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
            Explorando el Promedio Móvil Ponderado Exponencialmente: Una guía visual para el control estadístico de procesos.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 -mt-8">
        
        {/* 1. Introducción */}
        <SectionCard
          title="Introducción al Gráfico EWMA"
          explanation="El gráfico EWMA (Exponentially Weighted Moving Average) es una herramienta de control estadístico que asigna mayor peso a las observaciones más recientes, permitiendo detectar cambios de manera gradual y estable incluso en presencia de ruido."
          visualSuggestion="Un gráfico comparando una serie de datos original con su versión suavizada por EWMA, mostrando cómo la curva suavizada sigue la tendencia general."
          icon={BookOpen}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={introData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12}} stroke="#94a3b8" />
              <YAxis tick={{fontSize: 12}} stroke="#94a3b8" />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="valor" name="Datos Originales (Ruido)" stroke="#cbd5e1" strokeWidth={1} dot={{r: 2}} />
              <Line type="monotone" dataKey="ewma" name="Tendencia Suavizada (EWMA)" stroke="#2563eb" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* 2. Concepto Básico */}
        <SectionCard
          title="Concepto Básico"
          explanation="Cada punto del EWMA es un promedio ponderado entre el valor actual y el promedio previo. Esto genera una serie suavizada donde los cambios pequeños se acumulan progresivamente."
          visualSuggestion="Una secuencia de puntos donde cada nuevo valor se combina con el anterior mediante una flecha que indique el peso (λ)."
          icon={GitMerge}
        >
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-center gap-4 md:gap-8 w-full font-mono text-sm">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-600 mb-2">
                  EWMA<sub className="text-[10px]">t-1</sub>
                </div>
                <span className="text-slate-500 text-xs">Valor Previo</span>
              </div>
              
              <div className="flex flex-col items-center pb-8">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold mb-1">1 - λ</span>
                <ArrowRight className="text-slate-400" size={24} />
              </div>

              <div className="w-24 h-24 rounded-full bg-blue-600 border-4 border-blue-200 flex items-center justify-center font-bold text-white shadow-lg z-10">
                <div className="text-center">
                  EWMA<sub className="text-[10px]">t</sub>
                  <div className="text-[10px] mt-1 font-normal opacity-80">Nuevo Valor</div>
                </div>
              </div>

              <div className="flex flex-col items-center pb-8">
                <ArrowRight className="text-slate-400 rotate-180" size={24} />
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold mt-1">λ</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center font-bold text-amber-700 mb-2">
                  X<sub className="text-[10px]">t</sub>
                </div>
                <span className="text-slate-500 text-xs">Obs. Actual</span>
              </div>
            </div>
            <div className="mt-8 bg-slate-100 p-4 rounded-lg w-full text-center font-serif text-lg">
              EWMA<sub>t</sub> = λX<sub>t</sub> + (1-λ)EWMA<sub>t-1</sub>
            </div>
          </div>
        </SectionCard>

        {/* 3. Diseño del EWMA */}
        <SectionCard
          title="Diseño del EWMA"
          explanation="El gráfico se construye a partir de dos elementos clave: λ (lambda), que controla el grado de suavizamiento (valores pequeños implican mayor suavidad), y límites de control dinámicos que se ajustan con el tiempo a medida que evoluciona la serie."
          visualSuggestion="Un gráfico EWMA con bandas de control que se estrechan o estabilizan conforme aumenta el número de observaciones."
          icon={TrendingUp}
        >
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={designData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12}} stroke="#94a3b8" />
              <YAxis tick={{fontSize: 12}} stroke="#94a3b8" domain={[-1.5, 1.5]}/>
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Area type="monotone" dataKey="ucl" fill="#fef08a" stroke="#ca8a04" strokeDasharray="5 5" name="Límite Superior (LCS)" fillOpacity={0.2} />
              <Area type="monotone" dataKey="lcl" fill="#fef08a" stroke="#ca8a04" strokeDasharray="5 5" name="Límite Inferior (LCI)" fillOpacity={0.2} />
              <Line type="monotone" dataKey="ewma" name="Estadístico EWMA" stroke="#0ea5e9" strokeWidth={3} dot={{r:3}} />
            </ComposedChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* 4. Robustez */}
        <SectionCard
          title="Robustez ante Extremos"
          explanation="El EWMA es relativamente robusto frente a desviaciones de la normalidad, ya que el proceso de suavizamiento reduce el impacto de valores extremos (outliers) aislados."
          visualSuggestion="Comparación entre una serie con outliers y su EWMA correspondiente, mostrando cómo se atenúan los picos extremos."
          icon={ShieldAlert}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={robustData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" tick={{fontSize: 12}} stroke="#94a3b8" />
              <YAxis tick={{fontSize: 12}} stroke="#94a3b8" />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Line type="step" dataKey="valor" name="Datos con Outlier" stroke="#f43f5e" strokeWidth={1} dot={{r: 3}} />
              <Line type="monotone" dataKey="ewma" name="EWMA (Amortiguado)" stroke="#10b981" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* 5. Subgrupos Racionales */}
        <SectionCard
          title="Subgrupos Racionales"
          explanation="El uso de subgrupos racionales permite agrupar observaciones homogéneas, mejorando la interpretación del gráfico y la identificación de cambios reales en el proceso."
          visualSuggestion="Un esquema donde se agrupen datos en bloques (subgrupos) antes de aplicar el EWMA."
          icon={Layers}
        >
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-4 mb-6 w-full">
              {[1, 2, 3].map((group) => (
                <div key={group} className="bg-white border-2 border-indigo-100 rounded-lg p-3 shadow-sm w-32 flex flex-col items-center">
                  <span className="text-xs font-bold text-indigo-400 mb-2 uppercase">Subgrupo {group}</span>
                  <div className="flex gap-1 mb-2">
                    <div className="w-4 h-4 bg-indigo-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-indigo-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-indigo-300 rounded-full"></div>
                  </div>
                  <div className="w-full border-t border-indigo-100 pt-2 mt-1 text-center">
                    <span className="text-sm font-bold text-indigo-700">X̄<sub>{group}</sub></span>
                  </div>
                </div>
              ))}
              <div className="flex items-center text-slate-400">...</div>
            </div>
            <ArrowRight className="text-indigo-300 rotate-90 mb-4" size={24} />
            <div className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-md">
              Cálculo de EWMA sobre Medias Muestrales
            </div>
          </div>
        </SectionCard>

        {/* 6. Extensiones */}
        <SectionCard
          title="Extensiones y Variantes"
          explanation="El EWMA puede adaptarse a distintos contextos: procesos multivariantes (MEWMA), monitoreo de varianza, y ajustes para datos no normales o autocorrelacionados."
          visualSuggestion="Un diagrama que muestre diferentes aplicaciones del EWMA en distintos tipos de datos."
          icon={Network}
        >
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-teal-50 border border-teal-100 p-4 rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow">
              <div className="bg-teal-500 text-white p-2 rounded-lg"><Activity size={20}/></div>
              <div>
                <h4 className="font-bold text-teal-900 text-sm">Procesos Multivariantes</h4>
                <p className="text-xs text-teal-700 mt-1">Control simultáneo de múltiples variables correlacionadas (MEWMA).</p>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow">
              <div className="bg-purple-500 text-white p-2 rounded-lg"><Layers size={20}/></div>
              <div>
                <h4 className="font-bold text-purple-900 text-sm">Monitoreo de Varianza</h4>
                <p className="text-xs text-purple-700 mt-1">Detección de cambios en la dispersión del proceso.</p>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow">
              <div className="bg-orange-500 text-white p-2 rounded-lg"><TrendingUp size={20}/></div>
              <div>
                <h4 className="font-bold text-orange-900 text-sm">Autocorrelación</h4>
                <p className="text-xs text-orange-700 mt-1">Ajuste de residuales para procesos con dependencia temporal.</p>
              </div>
            </div>
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow">
              <div className="bg-rose-500 text-white p-2 rounded-lg"><ShieldAlert size={20}/></div>
              <div>
                <h4 className="font-bold text-rose-900 text-sm">Datos No Normales</h4>
                <p className="text-xs text-rose-700 mt-1">Transformaciones o variantes no paramétricas del gráfico.</p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 7. Ejemplo en R */}
        <SectionCard
          title="Ejemplo Práctico en R"
          explanation="Este bloque muestra cómo construir un gráfico EWMA en R usando la librería 'qcc'. Se generan datos simulados con un cambio intencional en la media, y el EWMA lo detecta cruzando el límite de control."
          visualSuggestion="El gráfico EWMA resultante donde la línea suavizada cruza los límites de control indicando un posible cambio en el proceso."
          icon={Code}
        >
          <div className="w-full flex flex-col gap-6">
            <div className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs font-mono overflow-x-auto shadow-inner">
              <pre>
                <code className="text-blue-300"># Instalar y cargar librería</code><br/>
                <span>install.packages("qcc")</span><br/>
                <span>library(qcc)</span><br/><br/>
                <code className="text-blue-300"># Generar datos simulados (cambio en media al t=30)</code><br/>
                <span>set.seed(123)</span><br/>
                <span>datos {'<-'} c(rnorm(30, mean = 0, sd = 1),</span><br/>
                <span>           rnorm(20, mean = 0.7, sd = 1))</span><br/><br/>
                <code className="text-blue-300"># Crear gráfico EWMA</code><br/>
                <span>ewma {'<-'} ewma(datos,</span><br/>
                <span>             center = 0, std.dev = 1,</span><br/>
                <span>             lambda = 0.2, nsigmas = 3)</span><br/><br/>
                <code className="text-blue-300"># Mostrar gráfico</code><br/>
                <span>plot(ewma)</span>
              </pre>
            </div>
            
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <h4 className="text-center font-bold text-sm text-slate-600 mb-2">Simulación del Gráfico Resultante</h4>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={rExampleData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tick={{fontSize: 10}} />
                  <YAxis tick={{fontSize: 10}} domain={[-2, 2]} />
                  <Tooltip />
                  <ReferenceLine y={0.8} stroke="red" strokeDasharray="3 3" label={{position: 'insideTopLeft', value: 'UCL', fill: 'red', fontSize: 10}} />
                  <ReferenceLine y={-0.8} stroke="red" strokeDasharray="3 3" label={{position: 'insideBottomLeft', value: 'LCL', fill: 'red', fontSize: 10}} />
                  <ReferenceLine y={0} stroke="green" label={{position: 'insideTopLeft', value: 'Centro', fill: 'green', fontSize: 10}} />
                  <Line type="step" dataKey="valor" stroke="#cbd5e1" strokeWidth={1} dot={{r: 1}} />
                  <Line type="monotone" dataKey="ewma" stroke="#000" strokeWidth={2} dot={{r: 3, fill: '#000'}} activeDot={{ r: 5, fill: 'red' }} />
                  {/* Highlighting points out of control */}
                  <Scatter data={rExampleData.filter(d => d.ewma > 0.8)} fill="red" />
                </ComposedChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-red-600 mt-2 font-medium">Nota: Los puntos rojos marcan donde el EWMA detecta el cambio estadístico.</p>
            </div>
          </div>
        </SectionCard>

        {/* 8. Cierre */}
        <SectionCard
          title="Resumen y Conclusiones"
          explanation="El EWMA es una alternativa flexible al CUSUM, especialmente útil en procesos con variabilidad moderada o ruido, ya que permite detectar cambios de forma gradual sin reaccionar de manera excesiva a fluctuaciones aleatorias."
          visualSuggestion="Un mapa conceptual que relacione EWMA con sus parámetros, ventajas y aplicaciones en control estadístico."
          icon={Map}
        >
          <div className="flex flex-col items-center justify-center w-full gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-lg text-lg">
              Gráfico EWMA
            </div>
            <div className="flex gap-2 w-full max-w-sm">
              <div className="w-1/2 flex flex-col items-center border-r-2 border-slate-300 pr-2">
                <span className="text-xs font-bold text-slate-500 mb-2 uppercase">Características</span>
                <div className="bg-white border border-slate-200 text-slate-700 text-xs text-center p-2 rounded mb-1 w-full shadow-sm">Suaviza el Ruido</div>
                <div className="bg-white border border-slate-200 text-slate-700 text-xs text-center p-2 rounded mb-1 w-full shadow-sm">Sensible a Pequeños Cambios</div>
                <div className="bg-white border border-slate-200 text-slate-700 text-xs text-center p-2 rounded w-full shadow-sm">Usa Historial (Peso λ)</div>
              </div>
              <div className="w-1/2 flex flex-col items-center pl-2">
                <span className="text-xs font-bold text-slate-500 mb-2 uppercase">Aplicaciones</span>
                <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs text-center p-2 rounded mb-1 w-full shadow-sm">Datos Individuales</div>
                <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs text-center p-2 rounded mb-1 w-full shadow-sm">Medias de Subgrupos</div>
                <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs text-center p-2 rounded w-full shadow-sm">Monitoreo de Químicos/Finanzas</div>
              </div>
            </div>
          </div>
        </SectionCard>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>Documento Educativo Generado Interactivamente</p>
        <p className="mt-1 opacity-60">Visualizando Conceptos de Control Estadístico de Procesos</p>
      </footer>
    </div>
  );
}