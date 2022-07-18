interface Metafield {
  value: string;
  reference?: object;
}

export interface ResponsiveBannerSectionData {
  heading: Metafield;
  byline: Metafield;
  cta: Metafield;
  handle: string;
  spread: {
    value: '';
    reference: {
      mediaContentType: 'IMAGE';
      alt: string;
      previewImage: {
        url: string;
      };
      id?: string;
      image: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  largeSpread: {
    value: '';
    reference: {
      mediaContentType: 'IMAGE';
      alt: string;
      previewImage: {
        url: string;
      };
      image: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  mediumSpread: {
    value: '';
    reference: {
      mediaContentType: 'IMAGE';
      alt: string;
      previewImage: {
        url: string;
      };
      image: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  smallSpread: {
    value: '';
    reference: {
      mediaContentType: 'IMAGE';
      alt: string;
      previewImage: {
        url: string;
      };
      image: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  height?: 'full';
  top?: boolean;
  loading: 'eager' | 'lazy';
  displayHeading?: boolean;
}

export interface FeaturedRowImageSectionData {
  heading: Metafield;
  subText: Metafield;
  cta: Metafield;
  ctaLink: string;
  featuredImage: {
    value: '';
    reference: {
      mediaContentType: 'IMAGE';
      alt: string;
      previewImage: {
        url: string;
      };
      id?: string;
      image: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  loading: 'eager' | 'lazy';
}

export interface FeaturedRowColumnsSectionData {
  one: FeaturedRowImageSectionData;
  two: FeaturedRowImageSectionData;
  three: FeaturedRowImageSectionData;
}

export interface BannerSectionData {
  heading: Metafield;
  byline: Metafield;
  cta: Metafield;
  ctaLink: string;
  spread: {
    value: '';
    reference: {
      mediaContentType: 'IMAGE';
      alt: string;
      previewImage: {
        url: string;
      };
      id?: string;
      image: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  height?: 'full';
  top: boolean;
  loading?: 'eager' | 'lazy';
  displayContent?: boolean;
  contentAlignment?:
    | 'top-left'
    | 'top-right'
    | 'center-center'
    | 'bottom-left'
    | 'bottom-right';
  textColor?: 'black' | 'white';
  buttonColor?:
    | 'primary'
    | 'secondary'
    | 'inline'
    | 'suavecito'
    | 'suavecita'
    | 'yellow'
    | 'grey'
    | 'primary-inverted';
  overlayOpacityStart?: number;
  overlayOpacityEnd?: number;
  sectionHeight?: 'x-small' | 'small' | 'medium' | 'large';
}
