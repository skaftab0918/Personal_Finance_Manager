//-----------------------------------------------
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import '../styles/Home.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section" data-aos="fade-up">
        <h1>Welcome to the Personal Finance Manager</h1>
        <p>Take control of your finances with our easy-to-use tools.</p>
        <Link to="/register" className="cta-button">
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 data-aos="fade-up">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <h3>Track Expenses</h3>
            <p>Easily track your daily expenses and categorize them for better insights.</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
            <h3>Set Budgets</h3>
            <p>Create and manage budgets to achieve your financial goals.</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
            <h3>Visualize Data</h3>
            <p>View your financial data in interactive charts and graphs.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2 data-aos="fade-up">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
            <p>"This app has completely changed how I manage my finances. Highly recommended!"</p>
            <p className="author">- sk</p>
          </div>
          <div className="testimonial-card" data-aos="fade-up" data-aos-delay="400">
            <p>"The budgeting tools are fantastic. I’ve saved so much money since I started using it."</p>
            <p className="author">- SK</p>
          </div>
          <div className="testimonial-card" data-aos="fade-up" data-aos-delay="600">
            <p>"The charts make it so easy to understand where my money is going. Love it!"</p>
            <p className="author">- Aftab</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer" data-aos="fade-up">
        <p>© 2025 Personal Finance Manager . Developed by Aftab sk.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;