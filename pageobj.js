var Pages = function(){

  function Pages(fullinfo){
    this.backpg = null;

    // fullinfo - {'unfiltitle':'', 'dirs':[], 'files':[], 'description':'', 'html':'', 'banner': '', 'profile': '', 'cover': ''}
    var _fullinfo = fullinfo;
    var _title = fullinfo['unfiltitle'];
    var _collections = {};
    var _singles = {};
    var _description = fullinfo['description'];
    var _cover = fullinfo['cover'];
    var _html = fullinfo['html'];
    var _banner = fullinfo['banner'];
    var _profile = fullinfo['profile'];

    // Public Methods
    this.gethtml = function(){
      return _html;
    };

    this.gettitle = function(){
      return _title;
    };

    this.getcover = function(){
      return _cover;
    };

    this.getbanner = function(){
      return _banner;
    };

    this.getprofile = function(){
      return _profile;
    };

    this.unhide = function(divelem, frameelem){
      var styling = (divelem == 'listcontainer') ? 'flex' : 'inline-block';
      frameelem.style.display = styling;
    };


    this.generate = function(divelem, frameelem){
      if (divelem == 'profilepic' && _profile != ''){
        frameelem.style.backgroundImage = _profile;
        return;
      }

      if(divelem == 'bannerpic' && _banner != ''){
        frameelem.style.backgroundImage = _banner;
        return;
      }

      if (divelem == 'description' && _description != ''){
        frameelem.innerHTML = _description;
        return;
      }

      // if (divelem != 'listcontainer' && _singles.length > 0){
      //   var porbpic = _singles[divelem]
      //   frameelem.style.backgroundImage = porbpic.getfullpath();
      //   return;
      // }

      displaylists(frameelem, true);
      displaylists(frameelem, false);
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
        var bubltag = (elemcoll) ? "bubble collection" : "bubble singles";
        bubl.setAttribute("class", bubltag);
        bubl.setAttribute("onclick", "openpage('"+lelkey+"', "+elemcoll+")");
        bubl.onclick = function() {openpage(lelkey, elemcoll);};
        bubl.setAttribute("style", ("background-image :url("+listchoice[lelkey].getcover()+"), url(icons/jackie.png)"));
        divcontainer.appendChild(bubl);

        var info = document.createElement('div');
        info.setAttribute("class", "info");
        info.innerHTML = lelkey;
        info.setAttribute("onclick", "openpage('"+lelkey+"', "+elemcoll+" )")
        info.onclick = function() {openpage(lelkey, elemcoll);};
        divcontainer.appendChild(info);


        divcontlist.appendChild(divcontainer);
      }

      frameelem.appendChild(divcontlist);

    };


    // Private Setters
    var setcollsing = function(isitcoll){
      // from fullinfo, extract collections
      pathlist = (isitcoll) ? fullinfo['dirs']: fullinfo['files'];
      either = {};
      // run a function that converts each into its own Page
      if (pathlist.length == 0) { return }
      for (var i = 0; i < pathlist.length; i++){
        sub = (isitcoll) ? new Pages(pathlist[i]): new Singles(pathlist[i]);
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

Pages.prototype.changepgtitle  = function(){
  var doctit = document.getElementById('title');
  tit = this.gettitle();
  doctit.innerHTML = tit;
};
