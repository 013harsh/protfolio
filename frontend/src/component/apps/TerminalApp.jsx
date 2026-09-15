import React, { memo, useCallback, useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Maximize2, Minimize2, Minus, Terminal } from "lucide-react";
import { useWindowContext } from "../../context/WindowContext";
import useScreenSize from "../../hooks/useScreenSize";

const TerminalApp = ({ windowId, metadata }) => {
  const { closeWindow, minimizeWindow } = useWindowContext();
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();
  const { isMobile, isTablet } = useScreenSize();

  const [history, setHistory] = useState([
    { type: "system", content: "Welcome to PortfolioOS Terminal." },
    { type: "system", content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const toggleMaximize = useCallback(() => setIsMaximized((prev) => !prev), []);
  const toggleMinimize = useCallback(
    () => minimizeWindow(windowId),
    [minimizeWindow, windowId],
  );
  const handleClose = useCallback(
    () => closeWindow(windowId),
    [closeWindow, windowId],
  );

  const getWindowSize = () => {
    if (isMobile) {
      return {
        width: "100vw",
        height: "calc(100vh - 32px)",
        top: "32px",
        left: "0px",
      };
    }
    return { width: "650px", height: "450px", top: "100px", left: "20%" };
  };

  const windowSize = getWindowSize();
  const forceFullscreen = isMobile;

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      let output = "";

      if (cmd === "clear" || cmd === "Clear" || cmd === "CLEAR") {
        setHistory([]);
        setInput("");
        return;
      } else if (
        cmd === "harsh kumar" ||
        cmd === "Harsh Kumar" ||
        cmd === "HARSH KUMAR"
      ) {
        output = "owner the this website";
      } else if (cmd === "whoami" || cmd === "Whoami" || cmd === "WHOAMI") {
        output = "guest";
      } else if (cmd === "date" || cmd === "Date" || cmd === "DATE") {
        output = new Date().toString();
      } else if (cmd === "Contact" || cmd === "contact" || cmd === "CONTACT") {
        output = "9896024684";
      } else if (cmd === "gmail" || cmd === "email" || cmd === "Email") {
        output = "hkaggarwal013@gmail.com";
      } else if (
        cmd === "github" ||
        cmd === "GitHub" ||
        cmd === "Github" ||
        cmd === "GITHUB"
      ) {
        output = "https://github.com/harsh01312";
      } else if (
        cmd === "linkedin" ||
        cmd === "Linkedin" ||
        cmd === "LINKEDIN"
      ) {
        output = "https://www.linkedin.com/in/harsh-kumar-26a658248/";
      } else if (cmd !== "") {
        output = `command not found: ${cmd}`;
      }

      const newHistory = [
        ...history,
        { type: "user", content: `guest@portfolio:~$ ${cmd}` },
      ];
      if (output) {
        newHistory.push({ type: "system", content: output });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <motion.div
      drag={!isMaximized && !forceFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        width: forceFullscreen || isMaximized ? "100vw" : windowSize.width,
        height:
          forceFullscreen || isMaximized
            ? "calc(100vh - 32px)"
            : windowSize.height,
        top: forceFullscreen || isMaximized ? "32px" : windowSize.top,
        left: forceFullscreen || isMaximized ? "0px" : windowSize.left,
        x: forceFullscreen || isMaximized ? 0 : undefined,
        y: forceFullscreen || isMaximized ? 0 : undefined,
      }}
      className={`absolute z-[40] pointer-events-auto bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
        forceFullscreen || isMaximized ? "rounded-none" : "rounded-xl"
      }`}
    >
      <div
        onPointerDown={(e) => !forceFullscreen && dragControls.start(e)}
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5 cursor-grab active:cursor-grabbing shrink-0 h-[46px] select-none"
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <Terminal size={16} className="text-white/70" />
          <span className="text-xs font-semibold text-white/90">
            {metadata.title || "Terminal"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <>
              <button
                onClick={toggleMinimize}
                className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={toggleMaximize}
                className="p-1 px-3 transition-colors rounded-md text-white/40 hover:bg-white/5"
              >
                {isMaximized ? (
                  <Minimize2 size={14} />
                ) : (
                  <Maximize2 size={14} />
                )}
              </button>
            </>
          )}
          <button
            onClick={handleClose}
            className="p-1 px-3 text-white transition-colors rounded-md bg-red-500/80 hover:bg-red-500"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div
        className="flex flex-col flex-1 p-4 bg-[#1e1e1e] overflow-y-auto custom-scrollbar font-mono text-sm text-green-400"
        onClick={() =>
          document.getElementById(`terminal-input-${windowId}`)?.focus()
        }
      >
        {history.map((line, idx) => (
          <div key={idx} className="mb-1 break-words whitespace-pre-wrap">
            {line.content}
          </div>
        ))}
        <div className="flex items-center mt-1">
          <span className="mr-2">guest@portfolio:~$</span>
          <input
            id={`terminal-input-${windowId}`}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 text-green-400 bg-transparent outline-none caret-green-400"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={endRef} />
      </div>
    </motion.div>
  );
};

export default memo(TerminalApp);
