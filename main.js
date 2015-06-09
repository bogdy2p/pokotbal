//Global game speed,  increase to run faster for testing  [up-to 4 for a ok result]
var GGS = 1;

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
        zIndex: 2,
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
        zIndex: 2,
        playerNumber: 10,
        defaultName: "Player10",
        popUpTop: true,
        popUpX: 340,
        popUpY: 650,
        popUpZ: 0,
    },
];


/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
 "project_type": "javascript",
 // "project_type" indicate the program language of your project, you can ignore this field
 
 "debugMode"     : 1,
 // "debugMode" possible values :
 //      0 - No message will be printed.
 //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
 //      2 - cc.error, cc.assert, cc.warn will print in console.
 //      3 - cc.error, cc.assert will print in console.
 //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
 //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
 //      6 - cc.error, cc.assert will print on canvas, available only on web.
 
 "showFPS"       : true,
 // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.
 
 "frameRate"     : 60,
 // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.
 
 "id"            : "gameCanvas",
 // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.
 
 "renderMode"    : 0,
 // "renderMode" sets the renderer type, only useful on web :
 //      0 - Automatically chosen by engine
 //      1 - Forced to use canvas renderer
 //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers
 
 "engineDir"     : "frameworks/cocos2d-html5/",
 // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
 // but if you are using a single engine file, you can ignore it.
 
 "modules"       : ["cocos2d"],
 // "modules" defines which modules you will need in your game, it's useful only on web,
 // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
 // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".
 
 "jsList"        : [
 ]
 // "jsList" sets the list of js files in your game.
 }
 *
 */




