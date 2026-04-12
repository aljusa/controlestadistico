import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Activity, Code, Layers, Info, CheckCircle2 } from 'lucide-react';

// Utilidad para generar números aleatorios con distribución normal (Aproximación Box-Muller)
const generateNormal = (mean = 0, stdDev = 1) => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return num * stdDev + mean;
};

export default function MovingAveragePage() {
  // Generar datos estáticos al montar el componente para evitar parpadeos
  const dataSeries = useMemo(() => {
    const data = [];
    for (let i = 0; i < 30; i++) data.push(generateNormal(0, 1));
    for (let i = 0; i < 20; i++) data.push(generateNormal(1.5, 1)); // Cambio en la media
    return data;
  }, []);

  const windowSize = 5;

  // Calcular el promedio móvil (sides = 1, como en el ejemplo de R)
  const maSeries = useMemo(() => {
    return dataSeries.map((_, i, arr) => {
      if (i < windowSize - 1) return null;
      let sum = 0;
      for (let j = 0; j < windowSize; j++) {
        sum += arr[i - j];
      }
      return sum / windowSize;
    });
  }, [dataSeries, windowSize]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Header */}
     

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-16">
        
        {/* Título Principal */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">El Gráfico de Promedio Móvil (Moving Average)</h2>
          
        </div>

        {/* Sección 1: Introducción */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:flex gap-8 items-center">
            <div className="md:w-1/2 space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
                <Info className="w-5 h-5" />
                <h3>Introducción</h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-justify">
                El gráfico de promedio móvil (MA) es una técnica de suavizamiento que reduce la variabilidad de una serie de datos mediante el cálculo de promedios de observaciones consecutivas. Es especialmente útil para visualizar tendencias subyacentes que de otro modo estarían ocultas por el "ruido" de los datos originales.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {/* Visual Suggestion 1: Simple Line Chart */}
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Visualización Sugerida</h4>
              <SimpleChart rawData={dataSeries} maData={maSeries} />
            </div>
          </div>
        </section>

        {/* Sección 2: Funcionamiento */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold">
            <Layers className="w-6 h-6" />
            <h3 className="text-2xl text-slate-900">¿Cómo Funciona?</h3>
          </div>
          <p className="text-slate-700 leading-relaxed text-lg">
            El promedio móvil se calcula tomando los últimos <code className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">n</code> datos de la serie y obteniendo su promedio. A medida que avanza la serie, la "ventana" se desplaza, descartando el dato más antiguo e incluyendo el más reciente, generando una nueva media en cada paso.
          </p>
          
          {/* Visual Suggestion 2: Sliding Window Animation */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="text-sm font-bold text-slate-500 mb-6 text-center">Animación: Ventana Deslizante (n=5)</h4>
            <SlidingWindowDemo data={dataSeries.slice(0, 20)} windowSize={5} />
          </div>
        </section>

        {/* Sección 3 y 4: Aplicaciones y Ejemplo R */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Aplicaciones */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-4">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-xl text-slate-900">Aplicaciones</h3>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              El promedio móvil es sumamente útil cuando se desea <strong>eliminar el ruido de corto plazo</strong> y resaltar patrones más estables. En industrias, finanzas o control de calidad, facilita la identificación visual de tendencias o ciclos a largo plazo.
            </p>
            <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3">
               <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
               <p className="text-sm text-emerald-800">
                 Al comparar la serie ruidosa con su versión suavizada, la línea de tendencia central se vuelve inconfundible.
               </p>
            </div>
          </section>

          {/* Ejemplo en R */}
          <section className="bg-slate-900 text-slate-100 p-8 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-4">
              <Code className="w-6 h-6" />
              <h3 className="text-xl text-white">Ejemplo en R</h3>
            </div>
            <p>
              Una empresa desea analizar el comportamiento de un proceso a lo largo del tiempo y detectar posibles cambios en su media mediante el uso de técnicas de suavizamiento. <br />

Se recolectan 50 observaciones de una característica de calidad. Se sabe que durante las primeras 30 observaciones el proceso tiene una media de 0 y desviación estándar de 1. Posteriormente, el proceso experimenta un cambio en su media a 1, manteniendo constante la variabilidad. <br />

Para analizar la evolución del proceso, se utiliza un promedio móvil con tamaño de ventana de 5 observaciones.
 <br />
 <br />
Se pide: <br />

Calcular el promedio móvil de los datos utilizando una ventana de tamaño 5. <br />
Graficar los datos originales junto con el promedio móvil. <br />
Analizar cómo el promedio móvil refleja el cambio en la media del proceso. <br />
Determinar aproximadamente a partir de qué observación se comienza a evidenciar el cambio. <br />
Explicar la utilidad del promedio móvil para detectar cambios en procesos en comparación con los datos originales.
            </p>
            <div className="bg-slate-950 p-4 rounded-lg  text-sm font-mono text-slate-300 flex-grow border border-slate-800">
<pre className="p-4 text-sm font-mono text-slate-300  whitespace-pre">
<code>
<span className="text-slate-500"># Generar datos simulados{"\n"}</span>
set.seed(123){"\n"}
datos &lt;- c(rnorm(30, mean = 0, sd = 1),{"\n"}
{"           "}rnorm(20, mean = 1, sd = 1)){"\n\n"}

<span className="text-slate-500"># Definir tamaño de ventana{"\n"}</span>
n &lt;- 5{"\n\n"}

<span className="text-slate-500"># Calcular promedio móvil{"\n"}</span>
ma &lt;- filter(datos, rep(1/n, n), sides = 1){"\n\n"}

<span className="text-slate-500"># Graficar{"\n"}</span>
plot(datos, type = "l", col = "gray",{"\n"}
{"     "}main = "Promedio Móvil",{"\n"}
{"     "}ylab = "Valores", xlab = "Observ."){"\n"}
lines(ma, col = "blue", lwd = 2)
</code>
</pre>
            </div>
          </section>
        </div>

        {/* Sección 5: Cierre y Cuadro Comparativo */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Comparativa de Métodos</h3>
            <p className="text-slate-700 leading-relaxed text-lg">
              El promedio móvil es una herramienta simple pero efectiva. Aunque es menos sensible que otros métodos avanzados para detectar cambios pequeños, su facilidad de implementación lo hace imprescindible.
            </p>
          </div>

          {/* Visual Suggestion 5: Comparative Schema */}
          <div className="grid md:grid-cols-3 gap-6">
            <ComparisonCard 
              title="Promedio Móvil (MA)" 
              complexity="Baja" 
              sensitivity="Baja-Media (Cambios grandes)"
              color="bg-blue-50 border-blue-200 text-blue-900"
              tagColor="bg-blue-100 text-blue-700"
              desc="Excelente para análisis exploratorio rápido y suavizamiento general. Fácil de comprender."
            />
            <ComparisonCard 
              title="EWMA" 
              subtitle="(Exponentially Weighted)"
              complexity="Media" 
              sensitivity="Alta (Cambios pequeños)"
              color="bg-purple-50 border-purple-200 text-purple-900"
              tagColor="bg-purple-100 text-purple-700"
              desc="Pondera más los datos recientes. Excelente para detectar variaciones graduales rápidamente."
            />
            <ComparisonCard 
              title="CUSUM" 
              subtitle="(Cumulative Sum)"
              complexity="Alta" 
              sensitivity="Muy Alta (Cambios pequeños)"
              color="bg-rose-50 border-rose-200 text-rose-900"
              tagColor="bg-rose-100 text-rose-700"
              desc="Acumula pequeñas desviaciones de la media objetivo. Ideal para control de calidad estricto."
            />
          </div>
        </section>

      </main>
    </div>
  );
}

// --- Componentes Visuales / Gráficos Auxiliares ---

// 1. Gráfico estático (simulando el resultado de R)
function SimpleChart({ rawData, maData }) {
  const min = Math.min(...rawData) - 1;
  const max = Math.max(...rawData) + 1;
  
  const getCoordinates = (dataArray) => {
    return dataArray.map((val, i) => {
      if (val === null) return null;
      const x = (i / (rawData.length - 1)) * 100;
      const y = 100 - ((val - min) / (max - min)) * 100;
      return `${x},${y}`;
    }).filter(Boolean).join(" ");
  };

  return (
    <div className="w-full relative aspect-[16/9] bg-white rounded border border-slate-200 shadow-inner p-2">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Ejes y Grid */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" />
        
        {/* Datos Originales (Gris) */}
        <polyline
          points={getCoordinates(rawData)}
          fill="none"
          stroke="#94a3b8" // gray-400
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        
        {/* Promedio Móvil (Azul) */}
        <polyline
          points={getCoordinates(maData)}
          fill="none"
          stroke="#2563eb" // blue-600
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Leyenda */}
      <div className="absolute top-4 left-4 bg-white/90 p-2 text-[10px] rounded border border-slate-200 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-3 h-0.5 bg-slate-400"></div>
          <span className="text-slate-600">Datos originales</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1 bg-blue-600"></div>
          <span className="text-slate-800 font-semibold">Promedio móvil</span>
        </div>
      </div>
    </div>
  );
}

// 2. Animación de la Ventana Deslizante
function SlidingWindowDemo({ data, windowSize }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (data.length - windowSize + 1));
    }, 1500); // Mueve la ventana cada 1.5s
    return () => clearInterval(timer);
  }, [data.length, windowSize]);

  const min = Math.min(...data) - 1;
  const max = Math.max(...data) + 1;

  // Extraer los puntos en la ventana actual
  const currentWindowData = data.slice(currentIndex, currentIndex + windowSize);
  const currentAverage = currentWindowData.reduce((a, b) => a + b, 0) / windowSize;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full relative h-48 bg-slate-50 rounded-xl border border-slate-200 p-4">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${data.length * 10} 100`} preserveAspectRatio="none">
          {/* Línea Central (0 referencial) */}
          <line x1="0" y1="50" x2={data.length * 10} y2="50" stroke="#cbd5e1" strokeDasharray="1 1" strokeWidth="0.5"/>
          
          {/* Rectángulo Resaltador de la Ventana */}
          <rect 
            x={currentIndex * 10} 
            y="0" 
            width={(windowSize - 1) * 10} 
            height="100" 
            fill="#e0e7ff" // indigo-100
            className="transition-all duration-500 ease-in-out opacity-50 rounded"
          />

          {/* Dibujar los puntos y líneas de conexión de los datos originales */}
          {data.map((val, i) => {
            const x = i * 10;
            const y = 100 - ((val - min) / (max - min)) * 100;
            return (
              <g key={i}>
                {i > 0 && (
                  <line
                    x1={(i - 1) * 10}
                    y1={100 - ((data[i - 1] - min) / (max - min)) * 100}
                    x2={x}
                    y2={y}
                    stroke="#94a3b8"
                    strokeWidth="0.5"
                  />
                )}
                <circle 
                  cx={x} 
                  cy={y} 
                  r="1.5" 
                  fill={i >= currentIndex && i < currentIndex + windowSize ? "#4f46e5" : "#94a3b8"} 
                  className="transition-colors duration-300"
                />
              </g>
            );
          })}

          {/* Línea Horizontal indicando el Promedio Actual */}
          <line 
             x1={currentIndex * 10}
             y1={100 - ((currentAverage - min) / (max - min)) * 100}
             x2={(currentIndex + windowSize - 1) * 10}
             y2={100 - ((currentAverage - min) / (max - min)) * 100}
             stroke="#ef4444" // red-500
             strokeWidth="1.5"
             className="transition-all duration-500 ease-in-out drop-shadow-md"
          />
          {/* Punto representativo del promedio calculado al final de la ventana */}
           <circle 
              cx={(currentIndex + windowSize - 1) * 10} 
              cy={100 - ((currentAverage - min) / (max - min)) * 100} 
              r="2" 
              fill="#ef4444" 
              className="transition-all duration-500 ease-in-out"
            />
        </svg>
      </div>
      
      {/* Explicación de la animación */}
      <div className="mt-6 flex items-center justify-between w-full max-w-md bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
        <div className="text-center">
          <span className="block text-xs text-slate-500 uppercase">Paso / Observación</span>
          <span className="font-mono font-bold text-slate-800 text-lg">t = {currentIndex + windowSize}</span>
        </div>
        <div className="h-8 w-px bg-slate-200"></div>
        <div className="text-center">
           <span className="block text-xs text-slate-500 uppercase">Fórmula de la ventana</span>
           <span className="text-indigo-600 font-medium text-sm">(X<sub>{currentIndex+1}</sub> + ... + X<sub>{currentIndex+windowSize}</sub>) / 5</span>
        </div>
        <div className="h-8 w-px bg-slate-200"></div>
        <div className="text-center">
           <span className="block text-xs text-slate-500 uppercase">Promedio Móvil</span>
           <span className="font-mono font-bold text-red-500 text-lg">{currentAverage.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

// 3. Tarjeta Comparativa
function ComparisonCard({ title, subtitle, complexity, sensitivity, desc, color, tagColor }) {
  return (
    <div className={`p-6 rounded-2xl border ${color} shadow-sm flex flex-col h-full`}>
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      {subtitle && <span className="text-xs opacity-75 mb-4 block">{subtitle}</span>}
      {!subtitle && <div className="mb-4"></div>}
      
      <div className="space-y-3 flex-grow text-sm">
        <div>
          <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">Complejidad</span>
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${tagColor}`}>
            {complexity}
          </span>
        </div>
        <div>
          <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">Sensibilidad</span>
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${tagColor}`}>
            {sensitivity}
          </span>
        </div>
      </div>
      <p className="mt-4 pt-4 border-t border-current/10 text-sm leading-relaxed opacity-90">
        {desc}
      </p>
    </div>
  );
}