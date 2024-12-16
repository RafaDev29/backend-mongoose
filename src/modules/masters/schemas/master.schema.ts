import mongoose, { Schema, Document } from "mongoose";

export interface IMaster extends Document {
  user_id: mongoose.Types.ObjectId; // Referencia a la colección `users`
  business: string; // Nombre del negocio
  ruc: string; // Número de RUC
}

const MasterSchema: Schema = new Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    business: { type: String, required: true },
    ruc: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMaster>("Master", MasterSchema);
