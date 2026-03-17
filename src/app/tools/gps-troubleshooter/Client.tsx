"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, ArrowRight, AlertCircle, XCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const GPS_TYPES = [
  { id:"car-gps", label:"Dedicated Car GPS", emoji:"🗺️", desc:"Garmin, TomTom, mounted on dashboard" },
  { id:"phone-gps", label:"Phone Navigation", emoji:"📱", desc:"Google Maps, Apple Maps, Waze" },
  { id:"outdoor-gps", label:"Outdoor / Hiking GPS", emoji:"🥾", desc:"Garmin handheld, Garmin inReach" },
  { id:"car-builtin", label:"Built-in Car Navigation", emoji:"🚗", desc:"Factory screen in your car dashboard" },
];

const PROBLEMS: Record<string, {
  id: string; label: string; emoji: string; desc: string;
  fixes: { title: string; steps: string[]; tryTime: string; likelyCause: string; }[];
  whenToReplace?: string;
}[]> = {
  "car-gps": [
    {
      id:"no-signal", label:"It can't find where I am", emoji:"📡", desc:"Searching for signal, or wrong location shown",
      fixes:[
        { title:"Move to an open area outside", steps:["Turn off your GPS completely","Walk or drive away from tall buildings, car parks, or dense trees","Turn it back on outside with a clear view of the sky","Wait 2–3 minutes — it needs to 'find' the satellites again"], tryTime:"2–3 minutes", likelyCause:"Buildings and trees block the satellite signal coming down from space" },
        { title:"Restart the GPS device", steps:["Hold the power button for 5–10 seconds until the screen goes off","Wait 30 seconds","Turn it back on and let it fully start up","Park outside and wait 2 minutes before driving"], tryTime:"5 minutes", likelyCause:"A temporary software freeze can confuse the GPS positioning" },
        { title:"Check your mounting position", steps:["Make sure the GPS is mounted on or near the windshield — not behind a privacy-tinted windshield strip","The GPS antenna needs to 'see' the sky through the glass","Avoid mounting it too far down on the dashboard"], tryTime:"1 minute", likelyCause:"Metallic tint in some windshields can block GPS signals coming from overhead" },
      ],
    },
    {
      id:"wrong-route", label:"It's sending me the wrong way", emoji:"🔄", desc:"Wrong turns, outdated roads, strange detours",
      fixes:[
        { title:"Update your maps", steps:["Connect your GPS to your home Wi-Fi (Settings → Wi-Fi → connect to your network)","Wait for it to check for updates — it does this automatically once connected","If no Wi-Fi, connect to computer and open Garmin Express or TomTom Home","Download any available map updates (they're usually free for lifetime map models)","After updating, try the route again"], tryTime:"30–60 minutes", likelyCause:"Maps can be 1–3 years out of date if never updated — roads change" },
        { title:"Recalculate the route", steps:["Pull over safely","Press the menu button and choose 'Where To?' again","Re-enter your destination","The GPS will calculate a fresh route using current map data"], tryTime:"2 minutes", likelyCause:"Sometimes the GPS locks onto an old cached route" },
        { title:"Check your route settings", steps:["Press 'Settings' on your GPS","Look for 'Navigation' or 'Route Preferences'","Check the route type is set to 'Fastest' or 'Shortest' as you prefer","Make sure 'Avoid Toll Roads' or 'Avoid Motorways' isn't turned on unexpectedly"], tryTime:"3 minutes", likelyCause:"Route preference settings can make it take unusual routes" },
      ],
    },
    {
      id:"frozen", label:"The screen is frozen or won't respond", emoji:"❄️", desc:"Touchscreen not working, screen stuck on one image",
      fixes:[
        { title:"Force restart the device", steps:["Hold the power button for 10–15 seconds (longer than normal)","The screen should go black","Wait 30 seconds before turning it back on","If there's a small pinhole reset button on the back or side, use a paperclip to press it gently"], tryTime:"5 minutes", likelyCause:"The device's software has temporarily locked up — very common and almost always fixed by a restart" },
        { title:"Check the screen for moisture or dirt", steps:["Turn off the device","Wipe the screen gently with a clean, dry microfibre cloth","Check the edges around the screen for any moisture","Let it sit for 10 minutes at room temperature before turning back on"], tryTime:"15 minutes", likelyCause:"Moisture or dirty screen edges can make touch screens unresponsive" },
      ],
    },
    {
      id:"no-voice", label:"The voice directions have gone silent", emoji:"🔇", desc:"Navigation works but I can't hear the turn instructions",
      fixes:[
        { title:"Check the volume settings", steps:["While the GPS is on, look for a speaker icon or volume button on the screen","On Garmin: Press the microphone icon → turn up the volume slider","On TomTom: Settings → Sounds & Warnings → turn up volume","Also check if the GPS has a physical volume button on the side"], tryTime:"2 minutes", likelyCause:"Volume is often turned down accidentally when handling the device" },
        { title:"Check the mute isn't on", steps:["On Garmin: Maps → Settings → Navigation → Voice Language — check it's set to a voice","On TomTom: Settings → Voices — make sure a voice is selected","Tap the speaker icon if it shows a line through it (that means muted)"], tryTime:"2 minutes", likelyCause:"The mute setting can be turned on accidentally" },
      ],
      whenToReplace:"If restarting and checking all volume settings doesn't restore audio, the internal speaker may have failed. Most GPS devices are not repairable at home — check your warranty or consider a replacement.",
    },
    {
      id:"wont-charge", label:"It won't charge or turns off quickly", emoji:"🔋", desc:"Battery drains fast or won't charge at all",
      fixes:[
        { title:"Try a different charging cable", steps:["GPS charging cables wear out and fray — this is the most common cause","Try a different USB cable with the same connector","Use a wall adapter instead of a car charger if that's what you've been using","Clean the charging port gently with a dry cotton swab if it looks dusty"], tryTime:"5 minutes", likelyCause:"Faulty or worn charging cables are responsible for most charging problems" },
        { title:"Charge in a cooler location", steps:["GPS batteries don't charge well in extreme heat (like a hot car)","Bring it inside to room temperature","Connect to charge and leave for 2 hours undisturbed","Check if it shows a charging icon on screen"], tryTime:"2 hours", likelyCause:"Heat prevents lithium batteries from accepting a charge" },
      ],
      whenToReplace:"If the battery drains within 30 minutes of being unplugged despite full charging, the battery has worn out. GPS devices older than 5–7 years often reach end-of-battery-life. Replacement is usually more practical than battery repair.",
    },
  ],
  "phone-gps": [
    {
      id:"no-signal-phone", label:"Navigation keeps losing my location", emoji:"📡", desc:"Blue dot jumping around or disappearing",
      fixes:[
        { title:"Turn location services fully on", steps:["iPhone: Settings → Privacy & Security → Location Services → turn ON","Then find your Maps app → tap it → set to 'While Using the App'","Also turn on Wi-Fi and Bluetooth — they help GPS lock on faster","Android: Settings → Location → turn ON → use 'High Accuracy' mode"], tryTime:"2 minutes", likelyCause:"Location services or accuracy mode may be turned off or set too low" },
        { title:"Toggle Airplane Mode on and off", steps:["Pull down from the top of your screen","Tap the airplane icon to turn Airplane Mode ON","Wait 15 seconds","Tap it again to turn Airplane Mode OFF","Open Maps and try again"], tryTime:"2 minutes", likelyCause:"A quick reset of your phone's connection forces it to find GPS satellites fresh" },
        { title:"Move the phone closer to the windshield", steps:["GPS signal comes from satellites overhead — your phone needs to 'see' the sky","Mount your phone on the windshield or dashboard with the screen facing you","Avoid putting it in a cupholder, door pocket, or under a seat","Remove any thick phone case or metallic case that could block signal"], tryTime:"1 minute", likelyCause:"Distance from the glass and thick cases can reduce GPS signal strength" },
      ],
    },
    {
      id:"wrong-route-phone", label:"Google Maps or Apple Maps is taking strange routes", emoji:"🔄", desc:"Odd detours, wrong roads, sending me the wrong way",
      fixes:[
        { title:"Download offline maps for your area", steps:["Open Google Maps","Tap your profile picture → Offline Maps → Select Your Own Map","Drag the square to cover your driving area","Tap Download (you'll need Wi-Fi and about 1–2 GB of space)","This gives you maps that work even without cell signal"], tryTime:"10 minutes", likelyCause:"Poor cell signal causes Maps to use outdated or incomplete road data" },
        { title:"Clear the Maps app cache (Android)", steps:["Go to phone Settings → Apps → Google Maps","Tap 'Storage'","Tap 'Clear Cache' (not Clear Data — that removes your saved places)","Restart Google Maps and try your route"], tryTime:"5 minutes", likelyCause:"Corrupted app cache can cause navigation to behave strangely" },
      ],
    },
    {
      id:"battery-drain-phone", label:"Navigation drains my phone battery very fast", emoji:"🔋", desc:"Phone goes from 80% to dead on a 2-hour drive",
      fixes:[
        { title:"Keep phone plugged into the car charger", steps:["GPS navigation uses 3–5% battery per hour on its own","Combined with screen-on and mobile data, it can drain 15–25% per hour","Always plug in to your car's USB or use a car charger adapter","Turn down screen brightness while navigating — it makes a big difference"], tryTime:"Immediate", likelyCause:"Navigation, screen brightness, and mobile data all running together drains batteries fast" },
        { title:"Download offline maps before you leave", steps:["Pre-downloaded maps use far less battery because your phone isn't constantly fetching map data over mobile","Google Maps: profile → Offline Maps → download your region","This alone can cut battery use by 30–40% on long drives"], tryTime:"10 minutes before your trip", likelyCause:"Live map data streaming uses battery just like streaming video does" },
      ],
    },
  ],
  "outdoor-gps": [
    {
      id:"cant-find-signal-outdoor", label:"It can't find my location outdoors", emoji:"📡", desc:"Taking a long time to find signal or showing wrong location",
      fixes:[
        { title:"Stand still in an open area", steps:["Outdoor GPS units need 1–5 minutes to 'find' their position when first turned on","Stand completely still in an open area away from trees and buildings","Look for the signal bar indicator — wait until it shows 3 or more bars","Once located, it will track you accurately as you move"], tryTime:"5 minutes", likelyCause:"Outdoor GPS devices need to download satellite positions — movement before lock-on causes errors" },
        { title:"Update the satellite data", steps:["Connect your GPS to your computer and open Garmin Express","Click 'Check for Updates'","Install any available updates — these include fresh satellite orbit data","Fresh satellite data dramatically speeds up the time to find your location"], tryTime:"20 minutes", likelyCause:"Satellite orbit data (called EPE or AGPS data) becomes outdated after a few weeks" },
      ],
    },
    {
      id:"battery-outdoor", label:"The battery is draining faster than expected", emoji:"🔋", desc:"Not lasting the hours it used to",
      fixes:[
        { title:"Use battery saver / expedition mode", steps:["On Garmin: Settings → System → Battery Save → turn ON","This reduces how often the GPS records your position (every 5 min instead of every second)","Battery life can increase from 25 hours to 100+ hours in expedition mode","Only use for longer trips — it records your track less precisely"], tryTime:"1 minute", likelyCause:"GPS tracking every second uses far more battery than occasional position recording" },
        { title:"Switch to fresh AA lithium batteries", steps:["Many Garmin outdoor units use AA batteries — not rechargeable","Use Energizer Lithium AA batteries (silver packaging) not regular alkaline","Lithium AA batteries last 3x longer and work better in cold weather","Always carry a spare set on longer hikes or trips"], tryTime:"2 minutes", likelyCause:"Regular alkaline batteries drain 60% faster than lithium in outdoor GPS devices" },
      ],
    },
  ],
  "car-builtin": [
    {
      id:"builtin-wrong-route", label:"My car navigation is showing wrong or missing roads", emoji:"🔄", desc:"Roads that don't exist, missing new developments",
      fixes:[
        { title:"Check when your maps were last updated", steps:["Press 'Navigation' → 'Settings' → 'Map Version' or 'About'","Note the map date shown (e.g., 'Map Version 2021-1')","If it's more than 2–3 years old, an update is worth considering","Contact your dealer or visit your manufacturer's website for update pricing"], tryTime:"5 minutes", likelyCause:"Factory navigation maps can be 3–5 years out of date in newer cars — updates cost $149–$299 but make a big difference" },
      ],
    },
    {
      id:"builtin-no-signal", label:"My built-in GPS says 'GPS Signal Lost' while driving", emoji:"📡", desc:"Navigation loses position in certain areas",
      fixes:[
        { title:"This is usually normal in certain locations", steps:["Built-in GPS regularly loses signal in multi-storey car parks, tunnels, underground areas, and cities with very tall buildings","This is normal behaviour — wait until you're in open air and signal returns automatically","If it happens constantly on open roads, note when and where — your dealer can check the antenna"], tryTime:"Automatic — wait it out", likelyCause:"No GPS signal can reach underground or through thick concrete — this is a limitation of the technology, not a fault" },
      ],
    },
  ],
};

