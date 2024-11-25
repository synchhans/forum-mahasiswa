import mongoose, { Schema, Document } from "mongoose";

interface IPengumuman extends Document {
  title: string;
  description: string;
  image: string;
  link: string;
}

const pengumumanSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
});

const Pengumuman =
  mongoose.models.Pengumuman ||
  mongoose.model<IPengumuman>("Pengumuman", pengumumanSchema);
export default Pengumuman;
