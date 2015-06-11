var AnimationLayer = cc.Layer.extend({
    backgroundLayer: null,
    currentPosition: 0,
    spriteSheet: null,
    loseSpriteSheet: null,
    current_bets: null,
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
                that.spawnPlayer(userdata.number, userdata.name, userdata.ammount);
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
        var tintOtherPlayersListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_tint_other_players",
            callback: function (event) {
                var data = event.getUserData();
                that.tintOtherPlayers(data);
            }
        });
        cc.eventManager.addListener(tintOtherPlayersListener, 1);

        var updatePlayerData = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_set_player_data",
            callback: function (event) {
                var data = event.getUserData();
                that.updatePlayerData(data);
            }
        });
        cc.eventManager.addListener(updatePlayerData, 1);

    },
    spawnPlayer: function (number, name, ammount) {
//        cc.log(cc.Director);
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[number];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;
        cc.spriteFrameCache.addSpriteFrames(res.Losenew_plist);
        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Losenew_png);
        var childname = "player_" + number;
        var asd = new Player(thisplayer, object);
        backgroundLayer.addChild(this.loseSpriteSheet, player_z, childname);

    },
    removePlayer: function (data) {

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[data.number - 1];
        var childname = "player_" + (data.number - 1);
        var ThePlayer = backgroundLayer.getChildByName(childname);
        if (ThePlayer) {
            ThePlayer.removeFromParent(1);
        } else {
            cc.log("Some strange error when trying to remove player " + (data.number - 1));
        }
    },
    updatePlayerData: function (data) {
//        cc.log(data);
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[data.playerNumber];
        var childname = "player_" + (data.playerNumber);


        var ThePlayer = backgroundLayer.getChildByName(childname);
//        cc.log(ThePlayer);
        var children = ThePlayer._children;
        var popUp = children[1];


        


        var nameDataIsSet = backgroundLayer.getChildByName("player_" + data.playerNumber + "_nameLabel");
        var ammountDataIsSet = backgroundLayer.getChildByName("player_" + data.playerNumber + "_ammountLabel");
        
        if (ammountDataIsSet) {
            cc.log(ammountDataIsSet);
            ammountDataIsSet.setString("£ "+ data.amount);
            

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





//        cc.log(amountLabel);
//
//        cc.log(popUp);
    },
    animatePlayerWin: function (number, pozx, pozy) {
//        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//        var childname = "player_" + number;
//        var sprite = backgroundLayer.getChildByName(childname);
//        var thesprite = sprite._children[0];
//        var animFramesWin = [];
//        for (var i = 1; i < 6; i++) {
//            var str = "win" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFramesWin.push(frame);
//        }
//        var animationWin = new cc.Animation(animFramesWin, 0.4);
//        var animateWinning = new cc.Repeat(new cc.Animate(animationWin), 1);
//        thesprite.runAction(animateWinning, 1);
    },
//    animatePlayerLose: function (number, pozx, pozy) {
//        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//        var childname = "player_" + number;
//        var sprite = backgroundLayer.getChildByName(childname);
//        var thesprite = sprite._children[0];
//        var animFramesLose = [];
//        for (var i = 1; i < 6; i++) {
//            var str = "lose" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFramesLose.push(frame);
//        }
//        var animationLose = new cc.Animation(animFramesLose, 0.4);
//        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 1);
//        thesprite.runAction(animateLosing, 1);
//    },
    animatePlayerLose: function (number, pozx, pozy) {
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var childname = "player_" + number;
        var sprite = backgroundLayer.getChildByName(childname);
        var thesprite = sprite._children[0];
        var animFramesLose = [];
        for (var i = 1; i <= 70; i++) {
            var str = "lose" + i + ".png";
//            var str = "lose" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesLose.push(frame);
        }
        var animationLose = new cc.Animation(animFramesLose, 0.05);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 5);
        thesprite.runAction(animateLosing, 1);
    },
    animatePlayerWait: function (number, pozx, pozy) {
//        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//        var childname = "player_" + number;
//        var sprite = backgroundLayer.getChildByName(childname);
//        var thesprite = sprite._children[0];
//        var animFramesWait = [];
//        for (var i = 1; i < 6; i++) {
//            var str = "wait" + i + ".png";
//            var frame = cc.spriteFrameCache.getSpriteFrame(str);
//            animFramesWait.push(frame);
//        }
//        var animationWait = new cc.Animation(animFramesWait, 0.4);
//        var animateWaiting = new cc.Repeat(new cc.Animate(animationWait), 1);
//        thesprite.runAction(animateWaiting, 1);
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
        backgroundLayer.addChild(this.cashSpriteSheet, playerInformations[data.playerNumber].Zindex + 500, "bet" + this.current_bets);
        this.current_bets++;
        var moveToCenter = new cc.MoveTo.create(1.5, cc.p(winSize.width / 2, winSize.height / 2));
        this.cashSpriteSheet.runAction(moveToCenter, 1);


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
    tintOtherPlayers: function (data) {

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
        existingSpecifiedPlayer.forEach(dosomethingspecial1);
        function dosomethingspecial1(element, index, array) {
            var unTint = new cc.TintTo.create(0, 250, 250, 250);
            child = element._children[0];
            child.runAction(unTint);
        }
        existingPlayersWithoutSpecified.forEach(dosomethingspecial2);
        function dosomethingspecial2(element, index, array) {
            var sprite_action = new cc.TintTo.create(0, 85, 85, 85);
            child = element._children[0];
            child.runAction(sprite_action);
        }
    }

});
