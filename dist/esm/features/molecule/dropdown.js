import { mergeFeatures } from '../../utils/mergeFeatures.js';
import { autocompleteLite } from '../atom/autocompleteLite.js';
import { dropdownToggle } from '../atom/dropdownToggle.js';

const dropdown = props => mergeFeatures(autocompleteLite({
  ...props,
  select: true,
  deselectOnClear: false
}), dropdownToggle());

export { dropdown };
