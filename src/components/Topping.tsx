import type { Shape } from '../data'

export function Topping({ shape, color }: { shape: Shape; color: string }) {
  const shade = 'rgba(0,0,0,.28)', light = 'rgba(255,255,255,.28)'
  return (
    <svg viewBox="-20 -20 40 40" width="100%" height="100%" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.35))' }}>
      {shape === 'disc' && <>
        <circle r="17" fill={color} /><circle r="17" fill="none" stroke={shade} strokeWidth="1.5" />
        {[[-7, -5], [6, -8], [2, 5], [-8, 7], [9, 3]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill={shade} />)}
        <ellipse cx="-6" cy="-9" rx="7" ry="3" fill={light} /></>}
      {shape === 'ring' && <><circle r="14" fill="none" stroke={color} strokeWidth="7" />
        <circle r="14" fill="none" stroke={light} strokeWidth="1.5" strokeDasharray="14 80" /></>}
      {shape === 'leaf' && <><path d="M0 -18C14 -10 14 10 0 18C-14 10 -14 -10 0 -18Z" fill={color} />
        <path d="M0 -14V16M0 -4L7 -9M0 4L-7 -1" stroke={light} strokeWidth="1.4" fill="none" /></>}
      {shape === 'chunk' && <><path d="M-14-8L-4-15L12-10L15 4L5 14L-12 10Z" fill={color} stroke={shade} strokeWidth="1.2" />
        <path d="M-8-4L2-9" stroke={light} strokeWidth="2" /></>}
      {shape === 'strip' && <><rect x="-18" y="-6" width="36" height="12" rx="5" fill={color} />
        <path d="M-15 -1H15" stroke="#f3cfa5" strokeWidth="3" /></>}
      {shape === 'mush' && <><path d="M-16 3C-16-16 16-16 16 3Z" fill={color} stroke={shade} strokeWidth="1.2" />
        <path d="M-5 3H5V14H-5Z" fill="#efe0c4" /></>}
      {shape === 'crumb' && [[-8, -6, 6], [7, -7, 5], [0, 3, 7], [-9, 9, 4], [10, 8, 5]].map(([x, y, r], i) =>
        <circle key={i} cx={x} cy={y} r={r} fill={color} stroke={shade} />)}
      {shape === 'flake' && [[-6, -4], [5, -7], [3, 6], [-8, 7]].map(([x, y], i) =>
        <ellipse key={i} cx={x} cy={y} rx="3" ry="1.6" fill={color} transform={`rotate(${i * 50} ${x} ${y})`} />)}
      {shape === 'shred' && [[-10, -8, 20], [4, -10, -30], [-4, 2, 60], [8, 8, 10], [-12, 10, -50]].map(([x, y, a], i) =>
        <rect key={i} x={x} y={y} width="12" height="3.4" rx="1.7" fill={color} stroke={shade} strokeWidth=".6" transform={`rotate(${a} ${x} ${y})`} />)}
    </svg>
  )
}