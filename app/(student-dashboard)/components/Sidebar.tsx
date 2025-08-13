// import { BookAIcon, GraduationCap, LayoutDashboard, UserPenIcon, Users } from 'lucide-react';
// import Link from 'next/link';
// import React from 'react'
// import { FaMoneyBill } from 'react-icons/fa';
// import { MdPayments } from 'react-icons/md';
// import { PiContactlessPaymentFill } from 'react-icons/pi';

// const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
//     const lists = [
//         { id: 1, name: "Dashboard", path: "", icon: LayoutDashboard },
//         { id: 2, name: "Profile", path: "", icon: UserPenIcon },
//         { id: 3, name: "Departments", path: "", icon: GraduationCap },
//         { id: 4, name: "Courses", path: "", icon: BookAIcon },
//         { id: 5, name: "Users", path: "", icon: Users },
//         { id: 7, name: "Result", path: "", icon: BookAIcon },
//       ];
//   return (
//     <div className="border border-gray-600 h-screen p-4 shadow-md bg-white">
//         <h2 className='text-center text-xl font-bold text-green-700 my-2'>ZIT</h2>
//         <hr />
//        <div className='mt-3'>
//        {lists.map(list=>(
//             <Link key={list.id} href={list.path} onClick={closeSidebar}>
//                 <h2 className="flex items-center gap-3 text-md p-3 rounded-xl hover:bg-green-700 text-slate-500 hover:text-white">
//                     <list.icon/>
//                     {list.name}
//                 </h2>
//             </Link>
//         ))}


//        </div>
//     </div>
//   )
// }

// export default Sidebar


import { BookAIcon, GraduationCap, LayoutDashboard, UserPenIcon, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { MdPayments } from 'react-icons/md';
import { PiContactlessPaymentFill } from 'react-icons/pi';

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const lists = [
    { id: 1, name: "Dashboard", path: "/student", icon: LayoutDashboard },
    { id: 2, name: "Profile", path: "/student/studentProfile", icon: UserPenIcon },
    { id: 3, name: "My courses", path: "/student/courses", icon: GraduationCap },
    // { id: 4, name: "Tasks", path: "/results", icon: BookAIcon },
    // { id: 5, name: "school chat", path: "/student/chat", icon: BookAIcon },
    { id: 4, name: "Results", path: "/student/result", icon: BookAIcon },
    { id: 5, name: "Documents", path: "/student/document", icon: BookAIcon },
    { id: 6, name: "Payment", path: "/student/payment", icon: BookAIcon },
    { id: 7, name: "History", path: "/student/history", icon: BookAIcon },
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
