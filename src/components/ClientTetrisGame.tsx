'use client';

import React, { useEffect, useState } from 'react';
import TetrisGame from './TetrisGame';

const ClientTetrisGame: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return <TetrisGame />;
};

export default ClientTetrisGame;