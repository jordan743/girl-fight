// Shared product catalog — used by Home, Shop All and the product page.
//
// LAUNCH LINE-UP: one tee (Lil Helen) in three garment colors. Each colorway is
// its own card in the grids, and every card deep-links to the SAME product page
// with that color preselected (`/product/fighter?color=grey`).
//
// The pre-launch multi-design catalog is preserved in ARCHIVED_PRODUCTS at the
// bottom of this file — drop those entries back into PRODUCTS to relaunch them.

// Each colorway reveals its own lifestyle shot on hover, cropped so the tee
// graphic and Helen's face sit in the card's focal area.

// Order matches the Figma product grid: grey → black → white.
export const COLORS = [
  {
    key: 'grey',
    name: 'Grey',
    hex: '#555957',   // garment
    ink: '#FFFB00',   // print
    img: '/shop/lil-helen-grey.webp',
    zoom: '/shop/lil-helen-grey-lg.webp',
    bg: '/shop/bg-lil-helen-grey.webp',
    hover: '/shop/hover-lil-helen-grey.webp',
  },
  {
    key: 'black',
    name: 'Black',
    hex: '#1F2120',
    ink: '#FFFB00',
    img: '/shop/lil-helen-black.webp',
    zoom: '/shop/lil-helen-black-lg.webp',
    bg: '/shop/bg-lil-helen-black.webp',
    hover: '/shop/tee-fighter-hover.webp',
  },
  {
    key: 'white',
    name: 'White',
    hex: '#F1F5F8',
    ink: '#000000',
    img: '/shop/lil-helen-white.webp',
    zoom: '/shop/lil-helen-white-lg.webp',
    bg: '/shop/bg-lil-helen-white.webp',
    hover: '/shop/hover-lil-helen-white.webp',
  },
]

// Color the product page opens on when the URL carries no `?color=`.
export const DEFAULT_COLOR = 'black'

export const getColor = (key) =>
  COLORS.find((c) => c.key === key) || COLORS.find((c) => c.key === DEFAULT_COLOR)

export const PRODUCT = {
  id: 'fighter',
  design: 5,
  name: 'Lil Helen Tee',
  price: '$55',
  desc: 'Crafted in heavyweight cotton with a structured, boxy fit. The premium tee features the bold Girl Fight wordmark paired with our fighter graphic.',
  colors: COLORS,
}

// Grid cards — one per colorway, all pointing at the same product page.
export const PRODUCTS = COLORS.map((c) => ({
  ...PRODUCT,
  cardId: `${PRODUCT.id}-${c.key}`,
  colorKey: c.key,
  colorName: c.name,
  href: `/product/${PRODUCT.id}?color=${c.key}`,
  img: c.img,
  bg: c.bg,
  hoverImg: c.hover,
}))

export const getProduct = (id) => (id === PRODUCT.id ? PRODUCT : null)

export const SIZES = ['S', 'M', 'L', 'XL']

// ─── Shelved until after launch ──────────────────────────────────────────────
// GF_LTee_001–004. Assets still live in /public/shirts + /public/shop.
export const ARCHIVED_PRODUCTS = [
  {
    id: 'block',
    design: 1,
    img: '/shop/tee-block.webp',
    bg: '/shop/bg-block.webp',
    name: 'GF_LTee_001',
    price: '$55',
    desc: 'Crafted in heavyweight cotton with a structured, boxy fit. The premium tee features the GIRL/FIGHT block logo.',
    variants: {
      black: [
        { color: 'yellow', hex: '#FFFB00', src: '/shirts/1-black/yellow.webp' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/1-black/pink.webp' },
        { color: 'white', hex: '#ffffff', src: '/shirts/1-black/white.webp' },
      ],
      white: [
        { color: 'black', hex: '#000000', src: '/shirts/1-white/black.webp' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/1-white/pink.webp' },
      ],
    },
  },
  {
    id: 'splatter',
    design: 3,
    img: '/shop/tee-oldstyle-white.webp',
    bg: '/shop/bg-splatter.webp',
    name: 'GF_LTee_002',
    price: '$55',
    desc: 'Crafted in heavyweight cotton with a structured, boxy fit. The premium tee features the Girl Fight old-english monogram, screen-printed on a washed black body.',
    // Old-style monogram tee — only two prints (white + pink), both on black.
    flatVariants: true,
    variants: {
      black: [
        { color: 'white', hex: '#ffffff', src: '/shop/tee-oldstyle-white.webp' },
        { color: 'pink', hex: '#FF85F1', src: '/shop/tee-oldstyle-pink.webp' },
      ],
      white: [],
    },
  },
  {
    id: 'graffiti',
    design: 4,
    img: '/shop/tee-graffiti.webp',
    bg: '/shop/bg-graffiti.webp',
    name: 'GF_LTee_003',
    price: '$55',
    desc: 'Crafted in heavyweight cotton with a structured, boxy fit. The premium tee features a wildstyle Girl Fight graffiti graphic.',
    variants: {
      black: [
        { color: 'pink', hex: '#FF85F1', src: '/shirts/4-black/pink.webp' },
        { color: 'white', hex: '#ffffff', src: '/shirts/4-black/white.webp' },
        { color: 'yellow', hex: '#FFFB00', src: '/shirts/4-black/yellow.webp' },
      ],
      white: [
        { color: 'black', hex: '#000000', src: '/shirts/4-white/black.webp' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/4-white/pink.webp' },
      ],
    },
  },
  {
    id: 'script',
    design: 2,
    img: '/shop/tee-script.webp',
    bg: '/shop/bg-script.webp',
    name: 'GF_LTee_004',
    price: '$55',
    desc: 'Crafted in heavyweight cotton with a structured, boxy fit. The premium tee features the Girl Fight script wordmark in a clean finish.',
    variants: {
      black: [
        { color: 'white', hex: '#ffffff', src: '/shirts/2-black/white.webp' },
        { color: 'yellow', hex: '#FFFB00', src: '/shirts/2-black/yellow.webp' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/2-black/pink.webp' },
      ],
      white: [
        { color: 'black', hex: '#000000', src: '/shirts/2-white/black.webp' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/2-white/pink.webp' },
      ],
    },
  },
]
