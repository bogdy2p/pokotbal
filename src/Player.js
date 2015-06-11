//...//var socket = io.connect('http://127.0.0.1:4000');
var Player = cc.Layer.extend({
    debugPlayer: false,
    playerNumber: null,
    sprite: null,
    ctor: function (spriteSheet, playerdata) {

        this.playerNumber = global_current_position;

//=================!!!!!!!TO DO!!!!!!!=========================================
//        //This will be the sprite of the default player.
//        // Should be a different sprite for each player. (up-to 5 ? );
//        cc.log(playerdata);
//        var initial_picture = "#wait" + playerdata.playerNumber + ".png";
//        this.sprite = new cc.Sprite.create(initial_picture);
//=============================================================================
        this.sprite = new cc.Sprite.create("#lose1.png");
        this.sprite.setPosition(playerdata.x, playerdata.y);
        this.sprite.setOpacity(0);
        spriteSheet.addChild(this.sprite, playerdata.Zindex, playerdata.defaultName);
        this.sprite.runAction(new cc.MoveTo(cc.p(playerdata.x, playerdata.y)));
        global_current_position++;
        this.init();
    },
    init: function () {
        var that = this;

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