import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class IncidentesModel {
    static async getAll(req, res) {
        return prisma.incidentes.findMany();
    }

   static async getById(req, res) {
        const { id } = req.params;
        
        const incidente = prisma.incidentes.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!incidente) return null;

        return incidente;
    }
}