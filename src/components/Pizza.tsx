import { useDroppable } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store'
import { byId, SIZES, CRUSTS } from '../data'
import { Topping } from './Topping'

export function Pizza() {
  const { setNodeRef, isOver } = useDroppable({ id: 'pizza' })
  const { sauce, cheeses, pieces, size, crust, remove } = useStore()
  const scale = SIZES.find(s => s.id === size)!.scale
  const rim = CRUSTS.find(c => c.id === crust)!.rim
  const tint = cheeses.length ? byId(cheeses[cheeses.length - 1]).color : '#fff6dc'

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <motion.div ref={setNodeRef} animate={{ scale }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="relative h-full w-full rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #f6cf84, #d9953f 65%, #a8651f)',
          boxShadow: isOver ? '0 0 0 6px rgba(200,50,31,.35), 0 30px 50px rgba(60,30,10,.35)' : '0 30px 50px rgba(60,30,10,.35)',
        }}>
        {/* dough */}
        <div className="absolute rounded-full" style={{ inset: `${rim}%`, background: 'radial-gradient(circle at 40% 35%, #f8e1b0, #ecc383)' }} />
        {/* sauce */}
        <AnimatePresence>
          {sauce && <motion.div key={sauce} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 0.92, scale: 1 }} exit={{ opacity: 0 }}
            className="absolute rounded-full"
            style={{ inset: `${rim + 3}%`, background: `radial-gradient(circle at 40% 35%, ${byId(sauce).color}, ${byId(sauce).color}cc)` }} />}
        </AnimatePresence>
        {/* cheese */}
        <AnimatePresence>
          {cheeses.length > 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: Math.min(0.95, 0.55 + cheeses.length * 0.15) }} exit={{ opacity: 0 }}
            className="absolute rounded-full"
            style={{
              inset: `${rim + 4}%`,
              background: `radial-gradient(circle at 25% 30%, ${tint} 0 12%, transparent 13%), radial-gradient(circle at 70% 25%, ${tint} 0 14%, transparent 15%), radial-gradient(circle at 55% 70%, ${tint} 0 16%, transparent 17%), radial-gradient(circle at 20% 72%, ${tint} 0 12%, transparent 13%), radial-gradient(circle, ${tint}aa, ${tint}55)`,
            }} />}
        </AnimatePresence>
        {/* toppings */}
        <AnimatePresence>
          {pieces.map(p => {
            const ing = byId(p.ing)
            return (
              <motion.button key={p.id} aria-label={`Remove ${ing.name}`} onClick={() => remove(p.ing)}
                initial={{ scale: 2, opacity: 0, y: -30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, rotate: p.r + 10 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                className="absolute cursor-pointer"
                style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, width: `${9 * p.s}%`, height: `${9 * p.s}%`, x: '-50%', y: '-50%', rotate: p.r }}>
                <Topping shape={ing.shape} color={ing.color} />
              </motion.button>
            )
          })}
        </AnimatePresence>
      </motion.div>
      <p className="mt-4 text-center text-sm text-stone-500">
        {isOver ? 'Drop it!' : 'Drag an ingredient onto the pizza (or just tap it)'}
      </p>
    </div>
  )
}