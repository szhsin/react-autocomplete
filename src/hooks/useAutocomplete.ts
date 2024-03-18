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
    onChange,
    inputRef,
    ...state
  };

  const {
    getInputProps: _getInputProps,
    getItemProps: _getItemProps,
    ...actions
  } = useFeature({ ...contextual, ...useTraversal(contextual) });

  const { onBlur, ...featureInputProps } = _getInputProps();

  const getInputProps: GetProps<T>['getInputProps'] = () => ({
    ...featureInputProps,
    onBlur: (e) => !instance.a && onBlur?.(e),
    ref: inputRef
  });

  const getItemProps: GetProps<T>['getItemProps'] = (option) => {
    const { onMouseDown, onClick, ...featureItemProps } = _getItemProps(option);
    return {
      ...featureItemProps,
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
    getItemProps,
    ...state,
    ...actions
  };
};

export { useAutocomplete };
