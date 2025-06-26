import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages_css/BlogPage.css";
import Layout from '../Components/Layout';
import CoverImag from "../photos/blogs_cover.jpg";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('https://stdbackend-production.up.railway.app/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Error loading blogs:', err));
  }, []);

  const categories = ['الكل', ...new Set(blogs.map(blog => blog.category))];
  const importantBlogs = blogs.filter(blog => blog.important);

  const filteredBlogs = selectedCategory && selectedCategory !== 'الكل'
    ? blogs.filter(blog => blog.category === selectedCategory)
    : blogs;

  return (
    <Layout>
      <div className="page-container">
        <div className="cover-image">
          <img src={CoverImag} alt="cover"/>
          <h1>مدونتنا</h1>
        </div>

        <div className="blog-page-content">
          <div className="blog-container">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <Link to={`/blog/${blog.id}`}>
                  <img src={blog.coverimage} alt="cover" className="blog-cover" />
                  <h6 className="blog-title" style={{
                    fontSize: '1.2rem',
                    color: '#333',
                    textAlign: 'right',
                    fontFamily: '"Cairo", sans-serif',
                    direction: 'rtl'
                  }}>{blog.title}</h6>
                  <p className="blog-sammury" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxHeight: '4.5em', // تقريبًا 3 أسطر
                      direction: 'rtl',
                      textAlign: 'right'
                    }}>
                    {blog.sammury.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).map((part, i) => {
                      if (/^\*\*[^*]+\*\*$/.test(part)) {
                        return <strong key={i}>{part.slice(2, -2)}</strong>; // bold
                      } else if (/^==[^=]+==$/.test(part)) {
                        return (
                          <span key={i} style={{ backgroundColor: '#FFF59D', padding: '0 4px', borderRadius: '3px' }}>
                            {part.slice(2, -2)}
                          </span> // highlighted
                        );
                      }
                      return part;
                    })}
                  </p>

                  <span className="blog-category">{blog.category}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="blog-sidebar">
            <div className="sidebar-card" style={{background:'transparent', position:'sticky'}}>
              <h3 className="sidebar-title">الفئات</h3>
              <ul className="categories-list">
                {categories.map((cat, index) => (
                  <li
                    key={index}
                    className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span className="category-name">{cat}</span>
                    <span className="category-count">
                      {blogs.filter(blog => blog.category === cat).length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-card" style={{background:'transparent', position:'sticky'}}>
              <h3 className="sidebar-title">الأكثر زيارة</h3>
              <div className="most-visited-blogs">
                {importantBlogs.map((blog) => (
                  <Link to={`/blog/${blog.id}`} key={blog.id} className="most-visited-blog">
                    <img src={blog.coverimage} alt={blog.title} className="most-visited-blog-image" />
                    <div className="most-visited-blog-info">
                      <h4>{blog.title}</h4>
                      <span className="blog-date">{blog.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
