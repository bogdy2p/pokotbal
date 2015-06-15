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
    animatePlayerWin: function (data) {
        var event = new cc.EventCustom("event_player_winning");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerLoseA: function (data) {
        var event = new cc.EventCustom("event_player_losing_a");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerLoseB: function (data) {
        var event = new cc.EventCustom("event_player_losing_b");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerWaitA: function (data) {
        var event = new cc.EventCustom("event_player_waiting_a");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerWaitB: function (data) {
        var event = new cc.EventCustom("event_player_waiting_b");
        event.setUserData(data);
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
    animateActivatePlayer: function (data) {
        var event = new cc.EventCustom("event_activate_player");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animateCircleText: function (data) {
        var event = new cc.EventCustom("event_animate_circle_label");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    displayPopUpWinSelf: function (data) {
        var event = new cc.EventCustom("event_display_popup_win_self");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    displayPopUpWinOthers: function (data) {
        var event = new cc.EventCustom("event_display_popup_win_others");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    deActivatePlayers: function (data) {
        var event = new cc.EventCustom("event_deactivate_all_players");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    spawnThePotFlag: function (data) {
        var event = new cc.EventCustom("event_spawn_the_pot_flag");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    removeThePotFlag: function (data) {
        var event = new cc.EventCustom("event_remove_the_pot_flag");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    }
};
var players = [];
for (i = 0; i < 10; i++) {
    var thename = "player" + i;
    players[i] = {
        playerNumber: i,
//        number: i,
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


//new runPlayer1Stuff(2500);
//new runPlayer2Stuff(4200);
///////////////////////////////////////////////
//Spawn all players during the first 5 seconds
///////////////////////////////////////////////
//
//
//setTimeout(function () {
//    setTimeout(function () {
//        mygame.spawnPlayer(players[0]);
//    }, 200 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[1]);
//    }, 500 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[2]);
//    }, 800 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[3]);
//    }, 1100 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[4]);
//    }, 1400 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[5]);
//    }, 1700 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[6]);
//    }, 2000 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[7]);
//    }, 2300 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[8]);
//    }, 2600 / GGS);
//    setTimeout(function () {
//        mygame.spawnPlayer(players[9]);
//    }, 2900 / GGS);
//}, 4000);
//END OF SPAWNING==============================================================
//END OF SPAWNING==============================================================

//Make all the players run a specific animation [LOSE].
//setTimeout(function () {
//    for (i = 0; i < 7; i++) {
//        mygame.animatePlayerLose(players[i]);
//    }
//}, 6000 / GGS);

//END OF ACTION ==============================================================

//setTimeout(function () {
//    for (i = 0; i < 5; i++) {
//        mygame.animatePlayerWait(players[i]);
//    }
//}, 12400 / GGS);
//
//setTimeout(function () {
//    for (i = 5; i < 7; i++) {
//        mygame.animatePlayerLose(players[i]);
//    }
//}, 12400 / GGS);
//
//
//setTimeout(function () {
//    for (i = 0; i < 5; i++) {
//        mygame.animatePlayerLose(players[i]);
//    }
//}, 21000 / GGS);
//
//setTimeout(function () {
//    for (i = 5; i < 7; i++) {
//        mygame.animatePlayerWait(players[i]);
//    }
//}, 21000 / GGS);



//betz.forEach(dosomethingspecial);
//function dosomethingspecial(element, index, array) {
//
//    setTimeout(function () {
////        mygame.animateBet(element);
//
//    }, 16000 / GGS);
//
//}
//


//function runPlayer1Stuff(startTime) {
//
////    var startTime = 2000;
//    console.log("Spawning at " + startTime);
//
//    var player1Tests = setTimeout(function () {
//        mygame.spawnPlayer({playerNumber: 4, name: 'FirstPl', amount: 500});
//    }, startTime);
//    
//
//    setTimeout(function () {
//        mygame.animatePlayerWaitA({playerNumber: 4, animationLength: 2});
//    }, startTime);
//    startTime += 2000 * 2;
//    console.log("Waiting at " + startTime);
//
//    setTimeout(function () {
//        mygame.animatePlayerLoseA({playerNumber: 4, animationLength: 2});
//    }, startTime);
//    startTime += 2000 * 2;
//    console.log("Losing at " + startTime);
//
//    setTimeout(function () {
//        mygame.animatePlayerWaitB({playerNumber: 4, animationLength: 3});
//    }, startTime);
//    startTime += 2000 * 3;
//    console.log("Waiting at " + startTime);
//    
//     setTimeout(function () {
//        mygame.animatePlayerLoseB({playerNumber: 4, animationLength: 2});
//    }, startTime);
//    startTime += 2000 * 2;
//    console.log("Losing at " + startTime);
//    
//    
//    
//    
//    
//    
//    return player1Tests;
//}
//
//
//function runPlayer2Stuff(startTime) {
//
////    var startTime = 3000;
//    console.log("Spawning at " + startTime);
//
//    var player2Tests = setTimeout(function () {
//        mygame.spawnPlayer({playerNumber: 8, name: 'SecondPl', amount: 500});
//    }, startTime);
//    
//
//    setTimeout(function () {
//        mygame.animatePlayerWaitA({playerNumber: 8, animationLength: 2});
//    }, startTime);
//    startTime += 2000 * 2;
//    console.log("Waiting at " + startTime);
//
//    setTimeout(function () {
//        mygame.animatePlayerLose({playerNumber: 8, animationLength: 2});
//    }, startTime);
//    startTime += 2000 * 2;
//    console.log("Losing at " + startTime);
//
//    setTimeout(function () {
//        mygame.animatePlayerWaitA({playerNumber: 8, animationLength: 6});
//    }, startTime);
//    startTime += 2000 * 6;
//    console.log("Waiting at " + startTime);
//    return player2Tests;
//}
//

function playGame1(startTime) {

//    var startTime = 2000;
    console.log("Spawning Player 4.  Time:  " + startTime);
    var player1Tests = setTimeout(function () {
        mygame.spawnPlayer({playerNumber: 4, name: 'FOUR', amount: 500});
    }, startTime);
    setTimeout(function () {
        mygame.animatePlayerWaitA({playerNumber: 4, animationLength: 2});
    }, startTime);
    console.log("Waiting at " + startTime);
    startTime += 2000 * 2;
    setTimeout(function () {
        console.log("Spawning Player 7.  Time:  " + startTime);
        mygame.spawnPlayer({playerNumber: 7, name: 'SEVEN', amount: 700});
    }, startTime);
    setTimeout(function () {
        mygame.animatePlayerWaitB({playerNumber: 4, animationLength: 3});
    }, startTime);
    console.log("P4 Waiting at " + startTime);
    startTime += 2000 * 3;
    setTimeout(function () {
        mygame.animatePlayerWaitA({playerNumber: 4, animationLength: 2});
    }, startTime);
    console.log("P4 Waiting at " + startTime);
    startTime += 2000 * 2;
//
//    setTimeout(function () {
//        mygame.animatePlayerLoseB({playerNumber: 4, animationLength: 2});
//    }, startTime);
//    startTime += 2000 * 2;
//    console.log("Losing at " + startTime);

    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 4});
        mygame.animateBet({playerNumber: 4});
        mygame.updatePlayerData({playerNumber: 4, name: "FOUR", amount: 400});
    }, startTime);
    console.log("P4 Has Bet !    @ " + startTime);
    startTime += 2000;
    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 7});
        mygame.animateBet({playerNumber: 7});
        mygame.updatePlayerData({playerNumber: 7, name: "SEVEN", amount: 600});
    }, startTime);
    startTime += 2000;
    //
    setTimeout(function () {
        mygame.displayPopUpWinSelf(
                {
                    timeToDisplay: 3,
                    playerName: "FOUR",
                    amount: 200
                }

        );
    }, startTime);
    cc.log('Win Popup Displayed @ ' + startTime);
    startTime += 3000;
    setTimeout(function () {
        mygame.animatePlayerReceiveBet(players[4]);
        mygame.updatePlayerData({playerNumber: 4, name: "FOUR", amount: 600});
    }, startTime);
    cc.log('Receive bet animation @ ' + startTime);
    startTime += 3200;
    //Player 2 joins the game

    setTimeout(function () {

        mygame.spawnPlayer(
                {playerNumber: 2, name: 'TWO', amount: 500}
        );
        cc.log("Player TWO Has joine the game");
    }, startTime);
    startTime += 5000;
//===============================================================================//

    setTimeout(function () {

        mygame.animateActivatePlayer({playerNumber: 4});
        mygame.animateBet({playerNumber: 4});
        mygame.updatePlayerData({playerNumber: 4, name: "FOUR", amount: 400});
    }, startTime);
    startTime += 2200;
    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 2});
        mygame.animateBet({playerNumber: 2});
        mygame.updatePlayerData({playerNumber: 2, name: "TWO", amount: 300});
    }, startTime);
    startTime += 2200;
    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 7});
        //THIS PLAYER DOES NOT BET RIGHT NOW
//        mygame.animateBet({playerNumber: 7});
        mygame.updatePlayerData({playerNumber: 7, name: "SEVEN", amount: 600});
    }, startTime);
    startTime += 2200;
    setTimeout(function () {
        mygame.displayPopUpWinOthers(
                {
                    timeToDisplay: 3,
                    playerName: "TWO",
                    amount: 700
                }
        );
        mygame.animateActivatePlayer({playerNumber: 2});
        mygame.animatePlayerReceiveBet(players[2]);
        mygame.updatePlayerData({playerNumber: 2, name: "TWO", amount: 700});
    }, startTime);
    startTime += 1000;
    setTimeout(function () {
        mygame.deActivatePlayers();
    }, startTime);
}

setTimeout(function () {
//    playGame1(300);
}, 2000);

