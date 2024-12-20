import crypto from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const prisma = new PrismaClient();
const randomId = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});

export class IncidentesModel {
    static async getAll() {
        const incidentes = await prisma.incidentes.findMany();

        for (const incidente of incidentes) {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: incidente.fotoName
            }

            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            incidente.fotoUrl = url;
        };

        return incidentes;
    }

    static async getById(id) {
        const incidente = await prisma.incidentes.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!incidente) return null;

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: incidente.fotoName
        }

        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        incidente.fotoUrl = url;

        return incidente;
    }

    static async search(filters) {
        const { tipo, ubicacion, fecha, prioridad } = filters;

        // Construye un objeto de búsqueda condicionalmente
        const where = {};
        if (tipo) where.tipo = tipo;
        if (ubicacion) where.ubicacion = ubicacion;
        if (fecha) where.fecha = new Date(fecha); 
        if (prioridad) where.prioridad = prioridad;

        const incidentes = await prisma.incidentes.findMany({
            where
        });

        // Obtener URLs de las fotos
        for (const incidente of incidentes) {
            if (incidente.fotoName) {
                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: incidente.fotoName
                };

                const command = new GetObjectCommand(params);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                incidente.fotoUrl = url;
            }
        }

        return incidentes;
    }

    static async create(req, res) {
        const imgName = randomId();
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: imgName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        return prisma.incidentes.create({
            data: {
                tipo: req.body.tipo,
                descripcion: req.body.descripcion,
                ubicacion: req.body.ubicacion,
                fecha: new Date(req.body.fecha),
                fotoName: imgName,
                prioridad: req.body.prioridad,
            }
        });
    }
}