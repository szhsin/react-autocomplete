import type { Feature, GetPropsFunctions, GetPropsWithRefFunctions, Clearable } from '../../common';
type DropdownToggleFeature<T> = Feature<T, Pick<GetPropsWithRefFunctions<T>, 'getToggleProps'> & Pick<GetPropsFunctions<T>, 'getInputProps'> & Clearable>;
declare const dropdownToggle: <T>() => DropdownToggleFeature<T>;
export { type DropdownToggleFeature, dropdownToggle };
