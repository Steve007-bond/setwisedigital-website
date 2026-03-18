import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.setwisedigital.com';
const INDEXNOW_KEY = '69135818775d4fe59f6d9bd64f7ca1db';

const ALL_URLS = [
  // Main pages
  `${BASE_URL}/`,
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
  `${BASE_URL}/pricing`,
  `${BASE_URL}/privacy`,
  `${BASE_URL}/terms`,
  `${BASE_URL}/disclaimer`,

  // TechBridge pages
  `${BASE_URL}/techbridge`,
  `${BASE_URL}/techbridge/printers`,
  `${BASE_URL}/techbridge/gps`,
  `${BASE_URL}/techbridge/smart-home`,
  `${BASE_URL}/techbridge/camera`,
  `${BASE_URL}/techbridge/alexa`,
  `${BASE_URL}/techbridge/security`,

  // Tools pages
  `${BASE_URL}/tools`,
  `${BASE_URL}/tools/adventure-gps-selector`,
  `${BASE_URL}/tools/best-gps-finder`,
  `${BASE_URL}/tools/best-printer-finder`,
  `${BASE_URL}/tools/best-printer-for-seniors`,
  `${BASE_URL}/tools/builtin-vs-aftermarket-gps`,
  `${BASE_URL}/tools/car-gps-update`,
  `${BASE_URL}/tools/garmin-express-setup`,
  `${BASE_URL}/tools/golf-gps-decider`,
  `${BASE_URL}/tools/gps-battery-checker`,
  `${BASE_URL}/tools/gps-brand-comparator`,
  `${BASE_URL}/tools/gps-budget-finder`,
  `${BASE_URL}/tools/gps-coverage-checker`,
  `${BASE_URL}/tools/gps-feature-filter`,
  `${BASE_URL}/tools/gps-features-guide`,
  `${BASE_URL}/tools/gps-for-seniors`,
  `${BASE_URL}/tools/gps-maps-explained`,
  `${BASE_URL}/tools/gps-screen-size-selector`,
  `${BASE_URL}/tools/gps-troubleshooter`,
  `${BASE_URL}/tools/gps-true-cost-calculator`,
  `${BASE_URL}/tools/gps-update-fix`,
  `${BASE_URL}/tools/gps-update-scheduler`,
  `${BASE_URL}/tools/gps-upgrade-decider`,
  `${BASE_URL}/tools/gps-vs-phone-decider`,
  `${BASE_URL}/tools/home-security-audit`,
  `${BASE_URL}/tools/how-to-print-email-or-webpage`,
  `${BASE_URL}/tools/how-to-print-from-phone-or-laptop`,
  `${BASE_URL}/tools/how-to-send-a-fax-from-home`,
  `${BASE_URL}/tools/hp-vs-canon-vs-epson-vs-brother`,
  `${BASE_URL}/tools/hunting-gps-canada`,
  `${BASE_URL}/tools/is-hp-instant-ink-worth-it`,
  `${BASE_URL}/tools/my-printer-stopped-working`,
  `${BASE_URL}/tools/pet-gps-cost-breakdown`,
  `${BASE_URL}/tools/pet-gps-selector`,
  `${BASE_URL}/tools/printer-cost-calculator`,
  `${BASE_URL}/tools/printer-cost-per-page`,
  `${BASE_URL}/tools/printer-features-guide`,
  `${BASE_URL}/tools/printer-ink-vs-tank`,
  `${BASE_URL}/tools/printer-specs-explained`,
  `${BASE_URL}/tools/road-trip-checker`,
  `${BASE_URL}/tools/rv-gps-finder`,
  `${BASE_URL}/tools/satellite-communicator-guide`,
  `${BASE_URL}/tools/set-up-my-new-printer`,
  `${BASE_URL}/tools/should-i-buy-a-new-printer`,
  `${BASE_URL}/tools/smart-home-matcher`,
  `${BASE_URL}/tools/subscription-audit`,
  `${BASE_URL}/tools/voice-assistant-matcher`,
  `${BASE_URL}/tools/wifi-checker`,
  `${BASE_URL}/tools/wifi-speed-checker`,
];

export async function GET() {
  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'www.setwisedigital.com',
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: ALL_URLS,
      }),
    });

    return NextResponse.json({
      success: true,
      status: response.status,
      urlsSubmitted: ALL_URLS.length,
      message: response.status === 200
        ? `Successfully submitted ${ALL_URLS.length} URLs to IndexNow.`
        : `Submitted with status ${response.status}. Check Bing Webmaster Tools to verify.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
