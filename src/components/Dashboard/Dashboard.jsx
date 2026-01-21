import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as testService from '../../services/testService';
// same as the template
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await testService.test();
        setMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) fetchTest();
  }, [user]);

  // Inline styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const headingStyle = {
    fontSize: '28px',
    color: '#111827',
    marginBottom: '10px',
  };

  const paragraphStyle = {
    fontSize: '16px',
    color: '#374151',
  };

  const messageStyle = {
    fontWeight: '600',
    color: '#2563eb',
    fontSize: '18px',
  };

  return (
    <main style={containerStyle}>
      <h1 style={headingStyle}>Welcome, {user.username}</h1>
      <p style={paragraphStyle}>
this is your best book store ever      </p>
      <p style={messageStyle}>{message}</p>
    </main>
  );
};

export default Dashboard;
