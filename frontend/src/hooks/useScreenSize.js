import { useState, useEffect } from "react";

/**
 * Returns the current screen size category.
 * isMobile  : width < 640px
 * isTablet  : 640px <= width < 1024px
 * isDesktop : width >= 1024px
 */
const useScreenSize = () => {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
  };
};

export default useScreenSize;
