import { useState, useEffect } from 'react';
import type { AutomationAction } from '../types/workflow.types';

export const useAutomations = () => {
  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/automations');
        if (!response.ok) {
          throw new Error('Failed to fetch automations');
        }
        const data = await response.json();
        setAutomations(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAutomations();
  }, []);

  return { automations, loading, error };
};
