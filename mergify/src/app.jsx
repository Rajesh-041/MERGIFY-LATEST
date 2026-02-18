import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  getDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { 
  Home, 
  Calendar, 
  UserCheck, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck,
  Search, 
  Bell, 
  Settings, 
  PlusCircle, 
  Clock, 
  Phone, 
  Wrench, 
  User, 
  LogOut,
  ChevronRight,
  ClipboardList,
  MessageSquare,
  Sparkles,
  Info,
  Lock, 
  Mail,
  GraduationCap,
  Hash,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Menu,
  X,
  Monitor,
  Smartphone,
  Laptop,
  BarChart3,
  FileText,
  UserX,
  Megaphone,
  Zap,
  RotateCcw,
  Edit3,
  Activity,
  Trophy,
  Check,
  UserPlus,
  Users,
  Loader2
} from 'lucide-react';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyAnCQnIj6D2cEnrt-_dULHIDnVdej2LNrs",
  authDomain: "mergify-28a08.firebaseapp.com",
  projectId: "mergify-28a08",
  storageBucket: "mergify-28a08.firebasestorage.app",
  messagingSenderId: "740585918112",
  appId: "1:740585918112:web:c43c048b80dd62972a03c5",
  measurementId: "G-KYT6B3SXGQ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'MERGIFY-CAMPUS-V3';

// --- Custom Animations & Fonts ---
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .animate-gradient {
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
    }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    
    input::placeholder, textarea::placeholder { 
      text-transform: uppercase;
      font-weight: 900;
      letter-spacing: 0.1em;
    }
  `}</style>
);

// --- 1. Atomic UI Components ---

function Logo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100"
      height="100"
      className={`w-24 h-24 max-w-[96px] max-h-[96px] ${className}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="28" fill="url(#gradLogo)" />
      <path
        d="M25 70V30L50 50L75 30V70"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 75L50 63L65 75"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}


function CardFrame({ children, className = "" }) {
  return (
    <div className={`bg-white/85 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(99,102,241,0.15)] h-full transition-all duration-300 p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

function ButtonUI({ children, onClick, variant = "primary", className = "", type = "button", disabled = false }) {
  const styles = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-xl shadow-indigo-200",
    secondary: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-xl shadow-rose-100",
    outline: "border-2 border-slate-100 text-slate-600 hover:bg-slate-50",
    accent: "bg-white text-slate-900 shadow-lg border border-slate-100 hover:bg-slate-50"
  };
  return (
    <button 
      type={type} 
      disabled={disabled} 
      onClick={onClick} 
      className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${styles[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

function ModalUI({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <CardFrame className="shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-slate-900 leading-none uppercase tracking-tighter">{String(title)}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
          </div>
          {children}
        </CardFrame>
      </div>
    </div>
  );
}

function AuthBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 animate-gradient overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-400/20 blur-[120px] rounded-full" />
    </div>
  );
}

function ViewModeButton({ viewMode, toggleViewMode }) {
  return (
    <button onClick={toggleViewMode} className="p-2.5 bg-white/60 backdrop-blur-md text-slate-600 rounded-xl hover:bg-white transition-all shadow-sm border border-white/50 flex items-center gap-2 uppercase">
      {viewMode === 'auto' ? <Laptop size={18} /> : viewMode === 'mobile' ? <Smartphone size={18} /> : <Monitor size={18} />}
      <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">{String(viewMode)}</span>
    </button>
  );
}

function RoleButton({ icon, title, desc, onClick, color = "indigo" }) {
  return (
    <button onClick={onClick} className="w-full group bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl hover:shadow-2xl hover:shadow-indigo-200 transition-all flex items-center gap-6 text-left">
      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0 ${color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-purple-50 text-purple-600'}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-black text-xl text-slate-900 tracking-tighter uppercase leading-none">{String(title)}</h3>
        <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-2 uppercase opacity-60 leading-none">{String(desc)}</p>
      </div>
      <ChevronRight className="ml-auto text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
    </button>
  );
}

function StatCard({ label, value, trend, colorClass = "text-slate-900" }) {
  return (
    <div className="bg-white/85 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-sm hover:bg-indigo-600 group transition-all duration-500 p-8">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-200 transition-colors leading-none">{String(label)}</p>
      <div className="flex items-end justify-between leading-none">
        <h4 className={`text-4xl font-black ${colorClass} group-hover:text-white transition-colors tracking-tighter`}>{String(value)}</h4>
        <span className="text-[9px] font-black text-emerald-500 group-hover:text-indigo-100 tracking-widest uppercase leading-none">{String(trend)}</span>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${color}`}>
        {icon}
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 text-center leading-tight">{String(label)}</span>
    </button>
  );
}

// --- 2. Screen & Logic Fragments ---

