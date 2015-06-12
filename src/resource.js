var res = {
    HelloWorld_png: "res/HelloWorld.png",
    CloseNormal_png: "res/CloseNormal.png",
    CloseSelected_png: "res/CloseSelected.png",
//    Background_none_png: "res/background/BackgroundNone.png",
    Background_none_png: "res/background/stripes.png",
    Table_png: "res/background/Table14.png",
    //USER INTERFACE RESOURCES ================================================    
    UI_Marker: "res/userinterface/Marker.png",
    UI_BottomLeftInfo: "res/userinterface/BotLeftInfoNone.png",
    //UI_BottomLeftInfo: "res/userinterface/BotLeftInfo.png",
    UI_BottomMenu: "res/userinterface/BottomMenu.png",
    UI_BottomMenuClicked: "res/userinterface/BottomMenuClicked.png",
    UI_BottomMenuOpened: "res/userinterface/BottomMenuOpened.png",
    UI_ChatBarOpened: "res/userinterface/ChatBarOpened.png",
    UI_BottomRight: "res/userinterface/BottomRight.png",
    UI_TopRight: "res/userinterface/TopRight.png",
    UI_MatchInfo: "res/userinterface/MatchInfo.png",
    UI_TimerClock: "res/userinterface/TimerClock.png",
    UI_SettingsMenu: "res/userinterface/SettingsMenu.png",
    UI_MatchFeedBar: "res/userinterface/MatchFeed.png",
    UI_GameEventsBar: "res/userinterface/GameEvents.png",
    UI_MiniGameBar: "res/userinterface/MiniGameBar.png",
    UI_MiniGameBarClicked: "res/userinterface/MiniGameBarClicked.png",
    UI_ChatBar: "res/userinterface/ChatBar.png",
    UI_ChatBarClicked: "res/userinterface/ChatBarClicked.png",
    UI_Announcement: "res/userinterface/Announcement1.png",
    UI_TopLeftNormal: "res/userinterface/TopLeftNormal.png",
    UI_TopLeftPressed: "res/userinterface/TopLeftPressed.png",
    UI_Cash: "res/userinterface/CashNull.png",
    //=========================================================================

    //Player Popups ===========================================================
    P_popupOverGrey: "res/userinterface/OverPopupGrey.png",
    P_popupOverGreen: "res/userinterface/OverPopupGreen.png",
    P_popupUnderGrey: "res/userinterface/UnderPopupGrey.png",
    P_popupUnderGreen: "res/userinterface/UnderPopupGreen.png",
    P_overHead: "res/userinterface/OverHead.png",
    //=========================================================================
    Test_png: "res/test.png",
    //Controls

    Start_s_png: "res/controls/start_s.png",
    Start_n_png: "res/controls/start_n.png",
    //Players :
    Finale_png: "res/animations/finale.png",
    Finale_plist: "res/animations/finale.plist",

    //Pedro Animation
    Losenew_plist: "res/new/losenew.plist",
    Losenew_png: "res/new/losenew.png",
    Losing_png: "res/pedro/textures/lose.png",
    Losing_plist: "res/pedro/textures/lose.plist",
    Pedrofull_png: "res/animations/pedrofull.png",
    Pedrofull_plist: "res/animations/pedrofull.plist",
    Pedro90_png: "res/animations/pedro90.png",
    Pedro90_plist: "res/animations/pedro90.plist",
    Pedroanimation_png: "res/pedro/textures/pedroanim.png",
    Pedroanimation_plist: "res/pedro/textures/pedroanim.plist",
    Players_png: "res/pedro/textures/players.png",
    Players_plist: "res/pedro/textures/players.plist",
    ThreePlayers_png: "res/pedro/textures/3players.png",
    ThreePlayers_plist: "res/pedro/textures/3players.plist",
    Button1_png: "res/1.png",
    Button2_png: "res/2.png",
    Button3_png: "res/3.png",
    Button4_png: "res/4.png",
    Button5_png: "res/5.png",
    ///////////FONTS
    MontserratReg: "res/fonts/MontserratRegular.ttf",
    MontserratBold: "res/fonts/MontserratBold.ttf",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}