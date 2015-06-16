var topLane = 510;
var botLane = 190;
var midLane = 320;
var leftSolo = 180;
var col1 = 340;
var col2 = 480;
var col3 = 620;
var col4 = 760;
var rightSolo = 920;


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

var positionInformations = [
    {
        x: col1,
        y: topLane,
        zIndex: 0,
        playerNumber: 1,
        defaultName: "Player1",
        playerModel: 1,
        popUpTop: true,
        popUpX: 470,
        popUpY: 850,
        popUpZ: 0,
    },
    {
        x: col2,
        y: topLane,
        zIndex: 0,
        playerNumber: 2,
        defaultName: "Player2",
        playerModel: 2,
        popUpTop: true,
        popUpX: 620,
        popUpY: 850,
        popUpZ: 0,
    },
    {
        x: col3,
        y: topLane,
        zIndex: 0,
        playerNumber: 3,
        defaultName: "Player3",
        playerModel: 3,
        popUpTop: true,
        popUpX: 770,
        popUpY: 850,
        popUpZ: 0,
    },
    {
        x: col4,
        y: topLane,
        zIndex: 0,
        playerNumber: 4,
        defaultName: "Player4",
        playerModel: 4,
        popUpTop: true,
        popUpX: 920,
        popUpY: 850,
        popUpZ: 0,
    },
    //Right One
    {
        x: rightSolo,
        y: midLane,
        zIndex: 0,
        playerNumber: 5,
        defaultName: "Player5",
        playerModel: 5,
        popUpTop: true,
        popUpX: 1050,
        popUpY: 650,
        popUpZ: 0,
    },
//    Next three bottom
    {
        x: col4,
        y: botLane,
        zIndex: 2,
        playerNumber: 6,
        defaultName: "Player6",
        playerModel: 1,
        popUpTop: false,
        popUpX: 920,
        popUpY: 270,
        popUpZ: 0,
    },
    {
        x: col3,
        y: botLane,
        zIndex: 2,
        playerNumber: 7,
        defaultName: "Player7",
        playerModel: 2,
        popUpTop: false,
        popUpX: 770,
        popUpY: 270,
        popUpZ: 0,
    },
    {
        x: col2,
        y: botLane,
        zIndex: 2,
        playerNumber: 8,
        defaultName: "Player8",
        playerModel: 3,
        popUpTop: false,
        popUpX: 620,
        popUpY: 270,
        popUpZ: 0, },
    {
        x: col1,
        y: botLane,
        zIndex: 2,
        playerNumber: 9,
        defaultName: "Player9",
        playerModel: 4,
        popUpTop: false,
        popUpX: 470,
        popUpY: 270,
        popUpZ: 0,
    },
    //Next  clockwise
    {
        x: leftSolo,
        y: midLane,
        zIndex: 0,
        playerNumber: 10,
        defaultName: "Player10",
        playerModel: 5,
        popUpTop: true,
        popUpX: 340,
        popUpY: 650,
        popUpZ: 0,
    },
];

var global_current_position = 0;