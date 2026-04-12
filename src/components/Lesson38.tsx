import React, { useState } from 'react';
import { 
  LineChart, Activity, Layers, Target, SplitSquareHorizontal, 
  TrendingUp, FastForward, GitBranch, Terminal, Map as MapIcon,
  CheckCircle2, AlertCircle
} from 'lucide-react';

// --- COMPONENTES VISUALES PERSONALIZADOS ---

// Visual 1: Shewhart vs CUSUM
const VisualShewhartVsCusum = () => {
  // Datos simulados: proceso en control hasta x=10, luego pequeño cambio en media
  const data = [0.2, -0.5, 0.3, 0.8, -0.2, 0.1, -0.4, 0.5, -0.1, 0.2, 
                1.2, 0.9, 1.1, 1.4, 0.8, 1.3, 1.0, 1.5, 1.1, 1.4];
  
  let cusum = 0;
  const cusumData = data.map(val => {
    cusum += val;
    return cusum;
  });

  const renderPath = (dataset, scaleY, offsetY) => {
    return dataset.map((val, i) => `${i * 20},${offsetY - val * scaleY}`).join(' L ');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Gráfico Shewhart */}
      <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h4 className="text-sm font-semibold text-slate-600 mb-2 text-center">Gráfico Shewhart (Tradicional)</h4>
        <svg viewBox="-10 -10 400 120" className="w-full h-auto overflow-visible">
          {/* Límites de control (+3, -3) simulados */}
          <line x1="0" y1="10" x2="380" y2="10" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
          <line x1="0" y1="90" x2="380" y2="90" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
          <line x1="0" y1="50" x2="380" y2="50" stroke="#94a3b8" strokeWidth="1" />
          
          <path d={`M ${renderPath(data, 15, 50)}`} fill="none" stroke="#64748b" strokeWidth="2" />
          {data.map((val, i) => (
            <circle key={i} cx={i * 20} cy={50 - val * 15} r="3" fill="#334155" />
          ))}
          <text x="385" y="14" fontSize="10" fill="#ef4444">LCS</text>
          <text x="385" y="94" fontSize="10" fill="#ef4444">LCI</text>
        </svg>
        <p className="text-xs text-slate-500 mt-2 text-center">Cambio no detectado (puntos dentro de los límites)</p>
      </div>

      {/* Gráfico CUSUM */}
      <div className="flex-1 bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
        <h4 className="text-sm font-semibold text-blue-700 mb-2 text-center">Gráfico CUSUM</h4>
        <svg viewBox="-10 -10 400 120" className="w-full h-auto overflow-visible">
          <line x1="0" y1="20" x2="380" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
          <line x1="0" y1="90" x2="380" y2="90" stroke="#94a3b8" strokeWidth="1" />
          
          <path d={`M ${renderPath(cusumData, 8, 90)}`} fill="none" stroke="#2563eb" strokeWidth="2" />
          {cusumData.map((val, i) => (
            <circle key={i} cx={i * 20} cy={90 - val * 8} r="3" fill={90 - val * 8 < 20 ? "#ef4444" : "#2563eb"} />
          ))}
          <text x="385" y="24" fontSize="10" fill="#ef4444">Límite h</text>
        </svg>
        <p className="text-xs text-blue-600 mt-2 text-center font-medium">¡Cambio detectado rápidamente!</p>
      </div>
    </div>
  );
};

// Visual 2: Principios Básicos (Barras de desviación y curva acumulada)
const VisualBasicPrinciples = () => {
  const devs = [0.5, -0.2, 0.8, -0.4, 0.6, 1.2, 1.5, 0.9, 1.4, 1.8];
  let acc = 0;
  const accData = devs.map(v => { acc += v; return acc; });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 w-full flex flex-col items-center">
      <div className="w-full max-w-lg">
        <h4 className="text-xs font-semibold text-slate-500 mb-1">Desviaciones individuales (X - μ)</h4>
        <svg viewBox="0 0 400 60" className="w-full h-auto mb-4">
          <line x1="0" y1="30" x2="400" y2="30" stroke="#cbd5e1" strokeWidth="1" />
          {devs.map((val, i) => (
            <rect key={i} x={i * 40 + 10} y={val > 0 ? 30 - val*10 : 30} width="20" height={Math.abs(val*10)} fill={val > 0 ? "#10b981" : "#f43f5e"} opacity="0.8" />
          ))}
        </svg>
        
        <h4 className="text-xs font-semibold text-blue-600 mb-1">Suma Acumulada (Tendencia visible)</h4>
        <svg viewBox="0 -10 400 80" className="w-full h-auto overflow-visible">
          <line x1="0" y1="60" x2="400" y2="60" stroke="#cbd5e1" strokeWidth="1" />
          <path d={`M 0,60 L ${accData.map((val, i) => `${i * 40 + 20},${60 - val*6}`).join(' L ')}`} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinejoin="round" />
          {accData.map((val, i) => (
            <circle key={i} cx={i * 40 + 20} cy={60 - val * 6} r="4" fill="#1d4ed8" />
          ))}
        </svg>
      </div>
    </div>
  );
};

