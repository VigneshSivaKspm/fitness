import './ContactPage.css'

export default function ContactPage(){
  return (
    <main className="contact-page">
      <div className="container">
        <section className="company">
          <h1>Talk about your brand</h1>
          <ul>
            <li>Trade name: JACK COWBOY LIMITED</li>
            <li>Phone number: +44 20 3876 4512</li>
            <li>Email: info1.jackcowboy@gmail.com</li>
            <li>Address: Unit 1306 100 University Street, Belfast, Northern Ireland, BT7 1HE</li>
            <li>Company number: NI722397</li>
          </ul>
        </section>

        <section className="contact-callout">
          <h2>Questions or comments? Get in touch and we'll be happy to help.</h2>
        </section>

        <form className="contact-form">
          <div className="row two">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email *" required defaultValue="" />
          </div>
          <div className="row">
            <input type="tel" placeholder="Phone number" />
          </div>
          <div className="row">
            <textarea placeholder="Comment" rows={5} />
          </div>
          <button className="submit">Send</button>
        </form>
      </div>
    </main>
  )
}
