import { mergeModules } from '../../utils/mergeModules.js';
import { autocompleteLite } from '../atom/autocompleteLite.js';
import { dropdownToggle } from '../atom/dropdownToggle.js';

const dropdown = props => mergeModules(autocompleteLite({
  ...props,
  select: true,
  deselectOnClear: false
}), dropdownToggle(props));

export { dropdown };