// Visual 3: CUSUM Tabular
const VisualTabularCusum = () => {
  return (
    <div className="bg-slate-50 p-6 rounded-xl w-full border border-slate-200">
      <svg viewBox="-20 -20 440 140" className="w-full h-auto overflow-visible">
        <line x1="0" y1="50" x2="400" y2="50" stroke="#94a3b8" strokeWidth="2" />
        <text x="-15" y="54" fontSize="12" fill="#64748b">0</text>
        
        {/* Curva Superior (Incrementos) */}
        <path d="M 0,50 L 50,50 L 100,50 L 150,45 L 200,30 L 250,10 L 300,-10 L 350,-15" fill="none" stroke="#ef4444" strokeWidth="3" />
        <text x="360" y="-10" fontSize="12" fill="#ef4444" fontWeight="bold">CUSUM Superior (C+)</text>
        
        {/* Curva Inferior (Decrementos) */}
        <path d="M 0,50 L 50,50 L 100,55 L 150,50 L 200,60 L 250,55 L 300,50" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="4" />
        <text x="310" y="65" fontSize="12" fill="#10b981" fontWeight="bold">CUSUM Inferior (C-)</text>
        
        <circle cx="100" cy="50" r="5" fill="#f59e0b" />
        <text x="80" y="70" fontSize="10" fill="#d97706">Punto de cambio</text>
      </svg>
    </div>
  );
};

// Visual 4: Diseño CUSUM (k y h)
const VisualDesignParams = () => {
  return (
    <div className="relative bg-white p-6 rounded-xl shadow-sm border border-slate-100 w-full overflow-hidden">
      <svg viewBox="0 0 500 200" className="w-full h-auto">
        {/* Fondo y guías */}
        <rect x="0" y="0" width="500" height="200" fill="#f8fafc" />
        <line x1="0" y1="100" x2="500" y2="100" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Límite de decisión h */}
        <line x1="0" y1="40" x2="500" y2="40" stroke="#ef4444" strokeWidth="2" strokeDasharray="6" />
        <text x="10" y="35" fontSize="14" fill="#ef4444" fontWeight="bold">+h (Límite de decisión)</text>
        
        <line x1="0" y1="160" x2="500" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="6" />
        <text x="10" y="155" fontSize="14" fill="#ef4444" fontWeight="bold">-h</text>

        {/* Trayectoria */}
        <path d="M 0,100 L 50,95 L 100,105 L 150,80 L 200,85 L 250,50 L 300,20 L 350,10" fill="none" stroke="#3b82f6" strokeWidth="3" />
        
        {/* Puntos y señales */}
        <circle cx="300" cy="20" r="6" fill="#ef4444" />
        <circle cx="250" cy="50" r="4" fill="#3b82f6" />
        
        {/* Anotación de k (pendiente de referencia) */}
        <path d="M 150,80 L 200,80 L 200,85" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="2"/>
        <text x="160" y="75" fontSize="12" fill="#8b5cf6">Pendiente ref (k)</text>

        <text x="310" y="15" fontSize="12" fill="#ef4444" fontWeight="bold">¡Señal fuera de control!</text>
      </svg>
    </div>
  );
};

