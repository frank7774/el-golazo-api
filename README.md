# El Golazo — Monorepo

Proyecto completo para la cancha de fútbol **El Golazo**: API REST + Frontend React.

## 🏗️ Estructura

- **`/src`** + **`server.js`** → API REST (Node.js + Express)
- **`/frontend`** → Aplicación web (React + TypeScript + Vite + Tailwind)

## 🚀 API REST

**URL desplegada:** https://el-golazo-api-8b8h.onrender.com

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/api/canchas` | Listado de canchas |
| GET | `/api/canchas/:id` | Detalle de cancha |
| GET | `/api/horarios` | Listado de horarios (con filtros) |
| GET | `/api/horarios/:id` | Detalle de horario |
| GET | `/api/servicios` | Listado de servicios |
| GET | `/api/promociones` | Listado de promociones |

### Filtros en `/api/horarios`

- `?fecha=YYYY-MM-DD`
- `?canchaId=1`
- `?estado=disponible|reservado|mantenimiento`

## 💻 Frontend

**Ejecutar en local:**

```bash
cd frontend
npm install
npm run dev

App en http://localhost:5173.

VITE_API_URL=https://el-golazo-api-8b8h.onrender.com/api
VITE_USE_MOCK=false
