/// <reference path="../references.ts"/>

// Randomly generates a dungeon level for the specified MapType
class DungeonLevel {
    public minRooms: number;
    public maxRooms: number;
    public dungeonSize: Point;
    public dungeonName: GameArea;
    public dungeonLevel: number;
    public dungeonASCIIMap: string[];
    public dungeonRooms: Room[];

    constructor(map: GameArea, size: Point) {

        this.dungeonSize = size;
        this.dungeonName = map;
        this.minRooms = 2;
        this.maxRooms = 5;

        this.CreateBlankASCIIMap();
        this.CreateRooms();

    }

    // Create a blank ASCII map with all elements containing the Rock symbol '^'
    CreateBlankASCIIMap() {
        // create an array with size equal to the number of rows: y
        var map = new Array(this.dungeonSize.y);

        // for each row, create an array with size equal to the number of columns: x
        for (var x=0; x<this.dungeonSize.x; x++){
            map[x] = new Array(this.dungeonSize.x);
        }

        // loop through and assign each array element with the Rock symbol '^'
        for (var i=0; i<this.dungeonSize.x; i++){
            for (var j=0; j<this.dungeonSize.y; j++){
                map[i][j] = '^';
            }
        }

        // assign the "blank" map full of rock as an instance of this dungeon map.
        this.dungeonASCIIMap = map;
    }

    // Create a number of rooms for the dungeon map (the number will be between the minRooms and maxRooms)
    CreateRooms() {

    }

}


class Room {

    constructor() {

    }
}