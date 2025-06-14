import React from 'react';
import { GameState, Tetromino } from '@/types/tetris';

interface GameBoardProps {
  gameState: GameState;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  const { board, currentPiece } = gameState;

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);

    // Draw current piece on the board
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardX = currentPiece.position.x + x;
            const boardY = currentPiece.position.y + y;
            if (boardX >= 0 && boardX < displayBoard[0].length && boardY >= 0 && boardY < displayBoard.length) {
              displayBoard[boardY][boardX] = 2; // 2 for current piece
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => {
          let cellStyle: React.CSSProperties = {
            width: '24px',
            height: '24px',
            border: '1px solid #4a5568',
            boxSizing: 'border-box'
          };
          
          if (cell === 0) {
            // Empty cell
            cellStyle.backgroundColor = '#1a202c';
          } else if (cell === 1) {
            // Placed piece
            cellStyle.backgroundColor = '#ffffff';
            cellStyle.border = '1px solid #a0aec0';
          } else if (cell === 2 && currentPiece) {
            // Current piece
            cellStyle.backgroundColor = currentPiece.color;
            cellStyle.border = '1px solid #63b3ed';
          }
          
          return (
            <div
              key={`${y}-${x}`}
              style={cellStyle}
            />
          );
        })}
      </div>
    ));
  };

  return (
    <div className="border-2 border-white p-2 bg-black">
      {renderBoard()}
    </div>
  );
};

export default GameBoard;