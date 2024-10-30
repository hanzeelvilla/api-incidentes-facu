import { Router } from "express";
import { IncidentesController } from "../controllers/incidentes.js";

const incidentesRouter = Router();

incidentesRouter.get("/", IncidentesController.getAll);
incidentesRouter.get("/:id", IncidentesController.getById);

export default incidentesRouter;