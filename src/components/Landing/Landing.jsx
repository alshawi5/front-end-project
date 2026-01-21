const Landing = () => {
  const containerStyle = {
    maxWidth: '700px',
    margin: '80px auto',
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#f3f4f6',
    boxShadow: '0 6px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '36px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '20px',
  };

  const textStyle = {
    fontSize: '18px',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '12px 24px',
    margin: '0 10px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    color: '#fff',
  };
  // landing same as template 
  const signUpButton = { ...buttonStyle, backgroundColor: '#16a34a' };
  const signInButton = { ...buttonStyle, backgroundColor: '#2563eb' };

  return (
    <main style={containerStyle}>
      <h1 style={headingStyle}>Welcome to the Library</h1>
      <p style={textStyle}>
        Sign up now, or sign in to see your super secret dashboard and start borrowing books!
      </p>
      <div>
        <button
          style={signUpButton}
          onClick={() => (window.location.href = '/sign-up')}
        >
          Sign Up
        </button>
        <button
          style={signInButton}
          onClick={() => (window.location.href = '/sign-in')}
        >
          Sign In
        </button>
      </div>
    </main>
  );
};

export default Landing;
