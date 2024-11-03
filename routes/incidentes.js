import { Router } from "express";
import { IncidentesController } from "../controllers/incidentes.js";
import multer from "multer";

const incidentesRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

incidentesRouter.get("/", IncidentesController.getAll);
incidentesRouter.get("/:id", IncidentesController.getById);
incidentesRouter.post("/", upload.single("file"), IncidentesController.create);

export default incidentesRouter;