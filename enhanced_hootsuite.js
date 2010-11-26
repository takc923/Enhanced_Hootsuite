var option = null ;

//真っ先に必要なデータを裏から受け取る
chrome.extension.sendRequest( { 
        //localStorageからuserIdとpasswdを読み込むお願いをする
        action : "getValues" , 
        args   : [{ 
            "rt" : "true" , 
            "profile" : "false",
            "refresh" : "false",
            "replyAll": "false"
        }]
    } , function( response ){
        option = response.values ;

        //データの準備が整ったらコンテントスクリプトを初期化
        init();
    }
);

function init(){
    var rtOpt = eval(option["rt"]);
    var profileOpt = eval(option["profile"]);
    var refreshOpt = eval(option["refresh"]);
    var replyAllOpt = eval(option["replyAll"]);
    
    if(profileOpt){
        $('._userInfoPopup').live('mouseover',function(){
            var classes = $(this).attr("class");
            classes.match(/(.*)_userInfoPopup(.*)/);
            $(this).attr({"class" : RegExp.$1+RegExp.$2,
                          "href"  : "http://twitter.com/"+$(this).attr("title"),
                          "target": "_blank"});
        });
    }
    var RTBody;
    var isFirst=true;
    document.addEventListener("DOMNodeInserted",set,false);
    function set(evt){
        if(evt.target.nodeType != 1){return;}
        var id = evt.target.getAttribute("id");
        if(typeof id == "string" && id == "streamsContainer"){
            if(rtOpt){setRT();}
            if(1){OptionHeight();}
            if(replyAllOpt){setReplyAll(evt.target);}
            if(refreshOpt && isFirst){RefreshButton();isFirst=false;}
        }
    }
    function setRT(){
        var $rt = $('<a class="_jsTooltip unoficialRT" title="非公式RT" href="javascript:;">RT</a>');
        $rt.css({"color":"#777777",
                 "font-weight":"bold"});
        $("._options.messageOptions").find(".reply").after($rt);
        $(".unoficialRT").bind("click",function(){
            RTBody = RTBody.replace(/\n/g," ");
            $("#messageBoxMessage").attr("value",RTBody);
            $("#messageBoxMessage").focus();
        });
    }
    function OptionHeight(){
        var $options = $("._options.messageOptions");
        $options.css("height","10px");
        var $moreOptions = $(".moreOptionsMenu");
        $moreOptions.css("top","17px");
    }
    function setReplyAll(){
        $("._replyAll").remove();
        var $replyAll = $('<a class="_jsTooltip icon-19 replyAll _replyAll" title="全員に返信" href="javascript:;"></a>');
        $(".directMessage").after($replyAll);
    }
    function RefreshButton(){
        var $button = $(".controls ._refresh").clone(true);
        $button.css({
            position: "absolute",
            top:      "10px",
            left:     "-30px"
        })
        $("#quickSearchField").before($button);
    }
    $("._message.message").live("mouseover",function(){
        RTBody = " RT @"+$(this).find("._username.networkName").text()+": "+$(this).find("._baseTweetText").text();
    });
}
