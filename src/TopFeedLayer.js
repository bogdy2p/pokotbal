var TopFeedLayer = cc.Layer.extend({
    currentTime: 0,
    TopFeedTimer: null,
    topFeedWidth: null,
    topFeedHeight: null,
    initialPosition: 0,
    winSize: null,
    ctor: function () {
        this._super();

        this.init();
    },
    init: function () {

        this._super();
        this.winSize = cc.director.getWinSize();

        this.topFeedHeight = 438;
        this.topFeedWidth = 329;



        this.schedule(this.addFeedUpdate, 2);



//        this.scheduleUpdate();


    },
    addFeed: function (time, feedText) {


        var userInterfaceLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.UserInterface);
        var TopFeedSprite = userInterfaceLayer.getChildByName("TopRightInformationBox");
        var TopFeedSpriteSize = TopFeedSprite.getContentSize();

        var timeLabel = new cc.LabelTTF(time, "Helvetica", 24);
        timeLabel.setColor(cc.color(255, 255, 255));
        timeLabel.setAnchorPoint(0, 0);

        timeLabel.setPosition(cc.p(this.winSize.width - TopFeedSpriteSize.width + 50, this.winSize.height - (TopFeedSpriteSize.height / 9) * (this.initialPosition + 1) - 50));
        this.addChild(timeLabel, 3, "timelabel");

        var feedLabel = new cc.LabelTTF(feedText, "Helvetica", 16);
        feedLabel.setColor(cc.color(255, 255, 255));
        feedLabel.setAnchorPoint(0, 0);
        cc.log(feedLabel);

        feedLabel.setPosition(cc.p(0, 0));
        this.addChild(feedLabel);

        this.initialPosition++;



    },
    addFeedUpdate: function (dt) {






        cc.log("Called ADDFEED UPDATE @ : " + dt);

        var asd1 = randomizeText();
        var asd2 = randomizeText();


        this.addFeed(asd1, asd2);
    },
});

function randomizeText() {
    var text = "";
    var possibilities = "abcdefghijklmnopqrstuvxyz";

    for (var i = 0; i < 5; i++) {
        text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
    }
    return text;
}