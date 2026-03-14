import { NextRequest, NextResponse } from "next/server";

// ─── PDF Content per topic + issue ────────────────────────────────────────────
type PDFSection = { title: string; intro: string; steps: string[]; tips: string[]; bonus: string };

const CONTENT: Record<string, Record<string, PDFSection>> = {
  Printer: {
    "Paper jam": { title: "How to Fix a Printer Paper Jam", intro: "Paper jams are the most common printer issue. This guide walks you through clearing any jam safely without damaging your printer.", steps: ["Turn the printer completely OFF and unplug it from the power outlet.", "Open the front access door and the rear access panel.", "Gently pull the jammed paper — always pull in the direction paper naturally feeds (forward).", "Check for any small torn pieces inside — remove with tweezers if needed.", "Check the paper tray and straighten the paper stack before reloading.", "Fan the paper stack before loading — this prevents multiple sheets feeding together.", "Make sure the paper guides in the tray are snug against the paper.", "Close all covers, plug back in, and power on — it will reset automatically.", "Print a test page to confirm everything works."], tips: ["Fan your paper before loading to prevent jams — #1 prevention tip.", "Use the correct paper weight for your printer (usually 75–90 gsm for home use).", "Keep paper stored in a dry place — humid paper jams constantly.", "Clean the paper rollers every 3 months with a slightly damp cloth.", "Never overload the paper tray — fill to 80% capacity maximum."], bonus: "Your printer likely has a built-in jam recovery button. After clearing, hold the Resume button for 3 seconds to continue the interrupted print job without losing your place." },
    "Wi-Fi setup": { title: "How to Connect Your Printer to Wi-Fi", intro: "Wireless printing lets you print from any device in your home — phone, tablet, or laptop. Follow these steps to get connected.", steps: ["Make sure your printer is powered ON and within range of your Wi-Fi router.", "On the printer's touchscreen: tap the Wi-Fi or Settings icon.", "Select Wireless Setup Wizard or Network Setup.", "Choose your home Wi-Fi network from the list that appears.", "Enter your Wi-Fi password carefully (it's case-sensitive).", "Wait for the printer to connect — the Wi-Fi indicator should turn solid.", "On your PC: Start → Settings → Devices → Printers & Scanners → Add a printer.", "Your printer should appear — click it and click Add device.", "Print a test page to confirm the wireless connection."], tips: ["WPS quick connect: press WPS on your router, then on your printer within 2 minutes — no password needed!", "If connection fails, try moving the printer closer to the router temporarily during setup.", "Your printer needs 2.4GHz Wi-Fi — most home printers don't support 5GHz.", "Write your Wi-Fi password down somewhere safe before starting setup.", "Print a Network Configuration page from your printer to confirm connection details."], bonus: "Once connected, install your printer's official app (HP Smart, Canon PRINT, Epson iPrint) for wireless printing directly from your phone or tablet — no computer needed." },
    "Replace ink": { title: "How to Replace Printer Ink Cartridges", intro: "Replacing ink cartridges is simple once you know the steps. This guide covers all major brands.", steps: ["Make sure the printer is turned ON — this moves the cartridge holder to the swap position.", "Open the cartridge access door (usually on the front or top).", "Wait for the cartridge carrier to stop moving before reaching in.", "Press down gently on the old cartridge to release it, then lift it out.", "Remove the new cartridge from packaging — peel off ALL orange or clear protective tape.", "Shake the cartridge gently 5-6 times to distribute the ink.", "Slide into its colour-coded slot at a slight angle, then push until it clicks.", "Close the access door — the printer aligns automatically (takes 1-2 minutes).", "Print a test page to verify the new cartridge is working."], tips: ["Never touch the copper contacts or ink nozzles — oils from your fingers can block them.", "Store spare cartridges upright at room temperature to prevent ink settling.", "Print at least one colour page per week to prevent ink drying in the nozzles.", "Third-party cartridges work fine for everyday printing at 40-60% less cost.", "If a new cartridge isn't recognised: remove it, wipe the copper chip with a dry cloth, reinsert."], bonus: "Run a Print Head Cleaning cycle (Settings → Maintenance → Clean Print Head) after installing a new cartridge to ensure perfect print quality from the very first page." },
    default: { title: "Complete Printer Troubleshooting Guide", intro: "This comprehensive guide covers the most common printer issues and how to solve them quickly at home.", steps: ["Check that all cables are firmly connected and the printer is powered on.", "Restart both the printer and your computer — this fixes 80% of temporary issues.", "Make sure you have the latest printer driver installed from the manufacturer's website.", "Check ink levels: on the printer screen or in the printer's software on your computer.", "Run a Print Head Cleaning cycle from Settings → Maintenance if print quality is poor.", "Check that the printer is set as the Default Printer in your computer's settings.", "If the printer shows Offline: right-click it in Control Panel → Devices → Set as Online.", "For wireless issues: turn the printer off, wait 30 seconds, turn back on to reconnect.", "If problems persist, uninstall and reinstall the printer software from the manufacturer's website."], tips: ["Print a test page monthly to keep ink cartridges from drying out.", "Keep your printer driver updated — manufacturers regularly release fixes.", "Store your printer away from direct sunlight and heat sources.", "Run a nozzle check test before important print jobs.", "Keep a spare black ink cartridge on hand — running out always happens at the worst time."], bonus: "Download your printer model's full user manual from the manufacturer's support website — it contains setup diagrams, error code lists, and maintenance schedules specific to your exact model." },
  },
  GPS: {
    "Maps outdated": { title: "How to Update Your GPS Maps", intro: "Outdated maps mean wrong directions, missing new roads, and outdated points of interest. This guide shows you how to get the latest maps on any GPS device.", steps: ["Connect your GPS device to your computer using the USB cable that came with it.", "For Garmin: download and open Garmin Express (free) from garmin.com/express.", "For TomTom: download and open TomTom MyDrive Connect from tomtom.com.", "The software will detect your device automatically — wait for it to load your device info.", "Click 'Check for Updates' to see what map updates are available.", "Select the map updates for your country/region.", "Click Install and keep the device connected — this takes 30-90 minutes.", "Do NOT disconnect or turn off the device during the update.", "Once complete, safely eject the device and test navigation."], tips: ["Map updates include speed limit data, new roads, and updated points of interest.", "Schedule updates quarterly — road networks change more than you think.", "Garmin devices often include a free lifetime maps subscription — check if yours qualifies.", "Use a fast USB port (USB 3.0) to speed up the transfer.", "Back up your saved favourites before updating — good practice."], bonus: "After updating, recalibrate your GPS by driving in a clear open area and letting it lock satellites for 5 minutes — this ensures maximum accuracy on your first trip." },
    default: { title: "Complete GPS Troubleshooting & Update Guide", intro: "This guide covers everything you need to keep your GPS working perfectly — from map updates to signal fixes.", steps: ["Ensure your GPS has sufficient battery or is plugged into your car's power.", "For signal issues: park in an open area away from tall buildings and trees.", "For map updates: connect to your computer and use Garmin Express or TomTom MyDrive Connect.", "For frozen screen: hold the power button for 10-15 seconds for a force restart.", "For wrong directions: check your routing preferences (tolls, motorways, fastest/shortest).", "For no signal: go to Settings → System → GPS Sensor Reset (won't delete your data).", "Keep your GPS software updated — check for updates every 3-6 months.", "Check for firmware updates separately from map updates.", "If all else fails, factory reset from Settings → System — erases saved places."], tips: ["Start your GPS 5 minutes before you need it — lets it lock onto satellites while parked.", "Avoid placing your GPS on the dashboard in direct sunlight — heat damages the screen.", "Download offline maps before long trips in rural areas with poor mobile coverage.", "Update your GPS home and work addresses if you move.", "Use Trip Planner to plan multi-stop routes before you leave home."], bonus: "Most GPS devices can be set to automatically download map updates over Wi-Fi when plugged in overnight. Check your device's Settings → Wireless Updates to enable this convenient feature." },
  },
  "Smart Home": { default: { title: "Smart Home Mastery & Troubleshooting Guide", intro: "This guide helps you set up, connect and control your smart home devices with confidence.", steps: ["Start with one device — don't try to set up everything at once.", "Download your device's official app (Alexa, Google Home, SmartThings, etc.).", "Connect your phone to your home's 2.4GHz Wi-Fi — most smart devices require this frequency.", "Put the device in pairing mode — usually hold the button for 5-10 seconds until LED flashes.", "Follow the in-app setup wizard — it walks you through each step.", "Give devices simple names: 'lounge light' not 'Philips Hue Bulb Model B22'.", "Group devices by room in the app for easier control.", "Link to Alexa or Google Home through Skills/Actions settings for voice control.", "Create routines for automated actions — like turning off all lights at bedtime."], tips: ["Never turn smart bulbs off at the wall switch — always leave power on, control via app or voice.", "Place your Wi-Fi router centrally to ensure strong signal to all smart devices.", "Use a password manager to keep track of the multiple accounts required.", "Check for firmware updates on devices regularly — they add features and fix bugs.", "Set up a Guest Wi-Fi network for smart devices — keeps your main devices more secure."], bonus: "Create a 'Good Morning' and 'Good Night' routine in your smart home app — with one voice command, turn on lights, check weather, start your coffee maker, and more." } },
  Alexa: { default: { title: "Complete Amazon Alexa Setup & Commands Guide", intro: "This guide covers everything from initial Alexa setup to advanced commands most users never discover.", steps: ["Download the Amazon Alexa app from the App Store or Google Play.", "Sign in with your Amazon account (or create one free at amazon.com).", "Plug in your Echo device — the orange ring means it's ready to set up.", "In the Alexa app: tap Devices → + → Add Device → Amazon Echo → follow the wizard.", "Connect to your Wi-Fi when prompted and wait for setup to complete.", "Say 'Alexa, what's the weather?' to test — blue ring means it's listening.", "Set up Voice Profiles: Alexa app → More → Settings → Your Profile → Voice ID.", "Link your music service: Alexa app → More → Settings → Music & Podcasts.", "Enable Skills: Alexa app → More → Skills & Games → browse by category."], tips: ["The blue ring means Alexa is listening. The red ring means microphone is muted.", "Say 'Alexa, help' to hear a list of things she can do right now.", "Drop-In feature lets you instantly connect to another Echo in your home.", "Set up Alexa Guard to listen for smoke alarms when you're away.", "Whisper Mode — whisper to Alexa and she whispers back, great for late nights."], bonus: "50 Commands to Try: weather, timers, shopping lists, music, calls, smart home, news, jokes, reminders, alarms, unit conversions, recipe help, sports scores, Wikipedia questions — just say 'Alexa, [your question]'." } },
  Camera: { default: { title: "Complete Camera Setup & Photography Guide", intro: "This guide covers firmware updates, essential settings, and photography tips to help you get great photos from any camera.", steps: ["Charge your battery fully before first use — takes 2-3 hours for most cameras.", "Insert a formatted SD card — format it inside the camera, not on your computer.", "Set your date, time, and language in the Setup menu.", "Set image quality to Large Fine JPEG (or RAW+JPEG if you edit photos).", "Turn on Image Stabilisation — found in the lens or camera menu.", "Set Autofocus to Single AF for still subjects, Continuous AF for moving subjects.", "Update firmware: manufacturer website → Support → Software → find your model → install.", "Take test shots in Auto mode first to understand your camera's capabilities.", "Learn the P (Program) mode — gives more control while managing exposure automatically."], tips: ["Rule of thirds: place your subject at the intersection of an imaginary 3x3 grid — not dead centre.", "Golden hour (just after sunrise, just before sunset) gives beautiful warm light with no effort.", "Shoot in burst mode for action shots — hold the shutter and pick the sharpest frame.", "Clean your lens with a microfibre cloth before important shoots — fingerprints cause blur.", "Back up photos to Google Photos (free 15GB) immediately after each shoot."], bonus: "Enable the histogram display on your camera — it shows at a glance if your photo is too bright or too dark. When the graph is pushed right it's overexposed. To the left, underexposed. Aim for a balanced mountain shape." } },
  Security: { default: { title: "Complete Online Safety & Digital Literacy & Privacy Guide", intro: "This guide teaches you how to protect yourself from viruses, hackers, scams, and online threats using completely free tools.", steps: ["Check Windows Defender is active: Settings → Privacy & Security → Windows Security → turn on all protections.", "Download Malwarebytes Free (malwarebytes.com) for a second layer of protection — run weekly scans.", "Change all your important passwords to strong, unique ones (12+ characters each).", "Install Bitwarden (free) — a password manager that remembers all passwords for you.", "Enable Two-Factor Authentication on email, banking, and social media accounts.", "Check haveibeenpwned.com — enter your email to see if you've been in any data breaches.", "Set up automatic Windows updates: Settings → Windows Update → turn on Automatic Updates.", "Learn to spot phishing emails: check sender address, hover over links before clicking.", "Back up important files: Settings → Backup → Add a Drive (external hard drive or USB)."], tips: ["Free is fine: Windows Defender + Malwarebytes Free protects against 99% of threats.", "No real company will ever call to say your computer has a virus — hang up immediately.", "Never pay for 'tech support' that contacts you unexpectedly — it's always a scam.", "Strong passwords use 3 random words + numbers: BlueTableLamp42! is more secure than P@ssw0rd.", "Check your bank statement weekly — report any unrecognised transaction immediately."], bonus: "Create a Security Checklist and review it monthly: ✅ Windows updated ✅ Malwarebytes scan run ✅ Bank statement checked ✅ No suspicious emails ✅ Passwords all unique. Staying safe is about regular habits, not complex software." } },
};

