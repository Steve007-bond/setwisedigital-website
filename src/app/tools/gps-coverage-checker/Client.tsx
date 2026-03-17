"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const REGIONS = [
  { id:"usa-city",    label:"US cities & suburbs",          icon:"🏙️", flag:"🇺🇸", desc:"Major metro areas, interstate highways" },
  { id:"usa-rural",   label:"Rural USA — back roads",        icon:"🌾", flag:"🇺🇸", desc:"Small towns, country roads, farmland" },
  { id:"usa-alaska",  label:"Alaska",                        icon:"🌲", flag:"🇺🇸", desc:"Remote terrain, limited roads" },
  { id:"canada-city", label:"Canadian cities & provinces",   icon:"🏙️", flag:"🇨🇦", desc:"Toronto, Vancouver, Calgary, Montreal" },
  { id:"canada-rural",label:"Rural Canada",                  icon:"🌲", flag:"🇨🇦", desc:"Country roads, small towns, farm provinces" },
  { id:"canada-north",label:"Northern Canada & territories", icon:"🏔️", flag:"🇨🇦", desc:"Yukon, NWT, Nunavut, remote North" },
  { id:"both",        label:"Both USA and Canada",           icon:"🌎", flag:"🇺🇸🇨🇦", desc:"Cross-border travel" },
];

const BRANDS = [
  { id:"garmin-drivesmart", label:"Garmin DriveSmart 55/65/76", emoji:"🔵" },
  { id:"garmin-drive",      label:"Garmin Drive 53",             emoji:"🟢" },
  { id:"tomtom",            label:"TomTom GO",                   emoji:"🔴" },
  { id:"garmin-rv",         label:"Garmin RV 795/895",          emoji:"🟠" },
  { id:"garmin-outdoor",    label:"Garmin GPSMAP 67 (outdoor)",  emoji:"🟤" },
  { id:"factory",           label:"Factory built-in car GPS",    emoji:"🚗" },
];

type CoverageLevel = "excellent" | "good" | "partial" | "limited" | "none";

