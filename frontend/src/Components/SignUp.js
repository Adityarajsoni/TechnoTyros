import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert("Signup successful! You can now log in.");
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Logo and Title */}
        <div className="logo-section">
          <i className='bx bx-wave logo-icon'></i>
          <h2>Sign in to your account</h2>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-group">
              <i className='bx bx-envelope'></i>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <i className='bx bx-lock-alt'></i>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="signin-button">
            Sign in
            <i className='bx bx-chevron-right'></i>
          </button>
        </form>

        {/* Social Sign In */}
        <div className="social-signin">
          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-buttons">
            <button className="social-button">
              <i className='bx bxl-google'></i>
              <span>Google</span>
            </button>
            <button className="social-button">
              <i className='bx bxl-github'></i>
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="signup-link">
          Not a member?{' '}
          <a href="#">Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;