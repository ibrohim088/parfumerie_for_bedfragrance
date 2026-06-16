import { useState, useEffect } from 'react';

interface ScentProfile {
  id: string;
  userId: string;
  favoriteScents: string[];
  scentFamily: 'floral' | 'fresh' | 'woody' | 'oriental' | 'chypre';
  intensity: 'light' | 'moderate' | 'strong';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface UseScentProfileReturn {
  profile: ScentProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  deleteProfile: () => Promise<void>;
}

export function useScentProfile(): UseScentProfileReturn {
  const [profile, setProfile] = useState<ScentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/scent-profile`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setProfile(null);
        } else {
          throw new Error('Failed to fetch scent profile');
        }
      } else {
        const data = await response.json();
        setProfile(data.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (data: any) => {
    try {
      const method = profile ? 'PUT' : 'POST';
      const url = profile
        ? `${process.env.NEXT_PUBLIC_API_URL}/scent-profile`
        : `${process.env.NEXT_PUBLIC_API_URL}/scent-profile`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update scent profile');

      await fetchProfile();
    } catch (err) {
      throw err;
    }
  };

  const deleteProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/scent-profile`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to delete scent profile');

      setProfile(null);
      await fetchProfile();
    } catch (err) {
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
    deleteProfile,
  };
}
