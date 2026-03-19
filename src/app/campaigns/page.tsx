"use client";
import { useState } from "react";
import { Plus, Search, Filter, Image, Film, LayoutTemplate, Layers, Check, Sparkles, Download, Eye } from "lucide-react";
import { mockCreatives, mockCampaigns } from "@/lib/data";
import { Creative } from "@/types";
import TopBar from "@/components/layout/TopBar";

const TYPE_ICONS: Record<string, React.ElementType> = {
  poster: Image, video: Film, story: Layers, banner: LayoutTemplate,
};
const TYPE_COLORS: Record<string, string> = {
  poster: "#6366f1", video: "#ff6b6b", story: "#0fd3c3", banner: "#ffd166",
};

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

function CreativeCard({ creative }: { creative: Creative }) {
  const Icon  = TYPE_ICONS[creative.type] || Image;
  const color = TYPE_COLORS[creative.type] || "#6366f1";
  return (
    <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer">
      <div className="relative h-44 flex items-center justify-center"
        style={{ background:`radial-gradient(ellipse at center,${color}14 0%,var(--bg-raised) 70%)` }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background:`${color}15`, border:`1px solid ${color}28` }}>
          <Icon size={28} style={{color}}/>
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white"
            style={{background:"rgba(255,255,255,0.18)"}}>
            <Eye size={13}/> Preview
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white"
            style={{background:"rgba(255,255,255,0.18)"}}>
            <Download size={13}/> Export
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`badge-${creative.status} px-2 py-0.5 rounded-full text-xs font-medium`}>{creative.status}</span>
        </div>
        <div className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium capitalize"
          style={{ background:`${color}15`, color, border:`1px solid ${color}22` }}>
          {creative.type}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 truncate" style={{color:"var(--text-primary)"}}>{creative.title}</h3>
        <p className="text-xs mb-3 truncate" style={{color:"var(--text-muted)"}}>{creative.campaignName}</p>
        <div className="flex items-center justify-between text-xs" style={{color:"var(--text-muted)"}}>
          <span>{creative.dimensions}</span>
          <span>{creative.fileSize}</span>
        </div>
        <div className="mt-1 text-xs" style={{color:"var(--text-muted)"}}>{creative.createdAt}</div>
      </div>
    </div>
  );
}

const dimensionMap: Record<string, Record<string,string>> = {
  poster: { instagram:"1080×1350", facebook:"1200×1500", linkedin:"1200×627", twitter:"1600×900", tiktok:"1080×1350" },
  story:  { instagram:"1080×1920", facebook:"1080×1920", tiktok:"1080×1920", twitter:"1080×1920", linkedin:"1080×1920" },
  banner: { instagram:"1080×566",  facebook:"1200×628",  linkedin:"1200×627", twitter:"1500×500",  tiktok:"1080×566" },
  video:  { instagram:"1080×1080", facebook:"1280×720",  tiktok:"1080×1920",  twitter:"1280×720",  linkedin:"1280×720" },
};

