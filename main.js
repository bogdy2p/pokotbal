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
                cc.director.runScene(new PlayScene());
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
    animatePlayerLose: function (data) {
        var event = new cc.EventCustom("event_animate_player_lose");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animatePlayerWait: function (data) {
        var event = new cc.EventCustom("event_player_waiting_random");
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
    animateGetThePot: function (data) {
        var event = new cc.EventCustom("event_animate_player_receiving_bets");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    animateActivatePlayer: function (data) {
        var event = new cc.EventCustom("event_activate_player");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    deActivatePlayers: function (data) {
        var event = new cc.EventCustom("event_deactivate_all_players");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    spawnAndUpdateThePotFlag: function (data) {
        var event = new cc.EventCustom("event_spawn_and_update_the_pot_flag");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    removeThePotFlag: function (data) {
        var event = new cc.EventCustom("event_remove_the_pot_flag");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },
    playWinningAnimation: function (data) {
        var event = new cc.EventCustom("event_big_winning_animation");
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    }
};
//Hardcode informatons for Players Testing
var players = [];
for (i = 0; i < 10; i++) {
    var thename = "player" + i;
    players[i] = {
        playerNumber: i,
//        number: i,
        playerModel: (i % 5 + 1),
        animationLength: 2,
        name: thename,
        amount: "0"
    };
}
mygame.start();
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////



function playGame1(startTime) {

    if (!startTime) {
        var startTime = 2000;
    }
    console.log("Spawning Player 4.  Time:  " + startTime);
    var player1Tests = setTimeout(function () {
        mygame.spawnPlayer({playerNumber: 4, playerModel: 5, name: 'FOUR', amount: 500});
    }, startTime);
    setTimeout(function () {
        mygame.animatePlayerWaitA({playerNumber: 4, playerModel: 5, animationLength: 2});
    }, startTime);
    console.log("Waiting at " + startTime);
    startTime += 2000 * 2;
    setTimeout(function () {
        console.log("Spawning Player 8.  Time:  " + startTime);
        mygame.spawnPlayer({playerNumber: 8, playerModel: 4, name: 'EIGHT', amount: 700});
    }, startTime);
    setTimeout(function () {
        console.log("Player 8 should animate Wait A here");
        mygame.animatePlayerWaitA({playerNumber: 8, playerModel: 4, animationLength: 2});
    }, startTime + 1000);
    setTimeout(function () {
        console.log("Player 8 should animate Wait A here");
        mygame.animatePlayerWaitA({playerNumber: 8, playerModel: 4, animationLength: 2});
    }, startTime + 3000);


    setTimeout(function () {
        mygame.animatePlayerWaitB({playerNumber: 4, playerModel: 5, animationLength: 3});
    }, startTime);
    console.log("P4 Waiting at " + startTime);
    startTime += 2000 * 3;
    setTimeout(function () {
        mygame.animatePlayerWaitA({playerNumber: 4, playerModel: 5, animationLength: 2});
    }, startTime);
    console.log("P4 Waiting at " + startTime);
    startTime += 2000 * 2;
    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 4, playerModel: 5});
        mygame.animateBet({playerNumber: 4, playerModel: 5});
        mygame.updatePlayerData({playerNumber: 4, playerModel: 5, name: "FOUR", amount: 400});
    }, startTime);
    console.log("P4 Has Bet !    @ " + startTime);
    startTime += 2000;
    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 8, playerModel: 4});
        mygame.animateBet({playerNumber: 8, playerModel: 4});
        mygame.updatePlayerData({playerNumber: 8, playerModel: 4, name: "EIGHT", amount: 600});
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
        mygame.updatePlayerData({playerNumber: 4, playerModel: 5, name: "FOUR", amount: 600});
    }, startTime);
    cc.log('Receive bet animation @ ' + startTime);
    startTime += 3200;
    setTimeout(function () {
        mygame.spawnPlayer(
                {playerNumber: 2, playerModel: 3, name: 'TWO', amount: 500}
        );
        cc.log("Player TWO Has joine the game");
    }, startTime);
    startTime += 5000;
//===============================================================================//

    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 4, playerModel: 5});
        mygame.animateBet({playerNumber: 4, playerModel: 5});
        mygame.updatePlayerData({playerNumber: 4, playerModel: 5, name: "FOUR", amount: 400});
    }, startTime);
    startTime += 2200;
    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 2, playerModel: 3});
        mygame.animateBet({playerNumber: 2, playerModel: 3});
        mygame.updatePlayerData({playerNumber: 2, playerModel: 3, name: "TWO", amount: 300});
    }, startTime);
    startTime += 2200;
    setTimeout(function () {
        mygame.animateActivatePlayer({playerNumber: 8, playerModel: 4});
        //THIS PLAYER DOES NOT BET RIGHT NOW
//        mygame.animateBet({playerNumber: 7});
        mygame.updatePlayerData({playerNumber: 8, playerModel: 4, name: "SEVEN", amount: 600});
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
        mygame.animateActivatePlayer({playerNumber: 2, playerModel: 3});
        mygame.animatePlayerReceiveBet(players[2]);
        mygame.updatePlayerData({playerNumber: 2, playerModel: 3, name: "TWO", amount: 700});
    }, startTime);
    startTime += 1000;
    setTimeout(function () {
        mygame.deActivatePlayers();
    }, startTime);
}
setTimeout(function () {
//    playGame1(500);
}, 2000);

