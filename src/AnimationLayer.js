var AnimationLayer = cc.Layer.extend({
    currentPosition: 0,
    spriteSheet: null,
    loseSpriteSheet: null,
    pedroAnimationAction: null,
    spawnPlayerAction: null,
    seconds: null,
    asd2: null,
    sprite: null,
    ctor: function () {
        this._super();
        this.init();

    },
    init: function () {
        this._super();

        //Schedule the timer clock update to every second
        this.schedule(this.updateGameClock, 1);
        //===============================================

        this.spawnPlayer(0, "vasile", 1000);
        this.spawnPlayer(6, "ionut", 10);
        this.spawnPlayer(7, "gheorghe", 10);




    },
    spawnPlayer: function (number, name, ammount) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[number];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;
//        cc.log("PlayerZ " + player_z);
        cc.spriteFrameCache.addSpriteFrames(res.Pedro90_plist);
        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedro90_png);
        var childname = "player_" + number;
        var asd = new Player(thisplayer, object);
        backgroundLayer.addChild(this.loseSpriteSheet, player_z , childname);

    },
    updateGameClock: function (dt) {
        this.seconds += dt;
        var seconds = Math.floor(this.seconds);
        var UserInterfaceLayer = this.getParent().getChildByTag(TagOfLayer.UserInterface);
        UserInterfaceLayer.updateTimerClock(seconds);
        

    },
    rand1: function (dt) {


//        this.playerWin(1, "asd", 10);
//        cc.log(dt);
    },
    update: function (dt) {


//        this.playerLose(1, "asd", 10);
//        this.playerWin(3, "WONN", 10);
//        this.playerWait(7, "IONUT", 1000);
//        this.seconds += dt * 220;
//        this.seconds += dt;
//        var seconds = Math.floor(this.seconds);
//        cc.log(seconds);
//        var UserInterfaceLayer = this.getParent().getChildByTag(TagOfLayer.UserInterface);
//        UserInterfaceLayer.updateTimerClock(seconds);
        //RESET AND SWITCH TO SECOND ROUND ?
//        if ((seconds > 0) && (seconds > 2700)) {
//            cc.director.pause();
//
//            cc.director.runScene(new PlayScene2(), this);
//            cc.director.resume();
//        }
    }

});
