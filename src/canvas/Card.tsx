import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  ComponentProps,
  registerUniformComponent,
  UniformText,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import Button from '../components/Button';
import { formatProjectMapLink, getImageUrl } from '../utilities';
import {
  getImageOverlayColorStyle,
  getImageOverlayOpacityStyle,
  getLineClampClass,
  getObjectFitClass,
} from '../utilities/styling';
import { useComponentStarterKitContext } from '../context/ComponentStarterKitContext';

export type Props = ComponentProps<{
  image: string | Types.CloudinaryImage;
  badge?: string;
  badgeStyle?: Types.BadgeStyles;
  badgeSize?: Types.BadgeSize;
  title: string;
  description: string;
  buttonCopy?: string;
  buttonLink?: Types.ProjectMapLink;
  buttonStyle: Types.ButtonStyles;
  lineCountRestriction: Types.AvailableMaxLineCount;
  useCustomTextElements?: boolean;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
  textColor?: Types.AvailableTextColor;
}>;

export enum CardVariants {
  BackgroundImage = 'backgroundImage',
  Featured = 'featured',
}

const getContentClass = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.BackgroundImage:
      return 'image-full';
    default:
      return '';
  }
};

const getTextClass = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.Featured:
      return 'mb-4';
    default:
      return '';
  }
};

const getDescriptionClass = (variantId?: string) => {
  switch (variantId) {
    case CardVariants.Featured:
      return 'mt-4';
    default:
      return '';
  }
};

const getBadgeStyleClass = (badgeStyle: Props['badgeStyle']) => {
  switch (badgeStyle) {
    case 'outline':
      return 'badge-outline';
    case 'primary':
      return 'badge-primary text-primary-content';
    case 'secondary':
      return 'badge-secondary text-secondary-content';
    case 'accent':
      return 'badge-accent text-accent-content';
    default:
      return '';
  }
};

const getBadgeSizeClass = (badgeSize: Props['badgeSize']) => {
  switch (badgeSize) {
    case 'xs':
      return 'badge-xs';
    case 'sm':
      return 'badge-sm';
    case 'md':
      return 'badge-md';
    case 'lg':
      return 'badge-lg';
    default:
      return '';
  }
};

const getImageSizeClassName = (variantId: string | undefined, isJavaDrip?: boolean) => {
  switch (variantId) {
    case CardVariants.BackgroundImage:
      return 'h-full';
    case CardVariants.Featured:
      return 'h-[80px]';
    default:
      return isJavaDrip ? 'h-96' : 'h-48';
  }
};

const Card: FC<Props> = ({
  image,
  badge = '',
  badgeSize = 'md',
  badgeStyle = 'secondary',
  buttonLink,
  buttonStyle,
  title,
  buttonCopy,
  description,
  lineCountRestriction,
  useCustomTextElements,
  overlayOpacity,
  overlayColor,
  objectFit = 'cover',
  component: { variant } = {},
  textColor,
}) => {
  const imageUrl = getImageUrl(image);
  const { isJavaDrip, secondaryFont } = useComponentStarterKitContext();
  const { isContextualEditing } = useUniformCurrentComposition();

  const defaultTextColor = textColor ? textColor : isJavaDrip ? 'Light' : 'Dark';

  const badgeClassNames = classNames('badge', getBadgeStyleClass(badgeStyle), getBadgeSizeClass(badgeSize));

  const titleClassNames = classNames(
    'card-title',
    getTextClass(variant),
    defaultTextColor === 'Dark' ? 'text-secondary-content' : 'text-primary-content',
    isJavaDrip && variant === CardVariants.Featured ? 'text-secondary' : ''
  );

  const descriptionClassNames = classNames(
    getLineClampClass(lineCountRestriction),
    getDescriptionClass(variant),
    defaultTextColor === 'Dark' ? 'text-secondary-content' : 'text-primary-content',
    secondaryFont?.className
  );

  const isBackgroundImage = variant === CardVariants.BackgroundImage;

  return (
    <div
      className={classNames(
        'card w-96 max-w-full min-h-full mx-0 md:mx-2 border border-gray-200',
        getContentClass(variant),
        {
          relative: isBackgroundImage,
          '!border-0 !rounded-none': variant === CardVariants.Featured || isJavaDrip,
        }
      )}
    >
      <figure
        className={classNames({
          relative: !isBackgroundImage,
          'flex !justify-start p-8': variant === CardVariants.Featured,
        })}
      >
        {Boolean(imageUrl) && (
          <Image
            alt="image"
            src={imageUrl}
            width={variant === CardVariants.Featured ? 80 : 384}
            height={variant === CardVariants.Featured ? 80 : 384}
            className={classNames(getObjectFitClass(objectFit || 'cover'), getImageSizeClassName(variant, isJavaDrip))}
          />
        )}
        <div
          className={classNames(
            'absolute top-0 left-0 right-0 bottom-0 rounded-xl',
            getImageOverlayOpacityStyle(overlayOpacity),
            getImageOverlayColorStyle(overlayColor)
          )}
        />
      </figure>
      <div
        className={classNames('card-body', {
          'px-2': variant === CardVariants.Featured,
          'bg-gradient-to-t from-[#000] from-[0%] to-[#55493B] to-[150.76%]':
            isJavaDrip && !variant && textColor !== 'Dark',
          'px-0': isJavaDrip && !variant && textColor !== 'Light',
        })}
      >
        {useCustomTextElements ? (
          <div className={badgeClassNames}>{badge}</div>
        ) : (
          <UniformText placeholder="Badge goes here" parameterId="badge" as="div" className={badgeClassNames} />
        )}
        {useCustomTextElements ? (
          <h2 className={titleClassNames}>{title}</h2>
        ) : (
          <UniformText placeholder="Title goes here" parameterId="title" as="h2" className={titleClassNames} />
        )}
        {useCustomTextElements ? (
          <div className={descriptionClassNames} dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <UniformText
            placeholder="Description goes here"
            parameterId="description"
            className={descriptionClassNames}
            render={(value = '') => <div dangerouslySetInnerHTML={{ __html: value }} />}
          />
        )}

        <div className="card-actions justify-end mt-auto">
          {buttonLink && (
            <Button
              href={formatProjectMapLink(buttonLink)}
              style={buttonStyle}
              copy={
                useCustomTextElements ? (
                  <div onClick={isContextualEditing ? e => e.preventDefault() : undefined}>{buttonCopy}</div>
                ) : (
                  <UniformText
                    placeholder="Button copy goes here"
                    parameterId="buttonCopy"
                    onClick={isContextualEditing ? e => e.preventDefault() : undefined}
                  />
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

[undefined, CardVariants.BackgroundImage, CardVariants.Featured].forEach(variantId => {
  registerUniformComponent({
    type: 'card',
    component: Card,
    variantId,
  });
});

export default Card;
