import './ProductFeatureList.css'

type Item = {
  title: string
  text: string
  img: string
  flip?: boolean
}

const items: Item[] = [
  {
    title: 'Barbell & Dumbbell Set',
    text:
      'The barbell and dumbbell set with a total weight of 20+ kg is designed for powerful and effective home workouts. With its versatile configuration, it allows you to target all major muscle groups through a wide variety of exercises.',
    img: '/images/Barbell&Dumbell-Set.webp',
  },
  {
    title: 'Balance Trainer 23 inch',
    text:
      'This 23-inch balance trainer is a versatile fitness tool designed to develop strength, endurance, and coordination. Made with durable, high-quality materials, it provides stability and safety during a wide range of exercises.',
    img: '/images/BalanceTrainer23Inch.webp',
    flip: true,
  },
  {
    title: 'Rubber-Coated Body Bar',
    text:
      'This 17 lb body bar is a reliable and versatile fitness tool designed for both strength and cardio workouts. Made from solid steel and coated with durable rubber, it provides excellent grip and long‑lasting performance.',
    img: '/images/RubberCoatedBodyBar.webp',
  },
]

export default function ProductFeatureList(){
  return (
    <section className="pfl">
      <div className="container">
        {items.map((it) => (
          <article key={it.title} className={`pfl-card ${it.flip ? 'flip' : ''}`}>
            <div className="pfl-media">
              <img src={it.img} alt={it.title} />
            </div>
            <div className="pfl-content">
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              <button className="btn-outline">Buy Now</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
