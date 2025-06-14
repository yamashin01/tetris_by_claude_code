import { useState, useCallback, useEffect, useRef } from 'react';
import {
  GameState,
  Tetromino,
  TetrominoType,
  Position,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINO_SHAPES,
  TETROMINO_COLORS
} from '@/types/tetris';

const createEmptyBoard = (): number[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
};

const getRandomTetromino = (): Tetromino => {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const type = types[Math.floor(Math.random() * types.length)];
  return {
    type,
    shape: TETROMINO_SHAPES[type],
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    color: TETROMINO_COLORS[type]
  };
};

const rotatePiece = (piece: Tetromino): Tetromino => {
  const rotated = piece.shape[0].map((_, i) =>
    piece.shape.map(row => row[i]).reverse()
  );
  return { ...piece, shape: rotated };
};

const isValidMove = (board: number[][], piece: Tetromino, newPos: Position): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = newPos.x + x;
        const newY = newPos.y + y;
        
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

const placePiece = (board: number[][], piece: Tetromino): number[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = piece.position.x + x;
        const boardY = piece.position.y + y;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = 1;
        }
      }
    }
  }
  
  return newBoard;
};

const clearLines = (board: number[][]): { newBoard: number[][]; linesCleared: number } => {
  const newBoard = board.filter(row => row.some(cell => cell === 0));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }
  
  return { newBoard, linesCleared };
};

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createEmptyBoard(),
    currentPiece: getRandomTetromino(),
    nextPiece: getRandomTetromino(),
    score: 0,
    level: 1,
    lines: 0,
    gameOver: false,
    paused: false
  }));

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const movePiece = useCallback((dx: number, dy: number) => {
    setGameState(prevState => {
      if (prevState.gameOver || prevState.paused || !prevState.currentPiece) {
        return prevState;
      }

      const newPosition = {
        x: prevState.currentPiece.position.x + dx,
        y: prevState.currentPiece.position.y + dy
      };

      if (isValidMove(prevState.board, prevState.currentPiece, newPosition)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition
          }
        };
      } else if (dy > 0) {
        // Can't move down, place the piece
        const newBoard = placePiece(prevState.board, prevState.currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        
        const newScore = prevState.score + (linesCleared * 100 * prevState.level);
        const newLines = prevState.lines + linesCleared;
        const newLevel = Math.floor(newLines / 10) + 1;
        
        // Check game over
        const newPiece = prevState.nextPiece!;
        const gameOver = !isValidMove(clearedBoard, newPiece, newPiece.position);
        
        return {
          ...prevState,
          board: clearedBoard,
          currentPiece: gameOver ? null : newPiece,
          nextPiece: gameOver ? null : getRandomTetromino(),
          score: newScore,
          level: newLevel,
          lines: newLines,
          gameOver
        };
      }
      
      return prevState;
    });
  }, []);

  const rotatePieceHandler = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver || prevState.paused || !prevState.currentPiece) {
        return prevState;
      }

      const rotated = rotatePiece(prevState.currentPiece);
      if (isValidMove(prevState.board, rotated, rotated.position)) {
        return {
          ...prevState,
          currentPiece: rotated
        };
      }
      
      return prevState;
    });
  }, []);

  const dropPiece = useCallback(() => {
    movePiece(0, 1);
  }, [movePiece]);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: getRandomTetromino(),
      nextPiece: getRandomTetromino(),
      score: 0,
      level: 1,
      lines: 0,
      gameOver: false,
      paused: false
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      paused: !prev.paused
    }));
  }, []);

  // Game loop
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!gameState.gameOver && !gameState.paused && gameState.currentPiece) {
      const dropTime = Math.max(500, 1000 - (gameState.level - 1) * 100);
      
      intervalRef.current = setInterval(() => {
        dropPiece();
      }, dropTime);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameState.gameOver, gameState.paused, gameState.level, gameState.currentPiece, dropPiece]);

  return {
    gameState,
    movePiece,
    rotatePiece: rotatePieceHandler,
    dropPiece,
    resetGame,
    togglePause
  };
};