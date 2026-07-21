"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
router.get('/users/', async (_req, res) => {
    const users = await User_1.default.find({}).lean();
    res.json({ baseUrl: apiBaseUrl, data: users });
});
router.get('/teams/', async (_req, res) => {
    const teams = await Team_1.default.find({}).lean();
    res.json({ baseUrl: apiBaseUrl, data: teams });
});
router.get('/activities/', async (_req, res) => {
    const activities = await Activity_1.default.find({}).lean();
    res.json({ baseUrl: apiBaseUrl, data: activities });
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await LeaderboardEntry_1.default.find({}).lean();
    res.json({ baseUrl: apiBaseUrl, data: leaderboard });
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await Workout_1.default.find({}).lean();
    res.json({ baseUrl: apiBaseUrl, data: workouts });
});
exports.default = router;
