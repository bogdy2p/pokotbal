//
//var MenuLayer = cc.Layer.extend({
//    ctor: function () {
//        this._super();
//    },
//    init: function () {
//        this._super();
//       
//        var winSize = cc.director.getWinSize();
//        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
//        var spriteBackground = new cc.Sprite(res.Background_none_png);
//        spriteBackground.setPosition(centerPos);
//        //Add Start Menu Button / Menu Item and assign it to "ONPLAY" function"
//        var menuItemPlay = new cc.MenuItemSprite(
//                new cc.Sprite(res.Start_n_png), // normal state
//                new cc.Sprite(res.Start_s_png), // pressed state
//                this.onPlay, this);
//        var menu = new cc.Menu.create(menuItemPlay);
//        menu.setPosition(centerPos);
//        this.addChild(menu);
//        //=====================================================================
//    },
//    //========================================================================
//    onPlay: function () {
//        cc.director.runScene(new PlayScene());
//    }
//    //=========================================================================
//});
//var MenuScene = cc.Scene.extend({
//    onEnter: function () {
//        this._super();
//        var layer = new MenuLayer();
//        layer.init();
//        this.addChild(layer);
//    }
//
//});