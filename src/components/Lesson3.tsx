import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Smartphone, 
  Star, 
  User, 
  Settings, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Award
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface Quark {
  id: number;
  quarkNumber: string;
  title: string;
  type: string;
  description: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: React.ReactNode;
  textPanel: React.ReactNode;
  diagramPanel: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// --- DATA ---

const lessonData: Quark[] = [
  {
    id: 0,
    quarkNumber: "Calidad",
    title: "Enfoques para interpretar la calidad",
    type: "Q-con",
    description: "El concepto de calidad puede analizarse desde diferentes perspectivas teóricas. Entre las más comunes se encuentran el enfoque basado en el producto, el enfoque basado en el usuario y el enfoque basado en el proceso. Cada uno resalta distintos criterios para evaluar la calidad."
  },
  {
    id: 1,
    quarkNumber: "Producto",
    title: "Enfoque basado en el producto",
    type: "Q-def",
    description: "El enfoque basado en el producto considera que la calidad puede evaluarse mediante las características físicas o técnicas del producto. Según esta perspectiva, un producto con mejores materiales, mayor precisión o mejor desempeño técnico presenta mayor calidad."
  },
  {
    id: 2,
    quarkNumber: "Usuario",
    title: "Enfoque basado en el usuario",
    type: "Q-def",
    description: "El enfoque basado en el usuario define la calidad según la capacidad del producto para satisfacer las necesidades y expectativas del cliente. En este caso, la percepción del usuario es el criterio principal para evaluar la calidad."
  },
  {
    id: 3,
    quarkNumber: "Proceso",
    title: "Enfoque basado en el proceso",
    type: "Q-def",
    description: "El enfoque basado en el proceso sostiene que la calidad es el resultado de procesos de producción bien diseñados, controlados y estandarizados. Cuando el proceso es estable y está correctamente gestionado, los productos tienden a cumplir consistentemente con las especificaciones."
  },
  {
    id: 4,
    quarkNumber: "Control",
    title: "Relación entre calidad y control estadístico",
    type: "Q-con",
    description: "En el control estadístico de calidad, la calidad se entiende como el resultado de un proceso de producción estable y controlado. Mediante herramientas estadísticas es posible monitorear la variación del proceso y detectar desviaciones antes de que se generen defectos en los productos."
  },
  {
    id: 5,
    quarkNumber: "Síntesis",
    title: "Síntesis del concepto de calidad",
    type: "Q-con",
    description: "La calidad en el ámbito industrial integra varios elementos: cumplimiento de especificaciones técnicas, satisfacción del cliente, atributos del producto y estabilidad de los procesos productivos. Comprender estas dimensiones permite diseñar sistemas de producción que generen productos confiables, seguros y consistentes."
  }
];

// --- REUSABLE COMPONENTS ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden grid ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, textPanel, diagramPanel }) => {
  return (
    <div className="min-h-screen bg-slate-50 grid grid-rows-[auto_1fr] font-sans">
      {/* Header with Title and Nav Tabs */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 grid grid-rows-[auto_auto] gap-4 p-4 md:px-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {tabs}
      </header>

      {/* Main Content Area - Grid Layout */}
      <main className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full items-start">
        {/* Left Column: Text Panel */}
        <section className="lg:col-span-4 grid grid-rows-[max-content] gap-6">
          {textPanel}
        </section>

        {/* Right Column: Diagram Panel */}
        <section className="lg:col-span-8 grid grid-rows-[max-content] h-full min-h-[500px]">
          {diagramPanel}
        </section>
      </main>
    </div>
  );
};

// --- DIAGRAM COMPONENTS ---

const Diagram11: React.FC = () => (
  <div className="w-full h-full grid place-items-center bg-slate-50 p-6">
    <svg viewBox="0 0 500 450" className="w-full max-w-lg h-auto drop-shadow-sm">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
        </marker>
      </defs>
      
      {/* Triangle Lines */}
      <line x1="250" y1="80" x2="100" y2="340" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 6" />
      <line x1="250" y1="80" x2="400" y2="340" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 6" />
      <line x1="100" y1="340" x2="400" y2="340" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 6" />
      
      {/* Arrows to Center */}
      <line x1="250" y1="110" x2="250" y2="200" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <line x1="130" y1="320" x2="210" y2="250" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <line x1="370" y1="320" x2="290" y2="250" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* Nodes */}
      {/* Top Node */}
      <rect x="175" y="40" width="150" height="50" rx="8" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
      <text x="250" y="70" textAnchor="middle" fill="#1e293b" fontWeight="600" fontSize="16">Enfoque: Usuario</text>
      
      {/* Bottom Left Node */}
      <rect x="25" y="320" width="150" height="50" rx="8" fill="#f8fafc" stroke="#10b981" strokeWidth="2" />
      <text x="100" y="350" textAnchor="middle" fill="#1e293b" fontWeight="600" fontSize="16">Enfoque: Producto</text>

      {/* Bottom Right Node */}
      <rect x="325" y="320" width="150" height="50" rx="8" fill="#f8fafc" stroke="#8b5cf6" strokeWidth="2" />
      <text x="400" y="350" textAnchor="middle" fill="#1e293b" fontWeight="600" fontSize="16">Enfoque: Proceso</text>

      {/* Center Node (Quality) */}
      <circle cx="250" cy="230" r="45" fill="#2563eb" className="drop-shadow-md" />
      <text x="250" y="235" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="18">CALIDAD</text>
    </svg>
  </div>
);

