import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ReferenceLine, ResponsiveContainer, ScatterChart, Scatter, ZAxis, 
  BarChart, Bar, Legend
} from 'recharts';
import { Settings, BarChart2, CheckCircle, AlertTriangle, Users, RefreshCw, Layers } from 'lucide-react';

// --- Types & Interfaces ---
interface TabData {
  id: string;
  label: string;
  title: string;
  description: string;
  content: React.ReactNode;
  diagramType: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: TabData[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface DiagramRenderProps {
  type: string;
  title: string;
  description: string;
}

// --- Data Content ---
const lessonData: TabData[] = [
  {
    id: 'intro',
    label: '1. Introducción',
    title: 'Introducción a la implantación de cartas de control',
    description: 'Diagrama general del ciclo de uso de una carta de control.',
    diagramType: 'ciclo-uso',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          La utilidad de una carta de control depende no solo de su diseño, sino de <strong>cómo se implementa y se usa</strong>. Su propósito es apoyar la toma de decisiones para mejorar procesos, no solo registrar datos.
        </p>
      </div>
    )
  },
  {
    id: 'problema',
    label: '2. Problema',
    title: 'Identificación del problema y justificación',
    description: 'Esquema tipo causa–problema–herramienta.',
    diagramType: 'causa-problema',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          Antes de implantar una carta, es necesario describir claramente la situación problemática y justificar por qué la carta ayudará a entenderla y mejorarla.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Esto asegura que la carta tenga un propósito claro y no se use de manera rutinaria sin impacto.
        </p>
      </div>
    )
  },
  {
    id: 'objetivos',
    label: '3. Objetivos',
    title: 'Definición de objetivos y selección de variables',
    description: 'Tabla comparativa con variables candidatas y criterios de selección.',
    diagramType: 'tabla-variables',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          Se deben establecer objetivos concretos (por ejemplo, reducir defectos o variabilidad) y listar variables relevantes. Luego se seleccionan aquellas que mejor representen el problema.
        </p>
        <div className="grid gap-2 bg-gray-50 p-4 rounded border border-gray-200">
          <h4 className="font-semibold text-gray-800">Criterios de selección:</h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>Impacto en calidad, costo o productividad</li>
            <li>Facilidad de medición</li>
            <li>Disponibilidad de datos confiables</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'seleccion',
    label: '4. Selección',
    title: 'Selección del tipo de carta de control',
    description: 'Diagrama de decisión que guía desde el tipo de dato hasta la carta adecuada.',
    diagramType: 'arbol-decision',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          La elección depende del tipo de datos y del proceso. La selección correcta determina la capacidad de la carta para detectar cambios.
        </p>
        <ul className="grid gap-2 list-disc list-inside text-gray-700">
          <li><strong>Variables continuas:</strong> cartas de medias (X̄-R, X̄-S)</li>
          <li><strong>Atributos:</strong> cartas p, np, c, u</li>
          <li><strong>Datos individuales:</strong> carta de individuales</li>
        </ul>
      </div>
    )
  },
  {
    id: 'subagrupamiento',
    label: '5. Subagrupamiento',
    title: 'Concepto de subagrupamiento',
    description: 'Comparación entre subgrupos homogéneos vs. heterogéneos.',
    diagramType: 'scatter-homogeneidad',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          Cada punto en la carta representa un <strong>subgrupo de datos homogéneos</strong>. La clave es que los elementos del subgrupo provengan de condiciones similares.
        </p>
        <div className="grid gap-2 bg-blue-50 p-4 rounded border border-blue-100">
          <h4 className="font-semibold text-blue-900">Principio fundamental:</h4>
          <ul className="list-disc list-inside text-blue-800">
            <li>La variación dentro del subgrupo debe ser mínima.</li>
            <li>La variación entre subgrupos debe reflejar cambios reales.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'metodos',
    label: '6. Métodos',
    title: 'Métodos de selección de subgrupos',
    description: 'Línea de tiempo mostrando cómo se seleccionan muestras en ambos métodos.',
    diagramType: 'timeline-metodos',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          Existen dos formas principales de selección:
        </p>
        <ul className="grid gap-3 text-gray-700">
          <li className="grid grid-cols-[auto_1fr] gap-2 items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
            <span><strong>Método del instante:</strong> muestras tomadas en un momento específico (más homogéneas). Útil para detectar causas especiales rápidamente.</span>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-2 items-start">
            <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
            <span><strong>Método del periodo:</strong> muestras representativas de un intervalo de tiempo continuo.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'frecuencia',
    label: '7. Frecuencia',
    title: 'Tamaño y frecuencia de muestreo',
    description: 'Comparación gráfica entre dos estrategias de muestreo y su capacidad de detección.',
    diagramType: 'line-frecuencia',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          El tamaño del subgrupo y la frecuencia determinan la sensibilidad de la carta.
        </p>
        <div className="grid gap-2 bg-gray-50 p-4 rounded border border-gray-200">
          <h4 className="font-semibold text-gray-800">Principios clave:</h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>Muestras pequeñas y frecuentes son preferibles.</li>
            <li>Frecuencia suficiente para detectar cambios oportunamente.</li>
          </ul>
          <p className="text-sm text-gray-600 italic mt-2">Ejemplo: 5 piezas cada 30 minutos es mejor que 20 cada 2 horas.</p>
        </div>
      </div>
    )
  },
  {
    id: 'estandarizacion',
    label: '8. Estandarización',
    title: 'Estandarización de la recolección de datos',
    description: 'Diagrama de proceso de medición con puntos de control.',
    diagramType: 'proceso-medicion',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          Es fundamental definir claramente el proceso para evitar falsas señales por errores de medición o inconsistencias.
        </p>
        <ul className="grid gap-2 list-disc list-inside text-gray-700">
          <li>Cómo se miden los datos.</li>
          <li>Qué instrumentos se usan.</li>
          <li>Qué criterios siguen los inspectores.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'limites',
    label: '9. Límites',
    title: 'Determinación y uso de límites de control',
    description: 'Carta con puntos iniciales, identificación de puntos fuera de control y límites.',
    diagramType: 'carta-control',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          Se deben recolectar entre 20 y 30 subgrupos para calcular límites iniciales.
        </p>
        <div className="grid gap-3 text-gray-700">
          <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-green-50 p-3 rounded">
            <CheckCircle className="text-green-600" />
            <span>Si el proceso es estable → usar límites para monitoreo futuro.</span>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-red-50 p-3 rounded">
            <AlertTriangle className="text-red-600" />
            <span>Si hay puntos fuera de control → investigar causas.</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-800">Nota: Los límites no deben cambiarse sin justificación técnica.</p>
      </div>
    )
  },
  {
    id: 'participacion',
    label: '10. Participación',
    title: 'Participación y capacitación del personal',
    description: 'Representación del equipo analizando y discutiendo acciones.',
    diagramType: 'equipo-capacitacion',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          El éxito depende del involucramiento de las personas que usan la carta.
        </p>
        <ul className="grid gap-2 list-none text-gray-700">
          <li className="grid grid-cols-[auto_1fr] items-center gap-2"><Users className="w-4 h-4 text-blue-600"/> Explicar objetivos claramente.</li>
          <li className="grid grid-cols-[auto_1fr] items-center gap-2"><Layers className="w-4 h-4 text-blue-600"/> Capacitar en uso e interpretación.</li>
          <li className="grid grid-cols-[auto_1fr] items-center gap-2"><Settings className="w-4 h-4 text-blue-600"/> Fomentar responsabilidad compartida.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'analisis',
    label: '11. Análisis',
    title: 'Análisis e interpretación de resultados',
    description: 'Flujo de decisión: señal detectada → análisis → acción correctiva.',
    diagramType: 'flujo-decision',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          La carta debe utilizarse de manera proactiva. Se debe definir claramente quién analiza y qué acciones seguir ante las señales.
        </p>
        <ul className="grid gap-2 list-disc list-inside text-gray-700">
          <li>Detectar causas especiales.</li>
          <li>Tomar decisiones fundamentadas.</li>
          <li>Implementar mejoras directas.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'evaluacion',
    label: '12. Evaluación',
    title: 'Evaluación de la efectividad',
    description: 'Indicadores antes y después de implementar la carta (mejora visible).',
    diagramType: 'bar-antes-despues',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          Es importante verificar periódicamente el impacto real de la herramienta para evitar que se convierta en una actividad rutinaria sin beneficios.
        </p>
        <ul className="grid gap-2 list-disc list-inside text-gray-700">
          <li>Cumple su propósito original.</li>
          <li>Se usa correctamente en piso.</li>
          <li>Genera mejoras reales y medibles.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'mantenimiento',
    label: '13. Mantenimiento',
    title: 'Mantenimiento y mejora continua',
    description: 'Ciclo de mejora continua aplicado al uso de la carta de control.',
    diagramType: 'ciclo-mejora',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          La carta debe adaptarse conforme evoluciona el proceso, siendo una herramienta sumamente dinámica.
        </p>
        <div className="grid gap-2 bg-blue-50 p-4 rounded border border-blue-200">
          <ul className="list-disc list-inside text-blue-900">
            <li>Ajustar frecuencia o tipo de carta según el estado actual.</li>
            <li>Enfocarse en la prevención cuando el proceso alcanza la estabilidad.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'eliminacion',
    label: '14. Sustitución',
    title: 'Eliminación o sustitución de la carta',
    description: 'Transición de una carta de control a otro método de aseguramiento de calidad.',
    diagramType: 'transicion-metodo',
    content: (
      <div className="grid gap-4">
        <p className="text-gray-700 leading-relaxed">
          Cuando la carta cumple su objetivo de llevar el proceso a un estado de control predecible y alta capacidad, puede eliminarse o sustituirse para no mantener herramientas innecesarias.
        </p>
        <h4 className="font-semibold text-gray-800">Alternativas viables:</h4>
        <ul className="grid gap-2 list-disc list-inside text-gray-700">
          <li>Inspección periódica reducida.</li>
          <li>Controles automatizados a prueba de errores (Poka-Yoke).</li>
          <li>Cartas de control más eficientes (ej. paso de X̄-R a Individuales si la variabilidad a corto plazo desaparece).</li>
        </ul>
      </div>
    )
  }
];