const COVERAGE: Record<string, Record<string, { level: CoverageLevel; detail: string; steps: { id: string; icon: string; title: string; detail: string; actionLabel: string }[]; cost: string }>> = {
  "garmin-drivesmart": {
    "usa-city":     { level:"excellent", cost:"Included free",    detail:"Full coverage of all US cities, highways, interstates. Updated quarterly via Wi-Fi. This is Garmin's strongest area — you'll never have a coverage gap in any US city or suburb.", steps:[] },
    "usa-rural":    { level:"excellent", cost:"Included free",    detail:"Garmin's North America maps include all rural US roads. Back roads, county routes, and unpaved tracks are all included. Updates come regularly and cover rural road changes well.", steps:[] },
    "usa-alaska":   { level:"good",      cost:"Included free",    detail:"Alaska is included in Garmin's North America map package. Major roads and towns have excellent coverage. Very remote tracks and trails may not be mapped — consider a dedicated outdoor GPS for backcountry Alaska.", steps:[] },
    "canada-city":  { level:"excellent", cost:"Included free",    detail:"Full Canadian province and city coverage included in the standard North America package. Toronto, Vancouver, Calgary, Ottawa, Montreal — all fully mapped with current data.", steps:[] },
    "canada-rural": { level:"good",      cost:"Included free",    detail:"Most rural Canadian roads are included. Highway networks, provincial roads, and municipal roads are all mapped. Very remote resource roads and forestry tracks may have gaps.", steps:[] },
    "canada-north": { level:"partial",   cost:"Included — but limited", detail:"The Yukon, Northwest Territories, and Nunavut have very limited road networks — and Garmin's maps reflect reality: there simply aren't many roads to map. What exists is mapped, but expect significant uncharted territory. Pair with a dedicated outdoor GPS for northern travel.", steps:[
      { id:"north1", icon:"🗺️", title:"Confirm your route exists on Google Maps first",    detail:"Before relying on your car GPS, verify your intended route on Google Maps or Apple Maps. If the route shows on both, your Garmin will navigate it. If it doesn't show on Google Maps, it won't show on your Garmin either.", actionLabel:"Route confirmed ✓" },
      { id:"north2", icon:"📱", title:"Download offline maps for your route",               detail:"In Google Maps: tap your profile → Offline Maps → Select area → download before you leave cell coverage. This gives a reliable backup alongside your GPS.", actionLabel:"Offline maps downloaded ✓" },
      { id:"north3", icon:"🆘", title:"Consider a Garmin inReach for remote northern travel", detail:"In the northern territories, getting lost means being very far from help. The Garmin inReach Mini 2 ($349 + subscription) works by satellite anywhere on Earth — a genuine safety net for remote northern Canada.", actionLabel:"Safety option noted ✓" },
    ] },
    "both":         { level:"excellent", cost:"Included free",    detail:"Garmin DriveSmart models include complete North America maps covering all US states and Canadian provinces. No extra purchase needed for cross-border travel. Just drive across the border.", steps:[] },
  },
  "garmin-drive": {
    "usa-city":     { level:"excellent", cost:"Included free", detail:"Full US city coverage. Same North America map package as the DriveSmart models. Updates require connecting to a computer with Garmin Express (no built-in Wi-Fi on this model).", steps:[] },
    "usa-rural":    { level:"excellent", cost:"Included free", detail:"Complete rural US road coverage included. Updates via Garmin Express on a computer.", steps:[] },
    "usa-alaska":   { level:"good",      cost:"Included free", detail:"Alaska included in North America package. Main roads and communities mapped.", steps:[] },
    "canada-city":  { level:"excellent", cost:"Included free", detail:"All Canadian provinces and cities fully covered in the North America map package.", steps:[] },
    "canada-rural": { level:"good",      cost:"Included free", detail:"Rural Canadian roads covered. Resource roads and very remote tracks may be incomplete.", steps:[] },
    "canada-north": { level:"partial",   cost:"Limited — few roads exist", detail:"Northern territories mapped where roads exist, but the road network is extremely sparse. Same limitations apply as for any car GPS in this region.", steps:[
      { id:"nd1", icon:"📱", title:"Backup with downloaded offline maps", detail:"Download Google Maps offline for your specific route before departure. In areas with no roads, a satellite communicator is the only navigation option.", actionLabel:"Backup ready ✓" },
    ] },
    "both":         { level:"excellent", cost:"Included free", detail:"Full North America coverage including US and Canada. No separate map purchase needed.", steps:[] },
  },
  "tomtom": {
    "usa-city":     { level:"excellent", cost:"Included free", detail:"TomTom's North America maps are excellent for US cities — strong routing, good POI database, live traffic via the device's built-in SIM (on premium models).", steps:[] },
    "usa-rural":    { level:"good",      cost:"Included free", detail:"Rural US coverage is solid on TomTom. Less rural detail than Garmin on some very minor roads, but primary and secondary roads are well covered.", steps:[] },
    "usa-alaska":   { level:"good",      cost:"Included free", detail:"Alaska included in North America maps. Coverage quality similar to Garmin on main routes.", steps:[] },
    "canada-city":  { level:"excellent", cost:"Included free", detail:"Canadian cities fully covered. TomTom updates quarterly and city data is very current.", steps:[] },
    "canada-rural": { level:"good",      cost:"Included free", detail:"Good rural Canadian coverage. Some minor rural roads may have less detail than Garmin.", steps:[] },
    "canada-north": { level:"partial",   cost:"Limited",       detail:"Northern Canada mapped where roads exist. Same real-world limitation: very few roads to navigate.", steps:[
      { id:"tn1", icon:"🌐", title:"Verify routes via TomTom Route Planner website", detail:"Visit mydrive.tomtom.com to plan and verify your route before departure. This shows exactly what TomTom has mapped for your specific journey.", actionLabel:"Route verified ✓" },
    ] },
    "both":         { level:"excellent", cost:"Included free", detail:"TomTom GO models include North America maps. Cross-border US-Canada travel is seamlessly supported.", steps:[] },
  },
  "garmin-rv": {
    "usa-city":     { level:"excellent", cost:"Included free", detail:"Full US city coverage with RV-specific routing — low bridges flagged, weight restrictions included, truck routes available. RV-optimised maps of all US cities.", steps:[] },
    "usa-rural":    { level:"excellent", cost:"Included free", detail:"Complete rural US coverage with RV routing. Height and weight restrictions flagged on rural roads where data exists.", steps:[] },
    "usa-alaska":   { level:"good",      cost:"Included free", detail:"Alaska covered in North America RV maps. Main highways and RV routes mapped. Very remote tracks not mapped — use caution.", steps:[] },
    "canada-city":  { level:"excellent", cost:"Included free", detail:"Full Canadian city coverage with RV routing. Campground database includes Canadian provincial parks and KOA locations.", steps:[] },
    "canada-rural": { level:"good",      cost:"Included free", detail:"Rural Canadian roads covered with RV routing. Bridge clearance data available where Garmin has collected it.", steps:[
      { id:"crv1", icon:"⚠️", title:"Always verify bridge heights independently", detail:"No GPS database is 100% complete for bridge clearances. Before crossing any unfamiliar bridge or underpass in your RV, get out and check the clearance sign physically. Your GPS is a guide, not a guarantee.", actionLabel:"Safety check understood ✓" },
    ] },
    "canada-north": { level:"partial",   cost:"Included — limited roads", detail:"Few roads exist in the northern territories. What's mapped is in the database, but practical RV travel in the far north is extremely limited by road availability.", steps:[] },
    "both":         { level:"excellent", cost:"Included free", detail:"Full North America RV coverage including US and Canada. Campground database covers both countries. Cross-border routing supported.", steps:[] },
  },
  "garmin-outdoor": {
    "usa-city":     { level:"good",      cost:"Basemap included — TopoActive recommended", detail:"The GPSMAP 67 includes a basemap showing major roads. For detailed US city navigation, the TopoActive North America map ($29.99) adds detailed street data. Most outdoor users don't need city navigation on this device.", steps:[] },
    "usa-rural":    { level:"excellent", cost:"TopoActive included on some models", detail:"This is where the GPSMAP 67 excels — detailed topographic maps of all US terrain. Trails, elevation contours, backcountry routes. Far more detailed than any car GPS for off-road use.", steps:[] },
    "usa-alaska":   { level:"excellent", cost:"Included in TopoActive",             detail:"Alaska is fully covered in Garmin's TopoActive outdoor maps — topographic detail, trails, waterways, terrain. The GPSMAP 67 is the ideal device for Alaskan backcountry.", steps:[] },
    "canada-city":  { level:"good",      cost:"Basemap only",                       detail:"Canadian cities show on the basemap but without street-level detail. For city navigation in Canada, a dedicated car GPS is more appropriate.", steps:[] },
    "canada-rural": { level:"excellent", cost:"TopoActive Canada recommended",      detail:"Rural Canada is where this device shines — trails, topographic detail, watercourses, and terrain all mapped in detail. Essential for backcountry Canada travel.", steps:[
      { id:"cr1", icon:"🗺️", title:"Download TopoActive Canada maps", detail:"In Garmin Express on your computer, look for the TopoActive Canada map package. This adds detailed topographic mapping of all Canadian provinces and territories. One-time purchase or included depending on your model.", actionLabel:"Maps downloaded ✓" },
    ] },
    "canada-north": { level:"excellent", cost:"TopoActive Canada included",        detail:"Northern Canada is where the GPSMAP 67 is genuinely irreplaceable — satellite terrain detail, remote trail data, and the ability to navigate where no roads exist. Pair with inReach for communication.", steps:[
      { id:"cn1", icon:"🛰️", title:"Consider pairing with Garmin inReach", detail:"In northern Canada, the GPSMAP 67 gives you navigation — but the Garmin inReach Mini 2 gives you emergency communication. Together, they're the complete remote Canada safety kit.", actionLabel:"Understood ✓" },
    ] },
    "both":         { level:"excellent", cost:"TopoActive North America", detail:"Full topographic coverage of USA and Canada. Trails, terrain, backcountry routes all included. The definitive outdoor GPS for North American wilderness.", steps:[] },
  },
  "factory": {
    "usa-city":     { level:"good",     cost:"Paid update $149–$299", detail:"Factory GPS covers US cities well at purchase — but maps age quickly. A 3-year-old factory GPS may show outdated road layouts in rapidly developing cities.", steps:[
      { id:"fc1", icon:"🔍", title:"Check your current map version date", detail:"Press Navigation on your car's screen → Settings → Map Version or About. Note the map date shown. If it's over 2 years old, an update is worth considering.", actionLabel:"Map date checked ✓" },
      { id:"fc2", icon:"🛒", title:"Find your map update on your manufacturer's website", detail:"Visit your car manufacturer's website (Honda, Toyota, BMW, Ford etc.) and search for 'navigation map update'. Or ask your dealer. Updates cost $149–$299 and come on a USB drive or SD card.", actionLabel:"Update found ✓" },
    ] },
    "usa-rural":    { level:"good",     cost:"Included in map update", detail:"Rural US roads included but may lag behind new developments. Rural road changes are less frequent, so older factory maps are often adequate for rural areas.", steps:[] },
    "usa-alaska":   { level:"partial",  cost:"Varies by manufacturer", detail:"Alaska coverage varies significantly by car manufacturer. Some include it, some don't. Check your specific vehicle's map documentation or ask your dealer.", steps:[] },
    "canada-city":  { level:"good",     cost:"Paid update — Canada often separate", detail:"Many US car manufacturers sell Canada maps separately or as part of a North America package. Check if your factory GPS includes Canada — some US market vehicles don't include Canadian maps by default.", steps:[
      { id:"fcc1", icon:"📞", title:"Call your dealer to confirm Canada coverage", detail:"Ask specifically: 'Does my factory navigation include Canadian maps?' and 'What's the map version date?' Your dealer can check this for your specific vehicle's VIN.", actionLabel:"Canada coverage confirmed ✓" },
    ] },
    "canada-rural": { level:"partial",  cost:"Varies", detail:"Rural Canadian coverage on factory GPS systems is inconsistent — depends heavily on your car manufacturer and when your maps were last updated.", steps:[] },
    "canada-north": { level:"limited",  cost:"Mostly unmapped", detail:"Northern Canada is largely unmapped on factory GPS systems — and for good reason, as few roads exist. For northern territory travel, a dedicated GPS and satellite communicator are essential.", steps:[
      { id:"fn1", icon:"🆘", title:"Plan northern Canada travel with specialist tools", detail:"For Yukon, NWT, or Nunavut travel: use a Garmin outdoor GPS with TopoActive Canada maps, carry a satellite communicator (Garmin inReach), and always inform someone of your route and expected return.", actionLabel:"Understood ✓" },
    ] },
    "both":         { level:"good",     cost:"North America package $199–$299", detail:"Cross-border US-Canada coverage is available from most manufacturers as a North America map package. Check your vehicle's current maps first — you may already have Canada included.", steps:[
      { id:"fb1", icon:"🔍", title:"Check if Canada is already included on your GPS", detail:"Navigation → Settings → Map Info on your factory GPS. Look for 'Canada' or 'North America' in the map name. If it says 'United States only', you'll need to purchase the North America upgrade.", actionLabel:"Coverage checked ✓" },
    ] },
  },
};

