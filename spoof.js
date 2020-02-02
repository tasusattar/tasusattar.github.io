directpg = {
  'HOME0' : null,
  'ABOUT3' : null,
  'WORK2' : null,
  'TRAVELS1': null,
  'MUSINGS2': null,
  'PORTFOLIO1': null
};


// Make Pages and store in directpg
for (var key in directpg){
  directpg[key] = new Pages(outson[key]);
}


var pickedid = 'HOME0';
var prevpgstack = [];
var current = directpg[pickedid];

current.changepgtitle();
current.loadpage();

choosefirstpage = function(id){
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
  var iframeDocument = frameelem.contentDocument || frameelem.contentWindow.document;
  var allkids = iframeDocument.body.children;
  for (var eachkid in allkids){
    eachkid.style.display = 'none';
  }
};

var openpage = function(id, elemcoll){
  var toopen = none;
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
