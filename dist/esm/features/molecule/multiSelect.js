import { mergeModules } from '../../utils/mergeModules.js';
import { autocompleteLite } from '../atom/autocompleteLite.js';
import { nonblurToggle } from '../atom/nonblurToggle.js';
import { label } from '../atom/label.js';
import { inputFocus } from '../atom/inputFocus.js';
import { multiInput } from '../atom/multiInput.js';

const multiSelect = props => mergeModules(autocompleteLite({
  ...props,
  select: true
}), nonblurToggle(), label(), inputFocus(), multiInput());

export { multiSelect };
