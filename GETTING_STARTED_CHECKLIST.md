# Traveloop - Getting Started Checklist

Complete this checklist to get Traveloop running on your machine.

## Pre-Setup Requirements

- [ ] Node.js 18+ installed
- [ ] Node.js and npm installed
- [ ] Supabase account created
- [ ] Git (optional, for version control)

## Step 1: Supabase Setup

- [ ] Visit https://supabase.com and create/login to account
- [ ] Create a new project
- [ ] Wait for project initialization (~2 minutes)
- [ ] Go to **Settings → API**
  - [ ] Copy `Project URL` to safe location
  - [ ] Copy `anon public` key
  - [ ] Copy `service_role` key (keep secret!)
- [ ] Go to **Settings → Database**
  - [ ] Note the connection details
  - [ ] Verify database is PostgreSQL
- [ ] Go to **Authentication → Providers**
  - [ ] Verify Email provider is enabled
  - [ ] Note password requirements

## Step 2: Environment Configuration

### Frontend Configuration

- [ ] Open project root directory
- [ ] Create file `.env.local`
- [ ] Add these variables (copy from Supabase):
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_url_here
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
  NEXT_PUBLIC_API_URL=http://localhost:3001/api
  NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
  ```
- [ ] Save the file
- [ ] Verify file is in gitignore (don't commit!)

### Backend Configuration

- [ ] Open `backend` directory
- [ ] Copy `.env.example` to `.env`
- [ ] Edit `.env` with your Supabase credentials:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_url_here
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  PORT=3001
  FRONTEND_URL=http://localhost:3000
  ```
- [ ] Save the file
- [ ] Verify file is in gitignore

## Step 3: Install Dependencies

- [ ] Open terminal in project root
- [ ] Run `npm install`
  - [ ] Wait for all packages to install
  - [ ] Check for any error messages
  - [ ] Note any warnings (should be minimal)
- [ ] Navigate to backend: `cd backend`
- [ ] Run `npm install`
  - [ ] Wait for completion
  - [ ] Check for errors
- [ ] Return to root: `cd ..`

## Step 4: Start Development Servers

### Backend Server

- [ ] Open first terminal window
- [ ] Navigate to backend: `cd backend`
- [ ] Run `npm run dev`
- [ ] Wait for message: "Traveloop backend running on http://localhost:3001"
- [ ] Check that no errors appear
- [ ] Leave this terminal open

### Frontend Server

- [ ] Open second terminal window
- [ ] Stay in project root directory
- [ ] Run `npm run dev`
- [ ] Wait for message about Next.js server starting
- [ ] Should see "Ready in X.XXs"
- [ ] Leave this terminal open

## Step 5: Access the Application

- [ ] Open browser to http://localhost:3000
- [ ] You should see the Traveloop login page
- [ ] Check console (F12) for any errors
- [ ] Proceed to Step 6 if no errors

## Step 6: Create Your Account

- [ ] Click "Sign Up"
- [ ] Enter your email address
- [ ] Create a strong password
- [ ] Click "Sign Up" button
- [ ] Watch for confirmation message
- [ ] Check email for verification (if enabled)
- [ ] Click email confirmation link (if sent)
- [ ] Return to app and login

## Step 7: Test the Application

### Create a Trip

- [ ] Click "Create New Trip"
- [ ] Fill in trip details:
  - [ ] Trip Title (required)
  - [ ] Description (optional)
  - [ ] Start Date (required)
  - [ ] End Date (required)
  - [ ] Destination Country (optional)
  - [ ] Destination City (optional)
- [ ] Click "Create Trip"
- [ ] Trip should appear on dashboard
- [ ] Refresh page - trip should persist

### View Trip Details

- [ ] Click "View Trip" on your new trip
- [ ] Should see trip title and dates
- [ ] Should see Itinerary tab (active)
- [ ] Should see Budget tab

### Add Trip Stop

- [ ] Click "Add Stop" on Itinerary tab
- [ ] Fill in stop details:
  - [ ] City (required)
  - [ ] Country (optional)
  - [ ] Start Date (required)
  - [ ] End Date (required)
  - [ ] Notes (optional)
