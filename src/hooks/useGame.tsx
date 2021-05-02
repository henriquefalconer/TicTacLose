import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import * as TicTacToeBrain from '../utilities/TicTacToeBrain';

import { Player, PositionId, SymbolData } from '../interfaces/GameData';
import GameData, { EmptyGameData } from '../utilities/GameData';

const DIMENSIONS = 3;

interface OrientationContextData {
    gameData: GameData;
    currentPlayer: Player;
    whoWon: Player | null;
    humanWins: boolean;
    onPressXOComponent(positionId: PositionId): void;
    restart(): void;
    changeMode(): void;
}

const GameContext = createContext<OrientationContextData>({} as OrientationContextData);

export const GameProvider: React.FC = ({ children }) => {

    const [gameData, setGameData] = useState(new EmptyGameData(DIMENSIONS));

    const [humanWins, setHumanWins] = useState(false);

    const [currentPlayer, setCurrentPlayer] = useState(Player.Human);

    const [timerRunning, setTimerRunning] = useState(false);

    const setGameDataWithPosition = useCallback(
        (positionId: PositionId, newSymbolData: SymbolData) => {
            const [row, column] = positionId;

            let gameDataCopy = TicTacToeBrain.copyGameData(gameData);

            gameDataCopy.data[row][column] = newSymbolData;

            setGameData(gameDataCopy);
        },
        [gameData, setGameData]
    );

    const runNextStep = useCallback(
        (positionId: PositionId, newPlayer: Player) => {
            const newSymbolData = newPlayer === Player.Computer
                ? SymbolData.X
                : SymbolData.O;

            setGameDataWithPosition(positionId, newSymbolData);

            setCurrentPlayer(newPlayer);
        },
        [currentPlayer, setGameDataWithPosition, setCurrentPlayer]
    );

    const onPressXOComponent = useCallback(
        (positionId: PositionId) => {
            const [row, column] = positionId;

            const positionIsEmpty = gameData.data[row][column] === SymbolData.None;

            if (!whoWon && positionIsEmpty && currentPlayer === Player.Human)
                runNextStep(positionId, Player.Computer);
        },
        [gameData, currentPlayer, runNextStep]
    );

    const whoWon = useMemo(
        () => TicTacToeBrain.findWhoWon(gameData),
        [gameData]
    );

    const restart = useCallback(
        () => {
            setGameData(new EmptyGameData(DIMENSIONS));
            setCurrentPlayer(Player.Human);
        },
        [setGameData, setCurrentPlayer]
    );

    const changeMode = useCallback(
        () => {
            setHumanWins(!humanWins)
            restart();
        },
        [humanWins]
    );

    useEffect(
        () => {
            if (currentPlayer === Player.Computer && !timerRunning && !whoWon) {
                setTimerRunning(true);

                console.log({ gameData })

                const bestMove = TicTacToeBrain.findBestMove(gameData, humanWins);

                console.log({ bestMove });

                setTimeout(
                    () => {
                        runNextStep(
                            bestMove,
                            Player.Human
                        );
                        setTimerRunning(false);
                    },
                    (Math.random() + 1) * 1000
                );
            }
        },
        [gameData, currentPlayer, timerRunning, runNextStep, setTimerRunning]
    );

    return (
        <GameContext.Provider
            value={{
                gameData,
                currentPlayer,
                whoWon,
                humanWins,
                onPressXOComponent,
                restart,
                changeMode
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);