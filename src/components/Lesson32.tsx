import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
   
  BarChart2, 
  Target, 
  Activity, 
  Layers, 
  Zap, 
  Award, 
  ArrowRight,
} from 'lucide-react';

// --- DATA ---
const lessonData = [
  {
    id: 1,
    title: "Alcance de los métodos estadísticos avanzados",
    explanation: "Los métodos estadísticos avanzados amplían el control estadístico de procesos más allá de las cartas de control tradicionales. Su propósito es analizar variaciones más complejas, identificar causas subyacentes y optimizar procesos con mayor precisión. Estos métodos no sustituyen las herramientas básicas, sino que las complementan, permitiendo un enfoque más integral en la mejora continua.",
    visualType: "scope"
  },
  {
    id: 2,
    title: "Muestreo de aceptación",
    explanation: "El muestreo de aceptación es una técnica que permite decidir si un lote de productos cumple con los estándares de calidad a partir de una muestra representativa. En lugar de inspeccionar todos los elementos, se analiza una parte del lote para tomar decisiones eficientes sobre su aceptación o rechazo.",
    visualType: "sampling"
  },
  {
    id: 3,
    title: "Análisis de capacidad del proceso",
    explanation: "Este método evalúa si un proceso es capaz de producir dentro de los límites de especificación establecidos. Utiliza indicadores como Cp y Cpk para medir qué tan bien el proceso cumple con los requisitos de calidad, considerando su variabilidad y centrado.",
    visualType: "capacity"
  },
  {
    id: 4,
    title: "Diseño de experimentos (DOE)",
    explanation: "El diseño de experimentos es una metodología estructurada para estudiar el efecto de múltiples variables sobre un proceso. Permite identificar qué factores influyen significativamente en los resultados y cómo interactúan entre sí, optimizando así las condiciones del proceso.",
    visualType: "doe"
  },
  {
    id: 5,
    title: "Análisis de regresión",
    explanation: "El análisis de regresión se utiliza para modelar la relación entre una variable dependiente y una o más variables independientes. Este método permite predecir resultados y entender cómo los cambios en ciertas variables afectan el comportamiento del proceso.",
    visualType: "regression"
  },
  {
    id: 6,
    title: "Métodos multivariantes",
    explanation: "Los métodos multivariantes analizan múltiples variables simultáneamente para comprender patrones complejos en los datos. Son especialmente útiles cuando las variables están correlacionadas y no pueden evaluarse de manera aislada.",
    visualType: "multivariate"
  },
  {
    id: 7,
    title: "Importancia en la industria",
    explanation: "El uso de estos métodos permite reducir errores y desperdicios, mejorar la eficiencia de los procesos y fundamentar la toma de decisiones en datos objetivos. Esto se traduce en mayor calidad, menor costo y mayor competitividad en entornos industriales.",
    visualType: "importance"
  },
 
];

// --- VISUAL COMPONENTS ---

const ScopeDiagram = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col gap-4 w-full md:w-1/3">
      <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 text-center text-sm font-semibold text-slate-700 flex flex-col items-center">
        <BarChart2 className="w-6 h-6 mb-2 text-blue-500" />
        Cartas de Control (Tradicional)
      </div>
      <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200 text-center text-sm font-semibold text-blue-800 flex flex-col items-center">
        <Layers className="w-6 h-6 mb-2 text-blue-600" />
        Métodos Avanzados
      </div>
    </div>
    
    <div className="flex flex-col items-center justify-center text-slate-400">
      <div className="hidden md:block h-px w-12 bg-slate-300 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-slate-300"></div>
      </div>
      <div className="md:hidden w-px h-12 bg-slate-300 relative">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-slate-300"></div>
      </div>
    </div>

    <div className="p-6 bg-indigo-600 rounded-lg shadow-md text-center text-white font-bold flex flex-col items-center w-full md:w-1/3">
      <Target className="w-8 h-8 mb-2 text-indigo-200" />
      Análisis Integral y Mejora Continua
    </div>
  </div>
);

