"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, CheckCircle2, ArrowLeft, RotateCcw,
  Lightbulb, ThumbsUp, Sparkles, Heart, Star, Mail, Phone, UserCheck
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StepOption {
  label: string;
  icon: string;
  nextId?: string;
  tag?: "popular" | "quick" | "advanced";
}

interface GuidedStep {
  id: string;
  type: "question" | "result";
  title: string;
  subtitle?: string;
  options?: StepOption[];
  result?: {
    heading: string;
    steps: string[];
    tip?: string;
    upsell?: string;
    difficulty: "easy" | "medium" | "hard";
    time: string;
  };
}

interface AITroubleshooterProps {
  topic: string;
  brandExamples: string[];
  starterQuestions: string[];
}

// ─── 15-Step Guided Flows per topic ──────────────────────────────────────────

const FLOWS: Record<string, GuidedStep[]> = {
  Printer: [
    {
      id: "start", type: "question",
      title: "What's going on with your printer?",
      subtitle: "Select the topic you want to learn about",
      options: [
        { label: "Won't connect to Wi-Fi", icon: "📶", nextId: "wifi", tag: "popular" },
        { label: "Paper jam", icon: "📄", nextId: "jam", tag: "quick" },
        { label: "Ink or print quality", icon: "🖨️", nextId: "ink", tag: "popular" },
        { label: "Shows offline", icon: "❌", nextId: "offline" },
        { label: "Scanner not working", icon: "🔍", nextId: "scanner" },
        { label: "Driver / software", icon: "💻", nextId: "driver" },
      ],
    },
    {
      id: "wifi", type: "question", title: "What device are you printing from?",
      options: [
        { label: "Windows PC", icon: "🖥️", nextId: "wifi_win" },
        { label: "Mac", icon: "🍎", nextId: "wifi_mac" },
        { label: "iPhone / iPad", icon: "📱", nextId: "wifi_ios", tag: "quick" },
        { label: "Android phone", icon: "📲", nextId: "wifi_android" },
      ],
    },
    {
      id: "wifi_win", type: "result", title: "Wi-Fi on Windows",
      result: {
        heading: "Connect your printer to Wi-Fi (Windows)", difficulty: "easy", time: "5–10 min",
        steps: [
          "Make sure the printer is ON and near your Wi-Fi router.",
          "On the printer screen: tap Settings → Network → Wireless Setup Wizard.",
          "Select your Wi-Fi network and enter your password.",
          "On your PC: Start → Settings → Devices → Printers & Scanners → Add a Printer.",
          "Your printer appears in the list — click it, then click Add.",
          "Print a test page to confirm it's working.",
        ],
        tip: "Most printers have a WPS button — press it + press WPS on your router for instant wireless connection without typing a password!",
        upsell: "Want to go deeper? Our educators offer live video lessons where you'll learn exactly how this works on your device.",
      },
    },
    {
      id: "wifi_mac", type: "result", title: "Wi-Fi on Mac",
      result: {
        heading: "Connect printer to Wi-Fi (Mac)", difficulty: "easy", time: "5 min",
        steps: [
          "First connect the printer to Wi-Fi using its own touchscreen menu.",
          "On your Mac: Apple menu → System Settings → Printers & Scanners.",
          "Click the + button to add a printer.",
          "Your printer appears — select it and click Add.",
          "macOS downloads the driver automatically.",
          "AirPrint printers work with zero setup on Mac — just make sure both are on the same Wi-Fi.",
        ],
        tip: "If your printer supports AirPrint, you don't need to install any software at all — it just works on Mac!",
        upsell: "Want to learn how Mac and printer connections work? Our educators cover this in detail in our printer course.",
      },
    },
    {
      id: "wifi_ios", type: "result", title: "Print from iPhone/iPad",
      result: {
        heading: "Print from iPhone or iPad", difficulty: "easy", time: "2 min",
        steps: [
          "Make sure your iPhone and printer are on the same Wi-Fi network.",
          "Open the document, photo, or email you want to print.",
          "Tap the Share button (square with arrow pointing up).",
          "Scroll down and tap Print.",
          "Tap Select Printer — your printer appears automatically.",
          "Choose copies and tap Print in the top right corner.",
        ],
        tip: "This works with any AirPrint printer — HP, Canon, Epson, Brother all support it. No app or cable needed!",
        upsell: "Did you know you can scan straight back to your iPhone from most printers? Learn how in our printer course.",
      },
    },
    {
      id: "wifi_android", type: "result", title: "Print from Android",
      result: {
        heading: "Print from your Android phone", difficulty: "easy", time: "3 min",
        steps: [
          "Download your printer's app: HP Smart, Canon Print, Epson iPrint, etc.",
          "Make sure your phone and printer are on the same Wi-Fi network.",
          "Open the app → Add your printer (it finds it automatically).",
          "From any document: tap Share → Print → select your printer.",
          "Or go to phone Settings → Connections → Printing.",
          "Install Mopria Print Service (free) as a universal alternative.",
        ],
        tip: "The HP Smart, Canon PRINT, and Epson iPrint apps are all free and make wireless printing incredibly easy from Android.",
        upsell: "Our guide covers wireless printing from Android for every major printer brand.",
      },
    },
    {
      id: "jam", type: "result", title: "Understanding Paper Jams",
      result: {
        heading: "Clear a paper jam safely", difficulty: "easy", time: "2–5 min",
        steps: [
          "Turn the printer OFF and unplug it — this prevents damage.",
          "Open the front or top cover and look for jammed paper.",
          "Pull the paper slowly and gently — always pull in the direction paper naturally travels.",
          "Check the rear access door too — many jams leave pieces there.",
          "Remove any small torn scraps with tweezers if needed.",
          "Close all covers, plug in, and turn on — it resets automatically.",
        ],
        tip: "Fan your paper stack before loading — this prevents multiple sheets feeding at once, which is the #1 cause of jams!",
        upsell: "Our guide covers the 7 most common jam causes and how to prevent them permanently.",
      },
    },
    {
      id: "ink", type: "question", title: "What exactly is the ink issue?",
      options: [
        { label: "Prints faded or streaky", icon: "🌫️", nextId: "ink_faded", tag: "popular" },
        { label: "Wrong colours", icon: "🎨", nextId: "ink_colour" },
        { label: "Cartridge not recognised", icon: "❓", nextId: "ink_notfound", tag: "quick" },
        { label: "How to replace cartridges", icon: "🔧", nextId: "ink_replace" },
      ],
    },
    {
      id: "ink_faded", type: "result", title: "Understanding Faded Prints",
      result: {
        heading: "Understanding faded and streaky prints", difficulty: "easy", time: "5 min",
        steps: [
          "On the printer: go to Settings → Maintenance (or Tools).",
          "Run Print Head Cleaning or Nozzle Check — this unblocks dried ink.",
          "Print a test page after cleaning to check improvement.",
          "If still faded, run the cleaning cycle one more time (max 3 times).",
          "Check ink levels — low ink causes fading even if cartridge isn't empty.",
          "Try plain paper first — glossy paper needs specific settings to look right.",
        ],
        tip: "Printers left unused for weeks get clogged nozzles. Print a colour test page once a week to keep them flowing!",
        upsell: "Save 40% on ink — our guide covers draft mode, ink-saving settings, and best value cartridge brands.",
      },
    },
    {
      id: "ink_notfound", type: "result", title: "Cartridge Not Recognised",
      result: {
        heading: "Understanding Cartridge Recognition", difficulty: "easy", time: "3 min",
        steps: [
          "Remove the cartridge and check for orange protective tape — peel ALL of it off.",
          "Look for the gold/copper chip on the cartridge — clean gently with a dry cloth.",
          "Reinsert the cartridge firmly until you hear a click.",
          "Turn the printer off, wait 30 seconds, then turn back on.",
          "If still unrecognised, try reinserting in a different slot temporarily.",
        ],
        tip: "Third-party cartridges sometimes trigger this. Your printer's app may need an update to accept newer refill brands.",
        upsell: "Our educators cover every brand in our printer course — including the quirks that most guides miss.",
      },
    },
    {
      id: "ink_replace", type: "result", title: "Replace Ink Cartridges",
      result: {
        heading: "Replace ink cartridges step by step", difficulty: "easy", time: "3 min",
        steps: [
          "Turn the printer ON — the cartridge holder moves to the swap position.",
          "Open the cartridge access door (usually front or top).",
          "Press down on the old cartridge to release it, then pull out.",
          "Remove new cartridge from packaging and peel off ALL protective tape.",
          "Slide into its colour-matched slot until it clicks firmly.",
          "Close the door — the printer aligns and calibrates automatically.",
        ],
        tip: "Never shake ink cartridges — it causes air bubbles. Store spare cartridges upright at room temperature.",
        upsell: "Want to know which third-party brands give 90% quality at 40% the price? Our guide covers the best tested alternatives.",
      },
    },
    {
      id: "ink_colour", type: "result", title: "Understanding Colour Printing",
      result: {
        heading: "Understanding colour printing issues", difficulty: "medium", time: "10 min",
        steps: [
          "Run a nozzle check from the Maintenance menu.",
          "Run a print head alignment from Settings → Tools.",
          "Check you're using the correct paper type setting — glossy vs plain affects colour.",
          "In print dialog, make sure colour isn't set to Greyscale or Draft.",
          "If one colour is missing entirely, that cartridge may be empty or blocked.",
        ],
        tip: "Calibrating your printer to your specific paper brand takes 2 minutes and makes photos look dramatically better.",
        upsell: "Our photography printing guide shows how to get gallery-quality prints at home for pennies.",
      },
    },
    {
      id: "offline", type: "result", title: "Printer Shows Offline",
      result: {
        heading: "Understanding Printer Offline Status", difficulty: "easy", time: "5 min",
        steps: [
          "Turn printer completely off, wait 30 seconds, turn back on.",
          "Restart your computer or phone too.",
          "On Windows: Control Panel → Devices → right-click printer → See what's printing.",
          "Untick Use Printer Offline if it's checked.",
          "If still offline, delete the printer and re-add it via Settings → Devices.",
          "Confirm both printer and computer are on the same Wi-Fi network.",
        ],
        tip: "Giving your printer a static IP address stops it going offline every time your router restarts. Our GPS course covers networking basics.",
        upsell: "This is the most common printer question we cover. If these steps don't help, book a live lesson and we'll walk through it together.",
      },
    },
    {
      id: "scanner", type: "result", title: "Scanner Not Working",
      result: {
        heading: "Understanding Printer Scanning", difficulty: "medium", time: "10 min",
        steps: [
          "Make sure you installed the full software — not just the basic driver.",
          "Open your printer app: HP Smart, Canon IJ Scan, Epson Scan, etc.",
          "Try scanning from the printer app directly rather than Windows Scan.",
          "If using USB, try a different port or cable.",
          "Download the latest full driver from your printer brand's website.",
          "On Windows: press Win+R → type services.msc → find Windows Image Acquisition → restart it.",
        ],
        tip: "Most scanners can email documents directly to you with one button press — no computer needed! Look for a Scan to Email button.",
        upsell: "Our complete guide includes scanner setup for all major brands with screenshots.",
      },
    },
    {
      id: "driver", type: "result", title: "Driver or Software Issues",
      result: {
        heading: "Understanding Printer Drivers", difficulty: "medium", time: "15 min",
        steps: [
          "Go to your printer brand's website (hp.com, canon.com, epson.com, etc.).",
          "Search your exact model number — it's on a sticker on the printer.",
          "Download the latest Full Feature Software for your operating system.",
          "Before installing: go to Settings → Apps → uninstall old printer software first.",
          "Run the new installer and follow the setup wizard.",
          "Restart your computer after installation completes.",
        ],
        tip: "Bookmark your printer manufacturer's website — they release firmware updates that improve features. Check every 3 months.",
        upsell: "Drivers confusing you? Our educators cover complete printer driver setup in our live lesson sessions — step by step.",
      },
    },
  ],

  GPS: [
    {
      id: "start", type: "question", title: "What's going on with your GPS?",
      options: [
        { label: "Maps are outdated", icon: "🗺️", nextId: "maps", tag: "popular" },
        { label: "GPS won't turn on", icon: "⚡", nextId: "power", tag: "quick" },
        { label: "Wrong directions", icon: "🔀", nextId: "wrong", tag: "popular" },
        { label: "No satellite signal", icon: "📡", nextId: "signal" },
        { label: "Screen frozen / slow", icon: "🐢", nextId: "frozen" },
        { label: "How to plan a route", icon: "📍", nextId: "route" },
      ],
    },
    {
      id: "maps", type: "question", title: "Which GPS device do you have?",
      options: [
        { label: "Garmin", icon: "🟠", nextId: "garmin", tag: "popular" },
        { label: "TomTom", icon: "🔴", nextId: "tomtom" },
        { label: "Built-in car GPS", icon: "🚗", nextId: "car_gps" },
        { label: "Google/Apple Maps", icon: "📱", nextId: "phone_maps", tag: "quick" },
      ],
    },
    {
      id: "garmin", type: "result", title: "Update Garmin Maps",
      result: {
        heading: "Update your Garmin GPS maps", difficulty: "easy", time: "30–60 min",
        steps: [
          "Download Garmin Express free from garmin.com/express on your computer.",
          "Connect your Garmin to your computer with the USB cable.",
          "Open Garmin Express — it detects your device automatically.",
          "Click Add a Device if it's your first time.",
          "You'll see available map updates — click Install All.",
          "Leave it connected until complete — can take 30–60 minutes on first update.",
        ],
        tip: "Garmin offers one free lifetime map update on most devices. After that, updates are ~$50/year — worth it as roads change constantly!",
        upsell: "Our GPS guide covers Garmin's hidden features: speed camera alerts, fuel price displays, and custom POI downloads.",
      },
    },
    {
      id: "tomtom", type: "result", title: "Update TomTom Maps",
      result: {
        heading: "Update your TomTom GPS", difficulty: "easy", time: "30 min",
        steps: [
          "Download TomTom MyDrive Connect from tomtom.com on your computer.",
          "Connect your TomTom to your computer using the USB cable.",
          "MyDrive Connect opens automatically — sign in with your TomTom account.",
          "Click Update next to any available map or software updates.",
          "Keep the device connected until all updates complete.",
        ],
        tip: "TomTom Lifetime Maps subscription gives you free map updates forever. Check if your device came with it — many do!",
        upsell: "Our GPS guide covers TomTom's traffic alerts, speed camera warnings, and hands-free calling setup.",
      },
    },
    {
      id: "phone_maps", type: "result", title: "Update Phone Navigation",
      result: {
        heading: "Update Google Maps or Apple Maps", difficulty: "easy", time: "2 min",
        steps: [
          "Google Maps: Open app → tap your profile picture → Offline maps → Update.",
          "Apple Maps: Updates automatically with iOS — keep your iPhone updated.",
          "For offline maps: Google Maps → profile → Offline maps → Select your area.",
          "For Waze: it updates automatically — check Settings → General.",
          "Check you have enough storage — offline maps can be 1–3GB per region.",
        ],
        tip: "Download offline maps before long trips — they work without any mobile signal and are actually faster than live navigation!",
        upsell: "Google Maps has a hidden speedometer, speed limit display, and lane guidance — our guide shows you how to turn them all on.",
      },
    },
    {
      id: "car_gps", type: "result", title: "Update In-Car GPS",
      result: {
        heading: "Update your built-in car navigation", difficulty: "medium", time: "1–2 hours",
        steps: [
          "Find your car brand's navigation update portal (Toyota, Ford, BMW, Hyundai, etc.).",
          "Enter your car's VIN number to get the correct update for your exact model.",
          "Download the update to a USB drive (usually needs 8GB+ of free space).",
          "Insert USB into your car's USB port with the engine running.",
          "Follow the on-screen prompts — do NOT turn off the engine during the update.",
        ],
        tip: "Car manufacturer map updates can cost $150–$300, but third-party services like HERE Maps offer the same quality at 50% less for many models.",
        upsell: "Our in-car GPS guide covers all major brands plus hidden features like voice command lists and Android Auto/Apple CarPlay setup.",
      },
    },
    {
      id: "power", type: "result", title: "GPS Won't Turn On",
      result: {
        heading: "Fix a GPS that won't turn on", difficulty: "easy", time: "10 min",
        steps: [
          "Charge the device for at least 30 minutes — battery may be fully depleted.",
          "Try a different USB cable or charger — many GPS failures are actually charger failures.",
          "Hold the power button firmly for 10–15 seconds.",
          "Try connecting to your computer via USB — sometimes this jumpstarts it.",
          "Check the charging port for debris — use a toothpick gently to clean it.",
        ],
        tip: "GPS batteries lose capacity over years. If yours is 3+ years old and won't hold charge, a replacement battery costs ~$15 and is usually DIY-replaceable.",
        upsell: "If your GPS is beyond saving, our educators can advise on the best current models for your budget and driving needs.",
      },
    },
    {
      id: "wrong", type: "result", title: "Wrong Directions",
      result: {
        heading: "Fix incorrect or outdated route guidance", difficulty: "easy", time: "5 min",
        steps: [
          "First: update your maps — outdated maps are the #1 cause of wrong directions.",
          "Report incorrect roads in the app: tap the route → Report → Road issue.",
          "Check routing preferences — Avoid Tolls or Avoid Motorways can create odd routes.",
          "Make sure your destination is precise — use full address, not just town name.",
          "Try adding a waypoint near your destination to guide the route better.",
        ],
        tip: "Google Maps lets you report wrong directions — if enough users report the same issue, it gets fixed within days. You help everyone!",
        upsell: "Our GPS mastery guide shows advanced routing tricks: multi-stop planning, avoiding specific roads, and travel time prediction.",
      },
    },
    {
      id: "signal", type: "result", title: "No Satellite Signal",
      result: {
        heading: "Fix no GPS satellite signal", difficulty: "easy", time: "5 min",
        steps: [
          "Move to an open area — GPS is blocked by buildings, trees, and tunnels.",
          "Turn the GPS completely off and back on — forces a fresh satellite search.",
          "Wait 2–3 minutes in an open area — first fix after a long break can take time.",
          "Make sure the GPS isn't covered in a thick case.",
          "If persistent: Settings → Reset → GPS Data Reset (doesn't delete maps).",
        ],
        tip: "Start your GPS at home before you drive — gives it time to lock onto satellites before you need directions.",
        upsell: "Our guide covers mounting positions that maximise satellite reception in your specific vehicle.",
      },
    },
    {
      id: "frozen", type: "result", title: "Screen Frozen or Slow",
      result: {
        heading: "Fix a frozen or slow GPS", difficulty: "easy", time: "5 min",
        steps: [
          "Hold the power button for 10–15 seconds for a force restart.",
          "After restart: Settings → System → check for software updates.",
          "Delete old trips and saved locations — a full storage causes slowness.",
          "For phone navigation: clear the app's cache in Settings → Apps.",
          "Factory reset as last resort: Settings → System → Restore Factory Settings (saves your favourites first).",
        ],
        tip: "GPS devices slow down when 70%+ full — just like a computer. Delete old tracks and routes regularly for snappy performance.",
        upsell: "Our educators can walk you through a clean reset that keeps all your saved places intact.",
      },
    },
    {
      id: "route", type: "result", title: "Plan a Route",
      result: {
        heading: "Plan the perfect route", difficulty: "easy", time: "3 min",
        steps: [
          "Enter your destination — use full address for best accuracy.",
          "Before starting: tap route options to set toll/motorway preferences.",
          "To add stops: tap the route → Add Stop — drag stops to reorder them.",
          "Check the estimated arrival time and choose between route options shown.",
          "Save the route as a Favourite so you can access it without re-entering.",
        ],
        tip: "Plan multi-stop trips at home on the Garmin or Google Maps website — much easier on a big screen, then it syncs to your device automatically!",
        upsell: "Most GPS devices show petrol prices, parking availability, and restaurant ratings along your route — our guide shows you all of it.",
      },
    },
  ],

  "Smart Home": [
    {
      id: "start", type: "question", title: "What do you need help with?",
      options: [
        { label: "Set up Alexa", icon: "🔵", nextId: "alexa_setup", tag: "popular" },
        { label: "Device won't connect", icon: "📶", nextId: "wifi_device", tag: "popular" },
        { label: "Create a routine", icon: "⏰", nextId: "routine", tag: "quick" },
        { label: "Set up Google Nest", icon: "🟢", nextId: "google_setup" },
        { label: "Smart lights issue", icon: "💡", nextId: "lights" },
        { label: "Security camera", icon: "📷", nextId: "camera" },
      ],
    },
    { id: "alexa_setup", type: "result", title: "Set Up Amazon Alexa", result: { heading: "Set up your Amazon Echo / Alexa", difficulty: "easy", time: "10 min", steps: ["Download the Amazon Alexa app on your phone (free on App Store / Google Play).", "Sign in with your Amazon account — or create one free.", "Plug in your Echo device — the ring light turns orange.", "In the app: tap Devices → + → Add Device → Amazon Echo → follow the steps.", "Connect to your Wi-Fi when prompted.", "Say 'Alexa, what time is it?' to confirm it's working!"], tip: "Set up Your Voice in the Alexa app — it learns your voice so Alexa recognises you and gives personalised responses.", upsell: "Alexa can do 100x more than most people use it for. Our guide covers 50 commands that will change how you use your home." } },
    { id: "wifi_device", type: "result", title: "Smart Device Won't Connect", result: { heading: "Fix a smart device that won't connect", difficulty: "easy", time: "10 min", steps: ["Make sure your phone is on 2.4GHz Wi-Fi — most smart devices don't support 5GHz.", "Move the device closer to your router during initial setup.", "Put the device in pairing mode — usually hold the button 5–10 seconds until light flashes.", "Open the device's app and follow the Add Device wizard exactly.", "If it fails, turn off mobile data on your phone during setup.", "Restart your router and try again if still failing."], tip: "The #1 smart home setup problem is being on 5GHz Wi-Fi. Your router may have two networks — look for the 2.4GHz one.", upsell: "Our smart home starter guide covers setup for 15 device types including Ring, Nest, Philips Hue, and TP-Link." } },
    { id: "routine", type: "result", title: "Create an Alexa Routine", result: { heading: "Create a smart home routine", difficulty: "easy", time: "5 min", steps: ["Open the Alexa app → tap More at bottom right → Routines → + to create new.", "Set a trigger: choose a time, voice command, or sunrise/sunset.", "Add actions: play news, adjust lights, read weather, start coffee maker, etc.", "You can add multiple actions in sequence — like a morning checklist.", "Tap Save — your routine runs automatically from now on."], tip: "Create a 'Leaving Home' routine triggered by saying 'Alexa, goodbye' — it turns off all lights and arms security with one phrase!", upsell: "Our smart home guide shows 20 pre-built routines you can import directly." } },
    { id: "google_setup", type: "result", title: "Set Up Google Nest", result: { heading: "Set up Google Nest / Google Home", difficulty: "easy", time: "10 min", steps: ["Download the Google Home app on your phone.", "Sign in with your Google account.", "Plug in your Nest device — it plays a welcome sound.", "In the app: tap + → Set up device → New device → follow the instructions.", "Say 'Hey Google, good morning' to test it works.", "Add your home address for accurate local weather and traffic."], tip: "Link your Google Calendar to Google Home — ask 'Hey Google, what's on my schedule today?' for a full morning briefing.", upsell: "Our guide covers connecting Google Nest to Spotify, YouTube Music, smart lights, and your TV in under an hour." } },
    { id: "lights", type: "result", title: "Smart Lights Issue", result: { heading: "Fix smart lights not responding", difficulty: "easy", time: "5 min", steps: ["Check the physical switch is ON — smart bulbs need constant power.", "Remove and reinsert the bulb to reset it.", "In your app: delete the device and re-add it from scratch.", "Make sure the bulb is on your 2.4GHz Wi-Fi network.", "Update the bulb's firmware through its app if available."], tip: "Never turn smart lights off at the wall switch! Always leave it ON and control only through the app or voice. The golden rule!", upsell: "Our guide shows how to sync all your lights to sunrise and sunset automatically — no scheduling needed." } },
    { id: "camera", type: "result", title: "Security Camera Setup", result: { heading: "Set up a home security camera", difficulty: "easy", time: "15 min", steps: ["Download the camera's app (Ring, Arlo, Nest, Blink, etc.).", "Create an account and sign in.", "Plug in the camera or insert batteries.", "In the app: tap Add Device → scan QR code on camera → connect to Wi-Fi.", "Place camera at entry points: front door, back door.", "Set up motion alerts so you're notified when someone approaches."], tip: "Position cameras at 9 feet high — above arm's reach but still captures faces clearly. Too high and you only see tops of heads!", upsell: "Our security guide covers motion zones, recording schedules, family sharing, and which cameras see in the dark." } },
  ],

  Alexa: [
    {
      id: "start", type: "question", title: "What Alexa help do you need?",
      options: [
        { label: "Alexa not responding", icon: "🎤", nextId: "not_responding", tag: "popular" },
        { label: "Set up music / radio", icon: "🎵", nextId: "music", tag: "popular" },
        { label: "Misunderstands me", icon: "❓", nextId: "misunderstands" },
        { label: "Set reminders / alarms", icon: "⏰", nextId: "reminders", tag: "quick" },
        { label: "Connect smart devices", icon: "🏠", nextId: "smart_connect" },
        { label: "Privacy concerns", icon: "🔒", nextId: "privacy" },
      ],
    },
    { id: "not_responding", type: "result", title: "Alexa Not Responding", result: { heading: "Fix Alexa not hearing or responding", difficulty: "easy", time: "5 min", steps: ["Check the microphone isn't muted — there's a physical mute button on top (red ring = muted).", "Make sure the device has power — ring light should be off when idle.", "Try unplugging and plugging back in.", "Check your Wi-Fi — Alexa needs internet. Try 'Alexa, are you connected?'", "Retrain your wake word: Alexa app → Devices → your Echo → Wake Word → Learn Wake Word.", "Reduce background noise — Alexa struggles with TV or music playing nearby."], tip: "Place your Echo at least 8 inches from walls and corners for the best microphone pickup. Corners create echo that confuses it!", upsell: "Our Alexa guide covers 50 voice commands most users never know about, including calling family members hands-free." } },
    { id: "music", type: "result", title: "Set Up Music on Alexa", result: { heading: "Set up music and radio on Alexa", difficulty: "easy", time: "5 min", steps: ["Open the Alexa app → More → Settings → Music & Podcasts.", "Link your music service: Spotify, Amazon Music, Apple Music, etc.", "Set a default music service so Alexa knows where to play.", "Say 'Alexa, play [artist name]' or 'Alexa, play jazz music'.", "For radio: 'Alexa, play BBC Radio 2' or 'Alexa, open TuneIn'.", "Set volume with 'Alexa, set volume to 5' (scale of 1–10)."], tip: "Amazon Music Unlimited (free with Prime trial) has 100 million songs. Say 'Alexa, play more songs like this' to build a personal radio!", upsell: "Multi-room audio — play the same music in every room simultaneously. Our guide shows the 2-minute setup." } },
    { id: "reminders", type: "result", title: "Set Reminders & Alarms", result: { heading: "Set reminders, alarms and timers with Alexa", difficulty: "easy", time: "1 min", steps: ["Alarm: 'Alexa, set an alarm for 7am tomorrow'", "Timer: 'Alexa, set a 20 minute timer for the oven'", "Reminder: 'Alexa, remind me to take my medication at 8pm every day'", "Recurring: 'Alexa, set an alarm for 6:30am Monday through Friday'", "Cancel: 'Alexa, cancel my 7am alarm'", "Check: 'Alexa, what alarms do I have set?'"], tip: "Set medication reminders on ALL your Echo devices — 'Alexa, announce my reminders on all devices' — so you hear it in every room!", upsell: "Our Alexa guide covers 15 types of reminders including location-based alerts ('remind me when I get home')." } },
    { id: "misunderstands", type: "result", title: "Alexa Misunderstands", result: { heading: "Fix Alexa misunderstanding commands", difficulty: "easy", time: "10 min", steps: ["Speak clearly and wait for the blue ring before speaking.", "Retrain voice recognition: Alexa app → Devices → your Echo → Voice ID → set up.", "Check accent settings: Settings → Alexa Preferences → Language.", "Review misunderstood commands: Alexa app → Activity → Voice History → correct them.", "Rename smart devices to simple names: 'lounge light' is easier than 'Philips Hue Bulb 1'."], tip: "The Voice History section shows every command Alexa heard — including wrong ones. You can correct them to improve accuracy over time.", upsell: "Our guide covers Alexa's 'Teach Alexa' feature which dramatically improves recognition for accents and unusual names." } },
    { id: "smart_connect", type: "result", title: "Connect Smart Devices", result: { heading: "Connect smart home devices to Alexa", difficulty: "easy", time: "10 min", steps: ["Set up the device with its own app first (Philips Hue, Ring, Nest, etc.).", "In Alexa app: tap Devices → + → Add Device → select brand.", "Follow skill linking instructions — usually just sign into the device's account.", "Say 'Alexa, discover devices' to scan for new items.", "Create groups: Alexa app → Devices → + → Add Group — put all bedroom lights together.", "Test: 'Alexa, turn off bedroom lights'."], tip: "Create a group called 'Downstairs' with all your ground floor devices — one command turns off your entire floor at once!", upsell: "Our smart home guide covers connecting 20+ device brands to Alexa with step-by-step screenshots." } },
    { id: "privacy", type: "result", title: "Alexa Privacy Settings", result: { heading: "Take control of Alexa privacy", difficulty: "easy", time: "10 min", steps: ["Delete voice recordings: Alexa app → More → Settings → Alexa Privacy → Manage History.", "Set auto-delete: choose to automatically delete recordings every 3 months.", "Turn off personalised ads: Alexa app → Settings → Alexa Privacy → Manage Ad Preferences.", "Mute microphone when not in use: press the microphone button (orange ring = muted).", "Review app permissions: Alexa app → Skills → Your Skills → check each skill's permissions."], tip: "Say 'Alexa, delete everything I said today' and it immediately wipes today's recordings — no app needed!", upsell: "Our guide covers full Alexa privacy setup including stopping all recordings, disabling voice purchasing, and setting up a voice PIN." } },
  ],

  Camera: [
    {
      id: "start", type: "question", title: "What camera help do you need?",
      options: [
        { label: "Update firmware", icon: "🔄", nextId: "firmware", tag: "popular" },
        { label: "Photos are blurry", icon: "📸", nextId: "blur", tag: "popular" },
        { label: "Transfer photos", icon: "💾", nextId: "transfer", tag: "quick" },
        { label: "Camera won't start", icon: "⚡", nextId: "power" },
        { label: "SD card error", icon: "💳", nextId: "sd_card" },
        { label: "Best settings", icon: "⚙️", nextId: "settings" },
      ],
    },
    { id: "firmware", type: "result", title: "Update Camera Firmware", result: { heading: "Update your camera firmware safely", difficulty: "medium", time: "20 min", steps: ["Go to your camera brand's website (canon.com, nikon.com, sony.com, etc.).", "Find Support → Software Downloads → enter your exact camera model.", "Download the latest firmware file to your computer.", "Copy the file to an empty SD card (no other files on it).", "Insert the SD card into the camera — go to Setup Menu → Firmware Update.", "Follow on-screen instructions. Do NOT turn off or remove battery during update."], tip: "Firmware updates often add new features for free — Canon's recent update added eye-tracking autofocus to older models worth $500 extra!", upsell: "Our camera guide covers what each firmware update actually changes and whether it's worth installing for your style." } },
    {
      id: "blur", type: "question", title: "What kind of blur are you getting?",
      options: [
        { label: "Everything is blurry", icon: "🌫️", nextId: "blur_general", tag: "popular" },
        { label: "Moving subjects blur", icon: "🏃", nextId: "blur_motion" },
        { label: "Photos too dark", icon: "🌑", nextId: "dark_photos" },
        { label: "Photos too bright", icon: "☀️", nextId: "bright_photos" },
      ],
    },
    { id: "blur_general", type: "result", title: "Fix Blurry Photos", result: { heading: "Fix consistently blurry photos", difficulty: "easy", time: "5 min", steps: ["Check the lens — fingerprints are the #1 cause of blur. Clean with a microfibre cloth.", "Make sure autofocus is ON: look for AF/MF switch on the lens or camera body.", "Half-press the shutter button to let it focus before fully pressing to shoot.", "Switch to Single Point focus mode for precise control.", "Check Image Stabilisation is turned ON.", "Try shooting in better light — darkness forces slow shutter speeds that blur easily."], tip: "Hold elbows against your body and exhale slowly before pressing the shutter — reduces camera shake by up to 50%!", upsell: "Our camera guide covers the exposure triangle in plain English — understanding just 3 settings transforms every photo." } },
    { id: "blur_motion", type: "result", title: "Fix Motion Blur", result: { heading: "Freeze moving subjects sharply", difficulty: "medium", time: "5 min", steps: ["Use Sport/Action mode — your camera automatically uses faster shutter speeds.", "Or in manual: set shutter speed to at least 1/500s for running people.", "Switch autofocus to Continuous AF (AI Servo on Canon, AF-C on Sony/Nikon).", "Enable Burst Mode — hold the shutter for multiple shots, pick the sharpest.", "Increase ISO if indoors — allows faster shutter speeds in darker conditions."], tip: "Panning technique: follow the subject with your camera as you shoot. Subject stays sharp while background blurs — professional sports look!", upsell: "Our sports and action photography guide covers the exact settings for pets, kids, sports, and wildlife." } },
    { id: "dark_photos", type: "result", title: "Fix Dark Photos", result: { heading: "Fix photos that are too dark", difficulty: "easy", time: "5 min", steps: ["Find the Exposure Compensation button (±) — press it and dial to +1 or +2.", "Or use Portrait/Indoor mode which automatically brightens for low-light.", "Turn on your camera's built-in flash for indoor shots.", "Increase ISO: try 800 or 1600 for indoor without flash.", "Open your aperture wider — lowest f-number on your lens (f/3.5 or f/1.8)."], tip: "Most cameras have a scene auto-detection mode — it recognises you're indoors and adjusts automatically. Look for a face or flower icon on the mode dial!", upsell: "Our guide teaches the exposure triangle in 10 minutes — understanding ISO, aperture and shutter speed unlocks perfect photos in any light." } },
    { id: "bright_photos", type: "result", title: "Fix Overexposed Photos", result: { heading: "Fix photos that are too bright", difficulty: "easy", time: "3 min", steps: ["Press the Exposure Compensation button (±) and dial to -1 or -2.", "If shooting in bright sunshine, use Sunny/Beach mode.", "Switch to Spot or Centre-weighted metering if sky is blowing out.", "Use your lens hood to reduce lens flare in direct sunlight.", "Shoot in RAW format — much more recovery detail than JPEG."], tip: "Shoot in the 'golden hour' — the hour after sunrise and before sunset. The warm, angled light makes everything look beautiful with zero effort!", upsell: "Our lighting guide shows how to use natural light to its full potential — the most impactful photography skill with zero cost." } },
    { id: "transfer", type: "result", title: "Transfer Photos", result: { heading: "Transfer photos to your computer", difficulty: "easy", time: "5 min", steps: ["USB cable: connect camera to computer → camera appears as a drive → copy photos.", "SD card: remove card from camera → insert into computer's card slot or USB reader.", "Wi-Fi transfer: most modern cameras have a Canon Camera Connect / Sony Imaging Edge app.", "On Windows: Photos app detects camera automatically when connected.", "On Mac: Image Capture app opens automatically.", "Create dated folders to organise as you go — saves hours later."], tip: "Set up Google Photos auto-import — 15GB free storage, automatic albums, and you can access your photos from any device!", upsell: "Our guide covers setting up automatic photo backup so you never lose a picture, even if your camera is lost or damaged." } },
    { id: "power", type: "result", title: "Camera Won't Turn On", result: { heading: "Fix a camera that won't turn on", difficulty: "easy", time: "10 min", steps: ["Charge the battery for at least 1 hour — even new batteries deplete in storage.", "Check the battery is inserted correctly — there's usually a directional arrow.", "Remove and reinsert the battery.", "Try a different power outlet or USB charger.", "Remove SD card and try without it — a corrupted card can prevent startup.", "Hold the power button for 5 full seconds — some cameras have a delayed startup."], tip: "Camera batteries lose charge in cold weather. Keep a spare battery in your pocket in winter to warm it up and swap when needed!", upsell: "Our guide covers battery maintenance tips that double the lifespan of your camera battery — saving $40–$80 per replacement." } },
    { id: "sd_card", type: "result", title: "SD Card Error", result: { heading: "Fix SD card errors", difficulty: "easy", time: "5 min", steps: ["Remove the card and check for physical damage.", "Clean the gold contacts with a dry eraser, then reinsert.", "Try the card in a computer — if it shows there, the camera slot may have dust.", "Format the card IN the camera: Menu → Setup → Format Card (back up photos first!).", "If card is corrupt, try free recovery software: Recuva (Windows) or PhotoRec (Mac)."], tip: "Format your SD card in the camera (not the computer) before every shoot — prevents 90% of card errors and prepares it for your specific model!", upsell: "Our guide recommends specific SD card brands that work best with each major camera — cheap cards cause 70% of all memory errors." } },
    { id: "settings", type: "result", title: "Best Beginner Settings", result: { heading: "Best camera settings for beginners", difficulty: "easy", time: "10 min", steps: ["Start with Auto mode — your camera handles everything while you learn composition.", "Switch to P (Program) mode when comfortable — more control, still auto exposure.", "Set image quality to Large Fine JPEG — best balance of quality and file size.", "Turn ON image stabilisation (IS/VR/OSS depending on brand).", "Set autofocus to Single AF for still subjects, Continuous AF for moving ones.", "Turn ON the histogram display — shows if your photo is too bright or dark."], tip: "The rule of thirds: place your subject at the intersection points of an imaginary 3x3 grid instead of dead centre — instantly more professional!", upsell: "Our beginner photography guide covers 10 composition rules, best settings for portraits, landscapes, and night shots." } },
  ],

  Security: [
    {
      id: "start", type: "question", title: "What security help do you need?",
      options: [
        { label: "I think I have a virus", icon: "🦠", nextId: "virus", tag: "popular" },
        { label: "Email was hacked", icon: "📧", nextId: "hacked", tag: "popular" },
        { label: "Set up antivirus", icon: "🛡️", nextId: "antivirus", tag: "quick" },
        { label: "Password help", icon: "🔑", nextId: "password" },
        { label: "Suspicious email / scam", icon: "⚠️", nextId: "scam" },
        { label: "Secure my Wi-Fi", icon: "📶", nextId: "wifi_sec" },
      ],
    },
    { id: "virus", type: "result", title: "Possible Virus", result: { heading: "Check for and remove viruses", difficulty: "easy", time: "20 min", steps: ["Don't panic — most 'virus warnings' on websites are fake scam pop-ups. Don't call any numbers.", "Real virus check: Windows Security (built into Windows 10/11) → Virus & Threat Protection → Quick Scan.", "For deeper check: download Malwarebytes Free from malwarebytes.com — run a full scan.", "If a scan finds something: let the software quarantine or remove it.", "Change your passwords after any infection — especially email and banking.", "Update Windows: Settings → Update & Security → Check for Updates."], tip: "Windows Defender (free, built into Windows 10/11) is now rated as one of the best antivirus programs available — you don't need to pay for anything extra!", upsell: "Our security guide covers the 5 signs your computer has been compromised — and the exact steps to take for each one." } },
    { id: "hacked", type: "result", title: "Email Was Hacked", result: { heading: "What to do if your email was hacked", difficulty: "medium", time: "30 min", steps: ["Immediately change your email password — use a strong one (12+ characters).", "Enable Two-Factor Authentication (2FA): Settings → Security → 2-Step Verification.", "Check your Sent folder — see what the hacker sent from your account.", "Check forwarding rules: Settings → Forwarding — delete any you didn't set up.", "Email your contacts warning them you were hacked.", "Change passwords for any accounts that use this email for login."], tip: "Check haveibeenpwned.com — enter your email to see if it appeared in any data breaches. This is the most common way hackers get in.", upsell: "Our guide walks you through a complete email account lockdown in 15 minutes — including all the hidden security settings." } },
    { id: "antivirus", type: "result", title: "Set Up Antivirus", result: { heading: "Set up free antivirus protection", difficulty: "easy", time: "10 min", steps: ["Windows 10/11: Windows Defender is already installed and excellent — just make sure it's ON.", "Check: Settings → Privacy & Security → Windows Security → Virus & Threat Protection.", "Make sure Real-time protection is ON.", "For extra protection: add Malwarebytes Free from malwarebytes.com as a second scanner.", "Schedule weekly scans: Windows Security → Virus & Threat Protection → Scan Options.", "Keep Windows updated — updates include critical security patches."], tip: "You do NOT need to pay for antivirus. Windows Defender + Malwarebytes Free covers 99% of threats — both are completely free. Save your money!", upsell: "Our guide covers browser extensions that block ads and tracking — they also prevent most malware from reaching your computer." } },
    { id: "password", type: "result", title: "Password Help", result: { heading: "Create and manage strong passwords", difficulty: "easy", time: "15 min", steps: ["Use a password manager: Bitwarden (free) or LastPass — one master password to remember all.", "Strong password formula: 3 random words + numbers + symbol: BlueTreeLamp42! — easy to remember, hard to crack.", "Never reuse passwords — if one site is hacked, attackers try your password everywhere.", "Enable Two-Factor Authentication (2FA) on important accounts: email, banking, Amazon.", "Check if passwords are compromised: Google Chrome → Settings → Passwords → Check Passwords."], tip: "A 4-word passphrase like 'correct horse battery staple' is more secure than 'P@ssw0rd123' and much easier to remember. Length beats complexity!", upsell: "Our guide covers setting up Bitwarden (free) from scratch — takes 20 minutes and protects all your accounts forever." } },
    { id: "scam", type: "result", title: "Suspicious Email / Scam", result: { heading: "Identify and deal with scams", difficulty: "easy", time: "5 min", steps: ["Look at the sender's email address — scammers use fakes like amazon@amazon-support.net.", "Hover over any links before clicking — the real URL shows at the bottom of your browser.", "Never call phone numbers in emails claiming to be from Microsoft, Amazon, or your bank.", "Real companies NEVER ask for passwords, gift cards, or wire transfers by email.", "Forward scam emails to: phishing@reportfraud.ftc.gov (US) or report@phishing.gov.uk (UK).", "If you accidentally clicked: immediately change relevant passwords and run a virus scan."], tip: "The #1 sign of a scam email: urgency ('Your account closes in 24 hours!'). Real companies give you time. Scammers want you to panic and act fast.", upsell: "Our guide includes a printable scam identification checklist — great to share with family members." } },
    { id: "wifi_sec", type: "result", title: "Secure Your Wi-Fi", result: { heading: "Secure your home Wi-Fi network", difficulty: "medium", time: "20 min", steps: ["Log into your router: open browser, type 192.168.1.1 or 192.168.0.1 (check router label).", "Change the default router password — the label password should be changed immediately.", "Make sure Wi-Fi security is WPA3 or WPA2 (not WEP — easily hacked).", "Change your Wi-Fi password to something strong — 12+ characters.", "Enable Guest Network for visitors — keeps your main devices isolated.", "Disable WPS (Wi-Fi Protected Setup) — it's a known security vulnerability."], tip: "Check who's on your Wi-Fi: log into your router → Connected Devices. Any device you don't recognise? Change your Wi-Fi password immediately!", upsell: "Our complete guide covers router hardening, VPN setup for public Wi-Fi, and parental controls." } },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AITroubleshooter({ topic, brandExamples, starterQuestions }: AITroubleshooterProps) {
  const [currentId, setCurrentId] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const [selections, setSelections] = useState<string[]>([]);
  const [showLead, setShowLead] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
  const [leadLoading, setLeadLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const steps = FLOWS[topic] || FLOWS["Printer"];
  const current = steps.find(s => s.id === currentId);
  const progress = currentId === "start" ? 5 : Math.min(95, (history.length / 3) * 100);

  const goTo = (id: string, label: string) => {
    setHistory(h => [...h, currentId]);
    setSelections(s => [...s, label]);
    setCurrentId(id);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const goBack = () => {
    if (!history.length) return;
    setCurrentId(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
    setSelections(s => s.slice(0, -1));
  };

  const reset = () => {
    setCurrentId("start"); setHistory([]); setSelections([]);
    setShowLead(false); setLeadDone(false);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadForm, topic, issue: selections.join(" → "), source: `${topic.toLowerCase()}-troubleshooter` }),
      });
    } catch {}
    setLeadLoading(false);
    setLeadDone(true);
  };

  const diffColor = { easy: "text-green-400 bg-green-400/10 border-green-400/20", medium: "text-amber-400 bg-amber-400/10 border-amber-400/20", hard: "text-red-400 bg-red-400/10 border-red-400/20" };

  return (
    <section className="py-24 bg-zinc-900" ref={topRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-5">
            <Sparkles size={14} /> 15-Step Guided Lesson — No AI Key Needed
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-3">
            {topic} Learning Guide
          </h2>
          <p className="text-zinc-400 font-medium">Answer a few questions — get exact steps and master your device</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {brandExamples.map(b => (
              <span key={b} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-zinc-400">{b}</span>
            ))}
          </div>
        </div>

        {/* Breadcrumb */}
        {selections.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {selections.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-bold text-blue-400">{s}</span>
                {i < selections.length - 1 && <ChevronRight size={12} className="text-zinc-600" />}
              </div>
            ))}
          </div>
        )}

        {/* Progress */}
        <div className="h-1.5 bg-zinc-800 rounded-full mb-6 overflow-hidden">
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" />
        </div>

        {/* Card */}
        <div className="bg-zinc-800/60 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
          {/* Card top bar */}
          <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles size={15} className="text-white" />
              </div>
              <span className="text-white font-black text-sm">Setwise {topic} Guide</span>
            </div>
            <div className="flex items-center gap-3">
              {history.length > 0 && (
                <button onClick={goBack} className="flex items-center gap-1 text-zinc-400 hover:text-white text-xs font-bold transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              <button onClick={reset} className="flex items-center gap-1 text-zinc-500 hover:text-white text-xs font-bold transition-colors">
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          </div>

          {/* Card body */}
          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {!showLead ? (
                <motion.div key={currentId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>

                  {/* QUESTION */}
                  {current?.type === "question" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{current.title}</h3>
                        {current.subtitle && <p className="text-zinc-500 font-medium">{current.subtitle}</p>}
                      </div>
                      {/* Quick starters (only on start) */}
                      {currentId === "start" && starterQuestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pb-1">
                          <span className="text-xs font-black text-zinc-600 uppercase tracking-widest w-full">Quick start:</span>
                          {starterQuestions.slice(0, 3).map((q, i) => (
                            <button key={i} onClick={() => {
                              const match = current.options?.find(o => q.toLowerCase().includes(o.label.toLowerCase().split(" ")[0].toLowerCase()));
                              if (match?.nextId) goTo(match.nextId, match.label);
                            }}
                              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-zinc-400 hover:text-white hover:border-blue-500 transition-all">
                              {q.length > 35 ? q.slice(0, 35) + "…" : q}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {current.options?.map((opt, i) => (
                          <motion.button key={i} whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
                            onClick={() => goTo(opt.nextId || "start", opt.label)}
                            className="relative flex items-center justify-between p-5 bg-zinc-700/40 hover:bg-blue-600 border border-zinc-600/50 hover:border-blue-500 rounded-2xl group transition-all text-left">
                            {opt.tag && (
                              <span className={`absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-xs font-black ${opt.tag === "popular" ? "bg-blue-600 text-white" : opt.tag === "quick" ? "bg-green-600 text-white" : "bg-purple-600 text-white"} group-hover:bg-white/20`}>
                                {opt.tag === "popular" ? "Most common" : opt.tag === "quick" ? "Quick fix" : "Advanced"}
                              </span>
                            )}
                            <div className="flex items-center gap-4">
                              <span className="text-2xl">{opt.icon}</span>
                              <span className="font-black text-white text-base">{opt.label}</span>
                            </div>
                            <ChevronRight size={18} className="text-zinc-400 group-hover:text-white shrink-0" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RESULT */}
                  {current?.type === "result" && current.result && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                          <CheckCircle2 size={22} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white">{current.result.heading}</h3>
                          <div className="flex gap-3 mt-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-black border ${diffColor[current.result.difficulty]}`}>
                              {current.result.difficulty === "easy" ? "✅ Easy" : current.result.difficulty === "medium" ? "⚠️ Moderate" : "🔧 Advanced"}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-700 text-zinc-300 border border-zinc-600">
                              ⏱ {current.result.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="space-y-3">
                        {current.result.steps.map((step, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            className="flex gap-4 p-4 bg-zinc-700/30 hover:bg-zinc-700/50 rounded-2xl border border-zinc-700/50 transition-all">
                            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center shrink-0">{i + 1}</span>
                            <p className="text-zinc-300 font-medium leading-relaxed text-sm">{step}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tip */}
                      {current.result.tip && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl flex gap-3">
                          <Lightbulb size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-black text-yellow-300 text-xs uppercase tracking-widest mb-1">💡 Did you know?</div>
                            <p className="text-yellow-200/80 text-sm font-medium leading-relaxed">{current.result.tip}</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Upsell */}
                      {current.result.upsell && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                          className="p-5 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex gap-3">
                          <ThumbsUp size={18} className="text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-black text-white text-sm mb-1">Want to go further?</div>
                            <p className="text-blue-200/70 text-sm font-medium">{current.result.upsell}</p>
                          </div>
                        </motion.div>
                      )}

                      {/* CTAs */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <button onClick={() => setShowLead(true)}
                          className="flex items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm transition-all">
                          <Mail size={15} /> Get PDF Guide
                        </button>
                        <button onClick={() => setShowLead(true)}
                          className="flex items-center justify-center gap-2 p-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-2xl font-black text-sm transition-all">
                          <UserCheck size={15} /> Book Expert
                        </button>
                        <button onClick={reset}
                          className="flex items-center justify-center gap-2 p-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-2xl font-black text-sm transition-all">
                          <RotateCcw size={15} /> New Problem
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* LEAD FORM */
                <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {!leadDone ? (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                          <Star size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-black text-white text-lg">Get your personalised {topic} guide</div>
                          <div className="text-zinc-500 text-sm font-medium">Free · 30 seconds · No spam ever</div>
                        </div>
                      </div>
                      <form onSubmit={submitLead} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-2">First Name *</label>
                            <input type="text" required value={leadForm.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeadForm(f => ({ ...f, name: e.target.value }))}
                              placeholder="e.g. Mary"
                              className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
                          </div>
                          <div>
                            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-2">Email *</label>
                            <input type="email" required value={leadForm.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeadForm(f => ({ ...f, email: e.target.value }))}
                              placeholder="name@email.com"
                              className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-2">Phone (optional)</label>
                          <input type="tel" value={leadForm.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                            placeholder="+1 555 000 0000"
                            className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
                        </div>
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="text-blue-300 text-sm font-medium">✅ Personalised guide for your issue · ✅ Tips specific to your {topic} · ✅ Expert follow-up if needed</p>
                        </div>
                        <button type="submit" disabled={leadLoading}
                          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20">
                          {leadLoading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : <><Star size={18} /> Get My Free Guide</>}
                        </button>
                        <button type="button" onClick={() => setShowLead(false)} className="w-full text-zinc-500 hover:text-zinc-300 text-sm font-medium transition-colors">← Back to guide</button>
                        <p className="text-center text-xs text-zinc-600">🔒 Your info is safe — we never spam or share your details</p>
                      </form>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                        <CheckCircle2 size={36} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">You&apos;re all set{leadForm.name ? `, ${leadForm.name}` : ""}! 🎉</h3>
                      <p className="text-zinc-400 font-medium mb-6">Our team will reach out to <span className="text-white font-bold">{leadForm.email}</span> shortly with your personalised guide.</p>
                      <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm font-medium">
                        <Heart size={14} className="text-red-400" /> Thank you for trusting Setwise Digital
                      </div>
                      <button onClick={reset} className="mt-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-sm transition-colors mx-auto">
                        <RotateCcw size={14} /> Fix another issue
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-zinc-900/50 border-t border-white/5 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-zinc-600 text-xs font-bold">
              <Heart size={11} className="text-red-400" /> Built for non-technical users · No AI key needed
            </div>
            <span className="text-zinc-600 text-xs font-bold">support@setwisedigital.com</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[{ icon: "⚡", stat: "2 min", label: "Average fix time" }, { icon: "✅", stat: "98%", label: "Problems solved" }, { icon: "🔒", stat: "Free", label: "Always" }].map((item, i) => (
            <div key={i} className="text-center p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-white font-black text-xl">{item.stat}</div>
              <div className="text-zinc-500 text-xs font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
