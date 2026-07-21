import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava@example.com', role: 'Runner', fitnessGoal: 'Marathon prep' },
      { name: 'Noah Kim', email: 'noah@example.com', role: 'Cyclist', fitnessGoal: 'Build endurance' },
      { name: 'Mia Chen', email: 'mia@example.com', role: 'Strength Trainer', fitnessGoal: 'Increase power' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Trail Blazers', members: 8, focus: 'Outdoor endurance' },
      { name: 'Peak Performers', members: 6, focus: 'High-intensity training' },
    ]);

    const activities = await Activity.insertMany([
      { type: 'Run', duration: '30m', distance: '5km', date: '2026-07-20' },
      { type: 'Yoga', duration: '20m', distance: '0km', date: '2026-07-21' },
      { type: 'Cycling', duration: '45m', distance: '16km', date: '2026-07-21' },
    ]);

    const leaderboard = await LeaderboardEntry.insertMany([
      { name: 'Ava Patel', points: 125, streak: 7 },
      { name: 'Noah Kim', points: 118, streak: 4 },
      { name: 'Mia Chen', points: 109, streak: 6 },
    ]);

    const workouts = await Workout.insertMany([
      { title: 'Morning Mobility', difficulty: 'Easy', duration: '15m', focus: 'Recovery' },
      { title: 'Interval Sprint', difficulty: 'Hard', duration: '25m', focus: 'Cardio' },
      { title: 'Strength Circuit', difficulty: 'Medium', duration: '35m', focus: 'Power' },
    ]);

    console.log('Database seeding complete');
    console.log({ users: users.length, teams: teams.length, activities: activities.length, leaderboard: leaderboard.length, workouts: workouts.length });
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
