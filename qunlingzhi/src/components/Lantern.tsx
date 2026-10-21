import React from 'react';
import './Lantern.css';

interface LanternProps {
  lit: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Lantern: React.FC<LanternProps> = ({ lit, onClick, style }) => {
  return (
    <div className={`lantern ${lit ? 'lit' : ''}`} style={style} onClick={onClick}>
      <div className="lantern-cord" />
      <div className="lantern-body">
        <div className="lantern-glow" />
        <div className="lantern-core" />
      </div>
      <div className="lantern-tassel" />
    </div>
  );
};

export default Lantern;
