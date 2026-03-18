"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, ArrowRight, Star, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const TRIP_TYPES = [
  { id:"day", label:"Day Trip", icon:"☀️", desc:"Under 10 hours — back to the car or charger same day", hours:10, color:"from-green-500 to-emerald-400", border:"border-green-700", bg:"bg-green-900/20", text:"text-green-300" },
  { id:"overnight", label:"Overnight Trip", icon:"🌙", desc:"1–2 nights away from any power source", hours:36, color:"from-blue-500 to-indigo-400", border:"border-blue-700", bg:"bg-blue-900/20", text:"text-blue-300" },
  { id:"weekend", label:"Full Weekend", icon:"🏕️", desc:"2–3 days in the backcountry", hours:72, color:"from-purple-500 to-violet-400", border:"border-purple-700", bg:"bg-purple-900/20", text:"text-purple-300" },
  { id:"multi-day", label:"Multi-Day Expedition", icon:"🏔️", desc:"4–7 days — fully off-grid", hours:168, color:"from-amber-500 to-orange-400", border:"border-amber-700", bg:"bg-amber-900/20", text:"text-amber-300" },
  { id:"extended", label:"Extended Backcountry", icon:"🌲", desc:"7+ days or full hunting/hiking season", hours:999, color:"from-red-500 to-rose-400", border:"border-red-700", bg:"bg-red-900/20", text:"text-red-300" },
];

const GPS_DEVICES = [
  { name:"Garmin DriveSmart 55/65", battery:2, batteryNote:"2 hours unplugged — needs car charger to operate", type:"car", icon:"🚗", badge:"Car GPS", badgeColor:"bg-blue-600", tripTypes:["day"], bestFor:"Day drivers only — always plugged into car power", solarOption:false, batteryTips:["Always keep plugged into car charger while navigating","Carry a USB power bank for short breaks"], chargerNeeded:true },
  { name:"Garmin eTrex 32x", battery:25, batteryNote:"Up to 25 hours on 2 AA batteries", type:"handheld", icon:"📟", badge:"Entry Outdoor", badgeColor:"bg-green-600", tripTypes:["day","overnight","weekend"], bestFor:"Day hikes and overnight trips. Lightweight and simple.", solarOption:false, batteryTips:["Use Energizer Lithium AA batteries — last 3x longer than alkaline","Reduce screen brightness to extend battery significantly","Turn off Bluetooth if not using"], chargerNeeded:false },
  { name:"Garmin GPSMAP 67", battery:100, batteryNote:"Up to 100 hours on 2 AA batteries", type:"handheld", icon:"🗺️", badge:"Best All-Round Outdoor", badgeColor:"bg-blue-600", tripTypes:["day","overnight","weekend","multi-day"], bestFor:"Weekend trips, multi-day backpacking, and hunting expeditions up to 4 days without changing batteries.", solarOption:false, batteryTips:["Use Energizer Lithium AA batteries for maximum life","Expedition tracking mode extends battery significantly","Carry a spare set of AA batteries as backup"], chargerNeeded:false },
  { name:"Garmin inReach Mini 2", battery:14, batteryNote:"Up to 14 days in 10-minute tracking mode", type:"communicator", icon:"🛰️", badge:"Satellite + GPS", badgeColor:"bg-purple-600", tripTypes:["day","overnight","weekend","multi-day"], bestFor:"Outdoor adventures needing two-way messaging and SOS. 14 days tracking + requires subscription.", solarOption:false, batteryTips:["Use 10-minute tracking mode for maximum battery life","Turn off Bluetooth when not using the app","1-second tracking drops battery to 13 hours — avoid unless needed"], chargerNeeded:false },
  { name:"Garmin GPSMAP 66i", battery:35, batteryNote:"Up to 35 hours continuous use — rechargeable + GPS + satellite", type:"communicator", icon:"🗺️", badge:"Best Outdoor All-in-One", badgeColor:"bg-indigo-600", tripTypes:["day","overnight","weekend","multi-day"], bestFor:"Hikers and hunters who want full GPS maps, two-way messaging, and SOS in one device without needing a phone.", solarOption:false, batteryTips:["Carry a 10,000mAh USB power bank — recharges the device fully","Expedition mode extends battery to 200+ hours","AA battery pack accessory available for field recharging"], chargerNeeded:false },
  { name:"Garmin Montana 700i", battery:18, batteryNote:"18 hours continuous — rechargeable — includes satellite messaging", type:"communicator", icon:"📱", badge:"Large Screen + Satellite", badgeColor:"bg-violet-600", tripTypes:["day","overnight","weekend"], bestFor:"Hunters and off-road drivers who want the large Montana screen plus inReach satellite communication.", solarOption:false, batteryTips:["Carry a USB power bank for multi-day trips","Turn screen brightness down when not actively navigating","Pair with solar charger panel for extended trips"], chargerNeeded:false },
  { name:"Garmin Fenix 8 Solar", battery:48, batteryNote:"Up to 48 days with solar in smartwatch mode", type:"watch", icon:"⌚", badge:"Solar + Extended Life", badgeColor:"bg-amber-600", tripTypes:["day","overnight","weekend","multi-day","extended"], bestFor:"Long-distance thru-hikers, endurance athletes, and anyone who wants GPS on their wrist for weeks without recharging.", solarOption:true, batteryTips:["Solar charging extends battery in good sunlight by 15–30%","GPS mode uses more battery than smartwatch mode","Multi-GNSS mode uses more battery than GPS-only — use GPS-only if you don't need it"], chargerNeeded:false },
  { name:"Garmin GPSMAP 67 + AA Lithium", battery:100, batteryNote:"100+ hours with Energizer Lithium AA — carry spares for unlimited range", type:"handheld", icon:"🔋", badge:"Best for Extended Backcountry", badgeColor:"bg-red-600", tripTypes:["day","overnight","weekend","multi-day","extended"], bestFor:"Week-long hunts, extended backcountry expeditions. AA lithium batteries are available everywhere and last far longer than rechargeable.", solarOption:false, batteryTips:["Carry 2 spare sets of AA Lithium batteries — that's 300+ hours total","Batteries available at any outdoor store or gas station in the field","Works in extreme cold where rechargeable batteries fail"], chargerNeeded:false },
];

