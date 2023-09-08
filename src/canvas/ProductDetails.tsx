import { FC } from 'react';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import BaseContainer, { Props as BaseContainerProps, ContainerVariants } from '../components/Container';

export type Props = ComponentProps<BaseContainerProps>;

const ProductDetails: FC<Props> = props => (
  <div className="!max-w-none">
    <BaseContainer {...props} containerVariant={props?.component?.variant}>
      <UniformSlot name="container-inner" />
    </BaseContainer>
  </div>
);

[undefined, ContainerVariants.BackgroundInContainer, ContainerVariants.FluentContent].forEach(variantId => {
  registerUniformComponent({
    type: 'productDetails',
    component: ProductDetails,
    variantId,
  });
});

export default ProductDetails;
