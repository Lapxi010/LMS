export interface IVideoPlayer {
    videoSource: string;
}

export interface IVideoElement extends HTMLVideoElement {
    msRequestFullscreen?: () => void
    mozRequestFullScreen?: () => void
    webkitRequestFullscreen?: () => void
}
