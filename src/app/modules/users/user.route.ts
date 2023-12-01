import express from 'express';
import { UsersController } from './user.controller';

const router = express.Router();

router.post('/', UsersController.createUser);
router.get('/', UsersController.getAllUsers);
router.get('/:id', UsersController.getSingleUser);
router.patch('/:id', UsersController.updateUser);

export const UserRoutes = router;
