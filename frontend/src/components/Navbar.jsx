import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-500'
    }`

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white text-lg font-bold tracking-tight">
            Student Management System
          </Link>
          <div className="flex items-center gap-2">
            <NavLink to="/" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/students" className={linkClass}>
              Students
            </NavLink>
            <Link
              to="/students/add"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              + Add Student
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
