import { SymbolData } from "../interfaces/GameData";

class GameData {
    
    data: Array<Array<SymbolData>>;
    dimensions: { rows: number, columns: number };

    constructor(data: Array<Array<SymbolData>>) {
        this.data = data;
        this.dimensions = {
            rows: data.length, 
            columns: data[0].length
        };
    }

}

export default GameData;