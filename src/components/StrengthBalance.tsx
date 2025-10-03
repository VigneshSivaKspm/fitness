import './StrengthBalance.css'

const items = [
  {
    title: 'Body Bar – Controlled Strength',
    text:
      'A body bar is a versatile tool that helps build lean muscle and improve endurance. Its simple design makes it perfect for both individual and group training sessions.',
  },
  {
    title: 'Exercise Ball – Flexibility and Balance',
    text:
      'The exercise ball enhances stretching, stability, and core strength. It’s essential for balance training and rehabilitation routines.',
  },
  {
    title: 'Barbell & Dumbbell Set – Ultimate Power',
    text:
      'This set allows you to target every major muscle group with adjustable resistance. Perfect for home gyms, it supports both beginners and serious athletes.',
  },
]

export default function StrengthBalance(){
  return (
    <section className="sb">
      <div className="container">
        <h2 className="sb-title">Strength, Balance, and Power – The Core of Your Fitness</h2>
        <div className="sb-grid">
          {items.map((it) => (
            <div key={it.title} className="sb-card">
              <h4 className="sb-card-title">{it.title}</h4>
              <p className="sb-card-text">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
