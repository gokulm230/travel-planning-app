# Traveloop Backend API

Express.js backend server for the Traveloop travel planning application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Add your Supabase credentials to `.env`

## Running

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
All protected endpoints require an `Authorization: Bearer {token}` header with a valid Supabase auth token.

### Trips
- `GET /api/trips` - Get all trips for current user
- `POST /api/trips` - Create a new trip
- `GET /api/trips/:id` - Get a specific trip
- `PUT /api/trips/:id` - Update a trip
- `DELETE /api/trips/:id` - Delete a trip

### Trip Stops
- `GET /api/trips/:tripId/stops` - Get all stops for a trip
- `POST /api/trips/:tripId/stops` - Add a stop to a trip

### Activities
- `GET /api/activities` - Search activities (query: city_name, country_name)
- `POST /api/activities` - Create a new activity

### Trip Activities
- `GET /api/stops/:stopId/activities` - Get activities for a stop
- `POST /api/stops/:stopId/activities` - Add activity to a stop

### Budgets
- `GET /api/trips/:tripId/budgets` - Get budget items
- `POST /api/trips/:tripId/budgets` - Add budget item

### Packing Checklist
- `GET /api/trips/:tripId/packing` - Get packing items
- `POST /api/trips/:tripId/packing` - Add packing item
- `PATCH /api/packing/:itemId` - Update packing item