const Diagram12: React.FC = () => (
  <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-8 p-8 bg-slate-50 place-content-center">
    {/* Product A - Low Spec */}
    <div className="bg-white border-2 border-slate-200 rounded-xl p-6 grid grid-rows-[auto_1fr_auto] gap-4 text-center shadow-sm opacity-80">
      <div className="mx-auto bg-slate-100 p-4 rounded-full w-20 h-20 grid place-items-center">
        <Smartphone className="w-10 h-10 text-slate-400" />
      </div>
      <div className="grid grid-rows-[auto_auto] gap-2">
        <h3 className="text-lg font-bold text-slate-600">Modelo Básico</h3>
        <ul className="text-sm text-slate-500 grid gap-2 text-left bg-slate-50 p-4 rounded-lg">
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><span className="w-2 h-2 bg-slate-300 rounded-full"></span> Material plástico</li>
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><span className="w-2 h-2 bg-slate-300 rounded-full"></span> Durabilidad estándar</li>
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><span className="w-2 h-2 bg-slate-300 rounded-full"></span> Funciones limitadas</li>
        </ul>
      </div>
      <div className="bg-slate-100 text-slate-500 py-2 rounded-lg font-semibold text-sm">
        Calidad Inferior
      </div>
    </div>

    {/* Product B - High Spec */}
    <div className="bg-white border-2 border-blue-500 rounded-xl p-6 grid grid-rows-[auto_1fr_auto] gap-4 text-center shadow-lg transform scale-105">
      <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
        <Award className="w-3 h-3" /> Superior
      </div>
      <div className="mx-auto bg-blue-50 p-4 rounded-full w-20 h-20 grid place-items-center">
        <Smartphone className="w-10 h-10 text-blue-600" />
      </div>
      <div className="grid grid-rows-[auto_auto] gap-2">
        <h3 className="text-lg font-bold text-blue-800">Modelo Premium</h3>
        <ul className="text-sm text-slate-700 grid gap-2 text-left bg-blue-50 p-4 rounded-lg">
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><ShieldCheck className="w-4 h-4 text-blue-500"/> Aleación de titanio</li>
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><ShieldCheck className="w-4 h-4 text-blue-500"/> Alta precisión (0.01mm)</li>
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><Cpu className="w-4 h-4 text-blue-500"/> Rendimiento óptimo</li>
        </ul>
      </div>
      <div className="bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm">
        Mayor Calidad Técnica
      </div>
    </div>
  </div>
);

