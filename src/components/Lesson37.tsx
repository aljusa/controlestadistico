import React from 'react';
import { BookOpen, BarChart2, Layers, CheckCircle, Factory, GitMerge, Combine, Network } from 'lucide-react';

// --- Componentes Visuales (Diagramas SVG generados a partir de las sugerencias) ---

const ScopeVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full drop-shadow-sm">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>
    {/* Conexiones */}
    <path d="M 60 40 Q 150 40 230 100" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.6"/>
    <path d="M 60 100 Q 150 100 230 100" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.6"/>
    <path d="M 60 160 Q 150 160 230 100" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.6"/>
    
    {/* Nodos de entrada */}
    <circle cx="50" cy="40" r="15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
    <text x="50" y="44" fontSize="10" textAnchor="middle" fill="#3730a3" fontWeight="bold">X1</text>
    
    <circle cx="50" cy="100" r="15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
    <text x="50" y="104" fontSize="10" textAnchor="middle" fill="#3730a3" fontWeight="bold">X2</text>
    
    <circle cx="50" cy="160" r="15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
    <text x="50" y="164" fontSize="10" textAnchor="middle" fill="#3730a3" fontWeight="bold">X3</text>
    
    {/* Nodo de resultado */}
    <circle cx="240" cy="100" r="22" fill="#4f46e5" stroke="#312e81" strokeWidth="2"/>
    <text x="240" y="104" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">Y</text>
  </svg>
);

const ConceptVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    {/* Ejes Multidimensionales (Isometric 3D) */}
    <line x1="150" y1="150" x2="150" y2="30" stroke="#94a3b8" strokeWidth="2" />
    <line x1="150" y1="150" x2="50" y2="180" stroke="#94a3b8" strokeWidth="2" />
    <line x1="150" y1="150" x2="250" y2="180" stroke="#94a3b8" strokeWidth="2" />
    
    <text x="140" y="30" fontSize="12" fill="#64748b">Z</text>
    <text x="40" y="180" fontSize="12" fill="#64748b">X</text>
    <text x="255" y="180" fontSize="12" fill="#64748b">Y</text>

    {/* Observaciones (Puntos distribuidos) */}
    {[...Array(25)].map((_, i) => (
      <circle 
        key={i} 
        cx={100 + Math.random() * 100} 
        cy={50 + Math.random() * 100} 
        r="4" 
        fill={`hsl(${Math.random() * 360}, 70%, 50%)`} 
        opacity="0.8"
      />
    ))}
  </svg>
);

const PCAVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    {/* Ejes originales ligeros */}
    <line x1="30" y1="170" x2="270" y2="170" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
    <line x1="30" y1="170" x2="30" y2="30" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
    
    {/* Nube de puntos correlacionada */}
    <ellipse cx="150" cy="100" rx="90" ry="30" fill="#e0e7ff" opacity="0.5" transform="rotate(-30 150 100)" />
    {[...Array(40)].map((_, i) => {
      const t = Math.random() * Math.PI * 2;
      const u = Math.random() + Math.random();
      const r = u > 1 ? 2 - u : u;
      const x = 150 + r * Math.cos(t) * 80;
      const y = 100 + r * Math.sin(t) * 20;
      // Rotar punto
      const rx = 150 + (x - 150)*Math.cos(-30*Math.PI/180) - (y - 100)*Math.sin(-30*Math.PI/180);
      const ry = 100 + (x - 150)*Math.sin(-30*Math.PI/180) + (y - 100)*Math.cos(-30*Math.PI/180);
      return <circle key={i} cx={rx} cy={ry} r="3" fill="#6366f1" />
    })}
    
    {/* Componentes Principales */}
    <defs>
      <marker id="pca-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>
    {/* PC1 */}
    <line x1="70" y1="146" x2="230" y2="54" stroke="#ef4444" strokeWidth="3" markerEnd="url(#pca-arrow)" />
    <text x="240" y="45" fontSize="12" fill="#ef4444" fontWeight="bold">PC1</text>
    {/* PC2 */}
    <line x1="130" y1="65" x2="170" y2="135" stroke="#ef4444" strokeWidth="3" markerEnd="url(#pca-arrow)" />
    <text x="175" y="145" fontSize="12" fill="#ef4444" fontWeight="bold">PC2</text>
  </svg>
);

const DiscriminantVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    {/* Frontera de decisión */}
    <line x1="50" y1="180" x2="250" y2="20" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
    <text x="220" y="30" fontSize="10" fill="#334155" transform="rotate(-38 220 30)">Frontera de Clasificación</text>

    {/* Grupo A */}
    {[...Array(20)].map((_, i) => (
      <circle key={`a-${i}`} cx={50 + Math.random() * 80} cy={30 + Math.random() * 80} r="4" fill="#10b981" />
    ))}
    
    {/* Grupo B */}
    {[...Array(20)].map((_, i) => (
      <circle key={`b-${i}`} cx={160 + Math.random() * 80} cy={100 + Math.random() * 80} r="4" fill="#f59e0b" />
    ))}
  </svg>
);

const ClusteringVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    {/* Cluster 1 (Rojo) */}
    <circle cx="80" cy="70" r="40" fill="#fee2e2" opacity="0.6"/>
    {[...Array(15)].map((_, i) => (
      <circle key={`c1-${i}`} cx={60 + Math.random() * 40} cy={50 + Math.random() * 40} r="4" fill="#ef4444" />
    ))}
    
    {/* Cluster 2 (Azul) */}
    <circle cx="220" cy="80" r="45" fill="#e0e7ff" opacity="0.6"/>
    {[...Array(18)].map((_, i) => (
      <polygon key={`c2-${i}`} points="0,-4 4,4 -4,4" fill="#3b82f6" transform={`translate(${200 + Math.random() * 40}, ${60 + Math.random() * 40})`} />
    ))}

    {/* Cluster 3 (Verde) */}
    <circle cx="150" cy="150" r="35" fill="#d1fae5" opacity="0.6"/>
    {[...Array(12)].map((_, i) => (
      <rect key={`c3-${i}`} x={135 + Math.random() * 30} y={135 + Math.random() * 30} width="7" height="7" fill="#10b981" />
    ))}
  </svg>
);

const AdvantagesVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    <defs>
      <marker id="adv-arrow" markerWidth="8" markerHeight="5" refX="7" refY="2.5" orient="auto">
        <polygon points="0 0, 8 2.5, 0 5" fill="#475569" />
      </marker>
    </defs>
    
    {/* Nodo Central */}
    <rect x="90" y="20" width="120" height="30" rx="5" fill="#3b82f6" />
    <text x="150" y="40" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">Datos Multivariantes</text>

    {/* Líneas */}
    <path d="M 150 50 L 150 70 L 60 70 L 60 110" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#adv-arrow)" />
    <path d="M 150 50 L 150 110" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#adv-arrow)" />
    <path d="M 150 50 L 150 70 L 240 70 L 240 110" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#adv-arrow)" />

    {/* Nodos Hijos */}
    <rect x="15" y="115" width="90" height="40" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <text x="60" y="140" fontSize="11" textAnchor="middle" fill="#334155" fontWeight="bold">Patrones</text>

    <rect x="110" y="115" width="80" height="40" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <text x="150" y="140" fontSize="11" textAnchor="middle" fill="#334155" fontWeight="bold">Simplificación</text>

    <rect x="195" y="115" width="90" height="40" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <text x="240" y="135" fontSize="11" textAnchor="middle" fill="#334155" fontWeight="bold">Mejores</text>
    <text x="240" y="148" fontSize="11" textAnchor="middle" fill="#334155" fontWeight="bold">Decisiones</text>
  </svg>
);

const IndustrialVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    {/* Sensores */}
    <rect x="20" y="40" width="70" height="25" rx="3" fill="#e2e8f0" stroke="#64748b"/>
    <text x="55" y="56" fontSize="10" textAnchor="middle" fill="#334155">Sensor Temp</text>

    <rect x="20" y="90" width="70" height="25" rx="3" fill="#e2e8f0" stroke="#64748b"/>
    <text x="55" y="106" fontSize="10" textAnchor="middle" fill="#334155">Sensor Presión</text>

    <rect x="20" y="140" width="70" height="25" rx="3" fill="#e2e8f0" stroke="#64748b"/>
    <text x="55" y="156" fontSize="10" textAnchor="middle" fill="#334155">Sensor Velocidad</text>

    {/* Conexiones */}
    <path d="M 90 52 Q 130 52 140 100" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
    <path d="M 90 102 L 140 102" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
    <path d="M 90 152 Q 130 152 140 102" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />

    {/* Sistema Central */}
    <rect x="140" y="60" width="100" height="85" rx="8" fill="#1e293b" />
    <text x="190" y="90" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">Sistema</text>
    <text x="190" y="105" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">Multivariante</text>
    <rect x="165" y="115" width="50" height="15" rx="2" fill="#22c55e" />
    <text x="190" y="126" fontSize="9" textAnchor="middle" fill="white">Optimizado</text>
  </svg>
);

const ClosingVisual = () => (
  <svg viewBox="0 0 300 200" className="w-full h-full">
    {/* Funnel/Flujo */}
    <polygon points="30,40 100,40 120,100 100,160 30,160 50,100" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
    <text x="65" y="105" fontSize="11" textAnchor="middle" fill="#334155" fontWeight="bold">Múltiples</text>
    <text x="65" y="118" fontSize="11" textAnchor="middle" fill="#334155" fontWeight="bold">Variables</text>

    <path d="M 125 100 L 165 100" fill="none" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#adv-arrow)"/>

    <circle cx="200" cy="100" r="35" fill="#3b82f6" opacity="0.1" stroke="#2563eb" strokeWidth="2"/>
    <text x="200" y="98" fontSize="11" textAnchor="middle" fill="#1e40af" fontWeight="bold">Análisis</text>
    <text x="200" y="111" fontSize="11" textAnchor="middle" fill="#1e40af" fontWeight="bold">Integral</text>

    <path d="M 235 100 L 265 100" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#adv-arrow)"/>

    <rect x="250" y="60" width="40" height="80" rx="4" fill="#10b981" />
    <text x="270" y="95" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold" transform="rotate(-90 270 95)">Mejora</text>
    <text x="270" y="115" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold" transform="rotate(-90 270 115)">Continua</text>
  </svg>
);

