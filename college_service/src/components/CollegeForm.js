import React, { useState, useEffect } from 'react';
import './CollegeForm.css';

const CollegeForm = ({ fetchColleges, editingCollege, setEditingCollege, toast }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [university, setUniversity] = useState('');
  const [principalName, setPrincipalName] = useState('');
  const [establishedYear, setEstablishedYear] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [accreditation, setAccreditation] = useState('');

  useEffect(() => {
    if (editingCollege) {
      setId(editingCollege.id);
      setName(editingCollege.name);
      setLocation(editingCollege.location);
      setUniversity(editingCollege.university);
      setPrincipalName(editingCollege.principalName);
      setEstablishedYear(editingCollege.establishedYear);
      setStudentCount(editingCollege.studentCount);
      setAccreditation(editingCollege.accreditation);
    } else {
      setId('');
      setName('');
      setLocation('');
      setUniversity('');
      setPrincipalName('');
      setEstablishedYear('');
      setStudentCount('');
      setAccreditation('');
    }
  }, [editingCollege]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const college = { id, name, location, university, principalName, establishedYear, studentCount, accreditation };

    try {
      if (editingCollege) {
        await fetch(`http://localhost:8080/colleges/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(college),
        });
        toast.success('College updated successfully!');
      } else {
        await fetch('http://localhost:8080/colleges', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(college),
        });
        toast.success('College added successfully!');
      }
      fetchColleges();
      setEditingCollege(null);
    } catch (error) {
      console.error('Error saving college:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <h2>{editingCollege ? 'Edit College' : 'Add College'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="College Name" required />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
        <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="University" required />
        <input type="text" value={principalName} onChange={(e) => setPrincipalName(e.target.value)} placeholder="Principal Name" required />
        <input type="number" value={establishedYear} onChange={(e) => setEstablishedYear(e.target.value)} placeholder="Established Year" required />
        <input type="number" value={studentCount} onChange={(e) => setStudentCount(e.target.value)} placeholder="Student Count" required />
        <input type="text" value={accreditation} onChange={(e) => setAccreditation(e.target.value)} placeholder="Accreditation" required />
        <button type="submit">{editingCollege ? 'Update College' : 'Add College'}</button>
      </form>
    </div>
  );
};

export default CollegeForm;
