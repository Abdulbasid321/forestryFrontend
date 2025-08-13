// 'use client';

// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { CheckCircle, XCircle, Edit } from 'lucide-react';

// interface Student {
//   fullName?: string;
//   email?: string;
//   phone?: string;
//   address?: string;
//   semester?: string;
//   currentLevel?: string;
//   [key: string]: any;
// }

// const StudentProfilePage = () => {
//   const router = useRouter();
//   const [student, setStudent] = useState<Student | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [studentId, setStudentId] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedStudent, setUpdatedStudent] = useState<Student>({});

//   // Extract token and decode studentId
//   useEffect(() => {
//     const token = localStorage.getItem("studentToken");

//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split('')
//           .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//           .join('')
//       );
//       const decoded = JSON.parse(jsonPayload);

//       if (decoded?.studentId) {
//         setStudentId(decoded.studentId);
//       } else {
//         router.push("/login");
//       }
//     } catch (err) {
//       console.error("Invalid token:", err);
//       router.push("/login");
//     }
//   }, [router]);

//   // Fetch profile after setting studentId
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/students/${studentId}`);
//         if (!response.ok) throw new Error("Failed to fetch student profile.");

//         const data = await response.json();
//         setStudent(data);
//         setUpdatedStudent(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (studentId) {
//       fetchProfile();
//     }
//   }, [studentId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/students/${studentId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedStudent),
//       });

//       if (!response.ok) throw new Error('Failed to update profile');

//       const result = await response.json();
//       setStudent(result.updatedStudent);
//       setIsEditing(false);
//     } catch (err: any) {
//       setError(err.message || 'Unexpected error');
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white p-4">
//       <div className="bg-white border border-green-400 rounded-3xl p-8 shadow-2xl max-w-md w-full text-center relative overflow-hidden transition-all duration-500">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="w-24 h-24 rounded-full border-4 border-green-400 overflow-hidden">
//             <img src="/avatar-placeholder.png" alt="Student Avatar" className="w-full h-full object-cover" />
//           </div>

//           {isEditing ? (
//             <>
//               {['fullName', 'email', 'phone', 'address', 'semester', 'currentLevel'].map((field) => (
//                 <input
//                   key={field}
//                   type="text"
//                   name={field}
//                   value={updatedStudent[field] || ''}
//                   onChange={handleInputChange}
//                   className="bg-gray-100 rounded-lg p-2 w-full focus:outline-green-400"
//                   placeholder={field.replace(/([A-Z])/g, ' $1')}
//                 />
//               ))}
//             </>
//           ) : (
//             <>
//               <h2 className="text-2xl font-bold text-green-700">{student?.fullName}</h2>
//               <p className="text-gray-600">{student?.email}</p>
//               <p className="text-gray-600">{student?.phone}</p>
//               <p className="text-gray-600">{student?.address}</p>
//               <p className="text-gray-600">Semester: {student?.semester}</p>
//               <p className="text-gray-600">Level: {student?.currentLevel}</p>
//             </>
//           )}

//           <div className="flex gap-4 mt-6">
//             {isEditing ? (
//               <>
//                 <button
//                   onClick={handleUpdateProfile}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
//                 >
//                   <CheckCircle size={18} />
//                   Save
//                 </button>
//                 <button
//                   onClick={() => {
//                     setIsEditing(false);
//                     setUpdatedStudent(student || {});
//                   }}
//                   className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
//                 >
//                   <XCircle size={18} />
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all"
//               >
//                 <Edit size={18} />
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="absolute inset-0 rounded-3xl border-2 border-green-300 opacity-20 animate-pulse"></div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfilePage;


'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Edit } from 'lucide-react';

interface Student {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  semester?: string;
  currentLevel?: string;
  [key: string]: any;
}

const StudentProfilePage = () => {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studentId, setStudentId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState<Student>({});

  // Extract token and decode studentId
  useEffect(() => {
    const token = localStorage.getItem("studentToken");

    if (!token) {
      router.push("/studentLogin");
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);

      if (decoded?.studentId) {
        setStudentId(decoded.studentId);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/login");
    }
  }, [router]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://forestryapi.onrender.com/students/${studentId}`);
        if (!response.ok) throw new Error("Failed to fetch student profile.");

        const data = await response.json();
        setStudent(data);
        setUpdatedStudent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchProfile();
  }, [studentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`https://forestryapi.onrender.com/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const result = await response.json();
      setStudent(result.updatedStudent);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white border border-green-400 rounded-3xl p-8 shadow-2xl max-w-md w-full text-center relative overflow-hidden transition-all duration-500">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full border-4 border-green-400 overflow-hidden">
            <img src="/avatar-placeholder.png" alt="Student Avatar" className="w-full h-full object-cover" />
          </div>

          {isEditing ? (
            <>
              {['fullName', 'email', 'phone', 'address', 'semester', 'currentLevel'].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={updatedStudent[field] || ''}
                  onChange={handleInputChange}
                  className="bg-gray-100 rounded-lg p-2 w-full focus:outline-green-400"
                  placeholder={field.replace(/([A-Z])/g, ' $1')}
                />
              ))}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-green-700">{student?.fullName}</h2>
              <p className="text-gray-600">{student?.email}</p>
              <p className="text-gray-600">{student?.phone}</p>
              <p className="text-gray-600">{student?.address}</p>
              <p className="text-gray-600">Semester: {student?.semester}</p>
              <p className="text-gray-600">Level: {student?.currentLevel}</p>
            </>
          )}

          <div className="flex gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                >
                  <CheckCircle size={18} />
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setUpdatedStudent(student || {});
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                >
                  <XCircle size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  console.log("Edit clicked");
                  setIsEditing(true);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="absolute inset-0 rounded-3xl border-2 border-green-300 opacity-20 animate-pulse pointer-events-none"></div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
