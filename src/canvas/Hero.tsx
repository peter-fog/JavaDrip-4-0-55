import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  registerUniformComponent,
  ComponentProps,
  UniformText,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import { NextFont } from 'next/dist/compiled/@next/font';
import Button from '../components/Button';
import {
  getTextClass,
  getImageOverlayOpacityStyle,
  getImageOverlayColorStyle,
  getObjectFitClass,
} from '../utilities/styling';
import { formatProjectMapLink, getImageUrl } from '../utilities';
import { useComponentStarterKitContext } from '../context/ComponentStarterKitContext';

export type Props = ComponentProps<{
  eyebrowText: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  image?: string;
  video?: string;
  primaryButtonCopy: string;
  primaryButtonLink: Types.ProjectMapLink;
  primaryButtonStyle: Types.ButtonStyles;
  secondaryButtonCopy: string;
  secondaryButtonLink: Types.ProjectMapLink;
  secondaryButtonStyle: Types.ButtonStyles;
  overlayColor?: Types.AvailableColor;
  overlayOpacity?: Types.AvailableOpacity;
  objectFit?: Types.AvailableObjectFit;
  useCustomTextElements?: boolean;
  fullHeight?: boolean;
}>;

export enum HeroVariant {
  ImageLeft = 'imageLeft',
  ImageRight = 'imageRight',
  BackgroundLightImage = 'backgroundLightImage',
  BackgroundDarkImage = 'backgroundDarkImage',
  TwoColumns = 'twoColumns',
}

const HeroTitle: FC<Pick<Props, 'titleStyle' | 'useCustomTextElements' | 'title'> & { className?: string }> = ({
  titleStyle: TitleTag,
  useCustomTextElements,
  title,
  className,
}) =>
  useCustomTextElements ? (
    <TitleTag className={classNames('font-bold', getTextClass(TitleTag))}>{title}</TitleTag>
  ) : (
    <UniformText
      placeholder="Title goes here"
      parameterId="title"
      as={TitleTag}
      className={classNames('font-bold', getTextClass(TitleTag), className)}
      data-testid="hero-title"
    />
  );

const EyebrowText: FC<
  Pick<Props, 'component'> & { secondaryFont?: NextFont; className?: string; isJavaDrip?: boolean }
> = ({ secondaryFont, className, isJavaDrip }) => {
  const textClassNames = isJavaDrip ? 'text-xl text-secondary' : 'text-sm';
  return (
    <UniformText
      placeholder="Eyebrow text goes here"
      parameterId="eyebrowText"
      as="div"
      className={classNames(
        'font-bold tracking-wider uppercase my-3',
        textClassNames,
        secondaryFont?.className,
        className
      )}
    />
  );
};
const Description: FC<{ secondaryFont?: NextFont; className?: string; isJavaDrip?: boolean }> = ({
  secondaryFont,
  className,
  isJavaDrip,
}) => {
  const fontSizeClassNames = isJavaDrip ? 'text-xl' : '';
  return (
    <UniformText
      placeholder="Description goes here"
      parameterId="description"
      as="div"
      className={classNames('whitespace-break-spaces py-6', fontSizeClassNames, secondaryFont?.className, className)}
    />
  );
};

const DescriptionSeparator: FC = () => (
  <div className="w-full flex justify-center py-5">
    <div className="bg-secondary h-1 w-24" />
  </div>
);

const PrimaryButton: FC<Pick<Props, 'primaryButtonLink' | 'primaryButtonStyle'>> = ({
  primaryButtonLink,
  primaryButtonStyle,
}) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  return (
    <Button
      className="mx-1"
      href={formatProjectMapLink(primaryButtonLink)}
      copy={
        <UniformText
          placeholder="Button Copy goes here"
          parameterId="primaryButtonCopy"
          onClick={isContextualEditing ? e => e.preventDefault() : undefined}
        />
      }
      style={primaryButtonStyle}
    />
  );
};

