// const audio = document.getElementById('myAudio');
// const viewBtn = document.getElementById('viewBtn');
// const buttonWall = document.getElementById('buttonWall');

// let hasPlayed = false;

// // Handle RSVP button click
// viewBtn.addEventListener('click', () => {
//   buttonWall.classList.add('hidden'); // Fade out wall
//   document.body.style.overflow = 'auto'; // Enable scroll

//   // Play audio
//   audio.play()
//     .then(() => console.log('Audio playing'))
//     .catch(err => console.warn('Audio play blocked:', err));

//   hasPlayed = true;
// });

// // Fallback: autoplay audio on scroll if button wasn't clicked
// window.addEventListener('scroll', () => {
//   if (!hasPlayed && audio) {
//     audio.play()
//       .then(() => console.log('Audio started on scroll'))
//       .catch(err => console.warn('Play prevented:', err));
//     hasPlayed = true;
//   }
// });

// const playbackConst = 500; // Adjust this to control scroll speed
// const setHeight = document.getElementById("set-height");
// const vid = document.getElementById("v0");

// // Set the height based on video duration
// function setPageHeight() {
//   const duration = Math.floor(vid.duration);
//   setHeight.style.height = duration * playbackConst + "px";
// }

// // Frame-syncing function
// function scrollPlay() {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
//   const frameNumber = scrollTop / playbackConst;
//   const clampedTime = Math.min(Math.max(0, frameNumber), vid.duration);

//   if (Math.abs(vid.currentTime - clampedTime) > 0.01) {
//     vid.currentTime = clampedTime;
//   }

//   // Use requestAnimationFrame for smoother playback
//   requestAnimationFrame(scrollPlay);
// }

// // Start once the video is ready and fully buffered
// function initWhenVideoIsReady() {
//   if (vid.readyState >= 4) { // HAVE_ENOUGH_DATA
//     setPageHeight();
//     requestAnimationFrame(scrollPlay);
//   } else {
//     // Wait until it's fully buffered
//     vid.addEventListener('canplaythrough', () => {
//       setPageHeight();
//       requestAnimationFrame(scrollPlay);
//     }, { once: true });
//   }
// }

// // Ensure metadata is loaded first
// if (vid.readyState >= 1) {
//   initWhenVideoIsReady();
// } else {
//   vid.addEventListener('loadeddata', initWhenVideoIsReady, { once: true });
// }
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
      document.getElementById("main-content").style.display = "block";
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

  // Animate elements with data-animate attribute
  document.querySelectorAll("[data-animate]").forEach((el) => {
    const type = el.getAttribute("data-animate");
    let animSettings = {};

    if (type === "fade-up") {
      animSettings = { y: 60, opacity: 0 };
    } else if (type === "fade-in") {
      animSettings = { opacity: 0 };
    }

    // Set initial style before scroll triggers (prevents flicker)
    gsap.set(el, animSettings);

    // Animate when in view
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      overwrite: "auto",
      scrollTrigger: {
        trigger: el,
        scroller: scrollContainer,
        start: "top 85%",
        end: "bottom 10%",
        toggleActions: "play none none reset",
        invalidateOnRefresh: true,
        once: true,
      },
    });
  });
});




// Paperplanes
