import React from 'react';
import { LineChart, Settings, CheckCircle, Code, FastForward, Activity, AlertTriangle, XOctagon } from 'lucide-react';

// --- Componentes Visuales (Diagramas basados en las sugerencias) ---

const IntroChart = () => (
  <div className="w-full overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col items-center">
    <h4 className="text-sm font-semibold text-slate-600 mb-4">Integración de Monitoreo y Decisión</h4>
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto font-sans">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Zonas */}
      <rect x="50" y="20" width="500" height="60" fill="#fee2e2" opacity="0.6" />
      <text x="60" y="55" fill="#ef4444" fontSize="14" fontWeight="bold">ZONA DE RECHAZO</text>
      
      <rect x="50" y="80" width="500" height="140" fill="#dcfce3" opacity="0.6" />
      <text x="60" y="155" fill="#22c55e" fontSize="14" fontWeight="bold">ZONA DE ACEPTACIÓN</text>
      
      <rect x="50" y="220" width="500" height="60" fill="#fee2e2" opacity="0.6" />
      <text x="60" y="255" fill="#ef4444" fontSize="14" fontWeight="bold">ZONA DE RECHAZO</text>

      {/* Ejes */}
      <line x1="50" y1="20" x2="50" y2="280" stroke="#64748b" strokeWidth="2" />
      <line x1="50" y1="280" x2="550" y2="280" stroke="#64748b" strokeWidth="2" />
      <line x1="50" y1="150" x2="550" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

      {/* Datos */}
      <path d="M 50 150 L 100 120 L 150 170 L 200 140 L 250 60 L 300 110 L 350 160 L 400 240 L 450 130 L 500 150 L 550 140" fill="none" stroke="#3b82f6" strokeWidth="3" />
      
      {/* Puntos destacados */}
      <circle cx="250" cy="60" r="6" fill="#ef4444" />
      <circle cx="400" cy="240" r="6" fill="#ef4444" />
      <circle cx="200" cy="140" r="5" fill="#22c55e" />
      <circle cx="350" cy="160" r="5" fill="#22c55e" />
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">Gráfico de control con zonas operativas demarcadas.</p>
  </div>
);

const ModifiedLimitsChart = () => (
  <div className="w-full overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col items-center">
    <h4 className="text-sm font-semibold text-slate-600 mb-4">Ajuste Dinámico de Límites</h4>
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto font-sans">
      <rect width="100%" height="100%" fill="#f8fafc" />
      
      {/* Ejes */}
      <line x1="40" y1="20" x2="40" y2="280" stroke="#64748b" strokeWidth="2" />
      <line x1="40" y1="280" x2="560" y2="280" stroke="#64748b" strokeWidth="2" />
      
      {/* Línea Central */}
      <line x1="40" y1="150" x2="560" y2="150" stroke="#94a3b8" strokeWidth="1" />
      <text x="565" y="154" fill="#64748b" fontSize="12">Media</text>

      {/* Límites Tradicionales */}
      <line x1="40" y1="40" x2="560" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,4" />
      <text x="565" y="44" fill="#94a3b8" fontSize="12">LSC (Estándar)</text>
      <line x1="40" y1="260" x2="560" y2="260" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,4" />
      <text x="565" y="264" fill="#94a3b8" fontSize="12">LIC (Estándar)</text>

      {/* Límites Modificados (Estrictos) */}
      <line x1="40" y1="90" x2="560" y2="90" stroke="#f59e0b" strokeWidth="2" />
      <text x="565" y="94" fill="#f59e0b" fontSize="12" fontWeight="bold">LSC (Modificado)</text>
      <line x1="40" y1="210" x2="560" y2="210" stroke="#f59e0b" strokeWidth="2" />
      <text x="565" y="214" fill="#f59e0b" fontSize="12" fontWeight="bold">LIC (Modificado)</text>

      {/* Datos */}
      <path d="M 40 150 L 90 120 L 140 100 L 190 70 L 240 160 L 290 130 L 340 180 L 390 230 L 440 150 L 490 110 L 540 140" fill="none" stroke="#6366f1" strokeWidth="3" />
      
      {/* Interacciones */}
      <circle cx="190" cy="70" r="5" fill="#ef4444" />
      <circle cx="390" cy="230" r="5" fill="#ef4444" />
      <text x="190" y="55" fill="#ef4444" fontSize="12" textAnchor="middle">Fuera de límite modificado</text>
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">Comparativa entre límites estadísticos estándar y límites modificados más estrictos.</p>
  </div>
);

