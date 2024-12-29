import React from 'react';
import ContactForm from '../components/ContactForm';
import '../styles/Contact.css';

const Contact = () => (
    <div className="contact-section">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-description">I would love to hear from you! Please fill out the form below to reach out.</p>
        <ContactForm />
    </div>
);

export default Contact;