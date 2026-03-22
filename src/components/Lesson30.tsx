import React, { useState } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  
} from 'recharts';
import { CheckCircle, LayoutGrid, Beaker, BarChart2, Activity, PieChart, Info, BookOpen } from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---

type TabId = 'intro' | 'p' | 'np' | 'c' | 'u' | 'comp';

interface TabDefinition {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- DATOS SIMULADOS PARA GRÁFICOS (MOCK DATA) ---

// Gráfico P: Proporción, n variable (límites variables)
const dataP = [
  { sample: 1, n: 100, defects: 5, p: 0.05, LCL: 0.01, UCL: 0.11, pBar: 0.06 },
  { sample: 2, n: 120, defects: 8, p: 0.066, LCL: 0.015, UCL: 0.105, pBar: 0.06 },
  { sample: 3, n: 80, defects: 6, p: 0.075, LCL: 0.005, UCL: 0.115, pBar: 0.06 },
  { sample: 4, n: 100, defects: 4, p: 0.04, LCL: 0.01, UCL: 0.11, pBar: 0.06 },
  { sample: 5, n: 110, defects: 9, p: 0.081, LCL: 0.012, UCL: 0.108, pBar: 0.06 },
  { sample: 6, n: 90, defects: 3, p: 0.033, LCL: 0.008, UCL: 0.112, pBar: 0.06 },
];

// Gráfico NP: Conteo, n constante (límites constantes)
const dataNP = [
  { sample: 1, np: 12, npBar: 10, LCL: 2, UCL: 18 },
  { sample: 2, np: 8, npBar: 10, LCL: 2, UCL: 18 },
  { sample: 3, np: 15, npBar: 10, LCL: 2, UCL: 18 },
  { sample: 4, np: 9, npBar: 10, LCL: 2, UCL: 18 },
  { sample: 5, np: 11, npBar: 10, LCL: 2, UCL: 18 },
  { sample: 6, np: 5, npBar: 10, LCL: 2, UCL: 18 },
];

// Gráfico C: Conteo, área constante (límites constantes)
const dataC = [
  { sample: 1, c: 4, cBar: 5, LCL: 0, UCL: 11.7 },
  { sample: 2, c: 6, cBar: 5, LCL: 0, UCL: 11.7 },
  { sample: 3, c: 3, cBar: 5, LCL: 0, UCL: 11.7 },
  { sample: 4, c: 8, cBar: 5, LCL: 0, UCL: 11.7 },
  { sample: 5, c: 5, cBar: 5, LCL: 0, UCL: 11.7 },
  { sample: 6, c: 2, cBar: 5, LCL: 0, UCL: 11.7 },
];

// Gráfico U: Defectos/unidad, tamaño variable (límites variables)
const dataU = [
  { sample: 1, n: 2, c: 6, u: 3.0, uBar: 2.5, LCL: 0, UCL: 5.8 },
  { sample: 2, n: 3, c: 5, u: 1.6, uBar: 2.5, LCL: 0.5, UCL: 4.5 },
  { sample: 3, n: 1.5, c: 4, u: 2.6, uBar: 2.5, LCL: 0, UCL: 6.3 },
  { sample: 4, n: 2.5, c: 7, u: 2.8, uBar: 2.5, LCL: 0.2, UCL: 4.8 },
  { sample: 5, n: 2, c: 3, u: 1.5, uBar: 2.5, LCL: 0, UCL: 5.8 },
  { sample: 6, n: 4, c: 9, u: 2.25, uBar: 2.5, LCL: 0.8, UCL: 4.2 },
];

// --- COMPONENTES BASE (SISTEMA DE DISEÑO BASADO EN GRID) ---

const Card: React.FC<ComponentProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const FormulaBlock: React.FC<{ formula: string; label?: string }> = ({ formula, label }) => (
  <div className="grid grid-rows-[auto_1fr] gap-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
    {label && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>}
    <code className="text-sm font-mono text-blue-800 break-words whitespace-pre-wrap">{formula}</code>
  </div>
);

const LessonLayout: React.FC<{
  title: string;
  tabs: TabDefinition[];
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  children: React.ReactNode;
}> = ({ title, tabs, activeTab, onTabChange, children }) => {
  return (
    // Grid principal: Cabecera, Navegación, Área de Contenido
    <div className="grid grid-rows-[auto_auto_1fr] h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      
      {/* Header */}
      <header className="grid grid-cols-[auto_1fr] items-center gap-4 bg-blue-900 text-white p-4 shadow-md z-10">
        <div className="grid place-items-center bg-blue-800 p-2 rounded-lg">
          <Activity size={24} className="text-blue-200" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      </header>

      {/* Tabs Navigation (Strict Grid) */}
      <nav className="grid border-b border-slate-300 bg-white overflow-x-auto shadow-sm z-0">
        <div className="grid grid-flow-col auto-cols-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`grid grid-cols-[auto_1fr] items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 outline-none
                ${activeTab === tab.id 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="grid overflow-y-auto p-4 md:p-8">
        <div className="grid max-w-7xl mx-auto w-full gap-6">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- COMPONENTES DE VISUALIZACIÓN (DIAGRAM RENDERS) ---

const FlowDecisionTree = () => (
  <div className="grid grid-rows-[auto_1fr_auto] gap-6 p-6 h-full text-sm text-center">
    <div className="grid place-items-center">
      <div className="bg-blue-100 border-2 border-blue-400 p-3 rounded-lg font-bold shadow-sm">
        ¿Qué estamos evaluando?
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 relative before:absolute before:content-[''] before:border-t-2 before:border-slate-300 before:w-1/2 before:left-1/4 before:top-[-12px]">
      <div className="grid grid-rows-[auto_1fr] gap-4 relative before:absolute before:content-[''] before:border-l-2 before:border-slate-300 before:h-4 before:left-1/2 before:top-[-24px]">
        <div className="grid place-items-center">
          <div className="bg-emerald-100 border-2 border-emerald-400 p-2 rounded-lg font-semibold w-full">
            Proporción / Conteo (Defectuosos)
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 relative before:absolute before:content-[''] before:border-t-2 before:border-slate-300 before:w-1/2 before:left-1/4 before:top-[-12px]">
             <div className="grid place-items-center grid-rows-[auto_auto] gap-2 relative before:absolute before:content-[''] before:border-l-2 before:border-slate-300 before:h-4 before:left-1/2 before:top-[-20px]">
                <span className="text-xs text-slate-500 font-medium">Tamaño Variable</span>
                <div className="bg-white border-2 border-slate-800 p-3 rounded-md font-bold text-lg text-blue-600 shadow-md">Gráfico p</div>
             </div>
             <div className="grid place-items-center grid-rows-[auto_auto] gap-2 relative before:absolute before:content-[''] before:border-l-2 before:border-slate-300 before:h-4 before:left-1/2 before:top-[-20px]">
                <span className="text-xs text-slate-500 font-medium">Tamaño Constante</span>
                <div className="bg-white border-2 border-slate-800 p-3 rounded-md font-bold text-lg text-emerald-600 shadow-md">Gráfico np</div>
             </div>
        </div>
      </div>

      <div className="grid grid-rows-[auto_1fr] gap-4 relative before:absolute before:content-[''] before:border-l-2 before:border-slate-300 before:h-4 before:left-1/2 before:top-[-24px]">
         <div className="grid place-items-center">
          <div className="bg-amber-100 border-2 border-amber-400 p-2 rounded-lg font-semibold w-full">
            Número de Defectos (por unidad)
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 relative before:absolute before:content-[''] before:border-t-2 before:border-slate-300 before:w-1/2 before:left-1/4 before:top-[-12px]">
             <div className="grid place-items-center grid-rows-[auto_auto] gap-2 relative before:absolute before:content-[''] before:border-l-2 before:border-slate-300 before:h-4 before:left-1/2 before:top-[-20px]">
                <span className="text-xs text-slate-500 font-medium">Área Constante</span>
                <div className="bg-white border-2 border-slate-800 p-3 rounded-md font-bold text-lg text-amber-600 shadow-md">Gráfico c</div>
             </div>
             <div className="grid place-items-center grid-rows-[auto_auto] gap-2 relative before:absolute before:content-[''] before:border-l-2 before:border-slate-300 before:h-4 before:left-1/2 before:top-[-20px]">
                <span className="text-xs text-slate-500 font-medium">Área Variable</span>
                <div className="bg-white border-2 border-slate-800 p-3 rounded-md font-bold text-lg text-purple-600 shadow-md">Gráfico u</div>
             </div>
        </div>
      </div>
    </div>
  </div>
);

// --- CONTENIDO DE LAS PESTAÑAS ---

const IntroTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
    <Card className="p-6 grid gap-4 content-start">
      <div className="grid gap-1">
        <h2 className="text-2xl font-bold text-slate-800">Datos por Atributo</h2>
        <p className="text-slate-500">Fundamentos teóricos de los diagramas de control.</p>
      </div>
      <div className="grid gap-4 text-slate-700 leading-relaxed">
        <p>
          Los datos por atributo clasifican las unidades como <strong>conformes</strong> o <strong>no conformes</strong>, o cuentan el <strong>número de defectos</strong>. A diferencia de las variables continuas (como longitud o peso), los atributos manejan frecuencias o conteos discretos.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="grid grid-rows-[auto_1fr] gap-2 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
             <div className="grid grid-cols-[auto_1fr] gap-2 items-center text-emerald-800 font-semibold">
               <CheckCircle size={18} /> Ejemplos de Clasificación
             </div>
             <ul className="list-disc list-inside text-sm text-emerald-700 grid gap-1">
               <li>Pieza defectuosa / aceptable</li>
               <li>Foco enciende / no enciende</li>
             </ul>
          </div>
          <div className="grid grid-rows-[auto_1fr] gap-2 bg-amber-50 p-4 rounded-lg border border-amber-100">
             <div className="grid grid-cols-[auto_1fr] gap-2 items-center text-amber-800 font-semibold">
               <Info size={18} /> Ejemplos de Conteo
             </div>
             <ul className="list-disc list-inside text-sm text-amber-700 grid gap-1">
               <li>Errores en un documento</li>
               <li>Rayones en una superficie</li>
             </ul>
          </div>
        </div>
      </div>
    </Card>

    <Card className="grid grid-rows-[auto_1fr] h-full min-h-[400px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800 text-lg">Árbol de Decisión: Selección de Diagrama</h3>
        <p className="text-sm text-slate-500">¿Qué diagrama utilizar según la naturaleza de los datos?</p>
      </div>
      <div className="grid place-items-center bg-white">
        <FlowDecisionTree />
      </div>
    </Card>
  </div>
);

const PChartTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
    <Card className="lg:col-span-1 p-6 grid gap-6 content-start">
      <div className="grid gap-1">
        <h2 className="text-2xl font-bold text-slate-800">Gráfico p</h2>
        <p className="text-slate-500">Proporción defectuosa</p>
      </div>
      
      <div className="grid gap-4 text-slate-700 text-sm">
        <p>El gráfico <strong>p</strong> mide la proporción de unidades defectuosas en una muestra. Es excepcionalmente útil cuando el tamaño de muestra (<code className="bg-slate-100 px-1 rounded">n</code>) varía entre mediciones.</p>
        
        <div className="grid gap-3 mt-2">
          <FormulaBlock 
            label="1. Proporción por muestra" 
            formula="p_i = d_i / n_i" 
          />
          <FormulaBlock 
            label="2. Proporción promedio (Línea Central)" 
            formula="p̄ = Σ d_i / Σ n_i" 
          />
          <FormulaBlock 
            label="3. Límites de Control (Varían según n_i)" 
            formula={`LCS = p̄ + 3 * √[ (p̄ * (1 - p̄)) / n_i ]\nLCI = p̄ - 3 * √[ (p̄ * (1 - p̄)) / n_i ]`} 
          />
        </div>
      </div>
    </Card>

    <Card className="lg:col-span-2 grid grid-rows-[auto_1fr] h-full min-h-[450px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800 text-lg">Visualización Gráfico p</h3>
        <p className="text-sm text-slate-500">Nota cómo los límites (LCS/LCI) se ajustan dinámicamente debido al tamaño de muestra variable.</p>
      </div>
      <div className="p-6 bg-white w-full h-full min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dataP} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="sample" label={{ value: 'Número de Muestra', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Proporción (p)', angle: -90, position: 'insideLeft' }} domain={[0, 'dataMax + 0.05']} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend verticalAlign="top" height={36}/>
            <Line type="stepAfter" dataKey="UCL" stroke="#ef4444" strokeWidth={2} dot={false} name="Límite Sup. (LCS)" strokeDasharray="5 5" />
            <Line type="stepAfter" dataKey="LCL" stroke="#ef4444" strokeWidth={2} dot={false} name="Límite Inf. (LCI)" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="pBar" stroke="#10b981" strokeWidth={2} dot={false} name="Promedio (p̄)" />
            <Line type="monotone" dataKey="p" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, strokeWidth: 2 }} activeDot={{ r: 8 }} name="Proporción (p_i)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

const NPChartTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
    <Card className="lg:col-span-1 p-6 grid gap-6 content-start">
      <div className="grid gap-1">
        <h2 className="text-2xl font-bold text-slate-800">Gráfico np</h2>
        <p className="text-slate-500">Número de defectuosos</p>
      </div>
      
