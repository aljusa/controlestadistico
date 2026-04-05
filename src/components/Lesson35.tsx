import React from 'react';
import { ArrowRight, Settings, BarChart2, TrendingUp, RefreshCw, Layers, GitMerge, Combine, Shuffle, CheckCircle2 } from 'lucide-react';

// --- COMPONENTES VISUALES ---

const VisualAlcance = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col gap-2">
      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium border border-blue-200 text-center">Var. Entrada 1</div>
      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium border border-blue-200 text-center">Var. Entrada 2</div>
      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium border border-blue-200 text-center">Var. Entrada 3</div>
    </div>
    
    <ArrowRight className="text-slate-400 rotate-90 sm:rotate-0" size={24} />
    
    <div className="flex flex-col items-center justify-center p-4 bg-indigo-600 text-white rounded-lg shadow-md w-40 text-center relative overflow-hidden">
      <Settings className="absolute opacity-20 -right-2 -bottom-2" size={48} />
      <span className="font-bold relative z-10">Proceso</span>
      <span className="text-xs text-indigo-200 relative z-10">(Experimento Controlado)</span>
    </div>

    <ArrowRight className="text-slate-400 rotate-90 sm:rotate-0" size={24} />

    <div className="px-4 py-3 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-bold border-2 border-emerald-400 shadow-sm">
      Salida (Conocimiento)
    </div>
  </div>
);

const VisualFactoresRespuesta = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-1">Factores</h4>
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-300 w-32 text-center">Temperatura</div>
        <ArrowRight className="text-amber-400" size={18} />
      </div>
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-300 w-32 text-center">Presión</div>
        <ArrowRight className="text-amber-400" size={18} />
      </div>
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-300 w-32 text-center">Tiempo</div>
        <ArrowRight className="text-amber-400" size={18} />
      </div>
    </div>
    
    <div className="hidden sm:block w-px h-32 bg-slate-300 mx-2"></div>
    <div className="sm:hidden h-px w-32 bg-slate-300 my-2"></div>

    <div className="flex flex-col items-center gap-2">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-1">Respuesta</h4>
      <div className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg flex flex-col items-center">
        <BarChart2 className="mb-2" size={32} />
        <span className="font-bold text-lg">Calidad</span>
        <span className="text-sm text-blue-100">Rendimiento, etc.</span>
      </div>
    </div>
  </div>
);

const VisualFactoriales = () => (
  <div className="flex flex-col items-center justify-center w-full p-6 bg-slate-50 rounded-xl border border-slate-200">
    <p className="text-sm font-semibold text-slate-600 mb-4">Diseño Factorial 2x2 (Todas las combinaciones)</p>
    <div className="grid grid-cols-3 gap-1 w-full max-w-xs">
      {/* Header Row */}
      <div className="flex items-center justify-center p-2"></div>
      <div className="flex items-center justify-center p-2 bg-slate-200 font-bold text-slate-700 rounded-t-md text-sm">Factor B (-)</div>
      <div className="flex items-center justify-center p-2 bg-slate-200 font-bold text-slate-700 rounded-t-md text-sm">Factor B (+)</div>
      
      {/* Row 1 */}
      <div className="flex items-center justify-center p-2 bg-slate-200 font-bold text-slate-700 rounded-l-md text-sm">Factor A (-)</div>
      <div className="flex flex-col items-center justify-center p-4 bg-indigo-100 border border-indigo-200 text-indigo-800 rounded-sm hover:bg-indigo-200 transition-colors">
        <span className="font-bold">Comb. 1</span>
        <span className="text-xs">(-, -)</span>
      </div>
      <div className="flex flex-col items-center justify-center p-4 bg-indigo-100 border border-indigo-200 text-indigo-800 rounded-sm hover:bg-indigo-200 transition-colors">
        <span className="font-bold">Comb. 2</span>
        <span className="text-xs">(-, +)</span>
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-center p-2 bg-slate-200 font-bold text-slate-700 rounded-l-md text-sm">Factor A (+)</div>
      <div className="flex flex-col items-center justify-center p-4 bg-indigo-100 border border-indigo-200 text-indigo-800 rounded-sm hover:bg-indigo-200 transition-colors">
        <span className="font-bold">Comb. 3</span>
        <span className="text-xs">(+, -)</span>
      </div>
      <div className="flex flex-col items-center justify-center p-4 bg-indigo-100 border border-indigo-200 text-indigo-800 rounded-sm hover:bg-indigo-200 transition-colors">
        <span className="font-bold">Comb. 4</span>
        <span className="text-xs">(+, +)</span>
      </div>
    </div>
  </div>
);

