import { Router } from "express";
import { MasterController } from "./master.controller";
import { authMiddleware } from "../auth/jwt/auth.middleware";

const router = Router();
const masterController = new MasterController();

router.post("/", authMiddleware, masterController.createMaster);
router.get("/", authMiddleware, masterController.getAllMasters);
router.delete("/:id", authMiddleware, masterController.deleteMaster);
router.put("/:id", authMiddleware, masterController.updateMaster);
export default router;
