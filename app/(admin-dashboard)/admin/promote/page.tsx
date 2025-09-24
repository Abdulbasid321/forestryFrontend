

// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from '@/components/ui/select';
// import { toast } from 'react-hot-toast';

// interface Department {
//   _id: string;
//   name: string;
// }

// interface Student {
//   _id: string;
//   fullName: string;
//   email: string;
//   currentLevel: string;
//   semester: string;
//   status: 'active' | 'completed';
//   departmentId?: Department;
// }

// const PromotionPage = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
//   const [departmentFilter, setDepartmentFilter] = useState<string>('all');

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   useEffect(() => {
//     fetchStudents();
//   }, [statusFilter, departmentFilter]);

//   const fetchDepartments = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/departments');
//       setDepartments(res.data);
//     } catch {
//       toast.error('Failed to fetch departments');
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/students/all');
//       let filtered = res.data as Student[];

//       if (statusFilter === 'active') {
//         filtered = filtered.filter((s) => s.status !== 'completed');
//       } else if (statusFilter === 'completed') {
//         filtered = filtered.filter((s) => s.status === 'completed');
//       }

//       if (departmentFilter !== 'all') {
//         filtered = filtered.filter((s) => s.departmentId?._id === departmentFilter);
//       }

//       setStudents(filtered);
//     } catch {
//       toast.error('Failed to fetch students');
//     }
//   };

//   const handlePromote = async (studentId: string) => {
//     try {
//       await axios.put(`http://localhost:5000/students/${studentId}/promote`);
//       toast.success('Student promoted');
//       fetchStudents();
//     } catch {
//       toast.error('Failed to promote student');
//     }
//   };

//   const handlePromoteAll = async () => {
//     try {
//       const promotable = students.filter((s) => s.status !== 'completed');
//       await Promise.all(promotable.map((s) =>
//         axios.put(`http://localhost:5000/students/${s._id}/promote`)
//       ));
//       toast.success('All students promoted');
//       fetchStudents();
//     } catch {
//       toast.error('Bulk promotion failed');
//     }
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       <h1 className="text-4xl font-bold text-center text-green-800 mb-6">
//         🎓 Promote Students
//       </h1>

//       {/* Filter Section */}
//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         <Card>
//           <CardContent className="p-4 space-y-2">
//             <label className="text-sm font-semibold text-gray-600">Filter by Status</label>
//             <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val as any)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Students</SelectItem>
//                 <SelectItem value="active">Active Only</SelectItem>
//                 <SelectItem value="completed">Graduated</SelectItem>
//               </SelectContent>
//             </Select>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4 space-y-2">
//             <label className="text-sm font-semibold text-gray-600">Filter by Department</label>
//             <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Department" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Departments</SelectItem>
//                 {departments.map((dept) => (
//                   <SelectItem key={dept._id} value={dept._id}>
//                     {dept.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Promote All Button */}
//       <div className="flex justify-end max-w-6xl mx-auto mb-4">
//         <Button
//           onClick={handlePromoteAll}
//           className="bg-green-700 hover:bg-green-800"
//           disabled={students.filter((s) => s.status !== 'completed').length === 0}
//         >
//           🚀 Promote All
//         </Button>
//       </div>

//       {/* Student Table */}
//       <div className="overflow-x-auto shadow-md rounded-lg bg-white max-w-6xl mx-auto">
//         <table className="min-w-full text-sm text-left text-gray-600">
//           <thead className="bg-green-100 text-green-800 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-3">Full Name</th>
//               <th className="px-6 py-3">Email</th>
//               <th className="px-6 py-3">Department</th>
//               <th className="px-6 py-3">Level</th>
//               <th className="px-6 py-3">Semester</th>
//               <th className="px-6 py-3">Status</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-6 text-gray-400">
//                   No students found.
//                 </td>
//               </tr>
//             ) : (
//               students.map((student) => (
//                 <tr key={student._id} className="border-b hover:bg-green-50 transition">
//                   <td className="px-6 py-4 font-medium">{student.fullName}</td>
//                   <td className="px-6 py-4">{student.email}</td>
//                   <td className="px-6 py-4">{student.departmentId?.name || 'N/A'}</td>
//                   <td className="px-6 py-4">{student.currentLevel}</td>
//                   <td className="px-6 py-4">{student.semester}</td>
//                   <td className="px-6 py-4 capitalize">{student.status}</td>
//                   <td className="px-6 py-4">
//                     {student.status === 'completed' ? (
//                       <span className="text-green-600 font-semibold">Graduated</span>
//                     ) : (
//                       <Button
//                         size="sm"
//                         className="bg-green-600 hover:bg-green-700"
//                         onClick={() => handlePromote(student._id)}
//                       >
//                         Promote
//                       </Button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PromotionPage;


'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-hot-toast';

interface Department {
  _id: string;
  name: string;
}

interface Student {
  _id: string;
  fullName: string;
  email: string;
  currentLevel: string;
  semester: string;
  status: 'active' | 'completed';
  departmentId?: Department;
}

export default function PromotionPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [statusFilter, departmentFilter]);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('https://forestryapi.onrender.com/departments');
      setDepartments(res.data);
    } catch {
      toast.error('Failed to fetch departments');
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('https://forestryapi.onrender.com/students/all');
      let filtered = res.data as Student[];

      if (statusFilter === 'active') {
        filtered = filtered.filter((s) => s.status !== 'completed');
      } else if (statusFilter === 'completed') {
        filtered = filtered.filter((s) => s.status === 'completed');
      }

      if (departmentFilter !== 'all') {
        filtered = filtered.filter((s) => s.departmentId?._id === departmentFilter);
      }

      setStudents(filtered);
    } catch {
      toast.error('Failed to fetch students');
    }
  };

  const handlePromote = async (studentId: string) => {
    try {
      await axios.put(`https://forestryapi.onrender.com/students/${studentId}/promote`);
      toast.success('Student promoted');
      fetchStudents();
    } catch {
      toast.error('Failed to promote student');
    }
  };

