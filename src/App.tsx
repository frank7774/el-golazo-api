import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CanchaDetalle from '@/pages/CanchaDetalle'
import Canchas from '@/pages/Canchas'
import Disponibilidad from '@/pages/Disponibilidad'
import HorarioDetalle from '@/pages/HorarioDetalle'
import Inicio from '@/pages/Inicio'
import NotFound from '@/pages/NotFound'
import Servicios from '@/pages/Servicios'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}
export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop/>
      <div className="flex min-h-screen flex-col">
        <Navbar/>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/canchas" element={<Canchas/>}/>
            <Route path="/canchas/:id" element={<CanchaDetalle/>}/>
            <Route path="/disponibilidad" element={<Disponibilidad/>}/>
            <Route path="/disponibilidad/:id" element={<HorarioDetalle/>}/>
            <Route path="/servicios" element={<Servicios/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}
