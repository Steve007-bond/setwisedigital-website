"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, ArrowRight, AlertCircle, DollarSign } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const GPS_DEVICES = [
  { id:"drive53", name:"Garmin Drive 53", price:99, mapUpdateType:"lifetime", mapUpdateCost:0, mapUpdateNote:"Free lifetime maps included", subscription:0, subscriptionNote:"No subscription needed", category:"car", badge:"Entry Level" },
  { id:"drivesmart55", name:"Garmin DriveSmart 55", price:169, mapUpdateType:"lifetime", mapUpdateCost:0, mapUpdateNote:"Free lifetime maps via Wi-Fi", subscription:0, subscriptionNote:"No subscription needed", category:"car", badge:"Most Popular" },
  { id:"drivesmart65", name:"Garmin DriveSmart 65", price:199, mapUpdateType:"lifetime", mapUpdateCost:0, mapUpdateNote:"Free lifetime maps via Wi-Fi", subscription:0, subscriptionNote:"No subscription needed", category:"car", badge:"Large Screen" },
  { id:"tomtom520", name:"TomTom GO 520", price:129, mapUpdateType:"lifetime", mapUpdateCost:0, mapUpdateNote:"Free lifetime maps via Wi-Fi", subscription:0, subscriptionNote:"No subscription needed", category:"car", badge:"TomTom" },
  { id:"tomtom6200", name:"TomTom GO 6200", price:199, mapUpdateType:"lifetime", mapUpdateCost:0, mapUpdateNote:"Free lifetime maps via Wi-Fi + traffic", subscription:0, subscriptionNote:"No subscription needed", category:"car", badge:"TomTom Premium" },
  { id:"rv895", name:"Garmin RV 895", price:329, mapUpdateType:"lifetime", mapUpdateCost:0, mapUpdateNote:"Free lifetime maps", subscription:0, subscriptionNote:"No subscription needed", category:"rv", badge:"Best for RV" },
  { id:"gpsmap67", name:"Garmin GPSMAP 67", price:399, mapUpdateType:"purchase", mapUpdateCost:30, mapUpdateNote:"Optional BirdsEye satellite imagery ~$30/yr", subscription:0, subscriptionNote:"Maps are free, satellite imagery optional", category:"outdoor", badge:"Outdoor/Hiking" },
  { id:"inreach-mini2", name:"Garmin inReach Mini 2", price:349, mapUpdateType:"subscription", mapUpdateCost:0, mapUpdateNote:"Maps free — satellite messaging subscription required", subscription:179, subscriptionNote:"Safety plan $14.99/mo ($179/yr) required", category:"outdoor", badge:"Satellite SOS" },
];

const ACCESSORIES = [
  { id:"mount", name:"Windshield / dashboard mount", cost:15, note:"Usually included, but replacements cost $10–$20" },
  { id:"case", name:"Protective carry case", cost:12, note:"Optional, good for travel" },
  { id:"charger", name:"Extra car charger cable", cost:8, note:"Useful backup" },
  { id:"none", name:"No accessories needed", cost:0, note:"Just the device" },
];

