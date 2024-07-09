import type { Feature, FeatureProps, GetPropsFunctions, GetPropsWithRefFunctions, FeatureState } from '../../common';
type DropdownToggleFeature<T> = Feature<T, Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> & Pick<GetPropsFunctions<T>, 'getInputProps'> & FeatureState>;
declare const dropdownToggle: <T>({ closeOnSelect }: Pick<FeatureProps<T>, "closeOnSelect">) => DropdownToggleFeature<T>;
export { type DropdownToggleFeature, dropdownToggle };
