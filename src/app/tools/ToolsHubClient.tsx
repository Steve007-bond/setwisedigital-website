"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { ArrowRight, Users, Zap, Search, Shield } from "lucide-react";

const CATEGORIES = [
  { id: "all",       label: "All Tools",        icon: "🛠️" },
  { id: "gps",       label: "GPS & Navigation", icon: "🗺️" },
  { id: "printer",   label: "Printers",         icon: "🖨️" },
  { id: "smarthome", label: "Smart Home",       icon: "🏠" },
  { id: "security",  label: "Security",         icon: "🔒" },
  { id: "voice",     label: "Voice Assistant",  icon: "🎙️" },
];

const TOOLS = [
  { id:"road-trip-checker", category:"gps", href:"/tools/road-trip-checker", emoji:"🚗", badge:"Most Popular", badgeColor:"bg-green-500", title:"Road Trip GPS Pre-Check", description:"5-step GPS readiness checklist before your next road trip. Maps, battery, mounting, route, and audio — all in plain English.", tags:["GPS","Road Trip","Garmin","TomTom"], time:"3 min", users:"2,400+", accent:"from-green-500 to-emerald-400", tagBg:"bg-green-900/40", tagText:"text-green-300" },
  { id:"best-gps-finder", category:"gps", href:"/tools/best-gps-finder", emoji:"🧭", badge:"Popular", badgeColor:"bg-blue-500", title:"Best GPS Finder for You", description:"Answer 5 questions about your driving habits and budget. Get a personalized GPS recommendation matched exactly to your lifestyle.", tags:["GPS","Garmin","TomTom","Buying Guide"], time:"4 min", users:"1,800+", accent:"from-blue-500 to-indigo-400", tagBg:"bg-blue-900/40", tagText:"text-blue-300" },
  { id:"gps-update-scheduler", category:"gps", href:"/tools/gps-update-scheduler", emoji:"📅", badge:"New", badgeColor:"bg-cyan-600", title:"GPS Update Scheduler", description:"Find out how outdated your GPS maps are and get a personalized step-by-step update guide for your device.", tags:["Garmin Express","TomTom","Map Updates"], time:"3 min", users:"900+", accent:"from-cyan-500 to-blue-400", tagBg:"bg-cyan-900/40", tagText:"text-cyan-300" },
  { id:"adventure-gps-selector", category:"gps", href:"/tools/adventure-gps-selector", emoji:"🥾", badge:"New", badgeColor:"bg-green-700", title:"Adventure GPS Selector", description:"Hiking, hunting, fishing, boating, or off-road? Find the exact Garmin GPS built for your outdoor adventure with full feature comparison.", tags:["Garmin","Hiking","Hunting","Fishing","Boating"], time:"3 min", users:"620+", accent:"from-green-600 to-emerald-400", tagBg:"bg-green-900/40", tagText:"text-green-300" },
  { id:"pet-gps-selector", category:"gps", href:"/tools/pet-gps-selector", emoji:"🐕", badge:"New", badgeColor:"bg-pink-600", title:"Pet GPS Tracker Selector", description:"Fi, Whistle, Tractive, Garmin, or AirTag? Compare the 5 best pet trackers with honest subscription cost breakdown.", tags:["Dog GPS","Cat Tracker","Fi Collar","Whistle","Tractive"], time:"3 min", users:"490+", accent:"from-pink-500 to-rose-400", tagBg:"bg-pink-900/40", tagText:"text-pink-300" },
  { id:"car-gps-update", category:"gps", href:"/tools/car-gps-update", emoji:"🚘", badge:"New", badgeColor:"bg-blue-700", title:"Car Navigation Update Guide", description:"Select your car brand — Honda, Toyota, BMW, Mercedes, Lexus, Audi, Ford, Nissan — and get exact step-by-step update instructions.", tags:["Honda","Toyota","BMW","Mercedes","Lexus"], time:"5 min", users:"1,100+", accent:"from-blue-600 to-cyan-400", tagBg:"bg-blue-900/40", tagText:"text-blue-300" },
  { id:"gps-features-guide", category:"gps", href:"/tools/gps-features-guide", emoji:"📚", badge:"New", badgeColor:"bg-emerald-600", title:"GPS Features Explained", description:"Live Traffic, Lane Assist, LMT — what do GPS specs actually mean? Plain-English explanations of what every feature does and if you need it.", tags:["Live Traffic","Lane Assist","Lifetime Maps","Bluetooth"], time:"2 min", users:"580+", accent:"from-emerald-500 to-green-400", tagBg:"bg-emerald-900/40", tagText:"text-emerald-300" },
  { id:"garmin-express-setup", category:"gps", href:"/tools/garmin-express-setup", emoji:"🔄", badge:"Popular", badgeColor:"bg-cyan-700", title:"How to Update Garmin GPS Maps", description:"Clickable step-by-step guide to updating your Garmin GPS via Wi-Fi or Garmin Express. Tick off each step. Covers all models.", tags:["Garmin","Garmin Express","Wi-Fi Update","Map Updates"], time:"5 min", users:"2,100+", accent:"from-cyan-500 to-blue-400", tagBg:"bg-cyan-900/40", tagText:"text-cyan-300" },
  { id:"gps-troubleshooter", category:"gps", href:"/tools/gps-troubleshooter", emoji:"🔧", badge:"Popular", badgeColor:"bg-orange-500", title:"GPS Not Working? Fix Guide", description:"GPS lost signal, frozen screen, wrong directions, no voice? Plain-English step-by-step guidance for car GPS, phone navigation, and outdoor GPS.", tags:["GPS Signal","Frozen Screen","Wrong Directions","Battery"], time:"5 min", users:"1,600+", accent:"from-orange-500 to-amber-400", tagBg:"bg-orange-900/40", tagText:"text-orange-300" },
  { id:"gps-for-seniors", category:"gps", href:"/tools/gps-for-seniors", emoji:"👴", badge:"New", badgeColor:"bg-blue-600", title:"Best GPS for Seniors (55+)", description:"Large screen, simple menus, loud voice directions. 4 questions match you to the right Garmin model for drivers 55+.", tags:["Large Screen","Easy GPS","Garmin","Senior Friendly"], time:"4 min", users:"940+", accent:"from-blue-500 to-sky-400", tagBg:"bg-blue-900/40", tagText:"text-blue-300" },
  { id:"gps-vs-phone-decider", category:"gps", href:"/tools/gps-vs-phone-decider", emoji:"📱", badge:"New", badgeColor:"bg-violet-600", title:"GPS Device vs Phone Navigation", description:"Do you actually need a dedicated GPS or is your phone enough? 4 honest questions. Plain-English verdict.", tags:["GPS Device","Google Maps","Apple Maps","Phone Navigation"], time:"3 min", users:"780+", accent:"from-violet-500 to-purple-400", tagBg:"bg-violet-900/40", tagText:"text-violet-300" },
  { id:"gps-upgrade-decider", category:"gps", href:"/tools/gps-upgrade-decider", emoji:"🆙", badge:"New", badgeColor:"bg-amber-600", title:"Should I Upgrade My GPS?", description:"4 questions about your GPS age and problems. Get a clear keep-or-replace verdict with a clickable action plan.", tags:["GPS Age","Replace GPS","Garmin Upgrade","Old GPS"], time:"3 min", users:"510+", accent:"from-amber-500 to-orange-400", tagBg:"bg-amber-900/40", tagText:"text-amber-300" },
  { id:"gps-brand-comparator", category:"gps", href:"/tools/gps-brand-comparator", emoji:"⚖️", badge:"New", badgeColor:"bg-indigo-600", title:"Garmin vs TomTom vs Google Maps", description:"Compare any two GPS options side by side. Honest scores for maps accuracy, offline use, traffic, voice, and 3-year running cost.", tags:["Garmin","TomTom","Google Maps","Brand Compare"], time:"4 min", users:"430+", accent:"from-indigo-500 to-blue-400", tagBg:"bg-indigo-900/40", tagText:"text-indigo-300" },
  { id:"gps-budget-finder", category:"gps", href:"/tools/gps-budget-finder", emoji:"💲", badge:"New", badgeColor:"bg-green-600", title:"Best GPS for Your Budget", description:"Pick your budget — under $100, $150, or $200 — and see the best GPS at each price point with honest feature breakdowns.", tags:["Budget GPS","Under $100","Under $200","Garmin"], time:"3 min", users:"360+", accent:"from-green-500 to-teal-400", tagBg:"bg-green-900/40", tagText:"text-green-300" },
  { id:"gps-true-cost-calculator", category:"gps", href:"/tools/gps-true-cost-calculator", emoji:"🧮", badge:"New", badgeColor:"bg-teal-600", title:"GPS True Cost Calculator", description:"Calculate the real 3-year cost of any GPS device — map updates, subscriptions, accessories all included. Compare up to 3 devices.", tags:["GPS Cost","Map Update Fees","3-Year Cost","Garmin"], time:"4 min", users:"290+", accent:"from-teal-500 to-cyan-400", tagBg:"bg-teal-900/40", tagText:"text-teal-300" },
  { id:"gps-update-fix", category:"gps", href:"/tools/gps-update-fix", emoji:"⚠️", badge:"New", badgeColor:"bg-red-600", title:"GPS Map Update Not Working?", description:"Garmin Express not detecting GPS, download failing, Wi-Fi won't connect? Pick your problem and follow step-by-step fixes.", tags:["Garmin Express","Update Failed","USB Not Detected","Wi-Fi"], time:"5 min", users:"680+", accent:"from-red-500 to-rose-400", tagBg:"bg-red-900/40", tagText:"text-red-300" },
  { id:"gps-battery-checker", category:"gps", href:"/tools/gps-battery-checker", emoji:"🔋", badge:"New", badgeColor:"bg-yellow-600", title:"GPS Battery Life Checker", description:"Tell us how long you'll be away from a charger. See which GPS devices have the battery life for your trip — day hike to week expedition.", tags:["GPS Battery","Long Trip","Garmin Battery","Outdoor GPS"], time:"3 min", users:"240+", accent:"from-yellow-500 to-amber-400", tagBg:"bg-yellow-900/40", tagText:"text-yellow-300" },
  { id:"gps-coverage-checker", category:"gps", href:"/tools/gps-coverage-checker", emoji:"🗺️", badge:"New", badgeColor:"bg-blue-600", title:"GPS Coverage — USA & Canada", description:"Pick your region and GPS brand — get an honest coverage verdict for US cities, rural America, rural Canada, and the far north.", tags:["Canada Coverage","Rural GPS","Garmin Canada","Alaska"], time:"3 min", users:"310+", accent:"from-blue-500 to-indigo-400", tagBg:"bg-blue-900/40", tagText:"text-blue-300" },
  { id:"gps-feature-filter", category:"gps", href:"/tools/gps-feature-filter", emoji:"🎛️", badge:"New", badgeColor:"bg-violet-600", title:"GPS Feature Filter", description:"Tick the features you want — no subscription, large screen, offline maps, Canada coverage, Bluetooth — and see matching devices instantly.", tags:["No Subscription","Offline Maps","Large Screen","Canada"], time:"3 min", users:"210+", accent:"from-violet-500 to-fuchsia-400", tagBg:"bg-violet-900/40", tagText:"text-violet-300" },
  { id:"gps-maps-explained", category:"gps", href:"/tools/gps-maps-explained", emoji:"💡", badge:"New", badgeColor:"bg-emerald-600", title:"GPS Maps — Do I Have to Pay?", description:"Lifetime maps, paid updates, subscriptions — explained in plain English. Find out what map updates cost for your GPS over 3 years.", tags:["Lifetime Maps","Free Maps","Garmin LMT","Map Cost"], time:"3 min", users:"450+", accent:"from-emerald-500 to-green-400", tagBg:"bg-emerald-900/40", tagText:"text-emerald-300" },
  { id:"gps-screen-size-selector", category:"gps", href:"/tools/gps-screen-size-selector", emoji:"📺", badge:"New", badgeColor:"bg-sky-600", title:"What GPS Screen Size Do I Need?", description:"5-inch, 5.5-inch, or 7-inch? 4 questions match the right GPS screen size to your eyesight, car, and driving style.", tags:["Large Screen GPS","7 Inch GPS","GPS Seniors","Screen Size"], time:"3 min", users:"320+", accent:"from-sky-500 to-blue-400", tagBg:"bg-sky-900/40", tagText:"text-sky-300" },
  { id:"builtin-vs-aftermarket-gps", category:"gps", href:"/tools/builtin-vs-aftermarket-gps", emoji:"🚙", badge:"New", badgeColor:"bg-indigo-600", title:"Built-in GPS vs Garmin vs CarPlay", description:"Use your car's built-in GPS, buy a Garmin, use Apple CarPlay, or just use your phone? 4 questions give you an honest recommendation.", tags:["Built-in GPS","CarPlay","Garmin","Factory Navigation"], time:"4 min", users:"490+", accent:"from-indigo-500 to-blue-400", tagBg:"bg-indigo-900/40", tagText:"text-indigo-300" },
  { id:"hunting-gps-canada", category:"gps", href:"/tools/hunting-gps-canada", emoji:"🍁", badge:"New", badgeColor:"bg-red-700", title:"Best GPS for Hunting in Canada", description:"Hunting GPS for Canadian boreal forest, mountain terrain, dog hunting, and remote backcountry. Garmin GPSMAP 67, 66i, Alpha, Montana compared.", tags:["Canada Hunting","Boreal Forest","Garmin GPSMAP","Backcountry"], time:"4 min", users:"260+", accent:"from-red-600 to-rose-400", tagBg:"bg-red-900/40", tagText:"text-red-300" },
  { id:"rv-gps-finder", category:"gps", href:"/tools/rv-gps-finder", emoji:"🚐", badge:"New", badgeColor:"bg-amber-600", title:"Best GPS for RV & Motorhome", description:"Which Garmin RV GPS is right for your rig? Height routing, campground database, RV-specific navigation. 4 questions find your match.", tags:["RV GPS","Motorhome","Garmin RV 795","Height Routing"], time:"4 min", users:"380+", accent:"from-amber-500 to-orange-400", tagBg:"bg-amber-900/40", tagText:"text-amber-300" },
  { id:"satellite-communicator-guide", category:"gps", href:"/tools/satellite-communicator-guide", emoji:"📡", badge:"New", badgeColor:"bg-blue-700", title:"Garmin inReach vs ZOLEO vs SPOT", description:"Garmin inReach Mini 2, ZOLEO, or SPOT Gen4? 4 questions about your adventures, family, and budget. Honest plain-English comparison.", tags:["Garmin inReach","ZOLEO","SPOT","Satellite SOS"], time:"4 min", users:"190+", accent:"from-blue-600 to-indigo-400", tagBg:"bg-blue-900/40", tagText:"text-blue-300" },
  { id:"golf-gps-decider", category:"gps", href:"/tools/golf-gps-decider", emoji:"⛳", badge:"New", badgeColor:"bg-green-600", title:"Golf GPS Watch vs Rangefinder", description:"GPS watch, laser rangefinder, or handheld? 5 questions about your game, budget, and priorities. Personalised golf distance device recommendation.", tags:["Golf GPS","Rangefinder","No Subscription","Golf Watch"], time:"4 min", users:"280+", accent:"from-green-500 to-emerald-400", tagBg:"bg-green-900/40", tagText:"text-green-300" },
  { id:"pet-gps-cost-breakdown", category:"gps", href:"/tools/pet-gps-cost-breakdown", emoji:"💰", badge:"New", badgeColor:"bg-pink-600", title:"Pet GPS Tracker Cost Breakdown", description:"True 3-year cost comparison of Tractive, Fi Series 3, Whistle, and Apple AirTag — device price plus subscriptions. Plus setup guides.", tags:["Tractive","Fi Collar","Whistle","AirTag","Pet Tracker Cost"], time:"3 min", users:"220+", accent:"from-pink-500 to-rose-400", tagBg:"bg-pink-900/40", tagText:"text-pink-300" },
  { id:"my-printer-stopped-working", category:"printer", href:"/tools/my-printer-stopped-working", emoji:"🔧", badge:"🔥 Most Used", badgeColor:"bg-orange-500", title:"My Printer Stopped Working", description:"Select your problem — offline, blank pages, paper jam, streaky prints — get a plain-English step-by-step fix for your exact issue and brand.", tags:["HP","Canon","Epson","Brother","Printer Offline","Paper Jam"], time:"5 min", users:"3,100+", accent:"from-orange-500 to-amber-400", tagBg:"bg-orange-900/40", tagText:"text-orange-300" },
  { id:"set-up-my-new-printer", category:"printer", href:"/tools/set-up-my-new-printer", emoji:"📦", badge:"Popular", badgeColor:"bg-cyan-600", title:"Set Up My New Printer", description:"Just got a printer? Choose your brand and connection type — Wi-Fi, USB, or Bluetooth. Get the exact setup steps for your specific combination.", tags:["HP","Canon","Epson","Brother","Wi-Fi Setup"], time:"5 min", users:"2,200+", accent:"from-cyan-500 to-blue-400", tagBg:"bg-cyan-900/40", tagText:"text-cyan-300" },
  { id:"how-to-print-from-phone-or-laptop", category:"printer", href:"/tools/how-to-print-from-phone-or-laptop", emoji:"📱", badge:"Popular", badgeColor:"bg-sky-600", title:"Print from Phone or Laptop", description:"iPhone, Android, Windows, Mac, or Chromebook — pick your device and printer brand. Get the exact wireless printing steps for your combination.", tags:["iPhone","Android","Windows","Mac","AirPrint","Wireless"], time:"4 min", users:"2,800+", accent:"from-sky-500 to-cyan-400", tagBg:"bg-sky-900/40", tagText:"text-sky-300" },
  { id:"hp-vs-canon-vs-epson-vs-brother", category:"printer", href:"/tools/hp-vs-canon-vs-epson-vs-brother", emoji:"⚖️", badge:"New", badgeColor:"bg-violet-600", title:"HP vs Canon vs Epson vs Brother", description:"3-question quiz scores all 4 brands against your actual needs. Animated comparison bars, ranked results, and an honest winner for your situation.", tags:["HP","Canon","Epson","Brother","Brand Comparison"], time:"3 min", users:"1,900+", accent:"from-violet-500 to-fuchsia-400", tagBg:"bg-violet-900/40", tagText:"text-violet-300" },
  { id:"is-hp-instant-ink-worth-it", category:"printer", href:"/tools/is-hp-instant-ink-worth-it", emoji:"💸", badge:"New", badgeColor:"bg-emerald-600", title:"Is HP Instant Ink Worth It?", description:"Enter your monthly pages and colour ratio. Get an honest cost comparison — HP Instant Ink subscription vs buying cartridges — annual saving calculated.", tags:["HP Instant Ink","Subscription","Cost Calculator","Ink Savings"], time:"3 min", users:"1,400+", accent:"from-emerald-500 to-green-400", tagBg:"bg-emerald-900/40", tagText:"text-emerald-300" },
  { id:"best-printer-for-seniors", category:"printer", href:"/tools/best-printer-for-seniors", emoji:"👴", badge:"New", badgeColor:"bg-rose-600", title:"Best Printer for Seniors (45+)", description:"5 questions about what you print, how often, and your budget. Get a printer recommendation built around ease of use and simplicity.", tags:["Easy Printer","Large Buttons","HP","Canon","Simple Setup"], time:"4 min", users:"1,600+", accent:"from-rose-500 to-pink-400", tagBg:"bg-rose-900/40", tagText:"text-rose-300" },
  { id:"how-to-send-a-fax-from-home", category:"printer", href:"/tools/how-to-send-a-fax-from-home", emoji:"📠", badge:"New", badgeColor:"bg-indigo-600", title:"How to Send a Fax from Home", description:"No fax machine needed. Choose your method — printer, computer, phone, or email — and get the exact steps to fax medical or legal documents.", tags:["Fax Online","No Phone Line","Medical Forms","FaxZero"], time:"4 min", users:"1,100+", accent:"from-indigo-500 to-purple-400", tagBg:"bg-indigo-900/40", tagText:"text-indigo-300" },
  { id:"how-to-print-email-or-webpage", category:"printer", href:"/tools/how-to-print-email-or-webpage", emoji:"🌐", badge:"New", badgeColor:"bg-teal-600", title:"Print an Email or Webpage", description:"Gmail, Outlook, Chrome, Safari — pick your app and device. Get the exact button location and steps to print any email or webpage.", tags:["Gmail","Outlook","Chrome","Safari","Print Email"], time:"3 min", users:"2,400+", accent:"from-teal-500 to-emerald-400", tagBg:"bg-teal-900/40", tagText:"text-teal-300" },
  { id:"should-i-buy-a-new-printer", category:"printer", href:"/tools/should-i-buy-a-new-printer", emoji:"🤔", badge:"New", badgeColor:"bg-amber-600", title:"Should I Buy a New Printer?", description:"Honest answer in 2 minutes. 4 questions about your printer's age, problems, and ink costs — get a clear Keep / Fix First / Replace verdict.", tags:["Replace Printer","Printer Too Old","Repair vs Replace"], time:"2 min", users:"870+", accent:"from-amber-500 to-orange-400", tagBg:"bg-amber-900/40", tagText:"text-amber-300" },
  { id:"printer-specs-explained", category:"printer", href:"/tools/printer-specs-explained", emoji:"🔍", badge:"New", badgeColor:"bg-violet-600", title:"Printer Specs — Plain English", description:"Confused by DPI, PPM, ADF, duplex, or EcoTank? Tap any printer spec and get a plain-English explanation of what it does.", tags:["DPI","Duplex","ADF","AirPrint","EcoTank","Specs"], time:"2 min", users:"650+", accent:"from-violet-500 to-fuchsia-400", tagBg:"bg-violet-900/40", tagText:"text-violet-300" },
  { id:"printer-cost-calculator", category:"printer", href:"/tools/printer-cost-calculator", emoji:"💰", badge:"Popular", badgeColor:"bg-indigo-500", title:"Printer True Cost Calculator", description:"Find out exactly how much your printer costs per year — ink, paper, and electricity all included. Compare HP, Canon, Epson and Brother.", tags:["HP","Canon","Epson","Brother","Annual Cost"], time:"3 min", users:"1,200+", accent:"from-indigo-500 to-blue-400", tagBg:"bg-indigo-900/40", tagText:"text-indigo-300" },
  { id:"best-printer-finder", category:"printer", href:"/tools/best-printer-finder", emoji:"🖨️", badge:"Popular", badgeColor:"bg-violet-600", title:"Best Printer Finder for You", description:"Photos, documents, or both? 5 questions match you to the perfect printer for your home and budget — no technical knowledge needed.", tags:["HP","Canon","Epson","Buying Guide"], time:"4 min", users:"980+", accent:"from-violet-500 to-purple-400", tagBg:"bg-violet-900/40", tagText:"text-violet-300" },
  { id:"printer-ink-vs-tank", category:"printer", href:"/tools/printer-ink-vs-tank", emoji:"🫙", badge:"Popular", badgeColor:"bg-indigo-600", title:"Ink Cartridge vs Ink Tank Printer", description:"Regular printer or EcoTank or MegaTank? 5 honest questions give you a clear answer based on how you actually print.", tags:["Epson EcoTank","Canon MegaTank","HP Smart Tank","Cost Savings"], time:"3 min", users:"850+", accent:"from-indigo-500 to-violet-400", tagBg:"bg-indigo-900/40", tagText:"text-indigo-300" },
  { id:"printer-cost-per-page", category:"printer", href:"/tools/printer-cost-per-page", emoji:"📊", badge:"Popular", badgeColor:"bg-blue-600", title:"Printer Cost Per Page Calculator", description:"How much does each page actually cost you to print? Enter your cartridge price and page yield — get your true cost per page instantly.", tags:["Cost Per Page","HP","Canon","Epson","Ink Savings"], time:"2 min", users:"740+", accent:"from-blue-500 to-cyan-400", tagBg:"bg-blue-900/40", tagText:"text-blue-300" },
  { id:"printer-features-guide", category:"printer", href:"/tools/printer-features-guide", emoji:"📖", badge:"Popular", badgeColor:"bg-violet-600", title:"Printer Features Explained", description:"What is Auto Duplex? ADF? PPM? Tap any printer feature for a plain-English explanation of what it does and whether you actually need it.", tags:["Auto Duplex","ADF","Ink Tank","Wi-Fi Printing"], time:"2 min", users:"730+", accent:"from-violet-500 to-purple-400", tagBg:"bg-violet-900/40", tagText:"text-violet-300" },
  { id:"smart-home-matcher", category:"smarthome", href:"/tools/smart-home-matcher", emoji:"🏠", badge:"New", badgeColor:"bg-amber-600", title:"Smart Home Starter Matcher", description:"Alexa, Google Nest, or Apple HomeKit? 5 questions match the right smart home system to your lifestyle — no technical knowledge needed.", tags:["Alexa","Google Nest","Apple HomeKit"], time:"4 min", users:"760+", accent:"from-amber-500 to-orange-400", tagBg:"bg-amber-900/40", tagText:"text-amber-300" },
  { id:"subscription-audit", category:"smarthome", href:"/tools/subscription-audit", emoji:"📊", badge:"New", badgeColor:"bg-teal-600", title:"Tech Subscription Audit", description:"List your digital subscriptions, calculate your true monthly cost, find overlaps, and see exactly which ones to cancel.", tags:["Netflix","Streaming","Subscriptions","Save Money"], time:"4 min", users:"430+", accent:"from-teal-500 to-cyan-400", tagBg:"bg-teal-900/40", tagText:"text-teal-300" },
  { id:"wifi-checker", category:"smarthome", href:"/tools/wifi-checker", emoji:"📶", badge:"New", badgeColor:"bg-sky-600", title:"Home Wi-Fi Overload Checker", description:"Count your connected devices and find out if your router can handle the load. Get a plain-English plan to fix slow Wi-Fi.", tags:["Wi-Fi","Router","Internet Speed","Smart Home"], time:"3 min", users:"380+", accent:"from-sky-500 to-blue-400", tagBg:"bg-sky-900/40", tagText:"text-sky-300" },
  { id:"home-security-audit", category:"security", href:"/tools/home-security-audit", emoji:"🔒", badge:"New", badgeColor:"bg-red-600", title:"Home Security Audit Tool", description:"10 yes/no questions reveal how protected your home truly is — and which affordable devices would make the biggest difference.", tags:["Ring","SimpliSafe","ADT","Cameras"], time:"5 min", users:"640+", accent:"from-red-500 to-rose-400", tagBg:"bg-red-900/40", tagText:"text-red-300" },
  { id:"voice-assistant-matcher", category:"voice", href:"/tools/voice-assistant-matcher", emoji:"🎙️", badge:"New", badgeColor:"bg-purple-600", title:"Best Voice Assistant for You", description:"Alexa, Google Assistant, or Siri? Match the best voice assistant to your phone, daily habits, and home devices in 5 questions.", tags:["Alexa","Google Assistant","Siri"], time:"3 min", users:"520+", accent:"from-violet-500 to-purple-400", tagBg:"bg-violet-900/40", tagText:"text-violet-300" },
];

