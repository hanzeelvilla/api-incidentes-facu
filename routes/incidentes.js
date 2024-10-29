import { Router } from "express";

const incidentesRouter = Router();

incidentesRouter.get("/", (req, res) => {
    res.json({ message: "GET /incidentes" });
});

export default incidentesRouter;