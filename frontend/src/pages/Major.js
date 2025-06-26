import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Components/Layout';
import '../pages_css/Majors.css';
import CoverImag from '../photos/majors_cover.jpg';

const Major = () => {
  const { id } = useParams();
  const [major, setMajor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await fetch(`https://stdbackend-production.up.railway.app/api/majors/${id}`);
        const data = await response.json();
        setMajor(data);
      } catch (error) {
        console.error("Error fetching major:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMajor();
  }, [id]);

  const formatText = (text) => {
    const lines = text.split('\n');
    const elements = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (/^\*[^*]+\*$/.test(line)) {
        elements.push(
          <h5 key={`title-${i}`} style={{ color: '#FB8C00', fontWeight: '600', direction: 'rtl', textAlign: 'right' }}>
            {line.replace(/\*/g, '')}
          </h5>
        );
        continue;
      }

      if (line.startsWith('-')) {
        const items = [];
        while (i < lines.length && lines[i].trim().startsWith('-')) {
          items.push(lines[i].trim().slice(1).trim());
          i++;
        }
        i--;
        elements.push(
          <ul key={`ul-${i}`} style={{ paddingRight: '1.5em', direction: 'rtl' }}>
            {items.map((item, idx) => (
              <li key={`li-${i}-${idx}`}>{formatInline(item, `li-${i}-${idx}`)}</li>
            ))}
          </ul>
        );
        continue;
      }

      if (line !== '') {
        elements.push(
          <p key={`p-${i}`} style={{ textAlign: 'right', direction: 'rtl' }}>
            {formatInline(line, `p-${i}`)}
          </p>
        );
      }
    }
    return elements;
  };

  const formatInline = (text, key) => {
    const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, j) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={`${key}-b-${j}`}>{part.slice(2, -2)}</strong>;
      }
      if (/^==[^=]+==$/.test(part)) {
        return (
          <span key={`${key}-hl-${j}`} style={{ backgroundColor: '#FFF59D', padding: '0 4px', borderRadius: '3px' }}>
            {part.slice(2, -2)}
          </span>
        );
      }
      if (/^\[[^\]]+\]\([^)]+\)$/.test(part)) {
        const text = part.match(/\[([^\]]+)\]/)[1];
        const url = part.match(/\(([^)]+)\)/)[1];
        return (
          <a key={`${key}-link-${j}`} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976D2' }}>
            {text}
          </a>
        );
      }
      return part;
    });
  };

  if (loading) return <Layout><p className="major-detail-not-found">Loading...</p></Layout>;

  if (!major) {
    return (
      <Layout>
        <div className="major-detail-not-found">Major not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="major-detail-container">
        <div className="major-detail-header">
          <div className="cover-img">
            <img src={CoverImag} alt='coverimg' loading="lazy"/>
            <h1>التخصصات</h1>
          </div>
          <div className="major-detail-info">
            <div className="major-detail-title">
              <h1>{major.name}</h1>
              <p className="major-type">النوع: {major.category}</p>
            </div>
          </div>
        </div>

        <div className="major-detail-layout">
          <div className="major-detail-main">
            {[
              { id: "intro", title: "مقدمة عن التخصص", value: major.introduction },
              { id: "period", title: "مدة الدراسة", value: major.period },
              { id: "universities", title: "الجامعات التركية الخاصة التي تدرس هذا التخصص", value: major.universities },
              { id: "work", title: "مجالات العمل المستقبلية", value: major.work_fields },
              { id: "advantages", title: "مزايا التخصص والتطور المهني فيه", value: major.advantages },
              { id: "market", title: "العلاقة بين التخصص وسوق العمل", value: major.market_relation },
              { id: "conclusion", title: "الخلاصة", value: major.conclusion },
            ].map(section => (
              <section key={section.id} id={section.id} className="major-detail-section">
                <h2>{section.title}</h2>
                {formatText(section.value)}
                
              </section>
            ))}
          </div>
          <div className='sidebardiv'>
            <aside>
            <img src={major.major_image} alt={major.name} loading="lazy"
            style={{marginRight: '30%',
                    marginTop:'20px',
                    width:'250px',
                    height:'300px',
                    borderRadius:'15em 15em 0 0'}}/>
            </aside>
          <aside className="major-detail-sidebar">
            <h3>جدول المحتوى</h3>
            <ul className="major-detail-toc">
              {[
                { id: "intro", name: "مقدمة عن التخصص" },
                { id: "period", name: "مدة الدراسة" },
                { id: "universities", name: "الجامعات التركية الخاصة" },
                { id: "work", name: "مجالات العمل المستقبلية" },
                { id: "advantages", name: "مزايا التخصص والتطور المهني" },
                { id: "market", name: "العلاقة مع سوق العمل" },
                { id: "conclusion", name: "الخلاصة" },
              ].map(link => (
                <li key={link.id}><a href={`#${link.id}`}>{link.name}</a></li>
              ))}
            </ul>
          </aside>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Major;