function LoginScreen({ role, onLogin, onRegister, onBack, error, viewMode, toggleViewMode }) {
  const [isRegister, setIsRegister] = useState(false);
  const [regNo, setRegNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isRegister) await onRegister({ regNo, fullName, email, role });
    else await onLogin(regNo, role);
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden font-sans">
      <AuthBackground />
      <div className="absolute top-8 right-8">
        <ViewModeButton viewMode={viewMode} toggleViewMode={toggleViewMode} />
      </div>
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="text-center mb-10">
          <Logo className="w-20 h-20 mx-auto mb-6 drop-shadow-2xl" />
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
            {isRegister ? 'JOIN MERGIFY' : 'PORTAL ACCESS'}
          </h2>
          <p className="text-indigo-200 font-bold text-[11px] tracking-[0.2em] mt-3 uppercase">
            PROCEEDING AS {String(role).toUpperCase()}
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-rose-50/90 backdrop-blur-md border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 animate-in bounce-in duration-300">
            <AlertCircle size={20} />
            <span className="text-sm font-black uppercase">{String(error)}</span>
          </div>
        )}

        <CardFrame className="p-8 md:p-10 border-none shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1 uppercase">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl transition-all font-black text-slate-700 uppercase outline-none" placeholder="FULL NAME" />
                </div>
              </div>
            )}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1 uppercase">Register Number</label>
              <div className="relative group">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input required type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl transition-all font-black text-slate-700 font-mono uppercase outline-none" placeholder="E.G. 20240001" />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1 uppercase">Campus Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl transition-all font-black text-slate-700 uppercase outline-none" placeholder="ID@CAMPUS.EDU" />
              </div>
            </div>
            <ButtonUI type="submit" variant="primary" className="w-full text-lg mt-4 py-5" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : (isRegister ? 'REGISTER NOW' : 'SIGN IN')}
            </ButtonUI>
          </form>
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <button onClick={() => setIsRegister(!isRegister)} className="text-sm font-black text-indigo-600 hover:text-purple-600 transition-colors uppercase tracking-widest">
              {isRegister ? 'ALREADY REGISTERED? LOG IN' : "NEW USER? REGISTER NOW"}
            </button>
          </div>
        </CardFrame>
        <button onClick={onBack} className="w-full mt-10 text-white/50 font-black text-[10px] hover:text-white transition-colors tracking-[0.4em] uppercase">← BACK TO SELECTION</button>
      </div>
    </div>
  );
}

function SettingsView({ user }) {
  return (
    <div className="max-w-xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500 text-center pb-20">
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-[3rem] bg-indigo-900 mx-auto flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-200">
          {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'U'}
        </div>
        <div className="absolute -bottom-2 -right-2 p-3 bg-emerald-500 text-white rounded-2xl border-4 border-white shadow-lg">
          <ShieldCheck size={20} />
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{String(user?.name)}</h2>
        <p className="text-indigo-600 font-black text-[11px] uppercase tracking-[0.3em] mt-3">ID NUMBER: {String(user?.regNo)}</p>
      </div>
      <CardFrame className="text-left divide-y divide-slate-100 p-0 overflow-hidden shadow-2xl">
        <button className="w-full px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
          <div className="flex items-center gap-5">
             <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><User size={20} /></div>
             <div>
               <p className="font-black text-slate-800 text-xs uppercase tracking-widest">Profile Details</p>
               <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase opacity-60">Manage account identity</p>
             </div>
          </div>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </button>
        <button onClick={() => window.location.reload()} className="w-full px-10 py-8 flex items-center justify-center gap-4 hover:bg-rose-50 transition-colors text-rose-600 font-black tracking-[0.2em] text-xs">
          <LogOut size={20} /> SIGN OUT OF SESSION
        </button>
      </CardFrame>
    </div>
  );
}

// --- 3. Teacher Module Components ---

