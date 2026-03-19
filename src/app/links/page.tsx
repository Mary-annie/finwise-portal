"use client";
import { useState } from "react";
import { Link2, Copy, ExternalLink, Plus, Check, Smartphone, Globe, Apple, Play, Filter, Search } from "lucide-react";
import { mockLinks, mockCampaigns } from "@/lib/data";
import { GeneratedLink } from "@/types";
import TopBar from "@/components/layout/TopBar";

const PLATFORMS = ["all","instagram","twitter","facebook","tiktok","linkedin"];
const DESTINATIONS = [
  { value:"appstore",  label:"App Store",  icon:Apple  },
  { value:"playstore", label:"Play Store", icon:Play   },
  { value:"website",   label:"Website",    icon:Globe  },
  { value:"custom",    label:"Custom URL", icon:Link2  },
];

function PlatformBadge({ platform }: { platform: string }) {
  const colors: Record<string,string> = {
    instagram:"#E1306C", twitter:"#1DA1F2", facebook:"#1877F2",
    tiktok:"#69C9D0", linkedin:"#0A66C2", all:"#6366f1",
  };
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
      style={{ background:`${colors[platform]||"#6366f1"}18`, color:colors[platform]||"#6366f1" }}>
      {platform === "all" ? "All Platforms" : platform}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <button onClick={copy} className="p-1.5 rounded-lg transition-all"
      style={{ color:copied?"var(--brand-secondary)":"var(--text-muted)", background:copied?"rgba(15,211,195,0.1)":"transparent" }}>
      {copied ? <Check size={14}/> : <Copy size={14}/>}
    </button>
  );
}

function FilterBtn({ active, onClick, children }: { active:boolean; onClick:()=>void; children:React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={active
        ? { background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.4)", color:"var(--brand-primary)" }
        : { background:"var(--bg-raised)", border:"1px solid var(--border)", color:"var(--text-muted)" }}>
      {children}
    </button>
  );
}

