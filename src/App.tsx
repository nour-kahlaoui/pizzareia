import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Builder from './pages/Builder'

const Nav = () => (
  <nav className="flex items-center justify-between px-6 py-4">
    <Link to="/" className="font-display text-2xl font-black text-tomato">Forno Folle</Link>
    <div className="flex gap-6 text-sm font-medium">
      <Link to="/">Home</Link>
      <Link to="/build">Build Your Pizza</Link>
    </div>
  </nav>
)

const Home = () => (
  <div className="p-10 text-center">
    <h1 className="font-display text-6xl font-black">Your Pizza. Your Rules.</h1>
    <Link to="/build" className="mt-8 inline-block rounded-full bg-tomato px-8 py-3 font-bold text-white">BUILD YOUR PIZZA</Link>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  )
}