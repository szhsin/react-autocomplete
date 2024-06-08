import { autocomplete } from './atom/autocomplete.js';
import { toggle } from './atom/toggle.js';
import { mergeFeatures } from '../utils/mergeFeatures.js';

const dropdown = props => mergeFeatures(autocomplete({
  ...props,
  constricted: true,
  selectOnBlur: false,
  deselectOnBlur: false
}), toggle());

export { dropdown };
