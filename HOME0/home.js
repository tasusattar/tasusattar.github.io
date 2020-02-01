// event listeners for each bubble. prompter listeners. redirect accordingly using parent.

hoverings = {
  'ABOUT3' : 'about',
  'WORK2' : 'work',
  'TRAVELS1' : 'travel',
  'PORTFOLIO1' : 'portfolio',
  'MUSINGS2' : 'musings',
  'opening' : 'HI! Tasu here!',
  'prompter' : "There's really no reason to <b>CLICK ME</b>"
}

promptchoices = ['nlaksdnas', 'wqdnoiq', 'apdmaspdom'];
var idiocy = 0;
var waswriting = '';
var timer;


abbott = document.getElementById('ABOUT3');
wok = document.getElementById('WORK2');
travs = document.getElementById('TRAVELS1');
prompt = document.getElementById('prompter');
port = document.getElementById('PORTFOLIO1');
muse = document.getElementById('MUSINGS2');
typewrite = document.getElementById('typewriter');

allclickable = [abbott, wok, travs, port, muse];

var hovs = function(id){
  writesth(hoverings[id]);
};

// var hovprompt = function(){
//   writesth(prompthover[idiocy]);
//   idiocy = (idiocy < 2) ? idiocy + 1 : 0;
// };
var promptclick = function(){
  writesth(promptchoices[idiocy]);
  idiocy = (idiocy < 2) ? idiocy + 1 : 0;
};

var completewriting = function(){
  clearTimeout(timer);
  typewrite.innerHTML = waswriting;
};

var writesth = function(towrite){
  completewriting();
  waswriting = towrite;
  typewrite.innerHTML = '';
  var i = 0;
  speed = 50;

  var dothedew = function(){
    if (i < towrite.length){
      typewrite.innerHTML += towrite.charAt(i);
      i++;
      timer = setTimeout(dothedew, speed);
    }
  };

  dothedew();
};

for (var i = 0; i < allclickable.length; i++){
  clickbill = allclickable[i];
  clickbill.addEventListener('click', window.parent.choosefirstpage(clickbill.id));

}

prompt.addEventListener('click', )
writesth(hoverings['opening']);
