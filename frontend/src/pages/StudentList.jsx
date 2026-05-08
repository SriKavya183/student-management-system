import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllStudents, deleteStudent } from '../services/api'

function gpaColor(gpa) {
  if (gpa >= 9) return 'text-green-600'
  if (gpa >= 7.5) return 'text-blue-600'
  if (gpa >= 6) return 'text-yellow-600'
  return 'text-red-500'
}

function StudentList() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchStudents = async (query = '') => {
    setLoading(true)
    setError(null)
    try {
      const res = await getAllStudents(query)
      const data = Array.isArray(res.data) ? res.data : res.data.results ?? []
      setStudents(data)
    } catch {
      setError('Failed to fetch students. Is the Django server running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchStudents(search)
  }

  const handleClear = () => {
    setSearch('')
    fetchStudents('')
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete student "${name}"? This action cannot be undone.`)) return
    setDeletingId(id)
    try {
      await deleteStudent(id)
      setStudents((prev) => prev.filter((s) => s.student_id !== id))
    } catch {
      alert('Failed to delete student.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {loading ? 'Loading...' : `${students.length} student${students.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
        <Link
          to="/students/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm inline-block text-center"
        >
          + Add Student
        </Link>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, ID, department, or gender..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Search
        </button>
        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Clear
          </button>
        )}
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center h-40 text-gray-400">
          Loading students...
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">ID</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Age</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Gender</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Department</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Semester</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">GPA</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-16 text-gray-400">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.student_id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-gray-500 text-xs">{student.student_id}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                      <td className="px-4 py-3 text-gray-600">{student.age}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            student.gender === 'Male'
                              ? 'bg-blue-100 text-blue-700'
                              : student.gender === 'Female'
                              ? 'bg-pink-100 text-pink-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {student.gender}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">
                          {student.department}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">Sem {student.semester}</td>
                      <td className={`px-4 py-3 font-semibold ${gpaColor(student.gpa)}`}>
                        {student.gpa}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/students/${student.student_id}`}
                            className="text-blue-600 hover:underline text-xs font-medium"
                          >
                            View
                          </Link>
                          <Link
                            to={`/students/${student.student_id}/edit`}
                            className="text-green-600 hover:underline text-xs font-medium"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(student.student_id, student.name)}
                            disabled={deletingId === student.student_id}
                            className="text-red-500 hover:underline text-xs font-medium disabled:opacity-50"
                          >
                            {deletingId === student.student_id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentList
