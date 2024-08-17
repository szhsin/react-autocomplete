import type { Feature, FeatureProps, GetProps, FeatureState } from '../../types';
type DropdownToggleFeature<T> = Feature<T, Pick<GetProps<T>, 'getToggleProps' | 'getInputProps'> & FeatureState & {
    toggleRef: React.RefObject<HTMLButtonElement>;
}>;
declare const dropdownToggle: <T>({ closeOnSelect, toggleRef: externalToggleRef }: Pick<FeatureProps<T>, "closeOnSelect" | "toggleRef">) => DropdownToggleFeature<T>;
export { type DropdownToggleFeature, dropdownToggle };
