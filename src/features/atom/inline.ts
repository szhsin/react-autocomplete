import type { Feature, GetPropsFunctions, FeatureProps } from '../../common';

type InlineFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps'>>;

const inline =
  <T>({ getFocusItem }: Pick<FeatureProps<T>, 'getFocusItem'>): InlineFeature<T> =>
  ({ getItemValue, setTmpValue, setFocusItem }) => ({
    getInputProps: () => ({
      onChange: async ({ target, nativeEvent }) => {
        if ((nativeEvent as unknown as { inputType: string }).inputType !== 'insertText') {
          return;
        }

        const nextValue = target.value;
        const item = await getFocusItem(nextValue);
        if (!item) return;

        setFocusItem(item);
        const itemValue = getItemValue(item);
        const start = nextValue.length;
        const end = itemValue.length;
        setTmpValue(nextValue + itemValue.slice(start));
        setTimeout(() => target.setSelectionRange(start, end), 0);
      }
    })
  });

export { type InlineFeature, inline };
