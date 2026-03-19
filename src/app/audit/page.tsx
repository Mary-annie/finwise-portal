"use client";
import { useState } from "react";
import { Search, Filter, Link2, Image, BarChart2, User, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";
import TopBar from "@/components/layout/TopBar";

type LogEntry = {
  id: string; timestamp: string; user: string; avatar: string;
  action: string; type: "link"|"creative"|"campaign"|"analytics"|"system";
  resource: string; status: "success"|"warning"|"info"; detail: string;
};

const auditLogs: LogEntry[] = [
  { id:"a1",  timestamp:"2024-06-19 14:32:11", user:"Jane Doe",    avatar:"JD", action:"Generated Link",    type:"link",      resource:"go.brand.co/holiday",  status:"success", detail:"Smart link created for Holiday App Bundle → App Store" },
  { id:"a2",  timestamp:"2024-06-19 13:10:44", user:"Mark Rivera", avatar:"MR", action:"Approved Creative", type:"creative",  resource:"Holiday Promo 30s",    status:"success", detail:"Video creative approved and scheduled for Instagram" },
  { id:"a3",  timestamp:"2024-06-19 12:45:02", user:"Jane Doe",    avatar:"JD", action:"Exported Analytics",type:"analytics", resource:"Jun 2024 Report",      status:"info",    detail:"Analytics report exported as CSV for period Jun 1–19" },
  { id:"a4",  timestamp:"2024-06-18 17:22:39", user:"Sara Kim",    avatar:"SK", action:"Paused Campaign",   type:"campaign",  resource:"TikTok Viral Push",    status:"warning", detail:"Campaign paused due to budget cap reached" },
  { id:"a5",  timestamp:"2024-06-18 15:08:14", user:"Mark Rivera", avatar:"MR", action:"Generated Creative",type:"creative",  resource:"Enterprise Solution",  status:"success", detail:"LinkedIn poster generated for B2B Drive campaign" },
  { id:"a6",  timestamp:"2024-06-18 11:30:59", user:"Jane Doe",    avatar:"JD", action:"Generated Link",    type:"link",      resource:"go.brand.co/b2b-li",   status:"success", detail:"LinkedIn smart link created → brand.co/enterprise" },
  { id:"a7",  timestamp:"2024-06-17 09:55:28", user:"Sara Kim",    avatar:"SK", action:"Created Campaign",  type:"campaign",  resource:"Holiday App Bundle",   status:"success", detail:"New Instagram campaign created with app download objective" },
  { id:"a8",  timestamp:"2024-06-16 16:41:03", user:"Mark Rivera", avatar:"MR", action:"Generated Link",    type:"link",      resource:"go.brand.co/viral-tt", status:"success", detail:"TikTok smart link for Viral Push → Play Store" },
  { id:"a9",  timestamp:"2024-06-15 14:20:18", user:"Jane Doe",    avatar:"JD", action:"Updated UTM",       type:"link",      resource:"go.brand.co/svc-fb",   status:"info",    detail:"UTM parameters updated: medium changed from organic to paid" },
  { id:"a10", timestamp:"2024-06-14 10:05:47", user:"System",      avatar:"SY", action:"Auto-backup",       type:"system",    resource:"All Creatives",        status:"info",    detail:"Scheduled backup of 6 creative assets completed" },
  { id:"a11", timestamp:"2024-06-13 16:33:22", user:"Sara Kim",    avatar:"SK", action:"Archived Creative", type:"creative",  resource:"Old Banner v1",        status:"warning", detail:"Creative archived after campaign ended" },
  { id:"a12", timestamp:"2024-06-12 09:14:05", user:"Jane Doe",    avatar:"JD", action:"Generated Link",    type:"link",      resource:"go.brand.co/app-ig-gp",status:"success", detail:"Instagram smart link for Summer Launch → Play Store" },
];

const TYPE_ICONS: Record<string, React.ElementType> = {
  link:Link2, creative:Image, campaign:BarChart2, analytics:BarChart2, system:Info,
};
const TYPE_COLORS: Record<string, string> = {
  link:"#6366f1", creative:"#0fd3c3", campaign:"#ffd166", analytics:"#ff6b6b", system:"#8888aa",
};
const STATUS_ICONS = { success:CheckCircle, warning:AlertCircle, info:Info };
const STATUS_COLORS = { success:"#0d9e92", warning:"#b45309", info:"#6366f1" };

function FilterBtn({ active, onClick, children }: { active:boolean; onClick:()=>void; children:React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
      style={active
        ? { background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.4)", color:"var(--brand-primary)" }
        : { background:"var(--bg-raised)", border:"1px solid var(--border)", color:"var(--text-muted)" }}>
      {children}
    </button>
  );
}

export default function AuditPage() {
  const [search,       setSearch]       = useState("");
  const [filterType,   setFilterType]   = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = auditLogs.filter(l => {
    const s = search.toLowerCase();
    const matchSearch = l.action.toLowerCase().includes(s)||l.resource.toLowerCase().includes(s)||
      l.user.toLowerCase().includes(s)||l.detail.toLowerCase().includes(s);
    return matchSearch&&(filterType==="all"||l.type===filterType)&&(filterStatus==="all"||l.status===filterStatus);
  });

  const grouped: Record<string, LogEntry[]> = {};
  filtered.forEach(l=>{ const d=l.timestamp.split(" ")[0]; if(!grouped[d])grouped[d]=[]; grouped[d].push(l); });

  return (
    <>
      <TopBar
        title="Audit Log"
        subtitle="Full history of generated links, creatives, and team actions."
      />

      <div className="p-6 lg:p-8">

        {/* Summary cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Total Events",   value:auditLogs.length,                                         color:"#6366f1" },
            { label:"Links Generated",value:auditLogs.filter(l=>l.type==="link").length,              color:"#0fd3c3" },
            { label:"Creatives Made", value:auditLogs.filter(l=>l.type==="creative").length,          color:"#ffd166" },
            { label:"Team Members",   value:[...new Set(auditLogs.map(l=>l.user))].length,            color:"#ff6b6b" },
          ].map(({label,value,color})=>(
            <div key={label} className="glass-card rounded-2xl p-5">
              <div className="text-2xl font-bold mb-1" style={{color}}>{value}</div>
              <div className="text-xs font-medium" style={{color:"var(--text-muted)"}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:"var(--text-muted)"}}/>
            <input placeholder="Search logs…" value={search} onChange={e=>setSearch(e.target.value)}
              className="input-dark w-full rounded-xl pl-9 pr-4 py-2.5 text-sm"/>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={14} style={{color:"var(--text-muted)"}}/>
            {["all","link","creative","campaign","analytics","system"].map(t=>(
              <FilterBtn key={t} active={filterType===t} onClick={()=>setFilterType(t)}>
                {t==="all"?"All Types":t}
              </FilterBtn>
            ))}
          </div>
          <div className="flex gap-2">
            {["all","success","warning","info"].map(s=>(
              <FilterBtn key={s} active={filterStatus===s} onClick={()=>setFilterStatus(s)}>
                {s==="all"?"All Status":s}
              </FilterBtn>
            ))}
          </div>
        </div>

        {/* Timeline groups */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([date,logs])=>(
            <div key={date}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold" style={{color:"var(--text-muted)"}}>
                  <Clock size={12}/>
                  {new Date(date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
                </div>
                <div className="flex-1 h-px" style={{background:"var(--border)"}}/>
                <span className="text-xs" style={{color:"var(--text-muted)"}}>{logs.length} events</span>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full data-table">
                    <thead>
                      <tr>
                        <th className="text-left" style={{width:110}}>Time</th>
                        <th className="text-left" style={{width:130}}>User</th>
                        <th className="text-left" style={{width:90}}>Type</th>
                        <th className="text-left" style={{width:160}}>Action</th>
                        <th className="text-left" style={{width:180}}>Resource</th>
                        <th className="text-left">Detail</th>
                        <th className="text-left" style={{width:90}}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map(log=>{
                        const TypeIcon   = TYPE_ICONS[log.type]||Info;
                        const typeColor  = TYPE_COLORS[log.type]||"#9898be";
                        const StatusIcon = STATUS_ICONS[log.status];
                        const statusColor= STATUS_COLORS[log.status];
                        return (
                          <tr key={log.id}>
                            <td>
                              <span className="font-mono text-xs" style={{color:"var(--text-muted)"}}>
                                {log.timestamp.split(" ")[1]}
                              </span>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                                  style={{ background:log.user==="System"?"var(--bg-overlay)":"linear-gradient(135deg,#6366f1,#0fd3c3)", color:"#fff", fontSize:9 }}>
                                  {log.avatar}
                                </div>
                                <span className="text-xs" style={{color:"var(--text-secondary)"}}>{log.user}</span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-1.5">
                                <TypeIcon size={12} style={{color:typeColor}}/>
                                <span className="text-xs capitalize" style={{color:typeColor}}>{log.type}</span>
                              </div>
                            </td>
                            <td><span className="text-sm font-medium" style={{color:"var(--text-primary)"}}>{log.action}</span></td>
                            <td><span className="font-mono text-xs" style={{color:"var(--brand-secondary)"}}>{log.resource}</span></td>
                            <td><span className="text-xs" style={{color:"var(--text-muted)"}}>{log.detail}</span></td>
                            <td>
                              <div className="flex items-center gap-1">
                                <StatusIcon size={13} style={{color:statusColor}}/>
                                <span className="text-xs capitalize" style={{color:statusColor}}>{log.status}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length===0 && (
          <div className="py-24 text-center" style={{color:"var(--text-muted)"}}>
            <User size={32} className="mx-auto mb-3 opacity-25"/>
            <p className="text-sm">No log entries match your filters.</p>
          </div>
        )}
        <p className="mt-6 text-xs" style={{color:"var(--text-muted)"}}>{filtered.length} log entr{filtered.length!==1?"ies":"y"} shown</p>
      </div>
    </>
  );
}