      <div className="grid gap-4 text-slate-700 text-sm">
        <p>Muestra el conteo absoluto de unidades defectuosas en cada muestra. <strong>Requiere estrictamente un tamaño de muestra constante</strong> (<code className="bg-slate-100 px-1 rounded">n</code>) para todas las observaciones.</p>
        
        <div className="grid gap-3 mt-2">
          <FormulaBlock 
            label="1. Conteo Central" 
            formula="np = Número de defectuosos observados\nLínea Central = n * p̄" 
          />
          <FormulaBlock 
            label="2. Límites de Control (Constantes)" 
            formula={`LCS = np̄ + 3 * √[ np̄ * (1 - p̄) ]\nLCI = np̄ - 3 * √[ np̄ * (1 - p̄) ]`} 
          />
        </div>
      </div>
    </Card>

    <Card className="lg:col-span-2 grid grid-rows-[auto_1fr] h-full min-h-[450px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800 text-lg">Visualización Gráfico np</h3>
        <p className="text-sm text-slate-500">Al ser el tamaño de muestra fijo, los límites de control se mantienen horizontales y constantes.</p>
      </div>
      <div className="p-6 bg-white w-full h-full min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dataNP} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="sample" label={{ value: 'Número de Muestra (n constante)', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Cantidad Defectuosos (np)', angle: -90, position: 'insideLeft' }} domain={[0, 25]} />
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
            <Legend verticalAlign="top" height={36}/>
            <Line type="monotone" dataKey="UCL" stroke="#ef4444" strokeWidth={2} dot={false} name="LCS" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="LCL" stroke="#ef4444" strokeWidth={2} dot={false} name="LCI" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="npBar" stroke="#10b981" strokeWidth={2} dot={false} name="Promedio" />
            <Bar dataKey="np" fill="#10b981" barSize={30} radius={[4, 4, 0, 0]} name="Defectuosos (np)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

const CChartTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
    <Card className="lg:col-span-1 p-6 grid gap-6 content-start">
      <div className="grid gap-1">
        <h2 className="text-2xl font-bold text-slate-800">Gráfico c</h2>
        <p className="text-slate-500">Número total de defectos</p>
      </div>
      
