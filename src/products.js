// Shared product catalog — used by Home (first 3), Shop All (all) and Product pages.
// Order: Lil Helen Tee (the named outlier) first, then GF_LTee_001–004 in sequence.
// Home shows the first 3 (Lil Helen + 001 + 002); Shop/product pages show all in order.
// Colorways reuse the splash mockups in /public/shirts/{design}-{black|white}/{ink}.png
// `bg` is the per-product background photo shown behind the tee on cards + the hero.
export const PRODUCTS = [
  {
    id: 'fighter',
    design: 5,
    img: '/shop/tee-fighter.webp',
    hoverImg: '/shop/tee-fighter-hover.webp',
    bg: '/shop/bg-fighter.webp',
    name: 'Lil Helen Tee',
    price: '$55',
    desc: 'Crafted in heavyweight cotton with a structured, boxy fit. The premium tee features the bold yellow Girl Fight wordmark paired with our fighter graphic.',
    // Only two colorways (one per base) — show both as flat swatches, no ⇄ toggle.
    flatVariants: true,
    variants: {
      black: [
        { color: 'yellow', hex: '#FFFB00', src: '/shirts/5-black/yellow.png' },
      ],
      white: [
        { color: 'black', hex: '#000000', src: '/shirts/5-white/black.png' },
      ],
    },
  },
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
        { color: 'yellow', hex: '#FFFB00', src: '/shirts/1-black/yellow.png' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/1-black/pink.png' },
        { color: 'white', hex: '#ffffff', src: '/shirts/1-black/white.png' },
      ],
      white: [
        { color: 'black', hex: '#000000', src: '/shirts/1-white/black.png' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/1-white/pink.png' },
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
        { color: 'pink', hex: '#FF85F1', src: '/shirts/4-black/pink.png' },
        { color: 'white', hex: '#ffffff', src: '/shirts/4-black/white.png' },
        { color: 'yellow', hex: '#FFFB00', src: '/shirts/4-black/yellow.png' },
      ],
      white: [
        { color: 'black', hex: '#000000', src: '/shirts/4-white/black.png' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/4-white/pink.png' },
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
        { color: 'white', hex: '#ffffff', src: '/shirts/2-black/white.png' },
        { color: 'yellow', hex: '#FFFB00', src: '/shirts/2-black/yellow.png' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/2-black/pink.png' },
      ],
      white: [
        { color: 'black', hex: '#000000', src: '/shirts/2-white/black.png' },
        { color: 'pink', hex: '#FF85F1', src: '/shirts/2-white/pink.png' },
      ],
    },
  },
]

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)

export const SIZES = ['S', 'M', 'L', 'XL']
