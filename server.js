import express from 'express'
import cors from 'cors'

import canchasRouter from './src/routes/canchas.js'
import horariosRouter from './src/routes/horarios.js'
import serviciosRouter from './src/routes/servicios.js'
import promocionesRouter from './src/routes/promociones.js'

const app = express()
const PORT = process.env.PORT || 3000

/* ---------------------- Middlewares ---------------------- */
app.use(cors({ origin: '*' }))
app.use(express.json())

/* ---------------------- Log simple ------------------------ */
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

/* --------------------- Ruta raíz / health ------------------ */
app.get('/', (_req, res) => {
  res.json({
    ok: true,
    mensaje: 'API El Golazo — Cancha de fútbol',
    version: '1.0.0',
    endpoints: {
      canchas:      '/api/canchas',
      canchaDetalle:'/api/canchas/:id',
      horarios:     '/api/horarios',
      horariosFiltros:'/api/horarios?fecha=YYYY-MM-DD&canchaId=1&estado=disponible',
      horarioDetalle:'/api/horarios/:id',
      servicios:    '/api/servicios',
      promociones:  '/api/promociones',
    },
  })
})

/* ------------------------ Rutas API ------------------------ */
app.use('/api/canchas', canchasRouter)
app.use('/api/horarios', horariosRouter)
app.use('/api/servicios', serviciosRouter)
app.use('/api/promociones', promocionesRouter)

/* ---------------------- 404 genérico ----------------------- */
app.use((req, res) => {
  res.status(404).json({ ok: false, message: `Ruta ${req.method} ${req.originalUrl} no existe` })
})

/* -------------------- Manejador de errores ----------------- */
app.use((err, _req, res, _next) => {
  console.error('Error:', err)
  res.status(500).json({ ok: false, message: 'Error interno del servidor' })
})

/* --------------------------- Start ------------------------- */
app.listen(PORT, () => {
  console.log(`⚽ API El Golazo corriendo en http://localhost:${PORT}`)
})
