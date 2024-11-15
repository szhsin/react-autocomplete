import { mergeModules } from '../../utils/mergeModules.js';
import { multiInput } from '../atom/multiInput.js';
import { dropdown } from './dropdown.js';

const multiSelectDropdown = props => mergeModules(dropdown(props), multiInput());

export { multiSelectDropdown };
