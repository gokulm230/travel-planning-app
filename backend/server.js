import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Middleware to verify auth token
async function verifyAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing authorization token' });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth verification error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ===== TRIPS ROUTES =====

// Get all trips for the current user
app.get('/api/trips', verifyAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create a new trip
app.post('/api/trips', verifyAuth, async (req, res) => {
  try {
    const { title, description, start_date, end_date, destination_country, destination_city } = req.body;

    if (!title || !start_date || !end_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('trips')
      .insert({
        user_id: req.user.id,
        title,
        description,
        start_date,
        end_date,
        destination_country,
        destination_city
      })
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get a single trip
app.get('/api/trips/:id', verifyAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Trip not found' });

    res.json(data);
  } catch (err) {
    console.error('Error fetching trip:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update a trip
app.put('/api/trips/:id', verifyAuth, async (req, res) => {
  try {
    const { title, description, start_date, end_date, destination_country, destination_city, is_public } = req.body;

    const { data, error } = await supabase
      .from('trips')
      .update({
        title,
        description,
        start_date,
        end_date,
        destination_country,
        destination_city,
        is_public
      })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Trip not found' });

    res.json(data[0]);
  } catch (err) {
    console.error('Error updating trip:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a trip
app.delete('/api/trips/:id', verifyAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('trips')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting trip:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== TRIP STOPS ROUTES =====

// Get stops for a trip
app.get('/api/trips/:tripId/stops', verifyAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trip_stops')
      .select('*')
      .eq('trip_id', req.params.tripId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Error fetching trip stops:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create a trip stop
app.post('/api/trips/:tripId/stops', verifyAuth, async (req, res) => {
  try {
    const { city_name, country_name, start_date, end_date, notes, order_index } = req.body;

    const { data, error } = await supabase
      .from('trip_stops')
      .insert({
        trip_id: req.params.tripId,
        city_name,
        country_name,
        start_date,
        end_date,
        notes,
        order_index: order_index || 0
      })
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error creating trip stop:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== ACTIVITIES ROUTES =====

// Get activities by city
app.get('/api/activities', async (req, res) => {
  try {
    const { city_name, country_name } = req.query;
    let query = supabase.from('activities').select('*');

    if (city_name) query = query.eq('city_name', city_name);
    if (country_name) query = query.eq('country_name', country_name);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create an activity
app.post('/api/activities', verifyAuth, async (req, res) => {
  try {
    const { name, description, category, city_name, country_name, estimated_duration_hours, difficulty_level } = req.body;

    const { data, error } = await supabase
      .from('activities')
      .insert({
        name,
        description,
        category,
        city_name,
        country_name,
        estimated_duration_hours,
        difficulty_level
      })
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error creating activity:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== TRIP ACTIVITIES ROUTES =====

// Get activities for a trip stop
app.get('/api/stops/:stopId/activities', verifyAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trip_activities')
      .select('*, activities(*)')
      .eq('trip_stop_id', req.params.stopId)
      .order('scheduled_date', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Error fetching trip activities:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add an activity to a trip stop
app.post('/api/stops/:stopId/activities', verifyAuth, async (req, res) => {
  try {
    const { activity_id, scheduled_date, notes } = req.body;

    const { data, error } = await supabase
      .from('trip_activities')
      .insert({
        trip_stop_id: req.params.stopId,
        activity_id,
        scheduled_date,
        notes
      })
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error adding trip activity:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== BUDGET ROUTES =====

// Get budgets for a trip
app.get('/api/trips/:tripId/budgets', verifyAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trip_budgets')
      .select('*')
      .eq('trip_id', req.params.tripId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Error fetching budgets:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add a budget item
app.post('/api/trips/:tripId/budgets', verifyAuth, async (req, res) => {
  try {
    const { category, amount, currency, notes } = req.body;

    const { data, error } = await supabase
      .from('trip_budgets')
      .insert({
        trip_id: req.params.tripId,
        category,
        amount,
        currency: currency || 'USD',
        notes
      })
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error creating budget:', err);
    res.status(500).json({ error: err.message });
  }
});

// ===== PACKING CHECKLIST ROUTES =====

// Get packing checklist items
app.get('/api/trips/:tripId/packing', verifyAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('packing_checklist_items')
      .select('*')
      .eq('trip_id', req.params.tripId)
      .order('category', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Error fetching packing items:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add a packing item
app.post('/api/trips/:tripId/packing', verifyAuth, async (req, res) => {
  try {
    const { item_name, category, notes } = req.body;

    const { data, error } = await supabase
      .from('packing_checklist_items')
      .insert({
        trip_id: req.params.tripId,
        item_name,
        category: category || 'General',
        notes
      })
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error creating packing item:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update packing item
app.patch('/api/packing/:itemId', verifyAuth, async (req, res) => {
  try {
    const { is_packed, item_name, category, notes } = req.body;

    const { data, error } = await supabase
      .from('packing_checklist_items')
      .update({
        is_packed,
        item_name,
        category,
        notes
      })
      .eq('id', req.params.itemId)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    console.error('Error updating packing item:', err);
    res.status(500).json({ error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Traveloop backend running on http://localhost:${PORT}`);
});
