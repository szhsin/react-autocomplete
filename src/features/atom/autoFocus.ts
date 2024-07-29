import type { Feature, GetProps, FeatureProps } from '../../types';

type AutoFocusFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps'>>;

const autoFocus =
  <T>({ requestItem }: Pick<FeatureProps<T>, 'requestItem'>): AutoFocusFeature<T> =>
  ({ setFocusIndex }) => ({
    getInputProps: () => ({
      onChange: async (e) => {
        const nextValue = e.target.value;
        if (nextValue) {
          const result = await requestItem(nextValue);
          result && setFocusIndex(result.index);
        }
      }
    })
  });

export { type AutoFocusFeature, autoFocus };
