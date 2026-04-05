import React, { useState } from 'react';
import { 
  Shield, DollarSign, CheckCircle, XCircle, ArrowRight, 
  Search, BarChart, Settings, Box, Truck, Layers, 
  RefreshCw, Zap, Scale, Info, Filter, TrendingUp,
  AlertTriangle, Users, Target, Activity, Check, X,
  FileText, GitMerge, Grid, Clock
} from 'lucide-react';

// --- DATA: Contenido del Curso ---
const courseData = [
  {
    id: 1,
    title: "Introducción al muestreo de aceptación",
    text: "El muestreo de aceptación es una técnica utilizada en el control de calidad para tomar decisiones sobre un lote de productos sin necesidad de inspeccionarlo completamente. Su alcance se centra en evaluar, mediante una muestra, si un lote debe ser aceptado o rechazado.",
    visualType: "intro"
  },
  {
    id: 2,
    title: "Concepto de muestreo de aceptación",
    text: "Consiste en seleccionar una muestra representativa de un lote y, con base en los resultados de inspección, decidir si se acepta o se rechaza el lote completo.",
    visualType: "flow-basic"
  },
  {
    id: 3,
    title: "Propósito del muestreo de aceptación",
    text: "Esta técnica cumple tres funciones principales: proteger al cliente de productos defectuosos, reducir costos de inspección y facilitar la toma de decisiones en procesos de recepción o envío.",
    visualType: "purpose-map"
  },
  {
    id: 4,
    title: "Ejemplo de aplicación",
    text: "En un lote de 6,000 piezas, se inspeccionan 200 unidades. Si se encuentran 2 o menos defectuosas, el lote se acepta; si se detectan más, se rechaza. Este ejemplo ilustra cómo se establecen criterios de decisión.",
    visualType: "example-table"
  },
  {
    id: 5,
    title: "Naturaleza del muestreo de aceptación",
    text: "El muestreo de aceptación no mejora la calidad del producto. Su función es actuar como un filtro o mecanismo de control que detecta posibles fallas en los lotes producidos.",
    visualType: "nature-contrast"
  },
  {
    id: 6,
    title: "Alternativas de inspección",
    text: "Existen tres enfoques principales: no inspeccionar, inspeccionar el 100% del lote o aplicar muestreo de aceptación. Cada uno responde a diferentes condiciones de costo, riesgo y confiabilidad del proceso.",
    visualType: "alternatives"
  },
  {
    id: 7,
    title: "Inspección cero",
    text: "Consiste en no revisar el lote. Se utiliza cuando el proceso es altamente confiable o cuando inspeccionar resulta más costoso que el riesgo de aceptar defectos.",
    visualType: "zero-inspection"
  },
  {
    id: 8,
    title: "Inspección al 100%",
    text: "Implica revisar todas las unidades del lote. Es útil cuando el riesgo es alto, pero puede generar errores por fatiga o incluso dañar los productos.",
    visualType: "full-inspection"
  },
  {
    id: 9,
    title: "Muestreo como solución intermedia",
    text: "El muestreo de aceptación equilibra costo, tiempo y riesgo, posicionándose como una alternativa eficiente frente a las otras dos estrategias.",
    visualType: "balance"
  },
  {
    id: 10,
    title: "Planes de muestreo",
    text: "Los planes de muestreo establecen cómo seleccionar muestras y cómo tomar decisiones sobre los lotes.",
    visualType: "plan-flow"
  },
  {
    id: 11,
    title: "Planes por atributos",
    text: "Clasifican cada unidad como conforme o no conforme, y la decisión depende del número de defectuosos encontrados.",
    visualType: "attributes"
  },
  {
    id: 12,
    title: "Planes por variables",
    text: "Se basan en la medición de características continuas como peso o longitud, utilizando estadísticas como media y desviación estándar.",
    visualType: "variables"
  },
  {
    id: 13,
    title: "Tipos de planes por atributos",
    text: "Existen tres tipos: simple (una muestra), doble (dos posibles muestras) y múltiple (varias muestras sucesivas hasta decidir).",
    visualType: "plan-types"
  },
  {
    id: 14,
    title: "Formación de lotes",
    text: "Un lote debe ser homogéneo, manejable y preferiblemente grande para garantizar eficiencia en la inspección.",
    visualType: "batch-formation"
  },
  {
    id: 15,
    title: "Selección de la muestra",
    text: "La muestra debe seleccionarse de forma aleatoria para asegurar representatividad y evitar sesgos.",
    visualType: "random-selection"
  },
  {
    id: 16,
    title: "Importancia de la aleatoriedad",
    text: "La aleatoriedad garantiza que todas las unidades tengan la misma probabilidad de ser seleccionadas, lo que asegura decisiones confiables.",
    visualType: "random-prob"
  },
  {
    id: 17,
    title: "Variabilidad en las muestras",
    text: "Las muestras pueden variar debido al azar, incluso si el lote tiene un nivel fijo de defectos.",
    visualType: "sample-variability"
  },
  {
    id: 18,
    title: "Distribución binomial",
    text: "Permite calcular la probabilidad de encontrar cierto número de defectos en una muestra.",
    visualType: "binomial-chart"
  },
  {
    id: 19,
    title: "Curva Característica de Operación (CO)",
    text: "Representa la probabilidad de aceptar un lote según su nivel de calidad.",
    visualType: "co-curve"
  },
  {
    id: 20,
    title: "Curva ideal",
    text: "Una curva perfecta aceptaría todos los lotes buenos y rechazaría todos los malos, pero esto no es posible en la práctica.",
    visualType: "ideal-curve"
  },
  {
    id: 21,
    title: "Niveles de calidad",
    text: "El NCA representa un nivel aceptable de defectos, mientras que el NCL indica un nivel inaceptable.",
    visualType: "quality-levels"
  },
  {
    id: 22,
    title: "Riesgos del muestreo",
    text: "Existen dos riesgos: el del productor (rechazar lotes buenos) y el del consumidor (aceptar lotes malos).",
    visualType: "risks"
  },
  {
    id: 23,
    title: "Indicadores de desempeño",
    text: "Se utilizan métricas como calidad promedio de salida, límite de calidad promedio y cantidad promedio inspeccionada.",
    visualType: "kpi"
  },
  {
    id: 24,
    title: "Diseño de planes de muestreo",
    text: "Diseñar un plan implica definir niveles de calidad, calcular parámetros y establecer criterios de aceptación.",
    visualType: "design-flow"
  },
  {
    id: 25,
    title: "Método de Cameron",
    text: "Es un procedimiento probabilístico que permite determinar el tamaño de muestra y el número de aceptación.",
    visualType: "cameron-method"
  },
  {
    id: 26,
    title: "Estándares de muestreo",
    text: "Normas como MIL STD 105E permiten aplicar el muestreo de forma sistemática en contextos industriales.",
    visualType: "standards"
  },
  {
    id: 27,
    title: "Tipos de inspección en estándares",
    text: "Incluyen inspección normal, severa y reducida, dependiendo del desempeño del proceso.",
    visualType: "inspection-types"
  },
  {
    id: 28,
    title: "Cierre conceptual",
    text: "El muestreo de aceptación es una herramienta que permite tomar decisiones eficientes sobre la calidad, equilibrando costos, riesgos y rapidez mediante fundamentos estadísticos.",
    visualType: "conclusion"
  }
];

