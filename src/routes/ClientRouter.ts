import { Router } from "express";
import authMiddleware from "../middlewares/jwt";
import ClientController from "../controllers/ClientController";

const router = Router();

router.post("/", authMiddleware, ClientController.create);
router.get("/", authMiddleware, ClientController.list);
router.get("/:id", authMiddleware, ClientController.getById);
// router.put("/:id", ClientController.update);
router.delete("/:id", authMiddleware, ClientController.delete);

export default router;