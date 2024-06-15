import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile';
import AuthState from './context/auth/AuthState';
import QuizState from './context/quiz/QuizState';
import Spin from './components/Spin';
import Quiz from './components/Quiz';


function App() {
  return (
    <div className='bg-secondary min-h-screen'>
      <Router>
        <AuthState>
          <QuizState>

            <Navbar />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/' element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/spin" element={<Spin />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </QuizState>
        </AuthState>
      </Router>
    </div>
  );
}

export default App;
