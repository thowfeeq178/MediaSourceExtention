// BBB
var baseUrl = "https://dash.akamaized.net/akamai/bbb_30fps/";
var initUrl = baseUrl + "bbb_30fps_480x270_600k/bbb_30fps_480x270_600k_0.m4v";
var templateUrl =
  baseUrl + "bbb_30fps_480x270_600k/bbb_30fps_480x270_600k_$Number$.m4v";
var templateUrlForAudio = baseUrl + "bbb_a64k/bbb_a64k_$Number$.m4a";
var sourceBuffer;
var index = 0;
var numberOfChunks = 159;
var video = document.querySelector("video");
var ms = new MediaSource();

function onPageLoad() {
  console.log("page loaded ..");
  if (!window.MediaSource) {
    console.error("No Media Source API available");
    return;
  }

  video.src = window.URL.createObjectURL(ms);
  ms.addEventListener("sourceopen", onMediaSourceOpen);
}

function onMediaSourceOpen() {
  sourceBuffer = ms.addSourceBuffer('video/mp4; codecs="avc1.4d401f"');
  sourceBuffer.addEventListener("updateend", nextSegment);
  GET(initUrl, appendToBuffer);
  video.play();
}

function nextSegment() {
  var url = templateUrl.replace("$Number$", index);
  GET(url, appendToBuffer);
  var audioUrl = templateUrlForAudio.replace("$Number$", index);
  GET(audioUrl, appendToBuffer);
  index++;
  if (index > numberOfChunks) {
    sourceBuffer.removeEventListener("updateend", nextSegment);
  }
}

function appendToBuffer(videoChunk) {
  if (videoChunk) {
    sourceBuffer.appendBuffer(new Uint8Array(videoChunk));
  }
}

function GET(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "arraybuffer";

  xhr.onload = function (e) {
    if (xhr.status != 200) {
      console.warn("Unexpected status code " + xhr.status + " for " + url);
      return false;
    }
    callback(xhr.response);
  };

  xhr.send();
}
