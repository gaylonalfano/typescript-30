// Grab the slider
var slider = document.querySelector(".items");
// Create some variables to help with handling a little state
var isDown = false;
var startX;
var scrollLeft;
// Attach listeners for mousedown, mouseleave, mouseup, mousemove
function handleMouseDown(e) {
    console.log("mousedown");
    isDown = true;
    slider.classList.add("active");
    // 1. Grab initial mousedown position
    // NOTE Need to offset in case lots of margin, etc.
    startX = e.pageX - slider.offsetLeft;
    // console.log(e.pageX);
    // console.log(startX);
    // 2. Grab initial scroll position (in case you've already scrolled)
    scrollLeft = slider.scrollLeft;
    // console.log("scrollLeft: ", scrollLeft);
}
function handleMouseLeave() {
    // console.log("mouseleave");
    isDown = false;
    slider.classList.remove("active");
}
function handleMouseUp() {
    // console.log("mouseup");
    isDown = false;
    slider.classList.remove("active");
}
function handleMouseMove(e) {
    // Only fire if isDown is true since we're making click and drag
    if (!isDown)
        return; // Stop executing
    // console.log("mousemove");
    // console.count(`${isDown}`);
    // console.log("startX: ", startX); // consistent value
    // console.log("scrollLeft: ", scrollLeft); // consistent value
    // 1. Prevent the browser from thinking we're trying to highlight/select text
    e.preventDefault();
    // 2. Keep track of X-axis value as we scroll/move/drag
    var x = e.pageX - slider.offsetLeft;
    // 3. Compute how much we've 'walked' the cursor
    var walk = x - startX;
    console.log({ x: x, startX: startX, walk: walk });
    // 4. Use scrollLeft property to scroll the div
    slider.scrollLeft = scrollLeft - walk * 3;
}
slider.addEventListener("mousedown", handleMouseDown);
slider.addEventListener("mouseleave", handleMouseLeave);
slider.addEventListener("mouseup", handleMouseUp);
slider.addEventListener("mousemove", handleMouseMove);