const SecondaryButton: FC<Pick<Props, 'secondaryButtonLink' | 'secondaryButtonStyle'>> = ({
  secondaryButtonLink,
  secondaryButtonStyle,
}) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  return (
    <Button
      className="mx-1"
      href={formatProjectMapLink(secondaryButtonLink)}
      copy={
        <UniformText
          placeholder="Button Copy goes here"
          parameterId="secondaryButtonCopy"
          onClick={isContextualEditing ? e => e.preventDefault() : undefined}
        />
      }
      style={secondaryButtonStyle}
    />
  );
};

const BackgroundImage: FC<Pick<Props, 'image' | 'video' | 'objectFit' | 'overlayOpacity' | 'overlayColor'>> = ({
  image,
  video,
  objectFit,
  overlayColor,
  overlayOpacity,
}) => {
  const imageUrl = getImageUrl(image);
  const videoUrl = getImageUrl(video);

  if (!imageUrl && !videoUrl) return null;

  return (
    <>
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          src={videoUrl}
          className={classNames(
            'absolute h-full w-full top-0 bottom-0 left-0 right-0 -z-10',
            getObjectFitClass(objectFit)
          )}
        />
      ) : (
        <Image
          fill
          alt="hero-image"
          src={imageUrl}
          priority
          className={classNames('absolute top-0 bottom-0 left-0 right-0 -z-10', getObjectFitClass(objectFit))}
        />
      )}
      <div
        className={classNames(
          'absolute top-0 bottom-0 left-0 right-0 z-10',
          getImageOverlayOpacityStyle(overlayOpacity),
          getImageOverlayColorStyle(overlayColor)
        )}
      />
    </>
  );
};

const SideImage: FC<Pick<Props, 'image' | 'video' | 'objectFit' | 'overlayOpacity' | 'overlayColor'>> = ({
  image,
  video,
  objectFit,
  overlayColor,
  overlayOpacity,
}) => {
  const { isJavaDrip } = useComponentStarterKitContext();
  const imageUrl = getImageUrl(image);
  const videoUrl = getImageUrl(video);

  if (!imageUrl && !videoUrl) return null;

  return (
    <div className="relative shrink-0">
      {video ? (
        <video
          autoPlay
          muted
          loop
          width={isJavaDrip ? 400 : 500}
          height={isJavaDrip ? 300 : 500}
          src={videoUrl}
          className={classNames('rounded-lg md:h-[500px]', getObjectFitClass(objectFit), {
            '!rounded-none': isJavaDrip,
          })}
        />
      ) : (
        <Image
          width={isJavaDrip ? 700 : 500}
          height={isJavaDrip ? 500 : 500}
          alt="hero-image"
          src={imageUrl}
          className={classNames('rounded-lg md:h-[500px]', getObjectFitClass(objectFit), {
            '!rounded-none': isJavaDrip,
          })}
        />
      )}

      <div
        className={classNames(
          'absolute top-0 bottom-0 left-0 right-0 z-10',
          getImageOverlayOpacityStyle(overlayOpacity),
          getImageOverlayColorStyle(overlayColor)
        )}
      ></div>
    </div>
  );
};

const HeroContainer: FC<PropsWithChildren<{ fullHeight?: boolean; className?: string }>> = ({
  children,
  className,
  fullHeight,
}) => (
  <div
    className={classNames('hero relative !max-w-none', className, {
      'min-h-[500px]': !fullHeight,
      'min-h-[calc(100vh-64px)]': fullHeight,
    })}
  >
    {children}
  </div>
);

