import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { fetchStudents, exportStudents } from "../services/adminApi";



const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await fetchStudents({ course, search });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, [course, search]);

  const handleExport = async () => {
  try {
    const res = await exportStudents({ course, search });

    const blob = new Blob([res.data], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "students.xlsx");
    document.body.appendChild(link);
    link.click();

    link.remove();
  } catch (error) {
    console.error("Export failed", error);
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
    
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">
          Student Enrollments
        </h1>

        {/* 🔍 Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or email"
            className="input flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input md:w-64"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">All Courses</option>
            <option value="C Language">C Language</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
          </select>
        </div>

          <div className="flex justify-end mb-4">
  <button
    onClick={handleExport}
    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  >
    Export to Excel
  </button>
</div>

        {/* 📋 Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {loading ? (
            <p className="p-6">Loading...</p>
          ) : students.length === 0 ? (
            <p className="p-6 text-center text-gray-500">
              No students found
            </p>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Courses</th>
                  <th className="px-4 py-3">Batch</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{s.fullName}</td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3">{s.mobile}</td>
                    <td className="px-4 py-3 space-x-1">
                      {s.courses.map((c) => (
                        <span
                          key={c}
                          className="inline-block bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-xs"
                        >
                          {c}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-3">{s.batchPreference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
