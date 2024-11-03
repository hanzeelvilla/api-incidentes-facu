import { IncidentesModel } from '../models/incidentes.js';

export class IncidentesController {
    static async getAll(req, res) {
        try {
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
            res.status(500).json({ message: 'Error al obtener el incidente', error });
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