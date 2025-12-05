# 🏆 Animated Leaderboard – Frontend

This project is a single-page **HTML/CSS leaderboard interface** showing a podium for the top 3 teams and a ranked list for the remaining teams.  
It uses only **pure HTML & CSS**, no JavaScript or external frameworks.

---

## 📌 Features

✅ Full-screen responsive layout  
✅ Animated podium with scale & bounce effects  
✅ Gold / Silver / Bronze medal styling  
✅ Starry animated background  
✅ Smooth entrance animations (fade, bounce, slide)  
✅ Hover effects on ranking list items  
✅ Mobile-friendly design

---
> ⚠️ Make sure the image filenames match exactly:
- `midal dhahbi.png`
- `fedhyy.png`
- `bbronz.png`

---


2. Podium Section

Shows the top 3 teams with medals:

Gold – Team 1 (1000 points)

Silver – Team 2 (850 points)

Bronze – Team 3 (700 points)

Each podium card includes:

Avatar (image or initials)

Team Name

Score

Animation and scaling based on rank

Ranked List

Displays positions 4 to 7, each with:

Rank number

Avatar placeholder

Team name

Points

Ranking change indicator:

| Symbol | Meaning          |
| ------ | ---------------- |
| `↑`    | Gained positions |
| `↓`    | Lost positions   |
| `0`    | No change        |


# Animations & Visual Effects

The page includes several CSS animations:

| Animation    | Effect                   |
| ------------ | ------------------------ |
| `fadeInDown` | Title entrance           |
| `bounceIn`   | Podium pop-in            |
| `slideUp`    | Ranking list reveal      |
| `twinkle`    | Animated star background |
| `glow`       | Gold medal glow          |

All animations are handled via pure CSS using @keyframes.

# Responsive Design

The layout adapts for mobile devices:

Smaller podium avatars

Reduced scaling effects

Adjusted spacing

Responsive typography

# Technologies Used

HTML5

CSS3

Flexbox

CSS animations

Gradients

Media queries

No JavaScript or libraries required.

Customization

You can easily modify:

Team names

Scores

Rankings

Animations timings

Colors or gradients