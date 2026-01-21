import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  // Inline styles
  const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const headingStyle = {
    fontSize: '28px',
    color: '#111827',
    textAlign: 'center',
  };

  const messageStyle = {
    color: '#dc2626',
    textAlign: 'center',
    fontWeight: '500',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  };

  const buttonStyle = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#fff',
  };

  const signInButton = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
  };

  const cancelButton = {
    ...buttonStyle,
    backgroundColor: '#f87171',
  };

  return (
    <main style={containerStyle}>
      <h1 style={headingStyle}>Sign In</h1>
      {message && <p style={messageStyle}>{message}</p>}

      <form style={formStyle} autoComplete="off" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            style={inputStyle}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            style={inputStyle}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <div style={buttonContainerStyle}>
          <button type="submit" style={signInButton}>
            Sign In
          </button>
          <button
            type="button"
            style={cancelButton}
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;
