import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  status: boolean;
  role: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    role: { type: String, required: true, enum: ["SUPER_MASTER", "MASTER", "COMPANY"] },
  },
  { timestamps: true } // Agrega createdAt y updatedAt
);

export default mongoose.model<IUser>("User", UserSchema);
