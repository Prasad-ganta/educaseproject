import { useState } from 'react';
import './styles/Login.css';

function Login({ onBack, onSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value.trim()) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const fieldsToValidate = ['email', 'password'];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        email: true,
        password: true,
      });
      return;
    }

    alert('Login successful!');
    console.log('Login Data:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Signin to your PopX account</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter email address"
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            {errors.email && touched.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              className={errors.password && touched.password ? 'input-error' : ''}
            />
            {errors.password && touched.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn btn-login btn-full">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don&apos;t have an account?{' '}
          <button onClick={onSignup} className="link-button">
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
