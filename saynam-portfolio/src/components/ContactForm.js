import React, { useState } from 'react';
import '../styles/ContactForm.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
        console.log('Form submitted', { name, email, message });
        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Contact Me</h2>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Message:
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
            </label>
            <button type="submit">Send Message</button>
        </form>
    );
};

export default ContactForm;