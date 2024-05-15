import { mergeFeatures } from '../utils/mergeFeatures.js';
import { autocomplete } from './autocomplete.js';
import { inline } from './inline.js';

const supercomplete = props => mergeFeatures(inline(), autocomplete({
  ...props,
  rovingText: true
}));

export { supercomplete };