const VisualFraccionados = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold text-slate-600 mb-3 text-center">Diseño Completo (8 Pruebas)</h4>
      <div className="grid grid-cols-2 gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-blue-500 rounded-sm opacity-80"></div>
        ))}
      </div>
    </div>

    <ArrowRight className="text-slate-400 hidden sm:block" size={32} />
    <ArrowRight className="text-slate-400 sm:hidden rotate-90 my-2" size={24} />

    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold text-slate-600 mb-3 text-center">Fracción (4 Pruebas)</h4>
      <div className="grid grid-cols-2 gap-2">
        {[...Array(8)].map((_, i) => (
           <div key={i} className={`w-8 h-8 rounded-sm ${i % 2 === 0 ? 'bg-emerald-500 shadow-md scale-110' : 'bg-slate-200 border border-dashed border-slate-400'}`}></div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-2 mt-4 text-center max-w-[150px]">Menos experimentos,<br/>más eficiencia.</p>
    </div>
  </div>
);

const VisualAleatorizados = () => (
  <div className="flex flex-col items-center justify-center w-full p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex gap-4 mb-6">
      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border shadow-sm">
        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
        <span className="text-sm font-medium text-slate-700">Tratamiento A</span>
      </div>
      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border shadow-sm">
        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
        <span className="text-sm font-medium text-slate-700">Tratamiento B</span>
      </div>
    </div>

    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Shuffle size={100} />
      </div>
      <div className="grid grid-cols-4 gap-3 relative z-10">
        {['A', 'B', 'B', 'A', 'B', 'A', 'A', 'B', 'A', 'B', 'A', 'B'].map((t, i) => (
          <div key={i} className={`
            flex flex-col items-center justify-center p-3 rounded-lg border-2
            ${t === 'A' ? 'bg-purple-50 border-purple-200' : 'bg-orange-50 border-orange-200'}
          `}>
            <span className="text-xs text-slate-400 mb-1">Unidad {i+1}</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm
              ${t === 'A' ? 'bg-purple-500' : 'bg-orange-500'}`}>
              {t}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VisualBeneficios = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="w-24 h-24 bg-blue-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-blue-200 z-10">
      <Layers size={28} className="mb-1" />
      <span className="font-black text-lg">DOE</span>
    </div>

    <div className="flex flex-col gap-4 relative">
      {/* Líneas conectoras invisibles en móvil, visibles en desktop mediante bordes o pseudo-elementos, simplificado con flexbox */}
      <div className="flex items-center gap-3 bg-white p-3 pr-6 rounded-r-full rounded-l-xl border border-slate-200 shadow-sm transform transition hover:translate-x-2">
        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full"><TrendingUp size={20} /></div>
        <span className="font-semibold text-slate-700">Menor Variabilidad</span>
      </div>
      <div className="flex items-center gap-3 bg-white p-3 pr-6 rounded-r-full rounded-l-xl border border-slate-200 shadow-sm transform transition hover:translate-x-2">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><CheckCircle2 size={20} /></div>
        <span className="font-semibold text-slate-700">Mejor Rendimiento</span>
      </div>
      <div className="flex items-center gap-3 bg-white p-3 pr-6 rounded-r-full rounded-l-xl border border-slate-200 shadow-sm transform transition hover:translate-x-2">
        <div className="p-2 bg-amber-100 text-amber-600 rounded-full"><TrendingUp size={20} className="rotate-180" /></div>
        <span className="font-semibold text-slate-700">Reducción de Costos</span>
      </div>
    </div>
  </div>
);

const VisualCierre = () => (
  <div className="flex items-center justify-center w-full p-8 bg-slate-50 rounded-xl border border-slate-200">
    <div className="relative w-64 h-64">
      {/* Círculo central estético */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-indigo-50 rounded-full border-4 border-dashed border-indigo-200 animate-[spin_20s_linear_infinite]"></div>
      </div>
      
      {/* Nodos del ciclo */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
         <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-4 border-white">
            <Combine size={24} />
         </div>
         <span className="mt-2 font-bold text-sm text-slate-700 bg-white/80 px-2 py-1 rounded">Experimentación</span>
      </div>

      <div className="absolute bottom-4 right-0 flex flex-col items-center">
         <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-4 border-white">
            <BarChart2 size={24} />
         </div>
         <span className="mt-2 font-bold text-sm text-slate-700 bg-white/80 px-2 py-1 rounded">Análisis</span>
      </div>

      <div className="absolute bottom-4 left-0 flex flex-col items-center">
         <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-4 border-white">
            <TrendingUp size={24} />
         </div>
         <span className="mt-2 font-bold text-sm text-slate-700 bg-white/80 px-2 py-1 rounded">Mejora</span>
      </div>

      {/* Flechas indicadoras de ciclo */}
      <RefreshCw className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-300 w-24 h-24 opacity-50" />
    </div>
  </div>
);

// --- DATOS DE LA LECCIÓN ---

const lessonData = [
  {
    id: 'alcance',
    title: 'Alcance del diseño de experimentos',
    explanation: 'El diseño de experimentos (DOE) es una metodología estadística que permite estudiar de manera estructurada cómo diferentes variables influyen en un proceso. Su objetivo es generar conocimiento confiable mediante pruebas controladas, optimizando el aprendizaje con el menor número de experimentos posibles.',
    VisualComponent: VisualAlcance
  },
  {
    id: 'concepto',
    title: 'Concepto clave: factores y respuesta',
    explanation: 'En el DOE se manipulan deliberadamente variables de entrada, llamadas factores, para observar su efecto sobre una variable de salida, denominada respuesta. Este enfoque permite identificar relaciones causa-efecto y comprender cómo los cambios en los factores impactan el resultado.',
    VisualComponent: VisualFactoresRespuesta
  },
  {
    id: 'factoriales',
    title: 'Diseños factoriales',
    explanation: 'Los diseños factoriales estudian todas las combinaciones posibles de los niveles de los factores. Esto permite analizar no solo los efectos individuales, sino también las interacciones entre variables.',
    VisualComponent: VisualFactoriales
  },
  {
    id: 'fraccionados',
    title: 'Diseños fraccionados',
    explanation: 'Los diseños fraccionados utilizan solo una parte de las combinaciones posibles del diseño factorial completo. Se emplean cuando hay muchos factores y se busca reducir el número de experimentos, sacrificando cierta información a cambio de eficiencia.',
    VisualComponent: VisualFraccionados
  },
  {
    id: 'aleatorizados',
    title: 'Diseños completamente aleatorizados',
    explanation: 'En este tipo de diseño, las unidades experimentales se asignan aleatoriamente a los tratamientos. La aleatorización ayuda a evitar sesgos y asegura que los resultados sean atribuibles a los factores estudiados y no a influencias externas.',
    VisualComponent: VisualAleatorizados
  },
  {
    id: 'beneficios',
    title: 'Beneficios del diseño de experimentos',
    explanation: 'El DOE permite identificar las causas de la variabilidad en un proceso, optimizar condiciones operativas y reducir costos asociados a pruebas innecesarias. Su enfoque sistemático mejora la eficiencia del análisis y la calidad de las conclusiones.',
    VisualComponent: VisualBeneficios
  },
  {
    id: 'cierre',
    title: 'Cierre conceptual',
    explanation: 'El diseño de experimentos es una herramienta poderosa para comprender procesos complejos mediante la experimentación controlada. Su aplicación permite tomar decisiones basadas en evidencia y lograr mejoras significativas en calidad y eficiencia.',
    VisualComponent: VisualCierre
  }
];

// --- COMPONENTE PRINCIPAL APP ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GitMerge className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Lección 4</h1>
            <h2 className="text-sm font-medium text-slate-500 tracking-wide uppercase">Diseño de Experimentos (DOE)</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <p className="text-lg text-slate-600">
            Aprende cómo optimizar procesos y tomar decisiones basadas en evidencia mediante pruebas controladas y análisis estadístico estructurado.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {lessonData.map((section, index) => (
            <article 
              key={section.id} 
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md"
            >
              {/* Sección de Texto */}
              <div className="p-8 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-base">
                  {section.explanation}
                </p>
              </div>

              {/* Sección Visual */}
              <div className="p-6 md:w-1/2 flex items-center justify-center bg-slate-50/50">
                <section.VisualComponent />
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 mt-12 text-center text-slate-400 text-sm">
        <p>Módulo de Diseño de Experimentos • Formato Educativo Interactivo</p>
      </footer>
    </div>
  );
}