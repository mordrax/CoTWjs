/// <reference path="../references.ts"/>

// Randomly generates a dungeon level for the specified MapType
class DungeonLevel {

    constructor(map: GameArea, size: Point) {

        var x = new Array(size.x);

        for (var y=0; y<size.y; y++){
            x[y] = new Array(size.y);
        }

        for (var i=0; i<size.x; i++){
            for (var j=0; j<size.y; j++){
                x[i][j] = '.';
            }
        }

        //ASCII_MAPS[map] = x;

    }
}