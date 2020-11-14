import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import * as TicTacToeBrain from '../utilities/TicTacToeBrain';

import GameData, { Player, PositionId, SymbolData } from '../interfaces/GameData';

interface OrientationContextData {
    gameData: GameData;
    currentPlayer: Player;
    whoWon: Player | null;
    onPressXOComponent(positionId: PositionId): void;
    restart(): void;
}

const GameContext = createContext<OrientationContextData>({} as OrientationContextData);

export const GameProvider: React.FC = ({ children }) => {

    const [gameData, setGameData] = useState([
        [SymbolData.O, SymbolData.None, SymbolData.None],
        [SymbolData.X, SymbolData.O, SymbolData.O],
        [SymbolData.O, SymbolData.X, SymbolData.X]
    ]);

    const [currentPlayer, setCurrentPlayer] = useState(Player.Human);

    const [timerRunning, setTimerRunning] = useState(false);

    const setGameDataWithPosition = useCallback(
        (positionId: PositionId, newSymbolData: SymbolData) => {
            const [row, column] = positionId;

            let gameDataCopy = [...gameData.map(row => [...row])];

            gameDataCopy[row][column] = newSymbolData;

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

            const positionIsEmpty = gameData[row][column] === SymbolData.None;

            if (positionIsEmpty && currentPlayer === Player.Human)
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
            setGameData([
                [SymbolData.None, SymbolData.None, SymbolData.None],
                [SymbolData.None, SymbolData.None, SymbolData.None],
                [SymbolData.None, SymbolData.None, SymbolData.None]
            ]);
            setCurrentPlayer(Player.Human);
        },
        [setGameData, setCurrentPlayer]
    );

    useEffect(
        () => {
            if (currentPlayer === Player.Computer && !timerRunning && !whoWon) {
                setTimerRunning(true);

                console.log({ gameData })

                const bestMove = TicTacToeBrain.findBestMove(gameData);

                console.log({ bestMove });

                setTimeout(
                    () => {
                        runNextStep(
                            bestMove,
                            Player.Human
                        );
                        setTimerRunning(false);
                    },
                    2000
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
                onPressXOComponent,
                restart
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);