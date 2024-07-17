import type { Feature, GetPropsFunctions } from '../../types';
type LabelFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getLabelProps' | 'getInputProps' | 'getListProps'>>;
declare const label: <T>() => LabelFeature<T>;
export { type LabelFeature, label };
