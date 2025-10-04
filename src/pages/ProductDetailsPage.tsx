import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import './ProductDetailsPage.css'

type Product = {
  id: number
  name: string
  category: string
  price: number
  currency: string
  description: string
  images: string[]
}

function formatPrice(price: number, currency: string) {
  const symbol = currency === 'GBP' ? '£' : ''
  return `${symbol}${price.toFixed(2)} ${currency}`
}

export default function ProductDetailsPage(){
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|undefined>()
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(0)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try{
        setLoading(true)
        const res = await fetch('/Products/Details/product-details.json')
        if(!res.ok) throw new Error(`Failed to load products: ${res.status}`)
        const data: Product[] = await res.json()
        const pid = Number(id)
        const byName = searchParams.get('name')?.toLowerCase()
        let found: Product | undefined
        if(!Number.isNaN(pid) && pid > 0){
          found = data.find(p => p.id === pid)
        }
        if(!found && byName){
          found = data.find(p => p.name.toLowerCase() === byName)
        }
        if(!found) throw new Error('Product not found')
        if(mounted) setProduct(found)
      }catch(e:any){
        if(mounted) setError(e?.message || 'Failed to load')
      }finally{
        if(mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [id])

  const subtotal = useMemo(() => (product ? product.price * qty : 0), [product, qty])

  if(loading) return <main className="pdp"><div className="container"><div className="state muted">Loading…</div></div></main>
  if(error || !product) return <main className="pdp"><div className="container"><div className="state error">{error || 'Not found'}</div></div></main>

  const img = product.images?.[activeImage] || ''

  return (
    <main className="pdp">
      <div className="container">
        <div className="pdp-head">
          <div className="pdp-info">
            <h1 className="pdp-title">{product.name}</h1>
            <div className="pdp-price">{formatPrice(product.price, product.currency)}</div>
            <div className="pdp-tax muted">Taxes included.</div>
            <div className="pdp-desc">
              {product.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          <div className="pdp-gallery">
            <div className="pdp-mainimg">{img && <img src={img} alt={product.name} />}</div>
            <div className="pdp-thumbs">
              {product.images.map((src, i) => (
                <button key={i} className={`thumb ${i===activeImage ? 'active' : ''}`} onClick={()=>setActiveImage(i)}>
                  <img src={src} alt={`${product.name} ${i+1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pdp-accordions">
          <details open>
            <summary>Product features</summary>
            <ul>
              <li>Durable build for long-term use</li>
              <li>Designed for safe, effective training</li>
              <li>Suitable for home or gym</li>
            </ul>
          </details>
          <details open>
            <summary>Materials and care</summary>
            <p>Wipe with a damp cloth. Store in a dry place away from direct sunlight.</p>
          </details>
          <details open>
            <summary>Merchandising tips</summary>
            <p>Pair with complementary equipment from the same series for upsell bundles.</p>
          </details>
        </div>

        <div className="pdp-line">
          <div className="line-left">
            <div className="line-product">
              <img src={product.images[0]} alt={product.name} />
              <div>
                <div className="line-name">{product.name}</div>
              </div>
            </div>
          </div>
          <div className="line-qty">
            <button onClick={() => setQty(q => Math.max(0,q-1))}>–</button>
            <div className="val">{qty}</div>
            <button onClick={() => setQty(q => q+1)}>+</button>
          </div>
          <div className="line-price">{formatPrice(product.price, product.currency)}/ea</div>
          <div className="line-sub">{formatPrice(subtotal, product.currency)}</div>
        </div>

        <div className="pdp-more">
          <div className="more-title">Other industry favorites</div>
          {/* Simple relateds: same category, different id */}
          {/* We'll fetch a small subset again */}
          <Related category={product.category} excludeId={product.id} />
        </div>
      </div>
    </main>
  )
}

function Related({ category, excludeId }: { category: string; excludeId: number }){
  const [items, setItems] = useState<Product[]>([])
  useEffect(() => {
    let mounted = true
    ;(async () => {
      const res = await fetch('/Products/Details/product-details.json')
      const data: Product[] = await res.json()
      const list = data.filter(d => d.category === category && d.id !== excludeId).slice(0,4)
      if(mounted) setItems(list)
    })()
    return () => { mounted = false }
  }, [category, excludeId])

  if(!items.length) return null
  return (
    <div className="more-grid">
      {items.map(p => (
        <Link key={p.id} to={`/product/${p.id}`} className="more-card">
          <div className="m-media"><img src={p.images[0]} alt={p.name} /></div>
          <div className="m-body">
            <div className="m-name">{p.name}</div>
            <div className="m-price">{formatPrice(p.price, p.currency)}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
