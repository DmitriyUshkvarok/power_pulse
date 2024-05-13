import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

jest.mock('../../../hooks/redux-hook.ts', () => ({
  useAppSelector: jest.fn(),
}));

describe('VideoPlayer', () => {
  beforeEach(() => {
    jest
      .spyOn(require('../../../hooks/redux-hook'), 'useAppSelector')
      .mockReturnValue({
        video: 'https://example.com/video.mp4',
      });
  });

  it('renders without crashing', () => {
    render(<VideoPlayer />);
    const videoElement = screen.getByTestId('video-player');
    expect(videoElement).toBeInTheDocument();
  });
});
