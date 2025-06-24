import MyNavbar from "../Components/Navbar2"
import Footer from "../Components/footer"
import CONTACT from "../Components/Contact"
import FAQ from "../Components/FAQ"
import "../pages_css/home_pages.css";  // Ensure correct filename
import { useState , useEffect , useRef} from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import turkeyflag from "../photos/Turkey-Flag-Transparent.png";
import studentgirl from "../photos/student-yellow-nobackground.png";
import round_pic1 from "../photos/round-pic1.png";
import round_pic2 from "../photos/round-pic2.png";
import istockphoto_ from "../photos/istockphoto.jpg"
import student_point from "../photos/studnet-pointing.png"

const images = ["/pics/istockphoto-1438185814-612x612.jpg","/pics/MicrosoftTeams-image-13.jpg"  , "/pics/successful-college-student-lg.png"]


const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const aboutRef = useRef(null);
  // const [visible, setVisible] = useState(false);





const navigate = useNavigate();
const [universities, setUniversities] = useState([]);
const [majors, setMajors] = useState([]);
const [dynamicNews, setDynamicNews] = useState([]);
const [loadingNews, setLoadingNews] = useState(true);
const [newsError, setNewsError] = useState("");
const [retryCount, setRetryCount] = useState(0);
const MAX_RETRIES = 3;
const uniRef = useRef();
const majorRef = useRef();
const servicesSliderRef = useRef();
const [pauseScroll, setPauseScroll] = useState(false);
const [activeSlide, setActiveSlide] = useState(0);
const [activeMajorSlide, setActiveMajorSlide] = useState(0);
const [blogs, setBlogs] = useState([]);
const [loadingBlogs, setLoadingBlogs] = useState(true);
const [blogsError, setBlogsError] = useState("");
const [searchmajors, setSearchMajors] = useState([]);
const [filteredMajors, setFilteredMajors] = useState([]);
const [selectedMajor, setSelectedMajor] = useState('');
const [language, setLanguage] = useState('');
const [degree, setDegree] = useState('');
const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const element = document.getElementById(location.hash.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);

const [services] = useState([
    {
        id: 1,
        icon: "🏥",
        title: "التأمين الصحي",
        description: "يتعين حصول الطالب على التأمين الصحي خلال سنوات الدراسة من الأمور الضرورية والأساسية وبإمكان الطالب الحصول على التأمين الصحي من خلال التواصل مع شركتنا"
    },
    {
        id: 2,
        icon: "🎓",
        title: "معادلة الشهادات الثانوية والجامعية",
        description: "يتولى فريقنا معادلة الشهادات الثانوية والجامعية الصادرة من خارج تركيا ليتمكن أصحابها من مزاولة العمل داخل أراضي الجمهورية وفق القوانين الرسمية"
    },
    {
        id: 3,
        icon: "📋",
        title: "الإقامة الطلابية",
        description: "يحرص قسم الشؤون القانونية المختص والحاصل بالقوانين التركية على تقديم طلبات الإقامة لكافة الطلاب المسجلين وفتح تريف ملف الإقامة بشكل كامل قبل تقديمه للجامعة أو لإدارة الهجرة"
    },
    {
        id: 4,
        icon: "🏠",
        title: "خدمات السكن الطلابي",
        description: "نساعدك في العثور على السكن المناسب مع توفير كافة الخدمات اللازمة من تأثيث وصيانة وخدمات الإنترنت"
    },
    {
        id: 5,
        icon: "📚",
        title: "الإرشاد الأكاديمي",
        description: "نقدم خدمات الإرشاد الأكاديمي الشامل لمساعدتك في اختيار التخصص المناسب والجامعة المثالية لتحقيق أهدافك"
    },
    {
        id: 6,
        icon: "🔤",
        title: "خدمات الترجمة",
        description: "نوفر خدمات ترجمة معتمدة لكافة الوثائق والمستندات المطلوبة للدراسة في تركيا"
    }
]);

useEffect(() => {
  const fetchMajors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/majorsnames');
      const data = await response.json();
      setSearchMajors(data.majors);
      setFilteredMajors(data.majors);
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };

  fetchMajors();
}, []);

const handleMajorChange = (e) => {
  const input = e.target.value;
  setSelectedMajor(input);
  const filtered = searchmajors.filter((m) =>
    m.name.toLowerCase().includes(input.toLowerCase())
  );
  setFilteredMajors(filtered);
};

const handleSearch = async (e) => {
  e.preventDefault();
  try {
    const cleanedMajor = selectedMajor.replace(/^تخصص\s*/, "").trim();

    const query = new URLSearchParams({
      major: cleanedMajor,
      language,
      degree,
    }).toString();

    const response = await fetch(`http://localhost:5000/api/searchuniversities?${query}`);
    const universities = await response.json();

    console.log("Matching universities:", universities);

    navigate("/SearshedUniversities", {
      state: {
        universities,
        selectedMajor: cleanedMajor,
        degree
      },
    });

  } catch (error) {
    console.error("Error searching universities:", error);
  }
};

// Transform majors to react-select format
const majorOptions = filteredMajors?.map((m) => ({
  value: m.name,
  label: m.name
})) || [];


const fetchNews = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/news");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data)
    if (Array.isArray(data) && data.length > 0) {
      setDynamicNews(data);
    } else {
      setDynamicNews([]);
    }
    setLoadingNews(false);
  } catch (err) {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      setTimeout(fetchNews, 1000 * Math.pow(2, retryCount)); // Exponential backoff
    } else {
      setNewsError("تعذر تحميل الأخبار من الخادم. سيتم عرض آخر الأخبار المتوفرة.");
      setDynamicNews([]);
      setLoadingNews(false);
    }
  }
};

useEffect(() => {
  fetchNews();
}, []);

useEffect(() => {
  setUniversities([
    {
        id: 1,
        name: " جامعة اسطنبول ميديبول",
        image: "/universitiesPics/MidipolIst1.jpg",
        logo: "/universitiesPics/midipol4.png",
        location: "تركيا - اسطنبول",
        views: 43412
    },
    {
        id: 2,
        name: "جامعة أنقرة مديبول",
        image: "/universitiesPics/ankaramidipol1.jpg",
        logo: "/universitiesPics/ankaramidipol4.png",
        location: "تركيا - أنقرة ",
        views: 29979
    },
    {
        id: 3,
        name: "جامعة أوستيم التقنية",
        image: "/universitiesPics/OstimCover.jpg",
        logo: "/universitiesPics/OstimLogo.png",
        location: "تركيا - أنقرة ",
        views: 131865
    },
      {
        id: 4,
        name: "جامعة اتيليم",
        image: "/universitiesPics/atilim1.jpg",
        logo: "/universitiesPics/atilim4.png",
        location: "تركيا - اسطنبول",
        views: 106598
      },
      {
        id: 9,
        name: "جامعة اسطنبول ايدن",
        image: "/universitiesPics/ayden1.jpg",
        logo: "/universitiesPics/ayden4.png",
        location: "تركيا - اسطنبول",
        views: 106598
      },
      {
        id: 23,
        name: "جامعة نيشان تاشي",
        image: "/universitiesPics/nishan1.jpg",
        logo: "/universitiesPics/nishan4.png",
        location: "تركيا - اسطنبول",
        views: 106598
      },
      {
        id: 27,
        name: "جامعة ابن خلدون",
        image: "/universitiesPics/khaldon1.jpg",
        logo: "/universitiesPics/khaldon4.jpg",
        location: "تركيا - اسطنبول",
        views: 106598
      },
      {
        id: 19,
        name: "جامعة الخليج",
        image: "/universitiesPics/halig1.jpg",
        logo: "/universitiesPics/halig4.jpg",
        location: "تركيا - اسطنبول",
        views: 106598
      }
  ]);

  setMajors([
    {
      id: 30,
      name: "تخصص هندسة  البرمجيات",
      image: "/majors/30.png",
      degree: "التخصصات الهندسية"
    },
    {
      id: 11,
      name: "تخصص الطب البشري",
      image: "/majors/11.png",
      degree: "التخصصات الطبية"
    },
    {
      id: 23,
      name: "تخصص الهندسة المعمارية",
      image: "/majors/23.png",
      degree: "التخصصات الهندسية"
    },
    {
      id: 27,
      name: "تخصص علم النفس",
      image: "/majors/27.png",
      degree: "العلوم الاجتماعية والإنسانية"
    }
  ]);
}, []);


