import { mergeFeatures } from '../../utils/mergeFeatures.js';
import { autocomplete } from '../atom/autocomplete.js';
import { inline } from '../atom/inline.js';

const supercomplete = ({
  getInlineItem,
  ...rest
}) => mergeFeatures(autocomplete({
  ...rest,
  rovingText: true
}), inline({
  getInlineItem
}));

export { supercomplete };
