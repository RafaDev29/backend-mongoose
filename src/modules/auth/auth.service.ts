import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel, { IUser } from "../user/schemas/user.schema";
import { jwtConstants } from "./jwt/jwt.config";

export class AuthService {
  // Validar usuario y generar token
  async login(username: string, password: string): Promise<{ token: string; user: Partial<IUser> }> {
    // Buscar el usuario en la base de datos
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generar token JWT
    const payload = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, jwtConstants.secret, {
      expiresIn: jwtConstants.expiresIn,
    });

    // Retornar el token y datos básicos del usuario
    return {
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
    };
  }
}
