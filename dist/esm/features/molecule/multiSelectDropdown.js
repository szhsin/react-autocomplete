import { mergeModules } from '../../utils/mergeModules.js';
import { autocompleteLite } from '../atom/autocompleteLite.js';
import { dropdownToggle } from '../atom/dropdownToggle.js';
import { multiInput } from '../atom/multiInput.js';

const multiSelectDropdown = props => mergeModules(autocompleteLite({
  ...props,
  select: true
}), dropdownToggle(props), multiInput());

export { multiSelectDropdown };
