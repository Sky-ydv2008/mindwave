# Mindweave Setup & Deployment Guide

## Quick Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Build workspace packages**:
   ```bash
   npm run build
   ```

4. **Start Development Environment**:
   ```bash
   npm run dev
   ```

5. **Docker Deployment**:
   ```bash
   docker-compose up --build -d
   ```
