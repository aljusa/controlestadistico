import React from 'react';
import { 
  BarChart3, 
  GitMerge, 
  LineChart, 
  Network, 
  ArrowRight, 
  Settings, 
  Database, 
  Code 
} from 'lucide-react';

// --- VISUAL COMPONENTS ---

const ComparativeSchema = () => (
  <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
    <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-100 flex flex-col items-center">
      <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
        <Database size={18} /> Alta Producción
      </h4>
      <div className="grid grid-cols-5 gap-1 mb-4">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-blue-400 rounded-sm opacity-70"></div>
        ))}
      </div>
      <p className="text-sm text-center text-blue-700">Abundancia de datos.<br/>SPC Tradicional aplicable.</p>
    </div>
    <div className="flex items-center justify-center">
      <div className="bg-slate-200 p-2 rounded-full text-slate-500">VS</div>
    </div>
    <div className="flex-1 p-4 bg-orange-50 rounded-lg border border-orange-100 flex flex-col items-center">
      <h4 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
        <Settings size={18} /> Corridas Cortas
      </h4>
      <div className="grid grid-cols-3 gap-2 mb-4 h-[72px] items-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`w-6 h-6 rounded-sm ${['bg-orange-400', 'bg-red-400', 'bg-yellow-400'][i]}`}></div>
        ))}
      </div>
      <p className="text-sm text-center text-orange-700">Pocos datos por lote.<br/>Requiere adaptaciones analíticas.</p>
    </div>
  </div>
);

const ShortRunsChart = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center overflow-hidden">
    <div className="flex flex-col md:flex-row items-end gap-4 w-full justify-center">
      {/* Original Runs */}
      <div className="flex gap-4 items-end h-32 border-b-2 border-slate-200 pb-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-12 bg-blue-300 rounded-t-sm"></div>
          <span className="text-xs font-semibold text-slate-500">Lote A</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-24 bg-green-300 rounded-t-sm"></div>
          <span className="text-xs font-semibold text-slate-500">Lote B</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-16 bg-purple-300 rounded-t-sm"></div>
          <span className="text-xs font-semibold text-slate-500">Lote C</span>
        </div>
      </div>
      
      <div className="flex items-center justify-center px-4">
        <ArrowRight className="text-slate-400" />
        <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded mx-2 text-slate-600">scale()</span>
        <ArrowRight className="text-slate-400" />
      </div>

      {/* Standardized Run */}
      <div className="flex gap-1 items-end h-32 border-b-2 border-slate-200 pb-2 relative w-32 justify-center">
        {/* Target Line */}
        <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-slate-400"></div>
        <div className="w-6 h-12 bg-indigo-500 rounded-sm opacity-80 z-10 translate-y-2"></div>
        <div className="w-6 h-16 bg-indigo-500 rounded-sm opacity-80 z-10 -translate-y-2"></div>
        <div className="w-6 h-10 bg-indigo-500 rounded-sm opacity-80 z-10 translate-y-4"></div>
      </div>
    </div>
    <p className="text-sm text-slate-500 mt-4">Transformación a una escala común (Z-score)</p>
  </div>
);

const AttributeBarChart = () => {
  const data = [12, 8, 15, 5, 9, 4];
  const max = Math.max(...data);
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 h-64 flex flex-col justify-end">
      <div className="flex justify-around items-end w-full h-48 border-b-2 border-l-2 border-slate-200 relative pb-2 pl-2">
        <div className="absolute top-0 -left-6 text-xs text-slate-400">15%</div>
        <div className="absolute bottom-1/2 -left-6 text-xs text-slate-400">7.5%</div>
        <div className="absolute bottom-0 -left-6 text-xs text-slate-400">0%</div>
        
        {data.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group">
            <div 
              className="w-10 bg-rose-400 rounded-t-sm transition-all duration-300 group-hover:bg-rose-500 flex justify-center text-white text-xs font-bold pt-1"
              style={{ height: `${(val / max) * 100}%` }}
            >
              {val}%
            </div>
            <span className="text-xs text-slate-500">Lote {i+1}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-slate-500 mt-4">Proporción de defectos por lote analizado</p>
    </div>
  );
};

