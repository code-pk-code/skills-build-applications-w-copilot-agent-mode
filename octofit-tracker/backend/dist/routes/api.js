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
router.get('/users/', async (req, res) => {
    const users = await User_1.default.find({}).lean();
    res.json({ baseUrl: req.apiBaseUrl, data: users });
});
router.get('/teams/', async (req, res) => {
    const teams = await Team_1.default.find({}).lean();
    res.json({ baseUrl: req.apiBaseUrl, data: teams });
});
router.get('/activities/', async (req, res) => {
    const activities = await Activity_1.default.find({}).lean();
    res.json({ baseUrl: req.apiBaseUrl, data: activities });
});
router.get('/leaderboard/', async (req, res) => {
    const leaderboard = await LeaderboardEntry_1.default.find({}).lean();
    res.json({ baseUrl: req.apiBaseUrl, data: leaderboard });
});
router.get('/workouts/', async (req, res) => {
    const workouts = await Workout_1.default.find({}).lean();
    res.json({ baseUrl: req.apiBaseUrl, data: workouts });
});
exports.default = router;
