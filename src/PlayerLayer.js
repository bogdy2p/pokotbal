var PlayerLayer = cc.Layer.extend({
    spriteSheet: null,
    loseSpriteSheet: null,
    pedroAnimationAction: null,
    spawnPlayerAction: null,
    positionX: null,
    positionY: null,
    seconds: null,
    asd2: null,
    sprite: null,
    ctor: function (pozX, pozY) {
        this._super();
        this.positionX = pozX;
        this.positionY = pozY;
        this.init();


//        cc.log(this);

    },
    init: function () {
        this._super();
//        cc.log(global_current_position);
//        for (i = 0; i <= 0; i++) {
//            var string = "Player" + i;
//            this.spawnPlayer(global_current_position, string, 0);
//            global_current_position++;
//        }

    },
    spawnPlayer: function (number, name, ammount) {

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var playerData = playerInformations[number];
        var player_x = playerData.x;
        var player_y = playerData.y;
        var player_z = playerData.zIndex;

        cc.spriteFrameCache.addSpriteFrames(res.Pedro90_plist);
        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedro90_png);


        thisplayer.setAnchorPoint(0, 0);
        backgroundLayer.addChild(this.loseSpriteSheet, player_z, playerData.defaultName + "_SpriteSheet");


//        cc.log(backgroundLayer);
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
        this.sprite.attr({x: playerData.x, y: playerData.y});
        this.sprite.runAction(this.spawnPlayerAction);
        thisplayer.addChild(this.sprite, player_z, playerData.defaultName + "_SpriteChild");


        var playerPopUp = null;
        if (playerData.popUpTop) {
            playerPopUp = new cc.Sprite(res.P_popupOverGrey);
        } else {
            playerPopUp = new cc.Sprite(res.P_popupUnderGrey);

        }

        playerPopUp.attr({x: playerData.popUpX, y: playerData.popUpY});
        thisplayer.addChild(playerPopUp, playerData.popUpZ, playerData.defaultName + "_PopUp");


//
//        if (playerData.y > 500) {
//            var playerPopUp = new cc.Sprite(res.P_popupOverGrey);
//            playerPopUp.attr({x: object.x, y: object.y + 120});
//            thisplayer.addChild(playerPopUp, 4);
//        } else {
//            var playerPopUp = new cc.Sprite(res.P_popupUnderGrey);
//            playerPopUp.attr({x: object.x, y: object.y - 120});
//            thisplayer.addChild(playerPopUp, 4);
//        }


//        Add the name on the popup of the player.
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
});
