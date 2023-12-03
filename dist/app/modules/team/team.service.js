"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../users/user.model");
const team_model_1 = require("./team.model");
const createTeam = (name, userIds) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({ _id: { $in: userIds } });
    if (!users || users.length !== userIds.length) {
        // Handle the case where not all users were found
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not all users were found');
    }
    const team = yield team_model_1.Team.create({
        name,
        users: users.map(user => user._id),
    });
    return team;
});
const getAllTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield team_model_1.Team.find().populate('users');
    return teams;
});
const getTeamById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.Team.findById(id).populate('users');
    return result;
});
const updateTeam = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.Team.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteTeam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.Team.findByIdAndDelete(id);
    return result;
});
exports.TeamService = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
};
