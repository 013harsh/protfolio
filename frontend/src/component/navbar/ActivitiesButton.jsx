import React from "react";

const ActivitiesButton = ({ onClick, isActive }) => {
  return (
    <div className="flex items-center h-full">
      <button
        onClick={onClick}
        className={`h-full px-3 font-semibold tracking-tight transition-colors duration-200 ${
          isActive ? "bg-white/15" : "hover:bg-white/10"
        }`}
      >
        Activities
      </button>
    </div>
  );
};

export default ActivitiesButton;
