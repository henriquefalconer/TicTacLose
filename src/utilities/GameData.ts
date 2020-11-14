import { SymbolData } from "../interfaces/GameData";

class GameData {
    
    data: Array<Array<SymbolData>>;
    dimensions: number;

    constructor(data: Array<Array<SymbolData>>) {
        this.data = data;
        this.dimensions = data.length;
    }

}

export default GameData;