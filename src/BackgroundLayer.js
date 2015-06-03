var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {

        this._super();
        var winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var spriteBackgroundFull = new cc.Sprite(res.Background_none_png);
        spriteBackgroundFull.setPosition(centerPos);
        this.addChild(spriteBackgroundFull);

        var tablePos = cc.p(winSize.width / 2 - 150, winSize.height / 2 + 35);
        var spriteTable = new cc.Sprite(res.Table_png);
        spriteTable.setPosition(tablePos);

        spriteTable.setOpacity(0);
        this.addChild(spriteTable, 1);

        var fadeInTable = cc.FadeIn.create(2.2);
        spriteTable.runAction(fadeInTable);

        var spriteFootballStripes = new cc.Sprite(res.Football_Stripes);
        spriteFootballStripes.setPosition(centerPos);
        this.addChild(spriteFootballStripes, 0, "FootballStripes");

    }


});