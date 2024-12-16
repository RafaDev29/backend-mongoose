import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      const role = "SUPER_MASTER"; 
      const user = await userService.createUser(req.body, role);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}
