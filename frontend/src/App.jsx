import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import StudentList from './pages/StudentList'
import StudentDetail from './pages/StudentDetail'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
          <Route path="/students/:id" element={<StudentDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
