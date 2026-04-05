import React from 'react';
import { ArrowRight, TrendingUp, ScatterChart, Share2, Target, Lightbulb, Settings, BarChart2 } from 'lucide-react';

// --- Visual Components ---

const VisualNubePuntos = () => (
  <div className="relative w-full h-48 bg-white rounded-lg border border-slate-200 shadow-inner flex items-center justify-center p-4">
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      {/* Axes */}
      <line x1="10" y1="90" x2="95" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="10" y1="90" x2="10" y2="5" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Data Points */}
      {[
        [15, 80], [25, 65], [20, 75], [35, 60], [40, 50], [45, 65], 
        [50, 45], [60, 35], [70, 40], [75, 25], [85, 20], [80, 15]
      ].map((point, i) => (
        <circle key={i} cx={point[0]} cy={point[1]} r="2.5" className="fill-blue-500 opacity-70" />
      ))}
      {/* Trend Line */}
      <line x1="10" y1="85" x2="90" y2="15" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 2" />
    </svg>
    <div className="absolute top-2 right-2 flex items-center text-xs text-slate-500 font-medium bg-white/80 p-1 rounded">
      <div className="w-3 h-0.5 bg-red-500 mr-1"></div> Tendencia
    </div>
  </div>
);

const VisualRelacionSimple = () => (
  <div className="w-full h-48 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4 p-4 shadow-inner">
    <div className="bg-blue-100 border-2 border-blue-400 text-blue-800 font-semibold px-4 py-3 rounded-lg shadow-sm text-center">
      Variable<br/>Independiente (X)
    </div>
    <div className="flex flex-col items-center text-slate-400">
      <span className="text-xs font-semibold mb-1 text-slate-500">Influye / Predice</span>
      <ArrowRight className="w-8 h-8 text-blue-500 animate-pulse" />
    </div>
    <div className="bg-green-100 border-2 border-green-400 text-green-800 font-semibold px-4 py-3 rounded-lg shadow-sm text-center">
      Variable<br/>Dependiente (Y)
    </div>
  </div>
);

const VisualRegresionLineal = () => (
  <div className="relative w-full h-48 bg-white rounded-lg border border-slate-200 shadow-inner flex items-center justify-center p-4">
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      {/* Axes */}
      <line x1="10" y1="90" x2="95" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="10" y1="90" x2="10" y2="5" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Data Points */}
      {[
        [20, 80], [30, 70], [40, 50], [50, 60], [60, 40], [70, 30], [80, 20]
      ].map((point, i) => (
        <circle key={i} cx={point[0]} cy={point[1]} r="2" className="fill-indigo-500" />
      ))}
      {/* Solid Line representing Best Fit */}
      <line x1="15" y1="85" x2="85" y2="15" stroke="#4f46e5" strokeWidth="3" />
    </svg>
    <div className="absolute bottom-4 left-14 text-xs font-bold text-indigo-700 bg-white/80 px-1">
      Y = a + bX
    </div>
  </div>
);

const VisualRegresionMultiple = () => (
  <div className="w-full h-48 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center gap-6 p-4 shadow-inner relative overflow-hidden">
    <div className="flex flex-col gap-3 z-10">
      <div className="bg-blue-50 border border-blue-300 text-blue-700 text-xs font-semibold px-3 py-2 rounded shadow-sm text-center">Factor 1 (X₁)</div>
      <div className="bg-blue-50 border border-blue-300 text-blue-700 text-xs font-semibold px-3 py-2 rounded shadow-sm text-center">Factor 2 (X₂)</div>
      <div className="bg-blue-50 border border-blue-300 text-blue-700 text-xs font-semibold px-3 py-2 rounded shadow-sm text-center">Factor 3 (X₃)</div>
    </div>
    
    <div className="relative w-16 h-full flex items-center justify-center z-0">
       {/* Drawing converging SVG arrows */}
       <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 0 20 Q 50 20 100 50" fill="transparent" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <path d="M 0 50 L 100 50" fill="transparent" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <path d="M 0 80 Q 50 80 100 50" fill="transparent" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>
       </svg>
    </div>

    <div className="bg-green-100 border-2 border-green-500 text-green-800 font-bold px-4 py-6 rounded-lg shadow-md text-center z-10">
      Resultado<br/>(Y)
    </div>
  </div>
);

const VisualAplicaciones = () => (
  <div className="w-full h-56 bg-white rounded-lg border border-slate-200 shadow-inner flex items-center justify-center p-4">
    <div className="relative w-full max-w-sm h-full flex items-center justify-center">
      {/* Center Node */}
      <div className="absolute z-10 bg-indigo-600 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-lg shadow-indigo-200">
        Modelo de Regresión
      </div>
      
      {/* Branch 1: Predicción */}
      <div className="absolute top-2 left-4 text-center z-10">
        <div className="bg-amber-100 text-amber-700 border border-amber-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm mb-1">Predicción</div>
      </div>
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 50 50 L 25 20" fill="transparent" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
      </svg>

      {/* Branch 2: Análisis */}
      <div className="absolute top-2 right-4 text-center z-10">
        <div className="bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm mb-1">Análisis</div>
      </div>
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 50 50 L 75 20" fill="transparent" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
      </svg>

      {/* Branch 3: Decisiones */}
      <div className="absolute bottom-2 text-center z-10">
        <div className="bg-rose-100 text-rose-700 border border-rose-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm mt-1">Decisiones basadas en Datos</div>
      </div>
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 50 50 L 50 85" fill="transparent" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
      </svg>
    </div>
  </div>
);

const VisualEjemploProcesos = () => (
  <div className="relative w-full h-56 bg-slate-900 rounded-lg border border-slate-700 shadow-inner flex items-center justify-center p-4">
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      {/* Axes */}
      <line x1="15" y1="85" x2="95" y2="85" stroke="#475569" strokeWidth="1.5" />
      <line x1="15" y1="85" x2="15" y2="5" stroke="#475569" strokeWidth="1.5" />
      
      {/* Labels */}
      <text x="50" y="98" fill="#94a3b8" fontSize="6" textAnchor="middle">Temperatura (X)</text>
      <text x="-45" y="5" transform="rotate(-90)" fill="#94a3b8" fontSize="6" textAnchor="middle">Calidad (Y)</text>

      {/* Optimum curve (Parabola representing an optimal temperature range) */}
      <path d="M 15 70 Q 55 -10 95 70" fill="transparent" stroke="#10b981" strokeWidth="3" />
      
      {/* Points */}
      {[
        [20, 60], [30, 40], [40, 25], [50, 20], [60, 22], [70, 35], [80, 55], [90, 75]
      ].map((point, i) => (
        <circle key={i} cx={point[0]} cy={point[1]} r="2" fill="#38bdf8" />
      ))}
      
      {/* Optimum highlight area */}
      <rect x="40" y="0" width="30" height="85" fill="#10b981" opacity="0.1" />
      <line x1="55" y1="85" x2="55" y2="88" stroke="#10b981" strokeWidth="1" />
      <text x="55" y="93" fill="#10b981" fontSize="4" textAnchor="middle" fontWeight="bold">Rango Óptimo</text>
    </svg>
  </div>
);

const VisualCierre = () => (
  <div className="w-full h-48 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg border border-indigo-200 flex items-center justify-center p-4 shadow-inner">
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl justify-between">
      
      <div className="flex flex-col items-center group">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-indigo-200 group-hover:scale-110 transition-transform">
          <Settings className="text-indigo-600 w-8 h-8" />
        </div>
        <span className="mt-2 text-xs font-bold text-indigo-900 uppercase tracking-wider">Variables</span>
      </div>

      <div className="hidden sm:block flex-1 h-0.5 bg-indigo-300 relative">
         <ArrowRight className="absolute -right-2 -top-2 text-indigo-400 w-5 h-5" />
      </div>

      <div className="flex flex-col items-center group">
        <div className="w-20 h-20 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
          <Target className="text-white w-10 h-10" />
        </div>
        <span className="mt-2 text-xs font-bold text-indigo-900 uppercase tracking-wider text-center">Modelo<br/>Matemático</span>
      </div>

      <div className="hidden sm:block flex-1 h-0.5 bg-indigo-300 relative">
         <ArrowRight className="absolute -right-2 -top-2 text-indigo-400 w-5 h-5" />
      </div>

      <div className="flex flex-col items-center group">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-emerald-200 group-hover:scale-110 transition-transform">
          <Lightbulb className="text-emerald-500 w-8 h-8" />
        </div>
        <span className="mt-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">Predicción</span>
      </div>

    </div>
  </div>
);

