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
        this.addInformationMarker();

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
    addInformationMarker: function () {
//        //============================================================
//        //Add The Game Marker Box.
//        var informationMarker = new cc.Sprite(res.UI_Marker);
//        informationMarker.setAnchorPoint(0.5, 0.5);
//        informationMarker.setPosition(cc.p(this.winSize.width / 2 - 130, 160));
//        informationMarker.setOpacity(0);
//        this.backgroundLayer.addChild(informationMarker);
//        //============================================================
//        //
//        //Create the animation sequence for the marker
//        var fadeIn2 = cc.FadeIn.create(2);
//        var fadeOut1 = cc.FadeOut.create(1);
//        var markerSequence = cc.Sequence.create(fadeIn2, fadeOut1);
//        var repeatMarkerSequence = cc.RepeatForever.create(markerSequence);
//        informationMarker.runAction(repeatMarkerSequence);
//        //======================================================================

    }


});