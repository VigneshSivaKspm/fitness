import './Header.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">JACK COWBOY LIMITED</div>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(o => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <nav id="primary-navigation" className={`nav ${open ? 'open' : ''}`}>
          <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/catalog" onClick={closeMenu}>Catalog</NavLink>
          <NavLink className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} to="/contact" onClick={closeMenu}>Contact</NavLink>
        </nav>

        <div className="actions">
          <button
            className="icon-btn"
            aria-label="Search"
            title="Search"
            onClick={() => {
              const anyWin = window as any
              if(typeof anyWin.openSearch === 'function') anyWin.openSearch()
              else window.dispatchEvent(new Event('open-search'))
            }}
          >
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
