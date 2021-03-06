import '../src/style.scss';
import barba from '@barba/core';
import { gsap } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from './js/SplitText';
import { GLTFLoader } from './js/GLTFLoader';
import Mirage from './models/mirage.glb';
import Helmet from './models/helmet.glb';
import Beyond from './models/Beyond.glb';
import * as THREE from 'three';
import { Scene } from 'three';
import { Material } from 'three';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

if (localStorage === undefined) {
  localStorage.setItem( "Previous" , 0 )
}
var index = 0;
var files = [Mirage, Helmet, Beyond];
var children = []
var loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: document.querySelector('#bg'),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.PointLight( 0xffffff ); // soft white light
light.position.set(-10, -20, -4);
scene.add( light );

const light2 = new THREE.PointLight( 0xB3EA3A ); // soft white light
light2.position.set(-15, 10, 10);
scene.add( light2 );

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 20, 40);
scene.add(pointLight);

document.addEventListener("mousemove", onMouseMove, false);
var mouse = {
  x: 0,
  y: 0,
  z: 0
};
function onMouseMove(event) {
  //event.preventDefault();
  //mouse.x = (event.clientX / window.innerWidth) * 0.02 + 1.5;
  //mouse.y = (event.clientY / window.innerHeight) * 0.02 + 1.5;
  //mouse.z = mouse.x * mouse.x

  //pointLight.position.set(mouse.x, mouse.y, mouse.z);
}

const Mroughness = new THREE.TextureLoader().load(require('./texture/mirage-roughness.jpg'));
const Mdiffuse = new THREE.TextureLoader().load(require('./texture/mirage-diffuse.png'));
const Mao = new THREE.TextureLoader().load(require('./texture/mirage-ao.png'));

const Uroughness = new THREE.TextureLoader().load(require('./texture/unnamed-rougness.png'));
const Udiffuse = new THREE.TextureLoader().load(require('./texture/unnamed-diffuse.png'));
const Unormal = new THREE.TextureLoader().load(require('./texture/unnamed-normal.png'));

Mdiffuse.flipY = false
Mroughness.flipY = false
Udiffuse.flipY = false
Uroughness.flipY = false

var materials = [
  new THREE.MeshPhongMaterial({
    color: 0x030303,
    reflectivity: Mroughness,
    aoMap: Mao,
    bumpMap: Mroughness,
    bumpScale: 0.005,
    opacity: 1,
  }),
  new THREE.MeshPhongMaterial({
    color: 0x030303,
    reflectivity: Uroughness,
    normalMap: Unormal,
    opacity: 1,
  }),
  new THREE.MeshPhongMaterial({
    color: 0x030303,
    opacity: 1,
  })
];

function loadNextFile() {
  if (index > files.length - 1) return;

  loader.load(files[index], function (glb) {
    var model = glb.scene;

    glb.scene.traverse(function (child) {
      if (child.isMesh) {
        children.push(child)
      }
    });
    children[index].material = materials[index];

    scene.add(model);
    index++;
    loadNextFile();
  });
}
loadNextFile();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

camera.lookAt(origin)

function animate() {
  requestAnimationFrame(animate);
  scene.traverse(function (child) {
    if (child.isMesh) {
      child.rotation.y += Math.PI * 0.00015;
    }
  });
  renderer.render(scene, camera);
}
animate();

window.onload = function () {
  if (window.location.href.indexOf('project.html') > -1) {
    camera.lookAt(children[0].position)
  }
}


function HomeEnter() {

  // sccs switch
  var clicked = false;
  document.getElementById("light").onclick = function () { changeTheme() };
  function changeTheme() {
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
  }
}

