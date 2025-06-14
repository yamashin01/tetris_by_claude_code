import React, { useEffect, useCallback } from 'react';
import { useTetris } from '@/hooks/useTetris';
import GameBoard from './GameBoard';
import NextPiece from './NextPiece';
import GameInfo from './GameInfo';

const TetrisGame: React.FC = () => {
  const { gameState, movePiece, rotatePiece, resetGame, togglePause } = useTetris();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameOver) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        event.preventDefault();
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        event.preventDefault();
        movePiece(0, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        rotatePiece();
        break;
      case ' ':
        event.preventDefault();
        togglePause();
        break;
      case 'r':
      case 'R':
        event.preventDefault();
        resetGame();
        break;
    }
  }, [gameState.gameOver, movePiece, rotatePiece, togglePause, resetGame]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-white text-3xl font-bold mb-4">Tetris</h1>
          <GameBoard gameState={gameState} />
        </div>
        
        <div className="flex flex-col gap-4">
          <NextPiece nextPiece={gameState.nextPiece} />
          <GameInfo
            gameState={gameState}
            onRestart={resetGame}
            onTogglePause={togglePause}
          />
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;