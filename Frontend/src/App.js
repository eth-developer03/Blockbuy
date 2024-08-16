import React from 'react';
import Home from './Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
// import CustomPricingCard from './Components/PriceCard';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