function ProjectLaunch() {
  // project text length
  const getFontSize = (textLength) => {
    const FirstSyl = document.getElementsByClassName("hero-title")[0];
    const WidthFiSyl = getComputedStyle(FirstSyl);
    const SecondSyl = document.getElementsByClassName("hero-title")[1];
    const WidthSecSyl = getComputedStyle(SecondSyl);
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
  function slider() {
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

    slides.appendChild(cloneFirst);
    slides.insertBefore(cloneLast, firstSlide);

    slides.scrollTo(304, 0);
  }
  slider()

  document.getElementById("slides").addEventListener("scroll", infiniteSlider);

  function infiniteSlider() {
    var slides = document.getElementById('slides'),

      x = document.getElementById('slides').scrollLeft;

    if (x < 1) {
      slides.scrollTo(2099, 0);
    }

    else if (x > 2099) {
      slides.scrollTo(1, 0);
    }
  }
}

function ProjectLeave() {


}

//page animation
barba.init({
  debug: true,
  transitions: [
    {
      name: 'opacity-transition',
      leave(data) {
        window.scrollTo(0, 0);
      },
      enter(data) {

      }
    }
  ],
  views: [
    {
      namespace: 'project',
      beforeEnter({ next }) {
        ProjectLaunch()
        gsap.to('#bg', { position: 'absolute' })
        new SplitText(next.container.querySelectorAll('.split-label'), { type: 'lines', linesClass: 'splitLabel' })
        new SplitText(next.container.querySelectorAll('.project-header-text'), { type: 'lines', linesClass: 'header' })

        const SecondSyl = document.getElementsByClassName("hero-title")[1];
        const WidthSecSyl = getComputedStyle(SecondSyl);
        const length = parseInt(WidthSecSyl.width,);
        var largeur = window.innerWidth,
          pushSize = length - (largeur * 0.2);

        var herotl = gsap.timeline({ paused: true }),
          play = true;
        document.getElementById("title").onclick = function () { anim() };

        function anim() {
          if (play == true) {
            herotl.play(),
              play = false;
          }
          else if (play == false) {
            herotl.reverse();
            play = true;
          }
        }

        herotl.fromTo('#sliding-text', { x: 0 }, { x: pushSize, duration: 2, ease: 'Power4.easeInOut' }, 0)
        herotl.fromTo('.header', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 1.1)
        gsap.fromTo('.splitLabel', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.4, ease: 'Power3.easeInOut', stagger: 0.1 })
        gsap.fromTo('.slide', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'Power3.easeInOut', stagger: 0.1, scrollTrigger: '.slide' })


        var sectionsimg = gsap.utils.toArray('.img-content');

        sectionsimg.forEach((section) => {
          gsap.fromTo(section, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'Power3.easeInOut', scrollTrigger: { trigger: section, start: 'top bottom-=100', } });
        })

        new SplitText(next.container.querySelectorAll('.text1'), { type: 'lines', linesClass: 'text-content1' })
        new SplitText(next.container.querySelectorAll('.text2'), { type: 'lines', linesClass: 'text-content2' })

        gsap.fromTo('.text-content1', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1, scrollTrigger: { trigger: '.text-content1', start: 'top bottom-=100' } })
        gsap.fromTo('.text-content2', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1, scrollTrigger: { trigger: '.text-content2', start: 'top bottom-=100' } })

        gsap.fromTo('.arrow', { rotate: 45 }, { rotate: -45, duration: 0.8, ease: 'Power3.easeInOut', scrollTrigger: '.launcher' })
        gsap.fromTo('.arrow', { y: -20 }, { y: -10, delay: 0.6, duration: 0.4, ease: 'Power3.easeInOut', scrollTrigger: '.launcher' })
        gsap.fromTo('.name', { opacity: 0, y: 10 }, { opacity: 0.2, y: 0, delay: 0.6, duration: 0.4, ease: 'Power3.easeInOut', scrollTrigger: '.launcher' })

        ScrollTrigger.refresh(true)
      },
      beforeLeave({ next }) {
        
        let Alltrigger = ScrollTrigger.getAll()
        for (let i = 0; i < Alltrigger.length; i++) {
          Alltrigger[i].kill(true)
        }
        gsap.to('#bg', { position: 'fixed' })
        ProjectLeave()
      }
    },
    {
      namespace: 'home',
      beforeEnter({ next }) {
        new SplitText(next.container.querySelectorAll('.header-text'), { type: 'lines', linesClass: 'lineParent' })
        new SplitText(next.container.querySelectorAll('.footer-text'), { type: 'lines', linesClass: 'lineFooter' })

        var headtl = gsap.timeline({ scrollTrigger: { trigger: "header", } });
        headtl.fromTo('.lineParent', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 0.4)
        headtl.fromTo('.header-transition', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 0.7)
        headtl.fromTo('.arrow-down', { x: 100, y: -100 }, { x: 0, y: 0, duration: 1, ease: 'Power3.easeInOut' }, 1)

        var scrolltl = gsap.timeline({ scrollTrigger: { trigger: ".cutline", } });
        scrolltl.fromTo('.cutline', { width: 0 }, { width: "100%", duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.2 }, 1)
        scrolltl.fromTo('.lift-up', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 0.4)
        scrolltl.fromTo('.shift', { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 0.2)

        var footertl = gsap.timeline({ scrollTrigger: { trigger: ".contact", } });
        footertl.fromTo('.lineFooter', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.4, ease: 'Power3.easeInOut', stagger: 0.1 })

        const light = gsap.timeline({
          onComplete: function () {
            light.delay(5).restart(true)
          }
        })
        const rects = document.querySelectorAll('svg.hero-light-icon rect')

        const rotationsValues = [
          { from: 18.05 - 180, to: -18.05 + 180 },
          { from: 53.3 - 180, to: -53.3 + 180 },
          { from: 0, to: 180 },
          { from: 36.66, to: -36.66 + 180 },
          { from: 71.94, to: -71.94 + 180 }
        ]
        rects.forEach((rect, i) => {
          light.fromTo(rect,
            { rotation: rotationsValues[i].from, transformOrigin: '50% 50%' },
            { rotation: rotationsValues[i].to, transformOrigin: '50% 50%', duration: 2, delay: 0.5, ease: 'Power3.easeInOut' }, 0)
        })

        HomeEnter()
      },

      afterEnter({ next }) {
        const links = next.container.querySelectorAll('.hover-section')

        links.forEach((link, i) => {
          link.addEventListener('mouseenter', () => {

            link.classList.add('active')
            
            var x = localStorage.getItem("Previous")
            var RestEmpty = children[x].position
            var CameraTarget = children[i].position
            var CameraShift = new THREE.Vector3(0.1, 0.1, 0.1);

            gsap.fromTo(CameraShift, { ...RestEmpty },
              {
                ...CameraTarget, duration: 0.4, ease: "power2.inOut",
                onUpdate() {
                  camera.lookAt(CameraShift);
                },
                onComplete() {
                  localStorage.setItem( "Previous" , i )
                  console.log(localStorage.getItem("Previous"))
                },
              });
          })

          link.addEventListener('mouseleave', () => {
            links.forEach(link => link.classList.remove('active'))
          })
        })
      },
      beforeLeave({ next }) {
      }
    }
  ]
})