      <div className="grid gap-4 text-slate-700 text-sm">
        <p>Mide el número total de defectos encontrados en una <strong>unidad de inspección o área constante</strong>. Ejemplo clásico: número de errores tipográficos en una página completa o soldaduras defectuosas en un chasis específico.</p>
        
        <div className="grid gap-3 mt-2">
          <FormulaBlock 
            label="1. Línea Central" 
            formula="c̄ = Promedio de defectos por unidad\nc̄ = Σ c_i / k  (donde k = num. de unidades)" 
          />
          <FormulaBlock 
            label="2. Límites de Control" 
            formula={`LCS = c̄ + 3 * √c̄\nLCI = c̄ - 3 * √c̄`} 
          />
        </div>
      </div>
    </Card>

    <Card className="lg:col-span-2 grid grid-rows-[auto_1fr] h-full min-h-[450px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800 text-lg">Visualización Gráfico c</h3>
        <p className="text-sm text-slate-500">Muestra la ocurrencia de defectos individuales sobre una base de evaluación constante.</p>
      </div>
      <div className="p-6 bg-white w-full h-full min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dataC} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="sample" label={{ value: 'Unidad Inspeccionada', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Conteo de Defectos (c)', angle: -90, position: 'insideLeft' }} domain={[0, 15]} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Legend verticalAlign="top" height={36}/>
            <Line type="monotone" dataKey="UCL" stroke="#ef4444" strokeWidth={2} dot={false} name="LCS" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="LCL" stroke="#ef4444" strokeWidth={2} dot={false} name="LCI" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="cBar" stroke="#10b981" strokeWidth={2} dot={false} name="Promedio (c̄)" />
            <Line type="monotone" dataKey="c" stroke="#f59e0b" strokeWidth={3} dot={{ r: 6, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} name="Defectos (c_i)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

const UChartTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
    <Card className="lg:col-span-1 p-6 grid gap-6 content-start">
      <div className="grid gap-1">
        <h2 className="text-2xl font-bold text-slate-800">Gráfico u</h2>
        <p className="text-slate-500">Defectos por unidad estandarizada</p>
      </div>
      
      <div className="grid gap-4 text-slate-700 text-sm">
        <p>Mide el número de defectos <strong>normalizados</strong> por unidad, utilizado cuando el tamaño de la muestra o el área de inspección <strong>varía</strong> de una medición a otra.</p>
        
        <div className="grid gap-3 mt-2">
          <FormulaBlock 
            label="1. Tasa de defectos (u_i)" 
            formula="u_i = c_i / n_i" 
          />
          <FormulaBlock 
            label="2. Promedio ponderado" 
            formula="ū = Σ c_i / Σ n_i" 
          />
          <FormulaBlock 
            label="3. Límites de Control (Varían)" 
            formula={`LCS = ū + 3 * √[ ū / n_i ]\nLCI = ū - 3 * √[ ū / n_i ]`} 
          />
        </div>
      </div>
    </Card>

    <Card className="lg:col-span-2 grid grid-rows-[auto_1fr] h-full min-h-[450px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800 text-lg">Visualización Gráfico u</h3>
        <p className="text-sm text-slate-500">Límites escalonados que reflejan el cambio en el tamaño del área de inspección para cada punto.</p>
      </div>
      <div className="p-6 bg-white w-full h-full min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dataU} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="sample" label={{ value: 'Muestra (Área n_i variable)', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Tasa Defectos (u)', angle: -90, position: 'insideLeft' }} domain={[0, 8]} />
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Legend verticalAlign="top" height={36}/>
            <Line type="stepAfter" dataKey="UCL" stroke="#ef4444" strokeWidth={2} dot={false} name="LCS variable" strokeDasharray="5 5" />
            <Line type="stepAfter" dataKey="LCL" stroke="#ef4444" strokeWidth={2} dot={false} name="LCI variable" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uBar" stroke="#10b981" strokeWidth={2} dot={false} name="Promedio (ū)" />
            <Line type="monotone" dataKey="u" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} name="Tasa (u_i)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

const ComparisonTab = () => (
  <div className="grid gap-6">
    <Card className="p-6">
      <div className="grid gap-4">
         <h2 className="text-2xl font-bold text-slate-800 grid grid-cols-[auto_1fr] gap-3 items-center">
            <BookOpen className="text-blue-600" />
            Tabla Comparativa de Selección
         </h2>
         <p className="text-slate-600">
           Resumen ejecutivo para seleccionar rápidamente el diagrama estadístico adecuado basado en la naturaleza del atributo examinado.
         </p>
      </div>
    </Card>

    <Card className="overflow-x-auto">
      {/* Construcción de tabla utilizando estrictamente CSS Grid */}
      <div className="grid min-w-[800px] grid-cols-[1fr_2fr_1.5fr_1.5fr_2fr] bg-white text-sm">
        {/* Table Header */}
        <div className="grid col-span-5 grid-cols-subgrid bg-slate-100 border-b border-slate-300 font-bold text-slate-700 uppercase tracking-wider text-xs">
          <div className="p-4">Gráfico</div>
          <div className="p-4 border-l border-slate-200">Tipo de Dato</div>
          <div className="p-4 border-l border-slate-200">Tamaño de Muestra (n)</div>
          <div className="p-4 border-l border-slate-200">Unidad de Medida</div>
          <div className="p-4 border-l border-slate-200">Caso de Uso Típico</div>
        </div>
        
        {/* Table Rows */}
        <div className="grid col-span-5 grid-cols-subgrid border-b border-slate-100 hover:bg-slate-50 transition-colors">
          <div className="p-4 font-bold text-blue-600 grid items-center">Gráfico p</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-slate-700">Proporción de unidades defectuosas sobre el total inspeccionado.</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-amber-600 font-medium bg-amber-50/30">Variable (o constante)</div>
          <div className="p-4 border-l border-slate-100 grid items-center font-mono text-slate-500">p = d / n</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-slate-600">Porcentaje de envíos rechazados mensualmente (diferente volumen por mes).</div>
        </div>

        <div className="grid col-span-5 grid-cols-subgrid border-b border-slate-100 hover:bg-slate-50 transition-colors">
          <div className="p-4 font-bold text-emerald-600 grid items-center">Gráfico np</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-slate-700">Número absoluto de unidades defectuosas.</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-emerald-600 font-medium bg-emerald-50/30">Estrictamente Constante</div>
          <div className="p-4 border-l border-slate-100 grid items-center font-mono text-slate-500">Conteo directo</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-slate-600">Revisión de lotes exactos de 100 piezas al final de la línea.</div>
        </div>

        <div className="grid col-span-5 grid-cols-subgrid border-b border-slate-100 hover:bg-slate-50 transition-colors">
          <div className="p-4 font-bold text-amber-600 grid items-center">Gráfico c</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-slate-700">Número total de defectos en una unidad.</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-emerald-600 font-medium bg-emerald-50/30">Área/Unidad Constante</div>
          <div className="p-4 border-l border-slate-100 grid items-center font-mono text-slate-500">Conteo directo (c)</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-slate-600">Errores encontrados por cada 100 metros exactos de tela.</div>
        </div>

        <div className="grid col-span-5 grid-cols-subgrid hover:bg-slate-50 transition-colors">
          <div className="p-4 font-bold text-purple-600 grid items-center">Gráfico u</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-slate-700">Tasa de defectos (defectos por unidad base).</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-amber-600 font-medium bg-amber-50/30">Variable (Área/tamaño)</div>
          <div className="p-4 border-l border-slate-100 grid items-center font-mono text-slate-500">u = c / n</div>
          <div className="p-4 border-l border-slate-100 grid items-center text-slate-600">Errores reportados por módulo de software (módulos de distinto tamaño).</div>
        </div>
      </div>
    </Card>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('intro');

  const tabs: TabDefinition[] = [
    { id: 'intro', label: 'Introducción', icon: <LayoutGrid size={18} /> },
    { id: 'p', label: 'Gráfico p', icon: <PieChart size={18} /> },
    { id: 'np', label: 'Gráfico np', icon: <BarChart2 size={18} /> },
    { id: 'c', label: 'Gráfico c', icon: <Beaker size={18} /> },
    { id: 'u', label: 'Gráfico u', icon: <Activity size={18} /> },
    { id: 'comp', label: 'Comparación', icon: <LayoutGrid size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'intro': return <IntroTab />;
      case 'p': return <PChartTab />;
      case 'np': return <NPChartTab />;
      case 'c': return <CChartTab />;
      case 'u': return <UChartTab />;
      case 'comp': return <ComparisonTab />;
      default: return null;
    }
  };

  return (
    <LessonLayout
      title="Control Estadístico: Diagramas por Atributos"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </LessonLayout>
  );
}