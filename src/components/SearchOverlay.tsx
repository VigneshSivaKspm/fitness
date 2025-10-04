import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchOverlay.css'

type Product = {
  id: number
  name: string
  category: string
  price: number
  currency: string
  images: string[]
}

export default function SearchOverlay(){
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [items, setItems] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const nav = useNavigate()

  // Listen for global open event
  useEffect(() => {
    function onOpen(){ setOpen(true); setTimeout(() => inputRef.current?.focus(), 0) }
    function onKey(e: KeyboardEvent){ if(e.key === 'Escape') setOpen(false) }
    window.addEventListener('open-search', onOpen as any)
    window.addEventListener('keydown', onKey)
    ;(window as any).openSearch = () => onOpen()
    return () => {
      window.removeEventListener('open-search', onOpen as any)
      window.removeEventListener('keydown', onKey)
      if((window as any).openSearch) delete (window as any).openSearch
    }
  }, [])

  // Load products once
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try{
        const res = await fetch('/Products/Details/product-details.json')
        const data: Product[] = await res.json()
        if(mounted) setItems(data)
      }catch{}
    })()
    return () => { mounted = false }
  }, [])

  const results = useMemo(() => {
    if(!q.trim()) return { suggestions: [], products: [] as Product[] }
    const term = q.toLowerCase()
    const products = items.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)).slice(0, 3)
    const baseSugs = ['rubber coated body bar', 'bar', 'bike', 'ball', 'Barbell & Bumbbell Sets', 'Bestsellers', 'Bodybars']
    const dynFromCats = Array.from(new Set(items.map(i => i.category))).slice(0, 4)
    const suggestions = [...baseSugs, ...dynFromCats]
      .filter(s => s.toLowerCase().includes(term))
      .slice(0, 6)
    return { suggestions, products }
  }, [q, items])

  function goSearch(text: string){
    setOpen(false)
    nav(`/catalog?q=${encodeURIComponent(text)}`)
  }

  if(!open) return null
  return (
    <div className="search-overlay" onClick={() => setOpen(false)}>
      <div className="search-panel" onClick={e => e.stopPropagation()}>
        <div className="search-input-row">
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" />
          <button className="s-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>
        <div className="search-dropdown">
          <div className="col">
            <div className="hd">SUGGESTIONS</div>
            {results.suggestions.map((s) => (
              <button key={s} className="row" onClick={() => goSearch(s)}>
                <span dangerouslySetInnerHTML={{__html: highlight(s, q)}} />
              </button>
            ))}
            {q && (
              <button className="row search-for" onClick={() => goSearch(q)}>
                Search for “{q}” →
              </button>
            )}
          </div>
          <div className="col products">
            <div className="hd">PRODUCTS</div>
            {results.products.map(p => (
              <a key={p.id} className="prow" href={`/product/${p.id}`}>
                <img src={p.images[0]} alt={p.name} />
                <span className="pname" dangerouslySetInnerHTML={{__html: highlight(p.name, q)}} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function highlight(text: string, q: string){
  const term = q.trim()
  if(!term) return text
  const re = new RegExp(`(${escapeRegExp(term)})`, 'ig')
  return text.replace(re, '<strong>$1</strong>')
}
function escapeRegExp(s: string){
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
