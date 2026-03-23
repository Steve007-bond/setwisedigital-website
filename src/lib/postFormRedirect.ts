/* ═══════════════════════════════════════════════════════════════
   GLOBAL: Post-Form Redirect
   
   Import and call this AFTER any successful form submission.
   It redirects the user to /learning-hub with their info pre-filled.
   
   USAGE (add ONE line after setSubmitted(true) or setStatus("done")):
   
     import { redirectToLearningHub } from "@/lib/postFormRedirect";
     
     // After form success:
     redirectToLearningHub({ name, email, topic: "printers" });
   
   The user sees the success message for 2 seconds, then gets 
   smoothly redirected to the Learning Hub.
   
   TOPIC MAPPINGS (optional — auto-selects the right topic):
     "printers" | "gps" | "smarthome" | "alexa" | "cameras" | "security"
   
   If no topic is provided, user picks from all 6 on the Learning Hub.
   ═══════════════════════════════════════════════════════════════ */

interface RedirectParams {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  delay?: number; // ms before redirect (default 2000)
}

export function redirectToLearningHub({
  name = "",
  email = "",
  phone = "",
  topic = "",
  delay = 2000,
}: RedirectParams = {}) {
  const params = new URLSearchParams();
  if (name) params.set("name", name);
  if (email) params.set("email", email);
  if (phone) params.set("phone", phone);
  if (topic) params.set("topic", topic);

  const url = `/learning-hub${params.toString() ? "?" + params.toString() : ""}`;

  setTimeout(() => {
    window.location.href = url;
  }, delay);
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC DETECTION — automatically maps page source to topic
   
   If you call redirectToLearningHub() without a topic,
   it can auto-detect from the current URL path.
   ═══════════════════════════════════════════════════════════════ */

export function detectTopicFromPath(): string {
  if (typeof window === "undefined") return "";
  const path = window.location.pathname.toLowerCase();
  
  if (path.includes("printer") || path.includes("print") || path.includes("ink") || path.includes("fax")) return "printers";
  if (path.includes("gps") || path.includes("garmin") || path.includes("navigation") || path.includes("road-trip") || path.includes("rv-gps")) return "gps";
  if (path.includes("smart-home") || path.includes("smarthome") || path.includes("voice-assistant") || path.includes("wifi")) return "smarthome";
  if (path.includes("alexa") || path.includes("echo")) return "alexa";
  if (path.includes("camera") || path.includes("photo")) return "cameras";
  if (path.includes("security") || path.includes("password") || path.includes("scam") || path.includes("subscription-audit")) return "security";
  
  return "";
}

/* ═══════════════════════════════════════════════════════════════
   EASY MODE — call this with just name/email and it auto-detects topic
   
   Usage:
     import { autoRedirect } from "@/lib/postFormRedirect";
     autoRedirect(name, email);
   ═══════════════════════════════════════════════════════════════ */

export function autoRedirect(name?: string, email?: string, phone?: string) {
  redirectToLearningHub({
    name,
    email,
    phone,
    topic: detectTopicFromPath(),
  });
}
