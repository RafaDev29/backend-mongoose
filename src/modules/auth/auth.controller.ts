import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginSchema } from "./dto/login.dto";

const authService = new AuthService();

export class AuthController {
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validar el cuerpo de la petición con Joi
      const { error, value } = loginSchema.validate(req.body, { abortEarly: false });

      if (error) {
        res.status(400).json({
          status: false,
          message: "Validation failed",
          errors: error.details.map((detail) => detail.message),
        });
        return;
      }

      // Procesar la lógica de inicio de sesión
      const { username, password } = value;
      const { token, user } = await authService.login(username, password);

      res.status(200).json({
        status: true,
        message: "Login successful",
        data: { token, user },
      });
    } catch (err) {
      res.status(401).json({
        status: false,
        message: err,
      });
    }
  };
}
