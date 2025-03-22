import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Define once here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post(`${API_URL}/api/login`, formData);
      setMessage(response.data.message);
      navigate('/home');
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>
        {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Need an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;