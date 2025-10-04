import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import './CatalogPage.css'

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
  // Only GBP is present in the JSON, but keep it generic
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

function ProductCard({ product }: { product: Product }){
  const [qty, setQty] = useState(0)
  const img = product.images?.[0] || ''
  return (
    <div className="prod-card">
      <Link to={`/product/${product.id}`} className="prod-media">
        {img ? <img src={img} alt={product.name} loading="lazy" /> : <div className="img-fallback" />}
      </Link>
      <div className="prod-body">
        <Link to={`/product/${product.id}`} className="prod-name">{product.name}</Link>
        <div className="prod-price">{formatPrice(product.price, product.currency)}</div>
      </div>
      <div className="prod-footer">
        <Qty value={qty} onChange={setQty} />
      </div>
    </div>
  )
}

export default function CatalogPage(){
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const perPage = 8

  // UI state: filters and sort
  const [showAvail, setShowAvail] = useState(false)
  const [showPrice, setShowPrice] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const availRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  const [filterInStock, setFilterInStock] = useState(false)
  const [filterOutStock, setFilterOutStock] = useState(false)
  const [priceFrom, setPriceFrom] = useState<string>('')
  const [priceTo, setPriceTo] = useState<string>('')

  type SortKey = 'featured'|'bestselling'|'alpha_asc'|'alpha_desc'|'price_asc'|'price_desc'|'date_old'|'date_new'
  const [sortKey, setSortKey] = useState<SortKey>('alpha_asc')

  // category from URL
  const [categoryFilter, setCategoryFilter] = useState<string>('')

  useEffect(() => {
    const c = searchParams.get('category') || ''
    setCategoryFilter(c)
    // reset to page 1 when category changes
    setPage(1)
  }, [searchParams])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try{
        setLoading(true)
        const res = await fetch('/Products/Details/product-details.json')
        if(!res.ok) throw new Error(`Failed to load products: ${res.status}`)
        const data: Product[] = await res.json()
        if(mounted) setProducts(data)
      }catch(e:any){
        if(mounted) setError(e.message || 'Failed to load products')
      }finally{
        if(mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  // outside-click to close popovers
  useEffect(() => {
    function onDocClick(e: MouseEvent){
      const t = e.target as Node
      if(showAvail && availRef.current && !availRef.current.contains(t)) setShowAvail(false)
      if(showPrice && priceRef.current && !priceRef.current.contains(t)) setShowPrice(false)
      if(sortOpen && sortRef.current && !sortRef.current.contains(t)) setSortOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [showAvail, showPrice, sortOpen])

  // derived helpers
  const inStockCount = useMemo(() => products.filter(p => p.price > 0).length, [products])
  const outStockCount = products.length - inStockCount

  // apply filters
  const filtered = useMemo(() => {
    let list = [...products]
    // category filter (tolerant match for naming differences)
    if(categoryFilter){
      const norm = (s:string) => s.toLowerCase().replace(/&/g,'').replace(/\s+/g,'')
      const wanted = norm(categoryFilter).replace('bumbbell','dumbbell')
      list = list.filter(p => {
        const cat = norm(p.category)
        return cat.includes(wanted) || cat.replace('bumbbell','dumbbell').includes(wanted)
      })
    }
    // availability
    if(filterInStock !== filterOutStock){
      list = list.filter(p => filterInStock ? p.price > 0 : p.price === 0)
    }
    // price range
    const from = priceFrom ? parseFloat(priceFrom) : undefined
    const to = priceTo ? parseFloat(priceTo) : undefined
    if(Number.isFinite(from)) list = list.filter(p => p.price >= (from as number))
    if(Number.isFinite(to)) list = list.filter(p => p.price <= (to as number))
    // sort
    switch(sortKey){
      case 'alpha_asc': list.sort((a,b) => a.name.localeCompare(b.name)); break
      case 'alpha_desc': list.sort((a,b) => b.name.localeCompare(a.name)); break
      case 'price_asc': list.sort((a,b) => a.price - b.price); break
      case 'price_desc': list.sort((a,b) => b.price - a.price); break
      case 'date_new': list.sort((a,b) => b.id - a.id); break
      case 'date_old': list.sort((a,b) => a.id - b.id); break
      default: /* featured/bestselling: keep original order */ break
    }
    return list
  }, [products, filterInStock, filterOutStock, priceFrom, priceTo, sortKey])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page])

  // Reset helpers
  const resetAvailability = () => { setFilterInStock(false); setFilterOutStock(false) }
  const resetPrice = () => { setPriceFrom(''); setPriceTo('') }

  return (
    <main className="catalog">
      <div className="container">
        <h1 className="catalog-title">Products</h1>

        <div className="catalog-toolbar">
          <div className="filters">
            <span className="muted">Filter:</span>
            <div className="popover" ref={availRef}>
              <button className="filter-btn" onClick={() => {setShowAvail(v=>!v); setShowPrice(false)}}>
                Availability <span className="caret">▾</span>
              </button>
              {showAvail && (
                <div className="pop-card">
                  <div className="pop-head"><span className="muted">{(filterInStock?1:0)+(filterOutStock?1:0)} selected</span><button className="link" onClick={resetAvailability}>Reset</button></div>
                  <label className="chk"><input type="checkbox" checked={filterInStock} onChange={e=>setFilterInStock(e.target.checked)}/> <span>In stock ({inStockCount})</span></label>
                  <label className="chk disabled"><input type="checkbox" disabled checked={false}/> <span>Out of stock ({outStockCount})</span></label>
                </div>
              )}
            </div>
            <div className="popover" ref={priceRef}>
              <button className="filter-btn" onClick={() => {setShowPrice(v=>!v); setShowAvail(false)}}>
                Price <span className="caret">▾</span>
              </button>
              {showPrice && (
                <div className="pop-card">
                  <div className="pop-head"><span>The highest price is {formatPrice(Math.max(0, ...products.map(p=>p.price)), 'GBP')}</span><button className="link" onClick={resetPrice}>Reset</button></div>
                  <div className="price-row">
                    <div className="price-input"><span>£</span><input inputMode="decimal" placeholder="From" value={priceFrom} onChange={e=>setPriceFrom(e.target.value.replace(/[^0-9.]/g,''))} /></div>
                    <div className="price-input"><span>£</span><input inputMode="decimal" placeholder="To" value={priceTo} onChange={e=>setPriceTo(e.target.value.replace(/[^0-9.]/g,''))} /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="sort" ref={sortRef}>
            <span className="muted">Sort by:</span>
            <button className="sort-btn" onClick={() => setSortOpen(v=>!v)}>
              {sortKey === 'featured' && 'Featured'}
              {sortKey === 'bestselling' && 'Best selling'}
              {sortKey === 'alpha_asc' && 'Alphabetically, A–Z'}
              {sortKey === 'alpha_desc' && 'Alphabetically, Z–A'}
              {sortKey === 'price_asc' && 'Price, low to high'}
              {sortKey === 'price_desc' && 'Price, high to low'}
              {sortKey === 'date_old' && 'Date, old to new'}
              {sortKey === 'date_new' && 'Date, new to old'}
              <span className="caret">▾</span>
            </button>
            {sortOpen && (
              <div className="sort-menu">
                <button className="sort-opt" onClick={()=>{setSortKey('featured'); setSortOpen(false)}}>Featured</button>
                <button className="sort-opt" onClick={()=>{setSortKey('bestselling'); setSortOpen(false)}}>Best selling</button>
                <button className="sort-opt" onClick={()=>{setSortKey('alpha_asc'); setSortOpen(false)}}>Alphabetically, A–Z</button>
                <button className="sort-opt" onClick={()=>{setSortKey('alpha_desc'); setSortOpen(false)}}>Alphabetically, Z–A</button>
                <button className="sort-opt" onClick={()=>{setSortKey('price_asc'); setSortOpen(false)}}>Price, low to high</button>
                <button className="sort-opt" onClick={()=>{setSortKey('price_desc'); setSortOpen(false)}}>Price, high to low</button>
                <button className="sort-opt" onClick={()=>{setSortKey('date_old'); setSortOpen(false)}}>Date, old to new</button>
                <button className="sort-opt" onClick={()=>{setSortKey('date_new'); setSortOpen(false)}}>Date, new to old</button>
              </div>
            )}
            <span className="muted count">{filtered.length} products</span>
          </div>
        </div>

        {categoryFilter && (
          <div className="active-filters">
            <span className="chip">Category: {categoryFilter} <button className="chip-x" onClick={() => setSearchParams({})}>×</button></span>
          </div>
        )}

        {loading && <div className="state muted">Loading products…</div>}
        {error && <div className="state error">{error}</div>}
        {!loading && !error && (
          <div className="grid">
            {pageItems.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="pagination">
            <button disabled={page===1} onClick={() => setPage(p => Math.max(1, p-1))} className="page-nav">‹</button>
            {Array.from({length: totalPages}).map((_, i) => {
              const num = i+1
              return (
                <button key={num} className={`page-num ${num===page ? 'active' : ''}`} onClick={() => setPage(num)}>{num}</button>
              )
            })}
            <button disabled={page===totalPages} onClick={() => setPage(p => Math.min(totalPages, p+1))} className="page-nav">›</button>
          </div>
        )}
      </div>
    </main>
  )
}
