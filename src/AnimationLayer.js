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
        var position = null;

//        cc.log("ASD");
//        cc.log(data);
//        cc.log(backgroundLayer);
        var GameTitle = backgroundLayer.getChildByName("GameTitleBox");
        var GameTitleX = GameTitle.getPosition().x;
        var GameTitleY = GameTitle.getPosition().y;


        var topLabel = new cc.LabelTTF(data.topInfo.toUpperCase(), "Helvetica", 16 , cc.size(245,32));
        topLabel.setColor(cc.color(255, 255, 255));
        
        topLabel.setAnchorPoint(0.5, 0.5);
        topLabel.setPosition(cc.p(GameTitleX - 10, GameTitleY + 38));
        backgroundLayer.addChild(topLabel, 500, "topLabel");
//        backgroundLayer.addChild(createStroke(topLabel, 0.4, topLabel.getColor(),255) );
        
        

        var versusLabel = new cc.LabelTTF("vs".toUpperCase(), "Helvetica", 16);
        versusLabel.setColor(cc.color(255, 255, 255));
        versusLabel.setAnchorPoint(0.5, 0.5);
        versusLabel.setPosition(cc.p(GameTitleX, GameTitleY));
        backgroundLayer.addChild(versusLabel, 500, "leftLabel");

        var leftLabel = new cc.LabelTTF(data.leftInfo.toUpperCase(), "Helvetica", 28);
        leftLabel.setColor(cc.color(255, 255, 255));
        leftLabel.setAnchorPoint(0.5, 0.5);
        leftLabel.setPosition(cc.p(GameTitleX - leftLabel.width / 2 - versusLabel.width, GameTitleY));
        backgroundLayer.addChild(leftLabel, 500, "leftLabel");





        var rightLabel = new cc.LabelTTF(data.rightInfo.toUpperCase(), "Helvetica", 28);
        rightLabel.setColor(cc.color(255, 255, 255));
        rightLabel.setAnchorPoint(0.5, 0.5);
        rightLabel.setPosition(cc.p(GameTitleX + leftLabel.width / 2 + versusLabel.width, GameTitleY));
        backgroundLayer.addChild(rightLabel, 500, "leftLabel");

        var bottomLabel = new cc.LabelTTF(data.bottomInfo.toUpperCase(), "Helvetica", 16);
        bottomLabel.setColor(cc.color(255, 255, 255));
        bottomLabel.setAnchorPoint(0.5, 0.5);
        bottomLabel.setPosition(cc.p(GameTitleX, GameTitleY - 30));
        backgroundLayer.addChild(bottomLabel, 500, "topLabel");



//       
//        var TopFeedSprite = userInterfaceLayer.getChildByName("TopRightInformationBox");
//        var TopFeedSpriteSize = TopFeedSprite.getContentSize();
//        var timeLabel = new cc.LabelTTF(time, "Helvetica", 15);
//        timeLabel.setColor(cc.color(255, 255, 255));
//        timeLabel.setAnchorPoint(0, 0);
//        timeLabel.setPosition(cc.p(this.winSize.width - TopFeedSpriteSize.width + 62, this.winSize.height - (TopFeedSpriteSize.height / 12) * (this.initialPosition + 1) - 50));
//        this.addChild(timeLabel, 3, "timelabel");
//        var feedLabel = new cc.LabelTTF(feedText, "Helvetica", 15);
//        feedLabel.setColor(cc.color(255, 255, 255));
//        feedLabel.setAnchorPoint(0, 0);
//        feedLabel.setPosition(cc.p(this.winSize.width - TopFeedSpriteSize.width + timeLabel.width + 75, this.winSize.height - (TopFeedSpriteSize.height / 12) * (this.initialPosition + 1) - 50));
//        this.addChild(feedLabel);
//        

    },
});
