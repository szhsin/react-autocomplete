import type { Feature, GetProps, FeatureProps } from '../../types';
type AutoFocusFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps'>>;
declare const autoFocus: <T>({ onRequestItem }: Pick<FeatureProps<T>, "onRequestItem">) => AutoFocusFeature<T>;
export { type AutoFocusFeature, autoFocus };
