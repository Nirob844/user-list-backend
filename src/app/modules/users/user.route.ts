import express from 'express';
import { UsersController } from './user.controller';

const router = express.Router();

//router.post('/', UsersController.createUser);
router.get('/', UsersController.getAllUsers);

export const UserRoutes = router;
