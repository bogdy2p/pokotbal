var BackgroundLayer = cc.Layer.extend({
    current_bet_number:null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {

        this._super();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var tablePos = cc.p(winSize.width / 2 , winSize.height / 2 );
        var spriteTable = new cc.Sprite(res.Table_png);
        spriteTable.setPosition(tablePos);
        spriteTable.setOpacity(0);
        this.addChild(spriteTable, 1, "thegametable");
        var fadeInTable = cc.FadeIn.create(1.2);
        spriteTable.runAction(fadeInTable);
    },
});