const Diagram13: React.FC = () => (
  <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-4 p-8 bg-slate-50 items-center justify-items-center">
    {/* User 1 */}
    <div className="col-start-1 row-start-1 grid grid-rows-[auto_auto_auto] gap-2 text-center place-items-center">
      <div className="bg-emerald-100 p-3 rounded-full">
        <User className="w-8 h-8 text-emerald-600" />
      </div>
      <div className="grid grid-cols-5 gap-1 text-yellow-400">
        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
      </div>
      <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200">"Satisface mi necesidad"</span>
    </div>

    {/* Central Product */}
    <div className="col-start-2 row-start-1 row-span-2 grid grid-rows-[auto_auto] gap-4 place-items-center bg-white p-6 rounded-2xl shadow-md border border-slate-200 z-10">
      <div className="bg-blue-100 p-6 rounded-full">
        <Smartphone className="w-16 h-16 text-blue-600" />
      </div>
      <h3 className="font-bold text-slate-800">El Producto</h3>
      <div className="text-sm text-slate-500 text-center max-w-[150px]">
        La calidad se define por la experiencia de uso
      </div>
    </div>

    {/* User 2 */}
    <div className="col-start-3 row-start-1 grid grid-rows-[auto_auto_auto] gap-2 text-center place-items-center">
      <div className="bg-indigo-100 p-3 rounded-full">
        <User className="w-8 h-8 text-indigo-600" />
      </div>
      <div className="grid grid-cols-5 gap-1 text-yellow-400">
        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 text-slate-300" />
      </div>
      <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200">"Superó expectativas"</span>
    </div>

    {/* User 3 */}
    <div className="col-start-1 row-start-2 grid grid-rows-[auto_auto_auto] gap-2 text-center place-items-center">
      <div className="bg-amber-100 p-3 rounded-full">
        <User className="w-8 h-8 text-amber-600" />
      </div>
      <div className="grid grid-cols-5 gap-1 text-yellow-400">
        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
      </div>
      <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200">"Fácil de usar"</span>
    </div>
    
    {/* User 4 */}
    <div className="col-start-3 row-start-2 grid grid-rows-[auto_auto_auto] gap-2 text-center place-items-center">
      <div className="bg-rose-100 p-3 rounded-full">
        <User className="w-8 h-8 text-rose-600" />
      </div>
      <div className="grid grid-cols-5 gap-1 text-yellow-400">
        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
      </div>
      <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200">"Justo lo que quería"</span>
    </div>
  </div>
);

const Diagram14: React.FC = () => (
  <div className="w-full h-full grid grid-flow-col auto-cols-fr items-center gap-2 p-4 sm:p-8 bg-slate-50 overflow-x-auto">
    
    {/* Step 1 */}
    <div className="grid grid-rows-[auto_auto] gap-3 place-items-center text-center relative z-10">
      <div className="w-16 h-16 bg-white border-2 border-slate-300 rounded-lg shadow-sm grid place-items-center">
        <Settings className="w-8 h-8 text-slate-500" />
      </div>
      <span className="text-xs font-semibold text-slate-700">Materia Prima</span>
    </div>

    <ArrowRight className="w-6 h-6 text-slate-300 mx-auto" />

    {/* Step 2 */}
    <div className="grid grid-rows-[auto_auto] gap-3 place-items-center text-center relative z-10">
      <div className="w-16 h-16 bg-white border-2 border-blue-400 rounded-lg shadow-md grid place-items-center relative">
        <Settings className="w-8 h-8 text-blue-500" />
        <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-0.5 shadow">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="grid gap-1">
        <span className="text-xs font-semibold text-blue-800">Ensamblaje</span>
        <span className="text-[10px] text-slate-500 bg-white px-1 border border-slate-200 rounded">Punto de Control</span>
      </div>
    </div>

    <ArrowRight className="w-6 h-6 text-slate-300 mx-auto" />

    {/* Step 3 */}
    <div className="grid grid-rows-[auto_auto] gap-3 place-items-center text-center relative z-10">
      <div className="w-16 h-16 bg-white border-2 border-purple-400 rounded-lg shadow-md grid place-items-center relative">
        <Settings className="w-8 h-8 text-purple-500" />
        <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-0.5 shadow">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="grid gap-1">
        <span className="text-xs font-semibold text-purple-800">Acabado</span>
        <span className="text-[10px] text-slate-500 bg-white px-1 border border-slate-200 rounded">Estandarización</span>
      </div>
    </div>

    <ArrowRight className="w-6 h-6 text-slate-300 mx-auto" />

    {/* Step 4 */}
    <div className="grid grid-rows-[auto_auto] gap-3 place-items-center text-center relative z-10">
      <div className="w-20 h-20 bg-emerald-500 border-2 border-emerald-600 rounded-lg shadow-lg grid place-items-center">
        <Smartphone className="w-10 h-10 text-white" />
      </div>
      <span className="text-sm font-bold text-emerald-700">Producto Consistente</span>
    </div>
  </div>
);

