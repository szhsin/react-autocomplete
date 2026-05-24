import type { Feature, GetProps, FeatureProps } from '../../types';
type AutoInlineFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps'>>;
declare const autoInline: <T>({ onRequestItem }: Pick<FeatureProps<T>, "onRequestItem">) => AutoInlineFeature<T>;
export { type AutoInlineFeature, autoInline };
