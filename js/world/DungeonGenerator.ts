/// <reference path="../references.ts"/>

/**
 * Randomly generates a dungeon level for the specified MapType
 */
class DungeonLevel {
    public maxRooms:number;
    public size:Point;
    public name:GameArea;
    //public dungeonLevel:number;
    public ASCIIMap:string[];
    public rooms:Room[];

    constructor(area:GameArea) {

        this.size = new Point(25, 25);
        this.name = area;
        this.maxRooms = 15;

        this.ASCIIMap = this.CreateBlankASCIIMap(this.size);
        this.rooms = this.CreateRooms();
        this.CreateRoomConnectors();
        this.MergeToASCIIMap(this.rooms);          // excavates the randomly-generated level from the ASCIIMAP

    }

    /**
     * Create a blank ASCII map with all elements containing the Rock symbol '^'
     */
    CreateBlankASCIIMap(mapSize: Point):String[] {
        var map:String[] = [];
        // loop through and assign each array element with the Rock symbol '^'
        for (var i = 0; i < mapSize.y; i++) {
            map[i] = '';
            for (var j = 0; j < mapSize.x; j++) {
                map[i] += '^';
            }
        }
        return map;
    }

    /**
     * Create a number of rooms for the dungeon map (the number will be between the minRooms and maxRooms)
     */
    CreateRooms():Room[] {
        var rooms:Room[] = [];
        var tempRoom;

        var retries = 50;
        while (retries > 0) {
            if (rooms.length >= this.maxRooms) {
                break;      //exit loop when maximum number of rooms for the map is reached
            }
            //create temporary room with random location and size
            tempRoom = new Room(new Point(D(this.size.x), D(this.size.y)));

            //check if the temporary room is out of bounds of the dungeon map
            if (tempRoom.startCoords.y + tempRoom.size.y > (this.size.y - 1) ||
                tempRoom.startCoords.x + tempRoom.size.x > (this.size.x - 1)) {
                retries--;
                continue;   //continue while loop
            }
            //check no overlap with other rooms
            if (this.IsRoomValid(rooms, tempRoom)) {
                // determine the position of the room in relation to the dungeon level
                tempRoom.mapPosition = tempRoom.IsNearMapEdge(this.size, tempRoom.startCoords, tempRoom.endCoords);
                rooms.push(tempRoom);
                tempRoom.CreateExits();
                console.dir(tempRoom);
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
            if ((this.InBetween(tempRoom.startCoords.x, rooms[i].startCoords.x, rooms[i].startCoords.x + rooms[i].size.x) ||
                this.InBetween(rooms[i].startCoords.x, tempRoom.startCoords.x, tempRoom.startCoords.x + tempRoom.size.x)) &&
                (this.InBetween(tempRoom.startCoords.y, rooms[i].startCoords.y, rooms[i].startCoords.y + rooms[i].size.y) ||
                    this.InBetween(rooms[i].startCoords.y, tempRoom.startCoords.y, tempRoom.startCoords.y + tempRoom.size.y))) {
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
            for (var i = room.startCoords.y; i < room.startCoords.y + room.size.y; i++) {
                for (var j = room.startCoords.x; j < room.startCoords.x + room.size.x; j++) {
                    this.ASCIIMap[i] = this.ASCIIMap[i].splice(j, 1, 'O');
                }
            }
            room.exits.forEach((exit:Exit) => {
                this.ASCIIMap[exit.coords.y] = this.ASCIIMap[exit.coords.y].splice(exit.coords.x,1,'[');
            })
        });
    }

    /**
     * Add random exits (i.e. doors) for each room
     */
    CreateRoomConnectors() {
        for (var i = 0; i < this.rooms.length; i++){
            this.rooms[i].CreateExits();
        }
    }
}

/**
 * Stores all of the fields and functions required by a dungeon room.
 */
class Room {
    public size:Point;
    public type:RoomType;
    public startCoords:Point;
    public endCoords:Point;
    public isConnected:Boolean;
    public exits:Exit[];
    public mapPosition:CardinalDirection;

    constructor(startCoords:Point) {
        this.isConnected = false;
        this.startCoords = startCoords;
        this.size = new Point(D(5) + 3, D(5) + 3);
        this.endCoords = new Point(this.startCoords.x + this.size.x - 1, this.startCoords.y + this.size.y - 1);
        this.type = RoomType.Rectangle;
    }

    /**
     * Checks if a room is near a map edge (ie. within "mapEdgeTolerance" number of tiles of the edge of the map)
     */
    IsNearMapEdge(dungeonSize:Point, minRoomPoint:Point, maxRoomPoint:Point):CardinalDirection {
        var mapEdgeTolerance = 5;
        var edgeX = CardinalDirection.None;
        var edgeY = CardinalDirection.None;

        if (minRoomPoint.x < mapEdgeTolerance) {
            edgeX = CardinalDirection.West;
        } else if (maxRoomPoint.x > (dungeonSize.x - mapEdgeTolerance)) {
            edgeX = CardinalDirection.East;
        }
        if (minRoomPoint.y < mapEdgeTolerance) {
            edgeY = CardinalDirection.North;
        } else if (maxRoomPoint.y > (dungeonSize.y - mapEdgeTolerance)) {
            edgeY = CardinalDirection.South;
        }
        // pass in both edges and return the Cardinal Direction of the room's position on the map
        return this.DetermineRoomToMapPosition(edgeX, edgeY);
    }

