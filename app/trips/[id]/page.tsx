'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { tripApi, tripStopsApi, budgetApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Plus, DollarSign, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import TripItinerary from '@/components/trips/trip-itinerary';
import BudgetTracker from '@/components/trips/budget-tracker';

interface Trip {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  destination_country: string;
  destination_city: string;
}

interface TripStop {
  id: string;
  city_name: string;
  country_name: string;
  start_date: string;
  end_date: string;
  order_index: number;
}

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  currency: string;
}

export default function TripDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [stops, setStops] = useState<TripStop[]>([]);
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'budget'>('itinerary');
  const [showAddStop, setShowAddStop] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/login');
        return;
      }
      setSession(session);
      await loadTripData(tripId, session.access_token);
    };

    checkAuth();
  }, [router, supabase, tripId]);

  const loadTripData = async (id: string, token: string) => {
    try {
      setLoading(true);
      const tripData = await tripApi.getOne(id, token);
      setTrip(tripData);

      const stopsData = await tripStopsApi.getAll(id, token);
      setStops(stopsData);

      const budgetsData = await budgetApi.getAll(id, token);
      setBudgets(budgetsData);
    } catch (error) {
      console.error('Failed to load trip data:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStop = async (stopData: any) => {
    try {
      const newStop = await tripStopsApi.create(tripId, stopData, session.access_token);
      setStops([...stops, newStop].sort((a, b) => a.order_index - b.order_index));
      setShowAddStop(false);
    } catch (error) {
      console.error('Failed to add stop:', error);
    }
  };

  const handleAddBudget = async (budgetData: any) => {
    try {
      const newBudget = await budgetApi.create(tripId, budgetData, session.access_token);
      setBudgets([newBudget, ...budgets]);
      setShowAddBudget(false);
    } catch (error) {
      console.error('Failed to add budget item:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading trip...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Trip not found</p>
      </div>
    );
  }

  const totalBudget = budgets.reduce((sum, item) => sum + parseFloat(item.amount.toString()), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Trips
          </button>
          <h1 className="text-3xl font-bold text-foreground">{trip.title}</h1>
          {trip.description && (
            <p className="text-muted-foreground mt-2">{trip.description}</p>
          )}
        </div>
      </header>

      {/* Trip Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Destination</p>
                <p className="text-lg font-semibold text-foreground">
                  {trip.destination_city && trip.destination_country
                    ? `${trip.destination_city}, ${trip.destination_country}`
                    : trip.destination_country || trip.destination_city || 'Not specified'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold text-foreground">
                  {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-lg font-semibold text-foreground">
                  ${totalBudget.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'itinerary'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Itinerary
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'budget'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Budget
          </button>
        </div>

        {/* Content */}
        {activeTab === 'itinerary' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Your Itinerary</h2>
              <Button onClick={() => setShowAddStop(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Stop
              </Button>
            </div>
            <TripItinerary
              stops={stops}
              onAddStop={handleAddStop}
              showAddForm={showAddStop}
              tripId={tripId}
              session={session}
            />
          </div>
        )}

        {activeTab === 'budget' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Budget Breakdown</h2>
              <Button onClick={() => setShowAddBudget(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Budget Item
              </Button>
            </div>
            <BudgetTracker
              budgets={budgets}
              onAddBudget={handleAddBudget}
              showAddForm={showAddBudget}
              tripId={tripId}
              session={session}
            />
          </div>
        )}
      </div>
    </div>
  );
}
