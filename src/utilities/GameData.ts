import { SymbolData } from "../interfaces/GameData";

class GameData {
    
    data: Array<Array<SymbolData>>;
    dimensions: number;

    constructor(data: Array<Array<SymbolData>>) {
        this.data = data;
        this.dimensions = data.length;
    }

}

export class EmptyGameData extends GameData {
    
    constructor(dimensions: number) {

        const data = Array(dimensions).join().split(',').map(
            _ => Array(dimensions).join().split(',').map(
                _ => SymbolData.None
            )
        );

        super(data);
    }

}

export default GameData;