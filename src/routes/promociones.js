import { Router } from 'express'
import { promociones } from '../data/promociones.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({ ok: true, total: promociones.length, data: promociones })
})

router.get('/:id', (req, res) => {
  const promo = promociones.find((p) => p.id === req.params.id)
  if (!promo) {
    return res.status(404).json({ ok: false, message: 'Promoción no encontrada' })
  }
  res.json({ ok: true, data: promo })
})

export default router
