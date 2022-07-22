import {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';
import YouTube, {YouTubeProps} from 'react-youtube';

interface Metafield {
  value: string;
  reference?: object;
}

export function FeaturedVideo({
  coverImage,
  youtubeVideoId,
  loading,
}: {
  coverImage: Metafield;
  youtubeVideoId: Metafield;
  loading?: 'eager' | 'lazy';
}) {
  const [play, setPlay] = useState<boolean>(false);

  const handleClick = () => {
    setPlay((play) => !play);
  };

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const renderContent = () => {
    if (!play) {
      return (
        <>
          <SpreadMedia
            scale={2}
            sizes={
              coverImage?.reference
                ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
            }
            widths={coverImage?.reference ? [500, 450, 700] : [500, 900, 1400]}
            width={coverImage?.reference ? 375 : 750}
            data={coverImage.reference as Media}
            loading={loading}
          />
          <div
            className="play cursor-pointer text-center w-[50px] h-[50px] rounded-[25px] mx-auto my-0 p-[5px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-suave-red hover:bg-suave-red-focus"
            onClick={handleClick}
            aria-hidden="true"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              className="icon icon-play w-[20px] h-[20px] fill-white"
              viewBox="0 0 20 40"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.6 16.8L7 1.5C5.6.3 4 .2 2.9.7 1.6 1.4.8 2.7.7 3.8v31.7c0 1.8 1.1 3.3 3.1 3.3 1.5 0 2.5-.5 3.4-1.4l16.4-15.7c1.5-1.4 1.5-3.6 0-4.9z"
              ></path>
            </svg>
          </div>
        </>
      );
    } else {
      return (
        <div className="youtube-video relative">
          <YouTube
            videoId={
              youtubeVideoId.value ? youtubeVideoId.value : 'hFLTrGcAx9c'
            }
            iframeClassName="featured-video-iframe"
            opts={opts}
          />
        </div>
      );
    }
  };

  return (
    <section className="featured-video page-width relative flex flex-col w-full">
      {coverImage?.reference && (
        <div className="video-wrapper relative">{renderContent()}</div>
      )}
    </section>
  );
}

interface coverImageMediaProps {
  data: Media;
  loading?: HTMLImageElement['loading'];
  scale?: 2 | 3;
  sizes: string;
  width: number;
  widths: number[];
}

function SpreadMedia({
  data,
  loading,
  scale,
  sizes,
  width,
  widths,
}: coverImageMediaProps) {
  return (
    <Image
      widths={widths}
      sizes={sizes}
      alt={data.alt || 'Marketing Banner Image'}
      className="block object-cover w-full h-full"
      // @ts-ignore
      data={data.image}
      loading={loading}
      width={width}
      loaderOptions={{scale, crop: 'center'}}
    />
  );
}
