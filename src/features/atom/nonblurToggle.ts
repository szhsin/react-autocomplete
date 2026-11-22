import type { Feature, GetProps } from '../../types.js';
import { getInputToggleProps } from '../../common.js';

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
