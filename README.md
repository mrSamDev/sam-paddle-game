# Paddle Game

A classic paddle and ball game built with React and HTML5 Canvas. This project demonstrates canvas animation, game physics, particle effects, and power-up mechanics.

![Paddle Game Screenshot](https://res.cloudinary.com/dnmuyrcd7/image/upload/f_auto,q_auto/jtawtddhkpi0rqllo10k)

## 🎮 Game Features

- Smooth paddle movement with keyboard controls
- Particle effects for collisions
- Power-up system with various effects
- Adjustable ball and paddle speeds
- Score tracking
- Pause/Resume functionality

### Power-ups

The game includes several power-ups that randomly spawn:

- 🟦 Wider: Increases paddle width by 50% (Maximum 150px)
- 🟨 Smaller: Decreases paddle width by 25% (Minimum 40px)
- 🟩 Faster: Increases ball speed by 20%
- 🟥 Slower: Decreases ball speed by 20%

All power-up effects last for 5 seconds.

## 🛠️ Technical Implementation

The game is built using:

- React for UI components
- HTML5 Canvas for game rendering
- TypeScript for type safety
- Tailwind CSS for styling

Key technical features:

- Efficient animation using requestAnimationFrame
- Collision detection system
- Particle system for visual effects
- Power-up spawn and collection mechanics
- Responsive design with mobile detection

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mrSamDev/sam-paddle-game.git
cd sam-paddle-game
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Game Controls

- **Left Arrow**: Move paddle left
- **Right Arrow**: Move paddle right
- **Space**: Pause/Resume game
- **Space** (during Game Over): Restart game

## 🔧 Configuration

The game includes configurable settings in `data/config.ts`:

```typescript
export const GAME_SETTINGS = {
  BASE_PADDLE_SPEED: 5,
  INITIAL_BALL_SPEED: 5,
  INITIAL_PADDLE_WIDTH: 80,
  INITIAL_BALL_SIZE: 10,
  POWER_UP_DURATION: 5000,
  POWER_UP_SPAWN_CHANCE: 0.2,
  MOBILE_BREAKPOINT: 768,
  CANVAS: {
    WIDTH: 700,
    HEIGHT: 300,
  },
  PADDLE_SIZE_LIMITS: {
    MIN: 40,
    MAX: 150,
  },
  SPEED_MULTIPLIERS: {
    POWER_UP_FASTER: 1.2,
    POWER_UP_SLOWER: 0.8,
    PADDLE_WIDER: 1.5,
    PADDLE_SMALLER: 0.75,
  },
  SCORE_INCREMENT: 10,
};
```

## ✨ Game Mechanics

1. **Ball Movement**

   - The ball bounces off walls and the ceiling
   - Ball speed increases gradually as the game progresses
   - Direction changes based on collision angles

2. **Scoring System**

   - Points are awarded for each paddle hit
   - Score multipliers can be affected by power-ups
   - High scores are tracked locally

3. **Power-up System**

   - Power-ups spawn randomly after paddle hits
   - 20% chance of power-up spawn on each paddle hit
   - Multiple power-ups can be active simultaneously
   - Effects stack but are limited by min/max values

4. **Particle Effects**
   - Generated on ball collisions
   - Unique colors for different event types
   - Fade out over time
   - Performance-optimized rendering

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Live Demo](https://your-demo-link.com)
- [Blog Post](https://www.sijosam.in/blog/paddle-game/)
- [GitHub Repository](https://github.com/mrSamDev/sam-paddle-game)
