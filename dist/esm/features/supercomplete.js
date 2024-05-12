import { autocomplete } from './autocomplete.js';
import { inline } from './inline.js';
import { mergeFeatures } from '../utils/mergeFeatures.js';

const supercomplete = props => mergeFeatures(inline(), autocomplete({
  ...props,
  rovingText: true
}));

export { supercomplete };
