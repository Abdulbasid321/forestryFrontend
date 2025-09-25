'use client';

import React, { useState, useEffect } from 'react';
import axios from '../../../../lib/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Populated types
type LecturerPopulated = { _id: string; fullName?: string; email?: string; name?: string };
type DepartmentPopulated = { _id: string; name: string };
type LevelPopulated = { _id: string; name: string };

// Course type can have string ID or populated object
type Course = {
  _id: string;
  courseCode: string;
  courseTitle: string;
  creditUnits: number;
  lecturer: string | LecturerPopulated;
  level: string | LevelPopulated;
  semester: string;
  department: string | DepartmentPopulated;
};

// Dropdown lists are always simple name/ID pairs
type Lecturer = { _id: string; name: string };
type Department = { _id: string; name: string };

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state: all strings (IDs or raw values)
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [creditUnits, setCreditUnits] = useState<number>(0);
  const [lecturer, setLecturer] = useState('');
  const [level, setLevel] = useState('');
  const [semester, setSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
    fetchLecturers();
    fetchDepartments();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://forestryapi.onrender.com/courses');
      setCourses(res.data);
    } catch {
      toast.error('Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLecturers = async () => {
    try {
      const res = await axios.get('https://forestryapi.onrender.com/lecturers');
      setLecturers(res.data);
    } catch {
      toast.error('Failed to fetch lecturers.');
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('https://forestryapi.onrender.com/departments');
      setDepartments(res.data);
    } catch {
      toast.error('Failed to fetch departments.');
    }
  };

  const openModal = (course?: Course) => {
    if (course) {
      setEditId(course._id);
      setCourseCode(course.courseCode);
      setCourseTitle(course.courseTitle);
      setCreditUnits(course.creditUnits);

      // Normalize to ID for form
      setLecturer(typeof course.lecturer === 'object' ? course.lecturer._id : course.lecturer);
      setLevel(typeof course.level === 'object' ? course.level._id : course.level);
      setSemester(course.semester);
      setDepartment(typeof course.department === 'object' ? course.department._id : course.department);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setCourseCode('');
    setCourseTitle('');
    setCreditUnits(0);
    setLecturer('');
    setLevel('');
    setSemester('');
    setDepartment('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseCode || !courseTitle || isNaN(creditUnits)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const courseData = {
      courseCode,
      courseTitle,
      creditUnits,
      lecturer,
      level,
      semester,
      department,
    };

    try {
      if (editId) {
        await axios.put(`https://forestryapi.onrender.com/courses/${editId}`, courseData);
        toast.success('Course updated.');
      } else {
        await axios.post('https://forestryapi.onrender.com/courses', courseData);
        toast.success('Course created.');
      }
      fetchCourses();
      closeModal();
    } catch {
      toast.error('Failed to save course.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`https://forestryapi.onrender.com/courses/${id}`);
      toast.success('Course deleted.');
      fetchCourses();
    } catch {
      toast.error('Failed to delete course.');
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <button
          onClick={() => openModal()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Course
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">
                {course.courseTitle} ({course.courseCode})
              </h3>
              <p>Credit Units: {course.creditUnits}</p>
              <p>
                Lecturer:{' '}
                {typeof course.lecturer === 'object'
                  ? course.lecturer.fullName || course.lecturer.email || course.lecturer.name || 'N/A'
                  : course.lecturer}
              </p>
              <p>
                Level:{' '}
                {typeof course.level === 'object'
                  ? course.level.name || 'N/A'
                  : course.level}
              </p>
              <p>Semester: {course.semester}</p>
              <p>
                Department:{' '}
                {typeof course.department === 'object'
                  ? course.department.name || 'N/A'
                  : course.department}
              </p>
              <div className="flex gap-3 justify-end mt-2">
                <button
                  onClick={() => openModal(course)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editId ? 'Edit Course' : 'Add New Course'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Course Code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Course Title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Credit Units"
                value={creditUnits}
                onChange={(e) => setCreditUnits(Number(e.target.value))}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <select
                value={lecturer}
                onChange={(e) => setLecturer(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Lecturer</option>
                {lecturers.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.name}
                  </option>
                ))}
              </select>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Level</option>
                {/* {[100, 200, 300, 400].map((lvl) => ( */}
                  {["NDI", "ND2"].map((lvl) => (
                  <option key={lvl} value={String(lvl)}>
                    {lvl} Level
                  </option>
                ))}
              </select>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Semester</option>
                <option value="First Semester">First Semester</option>
                <option value="Second Semester">Second Semester</option>
              </select>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoursesPage;
