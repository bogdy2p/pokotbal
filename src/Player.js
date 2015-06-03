var Player = cc.Class.extend({
    playerNumber:null,
    sprite: null,
    ctor: function (spriteSheet, playerdata) {


        this.playerNumber = global_current_position;
        //Spawn player Animation 
        var playerNoAnimation = cc.Sprite("win1.png");
        
        alert("Player " + this.playerNumber + " created");
        
        //======================================================================     
        
        
        //======================================================================   
        //Winning Animation 
        //======================================================================
        var animFramesWin = [];
        for (var i = 1; i < 6; i++) {
            var str = "win" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWin.push(frame);
        }
        var animationWin = new cc.Animation(animFramesWin, 0.4);
        var animateWinning = new cc.Repeat(new cc.Animate(animationWin), 2);
        //======================================================================   
        //Losing Animation 
        //======================================================================
        var animFramesLose = [];
        for (var i = 1; i < 6; i++) {
            var str = "lose" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesLose.push(frame);
        }
        var animationLose = new cc.Animation(animFramesLose, 0.4);
        var animateLosing = new cc.Repeat(new cc.Animate(animationLose), 2);
        //======================================================================   
        //Waiting Animation 
        //======================================================================    
        var animFramesWait = [];
        for (var i = 1; i < 6; i++) {
            var str = "wait" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesWait.push(frame);
        }
        var animationWait = new cc.Animation(animFramesWait, 0.4);
        var animateWaiting = new cc.Repeat(new cc.Animate(animationWait), 2);
        //======================================================================   







        var winLoseWait = cc.Sequence.create(animateWinning, animateLosing, animateWaiting);
        this.sprite = new cc.Sprite("res/player1.png");





        this.sprite.runAction(winLoseWait);


        this.sprite.setPosition(playerdata.x, playerdata.y);
        spriteSheet.addChild(this.sprite, playerdata.Zindex, playerdata.defaultName);
        this.sprite.runAction(new cc.MoveTo(cc.p(playerdata.x, playerdata.y)));
        
        global_current_position++;
    },
});