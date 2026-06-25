import { useState } from 'react';
import './styles/Signup.css';

function Signup({ onBack, onLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: 'yes',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (!validatePhone(value)) error = 'Phone must have at least 10 digits';
        break;
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
    const fieldsToValidate = ['fullName', 'phone', 'email', 'password'];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        fullName: true,
        phone: true,
        email: true,
        password: true,
      });
      return;
    }

    alert('Account created successfully!');
    console.log('Form Data:', formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1>Create your PopX account</h1>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Marry Doe"
              className={errors.fullName && touched.fullName ? 'input-error' : ''}
            />
            {errors.fullName && touched.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phone">Phone number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Marry Doe"
              className={errors.phone && touched.phone ? 'input-error' : ''}
            />
            {errors.phone && touched.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Marry Doe"
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            {errors.email && touched.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Marry Doe"
              className={errors.password && touched.password ? 'input-error' : ''}
            />
            {errors.password && touched.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Company Name */}
          <div className="form-group">
            <label htmlFor="company">Company name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Marry Doe"
            />
          </div>

          {/* Agency Radio */}
          <div className="form-group">
            <label>Are you an Agency?*</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="agencyYes"
                  name="isAgency"
                  value="yes"
                  checked={formData.isAgency === 'yes'}
                  onChange={handleChange}
                />
                <label htmlFor="agencyYes">Yes</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="agencyNo"
                  name="isAgency"
                  value="no"
                  checked={formData.isAgency === 'no'}
                  onChange={handleChange}
                />
                <label htmlFor="agencyNo">No</label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account?{' '}
          <button onClick={onLogin} className="link-button">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
