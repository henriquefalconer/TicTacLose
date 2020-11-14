import { css } from "styled-components";
import GameData, { Player, PositionId, SymbolData } from "../interfaces/GameData"

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

export const isBoardFull = (gameData: GameData) => {

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {

            if (gameData[row][column] === SymbolData.None)
                return false;

        }
    }

    return true;

}

export const convertSymbolDataToPlayer = (symbolData: SymbolData | null) => (
    symbolData === null
        ? null
        : symbolData === SymbolData.None
            ? Player.None
            : symbolData === SymbolData.O
                ? Player.Computer
                : Player.Human
);

export const findWhoWon = (gameData: GameData): Player | null => {
    const findWinnerSymbolData = () => {

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


        return isBoardFull(gameData) ? SymbolData.None : null;
    }

    const winnerSymbolData = findWinnerSymbolData()

    return convertSymbolDataToPlayer(winnerSymbolData);
};

export const findBestMove = (gameData: GameData) => {

    let bestScore = -1;
    let bestPosition: PositionId | undefined;

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {

            const symbolData = gameData[row][column];

            if (symbolData === SymbolData.None) {
                let newGameData = copyGameData(gameData);

                newGameData[row][column] = SymbolData.O;

                const score = minMax(newGameData);

                if (score > bestScore) {
                    bestScore = score;
                    bestPosition = [row, column];
                }
            }

        }
    }

    return bestPosition;

};

let scores = {};

scores[Player.Human] = -1;
scores[Player.Computer] = 1;
scores[Player.None] = 0;

const minMax = (gameData: GameData): number => {

    const whoWon = findWhoWon(gameData);

    if (whoWon)
        return scores[whoWon];

    const nextSymbol = findNextSymbol(gameData);

    if (nextSymbol === SymbolData.O) {
        let bestScore = -Infinity;
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
    
                const symbolData = gameData[row][column];
    
                if (symbolData === SymbolData.None) {
                    let newGameData = copyGameData(gameData);
    
                    newGameData[row][column] = SymbolData.O;
    
                    const score = minMax(newGameData);
    
                    bestScore = Math.max(score, bestScore);
                }
    
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
    
                const symbolData = gameData[row][column];
    
                if (symbolData === SymbolData.None) {
                    let newGameData = copyGameData(gameData);
    
                    newGameData[row][column] = SymbolData.X;
    
                    const score = minMax(newGameData);
    
                    bestScore = Math.min(score, bestScore);
                }
    
            }
        }
        return bestScore;
    }

};

export const copyGameData = (gameData: GameData): GameData => (
    [...gameData.map(row => [...row])]
);