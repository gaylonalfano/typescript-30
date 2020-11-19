// Let's get some UI elements to work with
var panels = document.querySelectorAll(".panel");
// console.log(panels); // NodeList(5)
function toggleOpen() {
    // console.log(`${this.classList} -- clicked!`); // works
    // TODO ? Do I really need to .add() and .remove()? .toggle() works!
    this.classList.toggle("open");
}
// Wait for transition to end before adding another transition
function toggleActive(e) {
    // NOTE This will listen for all transition events.
    // console.log(e); // Shows all TranstionEvent objects
    // console.log(e); // TransitionEvent object
    // console.log(this); // <div class="panel panel3 open">
    // console.log(this.value); // undefined
    // console.log(e.target); // <div class="panel panel3 open">
    // console.log(e.target.value); // ERROR
    // console.log(e.propertyName); // flex-grow, font-size
    // Only wait for 'transform' has ended (based on CSS transition)
    // if (e.propertyName !== "flex-grow" || "font-size") {
    //   console.log(`e.propertName !== flex-grow || font-size. STOPPING!`);
    //   return; // stop function
    // } // FIXME This will always stop the fn because there are multiple TransitionEvents
    if (e.propertyName.includes("flex")) {
        // Time to toggle on the "open-active" class to panel element
        this.classList.toggle("open-active");
    }
}
// Attach a 'click' event listener to each panel
panels.forEach(function (panel) {
    panel.addEventListener("click", toggleOpen);
    // ====== The ABOVE works fairly well. However, transitions occur at same time
    // Better is to wait for the first transiton to end using 'transitionend' event
    panel.addEventListener("transitionend", toggleActive);
});
