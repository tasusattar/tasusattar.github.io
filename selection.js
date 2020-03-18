
var thispg = window.parent.current;
var divs = ['profilepic', 'bannerpic', 'description', 'listcontainer'];
var docbod = document.body;

// var divs = thispg.gettypestyles();

for (var divi = 0; divi < divs.length; divi++){
  var div = divs[divi];
  var realelem = document.getElementById(div);
  // var styling = (div == 'listcontainer') ? 'flex' : 'inline-block';
  // realelem.style.display = styling;
  // thispg.unhide(div, realelem);
  thispg.generate(div, realelem);
}


setTimeout(function(){
  docbod.style.width = "100%";
  docbod.style.visibility = "visible";
  docbod.style.opacity = 1;
}, 600);

document.addEventListener('keydown', window.parent.keyswitch);
