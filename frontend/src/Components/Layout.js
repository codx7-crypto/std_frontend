import React from 'react';
import Navbar from './Navbar2';
import Footer from './footer';
import Contact from './Contact';
import '../Components/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <div><Contact/></div>
      
      <Footer />
    </div>
  );
};

export default Layout; 