var mygame = {
    start: function () {
        cc.game.onStart = function () {
            if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
                document.body.removeChild(document.getElementById("cocosLoading"));

            // Pass true to enable retina display, disabled by default to improve performance
            cc.view.enableRetina(true);
            // Adjust viewport meta
            cc.view.adjustViewPort(true);
            // Setup the resolution policy and design resolution size
            cc.view.setDesignResolutionSize(1694, 1024, cc.ResolutionPolicy.SHOW_ALL);
            // The game will be resized when browser size change
            cc.view.resizeWithBrowserSize(true);
            //load resources
            cc.LoaderScene.preload(g_resources, function () {
                cc.director.runScene(new MenuScene());
            }, this);

        };
        cc.game.run();
    },
    spawnPlayer: function (playerdata) {
        var event = new cc.EventCustom("spawn_player_event");
        event.setUserData(playerdata);
        cc.eventManager.dispatchEvent(event);
    },
    removePlayer: function (playerdata) {
        var event = new cc.EventCustom("remove_player_event");
        event.setUserData(playerdata);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerWin: function (number) {
        var event = new cc.EventCustom("event_player_winning");
        event.setUserData(number);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerLose: function (number) {
        var event = new cc.EventCustom("event_player_losing");
        event.setUserData(number);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerWait: function (number) {
        var event = new cc.EventCustom("event_player_waiting");
        event.setUserData(number);
        cc.eventManager.dispatchEvent(event);
    },
    setGameTitleBar: function (data) {
        var event = new cc.EventCustom("event_set_game_title_bar");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    display_game_marker: function (data) {
        var event = new cc.EventCustom("event_display_game_marker_bar_and_info");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animateBet: function (data) {
//        cc.log("entered animateBet");
        var event = new cc.EventCustom("event_animate_betting");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animateYouWin: function (data) {
        var event = new cc.EventCustom("event_animate_you_win");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animateBalanceDisplayChange: function (data) {
        var event = new cc.EventCustom("event_animate_balance_change");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerReceiveBet: function (data) {
        var event = new cc.EventCustom("event_animate_player_receiving_bets");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animateTintOtherPlayers: function (data) {
        var event = new cc.EventCustom("event_tint_other_players");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
}

var players = [];
for (i = 0; i < 10; i++) {
    var thename = "player" + i;
    players[i] = {
        playerNumber: i,
        number: i,
        name: thename,
        ammount: 100
    };
}

var gameInformation = {
    topInfo: "bernabeu madridistas",
    leftInfo: "fc barcelone",
    rightInfo: "bayern munich",
    bottomInfo: "Champions League - live!"
};

var firstsetofdata = {
    markerImage: "testImage",
    markerMessage: "The message to be displayed",
    fadeInSec: 1,
    timeToShow: 4,
    fadeOutSec: 1,
    repeatTimes: 1,
};

var firstsetofdata2 = {
    markerImage: "testImage",
    markerMessage: "The SECOND MESSAGE",
    fadeInSec: 1,
    timeToShow: 4,
    fadeOutSec: 1,
    repeatTimes: 1,
};

var disconnected3 = {
    markerImage: "testImage",
    markerMessage: "Player 3 has been disconnected.",
    fadeInSec: 1,
    timeToShow: 1,
    fadeOutSec: 1,
    repeatTimes: 1,
};
var disconnected5 = {
    markerImage: "testImage",
    markerMessage: "Player 5 has been disconnected.",
    fadeInSec: 1,
    timeToShow: 1,
    fadeOutSec: 1,
    repeatTimes: 1,
};

var disconnected = [];
for (i = 0; i < 10; i++) {
    disconnected[i] = {
        markerImage: "imageforplayer" + i,
        markerMessage: "Player " + i + " has been disconnected",
        fadeInSec: 1,
        timeToShow: 1,
        fadeOutSec: 1,
        repeatTimes: 1,
    };
}


var joined = [];
for (i = 0; i < 10; i++) {
    joined[i] = {
        markerImage: "imageforplayer" + i,
        markerMessage: "Player " + i + " has rejoined the match.",
        fadeInSec: 1,
        timeToShow: 1,
        fadeOutSec: 1,
        repeatTimes: 1,
    };
}



var betz = [];

for (k = 0; k < 10; k++) {
    betz[k] = {
        playerNumber: k,
        ammmount: (k + 1) * 50,
    }

}



var betTest = {
    playerNumber: 2,
    ammount: 100,
};
var betTest2 = {
    playerNumber: 7,
    ammount: 100,
};
var betTest3 = {
    playerNumber: 4,
    ammount: 100,
};

//  ACTUALLY START THE GAME HERE !
//  ACTUALLY START THE GAME HERE !
//  ACTUALLY START THE GAME HERE !
mygame.start();
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////



///////////////////////////////////////////////
//Spawn all players during the first 10 seconds
///////////////////////////////////////////////



setTimeout(function () {
    mygame.animateTintOtherPlayers(players[4]);
}, 24500);


setTimeout(function () {
    setTimeout(function () {
        mygame.spawnPlayer(players[0]);
    }, 1000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[1]);
    }, 1000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[2]);
    }, 2000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[3]);
    }, 3000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[4]);
    }, 4000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[5]);
    }, 5000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[6]);
    }, 6000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[7]);
    }, 7000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[8]);
    }, 8000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[9]);
    }, 9000 / GGS);
//END OF SPAWNING
//END OF SPAWNING

//Make all the players run a specific animation [LOSE].
    setTimeout(function () {
        for (i = 0; i < 10; i++) {
            mygame.animatePlayerLose(players[i]);
        }
    }, 11000 / GGS);

//Make all the players run a specific animation [WAIT].

    setTimeout(function () {
        for (i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                mygame.animatePlayerWait(players[i]);
            }
        }
    }, 13000 / GGS);


    setTimeout(function () {
        for (i = 0; i < 10; i++) {

            if (i % 2 == 1) {
                mygame.animatePlayerWin(players[i]);
            }
        }
    }, 14000 / GGS);



    setTimeout(function () {
        for (i = 0; i < 10; i++) {

            if (i % 3 == 2) {
                mygame.animatePlayerLose(players[i]);
            }
        }
    }, 16000 / GGS);
}, 3000 / GGS);

setTimeout(function () {
    mygame.setGameTitleBar(gameInformation);
}, 2250 / GGS);





setTimeout(function () {

    mygame.display_game_marker(firstsetofdata);


}, 2000 / GGS);
setTimeout(function () {

    mygame.display_game_marker(firstsetofdata2);

}, 9000 / GGS);





betz.forEach(dosomethingspecial);
function dosomethingspecial(element, index, array) {

    setTimeout(function () {
        mygame.animateBet(element);
    }, 16000 / GGS);

}


