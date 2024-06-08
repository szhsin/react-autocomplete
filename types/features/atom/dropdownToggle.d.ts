import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions } from '../../common';
type DropdownToggleFeature<T> = Feature<T, Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> & Pick<GetPropsFunctions<T>, 'getInputProps'>>;
declare const dropdownToggle: <T>() => DropdownToggleFeature<T>;
export { type DropdownToggleFeature, dropdownToggle };
