import type { Feature, GetPropsFunctions, FeatureProps } from '../../types';

type AutoFocusFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps'>>;

const autoFocus =
  <T>({ getFocusItem }: Pick<FeatureProps<T>, 'getFocusItem'>): AutoFocusFeature<T> =>
  ({ setFocusItem }) => ({
    getInputProps: () => ({
      onChange: async (e) => {
        const nextValue = e.target.value;
        if (nextValue) {
          const item = await getFocusItem(nextValue);
          item && setFocusItem(item);
        }
      }
    })
  });

export { type AutoFocusFeature, autoFocus };
