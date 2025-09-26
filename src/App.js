import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const locationRef = useRef(null);
  const contactRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    const phoneNumber = '9791562237';
    const message = 'Hello, I would like to know more about your auditing services.';
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to handle email click
  const handleEmailClick = () => {
    const email = 'subramaniassociateshsr@gmail.com';
    const subject = 'Auditing Services Inquiry';
    const body = 'Hello, I am interested in your auditing services. Please provide more information.';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  useEffect(() => {
    // Starfield animation
    const createStars = () => {
      const hero = heroRef.current;
      if (!hero) return;

      // Clear existing stars
      const existingStars = hero.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());

      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        hero.appendChild(star);
      }
    };

    createStars();

    // Scroll animations and section tracking
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          entry.target.classList.add('section-visible');
        }
      });
    }, observerOptions);

    // Animation observer for elements
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    // Observe sections for active state
    if (aboutRef.current) sectionObserver.observe(aboutRef.current);
    if (servicesRef.current) sectionObserver.observe(servicesRef.current);
    if (locationRef.current) sectionObserver.observe(locationRef.current);
    if (contactRef.current) sectionObserver.observe(contactRef.current);

    // Observe elements for animations
    document.querySelectorAll('.service-card, .about-content, .contact-form, .stat, .contact-item, .map-container').forEach(el => {
      animationObserver.observe(el);
    });

    // Smooth scroll for navigation links
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    };

    // Add click event listeners to nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      sectionObserver.disconnect();
      animationObserver.disconnect();
      document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="app">
      {/* Navbar Section */}
      <nav className={`navbar ${activeSection !== 'home' ? 'scrolled' : ''}`}>
        <div className="logo">
          <i className="fas fa-chart-line"></i>
          AuditorPro
        </div>
        <ul className="nav-links">
          <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}><i className="fas fa-home"></i> Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}><i className="fas fa-info-circle"></i> About</a></li>
          <li><a href="#services" className={activeSection === 'services' ? 'active' : ''}><i className="fas fa-cogs"></i> Services</a></li>
          <li><a href="#location" className={activeSection === 'location' ? 'active' : ''}><i className="fas fa-map-marker-alt"></i> Location</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}><i className="fas fa-envelope"></i> Contact</a></li>
        </ul>
        <div className="menu-toggle">
          <i className="fas fa-bars"></i>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-word">Welcome to</span>
              <span className="title-word highlight">AuditorPro</span>
            </h1>
            <p className="hero-subtitle">Your trusted partner for professional auditing solutions</p>
            <div className="hero-buttons">
              <a href="#services" className="btn btn-primary">
                <i className="fas fa-rocket"></i> Our Services
              </a>
              <a href="#contact" className="btn btn-secondary">
                <i className="fas fa-phone-alt"></i> Get Started
              </a>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>Scroll to explore</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about" ref={aboutRef}>
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                <i className="fas fa-star"></i> AuditorPro is dedicated to providing comprehensive auditing services for businesses, ensuring transparency, compliance, and financial accuracy.
              </p>
              <div className="stats">
                <div className="stat">
                  <i className="fas fa-users"></i>
                  <h3>500+</h3>
                  <p>Clients Served</p>
                </div>
                <div className="stat">
                  <i className="fas fa-chart-bar"></i>
                  <h3>99%</h3>
                  <p>Accuracy Rate</p>
                </div>
                <div className="stat">
                  <i className="fas fa-award"></i>
                  <h3>15+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services" ref={servicesRef}>
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-cards">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-file-invoice-dollar"></i>
              </div>
              <h3>Financial Auditing</h3>
              <p>Detailed analysis and verification of financial statements with precision and expertise.</p>
              <ul>
                <li><i className="fas fa-check"></i> Financial Statement Review</li>
                <li><i className="fas fa-check"></i> Transaction Verification</li>
                <li><i className="fas fa-check"></i> Asset Valuation</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Compliance Check</h3>
              <p>Ensure your business meets regulatory and statutory requirements seamlessly.</p>
              <ul>
                <li><i className="fas fa-check"></i> Regulatory Compliance</li>
                <li><i className="fas fa-check"></i> Policy Assessment</li>
                <li><i className="fas fa-check"></i> Documentation Review</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Risk Assessment</h3>
              <p>Identify and mitigate financial risks effectively with proactive strategies.</p>
              <ul>
                <li><i className="fas fa-check"></i> Risk Analysis</li>
                <li><i className="fas fa-check"></i> Mitigation Planning</li>
                <li><i className="fas fa-check"></i> Continuous Monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section location" ref={locationRef}>
        <div className="container">
          <h2 className="section-title">Our Location</h2>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15567.862368124086!2d77.80770593255528!3d12.715667682806327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae70a300af4247%3A0xbc41496913dbb3c4!2sDinnur%2C%20Tamil%20Nadu%20635109!5e0!3m2!1sen!2sin!4v1758800891616!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="AuditorPro Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Section (Updated with clickable phone and email) */}
      <section id="contact" className="section contact" ref={contactRef}>
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Visit Us</h3>
                  <p>123 Business District, Financial City</p>
                </div>
              </div>
              <div className="contact-item clickable" onClick={handleWhatsAppClick}>
                <i className="fas fa-phone"></i>
                <div>
                  <h3>Call Us / WhatsApp</h3>
                  <p className="contact-link">+91 97915 62237</p>
              
                </div>
              </div>
              <div className="contact-item clickable" onClick={handleEmailClick}>
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>Email Us</h3>
                  <p className="contact-link">subramaniassociateshsr@gmail.com</p>
            
                </div>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required/>
              <input type="email" placeholder="Your Email" required/>
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <i className="fas fa-chart-line"></i>
              AuditorPro
            </div>
            <p>Professional auditing solutions for modern businesses.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#location">Location</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul>
              <li className="clickable" onClick={handleWhatsAppClick}>
                <i className="fab fa-whatsapp"></i> +91 97915 62237
              </li>
              <li className="clickable" onClick={handleEmailClick}>
                <i className="fas fa-envelope"></i> subramaniassociateshsr@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 AuditorPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;