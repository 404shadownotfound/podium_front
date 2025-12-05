"use client"

import React from 'react'

interface Team {
    id: string
    name: string
    score: number
}

interface TeamSelectorProps {
    teams: Team[]
    selectedTeam: string | null
    onTeamSelect: (teamId: string) => void
}

export function TeamSelector({ teams, selectedTeam, onTeamSelect }: TeamSelectorProps) {
    if (!teams || teams.length === 0) {
        return null
    }

    return (
        <div className="my-8 max-w-md mx-auto animate-fade-in-up">
            <label htmlFor="team-select" className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                Select Team
            </label>
            <div className="relative">
                <select
                    id="team-select"
                    className="w-full px-6 py-4 pr-12 text-base font-semibold text-white
            bg-gradient-to-br from-slate-900/50 to-slate-800/30
            border border-cyan-500/30 rounded-xl
            cursor-pointer appearance-none
            hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20
            focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30
            transition-all duration-300 backdrop-blur-sm"
                    value={selectedTeam || ''}
                    onChange={(e) => onTeamSelect(e.target.value)}
                >
                    {teams.map((team) => (
                        <option
                            key={team.id}
                            value={team.id}
                            className="bg-slate-900 text-white py-2"
                        >
                            {team.name} - {team.score} pts
                        </option>
                    ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400 text-sm">
                    ▼
                </div>
            </div>
        </div>
    )
}
