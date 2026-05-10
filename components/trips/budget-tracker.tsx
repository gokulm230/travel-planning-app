'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp } from 'lucide-react';

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  currency: string;
}

interface BudgetTrackerProps {
  budgets: BudgetItem[];
  onAddBudget: (budgetData: any) => void;
  showAddForm: boolean;
  tripId: string;
  session: any;
}

export default function BudgetTracker({
  budgets,
  onAddBudget,
  showAddForm,
  tripId,
  session,
}: BudgetTrackerProps) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    currency: 'USD',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await onAddBudget({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setFormData({
        category: '',
        amount: '',
        currency: 'USD',
        notes: '',
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals by category
  const categoryTotals = budgets.reduce((acc, item) => {
    const category = item.category || 'Other';
    acc[category] = (acc[category] || 0) + parseFloat(item.amount.toString());
    return acc;
  }, {} as Record<string, number>);

  const totalBudget = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

  // Get color for category pie chart
  const getCategoryColor = (index: number) => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    return colors[index % colors.length];
  };

  const categories = Object.entries(categoryTotals);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      {budgets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-3xl font-bold text-foreground">${totalBudget.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-primary/20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-3xl font-bold text-foreground">{categories.length}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-primary/20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg per Category</p>
                <p className="text-3xl font-bold text-foreground">
                  ${(totalBudget / categories.length).toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-primary/20" />
            </div>
          </Card>
        </div>
      )}

      {/* Category Breakdown */}
      {categories.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Breakdown by Category</h3>
          <div className="space-y-3">
            {categories.map(([category, amount], index) => (
              <div key={category} className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getCategoryColor(index) }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{category}</span>
                    <span className="font-bold text-foreground">${amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(amount / totalBudget) * 100}%`,
                        backgroundColor: getCategoryColor(index),
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {((amount / totalBudget) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Budget List */}
      {budgets.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Budget Items</h3>
          <div className="space-y-3">
            {budgets.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{item.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-foreground">
                    {item.currency} ${parseFloat(item.amount.toString()).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {budgets.length === 0 && !showAddForm && (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-4">No budget items yet. Start tracking your expenses!</p>
        </div>
      )}

      {/* Add Budget Form */}
      {showAddForm && (
        <Card className="p-6 bg-muted/20 border-dashed">
          <h3 className="text-lg font-bold text-foreground mb-4">Add Budget Item</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Flights, Hotels, Food"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Amount *
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Adding...' : 'Add Item'}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
