import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages_css/NewsPage.css";
import Layout from '../Components/Layout';
import CoverImag from "../photos/news_cover.jpg";



const NewsPage = () => {
    const navigate = useNavigate();
    const [dynamicNews, setDynamicNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const [newsError, setNewsError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("https://stdbackend-production.up.railway.app/api/news");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setDynamicNews(data);
                } else {
                    setDynamicNews([]);
                }
            } catch (err) {
                setNewsError("تعذر تحميل الأخبار من الخادم.");
                setDynamicNews([]);
            } finally {
                setLoadingNews(false);
            }
        };

        fetchNews();
    }, []);

    const handleNewsClick = (newsId) => {
        navigate(`/news/${newsId}`);
    };

    const displayedNews = Array.isArray(dynamicNews) && dynamicNews.length > 0 ? dynamicNews : dynamicNews;

    return (
        <Layout>
            <div className="page-container">
                <div className="cover-img">
                    <img src={CoverImag} alt="News Cover" loading="lazy"/>
                    <h1>الأخبار</h1>
                </div>
                <div className="section news-section">
                    <h2>آخر الأخبار</h2>
                    <div className="news-list">
                        {loadingNews ? (
                            <div style={{ color: "#888", textAlign: "center", padding: "2em", fontSize: "1.1em" }}>
                                جاري تحميل الأخبار...
                            </div>
                        ) : newsError ? (
                            <div style={{ color: "#e11d48", textAlign: "center", padding: "2em", fontSize: "1.1em" }}>
                                {newsError} <br /> سيتم عرض آخر الأخبار المتوفرة.
                            </div>
                        ) : (
                            displayedNews.map((item, idx) => (
                                <div className="news-card" key={item.id || idx}>
                                    <div className="news-image-container">
                                        <img
                                            src={item.image || "/pics/news-placeholder.jpg"}
                                            alt={item.title || "خبر"}
                                            className="news-image"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="news-info">
                                        <h3 className="news-title">{item.title}</h3>
                                        <div className="news-date">{item.date}</div>
                                        <div className="news-summary">
                                            {item.summary ? item.summary.slice(0, 90) + (item.summary.length > 90 ? "..." : "") : ""}
                                        </div>
                                        <button 
                                            className="news-read-more"
                                            onClick={() => handleNewsClick(item.id)}
                                        >
                                            اقرأ المزيد
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NewsPage;
