// event listeners for each bubble. prompter listeners. redirect accordingly using parent.

hoverings = {
  'ABOUT' : 'ABOUT: Want to learn a little about me?',
  'WORK' : "WORK: From fundraising for charities to teaching kids how to code, stuff I've done professionally.",
  'TRAVELS' : 'TRAVELS: I want to see the world!',
  'PORTFOLIO' : "PORTFOLIO: Here you'll find all my whacky, colourful and vibrant pieces.",
  'MUSINGS' : 'A space for my reflections, thoughts and ideas.',
  'opening' : "Hi! I'm Tasawar Sattar (Tasu). Welcome to my website. &#128578",
  'prompter' : "There's really no reason to CLICK ME"
};

promptchoices = ["There's no prize if you CLICK ME", "You're wasting your time every time you CLICK ME", "Please don't CLICK ME... again"];
var idiocy = 0;
var waswriting = '';
var timer;


abbott = document.getElementById('ABOUT');
wok = document.getElementById('WORK');
travs = document.getElementById('TRAVELS');
prompt = document.getElementById('prompter');
port = document.getElementById('PORTFOLIO');
muse = document.getElementById('MUSINGS');
typewrite = document.getElementById('typewriter');

allclickable = [abbott, wok, travs, port, muse];

var hovs = function(id){
  writesth(hoverings[id]);
};

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
  speed = 30;

  var dothedew = function(){
    if (i < towrite.length){
      typewrite.innerHTML += towrite.charAt(i);
      i++;
      timer = setTimeout(dothedew, speed);
    }
  };

  dothedew();
};

writesth(hoverings['opening']);
