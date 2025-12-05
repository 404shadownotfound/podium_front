import React from 'react';
import './Leaderboard.css';

function Leaderboard({ data, viewMode }) {
    const getMedalIcon = (rank) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return null;
        }
    };

    const getRankClass = (rank) => {
        switch (rank) {
            case 1: return 'rank-gold';
            case 2: return 'rank-silver';
            case 3: return 'rank-bronze';
            default: return '';
        }
    };

    if (!data || data.length === 0) {
        return (
            <div className="leaderboard-empty">
                <div className="empty-icon">📊</div>
                <h2>No Data Available</h2>
                <p>Add some {viewMode === 'teams' ? 'teams' : 'users'} to see the leaderboard!</p>
            </div>
        );
    }

    return (
        <div className="leaderboard">
            <div className="leaderboard-header">
                <h2 className="leaderboard-title">
                    {viewMode === 'teams' ? 'Team Rankings' : 'User Rankings'}
                </h2>
                <p className="leaderboard-subtitle">
                    {data.length} {viewMode === 'teams' ? 'teams' : 'members'} competing
                </p>
            </div>

            <div className="leaderboard-list">
                {data.map((item, index) => {
                    const rank = index + 1;
                    const medal = getMedalIcon(rank);
                    const rankClass = getRankClass(rank);

                    return (
                        <div
                            key={item.id}
                            className={`leaderboard-item glass shine ${rankClass} fade-in-up`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="item-rank">
                                {medal || (
                                    <span className="rank-number">#{rank}</span>
                                )}
                            </div>

                            <div className="item-info">
                                <h3 className="item-name">{item.name}</h3>
                                {viewMode === 'users' && (
                                    <p className="item-meta">Team Member</p>
                                )}
                            </div>

                            <div className="item-score">
                                <div className="score-value">{item.score.toLocaleString()}</div>
                                <div className="score-label">points</div>
                            </div>

                            {rank <= 3 && (
                                <div className="item-badge">
                                    <span className="badge-icon">⭐</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Leaderboard;
