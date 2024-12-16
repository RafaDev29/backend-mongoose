import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

export default router;
