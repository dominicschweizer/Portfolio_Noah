"use strict";

function qs(selector, all = false) {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}

function scrollHandler(e) {
  const sections = qs(".section", true);
  const timeline = qs(".timeline");
  const line = qs(".line");
  console.log(line);
  line.style.bottom = `calc(100% - 20px)`;
  line.style.display = "block";
  const targetY = window.innerHeight * 0.8;
  let prevScrollY = window.scrollY;
  let up, down;
  let full = false;
  let set = 0;
  const { scrollY } = window;
  up = scrollY < prevScrollY;
  down = !up;
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;

  const dist = targetY - timelineRect.top;
  console.log(dist);

  if (down && !full) {
    set = Math.max(set, dist);
    line.style.bottom = `calc(100% - ${set}px)`;
  }

  if (dist > timeline.offsetHeight + 50 && !full) {
    full = true;
    line.style.bottom = `-50px`;
  }

  sections.forEach((item) => {
    // console.log(item);
    const rect = item.getBoundingClientRect(); //     console.log(rect);

    if (rect.top + item.offsetHeight / 5 < targetY) {
      item.classList.add("show-me");
    }
  }); // console.log(up, down);

  prevScrollY = window.scrollY;
}

window.onload = () => scrollHandler();

window.addEventListener("scroll", scrollHandler);
