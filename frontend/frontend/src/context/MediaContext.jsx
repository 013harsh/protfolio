import React, { createContext, useContext, useState, useCallback } from "react";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [capturedMedia, setCapturedMedia] = useState([]);

  /**
   * Add a new media item (photo or video)
   * @param {Object} item - { id, type: "image" | "video", url, title, date }
   */
  const addMedia = useCallback((item) => {
    setCapturedMedia((prev) => [
      {
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        ...item,
      },
      ...prev,
    ]);
  }, []);

  const deleteMedia = useCallback((id) => {
    setCapturedMedia((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <MediaContext.Provider value={{ capturedMedia, addMedia, deleteMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMediaContext must be used within a MediaProvider");
  }
  return context;
};
