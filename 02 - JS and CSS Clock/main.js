// Select our UI Elements
var secondHand = document.querySelector(".second-hand");
var minuteHand = document.querySelector(".min-hand");
var hourHand = document.querySelector(".hour-hand");
// Add a custom rotate() function
function rotate(element, degrees) {
    element.style.transform = "rotate(" + degrees + "deg)";
}
// Add a function to handle second-hand ticks/rotations
function setDate() {
    // console.log("hi");
    var now = new Date();
    var seconds = now.getSeconds();
    var minutes = now.getMinutes();
    var hours = now.getHours();
    // console.log(seconds); // Gets the current second of now
    // console.log(minutes); // Gets the current minute of now
    console.log(hours); // Gets the current hour of now
    // Need to convert these seconds into a corresponding degree for rotation
    // FIXME Remember we rotated 90deg to get them to point at 12. So we need to
    // FIXME account for that offset by adding 90deg
    var secondsDegrees = (seconds / 60) * 360 + 90;
    var minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
    var hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
    // Update the CSS style of our secondHand by adding transform: rotate()
    // TODO Could refactor this into a function
    rotate(secondHand, secondsDegrees);
    rotate(minuteHand, minutesDegrees);
    rotate(hourHand, hoursDegrees);
}
// Execute TimerHandler at set interval ms
setInterval(setDate, 1000);
// // ===== Example IIFE
// (function() {
//   const secondHand = document.querySelector('.second-hand') as HTMLInputElement;
//   const minsHand = document.querySelector('.min-hand') as HTMLInputElement;
//   const hourHand = document.querySelector('.hour-hand') as HTMLInputElement;
//   const rotate = (element: HTMLInputElement, degrees: number): void => {
//     element.style.transform = `rotate(${degrees}deg)`;
//   };
//   function setDate() {
//     const now = new Date();
//     const seconds = now.getSeconds();
//     const secondsDegrees = (seconds / 60) * 360 + 90;
//     rotate(secondHand, secondsDegrees);
//     const mins = now.getMinutes();
//     const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
//     rotate(minsHand, minsDegrees);
//     const hour = now.getHours();
//     const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
//     rotate(hourHand, hourDegrees);
//   }
//   setInterval(setDate, 1000);
//   setDate();
// })();
