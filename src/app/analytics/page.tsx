"use client";
import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from "recharts";
import { mockAnalytics, mockCampaigns, platformColors } from "@/lib/data";
import { TrendingUp, MousePointerClick, DollarSign, Target } from "lucide-react";
import TopBar from "@/components/layout/TopBar";

const PLATFORM_KEYS = ["instagram","twitter","facebook","tiktok","linkedin"];
const pieData = [
  { name:"Instagram", value:32800, color:"#E1306C" },
  { name:"TikTok",    value:24600, color:"#69C9D0" },
  { name:"Facebook",  value:18200, color:"#1877F2" },
  { name:"Twitter",   value: 9700, color:"#1DA1F2" },
  { name:"LinkedIn",  value: 5400, color:"#0A66C2" },
];

function CustomTooltip({ active, payload, label }: { active?:boolean; payload?:{color:string;name:string;value:number}[]; label?:string }) {
  if (!active||!payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-xs"
      style={{ background:"var(--bg-overlay)", border:"1px solid var(--border)", boxShadow:"var(--shadow-dropdown)" }}>
      <p className="font-semibold mb-2" style={{color:"var(--text-primary)"}}>{label}</p>
      {payload.map(p=>(
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{background:p.color}}/>
          <span style={{color:"var(--text-secondary)"}}>{p.name}:</span>
          <span className="font-medium" style={{color:"var(--text-primary)"}}>{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function RangeBtn({ active, onClick, children }: { active:boolean; onClick:()=>void; children:React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
      style={active
        ? { background:"var(--bg-overlay)", color:"var(--text-primary)" }
        : { color:"var(--text-muted)" }}>
      {children}
    </button>
  );
}

function MetricBtn({ active, onClick, children }: { active:boolean; onClick:()=>void; children:React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all"
      style={active
        ? { background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.35)", color:"var(--brand-primary)" }
        : { color:"var(--text-muted)" }}>
      {children}
    </button>
  );
}

export default function AnalyticsPage() {
  const [range,  setRange]  = useState("30d");
  const [metric, setMetric] = useState<"clicks"|"conversions"|"revenue">("clicks");

  const totalClicks      = mockAnalytics.reduce((s,d)=>s+d.clicks,0);
  const totalConversions = mockAnalytics.reduce((s,d)=>s+d.conversions,0);
  const totalRevenue     = mockAnalytics.reduce((s,d)=>s+d.revenue,0);
  const avgCVR           = ((totalConversions/totalClicks)*100).toFixed(1);

  const metricColor = metric==="clicks"?"#6366f1":metric==="conversions"?"#0fd3c3":"#ffd166";

  const campaignBarData = mockCampaigns.map(c=>({
    name:        c.name.split(" ").slice(0,2).join(" "),
    clicks:      c.clicks,
    conversions: c.conversions,
    revenue:     Math.round(c.revenue/1000),
  }));

  return (
    <>
      <TopBar
        title="Analytics"
        subtitle="Campaign performance across all channels."
        actions={
          <div className="flex items-center gap-1 p-1 rounded-xl"
            style={{ background:"var(--bg-raised)", border:"1px solid var(--border)" }}>
            {["7d","30d","90d"].map(r=>(
              <RangeBtn key={r} active={range===r} onClick={()=>setRange(r)}>{r}</RangeBtn>
            ))}
          </div>
        }
      />

      <div className="p-6 lg:p-8">

        {/* KPI row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Total Clicks",  value:totalClicks.toLocaleString(),             icon:MousePointerClick, color:"#6366f1", delta:"+28.4%" },
            { label:"Conversions",   value:totalConversions.toLocaleString(),        icon:Target,            color:"#0fd3c3", delta:"+19.2%" },
            { label:"Revenue",       value:`$${(totalRevenue/1000).toFixed(0)}K`,   icon:DollarSign,        color:"#ffd166", delta:"+41.7%" },
            { label:"Avg CVR",       value:`${avgCVR}%`,                             icon:TrendingUp,        color:"#ff6b6b", delta:"+2.1pp" },
          ].map(({label,value,icon:Icon,color,delta})=>(
            <div key={label} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{color:"var(--text-muted)"}}>{label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:`${color}15`}}>
                  <Icon size={14} style={{color}}/>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1" style={{color:"var(--text-primary)"}}>{value}</div>
              <div className="text-xs font-medium" style={{color:"var(--brand-secondary)"}}>{delta} this period</div>
            </div>
          ))}
        </div>

        {/* Main area chart */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold" style={{color:"var(--text-primary)"}}>Performance Over Time</h2>
            <div className="flex gap-2">
              {(["clicks","conversions","revenue"] as const).map(m=>(
                <MetricBtn key={m} active={metric===m} onClick={()=>setMetric(m)}>{m}</MetricBtn>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockAnalytics} margin={{top:5,right:5,bottom:0,left:0}}>
              <defs>
                <linearGradient id="g-metric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={metricColor} stopOpacity={0.28}/>
                  <stop offset="95%" stopColor={metricColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="date" tick={{fill:"var(--text-muted)",fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:"var(--text-muted)",fontSize:11}} axisLine={false} tickLine={false} width={50}
                tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}K`:v}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey={metric} stroke={metricColor} strokeWidth={2.5}
                fill="url(#g-metric)" dot={false} activeDot={{r:5,fill:metricColor}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie + stacked platform chart */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="col-span-2 glass-card rounded-2xl p-6">
            <h2 className="text-sm font-semibold mb-6" style={{color:"var(--text-primary)"}}>By Platform</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                  {pieData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip content={({active,payload})=>active&&payload?.length?(
                  <div className="rounded-lg px-3 py-2 text-xs"
                    style={{background:"var(--bg-overlay)",border:"1px solid var(--border)"}}>
                    <div style={{color:"var(--text-primary)"}}>{payload[0].name}</div>
                    <div style={{color:"var(--text-secondary)"}}>{(payload[0].value as number).toLocaleString()} clicks</div>
                  </div>
                ):null}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {pieData.map(p=>(
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{background:p.color}}/>
                    <span style={{color:"var(--text-secondary)"}}>{p.name}</span>
                  </div>
                  <span style={{color:"var(--text-primary)"}}>{p.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-3 glass-card rounded-2xl p-6">
            <h2 className="text-sm font-semibold mb-6" style={{color:"var(--text-primary)"}}>Platform Trends</h2>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={mockAnalytics} margin={{top:5,right:5,bottom:0,left:0}}>
                <defs>
                  {PLATFORM_KEYS.map(p=>(
                    <linearGradient key={p} id={`gp-${p}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={platformColors[p]} stopOpacity={0.22}/>
                      <stop offset="95%" stopColor={platformColors[p]} stopOpacity={0}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                <XAxis dataKey="date" tick={{fill:"var(--text-muted)",fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:"var(--text-muted)",fontSize:10}} axisLine={false} tickLine={false} width={38}/>
                <Tooltip content={<CustomTooltip/>}/>
                {PLATFORM_KEYS.map(p=>(
                  <Area key={p} type="monotone" dataKey={p} stroke={platformColors[p]} strokeWidth={1.5}
                    fill={`url(#gp-${p})`} dot={false} stackId="1"/>
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign bar chart */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-sm font-semibold mb-6" style={{color:"var(--text-primary)"}}>Campaign Comparison</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={campaignBarData} margin={{top:5,right:5,bottom:0,left:0}} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="name" tick={{fill:"var(--text-muted)",fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:"var(--text-muted)",fontSize:11}} axisLine={false} tickLine={false} width={50}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Legend wrapperStyle={{fontSize:"12px",color:"var(--text-muted)",paddingTop:"12px"}}/>
              <Bar dataKey="clicks"      fill="#6366f1" radius={[4,4,0,0]} maxBarSize={30}/>
              <Bar dataKey="conversions" fill="#0fd3c3" radius={[4,4,0,0]} maxBarSize={30}/>
              <Bar dataKey="revenue" name="revenue ($K)" fill="#ffd166" radius={[4,4,0,0]} maxBarSize={30}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
