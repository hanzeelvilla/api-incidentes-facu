import { Router } from "express";
import incidentesRouter from "./incidentes.js";

const router = Router();

router.use("/incidentes", incidentesRouter);

export default router;