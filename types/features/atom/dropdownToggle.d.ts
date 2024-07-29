import type { Feature, FeatureProps, GetProps, GetPropsWithRef, FeatureState } from '../../types';
type DropdownToggleFeature<T> = Feature<T, Pick<GetPropsWithRef<T>, 'getToggleProps'> & Pick<GetProps<T>, 'getInputProps'> & FeatureState>;
declare const dropdownToggle: <T>({ closeOnSelect }: Pick<FeatureProps<T>, "closeOnSelect">) => DropdownToggleFeature<T>;
export { type DropdownToggleFeature, dropdownToggle };
