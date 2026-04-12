const DesktopIcon = ({
  icon,
  label,
  type = "app",
  isSelected = false,
  compact = false,
  onClick,
  onDoubleClick,
}) => {
  if (compact) {
    // Mobile dock mode: icon only, smaller, label hidden
    return (
      <div
        className={`relative flex flex-col items-center w-14 gap-0.5 p-1.5 rounded-md cursor-pointer select-none transition-all
          hover:bg-blue-500/40 active:bg-blue-500/40
        ${
          isSelected
            ? "bg-blue-500/40 ring-1 ring-blue-500/40"
            : "hover:bg-blue-500/40 active:bg-blue-500/40"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onDoubleClick?.();
        }}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl transition-transform">
          {icon}
        </div>
        <span
          className={`text-[9px] text-center leading-tight px-0.5 break-words w-full truncate
          ${isSelected ? "text-white" : "text-gray-200"}
          `}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center w-24 gap-1 p-2 rounded-md cursor-pointer select-none transition-all
        hover:bg-blue-500/40 active:bg-blue-500/40
      ${
        isSelected
          ? "bg-blue-500/40 ring-1 ring-blue-500/40"
          : "hover:bg-blue-500/40 active:bg-blue-500/40"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick?.();
      }}
    >
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-xl
        transition-transform group-hover:scale-105`}
      >
        {icon}
      </div>
      <span
        className={`text-[11.5px] text-center leading-tight px-1 break-words w-full
        ${isSelected ? "text-white" : "text-gray-200"}
        `}
      >
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
