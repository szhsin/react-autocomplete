import { mergeFeatures } from '../../utils/mergeFeatures.js';
import { autocompleteLite } from '../atom/autocompleteLite.js';
import { dropdownToggle } from '../atom/dropdownToggle.js';
import { multiInput } from '../atom/multiInput.js';

const multiSelectDropdown = (props = {}) => mergeFeatures(autocompleteLite({
  ...props,
  select: true,
  selectOnBlur: false
}), dropdownToggle(props), multiInput());

export { multiSelectDropdown };
