import './ExperienceStrip.css'

const points = [
  `I bring years of personal and professional experience in training and fitness to carefully select every piece of equipment I offer. My goal is to provide only what I trust and use myself, ensuring top quality and reliability.`,
  `Each product is chosen not just for durability, but also for how it helps you achieve real results. From building strength to improving flexibility and balance, the gear in my store supports every step of your journey.`,
  `When you choose to buy from me, you’re not just getting equipment — you’re gaining support from someone who knows what works. If you’re ready to invest in yourself, reach out today and let’s take your training to the next level.`,
]

export default function ExperienceStrip(){
  return (
    <section className="exp">
      <div className="container">
        <h2 className="exp-title">Driven by Experience, Dedicated to Your Fitness</h2>
        <div className="exp-grid">
          {points.map((p, i) => (
            <div className="exp-card" key={i}>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
