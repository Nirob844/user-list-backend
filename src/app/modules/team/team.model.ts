import mongoose, { Schema, model } from 'mongoose';
import { ITeam, TeamModel } from './team.interface';

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
});

export const Team = model<ITeam, TeamModel>('Team', teamSchema);
