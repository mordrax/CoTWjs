/**
 * Created with JetBrains WebStorm.
 * User: mordrax, kfed
 * Date: 26/06/13
 * Time: 9:06 PM
 * To change this template use File | Settings | File Templates.
 */
var tile_type = {
    1: "ground",
    2: "water",
    3: "solid"
};

var tile_data = {
    1:{"name":"Rock", "type": 3, "turn":0},
    2:{"name":"RockPath", "type": 3, "turn":0},
    3:{"name":"RockPath", "type": 3, "turn":90},
    4:{"name":"RockPath", "type": 3, "turn":180},
    5:{"name":"RockPath", "type": 3, "turn":270},
    6:{"name":"Grass", "type": 1, "turn":0},
    7:{"name":"GrassPath", "type": 1, "turn":0},
    8:{"name":"GrassPath", "type": 1, "turn":90},
    9:{"name":"GrassPath", "type": 1, "turn":180},
    10:{"name":"GrassPath", "type": 1, "turn":270},
    11:{"name":"DarkDgn", "type": 1, "turn":0},
    12:{"name":"DarkDgnWall", "type": 3, "turn":0},
    13:{"name":"DarkDgnWall", "type": 3, "turn":90},
    14:{"name":"DarkDgnWall", "type": 3, "turn":180},
    15:{"name":"DarkDgnWall", "type": 3, "turn":270},
    16:{"name":"Water", "type": 2, "turn":0},
    17:{"name":"WaterGrass", "type": 2, "turn":0},
    18:{"name":"WaterGrass", "type": 2, "turn":90},
    19:{"name":"WaterGrass", "type": 2, "turn":180},
    20:{"name":"WaterGrass", "type": 2, "turn":270},
    21:{"name":"Path", "type": 1, "turn":0},
    22:{"name":"WaterPath", "type": 2, "turn":0},
    23:{"name":"WaterPath", "type": 2, "turn":90},
    24:{"name":"WaterPath", "type": 2, "turn":180},
    25:{"name":"WaterPath", "type": 2, "turn":270},
    26:{"name":"LitDgn", "type": 1, "turn":0},
    27:{"name":"LitDgnWall", "type": 3, "turn":0},
    28:{"name":"LitDgnWall", "type": 3, "turn":90},
    29:{"name":"LitDgnWall", "type": 3, "turn":180},
    30:{"name":"LitDgnWall", "type": 3, "turn":270},
    31:{"name":"Crop", "type": 1, "turn":0}
};


var farm_map =
[
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,3,3],
    [26,27,28,29,30,31,3,3,3,3,3,3,3,21,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [21,21,6,6,6,3,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,3,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,6,6,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,31,31,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,21,6,6,6,6,31,31,6,6,6,6,6,6,6],
    [21,21,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,31,31,6,6,6,6,6,6,6]
];

var town_map = [
    [1,1],
    [1,1]
];