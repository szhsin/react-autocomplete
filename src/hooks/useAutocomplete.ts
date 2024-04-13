import { useState, useRef, useCallback } from 'react';
import type { InputHTMLAttributes } from 'react';
import type {
  GetProps,
  AutocompleteProps,
  AutocompleteState,
  MutableState,
  Contextual,
  PropsWithObjectRef
} from '../common';
import { useMutableState } from './useMutableState';
import { mergeEvents } from '../utils/mergeEvents';

const useAutocomplete = <T, FeatureActions>({
  onChange = () => {},
  isItemDisabled = () => false,
  feature: useFeature,
  traversal: useTraversal,
  getItemValue: _getItemValue
}: AutocompleteProps<T, FeatureActions>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState<T | undefined>();
  const [selectedItem, setSelectedItem] = useState<T | undefined>();
  const mutable = useMutableState<MutableState>({ b: '', c: [] });

  const getItemValue: Contextual<T>['getItemValue'] = useCallback(
    (item) => (item == null ? '' : _getItemValue ? _getItemValue(item) : item.toString()),
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
    selectedItem,
    setSelectedItem,
    open,
    setOpen
  };

  const contextual = {
    $: mutable,
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

  const getInputProps: () => PropsWithObjectRef<InputHTMLAttributes<HTMLInputElement>> = () => {
    const { onBlur, ...rest } = _getInputProps();
    return {
      ...rest,
      onBlur: (e) => !mutable.a && onBlur?.(e),
      ref: inputRef
    };
  };

  const getListProps: GetProps<T>['getListProps'] = () =>
    mergeEvents(_getListProps(), {
      onMouseDown: () => {
        mutable.a = 1;
      },
      onClick: () => {
        inputRef.current?.focus();
        mutable.a = 0;
      }
    });

  return {
    getInputProps,
    getListProps,
    ...state,
    ...restFeature
  };
};

export { useAutocomplete };
