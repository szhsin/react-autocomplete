import type { Feature, GetPropsFunctions } from '../../types';
import { getId } from '../../common';

type LabelFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getLabelProps' | 'getInputProps' | 'getListProps'>
>;

const label =
  <T>(): LabelFeature<T> =>
  ({ id }) => {
    const inputId = getId(id, 'i');
    const labelId = getId(id, 'a');

    return {
      getLabelProps: () => ({
        id: labelId,
        htmlFor: inputId
      }),

      getInputProps: () => ({
        id: inputId
      }),

      getListProps: () => ({
        'aria-labelledby': labelId
      })
    };
  };

export { type LabelFeature, label };
