var AnimationLayer = cc.Layer.extend({
    backgroundLayer: null,
    currentPosition: 0,
    spriteSheet: null,
    loseSpriteSheet: null,
    pedroAnimationAction: null,
    spawnPlayerAction: null,
    seconds: null,
    sprite: null,
    ctor: function () {
        this._super();
        this.init();

    },
    init: function () {
        this._super();
        this.backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        //Schedule the timer clock update to every second
        this.schedule(this.updateGameClock, 1);
        //===============================================

        var that = this;
        var spawnPlayerEvent = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "spawn_player_event",
            callback: function (event) {

                var userdata = event.getUserData();
                that.spawnPlayer(userdata.number, userdata.name, userdata.ammount);
            }
        });
        cc.eventManager.addListener(spawnPlayerEvent, 1);

        var removePlayerEvent = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "remove_player_event",
            callback: function (event) {

                var data = event.getUserData();
                that.removePlayer(data.number);
            }
        });
        cc.eventManager.addListener(removePlayerEvent, 1);





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
                that.animatePlayerLose(data.playerNumber, data.positionX, data.positionY);
            }
        });
        cc.eventManager.addListener(losingListener, 1);

        var waitingListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_waiting",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePlayerWait(data.playerNumber, data.positionX, data.positionY);
            }
        });
        cc.eventManager.addListener(waitingListener, 1);

        var GameTitleBoxListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_set_game_title_bar",
            callback: function (event) {
                var data = event.getUserData();
                that.animateGameTitle(data);
            }
        });
        cc.eventManager.addListener(GameTitleBoxListener, 1);

        var GameMarkerListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_display_game_marker_bar_and_info",
            callback: function (event) {
                var data = event.getUserData();
                that.animateMarkerWithMessage(data);
            }
        });
        cc.eventManager.addListener(GameMarkerListener, 1);

    },
    spawnPlayer: function (number, name, ammount) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[number];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;
        cc.spriteFrameCache.addSpriteFrames(res.Pedro90_plist);
        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedro90_png);
        var childname = "player_" + number;
        var asd = new Player(thisplayer, object);
        backgroundLayer.addChild(this.loseSpriteSheet, player_z, childname);

    },
    removePlayer: function (number) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[number];

        //FUNCTIONALITY TO BE ABLE TO REMOVE A PLAYER FROM THE BOARD
        //
        //
        //
        //
        //
        //
        //
        //
        //




//        cc.spriteFrameCache.addSpriteFrames(res.Pedro90_plist);
//        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedro90_png);
//        var childname = "player_" + number;
//        var asd = new Player(thisplayer, object);
//        backgroundLayer.addChild(this.loseSpriteSheet, player_z, childname);

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
    animateGameTitle: function (data) {
        var backgroundLayer = this.backgroundLayer;
        var GameTitle = backgroundLayer.getChildByName("GameTitleBox");
        var GameTitleX = GameTitle.getPosition().x;
        var GameTitleY = GameTitle.getPosition().y;
        var topLabel = new cc.LabelTTF.create(data.topInfo.toUpperCase(), "MontserratRegular", 14);
        topLabel.setColor(cc.color(255, 255, 255));
        topLabel.setAnchorPoint(0.5, 0.5);
        topLabel.setPosition(cc.p(GameTitleX - 10, GameTitleY + 38));
        backgroundLayer.addChild(topLabel, 500, "topLabel");
        var versusLabel = new cc.LabelTTF("vs".toUpperCase(), "MontserratRegular", 16);
        versusLabel.setColor(cc.color(255, 255, 255));
        versusLabel.setAnchorPoint(0.5, 0.5);
        versusLabel.setPosition(cc.p(GameTitleX - versusLabel.width / 4, GameTitleY - versusLabel.height / 4));
        backgroundLayer.addChild(versusLabel, 500, "leftLabel");
        var leftLabel = new cc.LabelTTF(data.leftInfo.toUpperCase(), "MontserratBold", 30);
        leftLabel.setColor(cc.color(255, 255, 255));
        leftLabel.setAnchorPoint(0.5, 0.5);
        leftLabel.setPosition(cc.p(GameTitleX - leftLabel.width / 2 - versusLabel.width, GameTitleY));
        backgroundLayer.addChild(leftLabel, 500, "leftLabel");
        var rightLabel = new cc.LabelTTF(data.rightInfo.toUpperCase(), "MontserratBold", 30);
        rightLabel.setColor(cc.color(255, 255, 255));
        rightLabel.setAnchorPoint(0.5, 0.5);
        rightLabel.setPosition(cc.p(GameTitleX + leftLabel.width / 2 + versusLabel.width, GameTitleY));
        backgroundLayer.addChild(rightLabel, 500, "leftLabel");
        var bottomLabel = new cc.LabelTTF(data.bottomInfo.toUpperCase(), "MontserratRegular", 16);
        bottomLabel.setColor(cc.color(255, 255, 255));
        bottomLabel.setAnchorPoint(0.5, 0.5);
        bottomLabel.setPosition(cc.p(GameTitleX, GameTitleY - 30));
        backgroundLayer.addChild(bottomLabel, 500, "topLabel");
    },
    animateMarkerWithMessage: function (data) {
        var backgroundLayer = this.backgroundLayer;

        //============================================================
        //Add The Game Marker Box.
        var informationMarker = new cc.Sprite(res.UI_Marker);
        informationMarker.setAnchorPoint(0.5, 0.5);
        informationMarker.setPosition(cc.p(backgroundLayer.width / 2 - 130, 160));
        informationMarker.setOpacity(0);
        backgroundLayer.addChild(informationMarker);
//        //============================================================
//        //
//        //Create the animation sequence for the marker
        var fadeIn = cc.FadeIn.create(data.fadeInSec);
        var delay = cc.delayTime(data.timeToShow);
        var fadeOut = cc.FadeOut.create(data.fadeOutSec);
        var markerSequence = cc.Sequence.create(fadeIn, delay, fadeOut);
        var repeatMarkerSequence = cc.Repeat.create(markerSequence, data.repeatTimes);
        //======================================================================

        var markerMessageLabel = new cc.LabelTTF(data.markerMessage, "MontserratRegular", 20);
        markerMessageLabel.setColor(cc.color(30, 30, 30));
        markerMessageLabel.setAnchorPoint(0, 0);
//        markerMessageLabel.setOpacity(0);
        markerMessageLabel.setPosition(cc.p(informationMarker.x / 2 - markerMessageLabel.width / 2, informationMarker.y / 2 - markerMessageLabel.height));
        informationMarker.addChild(markerMessageLabel, 500, "leftLabel");

        var fadeInMessage = cc.FadeIn.create(data.fadeInSec - 0.5);
        var fadeOutMessage = cc.FadeOut.create(data.fadeInSec - 0.5);
        var markerMessageSequence = cc.Sequence.create(fadeInMessage, delay, fadeOutMessage);

        informationMarker.runAction(repeatMarkerSequence);
        markerMessageLabel.runAction(markerMessageSequence);


    }
});
