// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';

const App = () => (
    <div>
        <div className="background">
            <div className="circles">
                {Array.from({ length: 100 }).map((_, index) => (
                    <div key={index} className="circle" style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 10 + 5}s`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}></div>
                ))}
            </div>
        </div>
        <Header />
        <main>
            <section id="home"><Home /></section>
            <section id="profile"><Profile /></section>
            <section id="experience"><Experience /></section>
            <section id="projects"><Projects /></section>
            <section id="contact"><Contact /></section>
        </main>
        <Footer />
    </div>
);

export default App;