// --- COMPONENTES VISUALES ESPECÍFICOS ---
type VisualsType = {
  "intro": () => React.ReactNode;
  "flow-basic": () => React.ReactNode;
  "purpose-map": () => React.ReactNode;
  "example-table": () => React.ReactNode;
};
const Visuals:VisualsType = {
  "intro": () => (
    <div className="flex items-center justify-center gap-8 w-full p-6">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-blue-100 border-2 border-blue-500 rounded flex items-center justify-center grid grid-cols-5 gap-1 p-2">
          {[...Array(25)].map((_, i) => <div key={i} className="w-full h-full bg-blue-400 rounded-sm"></div>)}
        </div>
        <span className="mt-2 text-sm font-semibold text-gray-700">Lote Completo</span>
      </div>
      <ArrowRight className="text-gray-400 w-8 h-8" />
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-green-100 border-2 border-green-500 rounded flex items-center justify-center grid grid-cols-2 gap-1 p-1">
          {[...Array(4)].map((_, i) => <div key={i} className="w-full h-full bg-green-500 rounded-sm"></div>)}
        </div>
        <span className="mt-2 text-sm font-semibold text-gray-700">Muestra Extraída</span>
      </div>
    </div>
  ),
  
  "flow-basic": () => (
    <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-4 w-full p-4">
      {['Lote', 'Muestra', 'Inspección', 'Decisión'].map((step, i, arr) => (
        <React.Fragment key={step}>
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-medium text-sm text-center shadow-sm">
            {step}
            {step === 'Decisión' && <div className="text-xs text-gray-500 mt-1">(Aceptar/Rechazar)</div>}
          </div>
          {i < arr.length - 1 && <ArrowRight className="text-indigo-300 w-5 h-5 hidden md:block" />}
        </React.Fragment>
      ))}
    </div>
  ),

  "purpose-map": () => (
    <div className="flex flex-col items-center gap-4 w-full p-4">
      <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md">Propósito</div>
      <div className="flex justify-center gap-4 w-full">
        <div className="w-1/2 md:w-px h-8 bg-gray-300"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col items-center text-center">
          <Shield className="text-green-500 w-8 h-8 mb-2" />
          <span className="text-sm font-medium">Proteger al Cliente</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col items-center text-center">
          <DollarSign className="text-yellow-500 w-8 h-8 mb-2" />
          <span className="text-sm font-medium">Reducir Costos</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col items-center text-center">
          <Zap className="text-blue-500 w-8 h-8 mb-2" />
          <span className="text-sm font-medium">Facilitar Decisiones</span>
        </div>
      </div>
    </div>
  ),

  "example-table": () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-semibold text-gray-700 text-center">
        Lote: 6,000 | Muestra: 200
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2 text-center">Defectos Encontrados</th>
            <th className="px-4 py-2 text-center">Decisión</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="bg-green-50">
            <td className="px-4 py-3 text-center font-medium">0, 1 o 2</td>
            <td className="px-4 py-3 text-center text-green-700 font-bold flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Aceptar Lote
            </td>
          </tr>
          <tr className="bg-red-50">
            <td className="px-4 py-3 text-center font-medium">3 o más</td>
            <td className="px-4 py-3 text-center text-red-700 font-bold flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" /> Rechazar Lote
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),

  "nature-contrast": () => (
    <div className="flex items-center justify-center gap-8 w-full p-4">
      <div className="flex flex-col items-center bg-blue-50 p-6 rounded-xl border border-blue-200 w-48 text-center relative">
        <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1 shadow-lg">
          <Check className="w-5 h-5" />
        </div>
        <Filter className="w-10 h-10 text-blue-600 mb-3" />
        <h4 className="font-bold text-blue-800">Filtro / Control</h4>
        <p className="text-xs text-blue-600 mt-2">Detecta fallas</p>
      </div>
      <div className="flex flex-col items-center bg-gray-50 p-6 rounded-xl border border-gray-200 w-48 text-center opacity-75 relative">
        <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-lg">
          <X className="w-5 h-5" />
        </div>
        <TrendingUp className="w-10 h-10 text-gray-400 mb-3" />
        <h4 className="font-bold text-gray-500">Mejora de Calidad</h4>
        <p className="text-xs text-gray-400 mt-2">No interviene en producción</p>
      </div>
    </div>
  ),

  "alternatives": () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div className="border border-red-200 bg-red-50 rounded-lg p-4 flex flex-col">
        <div className="font-bold text-red-800 border-b border-red-200 pb-2 mb-2 text-center">No Inspeccionar (0%)</div>
        <ul className="text-xs text-red-700 space-y-1 list-disc pl-4">
          <li>Costo: Nulo</li>
          <li>Riesgo: Muy Alto</li>
          <li>Uso: Procesos muy confiables</li>
        </ul>
      </div>
      <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 flex flex-col">
        <div className="font-bold text-blue-800 border-b border-blue-200 pb-2 mb-2 text-center">Muestreo de Aceptación</div>
        <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
          <li>Costo: Moderado</li>
          <li>Riesgo: Controlado</li>
          <li>Uso: Solución equilibrada</li>
        </ul>
      </div>
      <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 flex flex-col">
        <div className="font-bold text-yellow-800 border-b border-yellow-200 pb-2 mb-2 text-center">Inspección 100%</div>
        <ul className="text-xs text-yellow-700 space-y-1 list-disc pl-4">
          <li>Costo: Muy Alto</li>
          <li>Riesgo: Bajo (pero existe fatiga)</li>
          <li>Uso: Riesgos críticos</li>
        </ul>
      </div>
    </div>
  ),

  "zero-inspection": () => (
    <div className="flex items-center justify-center gap-6 p-8 bg-gray-50 rounded-xl">
      <div className="flex flex-col items-center">
        <Settings className="w-12 h-12 text-gray-600 animate-spin-slow" />
        <span className="text-xs font-bold mt-2">Producción</span>
      </div>
      <div className="h-2 w-32 bg-green-400 flex items-center justify-center relative">
        <div className="absolute top-[-25px] text-xs font-bold text-green-600 bg-white px-2 rounded-full border border-green-200">Sin revisión</div>
        <ArrowRight className="text-green-600 w-6 h-6 absolute right-[-10px]" />
      </div>
      <div className="flex flex-col items-center">
        <Truck className="w-12 h-12 text-blue-600" />
        <span className="text-xs font-bold mt-2">Cliente</span>
      </div>
    </div>
  ),

  "full-inspection": () => (
    <div className="flex flex-col items-center justify-center gap-4 bg-yellow-50 p-6 rounded-xl border border-yellow-200">
      <div className="grid grid-cols-5 gap-2">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-white border border-gray-300 flex items-center justify-center rounded">
            <Search className="w-4 h-4 text-blue-500" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 text-yellow-800">
        <Clock className="w-5 h-5" />
        <span className="text-sm font-bold">Alto Esfuerzo y Tiempo</span>
      </div>
    </div>
  ),

  "balance": () => (
    <div className="flex flex-col items-center justify-center p-6 relative">
      <Scale className="w-24 h-24 text-indigo-500 mb-4" />
      <div className="flex justify-between w-full max-w-sm absolute top-10">
        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold shadow">Riesgo</div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow">Costo/Tiempo</div>
      </div>
      <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg font-bold shadow-md z-10 mt-2">
        Equilibrio Óptimo
      </div>
    </div>
  ),

  "plan-flow": () => (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full p-4">
      {['Elegir Plan', 'Extraer Muestra', 'Evaluar', 'Decidir'].map((step, i, arr) => (
        <React.Fragment key={step}>
          <div className="flex items-center gap-2 bg-white border-2 border-gray-200 px-4 py-2 rounded-full font-medium text-sm shadow-sm">
            <div className="bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">{i+1}</div>
            {step}
          </div>
          {i < arr.length - 1 && <ArrowRight className="text-gray-300 w-5 h-5 hidden md:block" />}
        </React.Fragment>
      ))}
    </div>
  ),

  "attributes": () => (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-lg mx-auto p-4 bg-gray-50 rounded-xl">
      {[...Array(16)].map((_, i) => {
        const isDefect = i === 3 || i === 7 || i === 14;
        return (
          <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm border ${isDefect ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300'}`}>
            {isDefect ? <X className="w-6 h-6 text-red-500" /> : <Check className="w-6 h-6 text-green-500" />}
          </div>
        );
      })}
    </div>
  ),

  "variables": () => (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 relative">
      <svg viewBox="0 0 100 50" className="w-full h-32 stroke-blue-600 fill-blue-50 overflow-visible">
        {/* Ejes */}
        <line x1="0" y1="45" x2="100" y2="45" stroke="#cbd5e1" strokeWidth="1" />
        {/* Curva normal */}
        <path d="M5,45 Q25,45 35,20 T50,5 T65,20 T95,45 Z" strokeWidth="2" />
        {/* Media */}
        <line x1="50" y1="5" x2="50" y2="45" stroke="#2563eb" strokeWidth="1" strokeDasharray="2" />
        <text x="50" y="55" fontSize="6" textAnchor="middle" fill="#1e40af">Media (μ)</text>
      </svg>
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
        <Activity className="w-4 h-4 text-blue-500" /> Medición continua (peso, longitud, etc.)
      </div>
    </div>
  ),

  "plan-types": () => (
    <div className="flex flex-col items-center w-full gap-4 p-4">
      <div className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-bold">Lote</div>
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
        {/* Simple */}
        <div className="flex flex-col items-center border border-gray-200 p-3 rounded-lg bg-white shadow-sm flex-1">
          <div className="font-bold text-gray-700 text-sm mb-2 border-b w-full text-center pb-1">Plan Simple</div>
          <div className="bg-gray-100 p-2 rounded text-xs text-center w-full">1 Muestra</div>
          <ArrowRight className="w-4 h-4 text-gray-400 my-1 rotate-90" />
          <div className="bg-indigo-100 text-indigo-800 p-2 rounded text-xs text-center w-full font-bold">Decisión Final</div>
        </div>
        {/* Doble */}
        <div className="flex flex-col items-center border border-gray-200 p-3 rounded-lg bg-white shadow-sm flex-1">
          <div className="font-bold text-gray-700 text-sm mb-2 border-b w-full text-center pb-1">Plan Doble</div>
          <div className="bg-gray-100 p-2 rounded text-xs text-center w-full">Muestra 1</div>
          <ArrowRight className="w-4 h-4 text-gray-400 my-1 rotate-90" />
          <div className="flex gap-1 w-full text-[10px]">
             <div className="bg-indigo-100 text-indigo-800 p-1 rounded text-center w-1/2">Decisión</div>
             <div className="bg-orange-100 text-orange-800 p-1 rounded text-center w-1/2">Muestra 2</div>
          </div>
        </div>
        {/* Múltiple */}
        <div className="flex flex-col items-center border border-gray-200 p-3 rounded-lg bg-white shadow-sm flex-1">
          <div className="font-bold text-gray-700 text-sm mb-2 border-b w-full text-center pb-1">Plan Múltiple</div>
          <div className="bg-gray-100 p-2 rounded text-xs text-center w-full">Varias Muestras</div>
          <RefreshCw className="w-4 h-4 text-gray-400 my-1" />
          <div className="bg-indigo-100 text-indigo-800 p-2 rounded text-xs text-center w-full font-bold">Decisión</div>
        </div>
      </div>
    </div>
  ),

  "batch-formation": () => (
    <div className="flex justify-center p-6">
      <div className="border-4 border-dashed border-blue-300 rounded-2xl p-6 bg-blue-50 relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          Mismas Condiciones
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[...Array(12)].map((_, i) => (
             <Box key={i} className="w-8 h-8 text-blue-500" />
          ))}
        </div>
      </div>
    </div>
  ),

  "random-selection": () => (
    <div className="grid grid-cols-5 gap-2 max-w-[250px] mx-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
      {[...Array(25)].map((_, i) => {
        const isSelected = [2, 8, 12, 17, 21].includes(i);
        return (
          <div key={i} className={`w-8 h-8 rounded flex items-center justify-center text-xs font-mono shadow-sm transition-colors ${isSelected ? 'bg-yellow-400 text-yellow-900 font-bold border-2 border-yellow-500 scale-110' : 'bg-white text-gray-400 border border-gray-100'}`}>
            {i + 1}
          </div>
        );
      })}
    </div>
  ),

  "random-prob": () => (
    <div className="flex items-center justify-center gap-6 p-6">
      <div className="w-32 h-32 rounded-full border-4 border-indigo-200 overflow-hidden relative">
         <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {/* 6 rebanadas iguales para ilustrar probabilidad igual */}
            <path d="M50,50 L100,50 A50,50 0 0,1 75,93.3 Z" fill="#ebf4ff" stroke="white" strokeWidth="1"/>
            <path d="M50,50 L75,93.3 A50,50 0 0,1 25,93.3 Z" fill="#c3ddfd" stroke="white" strokeWidth="1"/>
            <path d="M50,50 L25,93.3 A50,50 0 0,1 0,50 Z" fill="#a4cafe" stroke="white" strokeWidth="1"/>
            <path d="M50,50 L0,50 A50,50 0 0,1 25,6.7 Z" fill="#76a9fa" stroke="white" strokeWidth="1"/>
            <path d="M50,50 L25,6.7 A50,50 0 0,1 75,6.7 Z" fill="#3f83f8" stroke="white" strokeWidth="1"/>
            <path d="M50,50 L75,6.7 A50,50 0 0,1 100,50 Z" fill="#1c64f2" stroke="white" strokeWidth="1"/>
         </svg>
         <div className="absolute inset-0 flex items-center justify-center">
           <div className="bg-white rounded-full p-2 shadow-sm font-bold text-indigo-800 text-xs">P(x) = C</div>
         </div>
      </div>
      <div className="text-sm font-medium text-gray-600 max-w-[150px]">
        Todas las unidades tienen el <strong>mismo peso</strong> para ser elegidas.
      </div>
    </div>
  ),

  "sample-variability": () => (
    <div className="flex flex-col items-center p-4">
      <div className="bg-gray-100 w-full rounded p-2 text-center text-xs text-gray-500 mb-4 border border-gray-200">
        Lote Original (5% defectuoso)
      </div>
      <div className="flex justify-center gap-6 w-full">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center relative bg-white">
            <span className="text-xl">🟢🟢</span>
            <div className="absolute -bottom-3 bg-white border border-gray-200 text-[10px] px-2 rounded-full">0 defectos</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center relative bg-white">
             <span className="text-xl">🟢🔴</span>
             <div className="absolute -bottom-3 bg-white border border-gray-200 text-[10px] px-2 rounded-full">1 defecto</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center relative bg-white">
             <span className="text-xl">🔴🔴</span>
             <div className="absolute -bottom-3 bg-white border border-gray-200 text-[10px] px-2 rounded-full">2 defectos</div>
          </div>
        </div>
      </div>
      <div className="text-xs text-center text-gray-400 mt-6 italic">Las muestras extraídas del mismo lote pueden dar resultados distintos por el azar.</div>
    </div>
  ),

  "binomial-chart": () => (
    <div className="w-full max-w-sm mx-auto h-40 flex items-end justify-between p-4 border-l-2 border-b-2 border-gray-300 relative">
      <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-medium">Probabilidad</div>
      <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium">Número de defectos (x)</div>
      
      {/* Barras Binomiales (simuladas n=10, p=0.1) */}
      <div className="w-8 bg-blue-500 rounded-t h-[80%] flex items-end justify-center group relative"><span className="absolute -bottom-5 text-xs">0</span></div>
      <div className="w-8 bg-blue-400 rounded-t h-[90%] flex items-end justify-center relative"><span className="absolute -bottom-5 text-xs">1</span></div>
      <div className="w-8 bg-blue-300 rounded-t h-[40%] flex items-end justify-center relative"><span className="absolute -bottom-5 text-xs">2</span></div>
      <div className="w-8 bg-blue-200 rounded-t h-[10%] flex items-end justify-center relative"><span className="absolute -bottom-5 text-xs">3</span></div>
      <div className="w-8 bg-blue-100 rounded-t h-[2%] flex items-end justify-center relative"><span className="absolute -bottom-5 text-xs">4+</span></div>
    </div>
  ),

  "co-curve": () => (
    <div className="w-full max-w-sm mx-auto h-48 relative p-4">
       <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Ejes */}
          <line x1="10" y1="90" x2="100" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Curva CO (S-Shape inversa) */}
          <path d="M10,15 C40,15 50,85 90,85" fill="none" stroke="#3b82f6" strokeWidth="3" />
          
          {/* Etiquetas */}
          <text x="5" y="5" fontSize="6" fill="#64748b" transform="rotate(-90 5,5)">Prob. Aceptación (Pa)</text>
          <text x="50" y="100" fontSize="6" textAnchor="middle" fill="#64748b">Fracción Defectuosa (p)</text>
       </svg>
    </div>
  ),

  "ideal-curve": () => (
    <div className="w-full max-w-sm mx-auto h-48 relative p-4">
       <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <line x1="10" y1="90" x2="100" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="10" x2="10" y2="90" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Curva Real */}
          <path d="M10,15 C40,15 50,85 90,85" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4" />
          
          {/* Curva Ideal (Escalón) */}
          <path d="M10,15 L45,15 L45,85 L90,85" fill="none" stroke="#2563eb" strokeWidth="3" />
          
          <text x="60" y="30" fontSize="6" fill="#2563eb" fontWeight="bold">Ideal (Escalón)</text>
          <text x="70" y="60" fontSize="6" fill="#60a5fa">Real (Suave)</text>
       </svg>
    </div>
  ),

  "quality-levels": () => (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto relative">
      <div className="h-4 w-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 relative">
        {/* Marcador NCA */}
        <div className="absolute top-1/2 left-[20%] transform -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-green-700 border-2 border-white rounded shadow"></div>
        <div className="absolute top-8 left-[20%] transform -translate-x-1/2 text-xs font-bold text-green-700 text-center">
          NCA<br/><span className="text-[10px] font-normal text-gray-500">Nivel Aceptable</span>
        </div>
        
        {/* Marcador NCL */}
        <div className="absolute top-1/2 left-[80%] transform -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-red-700 border-2 border-white rounded shadow"></div>
        <div className="absolute top-8 left-[80%] transform -translate-x-1/2 text-xs font-bold text-red-700 text-center">
          NCL<br/><span className="text-[10px] font-normal text-gray-500">Límite Inaceptable</span>
        </div>
      </div>
    </div>
  ),

  "risks": () => (
    <div className="grid grid-cols-2 gap-4 w-full p-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
        <div className="bg-red-100 p-2 rounded-full mb-2">
           <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <h4 className="font-bold text-red-800 text-sm mb-1">Riesgo del Productor (α)</h4>
        <p className="text-xs text-red-600 bg-white p-2 rounded border border-red-100">Rechazar un lote que es <strong className="text-green-600">BUENO</strong></p>
      </div>
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
        <div className="bg-orange-100 p-2 rounded-full mb-2">
           <Users className="w-6 h-6 text-orange-600" />
        </div>
        <h4 className="font-bold text-orange-800 text-sm mb-1">Riesgo del Consumidor (β)</h4>
        <p className="text-xs text-orange-600 bg-white p-2 rounded border border-orange-100">Aceptar un lote que es <strong className="text-red-600">MALO</strong></p>
      </div>
    </div>
  ),

  "kpi": () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-2">
      <div className="bg-white border-t-4 border-blue-500 rounded-lg shadow p-4 text-center">
        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">CPS</div>
        <div className="text-sm font-semibold text-gray-800">Calidad Promedio de Salida</div>
      </div>
      <div className="bg-white border-t-4 border-purple-500 rounded-lg shadow p-4 text-center">
        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">LCPS</div>
        <div className="text-sm font-semibold text-gray-800">Límite de Calidad Promedio</div>
      </div>
      <div className="bg-white border-t-4 border-teal-500 rounded-lg shadow p-4 text-center">
        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">CPI</div>
        <div className="text-sm font-semibold text-gray-800">Cantidad Promedio Inspeccionada</div>
      </div>
    </div>
  ),

  "design-flow": () => (
    <div className="flex flex-col gap-2 p-4 max-w-sm mx-auto">
      <div className="bg-blue-50 p-3 rounded shadow-sm border border-blue-100 flex items-center gap-3">
        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
        <span className="text-sm font-medium">Definir NCA y NCL (Niveles)</span>
      </div>
      <div className="w-0.5 h-4 bg-gray-300 mx-auto"></div>
      <div className="bg-blue-50 p-3 rounded shadow-sm border border-blue-100 flex items-center gap-3">
        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
        <span className="text-sm font-medium">Calcular tamaño de muestra (n)</span>
      </div>
      <div className="w-0.5 h-4 bg-gray-300 mx-auto"></div>
      <div className="bg-green-50 p-3 rounded shadow-sm border border-green-200 flex items-center gap-3">
        <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
        <span className="text-sm font-bold text-green-800">Establecer criterio de aceptación (c)</span>
      </div>
    </div>
  ),

  "cameron-method": () => (
    <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-xl border border-indigo-100 relative">
      <h4 className="text-sm font-bold text-indigo-800 mb-4 bg-white px-3 py-1 rounded-full shadow-sm">Pasos Método Cameron</h4>
      <div className="flex flex-wrap justify-center gap-4">
         <div className="bg-white p-2 rounded shadow text-xs text-center border-l-2 border-indigo-400">1. Ratio p2/p1</div>
         <div className="bg-white p-2 rounded shadow text-xs text-center border-l-2 border-indigo-400">2. Buscar 'c' en Tablas</div>
         <div className="bg-white p-2 rounded shadow text-xs text-center border-l-2 border-indigo-400">3. Calcular 'n'</div>
      </div>
      <div className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
        <Target className="w-4 h-4" /> Plan Final (n, c)
      </div>
    </div>
  ),

  "standards": () => (
    <div className="w-full max-w-md mx-auto border border-gray-300 rounded overflow-hidden">
      <div className="bg-slate-800 text-white px-4 py-2 font-bold text-center text-sm">
        NORMA MIL-STD-105E
      </div>
      <div className="bg-slate-100 p-2 text-xs text-center text-slate-600 border-b border-gray-300">
        Niveles Generales de Inspección
      </div>
      <table className="w-full text-xs text-center">
        <thead className="bg-slate-200">
          <tr>
            <th className="py-2 px-1 border-r border-gray-300">Tamaño Lote</th>
            <th className="py-2 px-1 border-r border-gray-300">Nivel I</th>
            <th className="py-2 px-1 border-r border-gray-300 bg-slate-300 font-bold">Nivel II (Normal)</th>
            <th className="py-2 px-1">Nivel III</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-b border-gray-100">
             <td className="py-2 border-r border-gray-100">281 - 500</td>
             <td className="py-2 border-r border-gray-100">F</td>
             <td className="py-2 border-r border-gray-100 font-bold text-blue-600 bg-blue-50">H</td>
             <td className="py-2">J</td>
          </tr>
          <tr>
             <td className="py-2 border-r border-gray-100">501 - 1200</td>
             <td className="py-2 border-r border-gray-100">G</td>
             <td className="py-2 border-r border-gray-100 font-bold text-blue-600 bg-blue-50">J</td>
             <td className="py-2">K</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),

  "inspection-types": () => (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Normal */}
      <div className="bg-blue-100 border-2 border-blue-500 text-blue-800 font-bold px-6 py-3 rounded-lg shadow-md z-10 w-40 text-center">
        NORMAL
      </div>
      
      {/* Arrows container */}
      <div className="flex justify-between w-full max-w-sm px-8 relative -my-4">
         {/* Normal to Severe */}
         <div className="flex flex-col items-center">
            <div className="text-[10px] text-red-600 bg-white px-1">Rechazos</div>
            <ArrowRight className="w-5 h-5 text-red-400 rotate-90" />
         </div>
         {/* Normal to Reduced */}
         <div className="flex flex-col items-center">
            <div className="text-[10px] text-green-600 bg-white px-1">Buena Historia</div>
            <ArrowRight className="w-5 h-5 text-green-400 rotate-90" />
         </div>
      </div>

      <div className="flex justify-between gap-12 w-full max-w-md">
         {/* Severa */}
         <div className="bg-red-50 border-2 border-red-500 text-red-800 font-bold px-4 py-2 rounded-lg shadow w-32 text-center text-sm">
           SEVERA
         </div>
         {/* Reducida */}
         <div className="bg-green-50 border-2 border-green-500 text-green-800 font-bold px-4 py-2 rounded-lg shadow w-32 text-center text-sm">
           REDUCIDA
         </div>
      </div>
    </div>
  ),

  "conclusion": () => (
    <div className="relative w-full max-w-md mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 shadow-sm flex items-center justify-center h-64">
       <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow text-xs font-bold text-gray-700">Decisión Eficiente</div>
       
       <div className="absolute top-1/4 left-4 bg-red-100 text-red-700 p-2 rounded-full shadow-sm"><AlertTriangle className="w-5 h-5"/></div>
       <div className="absolute top-1/4 right-4 bg-green-100 text-green-700 p-2 rounded-full shadow-sm"><CheckCircle className="w-5 h-5"/></div>
       <div className="absolute bottom-1/4 left-10 bg-yellow-100 text-yellow-700 p-2 rounded-full shadow-sm"><DollarSign className="w-5 h-5"/></div>
       <div className="absolute bottom-1/4 right-10 bg-purple-100 text-purple-700 p-2 rounded-full shadow-sm"><Activity className="w-5 h-5"/></div>
       
       {/* Conexiones */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 0}}>
          <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4"/>
          <line x1="20%" y1="35%" x2="50%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="80%" y1="35%" x2="50%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="30%" y1="75%" x2="50%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="70%" y1="75%" x2="50%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
       </svg>

       <div className="bg-indigo-600 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg z-10 border-4 border-indigo-200">
         <Layers className="w-8 h-8 mb-1" />
         <span className="text-[10px] font-bold">Muestreo</span>
       </div>
    </div>
  )
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [activeSectionId, setActiveSectionId] = useState(1);

  // Intersection Observer setup for scrollspy functionality could be added here,
  // but for simplicity and robustness in iframe, we'll use a direct click navigation.

  const activeSection = courseData.find(s => s.id === activeSectionId);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <header className="bg-indigo-700 text-white py-4 px-6 shadow-md z-20  top-0">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-indigo-300" />
          <div>
            <h1 className="text-xl font-bold leading-tight">Muestreo de Aceptación</h1>
          
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full mx-auto">
    
        {/* CONTENT AREA */}
        {courseData.map((section) => (
        <section className="w-full p-6 md:p-10 md:h-[calc(100vh-76px)]  bg-slate-50/50">
          
            <div className="mx-auto animation-fade-in flex flex-col gap-8">
              
              {/* Text Header Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative ">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
             
                <h2 className="text-3xl font-extrabold text-slate-800  leading-tight">
                  {section.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {section.text}
                </p>
              </div>

              {/* Visual Representation Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                
                <div className="p-8 flex justify-center items-center bg-dot-pattern min-h-[300px]">
                  {/* Render Visual Component dynamically */}
                  {Visuals[section.visualType]()}
                </div>
              </div>

            </div>
          

        </section>
    ))}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .bg-dot-pattern {
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .animation-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Custom scrollbar for sidebar */
        aside::-webkit-scrollbar {
          width: 6px;
        }
        aside::-webkit-scrollbar-track {
          background: #f1f5f9; 
        }
        aside::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        aside::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}} />
    </div>
  );
}