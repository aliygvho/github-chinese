import { useState, useEffect, useCallback } from 'react';
import type { WorldData } from '../types';

const STORAGE_KEY = 'qunlingzhi_worlds';

const createEmptyWorld = (id: string): WorldData => ({
  id,
  name: `世界观 ${id}`,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  writing: [],
  locations: [],
  encyclopedia: [],
  characters: [],
  timeline: [],
});

export function useWorldStorage() {
  const [worlds, setWorlds] = useState<Record<string, WorldData>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setWorlds(parsed);
      } else {
        const initial: Record<string, WorldData> = {};
        for (let i = 1; i <= 5; i++) {
          initial[String(i)] = createEmptyWorld(String(i));
        }
        setWorlds(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      }
    } catch {
      const initial: Record<string, WorldData> = {};
      for (let i = 1; i <= 5; i++) {
        initial[String(i)] = createEmptyWorld(String(i));
      }
      setWorlds(initial);
    }
    setLoaded(true);
  }, []);

  const saveWorlds = useCallback((next: Record<string, WorldData>) => {
    setWorlds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const updateWorld = useCallback(
    (id: string, updater: (world: WorldData) => WorldData) => {
      saveWorlds((prev) => {
        const world = prev[id] ?? createEmptyWorld(id);
        const updated = updater({ ...world, updatedAt: Date.now() });
        return { ...prev, [id]: updated };
      });
    },
    [saveWorlds]
  );

  const getWorld = useCallback(
    (id: string): WorldData => worlds[id] ?? createEmptyWorld(id),
    [worlds]
  );

  return { worlds, loaded, updateWorld, getWorld };
}
