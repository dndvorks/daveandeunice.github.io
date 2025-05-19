function initScrollAnimations() {
  const scrollContainer = document.querySelector('[data-scroll-container]');

  document.querySelectorAll("[data-animate]").forEach((el) => {
    const type = el.getAttribute("data-animate");
    let animSettings = {};

    if (type === "fade-up") {
      animSettings = { y: 60, opacity: 0 };
    } else if (type === "fade-in") {
      animSettings = { opacity: 0 };
    }

    gsap.set(el, animSettings);

    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      overwrite: "auto",
      scrollTrigger: {
        trigger: el,
        scroller: scrollContainer,
        start: "top 50%",
        end: "bottom 10%",
        toggleActions: "play none none reset",
        invalidateOnRefresh: true,
        once: true,
      },
    });
  });
}

function animateIntroText() {
  // Hide all target elements before animation starts
  gsap.set([".no-sx", "h1.title", ".h3:not(.no-sx)", "#countdown"], {
    opacity: 0,
    visibility: "hidden",
    y: 40,
    scale: 0.95
  });

  const timeline = gsap.timeline();

  timeline
    .to(".no-sx", {
      y: 0,
      opacity: 1,
      visibility: "visible",
      duration: 1,
      ease: "power3.out"
    })
    .to("h1.title", {
      y: 0,
      opacity: 1,
      visibility: "visible",
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(".h3:not(.no-sx)", {
      y: 0,
      opacity: 1,
      visibility: "visible",
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to("#countdown", {
      scale: 1,
      opacity: 1,
      visibility: "visible",
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.8");
}

const text = "#FromNiceBeginningstoDave-ineForever";
const el = document.getElementById("typewriter-text");
let i = 0;



function typeWriter(callback) {
  if (i < text.length) {
    el.textContent += text.charAt(i);
    i++;
    setTimeout(() => typeWriter(callback), 100);
  } else {
    setTimeout(callback, 600); // wait before triggering GSAP
  }
}

function startPreloaderExit() {
  const tl = gsap.timeline();

  tl.to(".row-top", {
    x: "-100%",
    duration: 1,
    ease: "power3.inOut"
  }, 0)

  .to(".row-bottom", {
    x: "-100%",
    duration: 1,
    ease: "power3.inOut"
  }, 0)

  .to(".row-middle", {
    x: "100%",
    duration: 1,
    ease: "power3.inOut"
  }, 0)

  .to("#preloader", {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      document.getElementById("preloader").style.display = "none";
      document.body.style.overflow = "auto";

      // ✅ Trigger scroll animations AFTER preloader is gone
      initScrollAnimations();
      animateIntroText(); 
    }
  });
}


window.addEventListener("load", () => {
  typeWriter(startPreloaderExit);
});

$(document).ready(function () {

  // Countdown logic
  function updateCountdown() {
    const targetDate = new Date("2025-08-18T14:00:00");
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      $("#countdown").html('<span>08.18.2025</span>');
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const $items = $("#countdown .countdown-item");
    $items.eq(0).find(".countdown-number").text(days);
    $items.eq(1).find(".countdown-number").text(hours.toString().padStart(2, '0'));
    $items.eq(2).find(".countdown-number").text(minutes.toString().padStart(2, '0'));
    $items.eq(3).find(".countdown-number").text(seconds.toString().padStart(2, '0'));
  }

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector('[data-scroll-container]');

  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    lerp: 0.09,
    multiplier: 1.1,
    class: 'is-inview',
  });

  // Link Locomotive Scroll with ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  ScrollTrigger.refresh();



  gsap.to("#animatedText", {
      x: "-100%",
      duration: 100,
      ease: "linear",
      repeat: -1
    });

     gsap.fromTo("#animatedTextRight", 
      { x: "-100%" }, 
      {
        x: "0%",
        duration: 100,
        ease: "linear",
        repeat: -1
      }
    );
});


//Initial References
const container = document.querySelector(".xcont");
let drawHearts;
let mouseX = 0,
  mouseY = 0;
let hearts = [];
//Red Shades
// let colors = ["#ff0000", "#dc143c", "#ff4040", "#ed2939", "#fe2712", "#ed1c24"];
//Events Object
let colors = ["#81b7f9", "#a0c9fb", "#5da4f7", "#3c8af4", "#2573e6", "#0d5fd4"];
let events = {
  mouse: {
    move: "mousemove",
    stop: "mouseout",
  },
  touch: {
    move: "touchmove",
    stop: "touchend",
  },
};
let deviceType = "";
//Detect touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (It would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};
//Random number between given range
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}
//Create Hearts
function startCreation() {
  //If drawHearts = true only then start displaying hearts. This is done to stop hearts creation when mouse is not on the screen.
  if (drawHearts) {
    //Create Div
    let div = document.createElement("div");
    div.classList.add("heart-container");
    //Set left and top based on mouse X and Y
    div.style.left = mouseX + randomNumberGenerator(5, 50) + "px";
    div.style.top = mouseY + randomNumberGenerator(5, 50) + "px";
    //Random shade of Red
    let randomColor =
      colors[Math.floor(randomNumberGenerator(0, colors.length - 1))];
    //heart dic
    div.innerHTML = `<div class="heart"></div>`;
    div.style.opacity = 1;
    //Set the value of variable --size to random number
    let root = document.querySelector(":root");
    let sizeValue = randomNumberGenerator(10, 20);
    //Random height/width value
    //You can change this
    root.style.setProperty("--size", sizeValue + "px");
    root.style.setProperty("--color", randomColor);
    container.appendChild(div);
    //set visible flag for div
    hearts.push({
      visible: true,
    });
  }
  updateHearts();
  window.setTimeout(startCreation, 50);
}
function updateHearts() {
  for (let i in hearts) {
    //get div at current index
    let heartContainer = document.getElementsByClassName("heart-container")[i];
    //If visible
    if (hearts[i].visible) {
      heartContainer.style.opacity = +heartContainer.style.opacity - 0.1;
      //If 0 set visible to false
      if (heartContainer.style.opactiy == 0) {
        hearts[i].visible = false;
      }
    } else {
      //if div is not visible remove it and remove entry from hearts array
      heartContainer.remove();
      hearts.splice(i, 1);
    }
  }
}
isTouchDevice();
document.addEventListener(events[deviceType].move, function (e) {
  mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
  mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
  drawHearts = true;
});
document.addEventListener(events[deviceType].stop, function (e) {
  drawHearts = false;
});
window.onload = () => {
  drawHearts = false;
  startCreation();
};

// Paperplanes
