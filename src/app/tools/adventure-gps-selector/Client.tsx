"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const },
];

const ADVENTURES = [
  {
    id:"hiking",
    label:"Hiking & Backpacking",
    icon:"🥾",
    desc:"Trails, mountains, national parks",
    devices:[
      { name:"Garmin GPSMAP 67", price:"$399", badge:"Best Overall Hiking GPS", badgeColor:"bg-green-600", features:["Multi-GNSS with quad-helix antenna","Topographic maps preloaded","100-hour battery life (AA batteries)","BirdsEye satellite imagery compatible","Paperless geocaching","IPX7 waterproof"], pros:["Most accurate hiking GPS available","AA batteries — never stuck without power","Works worldwide","Large memory for detailed maps"], cons:["Heavier than some options","Higher price"], bestFor:"Serious hikers, backpackers, geocachers who want the most reliable unit" },
      { name:"Garmin eTrex 32x", price:"$199", badge:"Best Value Hiking GPS", badgeColor:"bg-blue-600", features:["3-axis compass and barometric altimeter","Worldwide basemap included","MicroSD for extra maps","8 GB internal storage","25-hour battery life","IPX7 waterproof"], pros:["Half the price of GPSMAP 67","Lightweight and compact","AA batteries","Great for beginners"], cons:["Smaller screen","Less accurate than GPSMAP 67"], bestFor:"Day hikers, beginners, budget-conscious outdoor enthusiasts" },
      { name:"Garmin inReach Mini 2", price:"$349", badge:"Best for Safety & SOS", badgeColor:"bg-red-600", features:["Two-way satellite messaging","SOS button with 24/7 monitoring","GPS + GLONASS tracking","Track sharing with family","Works anywhere with no cell signal","1.23-inch display"], pros:["Works anywhere on Earth with satellite","SOS sends your GPS location to rescuers","Family can follow your location live"], cons:["Small screen — pairs with phone","Requires monthly subscription ($14.99+)"], bestFor:"Solo hikers, remote backpackers who need emergency communication" },
    ]
  },
  {
    id:"hunting",
    label:"Hunting",
    icon:"🦌",
    desc:"Deer stands, property lines, dog tracking",
    devices:[
      { name:"Garmin Alpha 300i", price:"$799", badge:"Best Dog Tracking GPS", badgeColor:"bg-amber-600", features:["Track up to 20 dogs simultaneously","Maps dog locations on screen","Bark alerts and status indicators","Two-way messaging via satellite","Rugged waterproof design","Compatible with Garmin dog collars"], pros:["Industry standard for dog tracking","Track dogs across miles of terrain","Real-time location updates"], cons:["Expensive","Requires Garmin dog collar (additional cost)"], bestFor:"Bird hunters, hound hunters, anyone hunting with dogs" },
      { name:"Garmin Montana 700i", price:"$699", badge:"Best All-Around Hunting GPS", badgeColor:"bg-orange-600", features:["5.5-inch glove-friendly touchscreen","Preloaded BirdsEye satellite imagery","Hunt/Fish calendar with solar noon","inReach satellite communication","Topographic maps","20-hour battery life"], pros:["Large screen easy to read outdoors","Built-in satellite communicator","Excellent maps for hunting areas","Hunt/fish calendar built in"], cons:["Expensive","Larger and heavier"], bestFor:"Serious hunters who want large screen, satellite communication, and detailed maps" },
      { name:"Garmin GPSMAP 67i", price:"$499", badge:"Best Budget Hunting GPS with SOS", badgeColor:"bg-green-700", features:["inReach satellite messaging + SOS","Topographic maps","Multi-GNSS accuracy","BirdsEye satellite imagery","Waypoint marking","AA batteries"], pros:["SOS safety + hunting GPS in one","AA batteries last forever","Best accuracy available"], cons:["No touchscreen","Subscription needed for messaging"], bestFor:"Hunters who want accurate navigation plus emergency communication safety" },
    ]
  },
  {
    id:"fishing",
    label:"Fishing",
    icon:"🎣",
    desc:"Mark fishing spots, navigate lakes and rivers",
    devices:[
      { name:"Garmin GPSMAP 86sc", price:"$399", badge:"Best Handheld Fishing GPS", badgeColor:"bg-blue-600", features:["BlueChart g3 coastal maps preloaded","Floats if dropped overboard","3-axis compass","Marine-grade waterproof","Barometric altimeter","BirdsEye satellite imagery"], pros:["Floats in water — essential for boats","Preloaded marine charts","Best marine GPS on the market","Connects to Garmin chartplotters"], cons:["Expensive","Overkill for simple lake fishing"], bestFor:"Saltwater and offshore anglers, serious boating fishermen" },
      { name:"Garmin eTrex 32x", price:"$199", badge:"Best Budget Fishing GPS", badgeColor:"bg-cyan-600", features:["Mark fishing hotspots as waypoints","Topographic and basemap included","MicroSD for extra lake maps","25-hour battery life","Compact and lightweight","IPX7 waterproof"], pros:["Affordable","Reliable for marking spots","Works for both land and water"], cons:["No marine charts","Doesn't float"], bestFor:"Freshwater anglers, lake and river fishermen who want to mark spots" },
      { name:"Garmin Striker Plus 5cv", price:"$279", badge:"Best Fish Finder with GPS", badgeColor:"bg-indigo-600", features:["Built-in GPS chartplotter","ClearVü scanning sonar","CHIRP traditional sonar","Quickdraw Contours mapping","5-inch screen","Boat-mount unit"], pros:["See fish AND navigate","Create your own contour maps","Excellent sonar imaging"], cons:["Boat-mounted only","Not handheld"], bestFor:"Anglers who want GPS navigation AND fish-finding sonar on their boat" },
    ]
  },
  {
    id:"boating",
    label:"Boating & Sailing",
    icon:"⛵",
    desc:"Coastal navigation, chartplotting, sailing",
    devices:[
      { name:"Garmin GPSMAP 86sc", price:"$399", badge:"Best Marine Handheld GPS", badgeColor:"bg-blue-700", features:["BlueChart g3 coastal charts","Floats if dropped overboard","Barometric altimeter","Connect to Garmin marine equipment","GLONASS + GPS + Galileo","Wireless connectivity"], pros:["The gold standard marine handheld","Floats — essential for boating","Professional-grade charts"], cons:["High price","Complex feature set"], bestFor:"Offshore sailors, coastal cruisers, serious recreational boaters" },
      { name:"Garmin ECHOMAP UHD 93sv", price:"$699", badge:"Best Chartplotter for Boaters", badgeColor:"bg-cyan-700", features:["9-inch touchscreen chartplotter","Preloaded Navionics+ charts","Ultra High-Definition sonar","LiveScope compatible","NMEA 2000 network ready","Detailed coastal mapping"], pros:["Large clear display","Best charts available","Full navigation suite","Advanced sonar compatible"], cons:["Fixed mount only — for boats","Complex to set up"], bestFor:"Boat owners who want a full navigation station on their vessel" },
      { name:"Garmin Quatix 8 Watch", price:"$649", badge:"Best Sailing Smartwatch", badgeColor:"bg-teal-600", features:["Marine navigation on your wrist","Sail racing assistance","Boat data streaming","Tidal info and weather","Anchor alarm","MOB (man overboard) button"], pros:["Navigation on your wrist — hands free","Designed specifically for sailing","Weather and tide data"], cons:["Watch format — small screen","Expensive"], bestFor:"Sailors and marine enthusiasts who want wrist-worn marine navigation" },
    ]
  },
  {
    id:"offroad",
    label:"Off-Road & Overlanding",
    icon:"🚙",
    desc:"4x4, ATV, overlanding, backcountry driving",
    devices:[
      { name:"Garmin Overlander", price:"$699", badge:"Best Off-Road GPS", badgeColor:"bg-amber-700", features:["7-inch touchscreen","TopoActive off-road maps","BirdsEye satellite imagery","Compatible with Garmin inReach","Multiple vehicle routing profiles","Topo elevation profiles"], pros:["Built for vehicles — dashboard mounted","Huge screen for off-road navigation","Off-road specific routing","Works with trailers and ATVs"], cons:["Vehicle-mounted only","Large unit"], bestFor:"Overlanders, 4x4 drivers, anyone needing off-road navigation in their vehicle" },
      { name:"Garmin Montana 700i", price:"$699", badge:"Best Multi-Use Off-Road GPS", badgeColor:"bg-orange-700", features:["5.5-inch touchscreen","Waterproof and shock-resistant","TopoActive maps","inReach satellite communicator","ATV/UTV vehicle profile","Multi-GNSS accuracy"], pros:["Works on foot AND in vehicle","Satellite SOS anywhere","Rugged enough for anything"], cons:["Expensive","Battery life shorter in GPS mode"], bestFor:"Off-road riders who go on foot to explore — ATV, motorcycle, hiking combo" },
      { name:"Garmin GPSMAP 67", price:"$399", badge:"Best Handheld for Off-Road Hiking", badgeColor:"bg-green-700", features:["Topographic maps","100-hour battery (AA batteries)","Multi-GNSS accuracy","BirdsEye satellite imagery","IPX7 waterproof","Rugged construction"], pros:["AA batteries never leave you stranded","Best navigation accuracy","Trusted by serious adventurers"], cons:["No in-vehicle mounting options","Smaller screen"], bestFor:"Off-road hikers who park their 4x4 and explore on foot" },
    ]
  },
  {
    id:"cycling",
    label:"Cycling & Mountain Biking",
    icon:"🚴",
    desc:"Trail riding, road cycling, bike touring",
    devices:[
      { name:"Garmin Edge 840", price:"$499", badge:"Best Cycling GPS", badgeColor:"bg-green-600", features:["Trail-ready touchscreen","Cycling-specific maps","Turn-by-turn navigation","Heart rate and power meter compatible","Climb Pro feature","15-hour battery life"], pros:["Built specifically for cycling","Excellent turn-by-turn for bike roads","Advanced performance metrics"], cons:["Cycling-only — not hiking use"], bestFor:"Road cyclists, mountain bikers, gravel riders who want cycling-specific navigation" },
      { name:"Garmin Fenix 8", price:"$799", badge:"Best Multi-Sport Watch for Cycling", badgeColor:"bg-purple-600", features:["Color topographic maps on wrist","Cycling + hiking + running profiles","Solar charging","Multi-GNSS accuracy","Heart rate + power meter","16 days battery in smartwatch mode"], pros:["Navigation + fitness tracking in one","Works for cycling, hiking, and running","Solar charging extends battery massively"], cons:["Very expensive","Complex to learn all features"], bestFor:"Serious athletes who cycle, hike, and run and want one premium device" },
    ]
  },
];

