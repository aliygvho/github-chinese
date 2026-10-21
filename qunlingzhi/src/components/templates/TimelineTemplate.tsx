import React from 'react';
import BaseListTemplate from '../BaseListTemplate';
import type { TimelineItem } from '../../types';
import './TimelineTemplate.css';

interface TimelineTemplateProps {
  items: TimelineItem[];
  onChange: (items: TimelineItem[]) => void;
}

const TimelineTemplate: React.FC<TimelineTemplateProps> = ({ items, onChange }) => {
  const handleSave = (item: TimelineItem) => {
    const next = items.find((i) => i.id === item.id)
      ? items.map((i) => (i.id === item.id ? item : i))
      : [...items, item];
    onChange(next.sort((a, b) => a.era.localeCompare(b.era, 'zh-CN')));
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((i) => i.id !== id));
  };

  return (
    <BaseListTemplate<TimelineItem>
      title="时间序"
      items={items}
      onSave={handleSave}
      onDelete={handleDelete}
      emptyHint="时间线为空，添加第一个年代节点。"
      extraEditorFields={(draft, setDraft) => (
        <div className="editor-field">
          <label>年代 / 时期</label>
          <input
            className="glass-input"
            value={(draft as TimelineItem).era ?? ''}
            onChange={(e) => setDraft({ ...draft, era: e.target.value })}
            placeholder="如：天启三年、春"
          />
        </div>
      )}
      itemExtra={(item) => (
        <div className="item-extra">{item.era}</div>
      )}
    />
  );
};

export default TimelineTemplate;
