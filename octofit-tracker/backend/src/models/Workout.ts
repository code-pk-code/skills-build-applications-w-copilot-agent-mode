import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  duration: string;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: String, required: true },
  focus: { type: String, required: true },
});

export default mongoose.model<IWorkout>('Workout', workoutSchema);
