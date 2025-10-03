import './Header.css'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">JACK COWBOY LIMITED</div>
        <nav className="nav">
          <Link className="nav-link active" to="/">Home</Link>
          <a className="nav-link" href="#catalog">Catalog</a>
          <Link className="nav-link" to="/contact">Contact</Link>
        </nav>
        <div className="actions">
          <button className="icon-btn" aria-label="Search" title="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Account" title="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21a8 8 0 0 0-16 0"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Cart" title="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
