directpg = {
  'HOME0' : null,
  'ABOUT3' : null,
  'WORK2' : null,
  'TRAVELS1': null,
  'MUSINGS2': null,
  'PORTFOLIO1': null
};


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

loadbod = function(page){
  prevpgstack.append(current);
  current = page;
  current.loadpage();
  current.changepgtitle();
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
