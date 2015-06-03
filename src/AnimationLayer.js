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
        this.spawnPlayer(1, "Player1", 10);
        this.spawnPlayer(2, "asd", 10);




    },
    spawnPlayer: function (number, name, ammount) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerPositions[number];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;

        cc.spriteFrameCache.addSpriteFrames(res.Pedro90_plist);
        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedro90_png);



        var asd = new Player(thisplayer, object);

//        thisplayer.setScale(1);
        this.addChild(this.loseSpriteSheet, player_z);


//        thisplayer.setScale(1);
//        thisplayer.setAnchorPoint(0, 0);
//        this.addChild(this.loseSpriteSheet, player_z);
//        var animFrames = [];
//        for (var i = 1; i < 6; i++) {
//            var str = "win" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFrames.push(frame);
//        }
//        var initialframe = cc.spriteFrameCache.getSpriteFrame("win1.png");
//        animFrames.push(initialframe);
//        var animation = new cc.Animation(animFrames, 0.4);
//        this.spawnPlayerAction = new cc.repeat(new cc.Animate(animation), 2);
//        this.sprite = new cc.Sprite("#" + str);
//        this.sprite.attr({x: object.x, y: object.y});
//        this.sprite.runAction(this.spawnPlayerAction);
//        this.loseSpriteSheet.addChild(this.sprite, player_z);
//
//        if (object.y > 500) {
//            var playerPopUp = new cc.Sprite(res.P_popupOverGrey);
//            playerPopUp.attr({x: object.x, y: object.y + 120});
//            thisplayer.addChild(playerPopUp, 4);
//        } else {
//            var playerPopUp = new cc.Sprite(res.P_popupUnderGrey);
//            playerPopUp.attr({x: object.x, y: object.y - 120});
//            thisplayer.addChild(playerPopUp, 4);
//        }
//
//
////        Add the name on the popup of the player.
//        var nameLabel = new cc.LabelTTF(name, "Helvetica", 16);
//        nameLabel.setColor(cc.color(255, 255, 255));
//        nameLabel.setAnchorPoint(0.5, 0.5);
////        cc.log(playerPopUp);
////        nameLabel.setPosition(cc.p());
//        nameLabel.setPosition(cc.p(playerPopUp.width / 2, playerPopUp.height / 2 + 10));
//        playerPopUp.addChild(nameLabel);
//
//        //=========================================
//
////        Add the current player SUM on the popup of the player.
//        var playerAmmount = new cc.LabelTTF("£ " + ammount, "Helvetica", 16);
//        playerAmmount.setColor(cc.color(255, 255, 255));
//        playerAmmount.setAnchorPoint(0.5, 0.5);
//        playerAmmount.setPosition(cc.p(playerPopUp.width / 2, playerPopUp.height / 2 - 10));
//        playerPopUp.addChild(playerAmmount);
////        =========================================

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