export default function Client() {
  const [gpsType, setGpsType] = useState<string|null>(null);
  const [problem, setProblem] = useState<string|null>(null);
  const [stage, setStage] = useState<"select-type"|"select-problem"|"fix">("select-type");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const currentProblems = gpsType ? PROBLEMS[gpsType] || [] : [];
  const currentProblem = currentProblems.find(p => p.id === problem);

  const toggleStep = (key: string) => setCompletedSteps(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });

  const validate = () => { const e: Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate())return;setSubmitting(true);
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,issue:`GPS Fix — Type: ${gpsType}, Problem: ${problem}`,source:"gps-troubleshooter"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setGpsType(null);setProblem(null);setStage("select-type");setCompletedSteps(new Set());setName("");setEmail("");setPhone("");setSubmitted(false);};

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[75vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS Fix Guide</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · Plain-English Fix Guide
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">GPS Not Working</span>
            <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent italic">the Way It Should?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Pick your GPS type and what's happening — get plain-English, step-by-step guidance for common navigation problems. No confusing instructions, no jargon.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {/* STEP 1: GPS TYPE */}
          {stage === "select-type" && (
            <motion.div key="type" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400"/>
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-2">What kind of GPS is giving you trouble? 🗺️</h2>
                  <p className="text-zinc-400 text-base mb-8">Each type has different common issues — pick the closest match to what you're using</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {GPS_TYPES.map((type, i) => (
                      <motion.button key={type.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.08*i}} whileTap={{scale:0.97}}
                        onClick={() => { setGpsType(type.id); setStage("select-problem"); }}
                        className="p-7 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-orange-500 hover:bg-orange-900/10 transition-all text-left group">
                        <div className="text-4xl mb-4">{type.emoji}</div>
                        <div className="font-black text-white text-lg mb-1">{type.label}</div>
                        <div className="text-zinc-400 text-sm font-medium">{type.desc}</div>
                        <div className="mt-3 text-xs text-orange-400 font-black opacity-0 group-hover:opacity-100 transition-opacity">Tap to select →</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-zinc-800/30 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3">
                <AlertCircle size={16} className="text-zinc-400 shrink-0 mt-0.5"/>
                <p className="text-sm text-zinc-400 font-medium">This is an educational guidance tool. For hardware issues under warranty, always contact your manufacturer directly.</p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROBLEM */}
          {stage === "select-problem" && gpsType && (
            <motion.div key="problem" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="space-y-5">
              <div className="flex items-center justify-between p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{GPS_TYPES.find(t=>t.id===gpsType)?.emoji}</div>
                  <div><div className="font-black text-white">{GPS_TYPES.find(t=>t.id===gpsType)?.label}</div><div className="text-zinc-400 text-sm">Select your issue below</div></div>
                </div>
                <button onClick={() => setStage("select-type")} className="text-zinc-400 hover:text-white text-sm font-bold transition-colors">← Change</button>
              </div>

              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400"/>
                <div className="p-8">
                  <h2 className="text-2xl font-black text-white mb-2">What's happening? 🔍</h2>
                  <p className="text-zinc-400 text-base mb-6">Choose the description that best matches what you're seeing</p>
                  <div className="space-y-3">
                    {currentProblems.map((prob, i) => (
                      <motion.button key={prob.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.07*i}} whileTap={{scale:0.98}}
                        onClick={() => { setProblem(prob.id); setStage("fix"); }}
                        className="w-full flex items-center gap-4 p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-orange-500 hover:bg-orange-900/10 transition-all text-left group">
                        <div className="text-3xl">{prob.emoji}</div>
                        <div className="flex-1">
                          <div className="font-black text-white text-base mb-1">{prob.label}</div>
                          <div className="text-zinc-400 text-sm font-medium">{prob.desc}</div>
                        </div>
                        <ArrowRight size={18} className="text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all shrink-0"/>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FIX GUIDE */}
          {stage === "fix" && currentProblem && (
            <motion.div key="fix" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              <div className="flex items-center gap-3 p-5 bg-zinc-900 rounded-2xl border border-zinc-800">
                <div className="text-3xl">{currentProblem.emoji}</div>
                <div className="flex-1"><div className="font-black text-white">{currentProblem.label}</div><div className="text-zinc-400 text-sm">{GPS_TYPES.find(t=>t.id===gpsType)?.label}</div></div>
                <button onClick={() => setStage("select-problem")} className="text-zinc-400 hover:text-white text-sm font-bold transition-colors">← Change</button>
              </div>

              <div className="bg-orange-900/20 border border-orange-700 rounded-2xl p-5 flex items-start gap-3">
                <AlertCircle size={18} className="text-orange-400 shrink-0 mt-0.5"/>
                <p className="text-base text-orange-200 font-medium leading-relaxed">Try these in order — most issues are fixed by the first or second suggestion. Tick each step as you go.</p>
              </div>

              {currentProblem.fixes.map((fix, fixIndex) => (
                <motion.div key={fix.title} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1*fixIndex}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400"/>
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-400 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">{fixIndex+1}</div>
                      <div>
                        <h3 className="text-xl font-black text-white mb-1">{fix.title}</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs font-bold text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">⏱ Takes: {fix.tryTime}</span>
                          <span className="text-xs font-bold text-zinc-400">Why this happens: {fix.likelyCause}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {fix.steps.map((step, stepIndex) => {
                        const key = `${fix.title}-${stepIndex}`;
                        const done = completedSteps.has(key);
                        return (
                          <motion.button key={stepIndex} whileTap={{scale:0.99}} onClick={() => toggleStep(key)}
                            className={`w-full flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all ${done?"border-green-600 bg-green-900/20":"border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"}`}>
                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${done?"border-green-400 bg-green-400":"border-zinc-500"}`}>
                              {done && <CheckCircle2 size={16} className="text-[#0d1117]"/>}
                              {!done && <span className="text-zinc-500 text-xs font-black">{stepIndex+1}</span>}
                            </div>
                            <p className={`text-base font-medium leading-relaxed transition-colors ${done?"text-zinc-500 line-through":"text-zinc-300"}`}>{step}</p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {currentProblem.whenToReplace && (
                <div className="bg-amber-900/20 border border-amber-700 rounded-[2rem] p-7">
                  <div className="flex items-start gap-4">
                    <XCircle size={24} className="text-amber-400 shrink-0 mt-0.5"/>
                    <div><h3 className="font-black text-white text-lg mb-2">If none of the above works</h3><p className="text-base text-amber-200/80 font-medium leading-relaxed">{currentProblem.whenToReplace}</p></div>
                  </div>
                </div>
              )}

              {/* Lead capture */}
              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Save this guide for later 📧</h3>
                  <p className="text-zinc-400 text-base mb-6">We'll email you these steps plus tips for keeping your GPS working well.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Save My Fix Guide"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Guide sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/>Different Problem</button>
                <Link href="/tools/gps-update-scheduler"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Update Scheduler</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium leading-relaxed">Educational guidance only. For hardware faults or devices still under warranty, always contact your manufacturer or retailer directly. Not affiliated with Garmin, TomTom, Google, or Apple.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
