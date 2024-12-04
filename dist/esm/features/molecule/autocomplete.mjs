import { mergeModules } from '../../utils/mergeModules.mjs';
import { autocompleteLite } from '../atom/autocompleteLite.mjs';
import { inputToggle } from '../atom/inputToggle.mjs';
import { label } from '../atom/label.mjs';

const autocomplete = props => mergeModules(autocompleteLite(props), inputToggle(), label());

export { autocomplete };
