
if (typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.UserInterface = 2;
    TagOfLayer.Status = 3;
    TagOfLayer.LastLayer = 4;
    TagOfLayer.Player1 = 5;
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

var playerInformations = [
    {
        x: 470,
        y: 720,
        zIndex: 0,
        playerNumber: 1,
        defaultName: "Player1",
        popUpTop: true,
        popUpX: 470,
        popUpY: 850,
        popUpZ: 0,
    },
    {
        x: 620,
        y: 720,
        zIndex: 0,
        playerNumber: 2,
        defaultName: "Player2",
        popUpTop: true,
        popUpX: 620,
        popUpY: 850,
        popUpZ: 0,
    },
    {
        x: 770,
        y: 720,
        zIndex: 0,
        playerNumber: 3,
        defaultName: "Player3",
        popUpTop: true,
        popUpX: 770,
        popUpY: 850,
        popUpZ: 0,
    },
    {
        x: 920,
        y: 720,
        zIndex: 0,
        playerNumber: 4,
        defaultName: "Player4",
        popUpTop: true,
        popUpX: 920,
        popUpY: 850,
        popUpZ: 0,
    },
    //Right One
    {
        x: 1050,
        y: 530,
        zIndex: 0,
        playerNumber: 5,
        defaultName: "Player5",
        popUpTop: true,
        popUpX: 1050,
        popUpY: 650,
        popUpZ: 0,
    },
//    Next three bottom
    {
        x: 920,
        y: 400,
        zIndex: 2,
        playerNumber: 6,
        defaultName: "Player6",
        popUpTop: false,
        popUpX: 920,
        popUpY: 270,
        popUpZ: 0,
    },
    {
        x: 770,
        y: 400,
        zIndex: 2,
        playerNumber: 7,
        defaultName: "Player7",
        popUpTop: false,
        popUpX: 770,
        popUpY: 270,
        popUpZ: 0,
    },
    {
        x: 620,
        y: 400,
        zIndex: 2,
        playerNumber: 8,
        defaultName: "Player8",
        popUpTop: false,
        popUpX: 620,
        popUpY: 270,
        popUpZ: 0, },
    {
        x: 470,
        y: 400,
        zIndex: 2,
        playerNumber: 9,
        defaultName: "Player9",
        popUpTop: false,
        popUpX: 470,
        popUpY: 270,
        popUpZ: 0,
    },
    //Next  clockwise
    {
        x: 340,
        y: 530,
        zIndex: 0,
        playerNumber: 10,
        defaultName: "Player10",
        popUpTop: true,
        popUpX: 340,
        popUpY: 650,
        popUpZ: 0,
    },
];



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

var global_current_position = 0;