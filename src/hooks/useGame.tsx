import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import GameData, { SymbolData } from '../interfaces/GameData';

interface OrientationContextData {
    gameData: GameData;
}

const GameContext = createContext<OrientationContextData>({} as OrientationContextData);

export const GameProvider: React.FC = ({ children }) => {
    
    const [gameData, setGameData] = useState([
        [ SymbolData.X, SymbolData.X, SymbolData.X ],
        [ SymbolData.X, SymbolData.X, SymbolData.X ],
        [ SymbolData.X, SymbolData.X, SymbolData.None ]
    ]);

    return (
        <GameContext.Provider value={{ gameData }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);