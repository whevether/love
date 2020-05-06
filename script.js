const bounce = new TimelineMax({
  repeat: -1 });

const main = document.getElementById("main");
const mouth = document.getElementById("mouth");
bounce.
set(mouth, { scale: 1.3, y: 0.25, transformOrigin: "center" }).
to(
main,
2.5,
{
  ease: Power1.easeInOut,
  y: -5,
  transformOrigin: "center",
  scale: 1.04,
  rotation: 0.5 },

0.05).

to(
main,
2.5,
{
  ease: Power1.easeInOut,
  y: 0,
  transformOrigin: "center",
  scale: 1,
  rotation: 0 },

3.15);


const fleck = document.getElementsByClassName("fleck");
const eyes = document.getElementsByClassName("eye");
const blink = new TimelineMax({ repeat: -1 });
blink.
to(eyes, 0.1, { scaleY: 0.3, transformOrigin: "center" }, 6).
to(fleck, 0.05, { opacity: 0 }, 6).
to(eyes, 0.1, { scaleY: 1, transformOrigin: "center" }).
to(fleck, 0.1, { opacity: 1 }, 6.15);

const placeExtraClouds = ({
  id,
  left,
  waveLength,
  innerWidth,
  freq,
  width }) =>
{
  let items = freq - 1;
  let curLeft = left;
  while (items > 0) {
    const nextLeft = curLeft - waveLength;
    if (nextLeft + width > 0) {
      curLeft = nextLeft;
      items--;
    } else {
      curLeft = nextLeft + innerWidth;
      items--;
    }
    const addCloud = document.getElementById(id).cloneNode(true);
    addCloud.id = "";
    addCloud.style.left = curLeft;
    document.getElementById("extra-clouds").append(addCloud);
  }
};

const initClouds = () => {
  const { innerWidth, innerHeight } = window;
  const happyCloud = document.getElementById("happy-cloud");
  const ratio = 1.6379;
  let height;
  let width;
  if (innerWidth > innerHeight) {
    height = innerHeight * 0.45;
    width = height * ratio;
  } else {
    width = innerWidth * 0.73;
    height = width / ratio;
  }
  happyCloud.style.width = width;
  happyCloud.style.height = height;
  happyCloud.style.visibility = "visible";

  const { left, top, bottom, right } = happyCloud.getBoundingClientRect();
  const freq = Math.round(innerWidth / (width * 1.5));
  const waveLength = innerWidth / freq;
  const extraClouds = document.getElementById("extra-clouds");
  while (extraClouds.hasChildNodes()) {
    extraClouds.removeChild(extraClouds.lastChild);
  }

  // Place all clouds in relation to happy cloud
  const cloud1 = document.getElementById("cloud1");
  cloud1.style.width = width * 0.32;
  cloud1.style.left = left + width * 0.45;
  cloud1.style.top = top - height * 1.02;
  cloud1.style.visibility = "visible";
  placeExtraClouds({
    id: "cloud1",
    left: left + width * 0.45,
    waveLength,
    innerWidth,
    freq });


  const cloud2 = document.getElementById("cloud2");
  cloud2.style.width = width * 0.63;
  cloud2.style.left = left - width * 0.35;
  cloud2.style.top = top - height * 0.7;
  cloud2.style.visibility = "visible";
  placeExtraClouds({
    id: "cloud2",
    left: left - width * 0.35,
    waveLength,
    innerWidth,
    freq,
    width: width * 0.63 });


  const cloud3 = document.getElementById("cloud3");
  cloud3.style.width = width * 0.32;
  cloud3.style.left = right + width * 0.02;
  cloud3.style.top = top - height * 0.03;
  cloud3.style.visibility = "visible";
  placeExtraClouds({
    id: "cloud3",
    left: right + width * 0.02,
    waveLength,
    innerWidth,
    freq,
    width: width * 0.32 });


  const cloud4 = document.getElementById("cloud4");
  cloud4.style.width = width * 0.25;
  cloud4.style.left = right - width * 0.12;
  cloud4.style.top = bottom + height * 0.15;
  cloud4.style.visibility = "visible";
  placeExtraClouds({
    id: "cloud4",
    left: right - width * 0.12,
    waveLength,
    innerWidth,
    freq,
    width: width * 0.25 });


  const cloud5 = document.getElementById("cloud5");
  cloud5.style.width = width * 0.5;
  cloud5.style.left = left;
  cloud5.style.top = bottom + height * 0.3;
  cloud5.style.visibility = "visible";
  placeExtraClouds({
    id: "cloud5",
    left: left,
    waveLength,
    innerWidth,
    freq,
    width: width * 0.5 });

};

