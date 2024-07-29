import type { Feature, GetProps, FeatureProps } from '../../types';

type AutoInlineFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps'>>;

const autoInline =
  <T>({ requestItem }: Pick<FeatureProps<T>, 'requestItem'>): AutoInlineFeature<T> =>
  ({ getItemValue, setTmpValue, setFocusIndex }) => ({
    getInputProps: () => ({
      'aria-autocomplete': 'both',

      onChange: async ({ target, nativeEvent }) => {
        if ((nativeEvent as unknown as { inputType: string }).inputType !== 'insertText') {
          return;
        }

        const nextValue = target.value;
        const result = await requestItem(nextValue);
        if (!result) return;

        setFocusIndex(result.index);
        const itemValue = getItemValue(result.item);
        const start = nextValue.length;
        const end = itemValue.length;
        setTmpValue(nextValue + itemValue.slice(start));
        setTimeout(() => target.setSelectionRange(start, end), 0);
      }
    })
  });

export { type AutoInlineFeature, autoInline };
