var Singles = function(){

  function Singles(fullpath){

    this.colors = ['blue', 'green', 'red', 'yellow', 'purple'];
    this.pickrandomcolor = function(){
      var col = this.colors[Math.floor(Math.random()*this.colors.length)];
      return col;
    };

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
      return type;
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
      pdf = 'pscreen.png';
      vid = 'vscreen.png';
      pic = 'imgscreen.png';
      // info
      if (_type == 1){
        _cov = _cov + pdf;
      }
      else if (_type == 2){
        _cov = _cov + vid;
      }
      else{
        _cov = fullpath;
      }
      _cover = cov;
    };

    settype();
    setcover();

  };

  return Singles;

}();



Singles.prototype.display  = function(){
  document.getElementById('bigframe').src = pth;
  document.getElementById('bigscreen').style.display = 'block';
};
