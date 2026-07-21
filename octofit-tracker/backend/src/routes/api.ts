import { Router, type Request } from 'express';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

interface AppRequest extends Request {
  apiBaseUrl?: string;
}

interface AppResponse {
  json(payload: unknown): unknown;
}

const router = Router();

router.get('/users/', async (req: AppRequest, res: AppResponse) => {
  const users = await User.find({}).lean();
  res.json({ baseUrl: req.apiBaseUrl, data: users });
});

router.get('/teams/', async (req: AppRequest, res: AppResponse) => {
  const teams = await Team.find({}).lean();
  res.json({ baseUrl: req.apiBaseUrl, data: teams });
});

router.get('/activities/', async (req: AppRequest, res: AppResponse) => {
  const activities = await Activity.find({}).lean();
  res.json({ baseUrl: req.apiBaseUrl, data: activities });
});

router.get('/leaderboard/', async (req: AppRequest, res: AppResponse) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ baseUrl: req.apiBaseUrl, data: leaderboard });
});

router.get('/workouts/', async (req: AppRequest, res: AppResponse) => {
  const workouts = await Workout.find({}).lean();
  res.json({ baseUrl: req.apiBaseUrl, data: workouts });
});

export default router;