const HERO_FRAMES = [
  { text: "Printer offline?", icon: "🖨️", color: "#2563eb", sub: "HP, Canon, Epson, Brother — fixed in minutes", alt: "Person getting help setting up a home printer" },
  { text: "GPS maps outdated?", icon: "🗺️", color: "#16a34a", sub: "Garmin, TomTom, in-car navigation updated", alt: "Driver checking GPS navigation on dashboard" },
  { text: "Alexa not working?", icon: "🎙️", color: "#06b6d4", sub: "Echo Dot, Echo Show — working again", alt: "Adult using Amazon Alexa Echo device at home" },
  { text: "Smart home setup?", icon: "🏠", color: "#f59e0b", sub: "Alexa, Google Nest, smart bulbs connected", alt: "Person setting up smart home devices" },
  { text: "Online safety?", icon: "🛡️", color: "#ef4444", sub: "Antivirus, passwords, scam protection", alt: "Person learning about online security on computer" },
  { text: "New printer setup?", icon: "📦", color: "#8b5cf6", sub: "Wi-Fi setup for any printer brand", alt: "Unboxing and setting up a new wireless printer" },
];

function AnimatedHeroVisual({ searchQuery }: { searchQuery: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (searchQuery.trim()) return;
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_FRAMES.length), 3000);
    return () => clearInterval(t);
  }, [searchQuery]);

  const frame = HERO_FRAMES[idx];

  if (searchQuery.trim()) {
    return (
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 h-[440px] flex items-center justify-center p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-zinc-900 to-zinc-900" />
        {[...Array(5)].map((_,i) => (
          <motion.div key={i} className="absolute rounded-full border border-blue-500/10"
            style={{ width:`${(i+1)*90}px`, height:`${(i+1)*90}px` }}
            animate={{ scale:[1,1.06,1], opacity:[0.15,0.04,0.15] }}
            transition={{ duration:3+i, repeat:Infinity, delay:i*0.4 }} />
        ))}
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-xl font-black text-white mb-3">Searching for</div>
          <motion.div key={searchQuery} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            className="text-2xl font-black text-blue-300 mb-5 px-5 py-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            &ldquo;{searchQuery}&rdquo;
          </motion.div>
          <p className="text-zinc-400 text-base font-medium">Finding the best tools for you…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden border border-zinc-800 h-[440px]" role="img" aria-label={frame.alt}>
      <motion.div className="absolute inset-0"
        animate={{ background: [
          `radial-gradient(ellipse at 35% 45%, ${frame.color}22 0%, #09090b 65%)`,
          `radial-gradient(ellipse at 65% 55%, ${frame.color}16 0%, #09090b 65%)`,
        ]}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} />
      {[...Array(22)].map((_,i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width:`${3+(i%5)*2}px`, height:`${3+(i%5)*2}px`,
            left:`${(i*17+5)%90+5}%`, top:`${(i*23+8)%80+10}%`,
            backgroundColor: frame.color+"28" }}
          animate={{ opacity:[0,0.9,0], y:[0,-18,0], scale:[0.3,1.3,0.3] }}
          transition={{ duration:3+(i%3), repeat:Infinity, delay:(i*0.28)%4 }} />
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 pb-16">
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity:0, y:28, scale:0.88 }} animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-18, scale:0.94 }} transition={{ duration:0.48, ease:[0.22,1,0.36,1] }}
            className="text-center">
            <motion.div className="text-[88px] leading-none mb-6"
              animate={{ scale:[1,1.1,1], rotate:[0,4,-4,0] }}
              transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}>
              {frame.icon}
            </motion.div>
            <div className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">{frame.text}</div>
            <div className="text-lg text-zinc-400 font-medium mb-8 max-w-xs mx-auto">{frame.sub}</div>
            <motion.div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black"
              style={{ backgroundColor:frame.color+"18", borderColor:frame.color+"45", color:frame.color }}
              animate={{ boxShadow:[`0 0 0 0 ${frame.color}28`,`0 0 22px 0 ${frame.color}18`,`0 0 0 0 ${frame.color}28`] }}
              transition={{ duration:2, repeat:Infinity }}>
              <Zap size={13} /> Free · Under 5 minutes · Plain English
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
        {HERO_FRAMES.map((f,i) => (
          <motion.button key={i} onClick={() => setIdx(i)}
            aria-label={f.alt}
            className="rounded-full transition-all duration-300"
            animate={{ width:i===idx?24:8, height:8, backgroundColor:i===idx?frame.color:"#3f3f46" }} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-6 py-3 bg-black/50 backdrop-blur-sm border-t border-zinc-800/50 z-10">
        <AnimatePresence mode="wait">
          <motion.p key={idx} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="text-zinc-400 text-sm font-medium text-center">
            <span style={{ color:frame.color }} className="font-bold">Free interactive guide</span>
            {" · "}Plain English{" · "}No tech knowledge needed{" · "}Designed for adults 45+
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: typeof TOOLS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:50 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.5, delay:index*0.04 }} className="group relative">
      <div className="relative h-full rounded-[2rem] border border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 overflow-hidden">
        <div className={`h-1.5 w-full bg-gradient-to-r ${tool.accent}`} />
        <div className="p-7">
          <div className="flex items-start justify-between mb-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.accent} flex items-center justify-center text-2xl shadow-lg`}>{tool.emoji}</div>
            <span className={`${tool.badgeColor||"bg-blue-600"} text-white text-xs font-black px-3 py-1.5 rounded-full`}>{tool.badge}</span>
          </div>
          <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors">{tool.title}</h3>
          <p className="text-zinc-400 text-base font-medium leading-relaxed mb-5">{tool.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {tool.tags.map(tag => (
              <span key={tag} className={`text-xs font-bold px-3 py-1 rounded-full ${tool.tagBg} ${tool.tagText} border border-white/5`}>{tag}</span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-4 text-sm text-zinc-500 font-semibold">
              <span className="flex items-center gap-1.5"><Zap size={13} className="text-amber-400" />{tool.time}</span>
              <span className="flex items-center gap-1.5"><Users size={13} className="text-blue-400" />{tool.users}</span>
            </div>
            <Link href={tool.href}>
              <motion.div whileHover={{ x:4 }}
                className={`flex items-center gap-2 text-sm font-black bg-gradient-to-r ${tool.accent} bg-clip-text text-transparent`}>
                Start Free <ArrowRight size={14} className="text-blue-400" />
              </motion.div>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}

export default function ToolsHubClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = q === "" || t.title.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q)) ||
      t.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const catCounts: Record<string,number> = { all: TOOLS.length };
  CATEGORIES.slice(1).forEach(c => { catCounts[c.id] = TOOLS.filter(t => t.category === c.id).length; });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/25 via-[#0d1117] to-[#0d1117]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-sm font-black uppercase tracking-widest mb-8">
                <Zap size={14} /> {TOOLS.length} Free Tools Live — More Launching Weekly
              </motion.div>
              <h1 className="font-black leading-[0.92] tracking-tighter mb-8">
                <motion.span className="block text-6xl md:text-8xl text-white"
                  initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, type:"spring", stiffness:80 }}>
                  Free Tech Tools
                </motion.span>
                <motion.span className="block text-6xl md:text-8xl bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent italic"
                  initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.32, type:"spring", stiffness:80 }}>
                  Built for You
                </motion.span>
              </h1>
              <motion.p className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed mb-10 max-w-lg"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
                Simple, interactive tools that help you understand your technology — no jargon, no confusion. Learn at your own pace.
              </motion.p>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65 }}
                className="relative max-w-lg mb-10">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search tools — GPS, printer, Alexa, Wi-Fi..."
                  className="w-full pl-14 pr-12 py-5 bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 rounded-2xl text-white font-medium outline-none transition-colors text-lg placeholder:text-zinc-600" />
                {search && (
                  <button onClick={() => setSearch("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors text-xl font-black">
                    ×
                  </button>
                )}
              </motion.div>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                className="flex flex-wrap gap-8">
                {[{ value:"100%",label:"Free to use"},{ value:"45+",label:"Designed for adults"},{ value:"0",label:"Jargon used"},{ value:"5min",label:"Average completion"}].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl font-black text-white">{s.value}</div>
                    <div className="text-sm text-zinc-400 font-semibold mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4, duration:0.8 }}>
              <AnimatedHeroVisual searchQuery={search} />
            </motion.div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-6 py-4 flex items-start gap-3">
          <Shield size={16} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-base text-blue-300 font-medium">
            <strong className="text-blue-200">Educational Platform:</strong> All tools are for learning and guidance only. Setwise Digital is not affiliated with HP, Canon, Epson, Brother, Garmin, TomTom, Amazon, Google, or Apple.
          </p>
        </div>
      </div>

      {search === "" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(activeCategory === "all" || activeCategory === "printer") && (
            <div className="bg-gradient-to-r from-orange-900/30 to-amber-900/20 border border-orange-800/40 rounded-2xl px-6 py-4 flex items-center gap-4">
              <span className="text-3xl">🖨️</span>
              <div>
                <p className="text-orange-200 font-black text-base">{catCounts.printer} Printer Guides Live</p>
                <p className="text-orange-300/70 text-sm">Setup, troubleshooting, ink savings, scanning, faxing, buying guides</p>
              </div>
            </div>
          )}
          {(activeCategory === "all" || activeCategory === "gps") && (
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-800/40 rounded-2xl px-6 py-4 flex items-center gap-4">
              <span className="text-3xl">🗺️</span>
              <div>
                <p className="text-green-200 font-black text-base">{catCounts.gps} GPS & Navigation Guides</p>
                <p className="text-green-300/70 text-sm">Map updates, buying guides, troubleshooting, outdoor, RV, pet GPS</p>
              </div>
            </div>
          )}
        </div>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-base border-2 transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
              }`}>
              <span>{cat.icon}</span>{cat.label}
              <span className={`ml-1 text-xs font-black px-2 py-0.5 rounded-full ${
                activeCategory === cat.id ? "bg-white/20 text-white" : "bg-zinc-700 text-zinc-400"
              }`}>{catCounts[cat.id]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="flex items-center justify-between mb-8">
          <p className="text-zinc-400 font-medium text-base">
            {search ? (
              <span>Showing <strong className="text-white">{filtered.length}</strong> results for &ldquo;<strong className="text-blue-300">{search}</strong>&rdquo;</span>
            ) : (
              <span><strong className="text-white">{filtered.length}</strong> tools available</span>
            )}
          </p>
          {search && <button onClick={() => setSearch("")} className="text-blue-400 text-sm font-bold hover:underline">Clear search</button>}
        </div>
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-black text-zinc-400 mb-2">No tools found for &ldquo;{search}&rdquo;</h3>
              <p className="text-zinc-600 font-medium text-lg mb-6">Try &ldquo;printer&rdquo;, &ldquo;GPS&rdquo;, &ldquo;Alexa&rdquo;, or &ldquo;Wi-Fi&rdquo;</p>
              <button onClick={() => setSearch("")} className="px-6 py-3 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-colors">
                Show All Tools
              </button>
            </motion.div>
          ) : (
            <motion.div key={activeCategory+search} initial={{ opacity:0 }} animate={{ opacity:1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tool,i) => <ToolCard key={tool.id} tool={tool} index={i} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="relative py-24 overflow-hidden border-t border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <div className="text-6xl mb-6">📬</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">Want a live lesson session?</h2>
            <p className="text-zinc-400 font-medium mb-10 text-xl leading-relaxed">
              All tools are free and self-guided. When you want one-on-one help from a real person, our live lesson sessions start from $49.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black px-10 py-6 rounded-2xl text-xl shadow-2xl shadow-blue-500/30 hover:scale-105 transition-transform">
              <Zap size={22} />Book a Live Lesson<ArrowRight size={22} />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