const AcceptanceChart = () => (
  <div className="w-full overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col items-center">
    <h4 className="text-sm font-semibold text-slate-600 mb-4">Clasificación por Zonas de Inspección</h4>
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto font-sans">
      <rect width="100%" height="100%" fill="#fff" />
      
      {/* Zonas */}
      <rect x="50" y="20" width="500" height="50" fill="#fee2e2" />
      <rect x="50" y="70" width="500" height="40" fill="#fef08a" />
      <rect x="50" y="110" width="500" height="80" fill="#dcfce3" />
      <rect x="50" y="190" width="500" height="40" fill="#fef08a" />
      <rect x="50" y="230" width="500" height="50" fill="#fee2e2" />

      {/* Etiquetas de Zonas */}
      <text x="560" y="50" fill="#ef4444" fontSize="12" fontWeight="bold">Rechazo</text>
      <text x="560" y="95" fill="#eab308" fontSize="12" fontWeight="bold">Advertencia</text>
      <text x="560" y="155" fill="#22c55e" fontSize="12" fontWeight="bold">Aceptable</text>
      <text x="560" y="215" fill="#eab308" fontSize="12" fontWeight="bold">Advertencia</text>
      <text x="560" y="260" fill="#ef4444" fontSize="12" fontWeight="bold">Rechazo</text>

      {/* Ejes */}
      <line x1="50" y1="20" x2="50" y2="280" stroke="#64748b" strokeWidth="2" />
      <line x1="50" y1="280" x2="550" y2="280" stroke="#64748b" strokeWidth="2" />
      <line x1="50" y1="150" x2="550" y2="150" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />

      {/* Puntos Dispersos */}
      {[
        {x: 80, y: 130, color: '#16a34a'}, {x: 120, y: 160, color: '#16a34a'}, 
        {x: 160, y: 100, color: '#ca8a04'}, {x: 200, y: 40, color: '#dc2626'},
        {x: 240, y: 140, color: '#16a34a'}, {x: 280, y: 150, color: '#16a34a'},
        {x: 320, y: 200, color: '#ca8a04'}, {x: 360, y: 250, color: '#dc2626'},
        {x: 400, y: 120, color: '#16a34a'}, {x: 440, y: 170, color: '#16a34a'},
        {x: 480, y: 80, color: '#ca8a04'}, {x: 520, y: 145, color: '#16a34a'},
      ].map((pt, i) => (
        <g key={i}>
          <line x1={pt.x} y1="280" x2={pt.x} y2={pt.y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2"/>
          <circle cx={pt.x} cy={pt.y} r="6" fill={pt.color} stroke="#fff" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">Gráfico con reglas de inspección predefinidas por colores y zonas.</p>
  </div>
);

const RChartExample = () => (
  <div className="w-full overflow-hidden bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col items-center">
    <h4 className="text-sm font-semibold text-slate-600 mb-4 font-mono">Salida Simulada: qcc (Límites 2σ)</h4>
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto font-sans bg-white border border-slate-300">
      {/* Título interno del gráfico */}
      <text x="300" y="25" fill="#000" fontSize="14" fontWeight="bold" textAnchor="middle">Gráfico de Control Xbar.one (Modificado)</text>
      
      {/* Ejes y marcas */}
      <line x1="60" y1="40" x2="60" y2="260" stroke="#000" strokeWidth="1" />
      <line x1="60" y1="260" x2="560" y2="260" stroke="#000" strokeWidth="1" />
      
      {/* Valores del Eje Y (Centrado en 50, límites en 46 y 54) */}
      <text x="50" y="55" fill="#000" fontSize="10" textAnchor="end">56</text>
      <text x="50" y="105" fill="#000" fontSize="10" textAnchor="end">54</text>
      <text x="50" y="155" fill="#000" fontSize="10" textAnchor="end">50</text>
      <text x="50" y="205" fill="#000" fontSize="10" textAnchor="end">46</text>
      <text x="50" y="255" fill="#000" fontSize="10" textAnchor="end">44</text>

      {/* Líneas de Control */}
      <line x1="60" y1="150" x2="560" y2="150" stroke="#000" strokeWidth="1" />
      <text x="565" y="153" fill="#000" fontSize="10">CL=50</text>
      
      <line x1="60" y1="100" x2="560" y2="100" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x="565" y="103" fill="#dc2626" fontSize="10">UCL=54</text>

      <line x1="60" y1="200" x2="560" y2="200" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x="565" y="203" fill="#dc2626" fontSize="10">LCL=46</text>

      {/* Ruta de datos simulada de rnorm(30, mean=50, sd=2) */}
      <path d="M 60 150 L 76 130 L 92 145 L 108 170 L 124 110 L 140 160 L 156 150 L 172 140 L 188 80 L 204 150 L 220 165 L 236 145 L 252 210 L 268 155 L 284 145 L 300 135 L 316 160 L 332 150 L 348 180 L 364 120 L 380 150 L 396 160 L 412 140 L 428 170 L 444 150 L 460 220 L 476 145 L 492 135 L 508 150 L 524 160" fill="none" stroke="#000" strokeWidth="1" />
      
      {/* Puntos de datos */}
      {[
        {x: 60, y: 150}, {x: 76, y: 130}, {x: 92, y: 145}, {x: 108, y: 170}, 
        {x: 124, y: 110}, {x: 140, y: 160}, {x: 156, y: 150}, {x: 172, y: 140}, 
        {x: 188, y: 80, isOut: true}, {x: 204, y: 150}, {x: 220, y: 165}, {x: 236, y: 145}, 
        {x: 252, y: 210, isOut: true}, {x: 268, y: 155}, {x: 284, y: 145}, {x: 300, y: 135}, 
        {x: 316, y: 160}, {x: 332, y: 150}, {x: 348, y: 180}, {x: 364, y: 120}, 
        {x: 380, y: 150}, {x: 396, y: 160}, {x: 412, y: 140}, {x: 428, y: 170}, 
        {x: 444, y: 150}, {x: 460, y: 220, isOut: true}, {x: 476, y: 145}, {x: 492, y: 135}, 
        {x: 508, y: 150}, {x: 524, y: 160}
      ].map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="3" fill={pt.isOut ? '#dc2626' : '#000'} />
      ))}
      
      {/* Etiquetas para puntos fuera de control */}
      <text x="188" y="70" fill="#dc2626" fontSize="10" textAnchor="middle" fontWeight="bold">Rechazo</text>
      <text x="252" y="225" fill="#dc2626" fontSize="10" textAnchor="middle" fontWeight="bold">Rechazo</text>
      <text x="460" y="235" fill="#dc2626" fontSize="10" textAnchor="middle" fontWeight="bold">Rechazo</text>
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">Gráfico generado mostrando límites a 2σ y marcando los puntos fuera de control.</p>
  </div>
);

const FlowchartClose = () => (
  <div className="w-full overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center">
    <h4 className="text-sm font-semibold text-slate-600 mb-6">Flujo Operativo</h4>
    <svg viewBox="0 0 600 200" className="w-full max-w-3xl h-auto font-sans">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
        </marker>
        <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
        </marker>
        <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
        </marker>
      </defs>

      {/* Nodos */}
      {/* 1. Monitoreo */}
      <rect x="20" y="80" width="120" height="50" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="80" y="105" fill="#1e40af" fontSize="14" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">Monitoreo</text>
      <text x="80" y="120" fill="#1e3a8a" fontSize="10" textAnchor="middle">Estadístico</text>

      {/* 2. Límites */}
      <rect x="180" y="80" width="120" height="50" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="240" y="105" fill="#1e40af" fontSize="14" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">Límites</text>
      <text x="240" y="120" fill="#1e3a8a" fontSize="10" textAnchor="middle">Modificados</text>

      {/* 3. Evaluación (Rombo) */}
      <polygon points="380,80 430,105 380,130 330,105" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
      <text x="380" y="108" fill="#854d0e" fontSize="12" fontWeight="bold" textAnchor="middle">¿Cumple?</text>

      {/* 4. Decisiones */}
      <rect x="480" y="30" width="100" height="40" rx="20" fill="#dcfce3" stroke="#22c55e" strokeWidth="2" />
      <text x="530" y="55" fill="#166534" fontSize="14" fontWeight="bold" textAnchor="middle">Aceptación</text>

      <rect x="480" y="140" width="100" height="40" rx="20" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="530" y="165" fill="#991b1b" fontSize="14" fontWeight="bold" textAnchor="middle">Rechazo</text>

      {/* Flechas */}
      <line x1="140" y1="105" x2="170" y2="105" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <line x1="300" y1="105" x2="320" y2="105" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Flecha Sí */}
      <path d="M 405 92 L 430 50 L 470 50" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
      <text x="430" y="65" fill="#166534" fontSize="12" fontWeight="bold" textAnchor="middle">Sí</text>
      
      {/* Flecha No */}
      <path d="M 405 118 L 430 160 L 470 160" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-red)" />
      <text x="430" y="150" fill="#991b1b" fontSize="12" fontWeight="bold" textAnchor="middle">No</text>

    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">Flujo continuo que conecta el análisis estadístico con la toma de decisiones operativas.</p>
  </div>
);


