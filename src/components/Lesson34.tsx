import React, { useState } from 'react';
import { BookOpen, AlertTriangle, TrendingUp, BarChart2, Target, Settings, Activity, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const ProcessData = [
  {
    id: 'intro',
    title: 'Introducción al análisis de capacidad de procesos',
    explanation: 'El análisis de capacidad de procesos permite evaluar qué tan bien un proceso cumple con los límites de especificación establecidos. Su objetivo es determinar si un proceso es capaz de producir resultados consistentes dentro de los requisitos definidos.',
    suggestion: 'Un diagrama general del proceso con límites de especificación (LSL y USL) y resultados distribuidos, para mostrar la relación entre desempeño y requisitos.',
  },
  {
    id: 'concepto',
    title: 'Concepto de capacidad de proceso',
    explanation: 'La capacidad de proceso se refiere a la uniformidad de los resultados generados. Un proceso es más capaz cuando presenta menor variabilidad y sus resultados se mantienen dentro de los límites establecidos.',
    suggestion: 'Dos distribuciones comparativas: una estrecha (baja variabilidad) y otra amplia (alta variabilidad), ambas sobre los mismos límites de especificación.',
  },
  {
    id: 'variabilidad',
    title: 'Tipos de variabilidad',
    explanation: 'La variabilidad puede analizarse desde dos perspectivas: en un momento específico (instantánea) o a lo largo del tiempo. Ambas son necesarias para comprender completamente el comportamiento del proceso.',
    suggestion: 'Una gráfica comparativa con una “foto” del proceso en un instante y una serie temporal mostrando cambios a lo largo del tiempo.',
  },
  {
    id: 'normalidad_limites',
    title: 'Distribución normal y límites naturales',
    explanation: 'En muchos casos se asume que los datos siguen una distribución normal. Bajo esta suposición, los límites naturales del proceso se ubican en μ ± 3σ, cubriendo aproximadamente el 99.73% de los datos.',
    suggestion: 'Curva normal con la media al centro y marcas en ±1σ, ±2σ y ±3σ, destacando el rango total.',
  },
  {
    id: 'mejora',
    title: 'Importancia en la mejora continua',
    explanation: 'El análisis de capacidad es clave en metodologías de mejora continua, ya que permite evaluar el desempeño actual, identificar problemas y prever si se cumplirán las especificaciones.',
    suggestion: 'Un ciclo de mejora (como DMAIC) donde la capacidad del proceso aparece como herramienta en la fase de medición y análisis.',
  },
  {
    id: 'histograma',
    title: 'Herramienta: histograma',
    explanation: 'El histograma muestra la distribución de los datos y permite identificar forma, dispersión y tendencia central. Es útil para detectar descentrado o exceso de variabilidad.',
    suggestion: 'Un histograma con límites de especificación superpuestos, mostrando si los datos caen dentro o fuera de ellos.',
  },
  {
    id: 'probabilidad',
    title: 'Herramienta: gráficos de probabilidad',
    explanation: 'Estos gráficos permiten verificar si los datos siguen una distribución específica. Si los puntos se alinean en una recta, la distribución asumida es adecuada.',
    suggestion: 'Un gráfico de probabilidad con puntos alineados y otro con desviaciones visibles para contrastar.',
  },
  {
    id: 'estabilidad',
    title: 'Estabilidad del proceso',
    explanation: 'Antes de calcular la capacidad, es necesario que el proceso esté bajo control estadístico. De lo contrario, los resultados del análisis pueden ser engañosos.',
    suggestion: 'Una gráfica de control con puntos dentro de límites (estable) frente a otra con señales de inestabilidad.',
  },
  {
    id: 'cp_def',
    title: 'Índice Cp: definición',
    explanation: 'El índice Cp mide la capacidad potencial del proceso comparando el rango de especificación con la variabilidad del proceso: Cp = (USL − LSL) / (6σ)',
    suggestion: 'Una representación del ancho del proceso (6σ) dentro del rango de especificación.',
  },
  {
    id: 'cp_interp',
    title: 'Interpretación de Cp',
    explanation: 'Un Cp igual a 1 indica que el proceso apenas cumple especificaciones. Valores mayores a 1 indican mayor capacidad, mientras que valores menores a 1 reflejan incapacidad.',
    suggestion: 'Tres escenarios con Cp < 1, Cp = 1 y Cp > 1, mostrando cómo cambia el ajuste dentro de los límites.',
  },
  {
    id: 'cp_limit',
    title: 'Limitación de Cp',
    explanation: 'Cp no considera la posición del promedio del proceso. Dos procesos con igual Cp pueden tener desempeños distintos si uno está descentrado.',
    suggestion: 'Dos distribuciones con igual ancho pero una centrada y otra desplazada respecto a los límites.',
  },
  {
    id: 'cpk_def',
    title: 'Índice Cpk: concepto',
    explanation: 'Cpk mide la capacidad real del proceso considerando tanto la variabilidad como el centrado. Se calcula tomando la menor distancia entre la media y los límites de especificación.',
    suggestion: 'Una distribución donde se muestra la distancia desde la media hacia cada límite, destacando el menor valor.',
  },
  {
    id: 'cp_vs_cpk',
    title: 'Relación entre Cp y Cpk',
    explanation: 'Si Cp y Cpk son iguales, el proceso está centrado. Si Cpk es menor que Cp, el proceso está descentrado.',
    suggestion: 'Comparación gráfica de un proceso centrado versus uno desplazado con los mismos límites.',
  },
  {
    id: 'supuesto_norm',
    title: 'Supuesto de normalidad',
    explanation: 'Muchos análisis asumen que los datos siguen una distribución normal. Si este supuesto no se cumple, los resultados pueden ser incorrectos o engañosos.',
    suggestion: 'Comparación entre una distribución normal y una no normal (asimétrica o sesgada).',
  },
  {
    id: 'problemas',
    title: 'Problemas comunes en el análisis',
    explanation: 'Errores frecuentes incluyen usar datos inestables, tamaños de muestra pequeños o interpretar incorrectamente los índices.',
    suggestion: 'Lista visual de errores con íconos de advertencia asociados a cada problema.',
  },
  {
    id: 'cpm',
    title: 'Índices avanzados (Cpm)',
    explanation: 'Índices como Cpm consideran la desviación respecto a un valor objetivo, ofreciendo una evaluación más completa del proceso, especialmente cuando está descentrado.',
    suggestion: 'Una distribución donde se muestra tanto el centro del proceso como el valor objetivo, resaltando la diferencia.',
  },
  {
    id: 'inferencia',
    title: 'Inferencia estadística',
    explanation: 'Los índices de capacidad son estimaciones, por lo que se utilizan intervalos de confianza y pruebas de hipótesis para evaluar su precisión y confiabilidad.',
    suggestion: 'Un intervalo representado sobre una línea numérica indicando el rango probable del índice Cp o Cpk.',
  },
  {
    id: 'cierre',
    title: 'Cierre conceptual',
    explanation: 'El análisis de capacidad de procesos integra herramientas gráficas, índices cuantitativos y técnicas estadísticas para evaluar y mejorar la calidad. Su correcta aplicación depende de comprender sus supuestos y limitaciones.',
    suggestion: 'Un esquema integrador que conecte datos, análisis gráfico, índices y toma de decisiones.',
  }
];

// Componente para renderizar el diagrama adecuado según el ID
const DiagramRenderer = ({ id }) => {
  const SvgContainer = ({ children, viewBox = "0 0 300 150" }) => (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-center items-center h-48 md:h-64 shadow-inner">
      <svg viewBox={viewBox} className="w-full h-full drop-shadow-sm font-sans" preserveAspectRatio="xMidYMid meet">
        {children}
      </svg>
    </div>
  );

  switch (id) {
    case 'intro':
      return (
        <SvgContainer>
          {/* LSL & USL */}
          <line x1="60" y1="20" x2="60" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
          <text x="60" y="15" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">LSL</text>
          
          <line x1="240" y1="20" x2="240" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
          <text x="240" y="15" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">USL</text>
          
          {/* Base line */}
          <line x1="20" y1="130" x2="280" y2="130" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Curve */}
          <path d="M 60 130 C 100 130, 120 30, 150 30 C 180 30, 200 130, 240 130" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="3" />
          <line x1="150" y1="30" x2="150" y2="130" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" />
          <text x="150" y="145" textAnchor="middle" fill="#64748b" fontSize="10">Media (μ)</text>
        </SvgContainer>
      );
      
    case 'concepto':
      return (
        <SvgContainer>
          <line x1="50" y1="20" x2="50" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
          <text x="50" y="15" textAnchor="middle" fill="#ef4444" fontSize="10">LSL</text>
          <line x1="250" y1="20" x2="250" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
          <text x="250" y="15" textAnchor="middle" fill="#ef4444" fontSize="10">USL</text>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Alta Variabilidad */}
          <path d="M 30 130 C 80 130, 100 70, 150 70 C 200 70, 220 130, 270 130" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
          <text x="220" y="80" fill="#f59e0b" fontSize="10">Alta Variabilidad</text>

          {/* Baja Variabilidad */}
          <path d="M 90 130 C 120 130, 130 20, 150 20 C 170 20, 180 130, 210 130" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="3" />
          <text x="150" y="45" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">Baja Variabilidad</text>
        </SvgContainer>
      );

    case 'variabilidad':
      return (
        <SvgContainer viewBox="0 0 350 150">
          {/* Instantánea */}
          <text x="75" y="20" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Instantánea ("Foto")</text>
          <line x1="20" y1="120" x2="130" y2="120" stroke="#94a3b8" strokeWidth="1" />
          <path d="M 30 120 C 50 120, 60 40, 75 40 C 90 40, 100 120, 120 120" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
          
          <line x1="160" y1="20" x2="160" y2="130" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2"/>
          
          {/* Serie temporal */}
          <text x="250" y="20" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">A lo largo del tiempo</text>
          <line x1="180" y1="80" x2="330" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          <path d="M 180 80 Q 195 50, 210 90 T 240 70 T 270 110 T 300 60 T 320 80" fill="none" stroke="#8b5cf6" strokeWidth="2" />
          <circle cx="180" cy="80" r="3" fill="#8b5cf6" />
          <circle cx="210" cy="90" r="3" fill="#8b5cf6" />
          <circle cx="240" cy="70" r="3" fill="#8b5cf6" />
          <circle cx="270" cy="110" r="3" fill="#8b5cf6" />
          <circle cx="300" cy="60" r="3" fill="#8b5cf6" />
        </SvgContainer>
      );

    case 'normalidad_limites':
      return (
        <SvgContainer>
          <line x1="20" y1="120" x2="280" y2="120" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 30 120 C 80 120, 110 20, 150 20 C 190 20, 220 120, 270 120" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2" />
          
          <line x1="150" y1="20" x2="150" y2="135" stroke="#334155" strokeWidth="1" />
          <text x="150" y="145" textAnchor="middle" fill="#334155" fontSize="10">μ</text>
          
          {/* +1, +2, +3 Sigma */}
          {[1, 2, 3].map((sigma) => {
            const dx = sigma * 35;
            return (
              <g key={sigma}>
                <line x1={150+dx} y1="70" x2={150+dx} y2="125" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
                <text x={150+dx} y="135" textAnchor="middle" fill="#64748b" fontSize="8">+{sigma}σ</text>
                <line x1={150-dx} y1="70" x2={150-dx} y2="125" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
                <text x={150-dx} y="135" textAnchor="middle" fill="#64748b" fontSize="8">-{sigma}σ</text>
              </g>
            );
          })}
          
          <path d="M 45 15 L 150 15 L 255 15" fill="none" stroke="#10b981" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
          <text x="150" y="10" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">99.73% de los datos (±3σ)</text>
          
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
          </defs>
        </SvgContainer>
      );

    case 'mejora':
      return (
        <SvgContainer viewBox="0 0 350 150">
          {['Definir', 'Medir', 'Analizar', 'Mejorar', 'Controlar'].map((step, i) => (
            <g key={step} transform={`translate(${40 + i * 65}, 70)`}>
              <circle cx="0" cy="0" r="25" fill={i === 1 || i === 2 ? "#3b82f6" : "#e2e8f0"} stroke={i === 1 || i === 2 ? "#2563eb" : "#94a3b8"} strokeWidth="2" />
              <text x="0" y="3" textAnchor="middle" fill={i === 1 || i === 2 ? "#ffffff" : "#475569"} fontSize="8" fontWeight="bold">{step}</text>
              {i < 4 && <path d="M 28 0 L 37 0" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-gray)" />}
            </g>
          ))}
          <rect x="85" y="110" width="105" height="25" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
          <text x="137" y="126" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="bold">Análisis de Capacidad</text>
          <path d="M 137 110 L 137 100" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
          <defs>
             <marker id="arrow-gray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>
        </SvgContainer>
      );

    case 'histograma':
      return (
        <SvgContainer>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#94a3b8" strokeWidth="2" />
          {/* Bars */}
          {[10, 25, 50, 80, 100, 85, 45, 20, 8].map((h, i) => (
            <rect key={i} x={60 + i * 20} y={130 - h} width="18" height={h} fill="#93c5fd" stroke="#2563eb" strokeWidth="1" rx="1" />
          ))}
          
          {/* Curve Overlay */}
          <path d="M 40 130 C 90 130, 110 20, 150 20 C 190 20, 210 130, 260 130" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
          
          {/* LSL USL */}
          <line x1="80" y1="10" x2="80" y2="140" stroke="#ef4444" strokeWidth="2" />
          <text x="80" y="8" textAnchor="middle" fill="#ef4444" fontSize="10">LSL</text>
          
          <line x1="200" y1="10" x2="200" y2="140" stroke="#ef4444" strokeWidth="2" />
          <text x="200" y="8" textAnchor="middle" fill="#ef4444" fontSize="10">USL</text>
       
        </SvgContainer>
      );

    case 'probabilidad':
      return (
        <SvgContainer viewBox="0 0 350 150">
          {/* Graph 1: Aligned */}
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="140" height="110" fill="#ffffff" stroke="#cbd5e1" />
            <line x1="10" y1="100" x2="130" y2="10" stroke="#334155" strokeWidth="1" />
            {[0,1,2,3,4,5,6,7].map(i => (
              <circle key={`g1-${i}`} cx={15 + i*15 + (Math.random()*4-2)} cy={95 - i*11.5 + (Math.random()*4-2)} r="2.5" fill="#3b82f6" />
            ))}
            <text x="70" y="125" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Normal: Adecuada</text>
          </g>
          
          {/* Graph 2: Deviated */}
          <g transform="translate(190, 20)">
            <rect x="0" y="0" width="140" height="110" fill="#ffffff" stroke="#cbd5e1" />
            <line x1="10" y1="100" x2="130" y2="10" stroke="#334155" strokeWidth="1" />
            {/* Curved points */}
            {[0,1,2,3,4,5,6,7].map(i => {
              const x = 15 + i*15;
              const y = 95 - Math.pow(i, 1.8) * 2; 
              return <circle key={`g2-${i}`} cx={x} cy={Math.max(10, y)} r="2.5" fill="#ef4444" />
            })}
            <text x="70" y="125" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">No Normal: Desviación</text>
          </g>
        </SvgContainer>
      );

    case 'estabilidad':
      return (
        <SvgContainer viewBox="0 0 350 150">
          {/* Stable */}
          <g transform="translate(10, 10)">
            <text x="75" y="10" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">Proceso Estable</text>
            <rect x="0" y="20" width="150" height="100" fill="#ffffff" stroke="#cbd5e1" />
            <line x1="0" y1="40" x2="150" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="0" y1="70" x2="150" y2="70" stroke="#10b981" strokeWidth="1" />
            <line x1="0" y1="100" x2="150" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M 10 75 L 30 60 L 50 80 L 70 65 L 90 75 L 110 55 L 130 85 L 140 70" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="30" cy="60" r="2" fill="#3b82f6" />
            <circle cx="70" cy="65" r="2" fill="#3b82f6" />
            <circle cx="110" cy="55" r="2" fill="#3b82f6" />
          </g>

          {/* Unstable */}
          <g transform="translate(180, 10)">
            <text x="75" y="10" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Proceso Inestable</text>
            <rect x="0" y="20" width="150" height="100" fill="#ffffff" stroke="#cbd5e1" />
            <line x1="0" y1="40" x2="150" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="0" y1="70" x2="150" y2="70" stroke="#10b981" strokeWidth="1" />
            <line x1="0" y1="100" x2="150" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M 10 70 L 30 45 L 50 25 L 70 50 L 90 110 L 110 80 L 130 90 L 140 75" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="50" cy="25" r="3" fill="#ef4444" />
            <circle cx="90" cy="110" r="3" fill="#ef4444" />
            <text x="50" y="20" fill="#ef4444" fontSize="8" fontWeight="bold">Causa Asignable</text>
          </g>
        </SvgContainer>
      );

    case 'cp_def':
      return (
        <SvgContainer>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#94a3b8" strokeWidth="2" />
          
          <line x1="60" y1="30" x2="60" y2="140" stroke="#ef4444" strokeWidth="2" />
          <text x="60" y="25" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">LSL</text>
          <line x1="240" y1="30" x2="240" y2="140" stroke="#ef4444" strokeWidth="2" />
          <text x="240" y="25" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">USL</text>
          
          <path d="M 80 130 C 110 130, 120 40, 150 40 C 180 40, 190 130, 220 130" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
          
          {/* Ancho del proceso 6 sigma */}
          <line x1="80" y1="110" x2="220" y2="110" stroke="#10b981" strokeWidth="2" markerStart="url(#arrow-green)" markerEnd="url(#arrow-green)" />
          <line x1="80" y1="105" x2="80" y2="130" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="220" y1="105" x2="220" y2="130" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
          
          <rect x="125" y="98" width="50" height="15" fill="#ffffff" rx="2" />
          <text x="150" y="109" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">6σ (Proceso)</text>

          {/* Tolerancia */}
          <line x1="60" y1="50" x2="240" y2="50" stroke="#ef4444" strokeWidth="2" markerStart="url(#arrow-red)" markerEnd="url(#arrow-red)" />
          <rect x="110" y="42" width="80" height="15" fill="#ffffff" rx="2" />
          <text x="150" y="53" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">Tolerancia (USL - LSL)</text>

          <defs>
             <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
             <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
          </defs>
        </SvgContainer>
      );

    case 'cp_interp':
      return (
        <SvgContainer viewBox="0 0 350 150">
          {/* Cp < 1 */}
          <g transform="translate(10, 30)">
            <text x="50" y="-10" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Cp &lt; 1 (Incapaz)</text>
            <line x1="0" y1="100" x2="100" y2="100" stroke="#94a3b8" />
            <line x1="20" y1="0" x2="20" y2="105" stroke="#ef4444" strokeDasharray="2,2"/>
            <line x1="80" y1="0" x2="80" y2="105" stroke="#ef4444" strokeDasharray="2,2"/>
            <path d="M 5 100 C 20 100, 35 10, 50 10 C 65 10, 80 100, 95 100" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
          </g>
          
          {/* Cp = 1 */}
          <g transform="translate(125, 30)">
            <text x="50" y="-10" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Cp = 1 (Apenas capaz)</text>
            <line x1="0" y1="100" x2="100" y2="100" stroke="#94a3b8" />
            <line x1="20" y1="0" x2="20" y2="105" stroke="#ef4444" strokeDasharray="2,2"/>
            <line x1="80" y1="0" x2="80" y2="105" stroke="#ef4444" strokeDasharray="2,2"/>
            <path d="M 20 100 C 30 100, 40 20, 50 20 C 60 20, 70 100, 80 100" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" />
          </g>
          
          {/* Cp > 1 */}
          <g transform="translate(240, 30)">
            <text x="50" y="-10" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Cp &gt; 1 (Capaz)</text>
            <line x1="0" y1="100" x2="100" y2="100" stroke="#94a3b8" />
            <line x1="20" y1="0" x2="20" y2="105" stroke="#ef4444" strokeDasharray="2,2"/>
            <line x1="80" y1="0" x2="80" y2="105" stroke="#ef4444" strokeDasharray="2,2"/>
            <path d="M 35 100 C 40 100, 45 30, 50 30 C 55 30, 60 100, 65 100" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" />
          </g>
        </SvgContainer>
      );

    case 'cp_limit':
      return (
        <SvgContainer viewBox="0 0 350 150">
          <line x1="175" y1="10" x2="175" y2="140" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Centrado */}
          <g transform="translate(15, 20)">
            <text x="75" y="0" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">Cp=2 (Centrado)</text>
            <line x1="10" y1="100" x2="140" y2="100" stroke="#94a3b8" />
            <line x1="20" y1="10" x2="20" y2="105" stroke="#ef4444" />
            <line x1="130" y1="10" x2="130" y2="105" stroke="#ef4444" />
            <path d="M 60 100 C 65 100, 70 30, 75 30 C 80 30, 85 100, 90 100" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" />
            <circle cx="75" cy="100" r="3" fill="#10b981" />
            <text x="75" y="115" textAnchor="middle" fill="#10b981" fontSize="9">Dentro de LSL/USL</text>
          </g>

          {/* Descentrado */}
          <g transform="translate(195, 20)">
            <text x="75" y="0" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">Cp=2 (Descentrado)</text>
            <line x1="10" y1="100" x2="140" y2="100" stroke="#94a3b8" />
            <line x1="20" y1="10" x2="20" y2="105" stroke="#ef4444" />
            <line x1="100" y1="10" x2="100" y2="105" stroke="#ef4444" /> {/* Modified USL to show shift */}
            <text x="100" y="8" textAnchor="middle" fill="#ef4444" fontSize="8">USL</text>
            <path d="M 90 100 C 95 100, 100 30, 105 30 C 110 30, 115 100, 120 100" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" />
            <circle cx="105" cy="100" r="3" fill="#ef4444" />
            <text x="105" y="115" textAnchor="middle" fill="#ef4444" fontSize="9">Produce defectos</text>
          </g>
        </SvgContainer>
      );

    case 'cpk_def':
      return (
        <SvgContainer>
          <line x1="20" y1="120" x2="280" y2="120" stroke="#94a3b8" strokeWidth="2" />
          
          <line x1="50" y1="30" x2="50" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4"/>
          <text x="50" y="25" textAnchor="middle" fill="#ef4444" fontSize="10">LSL</text>
          <line x1="250" y1="30" x2="250" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4"/>
          <text x="250" y="25" textAnchor="middle" fill="#ef4444" fontSize="10">USL</text>
          
          {/* Distribución descentrada */}
          <path d="M 120 120 C 150 120, 170 30, 190 30 C 210 30, 230 120, 260 120" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
          
          <line x1="190" y1="30" x2="190" y2="120" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2,2"/>
          <text x="190" y="135" textAnchor="middle" fill="#4f46e5" fontSize="10" fontWeight="bold">Media (μ)</text>

          {/* Distancias */}
          <line x1="50" y1="80" x2="190" y2="80" stroke="#94a3b8" strokeWidth="1" markerStart="url(#arrow-gray)" markerEnd="url(#arrow-gray)"/>
          <text x="120" y="75" textAnchor="middle" fill="#64748b" fontSize="8">Distancia Mayor</text>

          <line x1="190" y1="90" x2="250" y2="90" stroke="#f59e0b" strokeWidth="3" markerStart="url(#arrow-orange)" markerEnd="url(#arrow-orange)"/>
          <text x="220" y="105" textAnchor="middle" fill="#d97706" fontSize="10" fontWeight="bold">Menor distancia = Cpk</text>

          <defs>
            <marker id="arrow-orange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
            </marker>
          </defs>
        </SvgContainer>
      );

    case 'cp_vs_cpk':
      return (
        <SvgContainer viewBox="0 0 350 150">
           {/* Centrado */}
           <g transform="translate(15, 20)">
            <text x="75" y="0" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">Centrado</text>
            <text x="75" y="15" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Cp = Cpk</text>
            <line x1="10" y1="100" x2="140" y2="100" stroke="#94a3b8" />
            <line x1="20" y1="30" x2="20" y2="105" stroke="#ef4444" />
            <line x1="130" y1="30" x2="130" y2="105" stroke="#ef4444" />
            <path d="M 45 100 C 55 100, 65 40, 75 40 C 85 40, 95 100, 105 100" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" />
            <line x1="75" y1="40" x2="75" y2="100" stroke="#2563eb" strokeDasharray="2,2"/>
          </g>

          {/* Descentrado */}
          <g transform="translate(195, 20)">
            <text x="75" y="0" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">Descentrado</text>
            <text x="75" y="15" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Cpk &lt; Cp</text>
            <line x1="10" y1="100" x2="140" y2="100" stroke="#94a3b8" />
            <line x1="20" y1="30" x2="20" y2="105" stroke="#ef4444" />
            <line x1="130" y1="30" x2="130" y2="105" stroke="#ef4444" />
            <path d="M 85 100 C 95 100, 105 40, 115 40 C 125 40, 135 100, 145 100" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" />
             <line x1="115" y1="40" x2="115" y2="100" stroke="#d97706" strokeDasharray="2,2"/>
          </g>
        </SvgContainer>
      );

    case 'supuesto_norm':
      return (
        <SvgContainer>
          <line x1="20" y1="120" x2="280" y2="120" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Normal */}
          <path d="M 30 120 C 60 120, 80 40, 110 40 C 140 40, 160 120, 190 120" fill="none" stroke="#10b981" strokeWidth="3" />
          <text x="110" y="30" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Distribución Normal</text>
          
          {/* Sesgada */}
          <path d="M 120 120 C 130 120, 130 50, 150 50 C 190 50, 240 120, 280 120" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="4,4"/>
          <text x="210" y="60" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Distribución Asimétrica</text>
        </SvgContainer>
      );

    case 'problemas':
      return (
        <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-6 flex flex-col justify-center items-center h-48 md:h-64 shadow-inner overflow-hidden">
           <ul className="space-y-4 w-full max-w-sm">
             <li className="flex items-center space-x-3 text-slate-700 bg-white p-2 rounded shadow-sm border-l-4 border-red-500">
               <Activity className="text-red-500 flex-shrink-0" size={24} />
               <span className="text-sm font-medium">Usar datos de un proceso inestable.</span>
             </li>
             <li className="flex items-center space-x-3 text-slate-700 bg-white p-2 rounded shadow-sm border-l-4 border-amber-500">
               <AlertTriangle className="text-amber-500 flex-shrink-0" size={24} />
               <span className="text-sm font-medium">Tamaño de muestra demasiado pequeño.</span>
             </li>
             <li className="flex items-center space-x-3 text-slate-700 bg-white p-2 rounded shadow-sm border-l-4 border-blue-500">
               <HelpCircle className="text-blue-500 flex-shrink-0" size={24} />
               <span className="text-sm font-medium">Ignorar si los datos no son normales.</span>
             </li>
           </ul>
        </div>
      );

    case 'cpm':
      return (
        <SvgContainer>
          <line x1="20" y1="130" x2="280" y2="130" stroke="#94a3b8" strokeWidth="2" />
          
          <path d="M 40 130 C 80 130, 100 40, 130 40 C 160 40, 180 130, 220 130" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2" />
          
          {/* Media */}
          <line x1="130" y1="40" x2="130" y2="130" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,4"/>
          <text x="130" y="30" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Media (μ)</text>
          
          {/* Target */}
          <line x1="180" y1="20" x2="180" y2="130" stroke="#10b981" strokeWidth="2"/>
          <text x="180" y="15" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Objetivo (T)</text>

          {/* Diff */}
          <line x1="130" y1="80" x2="180" y2="80" stroke="#ef4444" strokeWidth="2" markerStart="url(#arrow-red)" markerEnd="url(#arrow-red)"/>
          <text x="155" y="70" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Penalización</text>
        </SvgContainer>
      );

    case 'inferencia':
      return (
        <SvgContainer>
          <text x="150" y="40" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="bold">Intervalo de Confianza (ej. 95%)</text>
          <line x1="30" y1="90" x2="270" y2="90" stroke="#cbd5e1" strokeWidth="2" />
          
          {/* Interval Bracket */}
          <line x1="80" y1="90" x2="220" y2="90" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
          <line x1="80" y1="80" x2="80" y2="100" stroke="#2563eb" strokeWidth="2"/>
          <text x="80" y="115" textAnchor="middle" fill="#2563eb" fontSize="10">Límite Inferior</text>

          <line x1="220" y1="80" x2="220" y2="100" stroke="#2563eb" strokeWidth="2"/>
          <text x="220" y="115" textAnchor="middle" fill="#2563eb" fontSize="10">Límite Superior</text>

          {/* Estimate */}
          <circle cx="150" cy="90" r="5" fill="#f59e0b" />
          <text x="150" y="75" textAnchor="middle" fill="#d97706" fontSize="12" fontWeight="bold">Estimación (Cp)</text>
        </SvgContainer>
      );

    case 'cierre':
      return (
        <SvgContainer viewBox="0 0 350 150">
          <g transform="translate(10, 60)">
            <rect x="0" y="0" width="70" height="30" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
            <text x="35" y="18" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">Datos Brutos</text>
            <path d="M 70 15 L 90 15" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-gray)"/>
          </g>

          <g transform="translate(100, 20)">
            <rect x="0" y="0" width="80" height="30" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
            <text x="40" y="18" textAnchor="middle" fill="#b91c1c" fontSize="9" fontWeight="bold">Gráficos (Hist, Ctrl)</text>
            <path d="M 80 15 L 100 35" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-gray)"/>
          </g>

          <g transform="translate(100, 100)">
            <rect x="0" y="0" width="80" height="30" rx="4" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
            <text x="40" y="18" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="bold">Índices (Cp, Cpk)</text>
            <path d="M 80 15 L 100 -5" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-gray)"/>
          </g>

          <g transform="translate(210, 60)">
            <rect x="0" y="0" width="100" height="30" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="50" y="18" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">Toma de Decisiones</text>
          </g>
        </SvgContainer>
      );

    default:
      return <div className="h-48 flex items-center justify-center text-slate-400">Diagrama no disponible</div>;
  }
};


const App = () => {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 p-4 md:p-8">
      
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-4 shadow-lg">
          <Settings className="text-white" size={32} />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Análisis de Capacidad de Procesos
        </h1>
     
      </header>

      {/* Content Stream */}
      <main className="max-w-4xl mx-auto space-y-8">
        {ProcessData.map((item, index) => (
          <article 
            key={item.id} 
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-6 md:p-8">
              
              <div className="flex items-start md:items-center gap-4 mb-4">
                
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                  {item.title}
                </h2>
              </div>

              <div className="grid gap-8 items-center">
                
                {/* Text Content */}
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-blue-500">
                    <p className="text-slate-700 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                  
                </div>

                {/* Visual Generation  */}
                <div className="w-full">
                  <DiagramRenderer id={item.id} />
                </div>

              </div>
            </div>
          </article>
        ))}
      </main>

  

    </div>
  );
};

export default App;