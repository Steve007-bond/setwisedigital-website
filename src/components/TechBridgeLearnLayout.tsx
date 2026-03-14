"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Zap, UserCheck, ChevronRight } from "lucide-react";
import PDFGuideSection from "./PDFGuideSection";
import SmartDiagnostic from "./SmartDiagnostic";
import ExpertConsultantSection from "./ExpertConsultantSection";

export interface TechBridgeLearnConfig {
  topic: string;
  pdfTitle: string;
  pdfDescription: string;
  pdfHighlights: string[];
  brandExamples: string[];
  starterQuestions: string[];
  emailjsServiceId?: string;
  emailjsPdfTemplateId?: string;
  emailjsContactTemplateId?: string;
  emailjsPublicKey?: string;
}

// ─── Diagnostic step data per topic ──────────────────────────────────────────

const DIAGNOSTIC_STEPS: Record<string, any[]> = {
  Printer: [
    {
      id: "start", type: "question",
      title: "What's going on with your printer?",
      subtitle: "Select the issue that best describes your situation",
      options: [
        { label: "Won't connect to Wi-Fi", icon: "📶", nextId: "wifi", tag: "popular" },
        { label: "Paper jam or paper error", icon: "📄", nextId: "jam", tag: "quick" },
        { label: "Ink or print quality issue", icon: "🖨️", nextId: "ink", tag: "popular" },
        { label: "Printer offline / not found", icon: "❌", nextId: "offline", tag: "popular" },
        { label: "Scanner not working", icon: "🔍", nextId: "scanner" },
        { label: "Driver or software issue", icon: "💻", nextId: "driver" },
      ],
    },
    {
      id: "wifi", type: "question",
      title: "What type of device are you printing from?",
      options: [
        { label: "Windows PC or laptop", icon: "🖥️", nextId: "wifi_windows" },
        { label: "Mac / MacBook", icon: "🍎", nextId: "wifi_mac" },
        { label: "iPhone or iPad", icon: "📱", nextId: "wifi_ios", tag: "quick" },
        { label: "Android phone", icon: "📲", nextId: "wifi_android" },
      ],
    },
    {
      id: "wifi_windows", type: "result",
      title: "Wi-Fi Setup on Windows",
      result: {
        heading: "Connect your printer to Wi-Fi on Windows",
        difficulty: "easy", time: "5–10 minutes",
        steps: [
          "Make sure your printer is turned ON and within range of your Wi-Fi router.",
          "On your printer's screen, tap 'Settings' or 'Network' — then choose 'Wireless Setup Wizard'.",
          "Select your home Wi-Fi network name and enter your password carefully.",
          "On your PC: click Start → Settings → Devices → Printers & Scanners → Add a printer.",
          "Your printer should appear in the list — click it and follow the prompts.",
          "Print a test page to confirm the connection works.",
        ],
        tip: "Most printers have a WPS button — press it within 2 minutes of pressing WPS on your router for an instant connection without needing to type your password!",
        upsell: "Want us to walk you through this live? Our expert consultants do 1-on-1 screen-sharing sessions — we stay on until it's working.",
      },
    },
    {
      id: "wifi_ios", type: "result",
      title: "Print from iPhone/iPad",
      result: {
        heading: "Print from your iPhone or iPad",
        difficulty: "easy", time: "2–3 minutes",
        steps: [
          "Make sure your iPhone and printer are on the same Wi-Fi network.",
          "Open the document, photo or email you want to print.",
          "Tap the Share button (square with arrow) → scroll down → tap Print.",
          "Tap 'Select Printer' and your AirPrint-compatible printer should appear.",
          "Choose number of copies and tap Print in the top right.",
        ],
        tip: "This works with any AirPrint printer — HP, Canon, Epson, Brother all support it. No app needed!",
        upsell: "Did you know you can also scan documents back to your iPhone from most printers? Ask our experts how.",
      },
    },
    {
      id: "jam", type: "result",
      title: "Fix a Paper Jam",
      result: {
        heading: "Clear a paper jam safely",
        difficulty: "easy", time: "2–5 minutes",
        steps: [
          "Turn the printer OFF and unplug it — this prevents damage.",
          "Open the main front or top cover — look for the jammed paper.",
          "Pull the paper gently and slowly — always pull in the direction paper travels (forward).",
          "Check the rear access door too — many jams leave scraps there.",
          "Remove any small torn pieces with tweezers if needed.",
          "Close all covers, plug back in, and turn on — it should reset automatically.",
        ],
        tip: "Fan your paper stack before loading — this prevents multiple sheets feeding at once, which is the #1 cause of jams!",
        upsell: "Getting frequent jams? Our guide covers the 7 most common causes and how to prevent them permanently.",
      },
    },
    {
      id: "ink", type: "question",
      title: "What's the exact ink issue?",
      options: [
        { label: "Prints are faded or streaky", icon: "🌫️", nextId: "ink_faded", tag: "popular" },
        { label: "Wrong colours printing", icon: "🎨", nextId: "ink_colour" },
        { label: "Ink cartridge not recognised", icon: "❓", nextId: "ink_notfound", tag: "quick" },
        { label: "How to replace cartridges", icon: "🔧", nextId: "ink_replace" },
      ],
    },
    {
      id: "ink_faded", type: "result",
      title: "Fix Faded or Streaky Prints",
      result: {
        heading: "Fix faded, streaky or patchy prints",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "On your printer, go to Settings → Maintenance or Tools.",
          "Run a 'Print Head Cleaning' or 'Nozzle Check' — this unblocks dried ink.",
          "Print a test page after cleaning to check improvement.",
          "If still faded, run the cleaning cycle one more time (max 3 times).",
          "Check your ink levels — low ink causes faded prints even if cartridge isn't empty.",
          "Try printing on plain paper first — glossy paper needs specific settings.",
        ],
        tip: "Printers that sit unused for weeks get clogged nozzles. Print a colour test page once a week to keep them flowing!",
        upsell: "Save up to 40% on ink costs — our PDF guide covers draft mode, ink-saving settings, and best value cartridge brands.",
      },
    },
    {
      id: "ink_notfound", type: "result",
      title: "Cartridge Not Recognised",
      result: {
        heading: "Fix 'cartridge not recognised' error",
        difficulty: "easy", time: "3 minutes",
        steps: [
          "Remove the cartridge and check for any orange protective tape — peel it off completely.",
          "Look for a small gold or copper chip on the cartridge — clean it gently with a dry cloth.",
          "Reinsert the cartridge firmly until you hear a click.",
          "Turn the printer off, wait 30 seconds, then turn back on.",
          "If still not recognised, try a different cartridge slot temporarily to test.",
        ],
        tip: "Third-party cartridges sometimes trigger this error. Your printer manufacturer's app may need an update to accept newer refill brands.",
        upsell: "Our experts know every brand's quirks — book a 15-minute session and we'll have you sorted instantly.",
      },
    },
    {
      id: "ink_replace", type: "result",
      title: "Replace Ink Cartridges",
      result: {
        heading: "Replace ink cartridges step by step",
        difficulty: "easy", time: "3 minutes",
        steps: [
          "Turn the printer ON — the cartridge holder will move to the replacement position.",
          "Open the cartridge access door (usually front/top).",
          "Press down on the old cartridge to release it, then pull it out.",
          "Remove the new cartridge from packaging and peel off ALL protective tape.",
          "Slide the new cartridge into its colour-matched slot until it clicks.",
          "Close the door — the printer will automatically align and calibrate.",
        ],
        tip: "Never shake ink cartridges — it causes air bubbles. Store spare cartridges upright at room temperature for longest life.",
        upsell: "Want to know which third-party brands give 90% quality at 40% the price? Our guide covers the best tested alternatives.",
      },
    },
    {
      id: "offline", type: "result",
      title: "Printer Shows Offline",
      result: {
        heading: "Fix 'printer offline' on any device",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Turn your printer completely off, wait 30 seconds, turn back on.",
          "Restart your computer or phone too.",
          "On Windows: Go to Control Panel → Devices → right-click your printer → See what's printing.",
          "Check 'Use Printer Offline' — if it's ticked, untick it.",
          "If still offline, delete the printer and re-add it from Settings → Devices.",
          "Make sure printer and computer are on the same Wi-Fi network.",
        ],
        tip: "Set your printer to have a static IP address — this stops it going 'offline' every time your router restarts. Our experts can show you how in 5 minutes.",
        upsell: "This is the most common printer issue we fix. If the above doesn't work, one of our consultants can diagnose it remotely.",
      },
    },
    {
      id: "scanner", type: "result",
      title: "Scanner Not Working",
      result: {
        heading: "Fix your scanner",
        difficulty: "medium", time: "10 minutes",
        steps: [
          "Make sure your printer's full software was installed — not just the basic driver.",
          "Open your printer's app (HP Smart, Canon IJ Scan, Epson Scan etc.).",
          "Try scanning from the printer app directly rather than Windows Scan.",
          "If using a USB cable, try a different port or cable.",
          "Download the latest full driver from your printer brand's website.",
          "Restart the 'Windows Image Acquisition' service: press Win+R → type 'services.msc' → find WIA → restart it.",
        ],
        tip: "Most scanners can email documents directly to you — no computer needed! Look for a 'Scan to Email' button on your printer's screen.",
        upsell: "Our complete printer guide includes scanner setup for all major brands with screenshots.",
      },
    },
    {
      id: "driver", type: "result",
      title: "Driver or Software Issue",
      result: {
        heading: "Fix printer driver problems",
        difficulty: "medium", time: "15 minutes",
        steps: [
          "Go to your printer brand's website (hp.com, canon.com, epson.com etc.).",
          "Search for your exact model number — it's on a sticker on the printer.",
          "Download the latest 'Full Feature Software' for your operating system.",
          "Before installing: Go to Settings → Apps → uninstall old printer software first.",
          "Run the new installer and follow the setup wizard.",
          "Restart your computer after installation completes.",
        ],
        tip: "Bookmark your printer's support page — manufacturers release firmware updates that fix bugs and add new features. Check every 3 months.",
        upsell: "Drivers confusing you? Our consultants handle complete printer setup remotely — you just watch and learn.",
      },
    },
    { id: "wifi_mac", type: "result", title: "Wi-Fi Setup on Mac",
      result: {
        heading: "Connect your printer to Wi-Fi on Mac",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "First connect the printer to Wi-Fi using its own screen (Settings → Wireless Setup).",
          "On your Mac: Apple menu → System Settings → Printers & Scanners.",
          "Click the + button to add a printer.",
          "Your printer should appear — select it and click Add.",
          "macOS will automatically download the right driver.",
        ],
        tip: "AirPrint means instant printing from any Apple device with zero setup — if your printer supports it, you may not need to install any software at all!",
        upsell: "Having trouble getting Mac to see your printer? Our experts specialise in Mac + printer setups.",
      },
    },
    { id: "wifi_android", type: "result", title: "Print from Android",
      result: {
        heading: "Print from your Android phone",
        difficulty: "easy", time: "3 minutes",
        steps: [
          "Download your printer's app: HP Smart, Canon Print, Epson iPrint etc.",
          "Make sure phone and printer are on the same Wi-Fi network.",
          "Open the app → add your printer → it should be found automatically.",
          "From any document or photo: tap Share → Print → select your printer.",
          "Alternatively, go to Settings → Connections → More Connection Settings → Printing.",
        ],
        tip: "Google Cloud Print is no longer available — use your printer's own app or Mopria Print Service (free on Play Store) as a universal solution.",
        upsell: "Our guide covers printing from Android for every major printer brand with step-by-step screenshots.",
      },
    },
    { id: "ink_colour", type: "result", title: "Wrong Colours",
      result: {
        heading: "Fix incorrect colour printing",
        difficulty: "medium", time: "10 minutes",
        steps: [
          "Run a nozzle check from the printer's Maintenance menu.",
          "If colours are mixed up, run a print head alignment from Settings → Tools.",
          "Check you're using the correct paper type setting — glossy vs plain affects colour.",
          "In your print dialog, check colour settings aren't set to 'Greyscale' or 'Draft'.",
          "If one colour is missing entirely, that cartridge may be empty or blocked.",
        ],
        tip: "Calibrating your printer to your specific paper brand takes 2 minutes and makes photos look dramatically better — it's in your printer's colour settings.",
        upsell: "Our photography printing guide shows how to get gallery-quality prints at home for pennies.",
      },
    },
  ],

  GPS: [
    {
      id: "start", type: "question",
      title: "What's going on with your GPS?",
      options: [
        { label: "Maps are outdated", icon: "🗺️", nextId: "maps_update", tag: "popular" },
        { label: "GPS won't turn on", icon: "⚡", nextId: "wont_start", tag: "quick" },
        { label: "Getting wrong directions", icon: "🔀", nextId: "wrong_dirs", tag: "popular" },
        { label: "No satellite signal", icon: "📡", nextId: "no_signal" },
        { label: "Screen frozen or slow", icon: "🐢", nextId: "frozen" },
        { label: "How to plan a route", icon: "📍", nextId: "route" },
      ],
    },
    {
      id: "maps_update", type: "question",
      title: "Which GPS device do you have?",
      options: [
        { label: "Garmin device", icon: "🟠", nextId: "garmin_update", tag: "popular" },
        { label: "TomTom device", icon: "🔴", nextId: "tomtom_update" },
        { label: "Built-in car GPS", icon: "🚗", nextId: "car_gps" },
        { label: "Phone navigation (Google/Apple)", icon: "📱", nextId: "phone_gps", tag: "quick" },
      ],
    },
    {
      id: "garmin_update", type: "result",
      title: "Update Garmin Maps",
      result: {
        heading: "Update your Garmin GPS maps",
        difficulty: "easy", time: "30–60 minutes",
        steps: [
          "Download Garmin Express free from garmin.com/express on your computer.",
          "Connect your Garmin to your computer with the USB cable.",
          "Open Garmin Express — it will detect your device automatically.",
          "Click 'Add a Device' if it's your first time.",
          "You'll see available map updates — click Install All.",
          "Leave it connected until fully complete — can take 30–60 minutes on first update.",
        ],
        tip: "Garmin offers one free lifetime map update on most devices. After that, updates are ~$50/year but worth it — roads change more than you'd think!",
        upsell: "Our GPS guide covers Garmin's hidden features: speed camera alerts, fuel price displays, and custom POI downloads that most users never discover.",
      },
    },
    {
      id: "phone_gps", type: "result",
      title: "Update Phone Navigation",
      result: {
        heading: "Keep Google Maps or Apple Maps current",
        difficulty: "easy", time: "2 minutes",
        steps: [
          "Google Maps: Open app → tap profile picture → Settings → tap your name → 'Update Maps'.",
          "Apple Maps: Updates automatically with iOS — just keep your phone updated.",
          "To download offline maps: Google Maps → profile → Offline maps → Select your area.",
          "For Waze: it updates automatically but you can force refresh in Settings → General.",
          "Check you have enough storage — offline maps can be 1–3GB per region.",
        ],
        tip: "Download offline maps before long trips — they work without any mobile signal and are faster too. You can save your whole state or region!",
        upsell: "Did you know Google Maps has a hidden speedometer, speed limit display, and lane guidance? Our guide shows you how to turn them all on.",
      },
    },
    {
      id: "wrong_dirs", type: "result",
      title: "Wrong Directions",
      result: {
        heading: "Fix incorrect or outdated route guidance",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "First: update your maps — outdated maps are the #1 cause of wrong directions.",
          "Report the incorrect road in the app: tap the route → 'Report' → 'Road issue'.",
          "Check your routing preferences — 'Avoid Tolls' or 'Avoid Motorways' can create odd routes.",
          "Make sure your destination is set precisely — use full address not just town name.",
          "Try setting a waypoint near your destination to guide the route better.",
        ],
        tip: "Google Maps lets you report wrong directions — if enough users report the same issue, it gets fixed within days. You're helping everyone!",
        upsell: "Our GPS mastery guide shows advanced routing tricks: multi-stop planning, avoiding specific roads, and travel time prediction.",
      },
    },
    {
      id: "no_signal", type: "result",
      title: "No GPS Signal",
      result: {
        heading: "Fix no satellite signal",
        difficulty: "easy", time: "5–10 minutes",
        steps: [
          "Move to an open area — GPS signal is blocked by buildings, trees and tunnels.",
          "Turn the GPS completely off and back on — this forces a fresh satellite search.",
          "Wait 2–3 minutes in an open sky area — first fix can take a few minutes.",
          "Check the GPS hasn't been in a case or bag that blocks signal.",
          "If the problem persists, go to Settings → Reset → GPS Data Reset (doesn't delete maps).",
        ],
        tip: "Starting your GPS at home before you drive gives it time to lock onto satellites. Cold starts after long periods of non-use can take 3–5 minutes.",
        upsell: "Our guide covers advanced signal tips including using FM transmitter mounting positions that maximise satellite reception.",
      },
    },
    {
      id: "frozen", type: "result",
      title: "Screen Frozen or Slow",
      result: {
        heading: "Fix a frozen or slow GPS",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Hold the power button for 10–15 seconds for a force restart.",
          "After restart, go to Settings → System → check for software updates.",
          "Delete old trips and saved locations — a full storage causes slowness.",
          "If using a phone: clear the navigation app's cache in phone Settings → Apps.",
          "Factory reset as last resort: Settings → System → Restore Factory Settings (backs up your favourites first).",
        ],
        tip: "GPS devices slow down when they're 70%+ full — just like a computer. Delete old tracks and routes regularly for snappy performance.",
        upsell: "Our expert consultants can remotely walk you through a clean reset that keeps all your saved places intact.",
      },
    },
    {
      id: "route", type: "result",
      title: "Plan a Route",
      result: {
        heading: "Plan the perfect route",
        difficulty: "easy", time: "3 minutes",
        steps: [
          "Enter your destination — use full address for best accuracy.",
          "Before starting: tap the route options to set toll/motorway preferences.",
          "To add stops: tap the route → Add Stop — drag stops to reorder them.",
          "Check the estimated arrival time and choose between route options.",
          "Save the route as a Favourite so you can access it without re-entering next time.",
        ],
        tip: "Plan multi-stop trips at home on the Garmin Connect or Google Maps website — it's much easier on a big screen, then it syncs to your device automatically!",
        upsell: "Did you know most GPS devices can show petrol prices, parking availability, and restaurant ratings along your route? Our guide shows you all of it.",
      },
    },
    {
      id: "wont_start", type: "result",
      title: "GPS Won't Turn On",
      result: {
        heading: "Fix a GPS that won't turn on",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Charge the device for at least 30 minutes — battery may be fully depleted.",
          "Try a different USB cable or charger — many GPS failures are actually charger failures.",
          "Hold the power button firmly for 10–15 seconds.",
          "Try connecting to your computer via USB — sometimes this jumpstarts it.",
          "Check the charging port for debris — use a toothpick gently to clean it.",
        ],
        tip: "GPS batteries lose capacity over time. If yours is 3+ years old and won't hold charge, a replacement battery costs around $15 and is usually DIY-replaceable.",
        upsell: "If your GPS is beyond saving, our experts can advise on the best current models for your budget and use case.",
      },
    },
    {
      id: "tomtom_update", type: "result",
      title: "Update TomTom Maps",
      result: {
        heading: "Update your TomTom GPS",
        difficulty: "easy", time: "30 minutes",
        steps: [
          "Download TomTom MyDrive Connect from tomtom.com on your computer.",
          "Connect your TomTom to your computer using the USB cable.",
          "MyDrive Connect opens automatically — sign in with your TomTom account.",
          "Click 'Update' next to any available map or software updates.",
          "Keep device connected until all updates complete.",
        ],
        tip: "TomTom's Lifetime Maps subscription gives you free map updates forever. Check if your device came with it — many do!",
        upsell: "Our GPS guide covers TomTom's traffic alerts, speed camera warnings, and hands-free calling setup.",
      },
    },
    {
      id: "car_gps", type: "result",
      title: "Update Built-In Car GPS",
      result: {
        heading: "Update your in-car navigation",
        difficulty: "medium", time: "1–2 hours",
        steps: [
          "Find your car brand's navigation update portal (Toyota, Ford, BMW, Hyundai etc.).",
          "Enter your car's VIN number to get the correct update for your model.",
          "Download the update to a USB drive (usually 8GB+ required).",
          "Insert USB into your car's USB port with the engine running.",
          "Follow the on-screen prompts — do not turn off the engine during update.",
        ],
        tip: "Car manufacturer map updates can cost $150–$300 but third-party services like HERE Maps offer the same quality at 50% less for many models.",
        upsell: "Our in-car GPS guide covers all major brands including hidden features like voice command lists and Android Auto/Apple CarPlay setup.",
      },
    },
  ],

  "Smart Home": [
    {
      id: "start", type: "question",
      title: "What do you need help with?",
      options: [
        { label: "Set up Alexa for first time", icon: "🔵", nextId: "alexa_setup", tag: "popular" },
        { label: "Device won't connect to Wi-Fi", icon: "📶", nextId: "wifi_device", tag: "popular" },
        { label: "Create a routine or schedule", icon: "⏰", nextId: "routine", tag: "quick" },
        { label: "Set up Google Nest/Home", icon: "🟢", nextId: "google_setup" },
        { label: "Smart lights or plugs issue", icon: "💡", nextId: "smart_lights" },
        { label: "Security camera setup", icon: "📷", nextId: "camera_setup" },
      ],
    },
    {
      id: "alexa_setup", type: "result",
      title: "Set Up Amazon Alexa",
      result: {
        heading: "Set up your Amazon Echo / Alexa",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Download the Amazon Alexa app on your phone (free on App Store / Google Play).",
          "Sign in with your Amazon account — or create one free.",
          "Plug in your Echo device — the ring light will turn orange.",
          "In the app: tap Devices → + → Add Device → Amazon Echo → follow the steps.",
          "Connect to your Wi-Fi when prompted.",
          "Say 'Alexa, what time is it?' to confirm it's working!",
        ],
        tip: "Set up 'Your Voice' in the Alexa app — it learns your voice so Alexa recognises you specifically and gives personalised responses including your calendar and shopping list.",
        upsell: "Alexa can do 100x more than most people use it for. Our guide covers 50 commands that will change how you use your home.",
      },
    },
    {
      id: "routine", type: "result",
      title: "Create an Alexa Routine",
      result: {
        heading: "Create a smart home routine",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Open the Alexa app → tap 'More' at bottom right → Routines → + to create new.",
          "Set a trigger: 'When this happens' — choose time, voice command, or sunrise/sunset.",
          "Add actions: play news, adjust lights, read weather, start coffee maker etc.",
          "You can add multiple actions in sequence — like a morning checklist.",
          "Tap Save — your routine runs automatically from now on.",
        ],
        tip: "Create a 'Leaving Home' routine triggered by saying 'Alexa, goodbye' — it turns off all lights, locks smart locks, and arms your security system with one phrase!",
        upsell: "Our smart home guide shows 20 pre-built routines you can import directly — no setup required.",
      },
    },
    {
      id: "wifi_device", type: "result",
      title: "Smart Device Won't Connect",
      result: {
        heading: "Fix a smart device that won't connect",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Make sure your phone is connected to 2.4GHz Wi-Fi — most smart devices don't support 5GHz.",
          "Move the device closer to your router during initial setup.",
          "Put the device in pairing mode — usually hold the button for 5–10 seconds until light flashes.",
          "Open the device's app and follow the Add Device wizard exactly.",
          "If it fails, try turning off mobile data on your phone during setup.",
          "Restart your router and try again if still failing.",
        ],
        tip: "The most common smart home setup problem is being on 5GHz Wi-Fi. Look in your router settings for a 2.4GHz network — it usually has the same name but slower speed.",
        upsell: "Our smart home starter guide covers setup for 15 device types including Ring, Nest, Philips Hue, and TP-Link.",
      },
    },
    {
      id: "google_setup", type: "result",
      title: "Set Up Google Nest",
      result: {
        heading: "Set up Google Nest / Google Home",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Download the Google Home app on your phone.",
          "Sign in with your Google account.",
          "Plug in your Nest device — it will play a welcome sound.",
          "In the app: tap + → Set up device → New device → follow the instructions.",
          "Say 'Hey Google, good morning' to test it's working.",
          "Add your home address so it gives accurate local weather and traffic.",
        ],
        tip: "Link your Google Calendar to Google Home — ask 'Hey Google, what's on my schedule today?' for a full day briefing every morning.",
        upsell: "Our guide covers connecting Google Nest to Spotify, YouTube Music, smart lights, and your TV in under an hour.",
      },
    },
    {
      id: "smart_lights", type: "result",
      title: "Smart Lights Issue",
      result: {
        heading: "Fix smart lights not responding",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Check the physical switch is ON — smart bulbs need constant power.",
          "Remove and reinsert the bulb to reset it.",
          "In your app, delete the device and re-add it from scratch.",
          "Make sure the bulb is on your 2.4GHz Wi-Fi network.",
          "Update the bulb's firmware through its app if available.",
        ],
        tip: "Never turn smart lights off at the wall switch! Always leave the switch ON and control them only through the app or voice. Teach everyone in the household this one rule.",
        upsell: "Our smart home guide shows how to sync all your lights to sunrise and sunset automatically — no scheduling needed.",
      },
    },
    {
      id: "camera_setup", type: "result",
      title: "Security Camera Setup",
      result: {
        heading: "Set up a home security camera",
        difficulty: "easy", time: "15 minutes",
        steps: [
          "Download the camera's app (Ring, Arlo, Nest, Blink etc.).",
          "Create an account and sign in.",
          "Plug in the camera or insert batteries.",
          "In the app: tap Add Device → scan QR code on camera → connect to Wi-Fi.",
          "Choose camera placement — aim for the main entry points: front door, back door.",
          "Set up motion alerts so you're notified when someone approaches.",
        ],
        tip: "Position cameras at 9 feet high — this is above arm's reach but still captures faces clearly. Too high and you only see the tops of heads.",
        upsell: "Our security guide covers motion zones, recording schedules, sharing access with family, and which cameras work in the dark.",
      },
    },
  ],

  Alexa: [
    {
      id: "start", type: "question",
      title: "What Alexa help do you need?",
      options: [
        { label: "Alexa not responding to me", icon: "🎤", nextId: "not_responding", tag: "popular" },
        { label: "Set up music or radio", icon: "🎵", nextId: "music", tag: "popular" },
        { label: "Alexa misunderstands commands", icon: "❓", nextId: "misunderstands" },
        { label: "Set reminders and alarms", icon: "⏰", nextId: "reminders", tag: "quick" },
        { label: "Connect to smart home devices", icon: "🏠", nextId: "smart_connect" },
        { label: "Privacy and listening concerns", icon: "🔒", nextId: "privacy" },
      ],
    },
    {
      id: "not_responding", type: "result",
      title: "Alexa Not Responding",
      result: {
        heading: "Fix Alexa not hearing or responding",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Check the microphone isn't muted — there's a physical mute button on top (red ring = muted).",
          "Make sure the device has power — the ring light should be off when idle.",
          "Try unplugging and plugging back in.",
          "Check your Wi-Fi — Alexa needs internet to work. Try 'Alexa, are you connected?'",
          "Retrain your wake word: Alexa app → Devices → your Echo → Wake Word → Learn Wake Word.",
          "Reduce background noise — Alexa struggles with TV or music playing nearby.",
        ],
        tip: "Place your Echo away from walls and corners — at least 8 inches — for the best microphone pickup. Corners create echo that confuses it.",
        upsell: "Our Alexa guide covers 50 voice commands most users never know about, including calling family members hands-free.",
      },
    },
    {
      id: "music", type: "result",
      title: "Set Up Music on Alexa",
      result: {
        heading: "Set up music and radio on Alexa",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Open the Alexa app → More → Settings → Music & Podcasts.",
          "Link your music service: Spotify, Amazon Music, Apple Music, etc.",
          "Set a default music service so Alexa knows where to play.",
          "Say 'Alexa, play [artist name]' or 'Alexa, play jazz music'.",
          "For radio: 'Alexa, play BBC Radio 2' or 'Alexa, open TuneIn' for thousands of stations.",
          "Set volume with 'Alexa, set volume to 5' (scale of 1–10).",
        ],
        tip: "Amazon Music Unlimited (free with Prime trial) gives access to 100 million songs. Say 'Alexa, play more songs like this' to build a personal radio station.",
        upsell: "Multi-room audio — play the same music in every room simultaneously. Our guide shows the 2-minute setup.",
      },
    },
    {
      id: "reminders", type: "result",
      title: "Set Reminders and Alarms",
      result: {
        heading: "Set reminders, alarms and timers",
        difficulty: "easy", time: "1 minute",
        steps: [
          "Alarm: 'Alexa, set an alarm for 7am tomorrow'",
          "Timer: 'Alexa, set a 20 minute timer for the oven'",
          "Reminder: 'Alexa, remind me to take my medication at 8pm every day'",
          "Recurring: 'Alexa, set an alarm for 6:30am Monday through Friday'",
          "Cancel: 'Alexa, cancel my 7am alarm'",
          "Check: 'Alexa, what alarms do I have set?'",
        ],
        tip: "Set up medication reminders on ALL your Echo devices — 'Alexa, announce my reminders on all devices' — so you hear it in every room!",
        upsell: "Our Alexa guide covers 15 types of reminders including location-based alerts ('remind me when I get home').",
      },
    },
    {
      id: "misunderstands", type: "result",
      title: "Alexa Misunderstands",
      result: {
        heading: "Fix Alexa misunderstanding commands",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Speak clearly and wait for the blue ring to appear before speaking.",
          "Retrain voice recognition: Alexa app → Devices → your Echo → Voice ID → set up.",
          "Check your accent settings: Settings → Alexa Preferences → Language.",
          "Review misunderstood commands: Alexa app → Activity → Voice History → correct them.",
          "Rename smart home devices to simple names: 'lounge light' is easier than 'Philips Hue Bulb 1'.",
        ],
        tip: "The Voice History section in the Alexa app shows every command Alexa heard — including ones it got wrong. You can correct them to improve accuracy over time.",
        upsell: "Our guide covers Alexa's 'Teach Alexa' feature which dramatically improves recognition for accents and uncommon names.",
      },
    },
    {
      id: "smart_connect", type: "result",
      title: "Connect Smart Devices",
      result: {
        heading: "Connect smart home devices to Alexa",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Set up the device with its own app first (Philips Hue, Ring, Nest etc.).",
          "In Alexa app: tap Devices → + → Add Device → select brand.",
          "Follow the skill linking instructions — usually just sign into the device's account.",
          "Say 'Alexa, discover devices' to scan for new items.",
          "Create groups: Alexa app → Devices → + → Add Group — put all bedroom lights together.",
          "Test: 'Alexa, turn off bedroom lights'.",
        ],
        tip: "Create a group called 'Downstairs' with all your ground floor devices — one command turns off your entire floor. So much easier than controlling each device separately.",
        upsell: "Our smart home guide covers connecting 20+ device brands to Alexa with step-by-step screenshots.",
      },
    },
    {
      id: "privacy", type: "result",
      title: "Alexa Privacy Settings",
      result: {
        heading: "Take control of Alexa's privacy",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Delete voice recordings: Alexa app → More → Settings → Alexa Privacy → Manage History.",
          "Set auto-delete: choose to auto-delete recordings every 3 months.",
          "Turn off personalised ads: Alexa app → Settings → Alexa Privacy → Manage Ad Preferences.",
          "Mute microphone when not in use: press the microphone button (orange ring = muted).",
          "Review app permissions: Alexa app → Skills → Your Skills → check each skill's permissions.",
        ],
        tip: "You can say 'Alexa, delete everything I said today' and it will wipe today's recordings immediately — no app needed.",
        upsell: "Our guide covers full Alexa privacy setup including stopping recordings, disabling purchasing by voice, and setting up a voice PIN.",
      },
    },
  ],

  Camera: [
    {
      id: "start", type: "question",
      title: "What camera help do you need?",
      options: [
        { label: "How to update firmware", icon: "🔄", nextId: "firmware", tag: "popular" },
        { label: "Photos are blurry or dark", icon: "📸", nextId: "blur", tag: "popular" },
        { label: "Transfer photos to computer", icon: "💾", nextId: "transfer", tag: "quick" },
        { label: "Camera won't turn on", icon: "⚡", nextId: "wont_start" },
        { label: "SD card error", icon: "💳", nextId: "sd_card", tag: "quick" },
        { label: "Best settings for beginners", icon: "⚙️", nextId: "settings" },
      ],
    },
    {
      id: "firmware", type: "result",
      title: "Update Camera Firmware",
      result: {
        heading: "Update your camera firmware safely",
        difficulty: "medium", time: "20 minutes",
        steps: [
          "Go to your camera brand's website (canon.com, nikon.com, sony.com etc.).",
          "Find Support → Software Downloads → enter your exact camera model.",
          "Download the latest firmware file to your computer.",
          "Copy the file to an empty SD card (no other files on it).",
          "Insert the SD card into the camera — go to Setup Menu → Firmware Update.",
          "Follow on-screen instructions. DO NOT turn off camera or remove battery during update.",
        ],
        tip: "Firmware updates often fix annoying bugs AND add new features for free. Canon's recent update added eye-tracking autofocus to older models worth $500 extra when new!",
        upsell: "Our camera guide covers what each firmware update actually changes and whether it's worth installing for your shooting style.",
      },
    },
    {
      id: "blur", type: "question",
      title: "What kind of blur are you getting?",
      options: [
        { label: "Everything looks blurry", icon: "🌫️", nextId: "blur_general", tag: "popular" },
        { label: "Moving subjects are blurry", icon: "🏃", nextId: "blur_motion" },
        { label: "Photos are too dark", icon: "🌑", nextId: "dark_photos" },
        { label: "Photos are too bright/washed out", icon: "☀️", nextId: "bright_photos" },
      ],
    },
    {
      id: "blur_general", type: "result",
      title: "Fix Blurry Photos",
      result: {
        heading: "Fix consistently blurry photos",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Check the lens — fingerprints are the #1 cause of blur. Clean with a microfibre cloth.",
          "Make sure autofocus is ON: look for an AF/MF switch on the lens or camera body.",
          "Half-press the shutter button to let it focus before fully pressing to shoot.",
          "Switch to Single Point focus mode — your camera focuses exactly where you point it.",
          "Check Image Stabilisation is turned ON in the lens or camera menu.",
          "Try shooting in better light — darkness forces slower shutter speeds that blur easily.",
        ],
        tip: "Hold your elbows against your body and exhale slowly before pressing the shutter — this reduces camera shake by up to 50%!",
        upsell: "Our camera guide covers the exposure triangle in plain English — understanding just 3 settings transforms every photo you take.",
      },
    },
    {
      id: "transfer", type: "result",
      title: "Transfer Photos to Computer",
      result: {
        heading: "Transfer photos to your computer",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "USB cable: connect camera to computer → camera appears as a drive → copy photos across.",
          "SD card: remove card from camera → insert into computer's card slot or USB reader.",
          "Wi-Fi transfer: most modern cameras have a Canon Camera Connect / Sony Imaging Edge app.",
          "On Windows: Photos app detects camera automatically when connected.",
          "On Mac: Image Capture app opens automatically.",
          "Create dated folders to organise as you go — saves hours later.",
        ],
        tip: "Set up auto-import to Google Photos or iCloud — they give 15GB free storage and create automatic albums, memories, and even shareable family albums.",
        upsell: "Our guide covers setting up automatic photo backup so you never lose a picture, even if your camera is lost or damaged.",
      },
    },
    {
      id: "wont_start", type: "result",
      title: "Camera Won't Turn On",
      result: {
        heading: "Fix a camera that won't turn on",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Charge the battery for at least 1 hour — even new batteries can be depleted in storage.",
          "Check the battery is inserted correctly — there's usually a directional arrow.",
          "Remove and reinsert the battery.",
          "Try a different power outlet or USB charger.",
          "Remove SD card and try without it — a corrupted card can prevent startup.",
          "Hold the power button for 5 full seconds — some cameras have a delayed startup.",
        ],
        tip: "Camera batteries lose charge in cold weather — if you're outdoors in winter, keep a spare battery in your pocket to warm it up and swap when needed.",
        upsell: "Our guide covers battery maintenance tips that double the lifespan of your camera battery — saving $40–$80 per replacement.",
      },
    },
    {
      id: "sd_card", type: "result",
      title: "SD Card Error",
      result: {
        heading: "Fix SD card errors",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Remove the card and check for physical damage — bent contacts or cracks.",
          "Clean the gold contacts with a dry eraser, then reinsert.",
          "Try the card in a computer — if it shows there, the camera slot may have dust.",
          "Format the card IN the camera: Menu → Setup → Format Card (this erases all photos — back up first!).",
          "If card is corrupt, try free recovery software: Recuva (Windows) or PhotoRec (Mac).",
        ],
        tip: "Format your SD card in the camera (not the computer) before every shoot — this prevents 90% of card errors and prepares it specifically for your camera model.",
        upsell: "Our guide recommends specific SD card brands that work best with each major camera — cheap cards cause 70% of all memory errors.",
      },
    },
    {
      id: "settings", type: "result",
      title: "Best Beginner Settings",
      result: {
        heading: "Best camera settings for beginners",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Start with Auto mode — your camera will handle everything while you learn composition.",
          "Switch to 'P' (Program) mode when you're comfortable — more control, still auto exposure.",
          "Set image quality to Large Fine JPEG — best balance of quality and file size.",
          "Turn ON image stabilisation (IS/VR/OSS depending on brand).",
          "Set autofocus to 'Single AF' for still subjects, 'Continuous AF' for moving ones.",
          "Turn ON the histogram display — it shows if your photo is too bright or too dark.",
        ],
        tip: "The rule of thirds: imagine your photo divided into a 3x3 grid. Place your subject at one of the 4 intersection points instead of the centre — instantly more professional!",
        upsell: "Our beginner photography guide covers 10 composition rules, best settings for portraits, landscapes, and night shots — all in plain English.",
      },
    },
    {
      id: "blur_motion", type: "result",
      title: "Fix Motion Blur",
      result: {
        heading: "Freeze moving subjects sharply",
        difficulty: "medium", time: "5 minutes",
        steps: [
          "Use Sport/Action mode — your camera automatically uses faster shutter speeds.",
          "Or in Manual: set shutter speed to at least 1/500s for running people.",
          "Switch autofocus to 'Continuous AF' (AI Servo on Canon, AF-C on Sony/Nikon).",
          "Enable Burst Mode — hold the shutter for multiple shots, pick the sharpest.",
          "Increase ISO if indoors — this lets faster shutter speeds in darker conditions.",
        ],
        tip: "Panning technique: follow the subject's movement with your camera as you shoot. The subject stays sharp while the background blurs — a professional sports photography look.",
        upsell: "Our sports and action photography guide covers the exact settings for pets, kids, sports and wildlife.",
      },
    },
    {
      id: "dark_photos", type: "result",
      title: "Fix Dark Photos",
      result: {
        heading: "Fix photos that are too dark",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Find the Exposure Compensation button (±) — press it and dial to +1 or +2.",
          "Or use Portrait/Indoor mode which automatically brightens for low-light.",
          "Turn on your camera's built-in flash for indoor shots.",
          "Increase ISO: try 800 or 1600 for indoor without flash (some graininess is okay).",
          "Open your aperture wider if you have a kit lens — lowest f-number (f/3.5 or f/1.8).",
        ],
        tip: "Most cameras have a scene auto-detection mode — it recognises you're indoors and adjusts automatically. Look for a little face or flower icon on the mode dial.",
        upsell: "Our guide teaches the exposure triangle in 10 minutes — understanding ISO, aperture and shutter speed unlocks perfect photos in any light.",
      },
    },
    {
      id: "bright_photos", type: "result",
      title: "Fix Overexposed Photos",
      result: {
        heading: "Fix photos that are too bright",
        difficulty: "easy", time: "3 minutes",
        steps: [
          "Press the Exposure Compensation button (±) and dial to -1 or -2.",
          "If shooting in bright sunshine, use Sunny/Beach mode.",
          "Switch to Spot or Center-weighted metering if sky is blowing out.",
          "Use your lens hood to reduce lens flare in direct sunlight.",
          "Shoot in RAW format if available — much more recovery detail than JPEG.",
        ],
        tip: "Shoot in the 'golden hour' — the hour after sunrise and before sunset. The warm, angled light makes everything look beautiful without any settings adjustments at all.",
        upsell: "Our lighting guide shows how to use natural light to its full potential — the most impactful photography skill with zero equipment cost.",
      },
    },
  ],

  Security: [
    {
      id: "start", type: "question",
      title: "What security help do you need?",
      options: [
        { label: "I think I have a virus", icon: "🦠", nextId: "virus", tag: "popular" },
        { label: "My email was hacked", icon: "📧", nextId: "hacked_email", tag: "popular" },
        { label: "Set up antivirus protection", icon: "🛡️", nextId: "antivirus", tag: "quick" },
        { label: "Password help", icon: "🔑", nextId: "password", tag: "popular" },
        { label: "Suspicious email or scam", icon: "⚠️", nextId: "scam" },
        { label: "Secure my home Wi-Fi", icon: "📶", nextId: "wifi_security" },
      ],
    },
    {
      id: "virus", type: "result",
      title: "I Think I Have a Virus",
      result: {
        heading: "Check for and remove viruses",
        difficulty: "easy", time: "20 minutes",
        steps: [
          "Don't panic — most 'virus warnings' on websites are fake scam pop-ups. Don't call any numbers.",
          "Real virus check: Windows Security (built into Windows 10/11) → Virus & Threat Protection → Quick Scan.",
          "For deeper check: download Malwarebytes Free (malwarebytes.com) — run a full scan.",
          "If a scan finds something: let the software quarantine or remove it.",
          "Change your passwords after any infection — especially email and banking.",
          "Update Windows: Settings → Update & Security → Check for Updates.",
        ],
        tip: "Windows Defender (built into Windows 10/11 for free) is now rated as one of the best antivirus programs available — you don't need to buy anything extra!",
        upsell: "Our security guide covers the 5 signs your computer has been compromised — and the exact steps to take for each one.",
      },
    },
    {
      id: "hacked_email", type: "result",
      title: "Email Was Hacked",
      result: {
        heading: "What to do if your email was hacked",
        difficulty: "medium", time: "30 minutes",
        steps: [
          "Immediately change your email password — use a strong one (12+ characters, mix of letters and numbers).",
          "Enable Two-Factor Authentication (2FA) on your email — Settings → Security → 2-Step Verification.",
          "Check your email's Sent folder — see what the hacker sent from your account.",
          "Check forwarding rules: Settings → Forwarding — delete any you didn't set up.",
          "Email your contacts warning them you were hacked — they may have got suspicious messages.",
          "Change passwords for any accounts that use this email for login.",
        ],
        tip: "Check haveibeenpwned.com — enter your email address to see if it appeared in any data breaches. This is the most common way hackers get in.",
        upsell: "Our security guide walks you through a complete email account lockdown in 15 minutes — including all the hidden security settings most people miss.",
      },
    },
    {
      id: "antivirus", type: "result",
      title: "Set Up Antivirus",
      result: {
        heading: "Set up free antivirus protection",
        difficulty: "easy", time: "10 minutes",
        steps: [
          "Windows 10/11: Windows Defender is already installed and excellent — just make sure it's ON.",
          "Check: Settings → Privacy & Security → Windows Security → Virus & Threat Protection.",
          "Make sure Real-time protection is ON.",
          "For extra protection: add Malwarebytes Free (malwarebytes.com) as a second scanner.",
          "Schedule weekly scans: Windows Security → Virus & Threat Protection → Scan Options.",
          "Keep Windows updated — updates include critical security patches.",
        ],
        tip: "You do NOT need to pay for antivirus. Windows Defender + Malwarebytes Free covers 99% of threats and both are completely free. Save your money!",
        upsell: "Our security guide covers browser extensions that block ads and tracking — they also prevent most malware from reaching your computer in the first place.",
      },
    },
    {
      id: "password", type: "result",
      title: "Password Help",
      result: {
        heading: "Create and manage strong passwords",
        difficulty: "easy", time: "15 minutes",
        steps: [
          "Use a password manager: Bitwarden (free) or LastPass — one password to remember all others.",
          "Strong password formula: 3 random words + numbers + symbol: BlueTreeLamp42! — easy to remember, hard to crack.",
          "Never reuse passwords — if one site is hacked, attackers try your password everywhere.",
          "Enable Two-Factor Authentication (2FA) on important accounts: email, banking, Amazon.",
          "Check if your passwords are compromised: Google Chrome → Settings → Passwords → Check Passwords.",
        ],
        tip: "A 4-word passphrase like 'correct horse battery staple' is more secure than 'P@ssw0rd123' and much easier to remember. Length beats complexity every time.",
        upsell: "Our security guide covers setting up Bitwarden (free password manager) from scratch — takes 20 minutes and protects all your accounts forever.",
      },
    },
    {
      id: "scam", type: "result",
      title: "Suspicious Email or Scam",
      result: {
        heading: "Identify and deal with scams",
        difficulty: "easy", time: "5 minutes",
        steps: [
          "Look at the sender's email address — scammers use fake addresses like amazon@amazon-support.net.",
          "Hover over any links before clicking — the real URL shows at the bottom of your browser.",
          "Never call phone numbers in emails claiming to be from Microsoft, Amazon or your bank.",
          "Real companies NEVER ask for passwords, gift cards or wire transfers by email.",
          "Forward scam emails to: phishing@reportfraud.ftc.gov (US) or report@phishing.gov.uk (UK).",
          "If you accidentally clicked: immediately change relevant passwords and run a virus scan.",
        ],
        tip: "The #1 sign of a scam email: urgency ('Your account will be closed in 24 hours!'). Real companies give you time. Scammers want you to panic and act without thinking.",
        upsell: "Our security guide includes a printable scam identification checklist — great to keep by your computer or share with elderly family members.",
      },
    },
    {
      id: "wifi_security", type: "result",
      title: "Secure Your Home Wi-Fi",
      result: {
        heading: "Secure your home Wi-Fi network",
        difficulty: "medium", time: "20 minutes",
        steps: [
          "Log into your router: open browser, type 192.168.1.1 or 192.168.0.1 — check router label for correct address.",
          "Change the default router password — the username/password on the label should be changed immediately.",
          "Make sure Wi-Fi security is set to WPA3 or WPA2 (not WEP — it's easily hacked).",
          "Change your Wi-Fi password to something strong — 12+ characters.",
          "Enable Guest Network for visitors — this keeps your main devices isolated.",
          "Disable WPS (Wi-Fi Protected Setup) — it's a known security vulnerability.",
        ],
        tip: "Check who's on your Wi-Fi: log into your router → look for 'Connected Devices'. Any device you don't recognise? Change your Wi-Fi password immediately.",
        upsell: "Our complete home security guide covers router hardening, VPN setup for when you're on public Wi-Fi, and parental controls.",
      },
    },
  ],
};

