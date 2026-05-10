# Traveloop - Commands Reference

Quick reference for common commands when working with Traveloop.

## Installation & Setup

### Initial Setup
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Copy environment files
cp .env.local.example .env.local
cp backend/.env.example backend/.env

# Edit environment files with your credentials
# .env.local - Frontend
# backend/.env - Backend
```

## Development

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Watches for changes, restarts on save
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Hot Module Replacement (HMR) - changes appear instantly
# Runs on http://localhost:3000
```

### Visit Application
```
Frontend: http://localhost:3000
Backend: http://localhost:3001
Health Check: http://localhost:3001/api/health
```

## Frontend Commands

### Development
```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

### Component Development
```bash
# Create new component (manual)
touch components/my-component.tsx

# Add shadcn/ui component
npm exec shadcn-ui@latest add button
npm exec shadcn-ui@latest add card
# See available components at ui.shadcn.com
```

### Environment Variables
```bash
# View your environment
cat .env.local

# Check if variables are loaded (in browser console)
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

## Backend Commands

### Development
```bash
# Start development server with auto-reload
cd backend
npm run dev

# Start production server
npm start

# Check Node version
node --version
```

### Package Management
```bash
cd backend

# Add new dependency
npm install package-name

# Remove dependency
npm uninstall package-name

# Update all packages
npm update

# Check for security issues
npm audit
npm audit fix
```

## Database (Supabase)

### Access Supabase Dashboard
```
https://app.supabase.com/
Project → Select your project → Dashboard
```

### Common Database Tasks

**View Tables:**
- Go to Dashboard → Editor (left sidebar)
- Click "Tables" to view all tables
- Click table name to view data

**View Users:**
- Go to Dashboard → Authentication → Users
- See all registered users

**Check RLS Policies:**
- Go to Dashboard → Editor → [Table Name]
- Click "RLS" tab
- View security policies

**Run SQL Queries:**
- Go to Dashboard → SQL Editor
- Create new query
- Run custom SQL

### Database Backup
```
Dashboard → Settings → Backups
Enable daily/weekly backups
```

## Git & Version Control

### Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Traveloop travel planning app"
```

### Common Git Commands
```bash
# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "Add feature description"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/new-feature

# Merge branch
git checkout main
git merge feature/new-feature
```

## Deployment

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel deploy

# Deploy to production
vercel --prod

# View deployments
vercel list
```

### Deploy Backend (Railway)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# View logs
railway logs
```

### Environment Variables on Vercel

```bash
# Using Vercel CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_API_URL

# Or use Vercel Dashboard
# Settings → Environment Variables → Add
```

## Debugging

### Browser Developer Tools

```javascript
// Check Supabase session
const { data } = await supabase.auth.getSession();
console.log(data);

// Check API environment
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(process.env.NEXT_PUBLIC_API_URL);

// Test API health
fetch('http://localhost:3001/api/health')
  .then(r => r.json())
  .then(d => console.log(d));

// Check local storage
localStorage.getItem('sb-token');
```

### Terminal Debugging

```bash
# Check if port is in use
lsof -i :3000      # Frontend
lsof -i :3001      # Backend

# Kill process on port (macOS/Linux)
kill -9 $(lsof -t -i:3000)

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Network Debugging

```bash
# Test backend is running
curl http://localhost:3001/api/health

# Test with auth token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/trips
```

## Common Issues & Solutions

### Port Already in Use

```bash
# Frontend port 3000
lsof -i :3000
kill -9 <PID>

# Backend port 3001
lsof -i :3001
kill -9 <PID>
```

### Clear npm Cache

```bash
npm cache clean --force
```

### Reinstall Dependencies

```bash
# Frontend
rm -rf node_modules
rm package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules
rm package-lock.json
npm install
```

### Reset Supabase

```
Dashboard → Settings → Danger Zone → Delete Project
Then create new project and reset .env files
```

## Performance Monitoring

### Frontend Performance

```javascript
// In browser console
performance.mark('feature-start');
// ... do something ...
performance.mark('feature-end');
performance.measure('feature', 'feature-start', 'feature-end');
console.log(performance.getEntriesByType('measure'));
```

### Backend Performance

```bash
# Add to backend/server.js
console.time('api-call');
// ... database query ...
console.timeEnd('api-call');
```

## Build & Optimization

### Frontend Build

```bash
# Development build
npm run build

# Check bundle size
npm exec next-bundle-analyzer

# Production optimization
npm run build
npm run start
```

### Code Quality

```bash
# Format code with Prettier (if installed)
# npx prettier --write .

# Type check TypeScript
npx tsc --noEmit

# Lint code
npm run lint --fix
```

## Documentation

### Generate API Documentation

```bash
# In backend directory
npm install --save-dev swagger-jsdoc swagger-ui-express
# Add swagger docs to server.js
```

### Generate TypeScript Types

```bash
# From Supabase schema
npm exec supabase gen types typescript \
  --project-id <YOUR_PROJECT_ID> \
  --schema public > lib/supabase.types.ts
```

## Cleanup

### Remove Unused Code

```bash
# Remove node_modules (saves space)
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Remove build artifacts
rm -rf .next
rm -rf dist

# Remove OS files
find . -name '.DS_Store' -delete
find . -name 'Thumbs.db' -delete
```

### Before Committing

```bash
git status          # Check what changed
git diff            # See changes
git add .           # Stage all
git commit -m "msg" # Commit
git log             # View history
```

## Quick Reference

### File Locations

| What | Where |
|------|-------|
| Environment variables (Frontend) | `.env.local` |
| Environment variables (Backend) | `backend/.env` |
| Dashboard page | `app/page.tsx` |
| Trip detail page | `app/trips/[id]/page.tsx` |
| API client | `lib/api-client.ts` |
| Backend server | `backend/server.js` |
| Styling config | `tailwind.config.ts` |

### Port Numbers

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 3001 | http://localhost:3001 |
| Database | 5432 | Remote (Supabase) |

### Useful URLs

| Service | URL |
|---------|-----|
| Application | http://localhost:3000 |
| API Health | http://localhost:3001/api/health |
| Supabase | https://app.supabase.com |
| Next.js Docs | https://nextjs.org/docs |
| Express Docs | https://expressjs.com |
| Tailwind Docs | https://tailwindcss.com |

## Getting Help

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check git status
git status

# View git log
git log --oneline

# View file contents
cat .env.local
cat backend/.env
```

---

**Save this file for quick reference while developing!**
