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

        this.sprite = new cc.Sprite.create("#wait1.png");
        this.sprite.setPosition(playerdata.x, playerdata.y);
        this.sprite.setOpacity(0);
        spriteSheet.addChild(this.sprite, playerdata.Zindex, playerdata.defaultName);
        this.sprite.runAction(new cc.MoveTo(cc.p(playerdata.x, playerdata.y)));
        global_current_position++;
        this.init();


    },
    init: function () {
        var that = this;
        
//        var _listener1 = cc.EventListener.create({
//            event: cc.EventListener.CUSTOM,
//            eventName: "game_custom_event1",
//            callback: function (event) {
//
////               statusLabel.setString("Customevent 1 received", + event.getUserData() + " times");
//                cc.log(event.getUserData());
//                that.animateWinning();
//            }
//        });
//        cc.eventManager.addListener(_listener1, 1);
//        this.runRandomAnim();
//        this.animateWinning();
//        this.animateLosing();
        this.animateFadeIn();
    },
    animateWinning: function () {
        if (this.debugPlayer) {
            cc.log("Player Will animate WIN");
        }
        //======================================================================   
        //Winning Animation 
        //======================================================================
        var animFramesWin = [];
        for (var i = 1; i < 6; i++) {
            var str = "win" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWin.push(frame);
        }
        var animationWin = new cc.Animation(animFramesWin, 0.4);
        var animateWinning = new cc.Repeat(new cc.Animate(animationWin), 1);
        this.sprite.runAction(animateWinning, 1);

    },
    animateLosing: function () {
        if (this.debugPlayer) {
            cc.log("Player Will animate LOSE");
        }
        var animFramesLose = [];
        for (var i = 1; i < 6; i++) {
            var str = "lose" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesLose.push(frame);
        }
        var animationLose = new cc.Animation(animFramesLose, 0.4);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 2);
        this.sprite.runAction(animateLosing, 1);
    },
    animateWaiting: function () {
        if (this.debugPlayer) {
            cc.log("Player Will animate WAIT");
        }
        var animFramesWait = [];
        for (var i = 1; i < 6; i++) {
            var str = "wait" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWait.push(frame);
        }
        var animationWait = new cc.Animation(animFramesWait, 0.4);
        var animateWaiting = new cc.Repeat(new cc.Animate(animationWait), 2);
        this.sprite.runAction(animateWaiting, 1);
    },
    animateFadeIn: function () {
        var fadeInPlayer = cc.FadeIn.create(2);
        this.sprite.runAction(fadeInPlayer);
    },
    animateFadeOut: function () {
        var fadeOutPlayer = cc.FadeOut.create(1);
        this.sprite.runAction(fadeOutPlayer);
    },
    runRandomAnim: function () {
        var randomNumber = Math.floor(Math.random() * 4) + 1;
        if (this.debugPlayer) {
            console.log("Randomly picked number is : " + randomNumber);
        }
        switch (randomNumber) {
            case 1:
                this.animateLosing();
                break;
            case 2:
                this.animateWaiting();
                break;
            case 3:
                this.animateWinning();
                break;
            case 4:
                this.animateFadeOut();
                break
            default:
                break;
        }
    }

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