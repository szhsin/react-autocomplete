import { mergeModules } from '../../utils/mergeModules.js';
import { autocompleteLite } from '../atom/autocompleteLite.js';
import { inputToggle } from '../atom/inputToggle.js';

const autocomplete = (props = {}) => mergeModules(autocompleteLite(props), inputToggle());

export { autocomplete };
