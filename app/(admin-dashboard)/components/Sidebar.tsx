import { BookAIcon, GraduationCap, LayoutDashboard, UserPenIcon, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { MdPayments } from 'react-icons/md';
import { PiContactlessPaymentFill } from 'react-icons/pi';

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const lists = [
    { id: 1, name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    // { id: 2, name: "Profile", path: "/admin/profile", icon: UserPenIcon },
    { id: 3, name: "Departments", path: "/admin/department", icon: GraduationCap },
    { id: 4, name: "Courses", path: "/admin/courses", icon: BookAIcon },
    { id: 5, name: "Add Students", path: "/admin/addStudent", icon: Users },
    { id: 6, name: "Add Teacher", path: "/admin/addTeacher", icon: MdPayments },
    { id: 7, name: "Promote", path: "/admin/promote", icon: MdPayments },
    { id: 8, name: "Results", path: "/admin/result", icon: BookAIcon },
    { id: 9, name: "Documents", path: "/admin/documents", icon: BookAIcon },
    { id: 10, name: "payment", path: "/admin/proofpayment", icon: BookAIcon },
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-green-100 via-white to-green-50 shadow-xl p-6 rounded-r-2xl">
      <h2 className="text-2xl font-extrabold text-green-600 text-center mb-6 tracking-wide">ZIT Portal</h2>
      <nav className="flex flex-col space-y-2">
        {lists.map((list) => (
          <Link
            key={list.id}
            href={list.path}
            onClick={closeSidebar}
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-600 hover:text-white hover:bg-green-600 transition-all duration-200 ease-in-out group"
          >
            <list.icon className="text-lg group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium text-sm">{list.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
