import React from 'react';
import './TeamSelector.css';

function TeamSelector({ teams, selectedTeam, onTeamSelect }) {
    if (!teams || teams.length === 0) {
        return null;
    }

    return (
        <div className="team-selector-container fade-in-up">
            <label htmlFor="team-select" className="team-selector-label">
                Select Team
            </label>
            <div className="team-selector-wrapper">
                <select
                    id="team-select"
                    className="team-selector glass"
                    value={selectedTeam || ''}
                    onChange={(e) => onTeamSelect(e.target.value)}
                >
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name} - {team.score} pts
                        </option>
                    ))}
                </select>
                <div className="select-arrow">▼</div>
            </div>
        </div>
    );
}

export default TeamSelector;
