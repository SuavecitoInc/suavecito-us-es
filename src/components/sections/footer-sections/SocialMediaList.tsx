import {
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconTiktok,
  IconYoutube,
} from '~/components';
import {BrandTheme} from '~/types/suavecito';

export function SocialMediaList({theme}: {theme?: BrandTheme}) {
  const mainColor = theme === 'suavecita' ? 'suavecita' : 'suavecito';
  return (
    <>
      <ul className="flex justify-between items-center pt-[7px]">
        <li>
          <a
            href="https://www.instagram.com/suavecitopomade/"
            target="_blank"
            rel="noreferrer"
            aria-describedby="a11y-external-message"
          >
            <IconInstagram
              height="w-[40px]"
              width="w-[40px]"
              theme={mainColor}
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/SuavecitoPomade/"
            target="_blank"
            rel="noreferrer"
            aria-describedby="a11y-external-message"
          >
            <IconFacebook
              height="w-[40px]"
              width="w-[40px]"
              theme={mainColor}
            />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/suavecitopomade"
            target="_blank"
            rel="noreferrer"
            aria-describedby="a11y-external-message"
          >
            <IconTwitter height="w-[40px]" width="w-[40px]" theme={mainColor} />
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/suavecitopomade"
            target="_blank"
            rel="noreferrer"
            aria-describedby="a11y-external-message"
          >
            <IconYoutube height="w-[40px]" width="w-[40px]" theme={mainColor} />
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@suavecitopomade"
            target="_blank"
            rel="noreferrer"
            aria-describedby="a11y-external-message"
          >
            <IconTiktok height="w-[40px]" width="w-[40px]" theme={mainColor} />
          </a>
        </li>
      </ul>
    </>
  );
}
