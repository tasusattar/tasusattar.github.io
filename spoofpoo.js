// var iframe = document.getElementById('bod');
// var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
// var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

var storepgs = {
  'HOME0' : null,
  'ABOUT3' : null,
  'WORK2' : null,
  'TRAVELS1': null,
  'MUSINGS2': null,
  'PORTFOLIO1': null
};

var pgcatalog = [];
var idtoind = {
  'home' : 0,
  'about' : 1,
  'work' : 2,
  'travel': 3,
  'musings': 4,
  'portfoio': 5
};

var idtodir = {
  'home' : 'HOME0',
  'about' : 'ABOUT3',
  'work' : 'WORK2',
  'travel': 'TRAVELS1',
  'musings': 'MUSINGS2',
  'portfoio': 'PORTFOLIO1'
};

var makepgobj = function(pginfo){
  return new Pages(pginfo);
};

for (var key in idtoind){
  pgcatalog.push(makepgobj(outson[idtodir[key]]));
}

current = pgcatalog[idtoind['home']];

current.loadpage();

console.log('whoops!');
