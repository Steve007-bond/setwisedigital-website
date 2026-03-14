# Vercel Environment Variables — Add These Now

Go to: Vercel Dashboard → setwisedigital-website-kti2 → Settings → Environment Variables

## Required Variables:

### 1. AI Chat (FREE - Google Gemini)
Key:   GEMINI_API_KEY
Value: [Your key from aistudio.google.com]
Get it: Go to aistudio.google.com → Sign in → Get API Key → Create API key

### 2. Discord Notifications
Key:   DISCORD_WEBHOOK_URL  
Value: https://discord.com/api/webhooks/1482154983871877130/dFtJNRBX3z5yloE9Jvnxs4HxRPne-lomYkABXd3rmX5iT1m99FPA4bFwLM-ppcm6CiLr

## After adding both variables:
1. Click Save
2. Go to Deployments tab
3. Click the 3 dots on the latest deployment → Redeploy
4. Wait 2 minutes
5. Test at: https://setwisedigital-website-kti2.vercel.app/api/test

## Expected result after setup:
{
  "gemini_key": "✅ Set",
  "discord_webhook": "✅ Set", 
  "gemini_test": "✅ Gemini working",
  "summary": "🟢 Ready to go"
}