export default function Client() {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [years, setYears] = useState(3);
  const [stage, setStage] = useState<"build"|"results">("build");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const toggleDevice = (id: string) => {
    setSelectedDevices(prev => prev.includes(id) ? prev.filter(d => d !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  const toggleAccessory = (id: string) => {
    if (id === "none") { setSelectedAccessories(["none"]); return; }
    setSelectedAccessories(prev => prev.filter(a => a !== "none").includes(id) ? prev.filter(a => a !== id) : [...prev.filter(a => a !== "none"), id]);
  };

  const calcTotal = (device: typeof GPS_DEVICES[0]) => {
    const accessoryCost = selectedAccessories.filter(a => a !== "none").reduce((sum, id) => {
      const acc = ACCESSORIES.find(a => a.id === id);
      return sum + (acc?.cost || 0);
    }, 0);
    const mapCost = device.mapUpdateCost * (years - 1);
    const subCost = device.subscription * years;
    return device.price + mapCost + subCost + accessoryCost;
  };

  const selectedDeviceData = selectedDevices.map(id => GPS_DEVICES.find(d => d.id === id)!).filter(Boolean);
  const cheapest = selectedDeviceData.length > 1 ? selectedDeviceData.reduce((min, d) => calcTotal(d) < calcTotal(min) ? d : min, selectedDeviceData[0]) : null;

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, issue: `GPS Cost Calc — Devices: ${selectedDevices.join(", ")} — Years: ${years}`, source:"gps-true-cost-calculator" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false);
  };
  const reset = () => { setSelectedDevices([]); setSelectedAccessories([]); setYears(3); setStage("build"); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  const costColors = ["from-blue-500 to-indigo-400","from-green-500 to-emerald-400","from-purple-500 to-violet-400"];
  const costBorders = ["border-blue-700","border-green-700","border-purple-700"];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[80vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS True Cost Calculator</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free Calculator · No Sign-up
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">What Will a GPS</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent italic">Really Cost You?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            The sticker price is just the start. Add up map updates, subscriptions, and accessories — see the true 1, 2, or 3-year cost of any GPS device before you buy.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="flex flex-wrap gap-6">
            {[{icon:"🧮",t:"Side-by-Side Comparison"},{icon:"💰",t:"Hidden Costs Revealed"},{icon:"📅",t:"1, 2 or 3 Year View"},{icon:"🆓",t:"100% Free"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {stage === "build" && (
            <motion.div key="build" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-8">
              {/* Time period */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h2 className="text-2xl font-black text-white mb-6">How many years do you want to calculate? 📅</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[1,2,3].map(y => (
                    <motion.button key={y} whileTap={{scale:0.97}} onClick={() => setYears(y)}
                      className={`py-5 rounded-2xl border-2 font-black text-xl transition-all ${years===y?"border-amber-500 bg-amber-900/20 text-amber-300 shadow-lg":"border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-amber-700"}`}>
                      {y} Year{y>1?"s":""}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Device selection */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h2 className="text-2xl font-black text-white mb-2">Pick up to 3 GPS devices to compare 🗺️</h2>
                <p className="text-zinc-400 text-base mb-6">Choose the ones you're considering — or just one to see its full cost breakdown</p>
                {["car","rv","outdoor"].map(cat => (
                  <div key={cat} className="mb-6">
                    <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">{cat==="car"?"Car GPS Devices":cat==="rv"?"RV GPS":"Outdoor GPS"}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {GPS_DEVICES.filter(d=>d.category===cat).map(device => {
                        const isSelected = selectedDevices.includes(device.id);
                        const isDisabled = !isSelected && selectedDevices.length >= 3;
                        return (
                          <motion.button key={device.id} whileTap={{scale:0.98}} onClick={() => !isDisabled && toggleDevice(device.id)} disabled={isDisabled}
                            className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${isSelected?"border-amber-500 bg-amber-900/20 shadow-lg":isDisabled?"border-zinc-800 bg-zinc-800/30 opacity-40 cursor-not-allowed":"border-zinc-700 bg-zinc-800/50 hover:border-amber-700"}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected?"border-amber-400 bg-amber-400":isDisabled?"border-zinc-600":"border-zinc-500"}`}>
                              {isSelected && <div className="w-2.5 h-2.5 bg-[#0d1117] rounded-full"/>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-black text-white text-base">{device.name}</div>
                              <div className="text-zinc-400 text-sm mt-0.5">{device.mapUpdateNote}</div>
                              {device.subscription > 0 && <div className="text-amber-400 text-sm font-bold mt-0.5">⚠️ {device.subscriptionNote}</div>}
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-black text-white text-lg">${device.price}</div>
                              <div className="text-xs text-zinc-500 bg-zinc-700 px-2 py-0.5 rounded-full mt-1">{device.badge}</div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Accessories */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h2 className="text-2xl font-black text-white mb-2">Any accessories? 🛍️</h2>
                <p className="text-zinc-400 text-base mb-6">One-time extras — included in your total cost</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ACCESSORIES.map(acc => {
                    const isSelected = selectedAccessories.includes(acc.id);
                    return (
                      <motion.button key={acc.id} whileTap={{scale:0.98}} onClick={() => toggleAccessory(acc.id)}
                        className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${isSelected?"border-amber-500 bg-amber-900/20 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-amber-700"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${isSelected?"border-amber-400 bg-amber-400":"border-zinc-500"}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-[#0d1117] rounded-full"/>}
                        </div>
                        <div className="flex-1"><div className="font-black text-white text-base">{acc.name}</div><div className="text-zinc-400 text-sm mt-0.5">{acc.note}</div></div>
                        <div className="font-black text-white shrink-0">{acc.cost > 0 ? `+$${acc.cost}` : "Free"}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {selectedDevices.length > 0 && (
                <motion.button initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                  onClick={() => setStage("results")}
                  className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/30">
                  Calculate My Total Cost <ArrowRight size={24}/>
                </motion.button>
              )}
              {selectedDevices.length === 0 && (<p className="text-center text-zinc-500 font-medium text-base">👆 Select at least one GPS device above to calculate</p>)}
            </motion.div>
          )}

          {stage === "results" && (
            <motion.div key="results" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              <button onClick={() => setStage("build")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors group mb-2">
                ← <span className="group-hover:underline">Edit my selection</span>
              </button>

              <div className="text-center mb-4">
                <h2 className="text-3xl font-black text-white mb-2">Your {years}-Year GPS Cost Breakdown 🧮</h2>
                <p className="text-zinc-400 text-base">All costs included — device, map updates, subscriptions, accessories</p>
              </div>

              {/* Cost cards */}
              <div className={`grid grid-cols-1 ${selectedDeviceData.length > 1 ? "md:grid-cols-2" : ""} gap-5`}>
                {selectedDeviceData.map((device, i) => {
                  const total = calcTotal(device);
                  const accCost = selectedAccessories.filter(a=>a!=="none").reduce((sum,id)=>{const acc=ACCESSORIES.find(a=>a.id===id);return sum+(acc?.cost||0);},0);
                  const mapCost = device.mapUpdateCost*(years-1);
                  const subCost = device.subscription*years;
                  const isCheapest = cheapest?.id === device.id;
                  return (
                    <motion.div key={device.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1*i}}
                      className={`rounded-[2rem] border-2 ${isCheapest && selectedDeviceData.length > 1 ? "border-green-600" : costBorders[i]} bg-zinc-900 overflow-hidden`}>
                      <div className={`h-1.5 bg-gradient-to-r ${costColors[i]}`}/>
                      <div className="p-7">
                        {isCheapest && selectedDeviceData.length > 1 && (
                          <div className="flex items-center gap-2 mb-4"><CheckCircle2 size={16} className="text-green-400"/><span className="text-sm font-black text-green-400 uppercase tracking-widest">Cheapest over {years} years</span></div>
                        )}
                        <h3 className="text-xl font-black text-white mb-5">{device.name}</h3>

                        <div className="space-y-3 mb-6">
                          {[
                            { label:"Device price", value:device.price, always:true },
                            { label:`Map updates (${years-1} update${years-1!==1?"s":""})`, value:mapCost, always:mapCost > 0 },
                            { label:`Subscription (${years} year${years>1?"s":""})`, value:subCost, always:subCost > 0, highlight:subCost > 0 },
                            { label:"Accessories", value:accCost, always:accCost > 0 },
                          ].filter(row => row.always).map(row => (
                            <div key={row.label} className={`flex items-center justify-between py-3 border-b border-zinc-800 ${row.highlight ? "text-amber-300" : ""}`}>
                              <span className={`text-base font-medium ${row.highlight ? "text-amber-300" : "text-zinc-400"}`}>{row.label}</span>
                              <span className={`font-black text-lg ${row.highlight ? "text-amber-300" : "text-white"}`}>{row.value === 0 ? "Free" : `$${row.value}`}</span>
                            </div>
                          ))}
                        </div>

                        <div className={`p-5 rounded-2xl bg-gradient-to-r ${costColors[i]} bg-opacity-20`}>
                          <div className="flex items-center justify-between">
                            <div><div className="text-sm font-black text-white/70 uppercase tracking-widest">{years}-Year True Cost</div>{device.mapUpdateType==="lifetime" && <div className="text-xs text-white/60 mt-0.5">No hidden costs after purchase</div>}</div>
                            <div className="text-4xl font-black text-white">${total}</div>
                          </div>
                        </div>

                        {device.subscription > 0 && (
                          <div className="mt-4 p-4 bg-amber-900/20 border border-amber-700 rounded-xl flex items-start gap-2">
                            <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5"/>
                            <p className="text-sm text-amber-300 font-medium">{device.subscriptionNote}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Summary insight */}
              {selectedDeviceData.length > 1 && cheapest && (
                <div className="bg-green-900/20 border border-green-700 rounded-[2rem] p-7">
                  <div className="flex items-start gap-4">
                    <DollarSign size={28} className="text-green-400 shrink-0 mt-1"/>
                    <div>
                      <h3 className="text-xl font-black text-white mb-2">Over {years} years, the {cheapest.name} costs the least</h3>
                      <p className="text-zinc-300 text-base font-medium leading-relaxed">
                        {selectedDeviceData.length > 1 ? `That's $${calcTotal(selectedDeviceData.reduce((max,d) => calcTotal(d) > calcTotal(max) ? d : max, selectedDeviceData[0])) - calcTotal(cheapest)} less than the most expensive option over ${years} years — just by choosing wisely upfront.` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Lead */}
              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Save this cost breakdown 📧</h3>
                  <p className="text-zinc-400 text-base mb-6">We'll email you the full comparison to reference when you're ready to buy.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Save My Cost Breakdown"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Breakdown sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/>Start Over</button>
                <Link href="/tools/gps-budget-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Budget Finder</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices and subscription rates are approximate and subject to change. Not affiliated with Garmin or TomTom.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