export default function Client() {
  const [selectedTrip, setSelectedTrip] = useState<typeof TRIP_TYPES[0] | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const getMatches = () => {
    if (!selectedTrip) return [];
    return GPS_DEVICES.filter(d => d.tripTypes.includes(selectedTrip.id));
  };

  const validate = () => { const e: Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate())return;setSubmitting(true);
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email, issue:`Battery Checker — Trip: ${selectedTrip?.label}`,source:"gps-battery-checker"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setSelectedTrip(null);setName("");setEmail("");setSubmitted(false);};

  const matches = getMatches();

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS Battery Life Checker</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Tell Us Your Trip · See What Lasts
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Which GPS Has the</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent italic">Battery Life You Need?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Tell us how long you'll be away from any power source — see exactly which GPS devices will last the distance, plus honest battery tips for each one.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        {/* Trip type selector */}
        <div className="mb-10">
          <h2 className="text-2xl font-black text-white mb-3 text-center">How long will you be away from any charger?</h2>
          <p className="text-zinc-400 text-base text-center mb-6">Pick the closest match to your typical trip</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRIP_TYPES.map((trip, i) => (
              <motion.button key={trip.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.07*i}} whileTap={{scale:0.97}}
                onClick={() => setSelectedTrip(trip)}
                className={`p-7 rounded-[2rem] border-2 text-left transition-all duration-200 ${selectedTrip?.id === trip.id ? `${trip.border} ${trip.bg} shadow-xl` : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}>
                <div className="text-4xl mb-4">{trip.icon}</div>
                <h3 className="font-black text-white text-xl mb-1">{trip.label}</h3>
                <div className={`text-sm font-bold mb-3 ${selectedTrip?.id === trip.id ? trip.text : "text-zinc-500"}`}>{trip.hours < 999 ? `Up to ${trip.hours} hours` : "7+ days"}</div>
                <p className="text-zinc-400 text-sm font-medium">{trip.desc}</p>
                {selectedTrip?.id === trip.id && <motion.div initial={{scale:0}} animate={{scale:1}} className="mt-3"><CheckCircle2 size={18} className="text-green-400"/></motion.div>}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedTrip && (
            <motion.div key={selectedTrip.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-5">
              <div className={`rounded-2xl border ${selectedTrip.border} ${selectedTrip.bg} p-5 flex items-center gap-4`}>
                <div className="text-3xl">{selectedTrip.icon}</div>
                <div>
                  <div className={`font-black text-base ${selectedTrip.text}`}>{selectedTrip.label} — {selectedTrip.hours < 999 ? `up to ${selectedTrip.hours} hours` : "7+ days"}</div>
                  <div className="text-zinc-300 text-sm font-medium">{matches.length} GPS device{matches.length !== 1 ? "s" : ""} will reliably handle this trip</div>
                </div>
              </div>

              {matches.length === 0 && (
                <div className="bg-amber-900/20 border border-amber-700 rounded-[2rem] p-8 text-center">
                  <AlertCircle size={32} className="text-amber-400 mx-auto mb-4"/>
                  <h3 className="text-xl font-black text-white mb-3">No standard GPS handles this trip length on one charge</h3>
                  <p className="text-zinc-300 text-base font-medium">For truly extended expeditions, the solution is the Garmin GPSMAP 67 with spare AA lithium batteries — each set lasts 100+ hours and they're available everywhere.</p>
                </div>
              )}

              <div className="space-y-5">
                {matches.map((device, i) => (
                  <motion.div key={device.name} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.08*i}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                    <div className={`h-1.5 bg-gradient-to-r ${selectedTrip.color}`}/>
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          {i===0&&<div className="flex items-center gap-2 mb-2"><Star size={14} className="text-amber-400 fill-amber-400"/><span className="text-sm font-black text-amber-400 uppercase tracking-widest">Top Pick for This Trip</span></div>}
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{device.icon}</span>
                            <h3 className="text-xl font-black text-white">{device.name}</h3>
                          </div>
                          <span className={`text-xs font-black text-white px-2.5 py-1.5 rounded-full ${device.badgeColor || "bg-blue-600"}`}>{device.badge}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={`text-3xl font-black ${selectedTrip.text}`}>{device.battery < 100 ? `${device.battery}h` : "100h+"}</div>
                          <div className="text-zinc-400 text-xs mt-1">battery life</div>
                        </div>
                      </div>
                      <div className={`p-4 rounded-xl ${selectedTrip.bg} border ${selectedTrip.border} mb-4`}>
                        <div className={`text-xs font-black uppercase tracking-widest mb-1 ${selectedTrip.text}`}>Battery Details</div>
                        <p className="text-sm text-zinc-300 font-medium">{device.batteryNote}</p>
                      </div>
                      <p className="text-base text-zinc-300 font-medium leading-relaxed mb-4">{device.bestFor}</p>
                      {device.solarOption && (<div className="flex items-center gap-2 mb-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-xl"><span className="text-lg">☀️</span><span className="text-sm text-yellow-300 font-bold">Solar charging — extends battery in sunlight</span></div>)}
                      {device.chargerNeeded && (<div className="flex items-center gap-2 mb-4 p-3 bg-red-900/20 border border-red-700 rounded-xl"><AlertCircle size={14} className="text-red-400 shrink-0"/><span className="text-sm text-red-300 font-medium">Requires constant car charger connection for outdoor use</span></div>)}
                      <div>
                        <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">Battery Tips</div>
                        {device.batteryTips.map((tip,j)=>(<div key={j} className="flex items-start gap-2 text-sm text-zinc-400 font-medium mb-1.5"><CheckCircle2 size={13} className="text-green-400 shrink-0 mt-0.5"/>{tip}</div>))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                  <h3 className="text-xl font-black text-white mb-2">Get this list by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Save your matched GPS list + battery tips for your {selectedTrip.label}.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My GPS List"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Different Trip</button>
                <Link href="/tools/adventure-gps-selector"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Adventure GPS Selector</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Battery life figures are manufacturer estimates under ideal conditions. Cold weather significantly reduces battery life. Not affiliated with Garmin.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
