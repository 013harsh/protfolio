import React, { useState, useEffect, useRef } from "react";
import { Wifi, Volume2, Battery, ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import ActivitiesButton from "./navbar/ActivitiesButton";
import Clock from "./navbar/Clock";
import SystemMenu from "./navbar/SystemMenu";
import ActivitiesOverview from "./navbar/ActivitiesOverview";
import useScreenSize from "../hooks/useScreenSize";

const Navbar = () => {
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const menuRef = useRef(null);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSystemMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Activities Toggle
  const toggleActivities = () => {
    setIsActivitiesOpen(!isActivitiesOpen);
    if (isSystemMenuOpen) setIsSystemMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-[100] w-full bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5 h-8 select-none">
        <div className="flex items-center justify-between h-full px-3 text-[13px] font-medium text-white/90">
          <ActivitiesButton
            onClick={toggleActivities}
            isActive={isActivitiesOpen}
          />

          <Clock />

          {/* System tray: show all on desktop/tablet, icon-only on mobile */}
          <div
            ref={menuRef}
            onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
            className={`flex items-center gap-2 sm:gap-4 px-2 sm:px-3 h-7 transition-all duration-200 rounded-full cursor-pointer ${
              isSystemMenuOpen ? "bg-white/15" : "hover:bg-white/10"
            }`}
          >
            {!isMobile && <Wifi size={14} className="stroke-[2.5]" />}
            <Volume2 size={14} className="stroke-[2.5]" />
            {!isMobile && <Battery size={14} className="stroke-[2.5]" />}
            <ChevronDown
              size={12}
              className={`stroke-[2.5] transition-transform duration-200 ${
                isSystemMenuOpen ? "rotate-180" : ""
              }`}
            />

            <AnimatePresence>
              {isSystemMenuOpen && <SystemMenu isOpen={isSystemMenuOpen} />}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Activities Overlay */}
      <ActivitiesOverview
        isOpen={isActivitiesOpen}
        onClose={() => setIsActivitiesOpen(false)}
      />
    </>
  );
};

export default Navbar;