// --- Components ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTabId, onTabChange, children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Area */}
      <header className="grid grid-rows-[auto_auto] bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        
        {/* Top Nav & Title */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-4 px-6 py-4 border-b border-gray-100">
          <div className="grid place-items-center w-10 h-10 bg-blue-600 text-white rounded-lg">
            <BarChart2 className="w-6 h-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">{title}</h1>
        </div>

        {/* Tab Navigation (CSS Grid strictly) */}
        <nav className="grid grid-flow-col auto-cols-max overflow-x-auto snap-x snap-mandatory px-4 pt-2 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`grid place-items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors snap-start whitespace-nowrap
                ${activeTabId === tab.id 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid place-items-start p-4 md:p-8 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

const DiagramRender: React.FC<DiagramRenderProps> = ({ type, title, description }) => {
  
  // Renders distinct diagrams based on the active tab type using Recharts or SVG
  const renderDiagramContent = () => {
    switch (type) {
      case 'ciclo-uso':
        return (
          <svg viewBox="0 0 600 150" className="w-full h-full text-sm font-medium">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>
            <g transform="translate(10, 50)">
              <rect x="0" y="0" width="90" height="40" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/>
              <text x="45" y="25" textAnchor="middle" fill="#1e3a8a">Problema</text>
              
              <line x1="90" y1="20" x2="130" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
              
              <rect x="130" y="0" width="110" height="40" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2"/>
              <text x="185" y="25" textAnchor="middle" fill="#14532d">Implementación</text>

              <line x1="240" y1="20" x2="280" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
              
              <rect x="280" y="0" width="90" height="40" rx="4" fill="#fefce8" stroke="#eab308" strokeWidth="2"/>
              <text x="325" y="25" textAnchor="middle" fill="#713f12">Monitoreo</text>

              <line x1="370" y1="20" x2="410" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
              
              <rect x="410" y="0" width="80" height="40" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="2"/>
              <text x="450" y="25" textAnchor="middle" fill="#7f1d1d">Acción</text>

              <line x1="490" y1="20" x2="520" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
              
              <rect x="520" y="0" width="70" height="40" rx="20" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2"/>
              <text x="555" y="25" textAnchor="middle" fill="#4c1d95">Mejora</text>
            </g>
          </svg>
        );

      case 'causa-problema':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full">
            <g transform="translate(50, 20)">
              <circle cx="50" cy="50" r="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
              <text x="50" y="55" textAnchor="middle" fill="#7f1d1d" fontWeight="bold">Causa</text>

              <path d="M 90 50 L 190 50" stroke="#94a3b8" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrow)"/>

              <rect x="200" y="20" width="100" height="60" rx="8" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
              <text x="250" y="55" textAnchor="middle" fill="#7c2d12" fontWeight="bold">Problema</text>

              <path d="M 300 50 L 380 50" stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrow)"/>

              <polygon points="400,10 480,50 400,90" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
              <text x="430" y="55" textAnchor="middle" fill="#0c4a6e" fontSize="12" fontWeight="bold">Carta de</text>
              <text x="430" y="70" textAnchor="middle" fill="#0c4a6e" fontSize="12" fontWeight="bold">Control</text>
            </g>
          </svg>
        );

      case 'tabla-variables':
        const variablesData = [
          { name: 'Grosor', impacto: 5, facilidad: 4, confiabilidad: 5 },
          { name: 'Color', impacto: 3, facilidad: 2, confiabilidad: 3 },
          { name: 'Peso', impacto: 4, facilidad: 5, confiabilidad: 4 },
        ];
        return (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={variablesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} ticks={[1,2,3,4,5]}/>
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="impacto" name="Impacto" fill="#3b82f6" radius={[4,4,0,0]} />
                <Bar dataKey="facilidad" name="Facilidad" fill="#10b981" radius={[4,4,0,0]} />
                <Bar dataKey="confiabilidad" name="Confiabilidad" fill="#8b5cf6" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'arbol-decision':
        return (
          <svg viewBox="0 0 500 250" className="w-full h-full font-sans text-xs">
             <rect x="200" y="10" width="100" height="30" rx="4" fill="#1e293b" />
             <text x="250" y="30" textAnchor="middle" fill="white">Tipo de Dato</text>
             
             <path d="M 250 40 L 250 70 M 250 70 L 100 70 M 250 70 L 400 70 M 100 70 L 100 90 M 400 70 L 400 90 M 250 70 L 250 90" stroke="#64748b" strokeWidth="2" fill="none"/>

             <rect x="40" y="90" width="120" height="30" rx="4" fill="#e2e8f0" stroke="#64748b"/>
             <text x="100" y="110" textAnchor="middle" fill="#1e293b" fontWeight="bold">Variables Continuas</text>

             <rect x="190" y="90" width="120" height="30" rx="4" fill="#e2e8f0" stroke="#64748b"/>
             <text x="250" y="110" textAnchor="middle" fill="#1e293b" fontWeight="bold">Atributos</text>

             <rect x="340" y="90" width="120" height="30" rx="4" fill="#e2e8f0" stroke="#64748b"/>
             <text x="400" y="110" textAnchor="middle" fill="#1e293b" fontWeight="bold">Individuales</text>

             <path d="M 100 120 L 100 160 M 250 120 L 250 160 M 400 120 L 400 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

             <rect x="50" y="160" width="100" height="40" rx="4" fill="#dbeafe" stroke="#3b82f6"/>
             <text x="100" y="178" textAnchor="middle" fill="#1e3a8a">Cartas X̄-R,</text>
             <text x="100" y="192" textAnchor="middle" fill="#1e3a8a">X̄-S</text>

             <rect x="200" y="160" width="100" height="40" rx="4" fill="#dbeafe" stroke="#3b82f6"/>
             <text x="250" y="178" textAnchor="middle" fill="#1e3a8a">Cartas p, np,</text>
             <text x="250" y="192" textAnchor="middle" fill="#1e3a8a">c, u</text>

             <rect x="350" y="160" width="100" height="40" rx="4" fill="#dbeafe" stroke="#3b82f6"/>
             <text x="400" y="185" textAnchor="middle" fill="#1e3a8a">Carta I-MR</text>
          </svg>
        );

      case 'scatter-homogeneidad':
        const scatterData1 = Array.from({length: 20}).map(() => ({ x: Math.random() * 2 + 2, y: Math.random() * 2 + 5, z: 1 }));
        const scatterData2 = Array.from({length: 20}).map(() => ({ x: Math.random() * 8 + 1, y: Math.random() * 8 + 1, z: 1 }));
        return (
          <div className="grid grid-cols-2 gap-4 w-full h-64">
            <div className="grid grid-rows-[auto_1fr] items-center text-center">
              <span className="text-sm font-semibold text-green-700">Homogéneo (Misma máquina)</span>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                  <XAxis type="number" dataKey="x" domain={[0, 10]} tick={false} axisLine={false}/>
                  <YAxis type="number" dataKey="y" domain={[0, 10]} tick={false} axisLine={false}/>
                  <ZAxis type="number" dataKey="z" range={[50, 50]} />
                  <Scatter data={scatterData1} fill="#22c55e" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-rows-[auto_1fr] items-center text-center">
              <span className="text-sm font-semibold text-red-700">Heterogéneo (Varias máquinas)</span>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                  <XAxis type="number" dataKey="x" domain={[0, 10]} tick={false} axisLine={false}/>
                  <YAxis type="number" dataKey="y" domain={[0, 10]} tick={false} axisLine={false}/>
                  <ZAxis type="number" dataKey="z" range={[50, 50]} />
                  <Scatter data={scatterData2} fill="#ef4444" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'timeline-metodos':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full text-xs">
            <text x="10" y="30" fill="#1f2937" fontWeight="bold">Método del Instante</text>
            <line x1="10" y1="60" x2="480" y2="60" stroke="#cbd5e1" strokeWidth="4"/>
            <circle cx="100" cy="60" r="15" fill="#3b82f6" fillOpacity="0.3"/>
            <circle cx="100" cy="60" r="4" fill="#1d4ed8"/>
            <circle cx="250" cy="60" r="15" fill="#3b82f6" fillOpacity="0.3"/>
            <circle cx="250" cy="60" r="4" fill="#1d4ed8"/>
            <circle cx="400" cy="60" r="15" fill="#3b82f6" fillOpacity="0.3"/>
            <circle cx="400" cy="60" r="4" fill="#1d4ed8"/>
            <text x="100" y="90" textAnchor="middle" fill="#64748b">T=1</text>
            <text x="250" y="90" textAnchor="middle" fill="#64748b">T=2</text>
            <text x="400" y="90" textAnchor="middle" fill="#64748b">T=3</text>

            <text x="10" y="130" fill="#1f2937" fontWeight="bold">Método del Periodo</text>
            <line x1="10" y1="160" x2="480" y2="160" stroke="#cbd5e1" strokeWidth="4"/>
            <rect x="50" y="145" width="100" height="30" fill="#22c55e" fillOpacity="0.3" rx="15"/>
            <circle cx="70" cy="160" r="3" fill="#15803d"/>
            <circle cx="100" cy="160" r="3" fill="#15803d"/>
            <circle cx="130" cy="160" r="3" fill="#15803d"/>
            
            <rect x="200" y="145" width="100" height="30" fill="#22c55e" fillOpacity="0.3" rx="15"/>
            <circle cx="220" cy="160" r="3" fill="#15803d"/>
            <circle cx="250" cy="160" r="3" fill="#15803d"/>
            <circle cx="280" cy="160" r="3" fill="#15803d"/>

            <rect x="350" y="145" width="100" height="30" fill="#22c55e" fillOpacity="0.3" rx="15"/>
            <circle cx="370" cy="160" r="3" fill="#15803d"/>
            <circle cx="400" cy="160" r="3" fill="#15803d"/>
            <circle cx="430" cy="160" r="3" fill="#15803d"/>
            <text x="100" y="190" textAnchor="middle" fill="#64748b">Intervalo 1</text>
            <text x="250" y="190" textAnchor="middle" fill="#64748b">Intervalo 2</text>
            <text x="400" y="190" textAnchor="middle" fill="#64748b">Intervalo 3</text>
          </svg>
        );

      case 'line-frecuencia':
        const freqData = [
          { time: '08:00', signal: 0, realShift: 0 },
          { time: '08:30', signal: 0, realShift: 0 },
          { time: '09:00', signal: 0, realShift: 0 },
          { time: '09:30', signal: 5, realShift: 5 }, // Fallo ocurre
          { time: '10:00', signal: 6, realShift: 5 }, // Alta freq lo detecta
          { time: '10:30', signal: 5, realShift: 5 },
          { time: '11:00', signal: 6, realShift: 5 }, 
          { time: '11:30', signal: 5, realShift: 5 },
          { time: '12:00', signal: 5, realShift: 5 }, // Baja freq apenas lo detecta
        ];
        return (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={freqData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis domain={[-2, 10]} hide />
                <RechartsTooltip />
                <Legend />
                <Line type="stepAfter" dataKey="realShift" name="Desviación Real" stroke="#ef4444" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="signal" name="Muestras cada 30 min" stroke="#3b82f6" strokeWidth={2} dot={{r: 4}} />
                {/* Muestras cada 2 hrs (08:00, 10:00, 12:00) simulated by just rendering a few dots */}
                <Line type="monotone" dataKey="signal" name="Muestras cada 2 hrs" stroke="#10b981" strokeWidth={0} activeDot={false} dot={(props) => {
                  const { cx, cy, index } = props;
                  if (index === 0 || index === 4 || index === 8) {
                    return <circle cx={cx} cy={cy} r={6} fill="#10b981" key={index}/>;
                  }
                  return <React.Fragment key={index}></React.Fragment>;
                }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'proceso-medicion':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full text-xs">
            <rect x="50" y="80" width="80" height="40" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
            <text x="90" y="105" textAnchor="middle" fill="#334155">Pieza</text>

            <path d="M 130 100 L 190 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

            <rect x="200" y="60" width="100" height="80" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2"/>
            <text x="250" y="85" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">Instrumento</text>
            <text x="250" y="105" textAnchor="middle" fill="#1e3a8a">Calibrado?</text>
            <text x="250" y="125" textAnchor="middle" fill="#1e3a8a">Resolución?</text>

            <path d="M 300 100 L 360 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

            <rect x="370" y="60" width="100" height="80" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="420" y="85" textAnchor="middle" fill="#92400e" fontWeight="bold">Inspector</text>
            <text x="420" y="105" textAnchor="middle" fill="#92400e">Capacitado?</text>
            <text x="420" y="125" textAnchor="middle" fill="#92400e">Criterio fijo?</text>
          </svg>
        );

      case 'carta-control':
        const controlData = Array.from({length: 25}).map((_, i) => ({
          subgrupo: i + 1,
          valor: (i === 18) ? 14 : (i === 19) ? 15 : 10 + Math.random() * 3 - 1.5, // Puntos fuera de control en 18 y 19
          ucl: 13.5,
          cl: 10,
          lcl: 6.5
        }));
        return (
          <div className="w-full h-64">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={controlData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5}/>
                 <XAxis dataKey="subgrupo" />
                 <YAxis domain={[4, 16]} />
                 <RechartsTooltip />
                 <ReferenceLine y={13.5} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'LCS', fill: '#ef4444', fontSize: 12 }} />
                 <ReferenceLine y={10} stroke="#22c55e" label={{ position: 'right', value: 'LC', fill: '#22c55e', fontSize: 12 }} />
                 <ReferenceLine y={6.5} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'LCI', fill: '#ef4444', fontSize: 12 }} />
                 <Line type="linear" dataKey="valor" stroke="#3b82f6" strokeWidth={2} 
                       dot={(props) => {
                         const { cx, cy, payload, index } = props;
                         const isOut = payload.valor > payload.ucl || payload.valor < payload.lcl;
                         return <circle cx={cx} cy={cy} r={isOut ? 6 : 3} fill={isOut ? '#ef4444' : '#3b82f6'} stroke="white" strokeWidth={1} key={index}/>;
                       }} 
                       activeDot={{ r: 6 }} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        );

      case 'equipo-capacitacion':
        return (
          <div className="grid grid-cols-[auto_1fr] items-center gap-8 h-full py-8 justify-items-center">
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
               <div className="grid place-items-center w-16 h-16 bg-blue-100 rounded-full border-2 border-blue-500">
                  <Users className="text-blue-600 w-8 h-8"/>
               </div>
               <div className="grid place-items-center w-16 h-16 bg-green-100 rounded-full border-2 border-green-500 mt-8">
                  <CheckCircle className="text-green-600 w-8 h-8"/>
               </div>
               <div className="grid place-items-center w-16 h-16 bg-purple-100 rounded-full border-2 border-purple-500 -mt-8">
                  <BarChart2 className="text-purple-600 w-8 h-8"/>
               </div>
               <div className="grid place-items-center w-16 h-16 bg-orange-100 rounded-full border-2 border-orange-500">
                  <Settings className="text-orange-600 w-8 h-8"/>
               </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-gray-100 p-3 rounded-lg border-l-4 border-blue-500">
                <span className="font-semibold text-gray-800">Operadores:</span> <span className="text-sm text-gray-600">Registran e interpretan señales.</span>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg border-l-4 border-green-500">
                <span className="font-semibold text-gray-800">Supervisores:</span> <span className="text-sm text-gray-600">Revisan y facilitan herramientas.</span>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg border-l-4 border-purple-500">
                <span className="font-semibold text-gray-800">Ingeniería:</span> <span className="text-sm text-gray-600">Calcula límites y apoya en análisis profundo.</span>
              </div>
            </div>
          </div>
        );

      case 'flujo-decision':
        return (
           <svg viewBox="0 0 500 150" className="w-full h-full text-xs">
              <rect x="20" y="55" width="100" height="40" rx="20" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
              <text x="70" y="75" textAnchor="middle" fill="#991b1b" fontWeight="bold">Punto fuera</text>
              <text x="70" y="87" textAnchor="middle" fill="#991b1b">de control</text>

              <line x1="120" y1="75" x2="180" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)"/>

              <rect x="190" y="45" width="120" height="60" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
              <text x="250" y="70" textAnchor="middle" fill="#92400e" fontWeight="bold">Análisis</text>
              <text x="250" y="85" textAnchor="middle" fill="#92400e">Buscar Causa</text>
              <text x="250" y="98" textAnchor="middle" fill="#92400e">Especial</text>

              <line x1="310" y1="75" x2="370" y2="75" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)"/>

              <rect x="380" y="55" width="100" height="40" rx="4" fill="#dcfce7" stroke="#22c55e" strokeWidth="2"/>
              <text x="430" y="75" textAnchor="middle" fill="#166534" fontWeight="bold">Acción</text>
              <text x="430" y="87" textAnchor="middle" fill="#166534">Correctiva</text>
           </svg>
        );

      case 'bar-antes-despues':
        const evalData = [
          { name: 'Defectos (%)', antes: 8.5, despues: 2.1 },
          { name: 'Retrabajo (hrs)', antes: 45, despues: 12 },
          { name: 'Var. Proceso', antes: 3.2, despues: 1.1 },
        ];
        return (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evalData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="antes" name="Antes de la Carta" fill="#ef4444" radius={[4,4,0,0]} />
                <Bar dataKey="despues" name="Después de la Carta" fill="#22c55e" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'ciclo-mejora':
        return (
          <div className="grid place-items-center h-full py-6">
             <div className="relative grid place-items-center w-48 h-48 border-4 border-dashed border-blue-300 rounded-full animate-[spin_30s_linear_infinite]">
                <div className="absolute -top-4 bg-white px-2 text-blue-700 font-bold text-sm transform -rotate-0">Planificar</div>
                <div className="absolute -right-6 bg-white px-2 text-green-700 font-bold text-sm transform rotate-90">Hacer</div>
                <div className="absolute -bottom-4 bg-white px-2 text-orange-700 font-bold text-sm transform -rotate-0">Verificar</div>
                <div className="absolute -left-6 bg-white px-2 text-purple-700 font-bold text-sm transform -rotate-90">Actuar</div>
                <RefreshCw className="w-16 h-16 text-gray-300 absolute" />
             </div>
             <div className="mt-8 text-sm text-center text-gray-600 max-w-xs">
                La carta de control es el núcleo de la fase "Verificar" en el ciclo Deming.
             </div>
          </div>
        );

      case 'transicion-metodo':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full text-sm">
             <rect x="50" y="50" width="120" height="80" rx="8" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"/>
             <text x="110" y="85" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">Carta X̄-R</text>
             <text x="110" y="105" textAnchor="middle" fill="#1e3a8a" fontSize="10">(Alta Frecuencia)</text>
             
             <path d="M 180 90 C 230 90, 230 40, 280 40" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrow)"/>
             <path d="M 180 90 C 230 90, 230 140, 280 140" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arrow)"/>

             <rect x="290" y="10" width="150" height="60" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2"/>
             <text x="365" y="35" textAnchor="middle" fill="#065f46" fontWeight="bold">Poka-Yoke</text>
             <text x="365" y="50" textAnchor="middle" fill="#065f46" fontSize="10">Control Automático</text>

             <rect x="290" y="110" width="150" height="60" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2"/>
             <text x="365" y="135" textAnchor="middle" fill="#92400e" fontWeight="bold">Carta de Individuales</text>
             <text x="365" y="150" textAnchor="middle" fill="#92400e" fontSize="10">(Baja Frecuencia)</text>
          </svg>
        );

      default:
        return <div className="p-4 bg-gray-100 rounded text-center">Diagrama no disponible</div>;
    }
  };

  return (
    <div className="grid grid-rows-[auto_auto_1fr] h-full">
      <div className="bg-slate-50 border-b border-gray-200 p-4">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
      <div className="grid place-items-center bg-white p-6 min-h-[300px]">
        {renderDiagramContent()}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(lessonData[0].id);

  const activeTabData = lessonData.find(tab => tab.id === activeTabId) || lessonData[0];

  return (
    <LessonLayout
      title="Implantación de Cartas de Control"
      tabs={lessonData}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
    >
      <Card className="w-full lg:grid-cols-2">
        {/* Panel Izquierdo: Contenido Teórico */}
        <div className="grid content-start p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              {activeTabData.title}
            </h2>
            <div className="text-gray-600">
              {activeTabData.content}
            </div>
          </div>
        </div>

        {/* Panel Derecho: Visualización de Datos */}
        <div className="grid bg-slate-50/50">
          <DiagramRender 
            type={activeTabData.diagramType} 
            title={activeTabData.title}
            description={activeTabData.description}
          />
        </div>
      </Card>
    </LessonLayout>
  );
}