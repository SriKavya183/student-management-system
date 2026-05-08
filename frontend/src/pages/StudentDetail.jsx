import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getStudentById, deleteStudent } from '../services/api'

function gpaLabel(gpa) {
  if (gpa >= 9) return { label: 'Excellent', cls: 'bg-green-100 text-green-800' }
  if (gpa >= 7.5) return { label: 'Good', cls: 'bg-blue-100 text-blue-800' }
  if (gpa >= 6) return { label: 'Average', cls: 'bg-yellow-100 text-yellow-800' }
  return { label: 'Below Average', cls: 'bg-red-100 text-red-800' }
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <div className="text-gray-800 font-medium">{children}</div>
    </div>
  )
}

function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStudentById(id)
      .then((res) => setStudent(res.data))
      .catch(() => setError('Student not found.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm(`Delete student "${student.name}"? This cannot be undone.`)) return
    try {
      await deleteStudent(id)
      navigate('/students')
    } catch {
      alert('Failed to delete student.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400">
        Loading student details...
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
        <Link to="/students" className="text-blue-600 hover:underline text-sm">
          Back to Students
        </Link>
      </div>
    )
  }

  const { label, cls } = gpaLabel(student.gpa)

  return (
    <div className="max-w-2xl space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        <Link to="/students" className="hover:text-gray-600">Students</Link>
        <span>/</span>
        <span className="text-gray-600">{student.name}</span>
      </nav>

      <div className="bg-white rounded-xl shadow p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
            <p className="text-gray-400 font-mono text-sm mt-1">{student.student_id}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${cls}`}>
              GPA {student.gpa}
            </span>
            <p className="text-xs text-gray-400 mt-1">{label}</p>
          </div>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-6">
          <Field label="Age">{student.age} years</Field>
          <Field label="Gender">
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                student.gender === 'Male'
                  ? 'bg-blue-100 text-blue-700'
                  : student.gender === 'Female'
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {student.gender}
            </span>
          </Field>
          <Field label="Department">
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">
              {student.department}
            </span>
          </Field>
          <Field label="Semester">Semester {student.semester}</Field>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8 pt-6 border-t">
          <Link
            to={`/students/${student.student_id}/edit`}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Edit Student
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            Delete
          </button>
          <Link
            to="/students"
            className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail
