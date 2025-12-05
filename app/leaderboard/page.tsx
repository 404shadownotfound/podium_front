"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { io, Socket } from 'socket.io-client'
import { Button } from '@/components/ui/button'
import { LeaderboardDisplay } from '@/components/leaderboard-display'
import { TeamSelector } from '@/components/team-selector'
import { ChevronLeft } from 'lucide-react'

const SOCKET_URL = 'http://localhost:8003'
const API_URL = 'http://localhost:8003/api'

interface LeaderboardItem {
    id: string
    name: string
    score: number
}

interface Team {
    id: string
    name: string
    score: number
}

export default function LeaderboardPage() {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([])
    const [teams, setTeams] = useState<Team[]>([])
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<'teams' | 'users'>('teams')
    const [isConnected, setIsConnected] = useState(false)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

    // Fetch teams on mount
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${API_URL}/teams`)
                const data = await response.json()
                setTeams(data)
                if (data.length > 0 && !selectedTeam) {
                    setSelectedTeam(data[0].id)
                }
            } catch (error) {
                console.error('Error fetching teams:', error)
            }
        }
        fetchTeams()
    }, [])

    // Initialize Socket.IO connection
    useEffect(() => {
        const newSocket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
        })

        newSocket.on('connect', () => {
            console.log('✅ WebSocket connected')
            setIsConnected(true)
        })

        newSocket.on('disconnect', () => {
            console.log('❌ WebSocket disconnected')
            setIsConnected(false)
        })

        newSocket.on('connection_response', (data) => {
            console.log('Connection response:', data)
        })

        newSocket.on('leaderboard_update', (data: { leaderboard: LeaderboardItem[] }) => {
            console.log('📊 Leaderboard update received:', data)
            setLeaderboard(data.leaderboard)
            setLastUpdate(new Date())
        })

        setSocket(newSocket)

        return () => {
            newSocket.close()
        }
    }, [])

    // Request leaderboard data when view mode or selected team changes
    useEffect(() => {
        if (!socket) return

        if (viewMode === 'teams') {
            socket.emit('request_leaderboard', {})
        } else if (viewMode === 'users' && selectedTeam) {
            socket.emit('request_leaderboard', { team_id: selectedTeam })
        }
    }, [socket, viewMode, selectedTeam])

    const handleViewToggle = (mode: 'teams' | 'users') => {
        setViewMode(mode)
        if (mode === 'users' && !selectedTeam && teams.length > 0) {
            setSelectedTeam(teams[0].id)
        }
    }

    const handleTeamSelect = (teamId: string) => {
        setSelectedTeam(teamId)
    }

    const formatTime = (date: Date | null) => {
        if (!date) return ''
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Navigation */}
            <nav className="sticky top-0 z-40 border-b border-cyan-500/10 bg-gradient-to-b from-slate-950/90 to-slate-950/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            TechQuest
                        </div>
                        <Link href="/">
                            <Button
                                variant="outline"
                                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 rounded-lg bg-transparent hover:border-cyan-400 transition-all duration-300"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Connection Status */}
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                            <span className="text-sm text-slate-400">
                                {isConnected ? 'Live' : 'Offline'}
                            </span>
                        </div>
                        {isConnected && lastUpdate && (
                            <span className="text-xs text-slate-500">
                                Updated: {formatTime(lastUpdate)}
                            </span>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Live <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Leaderboard</span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Real-time rankings and scores from the competition
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex gap-2 p-1 bg-slate-900/50 rounded-lg border border-cyan-500/20">
                        <button
                            onClick={() => handleViewToggle('teams')}
                            className={`
                px-6 py-2 rounded-md font-semibold transition-all duration-300
                ${viewMode === 'teams'
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                                    : 'text-slate-400 hover:text-white'
                                }
              `}
                        >
                            🏆 Teams
                        </button>
                        <button
                            onClick={() => handleViewToggle('users')}
                            className={`
                px-6 py-2 rounded-md font-semibold transition-all duration-300
                ${viewMode === 'users'
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                                    : 'text-slate-400 hover:text-white'
                                }
              `}
                        >
                            👥 Users
                        </button>
                    </div>
                </div>

                {/* Team Selector (only visible in users mode) */}
                {viewMode === 'users' && (
                    <TeamSelector
                        teams={teams}
                        selectedTeam={selectedTeam}
                        onTeamSelect={handleTeamSelect}
                    />
                )}

                {/* Leaderboard Display */}
                <LeaderboardDisplay data={leaderboard} viewMode={viewMode} />
            </main>
        </div>
    )
}
