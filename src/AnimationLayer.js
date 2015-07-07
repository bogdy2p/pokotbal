var AnimationLayer = cc.Layer.extend({
    backgroundLayer: null,
    currentPosition: 0,
    spriteSheet: null,
    loseSpriteSheet: null,
    current_bets: null,
    betPosition: 0,
    cashSpriteSheet: null,
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
        this.current_bets = 0;

        var that = this;
        var spawnPlayerEvent = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "spawn_player_event",
            callback: function (event) {
                var data = event.getUserData();
                that.spawnPlayer(data);
                that.updatePlayerData(data);
            }
        });
        cc.eventManager.addListener(spawnPlayerEvent, 1);

        var removePlayerEvent = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "remove_player_event",
            callback: function (event) {
                var data = event.getUserData();
                that.removePlayer(data);
            }
        });
        cc.eventManager.addListener(removePlayerEvent, 1);

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var winningListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_winning",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePlayerWin(data);
            }
        });
        cc.eventManager.addListener(winningListener, 1);

        //event_animate_player_lose
        var losingListenerBoth = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_animate_player_lose",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePlayerLoseRandom(data);
            }
        });
        cc.eventManager.addListener(losingListenerBoth, 1);


        var losingListenerA = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_losing_a",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePlayerLoseA(data);
            }
        });
        cc.eventManager.addListener(losingListenerA, 1);
        var losingListenerB = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_losing_b",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePlayerLoseB(data);
            }
        });
        cc.eventManager.addListener(losingListenerB, 1);


        var waitingListenerRandom = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_waiting_random",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePlayerWaitRandom(data);
            }
        });
        cc.eventManager.addListener(waitingListenerRandom, 1);

        var waitingListenerA = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_waiting_a",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePlayerWaitA(data);
            }
        });
        cc.eventManager.addListener(waitingListenerA, 1);
        var waitingListenerB = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_player_waiting_b",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePlayerWaitB(data);
            }
        });
        cc.eventManager.addListener(waitingListenerB, 1);

        var BettingListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_animate_betting",
            callback: function (event) {
                var data = event.getUserData();
                that.animateBetting(data);
            }
        });
        cc.eventManager.addListener(BettingListener, 1);

        var WinningListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_animate_you_win",
            callback: function (event) {
                var data = event.getUserData();
                that.animateYouWin(data);
            }
        });
        cc.eventManager.addListener(WinningListener, 1);
        var GettingAllBetsListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_animate_player_receiving_bets",
            callback: function (event) {
                var data = event.getUserData();
                that.animateGettingAllBets(data);
            }
        });
        cc.eventManager.addListener(GettingAllBetsListener, 1);
        var activatePlayerListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_activate_player",
            callback: function (event) {
                var data = event.getUserData();
                that.activatePlayer(data);
            }
        });
        cc.eventManager.addListener(activatePlayerListener, 1);

        var updatePlayerData = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_set_player_data",
            callback: function (event) {
                var data = event.getUserData();
                that.updatePlayerData(data);
            }
        });
        cc.eventManager.addListener(updatePlayerData, 1);

        var animateCircleTextLabel = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_animate_circle_label",
            callback: function (event) {
                var data = event.getUserData();
                that.animateCircleText(data);
            }
        });
        cc.eventManager.addListener(animateCircleTextLabel, 1);

        var displayPopUpWinSelf = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_display_popup_win_self",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePopUpWinSelf(data);
            }
        });
        cc.eventManager.addListener(displayPopUpWinSelf, 1);

        var displayPopUpWinOthers = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_display_popup_win_others",
            callback: function (event) {
                var data = event.getUserData();
                that.animatePopUpWinOthers(data);
            }
        });
        cc.eventManager.addListener(displayPopUpWinOthers, 1);

        var deActivateAllPlayers = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_deactivate_all_players",
            callback: function (event) {
                var data = event.getUserData();
                that.deActivateAll(data);
            }
        });
        cc.eventManager.addListener(deActivateAllPlayers, 1);

        var spawnAndUpdateThePotFlag = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_spawn_and_update_the_pot_flag",
            callback: function (event) {
                var data = event.getUserData();
                that.spawnAndUpdateThePotFlag(data);
            }
        });
        cc.eventManager.addListener(spawnAndUpdateThePotFlag, 1);

        var removeThePotFlag = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_remove_the_pot_flag",
            callback: function (event) {
                var data = event.getUserData();
                that.removeThePotFlag(data);
            }
        });
        cc.eventManager.addListener(removeThePotFlag, 1);

        var bigAnimation1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_big_winning_animation",
            callback: function (event) {
                var data = event.getUserData();
                that.playBigWinningAnimation(data);
            }
        });
        cc.eventManager.addListener(bigAnimation1, 1);

        var genericAnimation1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_generic_animation_referee",
            callback: function (event) {
                var data = event.getUserData();
                that.playGenericAnimation(data);
            }
        });
        cc.eventManager.addListener(genericAnimation1, 1);

    },
    spawnPlayer: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var playerdata = positionInformations[data.playerNumber];
        var player_x = playerdata.x;
        var player_y = playerdata.y;
        var player_z = playerdata.zIndex;
        var spriteFramesForPlayer = "res/animations/player" + data.playerModel + ".plist";

        var spriteBatchNodeFile = "res/animations/player" + data.playerModel + ".png";
        cc.spriteFrameCache.addSpriteFrames(spriteFramesForPlayer);
        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(spriteBatchNodeFile);
        var childname = "player_" + data.playerNumber;

        var asd = new Player(thisplayer, playerdata, data.playerModel);
        backgroundLayer.addChild(this.loseSpriteSheet, player_z, childname);
    },
    removePlayer: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = positionInformations[data.playerNumber];
        var childname = "player_" + (data.playerNumber);
        var ThePlayer = backgroundLayer.getChildByName(childname);
        if (ThePlayer) {
            ThePlayer.removeFromParent(1);
        } else {
            cc.log("Some strange error when trying to remove player " + (data.playerNumber));
        }
        var nameLabel = backgroundLayer.getChildByName("player_" + data.playerNumber + "_nameLabel");
        var amountLabel = backgroundLayer.getChildByName("player_" + data.playerNumber + "_ammountLabel");

        if (nameLabel) {
            nameLabel.removeFromParent(1);
        }
        if (amountLabel) {
            amountLabel.removeFromParent(1);
        }
    },
    updatePlayerData: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = positionInformations[data.playerNumber];
        var childname = "player_" + (data.playerNumber);
        var ThePlayer = backgroundLayer.getChildByName(childname);
        var children = ThePlayer._children;
        var popUp = children[1];
        var nameDataIsSet = backgroundLayer.getChildByName("player_" + data.playerNumber + "_nameLabel");
        var ammountDataIsSet = backgroundLayer.getChildByName("player_" + data.playerNumber + "_ammountLabel");

        if (ammountDataIsSet) {
            ammountDataIsSet.setString("£ " + data.amount);
            if (nameDataIsSet) {
                nameDataIsSet.setString(data.name);
            }
        } else {
            var popUpX = popUp.getPosition().x;
            var popUpY = popUp.getPosition().y;
            var nameLabel = new cc.LabelTTF.create(data.name, "MontserratBold", 16);
            nameLabel.setColor(cc.color(255, 255, 255));
            nameLabel.setAnchorPoint(0.5, 0.5);
            if (popUpY < 400) {
                nameLabel.setPosition(cc.p(popUpX, popUpY + 10));
            } else {
                nameLabel.setPosition(cc.p(popUpX, popUpY + 10));
            }
            backgroundLayer.addChild(nameLabel, 500, "player_" + data.playerNumber + "_nameLabel");
            var amountLabel = new cc.LabelTTF.create("£ " + data.amount, "MontserratRegular", 16);
            amountLabel.setColor(cc.color(255, 255, 255));
            amountLabel.setAnchorPoint(0.5, 0.5);

            if (popUpY < 400) {
                amountLabel.setPosition(cc.p(popUpX, popUpY - 8));
            } else {
                amountLabel.setPosition(cc.p(popUpX, popUpY - 8));
            }
            backgroundLayer.addChild(amountLabel, 500, "player_" + data.playerNumber + "_ammountLabel");
        }
    },
    animatePlayerWin: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
        ///////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////
        var position = positionInformations[data.playerNumber];
        thesprite.setPosition(position.x - 19, position.y + 13);
        ///////////////////////////////////////////////////////////////////////
        var animFramesWin = [];
        for (var i = 1; i < 10; i++) {
            var str = "_000" + i + "_" + data.playerModel + "win" + (i + 1) + ".png.png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWin.push(frame);
        }
        for (var i = 10; i < 37; i++) {
            var str2 = "_00" + i + "_" + data.playerModel + "win" + (i + 1) + ".png.png";
            var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
            animFramesWin.push(frame2);
        }
        var animationWin = new cc.Animation(animFramesWin, data.animationLength / animFramesWin.length);
        var animateWinning = new cc.Repeat(new cc.Animate(animationWin), 1);
        thesprite.runAction(animateWinning, 1);

    },
    animatePlayerLoseA: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
        ///////////////////////////////////////////////////////////////////////
        var position = positionInformations[data.playerNumber];
        ///////////////////////////////////////////////////////////////////////
        thesprite.setPosition(position.x, position.y);
        var animFramesLose = [];
        for (var i = 1; i < 10; i++) {
            var str = "_000" + i + "_" + data.playerModel + "loseA" + (i + 1) + ".png.png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesLose.push(frame);
        }
        for (var i = 10; i < 60; i++) {
            var str2 = "_00" + i + "_" + data.playerModel + "loseA" + (i + 1) + ".png.png";
            var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
            animFramesLose.push(frame2);
        }
        var animationLose = new cc.Animation(animFramesLose, data.animationLength / animFramesLose.length);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 1);
        thesprite.runAction(animateLosing, 1);
    },
    animatePlayerLoseRandom: function (data) {

        var version = 1;
        var RandomNumber = Math.floor(Math.random() * 10 + 1);

        if ((RandomNumber % 2) == 0) {
            version = 2;
        } else {
            version = 1;
        }
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
        ///////////////////////////////////////////////////////////////////////
        var position = positionInformations[data.playerNumber];
        thesprite.setPosition(position.x, position.y);
        ///////////////////////////////////////////////////////////////////////
        var animFramesLose = [];

        if (version == 1) {

            for (var i = 1; i < 10; i++) {
                var str = "_000" + i + "_" + data.playerModel + "loseA" + (i + 1) + ".png.png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFramesLose.push(frame);
            }
            for (var i = 10; i < 60; i++) {
                var str2 = "_00" + i + "_" + data.playerModel + "loseA" + (i + 1) + ".png.png";
                var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
                animFramesLose.push(frame2);
            }
        } else {
            for (var i = 1; i < 10; i++) {
                var str = "_000" + i + "_" + data.playerModel + "loseB" + (i + 1) + ".png.png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFramesLose.push(frame);
            }
            for (var i = 10; i < 88; i++) {
                var str2 = "_00" + i + "_" + data.playerModel + "loseB" + (i + 1) + ".png.png";
                var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
                animFramesLose.push(frame2);
            }
        }
        var animationLose = new cc.Animation(animFramesLose, data.animationLength / animFramesLose.length);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 1);
        thesprite.runAction(animateLosing, 1);

    },
    animatePlayerLoseB: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
        ///////////////////////////////////////////////////////////////////////
        var position = positionInformations[data.playerNumber];
        thesprite.setPosition(position.x, position.y);
        ///////////////////////////////////////////////////////////////////////
        var animFramesLose = [];
        for (var i = 1; i < 10; i++) {
            var str = "_000" + i + "_" + data.playerModel + "loseB" + (i + 1) + ".png.png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesLose.push(frame);
        }
        for (var i = 10; i < 88; i++) {
            var str2 = "_00" + i + "_" + data.playerModel + "loseB" + (i + 1) + ".png.png";
            var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
            animFramesLose.push(frame2);
        }
        var animationLose = new cc.Animation(animFramesLose, data.animationLength / animFramesLose.length);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 1);
        thesprite.runAction(animateLosing, 1);
    },
    animatePlayerWaitRandom: function (data) {

        var version = 1;
        var RandomNumber = Math.floor(Math.random() * 10 + 1);
        if ((RandomNumber % 2) == 0) {
            version = 2;
        } else {
            version = 1;
        }
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
        ///////////////////////////////////////////////////////////////////////
        var position = positionInformations[data.playerNumber];
        thesprite.setPosition(position.x, position.y);
        ///////////////////////////////////////////////////////////////////////
        var animFramesWait = [];
        if (version == 1) {

            for (var i = 1; i < 10; i++) {
                var str = "_000" + i + "_" + data.playerModel + "waitA" + (i + 1) + ".png.png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFramesWait.push(frame);
            }
            for (var i = 10; i < 84; i++) {
                var str2 = "_00" + i + "_" + data.playerModel + "waitA" + (i + 1) + ".png.png";
                var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
                animFramesWait.push(frame2);
            }
        } else {
            for (var i = 1; i < 10; i++) {
                var str = "_000" + i + "_" + data.playerModel + "waitB" + (i + 1) + ".png.png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFramesWait.push(frame);
            }
            for (var i = 10; i < 99; i++) {
                var str2 = "_00" + i + "_" + data.playerModel + "waitB" + (i + 1) + ".png.png";
                var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
                animFramesWait.push(frame2);
            }
        }
        var animationWait = new cc.Animation(animFramesWait, data.animationLength / animFramesWait.length);
        var animateWaiting = new cc.Repeat(new cc.Animate(animationWait), 1);
        thesprite.runAction(animateWaiting, 1);
    },
    animatePlayerWaitA: function (data) {

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
        ///////////////////////////////////////////////////////////////////////
        var position = positionInformations[data.playerNumber];
        thesprite.setPosition(position.x, position.y);
        ///////////////////////////////////////////////////////////////////////
        var animFramesWait = [];
        for (var i = 1; i < 10; i++) {
            var str = "_000" + i + "_" + data.playerModel + "waitA" + (i + 1) + ".png.png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWait.push(frame);
        }
        for (var i = 10; i < 84; i++) {
            var str2 = "_00" + i + "_" + data.playerModel + "waitA" + (i + 1) + ".png.png";
            var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
            animFramesWait.push(frame2);
        }
        var animationWait = new cc.Animation(animFramesWait, data.animationLength / animFramesWait.length);
        var animateWaiting = new cc.Repeat(new cc.Animate(animationWait), 1);
        thesprite.runAction(animateWaiting, 1);
    },
    animatePlayerWaitB: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
        ///////////////////////////////////////////////////////////////////////
        var position = positionInformations[data.playerNumber];
        thesprite.setPosition(position.x, position.y);
        ///////////////////////////////////////////////////////////////////////
        var animFramesWaitB = [];
        for (var i = 1; i < 10; i++) {
            var str = "_000" + i + "_" + data.playerModel + "waitB" + (i + 1) + ".png.png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWaitB.push(frame);
        }
        for (var i = 10; i < 99; i++) {
            var str2 = "_00" + i + "_" + data.playerModel + "waitB" + (i + 1) + ".png.png";
            var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
            animFramesWaitB.push(frame2);
        }
        var animationWaitB = new cc.Animation(animFramesWaitB, data.animationLength / animFramesWaitB.length);
        var animateWaitingB = new cc.Repeat(new cc.Animate(animationWaitB), 1);
        thesprite.runAction(animateWaitingB, 1);
    },
    animateBetting: function (data) {
        var backgroundLayer = this.backgroundLayer;
        var bet_number = this.current_bets;

        var winSize = cc.director.getWinSize();
        var object = positionInformations[data.playerNumber];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;
        var cashSprite = new cc.SpriteBatchNode(res.UI_Cash);
        var cashSpriteName = "bet_player_" + data.playerNumber;
        this.cashSpriteSheet = new cc.Sprite.create(res.UI_Cash);
        this.cashSpriteSheet.setPosition(positionInformations[data.playerNumber].x, positionInformations[data.playerNumber].y);
        this.cashSpriteSheet.setScale(0.1);
        backgroundLayer.addChild(this.cashSpriteSheet, 100, "bet" + this.current_bets);
        this.current_bets++;

        var spinning = new cc.RotateBy.create(1.5, 180);
        var scaleto = new cc.ScaleTo.create(1.5, 1);

        if (this.betPosition <= 10) {
            var moveToCenter = new cc.MoveTo.create(1.5, cc.p(winSize.width / 2, winSize.height / 2 + 14 + this.betPosition * 2));
        } else {
            var moveToCenter = new cc.MoveTo.create(1.5, cc.p(winSize.width / 2, winSize.height / 2 + 34));
        }
        this.betPosition++;
        this.cashSpriteSheet.runAction(scaleto, 1);
        this.cashSpriteSheet.runAction(moveToCenter, 1);
        this.cashSpriteSheet.runAction(spinning, 1);
    }, animateGettingAllBets: function (data) {
        var backgroundLayer = this.backgroundLayer;
        if (this.current_bets > 0) {
            var allbets = [];
            var object = positionInformations[data.playerNumber];
            var player_x = object.x;
            var player_y = object.y;
            var player_z = object.zIndex;
            for (i = 0; i < this.current_bets; i++) {
                var bet = backgroundLayer.getChildByName("bet" + i);
                if (bet)
                    allbets.push(bet);
            }
            var randX = Math.floor(Math.random() * 3) + 1;
            var randomMoves = [];
            var randomFades = []
            for (i = 0; i < this.current_bets; i++) {
                var randTime = Math.floor(Math.random() * 3) + 1;
                var randFadeTime = Math.floor(Math.random() * 2) + 1;
                randomMoves[i] = new cc.MoveTo.create(randTime, cc.p(object.x + randX, object.y - randX));
                randomFades[i] = new cc.FadeOut(randFadeTime);
            }
            var theBigSequences = [];
            for (i = 0; i < this.current_bets; i++) {
                theBigSequences[i] = cc.Sequence.create(randomMoves[i], randomFades[i]);
                allbets[i].runAction(theBigSequences[i], 1);
            }
            var current_bets = this.current_bets;
            setTimeout(function () {
                for (i = 0; i < current_bets; i++) {
                    allbets[i].removeFromParent(1);
                }
            }, 3500);
            this.current_bets = 0;
        } else {
            cc.log("THERE WERE NO BETS ON THE TABLE!");
        }
    },
    activatePlayer: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = positionInformations[data.playerNumber];
        var existingPlayersWithoutSpecified = [];
        var existingSpecifiedPlayer = [];
        for (i = 0; i < 10; i++) {
            if (i != data.playerNumber) {
                var child = "player_" + i;
                var player = backgroundLayer.getChildByName(child);
                if (player) {
                    existingPlayersWithoutSpecified.push(player);
                }
            } else {
                var childE = "player_" + i;
                var player = backgroundLayer.getChildByName(childE);
                if (player) {
                    existingSpecifiedPlayer.push(player);
                }
            }
        }

        existingPlayersWithoutSpecified.forEach(deactivatePlayer);
        existingSpecifiedPlayer.forEach(activatePlayer);


        function activatePlayer(element, index, array) {
            var unTint = new cc.TintTo.create(1, 85, 250, 250);
            child = element._children[0];
            child.setOpacity(255);
            var OverHead = new cc.Sprite.create(res.P_overHead);
            OverHead.setPosition(object.x, object.y + 110);
            var buildString = "Player" + data.playerNumber + "_overHead";
            var playerAlreadyActive = backgroundLayer.getChildByName(buildString);
            if (!playerAlreadyActive) {
                backgroundLayer.addChild(OverHead, 1000, "Player" + data.playerNumber + "_overHead");
                var PlayerSprite = backgroundLayer.getChildByName("player_" + data.playerNumber);
            }

            var bubble = element._children[1];
            var oldBubblePosition = bubble.getPosition();
            var newBubble = new cc.Sprite.create(res.P_popupOverGreen);
            if (data.playerNumber < 4) {
                newBubble.setPosition(oldBubblePosition);
            } else {
                newBubble.setRotation(180);
                newBubble.setPosition(oldBubblePosition.x, oldBubblePosition.y);
            }
            bubble.removeFromParent(1);
            var playerdata = positionInformations[data.playerNumber];
            element.addChild(newBubble, playerdata.Zindex, playerdata.defaultName + "_popupGreen");

        }


        function deactivatePlayer(element, index, array) {

            var playerdata = positionInformations[data.playerNumber];
            var active_player = object;
            child = element._children[0];
            child.setOpacity(200);
            for (i = 0; i < 10; i++) {
                var overheadName = "Player" + i + "_overHead";
                var existingOverHeadSprite = backgroundLayer.getChildByName(overheadName);
                if (existingOverHeadSprite) {
                    existingOverHeadSprite.removeFromParent(1);
                }
            }
            var bubble = element._children[1];
            var nameToRemove = active_player.defaultName + "_popupGreen";
            var array_of_greens = [];
            for (i = 1; i <= 10; i++) {
                var greenName = "Player" + i + "_popupGreen";
                array_of_greens.push(greenName);
            }
            var array_of_greens_to_remove = _.without(array_of_greens, nameToRemove);
            array_of_greens_to_remove.forEach(tryRemove);

            function tryRemove(ele, ind, arra) {

                var asd = element.getChildByName(ele);
                if (asd) {
                    if (bubble._name == ele) {
                        var greenBubblePosition = bubble.getPosition();
                        var the_parent = bubble.getParent();
                        bubble.removeFromParent(1);
                        var grayBubble = new cc.Sprite.create(res.P_popupOverGrey);
                        if (greenBubblePosition.y < 500) {
                            grayBubble.setRotation(180);
                        }
                        grayBubble.setPosition(greenBubblePosition);
                        the_parent.addChild(grayBubble, 1600, "asdfds");
                    }
                }
            }
        }
    },
    //===========================================================================================
    deActivateAll: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var all_the_players_at_table = [];
        for (i = 0; i < 10; i++) {
            var child = "player_" + i;
            var player = backgroundLayer.getChildByName(child);
            if (player) {
                all_the_players_at_table.push(player);
            }
        }
        all_the_players_at_table.forEach(deactivatePlayer);
        function deactivatePlayer(element, index, array) {
            var sprite_action = new cc.TintTo.create(1, 85, 85, 85);
            child = element._children[0];
            child.setOpacity(255);
            for (i = 0; i < 10; i++) {
                var overheadName = "Player" + i + "_overHead";
                var existingOverHeadSprite = backgroundLayer.getChildByName(overheadName);
                if (existingOverHeadSprite) {
                    existingOverHeadSprite.removeFromParent(1);
                }

                var greenBubbleName = "Player" + (i + 1) + "_popupGreen";
                var existingGreenBubbleonPlayer = element.getChildByName(greenBubbleName);
                if (existingGreenBubbleonPlayer) {
                    var position = existingGreenBubbleonPlayer.getPosition();
                    var the_parent = existingGreenBubbleonPlayer.getParent();
                    existingGreenBubbleonPlayer.removeFromParent(1);
                    var grayBubble = new cc.Sprite.create(res.P_popupOverGrey);
                    if (position.y < 500) {
                        grayBubble.setRotation(180);
                    }
                    var grayBubbleName = "Player" + (i + 1) + "_popup";
                    grayBubble.setPosition(position);
                    the_parent.addChild(grayBubble, 1600, grayBubbleName);
                }
            }
        }
    },
    spawnAndUpdateThePotFlag: function (data) {

        if (typeof (data) == 'undefined') {
            data = {
                potAmount: "potAmount",
            }
        }
        var winSize = cc.director.getWinSize();
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var checkThePotExists = backgroundLayer.getChildByName("ThePotSprite");
        if (!checkThePotExists) {
            var thePotSprite = new cc.Sprite(res.ThePotFlag);
            thePotSprite.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - thePotSprite.height / 2 + 5));
            thePotSprite.setOpacity(0);
            backgroundLayer.addChild(thePotSprite, 1560, "ThePotSprite");
            var fadeInPot = new cc.FadeIn.create(1);
            thePotSprite.runAction(fadeInPot, 1);
        }
        var ThePotAmountLabelExists = backgroundLayer.getChildByName("ThePotAmountLabel");
        if (!ThePotAmountLabelExists) {
            var thePotAmountLabel = new cc.LabelTTF.create("£" + data.potAmount, "MontserratBold", 40);
            thePotAmountLabel.setColor(new cc.Color(255, 255, 0, 255));
            thePotAmountLabel.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - thePotSprite.height));
            backgroundLayer.addChild(thePotAmountLabel, 1560, "ThePotAmountLabel");
        } else {
            ThePotAmountLabelExists.setString("£" + data.potAmount);
        }
    },
    removeThePotFlag: function () {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var checkThePotExists = backgroundLayer.getChildByName("ThePotSprite");
        if (checkThePotExists) {
            checkThePotExists.removeFromParent(1);
        }
        var ThePotAmountLabelExists = backgroundLayer.getChildByName("ThePotAmountLabel");
        if (ThePotAmountLabelExists) {
            ThePotAmountLabelExists.removeFromParent(1);
        }
    },
    playBigWinningAnimation: function (data) {

        if (typeof (data) == 'undefined') {
            cc.log("You did not provide correct details for the data object");
            var data = {
                playerName: "data.playerName",
                amount: "amount_here",
                winner: false,
            };
        }

        //Data Object needs:
        //  playerName: string
        //  amount: integer / string
        //  winner: string (true/false)      

        var winSize = cc.director.getWinSize();
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var all_sprites = [];

        ////////////////////////////////////////////////////////////////////////
        //THE BACKGROUND TRANSPARENCY;
        ////////////////////////////////////////////////////////////////////////
        var transparentBgSprite = new cc.Sprite(res.BP_Transparency);
        transparentBgSprite.setPosition(centerPos);
        transparentBgSprite.setScale(0.8);
        transparentBgSprite.setOpacity(255);
        var transpScaleUp = new cc.ScaleTo(0.4, 0.9);
        var transpScaleDown = new cc.ScaleTo(0.4, 0.7);
        var ScaleSequence = new cc.Sequence.create(transpScaleUp, transpScaleDown);
        var repeatScale = new cc.Repeat(ScaleSequence, 4);
        transparentBgSprite.runAction(repeatScale);
        backgroundLayer.addChild(transparentBgSprite, 1690, "TransparentBg");
        all_sprites.push(transparentBgSprite);
        ///////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        //THE BACKGROUND RED SPRITE
        ////////////////////////////////////////////////////////////////////////
        var bgRedSprite = new cc.Sprite(res.BP_RedBg);
        bgRedSprite.setPosition(centerPos);
        bgRedSprite.setScale(0.01);
        var ScaleBgToNormalAction = new cc.ScaleTo(0.1, 1);
        bgRedSprite.runAction(ScaleBgToNormalAction);
        backgroundLayer.addChild(bgRedSprite, 1700, "BgRed");
        all_sprites.push(bgRedSprite);
        ////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////
        //THE PLAYER BODY
        ////////////////////////////////////////////////////////////////////////
        var playerBody = new cc.Sprite(res.BP_PlayerBody);
        playerBody.setPosition(cc.p(winSize.width / 2 + 8, winSize.height / 2 - 54));
        playerBody.setScale(0.05);
        var ScaleBodyToNormalAction = new cc.ScaleTo(0.2, 1);
        playerBody.runAction(ScaleBodyToNormalAction);
        backgroundLayer.addChild(playerBody, 1710, "PlayerBody");
        all_sprites.push(playerBody);
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        //THE PLAYER HAND
        ////////////////////////////////////////////////////////////////////////
        var playerHand = new cc.Sprite(res.BP_PlayerHand);
        playerHand.setPosition(cc.p(winSize.width / 2 - 130, winSize.height / 2 - 60));
        playerHand.setScale(1);
        var HandDelay = new cc.delayTime(1.2);
        var ScaleHandUpAction = new cc.ScaleTo(0.2, 1.8);
        var ScaleHandDownAction = new cc.ScaleTo(0.2, 1);
        var ScaleHandSequence = new cc.Sequence.create(HandDelay, ScaleHandUpAction, ScaleHandDownAction);
        playerHand.runAction(ScaleHandSequence);
        backgroundLayer.addChild(playerHand, 1720, "PlayerHand");
        all_sprites.push(playerHand);
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        ////WINS FLAG
        ////////////////////////////////////////////////////////////////////////

        if (data.winner == false) {
            var winsFlag = new cc.Sprite(res.BP_WinsText);
        } else {
            var winsFlag = new cc.Sprite(res.BP_YouWinText);
            data.playerName = "Congratulations!";
        }

        winsFlag.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        winsFlag.setScale(0.05);
        var ScaleWinsFlagAction = new cc.ScaleTo(0.1, 1);
        var MoveWinsFlagAction = new cc.MoveTo(0.1, cc.p(winSize.width / 2, 100));
        var FlagDelay = new cc.DelayTime(0.1);
        var WinsFlagSequence = new cc.Sequence.create(FlagDelay, ScaleWinsFlagAction, MoveWinsFlagAction);
        winsFlag.runAction(WinsFlagSequence);
        backgroundLayer.addChild(winsFlag, 1730, "WinsFlag");
        all_sprites.push(winsFlag);


        ////////////////////////////////////////////////////////////////////////
        ////BALL 1
        ////////////////////////////////////////////////////////////////////////
        var Ball1 = new cc.Sprite(res.BP_Ball);
        Ball1.setPosition(cc.p(winSize.width / 2 - 220, winSize.height / 2 + 70));
        Ball1.setScale(0);
        var Ball1RotateAction = new cc.RotateBy(2, 359);
        var Ball1ScaleUpAction = new cc.ScaleTo(0.05, 1);
        var Ball1Delay = new cc.DelayTime(0.5);
        var Ball1Sequence = new cc.Sequence.create(Ball1Delay, Ball1ScaleUpAction, Ball1RotateAction);
        Ball1.runAction(Ball1Sequence);
        backgroundLayer.addChild(Ball1, 1740, "Ball1");
        all_sprites.push(Ball1);
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        ////BALL 2
        ////////////////////////////////////////////////////////////////////////
        var Ball2 = new cc.Sprite(res.BP_Ball);
        Ball2.setPosition(cc.p(winSize.width / 2 + 230, winSize.height / 2 - 20));
        Ball2.setScale(0);
        var Ball2RotateAction = new cc.RotateBy(2, 359);
        var Ball2ScaleUpAction = new cc.ScaleTo(0.05, 0.7);
        var Ball2Delay = new cc.DelayTime(0.5);
        var Ball2Sequence = new cc.Sequence.create(Ball2Delay, Ball2ScaleUpAction, Ball2RotateAction);
        Ball2.runAction(Ball2Sequence);
        backgroundLayer.addChild(Ball2, 1740, "Ball2");
        all_sprites.push(Ball2);
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        ////BALL 3
        ////////////////////////////////////////////////////////////////////////
        var Ball3 = new cc.Sprite(res.BP_Ball);
        Ball3.setPosition(cc.p(winSize.width / 2 + 200, winSize.height / 2 + 130));
        Ball3.setScale(0);
        var Ball3RotateAction = new cc.RotateBy(2, -359);
        var Ball3ScaleUpAction = new cc.ScaleTo(0.05, 0.6);
        var Ball3Delay = new cc.DelayTime(0.5);
        var Ball3Sequence = new cc.Sequence.create(Ball3Delay, Ball3ScaleUpAction, Ball3RotateAction);
        Ball3.runAction(Ball3Sequence);
        backgroundLayer.addChild(Ball3, 1740, "Ball3");
        all_sprites.push(Ball3);
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        ////TROPHY
        ////////////////////////////////////////////////////////////////////////

        var Trophy = new cc.Sprite(res.BP_Trophy);
        Trophy.setPosition(cc.p(winSize.width / 2, winSize.height / 2 + 260));
        Trophy.setScale(0);
        var TrophyScaleUpAction = new cc.ScaleTo(0.2, 1);
        var TrophyScaleDownAction = new cc.ScaleTo(0.1, 0.8);
        var TrophyDelay = new cc.DelayTime(1);
        var TrophySequence = new cc.Sequence.create(TrophyDelay, TrophyScaleUpAction, TrophyScaleDownAction);
        Trophy.runAction(TrophySequence);
        backgroundLayer.addChild(Trophy, 1750, "Trophy");
        all_sprites.push(Trophy);
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        //// FACE 1 AND 2
        ////////////////////////////////////////////////////////////////////////
        var facesDelayTime = 0.7;
        var Face1 = new cc.Sprite(res.BP_Face1);
        Face1.setPosition(cc.p(winSize.width / 2 + 10, winSize.height / 2 - 20));
        Face1.setOpacity(255);
        var Face1FadeInAction = new cc.FadeIn.create(0.01);
        var Face1FadeOutAction = new cc.FadeOut.create(0.01);
        var Face1Delay = new cc.DelayTime(facesDelayTime);
        var Face1Sequence = new cc.Sequence.create(Face1Delay, Face1Delay, Face1FadeOutAction, Face1Delay, Face1FadeInAction);
        Face1.runAction(Face1Sequence);
        backgroundLayer.addChild(Face1, 1750, "Face1");
        all_sprites.push(Face1);
        var Face2 = new cc.Sprite(res.BP_Face2);
        Face2.setPosition(cc.p(winSize.width / 2 + 10, winSize.height / 2 - 20));
        Face2.setOpacity(0);
        var Face2FadeInAction = new cc.FadeIn.create(0.01);
        var Face2FadeOutAction = new cc.FadeOut.create(0.01);
        var Face2Delay = new cc.DelayTime(facesDelayTime);
        var Face2DisplayAction = new cc.FadeIn.create(0.05);
        var Face2Sequence = new cc.Sequence.create(Face2Delay, Face2Delay, Face2FadeInAction, Face2Delay, Face2FadeOutAction);
        Face2.runAction(Face2Sequence);
        backgroundLayer.addChild(Face2, 1760, "Face2");
        all_sprites.push(Face2);
        //////////////////////////////////////////////////////////////////////// 

        ////////////////////////////////////////////////////////////////////////
        //// BlackBox
        ////////////////////////////////////////////////////////////////////////

        var BlackBox = new cc.Sprite(res.BP_BlackBox);
        BlackBox.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 180));
        BlackBox.setOpacity(0);
        var BoxDelay1 = new cc.DelayTime.create(0.3);
        var BoxDelay2 = new cc.DelayTime.create(1.5);
        var FadeInBox = new cc.FadeIn.create(0.5);
        var MoveBoxDown = new cc.MoveTo.create(0.5, winSize.width / 2, winSize.height / 2 - 240);
        var MoveBoxUp = new cc.MoveTo.create(0.5, winSize.width / 2, winSize.height / 2 - 180);
        var animateBoxSequence = new cc.Sequence.create(FadeInBox, BoxDelay1, MoveBoxDown, BoxDelay2, MoveBoxUp);
        BlackBox.runAction(animateBoxSequence);
        backgroundLayer.addChild(BlackBox, 1711, "BlackBox");
        all_sprites.push(BlackBox);
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        ///PLAYER NAME LABEL
        ////////////////////////////////////////////////////////////////////////
        if (data.playerName == null) {
            data.playerName = "UnnamedPlayer";
        }
        var playerNameSize = 20;
        if (data.playerName.length <= 6) {
            playerNameSize = 40;
        } else if (data.playerName.length > 6 && data.playerName.length <= 11) {
            playerNameSize = 30;
        } else if (data.playerName.length > 11 && data.playerName.length <= 13) {
            playerNameSize = 26;
        } else if (data.playerName.length > 13 && data.playerName.length <= 16) {
            playerNameSize = 22;
        } else if (data.playerName.length > 16 && data.playerName.length <= 18) {
            playerNameSize = 18;
        } else {
            playerNameSize = 16;
        }

        if (data.playerName === "Congratulations!") {
            cc.log("size is 32");
            playerNameSize = 32;
        }

        var playerNameLabel = new cc.LabelTTF.create(data.playerName, "MontserratBold", playerNameSize);
        playerNameLabel.setPosition(cc.p(winSize.width / 2, 480));
        backgroundLayer.addChild(playerNameLabel, 1715, "PlayerNameLabel");
        all_sprites.push(playerNameLabel);

        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        /// AMOUNT LABEL 
        ////////////////////////////////////////////////////////////////////////

        var winAmountLabel = new cc.LabelTTF.create("£ " + data.amount, "MontserratBold", 38);
        winAmountLabel.setOpacity(0);
        winAmountLabel.setPosition(cc.p(winSize.width / 2, 80));
        var winAmountLabelFadeIn = new cc.FadeIn.create(0);
        var winAmountLabelFadeOut = new cc.FadeOut.create(0.2);
        var winAmountLabelDelayStart = new cc.DelayTime(1.1);
        var winAmountLabelDelayStay = new cc.DelayTime(1.5);
        var winAmountLabelSequence = new cc.Sequence.create(winAmountLabelDelayStart, winAmountLabelFadeIn, winAmountLabelDelayStart, winAmountLabelFadeOut);
        winAmountLabel.runAction(winAmountLabelSequence, 1);
        backgroundLayer.addChild(winAmountLabel, 1760, "WinAmountLabel");
        all_sprites.push(winAmountLabel);
        all_sprites.forEach(dissapearElement);
        function dissapearElement(element, index, array) {
            var endActionTime = cc.delayTime(3.2);
            var disappear = new cc.FadeOut.create(0.5);
            var disappearSequence = new cc.Sequence.create(endActionTime, disappear);
            element.runAction(disappearSequence);
        }
        all_sprites.forEach(removeFromBackground);
        function removeFromBackground(element, index, array) {
            setTimeout(function () {
                element.removeFromParent(1);
            }, 5000);
        }
    }
    ,
    playGenericAnimation: function (data) {




        if (typeof (data) == 'undefined') {
            cc.log("You did not provide correct details for the data object");
            var data = {
                messageTitle: "data.messageTitle",
                messageLine1: "line 1 content",
                messageLine2: "line 2 content",
                referee: 1,
            };
        }

        if (data.referee == null) {
            var RandomNumber = Math.floor(Math.random() * 3 + 1);
            data.referee = RandomNumber;
        }

        var winSize = cc.director.getWinSize();
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var all_sprites = [];

        ////////////////////////////////////////////////////////////////////////
        //THE WHITE BACKGROUND SPRITE;
        ////////////////////////////////////////////////////////////////////////
        var BackgroundSprite = new cc.Sprite(res.GP_Background);
        BackgroundSprite.setPosition(centerPos);
        BackgroundSprite.setScale(1);

        var BgDelay = new cc.delayTime(0.2);
        var ScaleBGUpAction = new cc.ScaleTo(0.2, 1.1);
        var ScaleBGDownAction = new cc.ScaleTo(0.2, 1);
        var ScaleBGSequence = new cc.Sequence.create(BgDelay, ScaleBGUpAction, ScaleBGDownAction);
        BackgroundSprite.runAction(ScaleBGSequence);
        BackgroundSprite.setOpacity(255);
        backgroundLayer.addChild(BackgroundSprite, 1690, "GenericBackgroundSprite");
        all_sprites.push(BackgroundSprite);
        ///////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////
        //THE REFEREE
        ////////////////////////////////////////////////////////////////////////

        if (data.referee == 1) {
            var referee = new cc.Sprite(res.GP_Referee1);
        } else if (data.referee == 2) {
            var referee = new cc.Sprite(res.GP_Referee2);
        } else {
            var referee = new cc.Sprite(res.GP_Referee3);
        }
        referee.setPosition(cc.p(winSize.width / 2 + 200, winSize.height / 2 + 40));
        referee.setScale(0.01);
        var ScaleBodyToNormalAction = new cc.ScaleTo(0.2, 1);

        var RefereeDelay = new cc.DelayTime(0.5);
        var RefereeSequence = new cc.Sequence.create(RefereeDelay, ScaleBodyToNormalAction);


        referee.runAction(RefereeSequence, 1);
        backgroundLayer.addChild(referee, 1710, "Referee");
        all_sprites.push(referee);
        ////////////////////////////////////////////////////////////////////////

        var messageTitleLabel = new cc.LabelTTF.create(data.messageTitle, "MontserratBold", 46);
        messageTitleLabel.setColor(cc.color.RED);
        messageTitleLabel.setPosition(cc.p(winSize.width / 2 - 120, 320));
        messageTitleLabel.setOpacity(0);
        var TitleDelay = new cc.delayTime(1);
        var messageTitleLabelFadeIn = new cc.FadeIn.create(0.01);
        var fadeInTitle = new cc.Sequence.create(TitleDelay, messageTitleLabelFadeIn);
        messageTitleLabel.runAction(fadeInTitle);


        backgroundLayer.addChild(messageTitleLabel, 1715, "MessageTitleLabel");
        all_sprites.push(messageTitleLabel);


        var actualMessageLabel1 = new cc.LabelTTF.create(data.messageLine1, "MontserratBold", 44);
        actualMessageLabel1.setColor(cc.color.BLACK);
        actualMessageLabel1.setPosition(cc.p(winSize.width / 2 - 120, 260));
        actualMessageLabel1.setOpacity(0);
        var Line1Delay = new cc.delayTime(1.4);
        var Line1LabelFadeIn = new cc.FadeIn.create(0.01);
        var fadeInLine1 = new cc.Sequence.create(Line1Delay, Line1LabelFadeIn);
        actualMessageLabel1.runAction(fadeInLine1);

        backgroundLayer.addChild(actualMessageLabel1, 1715, "actualMessageLabel1");
        all_sprites.push(actualMessageLabel1);
        var actualMessageLabel2 = new cc.LabelTTF.create(data.messageLine2, "MontserratBold", 44);
        actualMessageLabel2.setColor(cc.color.BLACK);
        actualMessageLabel2.setPosition(cc.p(winSize.width / 2 - 120, 200));
        actualMessageLabel2.setOpacity(0);
        var Line2Delay = new cc.delayTime(1.4);
        var Line2LabelFadeIn = new cc.FadeIn.create(0.01);
        var fadeInLine2 = new cc.Sequence.create(Line2Delay, Line2LabelFadeIn);
        actualMessageLabel2.runAction(fadeInLine2);
        backgroundLayer.addChild(actualMessageLabel2, 1715, "actualMessageLabel2");
        all_sprites.push(actualMessageLabel2);

        all_sprites.forEach(dissapearElement);
        function dissapearElement(element, index, array) {
            var endActionTime = cc.delayTime(3.2);
            var disappear = new cc.FadeOut.create(0.5);
            var disappearSequence = new cc.Sequence.create(endActionTime, disappear);
            element.runAction(disappearSequence);
        }
        all_sprites.forEach(removeFromBackground);
        function removeFromBackground(element, index, array) {
            setTimeout(function () {
                element.removeFromParent(1);
            }, 5000);
        }
    }
});
