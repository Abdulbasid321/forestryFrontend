// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Users,
//   GraduationCap,
//   BookOpen,
//   Megaphone,
//   Trash2,
//   Pencil,
// } from "lucide-react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// interface Stats {
//   totalUsers: number;
//   totalDepartments: number;
//   totalCourses: number;
//   totalAnnouncements: number;
// }

// interface Announcement {
//   _id: string;
//   title: string;
//   message: string;
//   createdAt: string;
// }

// export default function AdminDashboardPage() {
//   const [stats, setStats] = useState<Stats>({
//     totalUsers: 0,
//     totalDepartments: 0,
//     totalCourses: 0,
//     totalAnnouncements: 0,
//   });

//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) {
//       router.replace("/login");
//     }
//   }, [router]);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const res = await fetch("/api/admin/stats");
//         const data = await res.json();
//         setStats(data);
//       } catch (error) {
//         console.error("Failed to fetch stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     async function fetchAnnouncements() {
//       try {
//         const res = await fetch("http://localhost:5000/announcements");
//         const data = await res.json();
//         setAnnouncements(data);
//       } catch (err) {
//         console.error("Failed to fetch announcements", err);
//       }
//     }

//     fetchStats();
//     fetchAnnouncements();
//   }, []);

//   async function handleDeleteAnnouncement(id: string) {
//     const confirm = window.confirm("Are you sure you want to delete this?");
//     if (!confirm) return;

//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await fetch(`http://localhost:5000/announcements/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         setAnnouncements((prev) => prev.filter((a) => a._id !== id));
//         alert("Announcement deleted");
//       } else {
//         const data = await res.json();
//         alert(data.error || "Failed to delete announcement");
//       }
//     } catch (err) {
//       alert("Server error deleting announcement");
//     }
//   }

//   if (loading) return <p className="text-center py-10">Loading dashboard...</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6 space-y-8">
//       {/* Header and Actions */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
//           Welcome Admin
//         </h1>
//         <div className="flex flex-col sm:flex-row gap-3">
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="bg-green-600 hover:bg-green-700">
//                 Create Announcement
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="space-y-4">
//               <h2 className="text-lg font-semibold">New Announcement</h2>
//               <Input
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               <Textarea
//                 placeholder="Write your message here..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <Button
//                 className="w-full bg-green-600 hover:bg-green-700"
//                 onClick={async () => {
//                   if (!title || !message) return alert("Please fill all fields.");
//                   setSubmitting(true);
//                   try {
//                     const token = localStorage.getItem("adminToken");
//                     const res = await fetch("http://localhost:5000/announcements", {
//                       method: "POST",
//                       headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                       },
//                       body: JSON.stringify({ title, message }),
//                     });
//                     const data = await res.json();
//                     if (res.ok) {
//                       alert("Announcement created.");
//                       setTitle("");
//                       setMessage("");
//                       setAnnouncements((prev) => [data.announcement, ...prev]);
//                     } else {
//                       alert(data.error || "Failed to create announcement");
//                     }
//                   } catch (err) {
//                     alert("Error creating announcement");
//                   } finally {
//                     setSubmitting(false);
//                   }
//                 }}
//                 disabled={submitting}
//               >
//                 {submitting ? "Submitting..." : "Submit"}
//               </Button>
//             </DialogContent>
//           </Dialog>
//           <Button variant="outline">Join Chat Forum</Button>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <StatCard
//           title="Users"
//           value={stats.totalUsers}
//           icon={<Users className="text-green-600 h-5 w-5" />}
//           color="bg-green-50"
//         />
//         <StatCard
//           title="Departments"
//           value={stats.totalDepartments}
//           icon={<GraduationCap className="text-blue-600 h-5 w-5" />}
//           color="bg-blue-50"
//         />
//         <StatCard
//           title="Courses"
//           value={stats.totalCourses}
//           icon={<BookOpen className="text-purple-600 h-5 w-5" />}
//           color="bg-purple-50"
//         />
//         <StatCard
//           title="Announcements"
//           value={stats.totalAnnouncements}
//           icon={<Megaphone className="text-orange-500 h-5 w-5" />}
//           color="bg-orange-50"
//         />
//       </div>

