import React, { useState, memo } from "react";
import DesktopIcon from "../component/DesktopIcon";
import { useWindowContext } from "../context/WindowContext";

// Apps
import CameraApp from "../component/apps/CameraApp";
import FilesApp from "../component/apps/FilesApp";
import GenericApp from "../component/apps/GenericApp";
import PhotoApp from "../pages/Details/PhotosApp";
import VideoApp from "../pages/Details/VideosApp";
import BrowserApp from "../component/apps/BrowserApp";
import DetailWindow from "../component/apps/DetailWindow";
import MapsApp from "../component/apps/MapsApp";
import SettingsApp from "../component/apps/SettingsApp";
import TerminalApp from "../component/apps/TerminalApp";

// Detail Components
import Skills from "../pages/Details/Skills";
import AboutMe from "../pages/Details/AboutMe";
import Experience from "../pages/Details/Experience";
import Projects from "../pages/Details/Projects";
import useScreenSize from "../hooks/useScreenSize";

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
    case "maps":
      return <MapsApp windowId={windowId} metadata={metadata} />;
    case "settings":
      return <SettingsApp windowId={windowId} metadata={metadata} />;
    case "terminal":
      return <TerminalApp windowId={windowId} metadata={metadata} />;

    // Portfolio Detail Pages using the DetailWindow wrapper
    case "skills":
      return (
        <DetailWindow windowId={windowId} metadata={metadata}>
          <Skills />
        </DetailWindow>
      );
    case "about":
      return (
        <DetailWindow windowId={windowId} metadata={metadata}>
          <AboutMe />
        </DetailWindow>
      );
    case "experience":
      return (
        <DetailWindow windowId={windowId} metadata={metadata}>
          <Experience />
        </DetailWindow>
      );
    case "projects":
      return (
        <DetailWindow windowId={windowId} metadata={metadata}>
          <Projects />
        </DetailWindow>
      );
    default:
      return <GenericApp windowId={windowId} metadata={metadata} />;
  }
});

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
    icon: <img src="/scalable/places/folder-drag-accept.svg" alt="projects" />,
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

const dockIcons = [
  {
    id: "chrome",
    label: "Browser",
    icon: <img src="/scalable/places/chrome-svgrepo-com.svg" alt="chrome" />,
    type: "app",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <img src="/scalable/places/Terminal.svg" alt="terminal" />,
    type: "app",
  },
  {
    id: "photos",
    label: "Photos",
    icon: <img src="/scalable/places/folder-pictures.svg" alt="photos" />,
    type: "folder",
  },

  {
    id: "maps",
    label: "Maps",
    icon: <img src="/scalable/places/maps.svg" alt="maps" />,
    type: "app",
  },
];

const Landingpg = () => {
  const { openApps, openApp, minimizedWindows } = useWindowContext();
  const [selectedIconId, setSelectedIconId] = useState(null);
  const { isMobile, isTablet } = useScreenSize();

  const handleLaunch = (icon) => {
    if (icon.id === "cv") {
      window.open("/HarshKumar013Resume.pdf");
      return;
    }
    const title = icon.label || icon.id;
    openApp(icon.id, { title });
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
  };

  return (
    <div
      className="relative w-full h-[100dvh] overflow-hidden"
      onClick={handleDesktopClick}
    >
      <img
        src="/hero.jpg"
        alt="desktop wallpaper"
        className="absolute inset-0 object-cover w-full h-full pointer-events-none brightness-90"
      />

      {/* Desktop Icons */}
      {isMobile ? (
        /* Mobile: vertical column on the left */
        <div className="absolute z-10 flex flex-col gap-2 pointer-events-auto top-10 left-2">
          {desktopIcons.map((item) => (
            <DesktopIcon
              key={item.id}
              label={item.label}
              icon={item.icon}
              type={item.type}
              compact
              isSelected={selectedIconId === item.id}
              onClick={() => {
                setSelectedIconId(item.id);
                handleLaunch(item);
              }}
            />
          ))}
        </div>
      ) : isTablet ? (
        /* Tablet: vertical column, slightly smaller */
        <div className="absolute z-10 flex flex-col gap-3 pointer-events-auto top-10 left-3">
          {desktopIcons.map((item) => (
            <DesktopIcon
              key={item.id}
              label={item.label}
              icon={item.icon}
              type={item.type}
              isSelected={selectedIconId === item.id}
              onClick={() => {
                setSelectedIconId(item.id);
                handleLaunch(item);
              }}
            />
          ))}
        </div>
      ) : (
        /* Desktop: original layout */
        <div className="absolute z-10 flex flex-col gap-4 pointer-events-auto top-10 left-4">
          {desktopIcons.map((item) => (
            <DesktopIcon
              key={item.id}
              label={item.label}
              icon={item.icon}
              type={item.type}
              isSelected={selectedIconId === item.id}
              onClick={() => {
                setSelectedIconId(item.id);
                handleLaunch(item);
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom Dock (Mobile Only) */}
      {isMobile && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 px-4 pt-2 pb-2 border shadow-lg rounded-2xl bg-black/40 backdrop-blur-md border-white/20 shadow-black/50">
            {dockIcons.map((item) => (
              <DesktopIcon
                key={item.id}
                label={item.label}
                icon={item.icon}
                type={item.type}
                compact
                isSelected={selectedIconId === item.id}
                onClick={() => {
                  setSelectedIconId(item.id);
                  handleLaunch(item);
                }}
              />
            ))}
          </div>
        </div>
      )}

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
