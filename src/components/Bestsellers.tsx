import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './Bestsellers.css'

type Product = {
  id: number
  name: string
  category: string
  price: number
  currency: string
  images: string[]
}

function formatPrice(price: number, currency: string) {
  const symbol = currency === 'GBP' ? '£' : ''
  return `${symbol}${price.toFixed(2)} ${currency}`
}

function Qty({ value, onChange }: { value: number; onChange: (v:number)=>void }){
  return (
    <div className="qty">
      <button className="qty-btn" onClick={() => onChange(Math.max(0, value-1))}>–</button>
      <div className="qty-value">{value}</div>
      <button className="qty-btn" onClick={() => onChange(value+1)}>+</button>
    </div>
  )
}

function Card({ p }: { p: Product }){
  const [qty, setQty] = useState(0)
  const img = p.images?.[0] || ''
  return (
    <div className="bs-card">
      <Link to={`/product/${p.id}`} className="bs-media">{img ? <img src={img} alt={p.name} loading="lazy"/> : <div className="img-fallback"/>}</Link>
      <div className="bs-body">
        <Link className="bs-name" to={`/product/${p.id}`}>{p.name}</Link>
        <div className="bs-price">{formatPrice(p.price, p.currency)}</div>
      </div>
      <div className="bs-footer"><Qty value={qty} onChange={setQty} /></div>
    </div>
  )
}

export default function Bestsellers(){
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Prefer these IDs to match screenshot; fallback to first 5
  const pickIds = useMemo(() => [15,1,8,18,20], [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try{
        setLoading(true)
        const res = await fetch('/Products/Details/product-details.json')
        const data: Product[] = await res.json()
        let chosen = data.filter(d => pickIds.includes(d.id))
        if (chosen.length < 5) chosen = data.slice(0,5)
        if(mounted) setItems(chosen)
      } finally {
        if(mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [pickIds])

  return (
    <section className="bestsellers">
      <div className="container">
        <h3 className="bs-title">Proven bestsellers</h3>
        {!loading && (
          <div className="bs-grid">
            {items.map(p => <Card key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
