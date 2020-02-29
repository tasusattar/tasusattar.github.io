var Pages = function(){

  function Pages(fullinfo){
    // fullinfo - {'unfiltitle':'', 'dirs':[], 'files':[], 'dscrp':'', 'html':'', 'banner': '', 'profile': '', 'cover': ''}
    var _fullinfo = fullinfo;
    var _title = fullinfo['unfiltitle'];
    var _collections = {};
    var _singles = {};
    var _description = fullinfo['dscrp'];
    var _cover = fullinfo['cover'];
    var _html = fullinfo['html'];
    var _banner = fullinfo['banner'];
    var _profile = fullinfo['profile'];
    var _pickedcolors = [];

    // Public Methods
    this.gethtml = function(){
      return _html;
    };

    this.gettitle = function(){
      return _title;
    };

    this.getcover = function(){
      if (_cover == '' && _profile != ''){
        _cover = _profile;
      }
      return _cover;
    };

    this.getbanner = function(){
      return _banner;
    };

    this.getprofile = function(){
      return _profile;
    };

    this.generate = function(divelem, frameelem){
      if (divelem == 'profilepic' && _profile != ''){
        unhide(divelem, frameelem);
        var profilelinks = "url('"+_profile+"'), url('icons/jackie.png')"
        frameelem.style.backgroundImage = profilelinks;
        // frameelem.setAttribute("style", ("background-image :url('"+_profile+"'), url('icons/jackie.png')"));
        return;
      }

      if(divelem == 'bannerpic' && _banner != ''){
        unhide(divelem, frameelem);
        var bannerlinks = "url('"+_banner+"'), url('icons/jackie.png')"
        frameelem.style.backgroundImage = bannerlnks;
        // frameelem.setAttribute("style", ("background-image :url(''"+_banner+"'), url('icons/jackie.png')"));
        return;
      }

      if (divelem == 'description' && _description != ''){
        unhide(divelem, frameelem);
        frameelem.innerHTML = _description;
        return;
      }

      if (divelem == 'listcontainer'){
        unhide(divelem, frameelem);
        displaylists(frameelem, true);
        displaylists(frameelem, false);
      }

    };

    this.findcollectionitem = function(id){
      return _collections[id];
    };
    this.findsingleitem = function(id){
      return _singles[id];
    };

    // Should look like
    // <div class='contentlist'>
    //   <div class='contentcontainer'><div class='bubble collection' id='coll1'></div><div class='info' id='coll1info'>coll1</div></div>
    // </div>
    var displaylists = function(frameelem, elemcoll){
      var listchoice = (elemcoll) ? _collections : _singles;

      var divcontlist = document.createElement("div");
      divcontlist.setAttribute("class", "contentlist");

      for (var lelkey in listchoice){
        var divcontainer = document.createElement("div");
        var containtag = 'contentcontainer';
        divcontainer.setAttribute("class", containtag);

        var bubl = document.createElement('div');

        var bubltag = "bubble singles";
        if (elemcoll) {
          bubltag = "bubble collection";
          var colscreen = document.createElement('colorscreen');
          var randcol = setrandomcolor();
          colscreen.setAttribute("class", "coloredscreen")
          colscreen.setAttribute('style', ('background-color: ' + randcol));
          bubl.appendChild(colscreen);
        }

        bubl.setAttribute("class", bubltag);
        bubl.setAttribute("onclick", "window.parent.openpage('"+lelkey+"', "+elemcoll+")");
        bubl.setAttribute("style", ("background-image :url('"+listchoice[lelkey].getcover()+"')"));

        divcontainer.appendChild(bubl);
        var randnum = Math.floor(Math.random*20);
        divcontainer.setAttribute("style", ("order: " + randnum.toString()));

        var info = document.createElement('div');
        info.setAttribute("class", "info");
        info.innerHTML = lelkey;
        info.setAttribute("onclick", "window.parent.openpage('"+lelkey+"', "+elemcoll+" )");
        if (elemcoll){divcontainer.appendChild(info);}
        // divcontainer.appendChild(info);

        divcontlist.appendChild(divcontainer);
      }
      // end of for loop

      frameelem.appendChild(divcontlist);

    };


    // Private Setters
    var checkrefreshcolors = function(){
      if (_pickedcolors.length == 4){
        _pickedcolors = [];
      }
    };

    var setrandomcolor = function(){
      var stylesheet = getComputedStyle(document.body);
      var colors = [stylesheet.getPropertyValue('--np'), stylesheet.getPropertyValue('--ng'), stylesheet.getPropertyValue('--db'), stylesheet.getPropertyValue('--o2')];
      var randi = Math.floor(Math.random()*4);

      if (_pickedcolors.includes(randi)){
        checkrefreshcolors();
        return setrandomcolor();
      }
      else {
        _pickedcolors.push(randi);
        return colors[randi];
      }

    };

    var unhide = function(divelem, frameelem){
      var styling = (divelem == 'listcontainer') ? 'flex' : 'block';
      frameelem.style.display = styling;
      // frameelem.setAttribute("style", ("display: "+styling));
    };

    var setcollsing = function(isitcoll){
      // from fullinfo, extract collections
      var pathlist = (isitcoll) ? fullinfo['dirs']: fullinfo['files'];
      var either = {};
      // run a function that converts each into its own Page
      if (pathlist.length == 0) { return }
      for (var i = 0; i < pathlist.length; i++){
        var sub = (isitcoll) ? new Pages(pathlist[i]) : new Singles(pathlist[i]);
        either[sub.gettitle()] = sub;
      }

      if (isitcoll){
          _collections = either;
      }
      else{
        _singles = either;
      }

    };

    // constructor calls
    if (_fullinfo != '' || _fullinfo != {}){
      if (_html == ''){
        setcollsing(true);
        setcollsing(false);
      }
    }

  };

  return Pages;

}();


Pages.prototype.loadpage = function(){
  frame = document.getElementById('bod');

  if (this.gethtml() != ''){
    frame.src = this.gethtml();
    return;
  }

  frame.src = 'selectionpage.html';

};

// Pages.prototype.changepgtitle  = function(){
//   var doctit = document.getElementById('title');
//   tit = this.gettitle();
//   doctit.innerHTML = (tit != 'HOME') ? tit : '';
// };
