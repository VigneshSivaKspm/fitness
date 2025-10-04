import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="quick">
          <h4>Quick links</h4>
          <div className="links">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                const anyWin = window as any
                if(typeof anyWin.openSearch === 'function') anyWin.openSearch()
                else window.dispatchEvent(new Event('open-search'))
              }}
            >
              Search
            </a>
          </div>
        </div>
      </div>
      <hr className="sep" />
      <div className="container meta">
        <div className="copy">© {year}, JACK COWBOY LIMITED</div>
        <nav className="policies">
          <a href="#">Privacy policy</a>
          <Link to="/contact">Contact information</Link>
          <a href="#">Refund policy</a>
          <a href="#">Terms of service</a>
        </nav>
      </div>
    </footer>
  )
}
