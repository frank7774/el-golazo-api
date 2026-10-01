import { Router } from 'express'
import { generarHorarios } from '../data/horarios.js'

const router = Router()

/**
 * GET /api/horarios
 * Query params opcionales:
 *   ?fecha=YYYY-MM-DD
 *   ?canchaId=1
 *   ?estado=disponible|reservado|mantenimiento
 */
router.get('/', (req, res) => {
  let horarios = generarHorarios()

  const { fecha, canchaId, estado } = req.query

  if (fecha) {
    horarios = horarios.filter((h) => h.fecha === fecha)
  }
  if (canchaId) {
    horarios = horarios.filter((h) => h.canchaId === String(canchaId))
  }
  if (estado) {
    horarios = horarios.filter((h) => h.estado === String(estado))
  }

  res.json({ ok: true, total: horarios.length, data: horarios })
})

/** GET /api/horarios/:id — detalle por ID */
router.get('/:id', (req, res) => {
  const horarios = generarHorarios()
  const horario = horarios.find((h) => h.id === req.params.id)

  if (!horario) {
    return res.status(404).json({ ok: false, message: 'Horario no encontrado' })
  }

  res.json({ ok: true, data: horario })
})

export default router
