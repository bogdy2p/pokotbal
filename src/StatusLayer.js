if (SHOWALL) {
    var StatusLayer = cc.Layer.extend({
        backgroundLayer: null,
        winSize: null,
        label1: null,
        ctor: function () {
            this._super();
            this.backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
            this.winSize = cc.director.getWinSize();
            this.init();
        },
        init: function () {
            this._super();

            this.addGameTitleInformation();
//        this.addInformationMarker();

        },
        addGameTitleInformation: function () {

            //Add Game Information Box
            var GameTitleBox = new cc.Sprite(res.UI_MatchInfo);
            GameTitleBox.setAnchorPoint(0.5, 0.5);
            GameTitleBox.setPosition(cc.p(this.winSize.width / 2 - 130, 940));
//        GameTitleBox.setOpacity(90);
            this.backgroundLayer.addChild(GameTitleBox, 5, "GameTitleBox");
            var fadeInBot = cc.FadeIn.create(3);
            GameTitleBox.runAction(fadeInBot);
        }
        ,
    });
}