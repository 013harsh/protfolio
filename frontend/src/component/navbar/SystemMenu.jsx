import {
  Wifi,
  Volume2,
  Battery,
  Sun,
  Signal,
  User,
  Settings,
  Lock,
  Power,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const SystemMenu = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute right-3 top-10 w-80 bg-[#1e1e1e]/98 backdrop-blur-xl rounded-[28px] border border-white/10 shadow-2xl z-[110] overflow-hidden p-5"
    >
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-4">
          <Volume2 size={18} className="text-white/80" />
          <div className="relative flex-1 h-1 overflow-hidden rounded-full cursor-pointer bg-white/20 group">
            <div className="absolute left-0 top-0 h-full w-[80%] bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors" />
            <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Sun size={18} className="text-white/80" />
          <div className="relative flex-1 h-1 overflow-hidden rounded-full cursor-pointer bg-white/20 group">
            <div className="absolute left-0 top-0 h-full w-[80%] bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors" />
            <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-white/10 mb-6 mx-2" />

      <div className="space-y-1">
        <div className="flex items-center justify-between p-3 transition-colors cursor-pointer rounded-2xl hover:bg-white/10 group">
          <div className="flex items-center gap-4">
            <Wifi size={18} className="text-white/80" />
            <span className="text-[14px] font-medium text-white/90">Wi-Fi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-white/50">TheOwls</span>
            <ChevronRight
              size={14}
              className="text-white/30 group-hover:text-white/60"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 transition-colors cursor-pointer rounded-2xl hover:bg-white/10 group">
          <div className="flex items-center gap-4">
            <Signal size={18} className="text-white/80" />
            <span className="text-[14px] font-medium text-white/90">
              Mobile Broadband
            </span>
          </div>
          <ChevronRight
            size={14}
            className="text-white/30 group-hover:text-white/60"
          />
        </div>

        <div className="flex items-center justify-between p-3 transition-colors cursor-pointer rounded-2xl hover:bg-white/10 group">
          <div className="flex items-center gap-4">
            <Battery size={18} className="text-white/80" />
            <span className="text-[14px] font-medium text-white/90">
              Battery
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-white/50">
              2:23 Remaining (77%)
            </span>
            <ChevronRight
              size={14}
              className="text-white/30 group-hover:text-white/60"
            />
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-white/10 my-4 mx-2" />

      <div className="flex items-center justify-between p-3 transition-colors cursor-pointer rounded-2xl hover:bg-white/10 group">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-lg bg-gradient-to-br from-orange-400 to-red-500">
            <User size={18} className="text-white" />
          </div>
          <span className="text-[14px] font-medium text-white/90">
            Allan Day
          </span>
        </div>
        <ChevronRight
          size={14}
          className="text-white/30 group-hover:text-white/60"
        />
      </div>

      <div className="h-[1px] bg-white/10 mt-4 mb-6 mx-2" />

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-12 pb-2">
        <button className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full border-white/10 hover:bg-white/10">
          <Settings size={20} className="text-white/80" />
        </button>
        <button className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full border-white/10 hover:bg-white/10">
          <Lock size={20} className="text-white/80" />
        </button>
        <button className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full border-white/10 hover:bg-white/10">
          <Power size={20} className="text-white/80" />
        </button>
      </div>
    </motion.div>
  );
};

export default SystemMenu;
