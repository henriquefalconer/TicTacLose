export enum SymbolData {
    X = 'X',
    O = 'O',
    None = ''
}

export type PositionId = [row: number, column: number];

export enum Player {
    Human = 'Human',
    Computer = 'Computer',
    None = 'None'
}

type GameData = Array<Array<SymbolData>>;

export default GameData;