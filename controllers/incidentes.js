import { IncidentesModel } from '../models/incidentes.js';

export class IncidentesController {
    static async getAll(req, res) {
        const incidentes = await IncidentesModel.getAll();
        res.json(incidentes);
    }
}