import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import GameData, { PositionId, SymbolData } from '../interfaces/GameData';

interface OrientationContextData {
    gameData: GameData;
    onPressXOComponent(positionId: PositionId): void;
}

const GameContext = createContext<OrientationContextData>({} as OrientationContextData);

export const GameProvider: React.FC = ({ children }) => {
    
    const [gameData, setGameData] = useState([
        [ SymbolData.X, SymbolData.X, SymbolData.X ],
        [ SymbolData.X, SymbolData.X, SymbolData.X ],
        [ SymbolData.X, SymbolData.O, SymbolData.None ]
    ]);

    const setGameDataWithPosition = useCallback(
        (positionId: PositionId, newSymbolData: SymbolData) => {
            
            const [row, column] = positionId;
            
            let gameDataCopy = [...gameData.map(row => [...row])];

            gameDataCopy[row][column] = newSymbolData;

            setGameData(gameDataCopy);

        },
        [gameData, setGameData]
    );

    const onPressXOComponent = useCallback(
        (positionId: PositionId) => {

            const [row, column] = positionId;

            const positionIsEmpty = gameData[row][column] === SymbolData.None;

            if (positionIsEmpty) {
                setGameDataWithPosition(positionId, SymbolData.X);
            }

        },
        [gameData, setGameDataWithPosition]
    );

    return (
        <GameContext.Provider value={{ gameData, onPressXOComponent }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);