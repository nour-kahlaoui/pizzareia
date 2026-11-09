import { DndContext, DragOverlay, MouseSensor, useSensor, useSensors, useDraggable, type DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CATS, INGREDIENTS, SIZES, CRUSTS, fmt, byId } from '../data'
import { useStore, quantities } from '../store'
import { Topping } from '../components/Topping'
import { Pizza } from '../components/Pizza'
import { Receipt } from '../components/Receipt'

function Item({ id }: { id: string }) {
  const ing = byId(id)
  const add = useStore(s => s.add)
  const qty = useStore(s => quantities(s)[id] || 0)
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id })
  return (
    <motion.button ref={setNodeRef} {...listeners} {...attributes} onClick={() => add(id)}
      whileHover={{ y: -4, rotate: -2 }} whileTap={{ scale: 0.95 }}
      className={`relative flex flex-col items-center rounded-2xl p-2 text-xs shadow-sm transition ${qty ? 'bg-tomato/10 ring-2 ring-tomato' : 'bg-white'} ${isDragging ? 'opacity-40' : ''}`}>
      <div className="h-12 w-12"><Topping shape={ing.shape} color={ing.color} /></div>
      <span className="mt-1 font-medium leading-tight">{ing.name}</span>
      <span className="text-stone-500">{ing.price ? `+${fmt(ing.price)}` : 'included'}</span>
      {qty > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-tomato text-[11px] font-bold text-white">{qty}</span>}
    </motion.button>
  )
}

const Choice = ({ opts, value, onChange }: { opts: { id: string; label: string }[]; value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-wrap gap-2">
    {opts.map(o => (
      <button key={o.id} onClick={() => onChange(o.id)}
        className={`rounded-full px-3 py-1 text-sm font-medium ${value === o.id ? 'bg-tomato text-white' : 'bg-white hover:bg-stone-100'}`}>{o.label}</button>
    ))}
  </div>
)

export default function Builder() {
  const { size, crust, setSize, setCrust, add, undo, clear } = useStore()
  const [active, setActive] = useState<string | null>(null)
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }))

  function onEnd(e: DragEndEvent) {
    setActive(null)
    if (e.over?.id !== 'pizza') return
    const r = e.over.rect, a = e.activatorEvent as MouseEvent
    add(String(e.active.id), { x: (a.clientX + e.delta.x - r.left) / r.width, y: (a.clientY + e.delta.y - r.top) / r.height })
  }

  return (
    <DndContext sensors={sensors} onDragStart={e => setActive(String(e.active.id))} onDragEnd={onEnd} onDragCancel={() => setActive(null)}>
      <main className="mx-auto grid max-w-[1400px] gap-6 p-4 lg:grid-cols-[320px_1fr_340px]">
        <section className="order-2 space-y-5 lg:order-1 lg:max-h-[90vh] lg:overflow-y-auto">
          {CATS.map(c => (
            <div key={c.id}>
              <h3 className="mb-2 font-display text-lg font-black">{c.label}</h3>
              <div className="grid grid-cols-3 gap-2">
                {INGREDIENTS.filter(i => i.cat === c.id).map(i => <Item key={i.id} id={i.id} />)}
              </div>
            </div>
          ))}
        </section>
        <section className="order-1 space-y-4 lg:order-2">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Choice opts={SIZES} value={size} onChange={setSize} />
            <Choice opts={CRUSTS} value={crust} onChange={setCrust} />
          </div>
          <Pizza />
          <div className="flex justify-center gap-3">
            <button onClick={undo} className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow">↶ Undo</button>
            <button onClick={clear} className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow">Reset</button>
          </div>
        </section>
        <div className="order-3"><Receipt /></div>
      </main>
      <DragOverlay>
        {active && <div className="h-16 w-16 rotate-12 scale-125"><Topping shape={byId(active).shape} color={byId(active).color} /></div>}
      </DragOverlay>
    </DndContext>
  )
}