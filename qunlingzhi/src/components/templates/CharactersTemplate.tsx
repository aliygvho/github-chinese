import React from 'react';
import BaseListTemplate from '../BaseListTemplate';
import type { CharacterItem } from '../../types';

interface CharactersTemplateProps {
  items: CharacterItem[];
  onChange: (items: CharacterItem[]) => void;
}

const CharactersTemplate: React.FC<CharactersTemplateProps> = ({ items, onChange }) => {
  const handleSave = (item: CharacterItem) => {
    const next = items.find((i) => i.id === item.id)
      ? items.map((i) => (i.id === item.id ? item : i))
      : [...items, item];
    onChange(next);
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((i) => i.id !== id));
  };

  return (
    <BaseListTemplate<CharacterItem>
      title="角色"
      items={items}
      onSave={handleSave}
      onDelete={handleDelete}
      emptyHint="还没有角色档案，创建第一位 inhabitants。"
    />
  );
};

export default CharactersTemplate;
