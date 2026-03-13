# Vercel Setup Instructions

## Required Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these two variables:

### 1. Anthropic API Key (for AI Troubleshooter)
- **Key:** `ANTHROPIC_API_KEY`
- **Value:** `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`
- **Environments:** Production, Preview, Development

### 2. Discord Webhook URL (for contact form & PDF requests)
- **Key:** `DISCORD_WEBHOOK_URL`
- **Value:** `https://discord.com/api/webhooks/1482154983871877130/dFtJNRBX3z5yloE9Jvnxs4HxRPne-lomYkABXd3rmX5iT1m99FPA4bFwLM-ppcm6CiLr`
- **Environments:** Production, Preview, Development

## After adding variables:
Click **Redeploy** in Vercel to apply the changes.

## EmailJS (for automated PDF emails)
Currently PDF requests are sent to Discord for manual follow-up.
To automate PDF emails later, reconnect Gmail in EmailJS dashboard with full send permissions.
