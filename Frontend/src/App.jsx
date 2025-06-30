import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateCapsule from './pages/CreateCapsule';
import CapsuleViewer from './pages/CapsuleViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about_us" element={<About/>} />
        <Route path="/contact_us" element={<Contact/>} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateCapsule />} />
        <Route path="/capsules/:id" element={<CapsuleViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
