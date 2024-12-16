import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  ruc: string;
  business: string;
  username: string;
  password: string;
  role: string;
  userWialon: string;
  passwordWialon: string;
  logoname: string;
  user_id: mongoose.Types.ObjectId; 
  master_id: mongoose.Types.ObjectId; 
}

const CompanySchema: Schema = new Schema(
  {
    ruc: { type: String, required: true },
    business: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "COMPANY", required: true },
    userWialon: { type: String, required: true },
    passwordWialon: { type: String, required: true },
    logoname: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    master_id: { type: mongoose.Schema.Types.ObjectId, ref: "Master", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICompany>("Company", CompanySchema);
