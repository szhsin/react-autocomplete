import type { Feature, GetPropsFunctions, FeatureProps } from '../common';
type InlineFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps'>>;
declare const inline: <T>({ getInlineItem }: Pick<FeatureProps<T>, "getInlineItem">) => InlineFeature<T>;
export { type InlineFeature, inline };
