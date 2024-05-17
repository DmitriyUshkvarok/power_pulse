import { render, screen } from '@testing-library/react';
import DataUserBanner from '../DataUserBanner/DataUserBanner';

describe('DataUserBanner component', () => {
  it('renders video tutorial banner with correct content', () => {
    render(<DataUserBanner />);

    const videoBanner = screen.getByText('350+');
    const videoDescription = screen.getByText('Video tutorial');
    const videoIcon = screen.getByTestId('header-logo');

    expect(videoBanner).toBeInTheDocument();
    expect(videoDescription).toBeInTheDocument();
    expect(videoIcon).toBeInTheDocument();
    expect(videoBanner).toHaveClass('video_tutorial_title');
    expect(videoDescription).toHaveClass('video_description');
  });

  it('renders cal banner with correct content', () => {
    render(<DataUserBanner />);

    const calBanner = screen.getByText('500');
    const calDescription = screen.getByText('cal');
    const calIcon = screen.getByTestId('header-logo-cal');

    expect(calBanner).toBeInTheDocument();
    expect(calDescription).toBeInTheDocument();
    expect(calIcon).toBeInTheDocument();
    expect(calBanner).toHaveClass('cal_banner_title');
    expect(calDescription).toHaveClass('cal_banner_description');
  });

  it('applies correct CSS classes to video tutorial banner elements', () => {
    render(<DataUserBanner />);

    const videoBannerBlock = screen.getByTestId('video-banner-block');
    expect(videoBannerBlock).toBeInTheDocument();
  });

  it('applies correct CSS classes to cal banner elements', () => {
    render(<DataUserBanner />);

    const calBannerBlock = screen.getByTestId('call-banner-block');
    expect(calBannerBlock).toBeInTheDocument();
  });
});