const HeroTwoColumns: FC<Props> = ({
  title,
  titleStyle = 'h1',
  image,
  video,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  component,
  overlayOpacity,
  overlayColor,
  objectFit,
  useCustomTextElements = false,
  fullHeight,
}) => {
  const { secondaryFont, isJavaDrip } = useComponentStarterKitContext();

  return (
    <HeroContainer fullHeight={fullHeight} className="text-primary-content">
      <div
        className={classNames('hero-content text-center p-0', {
          'h-full items-start pt-20': fullHeight,
        })}
      >
        <BackgroundImage
          image={image}
          video={video}
          objectFit={objectFit}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />

        <div className={classNames('flex flex-row mx-1 md:mx-10 z-20')}>
          <div className="grid grid-cols-2 gap-x-28">
            <div className="flex flex-col">
              <EyebrowText component={component} secondaryFont={secondaryFont} isJavaDrip={isJavaDrip} />
              <HeroTitle
                titleStyle={titleStyle}
                useCustomTextElements={useCustomTextElements}
                className="text-left"
                title={title}
              />
            </div>

            <div className="text-secondary flex flex-col items-start">
              <Description secondaryFont={secondaryFont} isJavaDrip={isJavaDrip} className="text-left !py-0" />
              <div className="py-6">
                {Boolean(primaryButtonLink) && (
                  <PrimaryButton primaryButtonLink={primaryButtonLink} primaryButtonStyle={primaryButtonStyle} />
                )}
                {Boolean(secondaryButtonLink) && (
                  <SecondaryButton
                    secondaryButtonLink={secondaryButtonLink}
                    secondaryButtonStyle={secondaryButtonStyle}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

const HeroSideImage: FC<Props> = ({
  title,
  titleStyle = 'h1',
  description,
  image,
  video,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  component,
  overlayOpacity,
  overlayColor,
  objectFit,
  useCustomTextElements = false,
  fullHeight,
}) => {
  const { secondaryFont, isJavaDrip } = useComponentStarterKitContext();
  const { variant } = component || {};

  const heroContentClass = variant === HeroVariant.ImageLeft ? 'flex-col lg:flex-row' : 'flex-col lg:flex-row-reverse';
  const contentAlignClass = variant === HeroVariant.ImageLeft ? 'text-start' : isJavaDrip ? 'text-end' : 'text-start';

  return (
    <HeroContainer fullHeight={fullHeight} className={isJavaDrip ? 'text-primary-content' : 'text-secondary-content'}>
      <div
        className={classNames('hero-content text-center p-0', heroContentClass, {
          'h-full items-start pt-20': fullHeight,
        })}
      >
        <SideImage
          video={video}
          image={image}
          objectFit={objectFit}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />

        <div className={classNames('flex flex-col mx-1 md:mx-10 z-20', contentAlignClass)}>
          <EyebrowText
            component={component}
            secondaryFont={secondaryFont}
            isJavaDrip={isJavaDrip}
            className={!isJavaDrip ? '!text-primary' : ''}
          />
          <HeroTitle
            className="py-2"
            titleStyle={titleStyle}
            useCustomTextElements={useCustomTextElements}
            title={title}
          />
          <Description
            secondaryFont={secondaryFont}
            isJavaDrip={isJavaDrip}
            className={isJavaDrip ? 'pt-14 pb-10' : 'py-10'}
          />

          <div className={classNames('pb-6', { 'py-6': !description })}>
            {Boolean(primaryButtonLink) && (
              <PrimaryButton primaryButtonLink={primaryButtonLink} primaryButtonStyle={primaryButtonStyle} />
            )}
            {Boolean(secondaryButtonLink) && (
              <SecondaryButton secondaryButtonLink={secondaryButtonLink} secondaryButtonStyle={secondaryButtonStyle} />
            )}
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

const HeroBackgroundImage: FC<Props> = ({
  title,
  titleStyle = 'h1',
  description,
  image,
  video,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  component,
  overlayOpacity,
  overlayColor,
  objectFit,
  useCustomTextElements = false,
  fullHeight,
}) => {
  const { secondaryFont, isJavaDrip } = useComponentStarterKitContext();
  const { variant } = component || {};
  const baseTextStyle =
    variant === HeroVariant.BackgroundLightImage ? 'text-secondary-content' : 'text-primary-content';

  return (
    <HeroContainer fullHeight={fullHeight} className={baseTextStyle}>
      <div
        className={classNames('hero-content text-center p-0', {
          'h-full items-start pt-20': fullHeight,
        })}
      >
        <BackgroundImage
          image={image}
          video={video}
          objectFit={objectFit}
          overlayColor={overlayColor}
          overlayOpacity={overlayOpacity}
        />

        <div className={classNames('flex flex-col mx-1 md:mx-10 z-20')}>
          <EyebrowText
            component={component}
            secondaryFont={secondaryFont}
            isJavaDrip={isJavaDrip}
            className={isJavaDrip ? '!tracking-[5.5px] font-bold' : ''}
          />

          <HeroTitle titleStyle={titleStyle} useCustomTextElements={useCustomTextElements} title={title} />
          {isJavaDrip && description ? <DescriptionSeparator /> : null}
          <Description
            secondaryFont={secondaryFont}
            isJavaDrip={isJavaDrip}
            className={isJavaDrip ? 'tracking-[5.5px] uppercase !py-0' : ''}
          />

          <div className={classNames('pb-6', { 'py-6': !description })}>
            {Boolean(primaryButtonLink) && (
              <PrimaryButton primaryButtonLink={primaryButtonLink} primaryButtonStyle={primaryButtonStyle} />
            )}
            {Boolean(secondaryButtonLink) && (
              <SecondaryButton secondaryButtonLink={secondaryButtonLink} secondaryButtonStyle={secondaryButtonStyle} />
            )}
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

const HeroDefault: FC<Props> = ({
  title,
  titleStyle = 'h1',
  description,
  primaryButtonLink,
  primaryButtonStyle = 'primary',
  secondaryButtonLink,
  secondaryButtonStyle = 'primary',
  component,
  useCustomTextElements = false,
  fullHeight,
}) => {
  const { secondaryFont, isJavaDrip } = useComponentStarterKitContext();

  return (
    <HeroContainer fullHeight={fullHeight} className="text-secondary-content">
      <div
        className={classNames('hero-content text-center p-0', {
          'h-full items-start pt-20': fullHeight,
        })}
      >
        <div className={classNames('flex flex-col mx-1 md:mx-10 z-20')}>
          <EyebrowText component={component} secondaryFont={secondaryFont} isJavaDrip={isJavaDrip} />

          <HeroTitle titleStyle={titleStyle} useCustomTextElements={useCustomTextElements} title={title} />

          <Description secondaryFont={secondaryFont} isJavaDrip={isJavaDrip} />

          <div className={classNames('pb-6', { 'py-6': !description })}>
            {Boolean(primaryButtonLink) && (
              <PrimaryButton primaryButtonLink={primaryButtonLink} primaryButtonStyle={primaryButtonStyle} />
            )}
            {Boolean(secondaryButtonLink) && (
              <SecondaryButton secondaryButtonLink={secondaryButtonLink} secondaryButtonStyle={secondaryButtonStyle} />
            )}
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

const Hero: FC<Props> = props => {
  const { variant } = props.component || {};
  switch (variant) {
    case HeroVariant.ImageRight:
    case HeroVariant.ImageLeft:
      return <HeroSideImage {...props} />;
    case HeroVariant.BackgroundLightImage:
    case HeroVariant.BackgroundDarkImage:
      return <HeroBackgroundImage {...props} />;
    case HeroVariant.TwoColumns:
      return <HeroTwoColumns {...props} />;
    default:
      return <HeroDefault {...props} />;
  }
};

[
  undefined,
  HeroVariant.ImageLeft,
  HeroVariant.ImageRight,
  HeroVariant.BackgroundLightImage,
  HeroVariant.BackgroundDarkImage,
  HeroVariant.TwoColumns,
].forEach(variantId => {
  registerUniformComponent({
    type: 'hero',
    component: Hero,
    variantId,
  });
});

export default Hero;
