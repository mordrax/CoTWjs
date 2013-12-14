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

    constructor(area: GameArea) {

        this.dungeonSize = new Point(25,25);
        this.dungeonName = area;
        this.minRooms = 2;
        this.maxRooms = 2;

        this.CreateBlankASCIIMap();
        this.dungeonRooms = this.CreateRooms(this.maxRooms);

        this.MergeToASCIIMap(this.dungeonRooms);
    }

    // Create a blank ASCII map with all elements containing the Rock symbol '^'
    CreateBlankASCIIMap() {
        this.dungeonASCIIMap = [];
        // loop through and assign each array element with the Rock symbol '^'
        for (var i=0; i<this.dungeonSize.y; i++){
            this.dungeonASCIIMap[i] = '';
            for (var j=0; j<this.dungeonSize.x; j++){
                this.dungeonASCIIMap[i] += '^';
            }
        }
    }

    // Create a number of rooms for the dungeon map (the number will be between the minRooms and maxRooms)
    CreateRooms(numberOfRooms:number):Room[] {
        var rooms:Room[] = [];
        
        for (var i=0; i<numberOfRooms; i++){
            rooms[i] = new Room(new Point(D(this.dungeonSize.x),D(this.dungeonSize.y)));
            console.dir(rooms[i]);
        }
        return rooms;
    }

    // Add ASCII symbols to blank ASCIIMAP for Rooms, Connectors and Exits
    MergeToASCIIMap(rooms:Room[]){
        rooms.forEach((room:Room) => {
            for (var i=room.startCoords.y; i<room.startCoords.y+room.roomSize.y; i++){
                var startIndex = room.startCoords.x;
                var originalString = this.dungeonASCIIMap[i];
                var innerString = '';
                for (var j=0; j<room.roomSize.x; j++){
                    innerString += 'o';
                }
                this.dungeonASCIIMap[i] = originalString.substr(0,startIndex) + innerString + originalString.substr(startIndex + innerString.length);
            }

        });

    }

}

class Room {
    public roomSize:Point;
    public startCoords:Point;

    constructor(startCoords: Point) {
        this.startCoords = startCoords;
        this.roomSize = new Point(D(5)+3,D(5)+3);
    }
}