const SamplingDiagram = () => {
  const lot = Array.from({ length: 48 });
  const sample = Array.from({ length: 8 });
  
  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-200">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full justify-center">
        
        {/* Lote Grande */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-8 gap-1 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
            {lot.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${Math.random() > 0.8 ? 'bg-red-400' : 'bg-blue-400'}`}></div>
            ))}
          </div>
          <span className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lote Completo</span>
        </div>

        <ArrowRight className="text-slate-300 hidden md:block w-8 h-8" />

        {/* Muestra */}
        <div className="flex flex-col items-center relative">
          <div className="absolute -inset-2 border-2 border-dashed border-indigo-400 rounded-xl opacity-50"></div>
          <div className="grid grid-cols-4 gap-1 p-3 bg-white border border-slate-200 rounded-lg shadow-sm relative z-10">
            {sample.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 3 ? 'bg-red-400' : 'bg-blue-400'}`}></div>
            ))}
          </div>
          <span className="mt-4 text-xs font-semibold text-indigo-600 uppercase tracking-wider">Muestra</span>
        </div>
      </div>

      <div className="w-px h-8 bg-slate-300 my-4"></div>

      {/* Decisión */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" /> Aceptar
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-full text-sm font-medium">
          <XCircle className="w-4 h-4" /> Rechazar
        </div>
      </div>
    </div>
  );
};

const CapacityDiagram = () => (
  <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex justify-center">
    <svg viewBox="0 0 500 250" className="w-full max-w-lg h-auto drop-shadow-sm">
      {/* Background/Axes */}
      <line x1="20" y1="200" x2="480" y2="200" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Spec Limits */}
      <rect x="100" y="20" width="300" height="180" fill="#e0e7ff" opacity="0.3" />
      <line x1="100" y1="20" x2="100" y2="210" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
      <text x="100" y="15" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">LSL</text>
      
      <line x1="400" y1="20" x2="400" y2="210" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
      <text x="400" y="15" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">USL</text>

      {/* Bell Curve Path */}
      <path 
        d="M 50 200 C 150 200, 180 40, 250 40 C 320 40, 350 200, 450 200" 
        fill="none" 
        stroke="#4f46e5" 
        strokeWidth="4" 
      />
      {/* Fill Area under curve */}
      <path 
        d="M 50 200 C 150 200, 180 40, 250 40 C 320 40, 350 200, 450 200 L 450 200 Z" 
        fill="#4f46e5" 
        opacity="0.1" 
      />

      {/* Target line */}
      <line x1="250" y1="40" x2="250" y2="200" stroke="#4f46e5" strokeWidth="1" strokeDasharray="3,3" />
      <text x="250" y="220" textAnchor="middle" fill="#64748b" fontSize="12">Objetivo (Centrado)</text>
    </svg>
  </div>
);

const DOEDiagram = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
    {/* Matrix */}
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <div className="text-center text-xs font-bold text-slate-500 mb-2">Matriz de Factores</div>
      <div className="grid grid-cols-3 gap-px bg-slate-200 border border-slate-200">
        <div className="bg-slate-50 p-2 text-center text-xs font-bold">Exp</div>
        <div className="bg-slate-50 p-2 text-center text-xs font-bold">Temp (A)</div>
        <div className="bg-slate-50 p-2 text-center text-xs font-bold">Presión (B)</div>
        
        <div className="bg-white p-2 text-center text-xs text-slate-600">1</div>
        <div className="bg-white p-2 text-center text-xs font-mono text-rose-500">-</div>
        <div className="bg-white p-2 text-center text-xs font-mono text-rose-500">-</div>
        
        <div className="bg-white p-2 text-center text-xs text-slate-600">2</div>
        <div className="bg-white p-2 text-center text-xs font-mono text-emerald-500">+</div>
        <div className="bg-white p-2 text-center text-xs font-mono text-rose-500">-</div>
        
        <div className="bg-white p-2 text-center text-xs text-slate-600">3</div>
        <div className="bg-white p-2 text-center text-xs font-mono text-rose-500">-</div>
        <div className="bg-white p-2 text-center text-xs font-mono text-emerald-500">+</div>
        
        <div className="bg-white p-2 text-center text-xs text-slate-600">4</div>
        <div className="bg-white p-2 text-center text-xs font-mono text-emerald-500">+</div>
        <div className="bg-white p-2 text-center text-xs font-mono text-emerald-500">+</div>
      </div>
    </div>

    {/* Interaction Graph */}
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-full max-w-[200px]">
       <div className="text-center text-xs font-bold text-slate-500 mb-4">Efecto e Interacción</div>
       <svg viewBox="0 0 100 100" className="w-full">
         <line x1="10" y1="90" x2="90" y2="90" stroke="#cbd5e1" strokeWidth="2" />
         <line x1="10" y1="10" x2="10" y2="90" stroke="#cbd5e1" strokeWidth="2" />
         
         <text x="20" y="98" fontSize="8" fill="#64748b">A(-)</text>
         <text x="70" y="98" fontSize="8" fill="#64748b">A(+)</text>
         
         {/* Line 1 */}
         <line x1="25" y1="70" x2="80" y2="30" stroke="#3b82f6" strokeWidth="2" />
         <circle cx="25" cy="70" r="3" fill="#3b82f6" />
         <circle cx="80" cy="30" r="3" fill="#3b82f6" />
         <text x="85" y="32" fontSize="8" fill="#3b82f6">B(-)</text>

         {/* Line 2 */}
         <line x1="25" y1="40" x2="80" y2="80" stroke="#ef4444" strokeWidth="2" />
         <circle cx="25" cy="40" r="3" fill="#ef4444" />
         <circle cx="80" cy="80" r="3" fill="#ef4444" />
         <text x="85" y="82" fontSize="8" fill="#ef4444">B(+)</text>
       </svg>
    </div>
  </div>
);

