import type { MultiSelectProps } from '../common';
declare const useMultiSelect: <T, FeatureYield extends object>({ getItemValue, selected, onSelectChange, ...passthrough }: MultiSelectProps<T, FeatureYield>) => {
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield;
export { useMultiSelect };
