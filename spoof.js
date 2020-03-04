directpg = {
  'HOME' : null,
  'ABOUT' : null,
  'WORK' : null,
  'TRAVELS': null,
  'MUSINGS': null,
  'PORTFOLIO': null
};

// symbol = document.getElementById('symbl');
backbutt = document.getElementById('bac');
leftbutt = document.getElementById('left');
rightbutt = document.getElementById('right');
frameelem = document.getElementById('bod');


// Make Pages and store in directpg
for (var key in directpg){
  directpg[key] = new Pages(outson[key]);
}


var pickedid = 'HOME';
var prevpgstack = [];
current = directpg[pickedid];
singlepickedpth = '';

// current.changepgtitle();
current.loadpage();

var choosefirstpage = function(id){
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;
  // frameelem.setAttribute('style', 'background-color: #fffff4');
  frameelem.style.backgroundColor = '#fffff4';
  backbutt.style.display = 'block';
  var pgofchoice = directpg[id];
  loadbod(pgofchoice);
};

var loadbod = function(page){
  // hideall();
  prevpgstack.push(current);
  current = page;
  current.loadpage();
  // current.changepgtitle();
};

var hideall = function(){
  // var frameelem = document.getElementById('bod');
  var iframeDocument = frameelem.contentWindow.document || frameelem.contentDocument;
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
    prevpgstack.push(current);
    toopen = current.findsingleitem(id);
    toopen.display();
    leftbutt.style.display = 'block';
    rightbutt.style.display = 'block';
  }
};

var goback = function(){
  var lstpg = prevpgstack.pop();
  leftbutt.style.display = 'none';
  rightbutt.style.display = 'none';

  if (prevpgstack.length == 0) {
      backbutt.style.display = 'none';
      prevpgstack = [];
  }

  current = lstpg;
  // current.changepgtitle();
  current.loadpage();
};

var switchselected = function(next){
  var switchid = current.switchsingleselected(next);
  var switchopen = current.findsingleitem(switchid);
  switchopen.display();
  // openpage(switchid, false);
};

var setpickedsinglepth = function(singlepath){
  singlepickedpth = singlepath;
};

// Header js
// symbol.setAttribute('onclick', "choosefirstpage('HOME')");
backbutt.setAttribute('onclick', "goback()");
leftbutt.setAttribute('onclick', "switchselected(false)");
rightbutt.setAttribute('onclick', "switchselected(true)");


console.log('why are you here?');
