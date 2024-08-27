import { mergeModules } from '../../utils/mergeModules.js';
import { autocompleteLite } from '../atom/autocompleteLite.js';
import { inputToggle } from '../atom/inputToggle.js';
import { label } from '../atom/label.js';

const autocomplete = props => mergeModules(autocompleteLite(props), inputToggle(), label());

export { autocomplete };