const scrollSlider = (ref, direction) => {
  const scrollAmount = 300;
  ref.current.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};

useEffect(() => {
  const scrollAmount = 340; // Same width as card + gap
  
  const autoScroll = (ref, setActiveSlide, totalItems) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        // Reset to start when reaching the end
        ref.current.scrollTo({ left: 0, behavior: "smooth" });
        setActiveSlide(0);
      } else {
        // Calculate next slide index
        const nextSlide = Math.min(
          Math.floor((scrollLeft + scrollAmount) / scrollAmount),
          totalItems - 1
        );
        ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setActiveSlide(nextSlide);
      }
    }
  };

  // Set up intervals for both universities and majors
  const interval1 = setInterval(() => {
    if (!pauseScroll) {
      autoScroll(uniRef, setActiveSlide, universities.length);
    }
  }, 4000);

  const interval2 = setInterval(() => {
    if (!pauseScroll) {
      autoScroll(majorRef, setActiveMajorSlide, majors.length);
    }
  }, 4000);

  return () => {
    clearInterval(interval1);
    clearInterval(interval2);
  };
}, [pauseScroll, universities.length, majors.length]);



  // useEffect(() => {
  //   const handleScroll = () => {
  //     const top = aboutRef.current.getBoundingClientRect().top;
  //     const windowHeight = window.innerHeight;

  //     if (top < windowHeight - 100) {
  //       setVisible(true);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   handleScroll(); // run once in case it's already in view

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);


  const useFadeInOnScroll = () => {
    const ref = useRef();
    const [isVisible, setVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);
  
    return [ref, isVisible];
  };


const [servicesRef, servicesVisible] = useFadeInOnScroll();

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 1 second
    
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setActiveSlide(index);
    const scrollAmount = index * 450; // Adjust this value based on your card width + gap
    uniRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
};

const handleMajorDotClick = (index) => {
  setActiveMajorSlide(index);
  const scrollAmount = index * 340; // Adjust this value based on your card width + gap
  majorRef.current.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
};

// Update the major section's scroll handler
const handleMajorScroll = (e) => {
  const scrollLeft = e.target.scrollLeft;
  const cardWidth = 340; // Card width + gap
  const newActive = Math.round(scrollLeft / cardWidth);
  setActiveMajorSlide(newActive);
};

const fetchBlogs = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/importantBlogsRoutes");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      setBlogs(data);
    } else {
      setBlogs([]);
    }
    setLoadingBlogs(false);
  } catch (err) {
    setBlogsError("تعذر تحميل المدونات من الخادم.");
    setBlogs([]);
    setLoadingBlogs(false);
  }
};

