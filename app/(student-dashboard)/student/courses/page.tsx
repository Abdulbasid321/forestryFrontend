// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from '../../../../lib/axios';// adjust path as needed
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// type Course = {
//   _id: string;
//   courseTitle: string;
//   lecturer: {
//     fullName: string;
//     email: string;
//   };
//   creditUnits: number;
// };

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const storedStudent = localStorage.getItem('studentInfo');
//         if (!storedStudent) {
//           toast.error('No student info found. Please log in again.');
//           return;
//         }

//         const student = JSON.parse(storedStudent);
//         const studentId = student._id;

//         const res = await axios.get(`/courses/student/${studentId}`);
//         // setCourses(res.data);
//         setCourses(res.data.courses || []); // ✅ Correct

//       } catch (error: any) {
//         toast.error('Failed to load courses: ' + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
//       <header className="mb-8 text-center">
//         <h1 className="text-4xl font-extrabold text-green-900 mb-2">Your Courses This Semester</h1>
//         <p className="text-green-700 text-lg">Check out your assigned courses with lecturers and credits</p>
//       </header>

//       {loading ? (
//         <p className="text-center text-green-800 text-lg">Loading courses...</p>
//       ) : courses.length === 0 ? (
//         <p className="text-center text-red-600 text-lg">No courses found for this semester.</p>
//       ) : (
//         <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {courses.map((course) => (
//             <div
//               key={course._id}
//               className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
//               role="button"
//               tabIndex={0}
//               aria-label={`Course ${course.courseTitle}, ${course.creditUnits} credit units`}
//             >
//               <h2 className="text-xl font-semibold text-green-800 mb-2">{course.courseTitle}</h2>
//               <p className="text-green-600 mb-1">
//                 <span className="font-medium">Lecturer:</span>{' '}
//                 {course.lecturer?.fullName || 'N/A'}
//               </p>
//               <p className="text-green-600">
//                 <span className="font-medium">Credit Units:</span> {course.creditUnits}
//               </p>
//             </div>
//           ))}
//         </main>
//       )}
//     </div>
//   );
// };

// export default StudentCoursesPage;


'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../../lib/axios'; // Adjust path as needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Course = {
  _id: string;
  courseTitle: string;
  lecturer: {
    fullName?: string;
    email: string;
  };
  creditUnits: number;
};

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const storedStudent = localStorage.getItem('studentInfo');
        if (!storedStudent) {
          toast.error('No student info found. Please log in again.');
          setCourses([]);
          return;
        }

        const student = JSON.parse(storedStudent);
        const studentId = student._id;

        const res = await axios.get(`https://forestryapi.onrender.com/courses/student/${studentId}`);
        setCourses(res.data.courses || []);
      } catch (error: any) {
        console.error("Error fetching courses:", error);
        toast.error('Failed to load courses: ' + (error.response?.data?.error || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-green-900 mb-2">Your Courses This Semester</h1>
        <p className="text-green-700 text-lg">
          Check out your assigned courses with lecturers and credits
        </p>
      </header>

      {loading ? (
        <p className="text-center text-green-800 text-lg">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-red-600 text-lg">No courses found for this semester.</p>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
              role="button"
              tabIndex={0}
              aria-label={`Course ${course.courseTitle}, ${course.creditUnits} credit units`}
            >
              <h2 className="text-xl font-semibold text-green-800 mb-2">{course.courseTitle}</h2>
              <p className="text-green-600 mb-1">
                <span className="font-medium">Lecturer:</span>{' '}
                {course.lecturer?.fullName || course.lecturer?.email || 'N/A'}
              </p>
              <p className="text-green-600">
                <span className="font-medium">Credit Units:</span> {course.creditUnits}
              </p>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};

export default StudentCoursesPage;