//       {/* 📢 Announcements Section */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//           <Megaphone className="w-5 h-5" /> Announcements
//         </h2>
//         {announcements.length === 0 ? (
//           <p className="text-gray-500">No announcements available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {announcements.map((announcement) => (
//               <li key={announcement._id} className="border-b pb-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold text-gray-800">
//                       • {announcement.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm">{announcement.message}</p>
//                     <p className="text-xs text-gray-400">
//                       {new Date(announcement.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       size="icon"
//                       variant="ghost"
//                       onClick={() => alert("Edit functionality coming soon")}
//                     >
//                       <Pencil className="w-4 h-4 text-blue-600" />
//                     </Button>
//                     <Button
//                       size="icon"
//                       variant="ghost"
//                       onClick={() => handleDeleteAnnouncement(announcement._id)}
//                     >
//                       <Trash2 className="w-4 h-4 text-red-600" />
//                     </Button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// function StatCard({
//   title,
//   value,
//   icon,
//   color,
// }: {
//   title: string;
//   value: number | string;
//   icon: React.ReactNode;
//   color: string;
// }) {
//   return (
//     <Card className={`${color} shadow-sm`}>
//       <CardHeader className="flex items-center gap-3">
//         {icon}
//         <CardTitle className="text-base text-gray-700">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//       </CardContent>
//     </Card>
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  GraduationCap,
  BookOpen,
  Megaphone,
  Trash2,
  Pencil,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Stats {
  totalUsers: number;
  totalDepartments: number;
  totalCourses: number;
  totalAnnouncements: number;
}

interface Announcement {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDepartments: 0,
    totalCourses: 0,
    totalAnnouncements: 0,
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("https://forestryapi.onrender.com/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    }

    async function fetchAnnouncements() {
      try {
        const res = await fetch("https://forestryapi.onrender.com/announcements");
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error("Error fetching announcements", err);
      }
    }

    fetchStats();
    fetchAnnouncements();
  }, []);

  const handleSubmit = async () => {
    if (!title || !message) return alert("Fill in all fields.");
    setSubmitting(true);
    const token = localStorage.getItem("adminToken");

    try {
      const method = editId ? "PUT" : "POST";
      const endpoint = editId
        ? `https://forestryapi.onrender.com/announcements/${editId}`
        : "https://forestryapi.onrender.com/announcements";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, message }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(editId ? "Announcement updated" : "Announcement created");
        setTitle("");
        setMessage("");
        setEditId(null);
        location.reload();
      } else {
        alert(data.error || "Failed to submit");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;
    try {
      await fetch(`https://forestryapi.onrender.com/announcements/${id}`, {
        method: "DELETE",
      });
      alert("Deleted");
      location.reload();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 space-y-10">
      {/* Header + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Welcome Admin
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                {editId ? "Edit Announcement" : "Create Announcement"}
              </Button>
            </DialogTrigger>
            <DialogContent className="space-y-4">
              <h2 className="text-lg font-semibold">
                {editId ? "Edit Announcement" : "New Announcement"}
              </h2>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Users" value={stats.totalUsers} icon={<Users />} color="bg-green-50" />
        <StatCard title="Departments" value={stats.totalDepartments} icon={<GraduationCap />} color="bg-blue-50" />
        <StatCard title="Courses" value={stats.totalCourses} icon={<BookOpen />} color="bg-purple-50" />
        <StatCard title="Announcements" value={stats.totalAnnouncements} icon={<Megaphone />} color="bg-orange-50" />
      </div>

      {/* 📢 Announcement List */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">📢 All Announcements</h3>
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li key={a._id} className="bg-gray-100 p-4 rounded flex justify-between items-start">
              <div>
                <p className="font-bold text-lg">{a.title}</p>
                <p className="text-gray-700">{a.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setTitle(a.title);
                    setMessage(a.message);
                    setEditId(a._id);
                  }}
                >
                  <Pencil size={16} />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(a._id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card className={`${color} shadow-sm`}>
      <CardHeader className="flex items-center gap-3">
        {icon}
        <CardTitle className="text-base text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
}
