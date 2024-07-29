import type { Feature, GetProps } from '../../types';
type LabelFeature<T> = Feature<T, Pick<GetProps<T>, 'getLabelProps' | 'getInputProps' | 'getListProps'>>;
declare const label: <T>() => LabelFeature<T>;
export { type LabelFeature, label };
