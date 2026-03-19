"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex" style={{ background:"var(--bg-base)" }}>

      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-between p-12 overflow-hidden">

        {/* Mesh background */}
        <div className="absolute inset-0" style={{
          background: theme === "dark"
            ? "radial-gradient(ellipse at 30% 50%,rgba(99,102,241,0.18) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(15,211,195,0.1) 0%,transparent 50%),radial-gradient(ellipse at 60% 80%,rgba(255,107,107,0.07) 0%,transparent 50%)"
            : "radial-gradient(ellipse at 30% 50%,rgba(79,70,229,0.10) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(8,145,178,0.08) 0%,transparent 50%)",
        }}/>

        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage:"linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
          backgroundSize:"60px 60px",
        }}/>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:"linear-gradient(135deg,#6366f1,#0fd3c3)"}}>
              <Zap size={18} className="text-white"/>
            </div>
            <span className="text-lg font-bold tracking-tight" style={{color:"var(--text-primary)"}}>LaunchPad</span>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background:"rgba(99,102,241,0.10)", border:"1px solid rgba(99,102,241,0.22)", color:"var(--brand-primary)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"/>
              Marketing Operations Platform
            </div>

            <h1 className="text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight" style={{color:"var(--text-primary)"}}>
              Launch. Track.{" "}
              <span className="gradient-text">Dominate.</span>
            </h1>

            <p className="text-lg leading-relaxed" style={{color:"var(--text-secondary)"}}>
              Generate smart links, create campaign assets, and monitor performance across every social platform — all in one place.
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label:"Campaigns Active", value:"148", delta:"+12%",  color:"#6366f1" },
            { label:"Total Clicks",     value:"2.4M", delta:"+28%", color:"#0fd3c3" },
            { label:"Revenue Driven",   value:"$1.2M", delta:"+41%",color:"#ffd166" },
          ].map(stat=>(
            <div key={stat.label} className="glass-card rounded-2xl p-5">
              <div className="text-2xl font-bold mb-1" style={{color:stat.color}}>{stat.value}</div>
              <div className="text-xs mb-2" style={{color:"var(--text-muted)"}}>{stat.label}</div>
              <div className="text-xs font-medium" style={{color:"var(--brand-secondary)"}}>{stat.delta} this month</div>
            </div>
          ))}
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/3 right-12 w-32 h-32 rounded-full opacity-20 animate-float"
          style={{background:"radial-gradient(circle,#6366f1,transparent)",filter:"blur(20px)"}}/>
        <div className="absolute bottom-1/3 left-8 w-24 h-24 rounded-full opacity-15 animate-float"
          style={{background:"radial-gradient(circle,#0fd3c3,transparent)",filter:"blur(16px)",animationDelay:"2s"}}/>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:p-12 relative"
        style={{borderLeft:"1px solid var(--border)"}}>

        {/* Theme toggle in corner */}
        <button onClick={toggleTheme}
          className="absolute top-6 right-6 p-2.5 rounded-xl transition-all"
          style={{ background:"var(--bg-raised)", border:"1px solid var(--border)", color:"var(--text-secondary)" }}>
          {theme==="dark" ? <Sun size={16}/> : <Moon size={16}/>}
        </button>

        <div className="absolute inset-0 pointer-events-none"
          style={{background:"radial-gradient(ellipse at 50% 30%,rgba(99,102,241,0.05) 0%,transparent 60%)"}}/>

        <div className="w-full max-w-md relative">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:"linear-gradient(135deg,#6366f1,#0fd3c3)"}}>
              <Zap size={18} className="text-white"/>
            </div>
            <span className="text-lg font-bold" style={{color:"var(--text-primary)"}}>LaunchPad</span>
          </div>

          <div className="mb-8 animate-fade-up" style={{opacity:0}}>
            <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{color:"var(--text-primary)"}}>Welcome back</h2>
            <p style={{color:"var(--text-secondary)"}}>Sign in to your marketing dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 animate-fade-up delay-100" style={{opacity:0}}>

            <div>
              <label className="block text-sm font-medium mb-2" style={{color:"var(--text-secondary)"}}>Email address</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="you@company.com" className="input-dark w-full rounded-xl px-4 py-3 text-sm"/>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium" style={{color:"var(--text-secondary)"}}>Password</label>
                <button type="button" className="text-xs font-medium" style={{color:"var(--brand-primary)"}}>Forgot password?</button>
              </div>
              <div className="relative">
                <input type={showPass?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="••••••••••" className="input-dark w-full rounded-xl px-4 py-3 text-sm pr-12"/>
                <button type="button" onClick={()=>setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                  style={{color:"var(--text-muted)"}}>
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm"
                style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",color:"var(--accent-coral)"}}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Signing in…</>
                : <>Sign in <ArrowRight size={16}/></>}
            </button>

            <p className="text-center text-xs" style={{color:"var(--text-muted)"}}>
              Demo: enter any email &amp; password to continue
            </p>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px" style={{background:"var(--border)"}}/>
              <span className="text-xs" style={{color:"var(--text-muted)"}}>OR</span>
              <div className="flex-1 h-px" style={{background:"var(--border)"}}/>
            </div>

            <button type="button" onClick={()=>router.push("/dashboard")}
              className="w-full rounded-xl py-3.5 text-sm font-medium flex items-center justify-center gap-3 transition-all"
              style={{background:"var(--bg-raised)",border:"1px solid var(--border)",color:"var(--text-primary)"}}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-sm mt-8 animate-fade-up delay-300" style={{color:"var(--text-muted)",opacity:0}}>
            Don't have access?{" "}
            <button className="font-medium" style={{color:"var(--brand-primary)"}}>Contact your admin</button>
          </p>
        </div>
      </div>
    </div>
  );
}
