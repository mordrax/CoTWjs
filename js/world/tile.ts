/// <reference path="../references.ts"/>

class Tile extends Entity {
    solid:boolean;
    ground:Container;
    turn:number;

    constructor(tileResource:TileResource, location:WorldCoordinates, solid:boolean=false) {
        super(tileResource.name, EntityType.Tile, tileResource.sprite, location);

        this.ground = new Container();
    }

    DetermineRotation(westTile:string, northTile:string) {

        var southWestTile:string;   // tile type which if is of a certain type, no rotation is required

        // check if tile type is one that requires rotation - exits with 0 if not one of the expected types
        switch (this.id) {
            case "PathRock" :
                southWestTile = "Path";
                break;
            case "PathGrass" :
                southWestTile = "Path";
                break;
            case "WaterGrass" :
                southWestTile = "Water";
                break;
            case "WaterPath" :
                southWestTile = "Water";
                break;
            default :
                return;
        }

        if (westTile === southWestTile) {
            if (northTile === southWestTile) {    // north and west
                this.turn = Math.PI/2;
            }
            else {                          // north and east
                // do nothing - no rotation required
            }
        }
        else if (northTile === southWestTile) {    // south and west
            this.turn = Math.PI;
        }
        else {                              // south and east
            this.turn = Math.PI*3/2;
        }
    }
}
