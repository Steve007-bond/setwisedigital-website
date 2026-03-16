"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const },
];

interface CarBrand {
  id: string;
  name: string;
  emoji: string;
  badge: string;
  badgeColor: string;
  updateWebsite: string;
  updateWebsiteLabel: string;
  navSystem: string;
  updateMethod: string[];
  cost: string;
  updateFrequency: string;
  models: CarModel[];
  generalSteps: string[];
  tips: string[];
}

interface CarModel {
  name: string;
  years: string;
  navSystem: string;
  updateMethod: string;
  updateMedia: string;
  cost: string;
  note?: string;
}

const CAR_BRANDS: CarBrand[] = [
  {
    id:"honda",
    name:"Honda",
    emoji:"🔴",
    badge:"Most Common",
    badgeColor:"bg-red-600",
    updateWebsite:"https://honda.navigation.com",
    updateWebsiteLabel:"honda.navigation.com",
    navSystem:"Honda Garmin Navigation / Honda Connect",
    updateMethod:["USB Drive (most common)","SD Card (older models)","Over-the-Air (2021+ models)"],
    cost:"$149–$199 for map updates (USB/SD) · Free OTA on 2021+",
    updateFrequency:"Once per year recommended · OTA monthly on newer models",
    generalSteps:[
      "Go to honda.navigation.com on your computer and sign in or create a free account",
      "Click 'Find Updates' and enter your Vehicle Identification Number (VIN) — found on your dashboard near windshield",
      "Download the Honda Navigation Updater software to your computer",
      "Prepare a USB drive (minimum 16GB, FAT32 format) — plug into computer",
      "Open Honda Navigation Updater and select your USB drive as the destination",
      "Click 'Download' — the update file is 5–10GB and may take 30–60 minutes",
      "When download is complete, safely eject the USB drive from your computer",
      "Start your Honda's engine (must be running, not just accessory mode)",
      "Insert the USB into your Honda's USB port in the center console",
      "Your Honda will detect the update automatically — tap 'Update' on screen",
      "Do NOT turn off the engine during the update — it takes 30–90 minutes",
      "When complete, your navigation will restart with updated maps",
    ],
    tips:["Always run the engine, not just ACC, during the update","Use a USB drive with USB-A connector (not USB-C)","2021+ Honda models with Honda Connect can update over Wi-Fi automatically","Check for updates at least once per year before road trips"],
    models:[
      { name:"Honda Accord", years:"2016–2020", navSystem:"Honda Garmin Navigation", updateMethod:"USB Drive", updateMedia:"16GB USB-A", cost:"$149–$199", note:"Enter VIN at honda.navigation.com" },
      { name:"Honda Accord", years:"2021–2025", navSystem:"Honda Connect / Google", updateMethod:"Over-the-Air (Wi-Fi)", updateMedia:"Free OTA", cost:"Free", note:"Connect to home Wi-Fi in settings" },
      { name:"Honda CR-V", years:"2015–2019", navSystem:"Honda Garmin Navigation", updateMethod:"USB Drive", updateMedia:"16GB USB-A", cost:"$149–$199" },
      { name:"Honda CR-V", years:"2020–2025", navSystem:"Honda Connect", updateMethod:"USB or OTA", updateMedia:"USB or Wi-Fi", cost:"Free (OTA) / $149 (USB)" },
      { name:"Honda Pilot", years:"2016–2022", navSystem:"Honda Garmin Navigation", updateMethod:"USB Drive", updateMedia:"16GB USB-A", cost:"$149–$199" },
      { name:"Honda Civic", years:"2016–2021", navSystem:"Honda Garmin Navigation", updateMethod:"USB Drive", updateMedia:"16GB USB-A", cost:"$149–$199" },
      { name:"Honda Odyssey", years:"2018–2025", navSystem:"Honda Garmin Navigation / Connect", updateMethod:"USB or OTA", updateMedia:"USB or Wi-Fi", cost:"$149 or Free OTA" },
      { name:"Honda HR-V", years:"2019–2025", navSystem:"Honda Connect", updateMethod:"USB or OTA", updateMedia:"USB or Wi-Fi", cost:"Free–$149" },
    ],
  },
  {
    id:"toyota",
    name:"Toyota",
    emoji:"🔵",
    badge:"Popular",
    badgeColor:"bg-blue-600",
    updateWebsite:"https://www.toyota.com/configurator/api/lexicon/models/list",
    updateWebsiteLabel:"toyota.com/navigation",
    navSystem:"Toyota Entune / Toyota Audio Multimedia",
    updateMethod:["Micro SD Card (most models)","USB Drive (newer models)","Over-the-Air (2022+ Audio Multimedia)"],
    cost:"$149–$199 for SD card · Free OTA on 2022+",
    updateFrequency:"Once per year · OTA quarterly on newer models",
    generalSteps:[
      "Visit toyota.com/navigation on your computer",
      "Enter your vehicle's VIN (shown on driver's door jamb or windshield)",
      "Create or log into your Toyota Owner account",
      "Select the correct navigation system generation (Entune, Audio Multimedia, etc.)",
      "Purchase and download the map update to your computer",
      "Insert a blank Micro SD card (16–32GB, FAT32 format) into your computer's SD card reader",
      "Use the Toyota Map Update Tool to copy the files to the SD card",
      "With your car engine running, remove the original SD card from the slot under your center console",
      "Insert the update SD card into the same slot",
      "Follow the on-screen prompts on your touchscreen — select 'Update Maps'",
      "The update will take 30–60 minutes — keep engine running",
      "Replace with your original SD card when prompted (or keep the update card permanently)",
    ],
    tips:["Newer Toyota Audio Multimedia (2022+) supports free OTA updates via Wi-Fi","Always write down your current map version before updating","The SD card slot is typically found under the center console lid or near the gear shifter","2025 Toyota models use Google built-in navigation with automatic updates"],
    models:[
      { name:"Toyota Camry", years:"2018–2021", navSystem:"Toyota Entune 3.0", updateMethod:"Micro SD Card", updateMedia:"32GB Micro SD", cost:"$149–$199", note:"SD card slot under center console" },
      { name:"Toyota Camry", years:"2022–2025", navSystem:"Toyota Audio Multimedia", updateMethod:"OTA or USB", updateMedia:"Wi-Fi / USB", cost:"Free OTA" },
      { name:"Toyota RAV4", years:"2019–2021", navSystem:"Toyota Entune 3.0", updateMethod:"Micro SD Card", updateMedia:"32GB Micro SD", cost:"$149–$199" },
      { name:"Toyota RAV4", years:"2022–2025", navSystem:"Toyota Audio Multimedia", updateMethod:"OTA", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"Toyota Highlander", years:"2020–2025", navSystem:"Entune 3.0 / Audio Multimedia", updateMethod:"SD Card or OTA", updateMedia:"SD / Wi-Fi", cost:"Free–$199" },
      { name:"Toyota Tacoma", years:"2016–2023", navSystem:"Toyota Entune", updateMethod:"Micro SD Card", updateMedia:"32GB Micro SD", cost:"$149–$199", note:"Part # 86271-0E076 or 86271-0E077" },
      { name:"Toyota 4Runner", years:"2010–2019", navSystem:"Toyota Navigation Gen2/3", updateMethod:"DVD or SD Card", updateMedia:"DVD disc", cost:"$149–$199" },
      { name:"Toyota Prius", years:"2016–2022", navSystem:"Toyota Entune", updateMethod:"Micro SD Card", updateMedia:"32GB Micro SD", cost:"$149–$199" },
      { name:"Toyota Corolla", years:"2020–2025", navSystem:"Toyota Audio Multimedia", updateMethod:"USB or OTA", updateMedia:"USB / Wi-Fi", cost:"Free OTA" },
    ],
  },
  {
    id:"bmw",
    name:"BMW",
    emoji:"🔷",
    badge:"Luxury",
    badgeColor:"bg-blue-700",
    updateWebsite:"https://www.bmw.com/en/topics/offers-and-services/connecteddrive/map-update.html",
    updateWebsiteLabel:"bmw.com/map-update",
    navSystem:"BMW iDrive Navigation (Road Map Series)",
    updateMethod:["USB Drive (iDrive 6 and below)","Over-the-Air (iDrive 7+, BMW Live Cockpit)","DVD (older models pre-2015)"],
    cost:"$149–$299 USB · Free OTA on Connected Drive plan (from ~2017+)",
    updateFrequency:"Once or twice per year · OTA automatic with ConnectedDrive subscription",
    generalSteps:[
      "Press the iDrive controller or touchscreen → Go to 'Navigation' → 'Map version'",
      "Note your current map version and region (e.g., Road Map Europe Premium 2022-1)",
      "Visit the BMW ConnectedDrive Store at bmw.com or open the My BMW App",
      "Log in with your BMW ConnectedDrive ID (linked to your VIN)",
      "Check if your vehicle is eligible for free OTA updates (2017+ with ConnectedDrive)",
      "For OTA: Select 'Software Updates' in the My BMW App → 'Download Map Update'",
      "Your BMW will download the update overnight when parked and connected to home Wi-Fi",
      "For USB update: Download BMW Map Update Tool to your computer",
      "Insert a USB-A drive (minimum 32GB) and run the Map Update Tool",
      "Select your map region and download to USB (15–25GB, takes 1–2 hours)",
      "With your BMW running, insert USB into the USB port in the armrest or center console",
      "Press iDrive → 'Update Navigation' → follow the on-screen steps",
      "Do not switch off the engine — update takes 45–90 minutes",
    ],
    tips:["2019+ BMW models with iDrive 7 receive free quarterly OTA map updates included","You can check your iDrive version: Settings → System Information","BMWs with 'Live Cockpit Professional' update automatically via cellular","Always ensure the battery is fully charged before a manual USB update"],
    models:[
      { name:"BMW 3 Series", years:"2012–2018", navSystem:"BMW iDrive 5/6", updateMethod:"USB Drive", updateMedia:"32GB USB-A", cost:"$149–$299" },
      { name:"BMW 3 Series", years:"2019–2025", navSystem:"BMW iDrive 7/8 Live Cockpit", updateMethod:"OTA (My BMW App)", updateMedia:"Wi-Fi / Cellular", cost:"Free with ConnectedDrive" },
      { name:"BMW 5 Series", years:"2014–2016", navSystem:"BMW iDrive 5", updateMethod:"DVD or USB", updateMedia:"DVD disc", cost:"$149–$299" },
      { name:"BMW 5 Series", years:"2017–2025", navSystem:"iDrive 6/7/8", updateMethod:"USB or OTA", updateMedia:"USB / Wi-Fi", cost:"Free OTA" },
      { name:"BMW X5", years:"2014–2018", navSystem:"BMW iDrive 5/6", updateMethod:"USB Drive", updateMedia:"32GB USB-A", cost:"$149–$299" },
      { name:"BMW X5", years:"2019–2025", navSystem:"iDrive 7 Live Cockpit", updateMethod:"OTA automatic", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"BMW X3", years:"2018–2025", navSystem:"iDrive 6/7", updateMethod:"USB or OTA", updateMedia:"USB / OTA", cost:"$149 or Free OTA" },
    ],
  },
  {
    id:"mercedes",
    name:"Mercedes-Benz",
    emoji:"⭐",
    badge:"Luxury",
    badgeColor:"bg-zinc-600",
    updateWebsite:"https://www.mercedes-benz.com/en/vehicles/equipment/comand-online/map-updates.html",
    updateWebsiteLabel:"mercedes-benz.com/map-updates",
    navSystem:"COMAND Online / MBUX Navigation",
    updateMethod:["DVD (older COMAND systems)","SD Card (COMAND 2013–2018)","USB Drive (MBUX 2018+)","OTA (MBUX with connected services)"],
    cost:"$149–$299 disc/SD · Free OTA on MBUX with Mercedes me Connect",
    updateFrequency:"Once per year · OTA quarterly with Mercedes me Connect subscription",
    generalSteps:[
      "Press 'NAV' on your COMAND or MBUX system → go to 'System' or 'Settings'",
      "Find 'Navigation' → 'Map version' to note your current version",
      "Visit the Mercedes Map Update portal or use the Mercedes me app on your phone",
      "Register your vehicle using its VIN (found on the driver's door jamb)",
      "For MBUX (2018+): Open Mercedes me app → 'Software Updates' → check for map updates",
      "For OTA: Download in the background when connected to Wi-Fi (overnight recommended)",
      "For USB/SD update: Download the Mercedes Navigation Update Tool",
      "Prepare a 32GB USB drive (USB 3.0 recommended for faster transfer)",
      "Download the map package (~20–30GB) for your region using the tool",
      "With Mercedes engine running, insert USB into the USB port in the center armrest",
      "COMAND/MBUX will prompt you — select 'Install Map Update'",
      "Keep engine running for the full 60–120 minutes",
      "System restarts automatically when complete",
    ],
    tips:["MBUX systems (2018+) in C-Class, E-Class, and GLE receive free quarterly OTA updates","Mercedes me Connect subscription ($150/year) includes map updates and other features","For older COMAND systems, official DVD updates are $199–$299 from dealerships","Check your navigation manual for which disc or SD format your specific model requires"],
    models:[
      { name:"Mercedes C-Class", years:"2015–2018", navSystem:"COMAND Online NTG5.1", updateMethod:"SD Card", updateMedia:"32GB SD Card", cost:"$199–$299" },
      { name:"Mercedes C-Class", years:"2019–2025", navSystem:"MBUX", updateMethod:"OTA or USB", updateMedia:"Wi-Fi / USB", cost:"Free OTA (me Connect)" },
      { name:"Mercedes E-Class", years:"2010–2016", navSystem:"COMAND Online NTG4.5", updateMethod:"DVD Disc", updateMedia:"Navigation DVD", cost:"$199–$299" },
      { name:"Mercedes E-Class", years:"2017–2025", navSystem:"COMAND / MBUX", updateMethod:"USB or OTA", updateMedia:"USB / Wi-Fi", cost:"$199 or Free OTA" },
      { name:"Mercedes GLE / ML", years:"2012–2019", navSystem:"COMAND Online", updateMethod:"DVD or SD Card", updateMedia:"DVD / SD", cost:"$199–$299" },
      { name:"Mercedes GLE", years:"2020–2025", navSystem:"MBUX", updateMethod:"OTA automatic", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"Mercedes GLC", years:"2016–2022", navSystem:"COMAND Online / MBUX", updateMethod:"USB or OTA", updateMedia:"USB / Wi-Fi", cost:"$199 or Free" },
    ],
  },
  {
    id:"lexus",
    name:"Lexus",
    emoji:"🟫",
    badge:"Luxury",
    badgeColor:"bg-amber-700",
    updateWebsite:"https://www.lexus.com/navigation",
    updateWebsiteLabel:"lexus.com/navigation",
    navSystem:"Lexus Navigation (GEN4–GEN10)",
    updateMethod:["SD Card / Micro SD Card (most models)","USB Drive (GEN9/10 newer models)","OTA (2022+ Lexus Interface)"],
    cost:"$169–$210 for SD card update · Free OTA on 2022+ Lexus Interface models",
    updateFrequency:"Once per year · Last USB/SD release for many models was 2018 (v18.1)",
    generalSteps:[
      "Press 'MENU' → 'Setup' → 'Navigation' → 'Map Data' to check your current version",
      "Note the Generation (GEN4, GEN8, GEN9, etc.) — this determines the update method",
      "Visit lexus.com/navigation or your Lexus dealer's website",
      "Log in with your Lexus Owner account and enter your VIN",
      "For GEN8/GEN9 models: Look for a Micro SD card slot under the center console or near the radio",
      "Purchase the SD card update (if available) — MSRP is $169–$210",
      "Your dealer can also install the update if you prefer — typical labor cost $50–$100",
      "For 2022+ Lexus Interface: Open the Lexus App on your phone → Connected Services → Map Update",
      "Download in the background overnight while connected to Wi-Fi",
      "For SD card installation: Power off vehicle fully, swap the old SD card with the new one, restart",
      "The system will read and install the new maps automatically on next startup",
      "Confirm the new map version in Settings → Navigation → Map Data",
    ],
    tips:["Important: For GEN4 hardware, the final update was v15.1 (2015). No further updates available.","For GEN4/GEN8/GEN9, v18.1 (Fall 2018) remains the most current SD/USB update as of 2025","2022+ Lexus models with Lexus Interface receive quarterly OTA updates for free","Lexus dealers often provide and install map updates — call ahead to confirm pricing"],
    models:[
      { name:"Lexus RX 350/450h", years:"2016–2021", navSystem:"Lexus GEN8/GEN9", updateMethod:"Micro SD Card", updateMedia:"Micro SD", cost:"$169–$210", note:"v18.1 is the latest as of 2025" },
      { name:"Lexus RX 350/500h", years:"2022–2025", navSystem:"Lexus Interface", updateMethod:"OTA", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"Lexus ES 350/300h", years:"2013–2018", navSystem:"Lexus GEN4/GEN8", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$169–$210" },
      { name:"Lexus ES 350/300h", years:"2019–2025", navSystem:"Lexus GEN10 / Interface", updateMethod:"USB or OTA", updateMedia:"USB / Wi-Fi", cost:"$169 or Free" },
      { name:"Lexus NX 200t/300", years:"2015–2021", navSystem:"Lexus GEN8/GEN9", updateMethod:"Micro SD Card", updateMedia:"Micro SD", cost:"$169–$210" },
      { name:"Lexus NX 250/350h", years:"2022–2025", navSystem:"Lexus Interface", updateMethod:"OTA", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"Lexus IS 250/300/350", years:"2014–2020", navSystem:"Lexus GEN8", updateMethod:"Micro SD Card", updateMedia:"Micro SD", cost:"$169–$210" },
      { name:"Lexus GX 460", years:"2010–2019", navSystem:"Lexus GEN4", updateMethod:"DVD or SD Card", updateMedia:"DVD disc", cost:"$169–$299", note:"Final update: v18.1 (2018)" },
    ],
  },
  {
    id:"audi",
    name:"Audi",
    emoji:"🔘",
    badge:"Luxury",
    badgeColor:"bg-zinc-500",
    updateWebsite:"https://my.audi.com",
    updateWebsiteLabel:"my.audi.com",
    navSystem:"Audi MMI Navigation (MIB, MIB2, MIB3)",
    updateMethod:["SD Card (MIB/MIB2 — 2008–2019)","USB Drive (MIB3 — 2019+)","OTA (MIB3 with Audi Connect)"],
    cost:"$149–$249 for SD card · Free OTA with Audi Connect subscription",
    updateFrequency:"Once per year",
    generalSteps:[
      "Press 'Menu' on MMI → 'Navigation' → 'Map version' to check your current version",
      "Identify your MMI generation (MIB, MIB2, or MIB3) from your owner's manual or screen settings",
      "Log in to my.audi.com and register your vehicle using the VIN",
      "Go to 'Maps & Navigation' → 'Map Updates'",
      "For MIB/MIB2 (2008–2019): Purchase and download the SD card image to your computer",
      "Use a 16–32GB SD card and write the image file using the Audi MMI Update Tool",
      "With your Audi running, insert the SD card into the MMI SD slot (in the glovebox or center console)",
      "Follow the on-screen prompts → 'Install Map Update'",
      "For MIB3 (2019+): Can receive OTA updates via Audi Connect",
      "Open my Audi app → 'Remote Services' → 'Software Update' → select map update",
      "Update downloads overnight when connected to your home Wi-Fi",
      "Confirm new version in MMI → Settings → System → Version information",
    ],
    tips:["MIB3 generation (found in 2019+ Q3, Q7, A6, A7, A8) supports free OTA updates","For older MIB/MIB2 maps, check for updates annually — Audi still releases them","Dealer installation is available for ~$50–$100 service fee","Audi Connect subscription ($200/year) includes OTA map updates and live traffic"],
    models:[
      { name:"Audi A4", years:"2013–2016", navSystem:"Audi MMI 3G+", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$249" },
      { name:"Audi A4", years:"2017–2020", navSystem:"Audi MMI MIB2", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$249" },
      { name:"Audi A4", years:"2021–2025", navSystem:"Audi MMI MIB3", updateMethod:"USB or OTA", updateMedia:"USB / OTA", cost:"Free OTA (Audi Connect)" },
      { name:"Audi Q5", years:"2013–2017", navSystem:"Audi MMI 3G+", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$249" },
      { name:"Audi Q5", years:"2018–2025", navSystem:"Audi MMI MIB2/MIB3", updateMethod:"SD or OTA", updateMedia:"SD / OTA", cost:"$149 or Free OTA" },
      { name:"Audi A6", years:"2012–2018", navSystem:"Audi MMI 3G+", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$249" },
      { name:"Audi A6", years:"2019–2025", navSystem:"Audi MMI MIB3", updateMethod:"OTA", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"Audi Q7", years:"2016–2019", navSystem:"Audi MMI MIB2", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$249" },
    ],
  },
  {
    id:"ford",
    name:"Ford",
    emoji:"🔵",
    badge:"Popular",
    badgeColor:"bg-blue-800",
    updateWebsite:"https://owner.ford.com/tools/account/software-updates.html",
    updateWebsiteLabel:"owner.ford.com/software-updates",
    navSystem:"Ford SYNC 3 / SYNC 4 Navigation",
    updateMethod:["USB Drive (SYNC 3 — 2016–2021)","Wi-Fi OTA (SYNC 4 — 2021+)","Download to USB from fordpass website"],
    cost:"$129–$199 for SYNC 3 · Free OTA on SYNC 4 with FordPass",
    updateFrequency:"Once per year · OTA automatic on SYNC 4",
    generalSteps:[
      "Press 'Navigation' on SYNC screen → tap 'Settings' → 'About' to see current map version",
      "Visit owner.ford.com and log in with your FordPass account (create free if needed)",
      "Go to 'Software & Updates' → enter your VIN",
      "For SYNC 4 (2021+): SYNC 4 updates automatically over Wi-Fi when parked and connected",
      "Enable Wi-Fi: SYNC screen → Settings → Connectivity → Wi-Fi → connect to home network",
      "For SYNC 3 (2016–2021): Download the Ford SYNC 3 map update file to your computer",
      "Prepare a USB drive (minimum 32GB, FAT32 format) — this is the key requirement",
      "Extract the downloaded file and copy to the root of the USB drive",
      "Start your Ford's engine and plug in the USB drive",
      "SYNC 3 will prompt: 'A software update has been detected' → tap 'Install'",
      "The update takes 20–45 minutes — do not remove the USB or turn off the engine",
      "SYNC will restart automatically when complete",
    ],
    tips:["SYNC 4 (found in 2021+ F-150, Bronco, Mustang Mach-E) updates automatically via Wi-Fi for free","Free map updates available for the first 3 years on most SYNC 3 vehicles","Ford Navigation updates are also called 'F8' or 'F9' map releases — don't confuse with software updates","You can also update at any Ford dealer service center free of charge for first 3 years"],
    models:[
      { name:"Ford F-150", years:"2016–2020", navSystem:"Ford SYNC 3", updateMethod:"USB Drive", updateMedia:"32GB USB-A", cost:"$129–$199 (or free first 3 yrs)" },
      { name:"Ford F-150", years:"2021–2025", navSystem:"Ford SYNC 4 / SYNC 4A", updateMethod:"OTA Wi-Fi", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"Ford Explorer", years:"2016–2020", navSystem:"Ford SYNC 3", updateMethod:"USB Drive", updateMedia:"32GB USB-A", cost:"$129–$199" },
      { name:"Ford Explorer", years:"2020–2025", navSystem:"Ford SYNC 4", updateMethod:"OTA", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"Ford Escape", years:"2017–2021", navSystem:"Ford SYNC 3", updateMethod:"USB Drive", updateMedia:"32GB USB-A", cost:"$129–$199" },
      { name:"Ford Edge", years:"2015–2021", navSystem:"Ford SYNC 3", updateMethod:"USB Drive", updateMedia:"32GB USB-A", cost:"$129–$199" },
      { name:"Ford Mustang Mach-E", years:"2021–2025", navSystem:"Ford SYNC 4A", updateMethod:"OTA", updateMedia:"Wi-Fi", cost:"Free OTA" },
    ],
  },
  {
    id:"nissan",
    name:"Nissan",
    emoji:"🔷",
    badge:"Popular",
    badgeColor:"bg-cyan-700",
    updateWebsite:"https://www.nissannavigation.com",
    updateWebsiteLabel:"nissannavigation.com",
    navSystem:"Nissan Navigation with NissanConnect",
    updateMethod:["SD Card (most models)","USB Drive (newer models)","OTA (2022+ NissanConnect)"],
    cost:"$149–$199 SD card · Free OTA on 2022+ with NissanConnect Services",
    updateFrequency:"Once per year",
    generalSteps:[
      "Press 'Map' on the navigation screen → 'Info' or 'About' to check current map version",
      "Visit nissannavigation.com and enter your vehicle's VIN",
      "Select your model year and navigation system",
      "Purchase and download the correct map update for your vehicle",
      "For SD card update: Download the update tool to your computer",
      "Insert a compatible SD card (typically 4GB–32GB depending on model year)",
      "Use the Nissan Navigation Update Tool to write the update files to the SD card",
      "With car engine running, locate the SD card slot (usually behind or beside the display)",
      "Remove the existing SD card carefully and insert the new update card",
      "The navigation system will prompt you to begin installation",
      "Keep engine running for 20–45 minutes during update",
      "System restarts and new maps are ready to use",
    ],
    tips:["2022+ Nissan models with NissanConnect Services receive OTA updates via cellular/Wi-Fi","Nissan uses HERE Maps for navigation data — updated quarterly for newer models","The SD card is typically located behind the screen panel or in the center console","Some Nissan models require the SD card to remain installed at all times for navigation to work"],
    models:[
      { name:"Nissan Rogue", years:"2014–2020", navSystem:"Nissan Navigation NissanConnect", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$199" },
      { name:"Nissan Rogue", years:"2021–2025", navSystem:"NissanConnect with Google", updateMethod:"OTA", updateMedia:"Wi-Fi", cost:"Free OTA" },
      { name:"Nissan Altima", years:"2013–2018", navSystem:"Nissan Navigation", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$199" },
      { name:"Nissan Altima", years:"2019–2025", navSystem:"NissanConnect", updateMethod:"SD or OTA", updateMedia:"SD / Wi-Fi", cost:"$149 or Free OTA" },
      { name:"Nissan Pathfinder", years:"2014–2021", navSystem:"Nissan Navigation", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$199" },
      { name:"Nissan Murano", years:"2015–2021", navSystem:"Nissan Navigation", updateMethod:"SD Card", updateMedia:"SD Card", cost:"$149–$199" },
    ],
  },
];

export default function Client() {
  const [stage, setStage] = useState<"select-brand"|"select-model"|"guide">("select-brand");
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, brand: selectedBrand?.name, issue: `Car GPS Update — ${selectedBrand?.name} ${selectedModel?.name || ""} ${selectedModel?.years || ""}`, source:"car-gps-update" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setShowLeadForm(false);
  };
  const reset = () => { setStage("select-brand"); setSelectedBrand(null); setSelectedModel(null); setShowLeadForm(false); setSubmitted(false); setName(""); setEmail(""); setPhone(""); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Car Navigation Update Guide</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Guide · Step-by-Step</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Car Navigation<br/><span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent italic">Update Guide</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Select your car brand and model — get exact step-by-step update instructions. Honda, Toyota, BMW, Mercedes, Lexus, Audi, Ford, Nissan and more. Free, plain English, no jargon.</p>
          <div className="flex flex-wrap gap-5">{[{icon:"🚗",t:"8 Brands"},{icon:"📱",t:"60+ Models"},{icon:"📋",t:"Exact Steps"},{icon:"🆓",t:"100% Free"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">

          {/* BRAND SELECTION */}
          {stage === "select-brand" && (
            <motion.div key="brands" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400"/>
                <div className="p-8">
                  <h2 className="text-2xl font-black text-white mb-2">Select Your Car Brand 🚗</h2>
                  <p className="text-zinc-400 text-base mb-6">Choose your car manufacturer to see exact update steps for your model.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {CAR_BRANDS.map(brand => (
                      <motion.button key={brand.id} whileTap={{scale:0.96}} onClick={()=>{setSelectedBrand(brand);setStage("select-model");}}
                        className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-blue-500 hover:bg-blue-900/20 transition-all">
                        <div className="text-4xl">{brand.emoji}</div>
                        <div className="font-black text-white text-base">{brand.name}</div>
                        <span className={`${brand.badgeColor} text-white text-xs font-black px-2 py-1 rounded-full`}>{brand.badge}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-5 flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5"/>
                <div>
                  <div className="font-black text-amber-300 text-base mb-1">Important note</div>
                  <p className="text-amber-200/80 text-sm font-medium leading-relaxed">Car navigation map updates vary significantly by model year and generation. This tool provides general guidance — always verify with your owner's manual or your dealer for your exact vehicle. This is an educational guide only.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* MODEL SELECTION */}
          {stage === "select-model" && selectedBrand && (
            <motion.div key="models" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400"/>
                <div className="p-8">
                  <button onClick={()=>setStage("select-brand")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-6 transition-colors">← Back to Brands</button>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-4xl">{selectedBrand.emoji}</div>
                    <div>
                      <h2 className="text-2xl font-black text-white">{selectedBrand.name}</h2>
                      <div className="text-zinc-400 text-sm">{selectedBrand.navSystem}</div>
                    </div>
                  </div>
                  {/* General info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[{l:"Update Cost",v:selectedBrand.cost.split("·")[0]},{l:"Update Frequency",v:selectedBrand.updateFrequency}].map(i=>(<div key={i.l} className="bg-zinc-800 rounded-2xl p-4"><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">{i.l}</div><div className="font-black text-white text-sm">{i.v}</div></div>))}
                  </div>
                  <h3 className="font-black text-white text-base mb-4 uppercase tracking-widest">Select Your Model</h3>
                  <div className="space-y-3">
                    {selectedBrand.models.map(model => (
                      <motion.button key={`${model.name}-${model.years}`} whileTap={{scale:0.98}} onClick={()=>{setSelectedModel(model);setStage("guide");}}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-blue-500 hover:bg-blue-900/10 transition-all text-left">
                        <div className="flex-1">
                          <div className="font-black text-white text-base">{model.name} <span className="text-zinc-400 font-bold">({model.years})</span></div>
                          <div className="text-zinc-400 text-sm mt-0.5">{model.navSystem} · {model.updateMethod}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-black text-white">{model.cost}</div>
                          <div className="text-zinc-400 text-xs">{model.updateMedia}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-zinc-800 pt-4">
                    <div className="text-sm text-zinc-400 font-medium">Don't see your exact model? The general steps below apply to all {selectedBrand.name} vehicles.</div>
                    <button onClick={()=>{setSelectedModel(null);setStage("guide");}} className="mt-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors">Use General {selectedBrand.name} Guide →</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* GUIDE */}
          {stage === "guide" && selectedBrand && (
            <motion.div key="guide" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              {/* Header */}
              <div className="bg-zinc-900 rounded-[2rem] border-2 border-blue-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400"/>
                <div className="p-8">
                  <button onClick={()=>setStage("select-model")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-6 transition-colors">← Back</button>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl">{selectedBrand.emoji}</div>
                    <div>
                      <h2 className="text-3xl font-black text-white">{selectedBrand.name} {selectedModel?.name || ""}</h2>
                      {selectedModel && <div className="text-zinc-400 text-base mt-1">{selectedModel.years} · {selectedModel.navSystem}</div>}
                      <div className="text-zinc-400 text-sm mt-1">{selectedBrand.navSystem}</div>
                    </div>
                  </div>
                  {selectedModel && (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[{l:"Update Method",v:selectedModel.updateMethod},{l:"Update Media",v:selectedModel.updateMedia},{l:"Cost",v:selectedModel.cost}].map(i=>(<div key={i.l} className="bg-zinc-800 rounded-2xl p-4"><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">{i.l}</div><div className="font-black text-white text-sm">{i.v}</div></div>))}
                    </div>
                  )}
                  {selectedModel?.note && (
                    <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-4 mb-4 flex items-start gap-2">
                      <AlertCircle size={16} className="text-amber-400 mt-0.5 shrink-0"/>
                      <p className="text-amber-300 text-sm font-medium">{selectedModel.note}</p>
                    </div>
                  )}
                  <a href={selectedBrand.updateWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black px-5 py-3 rounded-xl text-base transition-colors">
                    Official Update Website <ExternalLink size={16}/>
                  </a>
                  <div className="text-zinc-500 text-sm mt-1">{selectedBrand.updateWebsiteLabel}</div>
                </div>
              </div>

              {/* Step-by-step guide */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-2xl font-black text-white mb-6">Step-by-Step Update Guide</h3>
                <div className="space-y-4">
                  {selectedBrand.generalSteps.map((step, i) => (
                    <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.06}}
                      className="flex items-start gap-4 p-5 bg-zinc-800 rounded-2xl">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">{i+1}</div>
                      <p className="text-base text-zinc-300 font-medium leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-xl font-black text-white mb-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/>Important Tips for {selectedBrand.name}</h3>
                <div className="space-y-3">
                  {selectedBrand.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-zinc-800 rounded-xl">
                      <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5"/>
                      <p className="text-base text-zinc-300 font-medium leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead capture */}
              {!submitted && !showLeadForm && (
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/20 border border-blue-800 rounded-[2rem] p-8 text-center">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-2xl font-black text-white mb-3">Get This Guide Sent to Your Inbox</h3>
                  <p className="text-zinc-400 font-medium mb-6 text-lg">Save these steps + receive plain-English car tech tips monthly.</p>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setShowLeadForm(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black px-8 py-5 rounded-2xl text-lg shadow-xl shadow-blue-500/25">
                    Send Me This Guide <ArrowRight size={20}/>
                  </motion.button>
                </div>
              )}

              {showLeadForm && !submitted && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-6">Get your guide by email</h3>
                  <div className="space-y-4 mb-6">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600"/></div></div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25">{submitting?<Loader2 size={24} className="animate-spin"/>:"Send My Free Guide"}</motion.button>
                  <p className="text-center text-sm text-zinc-600 mt-3">🔒 No spam. Unsubscribe anytime.</p>
                </div>
              )}

              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Guide sent to {email}! Check your inbox.</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Change Vehicle</button>
                <Link href="/tools/road-trip-checker"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Road Trip Pre-Check</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium leading-relaxed">Educational guidance only. Update methods, costs and availability vary by model year and region. Always verify with your vehicle's owner's manual or an authorized dealer before performing navigation updates. Not affiliated with Honda, Toyota, BMW, Mercedes-Benz, Lexus, Audi, Ford, or Nissan. Brand names used for educational identification purposes only.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SEO content */}
      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">How to Update Your Car's Navigation System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title:"Honda Navigation Update", desc:"Honda uses USB drives and the honda.navigation.com portal for SYNC-based navigation updates. 2021+ models with Honda Connect update over Wi-Fi automatically. USB updates for earlier models cost $149–$199." },
              { title:"Toyota Navigation Update", desc:"Toyota Entune uses Micro SD cards for map updates. The SD card slot is typically under the center console. 2022+ Toyota Audio Multimedia models receive free OTA updates via Wi-Fi." },
              { title:"BMW iDrive Map Update", desc:"BMW iDrive 7 and newer (2019+) receive free quarterly OTA updates via BMW ConnectedDrive. Older iDrive 5/6 models use USB drives with updates available from the BMW ConnectedDrive Store." },
              { title:"Mercedes-Benz COMAND Update", desc:"MBUX systems (2018+) receive free map updates through Mercedes me Connect. Older COMAND systems use SD cards or DVD discs, available from dealers or mercedes-benz.com." },
              { title:"Lexus Navigation Update", desc:"Lexus uses Micro SD cards for most models (GEN4–GEN9). Note: For many GEN4/GEN8 hardware models, v18.1 (Fall 2018) remains the latest available update as of 2025. Lexus Interface (2022+) updates OTA." },
              { title:"Audi MMI Map Update", desc:"Audi MMI MIB3 (2019+) supports OTA updates via Audi Connect. MIB/MIB2 models use SD cards available from my.audi.com. Updates typically cost $149–$249 for older systems." },
            ].map(item => (
              <div key={item.title} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
                <h3 className="font-black text-white text-base mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
