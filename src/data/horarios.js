import { canchas } from './canchas.js'

const HORAS = ['08:00', '09:00', '10:00', '11:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']

function hoyISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function sumarDiasISO(dias) {
  const d = new Date()
  d.setDate(d.getDate() + dias)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Genera horarios para los próximos 7 días */
export function generarHorarios() {
  const resultado = []
  const dias = [0, 1, 2, 3, 4, 5, 6]

  for (const cancha of canchas) {
    for (const dia of dias) {
      for (let i = 0; i < HORAS.length; i++) {
        const hora = HORAS[i]
        // Distribucion pseudoaleatoria pero determinista para que los estados varíen
        const semilla = (Number(cancha.id) * 7 + dia * 3 + i * 5) % 11
        let estado = 'disponible'
        if (semilla === 0 || semilla === 3 || semilla === 7) estado = 'reservado'
        else if (semilla === 10) estado = 'mantenimiento'

        // Canchas no disponibles → todo en mantenimiento
        if (!cancha.disponible) estado = 'mantenimiento'

        const [h] = hora.split(':').map(Number)
        const precioBase = cancha.precioHora
        const precio = h >= 18 ? precioBase + 20 : precioBase

        resultado.push({
          id: `${cancha.id}-${dia}-${i}`,
          canchaId: cancha.id,
          canchaNombre: cancha.nombre,
          fecha: dia === 0 ? hoyISO() : sumarDiasISO(dia),
          horaInicio: hora,
          horaFin: `${String(h + 1).padStart(2, '0')}:00`,
          duracionMin: 60,
          precio,
          estado,
        })
      }
    }
  }

  return resultado
}
