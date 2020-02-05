directpg = {
  'HOME' : null,
  'ABOUT' : null,
  'WORK' : null,
  'TRAVELS': null,
  'MUSINGS': null,
  'PORTFOLIO': null
};


// Make Pages and store in directpg
for (var key in directpg){
  directpg[key] = new Pages(outson[key]);
}


var pickedid = 'HOME0';
var prevpgstack = [];
current = directpg[pickedid];

current.changepgtitle();
current.loadpage();

var choosefirstpage = function(id){
  var pgofchoice = directpg[id];
  loadbod(pgofchoice);
};

var loadbod = function(page){
  hideall();
  prevpgstack.push(current);
  current = page;
  current.loadpage();
  current.changepgtitle();
};

var hideall = function(){
  var frameelem = document.getElementById('bod');
  var iframeDocument = frameelem.contentWindow.document;
  // frameelem.contentDocument ||
  var allkids = iframeDocument.body.children;
  for (var kidi = 0; kidi < allkids.length; kidi++){
    allkids[kidi].style.display = 'none';
  }
};

var openpage = function(id, elemcoll){
  var toopen = null;
  if (elemcoll) {
    toopen = current.findcollectionitem(id);
    loadbod(toopen);
  }
  else {
    toopen = current.findsingleitem(id);
    toopen.display();
  }
};


console.log('why are you here?');
