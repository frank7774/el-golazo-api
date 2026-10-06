export const moneda = (n: number) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(Number.isFinite(n) ? n : 0)
export function hoyISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export function sumarDiasISO(dias: number): string {
  const d = new Date(); d.setDate(d.getDate() + dias)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export function fechaLarga(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  const txt = d.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })
  return txt.charAt(0).toUpperCase() + txt.slice(1)
}
export function fechaCorta(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })
}
export function hora12(hora: string): string {
  const [h, m] = String(hora).split(':').map(Number)
  if (Number.isNaN(h)) return hora
  const sufijo = h >= 12 ? 'p.m.' : 'a.m.'
  const hh = h % 12 === 0 ? 12 : h % 12
  return `${String(hh).padStart(2, '0')}:${String(m ?? 0).padStart(2, '0')} ${sufijo}`
}
export function rangoHoras(inicio: string, fin: string): string {
  return `${hora12(inicio)} – ${hora12(fin)}`
}