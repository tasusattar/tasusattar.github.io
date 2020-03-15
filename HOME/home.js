var prntwindow = window.parent;
var backbutt = prntwindow.backbutt;
var prevpgstack = prntwindow.prevpgstack;
var frameel = prntwindow.frameelem;
var slider = document.getElementById('slideshow');
var allslides = document.getElementsByClassName("slides");

backbutt.style.display = 'none';
frameel.style.backgroundColor = 'transparent';
prevpgstack = [];

// frameel.style.height = "0";
// frameel.style.width = "0";
// frameel.style.visibility = "hidden";
// frameel.style.opacity = 0;

frameel.style.height = "94vh"
frameel.style.width = "92vw";
frameel.style.visibility = "visible";
frameel.style.opacity = 1;
frameel.style.top = 'auto';

var islide = 0;
sliding();

function sliding() {
  allslides[islide-1].style.display = "none";
  allslides[islide-1].style.opacity = 0;

  allslides[islide].style.display = "block";
  allslides[islide].style.opacity = 1;

  islide = (islide+1 == allslide.length) ? 0 : islide + 1;
  setTimeout(sliding, 3000); // Change image every 2 seconds
}










// Too many intervals

// setTimeout(function(){
//   frameel.style.height = "94vh";
//   frameel.style.width = "92vw";
//   frameel.style.visibility = "visible";
//   frameel.style.opacity = 1;
// }, 400);

// var slideanimate = funciton(){
//   slider.style.visibility = "hidden";
//   slider.style.opacity = 0;
//   slider.style.margin = 100%;
//
//   slidingmotion = setInterval(function(){
//     slider.style.margin -= 5%;
//   }, 50);
//
//   setTimeout(function(){
//     clearInterval(slidingmotion);
//   }, 1000);
// };
//
// var i = 0;
// var slide = function(){
//   slideanimate();
//   slider.setAttribute('style', "background-image: url("+openingpics[i]+")");
//   i = (i+1 == openingpics.length) ? 0 : i+1;
//   setInterval(slide(), 3000);
//   slider.style.opacity = 1;
//   slider.style.visibility = "visible";
// };
//
// setTimeout(slide(), 2000);

// setInterval(slide());
