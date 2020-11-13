import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import GameData, { Player, PositionId, SymbolData } from '../interfaces/GameData';

import * as TicTacToeBrain from '../utilities/TicTacToeBrain';

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

            setGameData(oldGameData => {
                let gameDataCopy = TicTacToeBrain.copyGameData(oldGameData);
    
                gameDataCopy[row][column] = newSymbolData;

                return gameDataCopy;
            });
        },
        [setGameData]
    );

    const runNextStep = useCallback(
        (positionId: PositionId, newPlayer: Player) => {
            const newSymbolData = newPlayer === Player.Computer
                ? SymbolData.X
                : SymbolData.O;

            setGameDataWithPosition(positionId, newSymbolData);

            setCurrentPlayer(newPlayer);

            if (newPlayer === Player.Computer)
                createComputerTimedResponse()

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

    const createComputerTimedResponse = useCallback(
        () => setTimeout(
            () => runNextStep([0, 0], Player.Human),
            2000
        ),
        [runNextStep]
    );

    return (
        <GameContext.Provider value={{ gameData, currentPlayer, onPressXOComponent }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);