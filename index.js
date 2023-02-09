// BBB : https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd

var baseUrl = "https://dash.akamaized.net/akamai/bbb_30fps/";
var initUrl = baseUrl + "bbb_30fps_480x270_600k/bbb_30fps_480x270_600k_0.m4v";

var initAudioUrl = baseUrl + "bbb_a64k/bbb_a64k_0.m4a";

var templateUrl =
  baseUrl + "bbb_30fps_480x270_600k/bbb_30fps_480x270_600k_$Number$.m4v";
var templateUrlForAudio = baseUrl + "bbb_a64k/bbb_a64k_$Number$.m4a";
var sourceBuffer;
var index = 0;
var audioIndex = 0;
var numberOfChunks = 159;
var video = document.querySelector("video");
var ms = new MediaSource();

function onPageLoad() {
  console.log("page loaded ..");
  if (!window.MediaSource) {
    console.error("No Media Source API available");
    return;
  }
  // making source controlled by JS using MS
  video.src = window.URL.createObjectURL(ms);
  ms.addEventListener("sourceopen", onMediaSourceOpen);
}

function onMediaSourceOpen() {
  // create source buffer
  sourceBuffer = ms.addSourceBuffer('video/mp4; codecs="avc1.4d401f"');
  audioSourceBuffer = ms.addSourceBuffer('audio/mp4; codecs="mp4a.40.5"');
  // when ever one segment is loaded go for next
  sourceBuffer.addEventListener("updateend", nextSegment);
  audioSourceBuffer.addEventListener("updateend", nextAudioSegment);
  // fire init segemnts
  GET(initUrl, appendToBuffer);
  GET(initAudioUrl, appendToAudioBuffer);

  // play
  video.play();
}

// get next segment based on index and append, once everything loaded unlisten to the event
function nextSegment() {
  var url = templateUrl.replace("$Number$", index);
  GET(url, appendToBuffer);
  index++;
  if (index > numberOfChunks) {
    sourceBuffer.removeEventListener("updateend", nextSegment);
  }
}

// get next audio segment based on index and append, once everything loaded unlisten to the event
function nextAudioSegment() {
  var audioUrl = templateUrlForAudio.replace("$Number$", audioIndex);
  GET(audioUrl, appendToAudioBuffer);
  audioIndex++;
  if (index > numberOfChunks) {
    audioSourceBuffer.removeEventListener("updateend", nextAudioSegment);
  }
}

// add to existing source
function appendToBuffer(videoChunk) {
  if (videoChunk) {
    sourceBuffer.appendBuffer(new Uint8Array(videoChunk));
  }
}

function appendToAudioBuffer(audioChunk) {
  if (audioChunk) {
    audioSourceBuffer.appendBuffer(new Uint8Array(audioChunk));
  }
}

// just network thing
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
