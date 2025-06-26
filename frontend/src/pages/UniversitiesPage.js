import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages_css/UniversitiesPage.css";
import Layout from '../Components/Layout';
import CoverImag from "../photos/universities_cover.jpg";

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch universities and locations from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://stdbackend-production.up.railway.app/api/universities");
        const data = await res.json();
        console.log(data);
        setUniversities(data.universities || []);
        const uniqueLocations = [...new Set(data.universities.map(u => u.location.split('،')[0]))];
        const locationCounts = uniqueLocations.map(loc => ({
          name: loc,
          count: data.universities.filter(u => u.location.startsWith(loc)).length
        }));

        setLocations(locationCounts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch universities:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLocationClick = (locationName) => {
    setSelectedLocation(selectedLocation === locationName ? null : locationName);
  };

  const filteredUniversities = selectedLocation
    ? universities.filter(uni => uni.location.startsWith(selectedLocation))
    : universities;

  const importantUniversities = universities.filter(uni => uni.important);

  return (
    <Layout>
      <div className="page-container">
        <div className="cover-img">
          <img src={CoverImag} alt="cover" loading="lazy"/>
          <h1>الجامعات</h1>
        </div>

        <div className="universities-page-content">
          {loading ? (
            <p style={{ textAlign: "center" }}>جارٍ تحميل الجامعات...</p>
          ) : (
            <>
              {/* Main Universities List */}
              <div className="universities-container">
                {filteredUniversities.map((uni) => (
                  <div key={uni.id} className="university-card">
                    <Link to={`/university/${uni.id}`}>
                      <div className="university-cover-container">
                        <img src={uni.coverimage} alt="cover" className="university-cover" loading="lazy"/>
                        <img src={uni.logo} alt="logo" className="university-logo" loading="lazy"/>
                      </div>
                      <div className="university-info">
                        <h5 className="university-title">{uni.name}</h5>
                        <span className="university-location">{uni.location}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="universities-sidebar">
                {/* Locations Card */}
                <div className="sidebar-card" style={{background:'transparent'}}>
                  <h3 className="sidebar-title">المواقع</h3>
                  <ul className="locations-list">
                    {locations.map((location, index) => (
                      <li
                        key={index}
                        className={`location-item ${selectedLocation === location.name ? "active" : ""}`}
                        onClick={() => handleLocationClick(location.name)}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="location-name">{location.name}</span>
                        <span className="location-count">{location.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Most Important Universities */}
                <div className="sidebar-card" style={{background:'transparent'}}>
                  <h3 className="sidebar-title">الجامعات المميزة</h3>
                  <div className="important-universities">
                    {importantUniversities.map((uni) => (
                      <Link to={`/university/${uni.id}`} key={uni.id} className="important-university">
                        <img src={uni.logo} alt={uni.name} className="important-university-image" loading="lazy"/>
                        <div className="important-university-info">
                          <h4>{uni.name}</h4>
                          <span className="university-date">{uni.date}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UniversitiesPage;
