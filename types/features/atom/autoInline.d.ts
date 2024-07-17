import type { Feature, GetPropsFunctions, FeatureProps } from '../../types';
type AutoInlineFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps'>>;
declare const autoInline: <T>({ getFocusItem }: Pick<FeatureProps<T>, "getFocusItem">) => AutoInlineFeature<T>;
export { type AutoInlineFeature, autoInline };
