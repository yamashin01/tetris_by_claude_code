# CLAUDE.md

必ず日本語で回答して下さい。

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Tetris game built with Next.js and TypeScript, featuring:
- Complete game mechanics (piece movement, rotation, line clearing)
- Real-time gameplay with automatic piece dropping
- Score and level progression system
- Keyboard controls and pause functionality

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Core Components
- `src/hooks/useTetris.ts` - Main game logic and state management
- `src/types/tetris.ts` - Type definitions and game constants
- `src/components/TetrisGame.tsx` - Main game component with keyboard handling
- `src/components/GameBoard.tsx` - Game board rendering
- `src/components/NextPiece.tsx` - Next piece preview
- `src/components/GameInfo.tsx` - Score, controls, and game status

### Game Mechanics
- 10x20 game board with 7 standard Tetris pieces (I, O, T, S, Z, J, L)
- Automatic piece dropping with speed increase per level
- Line clearing with score calculation
- Collision detection and game over conditions

### Controls
- Arrow keys: Move left/right, rotate (up), drop faster (down)
- Spacebar: Pause/Resume
- R key: Restart game