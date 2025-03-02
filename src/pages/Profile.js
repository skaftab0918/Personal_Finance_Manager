import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { 'x-auth-token': token },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data.message);
        navigate('/login'); // Redirect to login if unauthorized
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <Link to="/edit-profile" className="edit-profile-button">
        Edit Profile
      </Link>
    </div>
  );
};

export default Profile;