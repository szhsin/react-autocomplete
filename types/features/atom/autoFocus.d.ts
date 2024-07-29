import type { Feature, GetProps, FeatureProps } from '../../types';
type AutoFocusFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps'>>;
declare const autoFocus: <T>({ requestItem }: Pick<FeatureProps<T>, "requestItem">) => AutoFocusFeature<T>;
export { type AutoFocusFeature, autoFocus };
