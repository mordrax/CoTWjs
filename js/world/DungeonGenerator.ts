/// <reference path="../references.ts"/>

// Randomly generates a dungeon level for the specified MapType
class DungeonLevel {

    constructor(map: GameArea, size: Point) {

        var x = new Array(size.X);

        for (var y=0; y<size.Y; y++){
            x[y] = new Array(size.Y);
        }

        for (var i=0; i<size.X; i++){
            for (var j=0; j<size.Y; j++){
                x[i][j] = '.';
            }
        }

        //ASCII_MAPS[map] = x;

    }
}