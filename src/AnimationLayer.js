var AnimationLayer = cc.Layer.extend({
    currentPosition: 0,
    spriteSheet: null,
    pedroAnimationAction: null,
    spawnPlayerAction: null,
    seconds: null,
    asd2: null,
//    parentClass: this.getParent(),
    sprite: null,
    ctor: function () {
        this._super();
        this.init();
//        this.spawnPlayers();

    },
    init: function () {
        this._super();


        cc.spriteFrameCache.addSpriteFrames(res.Pedroanimation_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.Pedroanimation_png);
        this.addChild(this.spriteSheet);
        var animFrames = [];
        for (var i = 0; i < 10; i++) {
            var str = "player" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.3);
        this.pedroAnimationAction = new cc.repeatForever(new cc.Animate(animation));
        this.sprite = new cc.Sprite("#player1.png");
        this.sprite.attr({x: 700, y: 400});
        this.sprite.runAction(this.pedroAnimationAction);
//        this.spriteSheet.addChild(this.sprite, 2);

        this.scheduleUpdate();

        this.spawnPlayer(2);
        this.spawnPlayer(3);
        this.spawnPlayer(1);

//        this.spawnPlayer();
//        this.spawnPlayer();
    },
//    spawnPlayers: function (howmany) {
//
//        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//
//        var all_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
////        var howmany = Math.floor((Math.random() * 10) + 1);
//        var picked_numbers = [];
//        for (x = 0; x < howmany; x++) {
//            picked_numbers.push(Math.floor((Math.random() * 10) + 1) - 1);
//        }
//        var unique_picked_numbers = _.uniq(picked_numbers);
//
//        for (i = 0; i < playerPositions.length; i++) {
//
//            var object = playerPositions[i];
//            var player_x = object.x;
//            var player_y = object.y;
//            var player_z = object.zIndex;
//
//
//
//
//
//            switch (i) {
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
//            }
//
//            newPlayer.attr({x: player_x, y: player_y});
//
//            for (j = 0; j < unique_picked_numbers.length; j++) {
//                if (i === unique_picked_numbers[j]) {
//                    backgroundLayer.addChild(newPlayer, player_z);
//                }
//            }
//        }
//
//    },
    spawnPlayer: function (number) {

        var player_no = this.currentPosition;
        var number = player_no;
//        var number = number;

        var backgroundLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.background);
//        var object = playerPositions[this.currentPosition];
        var object = playerPositions[number];

        var player_x = object.x;
        var player_y = object.y;
        var player_z = object.zIndex;

        var str = "player" + player_no;

        cc.log(player_no);

        cc.log(str);

//        var newPlayer = new cc.Sprite(res.Pedroanimation_plist);
//        newPlayer.attr({x: player_x, y: player_y});
//        backgroundLayer.addChild(newPlayer, player_z);
        this.currentPosition++;


        cc.spriteFrameCache.addSpriteFrames(res.ThreePlayers_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.ThreePlayers_png);
        this.addChild(this.spriteSheet);
        var animFrames = [];
        for (var i = 0; i < 10; i++) {
            var str = "player" + player_no + "_" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            cc.log(frame);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.3);
        this.spawnPlayerAction = new cc.repeatForever(new cc.Animate(animation));
        this.sprite = new cc.Sprite("#" + str);
        cc.log(this.sprite);
        this.sprite.attr({x: object.x, y: object.y});
        this.sprite.runAction(this.spawnPlayerAction);
        this.spriteSheet.addChild(this.sprite, 2);




    },
    update: function (dt) {

//        this.seconds += dt * 220;
        this.seconds += dt;
        var seconds = Math.floor(this.seconds);

//        cc.log(seconds);
        var UserInterfaceLayer = this.getParent().getChildByTag(TagOfLayer.UserInterface);
        UserInterfaceLayer.updateTimerClock(seconds);


        //RESET AND SWITCH TO SECOND ROUND ?

//        if ((seconds > 0) && (seconds > 2700)) {
//            cc.director.pause();
//
//            cc.director.runScene(new PlayScene2(), this);
//            cc.director.resume();
//        }





    }

});