// --- Data Content ---
const lessonsData = [
  {
    id: 1,
    title: "Alcance del análisis de regresión",
    explanation: "El análisis de regresión es una técnica estadística que permite estudiar la relación entre variables con el fin de explicar y predecir comportamientos. Se utiliza ampliamente en procesos productivos para comprender cómo ciertos factores influyen en los resultados.",
    visualText: "Gráfico general con nube de puntos y línea de tendencia.",
    icon: <ScatterChart className="w-6 h-6 text-blue-600" />,
    VisualComponent: VisualNubePuntos
  },
  {
    id: 2,
    title: "Concepto de relación entre variables",
    explanation: "La regresión analiza cómo una variable dependiente (respuesta) cambia en función de una o más variables independientes (predictoras). Este enfoque permite modelar matemáticamente relaciones y cuantificar su intensidad.",
    visualText: "Esquema funcional de Variable Independiente (X) a Variable Dependiente (Y).",
    icon: <Share2 className="w-6 h-6 text-purple-600" />,
    VisualComponent: VisualRelacionSimple
  },
  {
    id: 3,
    title: "Regresión lineal simple",
    explanation: "La regresión lineal simple estudia la relación entre una variable independiente y una dependiente mediante una línea recta. Esta línea representa la mejor aproximación de la relación entre ambas variables.",
    visualText: "Diagrama de dispersión con línea recta ajustada.",
    icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
    VisualComponent: VisualRegresionLineal
  },
  {
    id: 4,
    title: "Regresión lineal múltiple",
    explanation: "La regresión lineal múltiple analiza el efecto de dos o más variables independientes sobre una variable dependiente. Permite evaluar la influencia simultánea de varios factores en un resultado.",
    visualText: "Esquema de variables X1, X2, X3 convergiendo en Y.",
    icon: <BarChart2 className="w-6 h-6 text-teal-600" />,
    VisualComponent: VisualRegresionMultiple
  },
  {
    id: 5,
    title: "Aplicaciones del análisis de regresión",
    explanation: "El análisis de regresión permite predecir resultados futuros, identificar relaciones significativas entre variables y apoyar la toma de decisiones basadas en datos. Es especialmente útil para optimizar procesos y anticipar comportamientos.",
    visualText: "Diagrama conectando modelo con predicción, análisis y decisiones.",
    icon: <Target className="w-6 h-6 text-rose-600" />,
    VisualComponent: VisualAplicaciones
  },
  {
    id: 6,
    title: "Ejemplo conceptual en procesos productivos",
    explanation: "Un ejemplo típico es analizar la relación entre la temperatura de un proceso y la calidad del producto final. A través de la regresión, se puede determinar cómo los cambios en la temperatura afectan la calidad y cuál es el rango óptimo de operación.",
    visualText: "Gráfico de Temperatura (X) vs Calidad (Y) mostrando tendencia.",
    icon: <Settings className="w-6 h-6 text-slate-600" />,
    VisualComponent: VisualEjemploProcesos
  },
  {
    id: 7,
    title: "Cierre conceptual",
    explanation: "El análisis de regresión es una herramienta clave para entender, modelar y predecir relaciones dentro de los procesos productivos. Su uso adecuado permite mejorar la toma de decisiones y optimizar el desempeño de los sistemas.",
    visualText: "Esquema integrador: Variables -> Modelo -> Predicción.",
    icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
    VisualComponent: VisualCierre
  }
];

// --- Main App Component ---
export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-12 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <BarChart2 className="w-16 h-16 text-blue-100" />
          </div>
          <div>
            <h1 className="text-sm uppercase tracking-widest font-semibold text-blue-200 mb-2">Lección 5</h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Análisis de Regresión</h2>
            <p className="text-lg text-blue-100 max-w-2xl leading-relaxed">
              Explora cómo las variables se relacionan entre sí para explicar el presente y predecir el futuro en los procesos productivos.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-12 px-6">
        <div className="space-y-16">
          {lessonsData.map((lesson, index) => (
            <section key={lesson.id} className="relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
              
              {/* Section Number Badge */}
              <div className="absolute top-0 left-0 bg-slate-100 text-slate-400 font-bold px-4 py-2 rounded-br-xl text-sm">
                0{index + 1}
              </div>

              <div className="p-8 md:p-10 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  
                  {/* Text Content */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {lesson.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                        {lesson.title}
                      </h3>
                    </div>
                    
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-600 text-lg leading-relaxed">
                        {lesson.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Visual Content */}
                  <div className="space-y-3 flex flex-col">
                    <div className="w-full">
                      <lesson.VisualComponent />
                    </div>
                    
                    {/* Visual Suggestion Note */}
                    <div className="flex items-start gap-2 bg-slate-50 text-slate-500 text-xs p-3 rounded-lg border border-slate-100 italic">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p><strong>Sugerencia visual original:</strong> {lesson.visualText}</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center mt-12">
        <p className="text-sm">Diseñado por Ideastoweb • Transformando textos en experiencias interactivas.</p>
      </footer>
    </div>
  );
}