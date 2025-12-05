"use client"

import React from 'react'

interface LeaderboardItem {
    id: string
    name: string
    score: number
}

interface LeaderboardDisplayProps {
    data: LeaderboardItem[]
    viewMode: 'teams' | 'users'
}

export function LeaderboardDisplay({ data, viewMode }: LeaderboardDisplayProps) {
    const getMedalIcon = (rank: number) => {
        switch (rank) {
            case 1: return '🥇'
            case 2: return '🥈'
            case 3: return '🥉'
            default: return null
        }
    }

    const getRankClass = (rank: number) => {
        switch (rank) {
            case 1: return 'rank-gold'
            case 2: return 'rank-silver'
            case 3: return 'rank-bronze'
            default: return ''
        }
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-16 px-8">
                <div className="text-6xl mb-4 opacity-50">📊</div>
                <h2 className="text-2xl font-semibold text-white mb-2">No Data Available</h2>
                <p className="text-slate-400">Add some {viewMode === 'teams' ? 'teams' : 'users'} to see the leaderboard!</p>
            </div>
        )
    }

    return (
        <div className="my-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {viewMode === 'teams' ? 'Team Rankings' : 'User Rankings'}
                </h2>
                <p className="text-slate-400 font-medium">
                    {data.length} {viewMode === 'teams' ? 'teams' : 'members'} competing
                </p>
            </div>

            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                {data.map((item, index) => {
                    const rank = index + 1
                    const medal = getMedalIcon(rank)
                    const rankClass = getRankClass(rank)

                    return (
                        <div
                            key={item.id}
                            className={`
                group relative flex items-center gap-6 p-6 rounded-2xl
                bg-gradient-to-br from-slate-900/50 to-slate-800/30
                border border-cyan-500/30 backdrop-blur-sm
                hover:from-cyan-500/10 hover:to-blue-500/10
                hover:border-cyan-400/60 hover:-translate-y-1
                transition-all duration-300
                ${rankClass}
                animate-fade-in-up
              `}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Accent bar on hover */}
                            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />

                            {/* Rank */}
                            <div className={`
                flex-shrink-0 w-16 h-16 flex items-center justify-center
                text-3xl font-extrabold rounded-xl
                ${rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/40 animate-bounce-slow' : ''}
                ${rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg shadow-gray-400/40' : ''}
                ${rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-700 shadow-lg shadow-orange-500/40' : ''}
                ${rank > 3 ? 'bg-white/5' : ''}
              `}>
                                {medal || (
                                    <span className="text-xl text-slate-400">#{rank}</span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                {viewMode === 'users' && (
                                    <p className="text-sm text-slate-500">Team Member</p>
                                )}
                            </div>

                            {/* Score */}
                            <div className="flex-shrink-0 text-right px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                                <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-none">
                                    {item.score.toLocaleString()}
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">
                                    points
                                </div>
                            </div>

                            {/* Star badge for top 3 */}
                            {rank <= 3 && (
                                <div className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50 animate-bounce-slow">
                                    <span className="text-xl">⭐</span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
