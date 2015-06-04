var LastLayer = cc.Layer.extend({
    buttons_initialX: 300,
    buton1_clicked: false,
    buton2_clicked: false,
    buton3_clicked: false,
    buton4_clicked: false,
    buton5_clicked: false,
    ctor: function () {
        this._super();
        this.init();

    },
    init: function () {
        this._super();

        var winSize = cc.director.getWinSize();


        var button1 = new cc.Sprite(res.Button1_png);
        button1.setAnchorPoint(0, 0);
        button1.setPosition(cc.p(this.buttons_initialX, winSize.height - button1.height));
        this.addChild(button1, 1, "Button1");

        var button2 = new cc.Sprite(res.Button2_png);
        button2.setAnchorPoint(0, 0);
        button2.setPosition(cc.p(this.buttons_initialX + button2.width + 1, winSize.height - button2.height));
        this.addChild(button2, 1, "Button2");

        var button3Button = new cc.MenuItemSprite(
                new cc.Sprite(res.Button3_png), // normal state
                new cc.Sprite(res.Button2_png), // pressed state
                this.clickButton3, this);

        var button3 = new cc.Menu.create(button3Button);
        button3.setAnchorPoint(0.5, 0.5);
        button3.setPosition(cc.p(760, winSize.height - button3Button.height / 2));
        this.addChild(button3);


        var button4Button = new cc.MenuItemSprite(
                new cc.Sprite(res.Button4_png), // normal state
                new cc.Sprite(res.Button3_png), // pressed state
                this.clickButton4, this);

        var button4 = new cc.Menu.create(button4Button);
        button4.setAnchorPoint(0.5, 0.5);
        button4.setPosition(cc.p(960, winSize.height - button4Button.height / 2));
        this.addChild(button4);




        var button5Button = new cc.MenuItemSprite(
                new cc.Sprite(res.Button5_png), // normal state
                new cc.Sprite(res.Button4_png), // pressed state
                this.clickButton5, this);

        var button5 = new cc.Menu.create(button5Button);
        button5.setAnchorPoint(0.5, 0.5);
        button5.setPosition(cc.p(1030, winSize.height - button5Button.height / 2));
        this.addChild(button5);


    },
    clickButton3: function ( data ) {
//        cc.log(clickButton3);
        console.log(data);
        
        
        
        var number = 3;
        var AnimationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var BackgroundLayer = this.getParent().getChildByTag(TagOfLayer.background);
        var childname = "player_" + number;
        var PlayerSpawned = BackgroundLayer.getChildByName(childname);
        if (PlayerSpawned) {
            PlayerSpawned.removeFromParent(1);
        }
        var AnimationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        AnimationLayer.spawnPlayer(number, "asd", 4);

    },
    clickButton4: function () {
        var number = 1;
        var AnimationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var BackgroundLayer = this.getParent().getChildByTag(TagOfLayer.background);
        var childname = "player_" + number;
        var PlayerSpawned = BackgroundLayer.getChildByName(childname);
        if (PlayerSpawned) {
            PlayerSpawned.removeFromParent(1);
        }
        var AnimationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        AnimationLayer.spawnPlayer(number, "asd", 4);

    },
    clickButton5: function () {
        var number = 4;
        if (this.buton5_clicked) {
//            alert("You clicked button 5 again. The respective player should disappear");
            var AnimationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
            var BackgroundLayer = this.getParent().getChildByTag(TagOfLayer.background);
            var childname = "player_" + number;
            var PlayerSpawned = BackgroundLayer.getChildByName(childname);
            cc.log(PlayerSpawned);
            PlayerSpawned.removeFromParent(1);
            this.buton5_clicked = false;
        } else {
//            alert("You clicked button 5. You should see a new player @ the table.");
            var AnimationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
            AnimationLayer.spawnPlayer(number, "asd", 4);
            this.buton5_clicked = true;
        }
    },
    update: function (dt) {
//
    }

});