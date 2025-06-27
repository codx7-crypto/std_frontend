import "./Navbar2.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import websitelogo from "../photos/websitelogo.png"
import React, { useEffect, useState, useRef } from "react";
import { BsMenuButtonWide } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUniversitiesDropdown, setShowUniversitiesDropdown] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navbarBottomRef = useRef(null);
  const [groupedUniversities, setGroupedUniversities] = useState({});
  const [groupedMajors, setGroupedMajors] = useState({});

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('https://stdbackend-production.up.railway.app/api/universitiesnames');
        const data = await response.json();

        if (Array.isArray(data.universities)) {
          // Group by location
          const groups = {};
          data.universities.forEach((uni) => {
            const location = uni.location.trim();
            if (!groups[location]) groups[location] = [];
            groups[location].push(uni);
          });
          setGroupedUniversities(groups);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch('https://stdbackend-production.up.railway.app/api/majorsnames');
        const data = await response.json();

        if (Array.isArray(data.majors)) {
          // Group by location
          const groups = {};
          data.majors.forEach((maj) => {
            const category = maj.category.trim();
            if (!groups[category]) groups[category] = [];
            groups[category].push(maj);
          });
          setGroupedMajors(groups);
        }
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    };

    fetchMajors();
  }, []);

  useEffect(() => {
    const navbarBottom = navbarBottomRef.current;
    const bottomOffset = navbarBottom ? navbarBottom.getBoundingClientRect().bottom + window.scrollY : 100;
  
    const handleScroll = () => {
      if (window.scrollY > bottomOffset) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`navbar-ar ${scrolled ? 'scrolled' : ''}`} dir="rtl">
      <div className="navbar-ar-top">
        <div className="navbar-ar-social">
          <a href="/"><i className="fab fa-telegram-plane"></i></a>
          <a href="/"><i className="fab fa-linkedin"></i></a>
          <a href="/"><i className="fab fa-x-twitter"></i></a>
          <a href="/"><i className="fab fa-instagram"></i></a>
          <a href="/"><i className="fab fa-facebook"></i></a>
          <a href="/"><i className="fas fa-envelope"></i></a>
        </div>
        
      </div>
      <hr/>
      <div className="navbar-ar-bottom">
        <a href='/'>
        <div className="navbar-ar-logo">
          {/* Replace with your logo image if needed */}
          <img src={websitelogo} alt="Logo" />
          <span className="brand-text">
              <h2 style={{ fontSize: '12px', marginTop: '10px' }}>النورس التعليمية</h2>
              <p style={{ fontSize: '8px' }}>حلق لتصل </p>
          </span>
        </div>
        </a>
        <nav className="navbar-ar-links">
          <a href="/" className="active">الصفحة الرئيسية</a>
          {/* 
            Improved dropdown logic to prevent "hanging" or stuck dropdowns.
            Uses a small delay (debounce) on mouse leave to avoid flicker and stuck state.
          */}
          {/* 
            Improved dropdown logic: 
            - No more "hangout" (stuck open) or "sometimes not appear" issues.
            - Uses a single wrapper for both the button and popup, so mouse never leaves the wrapper when moving between button and popup.
            - No setTimeout debounce, so dropdown appears instantly on hover and closes instantly on leave.
          */}
          <div
            className="navbar-dropdown-wrapper"
            style={{
              display: 'inline-block',
              position: 'relative',
              width: 'fit-content'
            }}
            onMouseEnter={() => setShowUniversitiesDropdown('majors')}
            onMouseLeave={() => setShowUniversitiesDropdown(false)}
          >
            <a href="/MajorsPage">أهم التخصصات</a>
            {showUniversitiesDropdown === 'majors' && (
            <div className="navbar-dropdown-popup">
            <div
              className="majors-masonry"
              style={{
                columnCount: 3, // يمكنك تعديل العدد بناءً على حجم الشاشة
                columnGap: '10px'
              }}
            >
              {Object.entries(groupedMajors).map(([category, majs], idx) => (
                <div
                  key={idx}
                  className="major-box"
                  style={{
                    marginBottom: '10px',
                    padding: '0',
                    breakInside: 'avoid',
                    borderRadius: '12px',
                  }}
                >
                  <h4
                    className="dropdown-title"
                    style={{
                      fontWeight: 'bold',
                      borderBottom: '1px solid #ccc',
                      marginBottom: '0px',
                      padding: '6px',
                      textAlign: 'center',
                    }}
                  >
                    {category}
                  </h4>
          
                  <ul className="majors-list">
                    {majs.map((maj) => (
                      <li key={maj.id} style={{ marginBottom: '5px' }}>
                        <Link
                          className="link"
                          to={`/majors/${maj.id}`}
                          style={{
                            textDecoration: 'none',
                            color: '#333',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            display: 'block',
                          }}
                        >
                          {maj.name.trim()}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          
            <div className="majordropdown-footer" style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link to="/MajorsPage" className="dropdown-all-btn">
                عرض كافة التخصصات
              </Link>
            </div>
          </div>
          
          
          )}

          </div>

          <div
            className="navbar-dropdown-wrapper"
            style={{
              display: 'inline-block',
              position: 'relative',
              width: 'fit-content'
            }}
            onMouseEnter={() => setShowUniversitiesDropdown('universities')}
            onMouseLeave={() => setShowUniversitiesDropdown(false)}
          >
            <a href="/UniversitiesPage">جامعاتنا</a>
            {showUniversitiesDropdown === 'universities' && (
            <div className="navbar-dropdown-popup">
            <div
            className="dropdown-columns"
            style={{
              display: 'flex',
              gap: '30px',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}>
            {Object.entries(groupedUniversities).map(([location, unis], idx) => (
              <div className="dropdown-column" key={idx} style={{ minWidth: '250px' }}>
                <div
                  className="dropdown-title"
                  style={{
                    fontWeight: 'bold',
                    borderBottom: '1px solid #ccc',
                    marginBottom: '0',
                    paddingBottom: '4px',
                    textAlign: 'center',
                  }}
                >
                  {location}
                </div>

                <div
                  className="university-list"
                  style={{
                    columnCount: unis.length > 10 ? 3 : 1,
                    columnGap: '10px',
                  }}
                >
                  {unis.map((uni) => (
                    <Link
                      className="link"
                      key={uni.id}
                      to={`/university/${uni.id}`}
                      style={{
                        display: 'block',
                        breakInside: 'avoid',
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        marginBottom: '6px',
                        fontSize: '13px',
                        lineHeight: '1.5',
                      }}
                    >
                      {uni.name.trim()}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="dropdown-footer">
              <Link to="/UniversitiesPage" className="dropdown-all-btn">
                عرض كافة الجامعات
              </Link>
            </div>
          </div> 
          </div>
          )}

          </div>
          <a href="/BlogPage">مدونتنا</a>
          <a href="/NewsPage">الأخبار</a>
          <Link to={`/#services`}><a href="#services">الخدمات</a></Link>
          <Link to={`/#aboutus`}><a href="#aboutus">من نحن</a></Link>
          <Link to={`/#contact`}><a href="#contact">تواصل معنا</a></Link>
        </nav>
        <div className="navbar-ar-actions">
          <div 
            className="register-button-wrapper"
            onMouseEnter={() => setShowComingSoon(true)}
            onMouseLeave={() => setShowComingSoon(false)}
          >
            <button className="navbar-ar-register">سجل الآن</button>
            {showComingSoon && (
              <div className="coming-soon-popup">
                <div className="coming-soon-content">
                  <i className="fas fa-clock"></i>
                  <span>قريباً</span>
                  <p>سيتم إطلاق خدمة التسجيل قريباً</p>
                </div>
              </div>
            )}
          </div>
          <button className="navbar-ar-user"><CiUser /></button>
        </div>
        <div className="mobile-menu-icon" onClick={() => setMenuOpen(true)}>
          <BsMenuButtonWide />
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="mobile-menu active">
          <div className="mobile-menu-header">
            <a href='/'>
            <div className="mobile-menu-logo">
              <img src={websitelogo} alt="Logo" />
              <span className="brand-text">
                <h2 style={{ fontSize: '12px' }}>النورس التعليمية</h2>
                <p style={{ fontSize: '8px' }}>حلق لتصل </p>
                </span>
            </div>
            </a>
            <div className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
              <i className="fa fa-times"></i>
            </div>
          </div>

          <div className="mobile-menu-links">
            <a href="/">الصفحة الرئيسية</a>
            <a href="/MajorsPage">أهم التخصصات</a>
            <a href="/UniversitiesPage">جامعاتنا</a>
            <a href="/BlogPage">مدونتنا</a>
            <a href="/NewsPage">الأخبار</a>
            <Link to={`/#services`}><a href="#services">الخدمات</a></Link>
            <Link to={`/#aboutus`}><a href="#aboutus">من نحن</a></Link>
            <a href="#contact">تواصل معنا</a>
          </div>

          {/* <div className="mobile-menu-actions">
            <button>كن وكيلاً</button>
            <button>سجل الآن</button>
            <button>تحديد الاهتمامات</button>
            <button>تتبع الطلب</button>
          </div> */}
        </div>
      )}
      
    </header>
  );
};

export default Navbar;