// --- Estructura de Datos de la Lección ---

const lessonData = [
  {
    id: 1,
    title: "Alcance de los métodos multivariantes",
    icon: <Network className="text-indigo-500 w-6 h-6" />,
    explanation: "En muchos procesos reales, múltiples variables influyen simultáneamente en los resultados. Los métodos multivariantes permiten analizar estas variables de forma conjunta, capturando relaciones complejas que no pueden detectarse al estudiar cada variable por separado.",
    VisualComponent: ScopeVisual
  },
  {
    id: 2,
    title: "Concepto de análisis multivariante",
    icon: <Layers className="text-blue-500 w-6 h-6" />,
    explanation: "El análisis multivariante estudia múltiples variables al mismo tiempo para identificar patrones, relaciones y estructuras en los datos. Este enfoque es esencial cuando las variables están correlacionadas y su efecto combinado influye en el comportamiento del sistema.",
    VisualComponent: ConceptVisual
  },
  {
    id: 3,
    title: "Análisis de componentes principales (PCA)",
    icon: <Combine className="text-red-500 w-6 h-6" />,
    explanation: "El PCA es una técnica que transforma un conjunto de variables correlacionadas en un nuevo conjunto de variables no correlacionadas llamadas componentes principales. Estas componentes capturan la mayor parte de la variabilidad de los datos con menos dimensiones.",
    VisualComponent: PCAVisual
  },
  {
    id: 4,
    title: "Análisis discriminante",
    icon: <GitMerge className="text-emerald-500 w-6 h-6" />,
    explanation: "El análisis discriminante se utiliza para clasificar observaciones en grupos previamente definidos. Identifica qué variables permiten diferenciar mejor entre categorías, facilitando la toma de decisiones basada en clasificación.",
    VisualComponent: DiscriminantVisual
  },
  {
    id: 5,
    title: "Análisis de conglomerados (clustering)",
    icon: <BarChart2 className="text-purple-500 w-6 h-6" />,
    explanation: "El clustering agrupa observaciones en conjuntos (clusters) según su similitud, sin necesidad de categorías predefinidas. Es útil para descubrir estructuras ocultas o segmentar datos en grupos homogéneos.",
    VisualComponent: ClusteringVisual
  },
  {
    id: 6,
    title: "Ventajas de los métodos multivariantes",
    icon: <CheckCircle className="text-teal-500 w-6 h-6" />,
    explanation: "Estos métodos permiten detectar patrones complejos, reducir la dimensionalidad de los datos y mejorar la toma de decisiones. Su capacidad para analizar múltiples variables simultáneamente los hace especialmente valiosos en entornos complejos.",
    VisualComponent: AdvantagesVisual
  },
  {
    id: 7,
    title: "Aplicación en procesos industriales",
    icon: <Factory className="text-orange-500 w-6 h-6" />,
    explanation: "Los métodos multivariantes se aplican en procesos industriales complejos donde existen muchas variables interrelacionadas, como en manufactura avanzada, control de calidad y optimización de procesos. Permiten una comprensión más completa del sistema.",
    VisualComponent: IndustrialVisual
  },
  {
    id: 8,
    title: "Cierre conceptual",
    icon: <BookOpen className="text-slate-600 w-6 h-6" />,
    explanation: "Los métodos multivariantes ofrecen un análisis profundo e integral de procesos con múltiples variables. Su aplicación facilita la identificación de patrones, la reducción de complejidad y la mejora continua en sistemas productivos.",
    VisualComponent: ClosingVisual
  }
];

// --- Componente Principal ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      {/* Cabecera / Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <BookOpen className="w-8 h-8 text-indigo-700" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lección 6: Métodos Multivariantes</h1>
            <p className="text-slate-500 font-medium mt-1">Síntesis académica interactiva y visual</p>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto px-6 mt-10">
        
        <div className="grid grid-cols-1 gap-10">
          {lessonData.map((section, index) => (
            <section 
              key={section.id} 
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                
                {/* Panel de Texto (Explicación) */}
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {section.explanation}
                  </p>
                  
                  {/* Etiqueta visual sutil */}
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span className="w-6 h-[1px] bg-slate-300"></span>
                    Concepto {index + 1} de {lessonData.length}
                  </div>
                </div>

                {/* Panel Visual (Diagrama interactivo simulado) */}
                <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 p-6 md:w-1/2 flex items-center justify-center min-h-[250px]">
                  <div className="w-full max-w-[300px] aspect-video">
                    <section.VisualComponent />
                  </div>
                </div>

              </div>
            </section>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 mt-16 text-center text-slate-500 text-sm">
        <p>Material educativo generado por Ideastoweb. Diseñado para facilitar la comprensión de conceptos multivariantes complejos a través de estructuración y representaciones visuales.</p>
      </footer>
    </div>
  );
}