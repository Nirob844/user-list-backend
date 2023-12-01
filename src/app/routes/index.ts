import express from 'express';
import { TeamRoutes } from '../modules/team/team.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/team',
    route: TeamRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