const LEVEL_CONFIG: Record<CoverageLevel, { label: string; color: string; border: string; bg: string; text: string; dot: string }> = {
  excellent: { label:"Excellent Coverage", color:"from-green-500 to-emerald-400", border:"border-green-700", bg:"bg-green-900/20", text:"text-green-300", dot:"bg-green-400" },
  good:      { label:"Good Coverage",      color:"from-blue-500 to-indigo-400",  border:"border-blue-700",  bg:"bg-blue-900/20",  text:"text-blue-300",  dot:"bg-blue-400"  },
  partial:   { label:"Partial Coverage",   color:"from-amber-500 to-orange-400", border:"border-amber-700", bg:"bg-amber-900/20", text:"text-amber-300", dot:"bg-amber-400" },
  limited:   { label:"Limited Coverage",   color:"from-red-500 to-rose-400",     border:"border-red-700",   bg:"bg-red-900/20",   text:"text-red-300",   dot:"bg-red-400"   },
  none:      { label:"No Coverage",        color:"from-zinc-600 to-zinc-500",    border:"border-zinc-700",  bg:"bg-zinc-800/50",  text:"text-zinc-400",  dot:"bg-zinc-500"  },
};

export default function Client() {
  const [region, setRegion] = useState<string|null>(null);
  const [brand, setBrand] = useState<string|null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const coverage = region && brand ? COVERAGE[brand]?.[region] : null;
  const levelCfg = coverage ? LEVEL_CONFIG[coverage.level] : null;

  const toggleStep = (id: string) =>
    setCompletedSteps(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, issue: `Coverage Check — Region: ${region}, Brand: ${brand}, Level: ${coverage?.level}`, source: "gps-coverage-checker" }) }); } catch {}
    setSubmitted(true); setSubmitting(false);
  };
  const reset = () => { setRegion(null); setBrand(null); setCompletedSteps(new Set()); setName(""); setEmail(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[75vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">GPS Coverage Checker</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14} /> Pick Region + GPS Brand · Instant Coverage Truth
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Does My GPS Cover</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent italic">Where I'm Driving?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Pick your region and your GPS brand — get an honest coverage verdict for USA, Canada, rural areas, and the far north. No guesswork, no marketing speak.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16 space-y-8">

        {/* Region picker */}
        <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-400" />
          <div className="p-7">
            <h2 className="text-xl font-black text-white mb-5">Step 1 — Where are you driving? 📍</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REGIONS.map((r, i) => (
                <motion.button key={r.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} whileTap={{ scale: 0.97 }}
                  onClick={() => { setRegion(r.id); setCompletedSteps(new Set()); }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${region === r.id ? "border-cyan-500 bg-cyan-900/20 shadow-lg" : "border-zinc-700 bg-zinc-800/50 hover:border-cyan-700"}`}>
                  <div className="text-3xl">{r.flag}</div>
                  <div className="flex-1">
                    <div className="font-black text-white text-base">{r.label}</div>
                    <div className="text-zinc-400 text-xs">{r.desc}</div>
                  </div>
                  {region === r.id && <CheckCircle2 size={18} className="text-cyan-400 shrink-0" />}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Brand picker */}
        <AnimatePresence>
          {region && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-400" />
              <div className="p-7">
                <h2 className="text-xl font-black text-white mb-5">Step 2 — Which GPS do you have? 🗺️</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BRANDS.map((b, i) => (
                    <motion.button key={b.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} whileTap={{ scale: 0.97 }}
                      onClick={() => { setBrand(b.id); setCompletedSteps(new Set()); }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${brand === b.id ? "border-cyan-500 bg-cyan-900/20 shadow-lg" : "border-zinc-700 bg-zinc-800/50 hover:border-cyan-700"}`}>
                      <div className="text-3xl">{b.emoji}</div>
                      <div className="font-black text-white text-base">{b.label}</div>
                      {brand === b.id && <CheckCircle2 size={18} className="text-cyan-400 shrink-0 ml-auto" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coverage result */}
        <AnimatePresence>
          {coverage && levelCfg && (
            <motion.div key={`${region}-${brand}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">

              <div className={`rounded-[2rem] border-2 ${levelCfg.border} bg-zinc-900 overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${levelCfg.color}`} />
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black mb-3 ${levelCfg.bg} ${levelCfg.text} border ${levelCfg.border}`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${levelCfg.dot}`} />
                        {levelCfg.label}
                      </div>
                      <h2 className="text-2xl font-black text-white mb-1">{BRANDS.find(b=>b.id===brand)?.label}</h2>
                      <div className="text-zinc-400 font-medium">{REGIONS.find(r=>r.id===region)?.label}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm text-zinc-400 font-medium">Map cost</div>
                      <div className={`font-black text-lg ${levelCfg.text}`}>{coverage.cost}</div>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-base font-medium leading-relaxed">{coverage.detail}</p>
                </div>
              </div>

              {/* Action steps if any */}
              {coverage.steps.length > 0 && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className={`h-1.5 bg-gradient-to-r ${levelCfg.color}`} />
                  <div className="p-7">
                    <h3 className="text-xl font-black text-white mb-5">Recommended steps for your situation 📋</h3>
                    <div className="space-y-3">
                      {coverage.steps.map((step, i) => {
                        const done = completedSteps.has(step.id);
                        return (
                          <motion.div key={step.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                            className={`rounded-2xl border-2 transition-all ${done ? "border-green-600 bg-green-900/10" : `${levelCfg.border} bg-zinc-800/50`}`}>
                            <div className="p-5">
                              <div className="flex items-start gap-4 mb-4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${done ? "bg-green-500" : `bg-gradient-to-br ${levelCfg.color}`}`}>
                                  {done ? <CheckCircle2 size={18} className="text-white" /> : <span className="text-white">{i + 1}</span>}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-xl">{step.icon}</span>
                                    <span className={`font-black text-base ${done ? "text-zinc-400 line-through" : "text-white"}`}>{step.title}</span>
                                  </div>
                                  <p className="text-sm text-zinc-400 font-medium leading-relaxed">{step.detail}</p>
                                </div>
                              </div>
                              <motion.button whileTap={{ scale: 0.97 }} onClick={() => toggleStep(step.id)}
                                className={`w-full py-3.5 rounded-xl font-black text-sm transition-all ${done ? "bg-zinc-800 text-zinc-500 border border-zinc-700" : `bg-gradient-to-r ${levelCfg.color} text-white shadow-md`}`}>
                                {done ? "✓ Done — tap to undo" : step.actionLabel}
                              </motion.button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Lead */}
              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                  <h3 className="text-xl font-black text-white mb-2">Save your coverage report 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Get this coverage check emailed to you for reference.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">
                    {submitting ? <Loader2 size={22} className="animate-spin" /> : "Save My Coverage Report"}
                  </motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400" /><p className="font-bold text-green-300">Sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20} />Check Different Region</button>
                <Link href="/tools/gps-budget-finder"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Budget Finder</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Coverage assessments are general — verify specific route coverage on your device before any critical journey. Not affiliated with Garmin, TomTom, or any manufacturer.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
}
