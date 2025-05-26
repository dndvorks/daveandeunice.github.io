const scrollContainer = document.querySelector('[data-scroll-container]');
const scroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true,
  class: 'is-inview',
});

// Apply fixed masonry grid and set background images after images loaded
function applyFixedMasonryGrid() {
  const items = document.querySelectorAll('.grid-item');
  const spans = [4, 1, 1, 1, 3, 1, 4]; // fixed spans as you wanted

  // Collect all image URLs from data-bg
  const bgUrls = Array.from(items)
    .map(item => item.getAttribute('data-bg'))
    .filter(Boolean);

  // Create image elements to preload
  const imageLoaders = bgUrls.map(url => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = img.onerror = resolve; // resolve on load or error
    });
  });

  Promise.all(imageLoaders).then(() => {
    // All images loaded (or failed), apply styles
    items.forEach((item, index) => {
      const bg = item.getAttribute('data-bg');
      if (bg) {
        item.style.backgroundImage = `url('${bg}')`;
      }
      const colSpan = spans[index] || 1;
      item.style.gridColumn = `span ${colSpan}`;
    });

    // Tell Locomotive Scroll to update now that layout changed
    scroll.update();
  });
}

document.addEventListener('DOMContentLoaded', applyFixedMasonryGrid);


scroll.on('call', (func, dir, obj) => {
  if (func === 'animateText3') {
    animateText3(obj.el);
  }
});
setupClipScrollReveal(scroll, '#section2');

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
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reset",
        invalidateOnRefresh: true,
        once: true,
      },
    });
  });
}
document.querySelector('.btn').addEventListener('click', () => {
  scroll.scrollTo('#section5'); // pass a selector string or an element
});



function animateText3(selector = '.text3') {
  const $elements = $(selector);

  $elements.each(function () {
    const $el = $(this);

    if ($el.hasClass('animated')) {
      return;
    }

    $el.addClass('visible animated');

    const wrappedText = $el.text().replace(/([^\x00-\x80]|\w)/g, "<span class='_text3'>$&</span>");
    $el.html(wrappedText);

    const $chars = $el.find("._text3");

    setTimeout(() => {
      const tl = gsap.timeline();

      tl.to($chars, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "power2.out"
      });

      $el.data('timeline', tl);
    }, 100);
  });
}



function animateHeadAnimIn(containerSelector = 'h1[data-scroll]') {
  const $container = $(containerSelector);
  if ($container.length === 0) return;

  // Select all .head-anim spans inside the container
  const $animItems = $container.find('.head-anim');

  // Kill old timeline if exists
  if ($container.data('timeline')) {
    $container.data('timeline').kill();
  }

  const tl = gsap.timeline();

  tl.to($animItems, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out"
  });

  $container.data('timeline', tl);
}

function setupClipScrollReveal(scrollInstance, selector) {
  const section = document.querySelector(selector);
  if (!section) return;

  scrollInstance.on('scroll', (args) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const visibleAmount =
      Math.min(
        sectionHeight,
        Math.max(0, windowHeight - sectionTop)
      ) / sectionHeight;

    // Clamp visibleAmount between 0 and 1
    const progress = Math.max(0, Math.min(1, visibleAmount));

    // Apply clip-path (reverse the progress so it reveals from top to bottom)
    section.style.setProperty(
      '--reveal-progress',
      `${(1 - progress) * 100}%`
    );

    section.style.setProperty(
      '--clip-path',
      `inset(${(1 - progress) * 100}% 0 0 0)`
    );

    // Update the ::before clip-path
    section.querySelector('::before'); // pseudo-elements can’t be updated directly
    section.style.setProperty('--clip-path', `inset(${(1 - progress) * 100}% 0 0 0)`);
  });
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

      animateHeadAnimIn();
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
