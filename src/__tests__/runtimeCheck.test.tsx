import { renderHook } from '@testing-library/react';
import { useCombobox, useMultiSelect, multiSelect } from '../';

describe('Runtime check', () => {
  test('multiSelect', () => {
    expect(() => {
      renderHook(() =>
        useCombobox({
          items: [''],
          value: '',
          onChange: () => {},
          onSelectChange: () => {},
          feature: multiSelect()
        })
      );
    }).toThrow('Multi-selection feature must be used with the useMultiSelect hook.');

    expect(() => {
      renderHook(() =>
        useMultiSelect({
          items: [''],
          value: '',
          onChange: () => {},
          selected: undefined as unknown as string[],
          onSelectChange: () => {},
          feature: multiSelect()
        })
      );
    }).toThrow('The `selected` prop in useMultiSelect must be an array.');

    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    expect(() => {
      renderHook(() =>
        useCombobox({
          items: [''],
          value: '',
          onChange: () => {},
          onSelectChange: () => {},
          feature: multiSelect()
        })
      );
    }).not.toThrow();
    process.env.NODE_ENV = originalEnv;
  });
});
