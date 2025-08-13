import { Bell, Menu } from "lucide-react";
import Link from "next/link";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md md:ml-4 rounded-b-xl border-b border-gray-100">
      {/* Hamburger Menu Button (Only visible on mobile) */}
      <button
        className="md:hidden text-gray-700 hover:text-green-700 transition-all"
        onClick={toggleSidebar}
      >
        <Menu size={28} />
      </button>

      {/* Dashboard Title */}
      <h1 className="text-xl font-semibold text-gray-700 tracking-wide">Dashboard</h1>

      <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative group">
            <Bell className="h-6 w-6 text-gray-600 hover:text-green-600 transition-all cursor-pointer" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Initials Avatar */}
          <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700 hover:shadow-md cursor-pointer transition-shadow">
            AD
          </div>
        </div>
    </header>
  );
}
