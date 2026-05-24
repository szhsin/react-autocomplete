import { mergeModules } from '../../utils/mergeModules.mjs';
import { autocompleteLite } from '../atom/autocompleteLite.mjs';
import { nonblurToggle } from '../atom/nonblurToggle.mjs';
import { label } from '../atom/label.mjs';
import { inputFocus } from '../atom/inputFocus.mjs';
import { multiInput } from '../atom/multiInput.mjs';

const multiSelect = props => mergeModules(autocompleteLite({
  ...props,
  select: true
}), nonblurToggle(), label(), inputFocus(), multiInput());

export { multiSelect };
