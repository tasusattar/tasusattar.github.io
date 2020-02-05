
var thispg = window.parent.current;
var divs = ['profilepic', 'bannerpic', 'description', 'listcontainer'];

// var divs = thispg.gettypestyles();

for (var divi = 0; divi < divs.length; divi++){
  var div = divs[divi];
  var realelem = document.getElementById(div);
  // thispg.unhide(div, realelem);
  thispg.generate(div, realelem);
}
