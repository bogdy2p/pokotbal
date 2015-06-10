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
        //Schedule the timer clock update to every second
        this.current_bets = 0;
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

        var BalanceDisplayListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "event_animate_balance_change",
            callback: function (event) {
                var data = event.getUserData();
                that.animateDisplayBalanceChange(data);
            }
        });
        cc.eventManager.addListener(BalanceDisplayListener, 1);

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
    removePlayer: function (data) {

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[data.number - 1];
        var childname = "player_" + (data.number - 1);
//        cc.log(backgroundLayer);
        var ThePlayer = backgroundLayer.getChildByName(childname);

        if (ThePlayer) {
            ThePlayer.removeFromParent(1);
        } else {
            cc.log("Some strange error when trying to remove player " + (data.number - 1));
        }

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
        markerMessageLabel.setOpacity(0);
        markerMessageLabel.setPosition(cc.p(informationMarker.x / 2 - markerMessageLabel.width / 2, informationMarker.y / 2 - markerMessageLabel.height));
        informationMarker.addChild(markerMessageLabel, 500, "leftLabel");
        var fadeInMessage = cc.FadeIn.create(data.fadeInSec);
        var fadeOutMessage = cc.FadeOut.create(data.fadeInSec - 0.5);
        var markerMessageSequence = cc.Sequence.create(fadeInMessage, delay, fadeOutMessage);
        informationMarker.runAction(repeatMarkerSequence);
        markerMessageLabel.runAction(markerMessageSequence);

//        cc.log(informationMarker);
    },
    animateBetting: function (data) {
        var backgroundLayer = this.backgroundLayer;

        var bet_number = this.current_bets;
//        cc.log(bet_number);
//        cc.log(backgroulndLayer);

//        cc.log("inside AnimateBetting !!!");
        var object = playerInformations[data.playerNumber];
        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;
        //res.UI_Cash
//        cc.spriteFrameCache.addSpriteFrames(res.Pedro90_plist);
        var cashSprite = new cc.SpriteBatchNode(res.UI_Cash);
        var cashSpriteName = "bet_player_" + data.playerNumber;


        this.cashSpriteSheet = new cc.Sprite.create(res.UI_Cash);
        this.cashSpriteSheet.setPosition(playerInformations[data.playerNumber].x, playerInformations[data.playerNumber].y);
//        this.cashSpriteSheet.setPosition(700,580);
//        this.cashSpriteSheet.setOpacity(100);
        backgroundLayer.addChild(this.cashSpriteSheet, playerInformations[data.playerNumber].Zindex + 500, "bet" + this.current_bets);
        this.current_bets++;
        //this.sprite.runAction(new cc.MoveTo(cc.p(playerInformations[data.playerNumber].x, playerInformations[data.playerNumber].y)));

        var moveToCenter = new cc.MoveTo.create(1.5, cc.p(700, 580));
//        var moveToCenterSequence = cc.Sequence.create(moveToCenter);
        this.cashSpriteSheet.runAction(moveToCenter, 1);
//        backgroundLayer.addChild(this.loseSpriteSheet, player_z, cashSpriteName);
        //Spawn money over the player
        //Move money to the middle of the game.
        //Fade money out in the table.
//data.playerNumber
//data.ammount

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
            //Reset CurrentBets TO 0 !!!
//            setTimeout(function () {
//                cc.log(backgroundLayer);
//            }, 2600);


        } else {
            cc.log("THERE WERE NO BETS ON THE TABLE!");
        }
    },
    animateYouWin: function (data) {
        var backgroundLayer = this.backgroundLayer;
        //Should add the whole screen sprite
        //Also play an animation to the bottom left of the screen after the whole screen exits.
        var youWinLabel = new cc.LabelTTF("YOU WIN", "MontserratBold", 28);
        youWinLabel.setColor(cc.color(180, 180, 0));
        youWinLabel.setAnchorPoint(0, 0);
        youWinLabel.setOpacity(100);
        youWinLabel.setPosition(cc.p(60, 12));
        backgroundLayer.addChild(youWinLabel, 1500, "youWinLabel");
        var fadeInMessage = cc.FadeIn.create(1);
        var delay = cc.delayTime(3);
        var fadeOutMessage = cc.FadeOut.create(0.5);
        var youWinMessageSequence = cc.Sequence.create(fadeInMessage, delay, fadeOutMessage);
        youWinLabel.runAction(youWinMessageSequence);
        var youWinAmmountLabel = new cc.LabelTTF("£" + data.ammount, "MontserratBold", 36);
        youWinAmmountLabel.setColor(cc.color(180, 180, 0));
        youWinAmmountLabel.setAnchorPoint(0, 0);
        youWinAmmountLabel.setOpacity(100);
        youWinAmmountLabel.setPosition(cc.p(youWinLabel.x + youWinLabel.width + 5, 10));
        backgroundLayer.addChild(youWinAmmountLabel, 1500, "youWinAmmountLabel");
        var fadeInMessageAmmount = cc.FadeIn.create(1);
        var delayAmmount = cc.delayTime(3);
        var fadeOutMessageAmmount = cc.FadeOut.create(0.5);
        var youWinAmmountSequence = cc.Sequence.create(fadeInMessageAmmount, delayAmmount, fadeOutMessageAmmount);
        youWinAmmountLabel.runAction(youWinAmmountSequence);

    },
    animateDisplayBalanceChange: function (data) {
        var backgroundLayer = this.backgroundLayer;
        var yourBalanceLabel = new cc.LabelTTF("BALANCE", "MontserratBold", 28);
        yourBalanceLabel.setColor(cc.color(255, 255, 255));
        yourBalanceLabel.setAnchorPoint(0, 0);
        yourBalanceLabel.setOpacity(100);
        yourBalanceLabel.setPosition(cc.p(50, 50));
        backgroundLayer.addChild(yourBalanceLabel, 1500, "yourBalance");
        var fadeInMessage = cc.FadeIn.create(1);
//        var delay = cc.delayTime(3);
//        var fadeOutMessage = cc.FadeOut.create(0.5);
//        var yourBalanceSequence = cc.Sequence.create(fadeInMessage, delay, fadeOutMessage);
        var yourBalanceSequence = cc.Sequence.create(fadeInMessage);
        yourBalanceLabel.runAction(yourBalanceSequence);

        var yourBalanceAmmountLabel = new cc.LabelTTF("£" + data.balance, "MontserratBold", 36);
        yourBalanceAmmountLabel.setColor(cc.color(255, 255, 255));
        yourBalanceAmmountLabel.setAnchorPoint(0, 0);
        yourBalanceAmmountLabel.setOpacity(100);
        yourBalanceAmmountLabel.setPosition(cc.p(yourBalanceLabel.x + yourBalanceLabel.width + 5, 49));
        backgroundLayer.addChild(yourBalanceAmmountLabel, 1500, "yourBalanceAmmountLabel");
        var fadeInMessageAmmount = cc.FadeIn.create(1);
//        svar delayAmmount = cc.delayTime(3);
//        var fadeOutMessageAmmount = cc.FadeOut.create(0.5);
//        var yourBalanceAmmountSequence = cc.Sequence.create(fadeInMessageAmmount, delayAmmount, fadeOutMessageAmmount);
//        var yourBalanceAmmountSequence = cc.Sequence.create(fadeInMessageAmmount, delayAmmount, fadeOutMessageAmmount);
        yourBalanceAmmountLabel.runAction(fadeInMessageAmmount);

    },
    tintOtherPlayers: function (data) {
//        cc.log(data);
//        cc.log("AAAAAAAAAAAAAAAAA");
        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        var object = playerInformations[data.playerNumber];
        //cc.log(data.number);
//        var childname = "player_" + (data.number - 1);
//        cc.log(childname);
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

                cc.log(data.playerNumber);
                var childE = "player_" + i;
                var player = backgroundLayer.getChildByName(childE);
                if (player) {
                    existingSpecifiedPlayer.push(player);
                }
            }
        }

        existingSpecifiedPlayer.forEach(dosomethingspecial1);
        function dosomethingspecial1(element, index, array) {
            cc.log("Element");
            cc.log(element);
            cc.log("Index");
            cc.log(index);
            cc.log("Array");
            cc.log(array);
            
            
            var unTint = new cc.TintTo.create(0, 250, 250, 250);
            child = element._children[0];
            cc.log("Children[0]");
            cc.log(child);
            child.runAction(unTint);

//            cc.director.pause();
        }


        //cc.log(existingPlayersWithoutSpecified);
        existingPlayersWithoutSpecified.forEach(dosomethingspecial2);
        function dosomethingspecial2(element, index, array) {
            var sprite_action = new cc.TintTo.create(0, 85, 85, 85);
            child = element._children[0];
            child.runAction(sprite_action);
        }


//        var TheActivePlayer = backgroundLayer.getChildByName(childname);
//        cc.log (TheActivePlayer);
//
//        if (TheActivePlayer) {
//            // TheActivePlayer.removeFromParent(1);
//        } else {
//            cc.log("Some strange error when trying to remove player " + (data.number - 1));
//        }

//        cc.spriteFrameCache.addSpriteFrames(res.Pedro90_plist);
//        var thisplayer = this.loseSpriteSheet = new cc.SpriteBatchNode(res.Pedro90_png);
//        var childname = "player_" + number;
//        var asd = new Player(thisplayer, object);
//        backgroundLayer.addChild(this.loseSpriteSheet, player_z, childname);

    }

});
