export type EstadoHorario = 'disponible' | 'reservado' | 'mantenimiento'
export interface Cancha { id: string; nombre: string; tipo: string; descripcion: string; precioHora: number; capacidad: number; imagen: string; servicios: string[]; disponible: boolean }
export interface Horario { id: string; canchaId: string; canchaNombre: string; fecha: string; horaInicio: string; horaFin: string; duracionMin: number; precio: number; estado: EstadoHorario }
export interface Servicio { id: string; nombre: string; descripcion: string; icono: string; precio: number; categoria: string }
export interface Promocion { id: string; titulo: string; descripcion: string; descuento: number; vigencia: string }