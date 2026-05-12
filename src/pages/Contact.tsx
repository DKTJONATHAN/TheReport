import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  useSEO({
    title: 'Contact Us | The Report',
    description: 'Get in touch with our editorial team. We value your feedback, news tips, and inquiries.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="jm-container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="success-icon" style={{ fontSize: '4rem', marginBottom: '2rem' }}>✉️</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Message Received</h2>
        <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Thank you for reaching out to The Report. Our team will review your message and get back to you as soon as possible.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-load-more">Send Another Message</button>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="jm-container">
        <header className="contact-hero">
          <h1>Get in Touch</h1>
          <p>
            Have a story tip, a question about our coverage, or want to explore partnership opportunities? 
            Our team is here to listen.
          </p>
        </header>

        <div className="contact-grid">
          <aside className="contact-info">
            <div className="info-item">
              <div className="info-icon"><Mail size={24} /></div>
              <div className="info-text">
                <h3>Email Us</h3>
                <p>editorial@thereport.co.ke</p>
                <p>tips@thereport.co.ke</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon"><Phone size={24} /></div>
              <div className="info-text">
                <h3>Call Us</h3>
                <p>+254 700 000 000</p>
                <p>Mon - Fri, 9am - 6pm EAT</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><MapPin size={24} /></div>
              <div className="info-text">
                <h3>Visit Our Desk</h3>
                <p>Central Business District</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><MessageSquare size={24} /></div>
              <div className="info-text">
                <h3>Media Inquiries</h3>
                <p>press@thereport.co.ke</p>
              </div>
            </div>
          </aside>

          <main className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="Jane" required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Doe" required />
              </div>
              <div className="form-group full">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="jane@example.com" required />
              </div>
              <div className="form-group full">
                <label htmlFor="subject">Subject</label>
                <select id="subject" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#f9fafb' }}>
                  <option>General Inquiry</option>
                  <option>News Tip</option>
                  <option>Correction Request</option>
                  <option>Partnership</option>
                  <option>Advertising</option>
                </select>
              </div>
              <div className="form-group full">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" rows={6} placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Contact;
