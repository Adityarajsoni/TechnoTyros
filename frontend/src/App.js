import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './Components/Contact';
import Features from './Components/Features';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp';
import QuestionGenerator from './Components/QuestionGenerator';
import ClassDashboard from './Components/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/SignUp' element={<><SignUp/><Footer /></>} />
      </Routes>
      <Routes>
        <Route path="/" element={<><Navbar/><Features /><Contact /><Footer /></>} />
        <Route path="/QuestionGenerator" element={<QuestionGenerator />} />
        <Route path='/Dashboard' element={<ClassDashboard/>} />
      </Routes>
      
    </Router>
  );
}

export default App;
