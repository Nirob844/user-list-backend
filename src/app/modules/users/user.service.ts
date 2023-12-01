import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'failed to create user !');
  }
  return createdUser;
};

const getAllUsers = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
