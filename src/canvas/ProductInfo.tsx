import { FC, useCallback } from 'react';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import BaseProductInfo, { type Props as BaseProductInfoProps } from '../components/BaseProductInfo';

export type Props = ComponentProps<BaseProductInfoProps>;

const ProductInfo: FC<Props> = props => {
  const handlePrimaryButtonClick = useCallback(() => {
    window.alert(`This is add to cart event placeholder. quantity: 1.`);
  }, []);

  return <BaseProductInfo {...props} onClickPrimaryButton={handlePrimaryButtonClick} />;
};

registerUniformComponent({
  type: 'productInfo',
  component: ProductInfo,
});

export default ProductInfo;
