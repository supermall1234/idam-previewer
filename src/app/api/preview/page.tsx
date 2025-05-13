/*
 * App Router 기반 Next.js 샘플 - 각인 텍스트를 이미지로 렌더링 (Vercel Edge Function 활용)
 * public/images/product.png 위에 텍스트를 렌더링함
 */

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '300px',
          height: '300px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        {/* 배경 이미지 */}
        <img
          src="https://canobox.co.kr/data/model/brand_479.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
        {/* 텍스트 */}
        <span
          style={{
            color: 'black',
            zIndex: 10,
          }}
        >
          {text}
        </span>
      </div>
    ),
    {
      width: 300,
      height: 300,
    }
  );
}
