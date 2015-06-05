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


//setTimeout(function () {
//    var event = new cc.EventCustom("game_custom_event1");
//    event.setUserData("VAAAAASILEUSERDATA");
//    cc.eventManager.dispatchEvent(event);
//}, 5000);
//



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
    }
}

var player1 = {
    number: 0,
    name: "vasile",
    ammount: 400
}

var player7 = {
    number: 6,
    name: "player7",
    ammount: 100
}

var player9 = {
    number: 8,
    name: "player9",
    ammount: 50
}

var moved = {
    playerNumber: 0,
    positionX: 200,
    positionY: 800,
}
var moved2 = {
    playerNumber: 0,
    positionX: 1200,
    positionY: 800,
}

mygame.start();
setTimeout(function () {
//    mygame.animatePlayer(1);

    mygame.spawnPlayer(player1);
    setTimeout(function () {
        mygame.spawnPlayer(player7);
    }, 500);
    setTimeout(function () {
        mygame.spawnPlayer(player9);
    }, 1000);

    setTimeout(function () {
        mygame.animatePlayerWin(moved);
//        console.log(mygame);
    }, 2000);
    
      setTimeout(function () {
        mygame.animatePlayerWin(moved2);
//        console.log(mygame);
    }, 4600);



}, 3000);
