import './TopCategories.css'

const categories = [
  {
    title: 'Balance Trainers',
    img: 'https://images.unsplash.com/photo-1599050751791-5a9c3e39fb4d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Barbell & Dumbbell Sets',
    img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Bodybars',
    img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Elliptical Trainers',
    img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2edc4b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Exercise bikes',
    img: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function TopCategories(){
  return (
    <section className="topcats">
      <div className="container">
        <h3 className="topcats-title">Shop our top categories</h3>
        <div className="topcats-row">
          {categories.map((c) => (
            <a key={c.title} className="cat-card" href="#">
              <div className="cat-media">
                <img src={c.img} alt={c.title} />
                <div className="red-glow" />
              </div>
              <div className="cat-body">
                <span className="cat-name">{c.title}</span>
                <span className="arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
