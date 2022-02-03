import '../src/style.scss';
import barba from '@barba/core';
import { gsap } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from './js/SplitText';
import { GLTFLoader } from './js/GLTFLoader';
import Mirage from './models/Mirage.glb';
import Unnamed from './models/Unnamed.glb';
import Beyond from './models/Beyond.glb';
import * as THREE from 'three';
import { Scene } from 'three';
import { Material } from 'three';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(4);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: document.querySelector('#bg'),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);

var pointLight = new THREE.PointLight('white');
pointLight.position.set(20, 30, 40);
pointLight.add(new THREE.Mesh(
  new THREE.SphereGeometry(1, 10, 10),
  new THREE.MeshBasicMaterial({
    color: 'white'
  })));
scene.add(pointLight);

const roughness = new THREE.TextureLoader().load(require( './texture/mirage-roughness.jpg' ));
const diffuse = new THREE.TextureLoader().load(require( './texture/mirage-diffuse.png' ));

diffuse.flipY = false
roughness.flipY = false
  const bodyMaterial = new THREE.MeshPhongMaterial( {
    map: diffuse,
    reflectivity: roughness
  } );


var index = 0;
var files = [Mirage];
const loader = new GLTFLoader();

function loadNextFile() {
  if (index > files.length - 1) return;

  loader.load(files[index], function (glb) {
    
    var models = glb.scene.children[ 0 ];
    models.material = bodyMaterial;
   
    scene.add(glb.scene);
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

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  scene.children[2].children[0].rotation.x += 0.005;
  scene.children[2].children[0].rotation.y += 0.01;
}
animate();

console.log(scene)



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
        new SplitText(next.container.querySelectorAll('.split-label'), {
          type: 'lines',
          linesClass: 'splitLabel'
        })
        new SplitText(next.container.querySelectorAll('.project-header-text'), {
          type: 'lines',
          linesClass: 'header'
        })


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

          gsap.fromTo(section, { y: 100, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.3, ease: 'Power3.easeInOut',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom-=100',
            }
          });
        })

        new SplitText(next.container.querySelectorAll('.text1'), {
          type: 'lines',
          linesClass: 'text-content1'
        })
        new SplitText(next.container.querySelectorAll('.text2'), {
          type: 'lines',
          linesClass: 'text-content2'
        })

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
      }
    },
    {
      namespace: 'home',
      beforeEnter({ next }) {

        new SplitText(next.container.querySelectorAll('.header-text'), {
          type: 'lines',
          linesClass: 'lineParent'
        })
        new SplitText(next.container.querySelectorAll('.footer-text'), {
          type: 'lines',
          linesClass: 'lineFooter'
        })

        var headtl = gsap.timeline({
          scrollTrigger: {
            trigger: "header",
          }
        });
        headtl.fromTo('.lineParent', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 0.4)
        headtl.fromTo('.header-transition', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 0.7)
        headtl.fromTo('.arrow-down', { x: 100, y: -100 }, { x: 0, y: 0, duration: 1, ease: 'Power3.easeInOut' }, 1)

        var scrolltl = gsap.timeline({
          scrollTrigger: {
            trigger: ".scroll",
          }
        });
        scrolltl.fromTo('.cutline', { width: 0 }, { width: "100%", duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.2 }, 1)
        scrolltl.fromTo('.lift-up', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 0.4)
        scrolltl.fromTo('.shift', { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1 }, 0.2)

        var footertl = gsap.timeline({
          scrollTrigger: {
            trigger: ".contact",
          }
        });
        footertl.fromTo('.lineFooter', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.4, ease: 'Power3.easeInOut', stagger: 0.1 })

        HomeEnter()

      },
      beforeLeave({ next }) {

      }
    }
  ]
})