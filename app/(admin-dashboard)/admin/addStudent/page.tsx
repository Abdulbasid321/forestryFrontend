// "use client";

// import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// // Types
// interface Department {
//   _id: string;
//   name: string;
// }

// interface Student {
//   _id: string;
//   fullName: string;
//   email: string;
//   departmentId?: Department;
//   phone: string;
//   currentLevel?: string;
//   semester?: string;
// }

// interface FormData {
//   fullName: string;
//   email: string;
//   departmentId: string;
//   phone: string;
//   address: string;
// }

// export default function StudentForm() {
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     email: "",
//     departmentId: "",
//     phone: "",
//     address: "",
//   });

//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [selectedDept, setSelectedDept] = useState<string>("all");

//   useEffect(() => {
//     fetchDepartments();
//     fetchStudents();
//   }, [selectedDept]);

//   async function fetchDepartments() {
//     try {
//       const res = await axios.get<Department[]>("http://localhost:5000/departments");
//       setDepartments(res.data);
//     } catch {
//       toast.error("Failed to fetch departments");
//     }
//   }

//   async function fetchStudents() {
//     try {
//       const params = selectedDept !== "all" ? { departmentId: selectedDept } : {};
//       const res = await axios.get<Student[]>("http://localhost:5000/students/all", { params });
//       setStudents(res.data);
//     } catch {
//       toast.error("Failed to fetch students");
//     }
//   }

//   function handleChange(e: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/students/create", formData);
//       toast.success("Student registered successfully");
//       setFormData({
//         fullName: "",
//         email: "",
//         departmentId: "",
//         phone: "",
//         address: "",
//       });
//       fetchStudents();
//     } catch {
//       toast.error("Registration failed");
//     }
//   }

//   return (
//     <div className="p-6 space-y-8">
//       {/* Registration Form */}
//       <h1 className="text-3xl font-bold text-center text-green-700">
//         🎓 Register a New Student
//       </h1>
//       <Card className="max-w-3xl mx-auto shadow-2xl">
//         <CardContent className="p-6 space-y-4">
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             <div>
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input
//                 id="fullName"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label htmlFor="address">Address</Label>
//               <Input
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label htmlFor="departmentId">Department</Label>
//               <Select
//                 value={formData.departmentId}
//                 onValueChange={(val) =>
//                   setFormData((prev) => ({ ...prev, departmentId: val }))
//                 }
//               >
//                 <SelectTrigger id="departmentId">
//                   <SelectValue placeholder="Select department" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="none" disabled>
//                     Select department
//                   </SelectItem>
//                   {departments.map((dept) => (
//                     <SelectItem key={dept._id} value={dept._id}>
//                       {dept.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="col-span-full text-center">
//               <Button className="bg-green-600 hover:bg-green-700">
//                 Register Student
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       {/* Student List & Filter */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-semibold mb-4 text-center">
//           📋 Registered Students
//         </h2>
//         <div className="max-w-md mx-auto mb-6">
//           <Label htmlFor="filterDept">Filter by Department</Label>
//           <Select value={selectedDept} onValueChange={setSelectedDept}>
//             <SelectTrigger id="filterDept">
//               <SelectValue placeholder="All departments" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               {departments.map((dept) => (
//                 <SelectItem key={dept._id} value={dept._id}>
//                   {dept.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="overflow-x-auto shadow-xl rounded-lg">
//           <table className="min-w-full bg-white text-sm">
//             <thead className="bg-green-100 text-gray-700">
//               <tr>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Phone</th>
//                 <th className="px-4 py-2">Department</th>
//                 <th className="px-4 py-2">Level</th>
//                 <th className="px-4 py-2">Semester</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.length > 0 ? (
//                 students.map((student) => (
//                   <tr key={student._id} className="text-center border-b">
//                     <td className="px-4 py-2">{student.fullName || "N/A"}</td>
//                     <td className="px-4 py-2">{student.email || "N/A"}</td>
//                     <td className="px-4 py-2">{student.phone || "N/A"}</td>
//                     <td className="px-4 py-2">
//                       {student.departmentId?.name || "Not Assigned"}
//                     </td>
//                     <td className="px-4 py-2">{student.currentLevel || "100"}</td>
//                     <td className="px-4 py-2">{student.semester || "1st"}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="text-center p-4 text-gray-500">
//                     No students found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Types
interface Department {
  _id: string;
  name: string;
}

interface Student {
  _id: string;
  fullName: string;
  email: string;
  departmentId?: Department;
  phone: string;
  regNumber: string; // ✅ Added
  currentLevel?: string;
  semester?: string;
}

interface FormData {
  fullName: string;
  email: string;
  departmentId: string;
  phone: string;
  address: string;
}

export default function StudentForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    departmentId: "",
    phone: "",
    address: "",
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>("all");

  useEffect(() => {
    fetchDepartments();
    fetchStudents();
  }, [selectedDept]);

  async function fetchDepartments() {
    try {
      const res = await axios.get<Department[]>(
        "https://forestryapi.onrender.com/departments"
      );
      setDepartments(res.data);
    } catch {
      toast.error("Failed to fetch departments");
    }
  }

  async function fetchStudents() {
    try {
      const params =
        selectedDept !== "all" ? { departmentId: selectedDept } : {};
      const res = await axios.get<Student[]>(
        "https://forestryapi.onrender.com/students/all",
        { params }
      );
      setStudents(res.data);
    } catch {
      toast.error("Failed to fetch students");
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await axios.post("https://forestryapi.onrender.com/students/create", formData);
      toast.success("Student registered successfully");
      setFormData({
        fullName: "",
        email: "",
        departmentId: "",
        phone: "",
        address: "",
      });
      fetchStudents();
    } catch {
      toast.error("Registration failed");
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Registration Form */}
      <h1 className="text-3xl font-bold text-center text-green-700">
        🎓 Register a New Student
      </h1>
      <Card className="max-w-3xl mx-auto shadow-2xl">
        <CardContent className="p-6 space-y-4">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="departmentId">Department</Label>
              <Select
                value={formData.departmentId}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, departmentId: val }))
                }
              >
                <SelectTrigger id="departmentId">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>
                    Select department
                  </SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept._id} value={dept._id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-full text-center">
              <Button className="bg-green-600 hover:bg-green-700">
                Register Student
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Student List & Filter */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          📋 Registered Students
        </h2>
        <div className="max-w-md mx-auto mb-6">
          <Label htmlFor="filterDept">Filter by Department</Label>
          <Select value={selectedDept} onValueChange={setSelectedDept}>
            <SelectTrigger id="filterDept">
              <SelectValue placeholder="All departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept._id} value={dept._id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto shadow-xl rounded-lg">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-green-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Reg Number</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Level</th>
                <th className="px-4 py-2">Semester</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id} className="text-center border-b">
                    <td className="px-4 py-2">{student.fullName || "N/A"}</td>
                    <td className="px-4 py-2">{student.email || "N/A"}</td>
                    <td className="px-4 py-2">{student.phone || "N/A"}</td>
                    <td className="px-4 py-2 font-mono text-green-700">
                      {student.regNumber || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {student.departmentId?.name || "Not Assigned"}
                    </td>
                    <td className="px-4 py-2">
                      {student.currentLevel || "100"}
                    </td>
                    <td className="px-4 py-2">{student.semester || "1st"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
