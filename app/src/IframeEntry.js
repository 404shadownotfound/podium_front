import React from 'react';
import ReactDOM from 'react-dom';
import LeaderboardPage from '../leaderboard/page';
// Get the team ID from the URL query
const urlParams = new URLSearchParams(window.location.search);
const teamId = urlParams.get('id') || 'all';

ReactDOM.render(
  <React.StrictMode>
    <LeaderboardPage  />
  </React.StrictMode>,
  document.getElementById('root')
);
