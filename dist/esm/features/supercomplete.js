import { mergeFeatures } from '../utils/mergeFeatures.js';
import { autocomplete } from './autocomplete.js';
import { inline } from './inline.js';

const supercomplete = ({
  constricted,
  getInlineItem
}) => mergeFeatures(autocomplete({
  constricted,
  rovingText: true
}), inline({
  getInlineItem
}));

export { supercomplete };
