import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ITeam } from './team.interface';
import { Team } from './team.model';

const createTeam = async (name: string, userIds: string[]): Promise<ITeam> => {
  const users = await User.find({ _id: { $in: userIds } });

  if (!users || users.length !== userIds.length) {
    // Handle the case where not all users were found
    throw new ApiError(httpStatus.NOT_FOUND, 'Not all users were found');
  }

  const team = await Team.create({
    name,
    users: users.map(user => user._id),
  });

  return team;
};

const getAllTeams = async (): Promise<ITeam[]> => {
  const teams = await Team.find().populate('users');
  return teams;
};

export const TeamService = {
  createTeam,
  getAllTeams,
};
