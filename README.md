# Traveloop - Travel Planning Application

A beautiful, full-stack travel planning application built with React, Node.js, and Supabase. Plan your perfect journey with trip itineraries, budget tracking, and packing lists.

![Traveloop - Travel Planning Made Easy](https://img.shields.io/badge/Version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![Express](https://img.shields.io/badge/Express-4.18-green)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

## Features

### ✨ Core Features

- **🔐 User Authentication** - Secure email/password authentication via Supabase
- **✈️ Trip Management** - Create, edit, and manage multiple trips
- **📍 Itinerary Planning** - Add multiple destinations with dates and notes
- **💰 Budget Tracking** - Track expenses with category breakdown and analytics
- **📋 Packing Checklist** - Organize what you need to pack by category
- **🌍 Activity Search** - Browse and add activities (ready to extend)
- **📱 Responsive Design** - Beautiful UI that works on mobile, tablet, and desktop

### 🏗️ Architecture Features

- **Row Level Security** - User data completely isolated at database level
- **RESTful API** - Clean, well-organized backend API
- **Type-Safe** - Full TypeScript implementation
- **Scalable Schema** - 9 tables designed for extensibility
- **Production Ready** - Error handling, validation, and logging

## Quick Start

### 1️⃣ Prerequisites
- Node.js 18+
- Supabase account (free at https://supabase.com)

### 2️⃣ Setup (5 minutes)

```bash
# Clone and install
git clone <repository>
cd traveloop
npm install
cd backend && npm install && cd ..

# Configure environment
cp .env.local.example .env.local
cp backend/.env.example backend/.env
# Add your Supabase credentials to both files

# Start servers
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
npm run dev
```

### 3️⃣ Open Browser
Visit http://localhost:3000 and start planning!

**For detailed setup guide, see [GETTING_STARTED_CHECKLIST.md](./GETTING_STARTED_CHECKLIST.md)**

## Project Structure

```
traveloop/
├── app/                    # Next.js pages and routes
│   ├── auth/              # Login, signup, callbacks
│   ├── trips/[id]/        # Trip detail pages
│   └── page.tsx           # Dashboard
├── components/            # Reusable React components
│   ├── trips/            # Trip-specific components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and clients
│   ├── supabase/        # Supabase clients
│   └── api-client.ts    # API call helpers
├── backend/             # Express.js server
│   └── server.js        # All API endpoints
├── middleware.ts        # Auth middleware
└── [Documentation files]
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript | User interface and pages |
| **Styling** | Tailwind CSS, shadcn/ui | Beautiful responsive design |
| **Backend** | Express.js, Node.js | REST API server |
| **Database** | Supabase PostgreSQL | Data storage with RLS |
| **Auth** | Supabase Auth | User authentication |

## API Endpoints

### Trips
```
GET    /api/trips              # Get all user trips
POST   /api/trips              # Create new trip
GET    /api/trips/:id          # Get single trip
PUT    /api/trips/:id          # Update trip
DELETE /api/trips/:id          # Delete trip
```

### Trip Stops (Destinations)
```
GET    /api/trips/:tripId/stops       # Get trip stops
POST   /api/trips/:tripId/stops       # Add new stop
```

### Budget
```
GET    /api/trips/:tripId/budgets     # Get budget items
POST   /api/trips/:tripId/budgets     # Add budget item
```

### Packing
```
GET    /api/trips/:tripId/packing     # Get packing items
POST   /api/trips/:tripId/packing     # Add packing item
PATCH  /api/packing/:itemId           # Update packing item
```

**[Full API Documentation](./backend/README.md)**

## Database Schema

9 tables with Row Level Security:
- `profiles` - User accounts and profiles
- `trips` - User trips
- `trip_stops` - Trip destinations
- `trip_activities` - Activities linked to stops
- `activities` - Available activities
- `trip_budgets` - Budget tracking
- `packing_checklist_items` - Packing lists
- `trip_notes` - User notes
- `saved_destinations` - Saved places

**[Schema Details](./SETUP.md#database-schema)**

## Getting Help

| Question | Resource |
|----------|----------|
| How do I get started? | [QUICK_START.md](./QUICK_START.md) |
| Detailed setup? | [SETUP.md](./SETUP.md) |
| Step-by-step checklist? | [GETTING_STARTED_CHECKLIST.md](./GETTING_STARTED_CHECKLIST.md) |
| What was built? | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) |
| API reference? | [backend/README.md](./backend/README.md) |

## Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend Options
- **Railway** - Easy Docker deployment
- **Render** - Free tier available
- **Vercel Serverless** - Refactor to serverless functions
- **Heroku** - Traditional Node.js hosting

See [SETUP.md Deployment Section](./SETUP.md#deployment) for detailed instructions.

## Extending the Application

The app is built for easy extension:

### Add a New API Endpoint
1. Add route in `backend/server.js`
2. Add client function in `lib/api-client.ts`
3. Use in components

### Add a New Page
1. Create file in `app/` directory
2. Build components in `components/`
3. Wire up API calls

### Customize Styling
- Edit `app/globals.css` for global styles
- Update `tailwind.config.ts` for theme
- Modify component styles with Tailwind classes

### Database Changes
- Use Supabase dashboard
- Create migrations if needed
- Update RLS policies

## Development Workflow

```bash
# Start development
npm run dev              # Frontend
cd backend && npm run dev  # Backend

# Make changes - auto-reloads on save

# Build for production
npm run build
cd backend && npm start
```

## Production Checklist

- [ ] Update environment variables for production
- [ ] Enable email confirmation in Supabase
- [ ] Set up database backups
- [ ] Configure monitoring
- [ ] Test all features
- [ ] Set up CORS for production domain
- [ ] Review RLS policies
- [ ] Enable HTTPS

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find Supabase" | Check .env.local variables |
| "API connection failed" | Ensure backend is running on port 3001 |
| "Login not working" | Verify Supabase URL and anon key |
| "Data not saving" | Check RLS policies in Supabase |

**[Full Troubleshooting Guide](./SETUP.md#troubleshooting)**

## Code Examples

### Create a Trip
```typescript
const { data } = await tripApi.create({
  title: 'European Adventure',
  start_date: '2024-06-01',
  end_date: '2024-06-30',
  destination_country: 'France',
}, token);
```

### Add Trip Stop
```typescript
const { data } = await tripStopsApi.create(tripId, {
  city_name: 'Paris',
  country_name: 'France',
  start_date: '2024-06-01',
  end_date: '2024-06-10',
}, token);
```

### Track Budget
```typescript
const { data } = await budgetApi.create(tripId, {
  category: 'Flights',
  amount: 500,
  currency: 'USD',
}, token);
```

## Performance Optimizations

- Next.js Image optimization
- CSS splitting and minification
- Database query optimization
- Efficient component re-renders
- API response caching

## Security Features

- Row Level Security (RLS) on all tables
- JWT token authentication
- Secure password hashing
- SQL injection prevention
- CORS protection
- Protected API routes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT - Feel free to use this for personal or commercial projects

## Contributing

Found a bug or want to add a feature? 

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Roadmap

- [ ] Real-time collaboration (Supabase subscriptions)
- [ ] Photo gallery (Supabase Storage)
- [ ] Weather integration
- [ ] Trip sharing and public itineraries
- [ ] Mobile app (React Native)
- [ ] Offline support (Service Workers)
- [ ] AI trip recommendations
- [ ] Social features (friends, comments)

## Support

- **Documentation**: See README files in project
- **Supabase Help**: https://supabase.com/docs
- **Next.js Help**: https://nextjs.org/docs
- **Issues**: Check GitHub issues or create new one

## Credits

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Express.js](https://expressjs.com/) - Node.js framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Component library

## Star History

If you find this useful, please star the repository!

---

**Made with ❤️ for travelers everywhere**

**[Get Started Now →](./QUICK_START.md)**
