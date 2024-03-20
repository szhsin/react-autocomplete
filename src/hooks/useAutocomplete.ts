import { useState, useRef, useCallback } from 'react';
import type {
  GetProps,
  AutocompleteProps,
  AutocompleteState,
  Instance,
  Contextual
} from '../common';

const useAutocomplete = <T, FeatureActions>({
  onChange = () => {},
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}: AutocompleteProps<T, FeatureActions>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState<T | null | undefined>();
  const [instance] = useState<Instance>({ b: '', c: [] });

  const getItemValue: Contextual<T>['getItemValue'] = useCallback(
    (item) => (item == null ? null : _getItemValue ? _getItemValue(item) : item.toString()),
    [_getItemValue]
  );

  const setInputValue = useCallback((value: string) => {
    const input = inputRef.current;
    if (input) input.value = value;
  }, []);

  const state: AutocompleteState<T> = {
    setInputValue,
    focusItem,
    setFocusItem,
    open,
    setOpen
  };

  const contextual = {
    _: instance,
    getItemValue,
    isItemDisabled,
    onChange,
    inputRef,
    ...state
  };

  const {
    getInputProps: _getInputProps,
    getListProps: _getListProps,
    ...restFeature
  } = useFeature({ ...contextual, ...useTraversal(contextual) });

  const getInputProps: GetProps<T>['getInputProps'] = () => {
    const { onBlur, ...rest } = _getInputProps();
    return {
      ...rest,
      onBlur: (e) => !instance.a && onBlur?.(e),
      ref: inputRef
    };
  };

  const getListProps: GetProps<T>['getListProps'] = () => {
    const { onMouseDown, onClick, ...rest } = _getListProps();
    return {
      ...rest,
      onMouseDown: (e) => {
        onMouseDown?.(e);
        instance.a = 1;
      },
      onClick: (e) => {
        onClick?.(e);
        inputRef.current?.focus();
        instance.a = 0;
      }
    };
  };

  return {
    getInputProps,
    getListProps,
    ...state,
    ...restFeature
  };
};

export { useAutocomplete };
