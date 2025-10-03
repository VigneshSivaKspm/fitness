import './styles/common.css'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import Footer from './components/Footer'

function App() {
  return (
    <div className="site">
      <AnnouncementBar />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
