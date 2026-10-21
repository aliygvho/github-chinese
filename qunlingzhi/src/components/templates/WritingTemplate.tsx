import React from 'react';
import BaseListTemplate from '../BaseListTemplate';
import type { WorldItem } from '../../types';

interface WritingTemplateProps {
  items: WorldItem[];
  onChange: (items: WorldItem[]) => void;
}

const WritingTemplate: React.FC<WritingTemplateProps> = ({ items, onChange }) => {
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
      title="写作"
      items={items}
      onSave={handleSave}
      onDelete={handleDelete}
      emptyHint="尚无章节，新增一条开始书写这个世界的故事。"
    />
  );
};

export default WritingTemplate;
