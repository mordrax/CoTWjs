/// <reference path="../references.ts"/>

class Tile extends Entity {
    solid:boolean;
    turn:number;

    constructor(id: string, sprite:Sprite) {
        super(id, EntityType.Tile, sprite);
        this.turn = 0;
    }

    RotateAndCache = function (image, angle) {
        var offscreenCanvas = document.createElement('canvas');
        var offscreenCtx = offscreenCanvas.getContext('2d');

        var size = Math.max(image.width, image.height);
        offscreenCanvas.width = size;
        offscreenCanvas.height = size;

        offscreenCtx.translate(size / 2, size / 2);
        offscreenCtx.rotate(angle + Math.PI / 2);
        offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));

        return offscreenCanvas;
    };

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
            case "WallLitDgn" :
                southWestTile = "Wall";
                break;
            case "WallDarkDgn":
                southWestTile = "Wall";
                break;
            default :
                return;
        }

        if (westTile === southWestTile) {
            if (northTile === southWestTile) {    // north and west
                this.turn = 90;
            }
            else {                          // north and east
                // do nothing - no rotation required
            }
        }
        else if (northTile === southWestTile) {    // south and west
            this.turn = 180;
        }
        else {                              // south and east
            this.turn = 270;
        }
    }
}
