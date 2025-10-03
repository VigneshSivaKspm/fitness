import { useState } from 'react'
import './BodybarsGrid.css'

type Product = {
  id: string
  name: string
  price: string
  img: string
}

const products: Product[] = [
  { id: 'p1', name: 'Rubber-Coated Body Bar 11 lb – Orange', price: '£45.99 GBP', img: 'https://images.unsplash.com/photo-1573878738605-0ebae3d7619b?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p2', name: 'Rubber-Coated Body Bar 13 lb – Blue', price: '£49.99 GBP', img: 'https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p3', name: 'Rubber-Coated Body Bar 15 lb – Purple', price: '£55.99 GBP', img: 'https://images.unsplash.com/photo-1579759792938-c4f91a0ea9f0?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p4', name: 'Rubber-Coated Body Bar 17 lb – Pink', price: '£0.00 GBP', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2edc4b?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p5', name: 'Rubber-Coated Body Bar 6.6 lb – Dark Pink', price: '£35.99 GBP', img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop' },
]

function Qty({ value, onChange }: { value: number; onChange: (v:number)=>void }){
  return (
    <div className="qty">
      <button className="qty-btn" onClick={() => onChange(Math.max(0, value-1))}>–</button>
      <div className="qty-value">{value}</div>
      <button className="qty-btn" onClick={() => onChange(value+1)}>+</button>
    </div>
  )
}

function ProductCard({ product }: { product: Product }){
  const [qty, setQty] = useState(0)
  return (
    <div className="prod-card">
      <div className="prod-media">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="prod-body">
        <div className="prod-name">{product.name}</div>
        <div className="prod-price">{product.price}</div>
      </div>
      <div className="prod-footer">
        <Qty value={qty} onChange={setQty} />
      </div>
    </div>
  )
}

export default function BodybarsGrid(){
  return (
    <section className="bodybars">
      <div className="container">
        <h3 className="bodybars-title">Bodybars</h3>
        <div className="bodybars-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}
