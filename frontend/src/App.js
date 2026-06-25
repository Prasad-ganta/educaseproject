import React, { useState } from 'react';
import './style.css';
import Welcome from './Welcome';
import Signup from './Signup';
import Login from './Login';
import Testimonials from './Testimonials';

export default function App() {
  const [page, setPage] = useState('welcome');

  return (
    <div className="container">
      {page === 'welcome' && (
        <Welcome onSignup={() => setPage('signup')} onLogin={() => setPage('login')} onTestimonials={() => setPage('testimonials')} />
      )}
      {page === 'signup' && (
        <Signup onBack={() => setPage('welcome')} onLogin={() => setPage('login')} />
      )}
      {page === 'login' && (
        <Login onBack={() => setPage('welcome')} onSignup={() => setPage('signup')} />
      )}
      {page === 'testimonials' && (
        <Testimonials onBack={() => setPage('welcome')} />
      )}
    </div>
  );
}
