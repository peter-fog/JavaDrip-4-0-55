import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import { ComponentInstance } from '@uniformdev/canvas';
import { useInstantSearch, Hits } from 'react-instantsearch-hooks-web';
import { InformationContent } from '../../components';
import { Card } from '../';

enum HitTypes {
  ProductHit = 'algolia-hitProduct',
}

const ProductHit: FC<{ hit: CommerceTypes.Product; component: ComponentInstance }> = ({ hit, component }) => {
  const { images, name, slug, description, subCategories } = hit || {};
  const {
    buttonStyle,
    buttonLink,
    buttonCopy,
    badgeSize,
    badgeStyle,
    lineCountRestriction,
    objectFit,
    overlayColor,
    overlayOpacity,
    textColor,
  } = component.parameters || {};
  return (
    <Card
      image={images?.[0]?.url}
      title={name}
      description={description}
      badge={subCategories?.[0] || ''}
      badgeStyle={(badgeStyle?.value as Types.BadgeStyles) || 'primary'}
      buttonStyle={(buttonStyle?.value as Types.ButtonStyles) || 'primary'}
      lineCountRestriction={(lineCountRestriction?.value as Types.AvailableMaxLineCount) || '5'}
      badgeSize={(badgeSize?.value as Types.BadgeSize) || 'sm'}
      buttonCopy={buttonCopy?.value as string}
      objectFit={objectFit?.value as Types.AvailableObjectFit}
      overlayColor={overlayColor?.value as Types.AvailableColor}
      overlayOpacity={overlayOpacity?.value as Types.AvailableOpacity}
      buttonLink={
        // Emulate dynamic values for categories pages without dynamic input feature
        {
          ...(buttonLink?.value as Types.ProjectMapLink),
          dynamicInputValues: {
            'product-slug': slug,
          },
        } as Types.ProjectMapLink
      }
      useCustomTextElements
      textColor={textColor?.value as Types.AvailableTextColor | undefined}
      component={component}
    />
  );
};

const AlgoliaHits: FC<ComponentProps> = ({ component }) => {
  const {
    results: { hits, processingTimeMS },
    status,
  } = useInstantSearch();

  const renderContent = () => {
    const currentComponent = component?.slots?.hitComponent?.[0];

    if (!hits.length && status === 'idle' && processingTimeMS) {
      return <InformationContent title="Sorry there are no products for this filter" />;
    }

    switch (currentComponent?.type) {
      case HitTypes.ProductHit: {
        const hitComponent = ({ hit }: { hit: CommerceTypes.Product }) => (
          <ProductHit hit={hit} component={currentComponent || { type: 'card' }} />
        );
        return (
          <Hits<CommerceTypes.Product & Record<string, unknown>>
            hitComponent={hitComponent}
            classNames={{
              list: 'grid gap-y-3 mb-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-6 lg:gap-x-8 lg:gap-y-5 sm:mb-0',
            }}
          />
        );
      }
      default:
        return <Hits />;
    }
  };

  return <div className="pt-2 min-h-[500px]">{renderContent()}</div>;
};

registerUniformComponent({
  type: 'algolia-hits',
  component: AlgoliaHits,
});

export default AlgoliaHits;
