import { IncidentesModel } from '../models/incidentes.js';

export class IncidentesController {
    static async getAll(req, res) {
        try {
            // Comprobar si hay parámetros de búsqueda
            const { tipo, ubicacion, fecha, prioridad } = req.query;
    
            if (tipo || ubicacion || fecha || prioridad) {
                const filters = {
                    tipo,
                    ubicacion,
                    fecha,
                    prioridad
                };
                const incidentes = await IncidentesModel.search(filters);
                return res.json(incidentes);
            }
    
            // Si no hay parámetros de búsqueda, devuelve todos los incidentes
            const incidentes = await IncidentesModel.getAll();
            res.json(incidentes);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los incidentes', error });
        }
    }

    static async getById(req, res) {
        try {
            const incidente = await IncidentesModel.getById(req.params.id);
            if (!incidente) {
                return res.status(404).json({ message: 'Incidente no encontrado' });
            }
            res.json(incidente);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el incidente', error: error.message || error });
        }
    }    

    static async create(req, res) {
        try {
            const incidente = await IncidentesModel.create(req);
            if (!incidente) {
                return res.status(400).json({ message: 'Error al crear el incidente' });
            }
            res.status(201).json(incidente);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el incidente', error });
        }
    }
}