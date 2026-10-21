import React, { useState, useCallback } from 'react';
import BackgroundScene from './components/BackgroundScene';
import ScrollPanel from './components/ScrollPanel';
import TemplateGrid from './components/TemplateGrid';
import WritingTemplate from './components/templates/WritingTemplate';
import LocationsTemplate from './components/templates/LocationsTemplate';
import EncyclopediaTemplate from './components/templates/EncyclopediaTemplate';
import CharactersTemplate from './components/templates/CharactersTemplate';
import TimelineTemplate from './components/templates/TimelineTemplate';
import { useWorldStorage } from './hooks/useWorldStorage';
import { TEMPLATES, type TemplateKey } from './types';
import './App.css';

const TEMPLATE_COMPONENTS: Record<TemplateKey, React.FC<any>> = {
  writing: WritingTemplate,
  locations: LocationsTemplate,
  encyclopedia: EncyclopediaTemplate,
  characters: CharactersTemplate,
  timeline: TimelineTemplate,
};

function App() {
  const { loaded, getWorld, updateWorld } = useWorldStorage();
  const [activeLantern, setActiveLantern] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey | null>(null);
  const [scrollOpen, setScrollOpen] = useState(false);

  const world = activeLantern ? getWorld(activeLantern) : null;

  const handleLanternClick = useCallback(
    (id: string) => {
      if (activeLantern === id && scrollOpen) return;
      setActiveLantern(id);
      setActiveTemplate(null);
      setScrollOpen(true);
    },
    [activeLantern, scrollOpen]
  );

  const handleCloseScroll = useCallback(() => {
    setScrollOpen(false);
    setActiveTemplate(null);
    // 等待收起动画结束后再熄灭灯笼
    setTimeout(() => {
      setActiveLantern(null);
    }, 900);
  }, []);

  const handleTemplateSelect = useCallback((key: TemplateKey) => {
    setActiveTemplate((prev) => (prev === key ? null : key));
  }, []);

  const renderTemplate = () => {
    if (!world || !activeTemplate) return null;
    const Template = TEMPLATE_COMPONENTS[activeTemplate];
    const meta = TEMPLATES.find((t) => t.key === activeTemplate)!;

    const commonProps = {
      items: (world[activeTemplate] as any[]) || [],
      onChange: (next: any[]) => {
        updateWorld(world.id, (w) => ({ ...w, [activeTemplate]: next }));
      },
    };

    if (activeTemplate === 'locations') {
      return (
        <LocationsTemplate
          items={world.locations}
          mapImage={world.locationsMapImage}
          onChange={(items, mapImage) => {
            updateWorld(world.id, (w) => ({ ...w, locations: items, locationsMapImage: mapImage }));
          }}
        />
      );
    }

    return (
      <div className="template-view">
        <div className="template-view-header">
          <span className="template-view-icon" style={{ color: meta.color }}>
            {meta.icon}
          </span>
          <h3>{meta.label}</h3>
        </div>
        <Template {...commonProps} />
      </div>
    );
  };

  if (!loaded) {
    return (
      <div className="app-loading">
        <div className="loading-lantern">🏮</div>
        <p>提灯入梦……</p>
      </div>
    );
  }

  return (
    <div className="app">
      <BackgroundScene activeLantern={activeLantern} onLanternClick={handleLanternClick} />

      <div className={`ambient-title ${scrollOpen ? 'dim' : ''}`}>
        <h1>群灵志</h1>
        <p>一盏灯笼，一个世界</p>
      </div>

      <ScrollPanel
        open={scrollOpen}
        onClose={handleCloseScroll}
        activeLantern={activeLantern}
      >
        {!activeTemplate ? (
          <div className="template-intro">
            <p className="template-intro-text">选择一个卷轴，开始创作这个世界</p>
            <TemplateGrid activeTemplate={activeTemplate} onSelect={handleTemplateSelect} />
          </div>
        ) : (
          <div className="template-content">
            <button className="back-button glass-button" onClick={() => setActiveTemplate(null)}>
              ← 返回卷轴
            </button>
            {renderTemplate()}
          </div>
        )}
      </ScrollPanel>
    </div>
  );
}

export default App;
