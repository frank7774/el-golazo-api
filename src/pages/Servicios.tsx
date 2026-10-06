import { useMemo, useState } from 'react'
import { ServicioCard } from '@/components/Cards'
import { EmptyState, ErrorMessage, Icon, SkeletonGrid } from '@/components/ui'
import { useFetch } from '@/hooks/useFetch'
import { getServicios } from '@/services/api'

export default function Servicios() {
  const { data, loading, error, refetch } = useFetch(() => getServicios(), [])
  const [categoria, setCategoria] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const servicios = data ?? []
  const categorias = useMemo(() => ['todas', ...new Set(servicios.map((s) => s.categoria))], [servicios])
  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return servicios.filter((s) => {
      const cc = categoria === 'todas' || s.categoria === categoria
      const ct = !q || s.nombre.toLowerCase().includes(q) || s.descripcion.toLowerCase().includes(q)
      return cc && ct
    })
  }, [servicios, categoria, busqueda])

  return (
    <div className="container-app py-12">
      <header className="mb-10">
        <p className="eyebrow">Servicios</p>
        <h1 className="mt-3 text-[32px] font-semibold text-slate-900 sm:text-[40px]">Todo lo que ofrecemos</h1>
        <p className="sub-section">Alquiler, campeonatos, entrenamientos, eventos e instalaciones.</p>
      </header>
      <section className="panel mb-10">
        <div className="mt-2 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label">Buscar servicio</label>
            <div className="relative">
              <Icon.search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
              <input type="search" className="input pl-9" placeholder="Ej. campeonatos..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
            </div>
          </div>
          <div>
            <label className="label">Categoria</label>
            <select className="input" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categorias.map((c) => <option key={c} value={c}>{c === 'todas' ? 'Todas las categorias' : c}</option>)}
            </select>
          </div>
        </div>
      </section>
      {loading && <SkeletonGrid n={6}/>}
      {!loading && error && <ErrorMessage mensaje={error} onRetry={refetch}/>}
      {!loading && !error && filtrados.length === 0 && <EmptyState titulo="Sin servicios que coincidan" descripcion="Prueba con otra categoria o texto."/>}
      {!loading && !error && filtrados.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtrados.map((s) => <ServicioCard key={s.id} servicio={s}/>)}</div>}
    </div>
  )
}