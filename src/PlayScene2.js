var PlayScene2 = cc.Scene.extend({
    onEnter: function () {
        this._super();

//        this.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.addChild(new AnimationLayer(), 1, TagOfLayer.Animation);
        this.addChild(new StatusLayer(), 2, TagOfLayer.Status);
        this.addChild(new UserInterfaceLayer(), 3, TagOfLayer.UserInterface);
        this.addChild(new LastLayer(), 4, TagOfLayer.LastLayer);
        this.addChild(new TopFeed(), 5, TagOfLayer.TopFeed);
        this.addChild(new BotFeed(), 6, TagOfLayer.BotFeed);
    }

});