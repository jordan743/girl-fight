import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { HomeMarquee, HomeFooter } from './Home'
import { useCart } from './CartContext'
import { PRODUCT, getProduct, getColor, SIZES } from './products'
import SiteNav from './SiteNav'
import './Home.css'
import './ShopAll.css'
import './ProductPage.css'

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="24" height="24">
      <path d="M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7.16 14h9.69c.75 0 1.41-.41 1.75-1.03l3.24-5.88A1 1 0 0 0 21 5.66H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C3.52 18.37 4.48 20 6 20h12v-2H6l1.16-2z" />
    </svg>
  )
}

// Must match `.pp-hero__shirt.is-zoom` in ProductPage.css.
const ZOOM_SCALE = 2.4

function MagnifyIcon({ out }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 L21 21" />
      <path d="M7.5 10.5h6" />
      {!out && <path d="M10.5 7.5v6" />}
    </svg>
  )
}

function ProductNav() {
  return <SiteNav theme="light" />
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`pp-acc${open ? ' is-open' : ''}`}>
      <button className="pp-acc__head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{title}</span>
        <span className="pp-acc__icon">{open ? '−' : '+'}</span>
      </button>
      <div className="pp-acc__body"><p>{children}</p></div>
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const product = getProduct(id) || PRODUCT
  const { open, count, addItem } = useCart()

  const [size, setSize] = useState('XL')
  const [qty, setQty] = useState(1)

  // Colorway lives in the URL (`?color=grey`) so the grid cards can deep-link
  // straight to the shade that was clicked, and reloads/back keep it.
  const [searchParams, setSearchParams] = useSearchParams()
  const color = getColor(searchParams.get('color'))
  const selectColor = (key) => setSearchParams({ color: key }, { replace: true })

  // Click-to-magnify on the product image. Off by default; the button in the
  // corner of the media panel turns it on, then the pointer pans the zoom.
  const shirtRef = useRef(null)
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 })
  const handleZoomMove = (e) => {
    if (!zoom.active) return
    const el = shirtRef.current
    if (!el) return
    // getBoundingClientRect() reports the SCALED box, so it has to be inverted
    // back to the layout box before the cursor can be turned into an origin.
    // A scale of s about origin fraction f moves the left edge by f·W·(1−s) —
    // the box grows away from the origin, not evenly on both sides. Assuming
    // it grew evenly is only correct at dead centre, and everywhere else the
    // error fed back into the next move, so the zoom tracked a point offset
    // from the cursor.
    const s = ZOOM_SCALE
    const r = el.getBoundingClientRect()
    const w = r.width / s
    const h = r.height / s
    const left = r.left + (zoom.x / 100) * w * (s - 1)
    const top = r.top + (zoom.y / 100) * h * (s - 1)
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / w) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / h) * 100))
    setZoom({ active: true, x, y })
  }
  const toggleZoom = () => setZoom((z) => ({ active: !z.active, x: 50, y: 50 }))

  useEffect(() => {
    document.body.style.background = '#fff'
    window.scrollTo(0, 0)
    setQty(1)
    setSize('XL')
    setZoom({ active: false, x: 50, y: 50 })
    return () => { document.body.style.background = '' }
  }, [id])

  const handleAdd = () => {
    addItem(product, { size, color: color.name, img: color.img, qty })
    open()
  }

  return (
    <div className="pp-page">
      <ProductNav onCartOpen={open} cartCount={count} />

      {/* Product hero */}
      <section className="pp-hero">
        <div className="pp-hero__media">
          <img src={color.bg} alt="" className="pp-hero__bg" aria-hidden="true" />
          <img
            ref={shirtRef}
            src={color.zoom}
            alt={`${product.name} — ${color.name}`}
            className={`pp-hero__shirt${zoom.active ? ' is-zoom' : ''}`}
            style={zoom.active ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            onPointerMove={handleZoomMove}
            onClick={zoom.active ? toggleZoom : undefined}
          />
          <button
            type="button"
            className={`pp-zoom-btn${zoom.active ? ' is-active' : ''}`}
            onClick={toggleZoom}
            aria-pressed={zoom.active}
            aria-label={zoom.active ? 'Exit magnified view' : 'Magnify product image'}
          >
            <MagnifyIcon out={zoom.active} />
          </button>
        </div>

        <div className="pp-hero__info">
          <nav className="pp-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <Link to="/shop">Shop All</Link>
          </nav>

          <div className="pp-hero__detail">
            <div className="pp-head">
              <h1 className="pp-title">{product.name}</h1>
              <p className="pp-desc">{product.desc}</p>
            </div>

            <div className="pp-opt">
              <span className="pp-opt__label">Color</span>
              <div className="pp-colors">
                {product.colors.map((c) => (
                  <button
                    key={c.key}
                    className={`pp-swatch${c.key === color.key ? ' is-active' : ''}`}
                    style={{ background: `linear-gradient(135deg, ${c.ink} 50%, ${c.hex} 50%)` }}
                    onClick={() => selectColor(c.key)}
                    aria-label={`${c.name} tee`}
                    aria-pressed={c.key === color.key}
                  />
                ))}
              </div>
            </div>

            <div className="pp-options">
              <div className="pp-opt">
                <span className="pp-opt__label">Size</span>
                <div className="pp-sizes">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      className={`pp-size${size === s ? ' is-active' : ''}`}
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pp-opt">
                <span className="pp-opt__label">Quantity</span>
                <div className="pp-qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                  <span className="pp-qty__num">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
            </div>

            <button className="pp-add" onClick={handleAdd}>
              Add to Cart <span>{product.price}</span>
            </button>

            <div className="pp-accordions">
              <Accordion title="Specs">
                Heavyweight 100% cotton. Structured boxy fit. Screen-printed graphic.
                Model is 5&apos;9&quot; wearing size XL. Placeholder spec copy.
              </Accordion>
              <Accordion title="Shipping & Returns">
                Ships within 3–5 business days. Free returns within 30 days on unworn items.
                Placeholder shipping copy.
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* The "More colors" rail is parked until the catalog grows past this one
          tee — with a single garment it only ever showed the same shirt back.
          Markup is in git (and .pp-more styles are still in ProductPage.css). */}

      <HomeMarquee bg="#000" color="#fff" />
      <HomeFooter />
    </div>
  )
}
