'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Trash2 } from 'lucide-react';

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

interface TripListProps {
  trips: Trip[];
  onDelete: (tripId: string) => void;
}

export default function TripList({ trips, onDelete }: TripListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map(trip => (
        <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-6">
            <Link href={`/trips/${trip.id}`}>
              <h3 className="text-xl font-bold text-foreground hover:text-primary mb-2 cursor-pointer">
                {trip.title}
              </h3>
            </Link>

            {trip.description && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {trip.description}
              </p>
            )}

            <div className="space-y-2 mb-4">
              {(trip.destination_city || trip.destination_country) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {trip.destination_city && trip.destination_country
                      ? `${trip.destination_city}, ${trip.destination_country}`
                      : trip.destination_country || trip.destination_city}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d, yyyy')}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/trips/${trip.id}`} className="flex-1">
                <Button variant="default" className="w-full">
                  View Trip
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this trip?')) {
                    onDelete(trip.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