var settings = {
  trailLength: 100, 
  minRadius: 50, 
  sprayDensity: 80,
  fadeStart: .8
}

var __meta_settings__ = {
  disabled: true
}


var cursorPos = {
  x: -100, 
  y: -100
};

function getPos(event) {
  return {
    x: event.pageX,
    y: event.pageY
  }
}

document.addEventListener('mousemove', function(e) {
  cursorPos = getPos(e);
});
document.addEventListener('touchmove', function(e) {
  cursorPos = getPos(e.changedTouches[0]); 
  e.preventDefault(); 
});

function goAway(e) {
  cursorPos.x = -1000;
  cursorPos.y = -1000;
}

document.addEventListener('mouseleave', goAway)
document.addEventListener('click', function(e) {
});

var settings = {
  colorChangeSpeedFactor: .1, 
  trailLength: 100, 
  diameter: 50, 
  fadeStart: .8
}
var __meta_settings__ = {
  disabled: true
}

var cursor = document.getElementById('cursor');

var cursorTrail = JSON.parse(`[{"hue":0,"speed":7.0710678118654755,"x":157,"y":131}]`);

var cursorPos = {
  x: -100, 
  y: -100
};

function getPos(event) {
  return {
    x: event.pageX,
    y: event.pageY
  }
}

document.addEventListener('mousemove', function(e) {
  cursorPos = getPos(e);
});
document.addEventListener('touchmove', function(e) {
  cursorPos = getPos(e.changedTouches[0]); 
  e.preventDefault(); 
});

function goAway(e) {
  cursorPos.x = -1000;
  cursorPos.y = -1000;
}

document.addEventListener('mouseleave', goAway)
document.addEventListener('click', function(e) {
});

function frame(time) {
  var hue = (time * settings.colorChangeSpeedFactor) % 360;
  
  cursorTrail.push(Object.assign({
    hue: hue,
    speed: cursorTrail.length <= 1 ? 0 : ((pos, lastPos) => {
      // distance between points ~ speed. Might be nice to smooth this by averaging over the last few points
      return Math.sqrt(Math.pow(lastPos.x - pos.x, 2) + Math.pow(lastPos.y - pos.y, 2));
    })(cursorPos, cursorTrail[cursorTrail.length - 1])
  }, cursorPos));
  
  // keep popping off the first one
  // nice little following effect, plus your browser would probably die if everything was kept
  if (cursorTrail.length > settings.trailLength) {
    cursorTrail.shift();
  }

  // follow the mouse!
  cursor.style.top = `${cursorPos.y}px`;
  cursor.style.left = `${cursorPos.x}px`;
  
  // make it look like the circle is solid  
  cursor.style.backgroundColor = `hsl(79, 81%, 51%)`;;

  // generate a trail of shadows
  cursor.style.boxShadow = cursorTrail.map((pos, i) => {
    const offsetX = pos.x - cursorPos.x;
    const offsetY = pos.y - cursorPos.y;
    const age = (settings.trailLength - i) / settings.trailLength;
    const fadeOut = age < settings.fadeStart ? 0 : Math.pow(4 * (age - settings.fadeStart), 2); 
    const color = `hsla(79, 81%, 57%, ${1 - fadeOut})`;
    // return `${offsetX}px ${offsetY}px ${pos.speed + 1}px ${age * settings.diameter + settings.diameter}px ${color}`;
    return `${offsetX}px ${offsetY}px ${pos.speed + 1}px ${settings.diameter}px ${color}`;
  }).reverse().join(', ');

  window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);

console.log('initialized');