// Clouds parallax
let loops = 1;
const anim = () => {
  const clouds = document.getElementsByClassName("clouds");
  for (let i = 0, len = clouds.length; i < len; i++) {
    const cloud = clouds[i];
    let { width, left } = cloud.getBoundingClientRect();
    let move = false;
    if (
    cloud.classList.contains("cloud1") ||
    cloud.classList.contains("cloud4"))
    {
      move = loops % 4 === 1;
    }
    if (cloud.classList.contains("cloud3")) {
      move = loops % 4 === 1;
    }
    if (cloud.classList.contains("cloud2")) {
      move = loops % 2 === 1;
    }
    if (cloud.classList.contains("cloud5")) {
      move = loops % 3 === 1;
    }

    const styleLeft = Math.round(cloud.style.left.split("px")[0]);
    let nextPos = Math.round(left) - styleLeft - 2;
    if (Math.round(left) - 1 + width < 0) nextPos += innerWidth + width;
    if (move) cloud.style.transform = `translate3d(${nextPos}px, 0, 0)`;
  }
  loops++;
  requestAnimationFrame(anim);
};

const colors = [
"#13142b",
"#c132a9",
"#9b31bf",
"#f7e522",
"#fc4c46",
"#10f204",
"#f21d2b",
"#11e0dc",
"#31a9f9"];

const pickRandom = list => {
  const len = list.length;
  return list[Math.floor(Math.random() * len)];
};

// Clicking on cloud <3
const addLove = () => {
  blink.pause();

  // Blink real quick
  const blink1x = new TimelineMax();
  blink1x.
  to(eyes, 0.08, { scaleY: 0.2, transformOrigin: "center" }, 0).
  to(fleck, 0.05, { opacity: 0 }, 0).
  to(eyes, 0.1, { scaleY: 1, transformOrigin: "center" }, 0.2).
  to(fleck, 0.1, { opacity: 1 }, 0.25);

  const cheeks = document.getElementsByClassName("cheeks");
  const blush = new TimelineMax();
  blush.to(cheeks, 0.05, { opacity: 0.15 }).to(cheeks, 0.3, { opacity: 0 });

  // Make a heart and let it blow away
  const { left, width, top, height, bottom } = main.getBoundingClientRect();
  const sign = Math.round(Math.random()) ? -1 : 1;
  let heart = document.createElement("div");
  heart.classList.add("heart");
  document.body.appendChild(heart);

  const float = new TimelineMax({
    onComplete: function () {
      heart.remove();
      heart = null;
    } });

  const { innerWidth, innerHeight } = window;
  const vmin = Math.min(innerWidth, innerHeight) / 100;
  const heartLeft = Math.random() * width * 0.4 + width * 0.1 + left;
  const heartTop = Math.random() * height * .1 * sign + top;
  const heartUp = (heartTop + 8 * vmin) / 4;
  const heartHorizDelta = width * .05 * Math.random() + width * .03;
  float.
  set(heart, { scale: 0.5, left: heartLeft, top: heartTop, color: pickRandom(colors) }, 0).
  to(
  heart,
  heartTop / 80,
  {
    bezier: [
    { x: sign * heartHorizDelta, y: -heartUp },
    { x: 0, y: -heartUp * 2 },
    { x: sign * -1 * heartHorizDelta, y: -heartUp * 3 },
    { x: 0, y: -heartUp * 4 }],

    ease: Linear.easeNone },

  0).

  to(heart, 4, { scale: 1, color: pickRandom(colors) }, 0);

  // Resume
  blink.resume(2);
};

initClouds();
requestAnimationFrame(anim);
window.addEventListener("resize", initClouds);
main.addEventListener("mousedown", addLove);