const MethodologyRoutes = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 text-sm">
    <div className="flex flex-col items-center">
      <div className="bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md z-10">
        ¿Tipo de Datos Disponibles?
      </div>
      <div className="w-px h-6 bg-slate-300"></div>
      
      <div className="flex gap-4 md:gap-16 w-full justify-center relative">
        {/* Top Connecting Line */}
        <div className="absolute top-0 w-2/3 md:w-1/2 h-px bg-slate-300"></div>
        
        {/* Route 1 */}
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-slate-300"></div>
          <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md font-medium text-center border border-blue-200 w-32">
            Múltiples Lotes Pequeños
          </div>
          <div className="w-px h-6 bg-slate-300"></div>
          <div className="bg-white px-3 py-2 rounded-md text-center border border-slate-200 w-32 shadow-sm">
            Estandarización de Observaciones
          </div>
        </div>

        {/* Route 2 */}
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-slate-300"></div>
          <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md font-medium text-center border border-green-200 w-32">
            Pocos Datos Actuales
          </div>
          <div className="w-px h-6 bg-slate-300"></div>
          <div className="bg-white px-3 py-2 rounded-md text-center border border-slate-200 w-32 shadow-sm">
            Datos Históricos / Enfoque Bayesiano
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ControlChart = () => (
  <div className="p-6 bg-slate-50 rounded-xl shadow-inner border border-slate-200 overflow-hidden relative h-64">
    <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
      {/* Background grids */}
      <line x1="0" y1="25" x2="400" y2="25" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4" />
      <text x="5" y="20" fill="#ef4444" fontSize="10" fontWeight="bold">LCS (+3σ)</text>
      
      <line x1="0" y1="75" x2="400" y2="75" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
      <text x="5" y="70" fill="#64748b" fontSize="10" fontWeight="bold">Objetivo (0)</text>
      
      <line x1="0" y1="125" x2="400" y2="125" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4" />
      <text x="5" y="120" fill="#ef4444" fontSize="10" fontWeight="bold">LCI (-3σ)</text>

      {/* Data Line */}
      <polyline 
        fill="none" 
        stroke="#4f46e5" 
        strokeWidth="2" 
        points="20,80 50,60 80,90 110,40 140,70 170,85 200,65 230,110 260,80 290,55 320,75 350,95 380,70" 
      />
      
      {/* Data Points grouped by color to show different runs */}
      {/* Run 1 */}
      <circle cx="20" cy="80" r="4" fill="#3b82f6" />
      <circle cx="50" cy="60" r="4" fill="#3b82f6" />
      <circle cx="80" cy="90" r="4" fill="#3b82f6" />
      <circle cx="110" cy="40" r="4" fill="#3b82f6" />
      {/* Run 2 */}
      <circle cx="140" cy="70" r="4" fill="#10b981" />
      <circle cx="170" cy="85" r="4" fill="#10b981" />
      <circle cx="200" cy="65" r="4" fill="#10b981" />
      <circle cx="230" cy="110" r="4" fill="#10b981" />
      {/* Run 3 */}
      <circle cx="260" cy="80" r="4" fill="#8b5cf6" />
      <circle cx="290" cy="55" r="4" fill="#8b5cf6" />
      <circle cx="320" cy="75" r="4" fill="#8b5cf6" />
      <circle cx="350" cy="95" r="4" fill="#8b5cf6" />
      <circle cx="380" cy="70" r="4" fill="#8b5cf6" />
    </svg>
  </div>
);

