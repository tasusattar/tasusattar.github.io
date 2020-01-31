function Pages(fullinfo){

  this.backpg = null;
  this.typestyles = {
    1: {},
    2: {},
    3: {},
    4: {}
  };
  this.fsd = fullinfo;

    // fullinfo - {'unfiltitle':'', 'dirs':[], 'files':[], 'description':'', 'html':''}
  var _fullinfo = fullinfo;
  var _title = '';
  var _collections = [];
  var _singles = [];
  var _description = fullinfo['description'];
  var _type = 1;
  var _cover = '';
  var _order = 0;
  var _html = fullinfo['html'];

    // Getters
    this.gethtml = function(){
      return _html;
    };

    this.getfullinfo = function(){
      return _fullinfo;
    };

    this.gettitle = function(){
      return _title;
    };

    this.getcollections = function(){
      return _collections;
    };


    this.getsingles = function(){
      return _singles;
    };

    this.getdescription = function(){
      return _description;
    };

    this.gettype = function(){
      return _type;
    };

    this.getcover = function(){
      return _cover;
    };

    // Private Setters
    var settittypord = function(){
      // from fullinfo, extract the title
      unfiltit = fullinfo['unfiltitle'];
      tit = '';
      order = -1;
      type = 1;

      if (unfiltit.charAt(0) >= 0 && unfiltit.charAt(0) <= 9){
        if (unfiltit.charAt(1) >= 0 && unfiltit.charAt(1) <= 9){
          order = parseInt(unfiltit.slice(0,2));
          unfiltit = unfiltit.slice(2);
         }
        else{
          order = parseInt(unfiltit.slice(0,1));
          unfiltit = unfiltit.slice(1);
        }
      }

      if (unfiltit.charAt(-1) >= 0 && unfiltit.charAt(-1) <= 9) {
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
      collection = [];
      // run a function that converts each into its own Page
      if (collpaths.length == 0) { return }
      for (var i = 0; i < collpaths.length; i++){
        subpage = new Pages(collpaths[i]);
      }
      _collections = collection;
    };

    var setsingles = function(){
      // from fullinfo extract
      singpathlist = fullinfo['files'];

      _singles = singpathlist;
    };

    var setcover = function(){
      // info
      info = _fullinfo;
      unfiltit = info['unfiltitle'];
      cov = '/icons/'+ unfiltit + '.png';
      _cover = cov;
    };

    inf = this.getfullinfo();
    if (inf != '' || inf != {}){
      if (this.gethtml() == ''){
        settittypord();
        setcollections();
        setsingles();
      }
      setcover();
    }

}


Pages.prototype.loadpage = function(){
  if (this.gethtml() != ''){
    frame = document.getElementById('bod');
    frame.src = this.gethtml();
    return;
  }

  if (this.gettype() == 1) {
    // then we make it with any descr & reg balls boxs
  }
  else if (this.gettype() == 2) {
    // then we make it with large balls & reg boxs centered
  }
  else if (this.gettype() == 3) {
    // then we make it with 1 unclickable ball & description
  }
  else if (this.gettype() == 4) {
    // then we make it with a big banner box and
  }
};

Pages.prototype.changetitle  = function(){
  var doctit = document.getElementById('title');
  tit = this.gettitle();
  doctit.innerHTML = doctit;


};
