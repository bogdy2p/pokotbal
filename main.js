//Global game speed,  increase to run faster for testing  [up-to 4 for a ok result]
var SHOWALL = false;
var GGS = 1;




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
            cc.view.enableRetina(false);
            // Adjust viewport meta
            cc.view.adjustViewPort(true);
            // Setup the resolution policy and design resolution size
            cc.view.setDesignResolutionSize(1100, 650, cc.ResolutionPolicy.SHOW_ALL);
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
    updatePlayerData: function (playerdata) {
        var event = new cc.EventCustom("event_set_player_data");
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
    animateBet: function (data) {
        var event = new cc.EventCustom("event_animate_betting");
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
};

var players = [];
for (i = 0; i < 10; i++) {
    var thename = "player" + i;
    players[i] = {
        playerNumber: i,
        number: i,
        name: thename,
        amount: "0"
    };
}
//  ACTUALLY START THE GAME HERE !
//  ACTUALLY START THE GAME HERE !
//  ACTUALLY START THE GAME HERE !
mygame.start();
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////


///////////////////////////////////////////////
//Spawn all players during the first 5 seconds
///////////////////////////////////////////////

setTimeout(function () {
    setTimeout(function () {
        mygame.spawnPlayer(players[0]);
    }, 200 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[1]);
    }, 500 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[2]);
    }, 800 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[3]);
    }, 1100 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[4]);
    }, 1400 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[5]);
    }, 1700 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[6]);
    }, 2000 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[7]);
    }, 2300 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[8]);
    }, 2600 / GGS);
    setTimeout(function () {
        mygame.spawnPlayer(players[9]);
    }, 2900 / GGS);
}, 1500);
//END OF SPAWNING==============================================================
//END OF SPAWNING==============================================================

//Make all the players run a specific animation [LOSE].
setTimeout(function () {
    for (i = 0; i < 10; i++) {
        mygame.animatePlayerLose(players[i]);
    }
}, 11000 / GGS);

//END OF ACTION ==============================================================




//betz.forEach(dosomethingspecial);
//function dosomethingspecial(element, index, array) {
//
//    setTimeout(function () {
////        mygame.animateBet(element);
//
//    }, 16000 / GGS);
//
//}

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
