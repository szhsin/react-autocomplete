import type { Feature, GetProps } from '../../types';
type NonblurToggleFeature<T> = Feature<T, Pick<GetProps<T>, 'getToggleProps'>>;
declare const nonblurToggle: <T>() => NonblurToggleFeature<T>;
export { type NonblurToggleFeature, nonblurToggle };