// Visual 5: Estandarizado
const VisualStandardized = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="text-center">
        <h4 className="text-sm font-semibold text-slate-600 mb-2">Datos Originales (Escala Real)</h4>
        <div className="w-40 h-32 bg-white rounded-lg shadow-inner border border-slate-200 relative flex items-center justify-center">
           <svg viewBox="0 0 100 100" className="w-full h-full opacity-50">
              <path d="M 10,80 L 30,50 L 50,60 L 70,30 L 90,20" fill="none" stroke="#64748b" strokeWidth="3" />
           </svg>
           <span className="absolute left-2 top-2 text-xs text-slate-400">Y: 500 - 600 kg</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center text-blue-500">
        <span className="text-xs font-bold bg-blue-100 px-3 py-1 rounded-full mb-1">Z = (X - μ) / σ</span>
        <TrendingUp size={24} />
      </div>

      <div className="text-center">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">Datos Estandarizados (Z)</h4>
        <div className="w-40 h-32 bg-blue-50 rounded-lg shadow-inner border border-blue-200 relative flex items-center justify-center">
           <svg viewBox="0 0 100 100" className="w-full h-full">
              <line x1="0" y1="50" x2="100" y2="50" stroke="#93c5fd" strokeWidth="2" strokeDasharray="2" />
              <path d="M 10,70 L 30,50 L 50,55 L 70,30 L 90,20" fill="none" stroke="#2563eb" strokeWidth="3" />
           </svg>
           <span className="absolute left-2 top-2 text-xs text-blue-600">Z: -2 a +2</span>
        </div>
      </div>
    </div>
  );
};


