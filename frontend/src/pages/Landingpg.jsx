import React, { useState, memo } from "react";
import DesktopIcon from "../component/DesktopIcon";
import { useWindowContext } from "../context/WindowContext";

// Apps
import CameraApp from "../component/apps/CameraApp";
import FilesApp from "../component/apps/FilesApp";
import GenericApp from "../component/apps/GenericApp";
import PhotoApp from "../component/Details/PhotosApp";
import VideoApp from "../component/Details/VideosApp";
import BrowserApp from "../component/apps/BrowserApp";
import DetailWindow from "../component/apps/DetailWindow";

// Detail Components
import Skills from "../component/Details/Skills";
import AboutMe from "../component/Details/AboutMe";
import Experience from "../component/Details/Experience";
import Projects from "../component/Details/Projects";
import MyCV from "../component/Details/MyCV";

const AppRenderer = memo(({ window }) => {
  const { appId, windowId, metadata } = window;

  switch (appId.toLowerCase()) {
    case "camera":
      return <CameraApp windowId={windowId} metadata={metadata} />;
    case "photos":
      return <PhotoApp windowId={windowId} metadata={metadata} />;
    case "videos":
      return <VideoApp windowId={windowId} metadata={metadata} />;
    case "files":
      return <FilesApp windowId={windowId} metadata={metadata} />;
    case "chrome":
      return <BrowserApp windowId={windowId} metadata={metadata} />;
   
    
    // Portfolio Detail Pages using the DetailWindow wrapper
    case "skills":
      return <DetailWindow windowId={windowId} metadata={metadata}><Skills /></DetailWindow>;
    case "about":
      return <DetailWindow windowId={windowId} metadata={metadata}><AboutMe /></DetailWindow>;
    case "experience":
      return <DetailWindow windowId={windowId} metadata={metadata}><Experience /></DetailWindow>;
    case "projects":
      return <DetailWindow windowId={windowId} metadata={metadata}><Projects /></DetailWindow>;
    case "cv":
      return <DetailWindow windowId={windowId} metadata={metadata}><MyCV /></DetailWindow>;

    default:
      return <GenericApp windowId={windowId} metadata={metadata} />;
  }
});

const Landingpg = () => {
  const { openApps, openApp, minimizedWindows } = useWindowContext();
  const [selectedIconId, setSelectedIconId] = useState(null);

  const desktopIcons = [
    {
      id: "about",
      label: "About me",
      icon: <img src="/scalable/status/avatar-default.svg" alt="about" />,
      type: "app",
    },
    {
      id: "Skills",
      label: "Skills",
      icon: <img src="/scalable/places/folder-drag-accept.svg" alt="skills" />,
      type: "folder",
    },
    {
      id: "projects",
      label: "Projects",
      icon: (
        <img src="/scalable/places/folder-drag-accept.svg" alt="projects" />
      ),
      type: "folder",
    },
    {
      id: "Experience",
      label: "Experience",
      icon: (
        <img src="/scalable/places/folder-drag-accept.svg" alt="experience" />
      ),
      type: "folder",
    },
    {
      id: "cv",
      label: "My CV",
      icon: <img src="/scalable/mimetypes/x-office-document.svg" alt="cv" />,
      type: "file",
    },
  ];

  const handleLaunch = (icon) => {
    const title = icon.label || icon.id;
    openApp(icon.id, { title });
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onClick={handleDesktopClick}
    >
      <img
        src="/hero.jpg"
        alt="desktop wallpaper"
        className="absolute inset-0 object-cover w-full h-full pointer-events-none brightness-90"
      />

      {/* Desktop Icons Grid */}
      <div className="absolute z-10 flex flex-col gap-4 pointer-events-auto top-10 left-4">
        {desktopIcons.map((item) => (
          <DesktopIcon
            key={item.id}
            label={item.label}
            icon={item.icon}
            type={item.type}
            isSelected={selectedIconId === item.id}
            onClick={() => setSelectedIconId(item.id)}
            onDoubleClick={() => handleLaunch(item)}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-transparent to-black/10" />

      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="relative w-full h-full">
          {openApps.map((win) => {
            const isMinimized = minimizedWindows.includes(win.windowId);
            if (isMinimized) return null;

            return <AppRenderer key={win.windowId} window={win} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Landingpg);
