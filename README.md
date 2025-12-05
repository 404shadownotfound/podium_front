# 🎮 TechQuest - Podium Frontend

A modern, gamified learning platform built with **Next.js 16** that teaches free tech alternatives to expensive Windows software. Features real-time leaderboards, 3D animations, and a stunning dark-themed UI.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🏆 Real-time Leaderboard** - Live rankings with WebSocket updates via Socket.IO
- **👥 Team & User Views** - Switch between team rankings and individual user scores
- **🎨 Modern UI** - Dark theme with cyan/blue gradients, glassmorphism effects
- **🌀 3D Animations** - Three.js powered chain animations and cube networks
- **📱 Responsive Design** - Mobile-first approach with smooth transitions
- **⚡ Real-time Updates** - WebSocket connection with live status indicator

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Components** | Radix UI, shadcn/ui |
| **3D Graphics** | Three.js |
| **Real-time** | Socket.IO Client |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |

## 📁 Project Structure

```
podium_front/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page (TechQuest homepage)
│   ├── layout.tsx         # Root layout with providers
│   ├── globals.css        # Global styles
│   ├── leaderboard/       # Leaderboard feature
│   │   └── page.tsx       # Real-time leaderboard page
│   └── src/               # Additional source files
│       ├── components/    # Leaderboard-specific components
│       └── services/      # API services
├── components/
│   ├── ui/                # shadcn/ui components (57 components)
│   ├── 3d/                # Three.js animations
│   │   ├── chain-animation.tsx
│   │   └── cube-network.tsx
│   ├── leaderboard-display.tsx
│   ├── team-selector.tsx
│   └── theme-provider.tsx
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Additional stylesheets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd podium_front
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🌐 API Configuration

The leaderboard connects to a Flask backend API. Configure the endpoints in `app/leaderboard/page.tsx`:

```typescript
const SOCKET_URL = 'http://localhost:8003'  // WebSocket server
const API_URL = 'http://localhost:8003/api' // REST API
```

> **Note:** Make sure the Flask backend is running on port 8003 for the leaderboard to work correctly.

## 📖 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero section, features, and 3D animations |
| `/leaderboard` | Real-time leaderboard with team/user toggle |

## 🎨 Design System

The project uses a custom dark theme with:
- **Primary Colors:** Cyan (`#22d3ee`) to Blue (`#3b82f6`) gradients
- **Background:** Slate gradients (`slate-950` → `slate-900`)
- **Effects:** Glassmorphism, blur effects, subtle animations
- **Typography:** System fonts with Lucide React icons

## 🔌 Backend Integration

This frontend is designed to work with a Flask backend that provides:

- **REST API Endpoints:**
  - `GET /api/teams` - Fetch all teams
  - `GET /api/users` - Fetch all users

- **WebSocket Events:**
  - `request_leaderboard` - Request leaderboard data
  - `leaderboard_update` - Receive real-time updates

## 📦 Key Dependencies

```json
{
  "next": "16.0.7",
  "react": "19.2.0",
  "socket.io-client": "^4.8.1",
  "three": "latest",
  "tailwindcss": "^4.1.9",
  "@radix-ui/*": "Various shadcn/ui components"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

<p align="center">
  Made with ❤️ for <strong>Nuit de l'Info 2025</strong>
</p>
