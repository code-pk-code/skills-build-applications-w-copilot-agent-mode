import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  name: string;
  points: number;
  streak: number;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
});

export default mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
