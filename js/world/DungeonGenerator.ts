/// <reference path="../references.ts"/>

// Randomly generates a dungeon level for the specified MapType
class DungeonLevel {
    public minRooms: number;
    public maxRooms: number;
    public dungeonSize: Point;
    public dungeonName: GameArea;
    public dungeonLevel: number;
    public dungeonRooms: Room[];

    constructor(map: GameArea, size: Point) {

        var x = new Array(size.x);

        for (var y=0; y<size.y; y++){
            x[y] = new Array(size.y);
        }

        for (var i=0; i<size.x; i++){
            for (var j=0; j<size.y; j++){
                x[i][j] = '^';
            }
        }

    }
}


class Room {

    constructor() {

    }
}