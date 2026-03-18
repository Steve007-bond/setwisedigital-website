import type { Metadata } from "next";
import CameraClient from "./CameraClient";

// DEPLOYMENT NOTE: Rename your existing techbridge/camera/page.tsx → techbridge/camera/CameraClient.tsx

export const metadata: Metadata = {
  title: "Camera Learning Guide — Firmware & Better Photos | Setwise",
  description:
    "Better photos and camera setup in plain English. Update firmware, adjust settings, transfer photos, and fix common camera problems.",
  keywords: [
    "how to update camera firmware",
    "camera settings explained plain English",
    "how to get better photos",
    "transfer photos from camera to computer",
    "camera learning guide seniors",
    "Sony camera firmware update",
    "Canon camera settings for beginners",
    "why are my photos blurry fix",
    "camera maintenance guide",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/techbridge/camera" },
  openGraph: {
    title: "Camera Learning Guide — Firmware & Better Photos | Setwise",
    description: "Better photos and camera setup in plain English. Update firmware, adjust settings, transfer photos, and fix common camera problems.",
    url: "https://www.setwisedigital.com/techbridge/camera",
  },
};

export default function TechBridgeCameraPage() {
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Camera Learning Guide by Setwise Digital",
    url: "https://www.setwisedigital.com/techbridge/camera",
    description:
      "Plain-English camera learning guide covering firmware updates, camera settings explained, photo transfer to computer, fixing blurry photos, and SD card management.",
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    teaches: [
      "How to update camera firmware",
      "Camera settings explained in plain English",
      "How to transfer photos to a computer",
      "How to fix blurry photos",
      "SD card and storage management",
    ],
    audience: { "@type": "Audience", audienceType: "Adults 40+" },
    isAccessibleForFree: true,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I update my camera firmware?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To update camera firmware: 1) Visit your camera brand's official website and search for your exact model. 2) Download the latest firmware file (usually a .bin or .zip file) to your computer. 3) Copy the firmware file to your SD card. 4) Insert the SD card into your camera. 5) Go to your camera's Setup or Tools menu → look for Firmware Update or Version Update. 6) Follow the on-screen instructions — do not turn the camera off during the update.",
        },
      },
      {
        "@type": "Question",
        name: "Why does firmware update improve my camera?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Camera firmware updates improve performance in several ways: they fix bugs that cause the camera to freeze or behave unexpectedly, they improve autofocus accuracy and speed, they add compatibility with new lenses or accessories, and they sometimes add entirely new features. According to Setwise Digital, firmware updates improve performance issues in approximately 40% of cases.",
        },
      },
      {
        "@type": "Question",
        name: "How do I transfer photos from my camera to my computer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There are 3 ways to transfer photos from camera to computer: 1) USB cable — connect camera to computer with the USB cable that came in the box. Your computer opens a folder showing camera photos. 2) SD card — remove the SD card from the camera and insert into the computer's card slot or a USB card reader. 3) Wi-Fi transfer — if your camera has Wi-Fi, download your brand's app (Canon Camera Connect, Sony Imaging Edge, Nikon SnapBridge) to transfer wirelessly.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "TechBridge", item: "https://www.setwisedigital.com/techbridge" },
      { "@type": "ListItem", position: 3, name: "Camera", item: "https://www.setwisedigital.com/techbridge/camera" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CameraClient />
    </>
  );
}