function getContent(topic: string, issue: string): PDFSection {
  const topicData = CONTENT[topic] || CONTENT["Printer"];
  const key = Object.keys(topicData).find(k => k !== "default" && issue.toLowerCase().includes(k.toLowerCase()));
  return topicData[key || "default"];
}

function buildHTML(name: string, topic: string, issue: string, brand: string): string {
  const c = getContent(topic, issue);
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${c.title} — Setwise Digital</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8f9fa;color:#1a1a2e;print-color-adjust:exact}
.page{max-width:800px;margin:0 auto;background:white;min-height:100vh}
.header{background:linear-gradient(135deg,#1e3a5f,#0f1e3a);padding:40px 48px}
.hrow{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px}
.logo{display:flex;align-items:center;gap:12px}
.lmark{width:44px;height:44px;background:#2563eb;border-radius:10px;display:flex;align-items:center;justify-content:center}
.lmark svg{width:22px;height:22px}
.lname{font-size:20px;font-weight:800;color:white}
.hdate{color:#94a3b8;font-size:13px;font-weight:500}
.hbadge{display:inline-block;background:rgba(37,99,235,.3);border:1px solid rgba(37,99,235,.5);color:#93c5fd;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px}
.htitle{font-size:30px;font-weight:900;color:white;line-height:1.2;margin-bottom:14px}
.hmeta{display:flex;flex-wrap:wrap;gap:20px}
.hmeta-item{color:#94a3b8;font-size:13px;font-weight:500}
.hmeta-item span{color:#e2e8f0;font-weight:600}
.body{padding:44px 48px}
.pbanner{background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1px solid #bfdbfe;border-radius:16px;padding:20px 24px;margin-bottom:32px;display:flex;align-items:flex-start;gap:16px}
.picon{width:48px;height:48px;background:#2563eb;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.picon svg{width:24px;height:24px}
.ptitle{font-size:16px;font-weight:800;color:#1e40af;margin-bottom:4px}
.pdesc{font-size:14px;color:#3b82f6;font-weight:500}
.intro{font-size:15px;line-height:1.8;color:#475569;margin-bottom:36px;padding:20px 24px;background:#f8fafc;border-left:4px solid #2563eb;border-radius:0 12px 12px 0}
.sec{margin-bottom:36px}
.sec-hd{display:flex;align-items:center;gap:12px;margin-bottom:18px}
.sec-num{width:36px;height:36px;background:#2563eb;color:white;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex-shrink:0}
.sec-title{font-size:20px;font-weight:800;color:#0f172a}
.step{display:flex;gap:14px;padding:14px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:8px;align-items:flex-start}
.snum{width:30px;height:30px;background:#1e3a5f;color:white;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;flex-shrink:0;margin-top:1px}
.stext{font-size:14px;line-height:1.7;color:#334155;font-weight:500}
.tip{display:flex;gap:12px;padding:12px 16px;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:8px;align-items:flex-start}
.ticon{font-size:16px;flex-shrink:0;margin-top:2px}
.ttext{font-size:13px;line-height:1.6;color:#78350f;font-weight:500}
.bonus{background:linear-gradient(135deg,#1e3a5f,#0f2447);border-radius:16px;padding:28px 32px;margin-bottom:32px}
.bbd{display:inline-block;background:rgba(99,102,241,.4);color:#a5b4fc;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px}
.btitle{font-size:18px;font-weight:800;color:white;margin-bottom:8px}
.btext{font-size:14px;line-height:1.7;color:#94a3b8;font-weight:500}
.ncards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:36px}
.nc{padding:18px;border:2px solid #e2e8f0;border-radius:14px;text-align:center}
.ncicon{font-size:26px;margin-bottom:8px}
.nct{font-size:13px;font-weight:800;color:#0f172a;margin-bottom:6px}
.ncd{font-size:12px;color:#64748b;font-weight:500;line-height:1.5}
.footer{background:#f1f5f9;border-top:2px solid #e2e8f0;padding:28px 48px;text-align:center}
.ftitle{font-size:18px;font-weight:900;color:#1e3a5f;margin-bottom:6px}
.fcontact{font-size:13px;color:#64748b;font-weight:500;margin-bottom:8px}
.ftag{font-size:12px;color:#94a3b8;font-weight:500}
.dl-btn{display:block;width:200px;margin:16px auto 0;padding:12px 24px;background:#2563eb;color:white;text-align:center;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;cursor:pointer}
@media print{.dl-btn{display:none}.page{max-width:100%}}
</style></head>
<body>
<div class="page">
<div class="header">
  <div class="hrow">
    <div class="logo">
      <div class="lmark"><svg fill="white" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
      <span class="lname">Setwise Digital</span>
    </div>
    <span class="hdate">Generated: ${date}</span>
  </div>
  <div class="hbadge">${topic} Guide</div>
  <div class="htitle">${c.title}</div>
  <div class="hmeta">
    ${name ? `<div class="hmeta-item">👤 Prepared for: <span>${name}</span></div>` : ""}
    ${brand ? `<div class="hmeta-item">🏷️ Device: <span>${brand}</span></div>` : ""}
    <div class="hmeta-item">📧 <span>support@setwisedigital.com</span></div>
  </div>
</div>
<div class="body">
  ${name ? `<div class="pbanner"><div class="picon"><svg fill="white" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div><div><div class="ptitle">Hi ${name}! This guide is personalised for you.</div><div class="pdesc">Based on your ${topic} issue${brand ? ` with your ${brand}` : ""} — here are the exact steps that apply to your situation.</div></div></div>` : ""}
  <div class="intro">${c.intro}</div>
  <div class="sec">
    <div class="sec-hd"><div class="sec-num">1</div><div class="sec-title">Step-by-Step Instructions</div></div>
    ${c.steps.map((s, i) => `<div class="step"><div class="snum">${i + 1}</div><div class="stext">${s}</div></div>`).join("")}
  </div>
  <div class="sec">
    <div class="sec-hd"><div class="sec-num">2</div><div class="sec-title">Pro Tips & Prevention</div></div>
    ${c.tips.map(t => `<div class="tip"><div class="ticon">💡</div><div class="ttext">${t}</div></div>`).join("")}
  </div>
  <div class="bonus"><div class="bbd">⭐ Bonus Tip</div><div class="btitle">Did You Know?</div><div class="btext">${c.bonus}</div></div>
  <div class="sec">
    <div class="sec-hd"><div class="sec-num">3</div><div class="sec-title">What to Do Next</div></div>
    <div class="ncards">
      <div class="nc"><div class="ncicon">📞</div><div class="nct">Still Stuck?</div><div class="ncd">Book a 1-on-1 session with a Setwise Digital expert consultant</div></div>
      <div class="nc"><div class="ncicon">🌐</div><div class="nct">More Guides</div><div class="ncd">Visit setwisedigital.com for GPS, Alexa, camera guides and more</div></div>
      <div class="nc"><div class="ncicon">📧</div><div class="nct">Email Support</div><div class="ncd">support@setwisedigital.com — we respond within 24 hours</div></div>
    </div>
  </div>
</div>
<div class="footer">
  <div class="ftitle">Setwise Digital</div>
  <div class="fcontact">support@setwisedigital.com · www.setwisedigital.com</div>
  <div class="ftag">Technology Simplified — Plain-English guides for everyday tech</div>
  <a class="dl-btn" href="#" onclick="window.print();return false;">🖨️ Print / Save as PDF</a>
</div>
</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, topic, issue, brand, email } = await req.json();
    const html = buildHTML(name || "", topic || "Printer", issue || "", brand || "");

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [{ title: `📄 PDF Downloaded — ${topic}`, color: 0x2563eb, fields: [
          { name: "👤 Name", value: name || "Anonymous", inline: true },
          { name: "📧 Email", value: email || "Not provided", inline: true },
          { name: "🏷️ Brand", value: brand || "Not specified", inline: true },
          { name: "🔍 Issue", value: issue || "General guide", inline: false },
        ], footer: { text: "Setwise Digital PDF System" }, timestamp: new Date().toISOString() }] }) });
    }

    return new NextResponse(html, { status: 200, headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="setwise-${(topic || "guide").toLowerCase().replace(/\s+/g, "-")}-guide.html"`,
      "Cache-Control": "no-cache",
    }});
  } catch (err) {
    console.error("PDF error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams;
  const html = buildHTML(p.get("name") || "", p.get("topic") || "Printer", p.get("issue") || "", p.get("brand") || "");
  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
