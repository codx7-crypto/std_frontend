import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home_pages';
import BlogPage from './pages/BlogPage';
import Blog from './pages/Blog';
import UniversitiesPage from './pages/UniversitiesPage';
import University from './pages/University';
import NewsPage from './pages/NewsPage';
import MajorsPage from './pages/MajorsPage';
import Major from './pages/Major';
import SearshedUniversities from './pages/SearshedUniversities'
import './index.css';
import News from './pages/news';
import StartInTurkey from './pages/start_in_turkey';




function App() {
    return (
        
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/BlogPage" element={<BlogPage />} />
                <Route exact path="/blog/:id" element={<Blog />} />
                <Route exact path="/UniversitiesPage" element={<UniversitiesPage />} />
                <Route exact path="/SearshedUniversities" element={<SearshedUniversities />} />
                <Route exact path="/university/:id" element={<University />} />
                <Route exact path="/NewsPage" element={<NewsPage />} />
                <Route exact path="/MajorsPage" element={<MajorsPage />} />
                <Route path="/majors/:id" element={<Major />} />
            <Route path="/news/:id" element={<News />} />
            <Route path="/start_in_turkey" element={<StartInTurkey />} />

           
            </Routes>
        </Router>
    );
}

export default App;