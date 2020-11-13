import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import GameData, { Player, PositionId, SymbolData } from '../interfaces/GameData';

interface OrientationContextData {
    gameData: GameData;
    currentPlayer: Player;
    onPressXOComponent(positionId: PositionId): void;
}

const GameContext = createContext<OrientationContextData>({} as OrientationContextData);

export const GameProvider: React.FC = ({ children }) => {

    const [gameData, setGameData] = useState([
        [SymbolData.None, SymbolData.None, SymbolData.None],
        [SymbolData.None, SymbolData.None, SymbolData.None],
        [SymbolData.None, SymbolData.None, SymbolData.None]
    ]);

    const [currentPlayer, setCurrentPlayer] = useState(Player.Human);

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
        (positionId: PositionId) => {
            const newSymbolData = currentPlayer === Player.Human
                ? SymbolData.X
                : SymbolData.O;

            setGameDataWithPosition(positionId, newSymbolData);

            setCurrentPlayer(
                currentPlayer === Player.Human
                    ? Player.Computer
                    : Player.Human
            );
        },
        [currentPlayer, setGameDataWithPosition, setCurrentPlayer]
    );

    const onPressXOComponent = useCallback(
        (positionId: PositionId) => {
            const [row, column] = positionId;

            const positionIsEmpty = gameData[row][column] === SymbolData.None;

            if (positionIsEmpty && currentPlayer === Player.Human) 
                runNextStep(positionId);
        },
        [gameData, currentPlayer, runNextStep]
    );

    useEffect(
        () => {
            if (currentPlayer === Player.Computer) {
                setTimeout(
                    () => runNextStep([0, 0]), 
                    2000
                );
            }
        },
        [currentPlayer, runNextStep]
    );

    return (
        <GameContext.Provider value={{ gameData, currentPlayer, onPressXOComponent }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);