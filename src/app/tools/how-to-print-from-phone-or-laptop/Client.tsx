"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, ArrowLeft, ChevronRight,
  Mail, Phone, User, Loader2, Shield, Zap, RefreshCw,
  CheckCheck, AlertCircle, Smartphone, Laptop,
} from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type DeviceId = "iphone" | "ipad" | "android_samsung" | "android_google" | "windows" | "mac" | "chromebook";
type PrinterBrand = "hp" | "canon" | "epson" | "brother" | "any";

const DEVICES: { id: DeviceId; label: string; icon: string; category: "phone" | "computer" }[] = [
  { id: "iphone", label: "iPhone", icon: "📱", category: "phone" },
  { id: "ipad", label: "iPad", icon: "📟", category: "phone" },
  { id: "android_samsung", label: "Samsung Android", icon: "📲", category: "phone" },
  { id: "android_google", label: "Android (Google/Other)", icon: "🤖", category: "phone" },
  { id: "windows", label: "Windows Laptop/PC", icon: "💻", category: "computer" },
  { id: "mac", label: "Mac or MacBook", icon: "🍎", category: "computer" },
  { id: "chromebook", label: "Chromebook", icon: "🖥️", category: "computer" },
];

const BRANDS: { id: PrinterBrand; label: string; emoji: string }[] = [
  { id: "hp", label: "HP", emoji: "🔵" },
  { id: "canon", label: "Canon", emoji: "🔴" },
  { id: "epson", label: "Epson", emoji: "🟣" },
  { id: "brother", label: "Brother", emoji: "⚫" },
  { id: "any", label: "Other / Not Sure", emoji: "🖨️" },
];

type Step = { title: string; detail: string; tip?: string };

