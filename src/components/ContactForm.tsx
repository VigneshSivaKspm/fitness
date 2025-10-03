import { useState } from 'react'
import './ContactForm.css'

export default function ContactForm(){
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  function update<K extends keyof typeof form>(key: K, value: string){
    setForm({ ...form, [key]: value })
  }

  function onSubmit(e: React.FormEvent){
    e.preventDefault()
    if(!form.email){
      alert('Please enter your email')
      return
    }
    // Demo only: show success and reset
    setSent(true)
    setTimeout(() => setSent(false), 2500)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section className="contact">
      <div className="container">
        <h3 className="contact-title">Contact form</h3>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="row two">
            <div className="field">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e)=>update('name', e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="email"
                placeholder="Email *"
                required
                value={form.email}
                onChange={(e)=>update('email', e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e)=>update('phone', e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <textarea
                placeholder="Comment"
                rows={5}
                value={form.message}
                onChange={(e)=>update('message', e.target.value)}
              />
            </div>
          </div>
          <button className="contact-submit" type="submit">{sent ? 'Sent' : 'Send'}</button>
        </form>
      </div>
    </section>
  )
}
