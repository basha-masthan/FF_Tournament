import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '', phone: '' });
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Define once here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setIsError(true);
      setMessage('Phone number must be 10 digits');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/register`, formData);
      setMessage(response.data.message);
      setShowOtpInput(true);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Signup failed');
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/verify-otp`, { email: formData.email, otp });
      setMessage(response.data.message);
      navigate('/login');
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'OTP verification failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>Sign Up</h1>
      {!showOtpInput ? (
        <form onSubmit={handleSignup}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          </div>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a unique username" required />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your 10-digit phone number" required />
          </div>
          {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
          <button type="submit" disabled={isLoading}>{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div>
            <label>Enter OTP:</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" required />
          </div>
          {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
          <button type="submit" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify OTP'}</button>
        </form>
      )}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;