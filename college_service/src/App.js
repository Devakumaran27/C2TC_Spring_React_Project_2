import React, { useState, useEffect } from 'react';
import './App.css';
import CollegeForm from './components/CollegeForm';
import CollegeList from './components/CollegeList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [colleges, setColleges] = useState([]);
  const [editingCollege, setEditingCollege] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/colleges');
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
    setLoading(false);
  };

  const filteredColleges = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>College Management System</h1>

      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <CollegeForm
        fetchColleges={fetchColleges}
        editingCollege={editingCollege}
        setEditingCollege={setEditingCollege}
        toast={toast}
      />

      <input
        type="text"
        placeholder="Search by Name or University..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {loading ? (
        <div className="loader"></div>
      ) : (
        <CollegeList
          colleges={filteredColleges}
          fetchColleges={fetchColleges}
          setEditingCollege={setEditingCollege}
          toast={toast}
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
