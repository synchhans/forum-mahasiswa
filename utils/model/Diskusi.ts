import mongoose, { Schema, Document } from "mongoose";

interface IDiskusi extends Document {
  title: string;
  description: string;
  link: string;
}

const diskusiSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
});

const Diskusi =
  mongoose.models.Diskusi || mongoose.model<IDiskusi>("Diskusi", diskusiSchema);
export default Diskusi;
