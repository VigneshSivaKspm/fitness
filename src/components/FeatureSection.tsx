import './FeatureSection.css'

export default function FeatureSection(){
  return (
    <section className="feature">
      <div className="container">
        <div className="feature-card">
          <div className="feature-image">
            <img src="/images/Fitness-A-Lifestyle.webp" alt="Modern gym interior with equipment" />
          </div>
          <div className="feature-content">
            <h3>Fitness as a Lifestyle: Why Quality Equipment Matters</h3>
            <p>Today, fitness is no longer just about going to the gym – it has become an essential part of a healthy and balanced lifestyle. Regular training helps us stay strong, reduce stress, and improve overall well-being.</p>
            <p>That’s why choosing quality equipment is so important. Reliable and durable gear not only makes workouts safer and more effective but also motivates us to stay consistent on our fitness journey. Investing in the right tools means investing in your health and results.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
