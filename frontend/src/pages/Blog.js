import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Components/Layout';
import CoverImag from "../photos/blogs_cover.jpg";
import "../pages_css/Blog.css";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [titlesForSidebar, setTitlesForSidebar] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://stdbackend-production.up.railway.app/api/blogs/${id}`);
        if (!response.ok) throw new Error('Failed to fetch blog');
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (blog?.text) {
      const lines = blog.text.split('\n');
      const newTitles = [];
      lines.forEach((line, index) => {
        if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
          const clean = line.replace(/\*\*/g, '').trim();
          newTitles.push({ id: `title-${index}`, text: clean });
        }
      });
      setTitlesForSidebar(newTitles);
    }
  }, [blog]);

  const formatInlineText = (text, keyPrefix) => {
    const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, j) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={`${keyPrefix}-bold-${j}`}>{part.slice(2, -2)}</strong>;
      } else if (/^==[^=]+==$/.test(part)) {
        return <span key={`${keyPrefix}-hl-${j}`} style={{ backgroundColor: '#FFF59D', padding: '0 4px', borderRadius: '3px' }}>{part.slice(2, -2)}</span>;
      } else if (/^\[[^\]]+\]\([^)]+\)$/.test(part)) {
        const text = part.match(/^\[([^\]]+)\]/)[1];
        const url = part.match(/\(([^)]+)\)/)[1];
        return <a key={`${keyPrefix}-link-${j}`} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976D2' }}>{text}</a>;
      }
      return part;
    });
  };

  if (loading) return (
  <Layout>
    <div className="cover-image">
      <img src={CoverImag} alt='CoverImg' />
      <h1>مدونتنا</h1>
    </div> 
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </Layout>);
  if (error || !blog) return <Layout><p>Error loading blog.</p></Layout>;

  const lines = blog.text.split('\n');

  let renderedContent = [];
  let currentList = [];
  let listIndex = 0;

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Title
    if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
      if (currentList.length) {
        renderedContent.push(
          <ul key={`list-${listIndex}`} style={{ listStyleType: 'disc', paddingRight: '1.5em', marginRight: '10px' }}>
            {currentList.map((item, idx) => (
              <li key={`list-${listIndex}-item-${idx}`}>{formatInlineText(item, `list-${listIndex}-${idx}`)}</li>
            ))}
          </ul>
        );
        currentList = [];
        listIndex++;
      }
      renderedContent.push(
        <h4 key={`title-${i}`} id={`title-${i}`} 
        style={{ 
          color: '#1976D2', 
          fontWeight: 'bold', 
          backgroundColor:' #e9f0ff', 
          marginRight:'4px solid #4a90e2',
          borderRadius:'6px',
          padding:'12px 16px',
          marginBottom:'16px',
          fontSize:'1.3rem' }}>
          {trimmed.replace(/\*\*/g, '')}
        </h4>
      );
      return;
    }

    // Subtitle
    if (/^\*[^*]+\*$/.test(trimmed)) {
      if (currentList.length) {
        renderedContent.push(
          <ul key={`list-${listIndex}`} style={{ listStyleType: 'disc', paddingRight: '1.5em', marginRight: '10px' }}>
            {currentList.map((item, idx) => (
              <li key={`list-${listIndex}-item-${idx}`}>{formatInlineText(item, `list-${listIndex}-${idx}`)}</li>
            ))}
          </ul>
        );
        currentList = [];
        listIndex++;
      }
      renderedContent.push(
        <h5 key={`subtitle-${i}`} style={{ color: '#FB8C00', fontWeight: 600, fontSize: '1.2rem' }}>
          {trimmed.replace(/\*/g, '')}
        </h5>
      );
      return;
    }

    // List item
    if (trimmed.startsWith('-')) {
      currentList.push(trimmed.replace(/^-/, '').trim());
      return;
    }

    // Paragraph
    if (trimmed !== '') {
      if (currentList.length) {
        renderedContent.push(
          <ul key={`list-${listIndex}`} style={{ listStyleType: 'disc', paddingRight: '1.5em', marginRight: '10px' }}>
            {currentList.map((item, idx) => (
              <li key={`list-${listIndex}-item-${idx}`}>{formatInlineText(item, `list-${listIndex}-${idx}`)}</li>
            ))}
          </ul>
        );
        currentList = [];
        listIndex++;
      }
      renderedContent.push(
        <p key={`para-${i}`} style={{ textAlign: 'right', direction: 'rtl', fontSize:'1rem', lineHeight:'2rem' }}>
          {formatInlineText(trimmed, `para-${i}`)}
        </p>
      );
    }
  });

  // render any remaining list
  if (currentList.length) {
    renderedContent.push(
      <ul key={`list-${listIndex}`} style={{ listStyleType: 'disc', paddingRight: '1.5em', marginRight: '10px' }}>
        {currentList.map((item, idx) => (
          <li key={`list-${listIndex}-item-${idx}`}>{formatInlineText(item, `list-${listIndex}-${idx}`)}</li>
        ))}
      </ul>
    );
  }

  return (
    <Layout>
      <div className="cover-image">
        <img src={CoverImag} alt='CoverImg' />
        <h1>مدونتنا</h1>
      </div>

      <div className='blog-container-perent'>
        <aside className='sidebar' style={{ minWidth: '200px', top: '80px', direction: 'rtl', marginTop: '20px' }}>
          <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>محتوى المقال</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {titlesForSidebar.map((item, idx) => (
              <li key={`sidebar-${idx}`} style={{  }}>
                <a href={`#${item.id}`} style={{ color: '#1976D2', textDecoration: 'none' }}>{item.text}</a>
              </li>
            ))}
          </ul>
        </aside>

        <div className='blog-detail-container' style={{
          maxWidth: '800px',
          padding: '20px',
          fontSize:'1rem', 
          lineHeight:'2rem',
          margin: '0',
          marginTop: '20px'
        }}>
          <img
            src={blog.coverimage}
            alt="Blog cover"
            style={{
              width: '100%',
              maxWidth: '770px',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '20px',
            }}
          />
          <h2 style={{
            fontSize: '2.5rem',
            color: '#333',
            marginBottom: '20px',
            textAlign: 'center',
            fontFamily: '"Cairo", sans-serif'
          }}>
            {blog.title}
          </h2>

          <div className='main-content' style={{ fontSize:'1rem', lineHeight:'2rem', fontFamily: '"Cairo", sans-serif' }}>
            {renderedContent}
          </div>

          {blog.gallery && blog.gallery.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}>
              {blog.gallery.map((img, i) => (
                <img
                  key={`gallery-${i}`}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