// --- Componente Principal ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Encabezado Principal */}
      <header className="bg-indigo-700 text-white py-12 px-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <Activity size={32} className="text-indigo-200" />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Gráficos Modificados y de Aceptación</h1>
          </div>
          <p className="text-lg text-indigo-100 max-w-2xl leading-relaxed">
            Una guía educativa sobre cómo el control estadístico avanzado facilita la toma de decisiones operativas inmediatas.
          </p>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto py-10 px-6 space-y-16">
        
        {/* Sección 1: Introducción */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 text-indigo-700 border-b-2 border-indigo-100 pb-2">
            <FastForward size={24} />
            <h2 className="text-2xl font-bold">Introducción</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-slate-600 leading-relaxed text-lg">
                Los gráficos modificados y de aceptación integran el monitoreo estadístico del proceso con decisiones operativas de aceptación o rechazo. Esto permite no solo detectar desviaciones, sino también <strong className="text-slate-800">tomar acciones inmediatas</strong> basadas en criterios definidos.
              </p>
            </div>
            <IntroChart />
          </div>
        </section>

        {/* Sección 2: Límites modificados */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 text-indigo-700 border-b-2 border-indigo-100 pb-2">
            <Settings size={24} />
            <h2 className="text-2xl font-bold">Límites Modificados</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <ModifiedLimitsChart />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-slate-600 leading-relaxed text-lg">
                En estos gráficos, los límites de control tradicionales se ajustan para adaptarse a condiciones específicas del proceso, como tamaños de muestra variables o requisitos de calidad más estrictos.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Gráficos de aceptación */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 text-indigo-700 border-b-2 border-indigo-100 pb-2">
            <CheckCircle size={24} />
            <h2 className="text-2xl font-bold">Gráficos de Aceptación</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-slate-600 leading-relaxed text-lg">
                Estos gráficos combinan el control estadístico con reglas de inspección, permitiendo clasificar directamente los resultados en <strong className="text-green-600">aceptables</strong> o <strong className="text-red-600">no aceptables</strong> según criterios predefinidos.
              </p>
            </div>
            <AcceptanceChart />
          </div>
        </section>

        {/* Sección 4: Ejemplo en R */}
        <section className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center space-x-2 text-indigo-700 border-b-2 border-indigo-100 pb-2">
            <Code size={24} />
            <h2 className="text-2xl font-bold">Implementación y Ejemplo en R</h2>
          </div>
          
          <p className="text-slate-600 leading-relaxed text-lg">
            A continuación se muestra un ejemplo en R de un gráfico de control con límites modificados que puede interpretarse en términos de aceptación/rechazo:
          </p>

          <div className="bg-slate-900 rounded-lg overflow-hidden my-6">
            <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-xs font-mono text-slate-400">script.R</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono">
              <code>
<span className="text-slate-500"># Instalar y cargar librería</span>{'\n'}
<span className="text-indigo-400">install.packages</span>(<span className="text-green-400">"qcc"</span>){'\n'}
<span className="text-indigo-400">library</span>(qcc){'\n\n'}
<span className="text-slate-500"># Generar datos simulados</span>{'\n'}
<span className="text-indigo-400">set.seed</span>(<span className="text-orange-400">123</span>){'\n'}
datos &lt;- <span className="text-indigo-400">rnorm</span>(<span className="text-orange-400">30</span>, mean = <span className="text-orange-400">50</span>, sd = <span className="text-orange-400">2</span>){'\n\n'}
<span className="text-slate-500"># Crear gráfico de control individual con límites modificados</span>{'\n'}
grafico &lt;- <span className="text-indigo-400">qcc</span>(datos,{'\n'}
               type = <span className="text-green-400">"xbar.one"</span>,{'\n'}
               center = <span className="text-orange-400">50</span>,{'\n'}
               std.dev = <span className="text-orange-400">2</span>,{'\n'}
               nsigmas = <span className="text-orange-400">2</span>)  <span className="text-slate-500"># límites más estrictos (2 sigma)</span>{'\n\n'}
<span className="text-slate-500"># Mostrar gráfico</span>{'\n'}
<span className="text-indigo-400">plot</span>(grafico){'\n\n'}
<span className="text-slate-500"># Identificar puntos fuera de control (rechazo)</span>{'\n'}
fuera_control &lt;- <span className="text-indigo-400">which</span>(datos &gt; grafico$limits[<span className="text-orange-400">2</span>] | datos &lt; grafico$limits[<span className="text-orange-400">1</span>]){'\n'}
fuera_control
              </code>
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mt-6">
            <RChartExample />
            <div>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <AlertTriangle className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-sm text-orange-900">
                    <strong>Análisis:</strong> En este ejemplo, se utilizan límites más estrictos (<strong>2σ</strong> en lugar de 3σ), lo que incrementa la sensibilidad del gráfico y permite interpretar los puntos fuera de los límites como candidatos a <strong className="text-red-700">rechazo</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 5: Cierre */}
        <section className="space-y-6 pb-12">
          <div className="flex items-center space-x-2 text-indigo-700 border-b-2 border-indigo-100 pb-2">
            <XOctagon size={24} />
            <h2 className="text-2xl font-bold">Cierre y Conclusiones</h2>
          </div>
          
          <p className="text-slate-600 leading-relaxed text-lg text-center max-w-2xl mx-auto mb-8">
            Los gráficos modificados y de aceptación permiten integrar el análisis estadístico con la toma de decisiones operativas, facilitando una respuesta más rápida y alineada con los criterios de calidad del proceso.
          </p>

          <FlowchartClose />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>Material Educativo Generado Interactivamente</p>
      </footer>
    </div>
  );
}