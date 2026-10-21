import React, { useState, useCallback } from 'react';
import type { WorldItem } from '../types';
import { generateId } from '../types';
import './ItemEditor.css';

interface ItemEditorProps {
  initial?: Partial<WorldItem>;
  extraFields?: React.ReactNode;
  onSave: (item: WorldItem) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const ItemEditor: React.FC<ItemEditorProps> = ({
  initial,
  extraFields,
  onSave,
  onCancel,
  submitLabel = '保存',
}) => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [image, setImage] = useState(initial?.image ?? '');

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: initial?.id ?? generateId(),
      title: title.trim(),
      description: description.trim(),
      image: image || undefined,
    });
  };

  return (
    <form className="item-editor glass-card" onSubmit={handleSubmit}>
      <div className="editor-field">
        <label>标题</label>
        <input
          className="glass-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请输入标题"
          autoFocus
        />
      </div>

      {extraFields}

      <div className="editor-field">
        <label>描述</label>
        <textarea
          className="glass-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="写下详细设定……"
        />
      </div>

      <div className="editor-field">
        <label>配图</label>
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            id="item-image"
            onChange={handleImageChange}
            hidden
          />
          <label htmlFor="item-image" className="glass-button">
            {image ? '更换图片' : '添加图片'}
          </label>
          {image && (
            <div className="image-preview">
              <img src={image} alt="preview" />
              <button type="button" className="remove-image" onClick={() => setImage('')}>
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="editor-actions">
        <button type="button" className="glass-button" onClick={onCancel}>
          取消
        </button>
        <button type="submit" className="glass-button primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ItemEditor;
