// ==== Grab UI and set globals
const hero = document.querySelector(".hero") as HTMLDivElement;
const heroHeading = hero.querySelector("h1") as HTMLHeadingElement;
const walkPixels = 100; // +/-50px  (kinda arbitrary)

// ==== Functions
function handleMouseMoveShadow(e: MouseEvent): void {
  // NOTE client/Window; offset/Element
  // let xCoord = e.clientX;
  // let xOffset = e.offsetX;
  // let yCoord = e.clientY;
  // let yOffset = e.offsetY;
  // console.log(`x: ${xCoord}, y: ${yCoord}`);
  // console.log(`xO: ${xOffset}, yO: ${yOffset}`);

  // === Grab the width and height of the Element we're mousing over
  // const width = hero.offsetWidth;
  // const height = hero.offsetHeight;
  // Or, destructure:
  const { offsetWidth: heroWidth, offsetHeight: heroHeight } = hero;
  let { offsetX: xO, offsetY: yO } = e;
  let { clientX: xC, clientY: yC } = e;
  const { offsetTop: oTop, offsetLeft: oLeft } = e.target as HTMLHeadingElement;

  // NOTE this = thing attached via addEventListener()
  // NOTE e.target = thing that triggers (can change)
  // NOTE offset values will change depending on whether there are
  // child elements. We want to get consistent x,y values even if
  // e.target changes (doesn't match this).
  if (this !== e.target) {
    xO = xO + oLeft;
    yO = yO + oTop;
  }

  // Is there a difference between offsetX/Y and clientX/Y after this?
  // NOPE! Maybe clientX/Y is newer than offsetX/Y?
  console.log(`xO: ${xO}, yO: ${yO}`); // same as clientX/Y!
  console.log(`xC: ${xC}, yC: ${yC}`); // same as offsetX/Y!
  // console.log(heroWidth, heroHeight);  // Static: 803, 412

  // === Compute the walk X/Y values
  const xWalk = Math.round((xC / heroWidth) * walkPixels - walkPixels / 2);
  const yWalk = Math.round((yC / heroHeight) * walkPixels - walkPixels / 2);
  // console.log(`xWalk: ${xWalk}, yWalk: ${yWalk}`); // top left = -50, -50; bottom right = 50, 50

  // === Update the header style textShadow properties
  // heroHeading.style.textShadow = `${xWalk}px ${yWalk}px 0 red`;
  heroHeading.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
  ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
  ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
  ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
`;
}

// ==== Add event listeners
hero.addEventListener("mousemove", handleMouseMoveShadow);
