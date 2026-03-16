import { redirect } from "next/navigation";

// This page redirects to the correct wifi-checker tool
// Fixes old deployment that referenced this path
export default function Page() {
  redirect("/tools/wifi-checker");
}
