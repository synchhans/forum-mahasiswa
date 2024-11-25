import mongoose, { Schema, Document } from "mongoose";

interface IGeneral extends Document {
  logo: string;
  universitas: string;
  link_universitas: string;
  link_aplikasi: string;
  nama_forum: string;
  konten_forum: string;
  konten_tentang: string;
  email: string;
  wa: string;
}

const generalSchema: Schema = new Schema({
  logo: { type: String, required: true },
  universitas: { type: String, required: true },
  link_universitas: { type: String, required: true },
  link_aplikasi: { type: String, required: true },
  nama_forum: { type: String, required: true },
  konten_forum: { type: String, required: true },
  konten_tentang: { type: String, required: true },
  email: { type: String, required: true },
  wa: { type: String, required: true },
});

const General =
  mongoose.models.General || mongoose.model<IGeneral>("General", generalSchema);
export default General;
