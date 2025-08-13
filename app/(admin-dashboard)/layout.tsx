// "use client";
// import React, { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen overflow-hidden bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 w-64 bg-white shadow-xl
//           transform transition-transform duration-300 ease-in-out
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:static md:shadow-none z-30
//         `}
//       >
//         <Sidebar closeSidebar={() => setSidebarOpen(false)} />
//       </aside>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

//         {/* Page content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           {children}
//         </main>
//       </div>

//       {/* Mobile-only overlay */}
//       {isSidebarOpen && (
//         <div
//           aria-hidden="true"
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-20"
//         />
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Prevent outer scroll, confine to content area
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Main container with header and scrollable content */}
      <div className="flex-1 flex flex-col">
        {/* Header stays fixed at top */}
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile overlay when sidebar open */}
      {isSidebarOpen && (
        <div
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-10"
        />
      )}
    </div>
  );
}
