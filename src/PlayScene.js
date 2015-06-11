var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        this.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.addChild(new AnimationLayer(), 1, TagOfLayer.Animation);
        if (SHOWALL) {
            this.addChild(new StatusLayer(), 2, TagOfLayer.Status);
        }
        this.addChild(new UserInterfaceLayer(), 3, TagOfLayer.UserInterface);
    },
});
