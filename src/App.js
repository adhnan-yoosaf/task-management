import 'bootstrap/dist/css/bootstrap.min.css';
import './dark-theme.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import ListUsers from './admin/pages/ListUsers';
import CreateTask from './admin/pages/CreateTask';
import ListTask from './admin/pages/ListTask';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './utils/ProtectedRoute';
import ChangePassword from './pages/ChangePassword';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer autoClose={1000} closeOnClick position='top-right' theme='dark'/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/list-users' element={<ProtectedRoute requiredRole={'admin'}><ListUsers /></ProtectedRoute>} />
        <Route path='/admin/create-task' element={<ProtectedRoute requiredRole={'admin'}><CreateTask /></ProtectedRoute>} />
        <Route path='/admin/list-tasks' element={<ProtectedRoute requiredRole={'admin'}><ListTask /></ProtectedRoute>} />
        <Route path='/user-profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path='/change-password' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}
export default App;
