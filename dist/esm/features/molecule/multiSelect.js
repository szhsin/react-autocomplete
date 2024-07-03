import { mergeModules } from '../../utils/mergeModules.js';
import { autocomplete } from './autocomplete.js';
import { inputFocus } from '../atom/inputFocus.js';
import { multiInput } from '../atom/multiInput.js';

const multiSelect = (props = {}) => mergeModules(autocomplete({
  ...props,
  select: true,
  selectOnBlur: false
}), inputFocus(), multiInput());

export { multiSelect };
