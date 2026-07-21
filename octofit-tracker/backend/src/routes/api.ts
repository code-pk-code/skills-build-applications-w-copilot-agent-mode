import { Router } from 'express';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

const router = Router();
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

router.get('/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ baseUrl: apiBaseUrl, data: users });
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ baseUrl: apiBaseUrl, data: teams });
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ baseUrl: apiBaseUrl, data: activities });
});

router.get('/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ baseUrl: apiBaseUrl, data: leaderboard });
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ baseUrl: apiBaseUrl, data: workouts });
});

export default router;
