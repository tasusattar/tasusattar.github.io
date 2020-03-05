var prntwindow = window.parent;
var backbutt = prntwindow.backbutt;
var prevpgstack = prntwindow.prevpgstack;
var frameel = prntwindow.frameelem;

backbutt.style.display = 'none';
frameel.style.backgroundColor = 'transparent';
prevpgstack = [];
prntwindow.open('https://tasusattar.github.io', '_self');

// frameel.style.height = "0";
// frameel.style.width = "0";
// frameel.style.visibility = "hidden";
// frameel.style.opacity = 0;

// frameel.style.height = "94vh"
// frameel.style.width = "92vw";
// frameel.style.visibility = "visible";
// frameel.style.opacity = 1;
// frameel.style.top = 'auto';

// setTimeout(function(){
//   frameel.style.height = "94vh"
//   frameel.style.width = "92vw";
//   frameel.style.visibility = "visible";
//   frameel.style.opacity = 1;
// }, 400);
