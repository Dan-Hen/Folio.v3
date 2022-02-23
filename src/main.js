import '../src/style.scss';
import barba from '@barba/core';
import { gsap } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from './js/SplitText';
import { GLTFLoader } from './js/GLTFLoader';
import Mirage from './models/Mirage.glb';
import Helmet from './models/helmet.glb';
import Beyond from './models/Beyond.glb';
import * as THREE from 'three';
import { Scene } from 'three';
import { Material } from 'three';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

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

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 30, 40);
pointLight.add(new THREE.Mesh(
  new THREE.SphereGeometry(1, 10, 10),
  new THREE.MeshBasicMaterial({
    color: 'white'
  })));
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

  //camera.position.set(mouse.x, mouse.y, mouse.z);
}

const roughness = new THREE.TextureLoader().load(require('./texture/mirage-roughness.jpg'));
const diffuse = new THREE.TextureLoader().load(require('./texture/mirage-diffuse.png'));
const normal = new THREE.TextureLoader().load(require('./texture/mirage-normal.png'));
const ao = new THREE.TextureLoader().load(require('./texture/mirage-ao.png'));

diffuse.flipY = false
roughness.flipY = false
var materials = [
  new THREE.MeshPhongMaterial({
    map: diffuse,
    reflectivity: roughness,
    aoMap: ao,
    bumpMap: roughness,
    bumpScale: 0.005,
    opacity: 1,
    depthWrite: false,
    transparent: false,
  }),
  new THREE.MeshPhongMaterial({
    color: 'white',
    depthWrite: true,
    reflectivity: roughness,
    transparent: true,
    opacity: 1,
    depthWrite: true,
    transparent: true,
  }),
  new THREE.MeshPhongMaterial({
    color: 0x0000ff,
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
      child.rotation.y += Math.PI * 0.00005;
    }
  });
  renderer.render(scene, camera);
}
animate();

window.onload = function () {
  if (window.location.href.indexOf('project.html') > -1) {
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
            if (children[i])
            var v0 = new THREE.Vector3(0, 0, -3);
            var v1 = children[i].position;
          
            gsap.to(v0, {
              ...v1, duration: 0.4, ease: "none",
              onUpdate() {
                camera.lookAt(v0); 
              },
            });
          })

          link.addEventListener('mouseleave', () => {
            links.forEach(link => link.classList.remove('active'))
            camera.lookAt(origin); 
          })
        })
      },
      beforeLeave({ next }) {

      }
    }
  ]
})