export default function LinksPage() {
  const [links,          setLinks]          = useState<GeneratedLink[]>(mockLinks);
  const [showForm,       setShowForm]       = useState(false);
  const [search,         setSearch]         = useState("");
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [generating,     setGenerating]     = useState(false);
  const [generated,      setGenerated]      = useState(false);

  const [form, setForm] = useState({
    campaignId:  mockCampaigns[0].id,
    platform:    "instagram",
    destination: "appstore",
    customUrl:   "",
  });

  const filtered = links.filter(l => {
    const s = search.toLowerCase();
    const matchSearch = l.shortUrl.toLowerCase().includes(s) || l.campaignName.toLowerCase().includes(s);
    return matchSearch && (filterPlatform === "all" || l.platform === filterPlatform);
  });

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r=>setTimeout(r,1500));
    const campaign = mockCampaigns.find(c=>c.id===form.campaignId)!;
    const slug = campaign.name.toLowerCase().replace(/\s+/g,"-").slice(0,10);
    const newLink: GeneratedLink = {
      id: `l${Date.now()}`,
      campaignId:   form.campaignId,
      campaignName: campaign.name,
      platform:     form.platform as GeneratedLink["platform"],
      destination:  form.destination as GeneratedLink["destination"],
      shortUrl:     `go.brand.co/${slug}-${form.platform.slice(0,2)}`,
      originalUrl:  form.destination==="appstore" ? "https://apps.apple.com/app/brand"
                  : form.destination==="playstore" ? "https://play.google.com/store/apps/brand"
                  : form.customUrl||"https://brand.co",
      clicks:    0,
      createdAt: new Date().toISOString().slice(0,10),
      utm: { source:form.platform, medium:"social", campaign:slug },
    };
    setLinks(p=>[newLink,...p]);
    setGenerating(false);
    setGenerated(true);
    setTimeout(()=>{ setGenerated(false); setShowForm(false); }, 2000);
  };

  return (
    <>
      <TopBar
        title="Smart Links"
        subtitle="Generate tracked deep links for every platform and destination."
        actions={
          <button onClick={()=>setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white">
            <Plus size={15}/> Generate Link
          </button>
        }
      />

      <div className="p-6 lg:p-8">

        {/* Generator form */}
        {showForm && (
          <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-up"
            style={{ border:"1px solid rgba(99,102,241,0.3)" }}>
            <h2 className="text-base font-semibold mb-6 gradient-text">New Tracked Link</h2>
            <div className="grid grid-cols-2 gap-6">

              {/* Campaign */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Campaign</label>
                <select value={form.campaignId} onChange={e=>setForm(f=>({...f,campaignId:e.target.value}))}
                  className="input-dark w-full rounded-xl px-4 py-3 text-sm appearance-none cursor-pointer">
                  {mockCampaigns.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {/* Platform */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Platform</label>
                <div className="flex flex-wrap gap-2">
                  {["instagram","twitter","facebook","tiktok","linkedin","all"].map(p=>(
                    <FilterBtn key={p} active={form.platform===p} onClick={()=>setForm(f=>({...f,platform:p}))}>
                      {p==="all"?"All":p}
                    </FilterBtn>
                  ))}
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Destination</label>
                <div className="grid grid-cols-2 gap-2">
                  {DESTINATIONS.map(({value,label,icon:Icon})=>(
                    <button key={value} onClick={()=>setForm(f=>({...f,destination:value}))}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all"
                      style={form.destination===value
                        ? { background:"rgba(99,102,241,0.13)", border:"1px solid rgba(99,102,241,0.35)", color:"var(--brand-primary)" }
                        : { background:"var(--bg-raised)", border:"1px solid var(--border)", color:"var(--text-muted)" }}>
                      <Icon size={14}/> {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* UTM preview */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>UTM Preview</label>
                <div className="rounded-xl px-4 py-3 font-mono text-xs leading-loose"
                  style={{ background:"var(--bg-overlay)", border:"1px solid var(--border)", color:"var(--text-secondary)" }}>
                  <div><span style={{color:"var(--text-muted)"}}>utm_source=</span><span style={{color:"var(--brand-secondary)"}}>{form.platform}</span></div>
                  <div><span style={{color:"var(--text-muted)"}}>utm_medium=</span><span style={{color:"var(--brand-secondary)"}}>social</span></div>
                  <div><span style={{color:"var(--text-muted)"}}>utm_campaign=</span>
                    <span style={{color:"var(--brand-secondary)"}}>
                      {mockCampaigns.find(c=>c.id===form.campaignId)?.name.toLowerCase().replace(/\s+/g,"-").slice(0,18)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {form.destination==="custom" && (
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{color:"var(--text-muted)"}}>Custom URL</label>
                <input type="url" placeholder="https://…" value={form.customUrl}
                  onChange={e=>setForm(f=>({...f,customUrl:e.target.value}))}
                  className="input-dark w-full rounded-xl px-4 py-3 text-sm"/>
              </div>
            )}

            <div className="flex items-center gap-3 mt-6">
              <button onClick={handleGenerate} disabled={generating||generated}
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60">
                {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Generating…</>
                  : generated ? <><Check size={16}/> Link Created!</>
                  : <><Smartphone size={16}/> Generate Smart Link</>}
              </button>
              <button onClick={()=>setShowForm(false)} className="px-4 py-3 rounded-xl text-sm font-medium"
                style={{color:"var(--text-muted)"}}>Cancel</button>
            </div>
          </div>
        )}

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:"var(--text-muted)"}}/>
            <input placeholder="Search links…" value={search} onChange={e=>setSearch(e.target.value)}
              className="input-dark w-full rounded-xl pl-9 pr-4 py-2.5 text-sm"/>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={14} style={{color:"var(--text-muted)"}}/>
            {PLATFORMS.map(p=>(
              <FilterBtn key={p} active={filterPlatform===p} onClick={()=>setFilterPlatform(p)}>
                {p==="all"?"All":p}
              </FilterBtn>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th className="text-left">Short URL</th>
                  <th className="text-left">Campaign</th>
                  <th className="text-left">Platform</th>
                  <th className="text-left">Destination</th>
                  <th className="text-right">Clicks</th>
                  <th className="text-left">Created</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(link=>(
                  <tr key={link.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium" style={{color:"var(--brand-secondary)"}}>{link.shortUrl}</span>
                        <CopyButton text={`https://${link.shortUrl}`}/>
                      </div>
                    </td>
                    <td><span className="text-sm" style={{color:"var(--text-secondary)"}}>{link.campaignName}</span></td>
                    <td><PlatformBadge platform={link.platform}/></td>
                    <td>
                      <span className="text-sm capitalize flex items-center gap-1.5" style={{color:"var(--text-secondary)"}}>
                        {link.destination==="appstore"  && <Apple  size={12}/>}
                        {link.destination==="playstore" && <Play   size={12}/>}
                        {link.destination==="website"   && <Globe  size={12}/>}
                        {link.destination}
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="text-sm font-semibold" style={{color:"var(--text-primary)"}}>{link.clicks.toLocaleString()}</span>
                    </td>
                    <td><span className="text-xs" style={{color:"var(--text-muted)"}}>{link.createdAt}</span></td>
                    <td>
                      <a href={`https://${link.shortUrl}`} target="_blank" rel="noreferrer"
                        className="p-1.5 rounded-lg inline-flex transition-all hover:bg-black/5" style={{color:"var(--text-muted)"}}>
                        <ExternalLink size={14}/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length===0 && (
            <div className="py-16 text-center" style={{color:"var(--text-muted)"}}>
              <Link2 size={28} className="mx-auto mb-3 opacity-20"/>
              <p className="text-sm">No links match your search.</p>
            </div>
          )}
        </div>
        <p className="mt-4 text-xs" style={{color:"var(--text-muted)"}}>{filtered.length} link{filtered.length!==1?"s":""} shown</p>
      </div>
    </>
  );
}
