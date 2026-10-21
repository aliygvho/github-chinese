import React, { useState } from 'react';
import type { WorldItem } from '../types';
import ItemEditor from './ItemEditor';
import './BaseListTemplate.css';

interface BaseListTemplateProps<T extends WorldItem> {
  title: string;
  items: T[];
  extraEditorFields?: (draft: Partial<T>, setDraft: (d: Partial<T>) => void) => React.ReactNode;
  itemExtra?: (item: T) => React.ReactNode;
  onSave: (item: T) => void;
  onDelete: (id: string) => void;
  emptyHint: string;
}

function BaseListTemplate<T extends WorldItem>({
  title,
  items,
  extraEditorFields,
  itemExtra,
  onSave,
  onDelete,
  emptyHint,
}: BaseListTemplateProps<T>) {
  const [editing, setEditing] = useState<Partial<T> | null>(null);

  const handleSave = (item: WorldItem) => {
    onSave(item as T);
    setEditing(null);
  };

  return (
    <div className="base-list-template">
      <div className="list-header">
        <h3>{title}</h3>
        <button className="glass-button primary" onClick={() => setEditing({})}>
          ＋ 新增条目
        </button>
      </div>

      {editing && (
        <ItemEditor
          initial={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
          extraFields={extraEditorFields?.(editing, setEditing)}
        />
      )}

      {items.length === 0 && !editing && (
        <div className="empty-state">{emptyHint}</div>
      )}

      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="item-card glass-card">
            {item.image && (
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
            )}
            <div className="item-body">
              <div className="item-title-row">
                <h4>{item.title}</h4>
                <div className="item-actions">
                  <button className="glass-button" onClick={() => setEditing(item)}>
                    编辑
                  </button>
                  <button className="glass-button danger" onClick={() => onDelete(item.id)}>
                    删除
                  </button>
                </div>
              </div>
              {itemExtra?.(item)}
              {item.description && <p className="item-desc">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BaseListTemplate;
