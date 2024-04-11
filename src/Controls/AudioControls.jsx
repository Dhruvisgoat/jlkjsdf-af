import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import '../styles.scss';
import { useRef } from 'react';

const playlist = [
  { src: 'audio/swing.mp3' },
  { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
];

const AudioControls = () => {
  const audioPlayerRef = useRef();
  const [currentTrack, setTrackIndex] = useState(0);

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handlePlay = () => {
    // audioPlayerRef.current.blur();
  }

  return (
    <div className="container" style={{ width: '100%', position: 'absolute', bottom: '0%', zIndex: '2',border:'none' }} >
      <AudioPlayer
        // ref={audioPlayerRef}
        volume={0.15}
        autoPlay
        src={playlist[currentTrack].src}
        showSkipControls
        showJumpControls={false}
        onClickNext={handleClickNext}
        onPlay={handlePlay}
        onPause={handlePlay}
        onEnded={handleEnd}
        onError={() => console.log('play error')}
        layout="horizontal"
        customVolumeControls={[]}
        customAdditionalControls={[]} 

      // Add other props as needed
      />

    </div>
  );
};

export default AudioControls;
