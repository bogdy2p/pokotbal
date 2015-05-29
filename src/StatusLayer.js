var StatusLayer = cc.Layer.extend({
    label1: null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();

        var winSize = cc.director.getWinSize();

        //Add Game Information Box
        var gameInformationBox = new cc.Sprite(res.UI_MatchInfo);
        gameInformationBox.setAnchorPoint(0.5,0.5);
        gameInformationBox.setPosition(cc.p(winSize.width / 2 - 130, 940));
        gameInformationBox.setOpacity(0);
        this.addChild(gameInformationBox);
        var fadeInBot = cc.FadeIn.create(3);
        gameInformationBox.runAction(fadeInBot);
        //============================================================
        //
        //Add The Game Marker Box.
        var informationMarker = new cc.Sprite(res.UI_Marker);
        informationMarker.setAnchorPoint(0.5,0.5);
        informationMarker.setPosition(cc.p(winSize.width / 2 - 130 , 160));
        informationMarker.setOpacity(0);
        this.addChild(informationMarker);
        //============================================================
        //
        //Create the animation sequence for the marker
        var fadeIn2 = cc.FadeIn.create(2);
        var fadeOut1 = cc.FadeOut.create(1);
        var markerSequence = cc.Sequence.create(fadeIn2,fadeOut1);
        var repeatMarkerSequence = cc.RepeatForever.create(markerSequence);
        informationMarker.runAction(repeatMarkerSequence);
        //======================================================================

        




    }



});