import { FC } from 'react';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import BaseContainer, { Props as BaseContainerProps, ContainerVariants } from '../../components/Container';

export type Props = ComponentProps<BaseContainerProps>;

const Container: FC<Props> = props => (
  <BaseContainer {...props} containerVariant={props?.component?.variant} backgroundClassName="!max-w-none">
    <UniformSlot name="container-inner" />
  </BaseContainer>
);

[undefined, ContainerVariants.BackgroundInContainer, ContainerVariants.FluentContent].forEach(variantId => {
  registerUniformComponent({
    type: 'container',
    component: Container,
    variantId,
  });
});

export default Container;
