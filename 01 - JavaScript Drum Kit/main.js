// === ADD PLAY AUDIO FUNCTION FOR KEYDOWN HANDLER
// TODO Refactoring into its own function
function playAudio(e) {
    // Interested in event.keyCode
    console.log(e.keyCode);
    // == Check if there is an element on the page with data-key="65"
    // Use attribute selector syntax "audio[data-key=65]"
    var audio = document.querySelector("audio[data-key=\"" + e.keyCode + "\"]");
    // == Capture the key (class="key") so we can add some CSS visuals
    var key = document.querySelector(".key[data-key=\"" + e.keyCode + "\"]");
    // == Make sure we have a valid key. Otherwise, stop function using 'return'
    if (!audio || !key)
        return;
    // == Add CSS 'playing' class to key <div>
    key.classList.add("playing"); // Only applies, need to remove
    // Rewind to start
    audio.currentTime = 0;
    // Play the track using .play()
    audio.play();
}
// === MAKE REMOVETRANSITION FUNCTION FOR TRANSITIONEND HANDLER
function removeTransition(e) {
    // This will listen to ALL transition events.
    // console.log(e);
    // TODO We only want to wait until "transform" has ended (based on CSS transition time)
    if (e.propertyName !== "transform")
        return; // Stop function
    // TODO Remove the 'playing' class from the key element using 'this' keyword
    // console.log(`e.target: ${e.target}`); // [object Object]
    // console.log(e.target.classList); // ERROR: classList doesn't exist on 'EventTarget'
    // console.log(this.classList);
    // console.log(this); // <div class="key playing">
    this.classList.remove("playing");
}
// === LISTEN FOR TRANSITIONEND EVENT ON ALL KEYS USING DELEGATION
var keys = document.querySelectorAll(".key");
// Add event listener to each key? Yes!
keys.forEach(function (key) {
    key.addEventListener("transitionend", removeTransition);
});
// === ADD KEYDOWN LISTENER ON WINDOW
window.addEventListener("keydown", playAudio);
