import React from 'react';
import { TEMPLATES, type TemplateKey } from '../types';
import './TemplateGrid.css';

interface TemplateGridProps {
  activeTemplate: TemplateKey | null;
  onSelect: (key: TemplateKey) => void;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ activeTemplate, onSelect }) => {
  return (
    <div className="template-grid">
      {TEMPLATES.map((t, index) => (
        <button
          key={t.key}
          className={`template-card glass-card ${activeTemplate === t.key ? 'active' : ''}`}
          style={{ animationDelay: `${index * 80}ms` }}
          onClick={() => onSelect(t.key)}
        >
          <div className="template-icon" style={{ color: t.color }}>
            {t.icon}
          </div>
          <div className="template-label">{t.label}</div>
          <div className="template-shine" />
        </button>
      ))}
    </div>
  );
};

export default TemplateGrid;
