# Traveloop - Quick Start Guide

Get up and running with Traveloop in 5 minutes!

## 1. Get Supabase Credentials

1. Visit [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Go to **Settings → API**
4. Copy your **Project URL** and **anon public key**
5. Go to **Settings → Database** and copy your **Service Role Key**

## 2. Configure Environment Variables

### Frontend (`/.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

### Backend (`/backend/.env`)

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 3. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend && npm install && cd ..
```

## 4. Start Development Servers

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

## 5. Access the App

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## First Steps

1. **Sign Up**: Create an account at the sign-up page
2. **Create Trip**: Click "Create New Trip" from the dashboard
3. **Add Stops**: Click "View Trip" and add cities/destinations
4. **Track Budget**: Switch to Budget tab and add expenses
5. **Explore**: Check itinerary and see your trip come to life

## What's Included

✅ User authentication with email/password
✅ Create multiple trips with dates and destinations
✅ Plan itineraries with multiple stops
✅ Track trip budgets with category breakdown
✅ Packing checklist functionality
✅ Responsive mobile-friendly design
✅ Row-level security for data privacy
✅ RESTful backend API

## Next Steps

1. **Customize**: Update colors in `tailwind.config.ts` and `app/globals.css`
2. **Add Features**: Extend API endpoints in `backend/server.js`
3. **Deploy**: See SETUP.md for deployment instructions
4. **Database Backup**: Set up Supabase backups in your project settings

## Need Help?

- See `SETUP.md` for detailed setup instructions
- Check `backend/README.md` for API documentation
- Review component code for implementation examples

## Project Structure at a Glance

```
Frontend Code:
- app/page.tsx - Dashboard
- app/trips/[id]/page.tsx - Trip detail
- components/trips/ - Trip components
- lib/api-client.ts - API calls

Backend Code:
- backend/server.js - All API routes

Database:
- Supabase console - Manage data and RLS
```

Happy planning! 🌍
