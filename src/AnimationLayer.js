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
                var userdata = event.getUserData();
                that.spawnPlayer(userdata);
                that.updatePlayerData(userdata);
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
                that.deActivateAll();
            }
        });
        cc.eventManager.addListener(deActivateAllPlayers, 1);

        var spawnThePotFlag = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_spawn_the_pot_flag",
            callback: function (event) {
                var data = event.getUserData();
                that.spawnThePotFlag(data);
            }
        });
        cc.eventManager.addListener(spawnThePotFlag, 1);

        var removeThePotFlag = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_remove_the_pot_flag",
            callback: function (event) {
                var data = event.getUserData();
                that.removeThePotFlag();
            }
        });
        cc.eventManager.addListener(removeThePotFlag, 1);
    },
    spawnPlayer: function (data) {
        cc.log(data);

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[data.playerNumber];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;
        var spriteFramesForPlayer = "res/animations/player" + data.playerModel + ".plist";
        cc.log(spriteFramesForPlayer);
        cc.spriteFrameCache.addSpriteFrames(spriteFramesForPlayer);
        var spriteBatchNodeFile = "res/animations/player" + data.playerModel + ".png";
        cc.log(spriteBatchNodeFile);
        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(spriteBatchNodeFile);
        var childname = "player_" + data.playerNumber;
        var asd = new Player(thisplayer, object);
        backgroundLayer.addChild(this.loseSpriteSheet, player_z, childname);

    },
    removePlayer: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[data.playerNumber];
        var childname = "player_" + (data.playerNumber);
        var ThePlayer = backgroundLayer.getChildByName(childname);
        if (ThePlayer) {
            ThePlayer.removeFromParent(1);
        } else {
            cc.log("Some strange error when trying to remove player " + (data.playerNumber));
        }
        // SHOULD ALSO REMOVE THE AMOUNT AND THE NAME FROM THE TABLE
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
        var object = playerInformations[data.playerNumber];
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
            var nameLabel = new cc.LabelTTF.create(data.name, "MontserratRegular", 14);
            nameLabel.setColor(cc.color(255, 255, 255));
            nameLabel.setAnchorPoint(0.5, 0.5);
            if (popUpY < 400) {
                nameLabel.setPosition(cc.p(popUpX, popUpY + 10));
            } else {
                nameLabel.setPosition(cc.p(popUpX, popUpY + 10));
            }
            backgroundLayer.addChild(nameLabel, 500, "player_" + data.playerNumber + "_nameLabel");
            var amountLabel = new cc.LabelTTF.create("£ " + data.amount, "MontserratRegular", 14);
            amountLabel.setColor(cc.color(255, 255, 255));
            amountLabel.setAnchorPoint(0.5, 0.5);

            if (popUpY < 400) {
                amountLabel.setPosition(cc.p(popUpX, popUpY - 5));
            } else {
                amountLabel.setPosition(cc.p(popUpX, popUpY - 5));
            }
            backgroundLayer.addChild(amountLabel, 500, "player_" + data.playerNumber + "_ammountLabel");
        }
    },
    animatePlayerWin: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
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
        cc.log(animFramesWin);
        var returnFrameString = "_0000_" + data.playerModel + "loseA1.png.png";
        cc.log(returnFrameString);
        var returnFrame = cc.spriteFrameCache.getSpriteFrame(returnFrameString);
        animFramesWin.push(returnFrame);
        var animationWin = new cc.Animation(animFramesWin, data.animationLength / animFramesWin.length);
        var animateWinning = new cc.Repeat(new cc.Animate(animationWin), 1);
        thesprite.runAction(animateWinning, 1);
        cc.log("Player " + data.playerNumber + " is now animating WIN");
    }
    ,
    animatePlayerLoseA: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
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
        
        var speed = data.animationLength / animFramesLose.length;
        var animationLose = new cc.Animation(animFramesLose, data.animationLength / animFramesLose.length);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 1);
        thesprite.runAction(animateLosing, 1);
        cc.log("Player " + data.playerNumber + " is now animating LOSING-A");
    },
    animatePlayerLoseB: function (data) {
//        cc.log(data);
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
//        cc.log(thesprite);
        var animFramesLose = [];
        for (var i = 1; i < 10; i++) {
            var str = "_000" + i + "_" + data.playerModel + "loseB" + (i + 1) + ".png.png";
            cc.log(str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesLose.push(frame);
        }
        for (var i = 10; i < 88; i++) {

            var str2 = "_00" + i + "_" + data.playerModel + "loseB" + (i + 1) + ".png.png";
            cc.log(str2);
            var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
            animFramesLose.push(frame2);
        }
        cc.log("AnimFramesLose: ");
        cc.log(animFramesLose);
        cc.log("speed");
        var speed = data.animationLength / animFramesLose.length;
        cc.log(speed);
        var animationLose = new cc.Animation(animFramesLose, data.animationLength / animFramesLose.length);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 1);
        thesprite.runAction(animateLosing, 1);
        cc.log("Player " + data.playerNumber + " is now animating LOSING-B");
    },
    animatePlayerWaitA: function (data) {
//        cc.log(data);
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
//        cc.log(childname);
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
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

        var speed = data.animationLength / animFramesWait.length;
        var animationWait = new cc.Animation(animFramesWait, data.animationLength / animFramesWait.length);
        var animateWaiting = new cc.Repeat(new cc.Animate(animationWait), 1);
        thesprite.runAction(animateWaiting, 1);
        cc.log("Player " + data.playerNumber + " is now animating WAIT-A");
    },
    animatePlayerWaitB: function (data) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + data.playerNumber;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
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

        var speed = data.animationLength / animFramesWaitB.length;
        var animationWaitB = new cc.Animation(animFramesWaitB, data.animationLength / animFramesWaitB.length);
        var animateWaitingB = new cc.Repeat(new cc.Animate(animationWaitB), 1);
        thesprite.runAction(animateWaitingB, 1);
        cc.log("Player " + data.playerNumber + " is now animating WAIT-B");
    },
    animateBetting: function (data) {
        var backgroundLayer = this.backgroundLayer;
        var bet_number = this.current_bets;

        var winSize = cc.director.getWinSize();
        var object = playerInformations[data.playerNumber];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;
        var cashSprite = new cc.SpriteBatchNode(res.UI_Cash);
        var cashSpriteName = "bet_player_" + data.playerNumber;
        this.cashSpriteSheet = new cc.Sprite.create(res.UI_Cash);
        this.cashSpriteSheet.setPosition(playerInformations[data.playerNumber].x, playerInformations[data.playerNumber].y);
        this.cashSpriteSheet.setScale(0.1);
        backgroundLayer.addChild(this.cashSpriteSheet, 100, "bet" + this.current_bets);
        this.current_bets++;

        var spinning = new cc.RotateBy.create(1.5, 180);
        var scaleto = new cc.ScaleTo.create(1.5, 1);

        if (this.betPosition <= 10) {
            var moveToCenter = new cc.MoveTo.create(1.5, cc.p(winSize.width / 2, winSize.height / 2 + this.betPosition * 2));
        } else {
            var moveToCenter = new cc.MoveTo.create(1.5, cc.p(winSize.width / 2, winSize.height / 2 + 20));
        }
        this.betPosition++;
        this.cashSpriteSheet.runAction(scaleto, 1);
        this.cashSpriteSheet.runAction(moveToCenter, 1);
        this.cashSpriteSheet.runAction(spinning, 1);
        cc.log("Player " + data.playerNumber + " is now animating A BET");

    }, animateGettingAllBets: function (data) {
        var backgroundLayer = this.backgroundLayer;
        if (this.current_bets > 0) {
            var allbets = [];
            var object = playerInformations[data.playerNumber];
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
        var object = playerInformations[data.playerNumber];
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
                var PlayerSpritePopUp = PlayerSprite._children[1];
                var asd = PlayerSprite._children[0];
                var tintredAction = cc.TintTo.create(1, 255, 0, 0);
                var table = backgroundLayer.getChildByName('thegametable');
                PlayerSprite.runAction(tintredAction);
            }



            //FETCH THE CURRENT PLAYER'S OVERHEADPOPUP AND MAKE IT GREEN

        }


        function deactivatePlayer(element, index, array) {
            var sprite_action = new cc.TintTo.create(1, 85, 85, 85);
            child = element._children[0];
            child.setOpacity(170);
            for (i = 0; i < 10; i++) {
                var overheadName = "Player" + i + "_overHead";
                cc.log("overheadName:");
                cc.log(overheadName);
                var existingOverHeadSprite = backgroundLayer.getChildByName(overheadName);
                if (existingOverHeadSprite) {
                    existingOverHeadSprite.removeFromParent(1);
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
            for (i = 1; i < 10; i++) {
                var overheadName = "Player" + i + "_overHead";
                var existingOverHeadSprite = backgroundLayer.getChildByName(overheadName);
                if (existingOverHeadSprite) {
                    existingOverHeadSprite.removeFromParent(1);
                }
            }
        }
    },
    animatePopUpWinSelf: function (data) {
        var winSize = cc.director.getWinSize();
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var WinSprite1AlreadyPresent = backgroundLayer.getChildByName("WinSprite1");
        var WinSpritePlayerNameLabelAlreadyExists = backgroundLayer.getChildByName("WinSpritePlayerNameLabel");
        var theWinAmountLabelAlreadyExists = backgroundLayer.getChildByName("WinAmountLabel");
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var bigSprite = new cc.Sprite(res.PopUpWin1);
        bigSprite.setPosition(centerPos);
        bigSprite.setScale(1);
        if (!WinSprite1AlreadyPresent) {
            backgroundLayer.addChild(bigSprite, 1000, "WinSprite1");
        }
        //Function to remove after certain amount of time:
        if (data.timeToDisplay == null) {
            data.timeToDisplay = 2;
        }
        if (data.playerName == null) {
            data.playerName = "UnnamedPlayer";
        }
        //If the name is less than 5 chars , use font = 36;
        // if the name is between 6-10 chars use font = 20;
        // if the name is between 11-15 chars use font = 14;
        // if the name is > 15 chars , use font = 10;
        var playerNameSize = 20;
        if (data.playerName.length <= 6) {
            playerNameSize = 36;
        } else if (data.playerName.length > 6 && data.playerName.length <= 11) {
            playerNameSize = 24;
        } else if (data.playerName.length > 11 && data.playerName.length <= 13) {
            playerNameSize = 22;
        } else if (data.playerName.length > 13 && data.playerName.length <= 16) {
            playerNameSize = 18;
        } else if (data.playerName.length > 16 && data.playerName.length <= 18) {
            playerNameSize = 16;
        } else {
            playerNameSize = 14;
        }
        var playerNameLabel = new cc.LabelTTF.create(data.playerName, "MontserratBold", playerNameSize);
        playerNameLabel.setPosition(cc.p(winSize.width / 2, 430));
        if (WinSpritePlayerNameLabelAlreadyExists == null) {
            backgroundLayer.addChild(playerNameLabel, 1000, "WinSpritePlayerNameLabel");

        }
        var winAmountLabel = new cc.LabelTTF.create("£ " + data.amount, "MontserratBold", 28);
        winAmountLabel.setPosition(cc.p(winSize.width / 2, 140));
        if (!theWinAmountLabelAlreadyExists) {
            backgroundLayer.addChild(winAmountLabel, 1000, "WinAmountLabel");
        }
        var thePopUp = backgroundLayer.getChildByName("WinSprite1");
        var theWinAmountLabel = backgroundLayer.getChildByName("WinAmountLabel");
        var thePlayerNameLabel = backgroundLayer.getChildByName("WinSpritePlayerNameLabel");


        setTimeout(function () {
            if (thePopUp) {
                thePopUp.removeFromParent(1);
            }
            if (theWinAmountLabel) {
                theWinAmountLabel.removeFromParent(1);
            }
            if (thePlayerNameLabel) {
                thePlayerNameLabel.removeFromParent(1);
            }
        }, data.timeToDisplay * 1000);
        cc.log('AnimatePOPUP_SELF');

    },
    animatePopUpWinOthers: function (data) {
        var winSize = cc.director.getWinSize();
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var WinSprite1AlreadyPresent = backgroundLayer.getChildByName("WinSprite1");
        var WinSpritePlayerNameLabelAlreadyExists = backgroundLayer.getChildByName("WinSpritePlayerNameLabel");
        var theWinAmountLabelAlreadyExists = backgroundLayer.getChildByName("WinAmountLabel");
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var bigSprite = new cc.Sprite(res.PopUpWin2);
        bigSprite.setPosition(centerPos);
        bigSprite.setScale(0.3);
        if (!WinSprite1AlreadyPresent) {
            backgroundLayer.addChild(bigSprite, 1000, "WinSpriteOther");
        }
        //Function to remove after certain amount of time:
        if (data.timeToDisplay == null) {
            data.timeToDisplay = 2;
        }
        if (data.playerName == null) {
            data.playerName = "UnnamedPlayer";
        }
        //If the name is less than 5 chars , use font = 36;
        // if the name is between 6-10 chars use font = 20;
        // if the name is between 11-15 chars use font = 14;
        // if the name is > 15 chars , use font = 10;
        var playerNameSize = 20;
        if (data.playerName.length <= 6) {
            playerNameSize = 36;
        } else if (data.playerName.length > 6 && data.playerName.length <= 11) {
            playerNameSize = 24;
        } else if (data.playerName.length > 11 && data.playerName.length <= 13) {
            playerNameSize = 22;
        } else if (data.playerName.length > 13 && data.playerName.length <= 16) {
            playerNameSize = 18;
        } else if (data.playerName.length > 16 && data.playerName.length <= 18) {
            playerNameSize = 16;
        } else {
            playerNameSize = 14;
        }
        var playerNameLabel = new cc.LabelTTF.create(data.playerName, "MontserratBold", playerNameSize);
        playerNameLabel.setPosition(cc.p(winSize.width / 2, 430));
        if (WinSpritePlayerNameLabelAlreadyExists == null) {
            backgroundLayer.addChild(playerNameLabel, 1000, "WinSpritePlayerNameLabel");

        }
        var winAmountLabel = new cc.LabelTTF.create("£ " + data.amount, "MontserratBold", 28);
        winAmountLabel.setPosition(cc.p(winSize.width / 2, 140));
        if (!theWinAmountLabelAlreadyExists) {
            backgroundLayer.addChild(winAmountLabel, 1000, "WinAmountLabel");
        }
        var thePopUp = backgroundLayer.getChildByName("WinSpriteOther");
        var theWinAmountLabel = backgroundLayer.getChildByName("WinAmountLabel");
        var thePlayerNameLabel = backgroundLayer.getChildByName("WinSpritePlayerNameLabel");


        setTimeout(function () {
            if (thePopUp) {
                thePopUp.removeFromParent(1);
            }
            if (theWinAmountLabel) {
                theWinAmountLabel.removeFromParent(1);
            }
            if (thePlayerNameLabel) {
                thePlayerNameLabel.removeFromParent(1);
            }
        }, data.timeToDisplay * 1000);
        cc.log('AnimatePOPUP_OTHERS');
    },
    spawnThePotFlag: function (data) {
        //The Pot Flag Should Be Spawned Only ONCE per ROUND.
        //It Should be on TOP of the money stack.
        var winSize = cc.director.getWinSize();
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var checkThePotExists = backgroundLayer.getChildByName("ThePotSprite");
        if (!checkThePotExists) {
            var thePotSprite = new cc.Sprite(res.ThePotFlag);
            thePotSprite.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - thePotSprite.height));
            thePotSprite.setOpacity(0);
            backgroundLayer.addChild(thePotSprite, 1560, "ThePotSprite");
            var fadeInPot = new cc.FadeIn.create(1);
            thePotSprite.runAction(fadeInPot, 1);
        }
        var ThePotAmountLabelExists = backgroundLayer.getChildByName("ThePotAmountLabel");
        if (!ThePotAmountLabelExists) {
            var thePotAmountLabel = new cc.LabelTTF.create("£" + data.potAmount, "MontserratBold", 40);
            thePotAmountLabel.setColor(new cc.Color(200, 200, 0, 255));
            thePotAmountLabel.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - thePotSprite.height - 24));
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
    }
});
