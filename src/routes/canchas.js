import { Router } from 'express'
import { canchas } from '../data/canchas.js'

const router = Router()

/** GET /api/canchas — listado completo */
router.get('/', (req, res) => {
  res.json({ ok: true, total: canchas.length, data: canchas })
})

/** GET /api/canchas/:id — detalle por ID */
router.get('/:id', (req, res) => {
  const cancha = canchas.find((c) => c.id === req.params.id)
  if (!cancha) {
    return res.status(404).json({ ok: false, message: 'Cancha no encontrada' })
  }
  res.json({ ok: true, data: cancha })
})

export default router
