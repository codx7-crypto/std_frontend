// src/components/Footer.js
import React from "react";
import "./footer.css";
import Logo from '../photos/websitelogo.png';
import { FaTelegram, FaInstagram, FaLinkedin, FaXTwitter, FaFacebookF } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" dir="rtl">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-brand">
          <a href='/'>
          <div className="logo-title">
            <img src={Logo} alt="النورس" />
            <div className="brand-text">
              <h2>النورس التعليمية</h2>
              <p>حلق لتصل </p>
            </div>
          </div>
          </a>
          <p className="brand-description">تعتبر النورس شركة رائدة في مجال الخدمات الأكاديمية.</p>
          <div className="brand-nav">
            <Link to="/UniversitiesPage">الجامعات التركية</Link>
            <Link to="/UniversitiesPage">المدارس الدولية</Link>
            <Link to="/BlogPage">مدونتنا</Link>
            <Link to="/NewsPage">الأخبار</Link>
          </div>
        </div>

        {/* Quick Links Sections */}
        <div className="footer-links">
          <div className="footer-section">
            <h3>روابط مهمة</h3>
            <ul>
              <Link to={`/#study-in-turkey`}><li><a href="#">الدراسة في تركيا</a></li></Link>
              <li><a href="#">السكن الطلابي</a></li>
              <li><a href="#contact">تواصل معنا</a></li>
              <Link to={`/#majors`}><li><a href="#">أهم التخصصات الجامعية</a></li></Link>
            </ul>
          </div>

          <div className="footer-section">
            <h3>خدماتنا</h3>
            <ul>
              <li><a href="#">اللغة التركية</a></li>
              <li><a href="#">نادي النورس</a></li>
              <Link to={`/#services`}><li><a href="#">الخدمات</a></li></Link>
              <Link to={`/#aboutus`}><li><a href="#">من نحن</a></li></Link>
            </ul>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="footer-section">
          <h3>النشرة الإخبارية</h3>
          <div className="newsletter">
            <input type="email" placeholder="بريدك الإلكتروني" />
            <button>اشترك</button>
          </div>
          <p>اشترك لتبقى على اطلاع دائم بعروضنا المميزة</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3>تابعنا على</h3>
          <div className="social-icons">
            <a href="https://web.telegram.org/" aria-label="Telegram" target="_blank"><FaTelegram /></a>
            <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank"><FaInstagram /></a>
            <a href="http://linkedin.com/" aria-label="LinkedIn" target="_blank"><FaLinkedin /></a>
            <a href="http://linkedin.com/" aria-label="Twitter" target="_blank"><FaXTwitter /></a>
            <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank"><FaFacebookF /></a>
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRqhklLvzMGbLPlpWTJMXznBmNgBgzTNhWwSGqTfxVwvzFdSkTQSCSGkkGvCGdpQLqPvBGq" aria-label="Email" target="_blank"><MdEmail /></a>
          </div>
        </div>
      </div>

      <hr />
      {/* Copyright Section */}
      <div className="footer-copyright">
        <p style={{ marginTop: "10px" }}>جميع الحقوق محفوظة © {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