const TOPIC_FEATURES: Record<string, { icon: string; title: string; desc: string }[]> = {
  Printer: [
    { icon: "⚡", title: "2 min fixes", desc: "Most issues solved fast" },
    { icon: "🏷️", title: "All brands", desc: "HP, Canon, Epson, Brother" },
    { icon: "💡", title: "Hidden tips", desc: "Features you didn't know" },
  ],
  GPS: [
    { icon: "🗺️", title: "All GPS types", desc: "Garmin, TomTom, in-car" },
    { icon: "📱", title: "Phone too", desc: "Google Maps, Apple Maps" },
    { icon: "💡", title: "Route tricks", desc: "Save hours on every trip" },
  ],
  "Smart Home": [
    { icon: "🔵", title: "Alexa + Google", desc: "Both platforms covered" },
    { icon: "💡", title: "Smart devices", desc: "Lights, locks, cameras" },
    { icon: "⚡", title: "Quick setup", desc: "10 min from box to working" },
  ],
  Alexa: [
    { icon: "🎤", title: "50+ commands", desc: "Most people use only 5" },
    { icon: "🏠", title: "Smart home", desc: "Control everything by voice" },
    { icon: "🔒", title: "Privacy guide", desc: "Take control of your data" },
  ],
  Camera: [
    { icon: "📸", title: "All skill levels", desc: "From auto to manual" },
    { icon: "🏷️", title: "All brands", desc: "Canon, Nikon, Sony, more" },
    { icon: "💡", title: "Pro tips", desc: "Look like a photographer" },
  ],
  Security: [
    { icon: "🛡️", title: "100% free tools", desc: "No paid software needed" },
    { icon: "⚡", title: "Fast protection", desc: "Secure in 20 minutes" },
    { icon: "🔑", title: "Password safety", desc: "Never get hacked again" },
  ],
};

