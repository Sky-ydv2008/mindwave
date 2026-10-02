# Mindweave Production Deployment Guide

This document provides complete instructions for deploying **Mindweave** to production:
- **Frontend (`apps/web`)**: Deployed on **Vercel**
- **Backend (`apps/server`)**: Deployed on **Render**

---

## 🎨 1. Deploying Frontend to Vercel

### Option A: Import via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/new) and click **Add New Project**.
2. Select your GitHub repository: `Sky-ydv2008/mindwave`.
3. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (or `apps/web`)
   - **Build Command**: `npm run build --workspace=apps/web`
   - **Output Directory**: `apps/web/dist`
   - **Install Command**: `npm install`
4. **Environment Variables**:
   - Add `VITE_API_URL`: `https://<your-render-app-name>.onrender.com/api/v1`
5. Click **Deploy**. Vercel will automatically build and assign an HTTPS URL (e.g. `https://mindwave.vercel.app`).

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## ⚙️ 2. Deploying Backend to Render

### Option A: Blueprint Auto-Deploy (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Blueprint**.
2. Connect your GitHub repository: `Sky-ydv2008/mindwave`.
3. Render will automatically detect `render.yaml` and configure the service:
   - **Service Name**: `mindwave-backend`
   - **Environment**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build --workspace=apps/server`
   - **Start Command**: `node apps/server/dist/index.js`
   - **Health Check Path**: `/health`
4. Click **Apply**.

### Option B: Manual Web Service Setup on Render

1. Click **New +** -> **Web Service**.
2. Select repository: `Sky-ydv2008/mindwave`.
3. Fill in settings:
   - **Name**: `mindwave-backend`
   - **Region**: Oregon (or closest region)
   - **Branch**: `main`
   - **Root Directory**: Leave blank (monorepo root)
   - **Environment**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build --workspace=apps/server`
   - **Start Command**: `node apps/server/dist/index.js`
4. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `JWT_SECRET`: `your_super_secret_jwt_key_2026`
   - `CORS_ORIGIN`: `https://<your-vercel-app-name>.vercel.app` (or `*`)
5. Click **Create Web Service**.

---

## 🔗 3. Connecting Frontend & Backend

1. In **Render Dashboard**, copy your Backend Live URL: `https://mindwave-backend.onrender.com`.
2. In **Vercel Dashboard**, go to **Settings** -> **Environment Variables**.
3. Set `VITE_API_URL` = `https://mindwave-backend.onrender.com/api/v1`.
4. Trigger a redeploy on Vercel to activate the connected backend.
