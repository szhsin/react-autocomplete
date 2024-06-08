import { mergeFeatures } from '../../utils/mergeFeatures.js';
import { autocomplete } from '../atom/autocomplete.js';
import { toggle } from '../atom/toggle.js';
import { dropdownToggle } from '../atom/dropdownToggle.js';

const dropdown = props => mergeFeatures(autocomplete({
  ...props,
  constricted: true,
  selectOnBlur: false,
  deselectOnBlur: false
}), dropdownToggle(), toggle());

export { dropdown };
