import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chapter from './pages/Chapter';
import Course from './pages/Course';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Course/>} />
        <Route path="/course/:id" element={<Chapter/>} />
      </Routes>
    </Router>
);
}

export default App