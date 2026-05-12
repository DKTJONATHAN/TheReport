import { useSEO } from '../hooks/useSEO';
import '../styles/About.css';

const About: React.FC = () => {
  useSEO({
    title: 'About Us | The Report',
    description: 'Learn about The Report, our mission for integrity in journalism, and our editorial team led by Jonathan Mwaniki.'
  });

  return (
    <div className="page-wrapper">
      <div className="main-container">
        <header className="about-hero">
          <span className="pill-label">Est. 2025</span>
          <h1 className="page-title">Journalism with Integrity.</h1>
          <p className="hero-lead">
            The Mwaniki Report is Kenya's independent digital newsroom dedicated to factual reporting, 
            deep analysis, and covering the stories that shape our digital and political landscape.
          </p>
        </header>

        <div className="layout-grid">
          <main className="content-column">
            <section className="card-box mission-card">
              <h2>Our Mission</h2>
              <p>
                In an era of information overload, clarity is power. We strive to cut through the noise 
                to provide our readers with accurate, timely, and context-rich news. We believe that 
                an informed citizenry is the backbone of a thriving democracy.
              </p>
            </section>

            <section className="editor-section">
              <div className="section-label">Editor-in-Chief</div>
              <div className="card-box editor-card">
                <div className="editor-image-col">
                  <img src="/Jonathan-Mwaniki-logo.png" alt="Jonathan Mwaniki" width="140" height="140" />
                </div>
                <div className="editor-content-col">
                  <h3>Jonathan Mwaniki</h3>
                  <p className="role">Founder & Lead Investigative Journalist</p>
                  <div className="bio-text">
                    <p>
                      Jonathan Mwaniki is a seasoned media professional with a focus on political analysis 
                      and digital culture in East Africa. He founded The Mwaniki Report to bridge the gap 
                      between traditional reporting and the modern digital consumption habits of Kenyans.
                    </p>
                  </div>
                  <div className="editor-actions">
                    <a href="https://twitter.com/maestropuns" target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Follow on X
                    </a>
                    <a href="mailto:contact@jonathanmwaniki.co.ke" className="btn-outline">
                      Contact Desk
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="values-section">
              <div className="section-label">Editorial Standards</div>
              <div className="values-grid">
                <div className="card-box value-item">
                  <div className="icon-box">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4>Accuracy First</h4>
                  <p>We verify every claim. Being right is more important than being first.</p>
                </div>
                <div className="card-box value-item">
                  <div className="icon-box">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4>Transparency</h4>
                  <p>We clearly distinguish between factual news reporting and opinion pieces.</p>
                </div>
                <div className="card-box value-item">
                  <div className="icon-box">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h4>Independence</h4>
                  <p>We are reader-funded and independent of political or corporate interest.</p>
                </div>
              </div>
            </section>
          </main>

          <aside className="sidebar-column">
            <div className="sticky-wrapper">
              <div className="card-box contact-widget">
                <h3>Get in Touch</h3>
                <p>Have a scoop? Send us a tip securely.</p>
                <ul className="contact-list">
                  <li>
                    <span className="label">Email</span>
                    <a href="mailto:contact@jonathanmwaniki.co.ke">contact@jonathanmwaniki.co.ke</a>
                  </li>
                  <li>
                    <span className="label">Location</span>
                    <span>Nairobi, Kenya</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default About;
