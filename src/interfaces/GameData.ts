export enum SymbolData {
    X = 'X',
    O = 'O',
    None = ''
}

type GameData = Array<Array<SymbolData>>;

export default GameData;