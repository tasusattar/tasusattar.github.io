var filelist = [ "concertalllie.jpg", "benewars.jpg", "Pink_Flamingo", "gaze.jpg",
    "Dutch_Resistance",  "mimimnbabbi.jpg", "OglingEyes.png", "cnconstruction.jpg", "ShiningStar.jpg",
     "Squirrel",  'succulent.jpg', "nekos.png",  "Nuzha_Card" ];

var dirlist = {
    "Dutch_Resistance": ["cover.png", "1Freddie.jpg","2Truus.jpg","3Hannie.jpg"],
    "Pink_Flamingo": ["flamingodance.jpg", "flamingodance2.jpg", "flamingodance3.jpg",],
    // "MRR_Card": ["finalfront.png", "finalback.png"],
    "Nuzha_Card": ["cf4.jpg","cb4.jpg"],
    "Squirrel" : ["Squirrel.jpg",	"Squirrel2.jpg", "Squirrel4.jpg",
        "Squirrel1.jpg", "Squirrel3.jpg", "Squirrel5.jpg"]
}

// 
var filldiv = document.getElementById("artlist");
//  filldiv.style.backgroundColor = "yellow";
var vscreen = document.getElementById("viewscreen");
var divimg = document.getElementById("viewcontent");

var opensauce = function(sauce) {
    vscreen.style.height = "100vh";
    vscreen.style.width = "100vw";
    vscreen.style.top = "0";
    vscreen.style.left = "0";

    divimg.src = sauce; 
    document.body.style.overflowY = "hidden";
}

var closescreen = function(){
    vscreen.style.height = "0vh";
    vscreen.style.width = "0vw";
    vscreen.style.top = "50%";
    vscreen.style.left = "50%";
    

    divimg.src = ""; 
    document.body.style.overflowY = "scroll";
}

 var MediaContent = function(){
    function MediaContent(pathinfo){
        var _pathinfo = pathinfo;
        var _subpaths = [];
        var _urlName = "media/" + _pathinfo;
        var _urlSub = "";
        var newPicDiv = document.createElement("img");
        var _subi = 0;
        
        newPicDiv.className = "piclist";


        if (_pathinfo.slice(-4, -3) !== ".") { _subpaths = _subpaths.concat(dirlist[_pathinfo]); }

        this.makediv = function(){

            _urlSub += (_subpaths.length > 0) ? "/" + _subpaths[_subi] : "";
            newPicDiv.src = _urlName + _urlSub ;

            newPicDiv.setAttribute('onclick', "javascript: opensauce('"+ newPicDiv.src + "')")
            return newPicDiv;

        }

        this.changebg = function(){

            _subi = (_subi+1 < _subpaths.length) ? _subi+1 : 0;
            console.log(_subi);
            newPicDiv.src = _urlName + _urlSub ;
        }
    }

    return MediaContent;
}();

for (var i=0; i<filelist.length; i++) {
    // var newPicDiv = document.createElement("div");
    // newPicDiv.className = "piclist";
    // var urlName = filelist[i];

    // if (urlName.slice(-4,-3) !== "."){
    //     urlName += dirlist[filelist[i]];
    // }
    // newPicDiv.style.backgroundImage = "url('media/" + urlName + "')";
    // filldiv.appendChild(newPicDiv);

    var mdCont = new MediaContent(filelist[i]);
    var divmade = mdCont.makediv();
    filldiv.appendChild(divmade);

    if (filelist[i].slice(-4,-3) !== "."){
        
        setInterval(divmade.changebg, 3000);

    }
    
}
