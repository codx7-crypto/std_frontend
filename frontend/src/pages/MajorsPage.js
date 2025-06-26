import React, { useState, useEffect } from 'react';
import '../pages_css/MajorsPage.css';
import Layout from '../Components/Layout';
import CoverImag from '../photos/majors_cover.jpg';
import { Link } from 'react-router-dom';

const MajorsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [majorsData, setMajorsData] = useState([]);
  const [categories, setCategories] = useState(['الكل']);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch('http://stdbackend-production.up.railway.app/api/majors');
        const data = await response.json();
        setMajorsData(data.majorsData);
        setCategories(['الكل', ...data.categories]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching majors:', error);
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  // ✅ Group majors by category
  const groupedMajors = majorsData.reduce((acc, major) => {
    if (!acc[major.category]) acc[major.category] = [];
    acc[major.category].push(major);
    return acc;
  }, {});

  // ✅ Filtered majors by selected category
  const filteredMajors = selectedCategory === 'الكل'
    ? groupedMajors
    : { [selectedCategory]: majorsData.filter(major => major.category === selectedCategory) };

  return (
    <Layout>
      <div className='page-container'>
        {/* Cover image */}
        <div className="cover-img">
          <img src={CoverImag} alt='coverimg' loading="lazy"/>
          <h1>التخصصات</h1>
        </div>

        <div className="majors-container">
          <h1 className="majors-title">تعرف على أهم تخصصات البكالوريوس في تركيا</h1>
          <p className="majors-subtitle">يمكنك الاطلاع على تفاصيل أي تخصص تريد التعرف عليه من مزاياه والمواد الدراسية ومجالات العمل بعد التخرج والجامعات التي تدرس هذا التخصص</p>

          {loading ? (
            <p style={{ textAlign: 'center' }}>جارٍ تحميل التخصصات...</p>
          ) : (
            <div className="majors-layout">
              {/* Sidebar */}
              <aside className="majors-sidebar sidebar-card" style={{background:'transparent', position:'sticky'}}>
                <h3 className="sidebar-title">الفئات</h3>
                <ul className="locations-list">
                  {categories.map((cat, index) => (
                    <li
                      key={index}
                      className={`location-item ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span className="location-name">{cat}</span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Main Content */}
              <div className="majors-content">
                {Object.entries(filteredMajors).map(([category, majors], i) => (
                  <div key={i} className="majors-category-block">
                    {selectedCategory === 'الكل' && (
                      <h2 className="majors-section-title">{category}</h2>
                    )}

                    <div className="majors-cards">
                      {majors.map((major, index) => (
                        <Link to={`/majors/${major.id}`} key={index} className="major-card">
                          <img src={major.major_image} alt={major.name} className="major-image" loading="lazy"/>
                          <div className='major-informations' style={{backgroundColor: '#f5f8fe'}}>
                            <h4>{major.name}</h4>
                            <p>{major.category}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MajorsPage;
