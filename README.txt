# Setwise Digital — Printer Tools Drop-In Package
# 10 New Printer Apps + Updated Tools Hub

## What's in this folder

```
src/
  app/
    tools/
      page.tsx                          ← REPLACE this file in your project
      ToolsHubClient.tsx                ← REPLACE this file in your project
      │
      ├── set-up-my-new-printer/        ← NEW — copy entire folder
      │     page.tsx
      │     Client.tsx
      │
      ├── hp-vs-canon-vs-epson-vs-brother/  ← NEW
      ├── is-hp-instant-ink-worth-it/       ← NEW
      ├── best-printer-for-seniors/         ← NEW
      ├── my-printer-stopped-working/       ← NEW
      ├── how-to-print-from-phone-or-laptop/ ← NEW
      ├── how-to-send-a-fax-from-home/      ← NEW
      ├── how-to-print-email-or-webpage/    ← NEW
      ├── should-i-buy-a-new-printer/       ← NEW
      └── printer-specs-explained/          ← NEW
```

---

## How to add to your project (GitHub Desktop)

### Step 1 — Copy the 10 new tool folders
Copy all 10 folders from `src/app/tools/` in this package into:
```
YOUR-PROJECT/src/app/tools/
```
(Just drag the 10 folders in — they are completely new, nothing will be overwritten.)

### Step 2 — Replace ToolsHubClient.tsx
Replace the existing file at:
```
YOUR-PROJECT/src/app/tools/ToolsHubClient.tsx
```
with the `ToolsHubClient.tsx` from this package.

### Step 3 — Replace tools/page.tsx
Replace the existing file at:
```
YOUR-PROJECT/src/app/tools/page.tsx
```
with the `page.tsx` from this package.

### Step 4 — Open GitHub Desktop
1. Open GitHub Desktop
2. Your project changes will appear automatically
3. Write a commit message: "Add 10 printer tools + update tools hub"
4. Click "Commit to main"
5. Click "Push origin"
6. Vercel will auto-deploy in ~2 minutes

---

## New tool URLs (live after deploy)

| Tool | URL |
|------|-----|
| My Printer Stopped Working | /tools/my-printer-stopped-working |
| Set Up My New Printer | /tools/set-up-my-new-printer |
| HP vs Canon vs Epson vs Brother | /tools/hp-vs-canon-vs-epson-vs-brother |
| Is HP Instant Ink Worth It? | /tools/is-hp-instant-ink-worth-it |
| Best Printer for Seniors | /tools/best-printer-for-seniors |
| Print from Phone or Laptop | /tools/how-to-print-from-phone-or-laptop |
| How to Send a Fax from Home | /tools/how-to-send-a-fax-from-home |
| Print an Email or Webpage | /tools/how-to-print-email-or-webpage |
| Should I Buy a New Printer? | /tools/should-i-buy-a-new-printer |
| Printer Specs — Plain English | /tools/printer-specs-explained |

---

## If Vercel throws a build error

Most likely causes and fixes:

1. **`onThemeChange` prop error**
   All apps pass `onThemeChange={() => {}}` to HeaderBackgroundSlider.
   Your component already accepts this as optional — should be fine.

2. **Missing `/api/leads` route**
   Lead forms POST to `/api/leads`. The forms are wrapped in try/catch
   so they fail silently — the app still works without this route.
   If you have this route already, it will work automatically.

3. **Framer Motion not installed**
   Run: `npm install framer-motion`

4. **Unsplash images blocked**
   Add to next.config.js:
   ```js
   images: { domains: ['images.unsplash.com'] }
   ```

---

Built by Setwise Digital — setwisedigital.com
