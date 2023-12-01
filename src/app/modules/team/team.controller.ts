import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ITeam } from './team.interface';
import { TeamService } from './team.service';

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const { name, userIds } = req.body;
  const result = await TeamService.createTeam(name, userIds);

  sendResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team created successfully',
    data: result,
  });
});

const getAllTeams = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.getAllTeams();

  sendResponse<ITeam[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teams fetched successfully',
    data: result,
  });
});

const getTeamById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamService.getTeamById(id);

  sendResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team details retrieved successfully',
    data: result,
  });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamService.updateTeam(id, req.body);

  sendResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team updated successfully',
    data: result,
  });
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamService.deleteTeam(id);

  sendResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team deleted successfully',
    data: result,
  });
});

export const TeamController = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
