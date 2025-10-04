import './TopCategories.css'
import { Link } from 'react-router-dom'

const categories = [
  {
    title: 'Balance Trainers',
    img: '/images/Category/BalanceTrainers.webp',
  },
  {
    title: 'Barbell & Dumbbell Sets',
    img: '/images/Category/BarbellDumbbellSets.webp',
  },
  {
    title: 'Bodybars',
    img: '/images/Category/Bodybars.webp',
  },
  {
    title: 'Elliptical Trainers',
    img: '/images/Category/ElipticalTrainers.webp',
  },
  {
    title: 'Exercise bikes',
    img: '/images/Category/ExerciseBikes.webp',
  },
]

export default function TopCategories(){
  return (
    <section className="topcats">
      <div className="container">
        <h3 className="topcats-title">Shop our top categories</h3>
        <div className="topcats-row">
          {categories.map((c) => (
            <Link key={c.title} className="cat-card" to={`/catalog?category=${encodeURIComponent(c.title)}`}>
              <div className="cat-media">
                <img src={c.img} alt={c.title} />
                <div className="red-glow" />
              </div>
              <div className="cat-body">
                <span className="cat-name">{c.title}</span>
                <span className="arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
