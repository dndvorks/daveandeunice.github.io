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
