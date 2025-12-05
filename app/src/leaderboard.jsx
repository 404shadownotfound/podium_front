import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import api from './services/api';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import TeamSelector from './components/TeamSelector';
import './App.css';

const SOCKET_URL = 'http://localhost:8003';

function App() {
    const [socket, setSocket] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [viewMode, setViewMode] = useState('teams'); // 'teams' or 'users'
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teams, setTeams] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Initialize Socket.IO connection
    useEffect(() => {
        const newSocket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
        });

        newSocket.on('connect', () => {
            console.log('✅ WebSocket connected');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('❌ WebSocket disconnected');
            setIsConnected(false);
        });

        newSocket.on('connection_response', (data) => {
            console.log('Connection response:', data);
        });

        newSocket.on('leaderboard_update', (data) => {
            console.log('📊 Leaderboard update received:', data);
            setLeaderboard(data.leaderboard);
            setLastUpdate(new Date());
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    // Fetch teams on mount
    useEffect(() => {
        fetchTeams();
    }, []);

    // Request leaderboard data when view mode or selected team changes
    useEffect(() => {
        if (!socket) return;

        if (viewMode === 'teams') {
            socket.emit('request_leaderboard', {});
        } else if (viewMode === 'users' && selectedTeam) {
            socket.emit('request_leaderboard', { team_id: selectedTeam });
        }
    }, [socket, viewMode, selectedTeam]);

    const fetchTeams = async () => {
        try {
            const response = await api.getTeams();
            setTeams(response.data);
            if (response.data.length > 0 && !selectedTeam) {
                setSelectedTeam(response.data[0].id);
            }
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    const handleViewToggle = (mode) => {
        setViewMode(mode);
        if (mode === 'users' && !selectedTeam && teams.length > 0) {
            setSelectedTeam(teams[0].id);
        }
    };

    const handleTeamSelect = (teamId) => {
        setSelectedTeam(teamId);
    };

    return (
        <div className="app">
            <Header
                viewMode={viewMode}
                onViewToggle={handleViewToggle}
                isConnected={isConnected}
                lastUpdate={lastUpdate}
            />

            <div className="container">
                {viewMode === 'users' && (
                    <TeamSelector
                        teams={teams}
                        selectedTeam={selectedTeam}
                        onTeamSelect={handleTeamSelect}
                    />
                )}

                <Leaderboard
                    data={leaderboard}
                    viewMode={viewMode}
                />
            </div>
        </div>
    );
}

export default App;
