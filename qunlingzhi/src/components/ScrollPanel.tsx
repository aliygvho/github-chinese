import React from 'react';
import './ScrollPanel.css';

interface ScrollPanelProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  activeLantern: string | null;
}

const ScrollPanel: React.FC<ScrollPanelProps> = ({ open, onClose, children, activeLantern }) => {
  return (
    <div
      className={`scroll-panel ${open ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="scroll-sheet">
        <div className="scroll-glow" />
        <div className="scroll-content">
          {activeLantern && (
            <div className="scroll-header">
              <h2>世界观 {activeLantern}</h2>
              <button className="scroll-close glass-button" onClick={onClose}>
                收起画卷
              </button>
            </div>
          )}
          <div className="scroll-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPanel;