// Full matrix: device → brand → steps
const GUIDE: Record<DeviceId, Record<PrinterBrand, { method: string; appName: string; steps: Step[] }>> = {
  iphone: {
    hp: {
      method: "AirPrint (built-in) or HP Smart app",
      appName: "HP Smart",
      steps: [
        { title: "Make sure your iPhone and HP printer are on the same Wi-Fi", detail: "On your iPhone, go to Settings → Wi-Fi and check the network name. On your HP printer, tap the wireless icon on screen — it should show the same network name.", tip: "Both devices must be on the same Wi-Fi for AirPrint to work. If your router has a 2.4GHz and 5GHz network, make sure both are on the same one." },
        { title: "Open the photo, document or webpage you want to print", detail: "Open Photos for a photo, Files for a document, Safari for a webpage, or Gmail/Mail for an email." },
        { title: "Tap the Share button", detail: "Look for the share icon — it's a square with an arrow pointing up. In some apps it's in the top-right corner, in others it's at the bottom of the screen.", tip: "In the Gmail app: tap the three dots (⋮) in the top right corner → tap Print." },
        { title: "Scroll down and tap Print", detail: "In the Share sheet, scroll down through the options until you see 'Print'. Tap it.", tip: "If you don't see 'Print', tap 'More' at the bottom of the Share sheet — it may be hidden there." },
        { title: "Select your HP printer and tap Print", detail: "Tap 'Printer' at the top of the screen to see available printers. Your HP printer should appear automatically via AirPrint. Tap it, then adjust copies if needed, and tap the blue Print button in the top right.", tip: "If your HP printer doesn't appear, download the HP Smart app (free) — it finds HP printers even when AirPrint doesn't." },
      ],
    },
    canon: {
      method: "AirPrint (built-in) or Canon PRINT app",
      appName: "Canon PRINT Inkjet/SELPHY",
      steps: [
        { title: "Confirm both devices are on the same Wi-Fi", detail: "iPhone: Settings → Wi-Fi. Canon printer: tap the Wi-Fi button on the printer screen — it should show a solid Wi-Fi icon if connected.", tip: "A flashing Wi-Fi light on your Canon means it's not connected to your network yet." },
        { title: "Open what you want to print", detail: "Open the photo in Photos, document in Files, or webpage in Safari. For Gmail tap the three dots → Print." },
        { title: "Tap the Share button (square with arrow up)", detail: "Tap the Share icon in the current app. In Photos it's at the bottom left. In Safari it's at the bottom centre. In Files it's at the top right." },
        { title: "Tap Print in the Share sheet", detail: "Scroll down in the Share sheet to find 'Print' and tap it." },
        { title: "Select your Canon printer and print", detail: "Tap 'Printer' and select your Canon model from the list. Set the number of copies if needed and tap Print (top right).", tip: "For better photo printing from iPhone, use the Canon PRINT Inkjet app — it gives you more print quality options than AirPrint alone." },
      ],
    },
    epson: {
      method: "AirPrint (built-in) or Epson Smart Panel app",
      appName: "Epson Smart Panel",
      steps: [
        { title: "Check your Epson printer is connected to the same Wi-Fi as your iPhone", detail: "On the Epson printer, press the Wi-Fi button or check Settings → Network Status. The Wi-Fi icon should be solid, not flashing." },
        { title: "Open the file or photo you want to print", detail: "Navigate to the file in Photos, Files, Safari or your email app." },
        { title: "Tap the Share icon (box with upward arrow)", detail: "In Photos: bottom left. In Safari: bottom centre. In Files: top right. In Mail: tap and hold the email then select Print." },
        { title: "Tap Print", detail: "Scroll through the Share sheet options and tap Print.", tip: "Epson printers support AirPrint on most models made after 2015." },
        { title: "Choose your Epson printer and tap Print", detail: "Tap 'Printer' to see available printers. Select your Epson model. Set copies. Tap Print (top right).", tip: "For EcoTank printers, the Epson Smart Panel app also lets you check ink levels from your iPhone." },
      ],
    },
    brother: {
      method: "AirPrint (built-in) or Brother iPrint&Scan app",
      appName: "Brother iPrint&Scan",
      steps: [
        { title: "Confirm your iPhone and Brother printer are on the same Wi-Fi", detail: "iPhone: Settings → Wi-Fi. Brother printer: press the Wireless button on top and check the Wi-Fi light is solid (not flashing).", tip: "Brother's physical Wireless button on top of the printer is very useful — hold it 3 seconds to reconnect if needed." },
        { title: "Open the document or photo", detail: "Go to Photos, Files, Safari, or Mail on your iPhone." },
        { title: "Tap the Share icon", detail: "Tap the Share button (square with upward arrow) in the app you're using." },
        { title: "Tap Print in the Share sheet", detail: "Scroll through the share options. Tap Print when you see it." },
        { title: "Select your Brother printer and tap Print", detail: "Tap 'Printer' at the top. Select your Brother model. Adjust copies. Tap Print (top right).", tip: "The Brother iPrint&Scan app is excellent and lets you also scan documents directly to your iPhone." },
      ],
    },
    any: {
      method: "AirPrint (built-in) or manufacturer app",
      appName: "Your brand's print app",
      steps: [
        { title: "Make sure your iPhone and printer are on the same Wi-Fi network", detail: "iPhone: Settings → Wi-Fi — check the network name. Your printer should be on the exact same network.", tip: "This single step solves 80% of iPhone printing issues. Different Wi-Fi networks = printer won't appear." },
        { title: "Open what you want to print", detail: "Go to the app that contains your document, photo, or webpage." },
        { title: "Tap the Share button", detail: "Look for the square with an upward arrow icon. It appears in Photos, Safari, Files, Mail, and most apps.", tip: "In the Gmail app, tap the three dots (⋮) in the top-right corner, then tap Print." },
        { title: "Scroll to Print and tap it", detail: "In the Share sheet that slides up, scroll through the list of options until you see Print. Tap it." },
        { title: "Select your printer from the AirPrint list", detail: "Tap 'Printer' at the top of the print screen. Your printer should appear if it supports AirPrint (most printers made after 2015 do). Tap it. Tap Print.", tip: "If your printer doesn't appear, search for '[your brand] print app' in the App Store and use that instead of AirPrint." },
      ],
    },
  },
  ipad: {
    hp: {
      method: "AirPrint — same as iPhone",
      appName: "HP Smart",
      steps: [
        { title: "Check iPad and HP printer are on the same Wi-Fi", detail: "iPad: Settings → Wi-Fi. Both devices must show the same network name.", tip: "iPad printing uses the same AirPrint system as iPhone — identical steps." },
        { title: "Open the file, photo or webpage", detail: "Navigate to your content in Photos, Files, Safari, or your email app on the iPad." },
        { title: "Tap the Share button", detail: "In Photos: bottom left. In Safari: at the top in the address bar. In Files: top right three dots." },
        { title: "Tap Print in the Share sheet", detail: "Scroll through the Share options and tap Print.", tip: "On iPad the share sheet usually shows Print more prominently than on iPhone." },
        { title: "Select your HP printer and print", detail: "Tap 'Printer'. Select your HP model. Set copies and page range. Tap Print.", tip: "The HP Smart app on iPad gives you extra features like scanning and ink level checks." },
      ],
    },
    canon: { method: "AirPrint or Canon PRINT app", appName: "Canon PRINT Inkjet/SELPHY", steps: [{ title: "Confirm iPad and Canon are on the same Wi-Fi", detail: "iPad: Settings → Wi-Fi. Printer: check the Wi-Fi indicator light is solid." }, { title: "Open your content", detail: "Open the photo in Photos, document in Files, or page in Safari." }, { title: "Tap the Share icon", detail: "Tap the Share button in the current app (square with upward arrow)." }, { title: "Tap Print", detail: "Scroll through Share options and tap Print." }, { title: "Select Canon and tap Print", detail: "Tap Printer → select your Canon → adjust copies → tap Print.", tip: "Canon PRINT Inkjet app gives more control over photo print quality from iPad." }] },
    epson: { method: "AirPrint or Epson Smart Panel", appName: "Epson Smart Panel", steps: [{ title: "Same Wi-Fi on iPad and Epson printer", detail: "iPad Settings → Wi-Fi must match the printer's network." }, { title: "Open your file or photo", detail: "Navigate to your content in Photos, Files, or Safari." }, { title: "Tap Share icon", detail: "Tap the Share button (square with upward arrow)." }, { title: "Tap Print", detail: "Scroll to Print in the Share sheet and tap it." }, { title: "Select Epson and print", detail: "Tap Printer → select Epson model → tap Print.", tip: "Epson Smart Panel app is excellent for iPad — includes scanning and ink level monitoring." }] },
    brother: { method: "AirPrint or Brother iPrint&Scan", appName: "Brother iPrint&Scan", steps: [{ title: "Check iPad and Brother are on the same Wi-Fi", detail: "Settings → Wi-Fi on iPad. Wireless light on Brother printer should be solid." }, { title: "Open your file or photo", detail: "Go to Photos, Files, or Safari on iPad." }, { title: "Tap Share", detail: "Tap the Share icon in the app." }, { title: "Tap Print", detail: "In the Share sheet, scroll to Print and tap." }, { title: "Select Brother printer and tap Print", detail: "Tap Printer → select Brother → tap Print.", tip: "iPrint&Scan by Brother is particularly powerful on iPad — scan, copy, and print from one app." }] },
    any: { method: "AirPrint (built-in)", appName: "Your brand's app", steps: [{ title: "Same Wi-Fi on both devices", detail: "Settings → Wi-Fi on iPad must match the printer's network." }, { title: "Open your content", detail: "Navigate to the file in Photos, Files, or Safari." }, { title: "Tap Share icon", detail: "Tap the share button." }, { title: "Tap Print", detail: "Scroll the Share sheet and tap Print." }, { title: "Select printer and tap Print", detail: "Tap Printer → choose your printer → tap Print.", tip: "If your printer doesn't show, download your brand's print app from the App Store." }] },
  },
  android_samsung: {
    hp: {
      method: "Android Default Print Service or HP Print Service Plugin",
      appName: "HP Smart or HP Print Service Plugin",
      steps: [
        { title: "Make sure your Samsung phone and HP printer are on the same Wi-Fi", detail: "Samsung: swipe down → tap and hold the Wi-Fi icon → check the network name. Your HP printer must be on the same network.", tip: "Check in Settings → Connections → Wi-Fi for the full network name." },
        { title: "Download HP Print Service Plugin (if not already installed)", detail: "Open Google Play Store → search 'HP Print Service Plugin' → install it. Once installed, it runs in the background — no need to open it.", tip: "Many Samsung phones come with this pre-installed. Check Settings → General Management → Print Services to see." },
        { title: "Open the file or photo you want to print", detail: "Open Gallery for photos, My Files for documents, or Samsung Internet/Chrome for webpages." },
        { title: "Tap the three-dot menu or Share button → tap Print", detail: "In Gallery: tap the three dots → Print. In Samsung Internet: tap the three dots → Print. In Google Chrome: tap the three dots → Share → Print.", tip: "In Gmail app: tap the three dots in the top right of the email → tap Print." },
        { title: "Select your HP printer and tap the Print button", detail: "Your HP printer should appear in the printer list. Tap it. Adjust copies or page range if needed. Tap the printer icon or Print button to send the job.", tip: "If the printer doesn't appear, tap 'All printers' → 'Add printer' and follow the steps." },
      ],
    },
    canon: { method: "Canon Print Service Plugin or Canon PRINT app", appName: "Canon PRINT Inkjet/SELPHY", steps: [{ title: "Same Wi-Fi on Samsung and Canon", detail: "Samsung: Settings → Connections → Wi-Fi. Both must show the same network." }, { title: "Download Canon PRINT Inkjet/SELPHY from Google Play", detail: "Search 'Canon PRINT' in Google Play and install the free app.", tip: "This app is the best way to print from Samsung to Canon — it gives full control." }, { title: "Open your file or photo", detail: "Go to Gallery, My Files, or Samsung Internet." }, { title: "Open Canon PRINT app directly for best results", detail: "Open the Canon PRINT app → tap Print → select Photo or Document → browse for your file.", tip: "The Canon app also lets you print directly from Google Drive and Dropbox." }, { title: "Select your Canon printer and tap Print", detail: "The app will find your Canon printer automatically. Tap Print." }] },
    epson: { method: "Epson Print Enabler or Epson Smart Panel", appName: "Epson Smart Panel", steps: [{ title: "Same Wi-Fi on Samsung and Epson", detail: "Settings → Connections → Wi-Fi on Samsung must match the printer's network." }, { title: "Download Epson Smart Panel from Google Play", detail: "Search 'Epson Smart Panel' on Google Play and install.", tip: "Epson Print Enabler is also available — it enables printing from the Android system menu." }, { title: "Open your document or photo", detail: "Navigate to the file in Gallery, My Files, or Chrome." }, { title: "Share → Print or open via Epson Smart Panel", detail: "In most apps: tap Share or three dots → Print. Or open Epson Smart Panel → Print → select your file." }, { title: "Select Epson and tap Print", detail: "Select your Epson printer from the list and tap Print.", tip: "Epson Smart Panel shows EcoTank ink levels — very useful on Samsung." }] },
    brother: { method: "Android Default Print or Brother iPrint&Scan", appName: "Brother iPrint&Scan", steps: [{ title: "Confirm same Wi-Fi", detail: "Samsung: Settings → Connections → Wi-Fi. Brother: check Wireless light is solid." }, { title: "Download Brother iPrint&Scan from Google Play", detail: "Search 'Brother iPrint&Scan' on Google Play and install.", tip: "This app also enables scanning and copying from your Samsung." }, { title: "Open your file", detail: "Navigate to the document or photo in Gallery, My Files, or Chrome." }, { title: "Share → Print or open via Brother app", detail: "Use Share → Print for documents. Or open the Brother app directly to print photos with more control." }, { title: "Select Brother printer and print", detail: "Tap your Brother printer in the list and tap Print.", tip: "Brother iPrint&Scan is very reliable on Samsung devices." }] },
    any: { method: "Android Default Print Service", appName: "Your brand's Android plugin", steps: [{ title: "Confirm same Wi-Fi", detail: "Samsung: Settings → Connections → Wi-Fi. Both devices on the same network." }, { title: "Check print services are enabled", detail: "Settings → General Management → Print. Make sure Default Print Service is On.", tip: "You can also add a brand-specific plugin here for better results." }, { title: "Open your file or photo", detail: "Navigate to the content in Gallery, My Files, or a browser." }, { title: "Tap three dots or Share → Print", detail: "In most Samsung apps, tap the three-dot menu or Share button and look for Print." }, { title: "Select printer and print", detail: "Choose your printer from the list and tap the print button.", tip: "If your printer doesn't appear, install your brand's print service plugin from Google Play: search '[brand] print service plugin'." }] },
  },
  android_google: {
    hp: { method: "Android Default Print Service or HP Smart", appName: "HP Smart", steps: [{ title: "Confirm your Android phone and HP printer are on the same Wi-Fi", detail: "Settings → Network & Internet → Wi-Fi. Check the network name matches." }, { title: "Install HP Smart from Google Play (recommended)", detail: "Open Google Play → search 'HP Smart' → install.", tip: "HP Smart for Android is excellent and shows ink levels, enables scanning too." }, { title: "Open your document or photo", detail: "Navigate to the file in Google Photos, Files, or Chrome." }, { title: "Tap Share or three-dot menu → Print", detail: "In Chrome: tap three dots → Share → Print. In Photos: tap Share → Print. In Gmail: tap three dots → Print." }, { title: "Select your HP printer and print", detail: "Your HP printer appears in the list. Tap it. Adjust settings. Tap Print.", tip: "Google Pixel phones have excellent built-in print support — HP printers appear automatically." }] },
    canon: { method: "Canon PRINT app or Android print service", appName: "Canon PRINT Inkjet/SELPHY", steps: [{ title: "Same Wi-Fi on Android and Canon printer", detail: "Settings → Network & Internet → Wi-Fi. Both devices must be on the same network." }, { title: "Download Canon PRINT from Google Play", detail: "Search 'Canon PRINT Inkjet' on Google Play and install." }, { title: "Open your file", detail: "Go to Google Photos, Files, or Chrome." }, { title: "Share → Print or open Canon PRINT app directly", detail: "Use Share → Print for quick prints. Open the Canon app for full quality control over photos." }, { title: "Select Canon and tap Print", detail: "Tap your Canon printer and tap Print.", tip: "Canon app connects seamlessly on Google Pixel and stock Android phones." }] },
    epson: { method: "Epson Print Enabler + Smart Panel", appName: "Epson Smart Panel", steps: [{ title: "Same Wi-Fi on Android and Epson", detail: "Settings → Network & Internet → Wi-Fi matches the printer's network." }, { title: "Install Epson Smart Panel or Epson Print Enabler from Google Play", detail: "Both are free. Epson Smart Panel gives a better full experience.", tip: "Epson Print Enabler adds a Print option to the Share menu in all Android apps." }, { title: "Open your file in Google Photos, Drive, or Chrome", detail: "Navigate to your document or photo." }, { title: "Tap Share → Print or use Epson Smart Panel", detail: "Standard Share → Print works well on stock Android once the plugin is installed." }, { title: "Select Epson printer and print", detail: "Choose your Epson model and tap Print." }] },
    brother: { method: "Android Default Print + Brother iPrint&Scan", appName: "Brother iPrint&Scan", steps: [{ title: "Same Wi-Fi on both devices", detail: "Check Settings → Network → Wi-Fi on your Android phone." }, { title: "Download Brother iPrint&Scan from Google Play", detail: "Free app — handles printing, scanning, and copying from Android." }, { title: "Open your file", detail: "Navigate to the content in Photos, Files, or Chrome." }, { title: "Share → Print or use Brother app", detail: "Use the Brother app for the most reliable experience on any Android device." }, { title: "Select Brother printer and print", detail: "Tap your Brother model in the app and tap Print." }] },
    any: { method: "Android Default Print Service", appName: "Your brand's plugin", steps: [{ title: "Confirm same Wi-Fi", detail: "Settings → Network & Internet → Wi-Fi. Both devices on same network." }, { title: "Check print service is active", detail: "Settings → Connected devices → Connection preferences → Printing. Turn on Default Print Service." }, { title: "Open your file", detail: "Navigate to the document, photo, or webpage." }, { title: "Tap Share or three dots → Print", detail: "Print appears in Share menus across most Android apps including Chrome, Gmail, Photos." }, { title: "Select printer and tap Print", detail: "Choose your printer from the discovery list and print.", tip: "Search Google Play for '[brand] print service' to get the best plugin for your printer brand." }] },
  },
  windows: {
    hp: {
      method: "Windows automatic driver or HP Smart app",
      appName: "HP Smart (Windows app)",
      steps: [
        { title: "Make sure your Windows PC and HP printer are on the same Wi-Fi", detail: "Click the Wi-Fi icon in the bottom-right taskbar of Windows. Check the network name. Your HP printer should be on the same network.", tip: "If using a cable (USB or Ethernet), skip this step — cables don't need Wi-Fi." },
        { title: "Add the HP printer in Windows Settings", detail: "Press Start → Settings (gear icon) → Bluetooth & devices → Printers & scanners → Add device. Windows will search for printers automatically. When your HP appears, click Add device.", tip: "Windows 10 and 11 usually install HP printer drivers automatically — no CD needed." },
        { title: "Open the document, photo or file you want to print", detail: "Open the file in any program — Word, Edge, Photos, PDF reader, Gmail in browser, etc." },
        { title: "Press Ctrl + P (or File → Print)", detail: "Press and hold Ctrl, then press P. This opens the print dialog in almost every Windows application.", tip: "Ctrl+P is a universal shortcut across Windows — works in every app." },
        { title: "Select your HP printer and click Print", detail: "In the print dialog, click the printer name dropdown at the top and select your HP printer. Adjust copies, pages, or colour settings if needed. Click Print.", tip: "If your HP printer isn't listed, download HP Smart from the Microsoft Store — it installs the driver automatically." },
      ],
    },
    canon: { method: "Windows auto driver or Canon download", appName: "Canon IJ Network Tool", steps: [{ title: "Same Wi-Fi on Windows and Canon", detail: "Check Wi-Fi in taskbar bottom right. Both devices must be on the same network." }, { title: "Add Canon printer in Windows", detail: "Settings → Bluetooth & devices → Printers & scanners → Add device. Select your Canon when it appears.", tip: "If Canon doesn't appear automatically, visit canon.com/support → search your model → download the driver." }, { title: "Open your file", detail: "Open the document, photo, or PDF you want to print." }, { title: "Press Ctrl+P", detail: "The universal print shortcut — works in every Windows app." }, { title: "Select Canon printer and click Print", detail: "Choose your Canon from the dropdown and click Print.", tip: "Canon drivers from canon.com/support give you full photo quality control." }] },
    epson: { method: "Windows auto driver or Epson download", appName: "Epson Software Updater", steps: [{ title: "Same Wi-Fi on Windows and Epson", detail: "Wi-Fi icon in taskbar. Both on same network." }, { title: "Add Epson in Windows", detail: "Settings → Printers & scanners → Add device. Epson should appear within 30 seconds.", tip: "If not found, download drivers from epson.com/support → enter your model number." }, { title: "Open your file", detail: "Open the document, image, or PDF." }, { title: "Press Ctrl+P", detail: "Opens print dialog in any Windows app." }, { title: "Select Epson and print", detail: "Select your Epson from the printer list and click Print." }] },
    brother: { method: "Windows auto driver or Brother download", appName: "Brother iPrint&Scan Desktop", steps: [{ title: "Same Wi-Fi on Windows and Brother", detail: "Check Wi-Fi in Windows taskbar. Both devices on same network." }, { title: "Add Brother in Windows", detail: "Settings → Printers & scanners → Add device. Select Brother when it appears." }, { title: "Open your file", detail: "Navigate to the document or photo." }, { title: "Press Ctrl+P", detail: "Universal Windows print shortcut." }, { title: "Select Brother and click Print", detail: "Choose Brother from the printer dropdown and click Print.", tip: "Brother also has a free desktop app — Brother iPrint&Scan — which adds extra features on Windows." }] },
    any: { method: "Windows Add Printer wizard", appName: "Manufacturer driver", steps: [{ title: "Same Wi-Fi on Windows and printer", detail: "Check Wi-Fi icon in taskbar (bottom right). Both devices on same network." }, { title: "Settings → Printers & scanners → Add device", detail: "Windows will search for available printers. Select your printer when it appears.", tip: "If not found, visit your brand's website and search for your model name + 'driver download'." }, { title: "Open the file you want to print", detail: "Open in any Windows application — Word, Edge, Adobe Reader, Photos, etc." }, { title: "Press Ctrl+P", detail: "Universal print shortcut. Opens the print dialog in any app." }, { title: "Select printer and click Print", detail: "Choose your printer from the list. Set copies. Click Print." }] },
  },
  mac: {
    hp: {
      method: "macOS AirPrint (automatic) or HP Smart app",
      appName: "HP Smart for Mac",
      steps: [
        { title: "Confirm your Mac and HP printer are on the same Wi-Fi", detail: "Click the Wi-Fi icon in the top-right menu bar of your Mac. Check the network name. Your HP printer needs to be on the same network.", tip: "Mac and HP printers work together via AirPrint — no driver installation needed for basic printing." },
        { title: "Add your HP printer in System Settings", detail: "Click Apple menu (top left) → System Settings → Printers & Scanners → click the + button to add a printer. Your HP printer should appear automatically. Click Add.", tip: "You only need to do this once — the printer stays added permanently." },
        { title: "Open the document, photo or file you want to print", detail: "Open in any Mac app — Pages, Preview, Safari, Photos, Mail, etc." },
        { title: "Press Cmd + P (or File → Print)", detail: "Hold the Command key (⌘) and press P. This opens the print dialog.", tip: "⌘+P is the universal Mac print shortcut — works in every app." },
        { title: "Select your HP printer and click Print", detail: "Choose your HP printer from the dropdown. Adjust settings if needed. Click Print.", tip: "HP Smart for Mac (free from App Store) gives you extra features: ink levels, scanning, and fax." },
      ],
    },
    canon: { method: "macOS AirPrint or Canon driver", appName: "Canon IJ Printer Utility", steps: [{ title: "Same Wi-Fi on Mac and Canon", detail: "Wi-Fi menu top-right on Mac. Both on same network." }, { title: "Add Canon in System Settings → Printers & Scanners → +", detail: "Your Canon appears automatically via AirPrint. Click Add.", tip: "For full photo quality options, download drivers from canon.com/support for your Mac." }, { title: "Open your file", detail: "Open the document or photo in any Mac application." }, { title: "Press ⌘+P", detail: "Mac universal print shortcut." }, { title: "Select Canon and click Print", detail: "Choose Canon from the dropdown and print.", tip: "Canon Printer Utility for Mac gives access to print head cleaning and nozzle check." }] },
    epson: { method: "macOS AirPrint or Epson driver", appName: "Epson Printer Utility", steps: [{ title: "Same Wi-Fi on Mac and Epson", detail: "Wi-Fi in menu bar. Both devices on same network." }, { title: "System Settings → Printers & Scanners → +", detail: "Select your Epson from the discovered printers list." }, { title: "Open your file", detail: "Open the photo or document in Preview, Photos, Pages, or any app." }, { title: "Press ⌘+P", detail: "Opens the print dialog." }, { title: "Select Epson and print", detail: "Choose Epson from dropdown and click Print.", tip: "Epson printers print beautifully from Mac — for EcoTank, Epson Printer Utility shows ink levels." }] },
    brother: { method: "macOS AirPrint or Brother driver", appName: "Brother iPrint&Scan for Mac", steps: [{ title: "Same Wi-Fi on Mac and Brother", detail: "Wi-Fi menu top right on Mac. Both on same network." }, { title: "System Settings → Printers & Scanners → + → add Brother", detail: "Brother appears automatically via AirPrint or Bonjour." }, { title: "Open your file", detail: "Open in Pages, Preview, Mail, Safari, or any app." }, { title: "Press ⌘+P", detail: "Universal Mac print shortcut." }, { title: "Select Brother and click Print", detail: "Choose Brother from the list and print.", tip: "Brother iPrint&Scan for Mac is excellent for scanning multi-page documents." }] },
    any: { method: "macOS AirPrint (automatic)", appName: "Manufacturer driver", steps: [{ title: "Same Wi-Fi on Mac and printer", detail: "Wi-Fi in menu bar must match for both devices." }, { title: "System Settings → Printers & Scanners → + → Add printer", detail: "AirPrint-compatible printers appear automatically. Select yours and click Add." }, { title: "Open your file", detail: "Open in any Mac application." }, { title: "Press ⌘+P", detail: "Opens print dialog." }, { title: "Select printer and click Print", detail: "Choose your printer from the dropdown and click Print.", tip: "If printer doesn't appear, visit your brand's website and search '[model] Mac driver download'." }] },
  },
  chromebook: {
    hp: { method: "Chrome OS Print (built-in)", appName: "No app needed", steps: [{ title: "Same Wi-Fi on Chromebook and HP printer", detail: "Tap the clock in the bottom-right corner → check the Wi-Fi network name." }, { title: "Add HP printer in Chromebook settings", detail: "Tap clock → Settings (gear) → Advanced → Printing → Printers → Add Printer. Your HP should appear. Click Save.", tip: "Most HP printers work immediately with Chromebook — it uses IPP (Internet Printing Protocol) automatically." }, { title: "Open your file in Google Drive, Docs, or Chrome browser", detail: "Chromebooks use Google Drive and Chrome apps — open your document there." }, { title: "Press Ctrl+P", detail: "Universal Chromebook print shortcut — same as Windows." }, { title: "Select HP printer and click Print", detail: "Choose your HP from the destination list (not 'Save as PDF'). Click Print.", tip: "If your HP shows as 'Nearby printers', click Save to add it permanently first." }] },
    canon: { method: "Chrome OS Print (IPP)", appName: "No app needed", steps: [{ title: "Same Wi-Fi on Chromebook and Canon", detail: "Check Wi-Fi in the system tray (bottom right)." }, { title: "Settings → Printing → Printers → Add Printer", detail: "Select your Canon from the discovered list and click Save." }, { title: "Open your file in Chrome, Docs, or Drive", detail: "Navigate to the document you want to print." }, { title: "Press Ctrl+P", detail: "Opens the print dialog." }, { title: "Select Canon and click Print", detail: "Choose your Canon printer and click Print.", tip: "Chrome OS supports Canon printers very well via IPP — no drivers needed." }] },
    epson: { method: "Chrome OS Print (IPP)", appName: "No app needed", steps: [{ title: "Same Wi-Fi on Chromebook and Epson", detail: "Both devices on same Wi-Fi network." }, { title: "Settings → Printing → Printers → Add Printer", detail: "Select your Epson from the list and click Save." }, { title: "Open file in Chrome, Docs, or Drive", detail: "Navigate to the document or photo." }, { title: "Press Ctrl+P", detail: "Opens print dialog." }, { title: "Select Epson and print", detail: "Choose Epson and click Print.", tip: "Epson EcoTank printers work great with Chromebook — zero setup after adding the printer once." }] },
    brother: { method: "Chrome OS Print (IPP)", appName: "No app needed", steps: [{ title: "Same Wi-Fi on Chromebook and Brother", detail: "System tray Wi-Fi must match printer's network." }, { title: "Settings → Printing → Printers → Add Printer", detail: "Brother appears in the list. Click Save." }, { title: "Open your file", detail: "Navigate to the document in Chrome, Docs, or Drive." }, { title: "Press Ctrl+P", detail: "Opens the print dialog." }, { title: "Select Brother and click Print", detail: "Choose your Brother printer and click Print." }] },
    any: { method: "Chrome OS Print (IPP)", appName: "No app needed", steps: [{ title: "Both devices on same Wi-Fi", detail: "System tray (bottom right) → check Wi-Fi network name." }, { title: "Settings → Printing → Printers → Add Printer", detail: "Select your printer from the discovered list. Click Save.", tip: "Chromebooks support most modern printers via IPP without any drivers." }, { title: "Open file in Chrome, Docs, or Drive", detail: "Navigate to your document or photo." }, { title: "Press Ctrl+P", detail: "Opens the print dialog." }, { title: "Select printer and click Print", detail: "Choose your printer and click Print.", tip: "If your printer isn't discovered, check if it supports IPP or Google Cloud Print on the manufacturer's website." }] },
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro" | "device" | "brand" | "lead" | "guide">("intro");
  const [device, setDevice] = useState<DeviceId | null>(null);
  const [brand, setBrand] = useState<PrinterBrand | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);

  const guide = device && brand ? GUIDE[device][brand] : null;
  const deviceData = DEVICES.find(d => d.id === device);
  const brandData = BRANDS.find(b => b.id === brand);
  const allDone = guide ? completedSteps.size >= guide.steps.length : false;

  const toggleStep = (i: number) => {
    setCompletedSteps(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Print from Device — ${device} → ${brand} printer`, source: "how-to-print-from-phone-or-laptop" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false); setStage("guide");
  };

  const reset = () => { setStage("intro"); setDevice(null); setBrand(null); setCompletedSteps(new Set()); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Print from Phone or Laptop</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-black uppercase tracking-widest mb-6"><Smartphone size={14} /> Free Tool · 28 Device Combinations</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            Print from<br /><span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent italic">Any Device</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">
            iPhone, Android, Windows, Mac, or Chromebook — pick your device, pick your printer brand, and get the exact steps written just for your combination.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-sky-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">Get the exact steps for your device 📱</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">Printing from a phone or laptop should be simple — but the steps are slightly different for every combination of device and printer. This tool gives you the exact steps for yours — no guessing, no irrelevant instructions.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[{ icon: "📱", label: "iPhone & iPad" }, { icon: "🤖", label: "Android Phones" }, { icon: "💻", label: "Windows" }, { icon: "🍎", label: "Mac & Chromebook" }].map(i => (<div key={i.label} className="bg-zinc-800 rounded-2xl p-4 text-center"><div className="text-2xl mb-2">{i.icon}</div><div className="text-sm font-black text-white">{i.label}</div></div>))}
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("device")} className="w-full py-6 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25">
                    Select My Device <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "device" && (
            <motion.div key="device" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-sky-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("intro")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What are you printing from?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Choose the device in your hand or on your desk right now.</p>
                  <div className="mb-4"><p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">📱 Phones & Tablets</p>
                    <div className="grid grid-cols-2 gap-3">{DEVICES.filter(d => d.category === "phone").map(d => (<motion.button key={d.id} whileTap={{ scale: 0.97 }} onClick={() => { setDevice(d.id); setStage("brand"); }} className="p-5 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-cyan-700 text-left transition-all"><div className="text-2xl mb-2">{d.icon}</div><div className="font-black text-white text-sm">{d.label}</div></motion.button>))}</div></div>
                  <div><p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">💻 Computers & Laptops</p>
                    <div className="grid grid-cols-3 gap-3">{DEVICES.filter(d => d.category === "computer").map(d => (<motion.button key={d.id} whileTap={{ scale: 0.97 }} onClick={() => { setDevice(d.id); setStage("brand"); }} className="p-5 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-cyan-700 text-left transition-all"><div className="text-2xl mb-2">{d.icon}</div><div className="font-black text-white text-sm">{d.label}</div></motion.button>))}</div></div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "brand" && (
            <motion.div key="brand" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-sky-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("device")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <div className="flex items-center gap-3 mb-6"><span className="text-3xl">{deviceData?.icon}</span><span className="font-black text-white text-lg">{deviceData?.label}</span></div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What brand is your printer?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">The app name and exact steps differ slightly by brand.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BRANDS.map(b => (<motion.button key={b.id} whileTap={{ scale: 0.97 }} onClick={() => { setBrand(b.id); setStage("lead"); }} className="p-5 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-cyan-700 text-left transition-all"><div className="text-2xl mb-2">{b.emoji}</div><div className="font-black text-white text-sm">{b.label}</div></motion.button>))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-sky-400" />
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="text-5xl mb-4">{deviceData?.icon}</div>
                    <h2 className="text-3xl font-black text-white mb-3">Your printing guide is ready!</h2>
                    <p className="text-zinc-400 font-medium text-lg">Enter your name and email and we'll send your personalised <strong className="text-white">{deviceData?.label} → {brandData?.label}</strong> printing steps directly to your inbox.</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Patricia" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600" /></div></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25 mb-3">
                    {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Guide & Show Steps"}
                  </motion.button>
                  <button onClick={() => setStage("guide")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show the steps</button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "guide" && guide && (
            <motion.div key="guide" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><p className="text-base font-bold text-green-300">Guide sent to {email}!</p></div>)}

              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-sky-400" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{deviceData?.icon}</span>
                    <span className="text-zinc-400 text-xl">→</span>
                    <span className="text-2xl">{brandData?.emoji}</span>
                    <div><div className="font-black text-white text-base">{deviceData?.label} → {brandData?.label} Printer</div><div className="text-zinc-500 text-sm">Method: {guide.method}</div></div>
                  </div>
                  <div className="bg-cyan-900/20 border border-cyan-800 rounded-xl p-3 mb-4 flex items-start gap-2">
                    <AlertCircle size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                    <p className="text-cyan-300 text-sm font-medium">App to use: <strong>{guide.appName}</strong> — tick each step as you complete it</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm font-black text-zinc-400 mb-2"><span>{completedSteps.size} of {guide.steps.length} steps done</span><span>{Math.round((completedSteps.size / guide.steps.length) * 100)}%</span></div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full" animate={{ width: `${(completedSteps.size / guide.steps.length) * 100}%` }} transition={{ duration: 0.4 }} /></div>
                  </div>
                </div>
              </div>

              {guide.steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className={`bg-zinc-900 rounded-2xl border-2 overflow-hidden transition-all ${completedSteps.has(i) ? "border-cyan-700" : "border-zinc-800"}`}>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleStep(i)} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedSteps.has(i) ? "bg-cyan-600 border-cyan-500" : "border-zinc-600 hover:border-cyan-500"}`}>
                        {completedSteps.has(i) ? <CheckCheck size={18} className="text-white" /> : <span className="text-zinc-400 font-black text-sm">{i + 1}</span>}
                      </motion.button>
                      <div className="flex-1">
                        <h4 className={`font-black text-base mb-2 ${completedSteps.has(i) ? "text-cyan-300 line-through opacity-60" : "text-white"}`}>{step.title}</h4>
                        <p className="text-zinc-300 text-sm font-medium leading-relaxed">{step.detail}</p>
                        {step.tip && (<div className="mt-3 bg-amber-900/20 border border-amber-700/50 rounded-xl p-3 flex items-start gap-2"><span className="text-amber-400 text-sm">💡</span><p className="text-amber-300 text-sm font-medium">{step.tip}</p></div>)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {allDone && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-cyan-900/40 to-sky-900/20 border-2 border-cyan-700 rounded-[2rem] p-8 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-black text-white mb-2">All steps complete!</h3>
                  <p className="text-zinc-400 font-medium mb-4">Try printing something now — if it worked, you're all set! If you'd like someone to walk through it with you live, our tutors are here whenever you're ready.</p>
                  <Link href="/contact"><motion.div whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-black rounded-2xl shadow-lg cursor-pointer mb-4">Talk to a Tutor <ArrowRight size={18} /></motion.div></Link>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20} /> Try Another Device</button>
                <Link href="/tools/my-printer-stopped-working"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Printer Not Working? <ArrowRight size={20} /></motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance. Steps may vary slightly by device model and OS version. Not affiliated with Apple, Google, Microsoft, HP, Canon, Epson, or Brother.</p></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">How to Print from Your Phone or Laptop — The Full Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <div><p className="mb-4">Printing from an iPhone uses Apple's AirPrint technology — a built-in feature that automatically discovers compatible printers on the same Wi-Fi network. No app download is needed for most printers. Simply open any file, tap the Share button, scroll down, and tap Print.</p><p>Android printing works differently across brands. Samsung Galaxy phones include Samsung's print service, while Google Pixel phones use the Android Default Print Service. Most manufacturers also publish free printing apps — HP Smart, Canon PRINT, Epson Smart Panel, and Brother iPrint&Scan — that provide more control than the built-in Android print service.</p></div>
            <div><p className="mb-4">Windows printing is the most straightforward on a computer — most modern printers install their driver automatically when connected to the same Wi-Fi. The universal shortcut Ctrl+P opens the print dialog in every Windows application. Mac printing similarly requires just one setup step: System Settings → Printers & Scanners → add your printer. After that, ⌘+P prints from any Mac app.</p><p>This guide is for educational purposes. Not affiliated with Apple, Google, Microsoft, HP, Canon, Epson, or Brother.</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
