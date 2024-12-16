import bcrypt from "bcrypt";
import UserModel from "../user/schemas/user.schema";
import MasterModel, { IMaster } from "./schemas/master.schema";

export class MasterService {
  async createMaster(username: string, password: string, business: string, ruc: string): Promise<IMaster> {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la colección `users`
    const user = await UserModel.create({
      username,
      password: hashedPassword,
      role: "MASTER", // Rol por defecto
    });

    // Crear el master relacionado con el usuario
    const master = await MasterModel.create({
      user_id: user._id,
      business,
      ruc,
    });

    return master;
  }

  async getAllMasters(): Promise<IMaster[]> {
    return MasterModel.find()
      .populate("user_id", "username role") 
      .exec();
  }
}
