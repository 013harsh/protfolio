import { createContext, useContext, useState, useCallback } from "react";
const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  // Store openApps as an array of window objects: { windowId, appId, metadata }
  const [openApps, setOpenApps] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);

  // Opens a NEW instance of an app
  const openApp = useCallback((appId, metadata = {}) => {
    const windowId = `${appId.toLowerCase()}-${Date.now()}`;
    const newWindow = {
      windowId,
      appId,
      metadata: {
        title: metadata.path || appId, // Default title if not specified
        ...metadata,
      },
    };

    setOpenApps((prev) => [...prev, newWindow]);
  }, []);

  const closeWindow = useCallback((windowId) => {
    setOpenApps((prev) => prev.filter((win) => win.windowId !== windowId));
    setMinimizedWindows((prev) => prev.filter((id) => id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId) => {
    setMinimizedWindows((prev) => {
      if (!prev.includes(windowId)) {
        return [...prev, windowId];
      }
      return prev;
    });
  }, []);

  const restoreWindow = useCallback((windowId) => {
    setMinimizedWindows((prev) => prev.filter((id) => id !== windowId));
  }, []);

  return (
    <WindowContext.Provider
      value={{
        openApps, // Now a list of window objects
        minimizedWindows,
        openApp,
        closeWindow,
        minimizeWindow,
        restoreWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowContext must be used within a WindowProvider");
  }
  return context;
};
