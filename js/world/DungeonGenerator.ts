/// <reference path="../references.ts"/>

/**
 * Randomly generates a dungeon level for the specified MapType
 */
class DungeonLevel {
    public maxRooms:number;
    public dungeonSize:Point;
    public dungeonName:GameArea;
    public dungeonLevel:number;
    public dungeonASCIIMap:string[];
    public dungeonRooms:Room[];

    constructor(area:GameArea) {

        this.dungeonSize = new Point(25, 25);
        this.dungeonName = area;
        this.maxRooms = 100;

        this.CreateBlankASCIIMap();
        this.dungeonRooms = this.CreateRooms(this.maxRooms);

        this.MergeToASCIIMap(this.dungeonRooms);
    }

    /**
     * Create a blank ASCII map with all elements containing the Rock symbol '^'
     */
    CreateBlankASCIIMap() {
        this.dungeonASCIIMap = [];
        // loop through and assign each array element with the Rock symbol '^'
        for (var i = 0; i < this.dungeonSize.y; i++) {
            this.dungeonASCIIMap[i] = '';
            for (var j = 0; j < this.dungeonSize.x; j++) {
                this.dungeonASCIIMap[i] += '^';
            }
        }
    }

    /**
     * Create a number of rooms for the dungeon map (the number will be between the minRooms and maxRooms)
     */
    CreateRooms(numberOfRooms:number):Room[] {
        var rooms:Room[] = [];
        var tempRoom;

        var retries = 50;
        while (retries > 0) {
            if (rooms.length >= numberOfRooms) {
                break;      //exit loop when maximum number of rooms for the map is reached
            }
            //create temporary room with random location and size
            tempRoom = new Room(new Point(D(this.dungeonSize.x), D(this.dungeonSize.y)));

            //check if the temporary room is out of bounds of the dungeon map
            if (tempRoom.startCoords.y + tempRoom.roomSize.y > (this.dungeonSize.y - 1) ||
                tempRoom.startCoords.x + tempRoom.roomSize.x > (this.dungeonSize.x - 1)) {
                retries--;
                continue;   //continue while loop
            }
            //check no overlap with other rooms
            if (this.IsRoomValid(rooms, tempRoom)) {
                // set the position of the room in relation to the dungeon level
                tempRoom.mapPosition = tempRoom.IsNearMapEdge(this.dungeonSize, tempRoom.startCoords, tempRoom.endCoords);
                rooms.push(tempRoom);
            } else {
                retries--;
            }
        }

        return rooms;
    }

    InBetween(num, min, max) {
        return num >= min && num <= max;
    }

    /**
     * Checks whether the room is valid by checking that the start point for all rooms are not "in between" the axis
     * of any other room.
     */
    IsRoomValid(rooms:Room[], tempRoom:Room):Boolean {
        for (var i = 0; i < rooms.length; i++) {
            // check if temporary room and an existing room intersect on the x AND y axis
            if ((this.InBetween(tempRoom.startCoords.x, rooms[i].startCoords.x, rooms[i].startCoords.x + rooms[i].roomSize.x) ||
                this.InBetween(rooms[i].startCoords.x, tempRoom.startCoords.x, tempRoom.startCoords.x + tempRoom.roomSize.x)) &&
                (this.InBetween(tempRoom.startCoords.y, rooms[i].startCoords.y, rooms[i].startCoords.y + rooms[i].roomSize.y) ||
                this.InBetween(rooms[i].startCoords.y, tempRoom.startCoords.y, tempRoom.startCoords.y + tempRoom.roomSize.y))) {
                     return false;  // overlap exists for both x and y axis - therefore this is an invalid room
            }
        }
        return true;
    }

    /**
     * Add ASCII symbols to blank ASCIIMAP for Rooms, Connectors and Exits
      */
    MergeToASCIIMap(rooms:Room[]) {
        rooms.forEach((room:Room) => {
            for (var i = room.startCoords.y; i < room.startCoords.y + room.roomSize.y; i++) {
                for (var j = room.startCoords.x; j < room.startCoords.x + room.roomSize.x; j++) {
                    this.dungeonASCIIMap[i] = this.dungeonASCIIMap[i].splice(j, 1, 'O');
                }
            }
        });
    }
}

/**
 * Stores all of the fields and functions required by a dungeon room.
 */
class Room {
    public roomSize:Point;
    public roomType:RoomType;
    public startCoords:Point;
    public endCoords:Point;
    public isConnected:Boolean;
    public roomExits:Exit[];
    public mapPosition:CardinalDirection;

    constructor(startCoords:Point) {
        this.isConnected = false;
        this.startCoords = startCoords;
        this.roomSize = new Point(D(5) + 3, D(5) + 3);
        this.endCoords = new Point(this.startCoords.x + this.roomSize.x, this.startCoords.y + this.roomSize.y);
       // this.mapPosition = this.IsNearMapEdge(this.startCoords, this.endCoords);
        this.roomType = RoomType.Rectangle;
        this.CreateExits();
    }

    /**
     * Checks if a room is near a map edge (ie. within 10 tiles of the edge of the map)
     */
   IsNearMapEdge(dungeonSize:Point, minRoomPoint:Point, maxRoomPoint:Point):CardinalDirection {
        var currentEdge = CardinalDirection.None;

        if (minRoomPoint.x < 10) {

        }

        return currentEdge;

    }


    /**
     * Creates exits randomly based on the room's position on the map
     */
    CreateExits() {
        this.roomExits = [];


    }
}
/*
class Wall {
    public cardinalDirection: CardinalDirection;
    public startCoords:Point;
    public endCoords:Point;

    constructor (direction:CardinalDirection, start:Point, end:Point) {
        this.cardinalDirection = direction;
        this.startCoords = start;
        this.endCoords = end;
    }
}
*/

class Exit {
    public exitCoords:Point;
    public exitDirection: CardinalDirection;


}