setTimeout(function () {
    mygame.animateBet(betTest);

}, 17000 / GGS);
setTimeout(function () {
    mygame.animateBet(betTest2);
    mygame.animateYouWin(youwin2);
}, 18000 / GGS);

setTimeout(function () {
    mygame.animateBet(betTest3);
}, 19000 / GGS);
setTimeout(function () {
    mygame.animateBet(betTest);
    mygame.animateYouWin(youwin3);
}, 20000 / GGS);
setTimeout(function () {
    mygame.animateBet(betTest2);
}, 21000 / GGS);

setTimeout(function () {
    mygame.animateBet(betTest3);
}, 22000 / GGS);
setTimeout(function () {
    mygame.animateBet(betTest);
    mygame.animateYouWin(youwin4);
}, 23000 / GGS);
setTimeout(function () {
    mygame.animateBet(betTest2);
}, 24000 / GGS);

setTimeout(function () {
    mygame.animateBet(betTest3);
}, 24000 / GGS);


setTimeout(function () {
    mygame.removePlayer(players[3]);
    mygame.display_game_marker(disconnected[3]);
}, 26000 / GGS);


var youwin = {
    player: 1,
    balance: 490,
    ammount: 50,
};

var youwin2 = {
    ammount: 400,
}

var youwin3 = {
    ammount: 120,
}

var youwin4 = {
    ammount: 840,
}

setTimeout(function () {

    mygame.animateYouWin(youwin);


}, 7000 / GGS);


setTimeout(function () {
    mygame.animateBalanceDisplayChange(youwin);
}
, 6000 / GGS);


setTimeout(function () {

}, 27500);

setTimeout(function () {
    mygame.animatePlayerReceiveBet(players[5]);
}, 28000);



setTimeout(function () {
//    mygame.animatePlayerReceiveBet(players[1]);
}, 29000);



var bet1 = {
    playerNumber: 2,
    ammount: 100,
};
var bet2 = {
    playerNumber: 7,
    ammount: 100,
};
var bet3 = {
    playerNumber: 4,
    ammount: 100,
};
var bet4 = {
    playerNumber: 9,
    ammount: 100,
};
var bet5 = {
    playerNumber: 3,
    ammount: 100,
};
var bet6 = {
    playerNumber: 8,
    ammount: 100,
};
var bet7 = {
    playerNumber: 5,
    ammount: 100,
};
setTimeout(function () {
    mygame.animateBet(bet1);
}, 30000 / GGS);
setTimeout(function () {
    mygame.animateBet(bet2);
}, 30500 / GGS);
setTimeout(function () {
    mygame.animateBet(bet3);
}, 31000 / GGS);
setTimeout(function () {
    mygame.animateBet(bet4);
}, 31500 / GGS);
setTimeout(function () {
    mygame.animateBet(bet5);
}, 32000 / GGS);
setTimeout(function () {
    mygame.animateBet(bet6);
}, 32500 / GGS);
setTimeout(function () {
    mygame.animateBet(bet7);
}, 33000 / GGS);
setTimeout(function () {
    mygame.removePlayer(players[5]);
    mygame.display_game_marker(disconnected[5]);
}, 35500 / GGS);

setTimeout(function () {
    mygame.animatePlayerReceiveBet(players[1]);
}, 38500);



var joined5 = {
    markerImage: "testImage",
    markerMessage: "Player 5 has rejoined the match.",
    fadeInSec: 1,
    timeToShow: 1,
    fadeOutSec: 1,
    repeatTimes: 1,
};
var joined4 = {
    markerImage: "testImage",
    markerMessage: "Player 4 has rejoined the match.",
    fadeInSec: 1,
    timeToShow: 1,
    fadeOutSec: 1,
    repeatTimes: 1,
};

setTimeout(function () {

    mygame.spawnPlayer(players[4]);

    mygame.display_game_marker(joined[5]);


}, 41000);

setTimeout(function () {
    mygame.spawnPlayer(players[2]);
    mygame.display_game_marker(joined[3]);

}, 44000);

setTimeout(function () {
    mygame.animatePlayerReceiveBet(players[2]);
}, 47500);
