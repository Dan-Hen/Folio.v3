import '../src/style.scss';
import barba from '@barba/core';
import { gsap } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from './js/SplitText';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

import * as THREE from 'three';

const scene = new THREE.Scene();

//set the size of the camera. In order : field of view, aspect ratio, view frustum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({ color: 0XB2B2B2, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

//render the scene
scene.add(torus)

//render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate()

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

function HomeScroll() {

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

function ProjectScroll() {
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

        gsap.fromTo('.text-content1', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1, scrollTrigger:{trigger:'.text-content1', start: 'top bottom-=100'}})
        gsap.fromTo('.text-content2', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'Power3.easeInOut', stagger: 0.1, scrollTrigger:{trigger:'.text-content2', start: 'top bottom-=100'}})

        ScrollTrigger.refresh(true)
      },
      afterEnter({ next }) {

      },
      beforeLeave({ next }) {
        let Alltrigger = ScrollTrigger.getAll()
        for (let i = 0; i < Alltrigger.length; i++) {
          Alltrigger[i].kill(true)
        }
      }
    },
    {
      namespace: 'menu',
      beforeEnter({ next }) {

      },
      afterEnter({ next }) {

      },
      beforeLeave({ next }) {

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
      afterEnter({ current }) {

      },
      beforeLeave({ next }) {

      }
    }
  ]
})