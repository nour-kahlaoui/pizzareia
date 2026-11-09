import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { byId, SIZES, CRUSTS, DELIVERY_FEE } from './data'

export interface Piece { id: string; drop: string; ing: string; x: number; y: number; r: number; s: number }
interface Snap { sauce: string | null; cheeses: string[]; pieces: Piece[] }
interface State extends Snap {
  name: string; size: string; crust: string; history: Snap[]
  setName: (n: string) => void; setSize: (s: string) => void; setCrust: (c: string) => void
  add: (ing: string, pos?: { x: number; y: number }) => void
  dec: (ing: string) => void; remove: (ing: string) => void
  undo: () => void; clear: () => void
}

const uid = () => Math.random().toString(36).slice(2, 9)
const snap = (s: Snap): Snap => ({ sauce: s.sauce, cheeses: s.cheeses, pieces: s.pieces })

// Place each piece at the spot farthest from all existing pieces -> even, natural spread
function scatter(ing: string, count: number, existing: Piece[]): Piece[] {
  const drop = uid()
  const placed: Piece[] = []
  for (let i = 0; i < count; i++) {
    let best = { x: 0.5, y: 0.5 }
    let bestDist = -1
    for (let t = 0; t < 30; t++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * 0.36
      const x = 0.5 + Math.cos(a) * r
      const y = 0.5 + Math.sin(a) * r
      const nearest = Math.min(1, ...[...existing, ...placed].map(p => Math.hypot(p.x - x, p.y - y)))
      if (nearest > bestDist) { bestDist = nearest; best = { x, y } }
    }
    placed.push({ id: uid(), drop, ing, x: best.x, y: best.y, r: Math.random() * 360, s: 0.85 + Math.random() * 0.35 })
  }
  return placed
}

export const useStore = create<State>()(persist((set, get) => {
  const push = () => [...get().history.slice(-19), snap(get())]
  return {
    name: 'My Creation', size: 'M', crust: 'classic',
    sauce: 'tomato-sauce', cheeses: ['mozzarella'], pieces: [], history: [],
    setName: name => set({ name }), setSize: size => set({ size }), setCrust: crust => set({ crust }),
    add: id => {
      const ing = byId(id), history = push()
      if (ing.cat === 'sauce') set({ sauce: id, history })
      else if (ing.cat === 'cheese') set({ cheeses: [...get().cheeses, id], history })
      else set({ pieces: [...get().pieces, ...scatter(id, ing.count, get().pieces)], history })
    },
    dec: id => {
      const ing = byId(id), history = push()
      if (ing.cat === 'sauce') set({ sauce: null, history })
      else if (ing.cat === 'cheese') { const c = [...get().cheeses]; c.splice(c.lastIndexOf(id), 1); set({ cheeses: c, history }) }
      else {
        const mine = get().pieces.filter(p => p.ing === id), last = mine[mine.length - 1]?.drop
        set({ pieces: get().pieces.filter(p => p.drop !== last), history })
      }
    },
    remove: id => {
      const history = push(), ing = byId(id)
      if (ing.cat === 'sauce') set({ sauce: null, history })
      else if (ing.cat === 'cheese') set({ cheeses: get().cheeses.filter(c => c !== id), history })
      else set({ pieces: get().pieces.filter(p => p.ing !== id), history })
    },
    undo: () => { const h = get().history; if (h.length) set({ ...h[h.length - 1], history: h.slice(0, -1) }) },
    clear: () => set({ sauce: null, cheeses: [], pieces: [], history: push() }),
  }
}, { name: 'pizza-config' }))

// Quantity per ingredient (sauce/cheese = number of additions, toppings = number of portions dropped)
export function quantities(s: Snap): Record<string, number> {
  const q: Record<string, number> = {}
  if (s.sauce) q[s.sauce] = 1
  s.cheeses.forEach(c => (q[c] = (q[c] || 0) + 1))
  const drops: Record<string, Set<string>> = {}
  s.pieces.forEach(p => (drops[p.ing] ||= new Set()).add(p.drop))
  Object.entries(drops).forEach(([k, v]) => (q[k] = v.size))
  return q
}

export function pricing(s: State, delivery = true) {
  const size = SIZES.find(x => x.id === s.size)!, crust = CRUSTS.find(x => x.id === s.crust)!
  const q = quantities(s)
  const toppings = Object.entries(q).reduce((t, [id, n]) => t + byId(id).price * n, 0)
  const subtotal = size.base + crust.price + toppings
  return { subtotal, fee: delivery ? DELIVERY_FEE : 0, total: subtotal + (delivery ? DELIVERY_FEE : 0) }
}