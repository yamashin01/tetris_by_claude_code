import React from 'react';
import { GameState } from '@/types/tetris';

interface GameInfoProps {
  gameState: GameState;
  onRestart: () => void;
  onTogglePause: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameState, onRestart, onTogglePause }) => {
  return (
    <div className="text-white space-y-4">
      <div className="border border-white p-4 bg-black">
        <div className="space-y-2">
          <div>Score: {gameState.score}</div>
          <div>Level: {gameState.level}</div>
          <div>Lines: {gameState.lines}</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={onTogglePause}
          disabled={gameState.gameOver}
          className="w-full px-4 py-2 bg-blue-600 text-white border border-white hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {gameState.paused ? 'Resume' : 'Pause'}
        </button>
        
        <button
          onClick={onRestart}
          className="w-full px-4 py-2 bg-red-600 text-white border border-white hover:bg-red-700"
        >
          Restart
        </button>
      </div>
      
      {gameState.gameOver && (
        <div className="text-red-500 text-center font-bold">
          GAME OVER
        </div>
      )}
      
      {gameState.paused && !gameState.gameOver && (
        <div className="text-yellow-500 text-center font-bold">
          PAUSED
        </div>
      )}
      
      <div className="text-xs text-gray-400 mt-4">
        <div className="font-bold mb-2">Controls:</div>
        <div>← → Move left/right</div>
        <div>↓ Drop faster</div>
        <div>↑ Rotate piece</div>
        <div>Space: Pause/Resume</div>
        <div>R: Restart game</div>
      </div>
      
      <div className="text-xs text-green-400 mt-2">
        <div className="font-bold">Game Status:</div>
        <div>{gameState.gameOver ? 'Game Over!' : gameState.paused ? 'Paused' : 'Playing'}</div>
        <div className="mt-1 text-xs text-gray-500">
          Current Piece: {gameState.currentPiece ? gameState.currentPiece.type : 'None'}
        </div>
        <div className="text-xs text-gray-500">
          Position: {gameState.currentPiece ? `${gameState.currentPiece.position.x}, ${gameState.currentPiece.position.y}` : 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default GameInfo;