"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  UserPenIcon,
  BookAIcon,
} from "lucide-react";

interface Counts {
  students: number;
  departments: number;
  teachers: number;
  courses: number;
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts>({
    students: 0,
    departments: 0,
    teachers: 0,
    courses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [studRes, deptRes, teachRes, coursesRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/departments"),
          fetch("/api/teachers"),
          fetch("/api/courses"),
        ]);
        if (!studRes.ok || !deptRes.ok || !teachRes.ok || !coursesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [studData, deptData, teachData, coursesData] = await Promise.all([
          studRes.json(),
          deptRes.json(),
          teachRes.json(),
          coursesRes.json(),
        ]);

        setCounts({
          students: studData.length,
          departments: deptData.length,
          teachers: teachData.length,
          courses: coursesData.length,
        });
      } catch (err: any) {
        setError(err.message || "Error loading dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading data: {error}
      </div>
    );
  }

  const cards = [
    {
      id: "students",
      title: "Students",
      count: counts.students,
      icon: <Users size={32} />,
      bg: "bg-green-500",
    },
    {
      id: "departments",
      title: "Departments",
      count: counts.departments,
      icon: <GraduationCap size={32} />,
      bg: "bg-blue-500",
    },
    {
      id: "teachers",
      title: "Teachers",
      count: counts.teachers,
      icon: <UserPenIcon size={32} />,
      bg: "bg-purple-500",
    },
    {
      id: "courses",
      title: "Courses",
      count: counts.courses,
      icon: <BookAIcon size={32} />,
      bg: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ id, title, count, icon, bg }) => (
          <div
            key={id}
            className={`${bg} text-white p-6 rounded-2xl shadow-lg flex items-center space-x-4 hover:scale-105 transform transition duration-200 ease-in-out`}
          >
            <div>{icon}</div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
