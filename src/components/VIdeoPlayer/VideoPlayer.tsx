import React, { FC } from 'react';
import styles from './VideoPlayer.module.sass';
import { useVideo } from './useVideo';
import { IVideoPlayer } from './Video.types';
import ArrowRight from './ArrowRight.svg';
import Full from './Fullscreen.svg';
import Pause from './Pause.svg';
import UpdateBack from './UpdateBack.svg';
import UpdateForword from './UpdateForword.svg';

const VideoPlayer: FC<IVideoPlayer> = ({ videoSource,}) => {
	const { actions, videoRef, video } = useVideo();

	return (
		<div className={styles.wrapper}>
			<>
				<video
					ref={videoRef}
					className={styles.video}
					src={`${videoSource}#t=8`}
					preload="metadata"
				/>

				<div className={styles.progressBarContainer}>
					<div
						style={{ width: `${video.progress}%` }}
						className={styles.progressBar}
					/>
				</div>

				<div className={styles.controls}>
					<div>
						<button onClick={actions.revert}>
							<img src={UpdateBack} alt={'da'} />
						</button>

						<button
							onClick={actions.toggleVideo}
							className={styles.playButton}
						>
							{video.isPlaying ? (<img src={Pause}/>) : (<img src={ArrowRight} alt="da"/>)}
						</button>

						<button onClick={actions.fastForward}>
							<img src={UpdateForword} alt={'da'}/>
						</button>

						<div className={styles.timeControls}>
							<p className={styles.controlsTime}>
								{Math.floor(video.currentTime / 60) +
                                        ':' +
                                        ('0' + Math.floor(video.currentTime % 60)).slice(-2)}
							</p>
							<p> / </p>
							<p className={styles.controlsTime}>
								{Math.floor(video.videoTime / 60) +
                                        ':' +
                                        ('0' + Math.floor(video.videoTime % 60)).slice(-2)}
							</p>
						</div>
					</div>

					<div>
						<button onClick={actions.fullScreen}>
							<img src={Full} alt={'da'}/>
						</button>
					</div>
				</div>
			</>
		</div>
	);
};
export default VideoPlayer;
