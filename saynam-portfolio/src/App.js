import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './styles/App.css';

const App = () => (
    <div className="app-container">
        <Header />
        <main className="main-content">
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