import { autocomplete } from './autocomplete.js';
import { toggle } from './toggle.js';
import { mergeFeatures } from '../utils/mergeFeatures.js';

const dropdown = props => mergeFeatures(autocomplete({
  ...props,
  constricted: true
}), toggle());

export { dropdown };