const ConceptualMap = () => (
  <div className="p-6 md:p-12 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-sm border border-slate-200">
    <div className="flex flex-col items-center gap-8 relative">
      {/* Center Node */}
      <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg z-10 w-64 text-center">
        <h3 className="font-bold text-lg">SPC en Baja Producción</h3>
        <p className="text-indigo-100 text-xs mt-1">Control con información limitada</p>
      </div>

      {/* Branches */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connection Lines (Desktop only for simplicity in SVG, handled by flex layout visually) */}
        <div className="hidden md:block absolute top-[-30px] left-1/6 w-1/3 h-px bg-indigo-200 transform rotate-[25deg]"></div>
        <div className="hidden md:block absolute top-[-30px] right-1/6 w-1/3 h-px bg-indigo-200 transform -rotate-[25deg]"></div>
        <div className="hidden md:block absolute top-[-30px] left-1/2 w-px h-8 bg-indigo-200"></div>

        <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm text-center">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <GitMerge size={20} />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">Corridas Cortas</h4>
          <p className="text-xs text-slate-500 mt-2">Estandarización y gráficos X-barra modificados.</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm text-center">
          <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <BarChart3 size={20} />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">Gráficos por Atributos</h4>
          <p className="text-xs text-slate-500 mt-2">Inspecciones cualitativas y proporciones de defectos.</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm text-center">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Network size={20} />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">Métodos Alternativos</h4>
          <p className="text-xs text-slate-500 mt-2">Datos históricos y métodos bayesianos.</p>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const sections = [
    {
      id: "intro",
      icon: <Settings className="text-indigo-500" />,
      title: "Introducción",
      explanation: "En algunos contextos industriales o de servicios, los procesos no generan grandes volúmenes de datos. Esto limita el uso de técnicas tradicionales de Control Estadístico de Procesos (SPC), por lo que se requieren adaptaciones específicas para analizar corridas cortas o procesos especiales.",
      visualSuggestion: "Esquema comparativo entre procesos de alta producción (muchos datos) y corridas cortas (pocos datos), destacando la diferencia en enfoque analítico.",
      visual: <ComparativeSchema />
    },
    {
      id: "corridas",
      icon: <GitMerge className="text-blue-500" />,
      title: "Corridas Cortas",
      explanation: "En corridas cortas, se emplean versiones modificadas de gráficos (x̄) y R que permiten combinar datos de diferentes productos o lotes mediante estandarización o centrado respecto a un objetivo común.",
      visualSuggestion: "Gráfico donde múltiples corridas pequeñas se transforman y se representan en una misma escala común.",
      visual: <ShortRunsChart />
    },
    {
      id: "atributos",
      icon: <BarChart3 className="text-rose-500" />,
      title: "Gráficos por Atributos",
      explanation: "Cuando no es posible medir en escala continua, se utilizan gráficos por atributos, como proporciones de defectos o número de unidades defectuosas. Estos son útiles en inspecciones visuales o clasificaciones cualitativas.",
      visualSuggestion: "Gráfico de barras mostrando proporción de defectos por lote o periodo.",
      visual: <AttributeBarChart />
    },
    {
      id: "otros",
      icon: <Network className="text-green-500" />,
      title: "Otros Métodos",
      explanation: "Existen técnicas adicionales adaptadas a la disponibilidad de datos, como:\n• Estandarización de observaciones.\n• Uso de datos históricos combinados.\n• Métodos bayesianos o enfoques adaptativos.",
      visualSuggestion: "Diagrama que muestre distintas rutas metodológicas según el tipo y cantidad de datos disponibles.",
      visual: <MethodologyRoutes />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      {/* Header */}
      <header className="bg-indigo-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Control Estadístico en Baja Producción
          </h1>
          <p className="text-xl text-indigo-200 max-w-2xl">
            Adaptaciones del SPC para corridas cortas y procesos especiales con limitaciones de datos.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 -mt-8 relative z-10 space-y-12">
        
        {/* Dynamic Sections */}
        {sections.map((section) => (
          <section key={section.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{section.title}</h2>
              </div>
              
              <div className="prose prose-slate max-w-none mb-8">
                <p className="text-lg leading-relaxed text-slate-600 whitespace-pre-line">
                  {section.explanation}
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-1 border border-slate-200">
                <div className="bg-white px-4 py-2 border-b border-slate-100 flex justify-between items-center rounded-t-lg">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Representación Visual</span>
                </div>
                <div className="p-4">
                  {section.visual}
                </div>
                <div className="px-4 py-3 bg-slate-100 rounded-b-lg text-xs text-slate-500 italic flex items-start gap-2">
                  <span className="font-semibold text-indigo-500">Sugerencia Original:</span>
                  {section.visualSuggestion}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Example Code Section */}
        <section className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden text-slate-300">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <Code className="text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Ejemplo en R</h2>
            </div>
            
            <p className="text-lg leading-relaxed text-slate-400 mb-6">
              A continuación se presenta un ejemplo simple en R utilizando datos de corridas cortas estandarizadas. Este ejemplo muestra cómo combinar varias corridas pequeñas para analizarlas en un mismo gráfico.
            </p>

            <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm mb-8 overflow-x-auto border border-slate-800">
              <pre className="text-cyan-300"><code>{`# Instalar y cargar librería
install.packages("qcc")
library(qcc)

# Simular datos de diferentes corridas cortas
set.seed(123)
corrida1 <- rnorm(5, mean = 10, sd = 1)
corrida2 <- rnorm(5, mean = 12, sd = 1)
corrida3 <- rnorm(5, mean = 11, sd = 1)

# Combinar datos
datos <- c(corrida1, corrida2, corrida3)

# Estandarizar datos (centrar y escalar)
datos_std <- scale(datos)

# Crear gráfico tipo x-barra para datos estandarizados
qcc(datos_std, type = "xbar.one",
    title = "Gráfico para Corridas Cortas (Datos Estandarizados)")`}</code></pre>
            </div>

            <div className="bg-slate-800 rounded-xl p-1 border border-slate-700">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 rounded-t-lg">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Visualización del Gráfico de Control</span>
              </div>
              <div className="p-4 bg-white rounded-b-lg">
                <ControlChart />
              </div>
              <div className="px-4 py-3 bg-slate-800 rounded-b-lg text-xs text-slate-400 italic">
                <span className="font-semibold text-cyan-500 mr-2">Sugerencia Original:</span>
                Un gráfico de control donde los datos estandarizados se agrupan y se evalúan respecto a límites comunes.
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-10">
             <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <LineChart className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Cierre</h2>
            </div>
            
            <p className="text-lg leading-relaxed text-slate-600 mb-8">
              El SPC puede adaptarse eficazmente a contextos de baja producción mediante técnicas específicas como la estandarización o el uso de gráficos por atributos. Estas adaptaciones permiten mantener el control del proceso incluso con información limitada.
            </p>

            <div className="bg-slate-50 rounded-xl p-1 border border-slate-200">
              <div className="p-4">
                <ConceptualMap />
              </div>
              <div className="px-4 py-3 bg-slate-100 rounded-b-lg text-xs text-slate-500 italic">
                <span className="font-semibold text-indigo-500 mr-2">Sugerencia Original:</span>
                Un mapa conceptual que conecte corridas cortas, gráficos por atributos y métodos alternativos dentro del SPC.
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}