import bcrypt from "bcrypt";
import UserModel, { IUser } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

export class UserService {
  async createUser(data: CreateUserDto, role: string): Promise<IUser> {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear usuario con el rol proporcionado internamente
    const user = new UserModel({
      ...data,
      password: hashedPassword,
      role, // El rol será definido por el servicio
    });

    return await user.save();
  }

  async getUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async updateUser(id: string, data: Partial<CreateUserDto>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id);
  }
}
