var LastLayer = cc.Layer.extend({
    buttons_initialX: 300,

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

        var button3 = new cc.Sprite(res.Button3_png);
        button3.setAnchorPoint(0, 0);
        button3.setPosition(cc.p(this.buttons_initialX + 2 * (button3.width + 1), winSize.height - button3.height));
        this.addChild(button3, 1, "Button3");

        var button4 = new cc.Sprite(res.Button4_png);
        button4.setAnchorPoint(0, 0);
        button4.setPosition(cc.p(this.buttons_initialX + 3 * (button4.width + 1), winSize.height - button4.height));
        this.addChild(button4, 1, "Button4");

        var button5 = new cc.Sprite(res.Button5_png);
        button5.setAnchorPoint(0, 0);
        button5.setPosition(cc.p(this.buttons_initialX + 4 * (button5.width + 1), winSize.height - button5.height));
        this.addChild(button5, 1, "Button5");

    },   
    
    spawnPlayer: function (number) {

    },
    update: function (dt) {
//
    }

});