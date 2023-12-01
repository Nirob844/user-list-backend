import express from 'express';
import { TeamController } from './team.controller';

const router = express.Router();

router.post('/', TeamController.createTeam);
router.get('/', TeamController.getAllTeams);

export const TeamRoutes = router;
