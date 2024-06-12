import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile';
import AuthState from './context/auth/AuthState';
import Spin from './components/Spin';


function App() {
  return (
    <div>
      <Router>
        <AuthState>
          <Navbar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/spin" element={<Spin />} />
          </Routes>
        </AuthState>
      </Router>
    </div>
  );
}

export default App;
