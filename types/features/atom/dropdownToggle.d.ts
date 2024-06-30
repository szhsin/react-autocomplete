import type { Feature, FeatureProps, GetPropsFunctions, GetPropsWithRefFunctions, Clearable } from '../../common';
type DropdownToggleFeature<T> = Feature<T, Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> & Pick<GetPropsFunctions<T>, 'getInputProps'> & Clearable>;
declare const dropdownToggle: <T>({ closeOnSelect }: Pick<FeatureProps<T>, "closeOnSelect">) => DropdownToggleFeature<T>;
export { type DropdownToggleFeature, dropdownToggle };
