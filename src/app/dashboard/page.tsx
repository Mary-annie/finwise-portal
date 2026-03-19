"use client";
import Link from "next/link";
import { TrendingUp, Link2, MousePointerClick, DollarSign, Activity, ArrowUpRight, Zap } from "lucide-react";
import { mockCampaigns, mockLinks, mockCreatives } from "@/lib/data";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import TopBar from "@/components/layout/TopBar";

const sparkData = [
  {v:4200},{v:5800},{v:5100},{v:7200},{v:6800},
  {v:8900},{v:11200},{v:9800},{v:13400},{v:15800},
];

const platformStats = [
  { name:"Instagram", clicks:32800, pct:36, color:"#E1306C" },
  { name:"TikTok",    clicks:24600, pct:27, color:"#69C9D0" },
  { name:"Facebook",  clicks:18200, pct:20, color:"#1877F2" },
  { name:"Twitter",   clicks: 9700, pct:11, color:"#1DA1F2" },
  { name:"LinkedIn",  clicks: 5400, pct: 6, color:"#0A66C2" },
];

function StatCard({ label, value, delta, positive, icon: Icon, color }: {
  label:string; value:string; delta:string; positive:boolean;
  icon:React.ElementType; color:string;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{color:"var(--text-muted)"}}>{label}</p>
          <p className="text-3xl font-bold tracking-tight" style={{color:"var(--text-primary)"}}>{value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${color}18`}}>
          <Icon size={18} style={{color}} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <TrendingUp size={13} style={{color: positive ? "var(--brand-secondary)" : "var(--accent-coral)"}} />
        <span className="text-sm font-medium" style={{color: positive ? "var(--brand-secondary)" : "var(--accent-coral)"}}>{delta}</span>
        <span className="text-xs" style={{color:"var(--text-muted)"}}>vs last month</span>
      </div>
      <div className="h-10 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData}>
            <defs>
              <linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#sg-${label})`} dot={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const activeCampaigns  = mockCampaigns.filter(c=>c.status==="active").length;
  const totalClicks      = mockLinks.reduce((s,l)=>s+l.clicks,0);
  const totalRevenue     = mockCampaigns.reduce((s,c)=>s+c.revenue,0);
  const totalConversions = mockCampaigns.reduce((s,c)=>s+c.conversions,0);

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Good morning, Jane 👋"
        actions={
          <div className="hidden sm:flex gap-2">
            <Link href="/links" className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white">
              <Link2 size={14}/> New Link
            </Link>
          </div>
        }
      />

      <div className="p-6 lg:p-8">
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{background:"#0fd3c3"}}/>
          <span className="text-xs font-medium" style={{color:"var(--text-muted)"}}>Live Dashboard · {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</span>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Campaigns" value={String(activeCampaigns)}                  delta="+2 this week" positive icon={Activity}           color="#6366f1"/>
          <StatCard label="Total Clicks"     value={totalClicks.toLocaleString()}             delta="+28.4%"       positive icon={MousePointerClick} color="#0fd3c3"/>
          <StatCard label="Conversions"      value={totalConversions.toLocaleString()}        delta="+19.2%"       positive icon={Zap}               color="#ffd166"/>
          <StatCard label="Revenue Driven"   value={`$${(totalRevenue/1000).toFixed(0)}K`}   delta="+41.7%"       positive icon={DollarSign}        color="#ff6b6b"/>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Platform breakdown */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold" style={{color:"var(--text-primary)"}}>Platform Breakdown</h2>
              <span className="text-xs" style={{color:"var(--text-muted)"}}>By clicks</span>
            </div>
            <div className="space-y-4">
              {platformStats.map(p=>(
                <div key={p.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{color:"var(--text-secondary)"}}>{p.name}</span>
                    <span style={{color:"var(--text-primary)"}}>{p.clicks.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{background:"var(--bg-overlay)"}}>
                    <div className="h-full rounded-full" style={{width:`${p.pct}%`,background:p.color}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top campaigns */}
          <div className="col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold" style={{color:"var(--text-primary)"}}>Top Campaigns</h2>
              <Link href="/analytics" className="text-xs font-medium flex items-center gap-1" style={{color:"var(--brand-primary)"}}>
                View all <ArrowUpRight size={12}/>
              </Link>
            </div>
            <div className="space-y-2">
              {mockCampaigns.slice(0,4).map(c=>(
                <div key={c.id} className="flex items-center gap-4 p-3 rounded-xl transition-colors" style={{background:"var(--glass)"}}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:c.status==="active"?"#0fd3c3":c.status==="paused"?"#ffd166":"#8888aa"}}/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{color:"var(--text-primary)"}}>{c.name}</div>
                    <div className="text-xs capitalize" style={{color:"var(--text-muted)"}}>{c.platform} · {c.type.replace("_"," ")}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={{color:"var(--text-primary)"}}>{c.clicks.toLocaleString()}</div>
                    <div className="text-xs" style={{color:"var(--text-muted)"}}>clicks</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={{color:"var(--brand-secondary)"}}>${(c.revenue/1000).toFixed(0)}K</div>
                    <div className="text-xs" style={{color:"var(--text-muted)"}}>revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick panels */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold" style={{color:"var(--text-primary)"}}>Recent Links</h2>
              <Link href="/links" className="text-xs" style={{color:"var(--brand-primary)"}}>View all →</Link>
            </div>
            <div className="space-y-0">
              {mockLinks.slice(0,4).map(l=>(
                <div key={l.id} className="flex items-center justify-between py-2.5 text-xs" style={{borderBottom:"1px solid var(--border)"}}>
                  <div>
                    <span className="font-mono font-medium" style={{color:"var(--brand-secondary)"}}>{l.shortUrl}</span>
                    <span className="ml-2 capitalize" style={{color:"var(--text-muted)"}}>{l.destination}</span>
                  </div>
                  <span style={{color:"var(--text-secondary)"}}>{l.clicks.toLocaleString()} clicks</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold" style={{color:"var(--text-primary)"}}>Recent Creatives</h2>
              <Link href="/campaigns" className="text-xs" style={{color:"var(--brand-primary)"}}>View all →</Link>
            </div>
            <div className="space-y-0">
              {mockCreatives.slice(0,4).map(c=>(
                <div key={c.id} className="flex items-center justify-between py-2.5 text-xs" style={{borderBottom:"1px solid var(--border)"}}>
                  <div>
                    <span className="font-medium" style={{color:"var(--text-primary)"}}>{c.title}</span>
                    <span className="ml-2 capitalize" style={{color:"var(--text-muted)"}}>{c.type}</span>
                  </div>
                  <span className={`badge-${c.status} px-2 py-0.5 rounded-full text-xs font-medium`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