const RegressionDiagram = () => {
  // Generate semi-random points along a line y = x + noise
  const points = [];
  for(let i=0; i<30; i++) {
    const x = 20 + Math.random() * 360;
    const y = 220 - (x * 0.5) + (Math.random() * 40 - 20);
    points.push({x, y});
  }

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex justify-center">
      <svg viewBox="0 0 400 250" className="w-full max-w-md bg-white border border-slate-200 rounded-lg shadow-sm">
        {/* Axes */}
        <line x1="30" y1="220" x2="380" y2="220" stroke="#94a3b8" strokeWidth="2" />
        <line x1="30" y1="20" x2="30" y2="220" stroke="#94a3b8" strokeWidth="2" />
        <text x="200" y="240" textAnchor="middle" fill="#64748b" fontSize="10">Variable Independiente (X)</text>
        <text x="15" y="120" textAnchor="middle" fill="#64748b" fontSize="10" transform="rotate(-90 15 120)">Variable Dependiente (Y)</text>

        {/* Scatter Points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#38bdf8" opacity="0.7" />
        ))}

        {/* Regression Line */}
        <line x1="30" y1="205" x2="380" y2="30" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
        
        {/* Equation mock */}
        <rect x="250" y="40" width="120" height="30" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="310" y="58" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">y = β₀ + β₁x + ε</text>
      </svg>
    </div>
  );
}

const MultivariateDiagram = () => {
  const generateCluster = (cx:number, cy:number, count:number, color:string) => {
    return Array.from({length: count}).map((_, i) => (
      <circle 
        key={i} 
        cx={cx + (Math.random() * 60 - 30)} 
        cy={cy + (Math.random() * 60 - 30)} 
        r="4" 
        fill={color} 
        opacity="0.8" 
      />
    ));
  };

  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex justify-center">
      <svg viewBox="0 0 400 250" className="w-full max-w-md">
        {/* PCA Axes */}
        <line x1="200" y1="10" x2="200" y2="240" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="10" y1="125" x2="390" y2="125" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
        
        <text x="10" y="140" fill="#94a3b8" fontSize="10" fontWeight="bold">Componente 1</text>
        <text x="210" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold">Componente 2</text>

        {/* Clusters */}
        <ellipse cx="100" cy="80" rx="45" ry="40" fill="#fef08a" opacity="0.3" stroke="#eab308" strokeDasharray="2,2" />
        {generateCluster(100, 80, 20, '#eab308')}

        <ellipse cx="300" cy="100" rx="50" ry="45" fill="#bfdbfe" opacity="0.3" stroke="#3b82f6" strokeDasharray="2,2" />
        {generateCluster(300, 100, 25, '#3b82f6')}

        <ellipse cx="180" cy="180" rx="40" ry="40" fill="#fecaca" opacity="0.3" stroke="#ef4444" strokeDasharray="2,2" />
        {generateCluster(180, 180, 15, '#ef4444')}
      </svg>
    </div>
  );
}