const TABS = [
  { id: "pdf", label: "PDF Guide", sublabel: "Learn at your own pace", icon: FileText },
  { id: "ai", label: "Start My Lesson", sublabel: "Guided learning journey", icon: Zap },
  { id: "expert", label: "Expert Help", sublabel: "One-on-one guidance", icon: UserCheck },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function TechBridgeLearnLayout({ config }: { config: TechBridgeLearnConfig }) {
  const [activeTab, setActiveTab] = useState<TabId>("ai");
  const steps = DIAGNOSTIC_STEPS[config.topic] || DIAGNOSTIC_STEPS["Printer"];
  const features = TOPIC_FEATURES[config.topic] || TOPIC_FEATURES["Printer"];

  return (
    <div id="learn" className="scroll-mt-20">
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-700 font-black text-xs uppercase tracking-[0.2em] mb-6">
            3 Ways to Get Help
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Choose How You Learn</h2>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium mb-12">
            Everyone learns differently. Start with the option that feels right.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
                  className={`relative p-6 rounded-[2rem] border-2 text-left transition-all duration-300 group ${
                    isActive ? "bg-zinc-900 border-zinc-900 shadow-2xl" : "bg-white border-zinc-100 hover:border-zinc-300 shadow-sm"
                  }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isActive ? "bg-blue-600" : "bg-zinc-100 group-hover:bg-blue-50"
                  }`}>
                    <Icon size={22} className={isActive ? "text-white" : "text-zinc-500 group-hover:text-blue-600"} />
                  </div>
                  <div className={`font-black text-xl mb-1 ${isActive ? "text-white" : "text-zinc-900"}`}>{tab.label}</div>
                  <div className={`text-sm font-medium mb-3 ${isActive ? "text-zinc-400" : "text-zinc-500"}`}>{tab.sublabel}</div>
                  <div className={`flex items-center gap-1 text-xs font-black uppercase tracking-widest ${
                    isActive ? "text-blue-400" : "text-zinc-400 group-hover:text-blue-600"
                  }`}>
                    {isActive ? "Currently selected" : "Select this"}<ChevronRight size={12} />
                  </div>
                  {isActive && <motion.div layoutId="activeTab" className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          {activeTab === "pdf" && (
            <PDFGuideSection topic={config.topic} pdfTitle={config.pdfTitle}
              pdfDescription={config.pdfDescription} highlights={config.pdfHighlights} />
          )}
          {activeTab === "ai" && (
            <SmartDiagnostic topic={config.topic} steps={steps}
              brandExamples={config.brandExamples} features={features} />
          )}
          {activeTab === "expert" && (
            <ExpertConsultantSection topic={config.topic} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
