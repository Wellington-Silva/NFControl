import { Router } from "express";
import ClientController from "../controllers/ClientController";

const router = Router();

router.post("/register", ClientController.create);
router.get("/list", ClientController.list);
router.get("/:id", ClientController.getById);
router.put("/:id", ClientController.update);
router.delete("/:id", ClientController.delete);

export default router;