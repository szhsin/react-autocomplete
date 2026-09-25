import type { Feature, GetProps } from '../../types';
import { getInputToggleProps } from '../../common';

type NonblurToggleFeature<T> = Feature<T, Pick<GetProps<T>, 'getToggleProps'>>;

const nonblurToggle =
  <T>(): NonblurToggleFeature<T> =>
  ({ id, open, setOpen, disabled }) => ({
    getToggleProps: () => ({
      ...getInputToggleProps(id, open, disabled),
      onClick: () => setOpen(!open)
    })
  });

export { type NonblurToggleFeature, nonblurToggle };
