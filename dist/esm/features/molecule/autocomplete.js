import { mergeFeatures } from '../../utils/mergeFeatures.js';
import { autocompleteLite } from '../atom/autocompleteLite.js';
import { inputToggle } from '../atom/inputToggle.js';

const autocomplete = (props = {}) => mergeFeatures(autocompleteLite(props), inputToggle());

export { autocomplete };
