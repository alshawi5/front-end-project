import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
// same as the template 
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 32px',
    height: '60px',
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    color: '#e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    flexWrap: 'wrap',
  };

  const logoStyle = {
    fontSize: '18px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #818cf8, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.3px',
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '6px',
    padding: 0,
    margin: 0,
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const liStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '14px',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'background 0.2s, color 0.2s',
  };

  const buttonStyle = {
    padding: '7px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(239,68,68,0.4)',
    cursor: 'pointer',
    background: 'rgba(239,68,68,0.12)',
    color: '#f87171',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'background 0.2s',
  };

  const usernameStyle = {
    fontWeight: '600',
    fontSize: '14px',
    color: '#e2e8f0',
    padding: '6px 12px',
    background: 'rgba(99,102,241,0.12)',
    borderRadius: '8px',
    border: '1px solid rgba(99,102,241,0.2)',
  };

  return (
    <nav style={navStyle}>
      <span style={logoStyle}>📚 LibraryApp</span>
      {user ? (
        <ul style={ulStyle}>
          <li style={liStyle}>
            <span style={usernameStyle}>
              {user.username}{user.role === 'admin' && ' · Admin'}
            </span>
          </li>

          <li style={liStyle}>
            <Link style={linkStyle} to="/">Dashboard</Link>
          </li>

          <li style={liStyle}>
            <Link style={linkStyle} to="/books">Books</Link>
          </li>

          <li style={liStyle}>
            <Link style={linkStyle} to="/borrow">Borrow</Link>
          </li>

          <li style={liStyle}>
            <button style={buttonStyle} onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      ) : (
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link style={linkStyle} to="/">Home</Link>
          </li>

          <li style={liStyle}>
            <Link style={linkStyle} to="/sign-in">Sign In</Link>
          </li>

          <li style={liStyle}>
            <Link style={linkStyle} to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

// modfiyed the nav bar 

export default NavBar;
