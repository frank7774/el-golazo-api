import { useMemo, useState } from 'react'
import { CanchaCard } from '@/components/Cards'
import { EmptyState, ErrorMessage, Icon, SkeletonGrid } from '@/components/ui'
import { useFetch } from '@/hooks/useFetch'
import { getCanchas } from '@/services/api'
import { moneda } from '@/utils/format'

export default function Canchas() {
  const { data, loading, error, refetch } = useFetch(() => getCanchas(), [])
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState('todos')
  const [precioMax, setPrecioMax] = useState(0)
  const canchas = data ?? []
  const tipos = useMemo(() => ['todos', ...new Set(canchas.map((c) => c.tipo))], [canchas])
  const precioTope = useMemo(() => (canchas.length ? Math.max(...canchas.map((c) => c.precioHora)) : 0), [canchas])
  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return canchas.filter((c) => {
      const coincideTexto = !q || c.nombre.toLowerCase().includes(q) || c.descripcion.toLowerCase().includes(q) || c.tipo.toLowerCase().includes(q)
      const coincideTipo = tipo === 'todos' || c.tipo === tipo
      const coincidePrecio = !precioMax || c.precioHora <= precioMax
      return coincideTexto && coincideTipo && coincidePrecio
    })
  }, [canchas, busqueda, tipo, precioMax])
  const limpiar = () => { setBusqueda(''); setTipo('todos'); setPrecioMax(0) }

  return (
    <div className="container-app py-12">
      <header className="mb-10">
        <p className="eyebrow">Catalogo</p>
        <h1 className="mt-3 text-[32px] font-semibold text-slate-900 sm:text-[40px]">Nuestras canchas</h1>
        <p className="sub-section">Explora las canchas disponibles, compara tipos, aforo y tarifas por hora.</p>
      </header>
      <section className="panel mb-10">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Icon.filter className="h-4 w-4 text-slate-400"/>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">Filtros</h2>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <label className="label">Buscar</label>
            <div className="relative">
              <Icon.search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
              <input type="search" className="input pl-9" placeholder="Nombre, tipo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
            </div>
          </div>
          <div>
            <label className="label">Tipo de cancha</label>
            <select className="input" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {tipos.map((t) => <option key={t} value={t}>{t === 'todos' ? 'Todos los tipos' : t}</option>)}
            </select>
          </div>
          <div>
            <label className="label flex items-center justify-between"><span>Tarifa maxima</span><span className={`num text-[12px] font-semibold ${precioMax > 0 ? 'text-brand-700' : 'text-slate-400'}`}>{precioMax > 0 ? moneda(precioMax) : 'Sin limite'}</span></label>
            <input type="range" className="mt-4 w-full accent-brand-600" min={0} max={precioTope || 100} step={10} value={precioMax} onChange={(e) => setPrecioMax(Number(e.target.value))}/>
          </div>
        </div>
        <div className="divider mt-5 pt-4 flex items-center justify-between">
          <p className="text-[13px] text-slate-500">{loading ? 'Cargando...' : <>Mostrando <strong>{filtradas.length}</strong> de <strong>{canchas.length}</strong></>}</p>
          {(busqueda || tipo !== 'todos' || precioMax > 0) && <button type="button" className="btn-sm text-slate-500" onClick={limpiar}><Icon.close className="h-3.5 w-3.5"/> Limpiar</button>}
        </div>
      </section>
      {loading && <SkeletonGrid n={3}/>}
      {!loading && error && <ErrorMessage mensaje={error} onRetry={refetch}/>}
      {!loading && !error && filtradas.length === 0 && <EmptyState titulo="No encontramos canchas" descripcion="Ajusta los filtros para ver mas resultados."/>}
      {!loading && !error && filtradas.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((c) => <CanchaCard key={c.id} cancha={c}/>)}
        </div>
      )}
    </div>
  )
}