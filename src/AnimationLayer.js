var AnimationLayer = cc.Layer.extend({
    currentPosition: 0,
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    player5: null,
    player6: null,
    player7: null,
    player8: null,
    player9: null,
    player10: null,
    spriteSheet: null,
    loseSpriteSheet: null,
    pedroAnimationAction: null,
    spawnPlayerAction: null,
    seconds: null,
    asd2: null,
//    parentClass: this.getParent(),
    sprite: null,
    ctor: function () {
        this._super();
        this.init();

    },
    init: function () {
        this._super();

//        cc.spriteFrameCache.addSpriteFrames(res.Pedroanimation_plist);
//        this.spriteSheet = new cc.SpriteBatchNode(res.Pedroanimation_png);
//        this.addChild(this.spriteSheet);
//        var animFrames = [];
//        for (var i = 0; i < 10; i++) {
//            var str = "player" + (i + 1) + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFrames.push(frame);
//        }
//        var animation = new cc.Animation(animFrames, 0.3);
//        this.pedroAnimationAction = new cc.repeatForever(new cc.Animate(animation));
//        this.sprite = new cc.Sprite("#player1.png");
//        this.sprite.attr({x: 700, y: 400});
//        this.sprite.runAction(this.pedroAnimationAction);
//        this.spriteSheet.addChild(this.sprite, 2);

        //Schedule the timer clock update to every second
        this.schedule(this.updateGameClock, 1);
        //===============================================

//        this.schedule(this.rand1, 6);

//        this.scheduleUpdate();
//        this.player1 = this.spawnPlayer(0, "ASD", 10);
//        this.player2 = this.spawnPlayer(1, "ASD", 10);
//        this.spawnPlayer();
//        this.spawnPlayer(2, "VASILE", 100);
//        this.playerLose(1, "asd", 10);

//        var asd = addNewPlayer(5,"asd",10);


        this.addPlayer(0, "Player1", 10);
        this.addPlayer(1, "Player2", 10);
        this.addPlayer(2, "Player3", 10);
        this.addPlayer(3, "Vasile", 10);
        this.addPlayer(4, "Pedro", 10);
        this.addPlayer(5, "Player6", 10);
        this.addPlayer(6, "Player7", 10);
        this.addPlayer(7, "asd", 10);
        this.addPlayer(8, "Player9", 10);
        this.addPlayer(9, "Player10", 10);


    },
    addPlayer: function (number, name, ammount) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerPositions[number];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;
//        var str = "player" + player_no;
//        this.currentPosition++;
        cc.spriteFrameCache.addSpriteFrames(res.Pedro90_plist);
        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedro90_png);
        thisplayer.setScale(1);
        thisplayer.setAnchorPoint(0, 0);
        this.addChild(this.loseSpriteSheet, player_z);
        var animFrames = [];
        for (var i = 1; i < 6; i++) {
            var str = "win" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var initialframe = cc.spriteFrameCache.getSpriteFrame("win1.png");
        animFrames.push(initialframe);
        var animation = new cc.Animation(animFrames, 0.4);
        this.spawnPlayerAction = new cc.repeat(new cc.Animate(animation), 2);
        this.sprite = new cc.Sprite("#" + str);
        cc.log(object.x);
        this.sprite.attr({x: object.x, y: object.y});
        cc.log(this.sprite.getContentSize());
        this.sprite.runAction(this.spawnPlayerAction);
        this.loseSpriteSheet.addChild(this.sprite, player_z);

        if (object.y > 500) {
            var playerPopUp = new cc.Sprite(res.P_popupOverGrey);
            playerPopUp.attr({x: object.x, y: object.y + 120});
            thisplayer.addChild(playerPopUp, 4);
        } else {
            var playerPopUp = new cc.Sprite(res.P_popupUnderGrey);
            playerPopUp.attr({x: object.x , y: object.y - 120});
            thisplayer.addChild(playerPopUp, 4);
        }


//        Add the name on the popup of the player.
        var nameLabel = new cc.LabelTTF(name, "Helvetica", 16);
        nameLabel.setColor(cc.color(255, 255, 255));
        nameLabel.setAnchorPoint(0.5, 0.5);
//        cc.log(playerPopUp);
//        nameLabel.setPosition(cc.p());
        nameLabel.setPosition(cc.p(playerPopUp.width / 2, playerPopUp.height/ 2 + 10));
        playerPopUp.addChild(nameLabel);

        //=========================================

//        Add the current player SUM on the popup of the player.
        var playerAmmount = new cc.LabelTTF("£ " + ammount, "Helvetica", 16);
        playerAmmount.setColor(cc.color(255, 255, 255));
        playerAmmount.setAnchorPoint(0.5, 0.5);
        playerAmmount.setPosition(cc.p(playerPopUp.width / 2, playerPopUp.height / 2 - 10));
        playerPopUp.addChild(playerAmmount);
//        =========================================

        

    },
//    spawnPlayer: function (number, name, ammount) {
//
//        var player_no = number;
//        var number = player_no;
//
//        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//        var object = playerPositions[number];
//
//        var player_x = object.x;
//        var player_y = object.y;
//        var player_z = object.zIndex;
//
//        var str = "player" + player_no;
////        this.currentPosition++;
//
//        cc.spriteFrameCache.addSpriteFrames(res.ThreePlayers_plist);
//        var thisplayer = this.spriteSheet = new cc.SpriteBatchNode(res.ThreePlayers_png);
//        this.addChild(this.spriteSheet, player_z);
//        var animFrames = [];
//        for (var i = 0; i < 10; i++) {
//            var str = "player" + player_no + "_" + (i + 1) + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
////            cc.log(frame);
//            animFrames.push(frame);
//        }
//
////        cc.log(animFrames);
//        var animation = new cc.Animation(animFrames, 0.3);
//        this.spawnPlayerAction = new cc.repeatForever(new cc.Animate(animation));
//        this.sprite = new cc.Sprite("#" + str);
////        cc.log(this.sprite);
//        this.sprite.attr({x: object.x, y: object.y});
//        this.sprite.runAction(this.spawnPlayerAction);
//        this.spriteSheet.addChild(this.sprite, player_z);
//
//        if (object.y > 500) {
//            var playerPopUp = new cc.Sprite(res.P_popupOverGrey);
//            playerPopUp.attr({x: object.x, y: object.y + 120});
//            thisplayer.addChild(playerPopUp, 4);
//        } else {
//            var playerPopUp = new cc.Sprite(res.P_popupUnderGrey);
//            playerPopUp.attr({x: object.x, y: object.y + 120});
//            thisplayer.addChild(playerPopUp, 4);
//        }
//
//
//        //Add the name on the popup of the player.
//        var nameLabel = new cc.LabelTTF(name, "Helvetica", 16);
//        nameLabel.setColor(cc.color(255, 255, 255));
//        nameLabel.setAnchorPoint(0, 0);
////        cc.log(playerPopUp);
//
//        nameLabel.setPosition(cc.p(playerPopUp.x - nameLabel.width / 2, playerPopUp.y + nameLabel.height / 2.5));
//        this.addChild(nameLabel);
//
//        //=========================================
//
//
//        //Add the current player SUM on the popup of the player.
//        var playerAmmount = new cc.LabelTTF("£ " + ammount, "Helvetica", 16);
//        playerAmmount.setColor(cc.color(255, 255, 255));
//        playerAmmount.setAnchorPoint(0, 0);
//        playerAmmount.setPosition(cc.p(playerPopUp.x - playerAmmount.width / 2, playerPopUp.y - playerAmmount.height / 1.75));
//        this.addChild(playerAmmount);
//        //=========================================
//
//
//
//
//
//
//
//    },
//    playerLose: function (number, name, ammount) {
//
//        var player_no = number;
//        var number = player_no;
//
//        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//        var object = playerPositions[number];
//
//        var player_x = object.x;
//        var player_y = object.y;
//        var player_z = object.zIndex;
//
////        var str = "player" + player_no;
////        this.currentPosition++;
//
//        cc.spriteFrameCache.addSpriteFrames(res.Pedrofull_plist);
//
//        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedrofull_png);
//        thisplayer.setScale(1);
//        this.addChild(this.loseSpriteSheet, player_z);
//        var animFrames = [];
//        for (var i = 1; i < 6; i++) {
//
//
//            var str = "lose" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
////            cc.log(frame);
//            animFrames.push(frame);
//        }
//
//        var initialframe = cc.spriteFrameCache.getSpriteFrame("lose1.png");
//        animFrames.push(initialframe);
//        var animation = new cc.Animation(animFrames, 0.4);
//        this.spawnPlayerAction = new cc.repeat(new cc.Animate(animation), 2);
//        this.sprite = new cc.Sprite("#" + str);
////        cc.log(this.sprite);
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
//            playerPopUp.attr({x: object.x, y: object.y + 120});
//            thisplayer.addChild(playerPopUp, 4);
//        }
//
//
//        //Add the name on the popup of the player.
//        var nameLabel = new cc.LabelTTF(name, "Helvetica", 16);
//        nameLabel.setColor(cc.color(255, 255, 255));
//        nameLabel.setAnchorPoint(0, 0);
////        cc.log(playerPopUp);
//
//        nameLabel.setPosition(cc.p(playerPopUp.x - nameLabel.width / 2, playerPopUp.y + nameLabel.height / 2.5));
//        this.addChild(nameLabel);
//
//        //=========================================
//
//        //Add the current player SUM on the popup of the player.
//        var playerAmmount = new cc.LabelTTF("£ " + ammount, "Helvetica", 16);
//        playerAmmount.setColor(cc.color(255, 255, 255));
//        playerAmmount.setAnchorPoint(0, 0);
//        playerAmmount.setPosition(cc.p(playerPopUp.x - playerAmmount.width / 2, playerPopUp.y - playerAmmount.height / 1.75));
//        this.addChild(playerAmmount);
//        //=========================================
//    },
//    playerWin: function (number, name, ammount) {
//
//        var player_no = number;
//        var number = player_no;
//
//        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//        var object = playerPositions[number];
//
//        var player_x = object.x;
//        var player_y = object.y;
//        var player_z = object.zIndex;
//
//        cc.log(object);
////        var str = "player" + player_no;
////        this.currentPosition++;
//
//        cc.spriteFrameCache.addSpriteFrames(res.Pedrofull_plist);
//
//        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedrofull_png);
//        thisplayer.setScale(0.6);
//        thisplayer.setAnchorPoint(0, 0);
//        this.addChild(this.loseSpriteSheet, player_z);
//        var animFrames = [];
//        for (var i = 1; i < 6; i++) {
//
//
//            var str = "win" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFrames.push(frame);
//        }
//        var initialframe = cc.spriteFrameCache.getSpriteFrame("win1.png");
//        animFrames.push(initialframe);
//        var animation = new cc.Animation(animFrames, 0.4);
//        this.spawnPlayerAction = new cc.repeat(new cc.Animate(animation), 2);
//        this.sprite = new cc.Sprite("#" + str);
//
//
//
//
//        cc.log(object.x);
//
//
//        this.sprite.attr({x: object.x, y: object.y});
//        cc.log(this.sprite.getContentSize());
//        this.sprite.runAction(this.spawnPlayerAction);
//        this.loseSpriteSheet.addChild(this.sprite, player_z);
//
////        if (object.y > 500) {
////            var playerPopUp = new cc.Sprite(res.P_popupOverGrey);
////            playerPopUp.attr({x: object.x, y: object.y + 120});
////            thisplayer.addChild(playerPopUp, 4);
////        } else {
////            var playerPopUp = new cc.Sprite(res.P_popupUnderGrey);
////            playerPopUp.attr({x: object.x, y: object.y + 120});
////            thisplayer.addChild(playerPopUp, 4);
////        }
//
//
//        //Add the name on the popup of the player.
////        var nameLabel = new cc.LabelTTF(name, "Helvetica", 16);
////        nameLabel.setColor(cc.color(255, 255, 255));
////        nameLabel.setAnchorPoint(0, 0);
//////        cc.log(playerPopUp);
////
////        nameLabel.setPosition(cc.p(playerPopUp.x - nameLabel.width / 2, playerPopUp.y + nameLabel.height / 2.5));
////        this.addChild(nameLabel);
//
//        //=========================================
//
//        //Add the current player SUM on the popup of the player.
////        var playerAmmount = new cc.LabelTTF("£ " + ammount, "Helvetica", 16);
////        playerAmmount.setColor(cc.color(255, 255, 255));
////        playerAmmount.setAnchorPoint(0, 0);
////        playerAmmount.setPosition(cc.p(playerPopUp.x - playerAmmount.width / 2, playerPopUp.y - playerAmmount.height / 1.75));
////        this.addChild(playerAmmount);
//        //=========================================
//    },
//    playerWait: function (number, name, ammount) {
//
//        var player_no = number;
//        var number = player_no;
//
//        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//        var object = playerPositions[number];
//
//        var player_x = object.x;
//        var player_y = object.y;
//        var player_z = object.zIndex;
//
////        var str = "player" + player_no;
////        this.currentPosition++;
//
//        cc.spriteFrameCache.addSpriteFrames(res.Pedrofull_plist);
//
//        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedrofull_png);
//        thisplayer.setScale(0.7);
//        this.addChild(this.loseSpriteSheet, player_z);
//        var animFrames = [];
//        for (var i = 1; i < 6; i++) {
//
//            var str = "wait" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFrames.push(frame);
//        }
//        var initialframe = cc.spriteFrameCache.getSpriteFrame("wait1.png");
//        animFrames.push(initialframe);
//
//        var animation = new cc.Animation(animFrames, 0.4);
//        this.spawnPlayerAction = new cc.repeat(new cc.Animate(animation), 2);
//        this.sprite = new cc.Sprite("#" + str);
////        cc.log(this.sprite);
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
//            playerPopUp.attr({x: object.x, y: object.y + 120});
//            thisplayer.addChild(playerPopUp, 4);
//        }
//
//        //Add the name on the popup of the player.
//        var nameLabel = new cc.LabelTTF(name, "Helvetica", 16);
//        nameLabel.setColor(cc.color(255, 255, 255));
//        nameLabel.setAnchorPoint(0, 0);
//        nameLabel.setPosition(cc.p(playerPopUp.x - nameLabel.width / 2, playerPopUp.y + nameLabel.height / 2.5));
//        this.addChild(nameLabel);
//        //=========================================
//
//        //Add the current player SUM on the popup of the player.
//        var playerAmmount = new cc.LabelTTF("£ " + ammount, "Helvetica", 16);
//        playerAmmount.setColor(cc.color(255, 255, 255));
//        playerAmmount.setAnchorPoint(0, 0);
//        playerAmmount.setPosition(cc.p(playerPopUp.x - playerAmmount.width / 2, playerPopUp.y - playerAmmount.height / 1.75));
//        this.addChild(playerAmmount);
//        //=========================================
//    },
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


//        cc.log(dt);


//        this.playerLose(1, "asd", 10);
//
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
//
//function addNewPlayer(number, name, ammount) {
//
//    var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//    var object = playerPositions[number];
//
//    var player_x = object.x;
//    var player_y = object.y;
//    var player_z = object.zIndex;
//
////        var str = "player" + player_no;
////        this.currentPosition++;
//
//    cc.spriteFrameCache.addSpriteFrames(res.Pedrofull_plist);
//
//    var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedrofull_png);
//    thisplayer.setScale(1);
//    thisplayer.setAnchorPoint(0, 0);
//    this.addChild(this.loseSpriteSheet, player_z);
//    var animFrames = [];
//    for (var i = 1; i < 6; i++) {
//
//
//        var str = "win" + i + ".png";
//        var frame = cc.spriteFrameCache.getSpriteFrame(str);
//        animFrames.push(frame);
//    }
//    var initialframe = cc.spriteFrameCache.getSpriteFrame("win1.png");
//    animFrames.push(initialframe);
//    var animation = new cc.Animation(animFrames, 0.4);
//    this.spawnPlayerAction = new cc.repeat(new cc.Animate(animation), 2);
//    this.sprite = new cc.Sprite("#" + str);
//
//
//
//
//    cc.log(object.x);
//
//
//    this.sprite.attr({x: object.x, y: object.y});
//    cc.log(this.sprite.getContentSize());
//    this.sprite.runAction(this.spawnPlayerAction);
//    this.loseSpriteSheet.addChild(this.sprite, player_z);
//
//    return this;
//
//}