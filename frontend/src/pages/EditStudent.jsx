import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getStudentById, updateStudent } from '../services/api'

const DEPARTMENTS = ['CSE', 'ECE', 'IT', 'EEE', 'MECH', 'CIVIL']

function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getStudentById(id)
      .then((res) => {
        const s = res.data
        setForm({
          student_id: s.student_id,
          name: s.name,
          age: String(s.age),
          gender: s.gender,
          department: s.department,
          semester: String(s.semester),
          gpa: String(s.gpa),
        })
      })
      .catch(() => {
        alert('Student not found.')
        navigate('/students')
      })
      .finally(() => setLoading(false))
  }, [id])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    const age = Number(form.age)
    if (!form.age || isNaN(age) || age < 15 || age > 35)
      errs.age = 'Age must be between 15 and 35.'
    if (!form.gender) errs.gender = 'Gender is required.'
    if (!form.department) errs.department = 'Department is required.'
    const sem = Number(form.semester)
    if (!form.semester || isNaN(sem) || sem < 1 || sem > 8)
      errs.semester = 'Semester must be between 1 and 8.'
    const gpa = Number(form.gpa)
    if (!form.gpa || isNaN(gpa) || gpa < 0 || gpa > 10)
      errs.gpa = 'GPA must be between 0.0 and 10.0.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    try {
      await updateStudent(id, {
        ...form,
        age: parseInt(form.age),
        semester: parseInt(form.semester),
        gpa: parseFloat(form.gpa),
      })
      navigate(`/students/${id}`)
    } catch (err) {
      const data = err.response?.data
      if (data && typeof data === 'object') {
        const serverErrs = {}
        Object.entries(data).forEach(([key, val]) => {
          serverErrs[key] = Array.isArray(val) ? val[0] : String(val)
        })
        setErrors(serverErrs)
      } else {
        alert('Failed to update student. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = (field) =>
    `w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400">
        Loading student data...
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        <Link to="/students" className="hover:text-gray-600">Students</Link>
        <span>/</span>
        <Link to={`/students/${id}`} className="hover:text-gray-600">{form?.name}</Link>
        <span>/</span>
        <span className="text-gray-600">Edit</span>
      </nav>

      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          Edit Student — {form?.student_id}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                value={form?.student_id ?? ''}
                disabled
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
              <p className="text-gray-400 text-xs mt-1">Student ID cannot be changed.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form?.name ?? ''}
                onChange={handleChange}
                className={inputCls('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                name="age"
                type="number"
                value={form?.age ?? ''}
                onChange={handleChange}
                min="15"
                max="35"
                className={inputCls('age')}
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={form?.gender ?? ''}
                onChange={handleChange}
                className={inputCls('gender')}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={form?.department ?? ''}
                onChange={handleChange}
                className={inputCls('department')}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester <span className="text-red-500">*</span>
              </label>
              <input
                name="semester"
                type="number"
                value={form?.semester ?? ''}
                onChange={handleChange}
                min="1"
                max="8"
                className={inputCls('semester')}
              />
              {errors.semester && (
                <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA <span className="text-red-500">*</span>
              </label>
              <input
                name="gpa"
                type="number"
                step="0.1"
                value={form?.gpa ?? ''}
                onChange={handleChange}
                min="0"
                max="10"
                className={inputCls('gpa')}
              />
              {errors.gpa && (
                <p className="text-red-500 text-xs mt-1">{errors.gpa}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              to={`/students/${id}`}
              className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudent
