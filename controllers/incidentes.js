import { IncidentesModel } from '../models/incidentes.js';

export class IncidentesController {
    static async getAll(req, res) {
        const incidentes = await IncidentesModel.getAll(req, res);
        res.json(incidentes);
    }

    static async getById(req, res) {
        const incidente = await IncidentesModel.getById(req, res);
        if (!incidente) {
            res.status(404).json({ message: 'Incidente no encontrado' });
            return;
        }
        res.json(incidente);
    }
}