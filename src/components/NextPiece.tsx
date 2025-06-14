import React from 'react';
import { Tetromino } from '@/types/tetris';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

const NextPiece: React.FC<NextPieceProps> = ({ nextPiece }) => {
  if (!nextPiece) return null;

  const renderNextPiece = () => {
    return nextPiece.shape.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`w-4 h-4 border border-gray-600 ${
              cell ? 'bg-blue-500' : 'bg-gray-900'
            }`}
            style={{
              backgroundColor: cell ? nextPiece.color : undefined
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="border border-white p-2 bg-black">
      <div className="text-white text-sm mb-2">Next:</div>
      {renderNextPiece()}
    </div>
  );
};

export default NextPiece;