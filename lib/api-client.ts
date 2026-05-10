const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function apiCall<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `API error: ${response.statusText}`);
  }

  return response.json();
}

// Trip APIs
export const tripApi = {
  getAll: (token: string) => apiCall('/trips', 'GET', undefined, token),
  getOne: (id: string, token: string) => apiCall(`/trips/${id}`, 'GET', undefined, token),
  create: (data: any, token: string) => apiCall('/trips', 'POST', data, token),
  update: (id: string, data: any, token: string) => apiCall(`/trips/${id}`, 'PUT', data, token),
  delete: (id: string, token: string) => apiCall(`/trips/${id}`, 'DELETE', undefined, token),
};

// Trip Stops APIs
export const tripStopsApi = {
  getAll: (tripId: string, token: string) => apiCall(`/trips/${tripId}/stops`, 'GET', undefined, token),
  create: (tripId: string, data: any, token: string) => apiCall(`/trips/${tripId}/stops`, 'POST', data, token),
};

// Activities APIs
export const activitiesApi = {
  search: (params: { city_name?: string; country_name?: string } = {}) => {
    const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined) as any).toString();
    const endpoint = query ? `/activities?${query}` : '/activities';
    return apiCall(endpoint, 'GET');
  },
  create: (data: any, token: string) => apiCall('/activities', 'POST', data, token),
};

// Trip Activities APIs
export const tripActivitiesApi = {
  getAll: (stopId: string, token: string) => apiCall(`/stops/${stopId}/activities`, 'GET', undefined, token),
  add: (stopId: string, data: any, token: string) => apiCall(`/stops/${stopId}/activities`, 'POST', data, token),
};

// Budget APIs
export const budgetApi = {
  getAll: (tripId: string, token: string) => apiCall(`/trips/${tripId}/budgets`, 'GET', undefined, token),
  create: (tripId: string, data: any, token: string) => apiCall(`/trips/${tripId}/budgets`, 'POST', data, token),
};

// Packing APIs
export const packingApi = {
  getAll: (tripId: string, token: string) => apiCall(`/trips/${tripId}/packing`, 'GET', undefined, token),
  create: (tripId: string, data: any, token: string) => apiCall(`/trips/${tripId}/packing`, 'POST', data, token),
  update: (itemId: string, data: any, token: string) => apiCall(`/packing/${itemId}`, 'PATCH', data, token),
};
