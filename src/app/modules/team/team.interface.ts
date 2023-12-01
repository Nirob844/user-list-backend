import { Model } from 'mongoose';

export type ITeam = {
  name: string;
  users: string[]; // User IDs
};
export type TeamModel = Model<ITeam, Record<string, unknown>>;
