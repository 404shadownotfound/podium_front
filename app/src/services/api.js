import axios from 'axios';

const API_BASE_URL = 'http://localhost:8003';

export const api = {
    // Teams
    getTeams: () => axios.get(`${API_BASE_URL}/api/teams`),
    getTeam: (id) => axios.get(`${API_BASE_URL}/api/teams/${id}`),
    createTeam: (data) => axios.post(`${API_BASE_URL}/api/teams`, data),
    updateTeam: (id, data) => axios.put(`${API_BASE_URL}/api/teams/${id}`, data),
    deleteTeam: (id) => axios.delete(`${API_BASE_URL}/api/teams/${id}`),

    // Users
    getUsers: () => axios.get(`${API_BASE_URL}/api/users`),
    getUser: (id) => axios.get(`${API_BASE_URL}/api/users/${id}`),
    createUser: (data) => axios.post(`${API_BASE_URL}/api/users`, data),
    updateUser: (id, data) => axios.put(`${API_BASE_URL}/api/users/${id}`, data),
    deleteUser: (id) => axios.delete(`${API_BASE_URL}/api/users/${id}`),

    // Leaderboard
    getTeamLeaderboard: () => axios.get(`${API_BASE_URL}/api/leaderboard`),
    getUserLeaderboard: (teamId) => axios.get(`${API_BASE_URL}/api/leaderboard?team_id=${teamId}`),
};

export default api;
