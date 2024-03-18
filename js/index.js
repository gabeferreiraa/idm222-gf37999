/* // -----------------Imports-------------------------// */
import { animate, timeline } from "motion";

document.addEventListener("DOMContentLoaded", function () {
  // Check if the 'firstLoadDone' flag is set in sessionStorage
  if (!sessionStorage.getItem("firstLoadDone")) {
    // Set 'firstLoadDone' flag to true
    sessionStorage.setItem("firstLoadDone", "true");
    // Redirect to index.html only if not already there
    if (window.location.pathname !== "/index.html") {
      window.location.href = "/index.html";
    }
  }
  // If 'firstLoadDone' is set, do nothing and let the user navigate the site normally
});

/* // -----------------HamburgerMenu-------------------------// */

const hamburgerButton = document.getElementById("hamburger-button");
const hamburgerMenu = document.getElementById("burger-white");
const hamburgerMenuOpen = document.getElementById("burger-white-2");
const menuOpenWrapper = document.getElementById("menu-open-wrapper");
const menuOpenFilter = document.getElementById("menu-open-bg-filter");

hamburgerButton.addEventListener("click", () => {
  const isOpened = hamburgerButton.getAttribute("aria-expanded");

  if (isOpened === "false") {
    hamburgerMenuOpen.style.opacity = "100%";
    menuOpenWrapper.style.display = "flex";
    hamburgerMenu.style.opacity = "0%";
    hamburgerButton.setAttribute("aria-expanded", "true");
  } else {
    hamburgerMenu.style.opacity = "100%";
    hamburgerMenuOpen.style.opacity = "0%";
    hamburgerButton.setAttribute("aria-expanded", "false");
  }
});

/* // -----------------MouseAnimations-------------------------// */

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // cursorOutline.style.left = `${posX}px`;
  // cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 200, fill: "forwards" }
  );
});

/* // -----------------MenuActiveSelection-------------------------// */
const activePage = window.location.pathname;
const navLinks = document
  .querySelectorAll(".heading1-menu-sub-wrapper a")
  .forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add("w--current");
    }
  });

// -------- Animations Start --------//
const activator = document.querySelector("#hamburger-button");
// const mover = document.querySelector("#menu-open-wrapper");

let menuOpen = true;
const daMotion = [
  [
    "#menu-open-wrapper",
    { transform: ["translate3d(0px, 0%, 0px"] },
    { at: 0.1 },
  ],
];
const daNegativeMotion = [
  [
    "#menu-open-wrapper",
    { transform: ["translate3d(0px, -110%, 0px"] },
    { at: 0.1 },
  ],
];

activator.addEventListener("click", () => {
  if (menuOpen) {
    timeline(daMotion, { duration: 0.6 });
    animate(
      ".heading1-menu",
      {
        y: -40,
      },
      { delay: 0.55 },
      { duration: 0.4 }
    );
  } else {
    timeline(daNegativeMotion, { duration: 0.8 });
    animate(
      ".heading1-menu",
      {
        y: 40,
      },
      {
        delay: 0.55,
      },
      { duration: 0.4 }
    );
  }

  menuOpen = !menuOpen;
});
/* // -----------------PreLoader-------------------------// */
// setTimeout(() => {
//   const loaderText = document.querySelector(".loader").querySelector("h1");
//   const loader = document.querySelector(".loader");

//   animate((progress) => (loaderText.innerHTML = Math.round(progress * 100)), {
//     duration: 0.75,
//     easing: "ease-out",
//   }).finished.then(() => {
//     loader.style.display = "none";
//   });
// }, 700);

/* // -----------------HoverGlitchEffect-------------------------// */
const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%&?'";

let interval = null;
const spanElements = document.querySelectorAll(".hero-text span");
spanElements.forEach((span) => {
  span.onmouseover = (event) => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 63)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };
});
/* // -----------------CurrentTimeSet-------------------------// */
const localTime = document.querySelector(".local-time");

function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const clockString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  localTime.innerText = clockString;
}
updateTime();
setInterval(updateTime, 1000);
