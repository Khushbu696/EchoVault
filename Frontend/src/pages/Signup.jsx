import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Signup.css'

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/sign_up', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="signup">
      <div className="signup-form">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {error && <p style={{color: "red"}}>{error}</p>}
          <button className='signup-btn' type="submit"> Sign up </button>
        </form>

        <div className="other">
          <p>Already have an account? <Link to="/login">Login</Link> </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
