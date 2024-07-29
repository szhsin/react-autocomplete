import type { Feature, GetProps, FeatureProps } from '../../types';
type AutoInlineFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps'>>;
declare const autoInline: <T>({ requestItem }: Pick<FeatureProps<T>, "requestItem">) => AutoInlineFeature<T>;
export { type AutoInlineFeature, autoInline };
