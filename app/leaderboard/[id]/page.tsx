"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { io, Socket } from 'socket.io-client'
import { Button } from '@/components/ui/button'
import { LeaderboardDisplay } from '@/components/leaderboard-display'
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

export default function TeamLeaderboardPage() {
    const params = useParams()
    const teamIndex = params.id as string // Can be "all" or a number like "1", "2", etc.

    const [socket, setSocket] = useState<Socket | null>(null)
    const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([])
    const [teams, setTeams] = useState<Team[]>([])
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
    const [isAllTeams, setIsAllTeams] = useState(false)
    const [loading, setLoading] = useState(true)

    // Fetch teams on mount
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${API_URL}/teams`)
                const data = await response.json()
                setTeams(data)

                if (teamIndex === 'all') {
                    setIsAllTeams(true)
                    setLoading(false)
                } else {
                    const index = parseInt(teamIndex, 10) - 1 // Convert to 0-based index
                    if (data.length > index && index >= 0) {
                        setCurrentTeam(data[index])
                    }
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching teams:', error)
                setLoading(false)
            }
        }
        fetchTeams()
    }, [teamIndex])

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

    // Request leaderboard data when team is determined
    useEffect(() => {
        if (!socket) return

        if (isAllTeams) {
            // Request teams leaderboard
            socket.emit('request_leaderboard', {})
        } else if (currentTeam) {
            // Request users for specific team
            socket.emit('request_leaderboard', { team_id: currentTeam.id })
        }
    }, [socket, isAllTeams, currentTeam])

    const formatTime = (date: Date | null) => {
        if (!date) return ''
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-cyan-400 text-xl animate-pulse">Loading...</div>
            </div>
        )
    }

    if (!isAllTeams && !currentTeam) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-2xl font-bold text-white mb-2">Team Not Found</h1>
                    <p className="text-slate-400 mb-6">Team #{teamIndex} doesn't exist</p>
                    <Link href="/leaderboard">
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                            Back to Leaderboard
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

            {/* Leaderboard Display */}
            <LeaderboardDisplay
                data={leaderboard}
                viewMode={isAllTeams ? 'teams' : 'users'}
            />
        </div>
    )
}
