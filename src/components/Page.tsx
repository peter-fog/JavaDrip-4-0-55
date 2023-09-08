import { FC, ElementType, Fragment } from 'react';
import classNames from 'classnames';
import {
  createUniformApiEnhancer,
  UniformComposition,
  UniformSlot,
  useUniformCurrentComposition,
} from '@uniformdev/canvas-react';
import type { RootComponentInstance } from '@uniformdev/canvas';
import UniformPreviewIcon from './UniformPreviewIcon';
import ThemeProvider from './ThemeProvider';
import { getGapClass, getMarginBottomClass, PaddingSize } from '../utilities/styling';
import ComponentStarterKitContextProvider, {
  useComponentStarterKitContext,
} from '../context/ComponentStarterKitContext';

export type PageProps = {
  preview: boolean;
  useUniformComposition?: boolean;
  data: RootComponentInstance;
  providers: ElementType;
  skipContainerWrappersList?: string[];
  context: Record<string, unknown>;
};

const PageContent: FC<Pick<PageProps, 'preview' | 'useUniformComposition' | 'providers'>> = ({
  useUniformComposition,
  preview,
  providers: Providers = Fragment,
}) => {
  const { isJavaDrip } = useComponentStarterKitContext();
  const { data: composition } = useUniformCurrentComposition();

  const commonPadding = '[&>*]:xl:px-0 [&>*]:px-4';

  const gap = composition?.slots?.pageHeader?.[0]?.parameters?.syntheticGap?.value as PaddingSize | undefined;

  return (
    <ThemeProvider>
      <Providers>
        {/* Docs: https://docs.uniform.app/reference/packages/uniformdev-canvas-react#slot */}
        <div className={commonPadding}>
          <UniformSlot name="pageHeader" />
        </div>
        {/* useUniformComposition is always true only for global composition preview */}
        {useUniformComposition && <h1 className="flex-1 flex justify-center items-center">Page content placeholder</h1>}
        <div
          className={classNames(
            'flex flex-col flex-1 [&>*]:max-w-screen-xl [&>*]:mx-auto [&>*]:w-full ',
            commonPadding,
            getGapClass(gap),
            { [getMarginBottomClass(gap)]: !isJavaDrip }
          )}
        >
          <UniformSlot name="pageContent" />
        </div>
        <div className={commonPadding}>
          <UniformSlot name="pageFooter" />
        </div>
        {preview && <UniformPreviewIcon />}
      </Providers>
    </ThemeProvider>
  );
};

const Page: FC<PageProps> = ({ data: composition, useUniformComposition, preview, providers = Fragment, context }) => (
  <UniformComposition
    data={composition}
    behaviorTracking="onLoad"
    contextualEditingEnhancer={createUniformApiEnhancer({ apiUrl: '/api/preview' })}
  >
    <ComponentStarterKitContextProvider {...(context || {})}>
      <PageContent useUniformComposition={useUniformComposition} preview={preview} providers={providers} />
    </ComponentStarterKitContextProvider>
  </UniformComposition>
);

export default Page;
