console.log("hello");

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();
let videoRef = null;

init();

async function init() {
  await load();
  await transcode();
  appendVideo();
}

async function load() {
  console.log("loading:");

  // const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
  const baseURL = "./ffmpeg-core";

  ffmpeg.on("log", ({ message }) => {
    console.log(message);
  });

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  console.log("ahoy, it's loaded: ", ffmpeg);
}

async function transcode() {
  await ffmpeg.writeFile(
    "input.webm",
    await fetchFile(
      "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm",
    ),
  );
  await ffmpeg.exec(["-i", "input.webm", "output.mp4"]);
  const data = await ffmpeg.readFile("output.mp4");

  videoRef = URL.createObjectURL(
    new Blob([data.buffer], { type: "video/mp4" }),
  );
  console.log("videoRef: ", videoRef);
}

function appendVideo() {
  var videoElement = document.createElement("video");

  // Set the attributes for the video element
  videoElement.setAttribute("width", "640");
  videoElement.setAttribute("height", "360");
  videoElement.setAttribute("controls", "true"); // Add controls like play/pause

  // Create a source element
  var sourceElement = document.createElement("source");

  // Set the source URL and type
  sourceElement.setAttribute("src", videoRef);
  sourceElement.setAttribute("type", "video/mp4");

  // Append the source element to the video element
  videoElement.appendChild(sourceElement);

  // Append the video element to a container in the DOM
  var container = document.getElementById("video-container");
  container.appendChild(videoElement);
}