//   const handlePromoteAll = async () => {
//     try {
//       const promotable = students.filter((s) => s.status !== 'completed');
//       await Promise.all(promotable.map((s) =>
//         axios.put(`http://localhost:5000/students/${s._id}/promote`)
//       ));
//       toast.success('All students promoted');
//       fetchStudents();
//     } catch {
//       toast.error('Bulk promotion failed');
//     }
//   };
const handlePromoteAll = async () => {
  try {
    await axios.put(`https://forestryapi.onrender.com/students/promote-all`);
    toast.success('All students promoted');
    fetchStudents();
  } catch {
    toast.error('Bulk promotion failed');
  }
};

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-green-800 mb-6">
        🎓 Promote Students
      </h1>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-4 space-y-2">
            <label className="text-sm font-semibold text-gray-600">Filter by Status</label>
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="completed">Graduated</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <label className="text-sm font-semibold text-gray-600">Filter by Department</label>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept._id} value={dept._id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Promote All Button */}
      <div className="flex flex-col sm:flex-row justify-end items-center max-w-6xl mx-auto mb-6 gap-2">
        <Button
          onClick={handlePromoteAll}
          className="w-full sm:w-auto bg-green-700 hover:bg-green-800"
          disabled={students.filter((s) => s.status !== 'completed').length === 0}
        >
          🚀 Promote All
        </Button>
      </div>

      {/* Table on large screens */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-green-100 text-green-800 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Semester</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-green-50 transition duration-200"
                >
                  <td className="px-4 py-3">{student.fullName}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.departmentId?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{student.currentLevel}</td>
                  <td className="px-4 py-3">{student.semester}</td>
                  <td className="px-4 py-3 capitalize">{student.status}</td>
                  <td className="px-4 py-3">
                    {student.status === 'completed' ? (
                      <span className="text-green-600 font-semibold">Graduated</span>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handlePromote(student._id)}
                      >
                        Promote
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view: Cards */}
      <div className="md:hidden space-y-4">
        {students.length === 0 ? (
          <p className="text-center text-gray-500">No students found.</p>
        ) : (
          students.map((student) => (
            <Card key={student._id} className="bg-white shadow-sm p-4">
              <CardContent className="space-y-1">
                <h2 className="text-lg font-semibold">{student.fullName}</h2>
                <p className="text-sm">📧 {student.email}</p>
                <p className="text-sm">🏫 {student.departmentId?.name || 'N/A'}</p>
                <p className="text-sm">📚 Level: {student.currentLevel}</p>
                <p className="text-sm">🕓 Semester: {student.semester}</p>
                <p className="text-sm capitalize">🎖️ Status: {student.status}</p>
                {student.status === 'completed' ? (
                  <p className="text-green-600 font-semibold">Graduated</p>
                ) : (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 mt-2"
                    onClick={() => handlePromote(student._id)}
                  >
                    Promote
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
