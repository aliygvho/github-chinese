import React, { useState, useCallback } from 'react';
import BaseListTemplate from '../BaseListTemplate';
import type { LocationItem } from '../../types';
import './LocationsTemplate.css';

interface LocationsTemplateProps {
  items: LocationItem[];
  mapImage?: string;
  onChange: (items: LocationItem[], mapImage?: string) => void;
}

const LocationsTemplate: React.FC<LocationsTemplateProps> = ({
  items,
  mapImage,
  onChange,
}) => {
  const [mapImageState, setMapImageState] = useState(mapImage);

  const handleSave = (item: LocationItem) => {
    const next = items.find((i) => i.id === item.id)
      ? items.map((i) => (i.id === item.id ? item : i))
      : [...items, item];
    onChange(next, mapImageState);
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((i) => i.id !== id), mapImageState);
  };

  const handleMapImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMapImageState(reader.result as string);
      onChange(items, reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [items, onChange]);

  return (
    <div className="locations-template">
      <div className="map-section glass-card">
        <div className="map-header">
          <h3>世界地图</h3>
          <label className="glass-button">
            {mapImageState ? '更换主地图' : '上传主地图'}
            <input type="file" accept="image/*" hidden onChange={handleMapImage} />
          </label>
        </div>
        {mapImageState ? (
          <div className="map-image">
            <img src={mapImageState} alt="world map" />
          </div>
        ) : (
          <div className="map-placeholder">上传一张全景地图，作为该世界观的地理总览。</div>
        )}
      </div>

      <BaseListTemplate<LocationItem>
        title="地点"
        items={items}
        onSave={handleSave}
        onDelete={handleDelete}
        emptyHint="尚未添加地点，新增一个小镇、秘境或场景。"
      />
    </div>
  );
};

export default LocationsTemplate;
