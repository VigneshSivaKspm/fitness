import './Hero.css'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="eyebrow">WELCOME JACK COWBOY LIMITED</p>
        <h1 className="hero-title">Train Smarter, Stronger, Better –<br/>With Gear You Can Trust</h1>
        <Link to="/catalog" className="cta">Shop all</Link>
      </div>
    </section>
  )
}
