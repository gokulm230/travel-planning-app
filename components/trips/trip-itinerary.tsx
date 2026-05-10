'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, X } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface TripStop {
  id: string;
  city_name: string;
  country_name: string;
  start_date: string;
  end_date: string;
  order_index: number;
}

interface TripItineraryProps {
  stops: TripStop[];
  onAddStop: (stopData: any) => void;
  showAddForm: boolean;
  tripId: string;
  session: any;
}

export default function TripItinerary({
  stops,
  onAddStop,
  showAddForm,
  tripId,
  session,
}: TripItineraryProps) {
  const [formData, setFormData] = useState({
    city_name: '',
    country_name: '',
    start_date: '',
    end_date: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.city_name || !formData.start_date || !formData.end_date) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await onAddStop({
        ...formData,
        order_index: stops.length,
      });
      setFormData({
        city_name: '',
        country_name: '',
        start_date: '',
        end_date: '',
        notes: '',
      });
    } finally {
      setLoading(false);
    }
  };

  if (stops.length === 0 && !showAddForm) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
        <p className="text-muted-foreground mb-4">No stops added yet. Plan your journey by adding destinations!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline */}
      {stops.length > 0 && (
        <div className="space-y-4">
          {stops.map((stop, index) => (
            <div key={stop.id} className="relative">
              {/* Timeline line */}
              {index < stops.length - 1 && (
                <div className="absolute left-6 top-16 h-8 w-0.5 bg-gradient-to-b from-primary to-muted-foreground" />
              )}

              <Card className="pl-20 relative hover:shadow-md transition-shadow">
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {stop.city_name}
                      </h3>
                      {stop.country_name && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          {stop.country_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(stop.start_date), 'MMM d')} - {format(new Date(stop.end_date), 'MMM d')}
                      </span>
                    </div>
                    <span>
                      {differenceInDays(new Date(stop.end_date), new Date(stop.start_date)) + 1} days
                    </span>
                  </div>

                  {stop.notes && (
                    <p className="text-sm text-foreground bg-muted/30 p-3 rounded">
                      {stop.notes}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Add Stop Form */}
      {showAddForm && (
        <Card className="p-6 bg-muted/20 border-dashed">
          <h3 className="text-lg font-bold text-foreground mb-4">Add a New Stop</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city_name"
                  value={formData.city_name}
                  onChange={handleChange}
                  placeholder="e.g., Paris"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country_name"
                  value={formData.country_name}
                  onChange={handleChange}
                  placeholder="e.g., France"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes about this stop..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Adding...' : 'Add Stop'}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
