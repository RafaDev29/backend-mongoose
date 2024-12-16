import { Request, Response } from "express";
import { CompanyService } from "./company.service";
import { createCompanySchema } from "./dto/create-company.dto";

const companyService = new CompanyService();

export class CompanyController {
  async createCompany(req: Request, res: Response): Promise<void> {
    try {
      // Validar los datos de entrada
      const { error, value } = createCompanySchema.validate(req.body, { abortEarly: false });

      if (error) {
        res.status(400).json({
          status: false,
          message: "Validation failed",
          errors: error.details.map((detail) => detail.message),
        });
        return;
      }
           
      // Verificar si el usuario tiene el rol "MASTER"
      if (req.user?.role !== "MASTER") {
        res.status(403).json({
          status: false,
          message: "Only users with the MASTER role can create companies",
        });
        return;
      }

      // Crear la compañía
      const { ruc, business, username, password, userWialon, passwordWialon, logoname } = value;
      const master_id = req.user._id; // Usar el ID del usuario autenticado
      const company = await companyService.createCompany(
        ruc,
        business,
        username,
        password,
        userWialon,
        passwordWialon,
        logoname,
        master_id
      );

      res.status(201).json({
        status: true,
        message: "Company created successfully",
        data: company,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err,
      });
    }
  }
}