// Visual 7: Variantes (Esquema)
const VisualVariants = () => {
  const variants = [
    { title: "Variabilidad", icon: <Activity size={24} />, desc: "Monitoreo de dispersión (rangos/desviación)." },
    { title: "Otros Estadísticos", icon: <Layers size={24} />, desc: "Aplicación a residuos, conteos (Poisson)." },
    { title: "Máscara V", icon: <Target size={24} />, desc: "Plantilla visual sobre el gráfico para tomar decisiones." },
    { title: "Auto-inicializable", icon: <FastForward size={24} />, desc: "Ajuste dinámico sin parámetros históricos previos." }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {variants.map((v, i) => (
        <div key={i} className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all">
          <div className="p-3 bg-white rounded-lg text-blue-600 shadow-sm mr-4">
            {v.icon}
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{v.title}</h4>
            <p className="text-sm text-slate-600 leading-tight mt-1">{v.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Visual 8: Ejemplo en R (Código + Plot)
const VisualRExample = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Bloque de código */}
      <div className="flex-1 bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border border-slate-700">
        <div className="bg-slate-800 px-4 py-2 flex items-center border-b border-slate-700">
          <Terminal size={16} className="text-slate-400 mr-2" />
          <span className="text-xs text-slate-300 font-mono">script.R</span>
        </div>
        <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto">
          <code>
<span className="text-slate-500"># Instalar y cargar librería</span>{'\n'}
<span className="text-blue-400">install.packages</span>(<span className="text-emerald-300">"qcc"</span>){'\n'}
<span className="text-purple-400">library</span>(qcc){'\n\n'}
<span className="text-slate-500"># Generar datos simulados</span>{'\n'}
<span className="text-blue-400">set.seed</span>(<span className="text-orange-300">123</span>){'\n'}
datos <span className="text-pink-400">&lt;-</span> <span className="text-blue-400">c</span>(<span className="text-blue-400">rnorm</span>(<span className="text-orange-300">20</span>, mean=<span className="text-orange-300">0</span>, sd=<span className="text-orange-300">1</span>),{'\n'}
           <span className="text-blue-400">rnorm</span>(<span className="text-orange-300">20</span>, mean=<span className="text-orange-300">0.5</span>, sd=<span className="text-orange-300">1</span>)){'\n\n'}
<span className="text-slate-500"># Crear gráfico CUSUM</span>{'\n'}
cusum_chart <span className="text-pink-400">&lt;-</span> <span className="text-blue-400">cusum</span>(datos,{'\n'}
               center = <span className="text-orange-300">0</span>,{'\n'}
               std.dev = <span className="text-orange-300">1</span>,{'\n'}
               decision.interval = <span className="text-orange-300">5</span>,{'\n'}
               se.shift = <span className="text-orange-300">1</span>){'\n\n'}
<span className="text-blue-400">plot</span>(cusum_chart)
          </code>
        </pre>
      </div>

      {/* Gráfico resultante simulado */}
      <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center">
        <h4 className="text-center font-bold text-slate-700 mb-4 text-sm">CUSUM Chart (qcc output)</h4>
        <svg viewBox="0 0 400 200" className="w-full h-auto bg-slate-50 border border-slate-300">
          <rect x="0" y="0" width="400" height="200" fill="#f8fafc" />
          <line x1="40" y1="20" x2="380" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
          <line x1="40" y1="180" x2="380" y2="180" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
          <line x1="40" y1="100" x2="380" y2="100" stroke="#000" strokeWidth="1" />
          
          <path d="M 40,100 L 55,105 L 70,95 L 85,90 L 100,110 L 115,105 L 130,90 L 145,85 L 160,95 L 175,100 L 190,80 L 205,65 L 220,50 L 235,40 L 250,25 L 265,15 L 280,5 L 295,10" fill="none" stroke="#000" strokeWidth="1" />
          
          {/* Puntos de control simulados (negro: ok, rojo: fuera de control) */}
          {[100, 105, 95, 90, 110, 105, 90, 85, 95, 100, 80, 65, 50, 40, 25].map((y, i) => (
             <circle key={i} cx={40 + i*15} cy={y} r="3" fill="#000" />
          ))}
          {[15, 5, 10].map((y, i) => (
             <circle key={`out-${i}`} cx={40 + (i+15)*15} cy={y} r="4" fill="#ef4444" />
          ))}
          
          <text x="10" y="25" fontSize="10" fill="#ef4444">5.0</text>
          <text x="10" y="105" fontSize="10" fill="#000">0.0</text>
          <text x="5" y="185" fontSize="10" fill="#ef4444">-5.0</text>
          <text x="210" y="195" fontSize="10" fill="#000">Group Summary Statistics</text>
        </svg>
      </div>
    </div>
  );
};

// Visual 9: Mapa Conceptual de Cierre
const VisualMindMap = () => {
  return (
    <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Nodo Central */}
        <div className="bg-blue-600 px-6 py-4 rounded-xl font-bold text-xl shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400 mb-8 z-10">
          Gráfico CUSUM
        </div>
        
        {/* Conectores SVG abstractos (simplificados para react responsivo) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative">
          
          <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-xl border border-slate-600 hover:border-emerald-400 transition-colors">
            <div className="flex items-center text-emerald-400 mb-2">
              <CheckCircle2 size={20} className="mr-2" />
              <h3 className="font-bold">Propósito</h3>
            </div>
            <p className="text-sm text-slate-300">Detección temprana de pequeñas desviaciones sostenidas en la media.</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-xl border border-slate-600 hover:border-purple-400 transition-colors">
            <div className="flex items-center text-purple-400 mb-2">
              <GitBranch size={20} className="mr-2" />
              <h3 className="font-bold">Variantes</h3>
            </div>
            <ul className="text-sm text-slate-300 list-disc list-inside">
              <li>Tabular vs Máscara V</li>
              <li>Estandarizado</li>
              <li>Auto-inicializable</li>
            </ul>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-xl border border-slate-600 hover:border-orange-400 transition-colors">
            <div className="flex items-center text-orange-400 mb-2">
              <AlertCircle size={20} className="mr-2" />
              <h3 className="font-bold">Parámetros</h3>
            </div>
            <p className="text-sm text-slate-300"><strong className="text-white">k:</strong> Valor de referencia (sensibilidad).<br/><strong className="text-white">h:</strong> Límite de decisión.</p>
          </div>

        </div>
      </div>
    </div>
  );
};


// --- ESTRUCTURA PRINCIPAL DE LA PÁGINA ---

const sections = [
  {
    id: "intro",
    title: "Introducción",
    text: "El gráfico CUSUM (Cumulative Sum) es una técnica de control estadístico que se basa en la suma acumulativa de desviaciones respecto a un valor objetivo. Su principal ventaja es su alta sensibilidad para detectar cambios pequeños y persistentes en la media de un proceso.",
    Visual: VisualShewhartVsCusum
  },
  {
    id: "principios",
    title: "Principios básicos",
    text: "El CUSUM se construye acumulando, de forma secuencial, las diferencias entre cada observación y la media objetivo. Si el proceso está bajo control, estas sumas tienden a oscilar alrededor de cero; si hay un cambio, se observa una tendencia creciente o decreciente.",
    Visual: VisualBasicPrinciples
  },
  {
    id: "tabular",
    title: "Cusum tabular (algorítmico)",
    text: "El método tabular utiliza dos estadísticas acumulativas: una para detectar incrementos (CUSUM superior) y otra para detectar decrementos (CUSUM inferior). Esto permite identificar de forma diferenciada cambios en ambas direcciones.",
    Visual: VisualTabularCusum
  },
  {
    id: "diseno",
    title: "Diseño del Cusum",
    text: "El desempeño del gráfico depende de dos parámetros clave: \n• k (valor de referencia): determina la sensibilidad a cambios pequeños. \n• h (límite de decisión): define cuándo se dispara una señal de fuera de control.",
    Visual: VisualDesignParams
  },
  {
    id: "estandarizado",
    title: "Cusum estandarizado",
    text: "En esta variante, los datos se normalizan usando la desviación estándar, lo que permite aplicar el método en distintos contextos sin depender de la escala original.",
    Visual: VisualStandardized
  },
  {
    id: "variantes",
    title: "Variantes del Cusum",
    text: "El método puede adaptarse a diferentes objetivos como el monitoreo de la variabilidad, la aplicación a otros estadísticos, el método de máscara V o el Cusum auto-inicializable.",
    Visual: VisualVariants
  },
  {
    id: "codigo",
    title: "Ejemplo",
    text: `Una empresa desea detectar posibles cambios en el comportamiento de un proceso productivo utilizando herramientas de control estadístico. Para ello, se recolectan 40 observaciones de una característica de calidad.

Se sabe que el proceso inicialmente opera bajo condiciones normales con media 0 y desviación estándar 1. Sin embargo, después de cierto punto, el proceso podría haber sufrido un cambio en su media a 0.5, manteniendo la misma variabilidad.

Se pide:

Construir un gráfico CUSUM (suma acumulada) utilizando los datos proporcionados.
Utilizar como parámetros del gráfico:
-  Media objetivo (center) = 0
-  Desviación estándar = 1
-  Intervalo de decisión (decision interval) = 5
-  Cambio a detectar = 1 desviación estándar
Graficar el CUSUM y analizar su comportamiento.
Determinar si existe evidencia de un cambio en la media del proceso.
Identificar aproximadamente en qué punto ocurre el cambio y justificar la respuesta.`,
    Visual: VisualRExample
  },
  {
    id: "cierre",
    title: "Cierre",
    text: "El gráfico CUSUM es una herramienta poderosa para la detección temprana de desviaciones pequeñas y sostenidas en procesos. Su flexibilidad y adaptabilidad lo convierten en una opción clave en el monitoreo estadístico moderno.",
    Visual: VisualMindMap
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-6 sm:px-12 lg:px-24 mb-12 shadow-md">
        <div className="max-w-5xl mx-auto">
        
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Gráficos CUSUM
          </h1>
         
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pb-24">
        <div className="space-y-20">
          {sections.map((section, index) => {
            const VisualComponent = section.Visual;
            const isEven = index % 2 === 0;

            // Diferente layout para la conclusión o ejemplo R para mayor impacto
            if (section.id === "cierre") {
              return (
                <section key={section.id} className="pt-8 border-t border-slate-200">
                  <div className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">{section.title}</h2>
                    <p className="text-lg text-slate-600">{section.text}</p>
                  </div>
                  <VisualComponent />
                </section>
              );
            }

            return (
              <section key={section.id} className="relative group">
                {/* Decorador lateral */}
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-blue-100 rounded-full group-hover:bg-blue-400 transition-colors"></div>
                
                <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Texto de la sección */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-4 text-blue-600">
                      <span className="text-sm font-bold bg-blue-100 px-3 py-1 rounded-full">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-800">{section.title}</h2>
                    </div>
                    <div className="prose prose-slate prose-lg">
                      {section.text.split('\n').map((paragraph, i) => (
                        <p key={i} className="text-slate-600 leading-relaxed mb-3">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Componente Visual */}
                  <div className="flex-1 w-full min-w-[50%]">
                    <div className="bg-white p-2 md:p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1">
                      <VisualComponent />
                    </div>
                  </div>

                </div>
              </section>
            );
          })}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>Documento educativo generado de forma dinámica. Conceptos de Control Estadístico de Calidad.</p>
      </footer>
    </div>
  );
}