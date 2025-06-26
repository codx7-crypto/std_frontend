import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Layout from '../Components/Layout';
import '../pages_css/University.css';
import CoverImag from "../photos/universities_cover.jpg";

const University = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await fetch(`https://stdbackend-production.up.railway.app/api/universities/${id}`);
        const data = await response.json();
        setUniversity(data);
      } catch (error) {
        console.error("Error fetching university:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) return <Layout>
    <div className="cover-img">
          <img src={CoverImag} alt="cover" />
          <h1>الجامعات</h1>
    </div>   
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </Layout>;

  if (!university) {
    return (
      <Layout>
        <div className="cover-img">
          <img src={CoverImag} alt="cover" />
          <h1>الجامعات</h1>
        </div> 
        <div className="university-detail-not-found">University not found</div>
      </Layout>
    );
  }

  const formatText = (value) => {
    if (!value) return null;

    const lines = value.split('\n');
    const elements = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line === '') continue;

      // List support
      if (line.startsWith('-')) {
        const items = [];
        while (i < lines.length && lines[i].trim().startsWith('-')) {
          items.push(lines[i].trim().replace(/^-/, '').trim());
          i++;
        }
        i--;
        elements.push(
          <ul key={`list-${i}`} style={{ paddingRight: '1.5em', direction: 'rtl', listStyleType: 'disc', marginRight: '10px', marginTop:'20px'  }}>
            {items.map((item, idx) => (
              <li key={idx} style={{marginTop:'5px'}}>{formatInline(item)}</li>
            ))}
          </ul>
        );
        continue;
      }

      // Title
      if (/^\*[^*]+\*$/.test(line)) {
        elements.push(
          <h5 key={`title-${i}`} style={{ color: '#FB8C00' }}>
            {line.replace(/\*/g, '')}
          </h5>
        );
        continue;
      }

      // Normal paragraph with inline formatting
      elements.push(
        <p key={`p-${i}`} style={{ textAlign: 'right', direction: 'rtl', marginTop:'20px' }}>
          {formatInline(line)}
        </p>
      );
    }

    return elements;
  };

  const formatInline = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, j) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={`bold-${j}`}>{part.slice(2, -2)}</strong>;
      } else if (/^==[^=]+==$/.test(part)) {
        return <span key={`hl-${j}`} style={{ backgroundColor: '#FFF59D', padding: '0 4px', borderRadius: '3px' }}>{part.slice(2, -2)}</span>;
      } else if (/^\[[^\]]+\]\([^)]+\)$/.test(part)) {
        const textMatch = part.match(/^\[([^\]]+)\]/);
        const urlMatch = part.match(/\(([^)]+)\)/);
        if (!textMatch || !urlMatch) return part;
        return (
          <a key={`link-${j}`} href={urlMatch[1]} target="_blank" rel="noopener noreferrer" style={{ color: '#1976D2' }}>
            {textMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  

  // تأكد أن الصور جاهزة كمصفوفة
  let galleryImages = [];
  try {
    if (typeof university.gallery === 'string') {
      galleryImages = university.gallery.replace(/[{}"]/g, '').split(',').map(s => s.trim());
    } else if (Array.isArray(university.gallery)) {
      galleryImages = university.gallery;
    }
  } catch (e) {
    console.error("Gallery parsing error:", e);
  }


  return (
    <Layout>
      <div className="university-detail-container">
        <div className="university-detail-header">
          <img
            src={university.coverimage || CoverImag}
            alt={university.name}
            className="university-detail-cover"
            loading="lazy"
          />
          <div className="university-detail-info">
            <img
              src={university.logo}
              alt={`${university.name} logo`}
              className="university-detail-logo"
              loading="lazy"
            />
            <div className="university-detail-title">
              <h1>{university.name}</h1>
              <div className="university-detail-location">
                <FaMapMarkerAlt /> {university.location}
              </div>
            </div>
          </div>
        </div>

        <div className="university-detail-layout">
          <div className="university-detail-main">
            {[
              { id: "intro", title: "نبذة عن الجامعة", value: university.description },
              { id: "gallery", title: "صور الجامعة", value: galleryImages.length > 0 && (
                <section style={{ marginTop: '40px' }}>
              
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'flex-start',
                    marginBottom:'20px'
                  }}>
                    {galleryImages.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        style={{
                          cursor: 'pointer',
                          width: 'calc(33.33% - 13.33px)',
                          maxWidth: '300px',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                      >
                        <img
                          src={img}
                          alt={`university-img-${index}`}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
              
                  {/* عرض الصورة بشكل كامل */}
                  {selectedImage && (
                    <div style={{
                      position: 'fixed',
                      top: 0, left: 0,
                      width: '100vw',
                      height: '100vh',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 9999
                    }}>
                      <span
                        onClick={() => setSelectedImage(null)}
                        style={{
                          position: 'absolute',
                          top: '20px',
                          right: '30px',
                          fontSize: '32px',
                          color: '#fff',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        ✖
                      </span>
                      <img
                        src={selectedImage}
                        alt="full-university"
                        style={{
                          maxWidth: '90%',
                          maxHeight: '90%',
                          borderRadius: '12px',
                          boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}
                </section>
              )},
              
              
              
              { id: "address", title: "موقع الجامعة", value: university.address },
              { id: "website", title: "الموقع الإلكتروني", value: (
                <a href={`https://${university.website}`} target="_blank" rel="noopener noreferrer">
                  {university.website}
                </a>
              )},
              { id: "rate", title: "معدل التقييم", value: university.rate },
              { id: "recognitions", title: "الاعترافات", value: university.recognitions },
              { id: "departments", title: "الكليات / الأقسام", value: university.departements },
              { id: "majors", title: "التخصصات", value: (
                <div
                  style={{
                    columnCount: isMobile ? 2 : 3,
                    columnGap: '40px',
                    direction: 'rtl',
                    padding: '10px',
                  }}
                >
                  {(() => {
                    const lines = university.majors?.split('\n') || [];
                    const result = [];

                    let currentTitle = null;

                    lines.forEach((line, index) => {
                      const trimmed = line.trim();
                      if (!trimmed) return;

                      if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
                        currentTitle = trimmed.replace(/\*\*/g, '');
                        result.push(
                          <div key={`title-${index}`} style={{ fontWeight: 'bold', color: '#1976D2', marginTop: '15px' }}>
                            {currentTitle}
                          </div>
                        );
                      } else {
                        result.push(
                          <div key={`item-${index}`} style={{ breakInside: 'avoid' }}>
                            • {trimmed}
                          </div>
                        );
                      }
                    });

                    return result;
                  })()}
                </div>
              ) },
              
              //{ id: "levels", title: "المستويات التعليمية", value: university.levels },
              { id: "scholarship", title: "المنح الدراسية", value: university.scholarship },
              //{ id: "paymentways", title: "طرق الدفع", value: university.paymentways },
              { id: "conditions", title: "شروط القبول", value: university.conditions },
              { id: "docs", title: "الوثائق المطلوبة", value: university.requireddocuments },
              { id: "dates", title: "مواعيد التقديم", value: university.applicationdate },
              { id: "exams", title: "امتحانات القبول", value: university.acceptenceexams },
              { id: "way", title: "طريقة القبول", value: university.acceptanceway },
            ].map(section => (
              <section key={section.id} id={section.id} className="university-detail-section">
                <h2>{section.title}</h2>
                {typeof section.value === 'string' ? formatText(section.value) : section.value}                
              </section>
            ))}
          </div>

          <aside className="university-detail-sidebar">
            <h3>جدول المحتوى</h3>
            <ul className="university-detail-toc">
              {[
                { id: "intro", name: "نبذة عن الجامعة" },
                { id: "gallery", name: " صور الجامعة" },
                { id: "website", name: "الموقع الإلكتروني" },
                { id: "rate", name: "معدل التقييم" },
                { id: "recognitions", name: "الاعترافات" },
                { id: "majors", name: "التخصصات" },
                { id: "departments", name: "الأقسام" },
                { id: "levels", name: "المستويات التعليمية" },
                { id: "scholarship", name: "المنح الدراسية" },
                { id: "paymentways", name: "طرق الدفع" },
                { id: "conditions", name: "شروط القبول" },
                { id: "docs", name: "الوثائق المطلوبة" },
                { id: "dates", name: "مواعيد التقديم" },
                { id: "exams", name: "امتحانات القبول" },
                { id: "way", name: "طريقة القبول" },
              ].map(link => (
                <li key={link.id}><a href={`#${link.id}`}>{link.name}</a></li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default University;
