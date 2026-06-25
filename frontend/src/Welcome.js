import './styles/Welcome.css';

function Welcome({ onSignup, onLogin }) {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to PopX</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <button className="btn btn-primary" onClick={onSignup}>
          Create Account
        </button>

        <button className="btn btn-secondary" onClick={onLogin}>
          Already Registered? Login
        </button>
      </div>
    </div>
  );
}

export default Welcome;