const Diagram15: React.FC = () => {
  const data = [
    { sample: '1', value: 50 },
    { sample: '2', value: 52 },
    { sample: '3', value: 48 },
    { sample: '4', value: 55 },
    { sample: '5', value: 51 },
    { sample: '6', value: 49 },
    { sample: '7', value: 53 },
    { sample: '8', value: 50 },
    { sample: '9', value: 47 },
    { sample: '10', value: 51 },
  ];

  return (
    <div className="w-full h-full bg-slate-50 p-6 grid grid-rows-[auto_1fr] gap-4">
      <div className="grid grid-cols-3 gap-4 text-center mb-2">
        <div className="bg-red-50 border border-red-200 p-2 rounded text-xs text-red-700 font-medium">LCS (Límite Superior)</div>
        <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-xs text-emerald-700 font-medium">Proceso Estable</div>
        <div className="bg-blue-50 border border-blue-200 p-2 rounded text-xs text-blue-700 font-medium">LCI (Límite Inferior)</div>
      </div>
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="sample" label={{ value: 'Muestras de Producción', position: 'insideBottom', offset: -10 }} tick={{fontSize: 12, fill: '#64748b'}} />
          <YAxis domain={[35, 65]} label={{ value: 'Variación de Medida', angle: -90, position: 'insideLeft' }} tick={{fontSize: 12, fill: '#64748b'}} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#334155' }}
          />
          <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="4 4" label={{ position: 'top', value: 'LCS', fill: '#ef4444', fontSize: 12 }} />
          <ReferenceLine y={50} stroke="#10b981" label={{ position: 'insideTopLeft', value: 'Media Nominal', fill: '#10b981', fontSize: 12 }} />
          <ReferenceLine y={40} stroke="#3b82f6" strokeDasharray="4 4" label={{ position: 'bottom', value: 'LCI', fill: '#3b82f6', fontSize: 12 }} />
          <Line type="monotone" dataKey="value" stroke="#475569" strokeWidth={3} dot={{ r: 5, fill: '#475569', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Diagram16: React.FC = () => (
  <div className="w-full h-full grid place-items-center bg-slate-50 p-6">
    <svg viewBox="0 0 600 400" className="w-full h-auto drop-shadow-sm max-w-2xl">
      {/* Connecting Lines */}
      <line x1="300" y1="200" x2="300" y2="80" stroke="#cbd5e1" strokeWidth="3" />
      <line x1="300" y1="200" x2="300" y2="320" stroke="#cbd5e1" strokeWidth="3" />
      <line x1="300" y1="200" x2="150" y2="200" stroke="#cbd5e1" strokeWidth="3" />
      <line x1="300" y1="200" x2="450" y2="200" stroke="#cbd5e1" strokeWidth="3" />

      {/* Top Node: Especificaciones Técnicas */}
      <rect x="200" y="40" width="200" height="60" rx="8" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
      <text x="300" y="75" textAnchor="middle" fill="#1e293b" fontWeight="600" fontSize="14">Especificaciones</text>
      <text x="300" y="90" textAnchor="middle" fill="#64748b" fontSize="12">Técnicas (Producto)</text>

      {/* Bottom Node: Control de Procesos */}
      <rect x="200" y="300" width="200" height="60" rx="8" fill="#f8fafc" stroke="#8b5cf6" strokeWidth="2" />
      <text x="300" y="335" textAnchor="middle" fill="#1e293b" fontWeight="600" fontSize="14">Control de</text>
      <text x="300" y="350" textAnchor="middle" fill="#64748b" fontSize="12">Procesos Estadísticos</text>

      {/* Left Node: Satisfacción del Cliente */}
      <rect x="20" y="170" width="160" height="60" rx="8" fill="#f8fafc" stroke="#10b981" strokeWidth="2" />
      <text x="100" y="205" textAnchor="middle" fill="#1e293b" fontWeight="600" fontSize="14">Satisfacción</text>
      <text x="100" y="220" textAnchor="middle" fill="#64748b" fontSize="12">del Cliente (Usuario)</text>

      {/* Right Node: Atributos del Producto */}
      <rect x="420" y="170" width="160" height="60" rx="8" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
      <text x="500" y="205" textAnchor="middle" fill="#1e293b" fontWeight="600" fontSize="14">Atributos</text>
      <text x="500" y="220" textAnchor="middle" fill="#64748b" fontSize="12">Físicos / Estéticos</text>

      {/* Center Node: CALIDAD */}
      <rect x="230" y="160" width="140" height="80" rx="12" fill="#1e293b" className="drop-shadow-lg" />
      <text x="300" y="200" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="20">CALIDAD</text>
      <text x="300" y="220" textAnchor="middle" fill="#94a3b8" fontSize="12">INTEGRAL</text>
    </svg>
  </div>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const currentQuark = lessonData[activeTab];

  // Render correct diagram based on active tab
  const renderDiagram = () => {
    switch (currentQuark.quarkNumber) {
      case "Calidad": return <Diagram11 />;
      case "Producto": return <Diagram12 />;
      case "Usuario": return <Diagram13 />;
      case "Proceso": return <Diagram14 />;
      case "Control": return <Diagram15 />;
      case "Síntesis": return <Diagram16 />;
      default: return <div>Diagrama no encontrado</div>;
    }
  };

  // Build Tabs Component using CSS Grid
  const TabsNav = (
    <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-100 p-1 rounded-xl">
      {lessonData.map((quark, index) => (
        <button
          key={quark.id}
          onClick={() => setActiveTab(index)}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 grid place-items-center text-center
            ${activeTab === index 
              ? 'bg-white text-blue-700 shadow-sm border border-slate-200' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
        >
         {quark.quarkNumber}
        </button>
      ))}
    </nav>
  );

  // Build Text Panel Content
  const TextContent = (
    <Card className="p-6 md:p-8 h-full">
      <div className="grid grid-rows-[auto_auto_1fr] gap-6">
        <div className="grid gap-2">
         
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            {currentQuark.title}
          </h2>
        </div>
        
        <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        
        <p className="text-slate-600 leading-relaxed text-lg">
          {currentQuark.description}
        </p>
      </div>
    </Card>
  );

  // Build Diagram Panel Content
  const DiagramContent = (
    <Card className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="relative w-full h-full min-h-[400px]">
        {renderDiagram()}
      </div>
    </Card>
  );


  return (
    <LessonLayout 
      title="Fundamentos de la Calidad"
      tabs={TabsNav}
      textPanel={TextContent}
      diagramPanel={DiagramContent}
    />
  );
}