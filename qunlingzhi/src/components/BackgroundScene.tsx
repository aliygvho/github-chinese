import React, { useEffect, useRef, useState } from 'react';
import Lantern from './Lantern';
import './BackgroundScene.css';

interface BackgroundSceneProps {
  activeLantern: string | null;
  onLanternClick: (id: string) => void;
}

const LANTERN_POSITIONS = [
  { id: '1', top: '18%', left: '77%' },
  { id: '2', top: '28%', left: '78.5%' },
  { id: '3', top: '38%', left: '79.5%' },
  { id: '4', top: '48%', left: '79%' },
  { id: '5', top: '58%', left: '78%' },
];

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  activeLantern,
  onLanternClick,
}) => {
  const boatRef = useRef<HTMLDivElement>(null);
  const [boatX, setBoatX] = useState(-12);

  useEffect(() => {
    let raf = 0;
    const speed = 0.012;
    const animate = () => {
      setBoatX((x) => {
        const next = x + speed;
        return next > 112 ? -12 : next;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="background-scene">
      <div className="bg-image" />
      
      {/* 雾气层 */}
      <div className="mist-layer mist-layer-1" />
      <div className="mist-layer mist-layer-2" />
      
      {/* 水面波光 */}
      <div className="water-shimmer" />
      
      {/* 垂藤装饰 */}
      <div className="vine vine-1" />
      <div className="vine vine-2" />
      <div className="vine vine-3" />
      
      {/* 乌篷船 */}
      <div
        ref={boatRef}
        className="boat"
        style={{ left: `${boatX}%` }}
      >
        <div className="boat-hull" />
        <div className="boat-canopy" />
        <div className="boat-ripple" />
      </div>
      
      {/* 灯笼列 */}
      {LANTERN_POSITIONS.map((pos) => (
        <Lantern
          key={pos.id}
          lit={activeLantern === pos.id}
          onClick={() => onLanternClick(pos.id)}
          style={{ top: pos.top, left: pos.left }}
        />
      ))}
      
      {/* 柔和暗角 */}
      <div className="vignette" />
    </div>
  );
};

export default BackgroundScene;