function TeacherAttendanceManager({ appId }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'user_directory'), (snap) => {
      const studentList = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(u => u.role === 'student');
      setStudents(studentList.sort((a, b) => a.regNo.localeCompare(b.regNo)));
      setLoading(false);
    });
    return () => unsub();
  }, [appId]);

  const markAttendance = async (student, status) => {
    setMarkingId(student.id);
    try {
      const logRef = collection(db, 'artifacts', appId, 'public', 'data', 'attendance_logs');
      await addDoc(logRef, { regNo: student.regNo, name: student.name, status, timestamp: serverTimestamp() });
      setTimeout(() => setMarkingId(null), 500);
    } catch (e) { console.error(e); setMarkingId(null); }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
      <header>
        <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">MANAGEMENT</h2>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">ATTENDANCE HUB.</h3>
      </header>
      <CardFrame className="p-0 overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center gap-4"><Users className="text-indigo-600" size={24} /><h4 className="font-black text-slate-800 text-xs uppercase tracking-widest">ENROLLED STUDENTS</h4></div>
          <span className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full uppercase">{students.length} TOTAL</span>
        </div>
        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto no-scrollbar">
          {loading ? (
            <div className="p-20 text-center text-slate-400 font-black uppercase tracking-widest flex flex-col items-center">
              <Loader2 className="mb-4 animate-spin" size={40} /> 
              Registry Sync...
            </div>
          ) : students.length === 0 ? (
            <div className="p-20 text-center text-slate-400 font-black uppercase tracking-widest">No students registered</div>
          ) : students.map(s => (
            <div key={s.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors gap-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-900 text-white flex items-center justify-center font-black text-xl">{s.name ? s.name[0] : '?'}</div>
                <div>
                  <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{String(s.name)}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">REG: {String(s.regNo)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {markingId === s.id ? (
                  <div className="px-6 py-3 font-black text-[10px] text-indigo-400 uppercase tracking-widest">SYNCING...</div>
                ) : (
                  <>
                    <button onClick={() => markAttendance(s, 'PRESENT')} className="px-6 py-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">PRESENT</button>
                    <button onClick={() => markAttendance(s, 'ABSENT')} className="px-6 py-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">ABSENT</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardFrame>
    </div>
  );
}

function TeacherTimetableManager({ appId, initialTimetable }) {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTimetable?.length > 0) setTimetable(initialTimetable);
    else {
      const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const slots = ['09:00', '11:00', '14:00', '16:00'];
      setTimetable(days.map(day => ({ day, slots: slots.map(time => ({ time, subject: 'FREE' })) })));
    }
  }, [initialTimetable]);

  const publishTimetable = async () => {
    setLoading(true);
    try { 
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'timetable', 'class_schedule'), { 
        data: timetable, 
        updatedAt: serverTimestamp() 
      }); 
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-[11px] font-black text-purple-600 uppercase tracking-[0.3em] mb-2">PLANNER</h2>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">TIMETABLE HUB.</h3>
        </div>
        <ButtonUI onClick={publishTimetable} disabled={loading} variant="primary" className="px-8 py-4">
          {loading ? <Loader2 className="animate-spin" /> : 'PUBLISH SCHEDULE'}
        </ButtonUI>
      </header>
      <div className="overflow-x-auto no-scrollbar shadow-2xl rounded-[2.5rem]">
        <table className="w-full border-collapse text-left bg-white">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-6 text-[10px] font-black border-r border-white/5 uppercase tracking-widest">TIME</th>
              {timetable.map(d => (
                <th key={d.day} className="p-6 text-center text-[10px] font-black min-w-[150px] uppercase tracking-widest">{String(d.day)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {timetable[0]?.slots.map((_, slotIdx) => (
              <tr key={slotIdx}>
                <td className="p-6 bg-slate-50 font-black text-indigo-600 text-xs border-r border-slate-100 uppercase tracking-widest">{timetable[0].slots[slotIdx].time}</td>
                {timetable.map((day, dayIdx) => (
                  <td key={dayIdx} className="p-4">
                    <input 
                      value={day.slots[slotIdx].subject} 
                      onChange={e => { 
                        const next = [...timetable]; 
                        next[dayIdx].slots[slotIdx].subject = e.target.value.toUpperCase(); 
                        setTimetable(next); 
                      }} 
                      className="w-full p-3 bg-white border-2 border-slate-100 rounded-xl font-black text-[10px] focus:border-indigo-500 uppercase transition-all outline-none" 
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TeacherDashboardView({ user, reports }) {
  const activeReports = reports.filter(r => r.status !== 'RESOLVED');
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h2 className="text-[11px] font-black text-purple-600 uppercase tracking-[0.3em] mb-2">FACULTY HUB</h2>
        <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
          WELCOME BACK,<br/>{user?.name ? user.name.split(' ')[0] : 'PROFESSOR'}
        </h3>
      </header>
      
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <StatCard label="AVG ATTENDANCE" value="94.2%" trend="OPTIMAL" />
        <StatCard label="PENDING REPORTS" value={String(activeReports.length)} trend="ACTIVE" colorClass={activeReports.length > 0 ? "text-rose-600" : "text-slate-900"} />
        <StatCard label="SCHEDULED SESSIONS" value="04" trend="ON TRACK" />
        <StatCard 
          label="CAMPUS STATUS" 
          value={activeReports.some(r => r.type === 'SOS') ? "ALERT" : "SECURE"} 
          trend="VERIFIED" 
          colorClass={activeReports.some(r => r.type === 'SOS') ? "text-rose-600 animate-pulse" : "text-slate-900"} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CardFrame className="shadow-2xl">
          <h4 className="font-black text-slate-800 uppercase tracking-[0.2em] text-xs mb-8">QUICK ACTIONS</h4>
          <div className="grid grid-cols-2 gap-4">
            <QuickAction icon={<Zap className="text-amber-500" />} label="SOS ALERT" color="bg-amber-50" onClick={() => {}} />
            <QuickAction icon={<UserCheck className="text-indigo-500" />} label="REGISTRY" color="bg-indigo-50" onClick={() => {}} />
            <QuickAction icon={<Megaphone className="text-purple-500" />} label="BROADCAST" color="bg-purple-50" onClick={() => {}} />
            <QuickAction icon={<FileText className="text-emerald-500" />} label="REPORTS" color="bg-emerald-50" onClick={() => {}} />
          </div>
        </CardFrame>
        
        <CardFrame className="shadow-2xl">
          <h4 className="font-black text-slate-800 uppercase tracking-[0.2em] text-xs mb-8">REAL-TIME INBOX</h4>
          <div className="space-y-4 max-h-[250px] overflow-y-auto no-scrollbar">
            {activeReports.length === 0 ? (
              <p className="text-center py-10 text-slate-400 text-[10px] font-black uppercase tracking-widest">NO NEW ALERTS</p>
            ) : (
              activeReports.map(r => (
                <div key={r.id} className={`p-5 rounded-3xl border flex items-start gap-4 transition-all ${r.type === 'SOS' ? 'bg-rose-50 border-rose-100 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
                  {r.type === 'SOS' ? <Zap className="text-rose-500 shrink-0 mt-1" size={20} /> : <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={20} />}
                  <div>
                    <p className={`text-xs font-black uppercase tracking-widest ${r.type === 'SOS' ? 'text-rose-700' : 'text-slate-700'}`}>{String(r.type)} ALERT</p>
                    <p className="text-[10px] text-slate-600 mt-2 font-bold opacity-60 uppercase line-clamp-1">{String(r.subject || r.description)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardFrame>
      </div>
    </div>
  );
}

function TeacherReportManager({ reports, onResolve }) {
  const activeReports = reports.filter(r => r.status !== 'RESOLVED');
  return (
    <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
      <header>
        <h2 className="text-[11px] font-black text-rose-600 uppercase tracking-[0.3em] mb-2">MONITORING</h2>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">ISSUE QUEUE.</h3>
      </header>
      <CardFrame className="p-0 overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <h4 className="font-black text-slate-800 text-xs uppercase tracking-widest">ACTIVE TICKETS</h4>
          <span className="text-[10px] font-black bg-rose-100 text-rose-600 px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">REAL-TIME</span>
        </div>
        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto no-scrollbar">
          {activeReports.length === 0 ? (
            <p className="text-center py-20 text-slate-400 font-black uppercase tracking-widest text-xs">NO ACTIVE TICKETS IN QUEUE</p>
          ) : (
            activeReports.map(r => (
              <div key={r.id} className="p-10 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center font-black text-2xl uppercase ${r.type === 'SOS' ? 'bg-rose-500 text-white animate-pulse' : r.type === 'MAINTENANCE' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                    {r.type[0]}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-xl uppercase tracking-tight">{String(r.type)} REQUEST</p>
                    <p className="text-[11px] text-slate-400 font-bold uppercase mt-2 tracking-widest">{String(r.subject || r.description)}</p>
                    <p className="text-[9px] text-indigo-600 font-black uppercase mt-1 tracking-widest">LOC: {String(r.location || 'UNKNOWN')}</p>
                  </div>
                </div>
                <button onClick={() => onResolve(r.id)} className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg">RESOLVE</button>
              </div>
            ) )
          )}
        </div>
      </CardFrame>
    </div>
  );
}

function TeacherCommsManager({ onPostAnnouncement }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !message) return;
    setLoading(true);
    await onPostAnnouncement(subject, message);
    setSubject(''); setMessage(''); setLoading(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <header>
        <h2 className="text-[11px] font-black text-rose-600 uppercase tracking-[0.3em] mb-2">COMMS</h2>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">BROADCASTS.</h3>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CardFrame className="shadow-2xl">
          <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-10">NEW BROADCAST</h4>
          <div className="space-y-8">
            <input 
              className="w-full bg-slate-50 border-none rounded-2xl p-5 font-black text-sm focus:ring-2 focus:ring-indigo-500 uppercase outline-none shadow-inner" 
              placeholder="SUBJECT" 
              value={subject} 
              onChange={e => setSubject(e.target.value.toUpperCase())} 
            />
            <textarea 
              rows="5" 
              className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-sm focus:ring-2 focus:ring-indigo-500 uppercase outline-none shadow-inner resize-none" 
              placeholder="MESSAGE" 
              value={message} 
              onChange={e => setMessage(e.target.value.toUpperCase())} 
            />
            <ButtonUI onClick={handleSubmit} disabled={loading} variant="primary" className="w-full py-6 rounded-[2rem]">
              {loading ? <Loader2 className="animate-spin" /> : 'POST ANNOUNCEMENT'}
            </ButtonUI>
          </div>
        </CardFrame>
        
        <CardFrame className="bg-slate-900 text-white border-none p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-rose-600/10 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <Megaphone className="text-rose-400 mb-10" size={56} />
            <h4 className="text-4xl font-black tracking-tight mb-6 uppercase">SOS OVERRIDE</h4>
            <p className="text-slate-400 font-bold text-lg opacity-70 uppercase tracking-widest">TRIGGER EMERGENCY CAMPUS ALERT.</p>
          </div>
          <ButtonUI variant="danger" className="w-full py-8 text-2xl rounded-[2.5rem] mt-12 relative z-10">
            ACTIVATE
          </ButtonUI>
        </CardFrame>
      </div>
    </div>
  );
}

// --- 4. Student Module Components ---

function StudentAIStudy() {
  const [step, setStep] = useState(1);
  const [timeframe, setTimeframe] = useState('WEEK');
  const [activityCount, setActivityCount] = useState(3);
  const [activities, setActivities] = useState([]);
  const [timetable, setTimetable] = useState(null);

  const startConfig = () => {
    setActivities(Array.from({ length: activityCount }, (_, i) => ({ id: i, name: '', hours: 1 })));
    setStep(2);
  };

  const generateTimetable = () => {
    const days = timeframe === 'DAY' ? ['TODAY'] : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const slots = ['09:00', '11:00', '14:00', '16:00', '18:00'];
    const newTimetable = days.map(day => ({ 
      day, 
      slots: slots.map((time, idx) => ({ 
        time, 
        activity: activities[idx % activities.length]?.name || 'REVISION', 
        isBreak: idx % 3 === 2 
      })) 
    }));
    setTimetable(newTimetable);
    setStep(3);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20">
      <header className="text-center">
        <div className="inline-flex p-8 bg-indigo-100 text-indigo-600 rounded-[3rem] shadow-2xl shadow-indigo-100 mb-6">
          <Sparkles size={48} />
        </div>
        <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase">AI PLANNER.</h2>
        <p className="text-slate-500 font-bold text-lg mt-4 opacity-70 tracking-[0.2em] uppercase">ACADEMIC ENGINE</p>
      </header>

      {step === 1 && (
        <CardFrame className="max-w-2xl mx-auto shadow-2xl">
          <div className="space-y-10">
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 block">PLANNING TIMEFRAME</label>
              <div className="grid grid-cols-3 gap-4">
                {['DAY', 'WEEK', 'MONTH'].map(t => (
                  <button key={t} onClick={() => setTimeframe(t)} className={`p-6 rounded-3xl border-2 transition-all font-black tracking-widest ${timeframe === t ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md' : 'border-slate-100 text-slate-400 hover:border-indigo-200'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 block">NUMBER OF ACTIVITIES ({activityCount})</label>
              <input type="range" min="1" max="8" value={activityCount} onChange={(e) => setActivityCount(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
            <ButtonUI onClick={startConfig} variant="primary" className="w-full py-6 rounded-[2rem] text-xl font-black tracking-widest">
              CONFIGURE <ArrowRight size={24} />
            </ButtonUI>
          </div>
        </CardFrame>
      )}

      {step === 2 && (
        <CardFrame className="max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setStep(1)} className="p-3 bg-slate-100 rounded-2xl text-slate-500 hover:text-indigo-600 transition-all"><ArrowLeft size={20} /></button>
            <h4 className="font-black text-2xl tracking-tighter uppercase">ACTIVITY DETAILS</h4>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
            {activities.map((act, idx) => (
              <div key={act.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-6 group hover:border-indigo-400 transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">{idx + 1}</div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <input 
                      value={act.name} 
                      onChange={(e) => { const next = [...activities]; next[idx].name = e.target.value.toUpperCase(); setActivities(next); }} 
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-black text-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase" 
                      placeholder="ACTIVITY NAME" 
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={act.hours} 
                      onChange={(e) => { const next = [...activities]; next[idx].hours = e.target.value; setActivities(next); }} 
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-black text-sm focus:ring-2 focus:ring-indigo-500 text-center outline-none" 
                    />
                    <span className="absolute -top-3 left-3 bg-white px-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">HRS</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ButtonUI onClick={generateTimetable} variant="primary" className="w-full py-6 rounded-[2rem] mt-10 text-xl font-black tracking-widest">
            GENERATE <Zap size={24} />
          </ButtonUI>
        </CardFrame>
      )}

      {step === 3 && timetable && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4 text-center md:text-left">
            <div>
              <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em]">PERSONAL PLANNER</span>
              <h4 className="text-4xl font-black text-slate-900 uppercase leading-none mt-3 tracking-tighter">{timeframe} SCHEDULE</h4>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <ButtonUI onClick={() => setStep(1)} variant="secondary" className="flex-1 md:flex-none py-4 font-black"><RotateCcw size={18} /> RESET</ButtonUI>
              <ButtonUI variant="primary" className="flex-1 md:flex-none py-4 font-black"><CheckCircle2 size={18} /> SAVE</ButtonUI>
            </div>
          </div>
          <div className="overflow-x-auto no-scrollbar shadow-2xl rounded-[3rem] border border-slate-100">
            <table className="w-full border-collapse text-left bg-white">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 text-center font-black text-[10px] uppercase tracking-[0.2em] border-r border-white/5">TIME</th>
                  {(timeframe === 'DAY' ? ['TODAY'] : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']).map(d => (
                    <th key={d} className="p-6 text-center font-black text-[10px] uppercase tracking-[0.2em] border-l border-white/5 min-w-[160px]">{String(d)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timetable[0]?.slots.map((slot, sIdx) => (
                  <tr key={slot.time} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 flex flex-col items-center justify-center font-black bg-slate-50/50 border-r border-slate-100">
                      <span className="text-xs text-indigo-600 font-black">{slot.time}</span>
                      <Clock size={12} className="text-slate-300 mt-2" />
                    </td>
                    {timetable.map((day, dIdx) => (
                      <td key={day.day} className="p-3 border-l border-slate-100">
                        <div className={`h-full min-h-[90px] rounded-2xl p-4 border-2 transition-all flex flex-col justify-between group ${day.slots[sIdx].isBreak ? 'bg-slate-100 border-slate-100 text-slate-400' : 'bg-white border-slate-100 hover:border-indigo-400 hover:shadow-lg'}`}>
                          <div className="flex items-start justify-between">
                            <span className="text-[10px] font-black uppercase tracking-tight leading-tight w-full break-words">
                              {day.slots[sIdx].activity}
                            </span>
                            {!day.slots[sIdx].isBreak && <Edit3 size={10} className="text-slate-300 opacity-0 group-hover:opacity-100 shrink-0" />}
                          </div>
                          <span className="text-[8px] font-black opacity-50 uppercase tracking-[0.2em] mt-2">{day.slots[sIdx].isBreak ? 'BUFFER' : 'SESSION'}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentDashboardView({ user, reports, announcements, timetableData }) {
  const myReports = reports.filter(r => r.userId === auth.currentUser?.uid && r.status !== 'RESOLVED');
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">OVERVIEW</h2>
          <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">HI, {String(user?.name ? user.name.split(' ')[0] : 'USER')}!</h3>
        </div>
        <ButtonUI variant="outline" className="hidden sm:flex px-6 py-2.5 text-[11px] uppercase tracking-widest font-black">RECORDS</ButtonUI>
      </header>
      
      <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
        <CardFrame className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-none relative overflow-hidden flex flex-col justify-between p-8 shadow-2xl">
          <h4 className="font-black uppercase tracking-[0.2em] text-[10px] opacity-80 mb-6">ATTENDANCE</h4>
          <div className="flex items-center gap-8 mb-4 relative z-10">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.15)" strokeWidth="12" fill="transparent" />
                <circle cx="64" cy="64" r="56" stroke="white" strokeWidth="12" fill="transparent" strokeDasharray={352} strokeDashoffset={352 - (352 * 0.85)} strokeLinecap="round" />
              </svg>
              <span className="absolute text-3xl font-black">85%</span>
            </div>
            <div>
              <p className="text-4xl font-black tracking-tighter">STABLE</p>
              <p className="text-xs opacity-70 font-bold tracking-widest mt-3">+2 TO 90%</p>
            </div>
          </div>
          <Sparkles className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10" />
        </CardFrame>

        <CardFrame className="col-span-1 md:col-span-2 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-black text-slate-800 uppercase tracking-[0.2em] text-xs">CAMPUS BROADCASTS</h4>
            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl uppercase tracking-[0.2em] animate-pulse">LIVE</span>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
            {announcements.length === 0 ? (
              <p className="text-center py-10 text-slate-400 font-black uppercase tracking-widest text-[10px]">NO RECENT NOTICES</p>
            ) : (
              announcements.map(a => (
                <div key={a.id} className="p-6 border border-slate-100 rounded-3xl bg-slate-50/50 flex items-center gap-6 transition-all hover:bg-white hover:shadow-md hover:border-indigo-100 group">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-purple-600 group-hover:scale-110 transition-transform"><Megaphone size={20} /></div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{String(a.subject)}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase opacity-80 leading-relaxed line-clamp-2">{String(a.message)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardFrame>
      </div>

      {timetableData?.length > 0 && (
        <CardFrame className="shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-black text-slate-800 uppercase tracking-[0.2em] text-xs">CLASS TIMELINE</h4>
            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">PUBLISHED</span>
          </div>
          <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">TIME</th>
                  {timetableData.map(d => <th key={d.day} className="p-4 text-[10px] font-black text-slate-400 text-center uppercase tracking-[0.1em]">{String(d.day)}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {timetableData[0]?.slots.map((_, sIdx) => (
                  <tr key={sIdx}>
                    <td className="p-5 font-black text-xs text-indigo-600 uppercase tracking-widest">{String(timetableData[0].slots[sIdx].time)}</td>
                    {timetableData.map((day, dIdx) => (
                      <td key={dIdx} className="p-2">
                        <div className={`p-4 rounded-2xl text-[10px] font-black text-center uppercase tracking-tight ${day.slots[sIdx].subject === 'FREE' ? 'bg-slate-50 text-slate-200' : 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'}`}>
                          {String(day.slots[sIdx].subject)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardFrame>
      )}
    </div>
  );
}

// --- 5. Navigation & Global Layout Components ---

function Header({ role, user, onLogout, viewMode, toggleViewMode }) {
  return (
    <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-30 px-6 md:px-10 py-5 flex items-center justify-between border-b border-slate-200/50 shadow-sm">
      <div className="flex items-center gap-4">
        <Logo className="w-10 h-10 flex-shrink-0 shadow-lg rounded-xl" />
        <div>
          <h1 className="font-black text-xl text-slate-900 tracking-tighter leading-none uppercase">MERGIFY</h1>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mt-1 block"> {String(role).toUpperCase()} PORTAL </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ViewModeButton viewMode={viewMode} toggleViewMode={toggleViewMode} />
        <div className="hidden sm:block text-right mr-3">
          <p className="text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase">SESSION ACTIVE</p>
          <p className="text-sm font-black text-slate-800 line-clamp-1 uppercase tracking-tight mt-1"> {String(user?.name).toUpperCase()} </p>
        </div>
        <button onClick={onLogout} title="Sign Out" className="p-3 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-2xl transition-all shadow-sm">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

function Navigation({ activeTab, setActiveTab, role, showMobileNav, showDesktopNav }) {
  const tabs = role === 'student' ? [
    { id: 'home', icon: GraduationCap, label: 'ACADEMICS' },
    { id: 'campus', icon: Wrench, label: 'UTILITIES' },
    { id: 'safety', icon: ShieldAlert, label: 'SAFETY' },
    { id: 'ai', icon: Sparkles, label: 'PLANNER' },
  ] : [
    { id: 'home', icon: BarChart3, label: 'DASHBOARD' },
    { id: 'attendance', icon: UserCheck, label: 'ATTENDANCE' },
    { id: 'timetable', icon: Calendar, label: 'TIMETABLE' },
    { id: 'comms', icon: Megaphone, label: 'COMMS' },
    { id: 'monitoring', icon: UserX, label: 'MONITOR' },
  ];

  return (
    <>
      {showMobileNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-t border-slate-800 flex items-center justify-around h-20 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] px-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center justify-center flex-1 h-full transition-all relative ${activeTab === tab.id ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>
              <tab.icon size={22} className={activeTab === tab.id ? 'stroke-[2.5px]' : ''} />
              <span className="text-[8px] mt-2 font-black tracking-[0.2em] text-center uppercase"> {String(tab.label)} </span>
              {activeTab === tab.id && <div className="absolute bottom-2 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_12px_rgba(129,140,248,0.8)]" />}
            </button>
          ))}
        </nav>
      )}
      {showDesktopNav && (
        <nav className="fixed left-0 top-0 bottom-0 w-24 bg-slate-900 flex flex-col items-center py-10 z-40 shadow-2xl border-r border-slate-800">
          <Logo className="w-12 h-12 mb-12 flex-shrink-0 shadow-2xl" />
          <div className="flex flex-col gap-8 flex-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`group relative p-4 rounded-3xl transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] scale-110' : 'text-slate-500 hover:text-slate-100 hover:scale-105'}`}>
                <tab.icon size={24} />
                <span className="absolute left-full ml-6 px-4 py-2 bg-slate-800 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-2xl border border-slate-700"> {String(tab.label)} </span>
              </button>
            ))}
          </div>
          <div className="mt-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95" onClick={() => setActiveTab('settings')}>
              <Settings size={22} />
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

// --- 6. Main Root Controller ---

export default function App() {
  const [role, setRole] = useState(null); 
  const [user, setUser] = useState(null); 
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  const [authError, setAuthError] = useState('');
  const [viewMode, setViewMode] = useState('auto');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [reports, setReports] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [activeModal, setActiveModal] = useState(null); 
  const [reportData, setReportData] = useState({ subject: '', location: '', description: '' });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rule 3: Auth First
  const initAuth = async () => {
    try {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    } catch (e) { console.error("Auth failed", e); }
  };

  useEffect(() => {
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      setTimeout(() => setIsSplashScreen(false), 1200);
    });
    return () => unsubscribe();
  }, []);

  // Rule 1 & 2: Firestore Handling
  useEffect(() => {
    if (!firebaseUser) return;
    
    const unsubReports = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'reports'), (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      // Rule 2: Manual sorting
      setReports(data.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)));
    });

    const unsubAnns = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'announcements'), (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setAnnouncements(data.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)));
    });

    const unsubTime = onSnapshot(doc(db, 'artifacts', appId, 'public', 'data', 'timetable', 'class_schedule'), (snapshot) => {
      if (snapshot.exists()) setTimetable(snapshot.data().data);
    });

    return () => { unsubReports(); unsubAnns(); unsubTime(); };
  }, [firebaseUser]);

  const toggleViewMode = () => {
    const modes = ['auto', 'mobile', 'desktop'];
    const nextIndex = (modes.indexOf(viewMode) + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  };

  if (isSplashScreen) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 z-50 font-sans">
        <CustomStyles />
        <Logo className="w-32 h-32 mb-8 animate-pulse shadow-2xl rounded-[3rem]" />
        <h1 className="text-5xl font-black text-indigo-950 tracking-tighter mb-4 animate-in fade-in duration-1000">MERGIFY.</h1>
        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
          <div className="absolute h-full bg-indigo-600 animate-[loading_2s_infinite_ease-in-out]" style={{width: '60%'}}></div>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-6 md:p-8 overflow-hidden font-sans">
        <CustomStyles />
        <AuthBackground />
        <div className="absolute top-8 right-8">
          <ViewModeButton viewMode={viewMode} toggleViewMode={toggleViewMode} />
        </div>
        <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Logo className="w-full h-full drop-shadow-2xl" />
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">MERGIFY.</h2>
            <p className="text-indigo-200 font-bold text-xs tracking-[0.4em] mt-3 uppercase opacity-80">Unified Campus Platform</p>
          </div>
          <div className="space-y-4">
            <RoleButton icon={<GraduationCap size={32} />} title="STUDENT PORTAL" desc="ACADEMICS, SAFETY & TOOLS" onClick={() => setRole('student')} />
            <RoleButton icon={<UserCheck size={32} />} title="FACULTY PORTAL" desc="MANAGEMENT & MONITORING" onClick={() => setRole('teacher')} color="purple" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return (
    <>
      <CustomStyles />
      <LoginScreen 
        role={role} 
        onLogin={async (id, r) => {
          if (!firebaseUser) return;
          const snap = await getDoc(doc(db, 'artifacts', appId, 'public', 'data', 'user_directory', id));
          if (snap.exists() && snap.data().role === r) setUser(snap.data());
          else setAuthError("CREDENTIALS NOT VALID FOR THIS PORTAL");
        }} 
        onRegister={async (data) => {
          if (!firebaseUser) return;
          try {
            const ref = doc(db, 'artifacts', appId, 'public', 'data', 'user_directory', data.regNo);
            const userObj = { regNo: data.regNo, name: data.fullName.toUpperCase(), role: data.role, uid: firebaseUser.uid };
            await setDoc(ref, userObj);
            setUser(userObj);
          } catch(e) { setAuthError("REGISTRATION FAILED. TRY AGAIN."); }
        }} 
        onBack={() => setRole(null)} 
        error={authError} 
        viewMode={viewMode} 
        toggleViewMode={toggleViewMode} 
      />
    </>
  );

  const isDesktopLayout = viewMode === 'desktop' || (viewMode === 'auto' && windowWidth >= 1024);

  return (
    <div className={`min-h-screen bg-[#f8fafc] transition-all font-sans ${isDesktopLayout ? 'pl-24' : 'pb-24'} uppercase`}>
      <CustomStyles />
      <Header role={role} user={user} onLogout={() => {setUser(null); setRole(null);}} viewMode={viewMode} toggleViewMode={toggleViewMode} />
      
      <main className={`max-w-6xl mx-auto p-6 md:p-10 transition-all ${viewMode === 'desktop' ? 'min-w-[1024px]' : ''}`}>
        {role === 'teacher' ? (
          <TeacherContent 
            activeTab={activeTab} 
            user={user} 
            reports={reports} 
            onResolve={async (id) => await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'reports', id), { status: 'RESOLVED' })} 
            onPostAnnouncement={async (s, m) => await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'announcements'), { subject: s, message: m, timestamp: serverTimestamp() })}
            appId={appId}
            timetableData={timetable}
            isDesktop={isDesktopLayout}
          />
        ) : (
          <StudentContent 
            activeTab={activeTab} 
            user={user} 
            reports={reports} 
            announcements={announcements} 
            timetableData={timetable}
            onTriggerSOS={() => addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'reports'), { type: 'SOS', priority: 'HIGH', status: 'PENDING', userId: firebaseUser.uid, timestamp: serverTimestamp() })} 
            onOpenModal={setActiveModal} 
          />
        )}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} role={role} showMobileNav={!isDesktopLayout} showDesktopNav={isDesktopLayout} />

      <ModalUI isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={`NEW ${String(activeModal)} TICKET`}>
        <div className="space-y-6 text-left">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Subject</label>
            <input value={reportData.subject} onChange={e => setReportData({...reportData, subject: e.target.value.toUpperCase()})} placeholder="E.G. LOST CALCULATOR" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none uppercase" />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Location</label>
            <input value={reportData.location} onChange={e => setReportData({...reportData, location: e.target.value.toUpperCase()})} placeholder="E.G. BLOCK A" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none uppercase" />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Details</label>
            <textarea rows="3" value={reportData.description} onChange={e => setReportData({...reportData, description: e.target.value.toUpperCase()})} placeholder="PROVIDE FULL DETAILS..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none uppercase resize-none" />
          </div>
          <ButtonUI onClick={() => {
            if(!reportData.subject || !reportData.description) return;
            addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'reports'), { ...reportData, type: activeModal.toUpperCase(), priority: 'NORMAL', status: 'PENDING', userId: firebaseUser.uid, timestamp: serverTimestamp() });
            setActiveModal(null);
            setReportData({ subject: '', location: '', description: '' });
          }} className="w-full py-5 text-sm">SUBMIT TICKET</ButtonUI>
        </div>
      </ModalUI>
      
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient z-[60]" />
    </div>
  );
}

// --- Internal Routing ---

function TeacherContent({ activeTab, user, reports, onResolve, onPostAnnouncement, appId, timetableData, isDesktop }) {
  switch (activeTab) {
    case 'home': return <TeacherDashboardView user={user} reports={reports} />;
    case 'attendance': return <TeacherAttendanceManager appId={appId} />;
    case 'timetable': return <TeacherTimetableManager appId={appId} initialTimetable={timetableData} />;
    case 'comms': return <TeacherCommsManager onPostAnnouncement={onPostAnnouncement} />;
    case 'monitoring': return <TeacherReportManager reports={reports} onResolve={onResolve} />;
    case 'settings': return <SettingsView user={user} />;
    default: return <TeacherDashboardView user={user} reports={reports} />;
  }
}

function StudentContent({ activeTab, user, reports, announcements, timetableData, onTriggerSOS, onOpenModal }) {
  switch (activeTab) {
    case 'home': return <StudentDashboardView user={user} reports={reports} announcements={announcements} timetableData={timetableData} />;
    case 'campus': return (
      <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
        <header>
          <h2 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-2 leading-none">UTILITIES</h2>
          <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">CAMPUS HUB.</h3>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <QuickAction icon={<Search size={32} />} label="REPORT LOST" color="text-blue-600 bg-blue-50" onClick={() => onOpenModal('lost')} />
          <QuickAction icon={<Wrench size={32} />} label="MAINTENANCE" color="text-emerald-600 bg-emerald-50" onClick={() => onOpenModal('maintenance')} />
        </div>
      </div>
    );
    case 'safety': return (
      <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
        <header className="flex flex-col sm:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-[11px] font-black text-rose-600 uppercase tracking-[0.3em] mb-2 leading-none">GUARD</h2>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">SAFETY CENTER.</h3>
          </div>
          <ButtonUI variant="danger" onClick={onTriggerSOS} className="w-full sm:w-auto px-12 py-6 text-2xl animate-pulse rounded-[2rem] shadow-[0_0_40px_rgba(244,63,94,0.4)]">
            <Phone size={28} /> SOS
          </ButtonUI>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <CardFrame className="border-l-[10px] border-l-rose-500 bg-rose-50/20 shadow-2xl p-10">
            <ShieldAlert className="text-rose-500 mb-8" size={48} />
            <h4 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">ANONYMOUS TIP</h4>
            <p className="text-xs text-slate-500 font-bold leading-relaxed mb-10 opacity-70">PRIVATE & SECURE REPORTING SYSTEM. YOUR IDENTITY IS NEVER SHARED.</p>
            <ButtonUI variant="danger" onClick={() => onOpenModal('safety')} className="w-full tracking-[0.2em] py-5">FILE REPORT</ButtonUI>
          </CardFrame>
          <CardFrame className="p-10 shadow-2xl border border-slate-100">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">HELPLINES</h4>
            <div className="space-y-5">
              {['SECURITY DESK', 'SAFETY CELL', 'WELLNESS UNIT'].map(name => (
                <div key={name} className="flex items-center justify-between p-6 bg-slate-50 rounded-[1.8rem] border border-slate-100 transition-all hover:border-indigo-600 group">
                  <span className="font-black text-slate-700 text-sm tracking-widest">{String(name)}</span>
                  <button className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">CONNECT</button>
                </div>
              ))}
            </div>
          </CardFrame>
        </div>
      </div>
    );
    case 'ai': return <StudentAIStudy />;
    case 'settings': return <SettingsView user={user} />;
    default: return <StudentDashboardView user={user} reports={reports} announcements={announcements} timetableData={timetableData} />;
  }
}
