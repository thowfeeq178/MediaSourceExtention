# MediaSourceExtention
A sample MSE Player - JAVASCRIPT


Media Source API
The Media Source API,formally known as Media Source Extensions (MSE), provides functionality enabling plugin-free web-based streaming media. Using MSE, media streams can be created via JavaScript, and played using <audio> and <video> elements.

ref: https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API


---------------------------------------------------------------------------------------------------

DASH:

Dynamic Adaptive Streaming over HTTP (DASH) is a protocol for specifying how adaptive content should be fetched. It is effectively a layer built on top of MSE for building adaptive bitrate streaming clients. While there are other protocols available (such as HTTP Live Streaming (HLS)), DASH has the most platform support.

DASH moves lots of logic out of the network protocol and into the client side application logic, using the simpler HTTP protocol to fetch files. Indeed, one can support DASH with a simple static file server, which is also great for CDNs. This is in direct contrast with previous streaming solutions that required expensive licenses for proprietary non-standard client/server protocol implementations.

The two most common use cases for DASH involve watching content "on demand" or "live." On demand allows a developer to take their time transcoding the assets into multiple resolutions of various quality.




------------------------------------------------------------------

SourceBuffer:

The SourceBuffer interface represents a chunk of media to be passed into an HTMLMediaElement and played, via a MediaSource object. This can be made up of one or several media segments.

EventTarget
SourceBuffer
Instance properties
SourceBuffer.appendWindowEnd
Controls the timestamp for the end of the append window.

SourceBuffer.appendWindowStart
Controls the timestamp for the start of the append window. This is a timestamp range that can be used to filter what media data is appended to the SourceBuffer. Coded media frames with timestamps within this range will be appended, whereas those outside the range will be filtered out.

SourceBuffer.audioTracks Read only
A list of the audio tracks currently contained inside the SourceBuffer.

SourceBuffer.buffered Read only
Returns the time ranges that are currently buffered in the SourceBuffer.

SourceBuffer.mode
Controls how the order of media segments in the SourceBuffer is handled, in terms of whether they can be appended in any order, or they have to be kept in a strict sequence.

SourceBuffer.textTracks Read only Experimental
A list of the text tracks currently contained inside the SourceBuffer.

SourceBuffer.timestampOffset
Controls the offset applied to timestamps inside media segments that are subsequently appended to the SourceBuffer.

SourceBuffer.updating Read only
A boolean indicating whether the SourceBuffer is currently being updated — i.e. whether an SourceBuffer.appendBuffer() or SourceBuffer.remove() operation is currently in progress.

SourceBuffer.videoTracks Read only
A list of the video tracks currently contained inside the SourceBuffer.



Instance methods
Inherits methods from its parent interface, EventTarget.

SourceBuffer.abort()
Aborts the current segment and resets the segment parser.

SourceBuffer.appendBuffer()
Appends media segment data from an ArrayBuffer, a TypedArray or a DataView object to the SourceBuffer.

SourceBuffer.appendBufferAsync() Non-standard Experimental
Starts the process of asynchronously appending the specified buffer to the SourceBuffer. Returns a Promise which is fulfilled once the buffer has been appended.

SourceBuffer.changeType()
Changes the MIME type that future calls to appendBuffer() will expect the new data to conform to.

SourceBuffer.remove()
Removes media segments within a specific time range from the SourceBuffer.

SourceBuffer.removeAsync() Non-standard Experimental
Starts the process of asynchronously removing media segments in the specified range from the SourceBuffer. Returns a Promise which is fulfilled once all matching segments have been removed.

ref: https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer
