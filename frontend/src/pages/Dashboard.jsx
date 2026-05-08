import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getStudentStats, getAllStudents } from '../services/api'

function StatCard({ title, value, borderColor }) {
  return (
    <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${borderColor}`}>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  )
}

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recentStudents, setRecentStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, studentsRes] = await Promise.all([
          getStudentStats(),
          getAllStudents(),
        ])
        setStats(statsRes.data)
        const list = Array.isArray(studentsRes.data)
          ? studentsRes.data
          : studentsRes.data.results ?? []
        setRecentStudents(list.slice(0, 5))
      } catch {
        setError('Failed to load data. Make sure the Django backend is running at http://localhost:8000.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of all student records</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats?.total ?? 0}
          borderColor="border-blue-500"
        />
        <StatCard
          title="Departments"
          value={stats?.departments ?? 0}
          borderColor="border-green-500"
        />
        <StatCard
          title="Average GPA"
          value={stats?.average_gpa ?? 0}
          borderColor="border-purple-500"
        />
        <StatCard
          title="Male / Female"
          value={`${stats?.male_count ?? 0} / ${stats?.female_count ?? 0}`}
          borderColor="border-orange-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Students</h2>
          <Link
            to="/students"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-gray-500 font-medium rounded-tl-lg">ID</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Department</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Semester</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium rounded-tr-lg">GPA</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map((student) => (
                <tr key={student.student_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-500 text-xs">{student.student_id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      {student.department}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">Sem {student.semester}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">{student.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