export default function Client() {
  const [stage, setStage] = useState<"select"|"devices"|"lead"|"results">("select");
  const [selectedAdventure, setSelectedAdventure] = useState<typeof ADVENTURES[0] | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<typeof ADVENTURES[0]["devices"][0] | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, brand:"Garmin", issue: `Adventure GPS — ${selectedAdventure?.label} — Top Pick: ${selectedDevice?.name}`, source:"adventure-gps-selector" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("select"); setSelectedAdventure(null); setSelectedDevice(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Adventure GPS Selector</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Tool · 3 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Adventure GPS<br/><span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent italic">Selector</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Hiking, hunting, fishing, boating, or off-road? Select your outdoor adventure and we'll show the exact GPS devices built for it — with full feature comparison and honest pros and cons.</p>
          <div className="flex flex-wrap gap-5">{[{icon:"🥾",t:"Hiking"},{icon:"🦌",t:"Hunting"},{icon:"🎣",t:"Fishing"},{icon:"⛵",t:"Boating"},{icon:"🚙",t:"Off-Road"},{icon:"🚴",t:"Cycling"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage === "select" && (
            <motion.div key="select" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400"/>
              <div className="p-8 md:p-10">
                <h2 className="text-2xl font-black text-white mb-2">What's your outdoor adventure? 🌲</h2>
                <p className="text-zinc-400 text-base mb-6">Select your activity and we'll show the best GPS devices specifically built for it.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {ADVENTURES.map(adv => (
                    <motion.button key={adv.id} whileTap={{scale:0.96}} onClick={()=>{setSelectedAdventure(adv);setStage("devices");}}
                      className="p-7 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-green-500 hover:bg-green-900/20 transition-all flex flex-col items-center gap-3 text-center">
                      <div className="text-5xl">{adv.icon}</div>
                      <div className="font-black text-white text-base">{adv.label}</div>
                      <div className="text-zinc-400 text-sm">{adv.desc}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {stage === "devices" && selectedAdventure && (
            <motion.div key="devices" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="space-y-6">
              <div className="flex items-center justify-between p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-3"><div className="text-3xl">{selectedAdventure.icon}</div><div><div className="font-black text-white">{selectedAdventure.label} GPS Devices</div><div className="text-zinc-400 text-sm">{selectedAdventure.devices.length} top options compared</div></div></div>
                <button onClick={()=>setStage("select")} className="text-zinc-400 hover:text-white text-sm font-bold transition-colors">← Change</button>
              </div>
              {selectedAdventure.devices.map((device, i) => (
                <motion.div key={device.name} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400"/>
                  <div className="p-8">
                    {i===0&&(<div className="flex items-center gap-2 mb-4"><Star size={16} className="text-amber-400 fill-amber-400"/><span className="text-amber-400 font-black text-sm uppercase tracking-widest">Top Pick</span></div>)}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div><h3 className="text-2xl font-black text-white mb-2">{device.name}</h3><span className={`${device.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{device.badge}</span></div>
                      <div className="text-3xl font-black text-green-400 shrink-0">{device.price}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Key Features</div>
                        <div className="space-y-2">{device.features.map(f=>(<div key={f} className="flex items-center gap-2 text-sm text-zinc-300 font-medium"><CheckCircle2 size={14} className="text-green-400 shrink-0"/>{f}</div>))}</div>
                      </div>
                      <div>
                        <div className="grid grid-cols-1 gap-4">
                          <div><div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>{device.pros.map(p=>(<div key={p} className="text-sm text-zinc-400 font-medium mb-1">• {p}</div>))}</div>
                          <div><div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>{device.cons.map(c=>(<div key={c} className="text-sm text-zinc-400 font-medium mb-1">• {c}</div>))}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-900/20 border border-green-800 rounded-xl p-4 mb-5">
                      <p className="text-sm text-green-300 font-medium">🎯 Best for: {device.bestFor}</p>
                    </div>
                    <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>{setSelectedDevice(device);setStage("lead");}}
                      className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
                      Get Details + Buying Guide for This GPS <ArrowRight size={18}/>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {stage === "lead" && selectedDevice && (
            <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400"/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-8"><div className="text-6xl mb-4">🌲</div><h2 className="text-2xl font-black text-white mb-3">Get your free buying guide!</h2><p className="text-zinc-400 font-medium text-lg">Receive the full {selectedDevice.name} buying guide + setup tips sent to your email.</p></div>
                <div className="bg-zinc-800 rounded-2xl p-5 mb-6"><div className="font-black text-white text-lg mb-1">{selectedDevice.name}</div><div className="text-zinc-400">{selectedDevice.badge} · {selectedDevice.price}</div></div>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600"/></div></div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:"Send My Free GPS Guide"}</motion.button>
                <button onClick={()=>setStage("devices")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">← Back to compare all options</button>
              </div>
            </motion.div>
          )}

          {stage === "results" && selectedDevice && (
            <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Guide sent to {email}!</p></div>)}
              <div className="bg-zinc-900 rounded-[2rem] border-2 border-green-800 p-8">
                <div className="flex items-center gap-3 mb-4"><Star size={20} className="text-amber-400 fill-amber-400"/><span className="font-black text-amber-400 uppercase tracking-widest text-sm">Your Chosen GPS Device</span></div>
                <h2 className="text-3xl font-black text-white mb-2">{selectedDevice.name}</h2>
                <p className="text-zinc-400 text-base mb-4">{selectedDevice.bestFor}</p>
                <div className="space-y-2 mb-6">{selectedDevice.features.map(f=>(<div key={f} className="flex items-center gap-2 text-base text-zinc-300 font-medium"><CheckCircle2 size={16} className="text-green-400 shrink-0"/>{f}</div>))}</div>
                <div className="text-4xl font-black text-green-400">{selectedDevice.price}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Start Over</button>
                <Link href="/tools/road-trip-checker"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Road Trip Pre-Check</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices are approximate. Not affiliated with Garmin or any GPS manufacturer.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
