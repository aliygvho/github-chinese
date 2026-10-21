import React from 'react';
import BaseListTemplate from '../BaseListTemplate';
import type { WorldItem } from '../../types';

interface EncyclopediaTemplateProps {
  items: WorldItem[];
  onChange: (items: WorldItem[]) => void;
}

const EncyclopediaTemplate: React.FC<EncyclopediaTemplateProps> = ({ items, onChange }) => {
  const handleSave = (item: WorldItem) => {
    const next = items.find((i) => i.id === item.id)
      ? items.map((i) => (i.id === item.id ? item : i))
      : [...items, item];
    onChange(next);
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((i) => i.id !== id));
  };

  return (
    <BaseListTemplate<WorldItem>
      title="图鉴"
      items={items}
      onSave={handleSave}
      onDelete={handleDelete}
      emptyHint="图鉴为空，收录一件风物、植物、信物或特殊物品。"
    />
  );
};

export default EncyclopediaTemplate;
