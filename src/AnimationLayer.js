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
                cc.log(event.getUserData());
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

//                cc.log(event);

//                cc.log(that);
                var data = event.getUserData();

                var playerNumber = data.playerNumber;
                var positionX = data.positionX;
                var positionY = data.positionY;


                that.movePlayerTo(playerNumber, positionX, positionY);

//                var childname = "player_" + playerNumber;
//                var childname2 = "Player" + (playerNumber+1).toString();
//                cc.log(childname + " + " + childname2);
//                cc.log("Background Layer : ");
//                cc.log(backgroundLayer);
//                var PlayerLayer = backgroundLayer.getChildByName(childname);
//                cc.log("Player Layer : ");
//                cc.log(PlayerLayer);
//                var player_zero = PlayerLayer.getChildByName(childname2);
//                
//                that.
//                
//                
//                cc.log("Player ZERO : ");
//                cc.log(player_zero);
////                cc.log(player_zero._name);
////                cc.log(player_zero.class());
//                player_zero.animateWinning();


            }
        });
        cc.eventManager.addListener(winningListener, 1);

        var losingListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_losing",
            callback: function (event) {
                cc.log(event.getUserData());
                var playerNumber = event.getUserData();
                backgroundLayer.animateLosing(userdata.number);
            }
        });
        cc.eventManager.addListener(losingListener, 1);

        var waitingListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_waiting",
            callback: function (event) {
                cc.log(event.getUserData());
                var playerNumber = event.getUserData();
                backgroundLayer.animateWaiting(userdata.number);
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
    movePlayerTo: function (number, pozx, pozy) {

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + number;
        var sprite = backgroundLayer.getChildByName(childname);

        var aaa = sprite._children[0];
        cc.log("Player " + aaa._name + " is currently @ " + aaa.getPositionX() + " & " + aaa.getPositionY());
//        aaa.runAction(moveTo(4,5));
        aaa.setPositionX(pozx);
        aaa.setPositionY(pozy);

//        aaa.animateWinning();
//        cc.log(aaa);
        cc.log("Player " + aaa._name + " is currently @ " + aaa.getPositionX() + " & " + aaa.getPositionY());

        var animFramesWin = [];
        for (var i = 1; i < 6; i++) {
            var str = "win" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWin.push(frame);
        }
        var animationWin = new cc.Animation(animFramesWin, 0.4);
        var animateWinning = new cc.Repeat(new cc.Animate(animationWin), 1);
        aaa.runAction(animateWinning, 1);


//        sprite.runAction(new Player.animateWinning);
//        cc.log(childname);

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
