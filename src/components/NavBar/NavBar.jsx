import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  // Inline styles
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: '#fff',
    flexWrap: 'wrap',
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '16px',
    padding: 0,
    margin: 0,
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const liStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
  };

  const buttonStyle = {
    padding: '6px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#f87171',
    color: '#fff',
    fontWeight: '500',
  };

  const usernameStyle = {
    fontWeight: '600',
  };

  return (
    <nav style={navStyle}>
      {user ? (
        <ul style={ulStyle}>
          <li style={liStyle}>
            <span style={usernameStyle}>
              Welcome, {user.username}
            </span>
            {user.role === 'admin' && <strong>(Admin)</strong>}
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

export default NavBar;