useEffect(() => {
  fetchBlogs();
}, []);

  return (
    <div className="HomePage">
      <MyNavbar/>
    <div className="parent">
    
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src="/pics/Untitled design.mp4" type="video/mp4" />
        
       
      </video>
      
      
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-title">
            <span className="hero-highlight">مستشارك</span>
            <span> التعليمي الأول للدراسة في تركيا</span>
          </div>
          <div className="hero-subtitle">
            الموقع العربي الأول المختص بالدراسة في تركيا للطلاب الاجانب
          </div>
        </div>
      </div>
      
      <div className="search-bar-hero">
      <div className="search-bar-hero-title">ابحث عن التخصص الذي ترغب فيه</div>
      <form className="search-bar-hero-form" onSubmit={handleSearch}>
        {/* Search Button */}
        <button type="submit" className="search-bar-hero-btn">
          <i className="fa fa-search"></i> ابحث
        </button>

        {/* Majors Input Field */}
        <div className="search-bar-hero-field">
          <span className="search-bar-hero-icon"><i className="fa fa-th-large"></i></span>
          <Select
          className="majorselect"
          placeholder="إختر التخصص الذي ترغب فيه"
          options={majorOptions}
          value={majorOptions.find((option) => option.value === selectedMajor)}
          onChange={(selectedOption) => setSelectedMajor(selectedOption?.value || "")}
          isClearable
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              minHeight: 'unset',
              height: '100%',
              padding: '0',
              direction: 'rtl',
              textAlign: 'right',
              color:'white'
            }),
            valueContainer: (base) => ({
              ...base,
              padding: '0 4px'
            }),
            dropdownIndicator: () => ({ display: 'none' }),
            indicatorSeparator: () => ({ display: 'none' }),
            menu: (base) => ({
              ...base,
              direction: 'rtl',
              textAlign: 'right',
              zIndex: 999,
              width: '350px', // ⬅️ زيادة العرض
              backgroundColor: 'rgba(24, 24, 24, 0.35)', // خلفية سوداء
              fontFamily: '"Cairo", sans-serif',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#222' : 'rgba(24, 24, 24, 0.35)', // تحديد اللون عند المرور
              color: '#fff', // نص أبيض
              fontFamily: '"Cairo", sans-serif',
              padding: '8px 12px',
              cursor: 'pointer',
            }),
            placeholder: (base) => ({
              ...base,
              color: 'white',
              fontFamily: '"Cairo", sans-serif',
            }),
            singleValue: (base) => ({
              ...base,
              color: '#fff',
              fontFamily: '"Cairo", sans-serif',
            }),
          }}
        />

          <span className="search-bar-hero-icon-arrow"><i className="fa fa-arrow-up"></i></span>
        </div>

        {/* Language Select Field */}
        <div className="search-bar-hero-field">
          <span className="search-bar-hero-icon"><i className="fa fa-globe"></i></span>
          <select
            className="select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            onMouseEnter={(e) => e.target.size = 3}
            onMouseLeave={(e) => e.target.size = 1}
            onBlur={(e) => e.target.size = 1}
            style={{
              width: '15em',
              direction: 'rtl'
            }}
          >
            <option value="">اختر لغة الدراسة التي تريدها</option>
            <option value="arabic">العربية</option>
            <option value="english">الإنجليزية</option>
            <option value="turkish">التركية</option>
          </select>
          <span className="search-bar-hero-icon-arrow"><i className="fa fa-arrow-up"></i></span>
        </div>

        {/* Degree Select Field */}
        <div className="search-bar-hero-field">
          <span className="search-bar-hero-icon"><i className="fa fa-bar-chart"></i></span>
          <select
            className="select"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            onMouseEnter={(e) => e.target.size = 3}
            onMouseLeave={(e) => e.target.size = 1}
            onBlur={(e) => e.target.size = 1}
            style={{
              width: '15em',
              direction: 'rtl'
            }}
          >
            <option value="">اختر الدرجة التي ترغب فيها</option>
            <option value="بكالوريوس">بكالوريوس</option>
            <option value="ماجستير">ماجستير</option>
            <option value="دكتوراه">دكتوراه</option>
          </select>
          <span className="search-bar-hero-icon-arrow"><i className="fa fa-arrow-up"></i></span>
        </div>
      </form>

      </div>
    </div>  

    <section id="aboutus" className="about-section">
      <div className="about-content">
        <h2>
          <span className="about-highlight">عن</span>  شركه النورس التعليميه
        </h2>
        <p>
          من وحي التجربة والنجاح تأسست يونـايتد التعليمية كشركة عام 2012، واضعة في قائمة أولوياتها أن تكون أول مؤسسة تختص بتقديم أفضل الاستشارات الأكاديمية للطلاب الأجانب عامة والعرب خاصة، لتوسع عملها الطلابي في إسطنبول عام 2016.
          <br /><br />
          منذ ذلك الحين تعد إحدى المؤسسات الرائدة في مجال الاستشارة الأكاديمية وتسجيل الطلاب الدوليين في الجامعات التركية، المدارس الدولية ومعاهد اللغة التابعة للجامعات، يضفيها كادر قوي من مستشارين أكاديميين ذوي خبرة ومهنية عالية تزداد مع ازدياد عدد الجامعات والمراكز التعليمية.
          <br /><br />
          تقدم مؤسسة يونـايتد التعليمية أفضل وأقوى الخصومات والمنح لطلابها في أكثر من 50 جامعة تركية لجميع المراحل الدراسية (دبلوم، بكالوريوس، ماجستير، دكتوراه) عبر نظامها الإلكتروني.
        </p>
      </div>
      <div className="about-visual">
        <div className="about-video-wrapper">
          <img src={student_point} alt="about" className="about-video-thumb" loading="lazy"/>
          {/* <span className="about-play-btn">&#9658;</span> */}
        </div>
        <img src={round_pic1} className="about-circle about-circle1" alt="" loading="lazy"/>
        <img src={round_pic2} className="about-circle about-circle2" alt="" loading="lazy"/>
        <img src={istockphoto_} className="about-circle about-circle3" alt="" loading="lazy"/>
      </div>
    </section>

    <section
      className="services-container"
      ref={servicesRef}
      id={`fade-in-section ${servicesVisible ? 'is-visible' : ''}`}
      onMouseEnter={() => setPauseScroll(true)}
      onMouseLeave={() => setPauseScroll(false)}
    >
      <div id="services" className="header-text">
        <h2>خدماتنا</h2>
        <p>نقدم لك كل ما يسهل رحلتك التعليمية في الجامعات التركية مع نخبة من مستشاري يونايتد التعليمية.</p>
      </div>
      
      <div className="slider-container">
        <button onClick={() => scrollSlider(servicesSliderRef, "left")} className="nav-btn left">
          <i className="fas fa-angle-left"></i>
        </button>
        <div 
          className="services-grid"
          ref={servicesSliderRef}
        >
          {services.map((service) => (
            <div className="service-box" key={service.id}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <button onClick={() => scrollSlider(servicesSliderRef, "right")} className="nav-btn right">
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
        {/*
            Auto-advance the services slider every 3 seconds, like the university section.
            Place this useEffect in your component:
        */}
        {useEffect(() => {
            // Number of pixels to scroll each time (should match .service-box width + gap)
            const scrollAmount = 440 + 32; // 420px box + 2rem gap (approx 32px)
            if (!servicesSliderRef.current) return;
            const slider = servicesSliderRef.current;

            const interval = setInterval(() => {
                if (!pauseScroll && slider) {
                    // If at end, scroll back to start
                    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
                        slider.scrollTo({ left: 0, behavior: "smooth" });
                    } else {
                        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
                    }
                }
            }, 3000);

            return () => clearInterval(interval);
        }, [pauseScroll, servicesSliderRef, services.length])}
    </section>


    <section id="study-in-turkey" className="study-in-turkey-section">
      <div className="study-in-turkey-content">
        <div className="study-in-turkey-flag">
          <img src={turkeyflag} alt="Turkey Flag" style={{width: '20em', height: '20em'}} loading="lazy"/>
        </div>
        <div className="study-in-turkey-text">
          <h2>
            <span className="study-in-turkey-bold">كيف سأبدأ</span>
            <span className="study-in-turkey-highlight"> الدراسة في تركيا؟</span>
          </h2>
          <p>
            اختيارك تركيا لأجل الدراسة يعني أنك اخترت التعليم في واحدة من أكثر دول العالم نمواً و تقدماً وتضمن بذلك، أن تتلقى التعليم من العقول التي أثارت طريق النجاح لملايين الطلاب من حول العالم وتحولت طموحاتهم لقصص نجاح واقعية ....
          </p>
          <Link to="/start_in_turkey">
  <button className="study-in-turkey-btn">المزيد</button>
</Link>
        </div>
        <div className="study-in-turkey-image">
          <img src={studentgirl} alt="Student" loading="lazy"/>
        </div>
      </div>
    </section>
    
    
    <section className="group-container" ref={servicesRef} id={`fade-in-section ${servicesVisible ? 'is-visible' : ''}`} >
      <div className="majores_uni">

        {useEffect(() => {
          const unisPerSection = 4;
          const totalUnis = universities.length;
          const totalSections = Math.ceil(totalUnis / unisPerSection);

          if (totalSections <= 1) return;

          const interval = setInterval(() => {
            if (!pauseScroll) {
              setActiveSlide(prev => (prev + 1) % totalSections);
            }
          }, 3000);

          return () => clearInterval(interval);
        }, [universities, pauseScroll])}
        <div className="section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ textAlign: 'center' }}>جامعاتنا</h2>
          <p style={{ textAlign: 'center' }}>اختر جامعتك المفضلة من خلال معرفة مميزات كل جامعة على حدى</p>
          <div className="slider-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div
              className="universities-grid"
              ref={uniRef}
              onMouseEnter={() => setPauseScroll(true)}
              onMouseLeave={() => setPauseScroll(false)}
              style={{
                transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                minHeight: '370px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {
                (() => {

                  const unisPerSection = 4;
                  const totalUnis = universities.length;
                  const totalSections = Math.ceil(totalUnis / unisPerSection);

                  const baseCount = Math.floor(totalUnis / totalSections);
                  const remainder = totalUnis % totalSections;
                  const sectionSizes = Array.from({ length: totalSections }, (_, i) =>
                    i < remainder ? baseCount + 1 : baseCount
                  );

                  const sectionStartIndices = sectionSizes.reduce((acc, size, i) => {
                    acc.push(i === 0 ? 0 : acc[i - 1] + sectionSizes[i - 1]);
                    return acc;
                  }, []);

                  const currentSection = Math.max(0, Math.min(activeSlide, totalSections - 1));
                  const startIdx = sectionStartIndices[currentSection];
                  const endIdx = startIdx + sectionSizes[currentSection];
                  const sectionUnis = universities.slice(startIdx, endIdx);

                  return (
                    <div
                      className="universities-section-group"
                      style={{
                        display: 'flex',
                        gap: '30px',
                        opacity: 1,
                        transform: 'translateY(0)',
                        transition: 'opacity 0.4s, transform 0.4s',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                      key={currentSection}
                    >
                      {sectionUnis.map((uni, idx) => (
                        <Link to={`/university/${uni.id}`}>
                        <div
                          className="homeuniversity-card"
                          key={uni.id + '-' + startIdx + '-' + idx}
                          tabIndex={0}
                          aria-label={uni.name}
                          onFocus={e => e.currentTarget.style.boxShadow = '0 4px 20px #2563eb33'}
                          onBlur={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'}
                        >
                          <div className="homeuniversity-cover-container">
                            <img src={uni.image} alt={uni.name} className="homeuniversity-image" loading="lazy"/>
                            <img src={uni.logo} alt={uni.name} className="homeuniversity-logo" loading="lazy"/>
                          
                            <div className="views-count">
                              <i className="fas fa-eye"></i>
                              {uni.views}
                            </div>
                          </div>
                          <div className="homeuniversity-info">
                            <h3 className="homeuniversity-name">{uni.name}</h3>
                            <div className="homeuniversity-location">
                              <i className="fas fa-map-marker-alt"></i>
                              <span>{uni.location}</span>
                            </div>
                          </div>
                        </div>
                        </Link>
                      ))}
                    </div>
                  );
                })()
              }
            </div>
          </div>
          <div className="slider-dots" style={{ display: 'flex', justifyContent: 'center' }}>
            {(() => {

              const unisPerSection = 4;
              const totalUnis = universities.length;
              const totalSections = Math.ceil(totalUnis / unisPerSection);

              const baseCount = Math.floor(totalUnis / totalSections);
              const remainder = totalUnis % totalSections;
              const sectionSizes = Array.from({ length: totalSections }, (_, i) =>
                i < remainder ? baseCount + 1 : baseCount
              );

              // For accessibility, add aria-label and focus
              return sectionSizes.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot${index === Math.min(activeSlide, totalSections - 1) ? ' active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`عرض الجامعات المجموعة ${index + 1}`}
                  tabIndex={0}
                  style={{
                    outline: 'none',
                    border: 'none',
                    background: index === Math.min(activeSlide, totalSections - 1) ? '#2563eb' : '#e2e2e2',
                    width: index === Math.min(activeSlide, totalSections - 1) ? '3rem' : '1.2rem',
                    height: '0.3rem',
                    borderRadius: '0.2rem',
                    margin: '0 0.2rem',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                />
              ));
            })()}
          </div>
          {/* Show More Universities Button */}
          <div className="show-more-btn-container" style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <a
              href="/UniversitiesPage"
              className="show-more-btn show-more-btn-hover"
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '0.6em',
                padding: '0.7em 2.2em',
                fontWeight: 600,
                fontSize: '1.1em',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background 0.2s',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)'
              }}
            >
              عرض المزيد من الجامعات
            </a>
            <style>
              {`
                .show-more-btn-hover:hover, .show-more-btn-hover:focus {
                  background: #1e40af !important;
                }
              `}
            </style>
          </div>
        </div>

        <style>
          {`
            .news-section {
              // background: linear-gradient(120deg, #f8fafc 70%, #e0e7ff 100%);
              // border-radius: 2em;
              // box-shadow: 0 8px 32px 0 rgba(30, 64, 175, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.07);
              padding: 0.5em 1.5em 2em 1.5em;
              margin: 2.5em 0 2.5em 0;
              max-width: 1100px;
              margin-left: auto;
              margin-right: auto;
              position: relative;
              overflow: visible;
              animation: fadeInNews 0.7s cubic-bezier(.33,1.5,.68,1) both;
            }
            @keyframes fadeInNews {
              0% { opacity: 0; transform: translateY(40px) scale(0.97);}
              100% { opacity: 1; transform: translateY(0) scale(1);}
            }
            .news-section h2 {
              text-align: right;
              font-size: 2.1em;
              font-weight: 700;
              color: #1e293b;
              margin-bottom: 1.2em;
              letter-spacing: 0.01em;
              border-right: 5px solid #2563eb;
              padding-right: 0.5em;
              background: linear-gradient(90deg, #2563eb 10%, #818cf8 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .news-list {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 2em;
              width: 100%;
              margin: 0 auto;
            }
            .news-card {
              //background: #fff;
              border-radius: 1.2em;
              box-shadow: 0 4px 18px 0 rgba(30, 64, 175, 0.10), 0 1px 4px 0 rgba(0,0,0,0.07);
              overflow: hidden;
              display: flex;
              flex-direction: column;
              transition: transform 0.18s cubic-bezier(.33,1.5,.68,1), box-shadow 0.18s;
              border: 1.5px solid #e0e7ff;
              min-height: 370px;
              position: relative;
            }
            .news-card:hover {
              transform: translateY(-7px) scale(1.025);
              box-shadow: 0 12px 32px 0 rgba(30, 64, 175, 0.16), 0 2px 8px 0 rgba(0,0,0,0.10);
              border-color: #c7d2fe;
            }
            .news-image-container {
              width: 100%;
              height: 170px;
              overflow: hidden;
              border-radius: 1.2em 1.2em 0 0;
              background: #f1f5f9;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .news-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 1.2em 1.2em 0 0;
              transition: transform 0.3s cubic-bezier(.33,1.5,.68,1);
            }
            .news-card:hover .news-image {
              transform: scale(1.04) rotate(-1deg);
            }
            .news-info {
              padding: 1.1em 1.1em 1.2em 1.1em;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
            }
            .news-title {
              font-size: 1.18em;
              font-weight: 600;
              color: #1e293b;
              margin-bottom: 0.5em;
              min-height: 2.5em;
              line-height: 1.3;
              text-align: right;
            }
            .news-date {
              color: #64748b;
              font-size: 0.93em;
              margin-bottom: 0.7em;
              text-align: right;
              font-weight: 400;
            }
            .news-summary {
              font-size: 1em;
              color: #334155;
              margin-bottom: 0.7em;
              text-align: right;
              min-height: 3.2em;
              line-height: 1.5;
            }
            .news-read-more {
              display: inline-block;
              margin-top: 0.7em;
              color: #2563eb;
              text-decoration: none;
              font-weight: 600;
              font-size: 1em;
              border-bottom: 1.5px solid #2563eb;
              transition: color 0.18s, border-color 0.18s;
              align-self: flex-end;
              text-align: right;
              letter-spacing: 0.01em;
            }
            .news-read-more:hover {
              color: #1e40af;
              border-color: #1e40af;
              text-decoration: underline;
            }
            @media (max-width: 700px) {
              .news-section {
                padding: 1.2em 0.3em 1.2em 0.3em;
                border-radius: 1.1em;
              }
              .news-list {
                gap: 1.1em;
              }
              .news-card {
                min-height: 320px;
                border-radius: 0.8em;
              }
              .news-image-container, .news-image {
                border-radius: 0.8em 0.8em 0 0;
                height: 120px;
              }
              .news-info {
                padding: 0.7em 0.7em 0.8em 0.7em;
              }
            }
            .show-more-btn:hover {
              background: #1e40af;
            }
            .show-more-container {
              display: flex;
              justify-content: center;
              margin-top: 1em;
            }

          `}
        </style>
        <div className="section news-section" role="region" aria-label="آخر الأخبار">
          <h2>آخر الأخبار</h2>
          <div className="news-list">
            {loadingNews ? (
              <div className="news-skeleton-container">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="news-card skeleton" role="status" aria-label="جاري تحميل الخبر">
                    <div className="news-image-container skeleton-image"></div>
                    <div className="news-info">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-date"></div>
                      <div className="skeleton-summary"></div>
                      <div className="skeleton-link"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : newsError ? (
              <div className="news-error" role="alert">
                <p>{newsError}</p>
                <button 
                  onClick={() => {
                    setRetryCount(0);
                    setLoadingNews(true);
                    fetchNews();
                  }}
                  className="retry-button"
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : (Array.isArray(dynamicNews) && dynamicNews.length > 0 ? dynamicNews : dynamicNews).slice(0, 6).map((item, idx) => (
              <Link to={`/news/${item.id}`}>
              <article className="news-card" key={item && (item.id || idx)}>
                <div className="news-image-container">
                  <img
                    src={item.image}
                    alt={item && item.title ? item.title : "صورة الخبر"}
                    className="news-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/pics/news-placeholder.jpg";
                    }}
                  />
                </div>
                <div className="news-info">
                  <h3 className="news-title">
                    {item && item.title}
                  </h3>
                  <time className="news-date" dateTime={item && item.date}>
                    {item && item.date}
                  </time>
                  <div className="news-summary">
                    {item && item.summary ? item.summary.slice(0, 90) + (item.summary.length > 90 ? "..." : "") : ""}
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
          <div className="show-more-container">
            <a
              href="/NewsPage"
              className="show-more-btn show-more-btn-hover"
              aria-label="عرض المزيد من الأخبار"
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '0.9em',
                padding: '0.7em 2.2em',
                fontWeight: 600,
                fontSize: '1.1em',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background 0.2s',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                display: 'inline-block',
                marginTop: '2em', /* بدلاً من 200px */
                textAlign: 'center',
              }}
              
            >
              عرض المزيد من الأخبار
            </a>
            <style>
              {`
                .show-more-btn-hover:hover, .show-more-btn-hover:focus {
                  background: #1e40af !important;
                }
              `}
            </style>
          </div>
        </div>

        <div id="majors" className="section">
          <h2>التخصصات الدراسية</h2>
          <p style={{
                textAlign: 'center',
                fontSize: '1em',
                color: '#1f2937',
                marginBottom: '2em',
                marginTop: '1em'
              }}>اختيار التخصص المناسب ليس بالقرار السهل لكنه ليس بالمستحيل<br/> ننصحك بالاطلاع على جميع التخصصات المتوفرة في الجامعات التركية<br/> لرسم مستقبل باهر بخطواتٍ وخطة صحيحة ومدروسة</p>
          <div className="slider-container">
            <div
              className="majors-grid"
              ref={majorRef}
              onMouseEnter={() => setPauseScroll(true)}
              onMouseLeave={() => setPauseScroll(false)}
              onScroll={handleMajorScroll}
            >
              {majors.map((major, index) => (
                <Link to={`/majors/${major.id}`} key={index}>
                <div className="homemajor-card" key={major.id}>
                  <div className="major-image-container">
                    <img src={major.image} alt={major.name} className="homemajor-image" loading="lazy"/>
                  </div>
                  <div className="homemajor-info">
                    <h3 className="homemajor-name">{major.name}</h3>
                    <div className="homemajor-degree">{major.degree}</div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="majors-dots">
            {majors.map((_, index) => (
              <button
                key={index}
                className={`major-dot ${index === activeMajorSlide ? 'active' : ''}`}
                onClick={() => handleMajorDotClick(index)}
              />
            ))}
          </div>
          {/* Show More Majors Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <a
              href="/MajorsPage"
              className="show-more-btn show-more-btn-hover"
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '0.9em',
                padding: '0.7em 2.2em',
                fontWeight: 600,
                fontSize: '1.1em',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background 0.2s',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)'
              }}
            >
              عرض المزيد من التخصصات
            </a>
            <style>
              {`
                .show-more-btn-hover:hover, .show-more-btn-hover:focus {
                  background: #1e40af !important;
                }
              `}
            </style>
          </div>
        </div>
      </div>
    </section>


          {/* Animations for cards and fade-in */}
          <style>
            {`
              @keyframes fadeInUp {
                0% {
                  opacity: 0;
                  transform: translateY(40px) scale(0.97);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              .animated-card {
                animation: fadeInUp 0.8s cubic-bezier(.33,1.5,.68,1) both;
                will-change: opacity, transform;
              }
              .animated-card-delay-1 { animation-delay: 0.1s; }
              .animated-card-delay-2 { animation-delay: 0.2s; }
              .animated-card-delay-3 { animation-delay: 0.3s; }
              .animated-card-delay-4 { animation-delay: 0.4s; }
              .animated-card-delay-5 { animation-delay: 0.5s; }
              .animated-card-delay-6 { animation-delay: 0.6s; }
            `}
          </style>
          <section className="special-turkey-section" style={{
            // background: 'linear-gradient(120deg, #e0e7ff 70%, #f8fafc 100%)',
            // borderRadius: '2em',
            // boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.07)',
            padding: '2.5em 1.5em 2em 1.5em',
            margin: '2.5em 0',
            maxWidth: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            overflow: 'visible',
            animation: 'fadeInNews 0.7s cubic-bezier(.33,1.5,.68,1) both'
          }}>
            <h2 style={{
              textAlign: 'right',
              fontSize: '2.1em',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '1.2em',
              letterSpacing: '0.01em',
              borderRight: '5px solid #2563eb',
              paddingRight: '0.5em',
              background: 'linear-gradient(90deg, #2563eb 10%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ما الذي يميز الدراسة في الجامعات التركية؟
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2em',
              width: '100%',
              margin: '0 auto'
            }}>
              <div className="animated-card animated-card-delay-1" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <i className="fas fa-globe-europe" style={{fontSize: '2em', color: '#2563eb', marginBottom: '0.7em'}}></i>
                <h3 style={{fontWeight: 700, fontSize: '1.2em', marginBottom: '0.5em'}}>تنوع ثقافي وبيئة دولية</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  الجامعات التركية تستقبل طلاباً من أكثر من 150 دولة، مما يخلق بيئة تعليمية غنية ومتنوعة ثقافياً.
                </p>
              </div>
              <div className="animated-card animated-card-delay-2" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <i className="fas fa-certificate" style={{fontSize: '2em', color: '#2563eb', marginBottom: '0.7em'}}></i>
                <h3 style={{fontWeight: 700, fontSize: '1.2em', marginBottom: '0.5em'}}>اعتراف دولي وجودة تعليمية</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  العديد من الجامعات التركية معترف بها عالمياً وتقدم برامج أكاديمية متطورة ومعتمدة في أوروبا والعالم.
                </p>
              </div>
              <div className="animated-card animated-card-delay-3" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <i className="fas fa-hand-holding-usd" style={{fontSize: '2em', color: '#2563eb', marginBottom: '0.7em'}}></i>
                <h3 style={{fontWeight: 700, fontSize: '1.2em', marginBottom: '0.5em'}}>تكاليف مناسبة وفرص منح</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  رسوم الدراسة والمعيشة في تركيا أقل بكثير من معظم الدول الأوروبية، مع توفر العديد من المنح الدراسية للطلاب الدوليين.
                </p>
              </div>
              <div className="animated-card animated-card-delay-4" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <i className="fas fa-university" style={{fontSize: '2em', color: '#2563eb', marginBottom: '0.7em'}}></i>
                <h3 style={{fontWeight: 700, fontSize: '1.2em', marginBottom: '0.5em'}}>بنية تحتية حديثة</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  الجامعات التركية مجهزة بأحدث المختبرات والمكتبات والمرافق الرياضية، وتوفر بيئة تعليمية متكاملة.
                </p>
              </div>
              <div className="animated-card animated-card-delay-5" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <i className="fas fa-language" style={{fontSize: '2em', color: '#2563eb', marginBottom: '0.7em'}}></i>
                <h3 style={{fontWeight: 700, fontSize: '1.2em', marginBottom: '0.5em'}}>برامج باللغتين التركية والإنجليزية</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  توفر الجامعات التركية العديد من البرامج الدراسية باللغة الإنجليزية بالإضافة إلى التركية، مما يسهل على الطلاب الأجانب الاندماج.
                </p>
              </div>
              <div className="animated-card animated-card-delay-6" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <i className="fas fa-map-marked-alt" style={{fontSize: '2em', color: '#2563eb', marginBottom: '0.7em'}}></i>
                <h3 style={{fontWeight: 700, fontSize: '1.2em', marginBottom: '0.5em'}}>موقع جغرافي مميز</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  تركيا تجمع بين الشرق والغرب، وتوفر للطلاب فرصة استكشاف ثقافات متنوعة وسهولة السفر لدول أوروبا وآسيا.
                </p>
              </div>
            </div>
          </section>
          
          <section className="turkey-uni-special-section" style={{
            // background: 'linear-gradient(120deg, #f8fafc 70%, #e0e7ff 100%)',
            // borderRadius: '2em',
            // boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.07)',
            padding: '2.5em 1.5em 2em 1.5em',
            margin: '8em 0 2.5em 0', // Added larger top margin
            maxWidth: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            overflow: 'visible'
          }}>
            <h2 style={{
              textAlign: 'right',
              fontSize: '2em',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '1.2em',
              letterSpacing: '0.01em',
              borderRight: '5px solid #2563eb',
              paddingRight: '0.5em',
              background: 'linear-gradient(90deg, #2563eb 10%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              أمثلة على تميز الجامعات التركية
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2em',
              width: '100%',
              margin: '0 auto'
            }}>
              <div className="animated-card animated-card-delay-1" style={{
                // background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <img src="\universitiesPics\OstimLogo.png" alt="Ostim Teknik Üniversitesi" loading="lazy" style={{width: 60, marginBottom: 16}} />
                <h3 style={{fontWeight: 700, fontSize: '1.1em', marginBottom: '0.5em'}}>جامعة أوستيم التقنية</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  متخصصة في الهندسة والتكنولوجيا، وتتميز بشراكاتها الصناعية القوية مع منطقة أوستيم الصناعية، مما يوفر فرص تدريب وتوظيف مميزة للطلاب في مجالات الهندسة الميكانيكية، الكهربائية، والإلكترونية.
                </p>
              </div>
              <div className="animated-card animated-card-delay-2" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <img src="/universitiesPics/midipol4.png" alt="Istanbul Medipol University" loading="lazy" style={{width: 60, marginBottom: 16}} />
                <h3 style={{fontWeight: 700, fontSize: '1.1em', marginBottom: '0.5em'}}>جامعة إسطنبول ميديبول</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  رائدة في التخصصات الطبية والصحية، وتضم مستشفيات جامعية حديثة تتيح للطلاب التدريب العملي المباشر في الطب وطب الأسنان والصيدلة.
                </p>
              </div>
              <div className="animated-card animated-card-delay-3" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <img src="/universitiesPics/bikent4.png" alt="Bilkent University" loading="lazy" style={{width: 60, marginBottom: 16}} />
                <h3 style={{fontWeight: 700, fontSize: '1.1em', marginBottom: '0.5em'}}>جامعة بيلكنت</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  من أفضل الجامعات البحثية في تركيا، مشهورة في مجالات الهندسة والعلوم الطبيعية، وتحتل مراكز متقدمة في التصنيفات العالمية.
                </p>
              </div>
              <div className="animated-card animated-card-delay-4" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <img src="/universitiesPics/bilgi4.png" alt="Istanbul Bilgi University" loading="lazy" style={{width: 60, marginBottom: 16}} />
                <h3 style={{fontWeight: 700, fontSize: '1.1em', marginBottom: '0.5em'}}>جامعة إسطنبول بيلجي</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  معروفة بقوة برامجها في إدارة الأعمال والعلوم الاجتماعية، وتوفر بيئة تعليمية حديثة وعلاقات دولية واسعة.
                </p>
              </div>
              <div className="animated-card animated-card-delay-5" style={{
                //background: '#fff',
                borderRadius: '1.2em',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                padding: '2em 1.2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <img src="/universitiesPics/ankaraolum4.png" alt="Ankara University" loading="lazy" style={{width: 60, marginBottom: 16}} />
                <h3 style={{fontWeight: 700, fontSize: '1.1em', marginBottom: '0.5em'}}>جامعة أنقرة للعلوم</h3>
                <p style={{textAlign: 'right', color: '#334155'}}>
                  من أعرق الجامعات الحكومية، وتتميز في تخصصات القانون والعلوم السياسية واللغات، وتعد مركزاً أكاديمياً مرموقاً في تركيا.
                </p>
              </div>
            </div>
          </section>

          
          <section
            className="required-docs-section"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // background: 'linear-gradient(135deg, #e0e7ff 60%, #f8fafc 100%)',
              // borderRadius: '2.5em',
              // boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.07)',
              margin: '8em 0',
              maxWidth: 900,
              marginLeft: 'auto',
              marginRight: 'auto',
              overflow: 'visible',
              minHeight: 320,
              padding: '2.5em 1.5em 2em 1.5em',
              position: 'relative'
            }}
          >
            {/* Top: Overlapping image in a rounded hexagon */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                width: 120,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

              }}
            >
              <img
                src="/pics/docs.png"
                alt="طالب يحمل ملفات"
                loading="lazy"
                style={{
                  width: 110,
                  height: 110,
                  objectFit: 'cover',
                  borderRadius: 24,
                  margin: 0,
                }}
              />
            </div>
            {/* Card with shadow and docs */}
            <div
              style={{
                width: '100%',
                marginTop: 80,
                background: '#fff',
                borderRadius: '1.5em',
                boxShadow: '0 2px 12px rgba(37,99,235,0.08)',
                padding: '2.5em 2em 2em 2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                position: 'relative'
              }}
            >
              <h3
                style={{
                  textAlign: 'right',
                  fontWeight: 700,
                  fontSize: '1.3em',
                  marginBottom: '1.2em',
                  color: '#1e293b',
                  letterSpacing: '0.01em',
                  borderRight: '4px solid #2563eb',
                  paddingRight: '0.5em',
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #2563eb 10%, #818cf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                الملفات المطلوبة للتسجيل للبكالوريوس
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5em',
                  width: '100%',
                  margin: '0 auto',
                  direction: 'rtl'
                }}
              >
                {/* Each doc in a "card" shape */}
                <div style={{
                  background: 'linear-gradient(120deg, #f1f5fd 80%, #e0e7ff 100%)',
                  borderRadius: '1em',
                  boxShadow: '0 1px 6px rgba(37,99,235,0.06)',
                  padding: '1.2em 1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: '#fff',
                    fontSize: '1.4em',
                    marginLeft: 8,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)'
                  }}>📄</span>
                  <span style={{fontWeight: 500, color: '#334155'}}>شهادة الثانوية العامة</span>
                </div>
                <div style={{
                  background: 'linear-gradient(120deg, #f1f5fd 80%, #e0e7ff 100%)',
                  borderRadius: '1em',
                  boxShadow: '0 1px 6px rgba(37,99,235,0.06)',
                  padding: '1.2em 1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: '#fff',
                    fontSize: '1.4em',
                    marginLeft: 8,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)'
                  }}>📝</span>
                  <span style={{fontWeight: 500, color: '#334155'}}>ترجمة الشهادة (إن وجدت)</span>
                </div>
                <div style={{
                  background: 'linear-gradient(120deg, #f1f5fd 80%, #e0e7ff 100%)',
                  borderRadius: '1em',
                  boxShadow: '0 1px 6px rgba(37,99,235,0.06)',
                  padding: '1.2em 1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: '#fff',
                    fontSize: '1.4em',
                    marginLeft: 8,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)'
                  }}>🆔</span>
                  <span style={{fontWeight: 500, color: '#334155'}}>صورة عن جواز السفر أو الهوية</span>
                </div>
                <div style={{
                  background: 'linear-gradient(120deg, #f1f5fd 80%, #e0e7ff 100%)',
                  borderRadius: '1em',
                  boxShadow: '0 1px 6px rgba(37,99,235,0.06)',
                  padding: '1.2em 1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: '#fff',
                    fontSize: '1.4em',
                    marginLeft: 8,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)'
                  }}>🎓</span>
                  <span style={{fontWeight: 500, color: '#334155'}}>صورة شخصية حديثة</span>
                </div>
                <div style={{
                  background: 'linear-gradient(120deg, #f1f5fd 80%, #e0e7ff 100%)',
                  borderRadius: '1em',
                  boxShadow: '0 1px 6px rgba(37,99,235,0.06)',
                  padding: '1.2em 1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: '#fff',
                    fontSize: '1.4em',
                    marginLeft: 8,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)'
                  }}>📑</span>
                  <span style={{fontWeight: 500, color: '#334155'}}>كشف الدرجات (إن وجد)</span>
                </div>
                <div style={{
                  background: 'linear-gradient(120deg, #f1f5fd 80%, #e0e7ff 100%)',
                  borderRadius: '1em',
                  boxShadow: '0 1px 6px rgba(37,99,235,0.06)',
                  padding: '1.2em 1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: '#fff',
                    fontSize: '1.4em',
                    marginLeft: 8,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)'
                  }}>📬</span>
                  <span style={{fontWeight: 500, color: '#334155'}}>بريد إلكتروني ورقم هاتف للتواصل</span>
                </div>
              </div>
            </div>
          </section>
          <section
            className="registration-steps-section animated-card"
            style={{
              // background: 'linear-gradient(120deg, #e0e7ff 70%, #f8fafc 100%)',
              // borderRadius: '2em', 
              // boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.07)',
              padding: '2.5em 1.5em 2em 1.5em',
              margin: '8em 0',
              maxWidth: 900,
              marginLeft: 'auto',
              marginRight: 'auto',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            <h2
              style={{
                textAlign: 'right',
                fontSize: '2em',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: '1.2em',
                letterSpacing: '0.01em',
                borderRight: '5px solid #2563eb',
                paddingRight: '0.5em',
                background: 'linear-gradient(90deg, #2563eb 10%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              خطوات التسجيل في الجامعات التركية
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '2em',
              flexWrap: 'wrap',
              marginTop: '2em'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '800px',
                position: 'relative',
                direction: 'rtl'
              }}>
                {/* Step 1 */}
                <div className="animated-card animated-card-delay-1" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}>
                    <i className="fas fa-file-alt" style={{color: '#fff', fontSize: '24px'}}></i>
                  </div>
                  <h3 style={{fontSize: '1em', textAlign: 'center', marginBottom: '5px'}}>تجهيز الأوراق</h3>
                </div>

                {/* Step 2 */}
                <div className="animated-card animated-card-delay-2" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}>
                    <i className="fas fa-check-circle" style={{color: '#fff', fontSize: '24px'}}></i>
                  </div>
                  <h3 style={{fontSize: '1em', textAlign: 'center', marginBottom: '5px'}}>اختيار التخصص</h3>
                </div>

                {/* Step 3 */}
                <div className="animated-card animated-card-delay-3" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}>
                    <i className="fas fa-edit" style={{color: '#fff', fontSize: '24px'}}></i>
                  </div>
                  <h3 style={{fontSize: '1em', textAlign: 'center', marginBottom: '5px'}}>تقديم الطلب</h3>
                </div>

                {/* Step 4 */}
                <div className="animated-card animated-card-delay-4" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}>
                    <i className="fas fa-university" style={{color: '#fff', fontSize: '24px'}}></i>
                  </div>
                  <h3 style={{fontSize: '1em', textAlign: 'center', marginBottom: '5px'}}>القبول الجامعي</h3>
                </div>

                {/* Step 5 */}
                <div className="animated-card animated-card-delay-5" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}>
                    <i className="fas fa-plane" style={{color: '#fff', fontSize: '24px'}}></i>
                  </div>
                  <h3 style={{fontSize: '1em', textAlign: 'center', marginBottom: '5px'}}>الفيزا والسفر</h3>
                </div>

                {/* Connecting Line */}
                <div style={{
                  position: 'absolute',
                  top: '30px',
                  left: '60px',
                  right: '60px',
                  height: '2px',
                  background: '#2563eb',
                  zIndex: 0
                }} />
              </div>
            </div>
          </section>

          <section
            className="pricing-section animated-card"
            style={{
              // background: 'linear-gradient(120deg, #e0e7ff 70%, #f8fafc 100%)',
              // borderRadius: '2em',
              // boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.07)',
              padding: '2.5em 1.5em 2em 1.5em', 
              margin: '2.5em 0',
              maxWidth: 900,
              marginLeft: 'auto',
              marginRight: 'auto',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            <h2
              style={{
                textAlign: 'right',
                fontSize: '2em',
                fontWeight: 700,
                color: '#1e293b',
                marginBottom: '1.2em',
                letterSpacing: '0.01em',
                borderRight: '5px solid #2563eb',
                paddingRight: '0.5em',
                background: 'linear-gradient(90deg, #2563eb 10%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              باقاتنا
            </h2>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: '2em',
              flexWrap: 'wrap',
              direction: 'rtl'
            }}>
              {/* Bronze Package */}
              <div className="pricing-card" style={{
                flex: '1 1 200px',
                maxWidth: '280px',
                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                borderRadius: '1.5em',
                padding: '1.5em',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: '#CD7F32',
                  color: 'white',
                  padding: '0.5em 1em',
                  borderRadius: '0 0 1em 1em',
                  position: 'absolute',
                  top: 0,
                  right: '50%',
                  transform: 'translateX(50%)',
                  fontSize: '0.9em',
                  fontWeight: 500
                }}>
                  برونزي
                </div>
                <div style={{
                  fontSize: '2.5em',
                  fontWeight: 700,
                  color: '#1e293b',
                  textAlign: 'center',
                  marginTop: '1em',
                  marginBottom: '0.2em'
                }}>
                  $199
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '1.5em 0',
                  flex: 1
                }}>
                  {[
                    'خدمة استشارية',
                    'مساعدة في اختيار التخصص',
                    'مساعدة في اختيار الجامعة',
                    'متابعة التقديم',
                    'متابعة القبول'
                  ].map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5em',
                      margin: '0.8em 0'
                    }}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}  
                  <li style={{margin: '0.8em 0', display: 'flex', alignItems: 'center', gap: '0.5em'}}>
                    <span>✓</span>
                    <span>خدمة VIP أساسية</span>
                  </li>
                </ul>
                <div style={{
                  marginTop: '1em',
                  textAlign: 'center' 
                }}>
                  <button className="btn btn-primary" style={{
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: 'white',
                    padding: '0.5em 1em',
                    borderRadius: '0.5em',
                    cursor: 'pointer'
                  }}>
                    اشتراك
                  </button>
                </div>
              </div>

              {/* Silver Package */}
              <div className="pricing-card" style={{
                flex: '1 1 200px',
                maxWidth: '280px',
                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                borderRadius: '1.5em',
                padding: '1.5em',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: '#C0C0C0',
                  color: 'white',
                  padding: '0.5em 1em',
                  borderRadius: '0 0 1em 1em',
                  position: 'absolute',
                  top: 0,
                  right: '50%',
                  transform: 'translateX(50%)',
                  fontSize: '0.9em',
                  fontWeight: 500
                }}>
                  فضي
                </div>
                <div style={{
                  fontSize: '2.5em',
                  fontWeight: 700,
                  color: '#1e293b',
                  textAlign: 'center',
                  marginTop: '1em',
                  marginBottom: '0.2em'
                }}>
                  $299
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '1.5em 0',
                  flex: 1
                }}>
                  {[
                    'كل مميزات الباقة البرونزية',
                    'خدمة الترجمة',
                    'متابعة إجراءات السفر',
                    'المساعدة في حجز السكن',
                    'خدمة استقبال المطار'
                  ].map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5em',
                      margin: '0.8em 0'
                    }}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}
                  <li style={{margin: '0.8em 0', display: 'flex', alignItems: 'center', gap: '0.5em'}}>
                    <span>✓</span>
                    <span>خدمة VIP متقدمة</span>
                  </li>
                </ul>
                <div style={{
                  marginTop: '1em',
                  textAlign: 'center'
                }}>
                  <button className="btn btn-primary" style={{
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: 'white',
                    padding: '0.5em 1em',
                    borderRadius: '0.5em',
                    cursor: 'pointer'
                  }}>
                    اشتراك
                  </button>
                </div>
              </div>

              {/* Gold Package */}
              <div className="pricing-card" style={{
                flex: '1 1 200px',
                maxWidth: '280px',
                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                borderRadius: '1.5em',
                padding: '1.5em',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: '#FFD700',
                  color: 'white',
                  padding: '0.5em 1em',
                  borderRadius: '0 0 1em 1em',
                  position: 'absolute',
                  top: 0,
                  right: '50%',
                  transform: 'translateX(50%)',
                  fontSize: '0.9em',
                  fontWeight: 500
                }}>
                  ذهبي
                </div>
                <div style={{
                  fontSize: '2.5em',
                  fontWeight: 700,
                  color: '#1e293b',
                  textAlign: 'center',
                  marginTop: '1em',
                  marginBottom: '0.2em'
                }}>
                  $499
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '1.5em 0',
                  flex: 1
                }}>
                  {[
                    'كل مميزات الباقة الفضية',
                    'خدمة المرافق الشخصي',
                    'المساعدة في فتح حساب بنكي',
                    'خدمة التأمين الصحي',
                    'دعم على مدار 24/7'
                  ].map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5em',
                      margin: '0.8em 0'
                    }}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}
                  <li style={{margin: '0.8em 0', display: 'flex', alignItems: 'center', gap: '0.5em'}}>
                    <span>✓</span>
                    <span>خدمة VIP شاملة</span>
                  </li>
                </ul>
                <div style={{
                  marginTop: '1em',
                  textAlign: 'center'
                }}>
                  <button className="btn btn-primary" style={{
                    background: 'linear-gradient(135deg, #2563eb 60%, #818cf8 100%)',
                    color: 'white',
                    padding: '0.5em 1em',
                    borderRadius: '0.5em',
                    cursor: 'pointer'
                  }}>
                    اشتراك
                  </button>
                </div>
              </div>
            </div>
          </section>
        
          <section style={{
            padding: '4em',
            borderRadius: '1rem',
            margin: '2% 8%'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              <h2 style={{
                textAlign: 'center',
                fontSize: '2em',
                color: '#1f2937',
                marginBottom: '0.5em'
              }}>مدونتنا</h2>
              <p style={{
                textAlign: 'center',
                fontSize: '1em',
                color: '#1f2937',
                marginBottom: '2em'
              }}>نبحث عن أكثر المعلومات والمواضيع المفيدة لك في رحلتك التعليمية في تركيا <br/> وننتقي منها كل ما هو مميز ونتيحها لك في مدوناتنا</p>

              <div
              className="bloghome-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2em',
                justifyContent: 'center'
              }}>
                {loadingBlogs ? (
                  <div style={{ textAlign: 'center', width: '100%' }}>جاري تحميل المدونات...</div>
                ) : blogsError ? (
                  <div style={{ textAlign: 'center', width: '100%', color: '#e11d48' }}>{blogsError}</div>
                ) : blogs.slice(0, 4).map((blog) => (
                  <div key={blog.id} className="blog-card" style={{width:'100%', height:'100%', background:'transparent'}}>
                <Link to={`/blog/${blog.id}`}>
                  <img src={blog.coverimage} alt="cover" className="bloghome-cover" loading="lazy"/>
                  <h6 className="bloghome-title" style={{
                    fontSize: '1.2rem',
                    color: '#333',
                    textAlign: 'right',
                    fontFamily: '"Cairo", sans-serif',
                    direction: 'rtl',
                    marginBottom:'1em'
                  }}>{blog.title}</h6>
                  <p className="bloghome-sammury" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxHeight: '4.5em', // تقريبًا 3 أسطر
                      direction: 'rtl',
                      textAlign: 'right',
                      
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

                  <span className="bloghome-category">{blog.category}</span>
                </Link>
              </div>
                ))}
              </div>
            </div>
          </section>
           

          <CONTACT id="contact"/>
         <FAQ/>
  
        <Footer/>




  </div>
  
  )
}


export default HomePage