import { z } from 'zod';

export const incidentesSchema = z.object({
    tipo: z.string(),
    descripcion: z.string().optional(),
    ubicacion: z.string(),
    fecha: z.string().optional(),
    prioridad: z.string().optional(),
});