import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-react';
import Image from 'next/image';
import classNames from 'classnames';
import Button from '../components/Button';
import { formatProjectMapLink, getImageUrl } from '../utilities';
import { getImageOverlayColorStyle, getImageOverlayOpacityStyle, getObjectFitClass } from '../utilities/styling';
import { useComponentStarterKitContext } from '../context/ComponentStarterKitContext';

const FeatureIcon = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="Vector 1" d="M1 7L4.84314 11L14 1" stroke="#F7DF1E" strokeWidth="2" />
  </svg>
);

export type Props = {
  eyebrowText: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  subTitle: string;
  description: string;
  highlightText: string;
  image?: string;
  primaryButtonCopy: string;
  primaryButtonStyle: Types.ButtonStyles;
  primaryButtonLink?: Types.ProjectMapLink;
  secondaryButtonCopy: string;
  secondaryButtonStyle: Types.ButtonStyles;
  secondaryButtonLink?: Types.ProjectMapLink;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
  features: string[];
  fullHeight?: boolean;
  useCustomTextElements?: boolean;
};

const ProductInfo: FC<Props> = ({
  titleStyle: TitleTag = 'h1',
  primaryButtonStyle = 'primary',
  secondaryButtonStyle = 'primary',
  primaryButtonLink,
  secondaryButtonLink,
  image,
  overlayColor,
  overlayOpacity,
  objectFit,
  onClickPrimaryButton,
  onClickSecondaryButton,
  features,
  fullHeight,
  useCustomTextElements,
  eyebrowText,
  title,
  description,
  highlightText,
  subTitle,
  secondaryButtonCopy,
  primaryButtonCopy,
}) => {
  const imageUrl = getImageUrl(image);
  const { secondaryFont, isJavaDrip } = useComponentStarterKitContext();

  return (
    <div
      className={classNames('hero relative w-full h-full flex justify-end !max-w-none', {
        'min-h-[700px]': !fullHeight,
        'min-h-[calc(100vh-64px)]': fullHeight,
      })}
    >
      {image && (
        <>
          <Image
            fill
            alt="hero-image"
            src={imageUrl}
            priority
            className={classNames(
              'absolute top-0 bottom-0 left-0 right-0 z-10',
              getObjectFitClass(objectFit || 'cover')
            )}
          />
          <div
            className={classNames(
              'absolute top-0 bottom-0 left-0 right-0 z-10',
              getImageOverlayOpacityStyle(overlayOpacity),
              getImageOverlayColorStyle(overlayColor)
            )}
          />
        </>
      )}
      <div className={classNames('flex w-1/2 flex-col mx-1 md:mx-10 z-20 text-primary-content')}>
        {useCustomTextElements ? (
          <p
            className={classNames(
              'uppercase text-lg mb-5',
              secondaryFont?.className,
              isJavaDrip ? 'tracking-[5.5px]' : ''
            )}
          >
            {eyebrowText}
          </p>
        ) : (
          <UniformText
            placeholder="Eyebrow goes here"
            parameterId="eyebrowText"
            as="p"
            className={classNames(
              'uppercase text-lg mb-5',
              secondaryFont?.className,
              isJavaDrip ? 'tracking-[5.5px]' : ''
            )}
          />
        )}
        {useCustomTextElements ? (
          <TitleTag className="text-secondary font-bold text-4xl mb-5">{title}</TitleTag>
        ) : (
          <UniformText
            placeholder="Title goes here"
            parameterId="title"
            as={TitleTag}
            className="text-secondary font-bold text-4xl mb-5"
          />
        )}
        {useCustomTextElements ? (
          <div className="text-xl font-light mb-5">{subTitle}</div>
        ) : (
          <UniformText placeholder="Subtitle goes here" parameterId="subTitle" className="text-xl font-light mb-5" />
        )}
        {useCustomTextElements ? (
          <div className={classNames('text-lg mb-5', secondaryFont?.className)}>{description}</div>
        ) : (
          <UniformText
            placeholder="Description goes here"
            parameterId="description"
            className={classNames('text-lg mb-5', secondaryFont?.className)}
          />
        )}
        {useCustomTextElements ? (
          <div>{highlightText}</div>
        ) : (
          <UniformText placeholder="Highlight Text goes here" parameterId="highlightText" />
        )}
        <div className="w-1/3 py-10">
          <Button
            className="w-full"
            href={formatProjectMapLink(primaryButtonLink)}
            onClick={onClickPrimaryButton}
            copy={
              useCustomTextElements ? (
                <div>{primaryButtonCopy}</div>
              ) : (
                <UniformText placeholder="Button Copy goes here" parameterId="primaryButtonCopy" />
              )
            }
            style={primaryButtonStyle}
          />
          <Button
            href={formatProjectMapLink(secondaryButtonLink)}
            onClick={onClickSecondaryButton}
            className="w-full mt-5 border-secondary"
            copy={
              useCustomTextElements ? (
                <div>{secondaryButtonCopy}</div>
              ) : (
                <UniformText placeholder="Button Copy goes here" parameterId="secondaryButtonCopy" />
              )
            }
            style={secondaryButtonStyle}
          />
        </div>

        <div className="flex justify-between w-3/4">
          {(features || []).map(feature => (
            <div className="flex items-center" key={feature}>
              <FeatureIcon />
              <p className="ml-2">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
