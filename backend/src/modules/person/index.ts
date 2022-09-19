import { Router } from "express";
import { PersonController } from "./controller";

const personRoutes = Router();
const controller = new PersonController();

personRoutes.get("/", controller.listAll);
personRoutes.get("/:id", controller.findById);
personRoutes.post("/", controller.create);
personRoutes.put("/:id", controller.update);
personRoutes.delete("/:id", controller.delete);

export { personRoutes };
