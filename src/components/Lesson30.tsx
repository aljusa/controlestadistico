import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend
} from 'recharts';

// --- Types & Interfaces ---

interface SectionData {
  id: string;
  tabLabel: string;
  title: string;
  description: React.ReactNode;
  visual: React.FC;
}

interface LayoutProps {
  children: React.ReactNode;
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// --- Mock Data for Charts ---

const generateChartData = (type: 'p' | 'np' | 'c' | 'u') => {
  const data = [];
  const points = 15;
  for (let i = 1; i <= points; i++) {
    let value = 0;
    let ucl = 0;
    let lcl = 0;
    let mean = 0;

    switch (type) {
      case 'p':
        mean = 0.05;
        value = Math.max(0, mean + (Math.random() * 0.08 - 0.04));
        ucl = 0.12;
        lcl = 0;
        break;
      case 'np':
        mean = 5;
        value = Math.round(Math.max(0, mean + (Math.random() * 8 - 4)));
        ucl = 12;
        lcl = 0;
        break;
      case 'c':
        mean = 8;
        value = Math.round(Math.max(0, mean + (Math.random() * 10 - 5)));
        ucl = 16;
        lcl = 0;
        break;
      case 'u':
        mean = 1.2;
        value = Math.max(0, mean + (Math.random() * 1.5 - 0.7));
        ucl = 2.5;
        lcl = 0;
        break;
    }
    data.push({ sample: `M${i}`, value, ucl, lcl, mean });
  }
  return data;
};

// --- Generic Chart Component ---

const ControlChartVisual = ({ type, dataKeyName, yAxisDomain }: { type: 'p'|'np'|'c'|'u', dataKeyName: string, yAxisDomain?: [number|string, number|string] }) => {
  const data = generateChartData(type);
  const mean = data[0].mean;
  const ucl = data[0].ucl;
  const lcl = data[0].lcl;

  return (
    <div className="h-64 w-full grid">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="sample" stroke="#6b7280" fontSize={12} />
          <YAxis domain={yAxisDomain || ['auto', 'auto']} stroke="#6b7280" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', color: '#f9fafb', border: 'none', borderRadius: '8px' }}
            itemStyle={{ color: '#60a5fa' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <ReferenceLine y={ucl} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'LSC', fill: '#ef4444', fontSize: 12 }} />
          <ReferenceLine y={mean} stroke="#22c55e" label={{ position: 'top', value: 'Límite Central', fill: '#22c55e', fontSize: 12 }} />
          <ReferenceLine y={lcl} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'bottom', value: 'LIC', fill: '#ef4444', fontSize: 12 }} />
          <Line type="monotone" dataKey="value" name={dataKeyName} stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Specific Visual Components ---

const IntroVisual = () => (
  <div className="grid grid-cols-2 gap-6 h-full p-4">
    <div className="grid grid-rows-[auto_1fr] gap-4 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
      <h4 className="font-semibold text-blue-800 text-lg">Datos Variables (Continuos)</h4>
      <div className="grid place-items-center">
        <div className="text-4xl">📏</div>
        <p className="text-sm text-blue-600 mt-2">Mediciones precisas: Longitud, Peso, Temperatura (ej. 15.4 mm)</p>
      </div>
    </div>
    <div className="grid grid-rows-[auto_1fr] gap-4 bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
      <h4 className="font-semibold text-emerald-800 text-lg">Datos por Atributo (Discretos)</h4>
      <div className="grid place-items-center">
        <div className="text-4xl">✅ ❌</div>
        <p className="text-sm text-emerald-600 mt-2">Clasificaciones o conteos: Pasa/No pasa, Nº de defectos (ej. 3 rasguños)</p>
      </div>
    </div>
  </div>
);

const DataNatureVisual = () => (
  <div className="grid grid-rows-[auto_1fr] gap-8 h-full place-items-center p-4">
    <div className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md z-10">Datos por Atributo</div>
    <div className="grid grid-cols-2 gap-16 w-full max-w-2xl relative">
      {/* Conector usando grid/borders en lugar de absolute positioning pesado */}
      <div className="absolute top-[-2rem] left-1/4 right-1/4 h-8 border-t-2 border-l-2 border-r-2 border-slate-300 rounded-t-xl z-0"></div>
      
      <div className="grid grid-rows-[auto_1fr] gap-2 bg-white border-2 border-slate-200 rounded-xl p-5 text-center shadow-sm z-10">
        <h4 className="font-bold text-slate-700">Binario (Clasificación)</h4>
        <p className="text-sm text-slate-500">Unidad evaluada como un todo.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-2xl">
          <div className="bg-green-100 text-green-700 rounded p-2">👍 Aceptado</div>
          <div className="bg-red-100 text-red-700 rounded p-2">👎 Rechazado</div>
        </div>
      </div>
      
      <div className="grid grid-rows-[auto_1fr] gap-2 bg-white border-2 border-slate-200 rounded-xl p-5 text-center shadow-sm z-10">
        <h4 className="font-bold text-slate-700">Conteo (Defectos)</h4>
        <p className="text-sm text-slate-500">Múltiples fallas en una unidad.</p>
        <div className="mt-4 grid gap-2 font-mono text-lg font-bold text-slate-600 bg-slate-50 py-3 rounded">
          0, 1, 2, 3, 4 ... defectos
        </div>
      </div>
    </div>
  </div>
);

const ProcessFlowVisual = () => (
  <div className="grid grid-cols-5 gap-2 h-full place-items-center text-center text-sm p-4">
    <div className="bg-blue-100 border border-blue-300 p-3 rounded shadow-sm w-full">1. Recolectar muestras</div>
    <div className="text-blue-400 font-bold text-2xl">→</div>
    <div className="bg-blue-100 border border-blue-300 p-3 rounded shadow-sm w-full">2. Calcular <i>p</i> muestra</div>
    <div className="text-blue-400 font-bold text-2xl">→</div>
    <div className="grid gap-2 w-full">
      <div className="bg-emerald-100 border border-emerald-300 p-3 rounded shadow-sm">3. Promedio (p̄)</div>
      <div className="bg-amber-100 border border-amber-300 p-3 rounded shadow-sm">4. Límites (LSC/LIC)</div>
      <div className="bg-purple-100 border border-purple-300 p-3 rounded shadow-sm">5. Graficar</div>
    </div>
  </div>
);

const ConstructionPVisual = () => (
  <div className="grid grid-cols-2 gap-6 h-full p-4">
    <div className="grid gap-4 content-start">
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-semibold text-slate-700 mb-2">1. Proporción muestra (p):</p>
        <div className="bg-white p-2 text-center rounded border font-mono text-lg">p = d / n</div>
        <p className="text-xs text-slate-500 mt-1 text-center">d = defectuosos, n = tamaño muestra</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-semibold text-slate-700 mb-2">2. Proporción promedio (p̄):</p>
        <div className="bg-white p-2 text-center rounded border font-mono text-lg">p̄ = Σd / Σn</div>
      </div>
    </div>
    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 grid gap-4 content-center">
      <p className="font-semibold text-blue-800 text-center">3. Límites de Control</p>
      <div className="grid gap-3 font-mono text-sm bg-white p-4 rounded shadow-sm">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <span className="font-bold text-red-600">LSC =</span>
          <span>p̄ + 3 * √[ p̄(1-p̄) / n ]</span>
        </div>
        <div className="h-px bg-slate-200 w-full"></div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <span className="font-bold text-red-600">LIC =</span>
          <span>p̄ - 3 * √[ p̄(1-p̄) / n ]</span>
        </div>
      </div>
      <p className="text-xs text-blue-600 text-center italic">Nota: 'n' puede variar por muestra.</p>
    </div>
  </div>
);

const ConstructionNPVisual = () => (
  <div className="grid grid-cols-2 gap-6 h-full p-4">
     <div className="grid gap-4 content-start">
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 shadow-sm">
        <h4 className="font-bold text-amber-800 mb-2 text-center">⚠️ Condición Crítica</h4>
        <p className="text-amber-700 text-center">El tamaño de la muestra (n) <strong>DEBE SER CONSTANTE</strong> para todas las observaciones.</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-semibold text-slate-700 mb-2">1. Promedio Defectuosos (np̄):</p>
        <div className="bg-white p-2 text-center rounded border font-mono text-lg">np̄ = n * p̄</div>
      </div>
    </div>
    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-200 grid gap-4 content-center">
      <p className="font-semibold text-indigo-800 text-center">2. Límites de Control</p>
      <div className="grid gap-3 font-mono text-sm bg-white p-4 rounded shadow-sm">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <span className="font-bold text-red-600">LSC =</span>
          <span>np̄ + 3 * √[ np̄(1-p̄) ]</span>
        </div>
        <div className="h-px bg-slate-200 w-full"></div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <span className="font-bold text-red-600">LIC =</span>
          <span>np̄ - 3 * √[ np̄(1-p̄) ]</span>
        </div>
      </div>
      <p className="text-xs text-indigo-600 text-center italic">Cálculo más simple al no dividir por 'n' variante.</p>
    </div>
  </div>
);

const ComparePNPVisual = () => (
  <div className="grid h-full p-4 place-items-center">
    <div className="grid grid-cols-3 gap-0 w-full max-w-3xl border rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-slate-800 text-white font-bold p-3 grid place-items-center border-b border-r border-slate-700">Característica</div>
      <div className="bg-blue-600 text-white font-bold p-3 grid place-items-center border-b border-r border-blue-500">Diagrama p</div>
      <div className="bg-indigo-600 text-white font-bold p-3 grid place-items-center border-b border-indigo-500">Diagrama np</div>
      
      {/* Rows */}
      <div className="bg-slate-100 font-semibold p-4 grid place-items-center border-b border-r">Tipo de dato</div>
      <div className="bg-white p-4 grid place-items-center border-b border-r text-center">Proporción<br/><span className="text-xs text-slate-500">(defectuosos / total)</span></div>
      <div className="bg-white p-4 grid place-items-center border-b text-center">Conteo absoluto<br/><span className="text-xs text-slate-500">(número total defectuosos)</span></div>

      <div className="bg-slate-100 font-semibold p-4 grid place-items-center border-b border-r">Tamaño Muestra (n)</div>
      <div className="bg-white p-4 grid place-items-center border-b border-r text-green-600 font-bold">Variable o Constante</div>
      <div className="bg-white p-4 grid place-items-center border-b text-red-600 font-bold">Estrictamente Constante</div>

      <div className="bg-slate-100 font-semibold p-4 grid place-items-center border-r">Interpretación visual</div>
      <div className="bg-white p-4 grid place-items-center border-r text-center text-sm">Escala de 0 a 1 (porcentaje)</div>
      <div className="bg-white p-4 grid place-items-center text-center text-sm">Escala en números enteros</div>
    </div>
  </div>
);

const MultipleDefectsVisual = () => (
  <div className="grid grid-cols-2 gap-8 h-full p-4 place-items-center">
    <div className="grid place-items-center">
      <div className="relative w-48 h-48 bg-slate-200 rounded border-4 border-slate-400 shadow-inner">
        {/* Defect markers */}
        <div className="absolute top-4 left-6 text-red-500 font-bold text-xl" title="Rayón">❌</div>
        <div className="absolute bottom-8 left-12 text-red-500 font-bold text-xl" title="Mancha">❌</div>
        <div className="absolute top-1/2 right-8 text-red-500 font-bold text-xl" title="Abolladura">❌</div>
        <div className="absolute bottom-2 right-4 text-red-500 font-bold text-xl" title="Decoloración">❌</div>
        <div className="absolute top-2 w-full text-center text-slate-500 font-bold tracking-widest opacity-50">UNIDAD DE INSPECCIÓN</div>
      </div>
      <p className="mt-4 font-semibold text-slate-700">1 Unidad = 4 Defectos totales</p>
    </div>
    <div className="grid gap-4 w-full">
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
        <h4 className="font-bold text-emerald-800">Diferencia Clave</h4>
        <p className="text-sm text-emerald-700 mt-1">En 'p' o 'np' esta pieza sería simplemente "1 defectuosa". En el diagrama 'c', evaluamos la complejidad sumando sus <strong className="text-emerald-900 text-lg">4</strong> defectos específicos.</p>
      </div>
    </div>
  </div>
);

const ConstructionCVisual = () => (
  <div className="grid grid-cols-2 gap-6 h-full p-4">
     <div className="grid gap-4 content-center">
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
        <p className="font-semibold text-slate-700 mb-4 text-lg">Promedio de defectos (c̄):</p>
        <div className="bg-white p-4 inline-block rounded-xl border-2 border-slate-300 font-mono text-2xl shadow-sm">
          c̄ = Σc / k
        </div>
        <p className="text-sm text-slate-500 mt-4">Donde 'c' son los defectos encontrados y 'k' es el número de subgrupos inspeccionados.</p>
      </div>
    </div>
    <div className="bg-teal-50 p-6 rounded-lg border border-teal-200 grid gap-6 content-center">
      <p className="font-bold text-teal-800 text-center text-lg">Límites de Control</p>
      <div className="grid gap-4 font-mono text-base bg-white p-6 rounded-xl shadow-md border border-teal-100">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <span className="font-bold text-red-600 text-xl">LSC =</span>
          <span className="text-lg">c̄ + 3√c̄</span>
        </div>
        <div className="h-px bg-slate-200 w-full"></div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <span className="font-bold text-red-600 text-xl">LIC =</span>
          <span className="text-lg">c̄ - 3√c̄</span>
        </div>
      </div>
    </div>
  </div>
);

const ConstructionUVisual = () => (
  <div className="grid grid-cols-2 gap-6 h-full p-4">
    <div className="grid gap-4 content-start">
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-semibold text-slate-700 mb-2">1. Defectos por unidad (u):</p>
        <div className="bg-white p-2 text-center rounded border font-mono text-lg">u = c / n</div>
        <p className="text-xs text-slate-500 mt-1 text-center">c = defectos, n = tamaño muestra (área, longitud, etc.)</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-semibold text-slate-700 mb-2">2. Promedio normalizado (ū):</p>
        <div className="bg-white p-2 text-center rounded border font-mono text-lg">ū = Σc / Σn</div>
      </div>
    </div>
    <div className="bg-cyan-50 p-5 rounded-lg border border-cyan-200 grid gap-4 content-center">
      <p className="font-semibold text-cyan-800 text-center">3. Límites de Control</p>
      <div className="grid gap-3 font-mono text-sm bg-white p-4 rounded shadow-sm">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <span className="font-bold text-red-600">LSC =</span>
          <span>ū + 3 * √(ū / n)</span>
        </div>
        <div className="h-px bg-slate-200 w-full"></div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <span className="font-bold text-red-600">LIC =</span>
          <span>ū - 3 * √(ū / n)</span>
        </div>
      </div>
      <p className="text-xs text-cyan-600 text-center italic">Al variar 'n', los límites LSC y LIC formarán escalones en la gráfica real.</p>
    </div>
  </div>
);

const CompareCUVisual = () => (
  <div className="grid h-full p-4 place-items-center">
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 w-full max-w-4xl place-items-center">
      
      {/* C Card */}
      <div className="grid gap-4 bg-white border-2 border-teal-200 p-6 rounded-2xl shadow-lg w-full">
        <h3 className="text-2xl font-black text-teal-700 text-center border-b pb-2">Diagrama C</h3>
        <ul className="grid gap-3 text-slate-700">
          <li className="grid grid-cols-[auto_1fr] gap-2"><span className="text-teal-500">✓</span> Mide conteo directo de defectos.</li>
          <li className="grid grid-cols-[auto_1fr] gap-2"><span className="text-teal-500">✓</span> <strong>Tamaño de muestra CONSTANTE.</strong></li>
          <li className="grid grid-cols-[auto_1fr] gap-2"><span className="text-teal-500">✓</span> Ej: Defectos en 1 metro cuadrado de tela (siempre 1m²).</li>
        </ul>
      </div>

      <div className="bg-slate-100 rounded-full p-4 text-slate-400 font-bold text-xl shadow-inner">VS</div>

      {/* U Card */}
      <div className="grid gap-4 bg-white border-2 border-cyan-200 p-6 rounded-2xl shadow-lg w-full">
        <h3 className="text-2xl font-black text-cyan-700 text-center border-b pb-2">Diagrama U</h3>
        <ul className="grid gap-3 text-slate-700">
          <li className="grid grid-cols-[auto_1fr] gap-2"><span className="text-cyan-500">✓</span> Mide tasa (defectos / unidad).</li>
          <li className="grid grid-cols-[auto_1fr] gap-2"><span className="text-cyan-500">✓</span> <strong>Tamaño de muestra VARIABLE.</strong></li>
          <li className="grid grid-cols-[auto_1fr] gap-2"><span className="text-cyan-500">✓</span> Ej: Defectos en rollos de tela de 50m, 60m, 45m (se normaliza a defectos/metro).</li>
        </ul>
      </div>

    </div>
  </div>
);

const DecisionTreeVisual = () => (
  <div className="grid h-full w-full p-2 place-items-center bg-slate-50 rounded-xl overflow-hidden text-sm">
    <div className="grid grid-rows-[auto_1fr] gap-6 w-full max-w-3xl">
      <div className="bg-slate-800 text-white font-bold py-2 px-6 rounded-full mx-auto shadow-md">¿Qué tipo de datos mides?</div>
      
      <div className="grid grid-cols-2 gap-4 relative w-full pt-4">
        {/* SVG Lines */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
           <path d="M 50% 0 L 25% 30" stroke="#cbd5e1" strokeWidth="2" fill="none" />
           <path d="M 50% 0 L 75% 30" stroke="#cbd5e1" strokeWidth="2" fill="none" />
           
           <path d="M 25% 80 L 15% 150" stroke="#cbd5e1" strokeWidth="2" fill="none" />
           <path d="M 25% 80 L 35% 150" stroke="#cbd5e1" strokeWidth="2" fill="none" />

           <path d="M 75% 80 L 65% 150" stroke="#cbd5e1" strokeWidth="2" fill="none" />
           <path d="M 75% 80 L 85% 150" stroke="#cbd5e1" strokeWidth="2" fill="none" />
        </svg>

        {/* Level 2 */}
        <div className="grid place-items-center gap-2 z-10">
          <div className="bg-white border-2 border-slate-300 py-2 px-4 rounded-lg font-semibold text-center w-3/4 shadow-sm">
            Unidades Defectuosas<br/><span className="text-xs font-normal text-slate-500">(Clasificación Binaria)</span>
          </div>
          <div className="text-xs font-bold text-slate-400">¿Tamaño muestra (n)?</div>
        </div>
        <div className="grid place-items-center gap-2 z-10">
           <div className="bg-white border-2 border-slate-300 py-2 px-4 rounded-lg font-semibold text-center w-3/4 shadow-sm">
            Número de Defectos<br/><span className="text-xs font-normal text-slate-500">(Conteo por unidad)</span>
          </div>
          <div className="text-xs font-bold text-slate-400">¿Tamaño muestra (n)?</div>
        </div>

        {/* Level 3 */}
        <div className="grid grid-cols-2 gap-2 mt-12 z-10">
          <div className="grid place-items-center gap-2">
            <div className="bg-slate-100 px-3 py-1 rounded text-xs border">Variable o Constante</div>
            <div className="bg-blue-600 text-white font-black text-xl w-12 h-12 grid place-items-center rounded-full shadow-lg border-2 border-blue-200">p</div>
          </div>
          <div className="grid place-items-center gap-2">
             <div className="bg-slate-100 px-3 py-1 rounded text-xs border">Sólo Constante</div>
            <div className="bg-indigo-600 text-white font-black text-xl w-12 h-12 grid place-items-center rounded-full shadow-lg border-2 border-indigo-200">np</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-12 z-10">
          <div className="grid place-items-center gap-2">
            <div className="bg-slate-100 px-3 py-1 rounded text-xs border">Sólo Constante</div>
            <div className="bg-teal-600 text-white font-black text-xl w-12 h-12 grid place-items-center rounded-full shadow-lg border-2 border-teal-200">c</div>
          </div>
          <div className="grid place-items-center gap-2">
             <div className="bg-slate-100 px-3 py-1 rounded text-xs border">Variable o Constante</div>
            <div className="bg-cyan-600 text-white font-black text-xl w-12 h-12 grid place-items-center rounded-full shadow-lg border-2 border-cyan-200">u</div>
          </div>
        </div>

      </div>
    </div>
  </div>
);


// --- Data Definitions ---

const lessonData: SectionData[] = [
  {
    id: 's1',
    tabLabel: 'Introducción',
    title: 'Introducción a los Diagramas para Atributos',
    description: (
      <p>Los diagramas de control para atributos son herramientas estadísticas utilizadas para monitorear procesos cuando los datos <strong>no son medibles en escala continua</strong>, sino que se clasifican en categorías discretas como “defectuoso/no defectuoso” o “número de defectos”. Se emplean ampliamente en control de calidad cuando no es posible o práctico medir variables continuas.</p>
    ),
    visual: IntroVisual
  },
  {
    id: 's2',
    tabLabel: 'Naturaleza Datos',
    title: 'Naturaleza de los Datos por Atributo',
    description: (
      <div className="grid gap-2">
        <p>Los datos por atributo se caracterizan por representar conteos o clasificaciones. Se dividen en dos tipos principales:</p>
        <ul className="list-disc pl-5 grid gap-1">
          <li><strong>Datos binarios:</strong> cada unidad es clasificada como defectuosa o no defectuosa.</li>
          <li><strong>Datos de conteo:</strong> se registra el número de defectos en una unidad o muestra.</li>
        </ul>
      </div>
    ),
    visual: DataNatureVisual
  },
  {
    id: 's3',
    tabLabel: 'Diagrama p',
    title: 'Diagrama p (Proporción Defectuosa)',
    description: (
      <p>El diagrama p se utiliza para controlar la <strong>proporción de unidades defectuosas</strong> en una muestra. Es sumamente versátil porque es adecuado cuando el tamaño de la muestra puede variar entre observaciones. La proporción se calcula como el número de defectuosos dividido entre el tamaño de la muestra.</p>
    ),
    visual: () => <ControlChartVisual type="p" dataKeyName="Proporción (p)" yAxisDomain={[0, 0.15]} />
  },
  {
    id: 's4',
    tabLabel: 'Flujo Diag. p',
    title: 'Funcionamiento del diagrama p',
    description: (
      <div className="grid gap-2">
        <p>Para construir un diagrama p en un proceso productivo real, se sigue una secuencia lógica de pasos estadísticos:</p>
        <ol className="list-decimal pl-5 grid gap-1 text-sm">
          <li>Recolectar muestras periódicas del proceso.</li>
          <li>Calcular la proporción defectuosa de cada muestra individual.</li>
          <li>Determinar la proporción promedio global del histórico.</li>
          <li>Calcular límites de control (superior e inferior).</li>
          <li>Graficar y analizar variaciones para detectar causas especiales.</li>
        </ol>
      </div>
    ),
    visual: ProcessFlowVisual
  },
  {
    id: 's5',
    tabLabel: 'Construir p',
    title: 'Construcción Matemática del diagrama p',
    description: (
      <p>Las fórmulas para el diagrama p se basan en la distribución binomial. La flexibilidad de este diagrama radica en que la fórmula de los límites de control incorpora la variable 'n' (tamaño de muestra) de forma individual para cada punto, permitiendo límites dinámicos si la muestra varía.</p>
    ),
    visual: ConstructionPVisual
  },
  {
    id: 's6',
    tabLabel: 'Diagrama np',
    title: 'Diagrama np (Número de Defectuosos)',
    description: (
      <p>El diagrama np controla el <strong>número absoluto</strong> de unidades defectuosas en una muestra. A diferencia del diagrama p, requiere obligatoriamente que el tamaño de la muestra sea constante, ya que se basa en conteos directos y no en proporciones relativas.</p>
    ),
    visual: () => <ControlChartVisual type="np" dataKeyName="Defectuosos (np)" />
  },
  {
    id: 's7',
    tabLabel: 'Construir np',
    title: 'Construcción del diagrama np',
    description: (
      <p>Al tener un tamaño de muestra constante, las fórmulas del diagrama np se simplifican significativamente en comparación con el diagrama p. Los límites de control serán líneas rectas horizontales constantes durante todo el análisis.</p>
    ),
    visual: ConstructionNPVisual
  },
  {
    id: 's8',
    tabLabel: 'Comparar p/np',
    title: 'Comparativa: Diagrama p vs np',
    description: (
      <p>Ambos diagramas detectan cambios en la calidad del proceso respecto a unidades defectuosas (clasificación binaria). La elección entre uno y otro radica casi exclusivamente en la operativa de recolección de datos y la constancia del tamaño de la muestra.</p>
    ),
    visual: ComparePNPVisual
  },
  {
    id: 's9',
    tabLabel: 'Diagrama c',
    title: 'Diagrama c (Número de Defectos)',
    description: (
      <p>El diagrama c se utiliza para controlar el <strong>número total de defectos</strong> encontrados en una unidad de inspección cuando el tamaño de la unidad es constante (ej. un auto, 1m² de tela). Aquí una unidad puede presentar múltiples defectos simultáneos, a diferencia de los diagramas p y np donde la unidad entera se descarta.</p>
    ),
    visual: MultipleDefectsVisual
  },
  {
    id: 's10',
    tabLabel: 'Construir c',
    title: 'Construcción del diagrama c',
    description: (
      <p>Las fórmulas para el diagrama c se derivan de la distribución de Poisson, la cual es ideal para modelar la ocurrencia de eventos (defectos) en un área, espacio o tiempo continuo y constante. El cálculo es extremadamente directo.</p>
    ),
    visual: ConstructionCVisual
  },
  {
    id: 's11',
    tabLabel: 'Diagrama u',
    title: 'Diagrama u (Defectos por Unidad)',
    description: (
      <p>El diagrama u mide la <strong>tasa de defectos por unidad</strong> de inspección cuando el tamaño de la muestra o área de inspección varía de una observación a otra. Es una extensión necesaria del diagrama c para normalizar los datos y hacer comparables muestras de distinto tamaño.</p>
    ),
    visual: () => <ControlChartVisual type="u" dataKeyName="Tasa de Defectos (u)" />
  },
  {
    id: 's12',
    tabLabel: 'Construir u',
    title: 'Construcción del diagrama u',
    description: (
      <p>El diagrama u transforma conteos absolutos en índices relativos (defectos por unidad base). Debido a que el tamaño de inspección 'n' puede variar por muestra, los límites de control se recalculan para cada punto graficado, resultando en límites variables o escalonados.</p>
    ),
    visual: ConstructionUVisual
  },
  {
    id: 's13',
    tabLabel: 'Comparar c/u',
    title: 'Comparativa: Diagrama c vs u',
    description: (
      <p>Mientras que los diagramas p/np lidian con artículos defectuosos, los diagramas c/u operan con la cantidad de defectos en sí. La diferencia fundamental operativa entre c y u es el manejo del área o tamaño de inspección.</p>
    ),
    visual: CompareCUVisual
  },
  {
    id: 's14',
    tabLabel: 'Selección',
    title: 'Árbol de Decisión: Selección del Diagrama Adecuado',
    description: (
      <div className="grid gap-2">
        <p>La elección estadística correcta del diagrama de control para atributos depende de dos criterios fundamentales e ineludibles:</p>
        <ol className="list-decimal pl-5 grid gap-1">
          <li><strong>Tipo de Dato:</strong> ¿Evaluamos la unidad completa (defectuosa/no defectuosa) o contamos defectos específicos dentro de la unidad?</li>
          <li><strong>Tamaño de Muestra:</strong> ¿El tamaño o área de inspección se mantiene constante en cada medición o varía?</li>
        </ol>
      </div>
    ),
    visual: DecisionTreeVisual
  }
];

// --- Structural Components ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LayoutProps> = ({ children, tabs, activeTab, onTabChange }) => {
  return (
    // Grid layout strict compliance: No flexbox allowed in main structure
    <div className="grid grid-rows-[auto_auto_1fr] h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      
      {/* Header */}
      <header className="grid place-items-center bg-slate-900 text-white p-4 shadow-md z-20">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Control Estadístico de Procesos: Diagramas por Atributos</h1>
      </header>

      {/* Tab Navigation (CSS Grid implementation) */}
      <nav className="bg-white border-b border-slate-200 shadow-sm z-10 overflow-x-auto">
        {/* Usando grid-auto-flow column para alinear tabs sin flex */}
        <div className="grid grid-flow-col justify-start w-max min-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                grid place-items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap outline-none
                ${activeTab === tab.id 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="grid p-4 md:p-8 overflow-y-auto w-full max-w-7xl justify-self-center">
        {children}
      </main>

    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(lessonData[0].id);

  const activeSection = lessonData.find(s => s.id === activeTabId) || lessonData[0];
  const VisualComponent = activeSection.visual;

  const tabsConfig = lessonData.map(s => ({ id: s.id, label: s.tabLabel }));

  return (
    <LessonLayout tabs={tabsConfig} activeTab={activeTabId} onTabChange={setActiveTabId}>
      {/* Panel Structure Strict Grid */}
      <div className="grid grid-rows-[auto_auto_1fr] gap-6 h-full min-h-[500px] animate-in fade-in duration-300">
        
        {/* Diagram Title */}
        <div className="grid border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            {activeSection.title}
          </h2>
        </div>

        {/* Diagram Description */}
        <div className="grid text-lg text-slate-600 leading-relaxed bg-white/50 p-4 rounded-lg border border-slate-200/50 backdrop-blur-sm">
          {activeSection.description}
        </div>

        {/* Diagram Render */}
        <Card className="grid grid-rows-[auto_1fr] h-full min-h-[400px]">
          <div className="bg-slate-50 border-b border-slate-200 p-3 grid place-items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Visualización Interactiva</span>
          </div>
          <div className="grid bg-white p-4 h-full relative">
             <VisualComponent />
          </div>
        </Card>

      </div>
    </LessonLayout>
  );
}