export default function CampaignsPage() {
  const [creatives,   setCreatives]   = useState<Creative[]>(mockCreatives);
  const [showForm,    setShowForm]    = useState(false);
  const [search,      setSearch]      = useState("");
  const [filterType,  setFilterType]  = useState("all");
  const [generating,  setGenerating]  = useState(false);
  const [generated,   setGenerated]   = useState(false);
  const [prompt,      setPrompt]      = useState("");
  const [form, setForm] = useState({ campaignId:mockCampaigns[0].id, type:"poster", platform:"instagram", title:"" });

  const filtered = creatives.filter(c => {
    const s = search.toLowerCase();
    return (c.title.toLowerCase().includes(s)||c.campaignName.toLowerCase().includes(s))
        && (filterType==="all" || c.type===filterType);
  });

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r=>setTimeout(r,2000));
    const campaign = mockCampaigns.find(c=>c.id===form.campaignId)!;
    const newCreative: Creative = {
      id: `cr${Date.now()}`,
      campaignId:   form.campaignId,
      campaignName: campaign.name,
      type:         form.type as Creative["type"],
      title:        form.title || `${campaign.name} ${form.type}`,
      platform:     form.platform,
      status:       "draft",
      thumbnail:    "",
      createdAt:    new Date().toISOString().slice(0,10),
      dimensions:   dimensionMap[form.type]?.[form.platform] || "1080×1080",
      fileSize:     form.type==="video"
                      ? `${(Math.random()*40+10).toFixed(1)} MB`
                      : `${(Math.random()*3+0.5).toFixed(1)} MB`,
    };
    setCreatives(p=>[newCreative,...p]);
    setGenerating(false); setGenerated(true);
    setTimeout(()=>{ setGenerated(false); setShowForm(false); },2000);
  };

  return (
    <>
      <TopBar
        title="Campaign Creatives"
        subtitle="Generate and manage posters, videos, stories and banners."
        actions={
          <button onClick={()=>setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white">
            <Plus size={15}/> New Creative
          </button>
        }
      />

      <div className="p-6 lg:p-8">

        {/* Generator */}
        {showForm && (
          <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-up"
            style={{ border:"1px solid rgba(99,102,241,0.3)" }}>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} style={{color:"#ffd166"}}/>
              <h2 className="text-base font-semibold gradient-text">AI Creative Generator</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Campaign</label>
                <select value={form.campaignId} onChange={e=>setForm(f=>({...f,campaignId:e.target.value}))}
                  className="input-dark w-full rounded-xl px-4 py-3 text-sm">
                  {mockCampaigns.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Title</label>
                <input placeholder="e.g. Summer Hero Poster" value={form.title}
                  onChange={e=>setForm(f=>({...f,title:e.target.value}))}
                  className="input-dark w-full rounded-xl px-4 py-3 text-sm"/>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Asset Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["poster","video","story","banner"].map(t=>{
                    const Icon = TYPE_ICONS[t];
                    return (
                      <button key={t} onClick={()=>setForm(f=>({...f,type:t}))}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm capitalize transition-all"
                        style={form.type===t
                          ? { background:"rgba(99,102,241,0.13)", border:"1px solid rgba(99,102,241,0.35)", color:"var(--brand-primary)" }
                          : { background:"var(--bg-raised)", border:"1px solid var(--border)", color:"var(--text-muted)" }}>
                        <Icon size={14}/> {t}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Platform</label>
                <div className="flex flex-wrap gap-2">
                  {["instagram","facebook","tiktok","twitter","linkedin"].map(p=>(
                    <FilterBtn key={p} active={form.platform===p} onClick={()=>setForm(f=>({...f,platform:p}))}>{p}</FilterBtn>
                  ))}
                </div>
                {form.type && form.platform && (
                  <p className="mt-2 text-xs" style={{color:"var(--text-muted)"}}>
                    Output: <span style={{color:"var(--text-secondary)"}}>{dimensionMap[form.type]?.[form.platform]||"1080×1080"}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Creative Brief</label>
              <textarea rows={3} placeholder="Describe the creative vision, tone, colours, key messages…"
                value={prompt} onChange={e=>setPrompt(e.target.value)}
                className="input-dark w-full rounded-xl px-4 py-3 text-sm resize-none"/>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleGenerate} disabled={generating||generated}
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60">
                {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Generating…</>
                  : generated ? <><Check size={16}/> Creative Added!</>
                  : <><Sparkles size={16}/> Generate Creative</>}
              </button>
              <button onClick={()=>setShowForm(false)} className="px-4 py-3 rounded-xl text-sm font-medium" style={{color:"var(--text-muted)"}}>Cancel</button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:"var(--text-muted)"}}/>
            <input placeholder="Search creatives…" value={search} onChange={e=>setSearch(e.target.value)}
              className="input-dark w-full rounded-xl pl-9 pr-4 py-2.5 text-sm"/>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={14} style={{color:"var(--text-muted)"}}/>
            {["all","poster","video","story","banner"].map(t=>(
              <FilterBtn key={t} active={filterType===t} onClick={()=>setFilterType(t)}>
                {t==="all"?"All Types":t}
              </FilterBtn>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(c=><CreativeCard key={c.id} creative={c}/>)}
        </div>
        {filtered.length===0 && (
          <div className="py-24 text-center" style={{color:"var(--text-muted)"}}>
            <Image size={32} className="mx-auto mb-3 opacity-25"/>
            <p className="text-sm">No creatives found.</p>
          </div>
        )}
        <p className="mt-6 text-xs" style={{color:"var(--text-muted)"}}>{filtered.length} creative{filtered.length!==1?"s":""} shown</p>
      </div>
    </>
  );
}
