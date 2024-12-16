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


  async deleteMaster(masterId: string): Promise<void> {
    const master = await MasterModel.findById(masterId);

    if (!master) {
      throw new Error("Master not found");
    }

    // Eliminar el usuario asociado
    await UserModel.findByIdAndDelete(master.user_id);

    // Eliminar el master
    await MasterModel.findByIdAndDelete(masterId);
  }

  async updateMaster(
    masterId: string,
    updates: { business?: string; ruc?: string; username?: string; password?: string }
  ): Promise<IMaster> {
    // Buscar el master en la base de datos
    const master = await MasterModel.findById(masterId);

    if (!master) {
      throw new Error("Master not found");
    }

    // Actualizar los datos del usuario asociado
    if (updates.username || updates.password) {
      const userUpdates: Partial<{ username: string; password: string }> = {};

      if (updates.username) {
        userUpdates.username = updates.username;
      }

      if (updates.password) {
        userUpdates.password = await bcrypt.hash(updates.password, 10);
      }

      await UserModel.findByIdAndUpdate(master.user_id, userUpdates, { new: true });
    }

    // Actualizar los datos del master
    const masterUpdates: Partial<{ business: string; ruc: string }> = {};

    if (updates.business) {
      masterUpdates.business = updates.business;
    }

    if (updates.ruc) {
      masterUpdates.ruc = updates.ruc;
    }

    const updatedMaster = await MasterModel.findByIdAndUpdate(masterId, masterUpdates, { new: true });

    if (!updatedMaster) {
      throw new Error("Failed to update master");
    }

    return updatedMaster;
  }
}
