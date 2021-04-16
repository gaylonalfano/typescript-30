const video = document.querySelector(".player") as HTMLVideoElement;
const canvas = document.querySelector(".photo") as HTMLCanvasElement;
// NOTE You draw on context, not directly on canvas
const canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;
// Where we'll dump all of our images onto the strip
const strip = document.querySelector(".strip") as HTMLDivElement;
// Audio for camera shutter sound
const snap = document.querySelector(".snap") as HTMLAudioElement;

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
async function getVideoAsync() {
  let stream: MediaStream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    //  DEPRECIATION :
    //       The following has been depreceated by major browsers as of Chrome and Firefox.
    //       video.src = window.URL.createObjectURL(localMediaStream);
    //       Please refer to these:
    //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

    video.srcObject = stream as MediaProvider;
    // Now that we've converted stream to URL, let's play the video
    video.play();
  } catch (error) {
    console.log("I'm gonna need your webcam for this...", error);
  }
}

// Let's take a frame from video and paint to canvasCtx
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // console.log(width, height); // 1200 720
  // Set the canvas to be the same dimensions
  canvas.width = width;
  canvas.height = height;

  // Let's take a snapshot every interval and draw
  // using dx, dy, dw, dh
  // NOTE It's best to return this interval so you can clearInterval()
  // NOTE Need to run this inside browser console to show!
  // UPDATE Unless you listen for 'canplay' event!
  return setInterval(() => {
    canvasCtx.drawImage(video, 0, 0, width, height);
    // Let's add ability to add color filters by extracting pixels
    let pixels: ImageData = canvasCtx.getImageData(0, 0, width, height);
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
  const data: string = canvas.toDataURL("image/jpeg");
  console.log(data);
  const link = document.createElement("a");
  link.href = data;
  // NOTE The 'value' arg is the filename to be saved!
  link.setAttribute("download", "handsome");
  // link.textContent = "Download image";
  link.innerHTML = `<img src="${data}" alt="Handsome man">`;
  // Place most recent photo at beginning by preprending link inside strip div
  strip.insertBefore(link, strip.firstChild);
}

// Various Effects and Filters
function redEffect(pixels: ImageData) {
  // Loop over all pixels and modify
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100; // r
    pixels.data[i + 1] -= 50; // g
    pixels.data[i + 2] *= 0.5; // b
    // pixels.data[i+3] // alpha
  }
  return pixels;
}

function rgbSplit(pixels: ImageData) {
  // Loop over all pixels and modify
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // r
    pixels.data[i + 500] = pixels.data[i + 1]; // g
    pixels.data[i - 550] = pixels.data[i + 2]; // b
  }
  return pixels;
}

interface Level {
  rmin: string;
  rmax: string;
  gmin: string;
  gmax: string;
  bmin: string;
  bmax: string;
}

function greenScreen(pixels: ImageData) {
  // NOTE Green Screen works by having a range of color values
  // where, if within the range, you take them out (levels)
  // const levels = {};
  const levels = new Map();

  // Hook up our controls inputs sliders and store in levels object
  // Q: Would a Map be better for this?
  document.querySelectorAll(".rgb input").forEach((input: HTMLInputElement) => {
    levels.set(input.name, input.value);
    // levels[input.name] = input.value;
  });
  // console.log(levels);

  // Loop through all pixels
  for (let i = 0; i < pixels.data.length; i += 4) {
    let red = pixels.data[i + 0];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];
    let alpha = pixels.data[i + 3];

    // Remove the pixel if within range (make transparent using alpha = 0)
    if (
      red >= levels.get("rmin") &&
      green >= levels.get("gmin") &&
      blue >= levels.get("bmin") &&
      red <= levels.get("rmax") &&
      green <= levels.get("gmax") &&
      blue <= levels.get("bmax")
    ) {
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
