import React from 'react';
import './CollegeList.css';
import { FaUniversity, FaMapMarkerAlt, FaUserGraduate } from 'react-icons/fa';

const CollegeList = ({ colleges, fetchColleges, setEditingCollege, toast }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/colleges/${id}`, { method: 'DELETE' });
      fetchColleges();
      toast.success('College deleted successfully!');
    } catch (error) {
      console.error('Error deleting college:', error);
      toast.error('Failed to delete college!');
    }
  };

  return (
    <div className="college-list-container">
      <h2>College Records</h2>
      {colleges.length === 0 ? (
        <p className="no-data">No colleges available.</p>
      ) : (
        <div className="college-grid">
          {colleges.map((college) => (
            <div key={college.id} className="college-card">
              <div className="college-details">
                <h3>{college.name}</h3>
                <p><FaMapMarkerAlt /> {college.location}</p>
                <p><FaUniversity /> {college.university}</p>
                <p><FaUserGraduate /> {college.studentCount} Students</p>
                <p><strong>Principal:</strong> {college.principalName}</p>
                <p><strong>Year:</strong> {college.establishedYear}</p>
                <p><strong>Accreditation:</strong> {college.accreditation}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingCollege(college)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(college.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeList;
