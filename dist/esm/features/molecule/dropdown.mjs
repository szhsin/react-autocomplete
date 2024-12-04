import { mergeModules } from '../../utils/mergeModules.mjs';
import { autocompleteLite } from '../atom/autocompleteLite.mjs';
import { dropdownToggle } from '../atom/dropdownToggle.mjs';

const dropdown = props => mergeModules(autocompleteLite({
  ...props,
  select: true,
  deselectOnClear: false
}), dropdownToggle(props));

export { dropdown };
