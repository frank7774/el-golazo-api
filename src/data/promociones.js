function sumarDiasISO(dias) {
  const d = new Date()
  d.setDate(d.getDate() + dias)
  return d.toISOString().slice(0, 10)
}

export const promociones = [
  {
    id: '1',
    titulo: 'Lunes y martes 30% dscto.',
    descripcion: 'Aplica a reservas de 2 horas en horario nocturno. No acumulable con otras promociones.',
    descuento: 30,
    vigencia: sumarDiasISO(30),
  },
  {
    id: '2',
    titulo: 'Pack 5 partidos',
    descripcion: 'Reserva 5 fechas y paga solo 4. Válido para cualquier cancha y horario regular.',
    descuento: 20,
    vigencia: sumarDiasISO(45),
  },
  {
    id: '3',
    titulo: 'Matinal deportiva',
    descripcion: 'De 7:00 a 11:00 a.m. tarifa plana de S/ 70 por hora en cualquier cancha.',
    descuento: 25,
    vigencia: sumarDiasISO(15),
  },
]
