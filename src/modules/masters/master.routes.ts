import { Router } from "express";
import { MasterController } from "./master.controller";
import { authMiddleware } from "../auth/jwt/auth.middleware";

const router = Router();
const masterController = new MasterController();

router.post("/", authMiddleware("SUPER_MASTER"), masterController.createMaster);
router.get("/", authMiddleware("SUPER_MASTER"), masterController.getAllMasters);
router.delete("/:id", authMiddleware("SUPER_MASTER"), masterController.deleteMaster);
router.put("/:id", authMiddleware("SUPER_MASTER"), masterController.updateMaster);
export default router;
