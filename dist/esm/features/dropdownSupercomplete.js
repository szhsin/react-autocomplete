import { autocomplete } from './autocomplete.js';
import { dropdown } from './dropdown.js';
import { inline } from './inline.js';
import { mergeFeatures } from '../utils/mergeFeatures.js';

const dropdownSupercomplete = props => mergeFeatures(inline(), autocomplete({
  ...props,
  rovingText: true
}), dropdown());

export { dropdownSupercomplete };
