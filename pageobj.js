var Pages = function(){

  function Pages(fullinfo){
    this.backpg = null;
    _typestyles = {
      1: ['description', 'listcontainer'],
      2: ['listcontainer'],
      3: ['profilepic', 'description'],
      4: ['bannerpic', 'description']
    };

    // fullinfo - {'unfiltitle':'', 'dirs':[], 'files':[], 'description':'', 'html':''}
    var _fullinfo = fullinfo;
    var _title = '';
    var _collections = {};
    var _singles = {};
    var _description = fullinfo['description'];
    var _type = 1;
    var _cover = '';
    var _order = 0;
    var _html = fullinfo['html'];

    // Public Methods
    this.gettypestyles = function(){
      return _typestyles[_type];
    };

    this.gethtml = function(){
      return _html;
    };

    this.gettitle = function(){
      return _title;
    };

    this.getcover = function(){
      return _cover;
    };

    var hidetoggle = false;
    this.togglehide = function(divelem, frameelem){
      hidetoggle = !hidetoggle;
      var styling = (divelem == 'listcontainer') ? 'flex' : 'inline-block';
      // frameelem.style.display = (hidetoggle) ? styling : 'none';
      frameelem.style.display = styling;
    };


    this.generate = function(divelem, frameelem){
      if (divelem == 'description' && _description != ''){
        frameelem.innerHTML = _description;
        return;
      }
      if (divelem != 'listcontainer' && _singles.length > 0){
        var porbpic = _singles[divelem]
        frameelem.style.backgroundImage = porbpic.getfullpath();
        return;
      }
      displaylists(frameelem, true);
      displaylists(frameelem, false);
    };

    this.findcollectionitem = function(id){
      return _collections[id];
    };
    this.findsingleitem = function(id){
      return _singles[id];
    };

    // <div class='contentlist'>
    //   <div class='contentcontainer'><div class='bubble collection' id='coll1'></div><div class='info' id='coll1info'>coll1</div></div>
    // </div>

    var displaylists = function(frameelem, elemcoll){
      var listtype = (_type == 1) ? 'contentcontainer' : 'largecontainer';
      var bubbletype = (_type == 1) ? 'collection' : 'bigcoll';
      var listchoice = (elemcoll) ? _collections : _singles;

      var divcontlist = document.createElement("div");
      divcontlist.setAttribute("class", "contentlist");

      for (var lelkey in listchoice){
        var divcontainer = document.createElement("div");
        var containtag = (elemcoll) ? listtype : 'contentcontainer';
        divcontainer.setAttribute("class", containtag);

        var bubl = document.createElement('div');
        var bubltag = (elemcoll) ? "bubble "+ bubbletype : "bubble singles";
        bubl.setAttribute("class", bubltag);
        bubl.setAttribute("onclick", "openpage('"+lelkey+"', "+elemcoll+")");
        bubl.onclick = function() {openpage(lelkey, elemcoll);};
        // bubl.setAttribute("id", lelkey);
        bubl.setAttribute("style", ("background-image :url("+listchoice[lelkey].getcover()+")"));

        divcontainer.appendChild(bubl);

        var info = document.createElement('div');
        info.setAttribute("class", "info");
        info.innerHTML(lelkey);
        info.setAttribute("onclick", "openpage('"+lelkey+"', "+elemcoll+" )")
        info.onclick = function() {openpage(lelkey, elemcoll);};
        divcontainer.appendChild(info);


        divcontlist.appendChild(divcontainer);
      }

      frameelem.appendChild(divcontlist);

    };


    // Private Setters
    var settittypord = function(){
      // from fullinfo, extract the title
      unfiltit = fullinfo['unfiltitle'];
      tit = '';
      order = -1;
      type = 1;

      if (!isNaN(unfiltit.charAt(0))){
        if (!isNaN(unfiltit.charAt(1))){
          order = parseInt(unfiltit.slice(0,2));
          unfiltit = unfiltit.slice(2);
         }
        else{
          order = parseInt(unfiltit.slice(0,1));
          unfiltit = unfiltit.slice(1);
        }
      }

      if (!isNaN(unfiltit.charAt(-1))) {
          type = parseInt(unfiltit.slice(-1));
          unfiltit = unfiltit.slice(0, -1);
      }

      tit = unfiltit

      _order = order;
      _type = type;
      _title = tit;
    };


    var setcollections = function(){
      // from fullinfo, extract collections
      collpaths = fullinfo['dirs'];
      collection = {};
      // run a function that converts each into its own Page
      if (collpaths.length == 0) { return }
      for (var i = 0; i < collpaths.length; i++){
        subpage = new Pages(collpaths[i]);
        collection[subpage.gettitle()] = subpage;
      }
      _collections = collection;
    };

    var setsingles = function(){
      // from fullinfo extract
      singpathlist = fullinfo['files'];
      singles = {};
      if (singpathlist.length == 0) { return }
      for (var i = 0; i < singpathlist.length; i++){
        singer = new Singles(singpathlist[i]);
        singles[singer.gettitle()] = singer;
      }
      _singles = singles;
    };

    var setcover = function(){
      // info
      info = _fullinfo;
      unfiltit = info['unfiltitle'];
      cov = '/icons/'+ unfiltit + '.png';
      _cover = cov;
    };


    // constructor calls
    if (_fullinfo != '' || _fullinfo != {}){
      if (_html == ''){
        setcollections();
        setsingles();
      }
      settittypord();
      setcover();
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

  divs = this.gettypestyles();
  for (div in divs){
    var realelem = frame.getElementById(div);
    this.unhide(div, realelem);
    this.genereate(div, realelem);
  }
};

Pages.prototype.changepgtitle  = function(){
  var doctit = document.getElementById('title');
  tit = this.gettitle();
  doctit.innerHTML = tit;
};
