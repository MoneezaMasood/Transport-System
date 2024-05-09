import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import AdminComponent from './components/AdminComponent';
import FacultyComponent from './components/FacultyComponent';
import StudentComponent from './components/StudentComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/faculty" element={<FacultyComponent />} />
        <Route path="/student" element={<StudentComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
