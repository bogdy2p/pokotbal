var TopFeedLayer = cc.Layer.extend({
    displayed: 0,
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
        this.schedule(this.addFeedUpdate, 1);

    },
    addFeed: function (time, feedText) {

        var userInterfaceLayer = cc.director.getRunningScene().getChildByTag(TagOfLayer.UserInterface);
        var TopFeedSprite = userInterfaceLayer.getChildByName("TopRightInformationBox");
        var TopFeedSpriteSize = TopFeedSprite.getContentSize();
        var timeLabel = new cc.LabelTTF(time, "Helvetica", 15);
        timeLabel.setColor(cc.color(255, 255, 255));
        timeLabel.setAnchorPoint(0, 0);
        timeLabel.setPosition(cc.p(this.winSize.width - TopFeedSpriteSize.width + 62, this.winSize.height - (TopFeedSpriteSize.height / 12) * (this.initialPosition + 1) - 50));
        this.addChild(timeLabel, 3, "timelabel");
        var feedLabel = new cc.LabelTTF(feedText, "Helvetica", 15);
        feedLabel.setColor(cc.color(255, 255, 255));
        feedLabel.setAnchorPoint(0, 0);
        feedLabel.setPosition(cc.p(this.winSize.width - TopFeedSpriteSize.width + timeLabel.width + 75, this.winSize.height - (TopFeedSpriteSize.height / 12) * (this.initialPosition + 1) - 50));
        this.addChild(feedLabel);

        this.initialPosition++;



    },
    addFeedUpdate: function (dt) {
 
        var second = Math.floor(dt);
        this.currentTime += second;
        var thefeed = randomizeText();
        var number = this.currentTime;
        var string = number.toString();

        var randomValue = Math.floor((Math.random() * 10) + 1);
        var randomValue2 = Math.floor((Math.random() * 10) + 1);

        if (this.currentTime % randomValue == randomValue2) {
            if (this.displayed < 9) {
                this.addFeed(string.toMMSS(), thefeed);
                this.displayed++;
            }
        }

    },
});

function randomizeText() {
    var text = "";
    var possibilities = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    var randomnumber1 = Math.floor((Math.random() * 10) + 1);
    for (var i = 0; i < randomnumber1; i++) {
        text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
    }
    text += " ";
    var randomnumber2 = Math.floor((Math.random() * 10) + 1);
    for (var j = 0; j < randomnumber2; j++) {
        text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
    }
    return text;
}

String.prototype.toMMSS = function () {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = minutes + "' " + seconds + "\"";
    return time;
}