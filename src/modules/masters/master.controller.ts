import { Request, Response } from "express";
import { MasterService } from "./master.service";
import { createMasterSchema } from "./dto/create-master.dto";

const masterService = new MasterService();

export class MasterController {
  createMaster = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validar los datos de entrada
      const { error, value } = createMasterSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        res.status(400).json({
          status: false,
          message: "Validation failed",
          errors: error.details.map((detail) => detail.message),
        });
        return;
      }

      // Crear el master
      const { username, password, business, ruc } = value;
      const master = await masterService.createMaster(
        username,
        password,
        business,
        ruc
      );

      res.status(201).json({
        status: true,
        message: "Master created successfully",
        data: master,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err,
      });
    }
  };


  getAllMasters = async (req: Request, res: Response): Promise<void> => {
    try {
      const masters = await masterService.getAllMasters();

      res.status(200).json({
        status: true,
        message: "Masters retrieved successfully",
        data: masters,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err,
      });
    }
  };
}
