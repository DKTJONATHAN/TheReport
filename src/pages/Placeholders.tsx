import React from 'react';

const Page: React.FC<{ title: string }> = ({ title }) => (
  <div className="jm-container" style={{ padding: '4rem 0' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{title}</h1>
    <p>This page is under construction. Please check back soon.</p>
  </div>
);

export const Contact = () => <Page title="Contact Us" />;
export const Privacy = () => <Page title="Privacy Policy" />;
export const Terms = () => <Page title="Terms of Service" />;
export const Cookies = () => <Page title="Cookies Policy" />;
export const Guidelines = () => <Page title="Editorial Guidelines" />;
export const SearchPage = () => <Page title="Search Results" />;
