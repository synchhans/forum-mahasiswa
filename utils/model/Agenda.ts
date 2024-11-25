import mongoose, { Schema, Document } from "mongoose";

interface IAgenda extends Document {
  title: string;
  date: string;
  description: string;
  image: string;
}

const agendaSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Agenda =
  mongoose.models.Agenda || mongoose.model<IAgenda>("Agenda", agendaSchema);
export default Agenda;
