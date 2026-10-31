# Deployment Guide — Production Directory Sites Engine

## 1. Cloudflare Workers Deployment
```bash
cd engine/clinical_directory
npm install
npx wrangler deploy
```

## 2. Environment Variables (`wrangler.toml`)
- `CANONICAL_DOMAIN`: Set your custom domain (e.g. `directory.example.com`).
- `ENVIRONMENT`: Set to `production`.

## 3. Stripe & PayPal Webhook Setup
Point webhooks to `https://<your-worker>.workers.dev/api/webhooks/payment` with event `checkout.session.completed`.
