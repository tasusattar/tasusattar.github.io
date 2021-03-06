var Singles = function(){

  function Singles(fullpath){

    // fullpath - {'/asdas/sadas.jpg'}
    var _fullpath = fullpath;
    var _title = '';
    var _cover = '';
    var _order = 0;
    var _type = 1;

    // Getters
    this.getfullpath = function(){
      return _fullpath;
    };

    this.gettype = function(){
      return _type;
    };

    this.gettitle = function(){
      return _title;
    };

    this.getcover = function(){
      return _cover;
    };


    // Private Setters
    var settype = function(){
      typepath = _fullpath.slice(-3);
      if (typepath == 'pdf'){
        _type = 1;
      }
      else if (typepath == 'mp4'){
        _type = 2;
      }
      else{
        _type = 3;
      }
    };

    var setcover = function(){
      cov = '/icons/';
      pdf = 'subject.png';
      vid = 'movie.png';
      pic = 'images.png';
      // info
      if (_type == 1){
        cov = cov + pdf;
      }
      else if (_type == 2){
        cov = cov + vid;
      }
      else{
        cov = fullpath;
      }
      _cover = cov;
    };

    var settitle = function(){
      var lastslashindex = _fullpath.lastIndexOf('/');
      _title = _fullpath.slice(lastslashindex+1, -4);
    };

    settype();
    setcover();
    settitle();

  };

  return Singles;

}();



Singles.prototype.display  = function(){
  var frameel = document.getElementById('bod');
  var singtype = this.gettype();
  var pth = this.getfullpath();

  if (singtype == 1){
    window.open(pth);
  }
  else if (singtype == 2){
    frameel.src = pth;
  }
  else{
    setpickedsinglepth(pth);
    frameel.src = 'displaypage.html'
    // var iframeDoc = frameel.contentWindow.document;
    // iframeDoc.body.setAttribute(style, ('background-image: ' + pth));
  }
  // document.getElementById('bod').src = _fullpath;
  // document.getElementById('bigscreen').style.display = 'block';
};
