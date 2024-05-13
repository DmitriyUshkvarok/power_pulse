'use client';
import ReactPlayer from 'react-player';
import { useAppSelector } from '@/src/hooks/redux-hook';

const VideoPlayer = () => {
  const exerciseDiaryValue = useAppSelector((state) => state.exercisesDiary);
  return (
    <>
      <ReactPlayer
        url={exerciseDiaryValue.video}
        width={270}
        height={226}
        controls={true}
        pip={true}
        data-testid="video-player"
      />
      <source src={exerciseDiaryValue.video} type="video/mp4" />
    </>
  );
};

export default VideoPlayer;
