export interface WorldItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface LocationItem extends WorldItem {
  // 据点可扩展字段
}

export interface CharacterItem extends WorldItem {
  // 角色可扩展字段
}

export interface TimelineItem extends WorldItem {
  era: string;
}

export interface WorldData {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  writing: WorldItem[];
  locations: LocationItem[];
  locationsMapImage?: string;
  encyclopedia: WorldItem[];
  characters: CharacterItem[];
  timeline: TimelineItem[];
}

export type TemplateKey = 'writing' | 'locations' | 'encyclopedia' | 'characters' | 'timeline';

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface TemplateMeta {
  key: TemplateKey;
  label: string;
  icon: string;
  color: string;
}

export const TEMPLATES: TemplateMeta[] = [
  { key: 'writing', label: '写作', icon: '✦', color: '#8fb98f' },
  { key: 'locations', label: '据点', icon: '⌂', color: '#9ab8c9' },
  { key: 'encyclopedia', label: '图鉴', icon: '❀', color: '#c9a89a' },
  { key: 'characters', label: '角色', icon: '✧', color: '#b8a9c9' },
  { key: 'timeline', label: '时间序', icon: '⟡', color: '#c9c39a' },
];
