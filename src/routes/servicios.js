import { Router } from 'express'
import { servicios } from '../data/servicios.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({ ok: true, total: servicios.length, data: servicios })
})

router.get('/:id', (req, res) => {
  const servicio = servicios.find((s) => s.id === req.params.id)
  if (!servicio) {
    return res.status(404).json({ ok: false, message: 'Servicio no encontrado' })
  }
  res.json({ ok: true, data: servicio })
})

export default router
