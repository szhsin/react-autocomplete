import { mergeModules } from '../../utils/mergeModules.js';
import { autocomplete } from './autocomplete.js';
import { inline } from '../atom/inline.js';

const supercomplete = ({
  getInlineItem,
  ...rest
}) => mergeModules(autocomplete({
  ...rest,
  rovingText: true
}), inline({
  getInlineItem
}));

export { supercomplete };
