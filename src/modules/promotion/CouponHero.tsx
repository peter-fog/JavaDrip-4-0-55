import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { registerUniformComponent, ComponentProps, UniformText } from '@uniformdev/canvas-react';
import {
  getTextClass,
  getImageOverlayOpacityStyle,
  getImageOverlayColorStyle,
  getObjectFitClass,
} from '../../utilities/styling';
import { getImageUrl } from '../../utilities';

export type Props = ComponentProps<{
  title: string;
  titleStyle: Types.HeadingStyles;
  couponCode: string;
  description: string;
  icon?: string;
  image?: string;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
}>;

export enum CouponHeroVariant {
  BackgroundLightImage = 'backgroundLightImage',
  BackgroundDarkImage = 'backgroundDarkImage',
}

const getTextStyleClass = (variantId: string | undefined) => {
  switch (variantId) {
    case CouponHeroVariant.BackgroundLightImage:
      return 'text-secondary-content';
    case CouponHeroVariant.BackgroundDarkImage:
      return 'text-primary-content';
    default:
      return 'text-secondary-content';
  }
};

const CouponHero: FC<Props> = ({
  titleStyle: TitleTag = 'h1',
  icon,
  image,
  component: { variant } = {},
  overlayOpacity,
  overlayColor,
  objectFit,
}) => {
  const iconUrl = getImageUrl(icon);
  const imageUrl = getImageUrl(image);

  return (
    <div className={classNames('hero min-h-[500px] relative !max-w-none', getTextStyleClass(variant))}>
      <div className={classNames('hero-content text-center p-0')}>
        {Boolean(imageUrl) && (
          <>
            <Image
              fill
              alt="hero-image"
              src={imageUrl}
              priority
              className={classNames('absolute top-0 bottom-0 left-0 right-0 -z-10', getObjectFitClass(objectFit))}
            />
            <div
              className={classNames(
                'absolute top-0 bottom-0 left-0 right-0 z-10',
                getImageOverlayOpacityStyle(overlayOpacity),
                getImageOverlayColorStyle(overlayColor)
              )}
            ></div>
          </>
        )}
        <div className={classNames('relative flex flex-col mx-1 md:mx-10 z-20 max-w-lg')}>
          <UniformText
            placeholder="Title goes here"
            parameterId="title"
            as={TitleTag}
            className={classNames('font-bold', getTextClass(TitleTag))}
            data-testid="hero-title"
          />
          <UniformText placeholder="Description goes here" parameterId="description" as="div" className="py-6" />
          <div className="text-lg">
            <span className="pr-2 uppercase font-bold">Coupon code:</span>
            <UniformText placeholder="####-####" parameterId="couponCode" as="span" className="font-mono" />
          </div>
          {iconUrl && (
            <div className="absolute top-0 right-0 translate-x-20 -translate-y-1/3">
              <Image alt="promotion-icon" src={iconUrl} width="100" height="100" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

[undefined, CouponHeroVariant.BackgroundLightImage, CouponHeroVariant.BackgroundDarkImage].forEach(variantId => {
  registerUniformComponent({
    type: 'couponHero',
    component: CouponHero,
    variantId,
  });
});

export default CouponHero;
