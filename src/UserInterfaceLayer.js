
var UserInterfaceLayer = cc.Layer.extend({
    backgroundLayer: null,
    gameRound: 1,
    bottom_menu_opened: false,
    chat_bar_opened: false,
    settings_menu_opened: false,
    timerLabel: null,
    startTime: 0,
    ctor: function () {
        this._super();
        this.backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
        this.bottom_menu_opened = false;
        this.chat_bar_opened = false;
        this.settings_menu_opened = false;
        this.init();
    },
    init: function () {
        var backgroundLayer = this.backgroundLayer;
        this._super();

//        var winSize = cc.director.getWinSize();
//        var centerBottom = cc.p(winSize.width / 2, 0);
//        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
//        if (SHOWALL) {
//            //Add Bottom Left Information Box
//            var spriteBotLeftInfo = new cc.Sprite(res.UI_BottomLeftInfo);
//            spriteBotLeftInfo.setAnchorPoint(0, 0);
//            spriteBotLeftInfo.setPosition(cc.p(0, 0));
//            spriteBotLeftInfo.setOpacity(0);
//
//            //THIS IS THE FIRST CHILD OF THE INTERFACE LAYER
//            backgroundLayer.addChild(spriteBotLeftInfo);
//            var fadeInBot = cc.FadeIn.create(5 / GGS);
//            spriteBotLeftInfo.runAction(fadeInBot);
//            //============================================================
//
//            //Add BottomRight Information Box
//            var BottomRightInformationBox = new cc.Sprite(res.UI_BottomRight);
//            BottomRightInformationBox.setAnchorPoint(0, 0);
//            BottomRightInformationBox.setPosition(cc.p(winSize.width - BottomRightInformationBox.width, 00));
//            BottomRightInformationBox.setOpacity(0);
//            this.addChild(BottomRightInformationBox);
//            BottomRightInformationBox.runAction(cc.FadeIn.create(4 / GGS));
//            //============================================================
//
//            //Add TopRight Information Box
//            var TopRightInformationBox = new cc.Sprite(res.UI_TopRight);
//            TopRightInformationBox.setAnchorPoint(0, 0);
//            TopRightInformationBox.setPosition(cc.p(winSize.width - TopRightInformationBox.width, winSize.height - TopRightInformationBox.height));
//            this.addChild(TopRightInformationBox, 0, "TopRightInformationBox");
////        alert(TopRightInformationBox.width);
////        alert(TopRightInformationBox.height);
//            //============================================================
//
//            //Add TimerClock Sprite
//            var TimerClockSprite = new cc.Sprite(res.UI_TimerClock);
//            TimerClockSprite.setAnchorPoint(0, 0);
//            TimerClockSprite.setPosition(cc.p(winSize.width - 265, winSize.height - TimerClockSprite.height - 15));
//            this.addChild(TimerClockSprite);
//            //============================================================
//
//
//            //Add Default TimerLabel Label
//            this.timerLabel = new cc.LabelTTF("00:00:00", "MontserratBold", 26);
//            this.timerLabel.setColor(cc.color(255, 255, 255));
//            this.timerLabel.setAnchorPoint(0, 0);
//            this.timerLabel.setPosition(cc.p(winSize.width - 265 + TimerClockSprite.width + 5, winSize.height - TimerClockSprite.height - 18));
//            this.addChild(this.timerLabel);
//            //============================================================
//
//            //Add MiniGame Button / Menu Item and assign it to "onclickminigamebar" function"
//            var miniGameBarButton = new cc.MenuItemSprite(
//                    new cc.Sprite(res.UI_MiniGameBar), // normal state
//                    new cc.Sprite(res.UI_MiniGameBarClicked), // pressed state
//                    this.onClickMiniGameBar, this);
//            var miniGame = new cc.Menu.create(miniGameBarButton);
//            miniGame.setAnchorPoint(0.5, 0.5);
//            miniGame.setPosition(cc.p(1030, miniGameBarButton.height / 2));
//            this.addChild(miniGame);
//            //=====================================================================
//
//            //Add MiniGame Button / Menu Item and assign it to "onclickminigamebar" function"
//            var chatBarButton = new cc.MenuItemSprite(
//                    new cc.Sprite(res.UI_ChatBar), // normal state
//                    new cc.Sprite(res.UI_ChatBarClicked), // pressed state
//                    this.onClickChatBar, this);
//            var chatBar = new cc.Menu.create(chatBarButton);
//            chatBar.setAnchorPoint(0.5, 0.5);
//            chatBar.setPosition(cc.p(1030 + chatBarButton.width, chatBarButton.height / 2));
//            this.addChild(chatBar);
//            //=====================================================================
//
//            //Add MiniGame Button / Menu Item and assign it to "onclickminigamebar" function"
//            var settingsButton = new cc.MenuItemSprite(
//                    new cc.Sprite(res.UI_TopLeftNormal), // normal state
//                    new cc.Sprite(res.UI_TopLeftPressed), // pressed state
//                    this.onClickTopLeftButton, this);
//            var topLeft = new cc.Menu.create(settingsButton);
//            topLeft.setAnchorPoint(0.5, 0.5);
//            topLeft.setPosition(cc.p(62, 969));
//            this.addChild(topLeft);
//            //=====================================================================
//            this.scheduleUpdate();
//        }

    },
//    onClickMiniGameBar: function () {
//        var a = new cc.Sprite(res.UI_BottomMenuOpened);
//        a.setAnchorPoint(0, 0);
//        a.setPosition(cc.p(1377 - a.width, 40));
//        if (this.bottom_menu_opened) {
//            var MiniGameBarRemoveAction = this.getChildByName("MiniGameMenuChild");
//            MiniGameBarRemoveAction.runAction(
//                    cc.CallFunc.create(this.removeChild, this, true));
//            var ChatBarRemoveAction = this.getChildByName("ChatBarMenuChild");
//            if (ChatBarRemoveAction) {
//                ChatBarRemoveAction.runAction(
//                        cc.CallFunc.create(this.removeChild, this, true));
//            }
//            this.chat_bar_opened = false;
//            this.bottom_menu_opened = false;
//        } else {
//            var ChatBarRemoveAction = this.getChildByName("ChatBarMenuChild");
//            if (ChatBarRemoveAction) {
//                ChatBarRemoveAction.runAction(
//                        cc.CallFunc.create(this.removeChild, this, true));
//            }
//            this.addChild(a, 1, "MiniGameMenuChild");
//            this.chat_bar_opened = false;
//            this.bottom_menu_opened = true;
//        }
//    },
//    onClickChatBar: function () {
//        var a = new cc.Sprite(res.UI_ChatBarOpened);
//        a.setAnchorPoint(0, 0);
//        a.setPosition(cc.p(1377 - a.width, 40));
//        if (this.chat_bar_opened) {
//            var ChatBarRemoveAction = this.getChildByName("ChatBarMenuChild");
//            ChatBarRemoveAction.runAction(
//                    cc.CallFunc.create(this.removeChild, this, true));
//
//            var MiniGameBarRemoveAction = this.getChildByName("MiniGameMenuChild");
//            if (MiniGameBarRemoveAction) {
//                MiniGameBarRemoveAction.runAction(
//                        cc.CallFunc.create(this.removeChild, this, true));
//            }
//            this.bottom_menu_opened = false;
//            this.chat_bar_opened = false;
//        } else {
//            var MiniGameBarRemoveAction = this.getChildByName("MiniGameMenuChild");
//            if (MiniGameBarRemoveAction) {
//                MiniGameBarRemoveAction.runAction(
//                        cc.CallFunc.create(this.removeChild, this, true));
//            }
//            this.addChild(a, 1, "ChatBarMenuChild");
//            this.bottom_menu_opened = false;
//            this.chat_bar_opened = true;
//        }
//    },
//    onClickTopLeftButton: function () {
//
//        var winSize = cc.director.getWinSize();
//        var settingsMenuSprite = new cc.Sprite(res.UI_SettingsMenu);
//        settingsMenuSprite.setAnchorPoint(0.5, 0.5);
//        settingsMenuSprite.setPosition(winSize.width / 2 - 135, winSize.height / 2);
//
//        switch (this.settings_menu_opened) {
//            case true:
//                var SettingsMenuRemoveAction = this.getChildByName("SettingsMenuSprite");
//                SettingsMenuRemoveAction.runAction(cc.CallFunc.create(this.removeChild, this, true));
//                this.settings_menu_opened = false;
//                break;
//            case false:
//                this.addChild(settingsMenuSprite, 1, "SettingsMenuSprite");
//                this.settings_menu_opened = true;
//                break;
//            default:
//                break;
//        }
//    }
//    ,
//    updateTimerClock: function (seconds) {
//        if (SHOWALL) {
////In order to speed up
//            seconds = seconds * GGS;
////        cc.log(seconds);
//            var minute = Math.floor(seconds / 60);
//            if (minute < 10) {
//                minute = "0" + Math.floor(minute);
//            }
////        cc.log(minute);
//            var the_second = seconds % 60;
//            if (the_second < 10) {
//                the_second = "0" + Math.floor(seconds % 60);
//            }
////        cc.log(the_second);
//            this.timerLabel.setString("00:" + minute + ":" + the_second + "");
//        }
//
//    }
});