/// <reference path="../references.ts"/>

class Tile extends Entity {
    solid:boolean;

    constructor(id: string, sprite:Resource, location:WorldCoordinates) {
        super(id, EntityType.Tile, sprite, location);
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
                this.sprite.turn = Math.PI/2;
            }
            else {                          // north and east
                // do nothing - no rotation required
            }
        }
        else if (northTile === southWestTile) {    // south and west
            this.sprite.turn = Math.PI;
        }
        else {                              // south and east
            this.sprite.turn = Math.PI*3/2;
        }
    }
}
