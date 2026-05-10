# Traveloop - Travel Planning Application

A full-stack travel planning application built with Next.js, React, Express.js, and Supabase.

## Architecture

- **Frontend**: Next.js 16 with React 19 and TypeScript
- **Backend**: Express.js REST API
- **Database**: Supabase PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth (Email/Password)

## Features

### Implemented
- User authentication with Supabase Auth
- Create and manage multiple trips
- Add trip stops (destinations with dates)
- Budget tracking with category breakdown
- Packing checklist (UI ready, API implemented)
- Trip notes and planning (API implemented)
- Responsive design with Tailwind CSS

### Ready for Extension
- City and activity search (API endpoints created)
- Trip activities scheduling (API endpoints created)
- Saved destinations (database schema ready)
- Trip sharing and public itineraries (database schema ready)

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- Supabase account
- Vercel account (optional, for deployment)

### Step 1: Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Configure Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or use an existing one
3. Go to Settings → API
4. Copy your project URL and anon/public key

### Step 3: Set Up Environment Variables

Create `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# API Configuration (for development)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Auth Callback URL (required for email confirmation)
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

Create `backend/.env` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Server
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Step 4: Run the Application

In one terminal, start the backend:

```bash
cd backend
npm run dev
```

In another terminal, start the frontend:

```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`
Backend will be available at `http://localhost:3001`

## Project Structure

```
/
├── app/                      # Next.js App Router pages
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   ├── sign-up/
│   │   └── callback/
│   ├── trips/[id]/          # Trip detail pages
│   └── page.tsx             # Dashboard
├── components/
│   ├── trips/               # Trip-related components
│   │   ├── trip-list.tsx
│   │   ├── create-trip-modal.tsx
│   │   ├── trip-itinerary.tsx
│   │   └── budget-tracker.tsx
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── supabase/            # Supabase clients
│   │   ├── client.ts        # Browser client
│   │   ├── server.ts        # Server client
│   │   └── proxy.ts         # Auth proxy
│   └── api-client.ts        # API utility functions
├── backend/                 # Express.js backend
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env.example
├── middleware.ts            # Next.js middleware for auth
└── SETUP.md                 # This file
```

## Database Schema

### Main Tables
- **profiles** - User profiles
- **trips** - User trips
- **trip_stops** - Destinations within trips
- **trip_activities** - Activities scheduled for specific stops
- **activities** - Available activities (searchable)
- **trip_budgets** - Budget items per trip
- **packing_checklist_items** - Packing list items
- **trip_notes** - User notes for trips
- **saved_destinations** - User's saved destinations

All tables have Row Level Security (RLS) policies to ensure users can only access their own data.

## API Endpoints

See `backend/README.md` for complete API documentation.

### Key Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET/POST /api/trips` - Get/create trips
- `GET/POST /api/trips/:id` - Get/update specific trip
- `GET/POST /api/trips/:tripId/stops` - Manage trip stops
- `GET /api/activities` - Search activities
- `GET/POST /api/trips/:tripId/budgets` - Manage budgets
- `GET/POST /api/trips/:tripId/packing` - Manage packing list

## Development Workflow

1. **Frontend Changes**: Modify files in `/app` and `/components`. Changes auto-reload with HMR.

2. **Backend Changes**: Modify `backend/server.js`. Use `npm run dev` for auto-reload.

3. **Database Changes**: Migrate using the Supabase dashboard or via the migration tools.

4. **Authentication**: Handled by Supabase Auth with middleware protection.

## Deployment

### Deploy to Vercel (Frontend)

1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel project settings
4. Deploy

### Deploy Backend

Options:
1. **Vercel Serverless**: Convert Express to handler functions
2. **Railway**: Deploy Docker container
3. **Render**: Simple Node.js deployment
4. **Heroku**: Traditional Node.js hosting

### Environment Variables for Production

Update in your hosting provider:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL` (your deployed backend URL)
- Backend: `SUPABASE_SERVICE_ROLE_KEY`

## Extending the Application

### Add More Features

1. **Trip Sharing**: Use `is_public` flag on trips table
2. **Collaborative Planning**: Add `trip_collaborators` table
3. **Weather Integration**: Add API calls in trip detail page
4. **Photo Gallery**: Integrate with Supabase Storage
5. **Reviews & Ratings**: Add `activity_reviews` table
6. **Real-time Updates**: Use Supabase subscriptions

### Add New API Endpoints

1. Create route in `backend/server.js`
2. Add authentication middleware if needed
3. Use Supabase client to query database
4. Update `lib/api-client.ts` with client function

### Customize Styling

- Update `app/globals.css` for global styles
- Tailwind configuration in `tailwind.config.ts`
- Theme colors in CSS variables

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify CORS settings in `backend/server.js`

### Authentication Issues
- Confirm Supabase URL and keys are correct
- Check email confirmation in Supabase dashboard
- Verify callback URL matches `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`

### Database Errors
- Check RLS policies in Supabase dashboard
- Verify user is authenticated before API calls
- Check browser console for error messages

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Check Express.js documentation: https://expressjs.com

## License

MIT
