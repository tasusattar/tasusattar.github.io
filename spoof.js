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
fullscreen = document.getElementById('fullscreen');


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
  fullscreen.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
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
    frameelem.style.backgroundColor = 'transparent';
  }
};

var goback = function(){
  if (prevpgstack.length == 0) {
      return;
  }

  var lstpg = prevpgstack.pop();
  leftbutt.style.display = 'none';
  rightbutt.style.display = 'none';
  frameelem.style.backgroundColor = '#fffff4';

  if (prevpgstack.length == 0) {
      backbutt.style.display = 'none';
      prevpgstack = [];
  }
  fullscreen.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

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


function keyswitch(e){
  e = e || window.event;

  switch (e.keyCode) {
    case 8:
      if ("block" == backbutt.style.display){
        goback();
      }
      break;
    case 37:
      // alert('left');
      if ("block" == leftbutt.style.display){
        switchselected(false);
      }
      break;
    case 39:
      // alert('right');
      if("block" == rightbutt.style.display){
        switchselected(true);
      }
      break;
    };
  }


backbutt.setAttribute('onclick', "goback()");
leftbutt.setAttribute('onclick', "switchselected(false)");
rightbutt.setAttribute('onclick', "switchselected(true)");

document.addEventListener('keydown', keyswitch);



console.log('why are you here?');
