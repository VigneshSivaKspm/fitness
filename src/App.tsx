import './styles/common.css'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import CatalogPage from './pages/CatalogPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'

function App() {
  return (
    <div className="site">
      <AnnouncementBar />
      <Header />
      <SearchOverlay />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
