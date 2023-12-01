import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TeamService } from './team.service';

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const { name, userIds } = req.body;
  const result = await TeamService.createTeam(name, userIds);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team created successfully',
    data: result,
  });
});

const getAllTeams = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.getAllTeams();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teams fetched successfully',
    data: result,
  });
});

export const TeamController = {
  createTeam,
  getAllTeams,
};
