import { useState } from "react";
import { FiMenu, FiX, FiInfo, FiBarChart2 } from "react-icons/fi";

const RightDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button - fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sliding Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out z-40 ${
          open ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col px-6 py-8 space-y-4">
          <h2 className="text-xl font-bold">🔥 FireWatch</h2>
          <button className="flex items-center gap-2 hover:text-blue-400">
            <FiBarChart2 />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-400">
            <FiInfo />
            <span>About</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RightDrawer;
