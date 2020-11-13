import GameData from "../interfaces/GameData"

export const findBestMove = (gameData: GameData) => {

};

export const copyGameData = (gameData: GameData): GameData => (
    [...gameData.map(row => [...row])]
);