    /**
     * Pass in the x and y map edges that the room is near.
     * Return the Cardinal Direction of the room's position on the map.
     */
        DetermineRoomToMapPosition(edgeX:CardinalDirection, edgeY:CardinalDirection):CardinalDirection {
        if (edgeX === CardinalDirection.None) {
            return edgeY;       // if edgeX is None, then return edgeY (which is either None, North or South)
        } else if (edgeY === CardinalDirection.None){
            return edgeX;       // if edgeY is None, then return edgeX (which is either East or West)
        }
        // if code reaches this point, that means that both X and Y have values (i.e. room is near a corner)
        if (edgeY === CardinalDirection.North){
            if (edgeX === CardinalDirection.East){
                return CardinalDirection.NorthEast;
            } else if (edgeX === CardinalDirection.West) {          //redundant check for clarity
                return CardinalDirection.NorthWest;
            }
        }
        // separated check into a different IF to improve clarity, but code can be minimised if required to an ELSE IF
        if (edgeY === CardinalDirection.South){
            if (edgeX === CardinalDirection.East){
                return CardinalDirection.SouthEast;
            } else if (edgeX === CardinalDirection.West) {          //redundant check for clarity
                return CardinalDirection.SouthWest;
            }
        }

        return CardinalDirection.None;                   // default return of None - this should never occur
    }


    /**
     * Creates exits randomly based on the room's position on the map
     */
    CreateExits() {
        this.exits = [];
        var startCoordsWithWalls = this.startCoords.Difference(new Point (1,1));
        var endCoordsWithWalls = this.endCoords.Add(new Point (1,1));
        this.exits.push(new Exit(startCoordsWithWalls, endCoordsWithWalls, this.size, this.mapPosition));
    }
}


class Exit {
    public coords: Point;
    public wall:CardinalDirection;
    public corridorDirections: CardinalDirection[];
    public numberOfBaseDirections = 4;
    public corridorPoint: Point[];

    constructor(wallStart:Point, wallEnd:Point, roomSize:Point, roomPosition:CardinalDirection) {
        this.wall = this.DetermineExitWall(roomPosition, this.numberOfBaseDirections);
        this.coords = this.DetermineExitCoords(wallStart, wallEnd, roomSize, this.wall);
        this.corridorDirections = this.DetermineCorridorDirections(roomPosition);
        this.corridorPoint.push(this.coords);          // set the first corridor point to the exit
    }

    /**
     * Determines all of the possible wall directions, then loops through each one randomly until a valid one is found
     * @param roomPosition - position of the room in relation to the map level
     * @param numberOfWalls - 4 for N/E/S/W, 8 for N/E/S/W/NE/SE/SW/NW
     */
    DetermineExitWall(roomPosition:CardinalDirection, numberOfWalls:number):CardinalDirection{
            var possibleWalls:CardinalDirection[];
            possibleWalls = this.GetAllDirections(numberOfWalls);
            return this.LoopThroughDirections(roomPosition,possibleWalls);
    }

        /**
         * Determines all of the possible corridor directions, then loops through each one randomly until a valid one is found
         * @param roomPosition - position of the room in relation to the map level
         */
    DetermineCorridorDirections(roomPosition:CardinalDirection):CardinalDirection[]{
         var possibleDirections:CardinalDirection[];
        possibleDirections = this.DeterminePossibleCorridorDirections(this.wall);


            // loop and remove impossible corridor directions

        return possibleDirections;
    }

    /**
     * Loops through each possible corridorDirections randomly, checks if it is valid in regards to the room position,
     * and returns a valid Cardinal Direction as soon as it is found.
     * @param roomPosition - position of the room in relation to the map level.
     * @param possibleDirections - array of Cardinal Directions that are possible before checking against room position.
     */
    private LoopThroughDirections(roomPosition:CardinalDirection, possibleDirections:CardinalDirection[]):CardinalDirection{
        var randomNumber:number;
        var validDirection:CardinalDirection;
        while (possibleDirections.length > 0){
            randomNumber = D(possibleDirections.length) - 1;         // deduct 1 because arrays start at 0
            validDirection = possibleDirections[randomNumber];
            if (this.IsDirectionPermitted(validDirection, roomPosition)){
                return validDirection;
            } else {
                possibleDirections.splice(randomNumber,1);           // remove the corridorDirections option that was not valid
            }
        }
        return CardinalDirection.None;
    }

