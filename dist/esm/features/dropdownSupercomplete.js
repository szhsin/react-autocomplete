import { supercomplete } from './supercomplete.js';
import { dropdown } from './dropdown.js';
import { mergeFeatures } from '../utils/mergeFeatures.js';

const dropdownSupercomplete = props => mergeFeatures(supercomplete(props), dropdown());

export { dropdownSupercomplete };
