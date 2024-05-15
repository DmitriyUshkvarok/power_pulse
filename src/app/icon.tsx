import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 52,
  height: 52,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 26,
          background: 'linear-gradient(to bottom, #434343, #000000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e6533c',
          borderRadius: '50%',
        }}
      >
        PP
      </div>
    ),
    {
      ...size,
    }
  );
}
