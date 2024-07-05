import { mergeModules } from '../../utils/mergeModules.js';
import { autocomplete } from './autocomplete.js';
import { autoInline } from '../atom/autoInline.js';

const supercomplete = ({
  getFocusItem,
  ...rest
}) => mergeModules(autocomplete({
  ...rest,
  rovingText: true
}), autoInline({
  getFocusItem
}));

export { supercomplete };
