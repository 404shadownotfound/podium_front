import React from 'react';
import './Header.css';

function Header({ viewMode, onViewToggle, isConnected, lastUpdate }) {
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <header className="header glass">
            <div className="container header-content">
                <div className="header-left">
                    <h1 className="header-title">
                        <span className="gradient-text">Podium</span>
                    </h1>
                    <p className="header-subtitle">Live Leaderboard</p>
                </div>

                <div className="header-center">
                    <div className="view-toggle">
                        <button
                            className={`toggle-btn ${viewMode === 'teams' ? 'active' : ''}`}
                            onClick={() => onViewToggle('teams')}
                        >
                            <span className="toggle-icon">🏆</span>
                            Teams
                        </button>
                        <button
                            className={`toggle-btn ${viewMode === 'users' ? 'active' : ''}`}
                            onClick={() => onViewToggle('users')}
                        >
                            <span className="toggle-icon">👥</span>
                            Users
                        </button>
                    </div>
                </div>

                <div className="header-right">
                    <div className="connection-status">
                        <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                            <span className="status-dot"></span>
                            <span className="status-text">
                                {isConnected ? 'Live' : 'Offline'}
                            </span>
                        </div>
                        {isConnected && (
                            <p className="last-update">
                                Updated: {formatTime(lastUpdate)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
