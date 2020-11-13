import { css } from "styled-components";
import GameData, { PositionId, SymbolData } from "../interfaces/GameData"

export const findNextSymbol = (gameData: GameData) => {

    let symbolX = 0;
    let symbolO = 0;

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {

            const symbolData = gameData[row][column];
            
            if (symbolData === SymbolData.X) symbolX++;

            if (symbolData === SymbolData.O) symbolO++;

        }
    }

    return symbolX - symbolO === 1 ? SymbolData.O : SymbolData.X;

};

export const findWhoWon = (gameData: GameData): SymbolData | null => {

    let symbolDataMainHorizontal: SymbolData | undefined = undefined;
    let symbolDataSecondaryHorizontal: SymbolData | undefined = undefined;

    for (let index1 = 0; index1 < 3; index1++) {
            
        if (symbolDataMainHorizontal === undefined || gameData[index1][index1] === symbolDataMainHorizontal)
            symbolDataMainHorizontal = gameData[index1][index1];

        else
            symbolDataMainHorizontal = null;
            
        
        if (symbolDataSecondaryHorizontal === undefined || gameData[index1][2 - index1] === symbolDataSecondaryHorizontal)
            symbolDataSecondaryHorizontal = gameData[index1][2 - index1];

        else
            symbolDataSecondaryHorizontal = null;

        
        let symbolDataHorizontal: SymbolData | undefined = undefined;
        let symbolDataVertical: SymbolData | undefined = undefined;

        for (let index2 = 0; index2 < 3; index2++) {
            
            if (symbolDataHorizontal === undefined || gameData[index1][index2] === symbolDataHorizontal)
                symbolDataHorizontal = gameData[index1][index2];

            else
                symbolDataHorizontal = null;
            
            
            if (symbolDataVertical === undefined || gameData[index2][index1] === symbolDataVertical)
                symbolDataVertical = gameData[index2][index1];

            else
                symbolDataVertical = null;

        }

        if (symbolDataHorizontal)
            return symbolDataHorizontal;

        if (symbolDataVertical)
            return symbolDataVertical;

    }

    if (symbolDataMainHorizontal)
        return symbolDataMainHorizontal;

    if (symbolDataSecondaryHorizontal)
        return symbolDataSecondaryHorizontal;

        
    return null;

};

export const findBestMove = (gameData: GameData) => {

    let maxPossibleWins = 0;
    let bestPosition: PositionId | undefined;

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {

            const symbolData = gameData[row][column];
            
            if (symbolData === SymbolData.None) {
                let newGameData = copyGameData(gameData);

                newGameData[row][column] = SymbolData.O;

                const [possibleWins, depth] = findPossibleWins(newGameData);

                console.log(newGameData);
                console.log({ possibleWins, row, column, depth });

                if (possibleWins > maxPossibleWins) {
                    maxPossibleWins = possibleWins;
                    bestPosition = [row, column];
                }
            }

        }
    }

    return bestPosition;

};

const findPossibleWins = (gameData: GameData, depth = 0): number[] => {

    // console.log(gameData);

    const whoWon = findWhoWon(gameData);

    // console.log(whoWon);

    if (whoWon === SymbolData.O)
        return [1, depth];

    let possibleWins = 0;

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {

            const symbolData = gameData[row][column];
            
            if (symbolData === SymbolData.None) {
                let newGameData = copyGameData(gameData);

                newGameData[row][column] = findNextSymbol(newGameData);

                const [newWins, newDepth] = findPossibleWins(newGameData, depth + 1);

                depth = newDepth;

                possibleWins += newWins;
            }

        }
    }

    return [possibleWins, depth];

};

export const copyGameData = (gameData: GameData): GameData => (
    [...gameData.map(row => [...row])]
);