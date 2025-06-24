import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Components/Layout';
import '../pages_css/news.css';
import CoverImag from "../photos/news_cover.jpg";

const News = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:5000/api/news/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        console.log('Fetched news data:', data);
        
        // Format the date before setting the news state
        const formattedNews = {
          ...data,
          date: new Date(data.created_at).toLocaleDateString('ar-SA'),
          // Ensure tags is always an array
          tags: Array.isArray(data.tags) ? data.tags : []
        };
        
        setNews(formattedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError('حدث خطأ أثناء تحميل الخبر');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div>
          <div className="cover-img">
            <img src={CoverImag} alt="News Cover" />
            <h1>الأخبار</h1>
          </div>
          <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !news) {
    return (
      <Layout>
        <div>
          <div className="cover-img">
            <img src={CoverImag} alt="News Cover" loading="lazy"/>
            <h1>الأخبار</h1>
          </div>
          <div className="news-detail-error">
            <p>عذراً، لم يتم العثور على الخبر المطلوب</p>
            <p className="error-details">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div className="cover-img">
          <img src={CoverImag} alt="News Cover" loading="lazy"/>
          <h1>الأخبار</h1>
        </div>
      <div className="news-detail-container">
        <div className="news-detail-header">
          <img
            src={news.image_url || '/pics/news1.jpg'}
            alt={news.title}
            className="news-detail-cover"
            loading="lazy"
          />
          <div className="news-detail-info">
            <h1>{news.title}</h1>
            <p className="news-date">التاريخ: {news.date}</p>
          </div>
        </div>

        <div className="news-detail-content">
          <div className="news-summary">
            <h2>ملخص الخبر</h2>
            <p>{news.summary}</p>
          </div>
          
          <div className="news-main-content">
            <h2>محتوى الخبر</h2>
            <p>{news.content}</p>
          </div>

          {news.source && (
            <div className="news-source">
              <h2>المصدر</h2>
              <p>{news.source}</p>
            </div>
          )}

          {news.tags && news.tags.length > 0 && (
            <div className="news-tags">
              <h2>الوسوم</h2>
              <div className="tags-container">
                {news.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default News;
