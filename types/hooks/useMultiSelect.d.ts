import type { MultiSelectProps } from '../common';
declare const useMultiSelect: <T, FeatureYield extends object>({ getItemValue, selected, onSelectChange: _onSelectChange, flipOnSelect, ...passthrough }: MultiSelectProps<T, FeatureYield>) => {
    focusItem: T | undefined;
    setFocusItem: (item?: T | undefined) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
} & FeatureYield & {
    removeSelect: (item?: T | undefined) => void;
};
export { useMultiSelect };
