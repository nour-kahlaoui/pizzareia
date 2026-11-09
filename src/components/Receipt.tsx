import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useStore, quantities, pricing } from '../store'
import { byId, fmt, SIZES, CRUSTS } from '../data'

const Row = ({ l, r }: { l: string; r: string }) => <div className="flex justify-between text-sm"><span>{l}</span><span>{r}</span></div>

export function Receipt() {
  const s = useStore()
  const nav = useNavigate()
  const q = quantities(s), { subtotal, fee, total } = pricing(s)
  const size = SIZES.find(x => x.id === s.size)!, crust = CRUSTS.find(x => x.id === s.crust)!
  const ids = Object.keys(q)

  return (
    <aside className="rounded-3xl bg-white p-6 shadow-xl">
      <input value={s.name} onChange={e => s.setName(e.target.value)} aria-label="Pizza name"
        className="w-full border-b border-dashed border-stone-300 bg-transparent pb-2 font-display text-2xl font-black outline-none focus:border-tomato" />
      <div className="mt-4 space-y-1 text-stone-600">
        <Row l={`Size: ${size.label}`} r={fmt(size.base)} />
        <Row l={`Crust: ${crust.label}`} r={fmt(crust.price)} />
      </div>
      <hr className="my-4 border-dashed" />
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {ids.map(id => (
            <motion.li key={id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 text-sm">
              <span className="flex-1">{byId(id).name}</span>
              <button onClick={() => s.dec(id)} aria-label="Less" className="h-6 w-6 rounded-full bg-stone-100 hover:bg-stone-200">−</button>
              <span className="w-4 text-center">{q[id]}</span>
              <button onClick={() => s.add(id)} aria-label="More" className="h-6 w-6 rounded-full bg-stone-100 hover:bg-stone-200">+</button>
              <span className="w-16 text-right">{fmt(byId(id).price * q[id])}</span>
              <button onClick={() => s.remove(id)} aria-label="Remove" className="text-tomato">✕</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {!ids.length && <p className="text-sm text-stone-400">Your pizza is empty…</p>}
      <hr className="my-4 border-dashed" />
      <Row l="Subtotal" r={fmt(subtotal)} />
      <Row l="Delivery" r={fmt(fee)} />
      <div className="mt-2 flex items-center justify-between font-display text-2xl font-black">
        <span>Total</span>
        <AnimatePresence mode="popLayout">
          <motion.span key={total} initial={{ y: -12, opacity: 0, scale: 1.2 }} animate={{ y: 0, opacity: 1, scale: 1 }} className="text-tomato">
            {fmt(total)}
          </motion.span>
        </AnimatePresence>
      </div>
      <button onClick={() => nav('/checkout')}
        className="mt-5 w-full rounded-full bg-tomato py-3 font-bold tracking-wide text-white transition hover:scale-[1.02] hover:bg-red-700">
        PLACE MY ORDER
      </button>
    </aside>
  )
}