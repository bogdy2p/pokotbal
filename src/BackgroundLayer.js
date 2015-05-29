var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {



//        cc.log(this);


//        var all_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//        var howmany = Math.floor((Math.random() * 10) + 1);
//        var picked_numbers = [];
//
//        for (x = 0; x < howmany; x++) {
//            picked_numbers.push(Math.floor((Math.random() * 10) + 1) - 1);
//        }
//        var unique_picked_numbers = _.uniq(picked_numbers);

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

        var fadeInTable = cc.FadeIn.create(0.2);
        spriteTable.runAction(fadeInTable);

        var spriteFootballStripes = new cc.Sprite(res.Football_Stripes);
        spriteFootballStripes.setPosition(centerPos);
        this.addChild(spriteFootballStripes, 0, "FootballStripes");


//        for (i = 0; i < playerPositions.length; i++) {
//            //this.addChild(new PlayerLayer(playerPositions[i][0] , playerPositions[i][1]));
//
//            var object = playerPositions[i];
//            var player_x = object.x;
//            var player_y = object.y;
//            var player_z = object.zIndex;
//
//            switch (i) {
//
//                case 0:
//                    var newPlayer = new cc.Sprite(res.Player1);
//                    break;
//                case 1:
//                    var newPlayer = new cc.Sprite(res.Player2);
//                    break;
//                case 2:
//                    var newPlayer = new cc.Sprite(res.Player3);
//                    break;
//                case 3:
//                    var newPlayer = new cc.Sprite(res.Player4);
//                    break;
//                case 4:
//                    var newPlayer = new cc.Sprite(res.Player5);
//                    break;
//                case 5:
//                    var newPlayer = new cc.Sprite(res.Player6);
//                    break;
//                case 6:
//                    var newPlayer = new cc.Sprite(res.Player7);
//                    break;
//                case 7:
//                    var newPlayer = new cc.Sprite(res.Player8);
//                    break;
//                case 8:
//                    var newPlayer = new cc.Sprite(res.Player9);
//                    break;
//                case 9:
//                    var newPlayer = new cc.Sprite(res.Player10);
//                    break;
//                default:
//                    var newPlayer = new cc.Sprite(res.Player1);
//                    break;
//
//            }
//            newPlayer.attr({x: player_x, y: player_y});
//
//            for (j = 0; j < unique_picked_numbers.length; j++) {
//
//                if (i === unique_picked_numbers[j]) {
////                    this.addChild(newPlayer, player_z);
//                    
//                    
//                    ////////////////////////////////////////////////////////////
//                    //Add the Tags OVER or UNDER the player.
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    
//                    ////////////////////////////////////////////////////////////
//                    
//                    
//                    
//                }
//            }
//        }
    }


});