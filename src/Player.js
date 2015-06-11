var Player = cc.Layer.extend({
    popUpPixelDifference: 120,
    debugPlayer: false,
    playerNumber: null,
    playerNameLabel: null,
    playerAmmountLabel: null,
    playerSpriteSheet: null,
    sprite: null,
    popUp: null,
    ctor: function (spriteSheet, playerdata) {
        this.playerNumber = global_current_position;
        this.playerSpriteSheet = spriteSheet;
//=================!!!!!!!TO DO!!!!!!!=========================================
//        //This will be the sprite of the default player.
//        // Should be a different sprite for each player. (up-to 5 ? );
//        cc.log(playerdata);
//        var initial_picture = "#wait" + playerdata.playerNumber + ".png";
//        this.sprite = new cc.Sprite.create(initial_picture);
//=============================================================================
        this.sprite = new cc.Sprite.create("#_0000_1loseA1.png.png");
        this.sprite.setPosition(playerdata.x, playerdata.y);
        this.sprite.setOpacity(0);
        spriteSheet.addChild(this.sprite, playerdata.Zindex, playerdata.defaultName);
        this.sprite.runAction(new cc.MoveTo(cc.p(playerdata.x, playerdata.y)));

        this.popUp = new cc.Sprite.create(res.P_popupOverGrey);
        if (playerdata.playerNumber <= 4) {

            this.popUp.setPosition(playerdata.x, playerdata.y + this.popUpPixelDifference);
        } else {
            this.popUp.setRotation(180);
            this.popUp.setPosition(playerdata.x, playerdata.y - this.popUpPixelDifference);

        }


        spriteSheet.addChild(this.popUp, playerdata.Zindex, playerdata.defaultName + "_popup");
        global_current_position++;
        this.init();
        


    },
    init: function () {
//        var that = this;
        this.animateFadeIn();
    },
    animateFadeIn: function () {
        var fadeInPlayer = cc.FadeIn.create(2 / GGS);
        this.sprite.runAction(fadeInPlayer);
    },
    animateFadeOut: function () {
        var fadeOutPlayer = cc.FadeOut.create(1 / GGS);
        this.sprite.runAction(fadeOutPlayer);
    },
//    setPlayerName: function (name, playerdata) {
////        cc.log(this.playerSpriteSheet);
//        var children = this.playerSpriteSheet._children;
//        var popUp = children[1];
////        cc.log(children);
//        cc.log(popUp);
////        var popUpX = popUp.getPosition().x;
////        var popUpY = popUp.getPosition().y;
//        var popUpX = 30;
//        var popUpY = 60;
//        var nameLabel = new cc.LabelTTF.create(name, "MontserratRegular", 12);
//        nameLabel.setColor(cc.color(255, 255, 255));
//        nameLabel.setAnchorPoint(0.5, 0.5);
//        nameLabel.setPosition(cc.p(popUpX - 10, popUpY + 38));
//        popUp.addChild(nameLabel, 500, playerdata.defaultName + "_nameLabel");
////        
////        var versusLabel = new cc.LabelTTF("vs".toUpperCase(), "MontserratRegular", 16);
////        versusLabel.setColor(cc.color(255, 255, 255));
////        versusLabel.setAnchorPoint(0.5, 0.5);
////        versusLabel.setPosition(cc.p(GameTitleX - versusLabel.width / 4, GameTitleY - versusLabel.height / 4));
////        backgroundLayer.addChild(versusLabel, 500, "leftLabel");
////        var leftLabel = new cc.LabelTTF(data.leftInfo.toUpperCase(), "MontserratBold", 30);
////        leftLabel.setColor(cc.color(255, 255, 255));
////        leftLabel.setAnchorPoint(0.5, 0.5);
////        leftLabel.setPosition(cc.p(GameTitleX - leftLabel.width / 2 - versusLabel.width, GameTitleY));
////        backgroundLayer.addChild(leftLabel, 500, "leftLabel");
////        var rightLabel = new cc.LabelTTF(data.rightInfo.toUpperCase(), "MontserratBold", 30);
////        rightLabel.setColor(cc.color(255, 255, 255));
////        rightLabel.setAnchorPoint(0.5, 0.5);
////        rightLabel.setPosition(cc.p(GameTitleX + leftLabel.width / 2 + versusLabel.width, GameTitleY));
////        backgroundLayer.addChild(rightLabel, 500, "leftLabel");
////        var bottomLabel = new cc.LabelTTF(data.bottomInfo.toUpperCase(), "MontserratRegular", 16);
////        bottomLabel.setColor(cc.color(255, 255, 255));
////        bottomLabel.setAnchorPoint(0.5, 0.5);
////        bottomLabel.setPosition(cc.p(GameTitleX, GameTitleY - 30));
////        backgroundLayer.addChild(bottomLabel, 500, "topLabel");
//    },
});



















//        this.sprite.runAction(winLoseWait);


//======================================================================   
//Winning Animation 
//======================================================================
//        var animFramesWin = [];
//        for (var i = 1; i < 6; i++) {
//            var str = "win" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFramesWin.push(frame);
//        }
//        var animationWin = new cc.Animation(animFramesWin, 0.4);
//        var animateWinning = new cc.Repeat(new cc.Animate(animationWin), 2);
//        //======================================================================   
//        //Losing Animation 
//        //======================================================================
//        var animFramesLose = [];
//        for (var i = 1; i < 6; i++) {
//            var str = "lose" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFramesLose.push(frame);
//        }
//        var animationLose = new cc.Animation(animFramesLose, 0.4);
//        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 2);
//        //======================================================================   
//        //Waiting Animation 
//        //======================================================================    
//        var animFramesWait = [];
//        for (var i = 1; i < 6; i++) {
//            var str = "wait" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFramesWait.push(frame);
//        }
//        var animationWait = new cc.Animation(animFramesWait, 0.4);
//        var animateWaiting = new cc.Repeat(new cc.Animate(animationWait), 2);
//        //======================================================================   
//
//
//        var winLoseWait = cc.Sequence.create(animateWinning, animateLosing, animateWaiting);