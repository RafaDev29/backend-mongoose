import bcrypt from "bcrypt";
import UserModel from "../user/schemas/user.schema";
import MasterModel from "../masters/schemas/master.schema";
import CompanyModel, { ICompany } from "./schemas/company.schema";

export class CompanyService {
  async createCompany(
    ruc: string,
    business: string,
    username: string,
    password: string,
    userWialon: string,
    passwordWialon: string,
    logoname: string,
    master_id: string
  ): Promise<ICompany> {
    // Verificar que el master exista
    const master = await MasterModel.findById(master_id);
    if (!master) {
      throw new Error("Master not found");
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la colección `users`
    const user = await UserModel.create({
      username,
      password: hashedPassword,
      role: "COMPANY",
    });

    // Crear la compañía relacionada con el usuario y el master
    const company = await CompanyModel.create({
      ruc,
      business,
      username,
      password: hashedPassword,
      userWialon,
      passwordWialon,
      logoname,
      user_id: user._id,
      master_id: master._id,
    });

    return company;
  }
}