- [ ] Click "Add Stop"
- [ ] Stop should appear with timeline number
- [ ] Add another stop - should be numbered 2

### Add Budget Item

- [ ] Click "Budget" tab
- [ ] Click "Add Budget Item"
- [ ] Fill in details:
  - [ ] Category (e.g., "Flights")
  - [ ] Amount (e.g., "500")
  - [ ] Currency (default USD)
- [ ] Click "Add Item"
- [ ] Item should appear in list
- [ ] Check that total updates
- [ ] Add more items to test breakdown

## Step 8: Verify All Features

- [ ] Dashboard shows your trips
- [ ] Can create new trips
- [ ] Can add stops to trips
- [ ] Can track budgets
- [ ] Can go back to dashboard
- [ ] Can logout successfully
- [ ] Can login again after logout

## Step 9: Check Backend Communication

- [ ] Go to http://localhost:3001/api/health
- [ ] Should see: `{"status":"ok"}`
- [ ] Go back to app and create another trip
- [ ] Check browser DevTools (F12) → Network tab
- [ ] Should see API calls to localhost:3001
- [ ] All should return status 200

## Step 10: Explore Code

- [ ] Open `app/page.tsx` - Dashboard code
- [ ] Open `app/trips/[id]/page.tsx` - Trip detail page
- [ ] Open `backend/server.js` - API endpoints
- [ ] Read comments in the code
- [ ] Understand data flow

## Troubleshooting

### Frontend won't start
- [ ] Check Node.js version: `node --version` (should be 18+)
- [ ] Try deleting node_modules and reinstalling
- [ ] Check .env.local has correct values
- [ ] Check port 3000 isn't in use

### Backend won't start
- [ ] Check port 3001 isn't in use
- [ ] Check .env has all required variables
- [ ] Verify Supabase URL is correct
- [ ] Check service role key is valid

### Can't login
- [ ] Check Supabase URL in .env.local
- [ ] Check anon key is correct
- [ ] Verify NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
- [ ] Check browser console for errors

### API calls fail
- [ ] Check backend is running
- [ ] Check NEXT_PUBLIC_API_URL in .env.local
- [ ] Look at Network tab in DevTools
- [ ] Check terminal for backend errors

### Database issues
- [ ] Visit Supabase dashboard
- [ ] Check Tables section - all 9 tables should exist
- [ ] Check Authentication → Users
- [ ] Check database is not paused

## Next Steps After Setup

1. **Read Documentation**
   - [ ] Read `QUICK_START.md` for overview
   - [ ] Read `SETUP.md` for detailed guide
   - [ ] Read `PROJECT_SUMMARY.md` for architecture

2. **Customize**
   - [ ] Change colors in `tailwind.config.ts`
   - [ ] Update fonts in `app/layout.tsx`
   - [ ] Modify copy/text in components

3. **Add Features**
   - [ ] Extend backend API in `backend/server.js`
   - [ ] Create new components in `components/`
   - [ ] Add new pages in `app/`

4. **Deploy**
   - [ ] Create GitHub repository
   - [ ] Push code to GitHub
   - [ ] Deploy frontend to Vercel
   - [ ] Deploy backend to hosting provider
   - [ ] Update environment variables

## Support

If you get stuck:

1. **Check Error Messages** - Read browser console (F12)
2. **Check Logs** - Look at terminal output for both frontend and backend
3. **Review Docs** - Check documentation files for your issue
4. **Test Supabase** - Visit dashboard to verify database
5. **Verify Environment** - Double-check all .env variables

## Success Indicators

You'll know everything is working when:

✅ Frontend loads at localhost:3000
✅ Can create account and login
✅ Can create trips
✅ Can add trip stops with timeline
✅ Can track budgets
✅ Data persists after refresh
✅ Network calls show 200 status
✅ No errors in browser console

---

**Congratulations! You're ready to start building with Traveloop! 🎉**

For questions or issues, refer to the documentation files in the project root.
