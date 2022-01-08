import '../src/style.scss';
import barba from '@barba/core';
import { gsap, TweenMax } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './js/SplitText';

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

import * as THREE from 'three';

const scene = new THREE.Scene();

//set the size of the camera. In order : field of view, aspect ratio, view frustum
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    //set the background of the canvas transparent
    alpha: true,
    canvas: document.querySelector('#bg'),
  });

//set the size of canvas by the size of the screen
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//add mesh / geometry and materials
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshBasicMaterial ( {color: 0X285082, wireframe: true } );
const torus = new THREE.Mesh ( geometry, material);

//render the scene
scene.add (torus) 

//render the scene
function animate() {
    requestAnimationFrame ( animate );
    renderer.render (scene, camera);
}

animate()

// project text length

const getFontSize = (textLength) => {
  const FirstSyl = document.getElementsByClassName("hero-title")[0];
  const WidthFiSyl = getComputedStyle(FirstSyl)
  const SecondSyl = document.getElementsByClassName("hero-title")[1];
  const WidthSecSyl = getComputedStyle(SecondSyl)
  const length = parseInt(WidthFiSyl.width, 10) + parseInt(WidthSecSyl.width,);

  const baseSize = 28;
  let fontSize = length 
  if (length <= 1809) {
    fontSize = baseSize;
  } else {
    fontSize = baseSize - ((length - 1809) * 0.0138);
  }
  return `${fontSize}vw`
}

const boxes = document.querySelectorAll('.hero h1')
  
boxes.forEach(box => {
  box.style.fontSize = getFontSize(box.textContent.length)
})

//slider
function slider(){
  var slides = document.getElementById('slides'),
  slide = document.getElementsByClassName('slide'),
  slidesLength = slide.length,
  firstSlide = slide[0],
  lastSlide = slide[slidesLength - 1],
  cloneFirst = firstSlide.cloneNode(true),
  cloneLast = lastSlide.cloneNode(true),
  slideMargin = getComputedStyle(firstSlide),
  slideWidth = firstSlide.getBoundingClientRect().width + parseFloat(slideMargin.getPropertyValue('margin-left')) + parseFloat(slideMargin.getPropertyValue('margin-right')),
  slidesSize = slideWidth * slidesLength,
  x = document.getElementById('slides').scrollLeft;
  
  slides.scrollTo(304, 0);

  console.log(slidesSize)

  slides.appendChild(cloneFirst);
  slides.insertBefore(cloneLast, firstSlide);
  
  slides.scrollTo(304, 0);
}
slider()

document.getElementById("slides").addEventListener("scroll", infiniteSlider);

function infiniteSlider() {
  var slides = document.getElementById('slides'),
  
  x = document.getElementById('slides').scrollLeft;

  if (x < 1){
    console.log(true)
    slides.scrollTo(2099, 0);
  }

  else if (x > 2099) {
    console.log(false)
    slides.scrollTo(1, 0);
  }
}


// sccs switch
/* var clicked = false;
document.getElementById("light").onclick=function(){changeTheme()};
function changeTheme(){
if (clicked) {
  
    document.querySelector(':root').style.setProperty('--main-bg-color', '#DEDEDE');
    document.querySelector(':root').style.setProperty('--primary-color', '#101010');
    document.querySelector(':root').style.setProperty('--primary-faded', '#B2B2B2');
    clicked = false;
  }
else {
    document.querySelector(':root').style.setProperty('--main-bg-color', '#000000');
    document.querySelector(':root').style.setProperty('--primary-color', '#DEDEDE');
    document.querySelector(':root').style.setProperty('--primary-faded', '#2C2C2C');
    clicked = true;
  }
}*/