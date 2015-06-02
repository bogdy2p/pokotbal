if (typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.UserInterface = 2;
    TagOfLayer.Status = 3;
    TagOfLayer.LastLayer = 4;
}

if (typeof SpriteTag == "undefined") {
    var SpriteTag = {};

    SpriteTag.player1 = 0;
    SpriteTag.player2 = 1;
    SpriteTag.player3 = 2;
    SpriteTag.player4 = 3;
    SpriteTag.player5 = 4;
    SpriteTag.player6 = 5;
    SpriteTag.player7 = 6;
    SpriteTag.player8 = 7;
    SpriteTag.player9 = 8;
    SpriteTag.player10 = 9;
}



//
//
//
////var playerPositions1 = [
//    //Formation 3-2-3-2 Clockwise
//    //First three top
//    {x: 500, y: 720, zIndex:0},
//    {x: 700, y: 720, zIndex:0},
//    {x: 900, y: 720, zIndex:0},
//    //Next two clockwise
//    {x: 1050, y: 600, zIndex:0},
//    {x: 1050, y: 480, zIndex:0},
////    Next three bottom
//    {x: 500, y: 400, zIndex:0},
//    {x: 700, y: 400, zIndex:0},
//    {x: 900, y: 400, zIndex:0},
//    //Next two clockwise
//
//    {x: 340, y: 600, zIndex:0},
//    {x: 340, y: 480, zIndex:0},
//];

var playerPositions = [
    //Formation 4-1-4-1 Clockwise
    //First four top
    {x: 470, y: 720, zIndex: 0},
    {x: 620, y: 720, zIndex: 0},
    {x: 770, y: 720, zIndex: 0},
    {x: 920, y: 720, zIndex: 0},
    //Next  clockwise
    {x: 1050, y: 530, zIndex: 2},
//    Next three bottom
    {x: 920, y: 400, zIndex: 2},
    {x: 770, y: 400, zIndex: 2},
    {x: 620, y: 400, zIndex: 2},
    {x: 470, y: 400, zIndex: 2},
    //Next  clockwise
    {x: 340, y: 530, zIndex: 2},
];

