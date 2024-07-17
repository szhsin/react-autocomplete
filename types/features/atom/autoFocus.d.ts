import type { Feature, GetPropsFunctions, FeatureProps } from '../../types';
type AutoFocusFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps'>>;
declare const autoFocus: <T>({ getFocusItem }: Pick<FeatureProps<T>, "getFocusItem">) => AutoFocusFeature<T>;
export { type AutoFocusFeature, autoFocus };
