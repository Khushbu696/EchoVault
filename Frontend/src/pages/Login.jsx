import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="signup">
      <div className="signup-form">
        <h2>Welcome back!</h2>

        <form onSubmit={handleSubmit}>
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
          {error && <p style={{color: 'red'}}>{error}</p>}
          <button className="signup-btn" type="submit">
            Login
          </button>
        </form>

        <div className="other">
          <p>Don't have an account? <Link to="/sign_up">Sign up</Link> </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
