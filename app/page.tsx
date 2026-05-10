'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { tripApi } from '@/lib/api-client';
import TripList from '@/components/trips/trip-list';
import CreateTripModal from '@/components/trips/create-trip-modal';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface Trip {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  destination_country: string;
  destination_city: string;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/login');
        return;
      }
      setSession(session);
      await loadTrips(session.access_token);
    };

    checkAuth();
  }, [router, supabase]);

  const loadTrips = async (token: string) => {
    try {
      setLoading(true);
      const data = await tripApi.getAll(token);
      setTrips(data);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = async (tripData: any) => {
    try {
      const newTrip = await tripApi.create(tripData, session.access_token);
      setTrips([newTrip, ...trips]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create trip:', error);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    try {
      await tripApi.delete(tripId, session.access_token);
      setTrips(trips.filter(t => t.id !== tripId));
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Traveloop</h1>
            <p className="text-sm text-muted-foreground">Plan your perfect journey</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-muted-foreground"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Your Trips</h2>
            <p className="text-muted-foreground mt-1">Manage and plan your adventures</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} size="lg">
            Create New Trip
          </Button>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-4">No trips yet. Create your first adventure!</p>
            <Button onClick={() => setShowCreateModal(true)}>
              Create Your First Trip
            </Button>
          </div>
        ) : (
          <TripList trips={trips} onDelete={handleDeleteTrip} />
        )}
      </main>

      {/* Create Trip Modal */}
      {showCreateModal && (
        <CreateTripModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTrip}
        />
      )}
    </div>
  );
}
