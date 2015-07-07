var res = {
    HelloWorld_png: "res/HelloWorld.png",
    Table_png: "res/background/Table.png",
    //USER INTERFACE RESOURCES ================================================    
    UI_Marker: "res/userinterface/Marker.png",
    UI_Cash: "res/userinterface/CashGood.png",
    //=========================================================================

    //Player Popups ===========================================================
    P_popupOverGrey: "res/userinterface/OverPopupGrey.png",
    P_popupOverGreen: "res/userinterface/OverPopupGreen.png",
    P_overHead: "res/userinterface/OverHead.png",
    //=========================================================================
    
    //Controls
    ///////////FONTS
    MontserratReg: "res/fonts/MontserratRegular.ttf",
    MontserratBold: "res/fonts/MontserratBold.ttf",
    //Game Popups ===========================================================    
    ThePotFlag: "res/userinterface/ThePot.png",
    Player1_plist: "res/animations/player1.plist",
    Player1_png: "res/animations/player1.png",
    Player2_plist: "res/animations/player2.plist",
    Player2_png: "res/animations/player2.png",
    Player3_plist: "res/animations/player3.plist",
    Player3_png: "res/animations/player3.png",
    Player4_plist: "res/animations/player4.plist",
    Player4_png: "res/animations/player4.png",
    Player5_plist: "res/animations/player5.plist",
    Player5_png: "res/animations/player5.png",
    
    
    
    //Big Popup Animations Components
    BP_Transparency: "res/popups/whitetransparent.png",
    BP_RedBg: "res/popups/redbg.png",
    BP_Ball: "res/popups/ball.png",
    BP_WinsText: "res/popups/wins.png",
    BP_YouWinText: "res/popups/youwin.png",
    BP_PlayerHand: "res/popups/playerhand.png",
    BP_PlayerBody: "res/popups/playerbody.png",
    BP_BlackBox: "res/popups/blackbox.png",
    BP_Face1: "res/popups/face1.png",
    BP_Face2: "res/popups/face2.png",
    BP_Trophy: "res/popups/trophy.png",
    
    
    //Generic PopUp Animation Components
    
    //
    GP_Background: "res/userinterface/GenericBackground.png",
    GP_Referee1: "res/userinterface/Referee1.png",
    GP_Referee2: "res/userinterface/Referee2.png",
    GP_Referee3: "res/userinterface/Referee3.png",
    
    
    
       
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}