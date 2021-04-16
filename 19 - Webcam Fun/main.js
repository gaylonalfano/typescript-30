var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var video = document.querySelector(".player");
var canvas = document.querySelector(".photo");
// NOTE You draw on context, not directly on canvas
var canvasCtx = canvas.getContext("2d");
// Where we'll dump all of our images onto the strip
var strip = document.querySelector(".strip");
// Audio for camera shutter sound
var snap = document.querySelector(".snap");
// NOTE Our webcam stream will be piped through to our <video> element.
// We'll be taking lots of snapshots (~16ms/snapshot) and dumping those
// into the <canvas> where we'll then manipulate it all.
// ===== Get the video that's getting piped into our video element
// using navigator.mediaDevices.getUserMedia()
// function getVideo() {
//   navigator.mediaDevices
//     .getUserMedia({ video: true, audio: false })
//     .then((localMediaStream: MediaStream) => {
//       // console.log(localMediaStream); // MediaStream type
//       // Must first convert stream to ObjectURL type so video understands
//       video.src = window.URL.createObjectURL(localMediaStream);
//       // video.play();
//     });
// }
// Async/Await version: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
function getVideoAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var stream, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stream = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: false
                        })];
                case 2:
                    stream = _a.sent();
                    //  DEPRECIATION :
                    //       The following has been depreceated by major browsers as of Chrome and Firefox.
                    //       video.src = window.URL.createObjectURL(localMediaStream);
                    //       Please refer to these:
                    //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
                    //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
                    video.srcObject = stream;
                    // Now that we've converted stream to URL, let's play the video
                    video.play();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("I'm gonna need your webcam for this...", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Let's take a frame from video and paint to canvasCtx
function paintToCanvas() {
    var width = video.videoWidth;
    var height = video.videoHeight;
    // console.log(width, height); // 1200 720
    // Set the canvas to be the same dimensions
    canvas.width = width;
    canvas.height = height;
    // Let's take a snapshot every interval and draw
    // using dx, dy, dw, dh
    // NOTE It's best to return this interval so you can clearInterval()
    // NOTE Need to run this inside browser console to show!
    // UPDATE Unless you listen for 'canplay' event!
    return setInterval(function () {
        canvasCtx.drawImage(video, 0, 0, width, height);
        // Let's add ability to add color filters by extracting pixels
        var pixels = canvasCtx.getImageData(0, 0, width, height);
        // console.log(pixels); // ImageData {data, width, height}
        // Loop over pixels to add rgb effects
        // pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        // canvasCtx.globalAlpha = 0.1; // Ghosting effect
        pixels = greenScreen(pixels);
        // debugger;
        // Put pixels back into canvas
        canvasCtx.putImageData(pixels, 0, 0);
    }, 100);
}
function takePhoto() {
    // Work on the audio sound effect
    snap.currentTime = 0;
    snap.play();
    // Take data out of canvas. Take an actual photo.
    // NOTE This allows us to create a link and image and
    // place into our strip section.
    var data = canvas.toDataURL("image/jpeg");
    console.log(data);
    var link = document.createElement("a");
    link.href = data;
    // NOTE The 'value' arg is the filename to be saved!
    link.setAttribute("download", "handsome");
    // link.textContent = "Download image";
    link.innerHTML = "<img src=\"" + data + "\" alt=\"Handsome man\">";
    // Place most recent photo at beginning by preprending link inside strip div
    strip.insertBefore(link, strip.firstChild);
}
// Various Effects and Filters
function redEffect(pixels) {
    // Loop over all pixels and modify
    for (var i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] += 100; // r
        pixels.data[i + 1] -= 50; // g
        pixels.data[i + 2] *= 0.5; // b
        // pixels.data[i+3] // alpha
    }
    return pixels;
}
function rgbSplit(pixels) {
    // Loop over all pixels and modify
    for (var i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // r
        pixels.data[i + 500] = pixels.data[i + 1]; // g
        pixels.data[i - 550] = pixels.data[i + 2]; // b
    }
    return pixels;
}
function greenScreen(pixels) {
    // NOTE Green Screen works by having a range of color values
    // where, if within the range, you take them out (levels)
    // const levels = {};
    var levels = new Map();
    // Hook up our controls inputs sliders and store in levels object
    // Q: Would a Map be better for this?
    document.querySelectorAll(".rgb input").forEach(function (input) {
        levels.set(input.name, input.value);
        // levels[input.name] = input.value;
    });
    // console.log(levels);
    // Loop through all pixels
    for (var i = 0; i < pixels.data.length; i += 4) {
        var red = pixels.data[i + 0];
        var green = pixels.data[i + 1];
        var blue = pixels.data[i + 2];
        var alpha = pixels.data[i + 3];
        // Remove the pixel if within range (make transparent using alpha = 0)
        if (red >= levels.get("rmin") &&
            green >= levels.get("gmin") &&
            blue >= levels.get("bmin") &&
            red <= levels.get("rmax") &&
            green <= levels.get("gmax") &&
            blue <= levels.get("bmax")) {
            // Take the pixel out by making transparent
            // alpha = 0; // Doesn't change data!
            pixels.data[i + 3] = 0; // Works!
        }
    }
    return pixels;
}
// NOTE Here's a full TS example: https://github.com/tricinel/TypeScript30/blob/master/src/19%20-%20Webcam%20Fun/main.ts
// enum InputNames {
//   rmin,
//   rmax,
//   gmin,
//   gmax,
//   bmin,
//   bmax
// }
// interface Input {
//   rmin: string;
//   rmax: string;
//   gmin: string;
//   gmax: string;
//   bmin: string;
//   bmax: string;
// }
// type InputName = 'rmin' | 'rmax' | 'gmin' | 'gmax' | 'bmin' | 'bmax';
// type Mapped<T> = { [P in keyof T]?: T[P] };
// type Levels = Mapped<Input>;
// function greenScreen(pixels: ImageData): ImageData {
//   const levels: Levels = {};
//   const inputs = document.querySelectorAll('.rgb input') as NodeListOf<
//     HTMLInputElement
//   >;
//   inputs.forEach(input => {
//     let key: InputName = input.name as InputName;
//     levels[key] = input.value;
//   });
//   for (let i = 0; i < pixels.data.length; i = i + 4) {
//     let red = pixels.data[i + 0];
//     let green = pixels.data[i + 1];
//     let blue = pixels.data[i + 2];
//     let alpha = pixels.data[i + 3];
//     if (
//       levels.rmin &&
//       red >= parseFloat(levels.rmin) &&
//       (levels.gmin && green >= parseFloat(levels.gmin)) &&
//       (levels.bmin && blue >= parseFloat(levels.bmin)) &&
//       (levels.rmax && red <= parseFloat(levels.rmax)) &&
//       (levels.gmax && green <= parseFloat(levels.gmax)) &&
//       (levels.bmax && blue <= parseFloat(levels.bmax))
//     ) {
//       // take it out!
//       pixels.data[i + 3] = 0;
//     }
//   }
//   return pixels;
// }
// Let's invoke our function on page load
// getVideo();
getVideoAsync();
// Listen for the 'canplay' event on video to then
// invoke paintToCanvas()
video.addEventListener("canplay", paintToCanvas);
