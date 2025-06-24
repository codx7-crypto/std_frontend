import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../pages_css/SearshedUniversities.css";
import Layout from "../Components/Layout";
import CoverImag from "../photos/universities_cover.jpg";

const SearshedUniversities = () => {
  const location = useLocation();
  const {
    universities: passedUniversities = [],
    selectedMajor,
    degree,
  } = location.state || {};

  const [universities, setUniversities] = useState(passedUniversities);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const uniqueLocations = [
      ...new Set(passedUniversities.map((u) => u.location?.split("،")[0])),
    ];
    const locationCounts = uniqueLocations.map((loc) => ({
      name: loc,
      count: passedUniversities.filter((u) =>
        u.location?.startsWith(loc)
      ).length,
    }));
    setLocations(locationCounts);
  }, [passedUniversities]);

  const handleLocationClick = (locationName) => {
    setSelectedLocation(
      selectedLocation === locationName ? null : locationName
    );
  };

  const filteredUniversities = selectedLocation
    ? universities.filter((uni) =>
        uni.location?.startsWith(selectedLocation)
      )
    : universities;

  const importantUniversities = universities.filter((uni) => uni.important);

  return (
    <Layout>
      <div className="page-container">
        <div className="cover-img">
          <img src={CoverImag} alt="cover" loading="lazy"/>
          <h1>الجامعات</h1>
        </div>

        {/* ✅ معلومات البحث */}
        <div
          className="search-summary-section"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "1rem 2rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              minWidth: "200px",
            }}
          >
            <h4 style={{ color: "#E91E63", marginBottom: "0.5rem" }}>
              <i className="fa fa-th-large"></i> التخصص
            </h4>
            <h3>{selectedMajor || "غير محدد"}</h3>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "1rem 2rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              minWidth: "200px",
            }}
          >
            <h4 style={{ color: "#E91E63", marginBottom: "0.5rem" }}>
              <i className="fa fa-bar-chart"></i> الدرجة العلمية
            </h4>
            <h3>{degree || "غير محددة"}</h3>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          التخصص الذي تبحث عنه متاح في الجامعات التالية
        </p>

        <div className="universities-page-content">
          {universities.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              لم يتم العثور على جامعات مطابقة.
            </p>
          ) : (
            <>
              {/* قائمة الجامعات */}
              <div className="universities-container">
                {filteredUniversities.map((uni) => (
                  <div key={uni.id} className="university-card">
                    <Link to={`/university/${uni.id}`}>
                      <div className="university-cover-container">
                        <img
                          src={uni.coverimage}
                          alt="cover"
                          className="university-cover"
                          loading="lazy"
                        />
                        <img
                          src={uni.logo}
                          alt="logo"
                          className="university-logo"
                          loading="lazy"
                        />
                      </div>
                      <div className="university-info">
                        <h5 className="university-title">{uni.name}</h5>
                        <span className="university-location">
                          {uni.location}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* الشريط الجانبي */}
              <div className="universities-sidebar">
                <div className="sidebar-card" style={{background:'transparent', position:'sticky'}}>
                  <h3 className="sidebar-title">المواقع</h3>
                  <ul className="locations-list">
                    {locations.map((location, index) => (
                      <li
                        key={index}
                        className={`location-item ${
                          selectedLocation === location.name ? "active" : ""
                        }`}
                        onClick={() => handleLocationClick(location.name)}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="location-name">{location.name}</span>
                        <span className="location-count">
                          {location.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sidebar-card">
                  <h3 className="sidebar-title" style={{background:'transparent', position:'sticky'}}>الجامعات المميزة</h3>
                  <div className="important-universities">
                    {importantUniversities.map((uni) => (
                      <Link
                        to={`/university/${uni.id}`}
                        key={uni.id}
                        className="important-university"
                      >
                        <img
                          src={uni.logo}
                          alt={uni.name}
                          className="important-university-image"
                          loading="lazy"
                        />
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

export default SearshedUniversities;