    /**
     * Returns the number of possible directions was passed in as parameter "directionTypes"
     * @param directionTypes should typically be 4 for standard N/E/S/W, 8 for all N/E/S/W/NE/SE/SW/NW
     */
    GetAllDirections(directionTypes:number):CardinalDirection[]{
        var possibleDirections: CardinalDirection[];
        possibleDirections = [];
        possibleDirections.push(CardinalDirection.North,CardinalDirection.East,CardinalDirection.South, CardinalDirection.West);
        // for diagonals
        if (directionTypes != 8){
            possibleDirections.push(CardinalDirection.NorthEast,CardinalDirection.SouthEast,CardinalDirection.SouthWest,CardinalDirection.NorthWest);
        }
        return possibleDirections;
    }

    /**
     * Returns TRUE if corridorDirections is permitted; FALSE when corridorDirections is NOT permitted.
     * Used for checking if exits and corridor directions are valid for the room (i.e. if a room is in the NorthWest
     *  part of the map level, then an exit/corridor going North/West/NorthWest/SouthWest/NorthEast are not allowed.
     */
    IsDirectionPermitted(direction:CardinalDirection, roomPosition:CardinalDirection):boolean {
        switch (roomPosition){
            case CardinalDirection.North:           // true if NOT N/NE/NW
                return !(direction === CardinalDirection.North || direction === CardinalDirection.NorthEast ||
                    direction === CardinalDirection.NorthWest);
            case CardinalDirection.NorthEast:       // true if S/W/SW
                return (direction === CardinalDirection.South || direction === CardinalDirection.West ||
                    direction === CardinalDirection.SouthWest);
            case CardinalDirection.East:            // true if NOT E/NE/SE
                return !(direction === CardinalDirection.East || direction === CardinalDirection.NorthEast ||
                    direction === CardinalDirection.SouthEast);
            case CardinalDirection.SouthEast:       // true if N/W/NW
                return (direction === CardinalDirection.North || direction === CardinalDirection.West ||
                    direction === CardinalDirection.NorthWest);
            case CardinalDirection.South:           // true if NOT S/SE/SW
                return !(direction === CardinalDirection.South || direction === CardinalDirection.SouthEast ||
                    direction === CardinalDirection.NorthWest);
            case CardinalDirection.SouthWest:       // true if N/E/NE
                return (direction === CardinalDirection.North || direction === CardinalDirection.East ||
                    direction === CardinalDirection.NorthEast);
            case CardinalDirection.West:            // true if NOT W/NW/SW
                return !(direction === CardinalDirection.West || direction === CardinalDirection.NorthWest ||
                    direction === CardinalDirection.SouthWest);
            case CardinalDirection.NorthWest:       // true if S/E/SE
                return (direction === CardinalDirection.South || direction === CardinalDirection.East ||
                    direction === CardinalDirection.SouthEast);
            default:                                // None
                return true;
        }
    }

    /**
     * Randomly selects an exit position on the specified wall and returns the Point.
     */
    DetermineExitCoords(wallStart:Point, wallEnd:Point, roomSize:Point, wall:CardinalDirection):Point {
        var randomNumber:number;
        switch (wall){
            case CardinalDirection.North:       // y = min (wallStart.y)
                randomNumber = D(roomSize.x);
                return new Point(wallStart.x + randomNumber, wallStart.y);
            case CardinalDirection.East:        // x = max (wallEnd.x)
                randomNumber = D(roomSize.y);
                return new Point(wallEnd.x, wallStart.y + randomNumber);
            case CardinalDirection.South:       // y = max (wallEnd.y)
                randomNumber = D(roomSize.x);
                return new Point(wallStart.x + randomNumber, wallEnd.y);
            case CardinalDirection.West:        // x = min (wallStart.x)
                randomNumber = D(roomSize.y);
                return new Point(wallStart.x, wallStart.y + randomNumber);
            default:
                return new Point(0,0);
        }
    }

    /**
     * Randomly selects an exit corridorDirections on the specified exit.
     */
    DeterminePossibleCorridorDirections(wall:CardinalDirection):CardinalDirection[] {
        var possibleDirections: CardinalDirection[];
        possibleDirections = [];

        switch (wall){
            case CardinalDirection.North:       // N/NE/NW
                possibleDirections.push(CardinalDirection.North,CardinalDirection.NorthEast,CardinalDirection.NorthWest);
                break;
            case CardinalDirection.East:        // E/NE/SE
                possibleDirections.push(CardinalDirection.East,CardinalDirection.NorthEast,CardinalDirection.SouthEast);
                break;
            case CardinalDirection.South:       // S/SE/SW
                possibleDirections.push(CardinalDirection.South,CardinalDirection.SouthEast,CardinalDirection.SouthWest);
                break;
            case CardinalDirection.West:        // W/NW/SW
                possibleDirections.push(CardinalDirection.West,CardinalDirection.NorthWest,CardinalDirection.SouthWest);
                break;
            default:
                possibleDirections.push(CardinalDirection.None);
        }
        return possibleDirections;
    }


}

