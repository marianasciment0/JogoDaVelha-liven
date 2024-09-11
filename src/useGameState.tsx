/**
 * Obs: O controle de estado principal da aplicação deve ser mantido neste hook
 */

import { useState } from "react";
import { calculateWinner } from "./utils";

type Player = "❌" | "⭕";

const useGameState = () => {
  const [currentBoard, setCurrentBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [stepNumber, setStepNumber] = useState(0);
  const [nextPlayer, setNextPlayer] = useState<Player>("❌");
  const [initialPlayer, setInitialPlayer] = useState<Player>("❌");

  const computeMove = (squareId: number) => {
    setCurrentBoard((board) => {
      const newBoard = board.slice();
      if (calculateWinner(newBoard) || newBoard[squareId]) {
        return newBoard; // Não faz nada se já houver um vencedor ou a célula estiver preenchida
      }
      newBoard[squareId] = nextPlayer;
      setStepNumber((prevStepNumber) => prevStepNumber + 1);
      setNextPlayer((prevPlayer) => (prevPlayer === "❌" ? "⭕" : "❌"));
      return newBoard;
    });
  };

  const restartGame = () => {
    setCurrentBoard(Array(9).fill(null));
    setStepNumber(0);
  
    // Alterna o jogador inicial para a próxima rodada
    const newInitialPlayer = initialPlayer === "❌" ? "⭕" : "❌";
    setNextPlayer(newInitialPlayer);
    setInitialPlayer(newInitialPlayer);
  };

  return {
    currentBoard,
    stepNumber,
    nextPlayer,
    computeMove,
    restartGame,
  };
};

export default useGameState;