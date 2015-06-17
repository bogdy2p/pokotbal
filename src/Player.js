var Player = cc.Layer.extend({
    popUpPixelDifference: 120,
    debugPlayer: false,
    playerNumber: null,
    playerNameLabel: null,
    playerAmmountLabel: null,
    playerSpriteSheet: null,
    sprite: null,
    popUp: null,
    ctor: function (spriteSheet, playerdata, playerModel) {
//        this.playerNumber = global_current_position;
        this.playerSpriteSheet = spriteSheet;
      cc.log(playerModel);
//=================!!!!!!!TO DO!!!!!!!=========================================
//        //This will be the sprite of the default player.
//        // Should be a different sprite for each player. (up-to 5 ? );
//        cc.log(playerdata);
//        var initial_picture = "#wait" + playerdata.playerNumber + ".png";
//        this.sprite = new cc.Sprite.create(initial_picture);
//=============================================================================

        var initial_sprite_string = "#_0000_" + playerModel + "loseA1.png.png";
        cc.log(initial_sprite_string);

        this.sprite = new cc.Sprite.create(initial_sprite_string);
        this.sprite.setPosition(playerdata.x, playerdata.y);
//        this.sprite.setAnchorPoint(1,1);
        this.sprite.setOpacity(0);
        spriteSheet.addChild(this.sprite, playerdata.Zindex, playerdata.defaultName);
        this.sprite.runAction(new cc.MoveTo(cc.p(playerdata.x, playerdata.y)));

        this.popUp = new cc.Sprite.create(res.P_popupOverGrey);
        if (playerdata.playerNumber <= 4) {
            this.popUp.setPosition(playerdata.x, playerdata.y + this.popUpPixelDifference);
        } else {
            this.popUp.setRotation(180);
            this.popUp.setPosition(playerdata.x, playerdata.y - this.popUpPixelDifference - 5);
        }
        spriteSheet.addChild(this.popUp, playerdata.Zindex, playerdata.defaultName + "_popup");
//        global_current_position++;
        this.init();
    },
    init: function () {
        this.animateFadeIn();
    },
    animateFadeIn: function () {
        var fadeInPlayer = cc.FadeIn.create(0.8);
        this.sprite.runAction(fadeInPlayer);
    },
    animateFadeOut: function () {
        var fadeOutPlayer = cc.FadeOut.create(1);
        this.sprite.runAction(fadeOutPlayer);
    },
});