const ImportanceDiagram = () => (
  <div className="p-8 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      
      {/* Root Node */}
      <div className="flex flex-col items-center bg-indigo-600 text-white p-4 rounded-xl shadow-lg w-48 text-center relative z-10">
        <Activity className="w-8 h-8 mb-2 text-indigo-200" />
        <span className="font-bold">Análisis Estadístico Avanzado</span>
      </div>

      {/* Connections (Desktop) */}
      <div className="hidden md:flex flex-col justify-between h-48 relative w-16">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
           <path d="M 0,24 C 30,24 30,24 64,24" fill="none" stroke="#cbd5e1" strokeWidth="2" />
           <path d="M 0,96 C 30,96 30,96 64,96" fill="none" stroke="#cbd5e1" strokeWidth="2" />
           <path d="M 0,168 C 30,168 30,168 64,168" fill="none" stroke="#cbd5e1" strokeWidth="2" />
           <line x1="0" y1="24" x2="0" y2="168" stroke="#cbd5e1" strokeWidth="2" />
        </svg>
      </div>

       {/* Connections (Mobile) */}
       <div className="md:hidden flex justify-center w-full h-8 relative">
          <div className="w-px h-full bg-slate-300"></div>
       </div>

      {/* Branches */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="p-2 bg-rose-100 rounded-full text-rose-600"><XCircle className="w-5 h-5" /></div>
          <span className="font-medium text-slate-700">Menos errores y desperdicios</span>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="p-2 bg-emerald-100 rounded-full text-emerald-600"><Zap className="w-5 h-5" /></div>
          <span className="font-medium text-slate-700">Mayor eficiencia en procesos</span>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="p-2 bg-blue-100 rounded-full text-blue-600"><Target className="w-5 h-5" /></div>
          <span className="font-medium text-slate-700">Decisiones basadas en datos</span>
        </div>
      </div>

    </div>
  </div>
);

const ClosureDiagram = () => (
  <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 flex justify-center overflow-hidden">
    <div className="relative w-full max-w-2xl flex flex-col items-center">
      
      {/* Top row of tools */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 z-10">
        {['Muestreo', 'Capacidad', 'DOE', 'Regresión', 'Multivariantes'].map((tool, i) => (
          <div key={i} className="bg-white border border-slate-200 shadow-sm text-slate-600 text-xs md:text-sm font-semibold py-2 px-4 rounded-full">
            {tool}
          </div>
        ))}
      </div>

      {/* Funnel/Arrows SVG overlay */}
      <div className="absolute top-10 left-0 w-full h-32 flex justify-center pointer-events-none">
        <svg width="100%" height="100%" preserveAspectRatio="none">
           <path d="M 20%,0 Q 50%,80 50%,120" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
           <path d="M 35%,0 Q 50%,80 50%,120" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
           <path d="M 50%,0 L 50%,120" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
           <path d="M 65%,0 Q 50%,80 50%,120" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
           <path d="M 80%,0 Q 50%,80 50%,120" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
           
           <polygon points="50%,120 48%,110 52%,110" fill="#94a3b8" />
        </svg>
      </div>

      {/* Central Goal */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-xl text-center text-white z-10 w-full max-w-sm mt-4 transform hover:scale-105 transition-transform duration-300">
        <Award className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
        <h3 className="text-xl font-extrabold tracking-tight">Mejora Continua del Proceso</h3>
        <p className="text-indigo-100 text-sm mt-2 font-medium">Optimización, Calidad y Competitividad</p>
      </div>
    </div>
  </div>
);


// --- MAIN APP COMPONENT ---

export default function App() {

  // Helper to render the right visual based on type
  const renderVisual = (type:string) => {
    switch(type) {
      case 'scope': return <ScopeDiagram />;
      case 'sampling': return <SamplingDiagram />;
      case 'capacity': return <CapacityDiagram />;
      case 'doe': return <DOEDiagram />;
      case 'regression': return <RegressionDiagram />;
      case 'multivariate': return <MultivariateDiagram />;
      case 'importance': return <ImportanceDiagram />;
      case 'closure': return <ClosureDiagram />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-md  top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            Introducción a los Métodos Estadísticos Avanzados
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">

        {/* Content Area */}
        <div className="w-full md:w-3/4 flex flex-col gap-10">
          {lessonData.map((lesson) => (
            <section 
              key={lesson.id} 
              id={`section-${lesson.id}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                {/* Title */}
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    {lesson.title}
                  </h2>
                </div>
                
                {/* Explanation */}
                <p className="text-slate-600 leading-relaxed mb-8">
                  {lesson.explanation}
                </p>                
                  {renderVisual(lesson.visualType)}
              </div>
            </section>
          ))}
        </div>
      </main>

    </div>
  );
}