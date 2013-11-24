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

        var baseTile:string;   // tile type which if is of a certain type, no rotation is required

        // check if tile type is one that requires rotation - exits with 0 if not one of the expected types
        switch (this.id) {
            case "PathRock" :
                baseTile = "Rock";
                break;
            case "PathGrass" :
                baseTile = "Grass";
                break;
            case "WaterGrass" :
                baseTile = "Grass";
                break;
            case "WaterPath" :
                baseTile = "Path";
                break;
            case "WallDarkDgn" :
                baseTile = "DarkDgn";
                break;
            case "WallLitDgn" :
                baseTile = "LitDgn";
                break;
            default :
                return;
        }

        if (westTile === baseTile) {
            if (northTile === baseTile) {    // north and west
                this.turn = Math.PI*3/2;
            }
            else {                          // north and east
                // do nothing - no rotation required
                this.turn = Math.PI;
            }
        }
        else if (northTile === baseTile) {    // south and west
            this.turn = 0;
        }
        else {                              // south and east
            this.turn = Math.PI/2;
        }
    }
}
