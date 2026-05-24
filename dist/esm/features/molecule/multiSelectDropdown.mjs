import { mergeModules } from '../../utils/mergeModules.mjs';
import { multiInput } from '../atom/multiInput.mjs';
import { dropdown } from './dropdown.mjs';

const multiSelectDropdown = props => mergeModules(dropdown(props), multiInput());

export { multiSelectDropdown };
