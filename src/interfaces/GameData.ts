export enum SymbolData {
    X = 'X',
    O = 'O',
    None = ''
}

export type PositionId = [row: number, column: number];

type GameData = Array<Array<SymbolData>>;

export default GameData;