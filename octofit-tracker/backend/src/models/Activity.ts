import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  duration: string;
  distance: string;
  date: string;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  duration: { type: String, required: true },
  distance: { type: String, required: true },
  date: { type: String, required: true },
});

export default mongoose.model<IActivity>('Activity', activitySchema);
