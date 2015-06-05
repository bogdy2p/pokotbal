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

        var that = this;
        var spawnPlayerEvent = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "spawn_player_event",
            callback: function (event) {

//               statusLabel.setString("Customevent 1 received", + event.getUserData() + " times");
//                cc.log(event.getUserData());
                var userdata = event.getUserData();

                that.spawnPlayer(userdata.number, userdata.name, userdata.ammount);
            }
        });
        cc.eventManager.addListener(spawnPlayerEvent, 1);

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);

        var winningListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_winning",
            callback: function (event) {

                var data = event.getUserData();
                var playerNumber = data.playerNumber;
                var positionX = data.positionX;
                var positionY = data.positionY;
                that.animatePlayerWin(playerNumber, positionX, positionY);

            }
        });
        cc.eventManager.addListener(winningListener, 1);

        var losingListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_losing",
            callback: function (event) {
                var data = event.getUserData();
                var playerNumber = data.playerNumber;
                var positionX = data.positionX;
                var positionY = data.positionY;
                that.animatePlayerLose(playerNumber, positionX, positionY);
//                cc.log(event.getUserData());
//                var playerNumber = event.getUserData();
//                backgroundLayer.animateLosing(userdata.number);
            }
        });
        cc.eventManager.addListener(losingListener, 1);

        var waitingListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_waiting",
            callback: function (event) {
                var data = event.getUserData();
                var playerNumber = data.playerNumber;
                var positionX = data.positionX;
                var positionY = data.positionY;
                that.animatePlayerWait(playerNumber, positionX, positionY);
            }
        });
        cc.eventManager.addListener(waitingListener, 1);



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
        backgroundLayer.addChild(this.loseSpriteSheet, player_z, childname);

    },
    animatePlayerWin: function (number, pozx, pozy) {

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + number;
        var sprite = backgroundLayer.getChildByName(childname);

        var thesprite = sprite._children[0];
        var animFramesWin = [];
        for (var i = 1; i < 6; i++) {
            var str = "win" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWin.push(frame);
        }
        var animationWin = new cc.Animation(animFramesWin, 0.4);
        var animateWinning = new cc.Repeat(new cc.Animate(animationWin), 1);
        thesprite.runAction(animateWinning, 1);

    },
    animatePlayerLose: function (number, pozx, pozy) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + number;
        var sprite = backgroundLayer.getChildByName(childname);

        var thesprite = sprite._children[0];
        var animFramesLose = [];
        for (var i = 1; i < 6; i++) {
            var str = "lose" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesLose.push(frame);
        }
        var animationLose = new cc.Animation(animFramesLose, 0.4);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 1);
        thesprite.runAction(animateLosing, 1);
    },
    animatePlayerWait: function (number, pozx, pozy) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + number;
        var sprite = backgroundLayer.getChildByName(childname);

        var thesprite = sprite._children[0];
        var animFramesWait = [];
        for (var i = 1; i < 6; i++) {
            var str = "wait" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWait.push(frame);
        }
        var animationWait = new cc.Animation(animFramesWait, 0.4);
        var animateWaiting = new cc.Repeat(new cc.Animate(animationWait), 1);
        thesprite.runAction(animateWaiting, 1);
    },
    updateGameClock: function (dt) {
        this.seconds += dt;
        var seconds = Math.floor(this.seconds);
        var UserInterfaceLayer = this.getParent().getChildByTag(TagOfLayer.UserInterface);
        UserInterfaceLayer.updateTimerClock(seconds);


    },
    rand1: function (dt) {

    },
    update: function (dt) {


    }

});
