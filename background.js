//background.js
window.onload = init

//趣味
var CMD = {
    setValue  : setValue ,
    getValue  : getValue ,
    getValues : getValues 
} ;

function init() {
    chrome.extension.onRequest.addListener( function ( message , sender , sendResponse) {
        //趣味
        var retVal = (CMD[ message.action ]||function(){}).apply( CMD , message.args ); 

        //関数の実行結果をレスポンスの引数として返す
        //sendResponse.apply( null , retVal )とかの方が綺麗かも？
        sendResponse( { values : retVal } );
    } ) ;
}

function getValues( list ){
    for( var i in list ){
        list[i] = getValue( i , list[i] );
    }

    return list ;
}

function getValue( name , def ){
    if( !localStorage[ name ] ){
        localStorage[ name ] = def;
    }
    return localStorage[name];
}

function setValue( name , value ){
    localStorage[ name , value ];
}
